import { randomBytes } from "node:crypto";

import { describe, expect, it } from "vitest";

import {
  cleanCode,
  cleanLabel,
  cleanMessage,
  cleanPath,
  cleanPlace,
  MESSAGE_MAX,
  NO_MESSAGE,
  PATH_MAX,
} from "./error-clean";

describe("the error report's one cleaner (DEC-474 Part F)", () => {
  it("ECL-1 a message loses every e-mail, phone number, network address, token and query", () => {
    const token = `eyJ${randomBytes(12).toString("base64url")}.${randomBytes(24).toString("base64url")}.${randomBytes(16).toString("base64url")}`;
    const long = randomBytes(24).toString("hex");
    const text = [
      "Read failed for someone@example.com",
      "call +251 911 234 567",
      "from 203.0.113.7 and 2001:db8:85a3:0:0:8a2e:370:7334",
      `Authorization: Bearer ${long}`,
      `token ${token}`,
      `key ${randomBytes(20).toString("hex")}`,
      "at https://ethio.example/l/abc?ref=mail&id=9#top",
    ].join(" ");
    const cleaned = cleanMessage(text);
    expect(cleaned).toBe(
      "Read failed for <email> call <phone> from <address> and <address> Authorization: <token> " +
        "token <token> key <token> at https://ethio.example/l/abc",
    );
  });

  it("ECL-2 a message keeps what tells failures apart: words, short numbers, a time of day", () => {
    expect(cleanMessage("Read of item 123 failed at 12:30:45")).toBe(
      "Read of item 123 failed at 12:30:45",
    );
    expect(cleanMessage("  line\none\t\u0000two  ")).toBe("line one two");
  });

  it("ECL-3 a message is cut to its column by characters, never split inside one; nothing left reads as no message", () => {
    const long = "ሀ".repeat(MESSAGE_MAX + 20);
    const cleaned = cleanMessage(long);
    expect(Array.from(cleaned)).toHaveLength(MESSAGE_MAX);
    expect(cleanMessage("😀".repeat(MESSAGE_MAX + 1))).toBe("😀".repeat(MESSAGE_MAX));
    expect(cleanMessage("   \n\t ")).toBe(NO_MESSAGE);
  });

  it("ECL-4 a path holds no query, fragment, control character or address; anything not a path is the root", () => {
    expect(cleanPath("/l/some-ad?ref=x#photos")).toBe("/l/some-ad");
    expect(cleanPath("/admin/users/someone@example.com")).toBe("/admin/users/<email>");
    expect(cleanPath("/a\u0001b c")).toBe("/abc");
    expect(cleanPath("https://ethio.example/x")).toBe("/");
    expect(cleanPath("")).toBe("/");
    expect(Array.from(cleanPath(`/${"ab/".repeat(PATH_MAX)}`))).toHaveLength(PATH_MAX);
    // A long unbroken run reads as a token, in a path as in a message.
    expect(cleanPath(`/x/${"a".repeat(40)}`)).toBe("/x/<token>");
  });

  it("ECL-5 a code is kept only in its column's form", () => {
    expect(cleanCode("permissionDenied")).toBe("permissionDenied");
    expect(cleanCode(500)).toBe("500");
    expect(cleanCode("badValue:days")).toBe("badValue:days");
    expect(cleanCode("a b")).toBeNull();
    expect(cleanCode("")).toBeNull();
    expect(cleanCode(undefined)).toBeNull();
    expect(cleanCode("x".repeat(65))).toBeNull();
  });

  it("ECL-6 the place is the first frame of our own code: the browser's origin only, no query, from src/ on the server", () => {
    const browser = [
      "TypeError: x is undefined",
      "    at f (chrome-extension://abc/inject.js:1:2)",
      "    at g (https://cdn.example/lib.js:9:1)",
      "    at h (https://ethio.example/node_modules/.vite/deps/react.js?v=1:5:3)",
      "    at k (https://ethio.example/assets/index-Ab12.js?v=3:42:7)",
    ].join("\n");
    expect(cleanPlace(browser, "https://ethio.example")).toBe("/assets/index-Ab12.js:42");
    expect(cleanPlace(browser, "https://other.example")).toBeNull();
    const server = [
      "Error: boom",
      "    at x (/app/node_modules/h3/dist/index.mjs:10:2)",
      "    at y (file:///var/task/src/server/route.ts:200:9)",
    ].join("\n");
    expect(cleanPlace(server)).toBe("src/server/route.ts:200");
    expect(cleanPlace("Error: boom\n    at z (/var/task/chunks/a.mjs:3:1)")).toBe(
      "/var/task/chunks/a.mjs:3",
    );
    expect(cleanPlace(undefined)).toBeNull();
    expect(cleanPlace("no frames here")).toBeNull();
  });

  it("ECL-7 a label is cleaned and cut; an empty one is absent", () => {
    expect(cleanLabel("Chrome", 40)).toBe("Chrome");
    expect(cleanLabel("Samsung Internet ".repeat(4), 40)).toBe(
      "Samsung Internet ".repeat(3).slice(0, 40).trim(),
    );
    expect(cleanLabel("  ", 40)).toBeNull();
    expect(cleanLabel(null, 40)).toBeNull();
  });
});
