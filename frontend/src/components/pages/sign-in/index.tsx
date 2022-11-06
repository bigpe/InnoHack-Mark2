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

import bg from 'assets/images/welcomeAsset.png';
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

    if (success && isLoading === false) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <Container
            sx={{
                height: '100%',
                display: 'flex',
                flex: '1 1 0',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'visible',
            }}
            maxWidth={false}
        >
            <Typography
                style={{
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '17px',
                    color: '#181818',
                    textTransform: 'uppercase',
                    position: 'absolute',
                    top: '35px',
                    left: '5%',
                }}
            >
                MARK II
            </Typography>
            <Box
                width="50%"
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-60px',
                    pr: 3,
                }}
            >
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <AuthFormWrapper onSubmit={onSubmit}>
                        <Typography
                            style={{
                                color: '#181818',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                fontSize: '35px',
                                lineHeight: '42px',
                                marginBottom: '40px',
                            }}
                        >
                            Войдите в систему
                        </Typography>
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
                                                    setShowPassword(
                                                        !showPassword
                                                    )
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
                        <Stack
                            sx={{
                                mt: 5,
                                flex: '1 0 auto',
                                marginBottom: '100px',
                            }}
                        >
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
                        </Stack>
                        <Stack
                            sx={{
                                flex: '1 0 auto',
                                alignSelf: 'flex-end',
                                justifyContent: 'space-between',
                                display: 'flex',
                                flexDirection: 'row',
                                flexShrink: '1',
                            }}
                        >
                            <Typography> &copy;2022</Typography>
                            <Typography>Политика конфидециальности</Typography>
                        </Stack>
                    </AuthFormWrapper>
                )}
            </Box>
            <Box
                width="50%"
                sx={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                }}
            />
        </Container>
    );
};
