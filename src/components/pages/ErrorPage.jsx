import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
        <img src={logo} alt="" />
      <h1>Oups ! Cette page n&rsquo;existe pas !</h1>
      <Link to="/">Retourner à la page de connexion</Link>
    </div>
  );
};

export default ErrorPage;
