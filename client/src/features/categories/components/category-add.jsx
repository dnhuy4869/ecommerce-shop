import { Box, Button, Card, CardContent, CardMedia, Divider, FormHelperText, IconButton, OutlinedInput, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { CategorySchema } from "../category.constants";
import { FormInput } from "@components/form-input";
import { FileUploadOutlined } from "@mui/icons-material";
import { useImageUpload } from "@hooks/use-image-upload";
import { FormImageUpload } from "@components/form-image-upload";
import { useCategoryCrud } from "../api/use-category-crud";
import { useAuth } from "@features/auth/api/use-auth";

export const CategoryAdd = () => {

    const theme = useTheme();

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const { image, previewUrl, handleImageChange } = useImageUpload();

    const { addCategory } = useCategoryCrud();
    const { user } = useAuth();

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

            const resData = await addCategory(user, data);
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
                                id="name-add"
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
                                        <FormHelperText error sx={{ fontSize: '0.8rem' }}>{status.errorMessage}</FormHelperText>
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
