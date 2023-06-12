import './Footer.css';
import {ReactComponent as InstargramIcon} from '../assets/images/color_instagram.svg';

const Footer = () => {
  return (
    <footer id="footer">
      <p>&copy; 2023 My Website. All rights reserved.</p>
      <a href="https://www.instagram.com/ophir_attali/">
        <InstargramIcon />
      </a>
      .
    </footer>
  );
};

export default Footer;
