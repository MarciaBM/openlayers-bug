// components/Map1.js
'use client'
import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Layer} from "ol/layer";
import WebGLVectorLayerRenderer from "ol/renderer/webgl/VectorLayer";
import React from 'react';

const Map1 = ({setMap1Object}) => {

  const map1Container = useRef();

  const style = {
    'stroke-color': [220, 220, 220],
    'stroke-width': 2,
    'stroke-offset': -1,
    'fill-color': [255, 255, 255, 0.6],
  };

  class WebGLLayer extends Layer {
    createRenderer() {
      return new WebGLVectorLayerRenderer(this, {
        style,
      });
    }
  }

  // on component mount create the map and set the map refrences to the state
  useEffect(() => {
    const map1 = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new WebGLLayer({}),
      ],
      view: new View({
        //Coordinate System: WGS 84 / Pseudo-Mercator-EPSG:3857
        center: [8546575.886939, 2137169.681579], // Longitude, Latitude
        zoom: 6
      }),
    });
    
    map1.setTarget(map1Container.current);
    setMap1Object(map1);

    // on component unmount remove the map refrences to avoid unexpected behaviour
    return () => {
      map1.setTarget(undefined);
      setMap1Object(null);
    };
  }, []);

  return (<><div ref={map1Container} className="absolute inset-0"/></>);
};

export default Map1;
