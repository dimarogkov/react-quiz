import {
    LOAD_QUIZ_ERROR,
    LOAD_QUIZ_START,
    LOAD_QUIZ_SUCCESS,
    QUIZ_ANSWER,
    QUIZ_END,
    QUIZ_LOAD_SUCCESS,
    QUIZ_NEXT,
    QUIZ_RETRY
} from "../actions/actionsTypes";

const initialState = {
    quiz: [],
    loading: false,
    error: null,
    activeQuestion: 0,
    isEnd: false,
    answerClass: null,
    results: {},
    quizArr: null
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_QUIZ_START:
            return {
                ...state,
                loading: true
            }
        case LOAD_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case LOAD_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case QUIZ_LOAD_SUCCESS:
            return  {
                ...state,
                loading: false,
                quizArr: action.quizArr
            }
        case QUIZ_ANSWER:
            return {
                ...state,
                answerClass: action.answerClass,
                results: action.results
            }
        case QUIZ_END:
            return {
                ...state,
                isEnd: true
            }
        case QUIZ_NEXT:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerClass: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                isEnd: false,
                answerClass: null,
                results: {}
            }
        default:
            return state
    }

}
