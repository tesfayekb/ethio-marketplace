import { describe, expect, it } from "vitest";

import { boxLayout } from "./box-layout";

/* LD-19 (DEC-192, bundle 19 turn 22) — all eight cases of
  { details, description, safety } give exactly the strings of the brief's
  table, written out in full here (never computed by the test). */
describe("boxLayout", () => {
  it("details, description and the safety box all show", () => {
    expect(boxLayout({ details: true, description: true, safety: true })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("a sold ad: no safety box, so Location takes the whole row", () => {
    expect(boxLayout({ details: true, description: true, safety: false })).toEqual({
      details: "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2",
      description: "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("no description: Details and the seller card share the row in halves", () => {
    expect(boxLayout({ details: true, description: false, safety: true })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("no description and no safety box", () => {
    expect(boxLayout({ details: true, description: false, safety: false })).toEqual({
      details: "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("no facts: Description and the seller card share the row in halves", () => {
    expect(boxLayout({ details: false, description: true, safety: true })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("no facts and no safety box", () => {
    expect(boxLayout({ details: false, description: true, safety: false })).toEqual({
      details: "",
      description: "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("neither facts nor description: the seller card is alone in its row", () => {
    expect(boxLayout({ details: false, description: false, safety: true })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6",
      location: "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5",
      safety: "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });

  it("neither facts nor description, and a sold ad", () => {
    expect(boxLayout({ details: false, description: false, safety: false })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6",
      location: "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5",
      safety: "",
      report: "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6",
    });
  });
});
