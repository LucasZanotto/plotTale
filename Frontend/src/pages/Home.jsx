// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard'; // Importando o BookCard
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        // Função para buscar os livros do backend
        const fetchBooks = async () => {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBooks(data);
            setFilteredBooks(data); // Inicialmente, todos os livros são filtrados
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        // Filtro de livros baseado no termo de busca e gênero selecionado
        const filtered = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
            return matchesSearch && matchesGenre;
        });

        setFilteredBooks(filtered);
    }, [searchTerm, selectedGenre, books]);

    return (
        <div>
            <header>
                <Link to="/profile">👤</Link> {/* Ícone de perfil */}
                <input
                    type="text"
                    placeholder="Buscar livros..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            <div>
                <button onClick={() => setSelectedGenre('Ficção')}>Ficção</button>
                <button onClick={() => setSelectedGenre('Não-ficção')}>Não-ficção</button>
                {/* Adicione mais botões de gênero conforme necessário */}
            </div>
            <Link to="/create-book">
                <button>Criar Livro</button>
            </Link>
            <div className="book-list">
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;
