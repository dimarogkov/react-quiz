import React, { Component } from "react";
import classes from './Auth.module.css';
import Input from "../../components/Input/Input";
import is from 'is_js'
import axios from "axios";

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Email is invalid',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                pass: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Password is invalid',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    }

    onLogin = async () => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.pass.value,
                returnSecureToken: true
            };
            const respos = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgg4vfyYvpP0h8xHHyrFjUrTsGopItOw4', authData);
            console.log(respos.data);
        } catch (error) {
            console.log(error);
        }
    }

    onRegistration = async () => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.pass.value,
                returnSecureToken: true
            };
            const respos = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgg4vfyYvpP0h8xHHyrFjUrTsGopItOw4', authData);
            console.log(respos.data);
        } catch (error) {
            console.log(error);
        }
    }

    formSubmit = event => {
        event.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) {
          return true
        }
    
        let isValid = true;
    
        if (validation.required) {
          isValid = value.trim() !== '' && isValid;
        }
    
        if (validation.email) {
          isValid = is.email(value) && isValid;
        }
    
        if (validation.minLength) {
          isValid = value.length >= validation.minLength && isValid;
        }
    
        return isValid
    }
    
    onInputChange = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
    
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
    
        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });
    
        this.setState({
          formControls: formControls,
          isFormValid: isFormValid
        });
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return(
                <Input
                    key={index}
                    value={control.value}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    onInputChange={event => this.onInputChange(event, controlName)} />
            )
        });
    }

    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Login</h1>

                    <form className={classes.AuthForm} onSubmit={this.formSubmit}>
                        { this.renderInputs() }

                        <button
                            type="button"
                            disabled={!this.state.isFormValid}
                            onClick={this.onLogin}
                            className={classes.primary}
                        >Login</button>

                        <button
                            type="button"
                            disabled={!this.state.isFormValid}
                            onClick={this.onRegistration}
                            className={classes.success}
                        >Registration</button>
                    </form>
                </div>
            </div>
        );
    };
}

export default Auth;
