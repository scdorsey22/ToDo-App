import React, { useState, useEffect } from "react";
import { Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Box } from "@mui/material";
import { Divider, ListItem, ListItemIcon, ListItemText, Avatar, CircularProgress } from "@mui/material";
import { ExitToApp, Notes, AccountBox } from '@mui/icons-material'
import { createTheme } from "@mui/material";

import { authMiddleWare } from "../util/auth";
import { withRouter } from "../util/withRouter";

import Todo from "../components/Todo";
import Account from "../components/Account";

import axios from "axios";

const theme = createTheme();
const drawerWidth = 240;

const Home = ({ navigate }) => {
    
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [uiLoading, setUiLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    authMiddleWare(navigate);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/user")
      .then((response) => {
        console.log(response.data);
        setFirstName(response.data.userCredentials.firstName);
        setLastName(response.data.userCredentials.lastName);
        setEmail(response.data.userCredentials.email);
        setPhoneNumber(response.data.userCredentials.phoneNumber);
        setCountry(response.data.userCredentials.country);
        setUsername(response.data.userCredentials.username);
        setUiLoading(false);
        setProfilePicture(response.data.userCredentials.imageUrl);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
        console.log(error);
        setErrorMsg("Error in retrieving the data");
      });
  }, [navigate]);

  if (uiLoading) {
    return (
      <div display="flex">
        {uiLoading && (
          <CircularProgress
            size={150}
            sx={{
              position: "fixed",
              zIndex: "1000",
              height: "31px",
              width: "31px",
              left: "50%",
              top: "35%",
            }}
          />
        )}
      </div>
    );
  } else {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
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
                    <Avatar src={profilePicture} sx={{
                        height: 160,
                        width: 150,
                        flexShrink: 0,
                        flexGrow: 10,
                        marginTop: 15
                    }} />
                    <p>
                        {' '}
                        {firstName} {lastName}
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








