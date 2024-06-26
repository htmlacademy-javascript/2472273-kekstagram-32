// Функция для проверки длины строки
function stringLength (string, maxLength) {
  if (string === 'string' && Number.isInteger(maxLength)) {
    return true;
  }

  return false;
}

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);


// Функция для проверки, является ли строка палиндромом
function isPalindrom(string) {
  const stringNormal = string.replaceAll(' ', '').toLowerCase();
  let stringNew = '';

  for (let i = stringNormal.length - 1; i >= 0; i--) {
    stringNew += stringNormal[i];
  }

  if (stringNew === stringNormal) {
    return true;
  }

  return false;
}

isPalindrom('топот');
isPalindrom('ДовОд');
