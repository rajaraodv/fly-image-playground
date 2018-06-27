/**
 * List of all parameters for Image API
 */
const API_PARAMS = ["width", "height", "background", "extend", "negate",  "watermarkGravity", "image", "watermarkImage"];

/**
 * API base pathname
 */
const API_BASE = "/api/image/?";

/**
 * Default image that we are using to show different operations
 */
const defaultImage =
  "https://raw.githubusercontent.com/superfly/fly/147f2a327dc76ce6cf10c46b7ea1c19a9d8f2d87/v8env_test/fixtures/picture.jpg";

/**
 * Default overlay image that's used for watermark
 */
const defaultWaterMarkImage =
  "https://raw.githubusercontent.com/superfly/fly/147f2a327dc76ce6cf10c46b7ea1c19a9d8f2d87/v8env_test/fixtures/overlay.png";


/**
 * Constructs URI component If all the values are present and corresponding 
 * toggle's "isOn" toggle is true
 *
 * @param {object} state This is an object(usually a state) with all the new values
 * @param {object} param The API parameter @see API_PARAMS
 * @return {string} a <key>=<value> URIComponent
 */
const getURIComponent = (state, param) => {
  return state[param].value && state[param].isOn
    ? `${createURIComponent(param, state[param].value)}`
    : "";
};

/**
 * Creates and returns a URI component  
 */
const createURIComponent = (param, value) => `${param}=${encodeURIComponent(value)}`

/**
 * Creates a complete URL with all the parameters
 *
 * @param {object} state This is an object(usually a state) with all the new values
 * @return {string} Returns URL string
 */
const buildURL = state => {
  //Loop and create the URI components for each of the parameters
  let url = API_PARAMS.reduce((init, param, index) => {
    const comp = getURIComponent(state, param);
    if (!comp) {
      return init;
    }

    return index < API_PARAMS.length - 1
      ? (init += comp + "&")
      : (init += comp);
  }, API_BASE);

  return url;
};

export { API_PARAMS, buildURL, defaultImage, defaultWaterMarkImage };
