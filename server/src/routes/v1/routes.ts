import Router from "express";
import login from "./login";
import me from "./me";
import register from "./register";
import logout from "./logout";
import show from "./show";
import user from "./user";
import search from "./search";

const v1routes = Router();

v1routes.use("/login", login);
v1routes.use("/register", register);
v1routes.use("/me", me);
v1routes.use("/logout", logout);
v1routes.use("/show", show);
v1routes.use("/user", user);
v1routes.use("/search", search);

export default v1routes;
