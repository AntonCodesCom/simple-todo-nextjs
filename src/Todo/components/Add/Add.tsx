'use client';
import { Add } from '@mui/icons-material';
import { Button, CircularProgress, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { addTodo } from './actions';

// sub-component
function LoadingIcon() {
  return (
    <Box display="inline-block" lineHeight={1} mx={0.12}>
      <CircularProgress color="inherit" size="1rem" />
    </Box>
  );
}

/**
 * "Add todo" form component.
 */
export default function TodoAdd() {
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);

  const Icon = () => (loading ? <LoadingIcon /> : <Add />);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    await addTodo(label);
    setLabel('');
    setLoading(false);
  }

  return (
    <form aria-label="Add Todo" onSubmit={handleSubmit}>
      <Stack direction="row" gap={{ xs: 0.25, sm: 0.5 }}>
        <TextField
          name="label"
          placeholder="Something to do..."
          size="small"
          fullWidth
          required
          inputProps={{ maxLength: 1000 }}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            display: { xs: 'inherit', sm: 'none' },
            minWidth: '2.75rem',
            paddingX: 0.75,
          }}
        >
          <Icon />
        </Button>
        <Button
          type="submit"
          variant="contained"
          startIcon={<Icon />}
          disabled={loading}
          sx={{
            display: { xs: 'none', sm: 'inherit' },
          }}
        >
          Add
        </Button>
      </Stack>
    </form>
  );
}
