let cols
let allCols = {
    'x': ["000000", "ffd445", "ecb599", "f9d293", "d3ad6f", "fff7dd", "DE6994"],
    'mondrians': ["fac901", "225095", "dd0100", "ffffff"],
    'firewatch': ["06104c", "731033", "a51826", "d31c22", "e03535", "e57e3e", "f8b55d", "fbcc74", "ffdc85"],
    'wire': ["a0380c", "4a5b83", "ec9f05", "fff"],
    'flowers': ['ffd700', 'ff0000', 'ccccff', '000000', 'ffffff'],
    'mono': ['000000', 'ffffff'],
}

colSubset = ['x', 'mondrians', 'firewatch', 'wire', 'flowers', 'mono']

function setupColors(colSubset) {
    let palette = rnd(colSubset)
    palette = allCols[palette];
    for (let i = 0; i < palette.length; i++)
        palette[i] = '#' + palette[i];
    return palette
}

function permuteColor(c, d) {
    return color(
        red(c) + rnd(-d / 2, d / 2),
        green(c) + rnd(-d / 2, d / 2),
        blue(c) + rnd(-d / 2, d / 2))
}

// %360, 100, 100
function luv(h, s, l) {
    const rgb = hsluv.hsluvToRgb([h % 360, s, l]);
    return color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}

function randomPalette() {
    cols = []
    let h = rnd(360)
    let s = rnd(100)
    let l = rnd(25, 75)
    numCols = 800
    for (let i = 0; i < numCols; i++) {
        let c = luv(h, i / numCols * 100, i / numCols * 100)
        cols.push(c)
    }
}

// https://github.com/hsluv/hsluv/blob/master/javascript/dist/hsluv-0.1.0.min.js
(function () {
    function f(a) { var c = [], b = Math.pow(a + 16, 3) / 1560896; b = b > g ? b : a / k; for (var d = 0; 3 > d;) { var e = d++, h = l[e][0], w = l[e][1]; e = l[e][2]; for (var x = 0; 2 > x;) { var y = x++, z = (632260 * e - 126452 * w) * b + 126452 * y; c.push({ b: (284517 * h - 94839 * e) * b / z, a: ((838422 * e + 769860 * w + 731718 * h) * a * b - 769860 * y * a) / z }) } } return c } function m(a) { a = f(a); for (var c = Infinity, b = 0; b < a.length;) { var d = a[b]; ++b; c = Math.min(c, Math.abs(d.a) / Math.sqrt(Math.pow(d.b, 2) + 1)) } return c }
    function n(a, c) { c = c / 360 * Math.PI * 2; a = f(a); for (var b = Infinity, d = 0; d < a.length;) { var e = a[d]; ++d; e = e.a / (Math.sin(c) - e.b * Math.cos(c)); 0 <= e && (b = Math.min(b, e)) } return b } function p(a, c) { for (var b = 0, d = 0, e = a.length; d < e;) { var h = d++; b += a[h] * c[h] } return b } function q(a) { return .0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, .4166666666666667) - .055 } function r(a) { return .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92 } function t(a) { return [q(p(l[0], a)), q(p(l[1], a)), q(p(l[2], a))] }
    function u(a) { a = [r(a[0]), r(a[1]), r(a[2])]; return [p(v[0], a), p(v[1], a), p(v[2], a)] } function A(a) { var c = a[0], b = a[1]; a = c + 15 * b + 3 * a[2]; 0 != a ? (c = 4 * c / a, a = 9 * b / a) : a = c = NaN; b = b <= g ? b / B * k : 116 * Math.pow(b / B, .3333333333333333) - 16; return 0 == b ? [0, 0, 0] : [b, 13 * b * (c - C), 13 * b * (a - D)] } function E(a) { var c = a[0]; if (0 == c) return [0, 0, 0]; var b = a[1] / (13 * c) + C; a = a[2] / (13 * c) + D; c = 8 >= c ? B * c / k : B * Math.pow((c + 16) / 116, 3); b = 0 - 9 * c * b / ((b - 4) * a - b * a); return [b, c, (9 * c - 15 * a * c - a * b) / (3 * a)] }
    function F(a) { var c = a[0], b = a[1], d = a[2]; a = Math.sqrt(b * b + d * d); 1E-8 > a ? b = 0 : (b = 180 * Math.atan2(d, b) / Math.PI, 0 > b && (b = 360 + b)); return [c, a, b] } function G(a) { var c = a[1], b = a[2] / 360 * 2 * Math.PI; return [a[0], Math.cos(b) * c, Math.sin(b) * c] } function H(a) { var c = a[0], b = a[1]; a = a[2]; if (99.9999999 < a) return [100, 0, c]; if (1E-8 > a) return [0, 0, c]; b = n(a, c) / 100 * b; return [a, b, c] } function I(a) { var c = a[0], b = a[1]; a = a[2]; if (99.9999999 < c) return [a, 0, 100]; if (1E-8 > c) return [a, 0, 0]; var d = n(c, a); return [a, b / d * 100, c] }
    function J(a) { var c = a[0], b = a[1]; a = a[2]; if (99.9999999 < a) return [100, 0, c]; if (1E-8 > a) return [0, 0, c]; b = m(a) / 100 * b; return [a, b, c] } function K(a) { var c = a[0], b = a[1]; a = a[2]; if (99.9999999 < c) return [a, 0, 100]; if (1E-8 > c) return [a, 0, 0]; var d = m(c); return [a, b / d * 100, c] } function L(a) { for (var c = "#", b = 0; 3 > b;) { var d = b++; d = Math.round(255 * a[d]); var e = d % 16; c += M.charAt((d - e) / 16 | 0) + M.charAt(e) } return c }
    function N(a) { a = a.toLowerCase(); for (var c = [], b = 0; 3 > b;) { var d = b++; c.push((16 * M.indexOf(a.charAt(2 * d + 1)) + M.indexOf(a.charAt(2 * d + 2))) / 255) } return c } function O(a) { return t(E(G(a))) } function P(a) { return F(A(u(a))) } function Q(a) { return O(H(a)) } function R(a) { return I(P(a)) } function S(a) { return O(J(a)) } function T(a) { return K(P(a)) }
    var l = [[3.240969941904521, -1.537383177570093, -.498610760293], [-.96924363628087, 1.87596750150772, .041555057407175], [.055630079696993, -.20397695888897, 1.056971514242878]], v = [[.41239079926595, .35758433938387, .18048078840183], [.21263900587151, .71516867876775, .072192315360733], [.019330818715591, .11919477979462, .95053215224966]], B = 1, C = .19783000664283, D = .46831999493879, k = 903.2962962, g = .0088564516, M = "0123456789abcdef";
    window.hsluv = { hsluvToRgb: Q, rgbToHsluv: R, hpluvToRgb: S, rgbToHpluv: T, hsluvToHex: function (a) { return L(Q(a)) }, hexToHsluv: function (a) { return R(N(a)) }, hpluvToHex: function (a) { return L(S(a)) }, hexToHpluv: function (a) { return T(N(a)) }, lchToHpluv: K, hpluvToLch: J, lchToHsluv: I, hsluvToLch: H, lchToLuv: G, luvToLch: F, xyzToLuv: A, luvToXyz: E, xyzToRgb: t, rgbToXyz: u, lchToRgb: O, rgbToLch: P };
})();


//color(t) = b + a ⋅ cos[2π(c⋅t+d)]
class Gradient {
    constructor(
        lightnessOffset = 0.5,
        lightnessRange = 0.5,
        huePeriod = 1,
        hueOffset = 1) {

        this.lO = []
        this.lR = []
        this.hP = []
        this.hO = []

        this.lO.push(lightnessOffset)
        this.lO.push(lightnessOffset)
        this.lO.push(lightnessOffset)

        this.lR.push(lightnessRange)
        this.lR.push(lightnessRange)
        this.lR.push(lightnessRange)

        this.hP.push(rnd(huePeriod))
        this.hP.push(rnd(huePeriod))
        this.hP.push(rnd(huePeriod))

        this.hO.push(rnd(hueOffset))
        this.hO.push(this.hO[this.hO.length - 1] + rnd(-hueOffset, hueOffset))
        this.hO.push(this.hO[this.hO.length - 1] + rnd(-hueOffset, hueOffset))
    }

    at(t) {
        let r = this.lO[0] + this.lR[0] * cos(TAU * (this.hP[0] * t + this.hO[0]))
        let g = this.lO[1] + this.lR[1] * cos(TAU * (this.hP[1] * t + this.hO[1]))
        let b = this.lO[2] + this.lR[2] * cos(TAU * (this.hP[2] * t + this.hO[2]))
        return luv(r * 255, g * 100, b * 100)
    }
}