// dashboardUtils.ts
export const sensorGroups = [
    {
        nombreGrupo: "HaciendoPaloBlanco",
        sensores: [
            {
                type: "Temperature",
                nombre: "ThermoGuard A1",
                battery: "Normal" as const,
                unit: "°C",
                sparklineData: [24, 23, 25, 24, 33, 26, 25, 24, 23, 25],
                lat: -2.244237,
                long: -80.111170,
            },
            {
                type: "Humidity",
                nombre: "SoilSense A2",
                battery: "Warnning" as const,
                unit: "%",
                sparklineData: [65, 67, 70, 70, 70, 68, 66, 67, 69, 75],
                lat: -2.244199,
                long: -80.109684,
            },
            {
                type: "Humidity",
                nombre: "SoilSense A3",
                battery: "Critical" as const,
                unit: "%",
                sparklineData: [30, 28, 27, 25, 33, 23, 27, 25, 29, 33],
                lat: -2.246310,
                long: -80.110415,
            },
        ],
    },
    {
        nombreGrupo: "CamaroneraPanchana",
        sensores: [
            {
                type: "Salinity",
                nombre: "OxyProbe B1",
                battery: "Normal" as const,
                unit: "ppt",
                sparklineData: [33, 36, 45, 38, 38, 35, 39, 36, 37, 35],
                lat: -2.218546,
                long: -79.821078
            },
            {
                type: "pH",
                nombre: "ThermoGuard B2",
                battery: "Warnning" as const,
                unit: "pH",
                sparklineData: [6, 6.5, 7, 6.8, 7.1, 6.9, 7, 6.7, 6.8, 7.2],
                lat: -2.218456,
                long: -79.820098
            },
            {
                type: "pH",
                nombre: "AquaPH B3",
                battery: "Normal" as const,
                unit: "pH",
                sparklineData: [7.5, 7.4, 7.6, 7.3, 7.2, 7.4, 7.6, 7.5, 7.3, 7.2],
                lat: -2.221662,
                long: -79.819259
            },
            {
                type: "Salinity",
                nombre: "SalinCheck B4",
                battery: "Critical" as const,
                unit: "ppt",
                sparklineData: [30, 31, 35, 38, 32, 37, 33, 39, 37, 36],
                lat: -2.224923,
                long: -79.820046
            },
        ],
    },
    {
        nombreGrupo: "InvernaderoSanLuis",
        sensores: [
            {
                type: "Temperature",
                nombre: "ThermoGuard C1",
                battery: "Normal" as const,
                unit: "°C",
                sparklineData: [22, 23, 22, 21, 22, 23, 24, 23, 22, 23],
                lat: -2.184811,
                long: -80.018734
            },
            {
                type: "Humidity",
                nombre: "HygroCheck C2",
                battery: "Normal" as const,
                unit: "%",
                sparklineData: [55, 57, 56, 58, 59, 57, 56, 55, 56, 57],
                lat: -2.185016,
                long: -80.021734
            },
            {
                type: "CO2",
                nombre: "AirGuard C3",
                battery: "Warnning" as const,
                unit: "ppm",
                sparklineData: [450, 480, 500, 520, 510, 530, 550, 540, 520, 500],
                lat: -2.187150,
                long: -80.020219
            },
        ],
    },
    {
        nombreGrupo: "PlantaProcesadoraAndes",
        sensores: [
            {
                type: "Sound",
                nombre: "SonicAlert D1",
                battery: "Normal" as const,
                unit: "dB(A)",
                sparklineData: [60, 62, 61, 63, 62, 64, 65, 63, 61, 62],
                lat: -2.037778,
                long: -79.943726
            },
            {
                type: "Temperature",
                nombre: "ThermoGuard D2",
                battery: "Critical" as const,
                unit: "°C",
                sparklineData: [28, 27, 25, 26, 28, 36, 27, 28, 29, 27],
                lat: -2.040663,
                long: -79.943365
            },
            {
                type: "Vibration",
                nombre: "VibeCheck D3",
                battery: "Warnning" as const,
                unit: "Hz",
                sparklineData: [15, 16, 18, 20, 19, 21, 22, 20, 19, 18],
                lat: -2.042728,
                long: -79.945900
            },
            {
                type: "Humidity",
                nombre: "HygroCheck D4",
                battery: "Normal" as const,
                unit: "%",
                sparklineData: [40, 42, 43, 41, 40, 42, 43, 41, 42, 40],
                lat: -2.039266,
                long: -79.947127
            },
        ],
    },
    {
        nombreGrupo: "CentralEnergiaEEE",
        sensores: [
            {
                type: "Voltage",
                nombre: "VoltMeter E1",
                battery: "Normal" as const,
                unit: "V",
                sparklineData: [220, 221, 219, 222, 223, 221, 220, 222, 223, 221],
                lat: -2.051844,
                long: -79.948626
            },
            {
                type: "Current",
                nombre: "AmpCheck E2",
                battery: "Warnning" as const,
                unit: "A",
                sparklineData: [15, 16, 17, 16, 18, 19, 20, 19, 18, 17],
                lat: -2.052211,
                long: -79.948119
            },
            {
                type: "Temperature",
                nombre: "ThermoGuard E3",
                battery: "Critical" as const,
                unit: "°C",
                sparklineData: [45, 47, 50, 52, 55, 58, 60, 62, 61, 59],
                lat: -2.052496,
                long: -79.948759
            },
            {
                type: "Power",
                nombre: "WattMeter E4",
                battery: "Normal" as const,
                unit: "kW",
                sparklineData: [500, 520, 510, 530, 540, 550, 560, 550, 540, 530],
                lat: -2.053237,
                long: -79.948509
            },
            {
                type: "Frequency",
                nombre: "FreqCheck E5",
                battery: "Normal" as const,
                unit: "Hz",
                sparklineData: [59.8, 60, 60.2, 59.9, 60.1, 59.3, 59.9, 60.1, 60, 57.5],
                lat: -2.053026,
                long: -79.948021
            },
        ],
    },
];
