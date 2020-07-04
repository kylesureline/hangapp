import { formatWordObj } from "./";

describe("formatWordObj()", () => {
  it("formats correctly without a definition", () => {
    const word = "hockey";
    const wordType = "";
    const def = "";
    const wordObj = formatWordObj(word);

    expect(wordObj).toEqual({
      words: [word],
      wordType,
      def
    });
  });
  it("formats correctly with a definition", () => {
    const word = "hockey";
    const wordType = "noun";
    const def = `a game played on an ice rink in which two teams of six players on skates use curved sticks to try to shoot a puck into the opponent's goal`;
    const wordObj = formatWordObj(word, wordType, def);

    expect(wordObj).toEqual({
      words: [word],
      wordType,
      def
    });
  });
});
