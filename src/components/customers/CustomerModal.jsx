import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CustomerModal = (props) => {
  const { open, handleClose, data, handleSubmit } = props;
  const [fileName, setFileName] = React.useState(null);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { borderRadius: 4, maxWidth: 400 } }}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleSubmit(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle sx={{
        background: 'linear-gradient(to right, #57BC90, #004B40)', // Optional gradient
        display: 'flex',
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'space-between', // Distribute content with top and bottom spacing
        alignItems: 'flex-end', // Align content to the right (for IconButton)
        width: '100%',
      }}>
        <IconButton edge="end" sx={{ padding: 0 }} color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
        <Typography variant="h5" sx={{ width: '100%', fontStyle: 'Recoleta, SemiBold', color: 'white', justifyContent: 'center', textAlign: 'center', paddingTop: 2 }}>
          {!data ? 'Add New Customer': 'Edit Customer'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ background: '#FBFCFC' }}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>  {/* Set spacing between grid items */}
          <Grid item xs={12}>
            <TextField
              id="username"
              name="username"
              label="Username"
              defaultValue={data?.username}
              type="text"
              variant='outlined'
              sx={{ background: 'white' }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="name"
              name="name"
              label="Customer Name"
              defaultValue={data?.name}
              type="text"
              variant='outlined'
              sx={{ background: 'white' }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              id="email"
              name="email"
              label="Email"
              defaultValue={data?.email}
              type="email"
              fullWidth
              variant="outlined"
              sx={{ background: 'white' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              sx={{ color: '#57BC90', textDecoration: 'underline', textTransform: 'none', '&:hover': { backgroundColor: '#FBFCFC' } }}
            // startIcon={<CloudUploadIcon />}
            >
              Upload Photo
              <VisuallyHiddenInput type="file" id="file" name="file" required={!data?.image} onChange={(e) => setFileName(e.target.files[0]?.name)}/>
            </Button>
            {fileName && <Typography variant="body2" sx={{ marginLeft: 1, color: '#57BC90', fontStyle: 'italic' }}>{fileName}</Typography>}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ background: '#FBFCFC' }}>
        <Button type="submit" sx={{ width: '100%', color: 'white', background: 'linear-gradient(to right, #57BC90, #004B40)', borderRadius: 2, margin: 2 }}>{ !data ? 'Add Customer': 'Edit Customer'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerModal