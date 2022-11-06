import { useState } from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    InputAdornment,
    Stack,
    TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { Typography } from 'components/atoms/Typography';
import { useSignIn } from 'hooks/api/useAuth';
import { Credentials } from 'types/api/auth';

import { AuthFormWrapper } from './SignIn.styled';

export const SignIn = (): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, isLoading, success } = useSignIn();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Credentials>();

    const onSubmit = handleSubmit((data) => {
        signIn(data);
    });

    const formHasErrors = !!Object.keys(errors).length;

    if (success) {
        return <Navigate to="/dashboard" replace />;
    }
    return (
        <Container>
            <Box width="50%">
                <Typography
                    style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '17px',
                        color: '#181818',
                        textTransform: 'uppercase',
                    }}
                >
                    MARK II
                </Typography>
                <AuthFormWrapper onSubmit={onSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Имя пользователя"
                            variant="standard"
                            fullWidth
                            {...register('username', { required: true })}
                            error={!!errors.username}
                        />
                        <TextField
                            fullWidth
                            label="Пароль"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="inherit"
                                            size="small"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <RemoveRedEyeIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register('password', { required: true })}
                            error={!!errors.password}
                        />
                    </Stack>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={formHasErrors || isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress
                                color="inherit"
                                variant="indeterminate"
                                size={20}
                            />
                        ) : (
                            'Войти'
                        )}
                    </Button>
                </AuthFormWrapper>
            </Box>
            <Box width="50%">123</Box>
        </Container>
    );
};
