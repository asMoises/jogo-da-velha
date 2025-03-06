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

const sectionModal = document.getElementById("section-modal");
const divNameModal = document.createElement("div");
const divModalContent = document.createElement("div");
const h2Modal = document.createElement("h2");
const labelPlayer1 = document.createElement("label");
const player1Input = document.createElement("input");
const labelPlayer2 = document.createElement("label");
const player2Input = document.createElement("input");
const startButton = document.createElement("button");

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

  // Esconde o modal
  divNameModal.classList.add("hidden");

  // Escolhe aleatoriamente quem começa
  const escolha = Math.floor(Math.random() * 2);
  const playerSelecionado = escolha === 0 ? "player1-span" : "player2-span";
  const playerNaoSelecionado = escolha === 0 ? "player2-span" : "player1-span";

  changePLayer(playerSelecionado, playerNaoSelecionado);
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
          } else {
            jogo.posPlayer2.push(i);
          }

          // troca a vez do jogador
          let troca = jogo.tagJogadorAtual;
          jogo.tagJogadorAtual = jogo.tagJogadorEmEspera;
          jogo.tagJogadorEmEspera = troca;

          changePLayer(jogo.tagJogadorAtual, jogo.tagJogadorEmEspera);
          printJogo();

          // check de fim de jogo
          // pos_0 pos_1 pos_2
          // pos_3 pos_4 pos_5
          // pos_6 pos_7 pos_8

          // posições vencedoras
          // 00 01 02
          // 00 10 20
          // 00 11 22
          // 01 11 21
          // 01 12 22
          // 02 11 20
          // 10 11 12
          // 20 21 22
        } else {
          alert("Posição já marcada");
        }
      }
    });
  });
}

function printJogo() {
  let texto =
    "Player 01: " +
    jogo.player1 +
    "\nPlayer 02: " +
    jogo.player2 +
    "\nAtual: " +
    jogo.jogadorAtual +
    "\nEm espera: " +
    jogo.jogadorEmEspera +
    "\n********************" +
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
