import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DivIcon, type LatLngExpression } from "leaflet";
import "./LandingPage.scss";


export default function LandingPage() {
  const guayaquil: LatLngExpression = [-2.170998, -79.922359];
  const puntos = [
    { id: 1, nombre: "ThermoGuard Pro", tipo: "Temperatura", valor: "28.5 C", lat: -2.13, lng: -79.89 },
    { id: 2, nombre: " SonicAlert DB-Meter", tipo: "Sonoro", valor: "45 dB(A)", lat: -2.20, lng: -79.90 },
    { id: 3, nombre: "AeroSens PM2.5", tipo: "Contaminacion", valor: "55 µg/m³", lat: -2.16, lng: -79.94 },
  ];

  return (
    <div className="landing-page">

      <div className="top-bar">
        <h1 className="landing-title">My Data-Lab</h1>

        <a href="/login" className="map-button">
          <span className="material-icons login-icon">account_circle</span>
          Login
        </a>

      </div>

      <div className="content-container">



        <div className="map-description">
          <p className="text-description">
            My Data-Lab te permite monitorear tus sensores en tiempo real, visualizar datos mediante mapas de calor, gráficas interactivas y paneles personalizados para una gestión eficiente de tus recursos.
          </p>

          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div className="map-container">
          <MapContainer
            center={guayaquil}
            zoom={13}
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
                    <strong>Valor:</strong> {p.valor}
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>

      </div>

      <div className="message-container">
        <span>
          Conecta tu sensores, controla tu mundo.
        </span>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="icon-circle">
            <span className="material-icons">sensors</span>
          </div>
          <h3>Monitoreo en tiempo real</h3>
          <p>Visualiza los datos que envían tus sensores de manera instantánea y segura desde cualquier lugar.</p>
        </div>

        <div className="step">
          <div className="icon-circle">
            <span className="material-icons">analytics</span>
          </div>
          <h3>Análisis inteligente</h3>
          <p>Obtén métricas claras y gráficos dinámicos para identificar patrones y tomar mejores decisiones.</p>
        </div>

        <div className="step">
          <div className="icon-circle">
            <span className="material-icons">tune</span>
          </div>
          <h3>Gestión de dispositivos</h3>
          <p>Configura y organiza el funcionamiento de tus sensores en un solo panel fácil de usar.</p>
        </div>

        <div className="step">
          <div className="icon-circle">
            <span className="material-icons">verified</span>
          </div>
          <h3>Fiabilidad garantizada</h3>
          <p>Nuestro sistema asegura precisión, estabilidad y confianza en cada medición registrada.</p>
        </div>
      </div>

      <div className="details-container">
        <div className="bar up"></div>
        <div className="bar down"></div>
        <div className="details-text">
          <span>
            Olvídate de paneles complicados y datos dispersos. Con nuestro gestor de sensores podrás supervisar cada dispositivo, analizar la información con herramientas avanzadas y garantizar que tu red funcione de manera eficiente. Todo, desde una plataforma moderna, flexible y confiable.
          </span>
        </div>
      </div>

      <div className="bottom-container">
        <span>© 2025 My Data-Lab. All Rights Reserved.</span>
      </div>
    </div>
  );
}
