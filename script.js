const button = document.getElementById('button');
let result;
let input1;
let input2;
button.onclick = function () {
  result = document.querySelector('#result');
  input1 = Number(document.querySelector('#input1').value);
  input2 = Number(document.querySelector('#input2').value);
  result.innerHTML = `результат ${input1 + input2}`;
};
