import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function UpdateQuiz({ data }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        style={{ marginRight: "10px" }}
        color="primary"
        variant="contained"
        onClick={handleClickOpen("body")}
      >
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll={scroll}
        aria-labelledby="Quiz Title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="Quiz Title">{data.title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description">
            <form>
              {data.questions.map((question) => (
                <Grid container spacing={3} key={question.id}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label={"Question " + question.id}
                      variant="outlined"
                      focused
                      defaultValue={question.question}
                    />
                    <Grid container style={{ marginTop: "10px" }} spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="A."
                          variant="outlined"
                          defaultValue={question.option1}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="B."
                          variant="outlined"
                          defaultValue={question.option2}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="C."
                          variant="outlined"
                          defaultValue={question.option3}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="D."
                          variant="outlined"
                          defaultValue={question.option4}
                        />
                      </Grid>
                    </Grid>
                    <FormControl
                      style={{ marginTop: "20px" }}
                      variant="outlined"
                      fullWidth
                    >
                      <InputLabel>Answer</InputLabel>
                      <Select value={question.ans} label="Answer">
                        <MenuItem value={question.option1}>
                          {question.option1}
                        </MenuItem>
                        <MenuItem value={question.option2}>
                          {question.option2}
                        </MenuItem>
                        <MenuItem value={question.option3}>
                          {question.option3}
                        </MenuItem>
                        <MenuItem value={question.option4}>
                          {question.option4}
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <hr style={{ marginTop: "15px", borderColor: "gray" }} />
                  </Grid>
                </Grid>
              ))}
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
