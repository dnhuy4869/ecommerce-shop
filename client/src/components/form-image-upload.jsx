import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"

export const FormImageUpload = ({title, image, previewUrl, onImageChange}) => {
    return (
        <>
            <Box sx={{ py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h5">{title}</Typography>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={onImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" component="span" color="secondary">
                            Tải lên
                        </Button>
                    </label>
                </Stack>
                {previewUrl && (
                    <Card sx={{ width: "100%", mt: 1 }}>
                        <CardMedia component="img" height="300" image={previewUrl} alt="preview" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {image.name}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </>
    )
}