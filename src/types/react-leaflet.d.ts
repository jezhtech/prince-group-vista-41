import { ReactNode } from 'react';
import { LatLngExpression, Icon, Map as LeafletMap, Marker as LeafletMarker, TileLayer as LeafletTileLayer } from 'leaflet';

declare module 'react-leaflet' {
  export interface MapContainerProps {
    center: LatLngExpression;
    zoom: number;
    children?: ReactNode;
    style?: React.CSSProperties;
    scrollWheelZoom?: boolean;
    className?: string;
    zoomControl?: boolean;
  }

  export interface TileLayerProps {
    attribution?: string;
    url: string;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon;
    children?: ReactNode;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: React.FC<MapContainerProps & React.RefAttributes<LeafletMap>>;
  export const TileLayer: React.FC<TileLayerProps & React.RefAttributes<LeafletTileLayer>>;
  export const Marker: React.FC<MarkerProps & React.RefAttributes<LeafletMarker<any>>>;
  export const Popup: React.FC<PopupProps>;
} 