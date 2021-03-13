import express from "express";

const router = express();

router.get("/api/users/signout", (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRoute };
