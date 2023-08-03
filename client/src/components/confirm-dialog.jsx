import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const ConfirmDialog = ({ title, content, open, handleClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Hủy
                </Button>
                <Button
                    onClick={() => {
                        onConfirm();
                        handleClose();
                    }}
                    autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}