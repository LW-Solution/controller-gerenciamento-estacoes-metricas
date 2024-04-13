// StationParameterController.ts
import { Request, Response, Router } from "express";
import {
  createStationParameter,
  deleteStationParameter,
  getStationParameterById,
  getStationParameters,
  updateStationParameter,
} from "../repositories/StationParameterRepository";
import IStationParameter from "../interfaces/IStationParameter";

const stationParameterRouter = Router();

stationParameterRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const stationParameters = await getStationParameters();
      return res.status(200).json(stationParameters);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter parâmetros de estação", error: error.message });
    }
  });

stationParameterRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let idStringToIdNumber = parseInt(id);

  try {
    const stationParameter = await getStationParameterById(idStringToIdNumber);
    if (!stationParameter) {
      return res.status(404).json({ message: "Parâmetro de estação não encontrado" });
    }
    return res.status(200).json(stationParameter);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao obter parâmetro de estação por ID", error: error.message });
  }
});


stationParameterRouter.post("/", async (req: Request, res: Response) => {
    const { parameterTypeIdParameterType, stationIdStation } = req.body;
  
    const newStationParameter: IStationParameter = {
      station_parameter_id: 0, // Pode ser 0 se for gerado automaticamente pelo banco de dados
      parameter_type_id: {
        id_parameter_type: parameterTypeIdParameterType?.id_parameter_type
      },
      station_id: {
        id_station: stationIdStation?.id_station
      }
    };
  
    try {
      const createdStationParameter = await createStationParameter(newStationParameter);
      return res.status(200).json(createdStationParameter);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar parâmetro de estação", error: error.message });
    }
  });
  

  stationParameterRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { parameter_type_id, station_id } = req.body;
  
    try {
      const result = await updateStationParameter(parseInt(id, 10), parameter_type_id, station_id);
      if (!result) {
        return res.status(404).json({ message: "Parâmetro de estação não encontrado para atualização" });
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar parâmetro de estação", error: error.message });
    }
  });
  
  
  

stationParameterRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await deleteStationParameter(parseInt(id, 10));
    if (!deleted) {
      return res.status(404).json({ message: "Parâmetro de estação não encontrado para exclusão" });
    }
    return res.status(200).json({ message: "Parâmetro de estação excluído com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao excluir parâmetro de estação", error: error.message });
  }
});

export default stationParameterRouter;
