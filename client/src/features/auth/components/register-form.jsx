import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export const RegisterForm = () => {
    const theme = useTheme();

    // Validate schema from database
    const FULLNAME_MIN_LENGTH = 3;
    const FULLNAME_MAX_LENGTH = 60;

    const USERNAME_MIN_LENGTH = 6;
    const USERNAME_MAX_LENGTH = 50;

    const PASSWORD_MIN_LENGTH = 6;
    const PASSWORD_MAX_LENGTH = 50;

    const EMAIL_MIN_LENGTH = 6;
    const EMAIL_MAX_LENGTH = 60;

    const formik = useFormik({
        initialValues: {
            fullName: "",
            username: "",
            password: "",
            email: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(FULLNAME_MIN_LENGTH, `Cần ít nhất ${FULLNAME_MIN_LENGTH} ký tự`)
                .max(FULLNAME_MAX_LENGTH, `Không thể vượt quá ${FULLNAME_MAX_LENGTH} ký tự`),
            username: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(USERNAME_MIN_LENGTH, `Cần ít nhất ${USERNAME_MIN_LENGTH} ký tự`)
                .max(USERNAME_MAX_LENGTH, `Không thể vượt quá ${USERNAME_MAX_LENGTH} ký tự`),
            password: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(PASSWORD_MIN_LENGTH, `Cần ít nhất ${PASSWORD_MIN_LENGTH} ký tự`)
                .max(PASSWORD_MAX_LENGTH, `Không thể vượt quá ${PASSWORD_MAX_LENGTH} ký tự`),
            email: Yup.string()
                .required("Đây là dữ liệu bắt buộc")
                .min(EMAIL_MIN_LENGTH, `Cần ít nhất ${EMAIL_MIN_LENGTH} ký tự`)
                .max(EMAIL_MAX_LENGTH, `Không thể vượt quá ${EMAIL_MAX_LENGTH} ký tự`)
                .email("Email không hợp lệ"),
        }),
        onSubmit: async (values) => {
            console.log("subbmit");
        },
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit} >
                <FormControl fullWidth error={Boolean(formik.touched.fullName && formik.errors.fullName)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="fullname-login">Họ và tên</InputLabel>
                    <OutlinedInput
                        id="fullname-login"
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        label="Họ và tên"
                        inputProps={{}}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {formik.errors.fullName}
                                </FormHelperText>
                            )}
                </FormControl>

                <FormControl fullWidth error={Boolean(formik.touched.username && formik.errors.username)} sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="username-login">Tên đăng nhập</InputLabel>
                    <OutlinedInput
                        id="username-login"
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        label="Tên đăng nhập"
                        inputProps={{}}
                    />
                    {formik.touched.username && formik.errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {formik.errors.username}
                                </FormHelperText>
                            )}
                </FormControl>

                <FormControl fullWidth /*error={Boolean(touched.password && errors.password)}*/ sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                    <OutlinedInput
                        id="password-login"
                        type='password'
                        // value={values.password}
                        name="password"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        label="Mật khẩu"
                    />
                    {/* {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )} */}
                </FormControl>

                <Box sx={{ mt: 2 }}>
                    <Button disableElevation disabled={false} fullWidth
                        size="large" type="submit" variant="contained" color="secondary"
                        sx={{
                            textTransform: 'uppercase'
                        }}>
                        Đăng ký
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