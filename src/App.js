import React from "react";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component.jsx";
import { Route, Switch } from "react-router-dom";

const Hats = () => <h1>Welcome to Hats</h1>;

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={Hats} />
      </Switch>
    </div>
  );
}

export default App;
