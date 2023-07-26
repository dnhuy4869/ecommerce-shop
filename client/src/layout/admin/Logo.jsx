import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { Box, Typography } from '@mui/material';

const Logo = () => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'secondary.main',
            }}>
                <AdminPanelSettingsOutlinedIcon sx={{
                    fontSize: '2rem',
                }} />
                <Typography sx={{
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                }}>Admin</Typography>
            </Box>
        </>
    )
}

export default Logo;