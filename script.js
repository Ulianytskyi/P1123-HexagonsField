const container = document.getElementById("container");

let imgPlayer = `<img src='knight.png' id='knight' class='img-knight'>`;
let imgHex = `url(hex.png)`;
let imgCurHex = `url(hex-selected.png)`;

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

createHexagonField(4, 8);

const hexArr = document.querySelectorAll(".hex");
let randomNumber = Math.floor(Math.random() * hexArr.length) + 1;
hexArr[randomNumber].innerHTML = imgPlayer;

let selectedHex = null;
let isMovable = true;
let playerSign = null;

function hexSelection(event) {
  const currentHex = event.target;

  isMovable = checkMovable(currentHex, selectedHex);

  if (selectedHex == null && currentHex.innerHTML != "") {
    currentHex.style.backgroundImage = imgCurHex;
    selectedHex = currentHex;
    playerSign = currentHex.innerHTML;
  } else if (isMovable && selectedHex != null && selectedHex != currentHex) {
    currentHex.style.backgroundImage = imgCurHex;
    selectedHex.style.backgroundImage = imgHex;
    selectedHex.innerHTML = "";
    currentHex.innerHTML = playerSign;
    selectedHex = currentHex;
  } else if (selectedHex == currentHex) {
    currentHex.style.backgroundImage = imgHex;
    selectedHex.style.backgroundImage = imgHex;
    selectedHex = null;
  }
}

function checkMovable(currentHex, selectedHex) {
  if (currentHex && selectedHex) {
    let currHexCoords = currentHex.dataset.coords.split("-");
    let selectedHexCoords = selectedHex.dataset.coords.split("-");

    let aY = selectedHexCoords[0];
    let aX = selectedHexCoords[1];
    let bY = currHexCoords[0];
    let bX = currHexCoords[1];

    if (
      (bY == aY && bX == aX - 1) || //left
      (bY == aY && -bX == -aX - 1) || //right
      (bY == aY - 1 && bX == aX) || //up
      (-bY == -aY - 1 && bX == aX) || //down
      (aY % 2 == 1 && bY == aY - 1 && -bX == -aX - 1) || // 1> right-up
      (aY % 2 == 0 && -bY == -aY - 1 && bX == aX - 1) || // 0> left-down
      (aY % 2 == 1 && -bY == -aY - 1 && -bX == -aX - 1) || // 1> right-down
      (aY % 2 == 0 && bY == aY - 1 && bX == aX - 1) // 1> left-up
    ) {
      return true;
    } else {
      return false;
    }
  }
}

document.getElementById("knight").addEventListener("click", (event) => {
  event.stopPropagation();
});
