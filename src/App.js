
import './App.css';
import ListStocksComponent from './components/ListStocksComponent';
import ViewStockComponent from './components/ViewStockComponent';
import CreateStockComponent from './components/CreateStockComponent';

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
          </Switch>
   </div>

 </Router>
</div>
  );
}

export default App;
