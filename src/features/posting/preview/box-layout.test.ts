import { describe, expect, it } from "vitest";

import { boxLayout } from "./box-layout";

/* LD-19 (DEC-200, bundle 19 turn 29) — all sixteen cases of
  { details, description, location, safety } give exactly the strings of the
  brief's table, written out in full here (never computed by the test). The
  medium-range classes order the seller card after Description beside
  Location; the large-range classes begin at 57.5rem. */
describe("boxLayout", () => {
  it("details true, description true, safety true, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: true })).toEqual({
      details: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      description: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description true, safety false, location true", () => {
    expect(boxLayout({ details: true, description: true, safety: false, location: true })).toEqual({
      details: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      description: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-2",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description true, safety true, location false", () => {
    expect(boxLayout({ details: true, description: true, safety: true, location: false })).toEqual({
      details: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      description: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description true, safety false, location false", () => {
    expect(boxLayout({ details: true, description: true, safety: false, location: false })).toEqual({
      details: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      description: "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:basis-full",
      location: "",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description false, safety true, location true", () => {
    expect(boxLayout({ details: true, description: false, safety: true, location: true })).toEqual({
      details: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-3",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description false, safety false, location true", () => {
    expect(boxLayout({ details: true, description: false, safety: false, location: true })).toEqual({
      details: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-3",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description false, safety true, location false", () => {
    expect(boxLayout({ details: true, description: false, safety: true, location: false })).toEqual({
      details: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details true, description false, safety false, location false", () => {
    expect(boxLayout({ details: true, description: false, safety: false, location: false })).toEqual({
      details: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:basis-full",
      location: "",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description true, safety true, location true", () => {
    expect(boxLayout({ details: false, description: true, safety: true, location: true })).toEqual({
      details: "",
      description: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-3",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description true, safety false, location true", () => {
    expect(boxLayout({ details: false, description: true, safety: false, location: true })).toEqual({
      details: "",
      description: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-3",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-3",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description true, safety true, location false", () => {
    expect(boxLayout({ details: false, description: true, safety: true, location: false })).toEqual({
      details: "",
      description: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description true, safety false, location false", () => {
    expect(boxLayout({ details: false, description: true, safety: false, location: false })).toEqual({
      details: "",
      description: "@2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:basis-full",
      location: "",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description false, safety true, location true", () => {
    expect(boxLayout({ details: false, description: false, safety: true, location: true })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description false, safety false, location true", () => {
    expect(boxLayout({ details: false, description: false, safety: false, location: true })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "@2xl:@max-[57.5rem]:order-2 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description false, safety true, location false", () => {
    expect(boxLayout({ details: false, description: false, safety: true, location: false })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]",
      location: "",
      safety: "@2xl:@max-[57.5rem]:order-3 @2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)] @min-[57.5rem]:col-span-6",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });

  it("details false, description false, safety false, location false", () => {
    expect(boxLayout({ details: false, description: false, safety: false, location: false })).toEqual({
      details: "",
      description: "",
      seller: "@2xl:@max-[57.5rem]:order-1 @2xl:@max-[57.5rem]:basis-full",
      location: "",
      safety: "",
      report: "@2xl:@max-[57.5rem]:order-4 @2xl:@max-[57.5rem]:basis-full @min-[57.5rem]:col-span-6",
    });
  });
});
