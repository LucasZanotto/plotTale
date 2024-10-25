import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, children }) => {
  if (!auth) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" />;
  }
  
  return children; // Caso contrário, renderiza os filhos (as páginas protegidas)
};

export default ProtectedRoute;
