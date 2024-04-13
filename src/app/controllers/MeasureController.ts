import { Request, Response, Router } from "express";
import { createMeasure, deleteMeasure, getMeasure, getMeasureById, updateMeasure } from "../repositories/MeasureRepository";


const measureRouter = Router();

measureRouter.get("/getAll", async(req: Request, res: Response) => {
    try{
        const measureList = await getMeasure();
        return res.status(200).json(measureList);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel buscar os dados das estacoes"})
    }
})

measureRouter.get("/getOne/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingMeasure = await getMeasureById(idStringToIdNumber);
        return res.status(200).json(findingMeasure);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar a medida solicitada" })   
    }
})

measureRouter.post("/create", async (req: Request, res: Response) => {
    const newMeasure = {...req.body}

    try{
        const creatingMeasure = await createMeasure(newMeasure);
        return res.status(200).json(creatingMeasure);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar essa medida" })
    }
})

measureRouter.put("/update", async (req: Request, res: Response) => {
    
    const newMeasure = {...req.body}

    try{
        const updatingMeasure = await updateMeasure(newMeasure);
        return res.status(200).json(updatingMeasure);
    }catch(error){
        return res.status(404).json({ message: "não foi possível atualizar a medida"})
    }
})

measureRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingMeasure = await deleteMeasure(idStringToIdNumber);
        res.status(200).json(deletingMeasure)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar a medida"})
    }
})

export default measureRouter;