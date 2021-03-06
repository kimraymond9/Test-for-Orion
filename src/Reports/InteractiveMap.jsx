import React from "react";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const InteractiveMap = props => {
  return (
    <div className="leaflet-container" data-testid="interactive-map">
      <Map center={[-40, -40]} zoom={1}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.data.map(user => {
          return (
            <Marker
              key={user.id}
              position={[user.address.geo.lat, user.address.geo.lng]}
            >
              <Popup>
                {user.name}
                <br />
                {user.company.name}
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};

export default InteractiveMap;
