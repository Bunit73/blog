import * as React from "react";
import { BaseFunctionComponent } from "./BaseComponent";
const Page: BaseFunctionComponent<{
}> = props => {
	return <div 
		className="container"
	>
		{props.children}
	</div>;
}

export { Page }