import React from "react";
import classes from  './formHook.module.css'
import {useForm} from "react-hook-form";

const FormHook = () => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm({mode: 'onBlur'});

    const onSubmit = (data) => {
        console.log(data);
        reset();
    }

    return(
        <div className={classes.formHook}>
            <div>
                <h1>React Hook Form</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes.inputBlock}>
                        <label htmlFor="name">Name</label>
                        <input { ...register("name", {
                            required: 'Name is required',
                            minLength: {
                                value: 6,
                                message: "Min Length is 6"
                            }
                        }) } />
                        { errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="lastName">LastName</label>
                        <input { ...register("lastName", {
                            required: 'LastName is required'
                        }) } />
                        { errors.lastName && <p>{errors.lastName.message}</p>}
                    </div>

                    <div className={classes.inputBlock}>
                        <label htmlFor="email">Email</label>
                        <input { ...register("email", {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        }) } />
                        { errors.email && <p>{errors.email.message}</p>}
                    </div>

                    <button type="submit" disabled={!isValid}>Send</button>
                </form>

            </div>
        </div>
    )
}

export default FormHook;
