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
      throw new Error(`Símbolo ${symbol} não faz parte do alfabeto`);
    }
    this.states[fromState].addTransition(symbol, this.states[toState]);
  }

  reset() {
    this.currentState = this.initialState;
  }

  process(input) {
    this.reset();
    for (const symbol of input) {
      let nextStates = this.currentState.nextState(symbol);
      if (nextStates.length === 0) {
        return false;
      }
      this.currentState = nextStates[0]; // Assume determinismo
    }
    return this.finalStates.has(this.currentState);
  }
}

function createAutomatonForItemA() {
  const states = ["q0", "q1", "q2", "q3"];
  const alphabet = ["a", "b", "c"];
  const transitions = [
    ["q0", "a", "q1"],
    ["q1", "a", "q1"],
    ["q1", "b", "q2"],
    ["q1", "c", "q3"],
    ["q2", "b", "q2"],
    ["q2", "a", "q1"],
    ["q2", "c", "q3"],
    ["q3", "c", "q3"],
    ["q3", "a", "q1"],
  ];
  const initialState = "q0";
  const finalStates = ["q0", "q1", "q2", "q3"];

  return new Automaton(
    states,
    alphabet,
    transitions,
    initialState,
    finalStates
  );
}

function createAutomatonForItemB() {
  const states = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7"];
  const alphabet = ["a", "b", "c"];
  const transitions = [
    ["q0", "a", "q1"],
    ["q1", "a", "q2"],
    ["q2", "a", "q3"],
    ["q3", "b", "q3"],
    ["q3", "c", "q3"],
    ["q0", "b", "q4"],
    ["q0", "c", "q4"],
    ["q4", "b", "q4"],
    ["q4", "c", "q4"],
    ["q4", "a", "q5"],
    ["q5", "a", "q6"],
    ["q6", "a", "q7"],
  ];
  const initialState = "q0";
  const finalStates = ["q3", "q7"];

  return new Automaton(
    states,
    alphabet,
    transitions,
    initialState,
    finalStates
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const automatonA = createAutomatonForItemA();
  const itemAInput = document.getElementById("item-a");
  const itemAError = document.getElementById("item-a-error");

  itemAInput.addEventListener("input", () => {
    const isValid = automatonA.process(itemAInput.value);

    if (!isValid) {
      itemAError.textContent = "Rejeitado!";
      itemAError.style.color = "red";
    } else {
      itemAError.textContent = "Aceito!";
      itemAError.style.color = "green";
    }
  });

  const automatonB = createAutomatonForItemB();
  const itemBInput = document.getElementById("item-b");
  const itemBError = document.getElementById("item-b-error");

  itemBInput.addEventListener("input", () => {
    const isValid = automatonB.process(itemBInput.value);

    if (!isValid) {
      itemBError.textContent = "Rejeitado!";
      itemBError.style.color = "red";
    } else {
      itemBError.textContent = "Aceito!";
      itemBError.style.color = "green";
    }
  });
});
