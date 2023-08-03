import { DataTable } from "@components/data-table"
import { Avatar, Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { useMemo, useState } from "react"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "@components/confirm-dialog";

export const CategoryList = () => {

    const headCells = useMemo(() => [
        {
            id: 'name',
            numeric: false,
            disableSort: false,
            label: 'Tên loại hàng',
        },
        {
            id: 'imageUrl',
            numeric: false,
            disableSort: true,
            label: 'Hình ảnh',
        },
        {
            id: 'actions',
            numeric: true,
            disableSort: true,
            label: 'Thao tác',
        },
    ], []);

    const searchOptions = useMemo(() => [
        {
            value: 'name',
            name: "Tên loại hàng",
        },
        {
            value: 'imageUrl',
            name: "Hình ảnh",
        },
    ], []);

    const allCategories = [
        {
            name: 'Cupcake',
            imageUrl: "https://tanthanhpc.vn/wp-content/uploads/2022/10/PC-Workstation-T22-Core-i7-12700K.jpg",
        },
        {
            name: 'Cupcake2',
            imageUrl: "https://tanthanhpc.vn/wp-content/uploads/2022/10/PC-Workstation-T22-Core-i7-12700K.jpg",
        },
        {
            name: 'Cupcake4',
            imageUrl: "https://tanthanhpc.vn/wp-content/uploads/2022/10/PC-Workstation-T22-Core-i7-12700K.jpg",
        },
        {
            name: 'Cupcake6',
            imageUrl: "https://tanthanhpc.vn/wp-content/uploads/2022/10/PC-Workstation-T22-Core-i7-12700K.jpg",
        },
    ];

    //const rows = useMemo(() => allCategories, [allCategories]);

    const [openDialog, setOpenDialog] = useState(false);

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const handleDialogConfirm = () => {
        setOpenDialog(false);
    }

    const renderRows = (idField, visibleRows, emptyRows, isSelected, handleSelect) => {
        return (
            <>
                {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row[idField]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                        <TableRow
                            hover
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row[idField]}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onClick={(event) => handleSelect(event, row[idField])}
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </TableCell>
                            <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align="left">
                                <Avatar alt="image" src={row.imageUrl} />
                            </TableCell>
                            <TableCell align="right">
                                <Box sx={{}}>
                                    <Link to={`edit/${row.id}`}><ModeEditIcon color="primary" /></Link>
                                    <DeleteIcon
                                        onClick={() => setOpenDialog(true)}
                                        sx={{ color: pink[500] }}
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow
                        style={{
                            height: (53) * emptyRows,
                        }}
                    >
                        <TableCell colSpan={headCells.length} />
                    </TableRow>
                )}
            </>
        )
    }

    return (
        <>
            <DataTable
                idField="name"
                title="Loại hàng"
                headCells={headCells}
                rows={allCategories}
                searchOptions={searchOptions}
                renderRows={renderRows}
            />
            <ConfirmDialog
                title="Xóa loại hàng"
                content="Bạn có chắc muốn là muốn xóa loại hàng này ?"
                open={openDialog}
                handleClose={handleDialogClose}
                onConfirm={handleDialogConfirm}
            />
        </>
    )
}