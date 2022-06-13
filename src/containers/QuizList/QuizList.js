import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.module.css';
import axios from '../../axios/axios';
import Loader from "../../components/Loading/Loader";

class QuizList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: [],
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const newQuiz = [];
            const respons = await axios.get('/quiz.json');
            Object.keys(respons.data).forEach((item, index) => {
                newQuiz.push({
                    id: item,
                    name: `Test № ${index + 1}`
                });
            });

            this.setState({
                quiz: newQuiz,
                loading: false
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList Component</h1>

                    { this.state.loading
                        ? <Loader />
                        : <ul>
                            {this.state.quiz.map(test => {
                                return(
                                    <li key={test.id}>
                                        <NavLink to={'/quiz/' + test.id}>{test.name}</NavLink>
                                    </li>
                                );
                            })}
                          </ul>
                    }
                </div>
            </div>
        );
    };
}

export default QuizList;
