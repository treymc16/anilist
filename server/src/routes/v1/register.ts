import { RegisterInput } from "../../util/RegisterInput";
import { validateRegister } from "../..//util/validateRegister";
import Router from "express";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import argon2 from "argon2";

const register = Router();

register.post("/", async (req: Request, res: Response) => {
    const data: RegisterInput = req.body;
    console.log(data);
    const errors = validateRegister(data);
    if (errors) {
        res.send({ errors: errors });
    } else {
        const hashedPassword = await argon2.hash(data.password);
        let user;

        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: data.username,
                    password: hashedPassword,
                    email: data.email,
                })
                .returning("*")
                .execute();

            user = result.raw[0];
        } catch (err) {
            if (err.code === "23505") {
                res.send({
                    errors: [
                        {
                            field: "username",
                            message: "username or email already exists",
                        },
                    ],
                });
            }
        }
        req.session!.userId = user.id;
        res.send({ username: user.username });
    }
});

export default register;
