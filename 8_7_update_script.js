const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Объявление переменных
let answerNumberText;
let answerNumberHund;
let answerNumberTen;
let answerNumberUnit;
let answerNumberAbs;
let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun;

// Исполнительные функции
function numberHund(numberHund) {  // Преобразование в сотни
  const arrNumberHund = ["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"];
  return arrNumberHund[numberHund];
}

function numberExeption(numberTen) {  // Преобразование чисел - исключений
  const arrExeption = ["", " одиннадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семьнадцать", " восемьнадцать", " девятнадцать"];
  return arrExeption[numberTen];
}

function numberTen(numberTen) {  // Преобразование десятков
  const arrNumberTen = ["", "", " двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"];
  return arrNumberTen[numberTen];
}

function numberUnit(numberUnit) {  //  Преобразование единиц
  const arrNumberUnit = ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"];
  return arrNumberUnit[numberUnit];
}

function answerRandom(answerNumberTextFunc) {  //  Случайный ответ
  const answerRandom = Math.round(Math.random() * 3);
  const arrAnswerRandom = ["Наверное, это число ", "Да это легко! Ты загадал ", "Без теории вероятности понятно, что это число ", "Вы загадали число "];
  answerField.innerText = (arrAnswerRandom[answerRandom] + answerNumberTextFunc + "?");
}

function funcAnswerNumber(answerNumberFunc) {  //Число в текст 
  if (answerNumberFunc == 0) {
    answerNumberText = "нуль";
  } else {
    if (answerNumberFunc < 0) {
      answerNumberText = "минус ";
      answerNumberAbs = Math.abs(answerNumberFunc);
    } else {
      answerNumberAbs = answerNumberFunc;
      answerNumberText = "";
    }
    answerNumberHund = Math.trunc(answerNumberAbs / 100);
    answerNumberTen = Math.trunc((answerNumberAbs - answerNumberHund * 100) / 10);
    answerNumberUnit = answerNumberAbs % 10;
    console.log(answerNumberFunc, answerNumberAbs, answerNumberHund, answerNumberTen, answerNumberUnit, answerNumberText);

    answerNumberText += numberHund(answerNumberHund);
    if (answerNumberTen == 1) {              //диапазон-исключение
      answerNumberText += numberExeption(answerNumberUnit);
    }
    else {
      answerNumberText += numberTen(answerNumberTen);
      answerNumberText += numberUnit(answerNumberUnit);
    }
  }
  (answerNumberText.length > 20) ? answerNumberText = answerNumberFunc : false;
  answerRandom(answerNumberText);
}

function beginGame() {
  minValue = parseInt(prompt('Минимальное знание числа для игры', '0'));
  maxValue = parseInt(prompt('Максимальное знание числа для игры', '100'));
  if (isNaN(minValue) || isNaN(maxValue)) {
    minValue = 0;
    maxValue = 100;
  }

  // Если выпадает из диапазона, то выбираем верхнюю или нижнюю границу
  (minValue < -999 || minValue > 999) ? minValue = -999 : false;
  (maxValue > 999 || maxValue < - 999) ? maxValue = 999 : false;
  if (minValue > maxValue) {      // Проверяем, если нужно меняем для корректной работы алгоритма
    [minValue, maxValue] = [maxValue, minValue];
  }

  alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
  answerNumber = Math.floor((minValue + maxValue) / 2);
  orderNumber = 1;
  gameRun = true;

  orderNumberField.innerText = orderNumber;
  funcAnswerNumber(answerNumber);
}

beginGame();

document.getElementById('btnRetry').addEventListener('click', function () {
  beginGame();
})

document.getElementById('btnOver').addEventListener('click', function () {
  if (gameRun) {
    if (minValue === maxValue) {
      const phraseRandom = Math.round(Math.random());
      const answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      minValue = answerNumber + 1;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      funcAnswerNumber(answerNumber);
    }
  }
})

document.getElementById('btnLess').addEventListener('click', function () {
  if (gameRun) {
    if (minValue === maxValue) {
      const phraseRandom = Math.round(Math.random());
      const answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      maxValue = answerNumber - 1;
      answerNumber = Math.ceil((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      funcAnswerNumber(answerNumber);
    }
  }
})

document.getElementById('btnEqual').addEventListener('click', function () {
  if (gameRun) {
    const answerRandomSucces = Math.round(Math.random() * 2);
    const arrAnswerRandomSucces = [`Классно! Попробуем еще раз? \n\u{1F609}`, `Было легко! \n\u{1F643}`, `Я всегда угадываю\n\u{1F60E}`];
    answerField.innerText = arrAnswerRandomSucces[answerRandomSucces];
    gameRun = false;
  }
})