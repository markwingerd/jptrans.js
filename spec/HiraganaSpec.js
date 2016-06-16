describe("Hiragana", function() {
  it("handles basic Hiragana rules", function() {
    expect(translate("mimasu")).toEqual("みます");
    expect(translate("ocha")).toEqual("おちゃ");
  });

  it("handles the n character", function() {
    expect(translate("mimasen")).toEqual("みません");
    expect(translate("nyan")).toEqual("にゃん");
  });

  it("handles double O characters", function() {
    expect(translate("Tookyoo")).toEqual("とうきょう");
  });
});
