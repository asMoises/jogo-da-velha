/*## Tic-Tac-Toe / Jogo da Velha

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
const player1 = document.getElementById("player1-span");
const player2 = document.getElementById("player2-span");

document.getElementById("novo-jogo").addEventListener("click", (e) => {
  jogo.player1 = prompt("Nome do primeiro jogador: ");
  jogo.player2 = prompt("Nome do segundo jogador: ");

  player1.textContent = jogo.player1;
  player2.textContent = jogo.player2;

  console.log(jogo);
});
