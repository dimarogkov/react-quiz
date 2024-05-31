import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './components/pages/HomePage';
import { CreateQuizPage } from './components/pages/CreateQuizPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { EditQuizPage } from './components/pages/EditQuizPage';
import { QuizPage } from './components/pages/QuizPage';

export const Root = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='quiz'>
                        <Route path='new' element={<CreateQuizPage />} />
                        <Route path=':quizId' element={<QuizPage />} />
                        <Route path='edit/:quizId' element={<EditQuizPage />} />
                    </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    );
};
