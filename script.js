const saveRes = document.createElement('div');
const allResults = document.createElement('div');
const container = document.querySelector('.container');
const requestUrl = './data.json';

const storage = {
  _val1: 0,
  _val2: 0,
  result: [],
  ul: document.createElement('ul'),

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

  generateButtonDelete() {
    const button = document.createElement('button');
    button.innerHTML = 'X';
    return button;
  },

  generateListMarkup(arr) {
    const generateId = Math.floor(Math.random() * 100);
    const li = document.createElement('li');

    const button = document.createElement('button');
    button.innerHTML = 'X';

    li.setAttribute('data-id', generateId.toString());

    arr.map((item) => {
      li.innerHTML = item;
      li.appendChild(button);
      li.style.listStyleType = 'none';
      button.onclick = () => this.ul.removeChild(li);
      this.ul.appendChild(li);
    });

    return this.ul;
  },

  updateList(result) {
    if (result) {
      this.result = result instanceof Array ? [...this.result, ...result] : [...this.result, result];
    } else {
      this.result.push(this.valsSum);
    }
    this.printAllResults(this.result);
  },
};

function updateElementStyles(el, propsObj, id) {
  //вторая часть выполнится если первая вернет true
  id && (el.id = id);

  for (let key in propsObj) {
    el.style.hasOwnProperty(key) && (el.style[key] = propsObj[key]);
  }
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    storage.updateList(Object.values(data));
  } catch (e) {
    console.log(e);
  }
}

updateElementStyles(
  saveRes,
  {
    height: '100px',
    width: '100px',
    backgroundColor: 'crimson',
    border: '1px solid crimson',
    borderRadius: '13px',
  },
  'saveRes',
);

allResults.id = 'allResults';
container.append(saveRes);
container.append(allResults);

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
document.querySelector('#saveRes').addEventListener('click', () => storage.updateList());

getData(requestUrl);
