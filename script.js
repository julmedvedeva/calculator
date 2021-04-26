const saveRes = document.createElement('div');

// saveRes.id = 'saveRes';
// saveRes.style.height = '50px';
// saveRes.style.width = '200px';
// saveRes.style.backgroundColor = 'red';

function CreateElementFactory(height, width, backgroundColor) {
  // this.id = id;
  this.style.height = height;
  this.style.width = width;
  this.style.backgroundColor = backgroundColor;
}
saveRes.style = new CreateElementFactory('saveRes', '50px', '200px', 'red');

const allResults = document.createElement('div');
allResults.id = 'allResults';
document.body.append(saveRes);
document.body.append(allResults);

const storage = {
  _val1: 0,
  _val2: 0,
  result: [],

  get val1() {
    return this._val1;
  },
  get val2() {
    return this._val2;
  },
  get valsSum() {
    return this._val1 + this._val2;
  },
  set val1(val) {
    if (typeof +val === 'number' && !isNaN(val)) {
      this._val1 = +val;
    } else {
      this._val1 = 0;
    }
  },
  set val2(val) {
    if (typeof +val === 'number' && !isNaN(val)) {
      this._val2 = +val;
    } else {
      this._val2 = 0;
    }
  },

  save(key, val) {
    this[key] = val;
  },
  update(key, val) {
    this.save(key, val);
    this.printCurrentResult();
  },
  printCurrentResult() {
    document.querySelector('#result').innerHTML = `результат ${this.valsSum}`;
  },
  printAllResults(arr) {
    allResults.innerHTML = '';
    allResults.appendChild(this.generateListMarkup(arr));
  },
  generateListMarkup(arr) {
    const ul = document.createElement('ul');
    arr.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = item;
      li.style.listStyleType = 'none';
      ul.appendChild(li);
    });
    return ul;
  },
  updateList() {
    this.result.push(this.valsSum);
    this.printAllResults(this.result);
  },
};

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
document.querySelector('#saveRes').addEventListener('click', () => storage.updateList());
