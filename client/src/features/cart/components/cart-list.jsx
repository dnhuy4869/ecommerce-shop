import laptopAsus from "@assets/latop-asus.webp"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button, Container, Grid, IconButton, ListItemAvatar, ListItemText, Stack, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from "@mui/material/colors";
import { Quantity } from "@components/quantity";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@app/config";
import { decreaseAmountInCart, increaseAmountInCart, removeFromCart } from "../cart.slice";
import { useMemo } from "react";
import formatter from "@utils/formatter";
import { useNavigate } from "react-router-dom";

export const CartList = () => {

    const theme = useTheme();

    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const handleDecreaseCount = (currProduct) => {
        if (currProduct.amount <= 1) {
            return;
        }

        dispatch(decreaseAmountInCart({
            idProduct: currProduct.idProduct,
            amountToDecrease: 1,
        }))
    };

    const handleIncreaseCount = (currProduct) => {
        dispatch(increaseAmountInCart({
            idProduct: currProduct.idProduct,
            amountToIncrease: 1,
        }))
    }

    const handleDeleteItem = (idProduct) => {
        dispatch(removeFromCart(idProduct));
    }

    const totalPrice = useMemo(() => {
        return cart.reduce((acc, cartItem) => acc + cartItem.amount * cartItem.price, 0)
    }, [cart]);

    const navigate = useNavigate();

    const handleCheckoutButton = () => {
        navigate("/checkout");
    }

    return (
        <>
            <Box sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
            }}>
                <Box sx={{
                    padding: 2,
                }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sản phẩm</TableCell>
                                    <TableCell align="left">
                                        <Box sx={{ ml: 2 }}>
                                            Số lượng
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">Giá</TableCell>
                                    <TableCell align="right">Tổng tiền</TableCell>
                                    <TableCell align="right">Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Stack flexDirection="row" alignItems="center" sx={{
                                                gap: 1,
                                            }}>
                                                <Avatar
                                                    variant="rounded"
                                                    alt="image"
                                                    src={`${API_URL}${row.imageUrl}`}
                                                />
                                                <Typography>{row.name}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Quantity
                                                count={row.amount}
                                                currObject={row}
                                                onDecreaseCount={() => handleDecreaseCount(row)}
                                                onIncreaseCount={() => handleIncreaseCount(row)}
                                            />
                                        </TableCell>
                                        <TableCell align="right">{formatter.toVndCurrency(row.price)}</TableCell>
                                        <TableCell align="right">{formatter.toVndCurrency(row.totalPrice)}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => handleDeleteItem(row.idProduct)}
                                                sx={{ color: pink[500] }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box sx={{
                    padding: 2,
                }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tổng hóa đơn</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Tổng tiền</TableCell>
                                    <TableCell align="right">{formatter.toVndCurrency(totalPrice)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <div></div>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={handleCheckoutButton} 
                        sx={{
                            paddingY: 1,
                            minWidth: 300,
                            mt: 3,
                        }}>Thanh toán</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}