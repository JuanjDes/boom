const countdown = document.getElementById('countdown');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const input = document.getElementById('userInput');

// PRESIONO ENTER
input.addEventListener('keydown', () => {
    ejecutar();
});

// CLICKO FUERA
input.addEventListener('blur', () => {
    ejecutar();
});

// REINICIO JUEGO
restart.addEventListener('click', () => {
    // recargar pagina
    location.reload();
    input.value = 0;
});

// AL RECARGAR LA PAGINA PONEMOS EL INPUT A 0
window.addEventListener('DOMContentLoaded', () => {
    input.value = 0;
});

// FUNCION PRINCIPAL DEL JUEGO
function ejecutar() {
    const aleatorio = new Promise((resolve) => {
        setTimeout(() => {
            const aleat = Math.floor(Math.random() * 3) + 1;
            result.innerHTML = `<p>Pensando ... </p>`;
            resolve(aleat);
        }, 2000);
    });

    aleatorio.then((aleat) => {
        // CONTADOR
        let counter = 5;
        const interval = setInterval(() => {
            countdown.textContent = 'Cuenta atrás... ' + counter;
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                mostrarGanador(aleat, input.value);
            }

            if (input.value == aleat) {
                clearInterval(interval);
                mostrarGanador(aleat, input.value);
            }
        }, 1000);
    });
}

// FUNCION QUE MUESTRA EL GANADOR
function mostrarGanador(aleat, input) {
    result.innerHTML = `<p>He pensado en el número: ${aleat} Tu has introducido el número: ${input}</p>
                        <p>Has perdido!</p>`;
    console.log('Introducido: ', input);
    console.log('Pensado: ', aleat);
    input.disabled = true;
};
