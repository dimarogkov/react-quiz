import React, {useEffect, useState} from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import EndQuiz from "../../components/EndQuiz/EndQuiz";
import classes from './Quiz.module.css';
import axios from "../../axios/axios";
import {useParams} from "react-router-dom";
import Loader from "../../components/Loading/Loader";

const Quiz = () => {
    const [activeQuestion, activeQuestionSet] = useState(0);
    const [isEnd, isEndSet] = useState(false);
    const [answerClass, answerClassSet] = useState(null);
    const [results, resultsSet] = useState({});
    const [quiz, quizSet] = useState([]);
    const [loading, loadingSet] = useState(true);
    const params = useParams();

    useEffect(() => {
        try {
            axios.get(`/quiz/${params.id}.json`).then(res => {
                quizSet(res.data)
                loadingSet(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const isQuizEnd = () => {
        return activeQuestion + 1 === quiz.length;
    }

    const onRetry = () => {
        activeQuestionSet(0);
        isEndSet(false);
        answerClassSet(null);
        resultsSet({});
    }

    const onAnswerClickHandler = (answerId) => {
        if(answerClass){
            const key = Object.keys(answerClass)[0];
            if(answerClass[key] === 'success') {
                return
            }
        }

        const question = quiz[activeQuestion];

        if(question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            answerClassSet({[answerId]: 'success'})
            resultsSet(results);
        } else {
            results[question.id] = 'error';
            answerClassSet({[answerId]: 'error'});
            resultsSet(results);
        }

        const timeOut = window.setTimeout(() => {
            if(isQuizEnd()) {
                isEndSet(true);
            } else {
                activeQuestionSet(activeQuestion + 1);
                answerClassSet(null);
            }
            window.clearTimeout(timeOut);
        },1000);
    }

    return(
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Answer all Question</h1>

                {
                    loading
                    ? <Loader />
                    : isEnd
                        ? <EndQuiz
                            results={results}
                            questions={quiz}
                            onRetry={onRetry} />
                        : <ActiveQuiz
                            question={quiz[activeQuestion].question}
                            answers={quiz[activeQuestion].answers}
                            onAnswerClick={onAnswerClickHandler}
                            quizLength={quiz.length}
                            answerNumber={activeQuestion + 1}
                            questionClass={answerClass} />
                }
            </div>
        </div>
    )
}

export default Quiz;
