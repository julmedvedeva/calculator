const button = document.getElementById('button');
let result;
let input1;
let input2;
button.onclick = function () {
  result = document.getElementById('result');
  input1 = Number(document.getElementById('input1').value);
  input2 = Number(document.getElementById('input2').value);
  result.innerHTML = `результат ${input1 + input2}`;
};
