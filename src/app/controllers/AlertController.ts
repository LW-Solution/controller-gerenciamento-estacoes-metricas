import { Request, Response, Router } from "express";
import { createAlert, deleteAlert, getAlert, getAlertById, updateAlert } from "../repositories/AlertRepository";
import IAlert from "../interfaces/IAlert";
import IParameterType from "../interfaces/IParameterType";
import IStation from "../interfaces/IStation";


const alertRouter = Router();

alertRouter.get("/", async(req: Request, res: Response) => {
    try{
        const alertList = await getAlert();
        return res.status(200).json(alertList);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel buscar os alertas"})
    }
})

alertRouter.get("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingAlert = await getAlertById(idStringToIdNumber);
        return res.status(200).json(findingAlert);
    }catch(error){
        return res.status(404).json({ message: "não foi possivel buscar o alerta solicitado" })   
    }
})

alertRouter.post("/", async (req: Request, res: Response) => {
    const { condition, station_id, parameter_type_id , description} = req.body;
  
    const newAlert: IAlert = {
      id_alert: 0, // Pode ser 0 se for gerado automaticamente pelo banco de dados
      description,
      condition,
      station_id: station_id,
      parameter_type_id: parameter_type_id
    };
  
    try {
      const createdAlert = await createAlert(newAlert);
      return res.status(200).json(createdAlert);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar alerta", error: error.message });
    }
  });

  alertRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { condition, stationIdStation, parameterTypeIdParameterType } = req.body;
  
    try {
      const result = await updateAlert(parseInt(id, 10), condition, stationIdStation, parameterTypeIdParameterType);
      
      if (!result) {
        return res.status(404).json({ message: "Alerta não encontrado para atualização" });
      }
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar alerta", error: error.message });
    }
  });

alertRouter.delete("/:id", async (req: Request, res: Response) => {
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