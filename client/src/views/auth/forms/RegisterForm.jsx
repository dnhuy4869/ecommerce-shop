import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const RegisterForm = () => {
    const theme = useTheme();

    return (
        <>
            <form noValidate onSubmit={() => { }} >
            <FormControl fullWidth /*error={Boolean(touched.email && errors.email)}*/ sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="fullname-login">Họ và tên</InputLabel>
                    <OutlinedInput
                        id="fullname-login"
                        type="text"
                        // value={values.email}
                        name="fullname"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        label="Họ và tên"
                        inputProps={{}}
                    />
                    {/* {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )} */}
                </FormControl>

            <FormControl fullWidth /*error={Boolean(touched.email && errors.email)}*/ sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="username-login">Tên đăng nhập</InputLabel>
                    <OutlinedInput
                        id="username-login"
                        type="text"
                        // value={values.email}
                        name="username"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        label="Tên đăng nhập"
                        inputProps={{}}
                    />
                    {/* {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )} */}
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

export default RegisterForm;