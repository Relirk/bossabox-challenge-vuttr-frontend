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
    checked: false
  };

  async componentDidMount() {
    const response = await api.get("/tools");
    this.setState({ feed: response.data });
  }

  handleCheck = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  // handleLike = id => {
  //     api.tool(`/tools/${id}/like`);
  // };

  render() {
    const { classes } = this.props;

    return (
      <section id="tool-list">
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
                variant="extended"
                aria-label="Delete"
                Style="color: #fff;"
              >
                <Add className="add-icon" />
                Add
              </Button>
            </Toolbar>
          </AppBar>
        </div>

        <List className="root">
          {this.state.feed.map((tool, index) => (
            <>
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={
                    <div className="header">
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          alert("I'm a button.");
                        }}
                      >
                        <Typography className="title">{tool.title}</Typography>
                      </Link>
                      <Button variant="extended" aria-label="Delete">
                        <Clear className="clear-icon" />
                        remove
                      </Button>
                    </div>
                  }
                  secondary={
                    <div className="description">
                      <Typography component="p">
                        {tool.description}
                        <div>
                          {tool.tags.map((tool, index) => (
                            <Typography component="span" color="textPrimary">
                              #{tool}
                            </Typography>
                          ))}
                        </div>
                      </Typography>
                    </div>
                  }
                />
              </ListItem>
              <Divider />
            </>
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
