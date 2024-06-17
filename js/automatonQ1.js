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
    this.reset();
    for (const symbol of input) {
      let nextStates = this.currentState.nextState(symbol);
      if (nextStates.length === 0) {
        return false;
      }
      this.currentState = nextStates[0];
    }
    return this.finalStates.has(this.currentState);
  }
}

function createAutomatonForItemA() {
  const states = ["q0", "q1", "q2"];
  const alphabet = ["a", "b", "c"];
  const transitions = [
    ["q0", "a", "q1"],
    ["q1", "a", "q1"],
    ["q1", "b", "q1"],
    ["q1", "c", "q2"],
    ["q2", "a", "q1"],
    ["q2", "c", "q2"],
  ];
  const initialState = "q0";
  const finalStates = ["q0", "q1", "q2"];

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

function createAutomatonForItemC() {
  const states = ["q0", "q1", "q2", "q3", "q4"];
  const alphabet = ["a", "b"];
  const transitions = [
    ["q0", "a", "q1"],
    ["q0", "b", "q2"],
    ["q1", "a", "q3"],
    ["q1", "b", "q4"],
    ["q3", "a", "q3"],
    ["q3", "b", "q2"],
    ["q4", "b", "q4"],
  ];
  const initialState = "q0";
  const finalStates = ["q1", "q2", "q4"];

  return new Automaton(
    states,
    alphabet,
    transitions,
    initialState,
    finalStates
  );
}

function createAutomatonForItemD() {
  const states = ["q0", "q1", "q2", "q3"];
  const alphabet = ["a", "b", "c"];
  const transitions = [
    ["q0", "a", "q1"],
    ["q0", "b", "q2"],
    ["q1", "a", "q1"],
    ["q1", "b", "q2"],
    ["q1", "c", "q3"],
    ["q2", "a", "q3"],
    ["q2", "b", "q2"],
    ["q3", "c", "q3"],
  ];
  const initialState = "q0";
  const finalStates = ["q1", "q3"];

  return new Automaton(
    states,
    alphabet,
    transitions,
    initialState,
    finalStates
  );
}

const automatonA = createAutomatonForItemA();
const itemAInput = document.getElementById("item-a");
const itemAMsg = document.getElementById("item-a-msg");
const itemAButton = document.getElementById("item-a-button");

itemAButton.addEventListener("click", () => {
  const isValid = automatonA.process(itemAInput.value);

  if (!isValid) {
    itemAMsg.textContent = "Rejeitado!";
    itemAMsg.style.color = "red";
  } else {
    itemAMsg.textContent = "Aceito!";
    itemAMsg.style.color = "green";
  }
});

const automatonB = createAutomatonForItemB();
const itemBInput = document.getElementById("item-b");
const itemBMsg = document.getElementById("item-b-msg");
const itemBButton = document.getElementById("item-b-button");

itemBButton.addEventListener("click", () => {
  const isValid = automatonB.process(itemBInput.value);

  if (!isValid) {
    itemBMsg.textContent = "Rejeitado!";
    itemBMsg.style.color = "red";
  } else {
    itemBMsg.textContent = "Aceito!";
    itemBMsg.style.color = "green";
  }
});

const automatonC = createAutomatonForItemC();
const itemCInput = document.getElementById("item-c");
const itemCMsg = document.getElementById("item-c-msg");
const itemCButton = document.getElementById("item-c-button");

itemCButton.addEventListener("click", () => {
  const isValid = automatonC.process(itemCInput.value);

  if (!isValid) {
    itemCMsg.textContent = "Rejeitado!";
    itemCMsg.style.color = "red";
  } else {
    itemCMsg.textContent = "Aceito!";
    itemCMsg.style.color = "green";
  }
});

const automatonD = createAutomatonForItemD();
const itemDInput = document.getElementById("item-d");
const itemDMsg = document.getElementById("item-d-msg");
const itemDButton = document.getElementById("item-d-button");

itemDButton.addEventListener("click", () => {
  const isValid = automatonD.process(itemDInput.value);

  if (!isValid) {
    itemDMsg.textContent = "Rejeitado!";
    itemDMsg.style.color = "red";
  } else {
    itemDMsg.textContent = "Aceito!";
    itemDMsg.style.color = "green";
  }
});
