import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import './MapBoxFuncComponent.css';

const MapBoxComponent = ({ center, zoom, data, trajectorycolor }) => {
  // Map container settings
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  // Map objects for drawing trajectory and vehicle marker
  const [mapObject, setMapObject] = useState({
    trajectory: [], // Actual vehicle trajectory
    vehicle: [0, 0], // Vehicle marker position
    simtrajectory: [], // Simulated trajectory
    iip: [], // Instantaneous Impact Point
  });

  // On page load, initialize the map
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiZ2hzb25nIiwiYSI6ImNraWp1bzQ2MzAza28zMmw5ZXdnbmUxeGEifQ.TefWKYtgeOz3tOkel2xNiA';

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [center.lng, center.lat],
        attributionControl: false, // Can only disable right side attribution
        zoom: zoom,
        //transition: {
        //  duration: 0,
        //  delay: 0,
        //},
        fadeDuration: 0, // Disables icon flickering
      });

      map.on('load', () => {
        setMap(map);
        map.resize();

        // Controls
        map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

        // Adds feature layer sequentially
        // Layer add sequence AFFECTS displaying z-order
        // Instantaneous Impact Point
        map.addSource('iip', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Polygon',
              coordinates: [mapObject.iip],
            },
          },
        });

        map.addLayer({
          id: 'iip',
          type: 'fill',
          source: 'iip',
          layout: {},
          paint: {
            'fill-color': '#41d7d3',
            'fill-opacity': 0.75,
          },
        });

        // Simulated trajectory
        map.addSource('simtrajectory', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: mapObject.simtrajectory,
            },
          },
        });

        map.addLayer({
          id: 'simtrajectory',
          type: 'line',
          source: 'simtrajectory',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#aaa',
            'line-width': 2,
            'line-dasharray': [3, 2],
          },
        });
        // Real-time trajectory
        map.addSource('trajectory', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: mapObject.trajectory,
            },
          },
        });

        map.addLayer({
          id: 'trajectory',
          type: 'line',
          source: 'trajectory',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': trajectorycolor,
            'line-width': 2.5,
          },
        });

        // Marker
        map.addSource('launch_vehicle', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              coordinates: mapObject.vehicle,
              type: 'Point',
            },
          },
        });

        /*
        map.addLayer({
          id: 'launch_vehicle',
          type: 'symbol',
          source: 'launch_vehicle',
          layout: {
            'icon-image': 'rocket-15',
            'icon-ignore-placement': true,
            'symbol-z-order': 'source',
          },
        });
        */
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  // On data update, draw trajectory and vehicle marker
  useEffect(() => {
    if (
      map &&
      data &&
      data.data &&
      data.traj &&
      data.iip &&
      data.data.hasOwnProperty('gps') &&
      data.traj.hasOwnProperty('lat') &&
      data.traj.hasOwnProperty('long') &&
      data.iip.hasOwnProperty('lat') &&
      data.iip.hasOwnProperty('lon') &&
      data.iip.hasOwnProperty('maj_n') &&
      data.iip.hasOwnProperty('maj_e') &&
      data.iip.hasOwnProperty('maj') &&
      data.iip.hasOwnProperty('min')
    ) {
      // Pre-computed trajectory update section
      let simTrajArray = [];
      for (let i in data.traj.t) {
        simTrajArray.push([data.traj.long[i], data.traj.lat[i]]);
      }

      // IIP update section
      let iipArray = generateEllipse(
        data.iip.lat,
        data.iip.lon,
        data.iip.maj_n,
        data.iip.maj_e,
        data.iip.maj,
        data.iip.min,
      );

      // Update map objects
      setMapObject({
        trajectory: [...mapObject.trajectory, [data.data.gps.lon, data.data.gps.lat]],
        vehicle: [data.data.gps.lon, data.data.gps.lat],
        simtrajectory: simTrajArray,
        iip: iipArray,
      });

      // Update trajectories & marker data
      map.getSource('trajectory').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: mapObject.trajectory,
        },
      });

      map.getSource('launch_vehicle').setData({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: mapObject.vehicle,
        },
      });

      map.getSource('simtrajectory').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: mapObject.simtrajectory,
        },
      });

      map.getSource('iip').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [mapObject.iip],
        },
      });
    }
  }, [data]);

  // Generates GeoJSON ellipse
  // Lat, lon in degrees
  // Major axis unit vectors in float
  // Major/minor axis distance in meters
  const generateEllipse = (lat, lon, majN, majE, maj, min) => {
    // Calculate rotation angle from unit vectors
    let rot = Math.atan2(majE, majN); // In radian
    let coordinates = [];

    // Sampling angles
    let k = Math.ceil(36 * Math.max(maj / min, min / maj));

    for (let i = 0; i <= k; i++) {
      let θ = ((Math.PI * 2) / k) * i;

      let r =
        (maj * min) /
        Math.sqrt(maj * maj * Math.sin(θ) * Math.sin(θ) + min * min * Math.cos(θ) * Math.cos(θ));

      coordinates.push(getLatLong(lat, lon, θ + rot, r));
    }

    return coordinates;
  };

  // Get actual lat/long of a point on the ellipse
  const getLatLong = (lat, lon, angle, r) => {
    var re = 6371000;

    let y0 = (lat * Math.PI) / 180;
    let x0 = (lon * Math.PI) / 180;

    var y1 = Math.asin(
      Math.sin(y0) * Math.cos(r / re) + Math.cos(y0) * Math.sin(r / re) * Math.cos(angle),
    );
    var x1 =
      x0 +
      Math.atan2(
        Math.sin(angle) * Math.sin(r / re) * Math.cos(y0),
        Math.cos(r / re) - Math.sin(y0) * Math.sin(y1),
      );

    y1 = (y1 * 180) / Math.PI;
    x1 = (x1 * 180) / Math.PI;

    return [x1, y1];
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <div ref={(el) => (mapContainer.current = el)} className="mapContainer" />
    </div>
  );
};

//좌표
MapBoxComponent.defaultProps = {
  center: { lat: -34.9112, lng: 135.6348 },
  zoom: 10,
  data: null,
  traj: null,
  trajectorycolor: '#088',
};

MapBoxComponent.propTypes = {
  center: PropTypes.object,
  zoom: PropTypes.number,
  data: PropTypes.object,
  traj: PropTypes.object,
  trajectorycolor: PropTypes.string,
};

export default MapBoxComponent;
