import Map, {
  Layer,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
  Source,
  ViewStateChangeEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ACCESS_TOKEN } from "../private /api";
import React, { useEffect, useState } from "react";
import { overlayData, geoLayer } from "./overlays";

const WrappedMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 19.944544,
    latitude: 50.049683,
    zoom: 1,
  });
  const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
    undefined
  );

  useEffect(() => {
    setOverlay(overlayData());
  }, []);

  function onMapClick(e: MapLayerMouseEvent) {
    console.log(e.lngLat.lat);
    console.log(e.lngLat.lng);
  }

  return (
    <Map
      mapboxAccessToken={ACCESS_TOKEN}
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}
      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
      style={{ width: window.innerWidth, height: window.innerHeight }}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
    >
      <Source id="geo_data" type="geojson" data={overlay}>
        <Layer {...geoLayer} />
      </Source>
    </Map>
  );
};

export default WrappedMap;
