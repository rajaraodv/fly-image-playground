import mime from 'mime-types';

/**
 * This file is responsible for dealing with static files and making sure the paths are correct
 */

/**
 * The base folder where the client library is located.
 * Note: This is relative to the main server folder. By default it's at `client/build`
 */
const STATIC_FILES_BASE_FOLDER =
  app.config.STATIC_FILES_BASE_FOLDER || "client/build";

/**
 * Process and respond to static file requests
 *
 * @param {string} url The file's url path
 * @return HTTP response
 */
async function staticFile(url) {
  try {
    const filePath = getFilePath(getPath(url));
    const file = await fetch(filePath);
    const text = await file.text();
    return createFileResponseSuccess(text, filePath);
  } catch (e) {
    console.log('============= ERROR ================', e);
    return createResponseFail(e);
  }
}

/**
 * Creates HTTP response for when something bad happens
 *
 * @param e Exception
 */
function createResponseFail(e) {
  return new Response(
    {
      error: "Something went wrong: " + e.messge
    },
    {
      status: 500
    }
  );
}

/**
 * Creates HTTP response for static file request when success happens
 *
 * @param {string} text  Response text (could be html, js, img, etc.)
 * @param {string} [filePath]   The file's path to identify the mime's content-type
 */
function createFileResponseSuccess(text, filePath) {
  const resp = new Response(text, {
    status: 200
  });
  resp.headers.set("content-type", mime.lookup(filePath) || "text/plain");
  return resp;
}

/**
 *  Extracts URL path after the domain name from an URL string
 *
 * @param {String} url  A URL from the request
 * @return {String} just the url path after the domain name and slash.
 */
const getPath = url => {
  //get pathname from URL object and remove the first '/'
  let path = new URL(url).pathname.slice(1);
  return path === "" ? "index.html" : path;
};

/**
 * Prepends static file path to the URL path so that we can serve static files
 *
 * @param  {string} urlPath The static file path from the URL
 * @return {String} Creates a source path
 */
const getFilePath = urlPath => `file://${STATIC_FILES_BASE_FOLDER}/${urlPath}`;

export default staticFile;
