import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../../components/form-input";
import { UserSchema } from "../auth.constants";

export const LoginForm = () => {

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
            console.log("subbmit");
        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <FormInput
                    fullWidth
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
                    <Button disableElevation disabled={false} fullWidth
                        size="large" type="submit" variant="contained" color="secondary"
                        sx={{
                            textTransform: 'uppercase'
                        }}>
                        Đăng nhập
                    </Button>
                </Box>
                {/* {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )} */}
            </form>
        </>
    )
}