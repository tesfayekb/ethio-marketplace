import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { StepPhotos } from "./step-photos";

vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));
vi.mock("./use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("./photo-editor", () => ({ PhotoEditor: () => null }));
vi.mock("./background-dialog", () => ({ BackgroundDialog: () => null }));
vi.mock("./posting-service", () => ({ heldWithAd: () => false }));
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
