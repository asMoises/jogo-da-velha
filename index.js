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
let game = {};
game.Marker = "X";
game.player1 = "";
game.player2 = "";
game.posPlayer1 = [];
game.posPlayer2 = [];
game.click = 0;
game.resultGame = [];

let ticTacToe = [
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
const divs = document.querySelectorAll(".cell");
const divNameModal = document.createElement("div");
const divModalContent = document.createElement("div");
const h2Modal = document.createElement("h2");
const labelPlayer1 = document.createElement("label");
const player1Input = document.createElement("input");
const labelPlayer2 = document.createElement("label");
const player2Input = document.createElement("input");
const startButton = document.createElement("button");
const cancelButton = document.createElement("button");

// Creating modals
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

// button start actions
startButton.addEventListener("click", () => {
  divs.forEach((div) => {
    div.textContent = "";
    game.click = 0;
    resetWinnerHighlight();
  });
  game.posPlayer1 = [];
  game.posPlayer2 = [];

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
  game.player1 = player1Name;
  game.player2 = player2Name;

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

// *** Functions
function showModal() {
  divNameModal.classList.remove("hidden");
}

function changePLayer(selecionado, naoSelecionado) {
  // Remove the non-selected player css-class
  document.getElementById(naoSelecionado).classList.remove("selected-player");

  // set the chosen player to css-class
  document.getElementById(selecionado).classList.add("selected-player");

  // set the  data to selected player and non-selected player
  game.tagRunningPlayer = selecionado;
  game.tagWaitingPlayer = naoSelecionado;
  game.runningPlayer = document.getElementById(selecionado).textContent;
  game.waitingPlayer = document.getElementById(naoSelecionado).textContent;
}

// apply the css style to the winner
function highlightWinner(combo) {
  combo.forEach((pos) => {
    document.getElementById(`pos_${pos}`).classList.add("winner");
  });
}

// remove the winner's css style
function resetWinnerHighlight() {
  document.querySelectorAll(".cell.winner").forEach((cell) => {
    cell.classList.remove("winner");
  });
}

// check the match position beteew the player position and winner positions
function checkWin(posPlayer, combinacoes) {
  for (let combinacao of combinacoes) {
    if (combinacao.every((num) => posPlayer.includes(num))) {
      return combinacao; // Retorna a combinação vencedora
    }
  }
  return null; // in caso of no winner.
}

// Main Function
function runGame() {
  // nodelist com as posições do jogo da velha
  divs.forEach((div, i) => {
    div.addEventListener("click", () => {
      if (game.player1 === "" || game.player2 === "") {
        alert("Para iniciar o jogo digite os nomes dos jogadores");
        return;
      } else {
        if (div.textContent === "") {
          // click's counter
          game.click++;
          console.log("Clicks: " + game.click);

          // set X or O on the display
          div.textContent = game.Marker;
          div.style.color = game.Marker === "X" ? "#ff0000" : "black"; // Define a cor
          game.Marker = game.Marker === "X" ? "O" : "X";

          // if player 1
          if (game.runningPlayer === game.player1) {
            game.posPlayer1.push(i); // set the position to the running player
            if (game.posPlayer1.length >= 3) {
              // recieve the winner combination
              game.resultGame = checkWin(game.posPlayer1, ticTacToe);
              if (game.resultGame) {
                // if true, game is done!
                console.log("Venceu com a combinação:", game.resultGame);
                // set the winner's style
                highlightWinner(game.resultGame);
                return;
              }
            }

            // if player 2
          } else {
            game.posPlayer2.push(i);
            if (game.posPlayer2.length >= 3) {
              // recieve the winner combination
              game.resultGame = checkWin(game.posPlayer2, ticTacToe);
              if (game.resultGame) {
                // if true, game is done!
                console.log("Venceu com a combinação:", game.resultGame);
                // set the winner's style
                highlightWinner(game.resultGame);
                return;
              }
            }
          }

          printingGame();

          // changing plyaers
          let changing = game.tagRunningPlayer;
          game.tagRunningPlayer = game.tagWaitingPlayer;
          game.tagWaitingPlayer = changing;

          changePLayer(game.tagRunningPlayer, game.tagWaitingPlayer);

          console.log("vamos ver o click?");
          // check no winners
          if (game.click == 9) {
            console.log(game.click);
            let confirmation = confirm("Empate!");

            if (confirmation) {
              document.getElementById("player1-span").textContent =
                "Jogador...";
              document.getElementById("player2-span").textContent =
                "Jogador...";
              makerLeft.textContent = "";
              makerRight.textContent = "";

              document
                .getElementById("player1-span")
                .classList.remove("selected-player");
              document
                .getElementById("player2-span")
                .classList.remove("selected-player");

              divs.forEach((e) => {
                e.textContent = "";
                resetWinnerHighlight();
              });
            }
          }
        } else {
          alert("Posição já marcada");
        }
      }
    });
  });
}

// aux function
function printingGame() {
  let texto =
    "\nPosições de " +
    game.player1 +
    " = [" +
    game.posPlayer1 +
    "]" +
    "\nPosições de: " +
    game.player2 +
    " = [" +
    game.posPlayer2 +
    "]";

  console.log(texto);
}

runGame();
