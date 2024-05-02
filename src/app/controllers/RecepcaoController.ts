import { Request, Response, Router } from "express";
import saveData from "../repositories/RecepcaoRepository";

const recepcaoRouter = Router();

recepcaoRouter.post("/", async (req: Request, res: Response) => {
    const jsonArray = req.body;

    try {
        await saveData(jsonArray);
        return res.status(200).json({ message: "Dados salvos com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Não foi possível salvar os dados", error: error.message });
    }
});

export default recepcaoRouter;