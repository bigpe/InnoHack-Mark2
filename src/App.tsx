import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from 'components/pages/dashboard';
import { Markup } from 'components/pages/markup';
import { SignIn } from 'components/pages/sign-in';
import { MainLayout } from 'components/templates/MainLayout';
import { PrivateOutlet } from 'components/templates/PrivateOutlet';

import { SignUp } from './components/pages/sign-up/index';

const App = (): JSX.Element => {
    const authenticated = true;

    return (
        <AnimatePresence>
            <Routes>
                <Route
                    path="/"
                    element={<MainLayout authenticated={authenticated} />}
                >
                    <Route
                        index
                        element={
                            authenticated ? (
                                <Navigate to="dashboard" />
                            ) : (
                                <Navigate to="sign-in" />
                            )
                        }
                    />
                    <Route
                        path="sign-in"
                        element={
                            !authenticated ? (
                                <SignIn />
                            ) : (
                                <Navigate to="/dashboard" />
                            )
                        }
                    />
                    <Route
                        path="sign-up"
                        element={
                            !authenticated ? (
                                <SignUp />
                            ) : (
                                <Navigate to="/dashboard" />
                            )
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateOutlet authenticated={authenticated} />
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="markup" element={<Markup />} />
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default App;
