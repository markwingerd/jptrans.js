describe("Hiragana", function() {
  it("handles basic Hiragana rules", function() {
    expect(translate("mimasu")).toEqual("みます");
    expect(translate("ocha")).toEqual("おちゃ");
  });

  it("handles the n character", function() {
    expect(translate("mimasen")).toEqual("みません");
  });
});
