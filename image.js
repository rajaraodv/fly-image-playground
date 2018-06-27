import { Image } from "@fly/image";

async function manipulateImage(rawURL) {
    try {
        const url = new URL(rawURL);
        const width = url.searchParams.get("width");
        const height = url.searchParams.get("height");
        const background = url.searchParams.get("background");
        const extend = url.searchParams.get("extend"); //Note: Use, background and extend together in order to add border
        const image = url.searchParams.get("image");
        const watermarkImage = url.searchParams.get("watermarkImage");
        const watermarkGravity = url.searchParams.get("watermarkGravity");
        const negate = url.searchParams.get("negate");
    
        /**
         * Check required params
         */
        if (!image || !width || !height) {
          return new Response(
            {
              messsage: "Missing required params. Either image or width or height"
            },
            { status: 400 }
          );
        }
    
        /**
         * If watermarkImage is present, then watermarkGravity should also be present
         */
        if (watermarkImage && !watermarkGravity) {
          return new Response(
            {
              messsage:
                "Missing required params. If watermarkImage is present, then watermarkGravity should also be present"
            },
            { status: 400 }
          );
        }
    
        /**
         * Load the main image and watermark image files.
         */
        let imageFile, watermarkFile;
        if (image && watermarkImage) {
          [imageFile, watermarkFile] = await Promise.all([
            loadImage(image),
            loadImage(watermarkImage)
          ]);
        } else {
          imageFile = await loadImage(image);
        }
    
        /**
         * Resize
         */
        imageFile = imageFile.resize(parseInt(width), parseInt(height));
    
        /**
         * Add border to the image by extending the file's borders
         */
        imageFile = extend ? imageFile.extend(parseInt(extend)) : imageFile;
        imageFile = background ? imageFile.background(background) : imageFile;
    
        /**
         * Apply watermark
         */
        if (imageFile && watermarkFile) {
          const meta = imageFile.metadata();
          const padPct = 0.1;
          const padding = {
            top: parseInt(meta.height * padPct),
            bottom: parseInt(meta.height * padPct),
            left: parseInt(meta.width * padPct),
            right: parseInt(meta.width * padPct)
          };
    
          imageFile.overlayWith(watermarkFile, {
            gravity: getGravity(watermarkGravity)
          });
        }
    
        /**
         * Create a negative image if necessary
         */
        imageFile = negate ? imageFile.negate() : imageFile;
    
        /**
         * Convert imageFile to buffer and return it's data
         */
        const body = await imageFile.toBuffer();
        return new Response(body.data);
      } catch (e) {
        console.log('============= ERROR ================', e);
        return new Response(e, { status: 500 });
      }
}

async function loadImage(url) {
    const resp = await fetch(url);
    if (resp.status != 200) {
      throw new Error("Couldn't load image: " + url);
    }
  
    const body = await resp.arrayBuffer();
  
    return new Image(body);
  }
  
  /**
   * Returns Image API's gravity value for strings like "southeast", "southwest" etc.
   *
   * @param {string}  gravityStr One of gravity string
   */
  function getGravity(gravityStr) {
    switch (gravityStr) {
      case "center":
        return Image.gravity.center;
      case "north":
        return Image.gravity.north;
      case "south":
        return Image.gravity.south;
      case "east":
        return Image.gravity.east;
      case "west":
        return Image.gravity.west;
      case "southeast":
        return Image.gravity.southeast;
      case "southwest":
        return Image.gravity.southwest;
      case "northeast":
        return Image.gravity.northeast;
      case "northwest":
        return Image.gravity.northwest;
      default:
        return Image.gravity.northwest;
    }
  }
  

export default manipulateImage;