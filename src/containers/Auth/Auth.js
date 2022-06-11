import React, { Component } from "react";
import classes from './Auth.module.css';
import Button from '../../components/Button/Button';
import Input from "../../components/Input/Input";
import is from 'is_js'

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

    formSubmit = (e) => {
        e.preventDefault();
    }

    onLogin = () => {}

    onRegistration = () => {}

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

                        <Button 
                            type="success"
                            buttonText="Login"
                            disabled={!this.state.isFormValid} 
                            onClick={this.onLogin}/>

                        <Button 
                            type="primary" 
                            buttonText="Registration" 
                            disabled={!this.state.isFormValid} 
                            onClick={this.onRegistration}/>
                    </form>
                </div>
            </div>
        );
    };
}

export default Auth;