import { Request, Response, Router } from "express";
import { createUnit, deleteUnit, getUnit, getUnitById, updateUnit } from "../repositories/UnitRepository";


const unitRouter = Router();

unitRouter.get("/", async(req: Request, res: Response) => {
    try{
        const unitList = await getUnit();
        return res.status(200).json(unitList);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel buscar os dados de Unit"})
    }
})

unitRouter.get("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingUnit = await getUnitById(idStringToIdNumber);
        return res.status(200).json(findingUnit);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar a Unit solicitada" })   
    }
})

unitRouter.post("/", async (req: Request, res: Response) => {
    const newUnit = {...req.body}

    try{
        const creatingUnit = await createUnit(newUnit);
        return res.status(200).json(creatingUnit);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar essa Unit" })
    }
})

unitRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { unit } = req.body;
  
    try {
      const updatedUnit = await updateUnit(parseInt(id, 10), { unit });
  
      if (!updatedUnit) {
        return res.status(404).json({ message: 'Unit not found' });
      }
  
      return res.status(200).json(updatedUnit);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

unitRouter.delete("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingUnit = await deleteUnit(idStringToIdNumber);
        res.status(200).json(deletingUnit)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar a Unit"})
    }
})

export default unitRouter;