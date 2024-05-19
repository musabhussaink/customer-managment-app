import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import CustomerModal from './CustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import { useDispatch, useSelector } from 'react-redux';
import { listCustomers, createCustomers, updateCustomers, deleteCustomers } from '../../actions/customerActions';
import CommonLoading from '../loader/CommonLoading';

const headCells = [
  {
    id: 'username',
    label: 'Username',
  },
  {
    id: 'name',
    label: 'Customer Name',
  },
  {
    id: 'email',
    label: 'Email',
  },
];

const ListCustomers = () => {
  const dispatch = useDispatch();
  const customerList = useSelector((state) => state.customer);
  const { customers, loading, error } = customerList;

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleSubmit = async (formJson) => {

    const formData = new FormData();
    formData.append('name', formJson?.name);
    formData.append('username', formJson?.username);
    formData.append('email', formJson?.email);
    formData.append('profilePicture', formJson?.file);

    if (data) {
      dispatch(updateCustomers(data?.id, formData));
      setData(null);
      return;
    }
    dispatch(createCustomers(formData));
  };

  const handleDeleteCustomer = async (customerId) => {
    dispatch(deleteCustomers(customerId));
    setOpenDelete(false);
    setData(null);
  }

  const handleDeleteOpen = (id) => {
    setOpenDelete(true);
    setData(id);
  };

  const handleClickOpen = (data) => {
    if (data) {
      setData(data);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
    setData(null);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false)
    setData(null);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  useEffect(() => {
    dispatch(listCustomers());
    // dispatch(listCustomers(1, 20, 'name', 'desc'));
  }, [dispatch]);

  const visibleRows = React.useMemo(
    () => {
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

      return stableSort(customers, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    },
    [customers, order, orderBy, page, rowsPerPage],
  );

  if (loading) return <CommonLoading />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />}
        sx={{
          width: '220px',
          height: '42px',
          marginTop: '32px',
          background: 'linear-gradient(to right, #57BC90, #004B40)',
          color: 'white', // Ensure the text color is visible
          '&:hover': {
            background: 'linear-gradient(to right, #57BC90, #004B40)', // Apply the same gradient on hover
            filter: 'brightness(1.1)', // Optionally, make it slightly brighter on hover
          },
        }}
        onClick={() => handleClickOpen()}
      >
        ADD NEW CUSTOMER
      </Button>
      {/* Add Customer */}
      <CustomerModal open={open} handleClose={handleClose} data={data} handleSubmit={handleSubmit} />
      <DeleteCustomerModal open={openDelete} handleClose={handleDeleteClose} id={data} handleDeleteCustomer={handleDeleteCustomer} />
      {visibleRows?.length > 0 && <>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', marginTop: 8 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ background: '#C5E3D5' }}>
                <TableCell sx={{ paddingTop: '8px', paddingBottom: '8px', borderBottom: 'none' }}></TableCell>
                {headCells?.map((headCell) => (
                  <TableCell key={headCell.id} sx={{ paddingTop: '8px', paddingBottom: '8px', borderBottom: 'none', color: '#015249', fontWeight: 'bold' }} align="left" sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
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
                <TableCell sx={{ paddingTop: '8px', paddingBottom: '8px', borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ paddingTop: '8px', paddingBottom: '8px', borderBottom: 'none' }}></TableCell>
              </TableRow>
              <TableRow sx={{ background: '#F3F3F3' }}>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                <TableCell sx={{ borderBottom: 'none' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows?.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }} align="left" component="th" scope="row">
                      {row?.image && <img src={row?.image} alt="Customer" style={{ width: '72px', height: '72px' }} />}
                    </TableCell>
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }} align="left">{row.username}</TableCell>
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px', color: '#57BC90', textDecoration: 'underline' }} align="left">{row.name}</TableCell>
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }} align="left">{row.email}</TableCell>
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }} align="right"><Button variant="contained" sx={{
                      background: '#B0E1B7', color: '#58B264', boxShadow: 'none', textTransform: 'none', padding: '4px 32px', fontWeight: 'bold', '&:hover': {  // Add hover styles here
                        backgroundColor: '#87d39f', // Change background color on hover
                        cursor: 'pointer', // Indicate interactivity
                      },
                    }} onClick={() => handleClickOpen(row)}>Edit</Button></TableCell>
                    <TableCell sx={{ borderBottom: 'none', paddingTop: '8px', paddingBottom: '8px' }} align="right"><Button variant="contained" sx={{
                      background: '#EE9999', color: '#DE2C2B', boxShadow: 'none', textTransform: 'none', padding: '4px 32px', fontWeight: 'bold', '&:hover': {  // Add hover styles here
                        backgroundColor: '#c0392b', // Change background color on hover
                        cursor: 'pointer', // Indicate interactivity
                      },
                    }} onClick={() => handleDeleteOpen(row?.id)}>Delete</Button></TableCell>
                  </TableRow>
                  <TableRow sx={{ background: '#F3F3F3' }}>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}></TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={visibleRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>}
    </>
  )
}

export default ListCustomers