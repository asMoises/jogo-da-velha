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
let marcador = "X";

const sectionModal = document.getElementById("section-modal");
const divNameModal = document.createElement("div");
const divModalContent = document.createElement("div");
const h2Modal = document.createElement("h2");
const labelPlayer1 = document.createElement("label");
const player1Input = document.createElement("input");
const labelPlayer2 = document.createElement("label");
const player2Input = document.createElement("input");
const startButton = document.createElement("button");

const div00 = document.getElementById("0-0");
const div01 = document.getElementById("0-1");
const div02 = document.getElementById("0-2");
const div10 = document.getElementById("1-0");
const div11 = document.getElementById("1-1");
const div12 = document.getElementById("1-2");
const div20 = document.getElementById("2-0");
const div21 = document.getElementById("2-1");
const div22 = document.getElementById("2-2");

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

  divModalContent.append(
    h2Modal,
    labelPlayer1,
    player1Input,
    labelPlayer2,
    player2Input,
    startButton
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

  jogo.player1 = player1Name;
  jogo.player2 = player2Name;

  if (player1Name === "" || player2Name === "") {
    alert("Por favor, insira os nomes dos jogadores.");
    return;
  }

  // Atualiza os nomes na interface
  document.getElementById("player1-span").textContent = player1Name;
  document.getElementById("player2-span").textContent = player2Name;

  // Esconde o modal
  divNameModal.classList.add("hidden");

  // Escolhe aleatoriamente quem começa
  const escolha = Math.floor(Math.random() * 2);
  const playerSelecionado = escolha === 0 ? "player1-span" : "player2-span";
  const playerNaoSelecionado = escolha === 0 ? "player2-span" : "player1-span";

  // Remove a classe do jogador não selecionado
  document
    .getElementById(playerNaoSelecionado)
    .classList.remove("selected-player");

  // Adiciona a classe ao jogador selecionado
  document.getElementById(playerSelecionado).classList.add("selected-player");

  // Atualiza a variável de controle do turno
  jogo.jogadorAtual = playerSelecionado;
});

function runGame() {
  let lastClick = 0;
  const divs = document.querySelectorAll(".cell");
  divs.forEach((div, i) => {
    div.addEventListener("click", () => {
      if (div.textContent === "") {
        div.textContent = marcador;
        div.style.color = marcador === "X" ? "#ff0000" : "black"; // Define a cor
        marcador = marcador === "X" ? "O" : "X";
        lastClick = i;
      } else {
        alert("Posição já marcada");
      }

      // check de fim de jogo
      // 00 01 02
      // 10 11 12
      // 20 21 22
      console.log(i);
    });
  });
}

runGame();
