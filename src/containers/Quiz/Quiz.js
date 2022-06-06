import React, { Component } from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import EndQuiz from "../../components/EndQuiz/EndQuiz";
import classes from './Quiz.module.css';

class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeQuestion: 0,
            isEnd: false,
            answerClass: null,
            results: {},
            quiz: [
                {   
                    id: 1,
                    rightAnswerId: 1,
                    question: 'Where you live?',
                    answers: [
                        {id: 1, text: 'Ukraine'},
                        {id: 2, text: 'France'},
                        {id: 3, text: 'Spain'}
                    ]
                },
                {   
                    id: 2,
                    rightAnswerId: 3,
                    question: 'What your name?',
                    answers: [
                        {id: 1, text: 'Sasha'},
                        {id: 2, text: 'Andrey'},
                        {id: 3, text: 'Dima'}
                    ]
                }
            ]
        }
    }

    isQuizEnd = () => {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    onRetry = () => {
        this.setState({
            activeQuestion: 0,
            isEnd: false,
            answerClass: null,
            results: {}
        });
    }

    onAnswerClickHandler = (answerId) => {
        if(this.state.answerClass){
            const key = Object.keys(this.state.answerClass)[0];
            if(this.state.answerClass[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if(question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerClass: {[answerId]: 'success'},
                results: results
            });
        } else {
            results[question.id] = 'error'
            this.setState({
                answerClass: {[answerId]: 'error'},
                results: results
            });
        }

        const timeOut = window.setTimeout(() => {
            if(this.isQuizEnd()) {
                this.setState({
                    isEnd: true
                });
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerClass: null
                });
            }
            window.clearTimeout(timeOut);
        },1000);
    }

    render() {
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWrapper}>
                    <h1>Answer all Question</h1>
                    
                    {
                        this.state.isEnd
                        ? <EndQuiz
                            results={this.state.results}
                            questions={this.state.quiz}
                            onRetry={this.onRetry} />
                        : <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question} 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            questionClass={this.state.answerClass} />
                    }
                </div>

            </div>
        )
    };
}

export default Quiz;