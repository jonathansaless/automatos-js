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
        positions.push(i);
      }
    }
    return positions;
  }
}

const states = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
const alphabet = ["c", "o", "m", "p", "u", "t", "a", "d", "r"];
const transitions = [
  ["q0", "c", "q1"],
  ["q1", "o", "q2"],
  ["q2", "m", "q3"],
  ["q3", "p", "q4"],
  ["q4", "u", "q5"],
  ["q5", "t", "q6"],
  ["q6", "a", "q7"],
  ["q7", "d", "q8"],
  ["q8", "o", "q9"],
  ["q9", "r", "q10"],
];
const initialState = "q0";
const finalStates = ["q10"];

const automaton = new Automaton(states, alphabet, transitions, initialState, finalStates);
const text = `O computador é uma máquina capaz de variados tipos de tratamento automático de informações ou processamento de dados. Entende-se por computador um sistema físico que realiza algum tipo de computação. Assumiu-se que os computadores pessoais e laptops são ícones da era da informação. O primeiro computador eletromecânico foi construído por Konrad Zuse (1910–1995). Atualmente, um microcomputador é também chamado computador pessoal ou ainda computador doméstico.`;
const positions = automaton.process(text);

console.log(`Ocorrências da palavra "computador" nas posições:`, positions);
