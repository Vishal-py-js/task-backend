import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';

export default function Loader() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton variant="rectangular" width="100%" height={100} />
    </Box>
  );
}