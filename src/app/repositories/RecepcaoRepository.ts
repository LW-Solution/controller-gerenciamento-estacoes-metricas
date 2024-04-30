import { AppDataSource } from "../../database/data-source";
import Measure from "../entities/Measure";
import Station from "../entities/Station";
import StationParameter from "../entities/StationParameter";
import ParameterType from "../entities/ParameterType";

async function saveData(jsonArray: any[]): Promise<void> {
    const measureRepository = AppDataSource.getTreeRepository(Measure);
    const stationRepository = AppDataSource.getTreeRepository(Station);
    const stationParameterRepository = AppDataSource.getTreeRepository(StationParameter);
    const parameterTypeRepository = AppDataSource.getTreeRepository(ParameterType);

    for (const json of jsonArray) {
        const station = await stationRepository.findOne({ where: { station_description: json.station_description } });

        if (!station) {
            throw new Error(`Station with description ${json.station_description} not found`);
        }

        for (const param of Object.entries(json.parametros[0])) {
            const parameterType = await parameterTypeRepository.findOne({ where: { parameter_name: param[0] } });

            if (!parameterType) {
                throw new Error(`ParameterType with name ${param[0]} not found`);
            }

            const stationParameter = await stationParameterRepository.findOne({ where: { parameter_type: parameterType, station: station } });

            if (!stationParameter) {
                throw new Error(`StationParameter for ParameterType ${param[0]} not found for station ${json.station_description}`);
            }

            const measure = new Measure();

            if (typeof param[1] === 'number') {
                measure.value = param[1];
            } else {
                throw new Error(`Expected a number for measure value, but got ${typeof param[1]}`);
            }

            if (typeof json.unix === 'number') {
                measure.unixtime = json.unix;
            } else {
                throw new Error(`Expected a number for unix time, but got ${typeof json.unix}`);
            }

            measure.station_parameter = stationParameter;
            await measureRepository.save(measure);
        }
    }
}

export default saveData;