import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import { getCategories, getLocations } from "../../store/actions/product";
import Categories from "./categories/categories";

const HomePage = () => {
  const classes = useStyles();
  const categories = useSelector((state) => state.product.categories);
  const locations = useSelector((state) => state.product.locations);
  console.log({ categories });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant="button">Explore categories</Typography>
          </Box>
          <Categories categories={categories} />
        </Grid>
        <Grid item xs={12}>
          <Box p={2}>
            <Typography variant="button">Explore states</Typography>
          </Box>
          <Categories categories={locations} />
        </Grid>
        {/* offer */}
        <Grid item xs={12}>
          {/* <Paper className={fixedHeightPaper}></Paper> */}
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.fixedHeight1}>
            <Typography variant="h6" align="center">
              WE AND YOU FOR LOVING LOCAL
            </Typography>
          </Paper>
        </Grid>
        {/* fillters */}
        {/* <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image1}
              className={classes.small}
            />
            Andhrapradesh
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image2}
              className={classes.small}
            />
            Arunachal Pradesh
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image3}
              className={classes.small}
            />
            Assam
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image4}
              className={classes.small}
            />
            Bihar
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image5}
              className={classes.small}
            />
            Chhattisgarh
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image6}
              className={classes.small}
            />
            Goa
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image7}
              className={classes.small}
            />
            Gujarat
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image8}
              className={classes.small}
            />
            Haryana
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image9}
              className={classes.small}
            />
            Himachal Pradesh
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image10}
              className={classes.small}
            />
            Jharkhand
          </Button>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Button>
            <Avatar
              style={{ alignSelf: "center" }}
              alt="Remy Sharp"
              src={Image11}
              className={classes.small}
            />
            Karnataka
          </Button>
        </Grid> */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  // },
  // toolbarIcon: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   padding: '0 8px',
  //   ...theme.mixins.toolbar,
  // },
  // appBar: {
  //   background: 'linear-gradient(to right,  orange 20%,white 60%,green 100%)',
  //   zIndex: theme.zIndex.drawer + 1,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  // appBarShift: {
  //   marginLeft: drawerWidth,
  //   // width: `calc(100% - ${drawerWidth}px)`,
  //   transition: theme.transitions.create(['width', 'margin'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  // title: {
  //   flexGrow: 1,
  // },
  // drawerPaper: {
  //   position: 'relative',
  //   whiteSpace: 'nowrap',
  //   width: drawerWidth,
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  // drawerPaperClose: {
  //   overflowX: 'hidden',
  //   transition: theme.transitions.create('width', {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(9),
  //   },
  // },
  // appBarSpacer: theme.mixins.toolbar,
  // content: {
  //   flexGrow: 1,
  //   height: '100vh',
  //   overflow: 'auto',
  // },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 120,
  },
  fixedHeight: {
    height: 340,
  },
  fixedHeight1: {
    height: 40,
  },
  small: {
    width: "50%",
    height: "50%",
  },
}));

export default HomePage;
