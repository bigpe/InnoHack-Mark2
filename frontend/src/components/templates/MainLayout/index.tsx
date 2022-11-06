import { Outlet, useLocation } from 'react-router-dom';

import { Header } from 'components/organisms/Header';
import { SearchAppBar } from 'components/organisms/SearchBar';
import { FadeAnimation } from 'components/templates/FadeWrapper';

type MainLayoutProps = {
    authenticated: boolean;
};

export const MainLayout = ({ authenticated }: MainLayoutProps): JSX.Element => {
    const { pathname } = useLocation();
    return (
        <FadeAnimation>
            {authenticated ? (
                <>
                    <Header />
                    <SearchAppBar />
                </>
            ) : undefined}

            <FadeAnimation key={pathname}>
                <Outlet />
            </FadeAnimation>
        </FadeAnimation>
    );
};
