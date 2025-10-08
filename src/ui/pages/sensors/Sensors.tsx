import { useEffect, useMemo, useState } from 'react';
import './Sensors.scss'
import { sensorGroups } from '../dashboard/DashBoardUtils';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { DivIcon, type LatLngBoundsExpression } from 'leaflet';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import GaugeIndicator from '../../components/gaugeCard/GaugeCard';
import { useLocation } from 'react-router-dom';


const Sensors: React.FC = () => {

    const location = useLocation();
    const defaultGroup = location.state?.defaultGroup ?? "";
    const defaultSensor = location.state?.defaultSensor ?? "";

    const [selectedGroup, setSelectedGroup] = useState<string>(defaultGroup);
    const [currentSensor, setCurrentSensor] = useState<String>(defaultSensor);
    const [selectedSensor, setSelectedSensor] = useState<any>();

    // Obtenemos el grupo actualmente seleccionado
    const currentGroup = sensorGroups.find((group) => group.nombreGrupo === selectedGroup);

    useEffect(() => {
        if (!currentGroup) return;

        const sensorName = currentSensor || selectedSensor?.nombre;
        const found = currentGroup.sensores.find(s => s.nombre === sensorName);

        if (found) {
            setSelectedSensor(found);
        } else {
            setSelectedSensor(null);
        }
    }, [currentGroup, currentSensor]);

    // Construimos los puntos a mostrar en el mapa según el grupo
    const puntos = useMemo(() => {
        if (!currentGroup) return [];
        return currentGroup.sensores.map((sensor, index) => ({
            id: index,
            nombre: sensor.nombre,
            tipo: sensor.type,
            unit: sensor.unit,
            lat: Number(sensor.lat),
            lng: Number(sensor.long),
        }));
    }, [currentGroup]);

    // creamos el array con los datos por sensor
    const chartData = useMemo<{ index: number; value: number }[]>(() => {
        if (!selectedSensor) return [];
        return selectedSensor.sparklineData.map((v: number, i: number) => ({ index: i + 1, value: v }));
    }, [currentSensor, selectedSensor, currentGroup]);

    //buscamos el valor maximo
    const maxValue = useMemo(() => {
        if (chartData.length === 0) return 0;
        return Math.ceil(Math.max(...chartData.map(d => d.value)));
    }, [chartData]);

    const minValue = useMemo(() => {
        if (chartData.length === 0) return 0;
        return Math.ceil(Math.min(...chartData.map(d => d.value)));
    }, [chartData]);

    const avgValue = useMemo(() => {
        if (chartData.length === 0) return 0;
        const sum = chartData.reduce((total, d) => total + d.value, 0);
        return Math.ceil(sum / chartData.length);
    }, [chartData]);

    function FitBounds({ puntos }: { puntos: { lat: number; lng: number }[] }) {
        const map = useMap();

        if (puntos.length > 0) {
            const bounds: LatLngBoundsExpression = puntos.map((p) => [p.lat, p.lng]);
            map.fitBounds(bounds, { padding: [50, 50] }); // padding para que no queden pegados al borde
        }

        return null;
    }

    const getStatusBatteryIcon = (status: string): string => {
        switch (status) {
            case 'Normal':
                return 'battery_5_bar';
            case 'Warnning':
                return 'battery_3_bar';
            case 'Critical':
                return 'battery_1_bar';
            default:
                return 'battery_0_bar';
        }
    };

    const getStatusBattery = (status: string): string => {
        switch (status) {
            case 'Normal':
                return '90%';
            case 'Warnning':
                return '60%';
            case 'Critical':
                return '30%';
            default:
                return '0%';
        }
    };

    const getStatusWifi = (status: string): string => {
        switch (status) {
            case 'Normal':
                return 'network_wifi_3_bar';
            case 'Warnning':
                return 'network_wifi_2_bar';
            case 'Critical':
                return 'network_wifi_1_bar';
            default:
                return 'signal_wifi_statusbar_null';
        }
    };

    return (
        <div className='sensors-container'>

            <div className='sensors-search-container'>

                {/* Select de Grupos */}
                <select
                    className='select-group'
                    value={selectedGroup}
                    onChange={(e) => {
                        setSelectedGroup(e.target.value);
                        setSelectedSensor(null); // resetear sensor cuando se cambia el grupo
                    }}
                >
                    <option value="">-- Selecciona un grupo --</option>
                    {sensorGroups.map((group, index) => (
                        <option key={index} value={group.nombreGrupo}>
                            {group.nombreGrupo}
                        </option>
                    ))}
                </select>

                {/* Select de Sensores */}
                <select
                    className='select-group'
                    value={selectedSensor?.nombre || ""}
                    onChange={(e) => {
                        const sensorObj = currentGroup?.sensores.find(s => s.nombre === e.target.value);
                        setSelectedSensor(sensorObj || null);
                    }}
                    disabled={!selectedGroup} // deshabilitado hasta que se seleccione un grupo
                >
                    <option value="">-- Selecciona un sensor --</option>
                    {currentGroup?.sensores.map((sensor, index) => (
                        <option key={index} value={sensor.nombre}>
                            {sensor.nombre}
                        </option>
                    ))}
                </select>

            </div>

            <div className='sensors-content-container'>

                <div className="sensors-map-container">
                    <MapContainer
                        className='sensors-map'
                        center={[-1.8312, -78.1834]}
                        zoom={6}
                        style={{ width: "100%", height: "100%" }}
                        scrollWheelZoom={true}
                        attributionControl={false}
                    >
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
                        />

                        {puntos.map((p) => (
                            <Marker
                                key={p.id}
                                position={[p.lat, p.lng]}
                                icon={
                                    new DivIcon({
                                        className: "pulse-marker",
                                        html: "<div></div>", // el div que vamos a animar
                                        iconSize: [30, 30],
                                        iconAnchor: [15, 15], // centra el div en la coordenada
                                    })
                                }
                            >
                                <Popup>
                                    <div>
                                        <strong>Nombre:</strong> {p.nombre} <br />
                                        <strong>Tipo:</strong> {p.tipo} <br />
                                        <strong>Valor:</strong> {p.unit}
                                    </div>
                                </Popup>

                                <FitBounds puntos={puntos} />
                            </Marker>
                        ))}

                    </MapContainer>
                </div>

                <div className='sensors-charts-container'>

                    <div className='charts-wrapper'>
                        <ResponsiveContainer>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={'#319cff'} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={'#319cff'} stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="index" />
                                <YAxis domain={[0, maxValue + 10]} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={'#319cff'}
                                    fill="url(#colorValue)"
                                    strokeWidth={2}
                                    dot={true}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='sensors-cards-wrapper'>
                        <div className='card-data'>
                            <GaugeIndicator
                                currentValue={avgValue}
                                minValue={minValue}
                                maxValue={maxValue}
                                averageValue={avgValue}
                                minLimit={0}
                                maxLimit={maxValue + 10}
                                unit={selectedSensor?.unit}
                                title={selectedSensor?.type}
                            />
                        </div>

                        <div className='card-data battery-wrapper'>

                            <div className='battery-row'>
                                <span className='battery-status'>
                                    Status: {selectedSensor != null ? 'Connected' : 'Disconnected'}
                                </span>
                            </div>

                            <div className='battery-row'>
                                <span className='material-icons wifi-icon'>
                                    {getStatusWifi(selectedSensor?.battery)}
                                </span>
                                <span>{selectedSensor != null ? 'Connected' : 'Disconnected'}</span>
                            </div>

                            <div className='battery-row'>
                                <span className="material-icons battery-icon">
                                    {getStatusBatteryIcon(selectedSensor?.battery)}
                                </span>

                                <span className='battery-status'>
                                    {getStatusBattery(selectedSensor?.battery)}
                                </span>
                            </div>


                        </div>

                        <div className='card-data battery-wrapper'>

                            {selectedSensor != null ?
                                <>
                                    <div className='battery-column'>
                                        <span className='text-start'>
                                            Last Received Value:
                                        </span>
                                        <span className='text-end'>
                                            {selectedSensor.sparklineData?.length > 0 ? selectedSensor.sparklineData.at(-1) : 'N/A'} {selectedSensor.unit}
                                        </span>
                                    </div>

                                    <div className='battery-column'>
                                        <span className='text-start'>
                                            Last Alert:
                                        </span>
                                        <span className='text-end'>
                                            07/08/2025
                                        </span>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>

                </div>


            </div>



        </div>
    );
}

export default Sensors;