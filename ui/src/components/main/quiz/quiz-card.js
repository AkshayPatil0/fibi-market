import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { connect, useDispatch } from "react-redux";
import { setSnackbar } from "../../../store/actions/app";

const useStyles = makeStyles({
  root: {},
  media: {
    height: 140,
  },
});

function QuizCard({ quiz, currentUser }) {
  const classes = useStyles();
  const router = useHistory();
  const dispatch = useDispatch();
  const verifyQuizAvailability = () => {
    if (currentUser.quizes.find((q) => q.id === quiz.id)) {
      dispatch(
        setSnackbar("Sorry you have already submitted this quiz !", "warning")
      );
    } else {
      router.push(`/quiz/${quiz.id}`, { quiz: quiz, user: currentUser });
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`https://picsum.photos/id/${Math.floor(
            Math.random() * 1000
          )}/800/1200`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {quiz.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={verifyQuizAvailability}
          fullWidth
          size="small"
          color="secondary"
        >
          {" "}
          Take a Quiz
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(QuizCard);
