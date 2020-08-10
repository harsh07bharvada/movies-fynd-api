import React from 'react';
import { withCookies } from 'react-cookie';
import SignIn from './components/SignIn.component.jsx';
import Modal from './components/Modal.component.jsx';
import Nav from './components/Nav.component.jsx'
import Listing from './pages/Listing.page.jsx'


class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      showDialog:false,
      username:''
    }
  }

  handleModalOpen = () => {
    this.setState({ showDialog: true });
  }

  handleModalHide = () => {
    this.setState({ showDialog: false });
  }

  submitCallback = (result, username)=>{
    const {cookies} = this.props;
    cookies.set('token',result['data']['token'],{ path: '/'});
    cookies.set('username',username,{ path: '/'});
    this.setState({username:username});
  }


  processSignOut = ()=>{
    const {cookies} = this.props;
    cookies.remove('token',{ path: '/'});
    cookies.remove('username',{ path: '/'});
    this.setState({username:''});
  }

  render(){
      
    const {showDialog, username} = this.state;
    return(
        <div className="bg-gray-300">
          <Nav username={username } processSignOut={this.processSignOut} openSignInClicked={this.handleModalOpen} />
          <Listing/>
          <Modal id="signIn" title="Sign In" handleModalHide={this.handleModalHide} open={showDialog}>
            <SignIn handleModalHide={this.handleModalHide} submitCallback={this.submitCallback} />
          </Modal>
        </div>
    );
  }
}

export default withCookies(App);
