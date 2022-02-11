import { User } from "../../entities/User";
import argon2 from "argon2";
import Router from "express";
import { Request, Response } from "express";
import { LoginInput } from "../../util/LoginInput";

const login = Router();

login.post("/", async (req: Request, res: Response) => {
    const data: LoginInput = req.body;
    const user = await User.findOne({ where: { username: data.username } });

    if (!user) {
        res.send({
            errors: [{ field: "username", message: "username does not exist" }],
        });
    } else {
        const valid = await argon2.verify(user.password, data.password);
        if (!valid) {
            res.send({
                errors: [{ field: "password", message: "incorrect password" }],
            });
        } else {
            req.session!.userId = user.id;
            res.send({ username: user.username });
        }
    }
});

export default login;
