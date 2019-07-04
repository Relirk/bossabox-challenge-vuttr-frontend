import React, { Component } from "react";
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
import AlertDialog from "../components/AlertDialog";
import "./Feed.css";

class Feed extends Component {
  state = {
    feed: [],
    checked: false,
    open: false,
    openAlert: false,
    selectedTool: "",
    title: "",
    link: "",
    description: ""
  };

  async componentDidMount() {
    const response = await api.get("/tools");
    this.setState({ feed: response.data.reverse() });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleOpenAlert = tool => {
    localStorage.setItem("selectedTool", tool.id);
    localStorage.setItem("selectedToolName", tool.title);
    this.setState({ openAlert: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseAlert = () => {
    this.setState({ openAlert: false });
  };

  handleCheck = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleChangeModal = name => event => {
    if ([name][0] === "tags") {
      const tags = event.target.value.split(" ");
      if (tags[tags.length - 1] === "") {
        tags.pop();
      }
      this.setState({ tags });
    } else {
      this.setState({ ...this.state, [name]: event.target.value });
    }
  };

  handleChangeSearch = async event => {
    if (this.state.checked === true) {
      // Tag ativa
      const response = await api.get(`/tools?tags_like=${event.target.value}`);
      this.setState({ feed: response.data.reverse() });
    } else {
      // Tag inativa
      const response = await api.get(`/tools?q=${event.target.value}`);
      this.setState({ feed: response.data.reverse() });
    }
  };

  handleSubmitNewTool = async () => {
    const objToPost = {
      title: this.state.title,
      link: this.state.link,
      description: this.state.description,
      tags: this.state.tags
    };

    await api.post("/tools", objToPost);
    const getResponse = await api.get("/tools");

    this.setState({
      open: false,
      title: "",
      link: "",
      description: "",
      feed: getResponse.data.reverse()
    });
  };

  handleDeleteTool = async () => {
    const id = Number(localStorage.getItem("selectedTool"));
    await api.delete(`/tools/${id}`);
    const response = await api.get("/tools");
    this.setState({ feed: response.data.reverse(), openAlert: false });
  };

  render() {
    const appBar = (
      <div className="grow">
        <AppBar position="static">
          <Toolbar>
            <div className="search">
              <div className="search-icon">
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={this.handleChangeSearch}
                classes={{
                  root: "input-root",
                  input: "input-input"
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

            <div className="grow" />

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
    );

    const toolList = (
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
                    <Button
                      aria-label="Delete"
                      onClick={() => {
                        this.handleOpenAlert(tool);
                      }}
                    >
                      <Clear className="clear-icon" />
                      remove
                    </Button>
                  </span>
                }
                secondary={
                  <span className="description">
                    <Typography component="span">{tool.description}</Typography>
                    {tool.tags.map((tool, index) => (
                      <Typography
                        key={index}
                        component="span"
                        color="textPrimary"
                        className="tags"
                      >
                        #{tool}
                      </Typography>
                    ))}
                  </span>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );

    return (
      <section id="tool-list">
        <Modal
          open={this.state.open}
          close={this.handleClose}
          add={this.handleSubmitNewTool}
          change={this.handleChangeModal}
        />

        <AlertDialog
          open={this.state.openAlert}
          close={this.handleCloseAlert}
          delete={this.handleDeleteTool}
          tool={localStorage.getItem("selectedToolName")}
        />

        {appBar}
        {toolList}
      </section>
    );
  }
}

export default Feed;
