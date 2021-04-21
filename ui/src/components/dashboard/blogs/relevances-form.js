import React, { useState } from "react";
import { Grid, Typography, makeStyles, Button, Box } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import RelevanceForm from "./relevance-form";
import { setBlog } from "../../../store/actions/blog";

export default function RelevancesForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [newRelevance, setNewRelevance] = useState();

  const blog = useSelector((state) => state.blog.blog);

  const initialRelevance = { type: "", id: "" };

  // const addRelevance = async () => {
  //   dispatch(
  //     setBlog({
  //       ...blog,
  //       relevances: [...blog.relevances, initialRelevance],
  //     })
  //   );
  // };

  // const removeRelevance = (index) => {
  //   dispatch(
  //     setBlog({
  //       ...blog,
  //       relevances: blog.relevances.filter((rel, i) => index !== i),
  //     })
  //   );
  // };

  const setRelevance = async (type, ids) => {
    dispatch(
      setBlog({
        ...blog,
        relevances: { ...blog.relevances, [type]: ids },
      })
    );
  };

  return (
    <>
      <Box p={1} />
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">
            <b>Relevances :</b>
          </Typography>

          {/* <Button variant="text" color="primary" onClick={addRelevance}>
            Add relevance
          </Button> */}
        </Box>
      </Grid>
      {/* {blog.relevances && blog.relevances.length > 0 ? (
        blog.relevances.map((rel, i) => (
          <RelevanceForm
            relevance={rel}
            setRelevance={(type, id) => setRelevance(i, type, id)}
            removeRelevance={() => removeRelevance(i)}
            key={i}
          />
        ))
      ) : (
        <Grid item xs={12}>
          <Box pl={2}>
            <Typography>No relevances defined !</Typography>
          </Box>
        </Grid>
      )} */}
      <RelevanceForm
        type="products"
        ids={blog?.relevances?.products || []}
        setIds={(ids) => setRelevance("products", ids)}
      />
      <RelevanceForm
        type="categories"
        ids={blog?.relevances?.categories || []}
        setIds={(ids) => setRelevance("categories", ids)}
      />
      <RelevanceForm
        type="locations"
        ids={blog?.relevances?.locations || []}
        setIds={(ids) => setRelevance("locations", ids)}
      />
      <Grid item></Grid>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  remove: {
    padding: 0,
    height: "100%",
  },
  variantCard: {
    position: "relative",
    overflow: "visible",
  },
}));
