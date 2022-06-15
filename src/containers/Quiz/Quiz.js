import React, {useEffect} from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import EndQuiz from "../../components/EndQuiz/EndQuiz";
import classes from './Quiz.module.css';
import {useParams} from "react-router-dom";
import Loader from "../../components/Loading/Loader";
import {connect} from "react-redux";
import {quizLoad, quizRetry, quizAnswerCLick} from "../../store/actions/quiz";

const Quiz = props => {
    const params = useParams();

    useEffect(() => {props.quizLoad(params.id)}, [params.id]);

    const onRetry = () => {
        props.quizRetry();
    }

    const onAnswerClickHandler = (answerId) => {
        props.quizAnswerCLick(answerId);
    }

    return(
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Answer all Question</h1>

                {
                    props.loading || !props.quizArr
                    ? <Loader />
                    : props.isEnd
                        ? <EndQuiz
                            results={props.results}
                            questions={props.quizArr}
                            onRetry={onRetry} />
                        : <ActiveQuiz
                            question={props.quizArr[props.activeQuestion].question}
                            answers={props.quizArr[props.activeQuestion].answers}
                            onAnswerClick={onAnswerClickHandler}
                            quizLength={props.quizArr.length}
                            answerNumber={props.activeQuestion + 1}
                            questionClass={props.answerClass} />
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        activeQuestion: state.quiz.activeQuestion,
        isEnd: state.quiz.isEnd,
        answerClass: state.quiz.answerClass,
        results: state.quiz.results,
        quizArr: state.quiz.quizArr,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        quizLoad: id => dispatch(quizLoad(id)),
        quizRetry: () => dispatch(quizRetry()),
        quizAnswerCLick: answerId => dispatch(quizAnswerCLick(answerId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
