import { Request, Response, Router } from "express";
import { createParameterType, deleteParameterType, getParameterTypeById, getParameterTypes, updateParameterType } from "../repositories/ParameterTypeRepository";


const parameterTypeRouter = Router();

parameterTypeRouter.post("/", async (req: Request, res: Response) => {
    const newParameterType = {...req.body}

    try{
        const creatingParameterType = await createParameterType(newParameterType);
        return res.status(200).json(creatingParameterType);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar esse parametro da Tipo Parametro" })
    }
})

parameterTypeRouter.get("/", async (_req: Request, res: Response) => {
    try {
      const parameterTypes = await getParameterTypes();
      return res.status(200).json(parameterTypes);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter tipos de parâmetro", error: error.message });
    }
  });

parameterTypeRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try {
      const parameterType = await getParameterTypeById(idStringToIdNumber);
      return res.status(200).json(parameterType);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao obter parâmetro do Tipo Parâmetro por ID", error: error.message });
    }
  });

  parameterTypeRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { unitIdUnit, factor, description, parameter_name, offset } = req.body;
  
    try {
      const updatedParameterType = await updateParameterType(parseInt(id, 10), unitIdUnit, factor, offset, description, parameter_name);
      if (!updatedParameterType) {
        return res.status(404).json({ message: "Parâmetro do Tipo Parâmetro não encontrado para atualização" });
      }
      return res.status(200).json(updatedParameterType);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar parâmetro do Tipo Parâmetro", error: error.message });
    }
  });

  parameterTypeRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedParameterType = await deleteParameterType(parseInt(id, 10));
        if (!deletedParameterType) {
            return res.status(404).json({ message: "Parâmetro do Tipo Parâmetro não encontrado para exclusão" });
        }
        return res.status(200).json({ message: "Parâmetro do Tipo Parâmetro excluído com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao excluir parâmetro do Tipo Parâmetro", error: error.message });
    }
});





export default parameterTypeRouter;