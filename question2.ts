function getQuestionPart(phrases : string[]) : string[] {
  const substring = findSubstring(phrases);

  return phrases.map((string) => string.replace(substring, '').trim())
}

// find common substring in the given phrases
function findSubstring(strings: string[]): string {
  strings.sort((a,b) => a.length - b.length)
  const firstString = strings[0];
  let subString = "";

  for (let i = 0; i < firstString.length; i++) {
      for (let j = i + 1; j <= firstString.length; j++) {
          const s = firstString.substring(i, j);

          let isCommon = true;
          for (const element of strings) {
              if (!element.includes(s)) {
                  isCommon = false;
                  break;
              }
          }

          if (isCommon && s.length > subString.length) {
              subString = s;
          }
      }
  }

  return subString;
}

console.log(getQuestionPart(["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"])); // [ 'BE', 'GIRL', 'SHIP' ]
console.log(getQuestionPart(["BATHROOM", "BATH SALTS", "BLOODBATH"])) // [ 'ROOM', 'SALTS', 'BLOOD' ]
