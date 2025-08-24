// Wait for the image to be created and loaded
function waitForImage() {
    var img = document.getElementById("image");
    if (img) {
        // Image exists, set up the onload handler
        if (img.complete) {
            // Image already loaded, process it immediately
            processImage(img);
        } else {
            // Image not loaded yet, wait for it
            img.onload = function() {
                processImage(img);
            };
        }
    } else {
        // Image doesn't exist yet, wait a bit and try again
        setTimeout(waitForImage, 100);
    }
}

function processImage(img) {
    // Create a canvas element
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    // Set the canvas size to the size of the image
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0);
    // Get the image data
    var imageData = ctx.getImageData(0, 0, img.width, img.height);
    var data = imageData.data;
    // Count the number of occurrences of each color
    var colorCounts = {};
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var alpha = data[i + 3];
        // Skip transparent pixels
        if (alpha === 0) {
            continue;
        }
        var color = "rgb(" + red + ", " + green + ", " + blue + ")";
        if (colorCounts[color]) {
            colorCounts[color]++;
        } else {
            colorCounts[color] = 1;
        }
    }
    // Find the most prevalent color
    var maxColor = null;
    var maxCount = 0;
    for (var color in colorCounts) {
        if (colorCounts[color] > maxCount) {
            maxColor = color;
            maxCount = colorCounts[color];
        }
    }
    // Change the background color of the page to the most prevalent color
    document.body.style.backgroundColor = maxColor;
    console.log(maxColor);

    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    const backgroundColor = maxColor;

    if (isDark(backgroundColor)) {
        console.log(backgroundColor);
        body.style.color = "white";
        document.getElementById("Dear").style.borderColor = maxColor;
        document.getElementById("Header").style.color = maxColor;
    } else {
        body.style.color = shadeBlend(backgroundColor, 'rgb(0, 0, 0)', .4 );
        document.getElementById("Dear").style.borderColor = shadeBlend(backgroundColor, 'rgb(0, 0, 0)', .4);
        document.getElementById("Header").style.color = shadeBlend(backgroundColor, 'rgb(0, 0, 0)', .4);
    }
}

function isDark(color) {
    // convert color string to RGB values
    const colorArray = color.match(/\d+/g).map(Number);
    const [r, g, b] = colorArray;

    // use the relative luminance formula to determine if the color is dark
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    console.log("Lum:" + luminance);
    return luminance < 180;
}

function shadeBlend(color1, color2, percentage) {
    // Convert RGB strings to arrays
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    // Blend the colors
    let blended = color1.map((c, i) => (1 - percentage) * c + percentage * color2[i]);

    // Convert the blended color back to an RGB string
    return `rgb(${blended.join(',')})`;
}

// Start waiting for the image when the script loads
waitForImage();


