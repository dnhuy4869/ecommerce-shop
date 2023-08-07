import { Box, Button, Divider, FormHelperText, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormInput } from "@components/form-input";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../cart.slice";
import { useAuth } from "../../auth/api/use-auth";
import { useBillCrud } from "../../bills/api/use-bill-crud";

export const CartCheckout = () => {
    const theme = useTheme();

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useAuth();
    const cart = useSelector(state => state.cart.cart);

    const { addBill } = useBillCrud();

    const totalPrice = useMemo(() => {
        return cart.reduce((acc, cartItem) => acc + cartItem.amount * cartItem.price, 0)
    }, [cart]);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            address: "",
            phone: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Đây là dữ liệu bắt buộc"),
            address: Yup.string()
                .required("Đây là dữ liệu bắt buộc"),
            phone: Yup.number()
                .required("Đây là dữ liệu bắt buộc")
                .typeError("Dữ liệu phải là một số"),
        }),
        onSubmit: async (values) => {
            setStatus(prevState => ({
                ...prevState,
                isSubmit: true
            }));

            const data = {
                fullName: values.fullName,
                address: values.address,
                phone: values.phone,
                idUser: user.id,
                totalPrice: totalPrice,
            }

            const resData = await addBill(data);
            if (!resData.isSuccess) {
                setStatus(prevState => ({
                    isError: true,
                    errorMessage: resData.response.message,
                    isSubmit: false,
                }));

                return;
            }

            setStatus(prevState => ({
                isError: false,
                errorMessage: resData.response.message,
                isSubmit: false,
            }));

            dispatch(clearCart());

            navigate(`/bill-detail/${resData.response.insertedId}`);
        }
    })

    const [readOnly, setReadOnly] = useState(true)

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    background: "#fff",
                    px: 2,
                    width: "700px",
                }}>
                    <Toolbar sx={{
                        [theme.breakpoints.up('sm')]: {
                            px: 0.5,
                        },
                    }} >
                        <Typography
                            sx={{ p: 0 }}
                            variant="h4"
                            component="div"
                        >
                            Thanh toán
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <Box sx={{ paddingTop: 1, paddingBottom: 2 }}>
                        <form onSubmit={formik.handleSubmit}>

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="fullName"
                                label="Họ tên"
                                isError={Boolean(formik.touched.fullName && formik.errors.fullName)}
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.fullName} />

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="address"
                                label="Địa chỉ"
                                isError={Boolean(formik.touched.address && formik.errors.address)}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.address} />

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="phone"
                                label="Số điện thoại"
                                isError={Boolean(formik.touched.phone && formik.errors.phone)}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.phone} />

                            <Stack direction="row" alignItems="center" justifyContent="space-between"
                                sx={{
                                    mt: 3,
                                }}>
                                {
                                    status.errorMessage
                                        ? (
                                            <FormHelperText error={status.isError} sx={{
                                                fontSize: '0.85rem',
                                                color: "green"
                                            }}>{status.errorMessage}</FormHelperText>
                                        )
                                        : (
                                            <div></div>
                                        )
                                }
                                <Button type="submit" variant="contained" color="secondary">Xác nhận</Button>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    )
}