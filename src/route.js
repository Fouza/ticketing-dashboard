import { Provider } from 'react-redux'
import React, {Fragment} from "react";
import App from "./App";
import store from "./redux/store";

function Route(){
	return (
		<Provider store={store}>
			<Fragment>
				<App/>
			</Fragment>
		</Provider>
	);
}

export default Route;