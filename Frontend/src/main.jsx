import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Book from './pages/Book.jsx'
import App from './App.jsx'
import './index.css'
import CreateBook from './pages/CreateBook.jsx';
import {BookProvider} from './BookContext.jsx';
const [auth, setAuth] = useState(false);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookProvider>
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/book" element={<Book />} />
        <Route path="/books/:id" element={<Book />} />
        <Route path="/create-book" element={<CreateBook />} /> 
      </Routes>
    </Router>
    </BookProvider>
  </StrictMode>,
)
