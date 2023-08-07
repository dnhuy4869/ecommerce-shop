import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import formatter from "@utils/formatter";
import { useBillCrud } from "../api/use-bill-crud";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";

export const BillDetail = ({ id }) => {

    const { getBillById } = useBillCrud();
    const navigate = useNavigate();

    const [currBill, setCurrBill] = useState({
        fullName: "",
        phone: "",
        address: "",
        totalPrice: 0,
    });

    useEffect(() => {
        (async () => {
            const resData = await getBillById(id);

            if (!resData.isSuccess) {
                enqueueSnackbar(resData.response.message, { variant: 'error' });
                navigate("/products");
            }

            setCurrBill({
                fullName: resData.response.fullName,
                phone: resData.response.phone,
                address: resData.response.address,
                totalPrice: resData.response.totalPrice,
            });

        })()
    }, [])

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    background: "#fff",
                    width: "700px",
                }}>
                    <Box sx={{
                        padding: 2,
                    }}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Chi tiết hóa đơn</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Họ tên</TableCell>
                                        <TableCell align="right">{currBill.fullName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Địa chỉ</TableCell>
                                        <TableCell align="right">{currBill.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Số điện thoại</TableCell>
                                        <TableCell align="right">{currBill.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Tổng tiền</TableCell>
                                        <TableCell align="right">{formatter.toVndCurrency(currBill.totalPrice)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
        </>
    )
}