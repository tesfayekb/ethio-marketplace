import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const mapState = vi.hoisted(() => ({
  click: undefined as ((event: { latlng: { lat: number; lng: number } }) => void) | undefined,
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./geocode", () => ({
  reverseStreet: async () => ({ street: null }),
  readOutline: async () => null,
  searchPlaces: async () => ({ results: [], reason: null }),
}));
vi.mock("./leaflet", async (original) => {
  const real = await original<typeof import("./leaflet")>();
  const map = {
    on: (name: string, action: typeof mapState.click) => {
      if (name === "click") mapState.click = action;
    },
    getZoom: () => 16,
    getCenter: () => ({ lat: 9, lng: 38 }),
    remove: vi.fn(),
  };
  const marker = { addTo: () => marker, on: vi.fn(), setLatLng: vi.fn() };
  return {
    ...real,
    loadLeaflet: async () => ({
      map: () => map,
      marker: () => marker,
      latLng: () => ({ distanceTo: () => 0 }),
      circle: () => ({ addTo: vi.fn() }),
    }),
    loadTilePlan: async () => ({ plan: real.OSM_PLAN, reason: null }),
    addTileLayers: () => [],
    pinIcon: () => ({}),
  };
});
import { MapPinDropper, type PinValue } from "./map-pin-dropper";

afterEach(() => vi.restoreAllMocks());

async function draw(saved: PinValue | null = null, onSave = vi.fn(async () => true)) {
  render(
    <MapPinDropper
      saved={saved}
      place={{ lat: 9, lng: 38, level: "city", query: null }}
      note=""
      onNote={vi.fn()}
      onSave={onSave}
      onClose={vi.fn()}
    />,
  );
  await waitFor(() =>
    expect(screen.getByTestId("post-pin-map")).toHaveAttribute("data-ready", "1"),
  );
  return onSave;
}
function place() {
  act(() => mapState.click?.({ latlng: { lat: 9.1, lng: 38.2 } }));
}

it("PGT-U1 no placed pin keeps Save closed; a press brings the map into view and writes nothing", async () => {
  const save = await draw();
  const map = screen.getByTestId("post-pin-map");
  const scroll = vi.fn();
  Object.defineProperty(map, "scrollIntoView", { configurable: true, value: scroll });
  const button = screen.getByTestId("post-pin-save");
  expect(button).not.toBeDisabled();
  expect(button).toHaveAttribute("data-closed", "1");
  expect(button).toHaveAccessibleDescription("post.pin.placeFirst");
  fireEvent.click(button);
  expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
  expect(save).not.toHaveBeenCalled();
});

it("PGT-U2 a new placed pin needs an explicit precision; pressing Save marks and reveals that choice", async () => {
  const save = await draw();
  place();
  const exact = screen.getByTestId("post-pin-precision-exact");
  const approx = screen.getByTestId("post-pin-precision-approx");
  expect(exact).not.toBeChecked();
  expect(approx).not.toBeChecked();
  const group = exact.closest("fieldset");
  if (!group) throw new Error("missing precision group");
  const scroll = vi.fn();
  Object.defineProperty(group, "scrollIntoView", { configurable: true, value: scroll });
  const button = screen.getByTestId("post-pin-save");
  expect(button).toHaveAccessibleDescription("post.pin.chooseShow");
  fireEvent.click(button);
  expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
  expect(exact).toHaveFocus();
  expect(screen.getAllByTestId("post-required-mark")).toHaveLength(2);
  expect(save).not.toHaveBeenCalled();
  fireEvent.click(approx);
  await act(async () => fireEvent.click(button));
  expect(save).toHaveBeenCalledWith({ lat: 9.1, lng: 38.2, precision: "approx", zoom: 16 });
});

it("PGT-U3 a saved pin is never gated and retains its precision", async () => {
  const save = await draw({ lat: 9.1, lng: 38.2, precision: "exact", street: null });
  const button = screen.getByTestId("post-pin-save");
  expect(button).not.toHaveAttribute("data-closed");
  expect(screen.getByTestId("post-pin-precision-exact")).toBeChecked();
  await act(async () => fireEvent.click(button));
  expect(save).toHaveBeenCalledWith({ lat: 9.1, lng: 38.2, precision: "exact", zoom: 16 });
});

it("PGT-U4 a pending save disables Save and refuses a second write", async () => {
  let finish: ((value: boolean) => void) | undefined;
  const save = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        finish = resolve;
      }),
  );
  await draw({ lat: 9.1, lng: 38.2, precision: "approx", street: null }, save);
  const button = screen.getByTestId("post-pin-save");
  fireEvent.click(button);
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("aria-busy", "true");
  fireEvent.click(button);
  expect(save).toHaveBeenCalledTimes(1);
  await act(async () => finish?.(true));
  expect(button).not.toBeDisabled();
});
