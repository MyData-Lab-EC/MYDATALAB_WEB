import React from 'react';
import './Home.scss'
import MainCard from '../../components/MainCard/MainCard';
import { sensorGroups } from '../dashboard/DashBoardUtils';
import { countSensorsAndStatus, countSensorsByStatus, eccentricThresholds, getEccentricSensors } from './HomeUtils';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const navigate = useNavigate();
    const { Critical, Warnning, Normal } = countSensorsByStatus(sensorGroups);
    const criticalAndWarningCards = getEccentricSensors(sensorGroups, eccentricThresholds, 2);

    return (
        <div className="home-container">
            {/* 3 divs para el conteo de alertas */}
            <div className="status-summary">
                <div className='top-card'> <div className="status-indicator" style={{ backgroundColor: "#F44336" }}></div> <span>{Critical} Critical</span></div>
                <div className='top-card'> <div className="status-indicator" style={{ backgroundColor: "#FFC107" }}></div> <span>{Warnning} Warnning</span></div>
                <div className='top-card'> <div className="status-indicator" style={{ backgroundColor: "#4CAF50" }}></div>  <span>{Normal} Normal</span></div>
            </div>

            {/* MainCards para alertas y advertencias */}
            <h2>Alertas y Advertencias</h2>
            <div className="card-grid">
                {criticalAndWarningCards.map((sensor, index) => (
                    <MainCard key={index} {...sensor} />
                ))}
            </div>

            {/* Cards para el resto de los grupos */}
            <h2>Todos los Grupos</h2>
            <div className="minicards-container">
                {sensorGroups.map((sensor, index) => {
                    const { AmountCritical, AmountWarnning, AmountNormal } = countSensorsAndStatus(sensor);

                    return (
                        <div className='minicard-container' key={index} onClick={() => navigate("sensors", { state: { defaultGroup: sensor.nombreGrupo, defaultSensor: "" } })}>
                            <span>{sensor.nombreGrupo}</span>
                            <div className='mini-content'>
                                <div className="inidcator">
                                    <div className="status-indicator" style={{ backgroundColor: "#F44336" }}></div>
                                    <span>{AmountCritical} Critical</span>
                                </div>
                                <div className="inidcator">
                                    <div className="status-indicator" style={{ backgroundColor: "#FFC107" }}></div>
                                    <span>{AmountWarnning} Warnning</span>
                                </div>
                                <div className="inidcator">
                                    <div className="status-indicator" style={{ backgroundColor: "#4CAF50" }}></div>
                                    <span>{AmountNormal} Normal</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;