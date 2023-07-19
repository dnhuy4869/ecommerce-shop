import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { blue, grey, yellow } from '@mui/material/colors';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

const Footer = () => {
    return (
        <>
            <Divider sx={{
                borderBottomWidth: 2,
                backgroundColor: "primary.main"
            }} />
            <Box
                sx={{
                    backgroundColor: "white",
                    p: 6,
                }}
                component="footer"
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                KẾT NỐI VỚI CHÚNG TÔI
                            </Typography>
                            <Link href="https://www.facebook.com/" sx={{ color: blue[500] }}>
                                <Facebook />
                            </Link>
                            <Link
                                href="https://www.instagram.com/"
                                sx={{ pl: 1, pr: 1, color: yellow[800] }}
                            >
                                <Instagram />
                            </Link>
                            <Link href="https://www.twitter.com/" sx={{ color: blue[400] }}>
                                <Twitter />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={{ textTransform: 'uppercase' }}
                                variant="h6" color="primary.main" gutterBottom>
                                Liên hệ
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Hoàng Hoa Thám, Phường 12, Quận Tân Bình
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Email:  cskh@gearvn.com
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Điện thoại: 234 567 8901
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={{ textTransform: 'uppercase' }}
                                variant="h6" color="primary.main" gutterBottom>
                                Tổng đài hỗ trợ
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Gọi mua: 1800.6975
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                CSKH: 1800.6173
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography sx={{ textTransform: 'uppercase' }}
                                variant="h6" color="primary.main" gutterBottom>
                                Hệ thống chi nhánh
                            </Typography>
                            <Link gutterBottom sx={{ cursor: 'pointer' }}>
                                Khu vực miền nam
                            </Link>
                            <br/>
                            <Link gutterBottom sx={{ cursor: 'pointer' }}>
                                Khu vực miền bắc
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Footer;