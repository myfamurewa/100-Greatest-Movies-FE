import React from "react";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { theme, ThemeProvider } from "@chakra-ui/core";
import Home from "./components/Home";
import Movie from "./components/Movie";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/sign-up" component={SignUp} /> */}
          <Route path="/" component={Home} />
          <Route path="/movies/:id" component={Movie} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
