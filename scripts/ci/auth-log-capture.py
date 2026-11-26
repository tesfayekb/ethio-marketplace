"""The auth server's failures on a lane, as counts (cursor bundle 7b, INC-1303).

Reads the auth container's log from standard input (one JSON object per line, as the auth server
writes it) and prints, in this order:
  - a header line with the number of lines read and the number of request lines;
  - one line per (method, path, status): the count, the path with every id made `:id` and its
    query string cut;
  - for each answer at 500 or above: its error_code and its msg, the msg cut at 120 characters.
Never a header, a token, a body or an address: a line is read only for its method, path, status,
error_code and msg fields. Every printed line goes through the one redaction (scripts/ci/redact.py,
DEC-368). The workflow step that runs this keeps the output in local-backend-auth-capture.txt, in
the lane's e2e-log artifact; the capture's test is scripts/ci/auth-log-capture.test.ts.
"""

import json
import re
import sys
from collections import Counter

from redact import redact

MSG_CUT = 120
ERROR_LINES_CUT = 40
ID = re.compile(r'[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}')


def _text(value):
    return value if isinstance(value, str) else ''


def _status(value):
    return value if isinstance(value, int) and not isinstance(value, bool) else None


def summarise(lines):
    """Return the capture's output lines for the log lines given."""
    read = 0
    requests = 0
    counts = Counter()
    errors = []
    for raw in lines:
        read += 1
        try:
            entry = json.loads(raw)
        except ValueError:
            continue
        if not isinstance(entry, dict):
            continue
        status = _status(entry.get('status'))
        path = _text(entry.get('path'))
        if status is None or path == '':
            continue
        requests += 1
        method = _text(entry.get('method')) or '-'
        shown = ID.sub(':id', path.split('?', 1)[0])
        counts[(method, shown, status)] += 1
        if status >= 500:
            errors.append((method, shown, status, _text(entry.get('error_code')) or '-',
                           _text(entry.get('msg'))[:MSG_CUT]))
    out = [f'auth log: {read} lines read, {requests} request lines']
    for (method, shown, status), count in sorted(counts.items()):
        out.append(f'{count} x {method} {shown} -> {status}')
    for method, shown, status, code, msg in errors[:ERROR_LINES_CUT]:
        out.append(f'error {status} {method} {shown}: {code}: {msg}')
    if len(errors) > ERROR_LINES_CUT:
        out.append(f'error lines cut: {len(errors) - ERROR_LINES_CUT} more')
    return [redact(line) for line in out]


if __name__ == '__main__':
    for line in summarise(sys.stdin):
        print(line)
