import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { setSelectedMenu, setSidebarOpened } from "../admin-layout.slice";
import { useDispatch, useSelector } from "react-redux";

export const MenuItem = ({ item, level }) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const selectedMenu = useSelector(state => state.adminLayout.selectedMenu);

    const isItemActive = (item) => {
        return pathname.includes(item.path);
    }

    // active menu item on page load
    useEffect(() => {
        if (!selectedMenu && isItemActive(item)) {
            dispatch(setSelectedMenu(item.path));
        }

    }, [pathname]);

    const itemHandler = (item) => {
        dispatch(setSelectedMenu(item.path));

        if (matchesSM) {
            dispatch(setSidebarOpened(false));
        }
    };

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.path} />)
    };

    return (
        <>
            <ListItemButton
                {...listItemProps}
                sx={{
                    borderRadius: `12px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={isItemActive(item)}
                onClick={() => itemHandler(item)}
            >
                <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={isItemActive(item) ? 'h5' : 'body1'} color="inherit">
                            {item.text}
                        </Typography>
                    }
                />
            </ListItemButton>
        </>
    )
}