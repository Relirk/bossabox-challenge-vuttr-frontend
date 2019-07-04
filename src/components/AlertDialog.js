import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="modal-title">
            <Clear className="add-icon" />
            <Typography variant="h6" id="modal-title">
              Remove tool
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are sure you want to remove this tool?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={props.delete} color="primary" autoFocus>
            Yes, remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
