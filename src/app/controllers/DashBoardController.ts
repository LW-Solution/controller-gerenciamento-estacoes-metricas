import { Request, Response, Router } from "express";
import { getDahsBoardData } from "../repositories/DashBoardRepository";

const dashBoardRouter = Router();

dashBoardRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try {
        const dashBoardData = await getDahsBoardData(idStringToIdNumber);
        return res.status(200).json(dashBoardData);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter dados do dashboard", error: error.message });
    }
});
    
export default dashBoardRouter;