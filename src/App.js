
import './App.css';
import ListStocksComponent from './components/ListStocksComponent';
import ViewStockComponent from './components/ViewStockComponent';
import CreateStockComponent from './components/CreateStockComponent';
import UpdateStockComponent from './components/UpdateStockComponent';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
   
    <div>
    <Router>

   <div className="container">
         <Switch>
             <Route path="/" exact component={ListStocksComponent}></Route>
              <Route path="/view-stock/:id" component={ViewStockComponent}></Route> 
              <Route path="/add-stock" component={CreateStockComponent}></Route>
              <Route path="/edit-stock/:id" component={UpdateStockComponent}></Route>
          </Switch>
   </div>

 </Router>
</div>
  );
}

export default App;
