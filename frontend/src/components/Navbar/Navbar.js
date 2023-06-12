import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom';
import './Navbar.css';
import {logout} from '../../actions/user';
import {useDispatch} from 'react-redux';
import {deleteFromLocalStoarge} from '../../utils/stoarge';

function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar className="navbarContainer" expand="lg">
      <Container>
        <Navbar.Brand>
          {' '}
          <Link className="logo" to="/">
            Recipe
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="links">
            <Link to="about">About</Link>
            <Link to="all-recipes">All Recipes</Link>
            <Link to="my-recipes">My Recipes</Link>
            <Link to="/recipe/add-recipe">Add Recipe</Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteFromLocalStoarge();
                window.location.replace('/');
                // navigate('login');
                // dispatch(logout());
              }}
            >
              Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
