import React, { useState } from "react";
import { FaCheck, FaEdit, FaTrash, FaPlus, FaRegTrashAlt } from "react-icons/fa"; // Importando ícones do react-icons

function App() {
  const [texto, setTexto] = useState("");
  const [dataHora, setDataHora] = useState(""); // Estado para armazenar a data e hora selecionadas
  const [tarefas, setTarefas] = useState([]);
  const [indiceEdicao, setIndiceEdicao] = useState(null);
  const [filtro, setFiltro] = useState("todas"); // "todas", "concluidas", "pendentes"
  const [mensagem, setMensagem] = useState(""); // Estado para mensagens
  const [mensagemTipo, setMensagemTipo] = useState(""); // Tipo de mensagem (erro, sucesso)

  // Função para adicionar ou editar tarefa
  const adicionarOuEditarTarefa = () => {
    if (texto.trim() && dataHora) { // Verifica se o texto e data/hora não estão vazios
      if (indiceEdicao !== null) {
        const tarefasAtualizadas = tarefas.map((tarefa, index) =>
          index === indiceEdicao ? { ...tarefa, texto, dataHora } : tarefa
        );
        setTarefas(tarefasAtualizadas);
        setIndiceEdicao(null);
        setMensagem("Tarefa atualizada com sucesso!");
        setMensagemTipo("sucesso");
      } else {
        setTarefas([...tarefas, { texto, concluida: false, dataHora }]);
        setMensagem("Tarefa adicionada com sucesso!");
        setMensagemTipo("sucesso");
      }
      setTexto("");
      setDataHora(""); // Limpar o campo de data/hora após adicionar
    } else {
      setMensagem("Por favor, preencha todos os campos (texto e data/hora).");
      setMensagemTipo("erro");
    }
  };

  // Alternar a conclusão da tarefa
  const alternarConclusao = (index) => {
    setTarefas(
      tarefas.map((tarefa, i) =>
        i === index ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
    setMensagem("Tarefa concluída!");
    setMensagemTipo("sucesso");
  };

  // Remover tarefa
  const removerTarefa = (index) => {
    setTarefas(tarefas.filter((_, i) => i !== index));
    setMensagem("Tarefa removida com sucesso!");
    setMensagemTipo("sucesso");
  };

  // Iniciar edição de uma tarefa
  const iniciarEdicao = (index) => {
    setTexto(tarefas[index].texto);
    setDataHora(tarefas[index].dataHora); // Preencher o campo de data/hora na edição
    setIndiceEdicao(index);
  };

  // Limpar tarefas concluídas
  const limparConcluidas = () => {
    setTarefas(tarefas.filter((tarefa) => !tarefa.concluida));
    setMensagem("Tarefas concluídas removidas!");
    setMensagemTipo("sucesso");
  };

  // Filtrar tarefas de acordo com o estado selecionado
  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "concluidas") return tarefa.concluida;
    if (filtro === "pendentes") return !tarefa.concluida;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Cabeçalho removido do fixo */}
      <header className="bg-blue-600 text-white py-6 w-full">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold">Lista de Tarefas</h1>
          <p className="text-lg mt-2">Organize suas tarefas de forma eficiente</p>
        </div>
      </header>

      {/* Espaço extra para compensar o cabeçalho removido */}
      <div className="mt-24 flex justify-center w-full">
        {/* Seção de Tarefas */}
        <section className="bg-white flex-col shadow rounded-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tarefas</h2>

          {/* Área de Mensagens */}
          {mensagem && (
            <div
              className={`mb-4 p-4 text-center rounded ${mensagemTipo === "erro" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
            >
              {mensagem}
            </div>
          )}

          {/* Formulário de Adicionar/Editar Tarefa */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Adicione uma nova tarefa..."
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="datetime-local"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-green-500 text-white flex justify-center items-center rounded hover:bg-green-600 w-full sm:w-auto"
                onClick={adicionarOuEditarTarefa}
              >
                <FaPlus size={20} />
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <p className="text-gray-600">{`Tarefas: ${tarefas.length}`}</p>
            <div className="flex gap-2 sm:gap-4">
              <button
                className={`px-4 py-2 rounded ${
                  filtro === "todas"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setFiltro("todas")}
              >
                Todas
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filtro === "concluidas"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setFiltro("concluidas")}
              >
                Concluídas
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  filtro === "pendentes"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => setFiltro("pendentes")}
              >
                Pendentes
              </button>
            </div>
          </div>

          {/* Lista de Tarefas */}
          <ul className="space-y-2">
            {tarefasFiltradas.map((tarefa, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded ${
                  tarefa.concluida ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <div
                  className={`flex-1 ${
                    tarefa.concluida
                      ? "line-through text-gray-500"
                      : "text-gray-700"
                  }`}
                  style={{ wordWrap: "break-word" }} // Quebra de linha no texto
                >
                  {tarefa.texto}
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm text-gray-500">{tarefa.dataHora}</span>
                  <div className="flex flex-row gap-1">
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alternarConclusao(index)}
                    >
                      <FaCheck size={18} />
                    </button>
                    <button
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => iniciarEdicao(index)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => removerTarefa(index)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Botão para limpar concluídas */}
          {tarefas.some((tarefa) => tarefa.concluida) && (
            <div className="mt-4 text-right">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={limparConcluidas}
              >
                <FaRegTrashAlt size={18} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
