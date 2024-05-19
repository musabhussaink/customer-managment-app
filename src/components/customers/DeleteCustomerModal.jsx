import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteCustomerModal = (props) => {
  const { open, handleClose, id, handleDeleteCustomer } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { borderRadius: 4, maxWidth: 380 } }}
    >
      <DialogTitle sx={{
        background: '#FBFCFC', 
        display: 'flex',
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'space-between', // Distribute content with top and bottom spacing
        alignItems: 'flex-end', // Align content to the right (for IconButton)
        width: '100%',
      }}>
        <IconButton edge="end" sx={{ padding: 0 }} color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon sx={{ color: 'black' }} />
        </IconButton>
          <DeleteIcon sx={{ color: '#D80000', width: 84, height: 84, alignSelf: 'center' }}/>
        <Typography variant="h5" sx={{ width: '100%', fontStyle: 'Recoleta, SemiBold', color: 'black', justifyContent: 'center', textAlign: 'center', paddingTop: 2 }}>
          Are you sure?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ background: '#FBFCFC' }}>
        <DialogContentText sx={{ fontStyle: 'Recoleta, SemiBold', color: 'black', justifyContent: 'center', textAlign: 'center', paddingTop: 2 }}>
          Do you really want to delete this customer?
          This process cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ background: '#FBFCFC' }}>
        <Button onClick={() => handleClose()} sx={{ width: '50%', color: 'white', background: '#A5A5AF', borderRadius: 2, margin: 2 }}>Cancel</Button>
        <Button onClick={() => handleDeleteCustomer(id)} sx={{ width: '50%', color: 'white', background: '#D80000', borderRadius: 2, margin: 2 }}>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteCustomerModal