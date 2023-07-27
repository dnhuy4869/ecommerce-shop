import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const LoginForm = () => {
    const theme = useTheme();

    return (
        <>
            <form noValidate onSubmit={() => { }} >
                <FormControl fullWidth /*error={Boolean(touched.email && errors.email)}*/ sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="username-login">Tên đăng nhập</InputLabel>
                    <OutlinedInput
                        id="username-login"
                        type="email"
                        // value={values.email}
                        name="email"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        label="Email Address / Username"
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
                        label="Password"
                    />
                    {/* {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )} */}
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <Box component="span"></Box>
                    <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                        Quên mật khẩu
                    </Typography>
                </Stack>
                {/* {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )} */}

                <Box sx={{ mt: 2 }}>
                    <Button disableElevation disabled={false} fullWidth
                        size="large" type="submit" variant="contained" color="secondary"
                        sx={{
                            textTransform: 'uppercase'
                        }}>
                        Đăng nhập
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default LoginForm;