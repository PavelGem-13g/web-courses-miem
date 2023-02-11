var map = L.map('mapid').setView([55.8034621,37.4077102], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([55.8034302,37.4099802]).addTo(map)
    .bindPopup('МИЭМ')
    .openPopup();