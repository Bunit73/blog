import { BaseFunctionComponent } from './BaseComponent';
import './Header.scss';

const Header: BaseFunctionComponent = () => {
  return (
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col-4 pt-1">
          {/* <a className="link-secondary" href="#">
            Subscribe
          </a> */}
        </div>
        <div className="col-4 text-center">
          <a className="blog-header-logo text-dark text-nowrap" href="/">
            {`Ben's Blog`}
          </a>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center"></div>
      </div>
    </header>
  );
};

export { Header };
