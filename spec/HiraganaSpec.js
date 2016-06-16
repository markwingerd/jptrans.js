describe("Hiragana", function() {
  it("basic Romanji to Hiragana (2 letters per syllable)", function() {
    expect(translate("mimasu")).toEqual("みます");
  });
});
