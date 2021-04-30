import { Box, Card, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getBlog, setBlog } from "../../../store/actions/blog";
import BlogDetails from "../../common/blogDetails";
import Relevances from "./relevances";

import * as api from "../../../api";

export default function Blog() {
  const classes = useStyles();

  const { slug, eSlug } = useParams();
  const dispatch = useDispatch();
  const router = useHistory();

  const [topLinkItem, setTopLinkItem] = useState();

  const blog = useSelector((state) => state.blog.blog);

  useEffect(() => {
    if (slug) {
      dispatch(getBlog(slug));
    }
    return () => dispatch(setBlog(null));
  }, [dispatch, slug]);

  useEffect(() => {
    console.log({ eSlug });
    const run = async () => {
      const res = await api.fetchCategory(eSlug);
      setTopLinkItem(res.data);
    };
    if (eSlug) {
      run();
    }
    return () => dispatch(setBlog(null));
  }, [dispatch, eSlug]);

  const handleTopLink = () => {
    if (topLinkItem.isLocation) {
      router.push(`/locations/${topLinkItem.slug}`);
    } else {
      router.push(`/categories/${topLinkItem.slug}`);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.container}>
        {topLinkItem && (
          <Grid item xs={12}>
            <Card onClick={handleTopLink}>
              <Box className={classes.topLink}>
                <Typography variant="button">
                  <b>
                    Go to products from {topLinkItem.title} {">>"}
                  </b>
                </Typography>
              </Box>
            </Card>
          </Grid>
        )}
        <Grid item xs={12} sm={8}>
          <Card>
            <BlogDetails blog={blog} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.relevances}>
          <Relevances relevances={blog.relevances} />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 0),
  },
  card: {
    overflow: "visible",
  },
  topLink: {
    padding: theme.spacing(2),
    textAlign: "center",
    border: "4px solid grey",
    fontSize: "1.4rem",
    cursor: "pointer",
  },
}));
