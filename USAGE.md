# Find Doctors & Gynecologists Feature

This feature allows users to find nearby healthcare facilities using OpenStreetMap and Overpass API.

## How to Run

1.  Ensure dependencies are installed:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Navigate to `/find-doctors` or click "Find Doctors" in the navbar.

## Testing

1.  **Geolocation**: Allow location access when prompted. The map should center on your location.
2.  **Fallback**: If location is denied, the map defaults to Pune, India.
3.  **Search**: Drag the map to a new area. A "Search this area" button will appear. Click it to load facilities in the new view.
4.  **Filters**: Toggle facility types (Gynecologist, Hospital, etc.) and change the search radius.
5.  **Interactions**:
    *   Click a marker to see details and highlight the list item.
    *   Click a list item to center the map on the marker.
    *   Click "Get Directions" in the popup to open Google Maps.

## Configuration

*   **Icons**: SVG icons are located in `public/icons/`.
*   **Map Settings**: Cluster behavior and default center can be modified in `src/components/MapComponent.jsx` and `src/pages/FindDoctors.jsx`.
*   **API**: The Overpass API query is defined in `src/utils/overpassApi.js`.
