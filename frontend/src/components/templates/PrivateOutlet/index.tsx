import { Navigate, Outlet } from 'react-router-dom';

type PrivateOutletProps = {
    authenticated: boolean;
};

export const PrivateOutlet = ({
    authenticated,
}: PrivateOutletProps): JSX.Element => {
    console.log(authenticated);
    return authenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};
