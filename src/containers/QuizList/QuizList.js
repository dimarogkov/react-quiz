import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.module.css';

const list = [
    {id: '1', name: 'Test One'},
    {id: '2', name: 'Test Two'},
    {id: '3', name: 'Test Tree'},
    {id: '4', name: 'Test Foure'}
];

class QuizList extends Component {
    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList Component</h1>

                    <ul>
                        {list.map((test, index) => {
                            return(
                                <li key={index}>
                                    <NavLink to={'/quiz/' + test.id}>{test.name}</NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };
}

export default QuizList;