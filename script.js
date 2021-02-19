let storage = { val1: 0, val2: 0 };

function saveToStorage(key, value) {
  storage[key] = value;
}

function checkValue(value) {
  typeof val == 'number' && +val !== NaN ? true : false;
}

function printFromStorage(check1, check2) {
  if ((check2, check1)) {
    check1 = checkValue(storage.val1);
    check2 = checkValue(storage.val2);
    document.querySelector('#result').innerHTML = `результат ${check1 + check2}`;
  } else {
    document.querySelector('#result').innerHTML = 'введи число';
  }
}

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  saveToStorage('val1', value);
  printFromStorage();
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  saveToStorage('val2', value);
  printFromStorage();
});
