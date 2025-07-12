// Seleciona os elementos
const form = document.querySelector(".todo-form");
const inputNome = form.querySelectorAll("#text-input")[0];
const inputEtiqueta = form.querySelectorAll("#text-input")[1];
const lista = document.querySelector("ul");
const rodape = document.querySelector(".footer-final p");

// Lista de tarefas iniciais
let tarefas = [
    {
        id: 1,
        nome: "Implementar tela de listagem de tarefas",
        etiqueta: "frontend",
        data: "21/08/2024",
        concluida: false
    },
    {
        id: 2,
        nome: "Criar endpoint para cadastro de tarefas",
        etiqueta: "backend",
        data: "21/08/2024",
        concluida: false
    },
    {
        id: 3,
        nome: "Implementar protótipo da listagem de tarefas",
        etiqueta: "ux",
        data: "21/08/2024",
        concluida: true
    }
];

// Renderiza toda a lista
function renderizarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.className = "total-list";

        const div = document.createElement("div");
        div.className = "toda-list";

        const p = document.createElement("p");
        p.textContent = tarefa.nome;
        if (tarefa.concluida) p.style.textDecoration = "line-through";

        const tag = document.createElement("small");
        tag.className = "tag";
        tag.textContent = tarefa.etiqueta;

        const subTag = document.createElement("small");
        subTag.className = "sub-tag";
        subTag.textContent = `Criado em: ${tarefa.data}`;

        div.appendChild(p);
        div.appendChild(tag);
        div.appendChild(subTag);

        const botao = document.createElement("button");
        botao.className = "add-butto-list";

        if (tarefa.concluida) {
            botao.innerHTML = "✔️";
            botao.disabled = true;
            botao.style.backgroundColor = "#00c26e";
        } else {
            botao.textContent = "concluir";
            botao.addEventListener("click", () => marcarComoConcluida(tarefa.id));
        }

        li.appendChild(div);
        li.appendChild(botao);
        lista.appendChild(li);
    });

    atualizarContador();
}

// Marca uma tarefa como concluída
function marcarComoConcluida(id) {
    tarefas = tarefas.map(t => {
        if (t.id === id) return { ...t, concluida: true };
        return t;
    });
    renderizarTarefas();
}

// Adiciona uma nova tarefa
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const etiqueta = inputEtiqueta.value.trim();

    if (!nome || !etiqueta) return;

    tarefas.push({
        id: Date.now(),
        nome,
        etiqueta,
        data: new Date().toLocaleDateString("pt-BR"),
        concluida: false
    });

    inputNome.value = "";
    inputEtiqueta.value = "";
    renderizarTarefas();
});

// Atualiza o contador de tarefas concluídas
function atualizarContador() {
    const concluidas = tarefas.filter(t => t.concluida).length;
    rodape.textContent = `${concluidas} tarefa${concluidas !== 1 ? "s" : ""} concluída`;
}

// Primeira renderização
renderizarTarefas();
