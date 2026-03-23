import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import * as React from "react";

const DialogCustom = (props) => {
  const { title, content, open, handleSubmit, handleClose } = props;

  const onClickSubmit = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickSubmit} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCustom;
