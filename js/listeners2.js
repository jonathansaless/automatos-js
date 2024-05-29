import { FamilyValidator } from "./familyvalidator.js";

const familyValidator = new FamilyValidator();

const itemAInput = document.getElementById("item-a");
const itemAError = document.getElementById("item-a-error");

itemAInput.addEventListener("input", () => {
  const isValid = familyValidator.itemA(itemAInput.value);

  if (itemAInput.value === "") {
    itemAError.textContent = "";
  } else if (!isValid) {
    itemAError.textContent = "Rejeitado!";
    itemAError.style.color = "red";
  } else {
    itemAError.textContent = "Aceito!";
    itemAError.style.color = "green";
  }
});

const itemBInput = document.getElementById("item-b");
const itemBError = document.getElementById("item-b-error");

itemBInput.addEventListener("input", () => {
  const isValid = familyValidator.itemB(itemBInput.value);

  if (itemBInput.value === "") {
    itemBError.textContent = "";
  } else if (!isValid) {
    itemBError.textContent = "Rejeitado!";
    itemBError.style.color = "red";
  } else {
    itemBError.textContent = "Aceito!";
    itemBError.style.color = "green";
  }
});

const itemCInput = document.getElementById("item-c");
const itemCError = document.getElementById("item-c-error");

itemCInput.addEventListener("input", () => {
  const isValid = familyValidator.itemC(itemCInput.value);

  if (itemCInput.value === "") {
    itemCError.textContent = "";
  } else if (!isValid) {
    itemCError.textContent = "Rejeitado!";
    itemCError.style.color = "red";
  } else {
    itemCError.textContent = "Aceito!";
    itemCError.style.color = "green";
  }
});

const itemDInput = document.getElementById("item-d");
const itemDError = document.getElementById("item-d-error");

itemDInput.addEventListener("input", () => {
  const isValid = familyValidator.itemD(itemDInput.value);

  if (itemDInput.value === "") {
    itemDError.textContent = "";
  } else if (!isValid) {
    itemDError.textContent = "Rejeitado!";
    itemDError.style.color = "red";
  } else {
    itemDError.textContent = "Aceito!";
    itemDError.style.color = "green";
  }
});

const itemEInput = document.getElementById("item-e");
const itemEError = document.getElementById("item-e-error");

itemEInput.addEventListener("input", () => {
  const isValid = familyValidator.itemE(itemEInput.value);

  if (itemEInput.value === "") {
    itemEError.textContent = "";
  } else if (!isValid) {
    itemEError.textContent = "Rejeitado!";
    itemEError.style.color = "red";
  } else {
    itemEError.textContent = "Aceito!";
    itemEError.style.color = "green";
  }
});

const itemFInput = document.getElementById("item-f");
const itemFError = document.getElementById("item-f-error");

itemFInput.addEventListener("input", () => {
  const isValid = familyValidator.itemF(itemFInput.value);

  if (itemFInput.value === "") {
    itemFError.textContent = "";
  } else if (!isValid) {
    itemFError.textContent = "Rejeitado!";
    itemFError.style.color = "red";
  } else {
    itemFError.textContent = "Aceito!";
    itemFError.style.color = "green";
  }
});

const itemGInput = document.getElementById("item-g");
const itemGError = document.getElementById("item-g-error");
const xInput = document.getElementById("x");
const yInput = document.getElementById("y");
// Serve para sinalizar se os valores de X e Y estão OK
// Se não estiverem OK, não executará
// isValid = familyValidator.itemG(x, y, itemGInput.value);
// Isso evitar que ocorra erros na execução da expressão regular
var isValidXY = false;

itemGInput.addEventListener("input", () => {
  const x = parseInt(xInput.value);
  const y = parseInt(yInput.value);
  // Se X e Y forem válidos, ele testa a expressão regular
  // Se não, isValid é false, logo informa que o arranjo é rejeitado
  var isValid = isValidXY
    ? familyValidator.itemG(x, y, itemGInput.value)
    : false;

  if (itemGInput.value === "") {
    itemGError.textContent = "";
  } else if (!isValid) {
    itemGError.textContent = "Rejeitado!";
    itemGError.style.color = "red";
  } else {
    itemGError.textContent = "Aceito!";
    itemGError.style.color = "green";
  }
});

function validateItemXY() {
  const xInput = document.getElementById("x").value;
  const yInput = document.getElementById("y").value;
  const itemGError = document.getElementById("item-g-error");

  if ((xInput || yInput) && (parseInt(xInput) <= 0 || parseInt(yInput) <= 0)) {
    itemGError.textContent =
      "Os valores de x e y devem ser números inteiros maiores que zero.";
    itemGError.style.color = "red";
    isValidXY = false;
    return false;
  } else if (parseInt(xInput) > parseInt(yInput)) {
    itemGError.textContent = "O valor de x deve ser menor ou igual a y.";
    itemGError.style.color = "red";
    isValidXY = false;
    return false;
  } else {
    itemGError.textContent = "";
    isValidXY = true;
    return true;
  }
}

document.getElementById("x").addEventListener("input", validateItemXY);
document.getElementById("y").addEventListener("input", validateItemXY);
