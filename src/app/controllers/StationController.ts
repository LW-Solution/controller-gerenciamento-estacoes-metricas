import { Request, Response, Router } from "express";
import { createStation } from "../repositories/StationRepository";


const stationRouter = Router();

stationRouter.post("/create", async (req: Request, res: Response) => {
    const newStation = {...req.body}

    try{
        const creatingStation = await createStation(newStation);
        return res.status(200).json(creatingStation);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da estacao" })
    }
})

export default stationRouter;
