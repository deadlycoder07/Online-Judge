import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Grid,
  SwipeableDrawer,
  Button,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import Router from "next/router";


const styleSheet = {
  list: {
    width: 200,
  },
  padding: {
    paddingRight: 30,
    cursor: "pointer",
  },

  sideBarIcon: {
    padding: 0,
    color: "white",
    cursor: "pointer",
  },
  menuButton: {
    marginRight: "10px",
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
};

class Newappbar extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerActivate: false, drawer: false };
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth <= 600) {
      this.setState({ drawerActivate: true });
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 600) {
        this.setState({ drawerActivate: true });
      } else {
        this.setState({ drawerActivate: false });
      }
    });
  }

  //Small Screens
  createDrawer() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="Right"
            >
              <MenuIcon
                className={this.props.classes.sideBarIcon}
                onClick={() => {
                  this.setState({ drawer: true });
                }}
              />

              <Typography
                color="inherit"
                variant="headline"
                className={classes.title}
                alignItems="Right"
                style={{ textAlign: "Right" }}
              >
                Online Judge &nbsp;&nbsp;
                <img src="/oj.png" alt="." style={{ width: "30px", borderRadius: "5px" }} />
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
          open={this.state.drawer}
          onClose={() => {
            this.setState({ drawer: false });
          }}
          onOpen={() => {
            this.setState({ drawer: true });
          }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {
              this.setState({ drawer: false });
            }}
            onKeyDown={() => {
              this.setState({ drawer: false });
            }}
          >
            <List className={this.props.classes.list}>


              <ListItem key={3} button divider>
                <Button color="inherit" onClick={() => Router.push("/")}>
                  Contests
                </Button>
              </ListItem>
              {localStorage.onlinejudge_info ? (
                <ListItem key={5} button divider>
                  <Button
                    color="inherit"
                    onClick={() => {
                      fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/logout`,
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Token ${localStorage.token}`,
                          },
                        }
                      ).then(() => {
                        localStorage.clear();
                        Router.push("/");
                      });
                    }}
                  >
                    Logout
                  </Button>
                </ListItem>
              ) : (
                  <div></div>
                )}
              <ListItem key={4} button divider>
                {localStorage.onlinejudge_info ? (
                  <React.Fragment>
                    <Avatar
                      src={JSON.parse(localStorage.onlinejudge_info).image_link}
                    />
                    &nbsp;
                    {/* {
                      JSON.parse(localStorage.onlinejudge_info).email.split(
                        "@"
                      )[0]
                    } */}
                  </React.Fragment>
                ) : (
                    <Button color="inherit" onClick={() => Router.push("/login")}>
                      Login
                    </Button>
                  )}
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
      </div>
    );
  }

  //Larger Screens
  destroyDrawer() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => Router.push("/")}
          >
            <img src="/oj.png" alt="." style={{ width: "45px", borderRadius: "5px" }} />
            &nbsp;&nbsp;&nbsp;Online Judge
          </Typography>

          {/* <Button color="inherit" onClick={() => Router.push("/announcement")}>Announcement</Button> */}
          <Button color="inherit" onClick={() => Router.push("/")}>
            Contests
          </Button>
          {localStorage.onlinejudge_info ? (
            <Button
              color="inherit"
              onClick={() => {
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/account/logout`, {
                  method: "POST",
                  headers: {
                    Authorization: `Token ${localStorage.token}`,
                  },
                }).then(() => {
                  localStorage.clear();
                  Router.push("/");
                });
              }}
            >
              Logout
            </Button>
          ) : (
              <div></div>
            )}
          {localStorage.onlinejudge_info ? (
            <React.Fragment>
              <Avatar
                src={JSON.parse(localStorage.onlinejudge_info).image_link}
              />
              &nbsp;
              {/* {JSON.parse(localStorage.onlinejudge_info).email.split("@")[0]} */}
            </React.Fragment>
          ) : (
              <Button color="inherit" onClick={() => Router.push("/login")}>
                Login
              </Button>
            )}
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

Newappbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Newappbar);
