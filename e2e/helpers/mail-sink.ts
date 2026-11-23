/**
 * DEC-437 (cursor bundle 5) — THE TEMPORARY BACKEND'S MAIL SINK, READ.
 *
 * CI's temporary backend (E2E_LOCAL_BACKEND=1) keeps every message its auth service sends in a local mail
 * sink at 127.0.0.1:31324 (scripts/ci/local-backend-config.toml, `[inbucket]`); hosted staging has none.
 * `mailFor` answers the subjects of the messages addressed to one address, newest first, read from the
 * sink's own search — never from the product. A shape that is not the sink's answer throws.
 */
const SINK = "http://127.0.0.1:31324";

/** True when this run's backend is the temporary one, whose sink this helper can read. */
export function hasMailSink(): boolean {
  return process.env["E2E_LOCAL_BACKEND"] === "1";
}

export async function mailFor(address: string): Promise<{ subject: string }[]> {
  const response = await fetch(
    `${SINK}/api/v1/search?query=${encodeURIComponent(`to:${address}`)}`,
  );
  if (!response.ok) throw new Error(`[e2e:mail] the mail sink answered ${response.status}.`);
  const body: unknown = await response.json();
  const messages =
    typeof body === "object" && body !== null && "messages" in body ? body.messages : undefined;
  if (!Array.isArray(messages))
    throw new Error("[e2e:mail] the mail sink's answer has no messages list.");
  return messages.map((message: unknown) => {
    const subject =
      typeof message === "object" && message !== null && "Subject" in message
        ? message.Subject
        : undefined;
    if (typeof subject !== "string") throw new Error("[e2e:mail] a message has no subject.");
    return { subject };
  });
}
