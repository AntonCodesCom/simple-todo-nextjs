'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLoginSchema, { authLoginSchema } from '~/Auth/types/LoginSchema';
import { login } from './actions';
import { UnauthorizedException } from '~/Auth/exceptions';

// props
interface Props {
  incorrectCredentials?: boolean;
  lastSubmittedAt?: number;
}

/**
 * Login component.
 */
export default function AuthLogin({
  incorrectCredentials,
  lastSubmittedAt,
}: Props) {
  const headingHtmlId = 'AuthLogin_h1';
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const {
    register,
    trigger,
    formState: { errors },
    getValues,
  } = useForm<AuthLoginSchema>({
    resolver: zodResolver(authLoginSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setLoading(false);
  }, [lastSubmittedAt]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDirty(true);
    if (loading) {
      return;
    }
    if (!(await trigger())) {
      return;
    }
    setLoading(true);
    const { username, password } = getValues();
    try {
      await login(username, password);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        // TODO: invalid credentials
      } else {
        throw err;
      }
    }
  }

  return (
    <Container>
      <Typography id={headingHtmlId} variant="h4" component="h1" mb={1}>
        Login
      </Typography>
      {incorrectCredentials && !loading && (
        <Alert severity="error" sx={{ display: 'inline-flex' }}>
          Incorrect username or password.
        </Alert>
      )}
      <Box pb={1} />
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <form
            aria-labelledby={headingHtmlId}
            onSubmit={handleSubmit}
            noValidate
          >
            <Box mb={0.5}>
              <TextField
                {...register('username')}
                label="Username"
                size="small"
                required
                disabled={loading}
                error={dirty && !!errors.username}
                helperText={dirty && errors.username?.message}
                fullWidth
              />
            </Box>
            <Box mb={0.5}>
              <TextField
                {...register('password')}
                type="password"
                label="Password"
                size="small"
                required
                disabled={loading}
                error={dirty && !!errors.password}
                helperText={dirty && errors.password?.message}
                fullWidth
              />
            </Box>
            <Box>
              <Button type="submit" variant="contained" disabled={loading}>
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      <Box mb={2} />
      <Box>
        <Typography>
          Don't have an account?{' '}
          <MuiLink component={Link} href="../signup">
            Sign up
          </MuiLink>{' '}
          now!
        </Typography>
      </Box>
    </Container>
  );
}
