import logo from './../images/logo.svg';

function Header() {
    return (
        <header className="header">
          <a href="#" className="logo">
            <img src={logo} alt="Логотип" className="logo__image" />
          </a>
        </header>
    );
}

export default Header;