import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Book from './pages/Book.jsx';
import App from './App.jsx';
import './index.css';
import CreateBook from './pages/CreateBook.jsx';
import { BookProvider } from './BookContext.jsx';
import ProtectedRoute from './ProtectedRoute'; // Certifique-se de importar o ProtectedRoute

const RootApp = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está autenticado ao carregar o aplicativo
    const authorId = localStorage.getItem('authorId');
    const authorName = localStorage.getItem('authorName');
    if (authorId && authorName) {
      setAuth(true);
    }
  }, []);

  return (
    <StrictMode>
      <BookProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protegendo a rota Home */}
            <Route path="/" element={<Home />} />
            
            {/* Outras rotas protegidas */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/book" element={<Book />} />
            <Route path="/books/:id" element={<Book />} />
            <Route path="/create-book" element={<CreateBook />} />
          </Routes>
        </Router>
      </BookProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(
  <RootApp />
);
