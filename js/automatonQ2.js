class State {
  constructor(name) {
    this.name = name;
    this.transitions = {};
  }

  addTransition(symbol, state) {
    if (!this.transitions[symbol]) {
      this.transitions[symbol] = [];
    }
    this.transitions[symbol].push(state);
  }

  nextState(symbol) {
    return this.transitions[symbol] || [];
  }
}

class Automaton {
  constructor(states, alphabet, transitions, initialState, finalStates) {
    this.states = {};
    states.forEach((stateName) => {
      this.states[stateName] = new State(stateName);
    });

    this.alphabet = new Set(alphabet);
    this.initialState = this.states[initialState];
    this.finalStates = new Set(
      finalStates.map((stateName) => this.states[stateName])
    );
    this.currentState = this.initialState;

    transitions.forEach(([fromState, symbol, toState]) => {
      this.addTransition(fromState, symbol, toState);
    });
  }

  addTransition(fromState, symbol, toState) {
    if (!this.alphabet.has(symbol)) {
      console.log(`Símbolo < ${symbol} > não faz parte do alfabeto`);
    }
    this.states[fromState].addTransition(symbol, this.states[toState]);
  }

  reset() {
    this.currentState = this.initialState;
  }

  process(input) {
    let positions = [];
    for (let i = 0; i < input.length; i++) {
      let currentState = this.initialState;
      let j = i;
      while (j < input.length && currentState.nextState(input[j]).length > 0) {
        currentState = currentState.nextState(input[j])[0];
        j++;
      }
      if (this.finalStates.has(currentState)) {
        positions.push({ start: i + 1, end: j - 2 });
      }
    }
    return positions;
  }
}

function createAutomatonComputador() {
  const states = [
    "q0",
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q9",
    "q10",
    "q11",
    "q12"
  ];
  const alphabet = ["\n", "'", " ", "c", "C", "o", "m", "p", "u", "t", "a", "d", "r"];
  const transitions = [
    ["q0", "\n", "q1"],
    ["q0", "'", "q1"],
    ["q0", " ", "q1"],
    ["q1", "c", "q2"],
    ["q1", "C", "q2"],
    ["q2", "o", "q3"],
    ["q3", "m", "q4"],
    ["q4", "p", "q5"],
    ["q5", "u", "q6"],
    ["q6", "t", "q7"],
    ["q7", "a", "q8"],
    ["q8", "d", "q9"],
    ["q9", "o", "q10"],
    ["q10", "r", "q11"],
    ["q11", "'", "q12"],
    ["q11", " ", "q12"],
    ["q11", "\n", "q12"],
  ];
  const initialState = "q0";
  const finalStates = ["q12"];

  return new Automaton(
    states,
    alphabet,
    transitions,
    initialState,
    finalStates
  );
}

const automaton = createAutomatonComputador();

const q2TextArea = document.getElementById("q2");
const q2Button = document.getElementById("q2-button");
const q2Msg = document.getElementById("q2-msg");

q2Button.addEventListener("click", () => {
  const textWithQuotes = "'" + q2TextArea.value + "'";
  const positions = automaton.process(textWithQuotes);

  if (positions.length == 0) {
    q2Msg.innerHTML = "Nenhuma ocorrência da palavra 'computador' encontrada";
    q2Msg.style.color = "red";
  } else {
    q2Msg.innerHTML = "Ocorrências da palavra 'computador' nas posições:<br>";
    positions.forEach((element, index) => {
      q2Msg.innerHTML += `Ocorrência ${index + 1} - Pos. ${element.start} até ${element.end}<br>`;
    });
    q2Msg.style.color = "green";
  }
});
