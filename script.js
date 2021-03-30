let saveRes = document.createElement('div');
saveRes.id = 'saveRes';
saveRes.style.height = '100px';
saveRes.style.width = '100px';
saveRes.style.backgroundColor = 'red';
console.log(saveRes);
let allResults = document.createElement('div');
allResults.id = 'allResults';
document.body.append(saveRes);
document.body.append(allResults);

let storage = {
  _val1: 0,
  _val2: 0,
  result: [],
  get Val1() {
    return this._val1;
  },
  get Val2() {
    return this._val2;
  },
  get ValsSum() {
    return this._val1 + this._val2;
  },
  set Val1(val) {
    if (typeof +val === 'number' && !isNaN(val)) {
      this._val1 = val;
    } else {
      this._val1 = 0;
    }
  },
  set Val2(val) {
    if (typeof +val === 'number' && !isNaN(val)) {
      this._val2 = val;
    } else {
      this._val2 = 0;
    }
  },
  safe(key, val) {
    return (this[key] = val);
  },
  print(val1, val2) {
    document.querySelector('#result').innerHTML = `результат ${+val1 + +val2}`;
  },
  update1(key, val) {
    this.safe(key, val);
    this.print(this.Val1, this.Val2);
  },
  printCurrentResult() {
    return (document.querySelector('#result').innerHTML = `результат ${this.ValsSum}`);
  },
  printAllResults(arr) {
    let a = this.generateListMarkup(arr);
    return (allResults.innerHTML = a);
  },
  generateListMarkup(arr) {
    let list = arr.map((item) => `<li>${item}</li>`).join('');
    list = `<ul>${list}</ul>`;
    return list;
  },
  saveResult(val) {
    if (val > 0) {
      this.result = this.printCurrentResult(val);
    } else {
      alert('Чойта ты тут делаишь?');
    }
  },
};

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update1('Val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update1('Val2', value);
});
document.querySelector('#saveRes').addEventListener('keyup', function ({ target: { value } }) {
  storage.saveResult();
});
