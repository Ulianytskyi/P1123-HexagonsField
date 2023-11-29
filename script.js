const container = document.getElementById("container");

const hexField = document.createElement("div");
hexField.className = "hex-field";
container.appendChild(hexField);

const inputField = document.createElement("div");
inputField.className = "input-field hide";
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
    createHexagonField(rowsNumber, columnsNumber);
    inputField.classList.add("hide");
  } else {
    inputField.innerHTML = inputFieldText + `<br><br>Enter numbers!`;
  }
}

function createHexagonField(rowsNumber, columnsNumber) {
  for (let j = 0; j < columnsNumber; j++) {
    for (let i = 0; i < rowsNumber; i++) {
      let shiftLeft = j % 2 == 0 ? 0 : 42;
      let row = 85 * i + shiftLeft;
      let col = j * 71;

      const hex = document.createElement("div");
      hex.className = "hex";
      hex.dataset.coords = j + "-" + i;
      hex.style.top = col + "px";
      hex.style.left = row + "px";

      hex.addEventListener("click", hexSelection);

      hexField.appendChild(hex);
    }
  }
}

createHexagonField(5, 5);

let selectedHex = null;
let isMovable = true;

function hexSelection(event) {
  const currentHex = event.target;
  if (currentHex && selectedHex) {
    let currHexCoords = currentHex.dataset.coords.split("-");
    let selectedHexCoords = selectedHex.dataset.coords.split("-");

    let aX, aY, bX, bY;
    aY = selectedHexCoords[0];
    aX = selectedHexCoords[1];
    bY = currHexCoords[0];
    bX = currHexCoords[1];

    if (
      (bY == aY && bX == aX - 1) ||
      (bY == aY && -bX == -aX - 1) ||
      (bY == aY - 1 && bX == aX) ||
      (-bY == -aY - 1 && bX == aX)
      // ||
      // (aY % 2 == 1 && bY == aY - 1 && -bX == -aX - 1) ||
      // (aY % 2 == 1 && -bY == -aY - 1 && bX == aX - 1) ||
      // (aY % 2 == 1 && -bY == -aY - 1 && -bX == -aX - 1) ||
      // (aY % 2 == 0 && bY == aY - 1 && bX == aX - 1)
    ) {
      // console.log(aY, aX, "_", bY, bX);
      console.log("Ok----------------");
      isMovable = true;
    } else {
      isMovable = false;
      console.log(aY, aX, "_", bY, bX);
    }
  }

  if (selectedHex == null) {
    currentHex.style.backgroundImage = `url(hex-red.png)`;
    selectedHex = currentHex;
  } else if (isMovable && selectedHex != null && selectedHex != currentHex) {
    currentHex.style.backgroundImage = `url(hex-red.png)`;
    selectedHex.style.backgroundImage = `url(hex.png)`;
    selectedHex = currentHex;
  } else if (selectedHex == currentHex) {
    currentHex.style.backgroundImage = `url(hex.png)`;
    selectedHex.style.backgroundImage = `url(hex.png)`;
    selectedHex = null;
  }
}
