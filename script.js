const container = document.getElementById("container");

const hexField = document.createElement("div");
hexField.className = "hex-field";
container.appendChild(hexField);

const inputField = document.createElement("div");
inputField.className = "input-field";
let inputFieldText = `
        <label for="num-row">Enter row number</label>
        <input type="number" id="num-row"><br><br>
        <label for="num-col">Enter column number</label>
        <input type="number" id="num-col"><br><br>
        <button onclick="generateHexagonField()">Generate</button>
    `;
inputField.innerHTML = inputFieldText;
container.appendChild(inputField);

function generateHexagonField() {
  const rowsNumber = Number(document.getElementById("num-row").value);
  const columnsNumber = Number(document.getElementById("num-col").value);

  if (rowsNumber && columnsNumber && rowsNumber > 0 && columnsNumber > 0) {
    for (let j = 0; j < columnsNumber; j++) {
      for (let i = 0; i < rowsNumber; i++) {
        let shiftLeft = j % 2 == 0 ? 0 : 42;
        let row = 85 * i + shiftLeft;
        let col = j * 71;
        console.log(col, row);
        const hex = document.createElement("div");
        hex.className = "hex";
        hex.style.top = col + "px";
        hex.style.left = row + "px";
        hexField.appendChild(hex);
      }
    }
    inputField.classList.add("hide");
  } else {
    inputField.innerHTML = inputFieldText + `<br><br>Enter numbers!`;
  }
}
