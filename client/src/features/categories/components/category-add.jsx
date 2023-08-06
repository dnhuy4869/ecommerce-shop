import { Box, Button, Divider, FormHelperText, Stack, Toolbar, Typography, useTheme } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { CategorySchema } from "../category.constants";
import { FormInput } from "@components/form-input";
import { useImageUpload } from "@hooks/use-image-upload";
import { FormImageUpload } from "@components/form-image-upload";
import { useCategoryCrud } from "../api/use-category-crud";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const CategoryAdd = () => {

    const theme = useTheme();

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const { image, previewUrl, handleImageChange } = useImageUpload();

    const { addCategory, uploadCategoryImage } = useCategoryCrud();

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const uploadImage = async (id) => {

        if (!image) {
            return false;
        }

        const resData = await uploadCategoryImage(id, image);

        if (!resData.isSuccess) {
            enqueueSnackbar(resData.response.message, { variant: 'error' });
            return false;
        }

        return true;
    }

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(CategorySchema.NAME_MIN_LENGTH, `Cần ít nhất ${CategorySchema.NAME_MIN_LENGTH} ký tự`)
                .max(CategorySchema.NAME_MAX_LENGTH, `Không thể vượt quá ${CategorySchema.NAME_MAX_LENGTH} ký tự`),
        }),
        onSubmit: async (values) => {
            setStatus(prevState => ({
                ...prevState,
                isSubmit: true
            }));

            const data = {
                name: values.name,
            }

            const resData = await addCategory(data);
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

            navigate("/admin/categories");
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
                                type='text'
                                name="name"
                                label="Tên loại hàng"
                                isError={Boolean(formik.touched.name && formik.errors.name)}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                errorMessage={formik.errors.name} />

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
                                            fontSize: '0.85rem' ,
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
