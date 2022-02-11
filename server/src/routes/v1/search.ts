import Router, {Request, Response} from "express";
import {Show} from"../../entities/Show"
import {Like} from "typeorm";

const search = Router();

search.get("/", async (req: Request, res: Response) => {
	const q = req.query.q;
	const result = await Show.find({title: Like(`%${q}%`)})
	res.send(result);
});

export default search;