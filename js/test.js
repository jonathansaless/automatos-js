const text = "computador é bom";
const index = text.indexOf("c");

if (index > 0) {
  const charBeforeC = text[index - 1];
  if (charBeforeC === " ") {
    console.log("O caractere à esquerda de 'c' é um espaço em branco.");
  } else {
    console.log(`O caractere à esquerda de 'c' é: '${charBeforeC}'`);
  }
} else if (index === 0) {
  console.log("A letra 'c' está no início do texto, não há caractere à esquerda.");
} else {
  console.log("A letra 'c' não foi encontrada no texto.");
}
