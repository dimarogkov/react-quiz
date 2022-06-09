import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from './containers/QuizList/QuizList';
import Layout from "./hoc/Layout/Layout";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz-create" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
