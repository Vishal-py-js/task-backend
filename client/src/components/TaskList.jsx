/**
 * Task list wrapper simply maps tasks to TaskItem
 */

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import TaskItem from './TaskItem';

export default function TaskList({ tasks = [], onRefresh }) {
  if (!tasks.length) {
    return <Typography>No tasks yet. Add one!</Typography>;
  }

  return (
    <List>
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onRefresh={onRefresh} />
      ))}
    </List>
  );
}
