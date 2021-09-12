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

  printAllResults() {
    allResults.innerHTML = '';
    allResults.appendChild(this.items);
    allResults.appendChild(this.addItem);
  },

  generateButtonDelete() {
    const button = document.createElement('button');
    button.innerHTML = `<i class="fas fa-backspace"></i>`;
    button.className = 'delete';
    updateElementStyles(button, {
      backgroundColor: 'darkmagenta',
      color: 'antiquewhite',
      border: '1px solid',
      borderRadius: '20%',
    });
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
    // Тут же установи ему data-id, наполни
    item.element.setAttribute('data-id', item.id);
    item.element.innerHTML = item.value;
    item.element.appendChild(item.button);
    // его всяким и повесь эвент на его кнопку
    item.button.addEventListener('click', this.removeItem);

    return item;
  },

  addItem() {
    const item = this.createItem();
    updateElementStyles(item.element, {
      listStyle: 'none',
      width: '20%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: '40px',
      margin: '1%',
    });
    this.items.push({ id: item.id, value: item.value });
    this.ul.appendChild(item.element);
    // this.renderForgottenElements();
  },
  removeItem(itemId) {
    // Удалим item из массива items и из разметки
    alert('нажали на кнопокь');

    const data_id = document.getElementById(itemId);
    console.log(data_id);
    // const parents = document.querySelector(data_id);
    // for (var i = 0, parent; (parent = parents[i]); i++)
    //   parent.onclick = function (e) {
    //     if (e.target.className == 'target') alert(this.className);
    //   };
    // deletebleItem.element.addEventListener('click', alert('put in x'));
  },
  removeGhostElements() {
    // тут напиши функцию для поиска и удаления
    // из разметки элементов, которых нет в items, но
    // они при этом почему-то есть в разметке
  },
  renderForgottenElements() {
    // debugger;
    // тут напиши функцию для добавления в разметку
    // элементов, которые есть в items, но их почему-то нет
    // в разметке. Можно использовать приконое:
    // document.querySelector(`*[data-id="${item.id}"]`)
    const a = this.items.map((i) => {
      const b = {
        id: i.id,
        value: i.value,
        element: document.createElement('li'),
        button: this.generateButtonDelete(),
      };
      b.element.setAttribute('data-id', b.id);
      b.element.innerHTML = b.value;
      console.log('b', b);
      this.ul.appendChild(b.element);
      return b;
    });
    console.log(a);
    // this.ul.appendChild(a);
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
    storage.items.push(...data);
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
document.querySelector('#saveRes').addEventListener('click', () => storage.addItem());
// document.querySelector('#saveRes').addEventListener('click', () => storage.printAllResults());

getData(requestUrl);
