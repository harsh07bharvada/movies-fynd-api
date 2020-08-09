import React from 'react';
import Nav from './components/nav.component';
import Listing from './pages/listing.page';
import API from './util/api';

class App extends React.Component{

  render(){
    return(
      
        <div className="bg-gray-100">
          <Nav />
          <Listing/>
            
          
        </div>
      
    );
  }
}

export default App;
