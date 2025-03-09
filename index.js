/* Tic-Tac-Toe / Jogo da Velha

Construa o jogo da velha. 

O jogo precisa atender aos seguintes requisitos:

- Deve ser possível incluir os nomes dos dois jogadores;
- O nome do jogador da vez deve ser mostrado na tela e alterado a medida que os turnos vão se alternando;
- Um tabuleiro deve ser mostrado na tela e ser atualizado quando o jogador clicar na região que ele quer marcar;
- Quando um jogador clicar no tabuleiro deve ser marcado um “X” ou “O” de acordo com o jogador da vez e não deve ser possível clicar naquela região novamente;
- Quando um jogador ganhar seu nome deve ser mostrado na tela e as regiões da vitória devem ser destacadas de alguma forma;
- Em caso de empate, uma mensagem de empate deve ser mostrada na tela;
- Deve ser possível reiniciar o jogo para jogar novamente.

*/
let jogo = {};
jogo.Marker = "X";
jogo.player1 = "";
jogo.player2 = "";
jogo.posPlayer1 = [];
jogo.posPlayer2 = [];

let resultado = [];

let jogoVelha = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const sectionModal = document.getElementById("section-modal");
const makerLeft = document.getElementById("maker-left-span");
const makerRight = document.getElementById("maker-right-span");

const divNameModal = document.createElement("div");
const divModalContent = document.createElement("div");
const h2Modal = document.createElement("h2");
const labelPlayer1 = document.createElement("label");
const player1Input = document.createElement("input");
const labelPlayer2 = document.createElement("label");
const player2Input = document.createElement("input");
const startButton = document.createElement("button");
const cancelButton = document.createElement("button");

// Cria o modal
document.getElementById("novo-jogo").addEventListener("click", () => {
  divNameModal.id = "nameModal";
  divNameModal.className = "modal";
  divModalContent.className = "modal-content";
  h2Modal.textContent = "Digite os nomes dos jogadores";
  labelPlayer1.textContent = "Jogador 1";
  player1Input.id = "player1-name";
  player1Input.type = "text";
  player1Input.placeholder = "Nome do jogador 1";
  labelPlayer2.textContent = "Jogador 2";
  player2Input.id = "player2-name"; // Corrigido aqui!
  player2Input.type = "text";
  player2Input.placeholder = "Nome do jogador 2";
  startButton.id = "startGame";
  startButton.textContent = "Iniciar Jogo";
  cancelButton.id = "cancelGame";
  cancelButton.textContent = "Cancelar";

  divModalContent.append(
    h2Modal,
    labelPlayer1,
    player1Input,
    labelPlayer2,
    player2Input,
    startButton,
    cancelButton
  );
  divNameModal.appendChild(divModalContent);

  // Mostrar modal ao carregar a página
  sectionModal.appendChild(divNameModal);
});

// insere os jogadores e escolhe o primeiro a jogar
startButton.addEventListener("click", () => {
  // Pegando os nomes digitados
  const player1Name = player1Input.value.trim();
  const player2Name = player2Input.value.trim();

  // se um dos dois ou os dois forem vazios, retorna um alert
  if (player1Name === "" || player2Name === "") {
    alert("Por favor, insira os nomes dos jogadores.");
    return;
  }
  // Atualiza os nomes na interface
  document.getElementById("player1-span").textContent = player1Name;
  document.getElementById("player2-span").textContent = player2Name;

  // adiciona os nomes dos jogadores no obj jogo
  jogo.player1 = player1Name;
  jogo.player2 = player2Name;

  // Escolhe aleatoriamente quem começa
  const escolha = Math.floor(Math.random() * 2);
  const playerSelecionado = escolha === 0 ? "player1-span" : "player2-span";
  const playerNaoSelecionado = escolha === 0 ? "player2-span" : "player1-span";

  if (playerSelecionado === "player1-span") {
    makerLeft.textContent = "X - ";
    makerRight.textContent = " - O";
  } else {
    makerLeft.textContent = "O - ";
    makerRight.textContent = " - X";
  }

  changePLayer(playerSelecionado, playerNaoSelecionado);

  // Esconde o modal
  divNameModal.classList.add("hidden");
});

cancelButton.addEventListener("click", (e) => {
  // Esconde o modal
  divNameModal.classList.add("hidden");
});

function changePLayer(selecionado, naoSelecionado) {
  // Remove a classe do jogador não selecionado
  document.getElementById(naoSelecionado).classList.remove("selected-player");

  // Adiciona a classe ao jogador selecionado
  document.getElementById(selecionado).classList.add("selected-player");

  // Atualiza a variável de controle do turno
  jogo.tagJogadorAtual = selecionado;
  jogo.tagJogadorEmEspera = naoSelecionado;
  jogo.jogadorAtual = document.getElementById(selecionado).textContent;
  jogo.jogadorEmEspera = document.getElementById(naoSelecionado).textContent;
  //printJogo();
}

function verificaVitoria(posPlayer, combinacoes) {
  return combinacoes.some((combinacao) =>
    combinacao.every((num) => posPlayer.includes(num))
  );
}

function verificaVitoria2(posPlayer, combinacoes) {
  for (let combinacao of combinacoes) {
    if (combinacao.every((num) => posPlayer.includes(num))) {
      return combinacao; // Retorna a combinação vencedora
    }
  }
  return null; // Se não houver vitória, retorna null
}

function highlightWinner(combo) {
  combo.forEach((pos) => {
    document.getElementById(`pos_${pos}`).classList.add("winner");
  });
}

function runGame() {
  const divs = document.querySelectorAll(".cell");

  // nodelist com as posições do jogo da velha
  divs.forEach((div, i) => {
    div.addEventListener("click", () => {
      if (jogo.player1 == "" || jogo.player2 === "") {
        alert("Para iniciar o jogo digite os nomes dos jogadores");
        return;
      } else {
        if (div.textContent === "") {
          // Coloca X ou O no jogo
          div.textContent = jogo.Marker;
          div.style.color = jogo.Marker === "X" ? "#ff0000" : "black"; // Define a cor
          jogo.Marker = jogo.Marker === "X" ? "O" : "X";

          if (jogo.jogadorAtual === jogo.player1) {
            jogo.posPlayer1.push(i);
            if (jogo.posPlayer1.length >= 3) {
              resultado = verificaVitoria2(jogo.posPlayer1, jogoVelha);
              if (resultado) {
                console.log("Venceu com a combinação:", resultado);
                highlightWinner(resultado);
              }
            }
          } else {
            jogo.posPlayer2.push(i);
            if (jogo.posPlayer2.length >= 3) {
              resultado = verificaVitoria2(jogo.posPlayer2, jogoVelha);
              if (resultado) {
                console.log("Venceu com a combinação:", resultado);
                highlightWinner(resultado);
              }
            }
          }

          printJogo();

          // troca a vez do jogador
          let troca = jogo.tagJogadorAtual;
          jogo.tagJogadorAtual = jogo.tagJogadorEmEspera;
          jogo.tagJogadorEmEspera = troca;

          changePLayer(jogo.tagJogadorAtual, jogo.tagJogadorEmEspera);
        } else {
          alert("Posição já marcada");
        }
      }
    });
  });
}

function printJogo() {
  let texto =
    "\nPosições de " +
    jogo.player1 +
    " = [" +
    jogo.posPlayer1 +
    "]" +
    "\nPosições de: " +
    jogo.player2 +
    " = [" +
    jogo.posPlayer2 +
    "]";

  console.log(texto);
}

runGame();
