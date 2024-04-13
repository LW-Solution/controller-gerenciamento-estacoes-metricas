import { Request, Response, Router } from "express";
import { createParameterType } from "../repositories/ParameterTypeRepository";


const parameterTypeRouter = Router();

parameterTypeRouter.post("/create", async (req: Request, res: Response) => {
    const newParameterType = {...req.body}

    try{
        const creatingParameterType = await createParameterType(newParameterType);
        return res.status(200).json(creatingParameterType);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da estacao" })
    }
})


export default parameterTypeRouter;