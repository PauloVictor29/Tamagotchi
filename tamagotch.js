const readline = require('readline');

class Tamagotchi {
    constructor(nome) {
        this.nome = nome;
        this.fome = 0;
        this.felicidade = 100;
        this.vida = 100;
        this.vivo = true;
        this.animal = '🐶';
    }

    alimentar() {
        if (this.vivo) {
            this.fome -= 10;
            if (this.fome < 0) this.fome = 0;
            console.log(`${this.nome} foi alimentado! 🍖`);
        } else {
            console.log(`${this.nome} não está mais vivo.`);
        }
    }

    brincar() {
        if (this.vivo) {
            this.felicidade += 10;
            if (this.felicidade > 100) this.felicidade = 100;
            console.log(`${this.nome} brincou e está mais feliz! 🎉`);
        } else {
            console.log(`${this.nome} não está mais vivo.`);
        }
    }

    atualizarEstado() {
        if (this.vivo) {
            this.fome += 10;
            this.vida -= 5;

            if (this.fome >= 100 || this.vida <= 0) {
                this.vivo = false;
                console.log(`${this.nome} morreu de fome ou tristeza. 😢 Game Over!`);
            }
        }
    }

    status() {
        console.log(`\n${this.nome} (${this.animal})`);
        console.log(`Fome: ${this.fome}%`);
        console.log(`Felicidade: ${this.felicidade}%`);
        console.log(`Vida: ${this.vida}%`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function iniciarJogo() {
    rl.question('Qual é o nome do seu tamagotchi? ', (nome) => {
        const tamagotchi = new Tamagotchi(nome);

        const gameLoop = setInterval(() => {
            tamagotchi.atualizarEstado();
            tamagotchi.status();

            if (!tamagotchi.vivo) {
                clearInterval(gameLoop);
                console.log('\nO jogo acabou. Obrigado por jogar!');
                rl.close();
            }
        }, 15000); // Atualização a cada 5 segundos

        const interacaoUsuario = () => {
            if (tamagotchi.vivo) {
                rl.question(`\nO que você quer fazer com ${tamagotchi.nome}? (alimentar/brincar/sair) `, (resposta) => {
                    if (resposta.toLowerCase() === 'alimentar') {
                        tamagotchi.alimentar();
                    } else if (resposta.toLowerCase() === 'brincar') {
                        tamagotchi.brincar();
                    } else if (resposta.toLowerCase() === 'sair') {
                        console.log('\nAté logo!');
                        clearInterval(gameLoop);
                        rl.close();
                        return;
                    } else {
                        console.log('\nOpção inválida. Tente novamente.');
                    }

                    interacaoUsuario(); // Continuar interação
                });
            } else {
                console.log('\nSeu Tamagotchi morreu. :(');
                clearInterval(gameLoop);
                rl.close();
            }
        };

        tamagotchi.status(); // Mostrar status inicial
        interacaoUsuario(); // Iniciar interação com o usuário
    });
}

iniciarJogo();
