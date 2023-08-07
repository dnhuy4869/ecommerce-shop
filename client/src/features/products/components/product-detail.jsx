import { Box, Container, Grid, Typography, useTheme, IconButton, Button } from "@mui/material"
import { useProductCrud } from "../api/use-product-crud";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { API_URL } from "@app/config";
import formatter from "@utils/formatter";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Quantity } from "../../../components/quantity";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cart/cart.slice";

export const ProductDetail = ({ id }) => {

    const theme = useTheme();

    const { getProductById } = useProductCrud();
    const navigate = useNavigate();

    const [currProduct, setCurrProduct] = useState({
        id: "",
        idCategory: "",
        name: "",
        price: 0,
        description: "",
        imageUrl: "",
    });

    useEffect(() => {
        (async () => {
            const resData = await getProductById(id);

            if (!resData.isSuccess) {
                enqueueSnackbar(resData.response.message, { variant: 'error' });
                navigate("/products");
            }

            setCurrProduct({
                id: resData.response._id,
                idCategory: resData.response.idCategory,
                name: resData.response.name,
                price: resData.response.price,
                description: resData.response.description,
                imageUrl: resData.response.imageUrl
            });

        })()
    }, [])

    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

    const handleDecreaseCount = () => setCount((c) => count > 1 ? c - 1 : 1);
    const handleIncreaseCount = () => setCount((c) => c + 1);

    const handleAddToCart = () => {
        dispatch(addToCart({
            idProduct: currProduct.id,
            name: currProduct.name,
            imageUrl: currProduct.imageUrl,
            price: currProduct.price,
            amount: count,
        }));
    }

    return (
        <>

            <Container maxWidth="lg">
                <Box sx={{
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                }}>
                    <Grid container >
                        <Grid item sm={12} md={6}>
                            <Box sx={{
                                p: 5,
                            }}>
                                <Box sx={{
                                    height: "415px",
                                    borderRadius: "10px",
                                    overflow: 'hidden',
                                    boxShadow: 1,
                                    padding: 2,
                                }}>
                                    <img src={`${API_URL}${currProduct.imageUrl}`} style={{
                                        width: '100%',
                                        height: '100%',
                                    }} />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item sm={12} md={6}>
                            <Box sx={{
                                p: 5,
                            }}>
                                <Typography variant="h3" sx={{
                                    mt: 5,
                                    ...theme.typography.h3
                                }}>
                                    {currProduct.name}
                                </Typography>
                                <Typography sx={{
                                    marginTop: 3,
                                    ...theme.typography.subtitle2,
                                    fontSize: '1rem',
                                }}>
                                    {currProduct.description}
                                </Typography>
                                <Typography sx={{
                                    marginTop: 3,
                                    ...theme.typography.h2,
                                    color: "primary.main",
                                }}>
                                    {formatter.toVndCurrency(currProduct.price)}
                                </Typography>

                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    marginTop: 3,
                                }}>
                                    <Quantity
                                        count={count}
                                        onDecreaseCount={handleDecreaseCount}
                                        onIncreaseCount={handleIncreaseCount}
                                    />
                                    <Button 
                                    variant="contained"
                                     startIcon={<ShoppingCartOutlinedIcon />}
                                        sx={{ paddingY: 1 }}
                                        onClick={handleAddToCart}
                                        >
                                        Thêm vào giỏ hàng
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}