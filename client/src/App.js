import React from 'react';
import Nav from './components/nav.component';
import Listing from './pages/listing.page';


class App extends React.Component{

  render(){
    return(
      
        <div className="bg-gray-300">
          <Nav />
          <Listing/>
        </div>
      
    );
  }
}

export default App;
