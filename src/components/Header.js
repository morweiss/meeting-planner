import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => {
    return (
        <AppBar position="static" >
          <Toolbar style ={{backgroundColor : "black"}}>
            <Typography variant="h4" style={{color: 'white'}}> Meeting Planer </Typography>
          </Toolbar>
        </AppBar>
        
    );
};

export default Header;