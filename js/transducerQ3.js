class State {
  constructor(name) {
    this.name = name;
    this.output = {};
    this.transitions = {};
  }

  addTransition(symbol, state) {
    if (!this.transitions[symbol]) {
      this.transitions[symbol] = [];
    }
    this.transitions[symbol].push(state);
  }

  addTransductionFunction(symbol, output) {
    if (!this.output[symbol]) {
      this.output[symbol] = [];
    }
    this.output[symbol].push(output);
  }

  nextState(symbol) {
    console.log(symbol);
    return this.transitions[symbol] || [];
  }
}

class MealyTransducer {
  constructor(
    states,
    alphabet,
    outputAlphabet,
    transitions,
    transductionFunction,
    initialState,
    finalStates
  ) {
    this.states = {};
    states.forEach((stateName) => {
      this.states[stateName] = new State(stateName);
    });

    this.alphabet = new Set(alphabet);
    this.outputAlphabet = new Set(outputAlphabet);
    this.initialState = this.states[initialState];
    this.finalStates = new Set(
      finalStates.map((stateName) => this.states[stateName])
    );
    this.currentState = this.initialState;

    transitions.forEach(([fromState, symbol, toState]) => {
      this.addTransition(fromState, symbol, toState);
    });

    transductionFunction.forEach(([fromState, symbol, output]) => {
      this.addTransductionFunction(fromState, symbol, output);
    });
  }

  addTransition(fromState, symbol, toState) {
    if (!this.alphabet.has(symbol)) {
      console.log(`Símbolo < ${symbol} > não faz parte do alfabeto de entrada`);
      return false;
    }
    this.states[fromState].addTransition(symbol, this.states[toState]);
  }

  addTransductionFunction(fromState, symbol, output) {
    if (!this.outputAlphabet.has(output)) {
      console.log(`Símbolo < ${output} > não faz parte do alfabeto de saída`);
      return false;
    }
    this.states[fromState].addTransductionFunction(symbol, output);
  }

  reset() {
    this.currentState = this.initialState;
  }

  process(input) {
    this.reset();
    let generatedString = "";
    for (const symbol of input) {
      let nextStates = this.currentState.nextState(symbol);
      if (nextStates.length === 0) {
        return false;
      }

      generatedString += this.currentState.output[symbol];
      console.log(generatedString);
      this.currentState = nextStates[0];
    }

    let currentStateIsFinal = this.finalStates.has(this.currentState);
    console.log(currentStateIsFinal);
    return { isValid: currentStateIsFinal, generatedString };
  }
}

function createAutomatonTransducer() {
  const states = ["q0", "q1", "q2", "q3"];
  const alphabet = ["25", "50", "100"];
  const outputAlphabet = ["0", "1"];
  const transitions = [
    ["q0", "100", "q0"], ["q0", "50", "q2"],
    ["q0", "25", "q1"], ["q1", "100", "q1"],
    ["q1", "50", "q3"], ["q1", "25", "q2"],
    ["q2", "100", "q2"], ["q2", "50", "q0"],
    ["q2", "25", "q3"], ["q3", "100", "q3"],
    ["q3", "50", "q1"], ["q3", "25", "q0"],
  ];
  const transductionFunction = [
    ["q0", "100", "1"], ["q0", "50", "0"],
    ["q0", "25", "0"], ["q1", "100", "1"],
    ["q1", "50", "0"], ["q1", "25", "0"],
    ["q2", "100", "1"], ["q2", "50", "1"],
    ["q2", "25", "0"], ["q3", "100", "1"],
    ["q3", "50", "1"], ["q3", "25", "1"],
  ];
  const initialState = "q0";
  const finalStates = ["q0", "q1", "q2", "q3"];

  return new MealyTransducer(
    states,
    alphabet,
    outputAlphabet,
    transitions,
    transductionFunction,
    initialState,
    finalStates
  );
}

const automaton = createAutomatonTransducer();

const cent25Button = document.getElementById("25-cent");
const cent50Button = document.getElementById("50-cent");
const cent100Button = document.getElementById("100-cent");
const resetButton = document.getElementById("reset");
const q3CoinsHistory = document.getElementById("history-moedas");
const q3Msg = document.getElementById("q3-msg");

var value = [];

cent25Button.addEventListener("click", () => {
  value.push("25");
  const { isValid, generatedString } = automaton.process(value);
  if (!isValid) {
    q3CoinsHistory.textContent += "Moedas adicionadas: 25 " == "" ? q3CoinsHistory.textContent == "" : "25 ";
    q3Msg.textContent = "String inválida!";
    q3Msg.style.color = "red";
  } else {
    q3CoinsHistory.textContent += q3CoinsHistory.textContent == "" ? "Moedas adicionadas: 25 " : "25 ";
    q3Msg.textContent = generatedString;
    q3Msg.style.color = "green";
  }
});

cent50Button.addEventListener("click", () => {
  value.push("50");
  let { isValid, generatedString } = automaton.process(value);
  if (!isValid) {
    q3CoinsHistory.textContent += "Moedas adicionadas: 50 " == "" ? q3CoinsHistory.textContent == "" : "50 ";
    q3Msg.textContent = "String inválida!";
    q3Msg.style.color = "red";
  } else {
    q3CoinsHistory.textContent += "Moedas adicionadas: 50 " == "" ? q3CoinsHistory.textContent == "" : "50 ";
    q3Msg.textContent = generatedString;
    q3Msg.style.color = "green";
  }
});

cent100Button.addEventListener("click", () => {
  value.push("100");
  const { isValid, generatedString } = automaton.process(value);
  if (!isValid) {
    q3CoinsHistory.textContent += "Moedas adicionadas: 100 " == "" ? q3CoinsHistory.textContent == "" : "100 ";
    q3Msg.textContent = "String inválida!";
    q3Msg.style.color = "red";
  } else {
    q3CoinsHistory.textContent += "Moedas adicionadas: 100 " == "" ? q3CoinsHistory.textContent == "" : "100 ";
    q3Msg.textContent = generatedString;
    q3Msg.style.color = "green";
  }
});

resetButton.addEventListener("click", () => {
  value = [];
  q3CoinsHistory.textContent = "";
  q3Msg.textContent = "";
});
