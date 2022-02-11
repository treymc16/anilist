import Router, { Request, Response } from "express";
import { ShowAddInput } from "../../util/ShowAddInput";
import { Show } from "../../entities/Show";
import { User } from "../../entities/User";
import { UserShow } from "../../entities/UserShow";
import { getConnection } from "typeorm";

const show = Router();

show.get("/all", async (_: Request, res: Response) => {
    try {
        const shows = await Show.find();
        res.send(shows);
    } catch (err) {
        res.send({ errors: { field: "show", message: "could not get data" } });
    }
});

show.get("/:id", async (req: Request, res: Response) => {
    try {
        const showId = parseInt(req.params.id);
        const show = await Show.findOneOrFail({ where: { id: showId } });
        if (req.session!.userId) {
            const userId = parseInt(req.session!.userId);
            const result = await getConnection()
                .createQueryBuilder()
                .select("user_show")
                .from(UserShow, "user_show")
                .where("user_show.showId = :showId", { showId })
                .andWhere("user_show.userId = :userId", { userId })
                .getOne();

            if (result) {
                res.send({
                    inList: true,
                    show: show,
                    userShowInfo: {
                        rating: result.rating,
                        watched: result.watched,
                    },
                });
            } else {
                res.send({ inList: false, show: show });
            }
        } else {
            res.send({ inList: false, show: show });
        }
    } catch (err) {
        res.sendStatus(404);
    }
});

show.post("/:id/add", async (req: Request, res: Response) => {
    if (req.session!.userId) {
        const userId = parseInt(req.session!.userId);
        const showId = parseInt(req.params.id);
        const userShowInfo: ShowAddInput = req.body;
        const show = await Show.findOne({ where: { id: showId } });
        const user = await User.findOne({ where: { id: userId } });
        console.log("GOT HERE");
        if (show) {
            try {
                const userShow = new UserShow();
                userShow.show = show;
                userShow.user = <User>user;
                userShow.rating = userShowInfo.rating;
                userShow.watched = userShowInfo.watched;

                show.times_added += 1;
                if (userShowInfo.rating > 0) {
                    show.times_rated += 1;
                    show.total_score += userShowInfo.rating;
                    show.avg_score =
                        Math.round(
                            (show.total_score / show.times_rated) * 100
                        ) / 100;
                }

                await getConnection().manager.save(userShow);
                await getConnection().manager.save(show);
                res.sendStatus(201);
            } catch (err) {
                res.send({
                    errors: [
                        {
                            field: "show",
                            message: "show could not be added to user list",
                        },
                    ],
                });
            }
        }
    } else {
        res.send({
            errors: [
                {
                    field: "user",
                    message: "user is not logged in",
                },
            ],
        });
    }
});

export default show;
