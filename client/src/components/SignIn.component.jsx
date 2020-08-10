import React from 'react';
import API from '../util/api';
import FormInput from './FormInput.component';

class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleSubmit = async(event)=>{

        const {submitCallback, handleModalHide} = this.props;
        const {username,password} = this.state;
        console.log(`Username : ${username} , Password: ${password}`);
        try{
            const result = await API.processLogin({username,password});
            if(result['status'] === 200){
                submitCallback(result, username);
                handleModalHide();
            }     
        }
        catch(error){
            console.log(`Error occurred while signing try ${error.message}`);
        }
        this.setState({ username:'', password:''});
    }

    handleChange = (event)=>{
        const {name,value} = event.target;
        this.setState({
             [name] : value  
        })
    }

    render(){
        return(
            <div className="flex flex-row w-full h-full justify-center items-center p-10 md:py-10 md:px-32 ">
                <div className=" flex flex-col w-full h-full">
                    <div className="flex flex-col flex-1 w-full ">
                        <div className="flex flex-wrap h-full w-full justify-center" >
                            <div className="flex flex-col w-full px-4 py-4 md:p-6 justify-center">
                                <FormInput label="Username" handleChange={this.handleChange} name="username" value={this.state.username} type="text" />  
                            </div>
                            <div className="flex flex-col  w-full px-4 py-4 md:px-6 md:py-6 ">
                                <FormInput label="Password" handleChange={this.handleChange} name="password" value={this.state.password} type="password" />   
                            </div>
                            
                            <div className="flex flex-col w-full px-4 py-4 md:p-6 justify-center">
                                <div className=" flex bg-gray-700 w-full h-full justify-center items-center rounded py-3">
                                    <span onClick={this.handleSubmit} className="font-bold text-xl text-white ">Submit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;