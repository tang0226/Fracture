importScripts(
  "./utils.js",
  "./classes/complex.js",
  "./constants/fractal-types.js",
);


// Basically a copy of getColorAt() from the Gradient class
function applyGradient(grad, pos) {
  let l = grad.points.length;
  
  // Binary search
  let max = l - 1;
  let min = 0;
  while (true) {
    let avg = (min + max) / 2;
    if (pos >= grad.points[Math.floor(avg)].pos) {
      min = Math.floor(avg);
    }
    else if (pos <= grad.points[Math.ceil(avg)].pos) {
      max = Math.ceil(avg);
    }
    if (max - min == 1) {
      return grad.points[min].color.map((c, i) =>
        c + (grad.points[max].color[i] - c) * (
          (pos - grad.points[min].pos) /
          (grad.points[max].pos - grad.points[min].pos)
        )
      );
    }
  }
}


onmessage = function(event) {
  let data = event.data;
  if (data.msg == "draw") {
    let startTime = new Date();
    let lastUpdateTime = new Date();

    let settings = data.settings;

    let complexIter = settings.frame.reWidth / settings.width;

    let fractalType = FRACTAL_TYPES[settings.fractal.type.id];
    let fracParams = settings.fractal.params;

    let iterFunc = fractalType.iterFunc;
    let iterType = fractalType.meta.iterationType;
    
    let iterSettings = {...settings.iterSettings};
    let iters = iterSettings.iters;
    let er = iterSettings.er;
    let sc = iterSettings.sc;
    let scExp = settings.fractal.params.e || 2;

    let ipc = settings.gradientSettings.itersPerCycle

    let currChunk = [];
    let currChunkHeight = 0;
    let currChunkY = 0;

    let i = 0;
    for (let y = 0; y < settings.height; y++) {
      for (let x = 0; x < settings.width; x++) {
        let c = [
          settings.frame.reMin + x * complexIter,
          settings.frame.imMin + y * complexIter
        ];

        let z = iterType == "mandelbrot" ? [0, 0] : [c[0], c[1]];

        let n = 0;
        while (Complex.abs(z) <= er && n < iters) {
          if (iterType == "mandelbrot") {
            z = iterFunc(z, c, fracParams);
          }
          else {
            z = iterFunc(z, fracParams);
          }
          n++;
        }

        if (sc && n != iters) {
          n += 1 - Math.log(Math.log(Complex.abs(z))) / Math.log(scExp);
        }
        

        if (n == iters) {
          currChunk[i] = 0;
          currChunk[i + 1] = 0;
          currChunk[i + 2] = 0;
          currChunk[i + 3] = 255;
        }
        else {
          let col = applyGradient(
            settings.gradient,
            (n % ipc) / ipc
          );
          currChunk[i] = col[0];
          currChunk[i + 1] = col[1];
          currChunk[i + 2] = col[2];
          currChunk[i + 3] = 255;          
        }

        i += 4;
      }

      currChunkHeight++;

      let t = new Date() - lastUpdateTime;
      if (t >= 200 || y == settings.height - 1) {
        postMessage({
          type: "update",
          imgData: new ImageData(
            new Uint8ClampedArray(currChunk),
            settings.width, currChunkHeight
          ),
          x: 0,
          y: currChunkY,
        });
        currChunk = [];
        i = 0;
        currChunkHeight = 0;
        currChunkY = y + 1;
        lastUpdateTime = new Date();
      }

      postMessage({
        type: "progress",
        y: y + 1,
        h: settings.height,
        renderTime: new Date() - startTime,
      });
    }

    postMessage({
      type: "done",
    });
  }
};
