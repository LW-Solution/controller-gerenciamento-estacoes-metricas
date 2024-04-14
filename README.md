## ROTAS E JSONS PARA TESTE

### LOCATION

#### POST - http://localhost:3333/locations/create

JSON

{
  "location_name": "RJ",
  "coordinate": "ZZZ"
}

#### GET ALL - http://localhost:3333/locations

#### GET ID - http://localhost:3333/locations/:id

#### PUT ID - http://localhost:3333/locations/2

{
  "location_name": "teste update",
  "coordinate": "ZOna Vermelha"
}

#### DELETE ID - http://localhost:3333/locations/2

### UNIT 

#### POST - http://localhost:3333/unit/

JSON

{
  "unit": "Km"
}

#### GET ALL - http://localhost:3333/unit/

#### GET ID - http://localhost:3333/unit/:id

#### PUT ID - http://localhost:3333/unit/:id

JSON

{
  "unit": "Km"
}

#### DELETE ID - http://localhost:3333/unit/:id

### TIPO PARAMETRO

#### POST - http://localhost:3333/parameterType

JSON

{
  "factor": 1,
  "offset": 2,
  "unit": {
    "id_unit": 2
  }
}

#### GET ALL - http://localhost:3333/parameterType

#### GET ID - http://localhost:3333/parameterType/:id

#### PUT ID - http://localhost:3333/parameterType/:id

JSON

{
    "unitIdUnit": 2,
    "factor": 4,
    "offset": 4
}

#### DELETE ID - http://localhost:3333/parameterType/:id

### ESTAÇÃO

#### POST - http://localhost:3333/station

JSON 
{
    "station_description":"Estacao na minha Jonas",
    "location":1
}

#### GET ALL - http://localhost:3333/station

#### GET ID - http://localhost:3333/station/:id

#### PUT ID - http://localhost:3333/station/:id

JSON
{
    "station_description": "Nova descrição",
    "locationIdLocation": 1
}

#### DELETE ID - http://localhost:3333/station/:id

### PARAMETRO ESTAÇÃO

#### POST - http://localhost:3333/stationParameter

JSON

{
  "parameterTypeIdParameterType": {
    "id_parameter_type": 3
  },
  "stationIdStation": {
    "id_station": 1
  }
}


#### GET ALL - http://localhost:3333/stationParameter

#### GET ID - http://localhost:3333/stationParameter/:id

#### PUT ID - http://localhost:3333/stationParameter/:id

JSON

{
  "parameter_type_id": 2,
  "station_id": 2
}

#### DELETE ID - http://localhost:3333/stationParameter/:id

### MEASURE

#### POST - http://localhost:3333/measure

JSON

{
  "value": 25.5,
  "unixtime": 1649452800,
  "station_parameter_id": {
    "station_parameter_id": 1
  }
}

#### GET ALL - http://localhost:3333/measure

#### GET ID - http://localhost:3333/measure:id

#### PUT ID - http://localhost:3333/measure/:id

JSON

{
  "value":0,
  "unixtime": 23265,
  "station_parameter_id": 3
}

#### DELETE ID -http://localhost:3333/measure/:id


### ALERT

#### POST - http://localhost:3333/alert

JSON

{
  "condition": "Alert condition here",
  "station_id": {
    "id_station": 2
  },
  "parameter_type_id": {
    "id_parameter_type": 3
  }
}

#### GET ALL - http://localhost:3333/alert

#### GET ID - http://localhost:3333/alert/:id

#### PUT ID - http://localhost:3333/alert/:id

JSON

{
  "condition": "Nova condição do alerta",
  "stationIdStation": 1,
  "parameterTypeIdParameterType": 1
}

#### DELETE ID - http://localhost:3333/alert/:id

### OCCURRENCE

#### POST - http://localhost:3333/occurrence

JSON

{
  "alertIdAlert": 1,
  "measureIdMeasure": 1
}

#### GET ALL - http://localhost:3333/occurrence

#### GET ID - http://localhost:3333/occurrence/:id

#### PUT ID - http://localhost:3333/occurrence/:id

JSON

{
  "alertIdAlert": {
    "id_alert": 2
  },
  "measureIdMeasure": {
    "id_measure": 3
  }
}

#### DELETE ID - http://localhost:3333/occurrence/:id