import React, {Component} from "react";
import classes from './QuizCreate.module.css';
import QuizCreateForm from "../../components/QuizCreateForm/QuizCreateForm";
import axios from "axios";

class QuizCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questionCounter: 1,
            questions: [],
            inputs: [
                {
                    id: "question",
                    label: "Question",
                    validation: {
                        required: "Question is required",
                        minLength: {
                            value: 6,
                            message: "Min Length is 6"
                        }
                    }
                },
                {
                    id: "optionOne",
                    label: "Option One",
                    validation: {
                        required: "Option One is required",
                        minLength: {
                            value: 1,
                            message: "Min Length is 1"
                        }
                    }
                },
                {
                    id: "optionTwo",
                    label: "Option Two",
                    validation: {
                        required: "Option Two is required",
                        minLength: {
                            value: 1,
                            message: "Min Length is 1"
                        }
                    }
                },
                {
                    id: "optionTree",
                    label: "Option Tree",
                    validation: {
                        required: "Option Tree is required",
                        minLength: {
                            value: 1,
                            message: "Min Length is 1"
                        }
                    }
                },
                {
                    id: "optionFoure",
                    label: "Option Foure",
                    validation: {
                        required: "Option Foure is required",
                        minLength: {
                            value: 1,
                            message: "Min Length is 1"
                        }
                    }
                }
            ],
            options: [
                {value: 1},
                {value: 2},
                {value: 3},
                {value: 4}
            ]
        }
    }

    onSubmit = (data) => {
        const questArr = this.state.questions;
        const counter = this.state.questionCounter;
        const answersArr = [];
        const questionItem = {};

        // answers arr
        Object.keys(data)
            .filter(item => item !== 'question' && item !== 'rightAnswerId')
            .map((item, index) => answersArr.push({id: index + 1, text: data[item]}));

        // question
        Object.keys(data)
            .filter(item => item === 'question')
            .map(item => questionItem['question'] = data[item]);

        // rightAnswerId
        Object.keys(data)
            .filter(item => item === 'rightAnswerId')
            .map(item => questionItem['rightAnswerId'] = +data[item]);

        questionItem['id'] = counter;
        questionItem['answers'] = answersArr;
        questArr.push(questionItem);

        this.setState({
            questions: questArr,
            questionCounter: counter + 1
        });

        Array.from(document.querySelectorAll("input")).forEach( input => (input.value = ""));
    }

    onCreateTest = async () => {
        try {
            await axios.post('https://react-quiz-a57fb-default-rtdb.firebaseio.com/quiz.json', this.state.questions);
            this.setState({questions: [],questionCounter: 1});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className={classes.QuizCreate}>
                <div>
                    <h1>Create Test</h1>
                    <QuizCreateForm
                        questions={this.state.questions}
                        inputs={this.state.inputs}
                        options={this.state.options}
                        onChangeInput={this.onChangeInput}
                        onSubmit={this.onSubmit}
                        onCreateTest={this.onCreateTest} />
                </div>
            </div>
        )
    }
}

export default QuizCreate;
