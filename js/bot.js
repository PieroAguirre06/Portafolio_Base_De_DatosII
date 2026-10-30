// bot.js — Asistente virtual del portafolio

(function() {
    // 1. Inyectar los estilos (CSS) del bot
    const style = document.createElement('style');
    style.innerHTML = `
        .bot-btn {
            position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px;
            background: var(--gold, #C9A15D); color: #1c1608; border-radius: 50%;
            display: flex; align-items: center; justify-content: center; font-size: 30px;
            cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 1000;
            transition: transform 0.2s;
        }
        .bot-btn:hover { transform: scale(1.1); }
        
        .bot-window {
            position: fixed; bottom: 90px; right: 20px; width: 350px; height: 500px;
            background: var(--panel, #211B14); border: 1px solid var(--gold, #C9A15D);
            border-radius: 10px; display: none; flex-direction: column; z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8); font-family: 'Inter', sans-serif;
            overflow: hidden;
        }
        .bot-window.open { display: flex; }
        
        .bot-header {
            background: linear-gradient(180deg, #2a2013, #1a1410); padding: 15px;
            border-bottom: 1px solid var(--line, #35301F); display: flex;
            align-items: center; justify-content: space-between; color: var(--gold-bright, #E7C67B);
            font-weight: bold;
        }
        .bot-close { cursor: pointer; font-size: 18px; color: var(--cream-dim, #A99E88); }
        .bot-close:hover { color: white; }
        
        .bot-messages {
            flex: 1; padding: 15px; overflow-y: auto; display: flex;
            flex-direction: column; gap: 10px;
        }
        .msg { max-width: 85%; padding: 10px 14px; border-radius: 10px; font-size: 0.85rem; line-height: 1.4; }
        .msg.bot { background: var(--bg-soft, #1C1811); color: var(--cream, #EAE2CF); align-self: flex-start; border-bottom-left-radius: 0; }
        .msg.user { background: var(--gold, #C9A15D); color: #1c1608; align-self: flex-end; border-bottom-right-radius: 0; }
        
        .bot-input-area {
            padding: 10px; border-top: 1px solid var(--line, #35301F);
            display: flex; gap: 8px; background: var(--bg-soft, #1C1811);
        }
        .bot-input {
            flex: 1; background: var(--panel, #211B14); border: 1px solid var(--line, #35301F);
            color: white; padding: 10px; border-radius: 20px; outline: none; font-family: 'Inter', sans-serif;
        }
        .bot-send {
            background: var(--gold, #C9A15D); color: #1c1608; border: none;
            width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    // 2. Crear la interfaz (HTML)
    const botHTML = `
        <div class="bot-btn" id="botBtn">💬</div>
        <div class="bot-window" id="botWindow">
            <div class="bot-header">
                <span>🤖 Asistente BD II</span>
                <span class="bot-close" id="botClose">✕</span>
            </div>
            <div class="bot-messages" id="botMessages">
                <div class="msg bot">¡Hola! Soy el asistente virtual de Piero. Puedo explicarte de qué trata el curso, cómo ver las tareas o qué encontrarás en cada Unidad. ¿Qué deseas saber?</div>
            </div>
            <div class="bot-input-area">
                <input type="text" class="bot-input" id="botInput" placeholder="Escribe tu pregunta aquí...">
                <button class="bot-send" id="botSend">➤</button>
            </div>
        </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = botHTML;
    document.body.appendChild(container);

    // 3. Lógica del Chatbot
    const btn = document.getElementById('botBtn');
    const windowEl = document.getElementById('botWindow');
    const closeBtn = document.getElementById('botClose');
    const input = document.getElementById('botInput');
    const sendBtn = document.getElementById('botSend');
    const messagesEl = document.getElementById('botMessages');

    btn.addEventListener('click', () => windowEl.classList.toggle('open'));
    closeBtn.addEventListener('click', () => windowEl.classList.remove('open'));

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `msg ${sender}`;
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function processInput() {
        const text = input.value.trim().toLowerCase();
        if (!text) return;

        addMessage(input.value, 'user');
        input.value = '';

        // Simular que el bot está escribiendo
        setTimeout(() => {
            let response = "";
            
            // Base de conocimiento del bot
            if (text.includes("hola") || text.includes("buenas") || text.includes("quien eres")) {
                response = "¡Hola! Soy un bot creado para guiarte en el portafolio de Base de Datos II de Piero Aguirre. Te puedo decir cómo ver los PDFs, de qué trata el curso o cómo entrar como administrador.";
            } 
            else if (text.includes("curso") || text.includes("de que trata") || text.includes("base de datos")) {
                response = "El curso es 'Base de Datos II' de la UPLA. Trata sobre el diseño de bases de datos, modelo Entidad-Relación, Normalización (1FN, 2FN, 3FN), SQL avanzado, transacciones ACID, y administración en la nube (Azure). Todo está dividido en 4 Unidades.";
            }
            else if (text.includes("donde estan") || text.includes("tareas") || text.includes("trabajos") || text.includes("ver los pdf") || text.includes("actividades")) {
                response = "Para ver las tareas, ve a la pestaña 'Unidades' en el menú superior. Verás las 4 unidades. Si haces clic en 'Semana 1', 'Semana 5', etc., se abrirá una página con todas las actividades y podrás visualizar los PDFs y scripts directamente en la pantalla.";
            }
            else if (text.includes("azure") || text.includes("nube") || text.includes("semana 5")) {
                response = "La Semana 5 (Unidad II) contiene todo sobre Azure. Ahí encontrarás manuales para crear una cuenta, crear bases de datos, scripts SQL y cómo conectarse usando SSMS (SQL Server Management Studio).";
            }
            else if (text.includes("imagenes") || text.includes("infografia") || text.includes("preguntas")) {
                response = "Las infografías y ejercicios prácticos (como las 20 preguntas de SQL) se encuentran en las semanas 4, 6, 7 y 8 de la Unidad I y II. Puedes verlas haciendo clic en las actividades correspondientes.";
            }
            else if (text.includes("quien hizo") || text.includes("creador") || text.includes("piero") || text.includes("autor")) {
                response = "Este portafolio fue desarrollado y organizado por Piero Aguirre Osores, estudiante de Ingeniería de Sistemas y Computación en la Universidad Peruana Los Andes (Huancayo). Puedes conocer más de él en la pestaña 'Sobre mí'.";
            }
            else if (text.includes("admin") || text.includes("contraseña") || text.includes("usuario") || text.includes("editar")) {
                response = "El sitio cuenta con un modo Administrador. Para entrar, ve a 'Mi cuenta', elige Administrador e ingresa: Usuario: piero.aguirre / Contraseña: bd2-2026. Esto permite editar textos y agregar archivos.";
            }
            else if (text.includes("sql") || text.includes("script") || text.includes("codigo")) {
                response = "Los scripts SQL (como Cadena Editorial o Grados y Títulos) se pueden visualizar directamente en la web con colores de sintaxis, y también puedes copiarlos o descargarlos desde el botón inferior del visor.";
            }
            else {
                response = "No estoy seguro de eso, pero te recomiendo navegar por el menú. En la sección 'Unidades' encontrarás todo el material del curso. Si tienes otra duda sobre 'Azure', 'SQL' o 'Semana', intenta preguntarme con esas palabras.";
            }

            addMessage(response, 'bot');
        }, 600); // Retraso de 0.6 segundos para simular inteligencia artificial
    }

    sendBtn.addEventListener('click', processInput);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processInput();
    });
})();