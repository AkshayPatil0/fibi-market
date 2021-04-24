import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Button, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import { useDispatch, useSelector } from "react-redux";
import Table from "../../common/table";
import ViewQuiz from "./view-quiz";
import { testQuiz } from "./sample";
import UpdateQuiz from "./update-quiz";
import { getQuizes } from "../../../store/actions/quizes";

const Quiz = () => {
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
    // later testQuiz will become quizes from redux
    testQuiz.forEach((quiz) => {
      let row = {};

      row.title = (
        <Box alignItems="center" display="flex">
          <Typography>{quiz.title}</Typography>
        </Box>
      );

      row.createdAt = <Typography>{quiz.createdAt}</Typography>;
      row.size = <Typography>{quiz.questions.length}</Typography>;
      row.status = (
        <Chip
          label={quiz.status ? "Published" : "Draft"}
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
          >
            {quiz.status ? "Mark as Draft" : "Publish"}
          </Button>
        </>
      );

      newRows.push(row);
    });
    console.log({ newRows, quizes });
    setRows(newRows);
  }, [quizes]);

  useEffect(() => {
    const run = async () => {
      await dispatch(getQuizes({}));
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

export default Quiz;
