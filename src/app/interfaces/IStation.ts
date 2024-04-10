import Ilocation from "./ILocation";
interface IStation {
    id_station: number,
    station_description:string,
    location_id?:Ilocation
}

export default IStation;