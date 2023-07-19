import { Home } from "@mui/icons-material";
import { Link, Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";
import React from "react";

const Breadcrumbs = () => {
    return (
        <>
            <MUIBreadcrumbs aria-label="breadcrumb" sx={{
                paddingY: 2,
                fontWeight: 400
            }}>
                <Link underline="hover" color="primary.main" href="/" sx={{
                    display: "flex",
                    alignItems: "center",

                }}>
                    <Home />
                    Trang chủ
                </Link>
                <Typography color="grey.700" sx={{ fontWeight: 500 }}>Sản phẩm</Typography>
            </MUIBreadcrumbs>
        </>
    )
}

export default Breadcrumbs;