"""The one derivation of a temporary backend config variant (housekeeping turn 3, concern 5c).

scripts/ci/prepare-local-backend.sh copies scripts/ci/local-backend-config.toml whole (the
identity); a variant is derived only here. `images` (the backend-images job's learning start, on
an empty working copy): TLS, the before_user_created hook and the six account-change notices (DEC-437)
off, and the three action-email template tables (INC-1276) dropped — a template has no enabled switch and
the CLI reads its file at validation — because none changes the image set and each needs files that copy
lacks. Each switch and each table must be found exactly once, or the derivation fails loudly. scripts/ci/backend-config.test.ts proves the derived text.

Usage: python3 scripts/ci/backend-config.py <variant> <out> [source]
"""

import re
import sys

SOURCE = 'scripts/ci/local-backend-config.toml'
NOTICES = ('auth.email.notification.password_changed',
           'auth.email.notification.email_changed',
           'auth.email.notification.identity_linked',
           'auth.email.notification.identity_unlinked',
           'auth.email.notification.mfa_factor_enrolled',
           'auth.email.notification.mfa_factor_unenrolled')
TEMPLATES = ('auth.email.template.confirmation',
             'auth.email.template.recovery',
             'auth.email.template.email_change')
VARIANTS = {'images': ('api.tls', 'auth.hook.before_user_created') + NOTICES}
DROPS = {'images': TEMPLATES}


def derive(text, variant):
    if variant not in VARIANTS:
        raise SystemExit('backend-config: unknown variant ' + repr(variant))
    for section in VARIANTS[variant]:
        pattern = r'(\[' + re.escape(section) + r'\]\s*enabled = )true'
        text, count = re.subn(pattern, r'\1false', text)
        if count != 1:
            raise SystemExit('backend-config: [' + section + '] enabled = true found ' + str(count) + ' times')
    for section in DROPS.get(variant, ()):
        # A table runs from its header to the blank line that ends it.
        pattern = r'^\[' + re.escape(section) + r'\]\n(?:[^\n\[][^\n]*\n)*\n?'
        text, count = re.subn(pattern, '', text, flags=re.M)
        if count != 1:
            raise SystemExit('backend-config: [' + section + '] found ' + str(count) + ' times')
    return text


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4):
        raise SystemExit('usage: backend-config.py <variant> <out> [source]')
    source = sys.argv[3] if len(sys.argv) == 4 else SOURCE
    with open(source) as handle:
        derived = derive(handle.read(), sys.argv[1])
    with open(sys.argv[2], 'w') as handle:
        handle.write(derived)
