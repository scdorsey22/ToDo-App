import { Component } from "react";
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Box } from "@mui/material";
import { Divider, ListItem, ListItemIcon, ListItemText, Avatar, CircularProgress } from "@mui/material";
import { ExitToApp, Notes, AccountBox } from '@mui/icons-material'
import { createTheme, ThemeProvider } from "@mui/material";
import { authMiddleWare } from "../util/auth";
import { withRouter } from "../util/withRouter";
import Todo from "../components/Todo";
import Account from "../components/Account";

import axios from "axios";

const theme = createTheme()
const drawerWidth = 240;

class Home extends Component {

    state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadTodoPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.navigate('/login');
	};

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			profilePicture: '',
			uiLoading: true,
			imageLoading: false
		};
	}

    componentWillMount = () => {
		authMiddleWare(this.props.navigate);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				console.log(response.data);
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					username: response.data.userCredentials.username,
					uiLoading: false,
					profilePicture: response.data.userCredentials.imageUrl
				});
			})
			.catch((error) => {
				if(error.response.status === 403) {
					this.props.navigate('/login')
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

    render () {
        if (this.state.uiLoading === true) {
			return (
				<div display="flex">
					{this.state.uiLoading && <CircularProgress size={150} sx={{
                        position: 'fixed',
                        zIndex: '1000',
                        height: '31px',
                        width: '31px',
                        left: '50%',
                        top: '35%'
                    }} />}
				</div>
			);
		} else {
        return (
           
            <Box sx={{display: "flex"}}>
            <CssBaseline />
            <AppBar position="fixed" 
            sx={{
		    zIndex: theme.zIndex.drawer + 1
	        }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        TodoApp
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    position: 'relative',
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    }

                }}
                variant="permanent"
            >
                <div />
                <Divider />
                <center>
                    <Avatar src={this.state.profilePicture} sx={{
                        height: 110,
                        width: 100,
                        flexShrink: 0,
                        flexGrow: 0,
                        marginTop: 20
                    }} />
                    <p>
                        {' '}
                        {this.state.firstName} {this.state.lastName}
                    </p>
                </center>
                <Divider />
                <List>
                    <ListItem button key="Todo" onClick={this.loadTodoPage}>
                        <ListItemIcon>
                            {' '}
                            <Notes />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItem>

                    <ListItem button key="Account" onClick={this.loadAccountPage}>
                        <ListItemIcon>
                            {' '}
                            <AccountBox />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>

                    <ListItem button key="Logout" onClick={this.logoutHandler}>
                        <ListItemIcon>
                            {' '}
                            <ExitToApp />{' '}
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>

            <div>{this.state.render ? <Account /> : <Todo />}</div>
        </Box>
        )
        }
    }
}

export default withRouter(Home)