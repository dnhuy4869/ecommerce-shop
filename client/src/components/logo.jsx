import { Box, Typography } from '@mui/material';

export const Logo = ({icon, text}) => {

    const IconComponent = () => {
        return icon;
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'secondary.main',
            }}>
                <IconComponent sx={{
                    fontSize: '2rem',
                }} />
                <Typography sx={{
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                }}>{text}</Typography>
            </Box>
        </>
    )
}