import express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const PORT = 3006;

app.get("/case", (req: any, res: any) => {
    res.send("xxx");
});

app.get("/case-summary", (req: any, res: any) => {
    res.send("xxx");
});

app.post("/case", (req: any, res: any) => {
    res.send("xxx");
});

app.put("/case", (req: any, res: any) => {
    res.send("xxx");
});

app.delete("/case", (req: any, res: any) => {
    res.send("xxx");
});

app.get("/countries", (req: any, res: any) => {
    res.send("xxx");
});

app.listen(PORT, () => {
    console.log("Running on port", PORT);
});