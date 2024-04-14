import ILocation from './ILocation';

interface IStation {
    id_station: number;
    station_description: string;
    location?: ILocation;
}

export default IStation;
