import { Box, IconButton, Typography } from "@mui/material"
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';

export const Quantity = ({ count, onIncreaseCount, onDecreaseCount, currObject }) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <IconButton
                    variant="outlined"
                    onClick={() => onDecreaseCount(currObject)}
                >
                    <Remove />
                </IconButton>
                <Typography>
                    {count}
                </Typography>
                <IconButton
                    variant="outlined"
                    onClick={() => onIncreaseCount(currObject)}
                >
                    <Add />
                </IconButton>
            </Box>
        </>
    )
}