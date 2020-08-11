import React from 'react';
import { withCookies } from 'react-cookie';
import SignIn from './components/signIn.component';
import SignUp from './components/signUp.component';
import Modal from './components/modal.component';
import Nav from './components/nav.component'
import Listing from './pages/listing.page'


class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      showSignInDialog:false,
      showSignUpDialog:false,
      username:''
    }
  }

  handleSignInModalOpen = () => {
    this.setState({ showSignInDialog: true });
  }

  handleSignInModalHide = () => {
    this.setState({ showSignInDialog: false });
  }

  handleSignUpModalOpen = () => {
    this.setState({ showSignUpDialog: true });
  }

  handleSignUpModalHide = () => {
    this.setState({ showSignUpDialog: false });
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
      
    const {showSignInDialog, showSignUpDialog, username} = this.state;
    return(
        <div className="bg-gray-300">
          <Nav username={username } processSignOut={this.processSignOut} openSignInClicked={this.handleSignInModalOpen} openSignUpClicked={this.handleSignUpModalOpen} />
          <Listing/>
          <Modal id="signIn" title="Sign In" handleModalHide={this.handleSignInModalHide} open={showSignInDialog}>
            <SignIn handleModalHide={this.handleSignInModalHide} submitCallback={this.submitCallback} />
          </Modal>
          <Modal id="signUp" title="Sign Up" handleModalHide={this.handleSignUpModalHide} open={showSignUpDialog}>
            <SignUp handleModalHide={this.handleSignUpModalHide} submitCallback={this.submitCallback} />
          </Modal>
        </div>
    );
  }
}

export default withCookies(App);
