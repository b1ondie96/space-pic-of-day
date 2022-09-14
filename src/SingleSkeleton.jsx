import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SingleSkeleton = () => {
  return (
    <Stack sx={{height:'390px',width:'350px', backgroundColor:'rgb(30,30,30)'}}>
<Skeleton animation='wave'  variant="rounded" width='100%' height='100%' />
    </Stack>

  )
}

export default SingleSkeleton