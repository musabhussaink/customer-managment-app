import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../assets/logo.png';


export default function ResponsiveDrawer(props) {

  const { mobileOpen, setMobileOpen, setIsClosing, drawerWidth, navItems, selectedNavItem, setSelectedNavItem } = props;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 48, // Adjust as needed
            width: 180, // Adjust as needed
          }}
          alt="Logo"
          src={Logo}
        />
      </Toolbar>
      <List sx={{ color: 'background.paper', mt: 8, ml: 2, mr: 2 }}>
        {navItems?.map((navItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={navItem?.itm === selectedNavItem ? {
              boxShadow: '0px 5px 25px #00000040', backgroundColor: '#043933', borderRadius: '10px', "&.Mui-selected": {
                backgroundColor: "#043933"
              },
              "&.Mui-focusVisible": {
                backgroundColor: "#043933"
              },
              ":hover": {
                backgroundColor: "#043933"
              }
            } : { borderRadius: '10px' }}
              selected={navItem?.itm === selectedNavItem ? 1 : 0} onClick={() => setSelectedNavItem(navItem?.itm)}>
              <ListItemIcon>
                <img src={navItem?.icon} width={24} height={24} alt="Custom Icon" />
              </ListItemIcon>
              <ListItemText primary={navItem?.itm.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#015249', borderRadius: '0px 20px 20px 0px', paddingTop: 2 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#015249', borderRadius: '0px 20px 20px 0px', paddingTop: 2 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
