import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.module.css';
import Loader from "../../components/Loading/Loader";
import {connect} from "react-redux";
import {loadQuiz} from "../../store/actions/quiz";

class QuizList extends Component {

    componentDidMount() {
        this.props.loadQuiz();
    }

    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>QuizList Component</h1>

                    { this.props.loading && this.props.quiz.length !== 0
                        ? <Loader />
                        : <ul>
                            {this.props.quiz.map(test => {
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
const mapStateToProps = state => {
    return {
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadQuiz: () => dispatch(loadQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
