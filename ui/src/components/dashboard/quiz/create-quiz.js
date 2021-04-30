import React, { useState } from "react";
import {
  Button,
  CardContent,
  makeStyles,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContentText,
  MenuItem,
  TextField,
  DialogContent,
  FormControl,
  Select,
  InputLabel,
  DialogActions,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Table from "../../common/table";
import { addQuiz, getQuizes } from "../../../store/actions/quizes";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../store/actions/app";

const CreateQuiz = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [questions, setQuestions] = React.useState([]);
  const [question, setQuestion] = React.useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [quiz, setQuiz] = React.useState({
    title: "",
    publishedBy: user,
    status: 1,
    questions: [],
  });
  const dispatch = useDispatch();

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    setQuestions([...questions, question]);
    setQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    });
  };

  const publishQuiz = async () => {
    quiz.questions = questions.map((question) => question);
    await dispatch(addQuiz(quiz));
    setQuiz({});
    setQuestions([]);
    setOpen(false);
    dispatch(setSnackbar("Quiz published successfully !", "success"));
    await dispatch(getQuizes({ userId: user }));
  };

  const options = [
    { head: "Question", key: "question" },
    { head: "A", key: "option1" },
    { head: "B", key: "option2" },
    { head: "C", key: "option3" },
    { head: "D", key: "option4" },
    { head: "Answer", key: "answer" },
  ];
  const classes = useStyles();

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Button
          onClick={handleClickOpen("body")}
          variant="contained"
          color="primary"
        >
          Add New Quiz
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          scroll={scroll}
          aria-labelledby="Quiz Title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="Quiz Title">Publish Quiz</DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="scroll-dialog-description">
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    fullWidth
                    label="Quiz Title"
                    autoComplete="off"
                    variant="outlined"
                    name="title"
                    value={quiz.title}
                    onChange={handleQuizChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      onChange={handleQuizChange}
                      value={quiz.status}
                      name="status"
                      label="Answer"
                    >
                      <MenuItem value={1}>Publish</MenuItem>
                      <MenuItem value={0}>Draft</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={handleChange}
                    name="question"
                    fullWidth
                    value={question.question}
                    label="Question"
                    variant="outlined"
                  />
                  <Grid container style={{ marginTop: "10px" }} spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="A."
                        name="option1"
                        onChange={handleChange}
                        value={question.option1}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="B."
                        name="option2"
                        onChange={handleChange}
                        value={question.option2}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="C."
                        name="option3"
                        onChange={handleChange}
                        value={question.option3}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="D."
                        name="option4"
                        onChange={handleChange}
                        value={question.option4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Answer</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="answer"
                          row
                          onChange={handleChange}
                          value={question.answer}
                        >
                          <FormControlLabel
                            value="A"
                            control={<Radio />}
                            label={
                              question.option1 === ""
                                ? "A"
                                : "A. " + question.option1
                            }
                          />
                          <FormControlLabel
                            value="B"
                            control={<Radio />}
                            label={
                              question.option2 === ""
                                ? "B"
                                : "B. " + question.option2
                            }
                          />
                          <FormControlLabel
                            value="C"
                            control={<Radio />}
                            label={
                              question.option3 === ""
                                ? "C"
                                : "C. " + question.option3
                            }
                          />
                          <FormControlLabel
                            value="D"
                            control={<Radio />}
                            label={
                              question.option4 === ""
                                ? "D"
                                : "D. " + question.option4
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="outlined"
                    onClick={addQuestion}
                    color="secondary"
                  >
                    Add Question
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Table options={options} rows={questions}></Table>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button onClick={publishQuiz} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
    padding: theme.spacing(1, 0, 0, 0),
    margin: theme.spacing(1, 0),
  },
}));

export default CreateQuiz;
