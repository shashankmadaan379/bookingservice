const express = require("express");
const app = express();

const PORT = 3000;
const setUpAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

setUpAndStartServer();
