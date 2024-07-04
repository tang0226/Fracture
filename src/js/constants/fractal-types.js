const FRACTAL_TYPES = {
  mandelbrot: {
    id: "mandelbrot",
    meta: {
      iterationType: "mandelbrot",
      juilaEquivalent: "julia",
    },
    iterFunc: function(z, c, _params) {
      return [
        z[0] * z[0] - z[1] * z[1] + c[0],
        2 * z[0] * z[1] + c[1]
      ];
    },
  },

  julia: {
    id: "julia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      mandelEquivalent: "mandelbrot",
    },
    iterFunc: function(z, params) {
      return [
        z[0] * z[0] - z[1] * z[1] + params.c[0],
        2 * z[0] * z[1] + params.c[1]
      ];
    },
  },

  multibrot: {
    id: "multibrot",
    meta: {
      iterationType: "mandelbrot",
      reqExponent: true,
      juliaEquivalent: "multijulia",
    },
    iterFunc: function(z, c, params) {
      return Complex.add(
        Complex.exp(z, params.e),
        c,
      )
    }
  },

  multijulia: {
    id: "multijulia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      reqExponent: true,
      mandelEquivalent: "multibrot",
    },
    iterFunc: function(z, params) {
      return Complex.add(
        Complex.exp(z, params.e),
        params.c
      );
    }
  },

  burningShip: {
    id: "burningShip",
    meta: {
      iterationType: "mandelbrot",
      juliaEquivalent: "burningShipJulia",
    },
    iterFunc: function(z, c, _params) {
      return [
        z[0] * z[0] - z[1] * z[1] + c[0],
        Math.abs(2 * z[0] * z[1]) + c[1]
      ];
    },
  },

  burningShipJulia: {
    id: "burningShipJulia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      mandelEquivalent: "burningShip",
    },
    iterFunc: function(z, params) {
      return [
        z[0] * z[0] - z[1] * z[1] + params.c[0],
        Math.abs(2 * z[0] * z[1]) + params.c[1]
      ];
    },
  },
};
