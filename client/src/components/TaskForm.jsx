/**
 * Task creation form using react-hook-form (simple zod validation).
 * onCreated is optional callback (e.g., to refresh list).
 */

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button } from '@mui/material';
import { useTasks } from '../contexts/TaskContext';

// zod schema for creating a task (title required)
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z
    .string()
    .optional()
    .refine((v) => !v || !Number.isNaN(Date.parse(v)), { message: 'Invalid date' })
});

export default function TaskForm({ onCreated, onClose }) {
  const { createTask } = useTasks();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: { title: '', description: '', dueDate: '' }
  });

  const onSubmit = async (data) => {
    try {
      // Normalize empty dueDate to undefined
      if (!data.dueDate) delete data.dueDate;
      await createTask(data);
      reset();
      if (onCreated) onCreated();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register('title')}
        error={!!formState.errors?.title}
        helperText={formState.errors?.title?.message}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        {...register('description')}
      />

      {/* <TextField
        label="Due date (YYYY-MM-DD)"
        type='date'
        fullWidth
        margin="normal"
        {...register('dueDate')}
        error={!!formState.errors?.dueDate}
        helperText={formState.errors?.dueDate?.message}
      /> */}

      <TextField
        label="Due date"
        type="date"
        fullWidth
        margin="normal"
        {...register('dueDate')}
        error={!!formState.errors?.dueDate}
        helperText={formState.errors?.dueDate?.message}
        InputLabelProps={{
          shrink: true, // Keep label visible above the input
        }}
        sx={{
          '& .MuiInputLabel-root': {
            transition: 'all 0.3s ease',
          },
          '& .Mui-focused .MuiInputLabel-root': {
            '&::after': {
              content: '" (MM-DD-YYYY)"',
              fontWeight: 400,
              color: 'inherit',
            },
          },
        }}
      />

      <Box sx={{display:"flex", ml: 1, mt:2, justifyContent:"flex-end"}} >
        <Button
          sx={{
            backgroundColor: '#bdbcbc',           // light gray
            color: 'black',
            textTransform: 'none',
            boxShadow: 'none',
            color: "#ffff",
            mr: 1,
            '&:hover': {
              backgroundColor: '#9b9999',         // slightly darker gray
              boxShadow: 'none',
            },
          }}
          onClick={onClose}
        >
          CANCEL
        </Button>

        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
