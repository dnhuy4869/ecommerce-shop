import { Divider, List } from "@mui/material"
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSelectedMenu } from "../admin-layout.slice";
import { useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { MenuItem } from "./menu-item";

export const MenuList = () => {
    const navigate = useNavigate();

    const menuList = [
        {
            path: "categories",
            icon: <CategoryOutlinedIcon />,
            text: "Loại hàng",
        },
        {
            path: "products",
            icon: <Inventory2OutlinedIcon />,
            text: "Sản phẩm",
        },
    ]

    const dispatch = useDispatch();
    const selectedMenu = useSelector(state => state.adminLayout.selectedMenu);

    useEffect(() => {
        if (!selectedMenu || selectedMenu === '') {
            dispatch(setSelectedMenu(menuList[0].path));

            navigate(`/admin/${menuList[0].path}`);
        }

        return () => {
            dispatch(setSelectedMenu(''));
        }
    }, []);

    return (
        <>
            <List>
                {
                    menuList.map((menu, index) => {
                        return (
                            <MenuItem key={index} item={menu} level={1} />
                        )
                    })
                }
            </List>

            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
    )
}