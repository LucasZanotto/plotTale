import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Navegação entre páginas

const Home = () => {
  const [filtro, setFiltro] = useState("");  // Estado para o filtro
  const [livros, setLivros] = useState([]);  // Estado para armazenar os livros
  const [livrosFiltrados, setLivrosFiltrados] = useState([]); // Estado para armazenar os livros filtrados
  const navigate = useNavigate();

  // Função para buscar os livros da API
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setLivros(response.data); // Salva os livros vindos do backend no estado
        setLivrosFiltrados(response.data); // Inicializa com todos os livros
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchLivros(); // Chama a função quando o componente é montado
  }, []);

  // Função para navegar até o perfil do autor logado
  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Função para filtrar os livros pelo nome
  const handleFilterChange = (event) => {
    const textoFiltro = event.target.value.toLowerCase();
    setFiltro(textoFiltro);

    // Filtra os livros com base no texto digitado
    const livrosFiltrados = livros.filter((livro) =>
      livro.title.toLowerCase().includes(textoFiltro)
    );
    setLivrosFiltrados(livrosFiltrados); // Atualiza o estado com os livros filtrados
  };

  // Função para navegar para a página do livro específico
  const handleCardClick = (livroId) => {
    navigate(`/books/${livroId}`);
  };

  return (
    <div className="home">
      {/* Header com o ícone de perfil */}
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <img
          src="/path/to/profile-icon.png" // Substitua com o caminho do ícone de perfil
          alt="Ícone de Perfil"
          style={{ cursor: "pointer", width: "40px", height: "40px" }}
          onClick={handleProfileClick}
        />
      </header>

      {/* Input de filtro */}
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Filtrar livros..."
          value={filtro}
          onChange={handleFilterChange}
          style={{ padding: "10px", width: "100%", fontSize: "16px" }}
        />
      </div>

      {/* Lista de livros em forma de cards */}
      <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <div
              key={livro.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                width: "200px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
              onClick={() => handleCardClick(livro.id)} // Navega ao clicar no card
            >
              <h3>{livro.title}</h3>
            </div>
          ))
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
