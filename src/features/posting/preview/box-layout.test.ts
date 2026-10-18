import { describe, expect, it } from "vitest";

import { boxLayout } from "./box-layout";

/* LD-19 (DEC-192, bundle 19 turns 22–23) — all sixteen cases of
  { details, description, safety, location } give exactly the strings of the
  brief's table, written out in full here (never computed by the test). */
describe("boxLayout", () => {
  it("details true, description true, safety true, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: true })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description true, safety true, location false", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: false })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2",
      location: "",
      safety: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description true, safety false, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: false, location: true })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description true, safety false, location false", () => {
    expect(boxLayout({ details: true, description: true, safety: false, location: false })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-6 @4xl:order-3 @4xl:col-span-2",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description false, safety true, location true", () => {
    expect(boxLayout({ details: true, description: false, safety: true, location: true })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description false, safety true, location false", () => {
    expect(boxLayout({ details: true, description: false, safety: true, location: false })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "",
      safety: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description false, safety false, location true", () => {
    expect(boxLayout({ details: true, description: false, safety: false, location: true })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details true, description false, safety false, location false", () => {
    expect(boxLayout({ details: true, description: false, safety: false, location: false })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-6 @4xl:order-3 @4xl:col-span-3",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description true, safety true, location true", () => {
    expect(boxLayout({ details: false, description: true, safety: true, location: true })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description true, safety true, location false", () => {
    expect(boxLayout({ details: false, description: true, safety: true, location: false })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "",
      safety: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description true, safety false, location true", () => {
    expect(boxLayout({ details: false, description: true, safety: false, location: true })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description true, safety false, location false", () => {
    expect(boxLayout({ details: false, description: true, safety: false, location: false })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-6 @4xl:order-3 @4xl:col-span-3",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description false, safety true, location true", () => {
    expect(boxLayout({ details: false, description: false, safety: true, location: true })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description false, safety true, location false", () => {
    expect(boxLayout({ details: false, description: false, safety: true, location: false })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6",
      location: "",
      safety: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description false, safety false, location true", () => {
    expect(boxLayout({ details: false, description: false, safety: false, location: true })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("details false, description false, safety false, location false", () => {
    expect(boxLayout({ details: false, description: false, safety: false, location: false })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-6 @4xl:order-3 @4xl:col-span-6",
      location: "",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });


});
