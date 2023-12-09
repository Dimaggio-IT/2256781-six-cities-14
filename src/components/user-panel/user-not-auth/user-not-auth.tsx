import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function UserNotAuth() {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Login}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login" data-testid="login-container">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { UserNotAuth };
