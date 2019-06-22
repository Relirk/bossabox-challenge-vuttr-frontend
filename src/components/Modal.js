import React from "react";
import { Typography, Modal, TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import "./Modal.css";

function SimpleModal(props) {
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.close}
      >
        <div className="paper">
          <div className="modal-title">
            <Add className="add-icon" />
            <Typography variant="h6" id="modal-title">
              Add new tool
            </Typography>
          </div>

          <TextField
            id="outlined-full-width"
            label="Tool Name"
            className="text-field"
            placeholder="Enter the name of the tool"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.change("name")}
          />

          <TextField
            id="outlined-full-width"
            label="Tool Link"
            className="text-field"
            placeholder="Enter tool link"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.change("link")}
          />

          <TextField
            id="outlined-multiline-static"
            label="Tool Description"
            className="text-field"
            placeholder="Describe the tool in a nutshell"
            fullWidth
            multiline
            rows="4"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.change("description")}
          />

          <TextField
            id="outlined-full-width"
            label="Tags"
            className="text-field"
            placeholder="Enter your tags"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            onChange={props.change("tags")}
          />

          <Button
            variant="contained"
            color="primary"
            className="add-button"
            onClick={props.add}
          >
            Add tool
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default SimpleModal;
