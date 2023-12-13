import { Logo } from '../logo/logo';
import { UserPanel } from '../user-panel/user-panel';

function Header(): JSX.Element {
  return (
    <header className="header" data-testid="header-container">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <UserPanel />
        </div>
      </div>
    </header>
  );
}

export { Header };
