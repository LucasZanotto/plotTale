import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Profile.css";

const Profile = () => {
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [about, setAbout] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authorId");
    localStorage.removeItem("authorName");
    navigate("/");
  };

  useEffect(() => {
    const fetchAuthorData = async () => {
      const authorId = localStorage.getItem("authorId");
      if (authorId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/authors/${authorId}`
          );
          setAuthor(response.data);
          setAbout(response.data.about || "");
          const booksResponse = await axios.get(
            `http://localhost:8000/api/authors/${authorId}/books`
          );
          setBooks(booksResponse.data);
        } catch (error) {
          console.error("Erro ao buscar dados do autor:", error);
        }
      }
    };
    fetchAuthorData();
  }, []);

  const handleAboutSave = async () => {
    const authorId = localStorage.getItem("authorId");
    if (authorId) {
      try {
        await axios.put(`http://localhost:8000/api/authors/${authorId}`, {
          about,
        });
        setIsEditingAbout(false);
      } catch (error) {
        console.error('Erro ao salvar o "about":', error);
      }
    }
  };

  return (
    <div className="profile-container">
      <Header />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      {author && (
        <div className="profile-details">
          <h1 className="profile-name">{author.name}</h1>
          <div className="about-section">
            <h2>Sobre o Autor</h2>
            {isEditingAbout ? (
              <div className="about-edit">
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="5"
                  className="about-textarea"
                />
                <button onClick={handleAboutSave} className="save-about-button">
                  Salvar
                </button>
              </div>
            ) : (
              <p>{about || "O autor ainda não escreveu sobre si mesmo."}</p>
            )}
            {!isEditingAbout && (
              <button
                onClick={() => setIsEditingAbout(true)}
                className="edit-about-button"
              >
                Editar
              </button>
            )}
          </div>

          <div className="contributed-books">
            <h2>Livros Contribuídos:</h2>
            <div className="books-list">
              {books.length > 0 ? (
                books.map((book) => (
                  <div
                    key={book.id}
                    className="book-card"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    <h3>{book.title}</h3>
                  </div>
                ))
              ) : (
                <p>Você ainda não contribuiu para nenhum livro.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
