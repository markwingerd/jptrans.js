describe("Hiragana", function() {
  it("handles basic Hiragana rules", function() {
    expect(jptrans.translate("mimasu")).toEqual("みます");
    expect(jptrans.translate("ocha")).toEqual("おちゃ");
  });

  it("handles the n character", function() {
    expect(jptrans.translate("mimasen")).toEqual("みません");
    expect(jptrans.translate("nyan")).toEqual("にゃん");
    expect(jptrans.translate("nihon")).toEqual("にほん")
  });

  it("handles double O characters", function() {
    expect(jptrans.translate("Tookyoo")).toEqual("とうきょう");
  });

  it("handles double consonants", function() {
    expect(jptrans.translate("matte")).toEqual("まって");
  });

  it("handles multiple words", function() {
    expect(jptrans.translate("watakushi no nihongo")).toEqual("わたくし の にほんご");
  });

  it("handles punctuation", function() {
    expect(jptrans.translate("Okaeri nasai.")).toEqual("おかえり なさい。");
  });

  it("handles particles with special rules", function() {
    expect(jptrans.translate("Kuni wa Amerika desu.")).toEqual("くに は あめりか です。");
    expect(jptrans.translate("Chotto ocha o nomimasen ka?")).toEqual("ちょっと おちゃ を のみません か?");
  });

  it("fails gracefully", function() {
    expect(jptrans.translate("Konnifdschiwa")).toEqual("こんにFDSちわ");
  });
});
