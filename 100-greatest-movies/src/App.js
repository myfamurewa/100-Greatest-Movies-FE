import React from "react";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import {ThemeProvider, ColorModeProvider } from "@chakra-ui/core";
import Home from "./components/Home";
import Movie from "./components/Movie";
import Attempt from "./components/Attempt"
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
      <div className="App">
        <Switch>
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/sign-up" component={SignUp} /> */}
          <Route path="/" component={Home} />
          <Route path="/movies/:id" component={Movie} />
          <Route path="/attempt" component={Attempt} />
        </Switch>
      </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
