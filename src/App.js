import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from './containers/QuizList/QuizList';
import Layout from "./hoc/Layout/Layout";
import QuizCreate from "./containers/QuizCreate/QuizCreate";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/quiz-create" element={<QuizCreate />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
