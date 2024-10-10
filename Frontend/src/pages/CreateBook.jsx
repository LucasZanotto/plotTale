// src/pages/CreateBook.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [isFinish, setIsFinish] = useState(false);
    const navigate = useNavigate(); // Hook para redirecionar após a criação

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBook = {
            title,
            author,
            genre,
            is_finish: isFinish,
        };

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                // Redireciona para a página inicial após a criação bem-sucedida
                navigate('/');
            } else {
                // Lidar com erro (opcional)
                const errorData = await response.json();
                console.error('Erro ao criar livro:', errorData);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div>
            <h1>Criar Livro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Autor:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Gênero:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isFinish}
                            onChange={() => setIsFinish(!isFinish)}
                        />
                        Finalizado
                    </label>
                </div>
                <button type="submit">Criar Livro</button>
            </form>
        </div>
    );
};

export default CreateBook;
