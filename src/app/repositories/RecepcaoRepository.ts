import { AppDataSource } from "../../database/data-source"
import Measure from "../entities/Measure"
import Station from "../entities/Station"
import StationParameter from "../entities/StationParameter"
import ParameterType from "../entities/ParameterType"
import { ativacaoAlert } from "../scripts/ativacaoAlerta"

async function saveData(jsonObject: any): Promise<void> {
  const stationRepository = AppDataSource.getTreeRepository(Station)
  const parameterTypeRepository = AppDataSource.getTreeRepository(ParameterType)
  const stationParameterRepository =
    AppDataSource.getTreeRepository(StationParameter)
  const measureRepository = AppDataSource.getTreeRepository(Measure)

  const { uuid, unix, parametros } =
    jsonObject

  const station = await stationRepository.findOne({
    where: { station_mac_address: uuid },
  })
  console.log(jsonObject)
  console.log(station)

  if (!station) {
    throw new Error(`Station with description ${uuid} not found`)
  }

  if (
    station.station_mac_address === null ||
    station.station_mac_address !== uuid
  ) {
    if (station.station_mac_address === null) {
      station.station_mac_address = uuid
      await stationRepository.save(station)
    } else if (station.station_mac_address !== uuid) {
      throw new Error(
        `station_mac_address for station ${uuid} does not match the provided station_mac_address`
      )
    }
  }

  for (const [paramName, paramValue] of Object.entries(parametros)) {
    const parameterType = await parameterTypeRepository.findOne({
      where: { parameter_name: paramName },
    })

    if (!parameterType) {
      throw new Error(`ParameterType with name ${paramName} not found`)
    }

    const stationParameter = await stationParameterRepository.findOne({
      where: { parameter_type: parameterType, station: station },
    })

    if (!stationParameter) {
      throw new Error(
        `StationParameter for ParameterType ${paramName} not found for station ${uuid}`
      )
    }

    const measure = new Measure()

    if (typeof paramValue === "number") {
      measure.value = paramValue
    } else {
      throw new Error(
        `Expected a number for measure value, but got ${typeof paramValue}`
      )
    }

    if (typeof unix === "number") {
      measure.unixtime = unix
    } else {
      throw new Error(`Expected a number for unix time, but got ${typeof unix}`)
    }

    measure.station_parameter = stationParameter

    console.log(measure)
    await measureRepository.save(measure).then(() => ativacaoAlert(measure))
  }
}

export default saveData
