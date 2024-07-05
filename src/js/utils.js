function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function CSSpxToNumber(str) {
  return Number(str.slice(0, -2));
}

function msToTime(ms) {
  let str = " ms";
  str = (ms % 1000) + str;
  if (ms >= 1000) {
    let s = Math.floor(ms / 1000);
    str = (s % 60) + " s " + str;
    if (s >= 60) {
      let min = Math.floor(s / 60);
      str = (min % 60) + " min " + str;
      if (min >= 60) {
        let h = Math.floor(min / 60);
        str = h + " h " + str;
      }
    }
  }

  return str;
}

function scale(n, a, b, c, d) {
  return ((n / (b - a)) * (d - c)) + c;
}

function round(n, dp) {
  return Math.round(n * 10 ** dp) / 10 ** dp;
}
