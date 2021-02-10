let button = document.getElementById('button');
button.onclick = function () {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  let result = document.getElementById('result');
  let inputToNumber1 = Number(input1);
  let inputToNumber2 = Number(input2);
  document.getElementById('result').innerHTML = `результат ${inputToNumber1 + inputToNumber2}`;
};
