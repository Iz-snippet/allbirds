// Store page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    let map;
    let markers = [];
    const mapToggle = document.querySelector('.map-toggle');
    const mapContainer = document.getElementById('store-map');
    const storeCards = document.querySelectorAll('.store-card');

    // Initialize Google Maps
    function initMap() {
        // Default center (San Francisco)
        const defaultCenter = { lat: 37.7790, lng: -122.4177 };
        
        map = new google.maps.Map(mapContainer, {
            zoom: 4,
            center: defaultCenter,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#c9c9c9"}]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#9e9e9e"}]
                }
            ]
        });

        // Add markers for all stores
        storeCards.forEach(card => {
            const lat = parseFloat(card.dataset.lat);
            const lng = parseFloat(card.dataset.lng);
            const storeName = card.querySelector('h3').textContent;
            const storeAddress = card.querySelector('.store-address').textContent;

            const marker = new google.maps.Marker({
                position: { lat, lng },
                map: map,
                title: storeName,
                animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="map-info-window">
                        <h3>${storeName}</h3>
                        <p>${storeAddress}</p>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });

            markers.push(marker);
        });
    }

    // Toggle map view
    mapToggle.addEventListener('click', function() {
        const isMapVisible = mapContainer.style.display === 'block';
        
        if (isMapVisible) {
            mapContainer.style.display = 'none';
            mapToggle.innerHTML = '<i class="fas fa-map-marked-alt"></i> Show Map';
        } else {
            mapContainer.style.display = 'block';
            mapToggle.innerHTML = '<i class="fas fa-list"></i> Show List';
            
            // Initialize map if not already initialized
            if (!map) {
                initMap();
            }
            
            // Fit bounds to show all markers
            const bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    function filterStores(searchTerm) {
        const storeCards = document.querySelectorAll('.store-card');
        let hasVisibleStores = false;

        storeCards.forEach(card => {
            const storeName = card.querySelector('h3').textContent.toLowerCase();
            const storeAddress = card.querySelector('.store-address').textContent.toLowerCase();
            const searchTermLower = searchTerm.toLowerCase();

            if (storeName.includes(searchTermLower) || storeAddress.includes(searchTermLower)) {
                card.style.display = 'block';
                hasVisibleStores = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide region headers based on visible stores
        document.querySelectorAll('.store-region').forEach(region => {
            const visibleCards = region.querySelectorAll('.store-card[style="display: block"]');
            region.style.display = visibleCards.length > 0 ? 'block' : 'none';
        });

        // Show message if no stores found
        const noResultsMessage = document.querySelector('.no-results-message');
        if (!hasVisibleStores) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.textContent = 'No stores found matching your search.';
                document.querySelector('.store-grid').appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    searchButton.addEventListener('click', () => {
        filterStores(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterStores(searchInput.value);
        }
    });

    // Add animation order to store cards
    storeCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index + 1);
    });

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    storeCards.forEach(card => observer.observe(card));
}); 