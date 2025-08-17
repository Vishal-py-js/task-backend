/**
 * Task item with inline edit.
 * - Show title, description, status, dueDate
 * - Edit toggles an inline form to update task
 * - Delete button deletes the task
 */

import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Card
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasks } from '../contexts/TaskContext';

export default function TaskItem({ task, onRefresh }) {
  const { updateTask, deleteTask } = useTasks();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || '',
    status: task.status || 'todo',
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
  });

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || undefined
      };
      await updateTask(task._id, payload);
      setEditing(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete task?')) return;
    try {
      await deleteTask(task._id);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  function getUrgencyColor(dateStr) {
    console.log(dateStr);
    const today = new Date();
    const targetDate = new Date(dateStr); // ensure no timezone offset

    // Calculate difference in days
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);

    if (diffDays <= 0) {
        return "#fe5656" // Past date
    } else if (diffDays <= 3) {
        return "orange"; // Very urgent
    } else if (diffDays <= 7) {
        return "#ebd619"; // Upcoming
    } else {
        return "#64c170"; // Not urgent
    }
  }

  return (
    // <ListItem divider>
    <Card sx={{display:"flex", flexDirection:editing?"column":"", p:2}}>
      {!editing ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap:1 }}>
          <Typography variant="h5" fontWeight={600}>{task.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {task.description}
          </Typography>
          <Typography variant="body1" mt={1.5} fontWeight={600} color="text.secondary">
            Status: {task.status}
          </Typography>
          <Typography
            sx={{
                mt:2,
                background: getUrgencyColor(task.dueDate),
                width: "fit-content",
                px: 1,
                py: 0.5,
                fontSize: "14px",
                borderRadius: "10px",
                color: "white"
            }}
          >
            Due {task.dueDate.slice(0, 10)}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TextField value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
          <TextField value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth sx={{ mt: 1 }} />
          <TextField type='date' value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} fullWidth sx={{ mt: 1 }} />
          <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} sx={{ mt: 1 }}>
            <MenuItem value="todo">Todo</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </Box>
      )}

      <Box sx={{ ml: 1, mt:editing?2:0, alignSelf:editing?"flex-end":""}} >
        {editing ? (
          <>
            {/* <IconButton onClick={handleSave} color="primary"><SaveIcon /></IconButton>
            <IconButton onClick={() => setEditing(false)}><EditIcon /></IconButton> */}
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
              onClick={() => setEditing(false)}
            >
              CANCEL
            </Button>
            <Button onClick={handleSave} color="primary">SAVE</Button>
          </>
        ) : (
          <>
            <IconButton onClick={() => setEditing(true)}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
          </>
        )}
      </Box>
    {/* </ListItem> */}
    </Card>
  );
}
