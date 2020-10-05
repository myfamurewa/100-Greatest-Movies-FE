import React from 'react';
import './App.css';
import PrivateRoute from "./components/PrivateRoute"
import Home from './components/Home'
import Movie from './components/Movie'
import {Route, Switch} from "react-router-dom"
function App() {
  return (
    <div className="App">
   <Switch>
   {/* <Route exact path="/" component={Login} /> */}
   {/* <Route exact path="/sign-up" component={SignUp} /> */}
   <Route path="/home" component={Home} />
   <Route path="movies/:id" component={Movie}/>
   </Switch>
 </div>
  );
}

export default App;
