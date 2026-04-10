(() => {
  var e = {};
  ((e.id = 144),
    (e.ids = [144]),
    (e.modules = {
      846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      9121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      9294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      3033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      3873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      9551: (e) => {
        "use strict";
        e.exports = require("url");
      },
      8154: (e, t, r) => {
        "use strict";
        (r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => c,
            pages: () => u,
            routeModule: () => m,
            tree: () => d,
          }));
        var s = r(260),
          n = r(8203),
          o = r(5155),
          i = r.n(o),
          a = r(7292),
          l = {};
        for (let e in a)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (l[e] = () => a[e]);
        r.d(t, l);
        let d = [
            "",
            {
              children: [
                "request",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(r.bind(r, 439)),
                        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/request/page.tsx",
                      ],
                    },
                  ],
                },
                {
                  metadata: {
                    icon: [
                      async (e) =>
                        (await Promise.resolve().then(r.bind(r, 440))).default(
                          e,
                        ),
                    ],
                    apple: [],
                    openGraph: [],
                    twitter: [],
                    manifest: void 0,
                  },
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(r.bind(r, 1354)),
                "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(r.t.bind(r, 9937, 23)),
                "next/dist/client/components/not-found-error",
              ],
              forbidden: [
                () => Promise.resolve().then(r.t.bind(r, 9116, 23)),
                "next/dist/client/components/forbidden-error",
              ],
              unauthorized: [
                () => Promise.resolve().then(r.t.bind(r, 1485, 23)),
                "next/dist/client/components/unauthorized-error",
              ],
              metadata: {
                icon: [
                  async (e) =>
                    (await Promise.resolve().then(r.bind(r, 440))).default(e),
                ],
                apple: [],
                openGraph: [],
                twitter: [],
                manifest: void 0,
              },
            },
          ],
          u = [
            "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/request/page.tsx",
          ],
          c = { require: r, loadChunk: () => Promise.resolve() },
          m = new s.AppPageRouteModule({
            definition: {
              kind: n.RouteKind.APP_PAGE,
              page: "/request/page",
              pathname: "/request",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      1221: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 439));
      },
      4373: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 1364));
      },
      1364: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => B }));
        var s,
          n = r(5512),
          o = r(1914),
          i = r(5357),
          a = r(6235),
          l = r(3468);
        let d = (0, l.A)("Copy", [
            [
              "rect",
              {
                width: "14",
                height: "14",
                x: "8",
                y: "8",
                rx: "2",
                ry: "2",
                key: "17jyea",
              },
            ],
            [
              "path",
              {
                d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
                key: "zix9uf",
              },
            ],
          ]),
          u = (0, l.A)("Share2", [
            ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
            ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
            ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
            [
              "line",
              {
                x1: "8.59",
                x2: "15.42",
                y1: "13.51",
                y2: "17.49",
                key: "47mynk",
              },
            ],
            [
              "line",
              {
                x1: "15.41",
                x2: "8.59",
                y1: "6.51",
                y2: "10.49",
                key: "1n3mei",
              },
            ],
          ]),
          c = (0, l.A)("RefreshCw", [
            [
              "path",
              {
                d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
                key: "v9h5vc",
              },
            ],
            ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
            [
              "path",
              {
                d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
                key: "3uifl3",
              },
            ],
            ["path", { d: "M8 16H3v5", key: "1cv678" }],
          ]);
        var m = r(8009),
          h = Object.defineProperty,
          f = Object.getOwnPropertySymbols,
          p = Object.prototype.hasOwnProperty,
          g = Object.prototype.propertyIsEnumerable,
          x = (e, t, r) =>
            t in e
              ? h(e, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: r,
                })
              : (e[t] = r),
          y = (e, t) => {
            for (var r in t || (t = {})) p.call(t, r) && x(e, r, t[r]);
            if (f) for (var r of f(t)) g.call(t, r) && x(e, r, t[r]);
            return e;
          },
          b = (e, t) => {
            var r = {};
            for (var s in e) p.call(e, s) && 0 > t.indexOf(s) && (r[s] = e[s]);
            if (null != e && f)
              for (var s of f(e))
                0 > t.indexOf(s) && g.call(e, s) && (r[s] = e[s]);
            return r;
          };
        (((e) => {
          let t = class t {
            constructor(e, r, s, o) {
              if (
                ((this.version = e),
                (this.errorCorrectionLevel = r),
                (this.modules = []),
                (this.isFunction = []),
                e < t.MIN_VERSION || e > t.MAX_VERSION)
              )
                throw RangeError("Version value out of range");
              if (o < -1 || o > 7) throw RangeError("Mask value out of range");
              this.size = 4 * e + 17;
              let i = [];
              for (let e = 0; e < this.size; e++) i.push(!1);
              for (let e = 0; e < this.size; e++)
                (this.modules.push(i.slice()), this.isFunction.push(i.slice()));
              this.drawFunctionPatterns();
              let a = this.addEccAndInterleave(s);
              if ((this.drawCodewords(a), -1 == o)) {
                let e = 1e9;
                for (let t = 0; t < 8; t++) {
                  (this.applyMask(t), this.drawFormatBits(t));
                  let r = this.getPenaltyScore();
                  (r < e && ((o = t), (e = r)), this.applyMask(t));
                }
              }
              (n(0 <= o && o <= 7),
                (this.mask = o),
                this.applyMask(o),
                this.drawFormatBits(o),
                (this.isFunction = []));
            }
            static encodeText(r, s) {
              let n = e.QrSegment.makeSegments(r);
              return t.encodeSegments(n, s);
            }
            static encodeBinary(r, s) {
              let n = e.QrSegment.makeBytes(r);
              return t.encodeSegments([n], s);
            }
            static encodeSegments(e, s, o = 1, a = 40, l = -1, d = !0) {
              let u, c;
              if (
                !(t.MIN_VERSION <= o && o <= a && a <= t.MAX_VERSION) ||
                l < -1 ||
                l > 7
              )
                throw RangeError("Invalid value");
              for (u = o; ; u++) {
                let r = 8 * t.getNumDataCodewords(u, s),
                  n = i.getTotalBits(e, u);
                if (n <= r) {
                  c = n;
                  break;
                }
                if (u >= a) throw RangeError("Data too long");
              }
              for (let e of [t.Ecc.MEDIUM, t.Ecc.QUARTILE, t.Ecc.HIGH])
                d && c <= 8 * t.getNumDataCodewords(u, e) && (s = e);
              let m = [];
              for (let t of e)
                for (let e of (r(t.mode.modeBits, 4, m),
                r(t.numChars, t.mode.numCharCountBits(u), m),
                t.getData()))
                  m.push(e);
              n(m.length == c);
              let h = 8 * t.getNumDataCodewords(u, s);
              (n(m.length <= h),
                r(0, Math.min(4, h - m.length), m),
                r(0, (8 - (m.length % 8)) % 8, m),
                n(m.length % 8 == 0));
              for (let e = 236; m.length < h; e ^= 253) r(e, 8, m);
              let f = [];
              for (; 8 * f.length < m.length; ) f.push(0);
              return (
                m.forEach((e, t) => (f[t >>> 3] |= e << (7 - (7 & t)))),
                new t(u, s, f, l)
              );
            }
            getModule(e, t) {
              return (
                0 <= e &&
                e < this.size &&
                0 <= t &&
                t < this.size &&
                this.modules[t][e]
              );
            }
            getModules() {
              return this.modules;
            }
            drawFunctionPatterns() {
              for (let e = 0; e < this.size; e++)
                (this.setFunctionModule(6, e, e % 2 == 0),
                  this.setFunctionModule(e, 6, e % 2 == 0));
              (this.drawFinderPattern(3, 3),
                this.drawFinderPattern(this.size - 4, 3),
                this.drawFinderPattern(3, this.size - 4));
              let e = this.getAlignmentPatternPositions(),
                t = e.length;
              for (let r = 0; r < t; r++)
                for (let s = 0; s < t; s++)
                  (0 == r && 0 == s) ||
                    (0 == r && s == t - 1) ||
                    (r == t - 1 && 0 == s) ||
                    this.drawAlignmentPattern(e[r], e[s]);
              (this.drawFormatBits(0), this.drawVersion());
            }
            drawFormatBits(e) {
              let t = (this.errorCorrectionLevel.formatBits << 3) | e,
                r = t;
              for (let e = 0; e < 10; e++) r = (r << 1) ^ ((r >>> 9) * 1335);
              let o = ((t << 10) | r) ^ 21522;
              n(o >>> 15 == 0);
              for (let e = 0; e <= 5; e++)
                this.setFunctionModule(8, e, s(o, e));
              (this.setFunctionModule(8, 7, s(o, 6)),
                this.setFunctionModule(8, 8, s(o, 7)),
                this.setFunctionModule(7, 8, s(o, 8)));
              for (let e = 9; e < 15; e++)
                this.setFunctionModule(14 - e, 8, s(o, e));
              for (let e = 0; e < 8; e++)
                this.setFunctionModule(this.size - 1 - e, 8, s(o, e));
              for (let e = 8; e < 15; e++)
                this.setFunctionModule(8, this.size - 15 + e, s(o, e));
              this.setFunctionModule(8, this.size - 8, !0);
            }
            drawVersion() {
              if (this.version < 7) return;
              let e = this.version;
              for (let t = 0; t < 12; t++) e = (e << 1) ^ ((e >>> 11) * 7973);
              let t = (this.version << 12) | e;
              n(t >>> 18 == 0);
              for (let e = 0; e < 18; e++) {
                let r = s(t, e),
                  n = this.size - 11 + (e % 3),
                  o = Math.floor(e / 3);
                (this.setFunctionModule(n, o, r),
                  this.setFunctionModule(o, n, r));
              }
            }
            drawFinderPattern(e, t) {
              for (let r = -4; r <= 4; r++)
                for (let s = -4; s <= 4; s++) {
                  let n = Math.max(Math.abs(s), Math.abs(r)),
                    o = e + s,
                    i = t + r;
                  0 <= o &&
                    o < this.size &&
                    0 <= i &&
                    i < this.size &&
                    this.setFunctionModule(o, i, 2 != n && 4 != n);
                }
            }
            drawAlignmentPattern(e, t) {
              for (let r = -2; r <= 2; r++)
                for (let s = -2; s <= 2; s++)
                  this.setFunctionModule(
                    e + s,
                    t + r,
                    1 != Math.max(Math.abs(s), Math.abs(r)),
                  );
            }
            setFunctionModule(e, t, r) {
              ((this.modules[t][e] = r), (this.isFunction[t][e] = !0));
            }
            addEccAndInterleave(e) {
              let r = this.version,
                s = this.errorCorrectionLevel;
              if (e.length != t.getNumDataCodewords(r, s))
                throw RangeError("Invalid argument");
              let o = t.NUM_ERROR_CORRECTION_BLOCKS[s.ordinal][r],
                i = t.ECC_CODEWORDS_PER_BLOCK[s.ordinal][r],
                a = Math.floor(t.getNumRawDataModules(r) / 8),
                l = o - (a % o),
                d = Math.floor(a / o),
                u = [],
                c = t.reedSolomonComputeDivisor(i);
              for (let r = 0, s = 0; r < o; r++) {
                let n = e.slice(s, s + d - i + (r < l ? 0 : 1));
                s += n.length;
                let o = t.reedSolomonComputeRemainder(n, c);
                (r < l && n.push(0), u.push(n.concat(o)));
              }
              let m = [];
              for (let e = 0; e < u[0].length; e++)
                u.forEach((t, r) => {
                  (e != d - i || r >= l) && m.push(t[e]);
                });
              return (n(m.length == a), m);
            }
            drawCodewords(e) {
              if (
                e.length != Math.floor(t.getNumRawDataModules(this.version) / 8)
              )
                throw RangeError("Invalid argument");
              let r = 0;
              for (let t = this.size - 1; t >= 1; t -= 2) {
                6 == t && (t = 5);
                for (let n = 0; n < this.size; n++)
                  for (let o = 0; o < 2; o++) {
                    let i = t - o,
                      a = ((t + 1) & 2) == 0 ? this.size - 1 - n : n;
                    !this.isFunction[a][i] &&
                      r < 8 * e.length &&
                      ((this.modules[a][i] = s(e[r >>> 3], 7 - (7 & r))), r++);
                  }
              }
              n(r == 8 * e.length);
            }
            applyMask(e) {
              if (e < 0 || e > 7) throw RangeError("Mask value out of range");
              for (let t = 0; t < this.size; t++)
                for (let r = 0; r < this.size; r++) {
                  let s;
                  switch (e) {
                    case 0:
                      s = (r + t) % 2 == 0;
                      break;
                    case 1:
                      s = t % 2 == 0;
                      break;
                    case 2:
                      s = r % 3 == 0;
                      break;
                    case 3:
                      s = (r + t) % 3 == 0;
                      break;
                    case 4:
                      s = (Math.floor(r / 3) + Math.floor(t / 2)) % 2 == 0;
                      break;
                    case 5:
                      s = ((r * t) % 2) + ((r * t) % 3) == 0;
                      break;
                    case 6:
                      s = (((r * t) % 2) + ((r * t) % 3)) % 2 == 0;
                      break;
                    case 7:
                      s = (((r + t) % 2) + ((r * t) % 3)) % 2 == 0;
                      break;
                    default:
                      throw Error("Unreachable");
                  }
                  !this.isFunction[t][r] &&
                    s &&
                    (this.modules[t][r] = !this.modules[t][r]);
                }
            }
            getPenaltyScore() {
              let e = 0;
              for (let r = 0; r < this.size; r++) {
                let s = !1,
                  n = 0,
                  o = [0, 0, 0, 0, 0, 0, 0];
                for (let i = 0; i < this.size; i++)
                  this.modules[r][i] == s
                    ? 5 == ++n
                      ? (e += t.PENALTY_N1)
                      : n > 5 && e++
                    : (this.finderPenaltyAddHistory(n, o),
                      s ||
                        (e +=
                          this.finderPenaltyCountPatterns(o) * t.PENALTY_N3),
                      (s = this.modules[r][i]),
                      (n = 1));
                e +=
                  this.finderPenaltyTerminateAndCount(s, n, o) * t.PENALTY_N3;
              }
              for (let r = 0; r < this.size; r++) {
                let s = !1,
                  n = 0,
                  o = [0, 0, 0, 0, 0, 0, 0];
                for (let i = 0; i < this.size; i++)
                  this.modules[i][r] == s
                    ? 5 == ++n
                      ? (e += t.PENALTY_N1)
                      : n > 5 && e++
                    : (this.finderPenaltyAddHistory(n, o),
                      s ||
                        (e +=
                          this.finderPenaltyCountPatterns(o) * t.PENALTY_N3),
                      (s = this.modules[i][r]),
                      (n = 1));
                e +=
                  this.finderPenaltyTerminateAndCount(s, n, o) * t.PENALTY_N3;
              }
              for (let r = 0; r < this.size - 1; r++)
                for (let s = 0; s < this.size - 1; s++) {
                  let n = this.modules[r][s];
                  n == this.modules[r][s + 1] &&
                    n == this.modules[r + 1][s] &&
                    n == this.modules[r + 1][s + 1] &&
                    (e += t.PENALTY_N2);
                }
              let r = 0;
              for (let e of this.modules)
                r = e.reduce((e, t) => e + (t ? 1 : 0), r);
              let s = this.size * this.size,
                o = Math.ceil(Math.abs(20 * r - 10 * s) / s) - 1;
              return (
                n(0 <= o && o <= 9),
                n(0 <= (e += o * t.PENALTY_N4) && e <= 2568888),
                e
              );
            }
            getAlignmentPatternPositions() {
              if (1 == this.version) return [];
              {
                let e = Math.floor(this.version / 7) + 2,
                  t =
                    32 == this.version
                      ? 26
                      : 2 * Math.ceil((4 * this.version + 4) / (2 * e - 2)),
                  r = [6];
                for (let s = this.size - 7; r.length < e; s -= t)
                  r.splice(1, 0, s);
                return r;
              }
            }
            static getNumRawDataModules(e) {
              if (e < t.MIN_VERSION || e > t.MAX_VERSION)
                throw RangeError("Version number out of range");
              let r = (16 * e + 128) * e + 64;
              if (e >= 2) {
                let t = Math.floor(e / 7) + 2;
                ((r -= (25 * t - 10) * t - 55), e >= 7 && (r -= 36));
              }
              return (n(208 <= r && r <= 29648), r);
            }
            static getNumDataCodewords(e, r) {
              return (
                Math.floor(t.getNumRawDataModules(e) / 8) -
                t.ECC_CODEWORDS_PER_BLOCK[r.ordinal][e] *
                  t.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][e]
              );
            }
            static reedSolomonComputeDivisor(e) {
              if (e < 1 || e > 255) throw RangeError("Degree out of range");
              let r = [];
              for (let t = 0; t < e - 1; t++) r.push(0);
              r.push(1);
              let s = 1;
              for (let n = 0; n < e; n++) {
                for (let e = 0; e < r.length; e++)
                  ((r[e] = t.reedSolomonMultiply(r[e], s)),
                    e + 1 < r.length && (r[e] ^= r[e + 1]));
                s = t.reedSolomonMultiply(s, 2);
              }
              return r;
            }
            static reedSolomonComputeRemainder(e, r) {
              let s = r.map((e) => 0);
              for (let n of e) {
                let e = n ^ s.shift();
                (s.push(0),
                  r.forEach((r, n) => (s[n] ^= t.reedSolomonMultiply(r, e))));
              }
              return s;
            }
            static reedSolomonMultiply(e, t) {
              if (e >>> 8 != 0 || t >>> 8 != 0)
                throw RangeError("Byte out of range");
              let r = 0;
              for (let s = 7; s >= 0; s--)
                r = (r << 1) ^ ((r >>> 7) * 285) ^ (((t >>> s) & 1) * e);
              return (n(r >>> 8 == 0), r);
            }
            finderPenaltyCountPatterns(e) {
              let t = e[1];
              n(t <= 3 * this.size);
              let r =
                t > 0 && e[2] == t && e[3] == 3 * t && e[4] == t && e[5] == t;
              return (
                (r && e[0] >= 4 * t && e[6] >= t ? 1 : 0) +
                (r && e[6] >= 4 * t && e[0] >= t ? 1 : 0)
              );
            }
            finderPenaltyTerminateAndCount(e, t, r) {
              return (
                e && (this.finderPenaltyAddHistory(t, r), (t = 0)),
                (t += this.size),
                this.finderPenaltyAddHistory(t, r),
                this.finderPenaltyCountPatterns(r)
              );
            }
            finderPenaltyAddHistory(e, t) {
              (0 == t[0] && (e += this.size), t.pop(), t.unshift(e));
            }
          };
          function r(e, t, r) {
            if (t < 0 || t > 31 || e >>> t != 0)
              throw RangeError("Value out of range");
            for (let s = t - 1; s >= 0; s--) r.push((e >>> s) & 1);
          }
          function s(e, t) {
            return ((e >>> t) & 1) != 0;
          }
          function n(e) {
            if (!e) throw Error("Assertion error");
          }
          ((t.MIN_VERSION = 1),
            (t.MAX_VERSION = 40),
            (t.PENALTY_N1 = 3),
            (t.PENALTY_N2 = 3),
            (t.PENALTY_N3 = 40),
            (t.PENALTY_N4 = 10),
            (t.ECC_CODEWORDS_PER_BLOCK = [
              [
                -1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22,
                24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30,
                30, 30, 30, 30, 30, 30, 30, 30, 30,
              ],
              [
                -1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24,
                28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
                28, 28, 28, 28, 28, 28, 28, 28, 28,
              ],
              [
                -1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30,
                24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30,
                30, 30, 30, 30, 30, 30, 30, 30, 30,
              ],
              [
                -1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24,
                30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30,
                30, 30, 30, 30, 30, 30, 30, 30, 30,
              ],
            ]),
            (t.NUM_ERROR_CORRECTION_BLOCKS = [
              [
                -1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8,
                8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21,
                22, 24, 25,
              ],
              [
                -1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13,
                14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37,
                38, 40, 43, 45, 47, 49,
              ],
              [
                -1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18,
                21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51,
                53, 56, 59, 62, 65, 68,
              ],
              [
                -1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19,
                21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57,
                60, 63, 66, 70, 74, 77, 81,
              ],
            ]),
            (e.QrCode = t));
          let o = class e {
            constructor(e, t, r) {
              if (
                ((this.mode = e),
                (this.numChars = t),
                (this.bitData = r),
                t < 0)
              )
                throw RangeError("Invalid argument");
              this.bitData = r.slice();
            }
            static makeBytes(t) {
              let s = [];
              for (let e of t) r(e, 8, s);
              return new e(e.Mode.BYTE, t.length, s);
            }
            static makeNumeric(t) {
              if (!e.isNumeric(t))
                throw RangeError("String contains non-numeric characters");
              let s = [];
              for (let e = 0; e < t.length; ) {
                let n = Math.min(t.length - e, 3);
                (r(parseInt(t.substring(e, e + n), 10), 3 * n + 1, s),
                  (e += n));
              }
              return new e(e.Mode.NUMERIC, t.length, s);
            }
            static makeAlphanumeric(t) {
              let s;
              if (!e.isAlphanumeric(t))
                throw RangeError(
                  "String contains unencodable characters in alphanumeric mode",
                );
              let n = [];
              for (s = 0; s + 2 <= t.length; s += 2) {
                let o = 45 * e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s));
                r(
                  (o += e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s + 1))),
                  11,
                  n,
                );
              }
              return (
                s < t.length &&
                  r(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(s)), 6, n),
                new e(e.Mode.ALPHANUMERIC, t.length, n)
              );
            }
            static makeSegments(t) {
              return "" == t
                ? []
                : e.isNumeric(t)
                  ? [e.makeNumeric(t)]
                  : e.isAlphanumeric(t)
                    ? [e.makeAlphanumeric(t)]
                    : [e.makeBytes(e.toUtf8ByteArray(t))];
            }
            static makeEci(t) {
              let s = [];
              if (t < 0) throw RangeError("ECI assignment value out of range");
              if (t < 128) r(t, 8, s);
              else if (t < 16384) (r(2, 2, s), r(t, 14, s));
              else if (t < 1e6) (r(6, 3, s), r(t, 21, s));
              else throw RangeError("ECI assignment value out of range");
              return new e(e.Mode.ECI, 0, s);
            }
            static isNumeric(t) {
              return e.NUMERIC_REGEX.test(t);
            }
            static isAlphanumeric(t) {
              return e.ALPHANUMERIC_REGEX.test(t);
            }
            getData() {
              return this.bitData.slice();
            }
            static getTotalBits(e, t) {
              let r = 0;
              for (let s of e) {
                let e = s.mode.numCharCountBits(t);
                if (s.numChars >= 1 << e) return 1 / 0;
                r += 4 + e + s.bitData.length;
              }
              return r;
            }
            static toUtf8ByteArray(e) {
              e = encodeURI(e);
              let t = [];
              for (let r = 0; r < e.length; r++)
                "%" != e.charAt(r)
                  ? t.push(e.charCodeAt(r))
                  : (t.push(parseInt(e.substring(r + 1, r + 3), 16)), (r += 2));
              return t;
            }
          };
          ((o.NUMERIC_REGEX = /^[0-9]*$/),
            (o.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/),
            (o.ALPHANUMERIC_CHARSET =
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"));
          let i = o;
          e.QrSegment = o;
        })(s || (s = {})),
          ((e) => {
            ((e) => {
              let t = class {
                constructor(e, t) {
                  ((this.ordinal = e), (this.formatBits = t));
                }
              };
              ((t.LOW = new t(0, 1)),
                (t.MEDIUM = new t(1, 0)),
                (t.QUARTILE = new t(2, 3)),
                (t.HIGH = new t(3, 2)),
                (e.Ecc = t));
            })(e.QrCode || (e.QrCode = {}));
          })(s || (s = {})),
          ((e) => {
            ((e) => {
              let t = class {
                constructor(e, t) {
                  ((this.modeBits = e), (this.numBitsCharCount = t));
                }
                numCharCountBits(e) {
                  return this.numBitsCharCount[Math.floor((e + 7) / 17)];
                }
              };
              ((t.NUMERIC = new t(1, [10, 12, 14])),
                (t.ALPHANUMERIC = new t(2, [9, 11, 13])),
                (t.BYTE = new t(4, [8, 16, 16])),
                (t.KANJI = new t(8, [8, 10, 12])),
                (t.ECI = new t(7, [0, 0, 0])),
                (e.Mode = t));
            })(e.QrSegment || (e.QrSegment = {}));
          })(s || (s = {})));
        var v = s,
          w = {
            L: v.QrCode.Ecc.LOW,
            M: v.QrCode.Ecc.MEDIUM,
            Q: v.QrCode.Ecc.QUARTILE,
            H: v.QrCode.Ecc.HIGH,
          },
          N = "#FFFFFF",
          E = "#000000";
        function M(e, t = 0) {
          let r = [];
          return (
            e.forEach(function (e, s) {
              let n = null;
              e.forEach(function (o, i) {
                if (!o && null !== n) {
                  (r.push(`M${n + t} ${s + t}h${i - n}v1H${n + t}z`),
                    (n = null));
                  return;
                }
                if (i === e.length - 1) {
                  if (!o) return;
                  null === n
                    ? r.push(`M${i + t},${s + t} h1v1H${i + t}z`)
                    : r.push(`M${n + t},${s + t} h${i + 1 - n}v1H${n + t}z`);
                  return;
                }
                o && null === n && (n = i);
              });
            }),
            r.join("")
          );
        }
        function C(e, t) {
          return e
            .slice()
            .map((e, r) =>
              r < t.y || r >= t.y + t.h
                ? e
                : e.map((e, r) => (r < t.x || r >= t.x + t.w) && e),
            );
        }
        function R({
          value: e,
          level: t,
          minVersion: r,
          includeMargin: s,
          marginSize: n,
          imageSettings: o,
          size: i,
          boostLevel: a,
        }) {
          let l = m.useMemo(() => {
              let s = (Array.isArray(e) ? e : [e]).reduce(
                (e, t) => (e.push(...v.QrSegment.makeSegments(t)), e),
                [],
              );
              return v.QrCode.encodeSegments(s, w[t], r, void 0, void 0, a);
            }, [e, t, r, a]),
            {
              cells: d,
              margin: u,
              numCells: c,
              calculatedImageSettings: h,
            } = m.useMemo(() => {
              let e = l.getModules(),
                t = null != n ? Math.max(Math.floor(n), 0) : s ? 4 : 0,
                r = e.length + 2 * t,
                a = (function (e, t, r, s) {
                  if (null == s) return null;
                  let n = e.length + 2 * r,
                    o = Math.floor(0.1 * t),
                    i = n / t,
                    a = (s.width || o) * i,
                    l = (s.height || o) * i,
                    d = null == s.x ? e.length / 2 - a / 2 : s.x * i,
                    u = null == s.y ? e.length / 2 - l / 2 : s.y * i,
                    c = null == s.opacity ? 1 : s.opacity,
                    m = null;
                  if (s.excavate) {
                    let e = Math.floor(d),
                      t = Math.floor(u),
                      r = Math.ceil(a + d - e),
                      s = Math.ceil(l + u - t);
                    m = { x: e, y: t, w: r, h: s };
                  }
                  return {
                    x: d,
                    y: u,
                    h: l,
                    w: a,
                    excavation: m,
                    opacity: c,
                    crossOrigin: s.crossOrigin,
                  };
                })(e, i, t, o);
              return {
                cells: e,
                margin: t,
                numCells: r,
                calculatedImageSettings: a,
              };
            }, [l, i, o, s, n]);
          return {
            qrcode: l,
            margin: u,
            cells: d,
            numCells: c,
            calculatedImageSettings: h,
          };
        }
        var P = (function () {
            try {
              new Path2D().addPath(new Path2D());
            } catch (e) {
              return !1;
            }
            return !0;
          })(),
          A = m.forwardRef(function (e, t) {
            let {
                value: r,
                size: s = 128,
                level: n = "L",
                bgColor: o = N,
                fgColor: i = E,
                includeMargin: a = !1,
                minVersion: l = 1,
                boostLevel: d,
                marginSize: u,
                imageSettings: c,
              } = e,
              h = b(e, [
                "value",
                "size",
                "level",
                "bgColor",
                "fgColor",
                "includeMargin",
                "minVersion",
                "boostLevel",
                "marginSize",
                "imageSettings",
              ]),
              { style: f } = h,
              p = b(h, ["style"]),
              g = null == c ? void 0 : c.src,
              x = m.useRef(null),
              v = m.useRef(null),
              w = m.useCallback(
                (e) => {
                  ((x.current = e),
                    "function" == typeof t ? t(e) : t && (t.current = e));
                },
                [t],
              ),
              [A, j] = m.useState(!1),
              {
                margin: I,
                cells: k,
                numCells: S,
                calculatedImageSettings: _,
              } = R({
                value: r,
                level: n,
                minVersion: l,
                boostLevel: d,
                includeMargin: a,
                marginSize: u,
                imageSettings: c,
                size: s,
              });
            (m.useEffect(() => {
              if (null != x.current) {
                let e = x.current,
                  t = e.getContext("2d");
                if (!t) return;
                let r = k,
                  n = v.current,
                  a =
                    null != _ &&
                    null !== n &&
                    n.complete &&
                    0 !== n.naturalHeight &&
                    0 !== n.naturalWidth;
                a && null != _.excavation && (r = C(k, _.excavation));
                let l = window.devicePixelRatio || 1;
                e.height = e.width = s * l;
                let d = (s / S) * l;
                (t.scale(d, d),
                  (t.fillStyle = o),
                  t.fillRect(0, 0, S, S),
                  (t.fillStyle = i),
                  P
                    ? t.fill(new Path2D(M(r, I)))
                    : k.forEach(function (e, r) {
                        e.forEach(function (e, s) {
                          e && t.fillRect(s + I, r + I, 1, 1);
                        });
                      }),
                  _ && (t.globalAlpha = _.opacity),
                  a && t.drawImage(n, _.x + I, _.y + I, _.w, _.h));
              }
            }),
              m.useEffect(() => {
                j(!1);
              }, [g]));
            let O = y({ height: s, width: s }, f),
              F = null;
            return (
              null != g &&
                (F = m.createElement("img", {
                  src: g,
                  key: g,
                  style: { display: "none" },
                  onLoad: () => {
                    j(!0);
                  },
                  ref: v,
                  crossOrigin: null == _ ? void 0 : _.crossOrigin,
                })),
              m.createElement(
                m.Fragment,
                null,
                m.createElement(
                  "canvas",
                  y({ style: O, height: s, width: s, ref: w, role: "img" }, p),
                ),
                F,
              )
            );
          });
        ((A.displayName = "QRCodeCanvas"),
          (m.forwardRef(function (e, t) {
            let {
                value: r,
                size: s = 128,
                level: n = "L",
                bgColor: o = N,
                fgColor: i = E,
                includeMargin: a = !1,
                minVersion: l = 1,
                boostLevel: d,
                title: u,
                marginSize: c,
                imageSettings: h,
              } = e,
              f = b(e, [
                "value",
                "size",
                "level",
                "bgColor",
                "fgColor",
                "includeMargin",
                "minVersion",
                "boostLevel",
                "title",
                "marginSize",
                "imageSettings",
              ]),
              {
                margin: p,
                cells: g,
                numCells: x,
                calculatedImageSettings: v,
              } = R({
                value: r,
                level: n,
                minVersion: l,
                boostLevel: d,
                includeMargin: a,
                marginSize: c,
                imageSettings: h,
                size: s,
              }),
              w = g,
              P = null;
            null != h &&
              null != v &&
              (null != v.excavation && (w = C(g, v.excavation)),
              (P = m.createElement("image", {
                href: h.src,
                height: v.h,
                width: v.w,
                x: v.x + p,
                y: v.y + p,
                preserveAspectRatio: "none",
                opacity: v.opacity,
                crossOrigin: v.crossOrigin,
              })));
            let A = M(w, p);
            return m.createElement(
              "svg",
              y(
                {
                  height: s,
                  width: s,
                  viewBox: `0 0 ${x} ${x}`,
                  ref: t,
                  role: "img",
                },
                f,
              ),
              !!u && m.createElement("title", null, u),
              m.createElement("path", {
                fill: o,
                d: `M0,0 h${x}v${x}H0z`,
                shapeRendering: "crispEdges",
              }),
              m.createElement("path", {
                fill: i,
                d: A,
                shapeRendering: "crispEdges",
              }),
              P,
            );
          }).displayName = "QRCodeSVG"));
        var j = r(6868),
          I = r(1542),
          k = r(5009),
          S = r(9400),
          _ = r(4590),
          O = r(2373),
          F = r(7722),
          z = r(5210),
          D = r(3612);
        let L = k.Ik({
          amount: k.au
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be a positive number." })
            .multipleOf(0.01, {
              message: "Amount can have at most 2 decimal places.",
            }),
          memo: k.Yj().optional(),
        });
        function B() {
          let [e, t] = (0, m.useState)(null),
            [r, s] = (0, m.useState)(null),
            [l, h] = (0, m.useState)(!1),
            { user: f } = (0, z.A)(),
            p = (0, j.mN)({
              resolver: (0, o.u)(L),
              defaultValues: { amount: void 0, memo: "" },
            });
          async function g(e) {
            h(!0);
            try {
              let r = D.kY ? D.GP : D.uE,
                n = await r.requestPayment({ amount: e.amount, memo: e.memo });
              if (n.success && n.data) {
                let r = { amount: e.amount, memo: e.memo || "" };
                s(r);
                let n = {
                    userId: f?.id || "user123",
                    amount: e.amount,
                    memo: e.memo || "Payment Request",
                    timestamp: Date.now(),
                  },
                  o = `paynext://request?details=${encodeURIComponent(JSON.stringify(n))}`;
                (t(o), I.oR.success("Payment request created successfully!"));
              } else
                I.oR.error(
                  n.error?.message || "Failed to create payment request",
                );
            } catch (e) {
              (console.error("Request error:", e),
                I.oR.error("An unexpected error occurred"));
            } finally {
              h(!1);
            }
          }
          let x = async () => {
              if (e)
                try {
                  (await navigator.clipboard.writeText(e),
                    I.oR.success("Payment link copied to clipboard!"));
                } catch (e) {
                  (console.error("Failed to copy:", e),
                    I.oR.error("Failed to copy link"));
                }
            },
            y = async () => {
              if (e && r) {
                if (navigator.share)
                  try {
                    await navigator.share({
                      title: "PayNext Payment Request",
                      text: `Please pay me $${r.amount.toFixed(2)}${r.memo ? ` for ${r.memo}` : ""}`,
                      url: e,
                    });
                  } catch (e) {
                    "AbortError" !== e.name && x();
                  }
                else x();
              }
            };
          return (0, n.jsxs)("div", {
            className: "space-y-5",
            children: [
              (0, n.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                  (0, n.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center",
                    children: (0, n.jsx)(i.A, {
                      className: "h-5 w-5 text-green-600 dark:text-green-400",
                    }),
                  }),
                  (0, n.jsx)("h1", {
                    className: "text-2xl font-bold tracking-tight",
                    children: "Request Money",
                  }),
                ],
              }),
              e
                ? (0, n.jsxs)(_.Zp, {
                    className: "rounded-2xl border-border/60 shadow-sm",
                    children: [
                      (0, n.jsxs)(_.aR, {
                        className: "pb-3 pt-5 px-5 text-center",
                        children: [
                          (0, n.jsx)(_.ZB, {
                            className: "text-base font-semibold",
                            children: "Your Payment Request",
                          }),
                          r &&
                            (0, n.jsxs)("p", {
                              className:
                                "text-2xl font-bold text-green-600 dark:text-green-400 mt-1",
                              children: ["$", r.amount.toFixed(2)],
                            }),
                          r?.memo &&
                            (0, n.jsx)("p", {
                              className: "text-sm text-muted-foreground",
                              children: r.memo,
                            }),
                        ],
                      }),
                      (0, n.jsxs)(_.Wu, {
                        className: "px-5 pb-3 flex flex-col items-center gap-5",
                        children: [
                          (0, n.jsx)("div", {
                            className:
                              "p-4 bg-white rounded-2xl shadow-inner border border-border/40",
                            children: (0, n.jsx)(A, {
                              value: e,
                              size: 200,
                              bgColor: "#ffffff",
                              fgColor: "#1a1a2e",
                              level: "M",
                              includeMargin: !1,
                            }),
                          }),
                          (0, n.jsx)("div", {
                            className:
                              "w-full p-3 bg-muted/50 rounded-xl border border-border/40",
                            children: (0, n.jsx)("p", {
                              className:
                                "text-xs text-muted-foreground break-all font-mono leading-relaxed",
                              children: e,
                            }),
                          }),
                        ],
                      }),
                      (0, n.jsxs)(_.wL, {
                        className: "flex flex-col gap-2.5 px-5 pb-5",
                        children: [
                          (0, n.jsxs)("div", {
                            className: "grid grid-cols-2 gap-2.5 w-full",
                            children: [
                              (0, n.jsxs)(S.$, {
                                variant: "outline",
                                className:
                                  "rounded-xl h-11 text-sm font-medium border-border/60",
                                onClick: x,
                                children: [
                                  (0, n.jsx)(d, { className: "mr-2 h-4 w-4" }),
                                  "Copy Link",
                                ],
                              }),
                              (0, n.jsxs)(S.$, {
                                variant: "outline",
                                className:
                                  "rounded-xl h-11 text-sm font-medium border-border/60",
                                onClick: y,
                                children: [
                                  (0, n.jsx)(u, { className: "mr-2 h-4 w-4" }),
                                  "Share",
                                ],
                              }),
                            ],
                          }),
                          (0, n.jsxs)(S.$, {
                            variant: "ghost",
                            className:
                              "w-full rounded-xl h-11 text-sm font-medium text-muted-foreground hover:text-foreground",
                            onClick: () => {
                              (t(null), s(null), p.reset());
                            },
                            children: [
                              (0, n.jsx)(c, { className: "mr-2 h-4 w-4" }),
                              "New Request",
                            ],
                          }),
                        ],
                      }),
                    ],
                  })
                : (0, n.jsxs)(_.Zp, {
                    className: "rounded-2xl border-border/60 shadow-sm",
                    children: [
                      (0, n.jsx)(_.aR, {
                        className: "pb-3 pt-5 px-5",
                        children: (0, n.jsx)(_.ZB, {
                          className: "text-base font-semibold",
                          children: "Create Payment Request",
                        }),
                      }),
                      (0, n.jsx)(_.Wu, {
                        className: "px-5 pb-5",
                        children: (0, n.jsx)(O.lV, {
                          ...p,
                          children: (0, n.jsxs)("form", {
                            onSubmit: p.handleSubmit(g),
                            className: "space-y-5",
                            children: [
                              (0, n.jsx)(O.zB, {
                                control: p.control,
                                name: "amount",
                                render: ({ field: e }) =>
                                  (0, n.jsxs)(O.eI, {
                                    children: [
                                      (0, n.jsx)(O.lR, {
                                        className: "text-sm font-medium",
                                        children: "Amount ($)",
                                      }),
                                      (0, n.jsx)(O.MJ, {
                                        children: (0, n.jsxs)("div", {
                                          className: "relative",
                                          children: [
                                            (0, n.jsx)("span", {
                                              className:
                                                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm",
                                              children: "$",
                                            }),
                                            (0, n.jsx)(F.p, {
                                              type: "number",
                                              step: "0.01",
                                              min: "0.01",
                                              placeholder: "0.00",
                                              className:
                                                "pl-7 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary text-lg font-semibold",
                                              ...e,
                                              value: e.value ?? "",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, n.jsx)(O.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, n.jsx)(O.zB, {
                                control: p.control,
                                name: "memo",
                                render: ({ field: e }) =>
                                  (0, n.jsxs)(O.eI, {
                                    children: [
                                      (0, n.jsxs)(O.lR, {
                                        className: "text-sm font-medium",
                                        children: [
                                          "Memo",
                                          " ",
                                          (0, n.jsx)("span", {
                                            className:
                                              "text-muted-foreground font-normal",
                                            children: "(Optional)",
                                          }),
                                        ],
                                      }),
                                      (0, n.jsx)(O.MJ, {
                                        children: (0, n.jsx)(F.p, {
                                          placeholder:
                                            "What's this request for?",
                                          className:
                                            "rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary",
                                          ...e,
                                        }),
                                      }),
                                      (0, n.jsx)(O.C5, {}),
                                    ],
                                  }),
                              }),
                              (0, n.jsx)(S.$, {
                                type: "submit",
                                className:
                                  "w-full h-12 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 shadow-md shadow-green-500/20 transition-all",
                                disabled: l,
                                children: l
                                  ? (0, n.jsxs)(n.Fragment, {
                                      children: [
                                        (0, n.jsx)(a.A, {
                                          className:
                                            "mr-2 h-4 w-4 animate-spin",
                                        }),
                                        "Generating...",
                                      ],
                                    })
                                  : "Generate QR Code",
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
            ],
          });
        }
      },
      2373: (e, t, r) => {
        "use strict";
        r.d(t, {
          lV: () => m,
          MJ: () => b,
          Rr: () => v,
          zB: () => f,
          eI: () => x,
          lR: () => y,
          C5: () => w,
        });
        var s = r(5512),
          n = r(2705),
          o = r(8009),
          i = r(6868),
          a = r(69),
          l = r(1643),
          d = r(4195);
        let u = (0, l.F)(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          ),
          c = o.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)(a.b, { ref: r, className: (0, d.cn)(u(), e), ...t }),
          );
        c.displayName = a.b.displayName;
        let m = i.Op,
          h = o.createContext({}),
          f = ({ ...e }) =>
            (0, s.jsx)(h.Provider, {
              value: { name: e.name },
              children: (0, s.jsx)(i.xI, { ...e }),
            }),
          p = () => {
            let e = o.useContext(h),
              t = o.useContext(g),
              { getFieldState: r, formState: s } = (0, i.xW)(),
              n = r(e.name, s);
            if (!e)
              throw Error("useFormField should be used within <FormField>");
            let { id: a } = t;
            return {
              id: a,
              name: e.name,
              formItemId: `${a}-form-item`,
              formDescriptionId: `${a}-form-item-description`,
              formMessageId: `${a}-form-item-message`,
              ...n,
            };
          },
          g = o.createContext({}),
          x = o.forwardRef(({ className: e, ...t }, r) => {
            let n = o.useId();
            return (0, s.jsx)(g.Provider, {
              value: { id: n },
              children: (0, s.jsx)("div", {
                ref: r,
                className: (0, d.cn)("space-y-2", e),
                ...t,
              }),
            });
          });
        x.displayName = "FormItem";
        let y = o.forwardRef(({ className: e, ...t }, r) => {
          let { error: n, formItemId: o } = p();
          return (0, s.jsx)(c, {
            ref: r,
            className: (0, d.cn)(n && "text-destructive", e),
            htmlFor: o,
            ...t,
          });
        });
        y.displayName = "FormLabel";
        let b = o.forwardRef(({ ...e }, t) => {
          let {
            error: r,
            formItemId: o,
            formDescriptionId: i,
            formMessageId: a,
          } = p();
          return (0, s.jsx)(n.DX, {
            ref: t,
            id: o,
            "aria-describedby": r ? `${i} ${a}` : `${i}`,
            "aria-invalid": !!r,
            ...e,
          });
        });
        b.displayName = "FormControl";
        let v = o.forwardRef(({ className: e, ...t }, r) => {
          let { formDescriptionId: n } = p();
          return (0, s.jsx)("p", {
            ref: r,
            id: n,
            className: (0, d.cn)("text-[0.8rem] text-muted-foreground", e),
            ...t,
          });
        });
        v.displayName = "FormDescription";
        let w = o.forwardRef(({ className: e, children: t, ...r }, n) => {
          let { error: o, formMessageId: i } = p(),
            a = o ? String(o?.message) : t;
          return a
            ? (0, s.jsx)("p", {
                ref: n,
                id: i,
                className: (0, d.cn)(
                  "text-[0.8rem] font-medium text-destructive",
                  e,
                ),
                ...r,
                children: a,
              })
            : null;
        });
        w.displayName = "FormMessage";
      },
      7722: (e, t, r) => {
        "use strict";
        r.d(t, { p: () => i });
        var s = r(5512),
          n = r(8009),
          o = r(4195);
        let i = n.forwardRef(({ className: e, type: t, ...r }, n) =>
          (0, s.jsx)("input", {
            type: t,
            className: (0, o.cn)(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              e,
            ),
            ref: n,
            ...r,
          }),
        );
        i.displayName = "Input";
      },
      439: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => s }));
        let s = (0, r(6760).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/request/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/request/page.tsx",
          "default",
        );
      },
      440: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => n }));
        var s = r(8077);
        let n = async (e) => [
          {
            type: "image/x-icon",
            sizes: "16x16",
            url:
              (0, s.fillMetadataSegment)(".", await e.params, "favicon.ico") +
              "",
          },
        ];
      },
    }));
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [638, 778, 77, 370, 96], () => r(8154));
  module.exports = s;
})();
