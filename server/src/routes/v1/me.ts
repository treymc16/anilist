import Router from "express";
import { User } from "../../entities/User";

const me = Router();

me.get("/", async (req, res) => {
    try {
        if (req.session!.userId) {
            const user = await User.findOne({
                where: { id: req.session!.userId },
            });
            if (user) {
                res.send({ user: { username: user.username } });
            } else {
                res.send();
            }
        } else {
            res.send();
        }
    } catch (err) {
        console.log(err);
    }
});

export default me;
