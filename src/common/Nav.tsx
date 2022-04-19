import * as React from "react";
import { BaseFunctionComponent } from "./BaseComponent";
import "./Nav.scss"

const Nav: BaseFunctionComponent<{}> = props => {
	return   <div className="nav-scroller py-1 mb-2">
    <nav className="nav d-flex justify-content-between">
      <a className="p-2 link-secondary" href="#">World</a>
      <a className="p-2 link-secondary" href="#">U.S.</a>
      <a className="p-2 link-secondary" href="#">Technology</a>
    </nav>
  </div>;
}

export { Nav }