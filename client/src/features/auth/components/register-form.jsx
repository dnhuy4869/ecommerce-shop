import { Box, Button, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../../components/form-input";
import { UserSchema } from "../auth.constants";
import { useState } from "react";
import { register } from "../api/register";

export const RegisterForm = ({ onSuccess }) => {

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.FULLNAME_MIN_LENGTH, `Cần ít nhất ${UserSchema.FULLNAME_MIN_LENGTH} ký tự`)
                .max(UserSchema.FULLNAME_MAX_LENGTH, `Không thể vượt quá ${UserSchema.FULLNAME_MAX_LENGTH} ký tự`),
            email: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.EMAIL_MIN_LENGTH, `Cần ít nhất ${UserSchema.EMAIL_MIN_LENGTH} ký tự`)
                .max(UserSchema.EMAIL_MAX_LENGTH, `Không thể vượt quá ${UserSchema.EMAIL_MAX_LENGTH} ký tự`)
                .email("Email không hợp lệ"),
            username: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.USERNAME_MIN_LENGTH, `Cần ít nhất ${UserSchema.USERNAME_MIN_LENGTH} ký tự`)
                .max(UserSchema.USERNAME_MAX_LENGTH, `Không thể vượt quá ${UserSchema.USERNAME_MAX_LENGTH} ký tự`),
            password: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.PASSWORD_MIN_LENGTH, `Cần ít nhất ${UserSchema.PASSWORD_MIN_LENGTH} ký tự`)
                .max(UserSchema.PASSWORD_MAX_LENGTH, `Không thể vượt quá ${UserSchema.PASSWORD_MAX_LENGTH} ký tự`),
            confirmPassword: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .oneOf([Yup.ref('password'), null], 'Mật khẩu phải trùng khớp')
        }),
        onSubmit: async (values) => {
            setStatus(prevState => ({
                ...prevState,
                isSubmit: true
            }));

            const data = {
                fullName: values.fullName,
                email: values.email,
                username: values.username,
                password: values.password,
            }

            const registerData = await register(data);

            if (!registerData.isSuccess) {
                setStatus(prevState => ({
                    isError: true,
                    errorMessage: registerData.response.message,
                    isSubmit: false,
                }));

                return;
            }

            setStatus(prevState => ({
                ...prevState,
                isSubmit: false,
            }));

            onSuccess();
        },
    })

    const [readOnly, setReadOnly] = useState(true)

    return (
        <>
            <form onSubmit={formik.handleSubmit} >
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
                    name="email"
                    label="Email"
                    isError={Boolean(formik.touched.email && formik.errors.email)}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.email} />

                <FormInput
                    fullWidth
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    type='text'
                    name="username"
                    label="Tên đăng nhập"
                    isError={Boolean(formik.touched.username && formik.errors.username)}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.username} />

                <FormInput
                    fullWidth
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    type='password'
                    name="password"
                    label="Mật khẩu"
                    isError={Boolean(formik.touched.password && formik.errors.password)}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.password} />

                <FormInput
                    fullWidth
                    readOnly={readOnly}
                    setReadOnly={setReadOnly}
                    type='password'
                    name="confirmPassword"
                    label="Nhập lại mật khẩu"
                    isError={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.confirmPassword} />

                <Box sx={{ mt: 2 }}>
                    <Button disableElevation disabled={status.isSubmit} fullWidth
                        size="large" type="submit" variant="contained" color="secondary"
                        sx={{
                            textTransform: 'uppercase'
                        }}>
                        Đăng ký
                    </Button>
                </Box>
                {status.errorMessage && (
                    <Box sx={{ mt: 0.5 }}>
                        <FormHelperText error sx={{ fontSize: '0.8rem' }}>{status.errorMessage}</FormHelperText>
                    </Box>
                )}
            </form>
        </>
    )
}