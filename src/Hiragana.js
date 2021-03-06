var jptrans = (function() {
  var vowel = ['A', 'I', 'U', 'E', 'O']
  var hiraganaHash = {  'A':  'あ', 'I':  'い', 'U':  'う', 'E':  'え', 'O':  'お',
                        'KA': 'か', 'KI': 'き', 'KU': 'く', 'KE': 'け', 'KO': 'こ',
                        'GA': 'が', 'GI': 'ぎ', 'GU': 'ぐ', 'GE': 'げ', 'GO': 'ご',
                        'SA': 'さ', 'SHI':'し', 'SU': 'す', 'SE': 'せ', 'SO': 'そ',
                        'ZA': 'ざ', 'JI': 'じ', 'ZU': 'ず', 'ZE': 'ぜ', 'ZO': 'ぞ',
                        'TA': 'た', 'CHI':'ち', 'TSU':'つ', 'TE': 'て', 'TO': 'と',
                        'DA': 'だ', 'DI': 'ぢ', 'DU': 'づ', 'DE': 'で', 'DO': 'ど',
                        'NA': 'な', 'NI': 'に', 'NU': 'ぬ', 'NE': 'ね', 'NO': 'の',
                        'HA': 'は', 'HI': 'ひ', 'FU': 'ふ', 'HE': 'へ', 'HO': 'ほ',
                        'BA': 'ば', 'BI': 'び', 'BU': 'ぶ', 'BE': 'べ', 'BO': 'ぼ',
                        'PA': 'ぱ', 'PI': 'ぴ', 'PU': 'ぷ', 'PE': 'ぺ', 'PO': 'ぽ',
                        'MA': 'ま', 'MI': 'み', 'MU': 'む', 'ME': 'め', 'MO': 'も',
                        'YA': 'や',             'YU': 'ゆ',            'YO': 'よ',
                        'RA': 'ら', 'RI': 'り', 'RU': 'る', 'RE': 'れ', 'RO': 'ろ',
                        'WA': 'わ',                                    'WO': 'を',
                        'stsu': 'っ',                                  'N':  'ん',
                        'KYA': 'きゃ', 'KYU': 'きゅ', 'KYO': 'きょ',
                        'SHA': 'しゃ', 'SHU': 'しゅ', 'SHO': 'しょ',
                        'CHA': 'ちゃ', 'CHU': 'ちゅ', 'CHO': 'ちょ',
                        'NYA': 'にゃ', 'NYU': 'にゅ', 'NYO': 'にょ',
                        'HYA': 'ひゃ', 'HYU': 'ひゅ', 'HYO': 'ひょ',
                        'MYA': 'みゃ', 'MYU': 'みゅ', 'MYO': 'みょ',
                        'RYA': 'りゃ', 'RYU': 'りゅ', 'RYO': 'りょ',
                        'GYA': 'ぎゃ', 'GYU': 'ぎゅ', 'GYO': 'ぎょ',
                        'JA':  'じゃ', 'JU':  'じゅ', 'JO':  'じょ',
                        'BYA': 'びゃ', 'BYU': 'びゅ', 'BYO': 'びょ',
                        'PYA': 'ぴゃ', 'PYU': 'ぴゅ', 'PYO': 'ぴょ',
                        '.':   '。',   '!':   '!',   '?':   '?',
                      }

  var translate = function(romanji) {
    var hiragana = '';
    var currentSyllable = '';

    romanji = convertParticles(romanji.toUpperCase());
    romanji = romanji.split('');
    romanji = convertDoubleO(romanji);

    romanji.forEach(function(char, idx) {
      currentSyllable += char;

      if (isDoubleConsonant(currentSyllable)) {
        hiragana += hiraganaHash['stsu'] ||
                    handleBadSyllable(currentSyllable);
        currentSyllable = currentSyllable[1];
      }

      if (isVowel(char)) {
        hiragana += getOpenSyllable(currentSyllable, romanji, idx) ||
                    handleBadSyllable(currentSyllable);
        currentSyllable = '';
      }

      if (isClosedSyllable(romanji, idx)) {
        hiragana += getClosedSyllable(currentSyllable, romanji, idx) ||
                    handleBadSyllable(currentSyllable);
        currentSyllable = '';
      }

      if (char == ' ') {
        hiragana += ' ';
        currentSyllable = '';
      }

      if (isPunctuation(char)) {
        hiragana += hiraganaHash[char];
        currentSyllable = '';
      }
    });

    return hiragana;
  };

  function getOpenSyllable(syllable, romanji, idx) {
    return hiraganaHash[syllable];
  };

  function getClosedSyllable(syllable, romanji, idx) {
    if (isEndOfWord(romanji, idx)) {
      return hiraganaHash[syllable];
    }
    if (isNotVowel(romanji[idx+1]) && (romanji[idx+1] != 'Y')) {
      return hiraganaHash[syllable];
    }
    return '';
  };

  // Helper functions

  function isVowel(char) {
    return ['A', 'I', 'U', 'E', 'O'].indexOf(char) > -1;
  };

  function isNotVowel(char) {
    return !isVowel(char)
  };

  function isDoubleConsonant(syllable) {
    if (syllable.length == 2 && syllable[0] == syllable[1]) {
      return true;
    }
    return false;
  };

  function isPunctuation(char) {
    return ['.','!','?'].indexOf(char) > -1;
  };

  function convertDoubleO(romanji) {
    var converted = [];
    var lastChar = '';
    romanji.forEach(function(char) {
      if (lastChar == 'O' && char == 'O') {
        converted.push('U');
      } else {
        converted.push(char);
      }
      lastChar = char;
    });
    return converted;
  };

  function isEndOfWord(romanji, idx) {
    if (idx+1 == romanji.length) {
      return true;
    } else if (romanji[idx+1] == ' ') {
      return true;
    }
    return false;
  };

  function isClosedSyllable(romanji, idx) {
    if (romanji[idx] == 'N') {
      if (isEndOfWord(romanji,idx)) {
        return true;
      } else if (isNotVowel(romanji[idx+1]) && romanji[idx+1] != 'Y') {
        return true;
      }
    }
    return false;
  };

  function convertParticles(romanji) {
    var romanjiWords = romanji.split(' ');

    romanjiWords.forEach(function(word, idx) {
      if (word == 'WA') {
        romanjiWords[idx] = 'HA';
      } else if (word == 'O') {
        romanjiWords[idx] = 'WO';
      } else if (word == 'E') {
        romanjiWords[idx] = 'HE';
      }
    });
    return romanjiWords.join(' ');
  };

  function handleBadSyllable(syllable) {
    var returnVal = "";
    var syllableArray = syllable.split('');

    while (syllableArray.length > 0) {
      returnVal += syllableArray.shift();
      if (syllableArray.join('') in hiraganaHash) {
        returnVal += hiraganaHash[syllableArray.join('')];
        break;
      }
    }
    return returnVal;
  };

  return {
    translate: translate
  };
}());
