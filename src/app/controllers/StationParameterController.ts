import { Request, Response, Router } from "express";
import { createStationParameter, deleteStationParameter, getStationParameter, getStationParameterById, updateStationParameter } from "../repositories/StationParameterRepository";


const StationParameterRouter = Router();

StationParameterRouter.get("/getAll", async (req: Request, res: Response) => {
    try{
        const stationParameter = await getStationParameter();
        return res.status(200).json(stationParameter);
    }catch(error){
        return res.status(404).json({ message: "parametros da estacao nao encontrados" })
    }
})

StationParameterRouter.get("/getOne/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingStationParemeter = await getStationParameterById(idStringToIdNumber);
        return res.status(200).json(findingStationParemeter);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar o parametro da estacao solicitado" })   
    }
})

StationParameterRouter.post("/create", async (req: Request, res: Response) => {
    const newStationParameter = {...req.body}

    try{
        const creatingStationParameter = await createStationParameter(newStationParameter);
        return res.status(200).json(creatingStationParameter);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da estacao" })
    }
})

StationParameterRouter.put("/update", async (req: Request, res: Response) => {
    
    const newStationParameter = {...req.body}

    try{
        const updatingStationParameter = await updateStationParameter(newStationParameter);
        return res.status(200).json(updatingStationParameter);
    }catch(error){
        return res.status(404).json({ message: "não foi possível atualizar o paramentro da estação"})
    }
})

StationParameterRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingStationParameter = await deleteStationParameter(idStringToIdNumber);
        res.status(200).json(deletingStationParameter)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar o paramentro da estação"})
    }
})

export default StationParameterRouter;