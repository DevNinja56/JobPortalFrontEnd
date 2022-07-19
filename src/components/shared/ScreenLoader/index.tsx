import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    isVisible: boolean
}

const ScreenLoader = ({ isVisible }: Props) => {
    return (
        <>
            {isVisible &&
                <div className='screenLoader' >
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    <h2 className="text-center text-light">Please Wait!</h2>
                </div>}
        </>
    );
}

export default ScreenLoader;