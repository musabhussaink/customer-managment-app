import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const TopHeader = (props) => {

  const { mobileOpen, setMobileOpen, isClosing, drawerWidth, selectedNavItem, headerHeight } = props;

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth - 20}px)` },
        height: headerHeight,
        ml: { sm: `${drawerWidth - 20}px` },
        background: 'white',
        color: 'black'
      }}
    >
      <Toolbar sx={{ height: headerHeight }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold'}} noWrap component="div">
          {selectedNavItem.toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TopHeader