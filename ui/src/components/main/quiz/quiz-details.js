import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setSnackbar } from "../../../store/actions/app";
import { submitQuiz } from "../../../store/actions/user";
import { getProfile } from "../../../store/actions/auth";

function QuizDetails(props) {
  const classes = useStyles();
  const { quiz, user } = props.location.state;
  const [result, setResult] = useState([]);
  const router = useHistory();
  const dispatch = useDispatch();

  function handleChange(e, answer, queNo) {
    if (result.find((q) => q.sr === queNo)) {
      const index = result.findIndex((q) => q.sr === queNo);
      let copy = [...result];
      copy[index] = { ...copy[index], ans: e.target.value === answer };
      setResult(copy);
    } else {
      setResult([...result, { sr: queNo, ans: e.target.value === answer }]);
    }
  }

  const handleSubmitQuiz = async () => {
    const body = {
      userId: user.id,
      quizId: quiz.id,
      points: result.filter((q) => q.ans).length,
    };
    dispatch(submitQuiz(body));
    await dispatch(getProfile());

    router.push("/profile");
    dispatch(
      setSnackbar("You have successfully submitted the quiz", "success")
    );
  };
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" onClick={() => router.push("/")}>
          Home
        </Link>
        <Link color="inherit" onClick={() => router.push("/quiz")}>
          Quizes
        </Link>
        <Typography color="primary">{quiz.title}</Typography>
      </Breadcrumbs>

      <Typography className={classes.title} variant="h2">
        {quiz.title}
      </Typography>
      <Grid container spacing={2}>
        {quiz.questions.map((question, i) => (
          <Grid key={i} container item md={12} xs={12} spacing={1}>
            <Card style={{ width: "100%" }} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.question}
                  variant="h5"
                  component="h2"
                >
                  {question.question}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) => handleChange(e, question.answer, i + 1)}
                    aria-label="quiz"
                    name="quiz"
                  >
                    <FormControlLabel
                      value="A"
                      control={<Radio />}
                      label={question.option1}
                    />
                    <FormControlLabel
                      value="B"
                      control={<Radio />}
                      label={question.option2}
                    />
                    <FormControlLabel
                      value="C"
                      control={<Radio />}
                      label={question.option3}
                    />
                    <FormControlLabel
                      value="D"
                      control={<Radio />}
                      label={question.option4}
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Button
          className={classes.submitButton}
          variant="contained"
          color="secondary"
          onClick={handleSubmitQuiz}
        >
          Submit
        </Button>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    paddingTop: 30,
  },
  title: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  question: {
    paddingBottom: 20,
  },
  options: {
    padding: 10,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 30,
  },
});

export default QuizDetails;
