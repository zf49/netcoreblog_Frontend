import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router';


export default function ButtonAppBar() {

  let navigate = useNavigate();


  const goLoginPage = ()=>{
    console.log('aaa')
    navigate('/login')
  }


  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem('token')){
        setIsLogin(true)
    }
  }, [isLogin])
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!isLogin?<Button color="inherit" onClick={()=>{
            goLoginPage();
          }}>Login</Button>:<Button color="inherit" onClick={()=>{
            localStorage.clear();
            setIsLogin(false)
          }}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
