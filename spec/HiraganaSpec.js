describe("Hiragana", function() {
  it("handles basic Hiragana rules", function() {
    expect(translate("mimasu")).toEqual("みます");
    expect(translate("ocha")).toEqual("おちゃ");
  });

  it("handles the n character", function() {
    expect(translate("mimasen")).toEqual("みません");
    expect(translate("nyan")).toEqual("にゃん");
    expect(translate("nihon")).toEqual("にほん")
  });

  it("handles double O characters", function() {
    expect(translate("Tookyoo")).toEqual("とうきょう");
  });

  it("handles double consonants", function() {
    expect(translate("matte")).toEqual("まって");
  });

  it("handles multiple words", function() {
    expect(translate("watakushi no nihongo")).toEqual("わたくし の にほんご");
  });

  it("handles punctuation", function() {
    expect(translate("Okaeri nasai.")).toEqual("おかえり なさい。");
  });

  it("handles particles with special rules", function() {
    expect(translate("Kuni wa Amerika desu.")).toEqual("くに は あめりか です。");
    expect(translate("Chotto ocha o nomimasen ka?")).toEqual("ちょっと おちゃ を のみません か?");
  });
});
