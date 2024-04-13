import { Request, Response, Router } from "express";
import { createUnit, deleteUnit, getUnit, getUnitById, updateUnit } from "../repositories/UnitRepository";


const unitRouter = Router();

unitRouter.get("/getAll", async(req: Request, res: Response) => {
    try{
        const unitList = await getUnit();
        return res.status(200).json(unitList);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel buscar os dados das estacoes"})
    }
})

unitRouter.get("/getOne/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingUnit = await getUnitById(idStringToIdNumber);
        return res.status(200).json(findingUnit);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar a medida solicitada" })   
    }
})

unitRouter.post("/create", async (req: Request, res: Response) => {
    const newUnit = {...req.body}

    try{
        const creatingUnit = await createUnit(newUnit);
        return res.status(200).json(creatingUnit);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar essa medida" })
    }
})

unitRouter.put("/update", async (req: Request, res: Response) => {
    
    const newUnit = {...req.body}

    try{
        const updatingUnit = await updateUnit(newUnit);
        return res.status(200).json(updatingUnit);
    }catch(error){
        return res.status(404).json({ message: "não foi possível atualizar a medida"})
    }
})

unitRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingUnit = await deleteUnit(idStringToIdNumber);
        res.status(200).json(deletingUnit)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar a medida"})
    }
})

export default unitRouter;