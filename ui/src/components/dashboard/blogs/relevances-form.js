import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import RelevanceForm from "./relevance-form";
import { setBlog } from "../../../store/actions/blog";

export default function RelevancesForm() {
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blog.blog);

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
        </Box>
      </Grid>
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
