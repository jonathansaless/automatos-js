class Automaton {
    constructor(pattern) {
      this.pattern = pattern;
      this.states = this.createStates(pattern);
      this.currentState = 0;
    }
  
    createStates(pattern) {
      let states = [];
      for (let i = 0; i <= pattern.length; i++) {
        states[i] = {};
        if (i < pattern.length) {
          states[i][pattern[i]] = i + 1;
        }
      }
      return states;
    }
  
    reset() {
      this.currentState = 0;
    }
  
    process(character) {
      if (this.states[this.currentState][character] !== undefined) {
        this.currentState = this.states[this.currentState][character];
      } else {
        this.reset();
      }
      return this.currentState === this.pattern.length;
    }
  
    search(text) {
      this.reset();
      let positions = [];
      for (let i = 0; i < text.length; i++) {
        if (this.process(text[i])) {
          positions.push(i - this.pattern.length + 1);
          this.reset();
        }
      }
      return positions;
    }
  }
  
  // Testando o autômato com o texto fornecido
  const text = `O computador é uma máquina capaz de variados tipos de tratamento automático de informações ou processamento de dados. Entende-se por computador um sistema físico que realiza algum tipo de computação. Assumiu-se que os computadores pessoais e laptops são ícones da era da informação. O primeiro computador eletromecânico foi construído por Konrad Zuse (1910–1995). Atualmente, um microcomputador é também chamado computador pessoal ou ainda computador doméstico.`;
  const pattern = "computador";
  
  const automaton = new Automaton(pattern);
  const positions = automaton.search(text);
  
  console.log(`Ocorrências da palavra "${pattern}":`, positions);
  