import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-a57fb-default-rtdb.firebaseio.com'
});
