import logo from './logo.svg';
import { Provider } from "react-redux";
import store from './redux/Store';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import UnderLying from './Components/UnderLying';
import Derivatives from "./Components/Derivatives";

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Switch>
          <Route exact path="/underlyings">
            <UnderLying />
          </Route>
          <Route exact path="/derivatives/:id">
            <Derivatives />
          </Route>
          <Redirect to="/underlyings" />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
