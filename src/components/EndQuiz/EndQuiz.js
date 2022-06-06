import React from "react";
import Button from "../Button/Button";
import classes from './EndQuiz.module.css';

const EndQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        console.log(props.results[key]);
        if(props.results[key] === 'success') {
            total++
        }

        return total;
    }, 0);

    return(
        <div className={classes.EndQuiz}>
            <ul>
                { props.questions.map((question, index) => {
                    const cls = [
                        'las',
                        props.results[question.id] === 'error' ? 'la-times' : 'la-check',
                        classes[props.results[question.id]]
                    ];

                    return(
                        <li key={index}>
                            <strong>{question.id}.</strong> &nbsp;
                            {question.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }
            </ul>

            <p>{successCount} of {props.questions.length}</p>

            <div>
                <Button 
                    buttonText='Repiet'
                    type='primary'
                    onRetry={props.onRetry} />
                <Button 
                    buttonText='Go to question List'
                    type='success' />
            </div>
        </div>
    )
}

export default EndQuiz;