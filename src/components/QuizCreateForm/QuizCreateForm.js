import React from "react";
import classes from './QuizCreateForm.module.css';
import {useForm} from "react-hook-form";

const QuizCreateForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({mode: 'onBlur'});

    return(
        <form
            className={classes.QuizCreateForm}
            onSubmit={handleSubmit(props.onSubmit)}
        >

            { props.inputs.map((control, index) => {
                return(
                    <div key={index}>
                        <div className={classes.inputBlock}>
                            <label htmlFor={control.id}>{control.label}</label>
                            <input { ...register(control.id, control.validation) } />
                            { errors[control.id] && <p className={classes.errorMessage}>{ errors[control.id].message }</p> }
                        </div>
                        { index === 0 ? <hr /> : null }
                    </div>
                )
            }) }

            <div className={classes.inputBlock}>
                <label htmlFor="select">Choose Correct Answer</label>
                <select
                    id="select"
                    className={classes.select}
                    {...register("rightAnswerId", {})}
                >
                    { props.options.map((item, index) => {
                        return(
                            <option key={index} value={item.value}>{item.value}</option>
                        )
                    }) }
                </select>
            </div>

            <button
                className={classes.formBtn}
                disabled={!isValid}
                type="submit"
            >
                Add Question
            </button>

            <button
                className={classes.formBtn}
                type="button"
                onClick={props.onCreateTest}
                disabled={!props.questions.length}
            >
                Create Test
            </button>

            <p>Number of Questions <strong>{props.questions.length}</strong></p>
        </form>
    )
}

export default QuizCreateForm;
