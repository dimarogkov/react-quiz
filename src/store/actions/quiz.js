import axios from "../../axios/axios";
import {
    LOAD_QUIZ_START,
    LOAD_QUIZ_SUCCESS,
    LOAD_QUIZ_ERROR,
    QUIZ_LOAD_SUCCESS,
    QUIZ_ANSWER,
    QUIZ_END,
    QUIZ_NEXT,
    QUIZ_RETRY,
} from "./actionsTypes";

export function loadQuiz() {
    return async dispatch => {
        dispatch(loadQuizStart());
        try {
            const newQuiz = [];
            const res = await axios.get('/quiz.json');
            Object.keys(res.data).forEach((item, index) => {
                newQuiz.push({
                    id: item,
                    name: `Test № ${index + 1}`
                });
            });
            dispatch(loadQuizSuccess(newQuiz));
        } catch (error) {
            dispatch(loadQuizError(error));
        }
    }
}

export function loadQuizStart() {
    return {
        type: LOAD_QUIZ_START
    }
}

export function loadQuizSuccess(quiz) {
    return {
        type: LOAD_QUIZ_SUCCESS,
        quiz: quiz
    }
}

export function loadQuizError(error) {
    return {
        type: LOAD_QUIZ_ERROR,
        error: error
    }
}

export function quizLoad(id) {
    return async dispatch => {
        dispatch(loadQuizStart());
        try {
            const res = await axios.get(`/quiz/${id}.json`);
            const quizArr = res.data;
            dispatch(quizLoadSuccess(quizArr));
        } catch (error) {
            dispatch(loadQuizError(error));
        }
    }
}

export function quizLoadSuccess(quizArr) {
    return {
        type: QUIZ_LOAD_SUCCESS,
        quizArr: quizArr
    }
}

export function quizAnswerCLick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if(state.answerClass){
            const key = Object.keys(state.answerClass)[0];
            if(state.answerClass[key] === 'success') {
                return
            }
        }

        const question = state.quizArr[state.activeQuestion];

        if(question.rightAnswerId === answerId) {
            if (!state.results[question.id]) {
                state.results[question.id] = 'success';
            }
            dispatch(quizAnswer({[answerId]: 'success'}, state.results));
        } else {
            state.results[question.id] = 'error';
            dispatch(quizAnswer({[answerId]: 'error'}, state.results));
        }

        const timeOut = window.setTimeout(() => {
            if(state.activeQuestion + 1 === state.quizArr.length) {
                dispatch(quizEnd());
            } else {
                dispatch(quizNext(state.activeQuestion + 1));
            }
            window.clearTimeout(timeOut);
        },1000);
    }
}

export function quizAnswer(answerClass, results) {
    return {
        type: QUIZ_ANSWER,
        answerClass,
        results
    }
}

export function quizEnd() {
    return {
        type: QUIZ_END
    }
}

export function quizNext(activeQuestion) {
    return {
        type: QUIZ_NEXT,
        activeQuestion: activeQuestion
    }
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY
    }
}
