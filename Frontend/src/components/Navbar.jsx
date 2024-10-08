import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/book">Book</Link>
    </nav>
  );
};

export default Navbar;
