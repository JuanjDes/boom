const countdown = document.getElementById('countdown');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const input = document.getElementById('userInput');


// PRESIONO ENTER
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && input.value > 0) {
        ejecutar();
    }
});

// CLICKO FUERA
input.addEventListener('blur', () => {
    if (input.value > 0) {
        ejecutar();
    }
});

// REINICIO JUEGO
restart.addEventListener('click', () => {
    // recargar pagina
    location.reload();
});



// -------------------- AL RECARGAR LA PAGINA PONEMOS EL INPUT A 0 --------------------
window.addEventListener('DOMContentLoaded', () => {
    input.value = 0;
});



// -------------------- FUNCION PRINCIPAL DEL JUEGO --------------------
function ejecutar() {
    if (input.disabled) return; // evitamos múltiples ejecuciones. detenemos la ejecucion de la función
    input.disabled = true;  // desabilitamos input durante el juego

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
        }, 1000);
    });
}

// FUNCION QUE MUESTRA EL GANADOR
function mostrarGanador(aleat, inputValor) {
    if (parseInt(inputValor) === aleat) {
        result.innerHTML = `
            <p>He pensado en el número: ${aleat} Tu has introducido el número: ${inputValor}</p>
                            <p>Has salvado el mundo !</p>`;
    } else {
        result.innerHTML = `
            <p>He pensado en el número: ${aleat} Tu has introducido el número: ${inputValor}</p>
                            <p>Has perdido, prueba otra vez.</p>`;
    }

};