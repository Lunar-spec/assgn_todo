import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar className="appBar" style={{ backgroundColor: '#232323', height: '60px', position: 'sticky', top: 0 }}>
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                    Todo Website
                </Typography>
                <Typography component={Link} to="/form" style={{ textDecoration: 'none', color: 'white', margin: '1rem' }}>
                    Add Task
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
