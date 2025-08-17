/**
 * Dashboard loads tasks on mount and renders the task creation form and list.
 * It uses TaskContext for data and actions.
 */

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Modal,
  Tabs,
  Tab
} from '@mui/material';
import { useTasks } from '../contexts/TaskContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Loader from '../components/Skeleton';

export default function Dashboard() {
  const { tasks, loading, loadTasks } = useTasks();
  const [filter, setFilter] = useState({}); // e.g. { status: 'todo' }
  const [modal, setModal] = useState(false)
  const [value, setValue] = useState(0);

  useEffect(() => {
    // load tasks with filter; runs on mount and when filter changes
    loadTasks(filter).catch((err) => console.error(err));
  }, [filter]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Apply filter based on selected tab
    switch (newValue) {
      case 0:
        setFilter({});
        break;
      case 1:
        setFilter({ status: 'todo' });
        break;
      case 2:
        setFilter({ status: 'in-progress' });
        break;
      case 3:
        setFilter({ status: 'done' });
        break;
      default:
        setFilter({});
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {/* <Typography variant="h4" gutterBottom>Dashboard</Typography> */}

      <Grid container flex flexDirection="column" spacing={2}>
        <Button onClick={()=>setModal(true)} type="submit" variant="contained" sx={{width:"fit-content", mt: 1, alignSelf:"flex-end" }}>
        ADD TASK
        </Button>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h5" fontWeight={600}>Tasks</Typography>
              {/* Small filter UI placeholders — replace with MUI controls if you want */}
              {/* <Box>
                <button onClick={() => setFilter({})}>All</button>
                <button onClick={() => setFilter({ status: 'todo' })}>Todo</button>
                <button onClick={() => setFilter({ status: 'in-progress' })}>In Progress</button>
                <button onClick={() => setFilter({ status: 'done' })}>Done</button>
              </Box> */}
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="filter tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="All" />
                <Tab label="Todo" />
                <Tab label="In Progress" />
                <Tab label="Done" />
              </Tabs>
            </Box>

            {loading ? <Loader /> : <TaskList tasks={tasks} onRefresh={() => loadTasks(filter)} />}
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={modal}
        onClose={()=>setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex", justifyContent:"center", alignItems:"center"}}
      >
        <Box sx={{background:"#ffff", width: "70%", p:2, borderRadius:2}}>
          <Typography variant="h6">Create Task</Typography>
          <TaskForm onClose={()=>setModal(false)} onCreated={() => {loadTasks(filter); setModal(false)}} />
        </Box>
      </Modal>
    </Container>
  );
}
