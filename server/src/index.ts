import { createConnection } from "typeorm";
import express from "express";
import session from "express-session";
import redis from "redis";
import connectRedis from "connect-redis";
import path from "path";
import { UserShow } from "./entities/UserShow";
import { Show } from "./entities/Show";
import { User } from "./entities/User";
import v1routes from "./routes/v1/routes";
import cors from "cors";

const main = async () => {
    await createConnection({
        type: "postgres",
        url: "postgres://postgres:postgres@localhost/anilist2",
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Show, UserShow],
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient(6379);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    app.use(
        session({
            name: "qid",
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                httpOnly: true,
                sameSite: "lax",
            },
            saveUninitialized: false,
            secret: "weeb",
            resave: false,
        })
    );
    app.use(express.json());
    app.use(express.urlencoded());

    app.use("/v1", v1routes);

    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};

main().catch((err) => {
    console.log(err);
});
