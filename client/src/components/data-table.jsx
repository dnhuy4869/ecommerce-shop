import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, InputAdornment, MenuItem, OutlinedInput, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from "./confirm-dialog"

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function DataTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={index === 0 ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={headCell.disableSort ? null : createSortHandler(headCell.id)}
                            hideSortIcon={headCell.disableSort}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

DataTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const DataTableTitle = ({ title }) => {
    return (
        <Toolbar
            sx={{
                px: 2,
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h4"
                component="div"
            >
                {title}
            </Typography>

            <Button component={Link} to="add"
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                sx={{
                    textTransform: 'initial',
                    px: 1,
                    py: 1,
                    minWidth: 120
                }}>
                Thêm mới
            </Button>
        </Toolbar>
    );
}

const DataTableSearch = ({ searchOptions, setSearchData, originalData }) => {
    const [keyword, setKeyword] = React.useState('');
    const [option, setOption] = React.useState('');

    React.useEffect(() => {
        if (!option || option === "") {
            setOption(searchOptions[0].value);
        }
    }, []);

    const theme = useTheme();

    const handleSearchInput = (e) => {

        const key = e.target.value;
        setKeyword(key);

        const searchData = originalData.filter(item => item[option].includes(key));
        setSearchData(searchData);
    }

    return (
        <>
            <Toolbar
                sx={{
                    px: 2,
                    paddingTop: 0,
                    paddingBottom: 2,
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between",
                    [theme.breakpoints.down('lg')]: {
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1.5,
                    },
                }}
            >
                <OutlinedInput
                    type="text"
                    value={keyword}
                    onChange={handleSearchInput}
                    sx={{
                        minWidth: '50%',
                        background: "#fff",
                        "& input": {
                            backgroundColor: "#fff",
                        },
                        [theme.breakpoints.down('lg')]: {
                            minWidth: "100%",
                        },
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    } />

                <FormControl variant="outlined" sx={{
                    display: "flex",
                    alignItems: 'center',
                    flexDirection: "row",
                    gap: 1,
                    [theme.breakpoints.down('lg')]: {
                        minWidth: "100%",
                    },
                }}>
                    <Typography variant='h5' >Lọc theo</Typography>
                    <Select
                        value={option}
                        onChange={e => setOption(e.target.value)}
                        sx={{
                            minWidth: 180,
                            [theme.breakpoints.down('lg')]: {
                                minWidth: "90%",
                            },
                        }}
                    >
                        {
                            searchOptions && searchOptions.map((optionData, index) => {
                                return (
                                    <MenuItem key={index} value={optionData.value}>{optionData.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </Toolbar>
        </>
    )
}

const DataTableSelect = ({ selected, setSelected, onDeleteMultiple }) => {

    const [ openDialog, setOpenDialog] = React.useState(false);

    const handleDelete = () => {
        onDeleteMultiple(selected);
        setSelected([]);
    }

    return (
        <>
            {
                selected.length > 0 && (
                    <Toolbar
                        sx={{
                            px: 2,
                            paddingY: 1,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }}
                    >
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            Đã chọn {selected.length}
                        </Typography>

                        <Tooltip title="Delete">
                            <IconButton onClick={() => setOpenDialog(true)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                )
            }

            <ConfirmDialog
                title="Xóa tất cả lựa chọn"
                content="Bạn có chắc muốn là muốn tất cả lựa chọn không ?"
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                onConfirm={handleDelete}
            />
        </>
    )
}

export const DataTable = ({
    idField, headCells, rows, title, searchOptions, renderRows, originalRows, setRowData, onDeleteMultiple
}) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(searchOptions[0].value);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n[idField]);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <DataTableTitle title={title} />
                    <DataTableSearch searchOptions={searchOptions} setSearchData={setRowData} originalData={originalRows} />
                    <DataTableSelect selected={selected} setSelected={setSelected} onDeleteMultiple={onDeleteMultiple} />

                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size='medium'
                        >
                            <DataTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {renderRows(idField, visibleRows, emptyRows, isSelected, handleClick)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={!rows.length || rows.length <= 0 ? 0 : page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Số hàng mỗi trang:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
                    />
                </Paper>
            </Box>
        </>
    );
}