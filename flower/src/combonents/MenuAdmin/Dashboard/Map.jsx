import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 10.8231,
    lng: 106.6297
};

const Map = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyCYJO-NUXdNPs7bInKScmdDZitdfnc60eY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {/* Bất kỳ dấu hiệu hoặc thành phần bản đồ khác */}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
