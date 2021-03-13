import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  select: {
    fontFamily: theme.typography.fontFamily,
  },
  button: {
    margin: theme.spacing(0, 1),
  },
}));
