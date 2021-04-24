import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, Paper, Typography } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

export default function ViewQuiz({ data }) {
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
        <VisibilityIcon />
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
            {data.questions.map((question, i) => (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h2" style={{ paddingBottom: "10px" }}>
                    {i + 1 + ". " + question.question}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        style={
                          question.answer === question.option1
                            ? { color: "green" }
                            : null
                        }
                        variant="h5"
                      >
                        a. {question.option1}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        style={
                          question.answer === question.option2
                            ? { color: "green" }
                            : null
                        }
                        variant="h5"
                      >
                        b. {question.option2}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        style={
                          question.answer === question.option3
                            ? { color: "green" }
                            : null
                        }
                        variant="h5"
                      >
                        c. {question.option3}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        style={
                          question.answer === question.option4
                            ? { color: "green" }
                            : null
                        }
                        variant="h5"
                      >
                        d. {question.option4}
                      </Typography>
                    </Grid>
                  </Grid>
                  <hr style={{ marginTop: "15px", borderColor: "gray" }} />
                </Grid>
              </Grid>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
