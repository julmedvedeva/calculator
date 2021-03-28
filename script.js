// let storage = {
//   _val1: 0,
//   _val2: 0,
//   get Val1() {
//     return this._val1;
//   },
//   get Val2() {
//     return this._val2;
//   },
//   set Val1(val) {
//     if (typeof +val === 'number' && !isNaN(val)) {
//       this._val1 = val;
//     } else {
//       this._val1 = 0;
//     }
//   },
//   set Val2(val) {
//     if (typeof +val === 'number' && !isNaN(val)) {
//       this._val2 = val;
//     } else {
//       this._val2 = 0;
//     }
//   },
//
//   safe(key, val) {
//     return (this[key] = val);
//   },
//   print(val1, val2) {
//     document.querySelector('#result').innerHTML = `результат ${+val1 + +val2}`;
//   },
//   update(key, val) {
//     this.safe(key, val);
//     this.print(this.Val1, this.Val2);
//   },
// };
//
// document.querySelector('#input1').addEventListener('keyup', function ({ target: { value } }) {
//   storage.update('Val1', value);
// });
// document.querySelector('#input2').addEventListener('keyup', function ({ target: { value } }) {
//   storage.update('Val2', value);
// });

function calcRange(from, to) {
  let sum = 0;
  while (from <= to) {
    sum += from;
    from++;
  }
  return sum;
}
calcRange(2, 4);
function checkIsInRange(from, to, num) {
  num >= from && num <= to;
}
checkIsInRange(1, 4, 2);
function calcRangesDiff(f1, t1, f2, t2) {
  return calcRange(f2, t2) - calcRange(f1, t1);
}
calcRangesDiff(2, 4, 76, 99);
