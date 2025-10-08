import React from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import './MainCard.scss';
import { useNavigate } from 'react-router-dom';

// Define la interfaz para los datos del gráfico
interface SparklineDataPoint {
    name: string;
    value: number;
}

// Define la interfaz para las props del componente MainCard
interface MainCardProps {
    type: string;
    nombre: string,
    battery: "Critical" | "Warnning" | "Normal";
    unit: string;
    sparklineData: number[];
    maxValue: string;
    nombreGrupo: string;
}

const MainCard: React.FC<MainCardProps> = ({
    type,
    nombre,
    battery,
    unit,
    sparklineData,
    maxValue,
    nombreGrupo,
}) => {
    // Función para determinar el color del estado
    const getStatusColor = (status: MainCardProps['battery']): string => {
        switch (status) {
            case 'Normal':
                return '#4CAF50';
            case 'Warnning':
                return '#FFC107';
            case 'Critical':
                return '#F44336';
        }
    };

    const getStatusBattery = (status: MainCardProps['battery']): string => {
        switch (status) {
            case 'Normal':
                return 'battery_5_bar';
            case 'Warnning':
                return 'battery_3_bar';
            case 'Critical':
                return 'battery_1_bar';
        }
    };

    const getCardType = (status: MainCardProps['battery']): { color: string; textType: string } => {
        switch (status) {
            case 'Critical':
                return { color: "#F44336", textType: "Alerta" };
            default:
                return { color: "#FFC107", textType: "Advertencia" };
        }
    }

    // Formatear los datos para Recharts
    const formattedSparklineData: SparklineDataPoint[] = sparklineData.map((value, index) => ({
        name: `Punto ${index}`,
        value: value,
    }));

    const sparklineLineColor: string = getStatusColor(battery);
    const { color, textType } = getCardType(battery);
    const navigate = useNavigate();

    return (
        <div className="main-card" onClick={() => navigate("sensors", { state: { defaultGroup: nombreGrupo, defaultSensor: nombre } })}>
            <div className="card-header">
                <h3 className="card-title">{nombreGrupo}</h3>
                <div style={{ width: "5vw",backgroundColor: color, padding: "3px", borderRadius: "4px", color: "#fff", textAlign:"center" }}>{textType}</div>
            </div>
            <div className="card-header">
                <h3 className="card-title">{nombre}</h3>
                <div className="status-indicator" style={{ backgroundColor: getStatusColor(battery) }}></div>
                <span className="material-icons battery-icon">{getStatusBattery(battery)}</span>
            </div>

            <div className="card-body">
                <span> Max Value: {maxValue} {unit}</span>
            </div>

            <div className="card-footer">
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={formattedSparklineData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={sparklineLineColor} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={sparklineLineColor} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={sparklineLineColor}
                            fill="url(#colorValue)"
                            strokeWidth={2}
                            dot={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MainCard;