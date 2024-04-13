import { Request, Response, Router } from "express";
import { createMeasure, deleteMeasure, getMeasureById, getMeasures, updateMeasure } from "../repositories/MeasureRepository";
import IMeasure from "../interfaces/IMeasure";


const measureRouter = Router();

measureRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const measures = await getMeasures();
      return res.status(200).json(measures);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter medidas", error: error.message });
    }
  });

  measureRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let idStringToIdNumber = parseInt(id);
  
    try {
      const measure = await getMeasureById(idStringToIdNumber);
      if (!measure) {
        return res.status(404).json({ message: "Medida não encontrada" });
      }
      return res.status(200).json(measure);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter medida por ID", error: error.message });
    }
  });

measureRouter.post("/", async (req: Request, res: Response) => {
    const { value, unixtime, station_parameter_id } = req.body;
  
    const newMeasure: IMeasure = {
      value,
      unixtime,
      station_parameter_id: {
        station_parameter_id: station_parameter_id?.station_parameter_id
      }
    };
  
    try {
      const createdMeasure = await createMeasure(newMeasure);
      return res.status(200).json(createdMeasure);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar medida", error: error.message });
    }
  });

  measureRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value, unixtime, station_parameter_id } = req.body;
  
    try {
      const result = await updateMeasure(parseInt(id, 10), value, unixtime, station_parameter_id);
      if (!result) {
        return res.status(404).json({ message: "Medida não encontrada para atualização" });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar medida", error: error.message });
    }
  });

measureRouter.delete("/:id", async (req: Request, res: Response) => {
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