class State {
    constructor(name) {
        this.name = name;
        this.transitions = {};
    }

    addTransition(symbol, state) {
        this.transitions[symbol] = state;
    }

    nextState(symbol) {
        return this.transitions[symbol] || null;
    }
}

class Automaton {
    constructor() {
        this.states = {};
        this.initialState = null;
        this.finalStates = new Set();
        this.currentState = null;
    }

    addState(name, isFinal = false) {
        const state = new State(name);
        this.states[name] = state;
        if (isFinal) {
            this.finalStates.add(name);
        }
        if (!this.initialState) {
            this.initialState = state;
        }
        return state;
    }

    setInitialState(name) {
        this.initialState = this.states[name];
        this.currentState = this.initialState;
    }

    addTransition(fromState, symbol, toState) {
        this.states[fromState].addTransition(symbol, this.states[toState]);
    }

    reset() {
        this.currentState = this.initialState;
    }

    process(input) {
        this.reset();
        for (const symbol of input) {
            this.currentState = this.currentState.nextState(symbol);
            if (!this.currentState) {
                return false;
            }
        }
        return this.finalStates.has(this.currentState.name);
    }
}

function createAutomatonItemA() {
    // Definindo o autômato para a expressão regular (ab*c*)*
    let automaton = new Automaton();
    automaton.addState('q0', isFinal = true); // Estado inicial e final
    automaton.addState('q1', isFinal = true); // Estado de processamento de 'a'
    automaton.addState('q2', isFinal = true); // Estado de processamento de 'c' (final)

    automaton.setInitialState('q0');
    automaton.addTransition('q0', 'a', 'q1');
    automaton.addTransition('q1', 'b', 'q1');
    automaton.addTransition('q1', 'c', 'q2');
    automaton.addTransition('q2', 'c', 'q2');
    automaton.addTransition('q2', 'a', 'q1');

    // Testando o autômato
    const testCases = ['abcabcabbbbc', 'aaaaaabc', 'ab', 'abc', 'a', 'ac', 'aabbc', 'abcc', 'b', 'c', 'abbbc', ''];

    testCases.forEach(testCase => {
        const result = automaton.process(testCase);
        console.log(`Input: "${testCase}" is ${result ? 'accepted' : 'rejected'}`);
    });

}

function createAutomatonItemB() {
    // Definindo o autômato para a expressão regular (ab*c*)*
    let automaton = new Automaton();
    automaton.addState('q0');
    automaton.addState('q1');
    automaton.addState('q2');
    automaton.addState('q3', true);
    automaton.addState('q4');
    automaton.addState('q5');
    automaton.addState('q6');
    automaton.addState('q7', true);

    automaton.setInitialState('q0');
    automaton.addTransition('q0', 'a', 'q1');
    automaton.addTransition('q1', 'a', 'q2');
    automaton.addTransition('q2', 'a', 'q3');
    automaton.addTransition('q3', 'b', 'q3');
    automaton.addTransition('q3', 'c', 'q3');
    automaton.addTransition('q0', 'b', 'q4');
    automaton.addTransition('q0', 'c', 'q4');
    automaton.addTransition('q4', 'a', 'q5');
    automaton.addTransition('q5', 'a', 'q6');
    automaton.addTransition('q6', 'a', 'q7');


    // Testando o autômato
    const testCases = ['aaa', 'bcaaa', 'aab', 'aaabc', 'abcbcbcbcb', 'ac', 'aabbc', 'abcc', 'b', 'c', 'abbbc', ''];

    testCases.forEach(testCase => {
        const result = automaton.process(testCase);
        console.log(`Input: "${testCase}" is ${result ? 'accepted' : 'rejected'}`);
    });

}

createAutomatonItemB();