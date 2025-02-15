'use client';
import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

interface Props {
  username?: string | null;
}

export default function CommonHeader({ username }: Props) {
  const theme = useTheme();
  const xsPlus = useMediaQuery(theme.breakpoints.up('xs'));
  const smPlus = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <AppBar position="static">
      <Toolbar component={Container}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={1}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            component={Link}
            href="/"
          >
            Simple Todo
          </Typography>
          {username && xsPlus && (
            <Button
              aria-label={`Logout (${username})`}
              color="inherit"
              component={Link}
              href="/logout"
              sx={{ whiteSpace: 'nowrap' }}
            >
              Logout&nbsp;
              {smPlus && (
                <Typography
                  variant="button"
                  sx={{
                    maxWidth: { sm: '18rem', md: '30rem' },
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  ({username}
                </Typography>
              )}
              {smPlus && ')'}
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
