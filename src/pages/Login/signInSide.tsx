import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import imagemLogin from '../../assets/icons/bg.jpg';
import {useToast} from '../../shared/hooks/useToast';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useToken} from '../../shared/hooks/auth';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

const schema = yup
  .object({
    email: yup.string().required('Email é um campo obrigatório'),
    password: yup.string().required('Senha é um campo obrigatório'),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function SignInSide() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {Login, token, permission} = useToken();
  const {actionToast} = useToast();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => handleLogin(data);

  const handleLogin = async (data: yup.InferType<typeof schema>) => {
    try {
      await Login(data);
    } catch (error: any) {
      actionToast({message: error.response.data.message, type: 'error'});
    }
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      {' '}
      {!permission && !token && (
        <Grid
          container
          component="main"
          sx={{
            background: '#b4dadd',
            borderRadius: 3,
            m: 0,
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Grid
            component={Paper}
            elevation={6}
            sx={{
              display: 'flex',
              minWidth: 320,
              maxWidth: 500,
              height: 600,
              borderRadius: 5,
              marginLeft: 10,
              marginRight: 10,
            }}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <img
                src={imagemLogin}
                width="150px"
                style={{
                  marginBottom: 30,
                  alignItems: 'center',
                  marginRight: '80',
                }}
                alt="Logo"
              />

              <Typography
                variant="h6"
                style={{alignItems: 'center', color: '#d7d7d7'}}>
                Bem-vindo de volta!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{mt: 1}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label={errors.email?.message ?? 'Email'}
                  error={!!errors.email?.message}
                  {...register('email')}
                  autoComplete="email"
                  autoFocus
                />
                <FormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel>Senha</InputLabel>
                  <OutlinedInput
                    {...register('password')}
                    label={errors.password?.message ?? 'Senha'}
                    error={!!errors.password?.message}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}>
                  Entrar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
