import { Box, OutlinedInput, Toolbar, Typography } from "@mui/material"
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { CategorySchema } from "../category.constants";
import { FormInput } from "@components/form-input";

export const CategoryAdd = () => {

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

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

        }
    })

    const [readOnly, setReadOnly] = useState(true)

    return (
        <>
            <Box sx={{
                background: "#fff",
                px: 2 ,
            }}>
                <Toolbar >
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h4"
                        id="tableTitle"
                        component="div"
                    >
                        Thêm mới
                    </Typography>
                </Toolbar>
                <form
                    onSubmit={formik.onSubmit}
                >
                    <FormInput
                        sx={{ width: "50%" }}
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
                </form>
            </Box>
        </>
    )
}
