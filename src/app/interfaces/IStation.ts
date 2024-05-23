import ILocation from './ILocation';

interface IStation {
    id_station: number;
    station_description: string;
    station_mac_address: string;
    location?: ILocation;
}

export default IStation;
