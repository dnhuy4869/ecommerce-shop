import React from "react";
import {
    Box, Checkbox, Container,
    FormControlLabel, TextField, Typography,
    Grid, Link, Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
    return (
        <>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        px: 4,
                        py: 6,
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Đăng ký
                    </Typography>
                    <Box component="form" onSubmit={(e) => { e.preventDefault() }} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên tài khoản"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Nhập lại mật khẩu"
                            type="password"
                            id="confirmPassword"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </Button>
                        <Box sx={{ display: "flex", justifyContent: 'center' }}>
                            <Link component={RouterLink} to="/login" variant="body2">
                                {"Bạn đã có tài khoản? Đăng nhập"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Register;