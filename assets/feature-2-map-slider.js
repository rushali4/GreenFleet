let map;
let markers = [];
const locations = [
  { lat: -34.2923902, lng: 149.7934873, city: 'Canberra' },
  { lat: -35.282, lng: 149.128, city: 'Canberra' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, city: 'Melbourne' },
  { lat: -27.4698, lng: 153.0251, city: 'Brisbane' },
  { lat: -31.9505, lng: 115.8605, city: 'Perth' },
  { lat: -12.4634, lng: 130.8456, city: 'Darwin' }
];

// Replace with the URL of your tree icon
const treeIconUrl = 'https://example.com/path/to/tree-icon.png';

// Fixed icon size
const fixedIconSize = 32;

// Define map styles
const defaultMapStyle = []; // Add your default map style if needed
const desaturatedYellowStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfdfd"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c6c6c6"
      }
    ]
  }
];

async function initMap() {
  const position = { lat: -23.116322976956745, lng: 132.13340905289155 }; // Central Australia
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID", // Use your actual map ID or remove if not used
    styles: defaultMapStyle // Apply the default style initially
  });

  setupToggle(); // Initialize the toggle after the map is ready
}

function setupToggle() {
  const toggle = document.getElementById('toggleMarkers');
  const toggleLabel = document.querySelector('.toggle-label');

  if (!toggle || !toggleLabel) {
    console.error('Toggle switch or label not found!');
    return;
  }

  // Update the toggle label text based on the toggle state
  function updateToggleLabel() {
    if (toggle.checked) {
      toggleLabel.textContent = 'Hide Forests'; // Text when checked
      map.setOptions({ styles: defaultMapStyle }); // Set default style
    } else {
      toggleLabel.textContent = 'Show Forests'; // Text when unchecked
      map.setOptions({ styles: desaturatedYellowStyle }); // Apply desaturated yellow style
    }
  }

  // Initialize label text
  updateToggleLabel();

  // Update label text when toggle state changes
  toggle.addEventListener('change', updateToggleLabel);

  // Handle markers visibility
  toggle.addEventListener('change', () => {
    const visible = toggle.checked;
    console.log('Toggle state:', visible); // Debugging line

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (visible) {
      // Recreate and add markers with fixed icon size
      markers = locations.map(location => {
        return new google.maps.Marker({
          map: map,
          position: { lat: location.lat, lng: location.lng },
          title: location.city,
          icon: {
            url: treeIconUrl, // Use the custom icon
            scaledSize: new google.maps.Size(fixedIconSize, fixedIconSize) // Fixed size for icons
          }
        });
      });
    }
  });
}

// Initialize the map when the window loads
window.initMap = initMap;
window.addEventListener('load', initMap);
