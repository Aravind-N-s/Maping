import React from 'react'
import axios from '../../Config/axios'
import { withRouter } from "react-router";
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password: '',
            Login: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/login`,formData)
        .then((response)=>{
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                const token=response.data.token
                if(token){
                    localStorage.setItem('Authorization',token)
                    this.setState(() => ({Login: true}))
                    this.props.history.push('/')
                }
            }
        })
        .catch(err =>{
            alert(err)
        })
    }


    render(){
        return(
            <form>
                 <h1>Login Form</h1>
                <label>
                    <input type="text" name="email" value = {this.state.email} onChange={this.handleChange} placeholder= "Email"/>
                </label><br/>
                <label>
                    <input type="password" name="password" value = {this.state.password} onChange={this.handleChange} placeholder= "Password"/>
                </label><br/>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
} 

Login = withRouter(Login)
export default Login