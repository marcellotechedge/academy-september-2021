"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;
app.get("/case", (req, res) => {
    res.send({
        message: "hello World"
    });
});
app.listen(PORT, () => {
    console.log("Running on port", PORT);
});
//# sourceMappingURL=app.js.map