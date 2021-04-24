import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Button, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import PublishIcon from "@material-ui/icons/Publish";
import DraftsIcon from "@material-ui/icons/Drafts";
import { connect, useDispatch, useSelector } from "react-redux";
import Table from "../../common/table";
import ViewQuiz from "./view-quiz";
import UpdateQuiz from "./update-quiz";
import { updateQuizStatus, getQuizes } from "../../../store/actions/quizes";
import moment from "moment";

const Quiz = (props) => {
  const quizes = useSelector((state) => state.quiz.quizes);
  const [rows, setRows] = useState([]);

  const options = [
    { head: "Quiz Title", key: "title" },
    { head: "Posted On", key: "createdAt" },
    { head: "Number of Questions", key: "size" },
    { head: "Publish Status", key: "status" },
    { head: "Actions", key: "actions" },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    let newRows = [];
    quizes.forEach((quiz) => {
      let row = {};

      row.title = (
        <Box alignItems="center" display="flex">
          <Typography>{quiz.title}</Typography>
        </Box>
      );

      row.createdAt = (
        <Typography>
          {moment(quiz.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      );
      row.size = <Typography>{quiz.questions.length}</Typography>;
      row.status = (
        <Chip
          label={quiz.status ? "Published" : "Drafted"}
          color={quiz.status ? "secondary" : "default"}
          onDelete
          deleteIcon={quiz.status ? <DoneIcon /> : <CancelIcon />}
        />
      );
      row.actions = (
        <>
          <ViewQuiz data={quiz} />

          <UpdateQuiz data={quiz} />

          <Button
            size="small"
            style={{ marginRight: "10px" }}
            color="primary"
            variant="contained"
            onClick={() => draftOrPublishQuiz(quiz.id, quiz.status)}
          >
            {quiz.status ? <DraftsIcon /> : <PublishIcon />}
          </Button>
        </>
      );

      newRows.push(row);
    });
    console.log({ newRows, quizes });
    setRows(newRows);
  }, [quizes]);

  const draftOrPublishQuiz = async (id, status) => {
    await dispatch(updateQuizStatus(id, { status: !status }));
    await dispatch(getQuizes({ userId: props.currentUserId }));
  };
  useEffect(() => {
    const run = async () => {
      await dispatch(getQuizes({ userId: props.currentUserId }));
    };
    run();
  }, [dispatch]);

  return (
    <Container maxWidth={false}>
      {/* <UserFilter /> */}
      <Box mt={3}>
        <Table options={options} rows={rows} />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentUserId: state.auth.currentUser.id,
});

export default connect(mapStateToProps)(Quiz);
