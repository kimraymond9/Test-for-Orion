import React from "react";
import ReactDOM from "react-dom";

import ContactListApp from "./Contacts/ContactListApp";
import * as serviceWorker from "./serviceWorker";

import "./App.css";

const url = "http://jsonplaceholder.typicode.com/users";

ReactDOM.render(<ContactListApp url={url} />, document.getElementById("root"));

serviceWorker.unregister();
