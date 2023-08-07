import { Avatar, Box, ButtonBase, useTheme } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

export const Notification = () => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        color="inherit"
                    >
                        <NotificationsNoneOutlinedIcon />
                    </Avatar>
                </ButtonBase>
            </Box>
        </>
    )
}