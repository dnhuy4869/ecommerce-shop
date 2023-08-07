import { Avatar, Box, List, ListItemAvatar, ListItemButton, ListItemText, Typography, useTheme } from "@mui/material"
import { useCategoryList } from "../api/use-category-list";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@app/config";
import { setSelectedCategory } from "../category.slice";
import { useEffect } from "react";

export const PublicCategoryList = (width) => {

    const theme = useTheme();

    const { categoryList } = useCategoryList();

    const dispatch = useDispatch();

    const selectedCategory = useSelector((state) => state.category.selectedCategory);

    const isSelectedItem = (item) => {
        return selectedCategory === item.id;
    }

    const handleItemClick = (item) => {
        dispatch(setSelectedCategory(item.id));
    };

    useEffect(() => {
        if (!selectedCategory || selectedCategory === '') {
            if (categoryList.length > 0) {
                dispatch(setSelectedCategory(categoryList[0].id));
            }
        }

    }, [categoryList]);

    return (
        <Box component="nav" sx={{
            flexShrink: { md: 0 },
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            width: width,
            [theme.breakpoints.down('md')]: {
                display: 'none',
            }
        }}>
            <Typography sx={{
                mt: 2,
                mb: 1,
                paddingLeft: 3.5,
            }}
                variant="h5" component="div">
                Danh mục
            </Typography>

            <List dense={false} sx={{
                paddingX: 1,
            }}>
                {
                    categoryList.map((category, index) => {
                        return (
                            <ListItemButton
                                key={index}
                                selected={isSelectedItem(category)}
                                onClick={() => { handleItemClick(category) }}
                                sx={{
                                    borderRadius: `12px`,
                                }}>
                                <ListItemAvatar>
                                    <Avatar alt={category.name} src={`${API_URL}${category.imageUrl}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={category.name}
                                />
                            </ListItemButton>
                        )
                    })
                }
            </List>
        </Box>
    )
}