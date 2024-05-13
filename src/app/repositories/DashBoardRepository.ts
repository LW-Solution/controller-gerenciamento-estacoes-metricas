import { JsonObject } from "swagger-ui-express";
import { AppDataSource } from "../../database/data-source";
import StationParameter from "../entities/StationParameter";
import IStationParameter from "../interfaces/IStationParameter";
import Station from "../entities/Station";
import IStation from "../interfaces/IStation";
import ParameterType from "../entities/ParameterType";
import { Between, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { privateEncrypt } from "crypto";


const stationParameter = AppDataSource.getRepository(StationParameter);
const dashBoardRepository = AppDataSource.getRepository(Station);
const parameterTypeRepository = AppDataSource.getRepository(ParameterType);

const getDahsBoardData = async (id: number): Promise<JsonObject> => {
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id
      },
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id },
  });

  // Extrai os IDs dos tipos de parâmetros
  const parameterTypeIds = dashBoardList.map(item => item.parameter_type.id_parameter_type);

  // Consulta os tipos de parâmetros com base nos IDs extraídos
  const parameterTypes = await parameterTypeRepository.find({
    relations: ["unit"],
    where: {
      id_parameter_type: In(parameterTypeIds)
    }
  });

  const formattedData: { [key: string]: any } = {
    id_estacao: station[0],
    measurements: []
  };

  // Mapeia os parâmetros e suas medições
  for (const item of dashBoardList) {
    const paramName = item.parameter_type.description;
    const parameterType = await parameterTypes.find(type => type.id_parameter_type === item.parameter_type.id_parameter_type);

    // Itera sobre cada medida
    for (const measure of item.measures) {
      const paramValue = measure.value;

      // Obtém a data da medição
      const measureDate = new Date(measure.unixtime * 1000); // Converte o UnixTime em milissegundos
      const measureDateString = `${measureDate.getFullYear()}-${String(measureDate.getMonth() + 1).padStart(2, '0')}-${String(measureDate.getDate()).padStart(2, '0')}`;
      const measureTimeString = `${String(measureDate.getHours()).padStart(2, '0')}:${String(measureDate.getMinutes()).padStart(2, '0')}:${String(measureDate.getSeconds()).padStart(2, '0')}`;

      const measurement = {
        description: paramName,
        value: paramValue,
        parameter_type: parameterType,
        data: measureDateString,
        hora: measureTimeString
      };

      formattedData.measurements.push(measurement);
    }
  }


  return formattedData;
};



const getDahsBoardDataBeTweenDates = async (id: number, initialDateUnixtime: number, finalDateUnixtime: number): Promise<JsonObject> => {

  // Consulta todas as medições entre as datas especificadas
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id
      },
      measures: {
        unixtime: Between(initialDateUnixtime, finalDateUnixtime)
      }
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id },
  });

  const formattedData: { [key: string]: any } = {
    id_estacao: station[0],
    dailyData: []
  };

  // Agrupa as medições por data
  const measurementsByDay = groupMeasurementsByDay(dashBoardList);

  // Calcula o valor máximo, mínimo e médio de cada dia
  for (const measurementsArray of measurementsByDay) {


    const dailyInfo = {
      date: measurementsArray.date,
      avgParameterValues: measurementsArray.parameterStats,
      measurements: measurementsArray.measurements.map(measure => ({
        description: measure.description,
        value: measure.value,
        parameter_type: measure.parameter_type
      })),
      quantityMeasurements: measurementsArray.measurements.length
    };

    formattedData.dailyData.push(dailyInfo);
  }

  return formattedData;
};

interface ParameterStats {
  minValue: number;
  maxValue: number;
  avgValue: number;
  qtdMeasurements: number;
}

interface DailyMeasurement {
  date: string;
  measurements: any[];
  parameterStats: { [paramDescription: string]: ParameterStats };
}

function groupMeasurementsByDay(measurements: any[]): DailyMeasurement[] {
  const groupedMeasurements: DailyMeasurement[] = [];

  for (const measure of measurements) {
    for (const singleMeasure of measure.measures) {
      const measureDate = new Date(singleMeasure.unixtime * 1000);
      const dateString = `${measureDate.getFullYear()}-${String(measureDate.getMonth() + 1).padStart(2, '0')}-${String(measureDate.getDate()).padStart(2, '0')}`;

      let dailyMeasurement = groupedMeasurements.find(item => item.date === dateString);

      if (!dailyMeasurement) {
        dailyMeasurement = {
          date: dateString,
          measurements: [],
          parameterStats: {}
        };
        groupedMeasurements.push(dailyMeasurement);
      }

      dailyMeasurement.measurements.push({
        description: measure.parameter_type.description,
        value: singleMeasure.value,
        parameter_type: measure.parameter_type
      });
    }
  }

  // Calcula o valor mínimo, máximo e médio de cada parâmetro para cada dia
  for (const dailyMeasurement of groupedMeasurements) {
    const parameterStats: { [paramDescription: string]: ParameterStats } = {};

    for (const measurement of dailyMeasurement.measurements) {
      const paramName = measurement.description;
      const paramValue = measurement.value;

      if (!parameterStats[paramName]) {
        parameterStats[paramName] = {
          minValue: paramValue,
          maxValue: paramValue,
          avgValue: paramValue,
          qtdMeasurements: 0
        };
      } else {
        parameterStats[paramName].minValue = Math.min(parameterStats[paramName].minValue, paramValue);
        parameterStats[paramName].maxValue = Math.max(parameterStats[paramName].maxValue, paramValue);
        parameterStats[paramName].avgValue += paramValue;
        parameterStats[paramName].qtdMeasurements += 1; 
      }
    }

    for (const paramName in parameterStats) {
      parameterStats[paramName].avgValue /= parameterStats[paramName].qtdMeasurements;
    }

    dailyMeasurement.parameterStats = parameterStats;
  }
  return groupedMeasurements;
}



const getDahsBoardDataBeTweenMonth = async (id: number, initialDateUnixtime: number, finalDateUnixtime: number): Promise<JsonObject> => {

  // Consulta todas as medições entre as datas especificadas
  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id
      },
      measures: {
        unixtime: Between(initialDateUnixtime, finalDateUnixtime)
      }
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id },
  });

  const formattedData: { [key: string]: any } = {
    id_estacao: station[0],
    monthData: []
  };

  // Agrupa as medições por data
  const measurementsByDay = groupMeasurementsByMonth(dashBoardList);

  // Calcula o valor máximo, mínimo e médio de cada dia
  for (const measurementsArray of measurementsByDay) {


    const monthInfo = {
      month: measurementsArray.month,
      avgParameterValues: measurementsArray.parameterStats,
      measurements: measurementsArray.measurements.map(measure => ({
        description: measure.description,
        value: measure.value,
        parameter_type: measure.parameter_type
      })),
      quantityMeasurements: measurementsArray.measurements.length
    };

    formattedData.monthData.push(monthInfo);
  }

  return formattedData;
};



interface MonthlyMeasurement {
  month: string; // Format: YYYY-MM
  measurements: any[];
  parameterStats: { [paramDescription: string]: ParameterStats };
}

function groupMeasurementsByMonth(measurements: any[]): MonthlyMeasurement[] {
  const groupedMeasurements: MonthlyMeasurement[] = [];

  for (const measure of measurements) {
    for (const singleMeasure of measure.measures) {
      
      const measureDate = new Date(singleMeasure.unixtime * 1000);
      const monthString = `${measureDate.getFullYear()}-${String(measureDate.getMonth() + 1).padStart(2, '0')}`; // Formato YYYY-MM

      let monthlyMeasurement = groupedMeasurements.find(item => item.month === monthString);

      if (!monthlyMeasurement) {
        monthlyMeasurement = {
          month: monthString,
          measurements: [],
          parameterStats: {}
        };
        groupedMeasurements.push(monthlyMeasurement);
      }
      monthlyMeasurement.measurements.push({
        description: measure.parameter_type.description,
        value: singleMeasure.value,
        parameter_type: measure.parameter_type
      });
    }
  }

  // Calcula o valor mínimo, máximo e médio de cada parâmetro para cada mês
  for (const monthlyMeasurement of groupedMeasurements) {
    const parameterStats: { [paramDescription: string]: ParameterStats } = {};

    for (const measurement of monthlyMeasurement.measurements) {
      const paramName = measurement.description;
      const paramValue = measurement.value;

      if (!parameterStats[paramName]) {
        parameterStats[paramName] = {
          minValue: paramValue,
          maxValue: paramValue,
          avgValue: paramValue,
          qtdMeasurements: 0
        };
      } else {
        parameterStats[paramName].minValue = Math.min(parameterStats[paramName].minValue, paramValue);
        parameterStats[paramName].maxValue = Math.max(parameterStats[paramName].maxValue, paramValue);
        parameterStats[paramName].avgValue += paramValue;
      }
    }

    // Calcula a média por mês
    for (const paramName in parameterStats) {
      parameterStats[paramName].avgValue /= monthlyMeasurement.measurements.length;
    }

    monthlyMeasurement.parameterStats = parameterStats;
  }

  return groupedMeasurements;
}




const getDahsBoardDataUnixTime = async (unixtime: number, id_station: number): Promise<JsonObject> => {

  const date = new Date(unixtime * 1000);

  const dashBoardList = await stationParameter.find({
    relations: ["station", "parameter_type", "measures"],
    where: {
      station: {
        id_station: id_station
      },
      measures: {
        unixtime,
      },
    }
  });

  const station = await dashBoardRepository.find({
    relations: ["location"],
    where: { id_station: id_station },
  });

  // Extrai os IDs dos tipos de parâmetros
  const parameterTypeIds = dashBoardList.map(item => item.parameter_type.id_parameter_type);

  // Consulta os tipos de parâmetros com base nos IDs extraídos
  const parameterTypes = await parameterTypeRepository.find({
    relations: ["unit"],
    where: {
      id_parameter_type: In(parameterTypeIds)
    }
  });

  const formattedData: { [key: string]: string | any } = {
    ano: String(date.getFullYear()),
    mes: String(date.getMonth() + 1),
    data: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    hora: `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
    id_estacao: station[0],
  };

  // Mapeia os parâmetros e seus valores
  dashBoardList.forEach((item) => {
    const paramName = item.parameter_type.description;
    const paramValue = item.measures[0].value;
    const parameterType = parameterTypes.find(type => type.id_parameter_type === item.parameter_type.id_parameter_type);
    const paramInfo = {
      value: paramValue,
      parameterType: parameterType
    };

    formattedData[paramName] = paramInfo;
  });

  return formattedData;
};



export { getDahsBoardData, getDahsBoardDataUnixTime, getDahsBoardDataBeTweenDates, getDahsBoardDataBeTweenMonth };
export default stationParameter;