// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/nav/Navbar';
import ListCustomers from './components/customers/ListCustomers';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TopHeader from './components/TopHeader';
import CustomerIcon from './assets/customers-icon.png';
import FallbackLoading from './components/loader/FallbackLoading';
import { Suspense } from 'react';

function App() {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedNavItem, setSelectedNavItem] = React.useState('Customers');

  const drawerWidth = 240;
  const headerHeight = 96;
  const navItems = [{ itm: 'Customers', icon: CustomerIcon }]
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Router>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <TopHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isClosing={isClosing} drawerWidth={drawerWidth} selectedNavItem={selectedNavItem} headerHeight={headerHeight} />
          <SideNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} setIsClosing={setIsClosing} drawerWidth={drawerWidth} navItems={navItems} selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, pt: 12, width: { sm: `calc(100% - ${drawerWidth}px)` }, background: '#F3F3F3' }}
          >
            <Routes>
              <Route exact path="/" element={<ListCustomers />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Suspense>
  );
}

export default App;
