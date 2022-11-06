import { Navigate, Outlet } from 'react-router-dom';

type PrivateOutletProps = {
    authenticated: boolean;
};

export const PrivateOutlet = ({
    authenticated,
}: PrivateOutletProps): JSX.Element => {
    return authenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};
