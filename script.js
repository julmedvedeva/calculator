const saveRes = document.createElement('div');
const allResults = document.createElement('div');
const list = document.createElement('ul');
const container = document.querySelector('.container');
const main = document.querySelector('.main');
const requestUrl = './data.json';
const result = document.querySelector('#result-div');

allResults.id = 'allResults';
container.prepend(saveRes);
main.append(allResults);
allResults.append(list);

const storage = {
  _val1: 0,
  _val2: 0,
  items: [],
  ul: document.querySelector('ul'),

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

  loading: true,

  init(data) {
    console.log(data);
    if (this.loading === true && data.length === 0) {
      this.createLoader();
    }

    // if (this.loading === true && data.length > 0) {
    data.forEach(({ value, id }) => storage.addItem({ value, id }));
    this.loading = false;
    // }
  },

  createLoader() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('loading');
    loadingDiv.innerHTML = `<div class="loading-text">
      <span class="loading-text-words">L</span>
      <span class="loading-text-words">O</span>
      <span class="loading-text-words">A</span>
      <span class="loading-text-words">D</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">N</span>
      <span class="loading-text-words">G</span>
      </div>`;

    main.append(loadingDiv);
  },

  deleteLoader() {
    const loadingAnimation = document.querySelector('.loading');
    main.removeChild(loadingAnimation);
    return this.main;
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
    result.innerHTML = `Результат сложения: ${this.valsSum}`;
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

  createItem({ value, id }) {
    const item = {
      element: document.createElement('li'),
      id: id || this.generateId(),
      value: value || this.valsSum,
      button: this.generateButtonDelete(),
    };
    item.element.setAttribute('data-id', item.id);
    item.element.innerHTML = item.value;
    item.element.appendChild(item.button);
    item.button.addEventListener('click', (e) => {
      const parent = e.currentTarget.parentNode;
      this.removeItem(parent);
    });

    return item;
  },

  addItem(value, id) {
    const item = this.createItem(value, id);

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
    //todo это условие ломает все
    // if (this.items.length <= 1) {
    //   this.deleteLoader();
    // }

    this.ul.appendChild(item.element);
  },

  removeItem(itemId) {
    const attribute = itemId.getAttribute('data-id');

    const item = this.items.find((item) => {
      return item.id.toString() === attribute;
    });

    if (item) {
      this.ul.removeChild(itemId);
      const index = this.items.indexOf(item);
      if (index > -1) {
        this.items.splice(index, 1);
      }
      if (this.items.length === 0) {
        this.createLoader();
      }
      return this.items;
    }
  },
};

function updateElementStyles(el, propsObj, id) {
  id && (el.id = id);

  for (let key in propsObj) {
    el.style.hasOwnProperty(key) && (el.style[key] = propsObj[key]);
  }
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    storage.init(data);
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
    border: '1px solid khaki',
    borderRadius: '13px',
    marginRight: '10px',
  },
  'saveRes',
);

document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val1', value);
});
document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
  storage.update('val2', value);
});
document.querySelector('#saveRes').addEventListener('click', () => storage.addItem(storage.valsSum));

getData(requestUrl);
