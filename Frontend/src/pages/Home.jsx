import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setLivros(response.data);
        setFilteredLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchLivros();
  }, []);

  useEffect(() => {
    let livrosFiltrados = livros;

    if (searchText) {
      livrosFiltrados = livrosFiltrados.filter((livro) =>
        livro.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedGenre) {
      livrosFiltrados = livrosFiltrados.filter(
        (livro) => livro.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }

    setFilteredLivros(livrosFiltrados);
  }, [searchText, selectedGenre, livros]);

  const genres = ["Ação", "Romance", "Terror", "Suspense", "Mistério"];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre === selectedGenre ? "" : genre);
  };

  return (
    <div className="home-container">
      <Header />

      <div className="filters-container">
        <input
          type="text"
          placeholder="Buscar livros..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <div className="genre-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`genre-button ${
                selectedGenre === genre ? "selected" : ""
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="book-list">
        {filteredLivros.length > 0 ? (
          filteredLivros.map((livro) => (
            <div
              key={livro.id}
              onClick={() => navigate(`/books/${livro.id}`)}
              className="book-card"
            >
              <h3>{livro.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-books">Nenhum livro encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
