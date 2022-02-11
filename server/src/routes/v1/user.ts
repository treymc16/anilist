import Router, { Request, Response } from "express";
import { User } from "../../entities/User";
import { getConnection } from "typeorm";

const user = Router();

user.get("/:username", async (req: Request, res: Response) => {
    const user = await User.findOne({
        where: { username: req.params.username },
    });
    if (user) {
        res.send({ user: { username: user.username } });
    } else {
        res.sendStatus(404);
    }
});

user.get("/:username/list", async (req: Request, res: Response) => {
    try {
        const userName = req.params.username;
        const user = await User.findOneOrFail({
            where: { username: userName },
        });
        const userList = await getConnection().manager.query(
            `select id, rating, watched, title, num_eps, url_title from user_show natural join show where user_show."userId" = ${user?.id} and user_show."showId" = show.id`
        );
        if (userList) {
            res.send(userList);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(404);
    }
});

export default user;
