import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav.component';
import Listing from './pages/listing.page';
class App extends React.Component{

  constructor(props){
    super(props);

    this.state={
      movies : []
    }
  }

  render(){
    return(
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Listing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
