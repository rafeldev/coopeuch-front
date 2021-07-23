import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './page/Home';
import EditTask from './page/EditTask';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editTask/:id" component={EditTask} />
      </Switch>
    </div>
  );
}

export default App;
