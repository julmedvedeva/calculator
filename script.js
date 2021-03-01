let storage = {
  val1: 0,
  val2: 0,
  safe: function (key, val) {
    this[key] = val;
  },
};

function checkValue(val) {
  return typeof +val === 'number' && !isNaN(val);
}

function printFromStorage() {
  if (checkValue(storage.val1) && checkValue(storage.val2)) {
    document.querySelector('#result').innerHTML = `результат ${+storage.val1 + +storage.val2}`;
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
