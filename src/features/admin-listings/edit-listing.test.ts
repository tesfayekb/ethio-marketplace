
describe("the seller's edit, complete (bundle 16 turn E2b, D187)", () => {
  const phone = { value: "+251911000000", show: true };
  const own = () => ({
    ...listing(),
    videoUrl: null,
    coverage: ["city-1", "city-2"],
    contactPref: { messages: true, phone },
    streetAddress: "Bole, 2nd floor",
    directions: null,
  });

  it("LE-8 the form opens on the ad's places, channels and text lines; the admin's detail has none", () => {
    const values = valuesOf(own(), null);
    expect(values.coverage).toEqual(["city-1", "city-2"]);
    expect(values.contactPref).toEqual({ messages: true, phone });
    expect(values.streetAddress).toBe("Bole, 2nd floor");
    expect(values.directions).toBe("");
    const admin = valuesOf(listing(), null);
    expect(admin.coverage).toEqual([]);
    expect(admin.contactPref).toEqual({});
    expect(admin.streetAddress).toBe("");
    expect(editChanges(own(), values)).toBeNull();
  });

  it("LE-9 the places travel only when the list differs AND the seller worked in the Place box", () => {
    const values = valuesOf(own(), null);
    const reordered = { ...values, coverage: ["city-2", "city-1"] };
    // The place step settles its rows on its own: a list that changed with no work in the box is not sent.
    expect(editChanges(own(), reordered)).toBeNull();
    expect(editChanges(own(), reordered, false, { place: false })).toBeNull();
    expect(editChanges(own(), reordered, false, { place: true })).toEqual({
      coverage: ["city-2", "city-1"],
    });
    // The same list in the same order is never sent, worked in or not.
    expect(editChanges(own(), values, false, { place: true })).toBeNull();
    expect(
      editChanges(own(), { ...values, coverage: ["city-1", "city-2", "city-3"] }, false, {
        place: true,
      }),
    ).toEqual({ coverage: ["city-1", "city-2", "city-3"] });
  });

  it("LE-10 the channels travel only when they differ (value or show) AND the seller worked in the Contact box", () => {
    const values = valuesOf(own(), null);
    const hidden = { ...values, contactPref: { messages: true, phone: { ...phone, show: false } } };
    expect(editChanges(own(), hidden)).toBeNull();
    expect(editChanges(own(), hidden, false, { contact: true })).toEqual({
      contact_pref: { messages: true, phone: { ...phone, show: false } },
    });
    // The profile's carry rewrites the object in the same channels: not a change.
    const sameChannels = { ...values, contactPref: { phone, messages: true, carried: true } };
    expect(editChanges(own(), sameChannels, false, { contact: true })).toBeNull();
    const whatsapp = {
      ...values,
      contactPref: { ...values.contactPref, whatsapp: { value: "+251911000000", show: true } },
    };
    expect(editChanges(own(), whatsapp, false, { contact: true })).toEqual({
      contact_pref: whatsapp.contactPref,
    });
  });

  it("LE-11 a changed street or directions line travels trimmed; an emptied line is removed; untouched lines are not sent", () => {
    const values = valuesOf(own(), null);
    expect(editChanges(own(), { ...values, streetAddress: "  Bole, 2nd floor " })).toBeNull();
    expect(editChanges(own(), { ...values, directions: "Behind the bank" })).toEqual({
      directions: "Behind the bank",
    });
    expect(editChanges(own(), { ...values, streetAddress: " " })).toEqual({
      street_address: null,
    });
    expect(
      editChanges(own(), { ...values, streetAddress: "Kazanchis", directions: " Gate 3 " }),
    ).toEqual({ street_address: "Kazanchis", directions: "Gate 3" });
    // The lines ride with the other fields in one change set.
    expect(
      editChanges(own(), { ...values, title: "Samsung fridge 300L", directions: "Gate 3" }),
    ).toEqual({ title: "Samsung fridge 300L", directions: "Gate 3" });
  });
});
