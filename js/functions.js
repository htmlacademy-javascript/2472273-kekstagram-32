// Функция для проверки длины строки
function stringLength (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
}

stringLength('проверяемая строка', 20);
stringLength('проверяемая строка', 18);


// Функция для проверки, является ли строка палиндромом
function isPalindrom(string) {
  const stringNormal = string.replaceAll(' ', '').toLowerCase();
  let revertString = '';

  for (let i = stringNormal.length - 1; i >= 0; i--) {
    revertString += stringNormal[i];
  }

  if (revertString === stringNormal) {
    return true;
  }

  return false;
}

isPalindrom('топот');
isPalindrom('ДовОд');

// функция для расчета времени встречи

const MINUTES_IN_HOUR = 60;

const getHouresInMinutes = (time) => {
  const timeValue = time.split(':').map((value) => +value);
  const [houres, minutes] = timeValue;
  return houres * MINUTES_IN_HOUR + minutes;
};

const isPossibleMeeting = (beginWorkingDay, finishWorkingDay, beginMeeting, durationMeeting) => {
  const isCorrectTimeMeeting = Number.isInteger(durationMeeting) && durationMeeting > 0;
  const isTimesParamsAreString = typeof (beginWorkingDay) === 'string' && typeof(finishWorkingDay) === 'string' &&
  typeof (beginMeeting) === 'string';

  const isCorrectParams = isCorrectTimeMeeting && isTimesParamsAreString;

  if (isCorrectParams) {
    const beginWorkingDayInMinutes = getHouresInMinutes(beginWorkingDay);
    const finishWorkingDayInMinutes = getHouresInMinutes(finishWorkingDay);
    const beginMeetingInMinutes = getHouresInMinutes(beginMeeting);

    if (beginWorkingDayInMinutes > beginMeetingInMinutes || finishWorkingDayInMinutes < beginMeetingInMinutes || beginMeetingInMinutes + durationMeeting > finishWorkingDayInMinutes) {
      return false;
    }
    return true;
  }
  throw new Error('Invalid arguments');
};

isPossibleMeeting('08:00', '17:30', '14:00', 90); // true
isPossibleMeeting('8:0', '10:0', '8:0', 120); // true
isPossibleMeeting('08:00', '14:30', '14:00', 90); // false
isPossibleMeeting('14:00', '17:30', '08:0', 90); // false
isPossibleMeeting('8:00', '17:30', '08:00', 900); // false
