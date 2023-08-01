import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../../components/form-input";
import { UserSchema } from "../auth.constants";
import { useState } from "react";
import { login } from "../api/login";
import { useAuth } from "../api/use-auth";

export const LoginForm = ({ onSuccess }) => {

    const [status, setStatus] = useState({
        isError: false,
        errorMessage: "",
        isSubmit: false,
    });

    const { user, setLocalUser } = useAuth();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.USERNAME_MIN_LENGTH, `Cần ít nhất ${UserSchema.USERNAME_MIN_LENGTH} ký tự`)
                .max(UserSchema.USERNAME_MAX_LENGTH, `Không thể vượt quá ${UserSchema.USERNAME_MAX_LENGTH} ký tự`),
            password: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(UserSchema.PASSWORD_MIN_LENGTH, `Cần ít nhất ${UserSchema.PASSWORD_MIN_LENGTH} ký tự`)
                .max(UserSchema.PASSWORD_MAX_LENGTH, `Không thể vượt quá ${UserSchema.PASSWORD_MAX_LENGTH} ký tự`),
        }),
        onSubmit: async (values) => {
            setStatus(prevState => ({
                ...prevState,
                isSubmit: true
            }));

            const data = {
                username: values.username,
                password: values.password,
            }

            const loginData = await login(data);
            //console.log(loginData);

            if (!loginData.isSuccess) {
                setStatus(prevState => ({
                    isError: true,
                    errorMessage: loginData.response.message,
                    isSubmit: false,
                }));

                return;
            }

            setStatus(prevState => ({
                ...prevState,
                isSubmit: false,
            }));

            setLocalUser(loginData.response);

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
                    id="username-register"
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
                    id="password-register"
                    name="password"
                    label="Mật khẩu"
                    isError={Boolean(formik.touched.password && formik.errors.password)}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.password} />

                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Box component="span"></Box>
                    <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        Quên mật khẩu
                    </Typography>
                </Stack>

                <Box sx={{ mt: 2 }}>
                    <Button disableElevation disabled={status.isSubmit} fullWidth
                        size="large" type="submit" variant="contained" color="secondary"
                        sx={{
                            textTransform: 'uppercase'
                        }}>
                        Đăng nhập
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