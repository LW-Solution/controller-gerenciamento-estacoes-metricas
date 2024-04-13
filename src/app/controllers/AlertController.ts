import { Request, Response, Router } from "express";
import { createAlert, deleteAlert, getAlert, getAlertById, updateAlert } from "../repositories/AlertRepository";


const alertRouter = Router();

alertRouter.get("/getAll", async(req: Request, res: Response) => {
    try{
        const alertList = await getAlert();
        return res.status(200).json(alertList);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel buscar os alertas"})
    }
})

alertRouter.get("/getOne/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingAlert = await getAlertById(idStringToIdNumber);
        return res.status(200).json(findingAlert);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar o alerta solicitado" })   
    }
})

alertRouter.post("/create", async (req: Request, res: Response) => {
    const newAlert = {...req.body}

    try{
        const creatingAlert = await createAlert(newAlert);
        return res.status(200).json(creatingAlert);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse alerta" })
    }
})

alertRouter.put("/update", async (req: Request, res: Response) => {
    
    const newAlert = {...req.body}

    try{
        const updatingAlert = await updateAlert(newAlert);
        return res.status(200).json(updatingAlert);
    }catch(error){
        return res.status(404).json({ message: "não foi possível atualizar o alerta"})
    }
})

alertRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingAlert = await deleteAlert(idStringToIdNumber);
        res.status(200).json(deletingAlert)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar o alerta"})
    }
})

export default alertRouter;