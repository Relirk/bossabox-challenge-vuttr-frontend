import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, fade } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
  Link,
  AppBar,
  Toolbar,
  InputBase,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { Clear, Search, Add } from "@material-ui/icons";

import api from "../services/api";
import Modal from "../components/Modal";
import "./Feed.css";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    marginRight: 10,
    [theme.breakpoints.up("sm")]: {
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});
class Feed extends Component {
  state = {
    feed: [],
    checked: false,
    open: false,
    name: "",
    link: "",
    description: ""
  };

  async componentDidMount() {
    const response = await api.get("/tools");
    this.setState({ feed: response.data });
  }

  handleCheck = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    if ([name][0] === "tags") {
      console.log("e");
      const tags = event.target.value.split(" ");
      if (tags[tags.length - 1] === "") {
        tags.pop();
      }
      this.setState({ tags });
    } else {
      this.setState({ ...this.state, [name]: event.target.value });
    }
  };

  handleSubmitNewTool = () => {
    console.log(this.state);
    api
      .post("/tools", {
        title: this.state.title,
        link: this.state.link,
        description: this.state.description,
        tags: this.state.tags
      })
      .then(function(response) {
        console.log(response);
      });
    this.setState({
      open: false,
      name: "",
      link: "",
      description: ""
    });
  };

  // handleLike = id => {
  //     api.tool(`/tools/${id}/like`);
  // };

  render() {
    const { classes } = this.props;

    return (
      <section id="tool-list">
        <Modal
          open={this.state.open}
          close={this.handleClose}
          add={this.handleSubmitNewTool}
          change={this.handleChange}
        />

        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "Search" }}
                />
              </div>

              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checked}
                      onChange={this.handleCheck("checked")}
                      value="checked"
                      color="secondary"
                    />
                  }
                  label="search in tags only"
                />
              </FormGroup>

              <div className={classes.grow} />

              <Button
                aria-label="Add"
                onClick={this.handleOpen}
                className="add-button"
              >
                <Add className="add-icon" />
                Add
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <List className="root">
          {this.state.feed.map((tool, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <span className="header">
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          alert("I'm a button.");
                        }}
                      >
                        <Typography className="title">{tool.title}</Typography>
                      </Link>
                      <Button aria-label="Delete">
                        <Clear className="clear-icon" />
                        remove
                      </Button>
                    </span>
                  }
                  secondary={
                    <span className="description">
                      <Typography component="span">
                        {tool.description}
                      </Typography>
                      <span>
                        {tool.tags.map((tool, index) => (
                          <Typography
                            key={index}
                            component="span"
                            color="textPrimary"
                          >
                            #{tool}
                          </Typography>
                        ))}
                      </span>
                    </span>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </section>
    );
  }
}

Feed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Feed);
