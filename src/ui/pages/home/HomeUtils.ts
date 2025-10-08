
type SensorGroup = {
  nombreGrupo: string;
  sensores: Array<{
    type: string;
    nombre: string;
    battery: "Critical" | "Warnning" | "Normal";
    unit: string;
    sparklineData: number[];
  }>;
};

export const eccentricThresholds: Record<string, number> = {
    Temperature: 35,   // C
    Humidity: 90,      // %
    SoilMoisture: 80,  // %
    Oxygen: 10,        // mg/L
    pH: 8.5,           // pH
    Salinity: 40,      // ppt
    CO2: 1000,         // ppm
    Sound: 90,         // dB(A)
    Vibration: 25,     // Hz
    Voltage: 240,      // V
    Current: 25,       // A
    Power: 1000,       // kW
    Frequency: 61,     // Hz
};

export function getEccentricSensors(sensorGroups: any[], thresholds: Record<string, number>, limit = 2) {
    const eccentricSensors: Array<any> = [];

    // Aplanamos todos los sensores con su grupo
    const allSensors = sensorGroups.flatMap(group =>
        group.sensores.map((sensor: any) => ({
            ...sensor,
            nombreGrupo: group.nombreGrupo,
        }))
    );

    for (const sensor of allSensors) {
        if (eccentricSensors.length >= limit) break; // ya tenemos 2, salimos

        const threshold = thresholds[sensor.type];
        if (threshold === undefined) continue;

        // Buscar valor máximo en sparklineData
        const maxValue = Math.max(...sensor.sparklineData);

        if (maxValue >= threshold) {
            eccentricSensors.push({
                ...sensor,
                maxValue,
                nombreGrupo: sensor.nombreGrupo,
            });
        }
    }

    return eccentricSensors;
}

export function countSensorsByStatus(sensorGroups: SensorGroup[]) {
  // Aplanar sensores con su grupo
  const allSensors = sensorGroups.flatMap(group =>
    group.sensores.map(sensor => ({
      ...sensor,
      grupo: group.nombreGrupo,
    }))
  );

  // Inicializar contadores
  const counts = {
    Critical: 0,
    Warnning: 0,
    Normal: 0,
  };

  // Contar por battery
  for (const sensor of allSensors) {
    if (sensor.battery === "Critical") counts.Critical++;
    else if (sensor.battery === "Warnning") counts.Warnning++;
    else if (sensor.battery === "Normal") counts.Normal++;
  }

  return counts;
}

export function countSensorsAndStatus(sensorGroups: SensorGroup) {
  // Inicializar contadores
  const counts = {
    AmountCritical: 0,
    AmountWarnning: 0,
    AmountNormal: 0,
  };

  // Contar por battery
  for (const sensor of sensorGroups.sensores) {
    if (sensor.battery === "Critical") counts.AmountCritical++;
    else if (sensor.battery === "Warnning") counts.AmountWarnning++;
    else if (sensor.battery === "Normal") counts.AmountNormal++;
  }

  return counts;
}