const express = require("express");
const path = require("path");
const logger = require("./Middleware/logger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
app.use(express.static(path.join(__dirname, "public")));

/*Members Api Routes*/
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
