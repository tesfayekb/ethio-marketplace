import { describe, expect, it } from "vitest";

import { boxLayout } from "./box-layout";

/* LD-19 (DEC-197, bundle 19 turn 27) — all sixteen cases of
  { details, description, location, safety } give exactly the strings of the
  brief's table, written out in full here (never computed by the test). The
  seller card is no longer in the grid; the DOM order is the order, so no
  order classes remain. */
describe("boxLayout", () => {
  it("details true, description true, safety true, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: true })).toEqual({
      details: "@2xl:col-span-3 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:col-span-2",
      location: "@2xl:col-span-3 @4xl:col-span-2",
      safety: "@2xl:col-span-3 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description true, safety true, location false", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: false })).toEqual({
      details: "@2xl:col-span-3 @4xl:col-span-3",
      description: "@2xl:col-span-3 @4xl:col-span-3",
      location: "",
      safety: "@2xl:col-span-6 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description true, safety false, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: false, location: true })).toEqual({
      details: "@2xl:col-span-3 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:col-span-2",
      location: "@2xl:col-span-6 @4xl:col-span-2",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description true, safety false, location false", () => {
    expect(
      boxLayout({ details: true, description: true, safety: false, location: false }),
    ).toEqual({
      details: "@2xl:col-span-3 @4xl:col-span-3",
      description: "@2xl:col-span-3 @4xl:col-span-3",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description false, safety true, location true", () => {
    expect(boxLayout({ details: true, description: false, safety: true, location: true })).toEqual({
      details: "@2xl:col-span-6 @4xl:col-span-3",
      description: "",
      location: "@2xl:col-span-3 @4xl:col-span-3",
      safety: "@2xl:col-span-3 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description false, safety true, location false", () => {
    expect(
      boxLayout({ details: true, description: false, safety: true, location: false }),
    ).toEqual({
      details: "@2xl:col-span-6 @4xl:col-span-6",
      description: "",
      location: "",
      safety: "@2xl:col-span-6 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description false, safety false, location true", () => {
    expect(
      boxLayout({ details: true, description: false, safety: false, location: true }),
    ).toEqual({
      details: "@2xl:col-span-6 @4xl:col-span-3",
      description: "",
      location: "@2xl:col-span-6 @4xl:col-span-3",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details true, description false, safety false, location false", () => {
    expect(
      boxLayout({ details: true, description: false, safety: false, location: false }),
    ).toEqual({
      details: "@2xl:col-span-6 @4xl:col-span-6",
      description: "",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description true, safety true, location true", () => {
    expect(boxLayout({ details: false, description: true, safety: true, location: true })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-3",
      safety: "@2xl:col-span-3 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description true, safety true, location false", () => {
    expect(
      boxLayout({ details: false, description: true, safety: true, location: false }),
    ).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:col-span-6",
      location: "",
      safety: "@2xl:col-span-6 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description true, safety false, location true", () => {
    expect(
      boxLayout({ details: false, description: true, safety: false, location: true }),
    ).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:col-span-3",
      location: "@2xl:col-span-6 @4xl:col-span-3",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description true, safety false, location false", () => {
    expect(
      boxLayout({ details: false, description: true, safety: false, location: false }),
    ).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:col-span-6",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description false, safety true, location true", () => {
    expect(
      boxLayout({ details: false, description: false, safety: true, location: true }),
    ).toEqual({
      details: "",
      description: "",
      location: "@2xl:col-span-3 @4xl:col-span-6",
      safety: "@2xl:col-span-3 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description false, safety true, location false", () => {
    expect(
      boxLayout({ details: false, description: false, safety: true, location: false }),
    ).toEqual({
      details: "",
      description: "",
      location: "",
      safety: "@2xl:col-span-6 @4xl:col-span-6",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description false, safety false, location true", () => {
    expect(
      boxLayout({ details: false, description: false, safety: false, location: true }),
    ).toEqual({
      details: "",
      description: "",
      location: "@2xl:col-span-6 @4xl:col-span-6",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });

  it("details false, description false, safety false, location false", () => {
    expect(
      boxLayout({ details: false, description: false, safety: false, location: false }),
    ).toEqual({
      details: "",
      description: "",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6",
    });
  });
});
