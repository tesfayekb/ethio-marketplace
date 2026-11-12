"""The one redaction of the browser lanes' public evidence (housekeeping turn 3, concern 5a).

Every heredoc program in .github/workflows/local-backend-proof.yml that redacts imports
`redact` from here (its step sets PYTHONPATH=scripts/ci); none defines its own. The rules
are scripts/ci/redaction-rules.json (DEC-368, housekeeping turn 3b), which the E2E reporter
reads too; a missing or malformed file fails the import, never a raw write.
scripts/ci/redact.test.ts (CF-REDACT-1 → 3) proves the rules on the INC-794 probe strings,
that no workflow holds a second `def redact`, and that both readers write the same bytes.
"""

import json
import os
import re
from pathlib import Path

RULES_FILE = Path(__file__).with_name('redaction-rules.json')
PATTERN_KEYS = {'name', 'pattern', 'replacement'}
ENV_KEYS = {'name', 'env', 'replacement'}
GROUP_REFERENCE = re.compile(r'\$([1-9])')


def _replacement(text, name):
    """`$1` … `$9` become Python's `\\g<n>`; any other `$` is refused (JavaScript reads it)."""
    if '$' in GROUP_REFERENCE.sub('', text):
        raise ValueError(f'{RULES_FILE.name}: rule {name}: a "$" that names no group')
    return GROUP_REFERENCE.sub(r'\\g<\1>', text.replace('\\', '\\\\'))


def _rule(raw):
    if not isinstance(raw, dict) or not isinstance(raw.get('name'), str):
        raise ValueError(f'{RULES_FILE.name}: a rule without a name')
    name = raw['name']
    keys = set(raw)
    if not isinstance(raw.get('replacement'), str):
        raise ValueError(f'{RULES_FILE.name}: rule {name}: no replacement')
    if 'env' in raw:
        env = raw['env']
        if keys != ENV_KEYS or not isinstance(env, list) or not all(isinstance(v, str) for v in env):
            raise ValueError(f'{RULES_FILE.name}: rule {name}: an environment rule is {sorted(ENV_KEYS)}')
        return {'name': name, 'env': tuple(env), 'text': raw['replacement']}
    if keys - {'keep_env'} != PATTERN_KEYS or not isinstance(raw.get('keep_env', ''), str):
        raise ValueError(f'{RULES_FILE.name}: rule {name}: a pattern rule is {sorted(PATTERN_KEYS)} and keep_env')
    source = raw['pattern']
    if not isinstance(source, str) or re.search(r'\\[sS]', source):
        raise ValueError(f'{RULES_FILE.name}: rule {name}: a pattern is a string without \\s or \\S')
    return {
        'name': name,
        'rx': re.compile(source, re.ASCII),
        'replacement': _replacement(raw['replacement'], name),
        'keep_env': raw.get('keep_env'),
    }


def load_rules(text):
    """The ordered rules of the file's text; anything malformed raises."""
    data = json.loads(text)
    if not isinstance(data, dict) or set(data) != {'about', 'rules'} or not isinstance(data['rules'], list):
        raise ValueError(f'{RULES_FILE.name}: the file is {{"about", "rules"}}')
    return [_rule(raw) for raw in data['rules']]


RULES = load_rules(RULES_FILE.read_text(encoding='utf-8'))


def redact(text):
    """Applies every rule of redaction-rules.json in its order: account ids, the staging keys'
    values, JWTs, Supabase keys, e-mail addresses, the CLI's storage key rows, long hex strings
    (the run's own commit stays readable) and ANSI colour codes."""
    for rule in RULES:
        if 'env' in rule:
            for name in rule['env']:
                value = os.environ.get(name)
                if value:
                    text = text.replace(value, rule['text'])
            continue
        keep = os.environ.get(rule['keep_env'], '') if rule['keep_env'] else ''
        replacement = rule['replacement']
        if keep:
            text = rule['rx'].sub(
                lambda match: match[0] if match[0] == keep else match.expand(replacement), text
            )
        else:
            text = rule['rx'].sub(replacement, text)
    return text
