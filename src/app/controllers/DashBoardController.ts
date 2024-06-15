import { Request, Response, Router } from "express";
import { getDahsBoardData, getDahsBoardDataUnixTime, getDahsBoardDataBeTweenDates, getDahsBoardDataBeTweenMonth, getDashBoardDataGroupbyHour } from "../repositories/DashBoardRepository";

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

dashBoardRouter.get("/bydate/:initialDate/:finalDate/:id", async (req: Request, res: Response) => {
    const { id, initialDate, finalDate } = req.params;
    let idStringToIdNumber = parseInt(id);
    const initialDateObj = new Date(initialDate);
    const finalDateObj = new Date(finalDate);
    initialDateObj.setHours(0, 0, 0, 0);
    const initialDateUnixtime = initialDateObj.getTime() / 1000;
    finalDateObj.setHours(23, 59, 59, 999);
    const finalDateUnixtime = finalDateObj.getTime() / 1000;
    try {
        const dashBoardData = await getDahsBoardDataBeTweenDates(idStringToIdNumber, initialDateUnixtime, finalDateUnixtime)
        return res.status(200).json(dashBoardData);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter dados do dashboard", error: error.message });
    }
});

dashBoardRouter.get("/bydate/grouphour/:initialDate/:finalDate/:id", async (req: Request, res: Response) => {
    const { id, initialDate, finalDate } = req.params;
    let idStringToIdNumber = parseInt(id);
    const initialDateObj = new Date(initialDate);
    const finalDateObj = new Date(finalDate);
    initialDateObj.setHours(0, 0, 0, 0);
    const initialDateUnixtime = initialDateObj.getTime() / 1000;
    finalDateObj.setHours(23, 59, 59, 999);
    const finalDateUnixtime = finalDateObj.getTime() / 1000;
    try {
        const dashBoardData = await getDashBoardDataGroupbyHour(idStringToIdNumber, initialDateUnixtime, finalDateUnixtime)
        return res.status(200).json(dashBoardData);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter dados do dashboard", error: error.message });
    }
});


dashBoardRouter.get("/bymonth/:initialDate/:finalDate/:id", async (req: Request, res: Response) => {
    const { id, initialDate, finalDate } = req.params;
    let idStringToIdNumber = parseInt(id);
    const initialDateObj = new Date(initialDate);
    const finalDateObj = new Date(finalDate);
    initialDateObj.setHours(0, 0, 0, 0);
    const initialDateUnixtime = initialDateObj.getTime() / 1000;
    finalDateObj.setHours(23, 59, 59, 999);
    const finalDateUnixtime = finalDateObj.getTime() / 1000;
    try {
        const dashBoardData = await getDahsBoardDataBeTweenMonth(idStringToIdNumber, initialDateUnixtime, finalDateUnixtime)
        return res.status(200).json(dashBoardData);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter dados do dashboard", error: error.message });
    }
});

dashBoardRouter.get("/unixtime/:unixtime/:id_station", async (req: Request, res: Response) => {
    const { unixtime, id_station } = req.params;
    let unixtimeStringToUnixtimeNumber = parseInt(unixtime);
    let idStringToIdNumber = parseInt(id_station);

    try {
        const dashBoardData = await getDahsBoardDataUnixTime(unixtimeStringToUnixtimeNumber, idStringToIdNumber);
        return res.status(200).json(dashBoardData);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao obter dados do dashboard por unixtime", error: error.message });
    }
});

export default dashBoardRouter;