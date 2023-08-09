import React, { useEffect, useState } from 'react';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const mapboxToken =
	'pk.eyJ1IjoiZGpoZXN0IiwiYSI6ImNsbDNpM2xyNTA0a3MzZW1jOXBxb3g2amkifQ.qz9ZHVYASWPzJ0uiwwHDOg';

const LocationPicker = () => {
	useEffect(() => {
		mapboxgl.accessToken = mapboxToken || '';
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: [-74.5, 40], // starting position
			zoom: 9, // starting zoom
		});
        console.log(map)
	}, []);
	return (
		<div className='flex justify-center items-center fixed top-0 left-0 bg-black bg-opacity-70 w-full min-h-screen'>
            <div className='flex w-1/2 h-full bg-white rounded-2xl p-8'>

			<div id='map' className=' w-full h-full'></div>
            </div>
        </div>
		
	);
};

export default LocationPicker;
