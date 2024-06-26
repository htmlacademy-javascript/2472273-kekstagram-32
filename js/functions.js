// Функция для проверки длины строки
function stringLength (string, maxLength) {
  if (string === 'string' && Number.isInteger(maxLength)) {
    return true;
  }

    return false;
}

console.log(stringLength('проверяемая строка', 20));
console.log(stringLength('проверяемая строка', 18));
console.log(stringLength('проверяемая строка', 10));


// Функция для проверки, является ли строка палиндромом
function isPalindrom(string) {
  const stringNormal = string.replaceAll(' ', '').toLowerCase();
  let stringNew = '';

  for (let i = stringNormal.length - 1; i >= 0; i--) {
    stringNew += stringNormal[i];
  }

  if (stringNew === stringNormal) {
    return true
  }

  return false
}

console.log(isPalindrom('топот'));
console.log(isPalindrom('ДовОд'));
console.log(isPalindrom('Кекс'));
