import manipulateImage from "./image.js";
import staticFile from "./staticFile";

fly.http.respondWith(async function({ url }) {
  return url.indexOf("/api/image") >= 0
    ? manipulateImage(url)
    : staticFile(url);
});
