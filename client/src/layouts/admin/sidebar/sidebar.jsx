import { Box, Chip, Drawer, Stack, useMediaQuery, useTheme } from "@mui/material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Logo } from "../logo";
import { DRAWER_WIDTH } from "../admin-layout.constants";
import { MenuList } from "./menu-list";
 
export const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <>
            <Box sx={{
                display: {
                    xs: 'block',
                    md: 'none',
                },
            }}>
                <Box sx={{
                    paddingX: 2,
                    paddingY: 3,
                    mx: 'auto',
                }}>
                    <Box sx={{
                        marginLeft: 3,
                    }}>
                        <Logo />
                    </Box>
                </Box>
            </Box>
            <PerfectScrollbar
                component="div"
                style={{
                    height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                <MenuList />
                <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
                    <Chip label="v1.0.0" disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
                </Stack>
            </PerfectScrollbar>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? DRAWER_WIDTH : 'auto' }} aria-label="mailbox folders">
                <Drawer
                    container={container}
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={drawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRight: 'none',
                            [theme.breakpoints.up('md')]: {
                                top: '88px'
                            }
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}