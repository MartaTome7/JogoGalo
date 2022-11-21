import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JogoComponent implements OnInit {
  GameBoard = [];
  PecaEmJogo: string;
  FimDeJogo: boolean;
  isbtnJogarNovamenteDisabled: boolean;
  isbtnTerminarJogadaDisabled: boolean;

  constructor() {}

  ngOnInit() {
    document.getElementById('nrVitorias1').innerText = String(0);
    document.getElementById('nrVitorias2').innerText = String(0);
    document.getElementById('nrEmpates').innerText = String(0);

    this.createGrid();
    this.comecarJogo();
  }

  Setup() {
    this.GameBoard = ['', '', '', '', '', '', '', '', ''];
    this.PecaEmJogo = 'X';
    this.FimDeJogo = false;
    this.isbtnJogarNovamenteDisabled = true;
  }

  createGrid() {
    for (var i = 0; i < 9; i++) {
      var btnJogo = document.createElement('button');
      btnJogo.setAttribute('type', 'button');
      btnJogo.setAttribute('id', String(i));
      btnJogo.disabled = false;

      btnJogo.classList.add('button');
      btnJogo.innerText = ''; // this.PecaEmJogo;
      btnJogo.addEventListener('click', this.verificarJogada.bind(this));

      document.getElementById('grelha').appendChild(btnJogo);
    }
  }

  verificarJogada(btnChosen) {
    for (var i = 0; i < 9; i++) {
      var btn = document.getElementById(String(i));

      if (btn.getAttribute('disabled') === null) {
        if (btn.innerText === '.') {
          // pode jogar
        } else if (btn.innerText === this.PecaEmJogo) {
          // colocar o outro botao a zeros
          btn.innerText = '.';
        }
      }
    }
    btnChosen.srcElement.innerText = this.PecaEmJogo;
  }

  terminarJogada() {
    console.log('terminar jogada');

    for (var i = 0; i < 9; i++) {
      var btn = document.getElementById(String(i));

      // Se o botão estiver disponivel e tiver sido jogado
      if (
        btn.getAttribute('disabled') === null &&
        btn.innerText === this.PecaEmJogo
      ) {
        // Desativa o botão
        btn.setAttribute('disabled', 'true');

        // Joga
        var estadoJogo = this.jogar(i);

        console.log(estadoJogo);

        switch (estadoJogo[0]) {
          case 0: // Jogada válida
            // Mudar a peça em jogo
            this.PecaEmJogo = this.PecaEmJogo == 'X' ? 'O' : 'X';
            // Mudar a label que indica a peça em jogo
            document.getElementById('txtPecaemJogo').innerText =
              this.PecaEmJogo;
            break;
          case 1: // Vitória do jogador 1
            this.terminarJogo(estadoJogo);
            document.getElementById('nrVitorias1').innerText = String(
              Number(document.getElementById('nrVitorias1').innerText) + 1
            );
            break;
          case 2: // Vitória do jogador 2
            this.terminarJogo(estadoJogo);
            document.getElementById('nrVitorias2').innerText = String(
              Number(document.getElementById('nrVitorias2').innerText) + 1
            );
            break;
          case 3: // Empate
            this.terminarJogo(estadoJogo);
            document.getElementById('nrEmpates').innerText = String(
              Number(document.getElementById('nrEmpates').innerText) + 1
            );
            break;
          default:
            break;
        }

        console.log(this.PecaEmJogo);
      }
    }
  }

  jogar(posicaoJogada) {
    // Colocar a peça em jogo no tabuleiro
    this.GameBoard[posicaoJogada] = this.PecaEmJogo;

    // Verificar vitoria
    if (this.verificarVitoria()) {
      this.FimDeJogo = true;
      if (this.PecaEmJogo === 'X') {
        return [1, 'Vitória do jogador 1!'];
      }
      return [2, 'Vitória do jogador 2!'];
    }

    // Verificar se o tabuleiro está cheio
    if (this.isFullBoard()) {
      this.FimDeJogo = true;
      return [3, 'Empate'];
    }

    return [0, 'Jogada valida'];
  }

  verificarVitoria() {
    return (
      (this.GameBoard[0] == this.PecaEmJogo &&
        this.GameBoard[1] == this.PecaEmJogo &&
        this.GameBoard[2] == this.PecaEmJogo) ||
      (this.GameBoard[3] == this.PecaEmJogo &&
        this.GameBoard[4] == this.PecaEmJogo &&
        this.GameBoard[5] == this.PecaEmJogo) ||
      (this.GameBoard[6] == this.PecaEmJogo &&
        this.GameBoard[7] == this.PecaEmJogo &&
        this.GameBoard[8] == this.PecaEmJogo) ||
      (this.GameBoard[0] == this.PecaEmJogo &&
        this.GameBoard[3] == this.PecaEmJogo &&
        this.GameBoard[6] == this.PecaEmJogo) ||
      (this.GameBoard[1] == this.PecaEmJogo &&
        this.GameBoard[4] == this.PecaEmJogo &&
        this.GameBoard[7] == this.PecaEmJogo) ||
      (this.GameBoard[2] == this.PecaEmJogo &&
        this.GameBoard[5] == this.PecaEmJogo &&
        this.GameBoard[8] == this.PecaEmJogo) ||
      (this.GameBoard[0] == this.PecaEmJogo &&
        this.GameBoard[4] == this.PecaEmJogo &&
        this.GameBoard[8] == this.PecaEmJogo) ||
      (this.GameBoard[2] == this.PecaEmJogo &&
        this.GameBoard[4] == this.PecaEmJogo &&
        this.GameBoard[6] == this.PecaEmJogo)
    );
  }

  isFullBoard() {
    console.log(this.GameBoard.length);

    for (var i = 0; i < this.GameBoard.length; i++) {
      console.log(this.GameBoard[i]);

      if (this.GameBoard[i] === '') {
        return false;
      }
    }
    return true;
  }

  terminarJogo(estadoJogo) {
    alert(estadoJogo[1]);

    for (var i = 0; i < 9; i++) {
      var btn = document.getElementById(String(i));

      // Desativa o botão
      btn.setAttribute('disabled', '');
    }

    this.isbtnTerminarJogadaDisabled = true;
    this.isbtnJogarNovamenteDisabled = false;
  }

  jogarNovamente() {
    this.comecarJogo();

    this.isbtnTerminarJogadaDisabled = false;
    this.isbtnJogarNovamenteDisabled = true;
  }

  comecarJogo() {
    this.Setup();

    for (var i = 0; i < 9; i++) {
      var btn = document.getElementById(String(i));

      // colocar o texto de todos os botões a ""
      btn.innerText = '.';

      // colocar todos os botões enable
      // se os botões estiverem desativos
      if (btn.getAttribute('disabled') !== null) {
        btn.removeAttribute('disabled');
      }
    }
    document.getElementById('txtPecaemJogo').innerText = this.PecaEmJogo;
  }

  jogar2(btnChosen) {
    console.log(btnChosen);
    var txtBtnSel = btnChosen.srcElement.innerText;
    var posicao = btnChosen.srcElement.getAttribute('id');
    var isEnable = btnChosen.srcElement.getAttribute('disabled');
    // isEnable = null - botao ativo, isEnable = "" botao desativado;

    console.log(posicao);
    console.log(isEnable);
    console.log(txtBtnSel);
  }
}
