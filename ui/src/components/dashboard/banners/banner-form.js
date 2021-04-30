import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  makeStyles,
  Modal,
  Card,
  CardHeader,
  CardContent,
  Grid,
  CardActions,
  Divider,
  Typography,
} from "@material-ui/core";
import TextInput from "../../common/input";
import Select from "../../common/select";
import { getCategoryOptions } from "../../common/select/options";

const typeOptions = [
  { label: "Select", value: "Select type of link" },
  { label: "Category", value: "category" },
  { label: "Location", value: "location" },
];
export default function BannerForm({ banner, open, setOpen, onSubmit }) {
  const classes = useStyles();

  const categories = useSelector((state) => state.product.categories);
  const locations = useSelector((state) => state.product.locations);

  const [type, setType] = useState(
    banner?.category ? "category" : banner?.location ? "location" : ""
  );
  const initialForm = {
    title: "",
    category: "",
    location: "",
    cover: "",
  };
  const [formData, setFormData] = useState(
    banner
      ? {
          title: banner.title || "",
          category: banner.category || "",
          location: banner.location || "",
        }
      : initialForm
  );

  const handleSubmit = async () => {
    let fData = new FormData();

    for (let key of Object.keys(formData)) {
      fData.set(key, formData[key]);
    }
    onSubmit(fData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      setFormData(initialForm);
    };
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={classes.modal}>
        <Card className={classes.card}>
          <CardHeader title="Create banner" />
          <CardContent>
            <Grid container spacing={1}>
              <TextInput
                name="title"
                label="Title (optional)"
                value={formData.title}
                handleChange={handleChange}
                margin="dense"
              />
              <Grid item xs={12}>
                <Select
                  disableSearch
                  name="type"
                  value={type}
                  placeholder="Select type of link"
                  options={typeOptions}
                  handleChange={(e) => setType(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {type === "category" ? (
                  <Select
                    name="category"
                    placeholder="Select category "
                    options={getCategoryOptions(categories)}
                    value={formData.category}
                    handleChange={handleChange}
                  />
                ) : (
                  type === "location" && (
                    <Select
                      name="category"
                      placeholder="Select location "
                      options={getCategoryOptions(locations)}
                      value={formData.location}
                      handleChange={handleChange}
                    />
                  )
                )}
              </Grid>
              <Grid item xs={12}>
                <Button size="small" variant="outlined" component="label">
                  Choose image
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      setFormData({ ...formData, cover: e.target.files[0] })
                    }
                  />
                </Button>
                <Typography>{formData.cover?.name}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              variant="text"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Create banner
            </Button>
          </CardActions>
        </Card>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},

  button: {
    margin: theme.spacing(0, 1),
  },

  modal: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
  },

  card: {
    overflow: "visible",
  },
}));
