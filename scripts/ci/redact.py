"""The one redaction of the browser lanes' public evidence (housekeeping turn 3, concern 5a).

Every heredoc program in .github/workflows/local-backend-proof.yml that redacts imports
`redact` from here (its step sets PYTHONPATH=scripts/ci); none defines its own.
scripts/ci/redact.test.ts (CF-REDACT-1, CF-REDACT-2) proves the rules on the INC-794 probe
strings and that no workflow holds a second `def redact`.
"""

import os
import re

ACCOUNT_ID = re.compile(r'\b[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}\b')
JWT = re.compile(r'\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b')
SUPABASE_KEY = re.compile(r'\bsb_(?:secret|publishable)_[A-Za-z0-9_-]+\b')
EMAIL = re.compile(r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}')
STORAGE_KEY_ROW = re.compile(r'(│\s*(?:Access Key|Secret Key)\s*│\s*)[^│]*?(\s*│)')
LONG_HEX = re.compile(r'[0-9a-fA-F]{32,}')
SECRET_NAMES = ('E2E_SUPABASE_PUBLISHABLE_KEY', 'E2E_SUPABASE_SERVICE_ROLE_KEY')


def redact(text):
    """Masks account ids, the staging keys' values, JWTs, Supabase keys, e-mail addresses,
    the CLI's storage key rows and long hex strings; the run's own commit stays readable."""
    text = ACCOUNT_ID.sub('[account id]', text)
    for name in SECRET_NAMES:
        value = os.environ.get(name)
        if value:
            text = text.replace(value, '[masked]')
    text = JWT.sub('[masked JWT]', text)
    text = SUPABASE_KEY.sub('[masked key]', text)
    text = EMAIL.sub('[e-mail]', text)
    text = STORAGE_KEY_ROW.sub(r'\1[masked]\2', text)
    commit = os.environ.get('GITHUB_SHA', '')
    return LONG_HEX.sub(lambda match: match[0] if match[0] == commit else '[masked hex]', text)
