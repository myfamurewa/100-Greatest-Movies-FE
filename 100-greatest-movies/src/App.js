import React from 'react';
import './App.css';
import PrivateRoute from "./components/PrivateRoute"
import {Route, Switch} from "react-router-dom"
function App() {
  return (
    <div className="App">
   <Switch>
   <Route exact path="/" component={Login} />
   <Route exact path="/sign-up" component={SignUp} />
   <PrivateRoute path="/home" component={Home} />
   </Switch>
 </div>
  );
}

export default App;
