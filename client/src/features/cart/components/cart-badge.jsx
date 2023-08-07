import { Avatar, Badge, ButtonBase, useTheme } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export const CartBadge = () => {

    const theme = useTheme();

    return (
        <>
            <Badge color="secondary" badgeContent={3}>
                <ButtonBase sx={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        color="inherit"
                    >
                        <ShoppingCartOutlinedIcon />
                    </Avatar>
                </ButtonBase>
            </Badge>


        </>
    )
}