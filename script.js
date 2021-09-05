const saveRes = document.createElement('div');
const allResults = document.createElement('div');
const list = document.createElement('ul');
const container = document.querySelector('.container');
const requestUrl = './data.json';

allResults.id = 'allResults';
container.append(saveRes);
container.append(allResults);
allResults.append(list);

const storage = {
  _val1: 0,
  _val2: 0,
  items: [],
  ul: document.querySelector('ul'),

  //работа со значением из интупа
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

  generateId() {
    return Math.floor(Math.random() * 100);
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
    allResults.appendChild(this.addItem(arr));
  },

  generateButtonDelete() {
    const button = document.createElement('button');
    button.innerHTML = 'X';
    button.className = 'delete';

    return button;
  },

  createItem() {
    // Создает элемент вида:
    const item = {
      element: document.createElement('li'),
      id: this.generateId(),
      value: this.valsSum,
      button: this.generateButtonDelete(),
    };
    item.element.setAttribute('data-id', item.id);
    item.element.innerHTML = item.value;
    item.element.appendChild(item.button);
    item.button.addEventListener('click', this.removeItem(item.id));

    // console.log('remove', this.removeItem(item.id));

    // Тут же установи ему data-id, наполни
    // его всяким и повесь эвент на его кнопку
    return item;
  },

  addItem(val) {
    const item = this.createItem(val);
    this.items.push({ id: item.id, value: item.value });
    this.ul.appendChild(item.element);
  },
  removeItem(itemId) {
    console.log(itemId);
    // Удалим item из массива items и из разметки

    const data_id = document.querySelector(`*[data-id="${itemId}"]`);
    console.log('dataId', data_id);

    // const parents = document.querySelector(data_id);
    // console.log('parents', parents);
    // for (var i = 0, parent; (parent = parents[i]); i++)
    //   parent.onclick = function (e) {
    //     if (e.target.className == 'target') alert(this.className);
    //   };
    // deletebleItem.element.addEventListener('click', alert('put in x'));
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

    return storage.items.push(...data.map((obj) => ({ ...obj })));
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

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
// document.querySelector('#saveRes').addEventListener('click', () => storage.updateList());

getData(requestUrl);

document.querySelector('#saveRes').addEventListener('click', () => storage.addItem());
