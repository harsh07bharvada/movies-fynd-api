import React from 'react';
import API from '../util/api';
import FormInput from './formInput.component';

class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            disableSubmit:true,
            errorMessage:''
        }
    }

    handleSubmit = async(event)=>{

        const {submitCallback, handleModalHide} = this.props;
        const {username,password} = this.state;
        try{
            //If username & passwords aren't empty then make the API call
            if(username !=='' && password !==''){
                const result = await API.processLogin({username,password});
                if(result['status'] === 200){
                    submitCallback(result, username);
                    handleModalHide();
                }
            }else{
                if(username === '' && password === ''){
                    this.setState({errorMessage:'Username and Password cannot be blank'});
                }
                else if(username === ''){
                    this.setState({errorMessage:'Username cannot be blank'});
                }else{
                    this.setState({errorMessage:'Password cannot be blank'});
                }
            }   
            console.log(`Error Message :  ${this.state.errorMessage}`) 
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
        });
        if(this.state.username !=='' && this.state.password !== ''){
            this.setState({ disableSubmit:false});
        }
        else{
            this.setState({ disableSubmit:true});
        }
        this.setState({ errorMessage:''});
    }

    render(){
        const {errorMessage, username, password, disableSubmit} = this.state;
        return(
            <div className="flex flex-row w-full h-full justify-center items-center p-10 md:py-10 md:px-32 ">
                <div className=" flex flex-col w-full h-full">
                    <div className="flex flex-col flex-1 w-full ">
                        <div className="flex flex-wrap h-full w-full justify-center" >
                            <div className="flex flex-col w-full px-4 py-4 md:p-6 justify-center">
                                <FormInput label="Username" handleChange={this.handleChange} name="username" value={username} type="text" />  
                            </div>
                            <div className="flex flex-col  w-full px-4 py-4 md:px-6 md:py-6 ">
                                <FormInput label="Password" handleChange={this.handleChange} name="password" value={password} type="password" />   
                            </div>
                            {
                                errorMessage!==''?
                                <div className="flex flex-col font-sm w-full px-4 py-4 md:px-6 md:py-6 text-red-500 text-center">
                                    {errorMessage}
                                </div>
                                :""
                            }  
                            <div className="flex flex-col w-full px-4 py-4 md:p-6 justify-center">
                                <div className=" flex bg-gray-700 w-full h-full justify-center items-center rounded py-3 cursor-pointer">
                                    <span disabled={disableSubmit} onClick={this.handleSubmit} className="font-bold text-xl text-white ">Submit</span>
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
