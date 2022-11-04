import { useNavigate } from 'react-router-dom';

export const Markup = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Markup page</h1>
            <br />
            <button type="button" onClick={() => navigate(-1)}>
                go back
            </button>
        </div>
    );
};
