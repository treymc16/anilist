import Router from "express";

const logout = Router();

logout.get("/", (req, res) => {
    req.session?.destroy(() => {
        res.clearCookie("qid");
        res.send({});
    });
});

export default logout;
