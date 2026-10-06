// DEC-132 layer B self-test fixture (Bundle 6, B1): one planted ERROR-level
// finding. The Semgrep job scans this file FIRST and fails unless the pinned
// rules report >= 1 finding here; the enforcing scan excludes this directory.
// Rule: javascript.jsonwebtoken.security.jwt-none-alg (severity ERROR).
const jwt = require("jsonwebtoken");

function verifyPlanted(token) {
  return jwt.verify(token, "", { algorithms: ["none"] });
}

module.exports = { verifyPlanted };
