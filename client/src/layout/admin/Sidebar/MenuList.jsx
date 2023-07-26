import { Divider, List } from "@mui/material"
import MenuItem from "./MenuItem";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSelectedMenu } from "../../../features/adminSidebarSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const MenuList = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const menuList = [
        {
            href: "categories",
            icon: <CategoryOutlinedIcon />,
            text: "Loại hàng",
        },
        {
            href: "products",
            icon: <Inventory2OutlinedIcon />,
            text: "Sản phẩm",
        },
    ]

    const dispatch = useDispatch();
    const selectedMenu = useSelector(state => state.adminSidebar.selectedMenu);
    
    useEffect(() => {
        if (!selectedMenu || selectedMenu === '') {
            dispatch(setSelectedMenu(menuList[0].href));

            navigate(`admin/${menuList[0].href}`);
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

export default MenuList;