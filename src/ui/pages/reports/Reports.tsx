import { useState } from 'react';
import { DateRange, type RangeKeyDict, type Range } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import './Reports.scss';
import { sensorGroups } from '../dashboard/DashBoardUtils';

const Reports: React.FC = () => {


    const [showCalendar, setShowCalendar] = useState(false);
    const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

    // Rango de fechas por defecto: hoy
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: "selection",
        },
    ]);

    const buttonLabel =
        dateRange[0].startDate && dateRange[0].endDate
            ? `${format(dateRange[0].startDate, "dd/MM/yyyy")} - ${format(
                dateRange[0].endDate,
                "dd/MM/yyyy"
            )}`
            : "Elije una fecha";

    const handleToggleGroup = (groupName: string) => {
        setExpandedGroup(expandedGroup === groupName ? null : groupName);
    };

    return (

        <div className='reports-container'>
            {/* Selector de rango de fechas */}
            <div className="date-range-selector">
                <button
                    className="date-range-button"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    {buttonLabel}
                    <span className="material-icons calendar-icon">calendar_month</span>
                </button>

                {showCalendar && (
                    <div className="calendar-popup">
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item: RangeKeyDict) => setDateRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dateRange}
                            maxDate={new Date()}
                        />
                        <button
                            className="close-calendar"
                            onClick={() => setShowCalendar(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>

            <div className='data-report-container'>
                {sensorGroups.map((group) => (
                    <div key={group.nombreGrupo} className="sensor-group-card">
                        <div
                            className="group-header"
                            onClick={() => handleToggleGroup(group.nombreGrupo)}
                        >
                            <h3>{group.nombreGrupo}</h3>
                            <span>{expandedGroup === group.nombreGrupo ? "▲" : "▼"}</span>
                        </div>

                        {expandedGroup === group.nombreGrupo && (
                            <div className="sensors-list">
                                {group.sensores.map((sensor, index) => (
                                    <div key={index} className="sensor-item">
                                        <p>{sensor.nombre}</p>
                                         <p>{sensor.type}</p>
                                        <span className="material-icons download-icon">download</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>

    );
}

export default Reports;