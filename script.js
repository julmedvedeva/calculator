let storage = {
  val1: 0,
  val2: 0,
  settVal(val) {
    if (typeof +val === 'number' && isNaN(val)) {
      return val;
    } else {
      return 0;
    }
  },
  safe(key, val) {
    this[key] = val;
  },
  getVal1() {
    return this.val1;
  },
  getVal2() {
    return this.val2;
  },
  print() {
    return `результат ${this.getVal1 + this.getVal2}`;
  },
  update(key, val) {
    this.safe(key, val);
    this.print();
  },
};

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
