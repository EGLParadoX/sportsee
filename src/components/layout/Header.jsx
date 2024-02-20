import logo from '../../assets/logo.png'

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt="" />
        <ul>
          <li>
            <p>Accueil</p>
          </li>
          <li>
            <p>Profil</p>
          </li>
          <li>
            <p>Réglage</p>
          </li>
          <li>
            <p>Communauté</p>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
