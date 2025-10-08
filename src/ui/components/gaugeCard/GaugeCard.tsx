import React from 'react';

interface GaugeIndicatorProps {
    currentValue: number;
    minValue: number;
    maxValue: number;
    averageValue: number;
    minLimit: number;
    maxLimit: number,
    unit: string,
    title?: string;
}

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '4px 5px',
        textAlign: 'center',
        flex: "1 1 0",
        maxWidth: "25%",
        // margin: '0 5px',
        border: "1px solid #d9e9f7ff"
    }}>
        <div style={{ color: '#000', fontSize: '11px' }}>{label}</div>
        <div style={{ color: '#000', fontWeight: 'bold', fontSize: '13px' }}>
            {value.toFixed(1)}
        </div>
    </div>
);

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
};

const GaugeIndicator: React.FC<GaugeIndicatorProps> = ({
    currentValue,
    minValue,
    maxValue,
    averageValue,
    minLimit,
    maxLimit,
    unit,
    title = ''
}) => {
    const angleStart = -135;
    const angleEnd = 135;
    const angleRange = angleEnd - angleStart;
    const center = 100;
    const radius = 80;
    const strokeWidth = 15;
    const segmentCount = 4;

    const normalizedValue = (currentValue - minLimit) / (maxLimit - minLimit);

    const needleRotation = angleStart + normalizedValue * angleRange;

    const colors = ['#007bff', '#5ae02d', '#ffeb3b', '#f44336'];
    const segmentArc = angleRange / segmentCount;

    const segments = colors.map((color, index) => {
        const start = angleStart + index * segmentArc;
        const end = angleStart + (index + 1) * segmentArc;
        return { color, start, end };
    });

    return (
        <div style={{
            backgroundColor: 'transparent',
            borderRadius: '20px',
            padding: '10px',
            fontFamily: 'system-ui',
            color: '#fff',
        }}>
            <div style={{ display: 'flex', height: "13%", justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#9c9c9c', fontSize: '14px' }}>
                    <span style={{ marginRight: '5px', color: '#007bff' }}>●</span>
                    <span>{title}</span>
                </div>
                <div style={{ fontWeight: 'bold', fontSize: '14px',  color: '#9c9c9c', }}>
                    {unit}
                </div>
            </div>

            <div style={{ display: 'flex', height: "50%", justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <svg viewBox="0 0 200 150" style={{ width: 'auto', height: 'auto', overflow: 'visible' }}>

                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={describeArc(center, center, radius, segment.start, segment.end)}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeLinecap={index === 0 || index === segments.length - 1 ? 'round' : 'butt'}
                        />
                    ))}

                    <g
                        style={{
                            transform: `rotate(${needleRotation}deg)`,
                            transformOrigin: `${center}px ${center}px`,
                            transition: 'transform 0.5s ease-out'
                        }}
                    >
                        <rect x={center - 2} y={center - radius + 5} width="4" height={radius - 5} fill="#777" rx="2" />
                    </g>

                    <circle cx={center} cy={center} r="6" fill="#1e1e1e" stroke="#777" strokeWidth="2" />

                    <text x="17" y="160" fill="#9c9c9c" fontSize="12px" textAnchor="start" dominantBaseline="middle">{minLimit}</text>
                    <text x="190" y="160" fill="#9c9c9c" fontSize="12px" textAnchor="end" dominantBaseline="middle">{maxLimit}</text>
                </svg>
            </div>

            <div style={{ display: 'flex', width: 'auto', height: "37%", justifyContent: 'space-between', marginTop: "15px" }}>
                <StatCard label="Min" value={minValue} />
                <StatCard label="Max" value={maxValue} />
                <StatCard label="Avg" value={averageValue} />
            </div>
        </div>
    );
};

export default GaugeIndicator;