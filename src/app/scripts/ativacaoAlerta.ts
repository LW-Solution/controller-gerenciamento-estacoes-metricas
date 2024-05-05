import StationParameter from "../entities/StationParameter"
import Measure from "../entities/Measure"
import { AppDataSource } from "../../database/data-source"
import Alert from "../entities/Alert"
import Occurrence from "../entities/Occurrence"

export async function ativacaoAlert(measure: Measure): Promise<void> {
  const stationParameterRepository =
    AppDataSource.getRepository(StationParameter)
  const value = measure.value

  const station_parameter_id = measure.station_parameter.station_parameter_id

  const stationParameterTable = await stationParameterRepository.findOne({
    where: { station_parameter_id: station_parameter_id },
    relations: ["parameter_type", "station"],
  })

  if (stationParameterTable) {
    const parameterTypeIdParameterType =
      stationParameterTable.parameter_type.id_parameter_type

    const stationIdStation = stationParameterTable.station.id_station

    const alertRepository = AppDataSource.getRepository(Alert)

    const alerts = await alertRepository
      .createQueryBuilder("alert")
      .where("alert.stationIdStation = :stationIdStation", { stationIdStation })
      .andWhere(
        "alert.parameterTypeIdParameterType = :parameterTypeIdParameterType",
        { parameterTypeIdParameterType }
      )
      .getMany()

    alerts.forEach((alert) => {
      let operator

      switch (alert.condition) {
        case "Igual a":
          operator = "=="
          break
        case "Maior que":
          operator = ">"
          break
        case "Maior ou Igual a":
          operator = ">="
          break
        case "Menor que":
          operator = "<"
          break
        case "Menor ou Igual a":
          operator = "<="
          break
        default:
          console.log(`Condition not recognized: ${alert.condition}`)
          break
      }

      let alertMessage
      switch (operator) {
        case "==":
          if (value == alert.value) {
            alertMessage = "Alerta de Medida =="
          }
          break
        case ">":
          if (value > alert.value) {
            alertMessage = "Alerta de Tornado"
          }
          break
        case ">=":
          if (value >= alert.value) {
            alertMessage = "ALERTA DE MEDIDA >="
          }
          break
        case "<":
          if (value < alert.value) {
            alertMessage = "ALERTA DE MEDIDA <"
          }
          break
        case "<=":
          if (value <= alert.value) {
            alertMessage = "ALERTA DE MEDIDA <="
          }
          break
      }

      if (alertMessage) {
        console.log(alertMessage,'chegou linha 90')
        console.log(alert?.id_alert,'alert')
        console.log(measure?.id_measure,'measure')
        const occurrenceRepository = AppDataSource.getRepository(Occurrence)
        // Cria uma nova instância de Occurrence
        const occurrence = new Occurrence()

        // Define os valores
        occurrence.alert = alert;
        occurrence.measure = measure// Supondo que measure.id_measure esteja disponível
        occurrence.status_alert = 1
        console.log(occurrence)
        // Obtém o repositório e salva a ocorrência
        
        occurrenceRepository.save(occurrence)
      }
    })
  }
}
