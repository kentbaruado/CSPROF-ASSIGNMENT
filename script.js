const {createClient} = supabase
const supabaseUrl = 'https://mnkwqjnscymdemdtjrjz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ua3dxam5zY3ltZGVtZHRqcmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NjU2ODksImV4cCI6MjA4NzU0MTY4OX0.kZOZFqpEk_SaIiY7g5VcKhAMnysmRITfaQbdMiT62g4'

const supabases = createClient(supabaseUrl, supabaseAnonKey);

// 1. Create the map
var map = L.map('map').setView([8.227169669237417, 124.25569135837566], 14); // Centered on Manila

// 2. Add the base map (tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

async function getLocations() {
    const { data, error } = await supabases.from('Locations').select('*');

    if (error) {
        console.error(error);
    } else {
        console.log("Locations:", data);
        displayLocationsOnMap(data);
    }
}

function displayLocationsOnMap(locations) {
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.long])
            .bindPopup(`<b>${location.name}</b><br>${location.description || 'No description'}`)
            .addTo(map);
    });
}

getLocations();