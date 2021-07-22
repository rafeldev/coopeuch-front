import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './page/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
