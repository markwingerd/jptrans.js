describe("Hiragana", function() {
  it("handles 2 letters per syllable", function() {
    expect(translate("mimasu")).toEqual("みます");
  });

  it("handles the n character", function() {
    expect(translate("mimasen")).toEqual("みません");
  });
});
