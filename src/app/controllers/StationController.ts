import { Request, Response, Router } from "express";
import IStation from "../interfaces/IStation";
import { createStation, deleteStation, getStation, getStationById, updateStation, getParametersByStationId} from "../repositories/StationRepository";


const stationRouter = Router();

stationRouter.get("/", async(req: Request, res: Response) => {
    try{
        const stationList = await getStation();
        return res.status(200).json(stationList);
    }catch(error){
        return res.status(404).json({ message: "Não foi possível buscar os dados das estações" })
    }
})

stationRouter.get("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);
    
    try{
        const findingStation = await getStationById(idStringToIdNumber);
        return res.status(200).json(findingStation);
    }catch(error){
        return res.status(404).json({ message: "Não foi possível buscar a estação solicitada" })   
    }
})

stationRouter.get("/parameters/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let numberId = parseInt(id);

    try{ 
        const listParameters = await getParametersByStationId(numberId);
        console.log("chegou aqui")
        return res.status(200).json(listParameters);
    }catch(error){
       console.log(error)
       return res.status(404).json({message: "Houve um problema com a solicitação"})
    }
})

stationRouter.post("/", async (req: Request, res: Response) => {
    const newStation = {...req.body}

    try{
        const creatingStation = await createStation(newStation);
        return res.status(200).json(creatingStation);
    }catch(error){
        return res.status(404).json({ message: "nao foi possivel criar essa estacao" })
    }
})

stationRouter.put("/:id_station", async (req: Request, res: Response) => {
        const { id_station } = req.params;
        const { station_description, location: {id_location} } = req.body;
    
        try {
            const updatingStation = await updateStation(parseInt(id_station, 10), station_description, id_location);
            return res.status(200).json(updatingStation);
        } catch (error) {
            return res.status(404).json({ message: "não foi possível atualizar a estação" });
        }
});

stationRouter.delete("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    let idStringToIdNumber = parseInt(id);

    try{
        const deletingStation = await deleteStation(idStringToIdNumber);
        res.status(200).json(deletingStation)
    }catch(error){
        return res.status(404).json({ message: "não foi possível deletar a estação"})
    }
})

export default stationRouter;
