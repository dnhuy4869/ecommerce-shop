import { Box, Button, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, Toolbar, Typography, useTheme } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { ProductSchema } from "../product.constants";
import { FormInput } from "@components/form-input";
import { useImageUpload } from "@hooks/use-image-upload";
import { FormImageUpload } from "@components/form-image-upload";
import { useProductCrud } from "../api/use-product-crud";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useCategoryList } from "../../categories/api/use-category-list";

export const ProductAdd = () => {

    const theme = useTheme();

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const { image, previewUrl, handleImageChange } = useImageUpload();

    const { addProduct, uploadProductImage } = useProductCrud();

    const { categoryList } = useCategoryList();

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const uploadImage = async (id) => {

        if (!image) {
            return false;
        }

        const resData = await uploadProductImage(id, image);

        if (!resData.isSuccess) {
            enqueueSnackbar(resData.response.message, { variant: 'error' });
            return false;
        }

        return true;
    }

    const formik = useFormik({
        initialValues: {
            idCategory: "",
            name: "",
            price: 0,
            description: "",
        },
        validationSchema: Yup.object({
            idCategory: Yup.string()
                .required("Đây là dữ liệu bắt buộc"),
            name: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(ProductSchema.NAME_MIN_LENGTH, `Cần ít nhất ${ProductSchema.NAME_MIN_LENGTH} ký tự`)
                .max(ProductSchema.NAME_MAX_LENGTH, `Không thể vượt quá ${ProductSchema.NAME_MAX_LENGTH} ký tự`),
            price: Yup.number()
                .required("Đây là dữ liệu bắt buộc")
                .typeError("Dữ liệu phải là một số"),
            description: Yup.string()
                .required("Đây là dữ liệu bắt buộc"),
        }),
        onSubmit: async (values) => {
            setStatus(prevState => ({
                ...prevState,
                isSubmit: true
            }));

            const data = {
                idCategory: values.idCategory,
                name: values.name,
                price: values.price,
                description: values.description,
            }

            const resData = await addProduct(data);
            if (!resData.isSuccess) {
                setStatus(prevState => ({
                    isError: true,
                    errorMessage: resData.response.message,
                    isSubmit: false,
                }));

                return;
            }

            await uploadImage(resData.response.insertedId);

            setStatus(prevState => ({
                isError: false,
                errorMessage: resData.response.message,
                isSubmit: false,
            }));

            enqueueSnackbar(resData.response.message, { variant: 'success' });

            navigate("/admin/products");
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
                            Thêm mới
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <Box sx={{ paddingTop: 1, paddingBottom: 2 }}>
                        <form onSubmit={formik.handleSubmit}>

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='select'
                                name="idCategory"
                                label="Loại hàng"
                                isError={Boolean(formik.touched.idCategory && formik.errors.idCategory)}
                                value={formik.values.idCategory}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.idCategory}
                                selectItems={categoryList}
                            />

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="name"
                                label="Tên sản phẩm"
                                isError={Boolean(formik.touched.name && formik.errors.name)}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.name} />

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="price"
                                label="Giá"
                                isError={Boolean(formik.touched.price && formik.errors.price)}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.price} />

                            <FormInput
                                fullWidth
                                readOnly={readOnly}
                                setReadOnly={setReadOnly}
                                type='text'
                                name="description"
                                label="Mô tả"
                                isError={Boolean(formik.touched.description && formik.errors.description)}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.description} />

                            <FormImageUpload
                                title="Hình ảnh"
                                image={image}
                                previewUrl={previewUrl}
                                onImageChange={handleImageChange}
                            />

                            <Stack direction="row" alignItems="center" justifyContent="space-between">
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