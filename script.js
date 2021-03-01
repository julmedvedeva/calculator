let storage = {
  val1: 0,
  val2: 0,
  set Val(val) {
    if (typeof +val === 'number' && isNaN(val)) {
      val;
    }
    if (typeof +val === 'NaN') {
      document.querySelector('#result').innerHTML = `результат 0`;
    } else {
      document.querySelector('#result').innerHTML = `ЧИВО`;
    }
  },
  safe(key, val) {
    return (this[key] = val);
  },
  get Val1() {
    return this.val1;
  },
  get Val2() {
    return this.val2;
  },
  print(val1, val2) {
    return (document.querySelector('#result').innerHTML = `результат ${+val1 + +val2}`);
  },
  update(key, val) {
    this.safe(key, val);
    this.print(this.Val1, this.Val2);
  },
};

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
