import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { draftRefusalText } from "./refusal-text";
import { StepPhotos } from "./step-photos";

vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
}));
vi.mock("./use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("./photo-editor", () => ({ PhotoEditor: () => null }));
vi.mock("./background-dialog", () => ({ BackgroundDialog: () => null }));
const refusal = vi.hoisted(() => ({ reason: "photoGone" }));
vi.mock("./posting-service", () => ({
  heldWithAd: () => false,
  deletePhoto: async () => ({ ok: false, refusals: [{ reason: refusal.reason }] }),
}));
afterEach(cleanup);
const props = {
  listingId: "scratch",
  photos: [],
  onChanged: vi.fn(),
  illustrationUrl: null,
  videoUrl: "",
  videoRefusal: null,
  onChangeVideo: vi.fn(),
  maxPhotos: 10,
};
it("holds photo addition while a statement is owed", () => {
  render(<StepPhotos {...props} waitForStatement />);
  expect(screen.getByTestId("post-photos-add")).toBeDisabled();
  expect(screen.getByTestId("post-photos-certify-wait")).toBeVisible();
});
it("keeps photo addition available when the option is absent", () => {
  render(<StepPhotos {...props} />);
  expect(screen.getByTestId("post-photos-add")).toBeEnabled();
  expect(screen.queryByTestId("post-photos-certify-wait")).toBeNull();
});

it("UFW-9 a stored photo row shows every refused reason in words uf:S7s2.5", async () => {
  words.real = true;
  for (const [reason, key] of [
    ["unsupportedFormat", "post.photo.refusal.unsupportedFormat"],
    ["tooLarge", "post.photo.refusal.tooLarge"],
    ["tooManyPhotos", "post.photo.refusal.tooManyPhotos"],
    ["nudity", "post.photo.refusal.nudity"],
    ["violence", "post.photo.refusal.violence"],
    ["weapon", "post.photo.refusal.weapon"],
    ["drugs", "post.photo.refusal.drugs"],
    ["hate_symbol", "post.photo.refusal.hate_symbol"],
    ["personal_document", "post.photo.refusal.personal_document"],
    ["contact_in_image", "post.photo.refusal.contact_in_image"],
    ["stock_watermark", "post.photo.refusal.stock_watermark"],
    ["not_a_photo", "post.photo.refusal.not_a_photo"],
    ["rateLimited", "post.photo.refusal.rateLimited"],
    ["publishFirst", "post.photo.refusal.publishFirst"],
    ["photoGone", "post.photo.refusal.photoGone"],
  ] as const) {
    refusal.reason = reason;
    render(
      <StepPhotos
        {...props}
        photos={[{ id: "photo-1", storagePath: "scratch", displayOrder: 0, paths: null }]}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: en["post.photos.remove"] }));
    });
    expect(screen.getByTestId("post-photo-state")).toHaveTextContent(en[key]);
    cleanup();
  }
  words.real = false;
});
it("UFW-10 a refused photos-soon tick says it was not saved uf:S7s2.14", async () => {
  words.real = true;
  const save = vi.fn(async () => ({ ok: false as const, refusal: null }));
  render(<StepPhotos {...props} onPhotosSoon={save} />);
  fireEvent.click(screen.getByRole("checkbox", { name: en["post.photos.soonTick"] }));
  expect(await screen.findByTestId("post-photos-soon-failed")).toHaveTextContent(
    en["post.photos.soonFailed"],
  );
  expect(save).toHaveBeenCalledExactlyOnceWith(true);
  words.real = false;
});
it("UFW-11 the photos screen uses Amharic catalogue words uf:S7s2.16", () => {
  words.real = true;
  words.amharic = true;
  render(<StepPhotos {...props} />);
  expect(screen.getByRole("button", { name: am["post.photos.add"] })).toBeVisible();
  expect(screen.getByText(am["post.photos.none"])).toBeVisible();
  if (am["post.photos.none"] !== en["post.photos.none"])
    expect(screen.queryByText(en["post.photos.none"])).not.toBeInTheDocument();
  words.real = false;
  words.amharic = false;
});

const RESET = "2030-01-01T00:00:00.000Z";
async function tickSoon(answer: { ok: false; refusal: string | null }) {
  words.real = true;
  const save = vi.fn(async () => answer);
  render(<StepPhotos {...props} onPhotosSoon={save} />);
  fireEvent.click(screen.getByRole("checkbox", { name: en["post.photos.soonTick"] }));
  const line = await screen.findByTestId("post-photos-soon-failed");
  words.real = false;
  return line;
}
it("SPSF-1 a refused photos-soon tick that named a code is worded by the posting family (Cursor 8c-3a ruling 1)", async () => {
  const line = await tickSoon({ ok: false, refusal: "photosSoonNotEditable" });
  expect(line).toHaveTextContent(en["post.refusal.photosSoonNotEditable"]);
  expect(line).not.toHaveTextContent(en["post.photos.soonFailed"]);
});
it("SPSF-2 the draft dial's refusal of the tick says its words with when it opens again", async () => {
  const refusal = `rateLimited:${RESET}`;
  const line = await tickSoon({ ok: false, refusal });
  expect(line).toHaveTextContent(
    draftRefusalText(refusal, (key) => ownValue(en, key) ?? key, "en"),
  );
  expect(line).not.toHaveTextContent(en["post.photos.soonFailed"]);
});
it("SPSF-3 a failure that names no code keeps the line's own words", async () => {
  const line = await tickSoon({ ok: false, refusal: null });
  expect(line).toHaveTextContent(en["post.photos.soonFailed"]);
});
