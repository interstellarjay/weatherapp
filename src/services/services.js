
import axios from "axios";
/* API helper */
export function getAPIPath(staticAsset) {
    if (staticAsset) {
        return `https://www.metaweather.com/static/`;
    }
    return `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/`;
}
export function getTestAPIPath() {
    return `https://www.metaweather.com/api/`;
}
/* Calculate the background color dynamically */
export function calculateBGColor(degrees) {
    let red;
    let blue;
    let green;
    // Formulae to convert colors from degrees
    red = 25.5 * degrees;
    blue = 1 + (25.5 * degrees * -1);   // Correct blue for negative values
    // Correct green values on scale
    green = (255 + ((4.669 - degrees) * ((1/6.828)*(1+degrees))));
    // Red / Blue / Green ruleset
    if (degrees > 0) {
        blue = 0;
    }
    if (degrees < 1) {
        red = 0;
        green = 255;
    }
    // Ceiling for values
    if (blue > 255) {
        blue = 255;
    }
    if (green > 255) {
        green = 255;
    }
    if (red > 255) {
        red = 255;
    }
    // Floor for values
    if (blue < 0) {
        blue = 0;
    }
    if (green < 0) {
        green = 0;
    }
    if (red < 0) {
        red = 0;
    }
    // Parse result to zero decimal places
    red = red.toFixed(0);
    green = green.toFixed(0);
    blue = blue.toFixed(0);
    return `rgb(${red}, ${green}, ${blue})`;
}
/* Fetch the data from the endpoint */
export async function fetchData(request, options) {
    let response;
    // Config headers
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    response = await axios.get(request, options)
    return response;
}

