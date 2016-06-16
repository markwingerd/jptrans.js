vowel = ['A', 'I', 'U', 'E', 'O']
hiraganaHash = {  'A':  'あ', 'I':  'い', 'U':  'う', 'E':  'え', 'O':  'お',
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

function translate(romanji) {
  hiragana = '';
  currentSyllable = '';

  romanji = romanji.toUpperCase().split('');

  romanji.forEach(function(char, idx) {
    if (vowel.indexOf(char) == -1 && currentSyllable == char) {
      hiragana += hiraganaHash['stsu'];
      currentSyllable = '';
    }
    currentSyllable += char;

    if (vowel.indexOf(char) > -1) {
      hiragana += getOpenSyllable(currentSyllable, romanji, idx);
      currentSyllable = '';
    }

    if (currentSyllable == 'N') {
      value = getClosedSyllable(currentSyllable, romanji, idx);
      hiragana += value
      if (value) currentSyllable = '';
    }
  });

  return hiragana;
};

function getOpenSyllable(syllable, romanji, idx) {
  if (syllable == 'O') {
    if (idx > 0 && romanji[idx-1] == 'O') {
      return hiraganaHash['U'];
    }
  }

  return hiraganaHash[currentSyllable];
};

function getClosedSyllable(syllable, romanji, idx) {
  if (idx + 1 == romanji.length) {
    return hiraganaHash[currentSyllable];
  }
  if (idx+1 < romanji.length) {
    if (vowel.indexOf(romanji[idx+1] == -1) && (romanji[idx+1] != 'Y')) {
      return hiraganaHash[currentSyllable];
    }
  }
  return '';
};
