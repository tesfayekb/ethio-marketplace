"""The one derivation of a temporary backend config variant (housekeeping turn 3, concern 5c).

scripts/ci/prepare-local-backend.sh copies scripts/ci/local-backend-config.toml whole (the
identity); a variant is derived only here. `images` (the backend-images job's learning start, on
an empty working copy): TLS, the before_user_created hook and the six account-change notices (DEC-437)
off, because none changes the image set and each needs files that copy lacks. Each switch must be found exactly once, or the
derivation fails loudly. scripts/ci/backend-config.test.ts proves the derived text.

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
VARIANTS = {'images': ('api.tls', 'auth.hook.before_user_created') + NOTICES}


def derive(text, variant):
    if variant not in VARIANTS:
        raise SystemExit('backend-config: unknown variant ' + repr(variant))
    for section in VARIANTS[variant]:
        pattern = r'(\[' + re.escape(section) + r'\]\s*enabled = )true'
        text, count = re.subn(pattern, r'\1false', text)
        if count != 1:
            raise SystemExit('backend-config: [' + section + '] enabled = true found ' + str(count) + ' times')
    return text


if __name__ == '__main__':
    if len(sys.argv) not in (3, 4):
        raise SystemExit('usage: backend-config.py <variant> <out> [source]')
    source = sys.argv[3] if len(sys.argv) == 4 else SOURCE
    with open(source) as handle:
        derived = derive(handle.read(), sys.argv[1])
    with open(sys.argv[2], 'w') as handle:
        handle.write(derived)
