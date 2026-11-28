import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import {
  AttributeNumberFields,
  AttributeTextFields,
  type NumberFieldsValue,
  type TextFieldsValue,
} from "./attribute-v2-fields";
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
function Fields() {
  const [number, setNumber] = useState<NumberFieldsValue>({
    unit: "",
    unitAm: "",
    min: "",
    max: "",
    decimals: "",
    format: "",
  });
  const [text, setText] = useState<TextFieldsValue>({
    preset: "",
    presetN: "",
    presetA: "",
    presetB: "",
    maxLength: "",
  });
  return (
    <>
      <AttributeNumberFields value={number} onChange={setNumber} />
      <AttributeTextFields value={text} onChange={setText} />
    </>
  );
}
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
afterEach(() => {
  cleanup();
  localStorage.clear();
});
it("UFA-58 number and text controls retain typed answers; year locks decimals; all presets show their own fields uf:A19.6", () => {
  render(<Fields />);
  for (const [key, value] of [
    ["unit", "kg"],
    ["unitAm", "unit"],
    ["min", "1"],
    ["max", "9"],
  ] as const) {
    const input = screen.getByRole("textbox", {
      name: `${en[`admin.attributes.field.${key}`]}${en["post.optional"]}`,
    });
    input.focus();
    fireEvent.change(input, { target: { value } });
    expect(input).toHaveValue(value);
  }
  const format = screen.getByRole("combobox", {
    name: `${en["admin.attributes.field.format"]}${en["post.optional"]}`,
  });
  for (const key of ["none", "plain", "year"] as const)
    expect(
      within(format).getByRole("option", { name: en[`admin.attributes.format.${key}`] }),
    ).toBeInTheDocument();
  const decimals = screen.getByRole("combobox", {
    name: `${en["admin.attributes.field.decimals"]}${en["post.optional"]}`,
  });
  expect(
    within(decimals)
      .getAllByRole("option")
      .map((option) => option.getAttribute("value")),
  ).toEqual(["", "0", "1", "2", "3"]);
  fireEvent.change(decimals, { target: { value: "2" } });
  expect(decimals).toHaveValue("2");
  fireEvent.change(format, { target: { value: "year" } });
  expect(decimals).toHaveValue("0");
  expect(decimals).toBeDisabled();
  expect(screen.getByText(en["admin.attributes.field.decimalsYear"])).toBeVisible();
  fireEvent.change(format, { target: { value: "plain" } });
  expect(decimals).toBeEnabled();
  const preset = screen.getByRole("combobox", {
    name: `${en["admin.attributes.field.preset"]}${en["post.optional"]}`,
  });
  for (const key of ["none", "digits", "vin", "plateEt", "alnum", "free"] as const)
    expect(
      within(preset).getByRole("option", { name: en[`admin.attributes.preset.${key}`] }),
    ).toBeInTheDocument();
  fireEvent.change(preset, { target: { value: "digits" } });
  const length = screen.getByRole("textbox", {
    name: `${en["admin.attributes.field.presetN"]}${en["post.optional"]}`,
  });
  fireEvent.change(length, { target: { value: "6" } });
  expect(length).toHaveValue("6");
  fireEvent.change(preset, { target: { value: "alnum" } });
  expect(
    screen.queryByRole("textbox", {
      name: `${en["admin.attributes.field.presetN"]}${en["post.optional"]}`,
    }),
  ).toBeNull();
  for (const [key, value] of [
    ["presetA", "2"],
    ["presetB", "8"],
  ] as const) {
    const input = screen.getByRole("textbox", {
      name: `${en[`admin.attributes.field.${key}`]}${en["post.optional"]}`,
    });
    fireEvent.change(input, { target: { value } });
    expect(input).toHaveValue(value);
  }
  fireEvent.change(preset, { target: { value: "free" } });
  expect(
    screen.getByRole("textbox", {
      name: `${en["admin.attributes.field.presetN"]}${en["post.optional"]}`,
    }),
  ).toHaveValue("");
  expect(
    screen.queryByRole("textbox", {
      name: `${en["admin.attributes.field.presetA"]}${en["post.optional"]}`,
    }),
  ).toBeNull();
  for (const choice of ["vin", "plate-et", ""]) {
    fireEvent.change(preset, { target: { value: choice } });
    expect(preset).toHaveValue(choice);
    expect(
      screen.queryByRole("textbox", {
        name: `${en["admin.attributes.field.presetN"]}${en["post.optional"]}`,
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("textbox", {
        name: `${en["admin.attributes.field.presetA"]}${en["post.optional"]}`,
      }),
    ).toBeNull();
    expect(
      screen.queryByRole("textbox", {
        name: `${en["admin.attributes.field.presetB"]}${en["post.optional"]}`,
      }),
    ).toBeNull();
  }
  const maximum = screen.getByRole("textbox", {
    name: `${en["admin.attributes.field.maxLength"]}${en["post.optional"]}`,
  });
  fireEvent.change(maximum, { target: { value: "40" } });
  expect(maximum).toHaveValue("40");
});
