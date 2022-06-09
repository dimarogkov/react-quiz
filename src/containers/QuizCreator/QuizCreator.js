import React, { Component } from "react";
import classes from './QuizCreator.module.css';

class QuizCreator extends Component {
    render() {
        return(
            <div className={classes.QuizCreator}>
                <h1>QuizCreator Component</h1>
            </div>
        );
    };
}

export default QuizCreator;