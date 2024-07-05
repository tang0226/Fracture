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

  multiship: {
    id: "multiship",
    meta: {
      iterationType: "mandelbrot",
      reqExponent: true,
      juliaEquivalent: "multishipJulia",
    },
    iterFunc: function(z, c, params) {
      return Complex.add(
        Complex.exp(
          [Math.abs(z[0]), Math.abs(z[1])],
          params.e
        ), c
      );
    }
  },

  multishipJulia: {
    id: "multishipJulia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      reqExponent: true,
      mandelEquivalent: "multiship",
    },
    iterFunc: function(z, params) {
      return Complex.add(
        Complex.exp(
          [Math.abs(z[0]), Math.abs(z[1])],
          params.e
        ), params.c
      );
    }
  },

  tricorn: {
    id: "tricorn",
    meta: {
      iterationType: "mandelbrot",
      juliaEquivalent: "tricornJulia",
    },
    iterFunc: function(z, c, _params) {
      return [
        z[0] * z[0] - z[1] * z[1] + c[0],
        -2 * z[0] * z[1] + c[1],
      ];
    },
  },

  tricornJulia: {
    id: "tricornJulia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      mandelEquivalent: "tricorn",
    },
    iterFunc: function(z, params) {
      return [
        z[0] * z[0] - z[1] * z[1] + params.c[0],
        -2 * z[0] * z[1] + params.c[1],
      ];
    },
  },

  multicorn: {
    id: "multicorn",
    meta: {
      iterationType: "mandelbrot",
      reqExponent: true,
      juliaEquivalent: "multicornJulia",
    },
    iterFunc: function(z, c, params) {
      return Complex.add(
        Complex.exp(
          [z[0], -z[1]],
          params.e
        ), c
      );
    }
  },

  multicornJulia: {
    id: "multicornJulia",
    meta: {
      iterationType: "julia",
      reqJuliaConst: true,
      reqExponent: true,
      mandelEquivalent: "multicorn",
    },
    iterFunc: function(z, params) {
      return Complex.add(
        Complex.exp(
          [z[0], -z[1]],
          params.e
        ), params.c
      );
    }
  },
};
