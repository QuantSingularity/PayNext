(() => {
  var e = {};
  ((e.id = 636),
    (e.ids = [636]),
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
      109: (e, t, r) => {
        "use strict";
        (r.r(t),
          r.d(t, {
            GlobalError: () => n.a,
            __next_app__: () => m,
            pages: () => c,
            routeModule: () => u,
            tree: () => d,
          }));
        var s = r(260),
          a = r(8203),
          l = r(5155),
          n = r.n(l),
          i = r(7292),
          o = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => i[e]);
        r.d(t, o);
        let d = [
            "",
            {
              children: [
                "profile",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(r.bind(r, 1891)),
                        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/profile/page.tsx",
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
          c = [
            "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/profile/page.tsx",
          ],
          m = { require: r, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/profile/page",
              pathname: "/profile",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      7089: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 1891));
      },
      3537: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 4499));
      },
      681: (e, t, r) => {
        "use strict";
        var s = r(8009),
          a =
            "function" == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                },
          l = s.useState,
          n = s.useEffect,
          i = s.useLayoutEffect,
          o = s.useDebugValue;
        function d(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var r = t();
            return !a(e, r);
          } catch (e) {
            return !0;
          }
        }
        var c =
          "undefined" == typeof window ||
          void 0 === window.document ||
          void 0 === window.document.createElement
            ? function (e, t) {
                return t();
              }
            : function (e, t) {
                var r = t(),
                  s = l({ inst: { value: r, getSnapshot: t } }),
                  a = s[0].inst,
                  c = s[1];
                return (
                  i(
                    function () {
                      ((a.value = r),
                        (a.getSnapshot = t),
                        d(a) && c({ inst: a }));
                    },
                    [e, r, t],
                  ),
                  n(
                    function () {
                      return (
                        d(a) && c({ inst: a }),
                        e(function () {
                          d(a) && c({ inst: a });
                        })
                      );
                    },
                    [e],
                  ),
                  o(r),
                  r
                );
              };
        t.useSyncExternalStore =
          void 0 !== s.useSyncExternalStore ? s.useSyncExternalStore : c;
      },
      4924: (e, t, r) => {
        "use strict";
        e.exports = r(681);
      },
      4499: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => X }));
        var s = r(5512),
          a = r(1914),
          l = r(6235),
          n = r(3468);
        let i = (0, n.A)("Pencil", [
            [
              "path",
              {
                d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
                key: "5qss01",
              },
            ],
            ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
          ]),
          o = (0, n.A)("Bell", [
            [
              "path",
              { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" },
            ],
            ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }],
          ]);
        var d = r(9905);
        let c = (0, n.A)("Shield", [
            [
              "path",
              {
                d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
                key: "oel41y",
              },
            ],
          ]),
          m = (0, n.A)("Settings", [
            [
              "path",
              {
                d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
                key: "1qme2f",
              },
            ],
            ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
          ]);
        var u = r(7798);
        let x = (0, n.A)("LogOut", [
          [
            "path",
            { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
          ],
          ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
          ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
        ]);
        var f = r(8009),
          p = r(6868),
          h = r(1542),
          g = r(5009),
          v = r(447),
          j = r(9397);
        r(5740);
        var N = r(2705),
          y = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, N.TL)(`Primitive.${t}`),
              a = f.forwardRef((e, a) => {
                let { asChild: l, ...n } = e,
                  i = l ? r : t;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, s.jsx)(i, { ...n, ref: a })
                );
              });
            return ((a.displayName = `Primitive.${t}`), { ...e, [t]: a });
          }, {}),
          b = r(4924);
        function w() {
          return () => {};
        }
        var k = "Avatar",
          [C, P] = (function (e, t = []) {
            let r = [],
              a = () => {
                let t = r.map((e) => f.createContext(e));
                return function (r) {
                  let s = r?.[e] || t;
                  return f.useMemo(
                    () => ({ [`__scope${e}`]: { ...r, [e]: s } }),
                    [r, s],
                  );
                };
              };
            return (
              (a.scopeName = e),
              [
                function (t, a) {
                  let l = f.createContext(a);
                  l.displayName = t + "Context";
                  let n = r.length;
                  r = [...r, a];
                  let i = (t) => {
                    let { scope: r, children: a, ...i } = t,
                      o = r?.[e]?.[n] || l,
                      d = f.useMemo(() => i, Object.values(i));
                    return (0, s.jsx)(o.Provider, { value: d, children: a });
                  };
                  return (
                    (i.displayName = t + "Provider"),
                    [
                      i,
                      function (r, s) {
                        let i = s?.[e]?.[n] || l,
                          o = f.useContext(i);
                        if (o) return o;
                        if (void 0 !== a) return a;
                        throw Error(`\`${r}\` must be used within \`${t}\``);
                      },
                    ]
                  );
                },
                (function (...e) {
                  let t = e[0];
                  if (1 === e.length) return t;
                  let r = () => {
                    let r = e.map((e) => ({
                      useScope: e(),
                      scopeName: e.scopeName,
                    }));
                    return function (e) {
                      let s = r.reduce((t, { useScope: r, scopeName: s }) => {
                        let a = r(e)[`__scope${s}`];
                        return { ...t, ...a };
                      }, {});
                      return f.useMemo(
                        () => ({ [`__scope${t.scopeName}`]: s }),
                        [s],
                      );
                    };
                  };
                  return ((r.scopeName = t.scopeName), r);
                })(a, ...t),
              ]
            );
          })(k),
          [I, S] = C(k),
          R = f.forwardRef((e, t) => {
            let { __scopeAvatar: r, ...a } = e,
              [l, n] = f.useState("idle");
            return (0, s.jsx)(I, {
              scope: r,
              imageLoadingStatus: l,
              onImageLoadingStatusChange: n,
              children: (0, s.jsx)(y.span, { ...a, ref: t }),
            });
          });
        R.displayName = k;
        var M = "AvatarImage",
          A = f.forwardRef((e, t) => {
            let {
                __scopeAvatar: r,
                src: a,
                onLoadingStatusChange: l = () => {},
                ...n
              } = e,
              i = S(M, r),
              o = (function (e, { referrerPolicy: t, crossOrigin: r }) {
                let s = (0, b.useSyncExternalStore)(
                    w,
                    () => !0,
                    () => !1,
                  ),
                  a = f.useRef(null),
                  l = s
                    ? (a.current || (a.current = new window.Image()), a.current)
                    : null,
                  [n, i] = f.useState(() => z(l, e));
                return (
                  (0, j.N)(() => {
                    i(z(l, e));
                  }, [l, e]),
                  (0, j.N)(() => {
                    let e = (e) => () => {
                      i(e);
                    };
                    if (!l) return;
                    let s = e("loaded"),
                      a = e("error");
                    return (
                      l.addEventListener("load", s),
                      l.addEventListener("error", a),
                      t && (l.referrerPolicy = t),
                      "string" == typeof r && (l.crossOrigin = r),
                      () => {
                        (l.removeEventListener("load", s),
                          l.removeEventListener("error", a));
                      }
                    );
                  }, [l, r, t]),
                  n
                );
              })(a, n),
              d = (0, v.c)((e) => {
                (l(e), i.onImageLoadingStatusChange(e));
              });
            return (
              (0, j.N)(() => {
                "idle" !== o && d(o);
              }, [o, d]),
              "loaded" === o
                ? (0, s.jsx)(y.img, { ...n, ref: t, src: a })
                : null
            );
          });
        A.displayName = M;
        var D = "AvatarFallback",
          E = f.forwardRef((e, t) => {
            let { __scopeAvatar: r, delayMs: a, ...l } = e,
              n = S(D, r),
              [i, o] = f.useState(void 0 === a);
            return (
              f.useEffect(() => {
                if (void 0 !== a) {
                  let e = window.setTimeout(() => o(!0), a);
                  return () => window.clearTimeout(e);
                }
              }, [a]),
              i && "loaded" !== n.imageLoadingStatus
                ? (0, s.jsx)(y.span, { ...l, ref: t })
                : null
            );
          });
        function z(e, t) {
          return e
            ? t
              ? (e.src !== t && (e.src = t),
                e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
              : "error"
            : "idle";
        }
        E.displayName = D;
        var L = r(4195);
        let Z = f.forwardRef(({ className: e, ...t }, r) =>
          (0, s.jsx)(R, {
            ref: r,
            className: (0, L.cn)(
              "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
              e,
            ),
            ...t,
          }),
        );
        Z.displayName = R.displayName;
        let G = f.forwardRef(({ className: e, ...t }, r) =>
          (0, s.jsx)(A, {
            ref: r,
            className: (0, L.cn)("aspect-square h-full w-full", e),
            ...t,
          }),
        );
        G.displayName = A.displayName;
        let $ = f.forwardRef(({ className: e, ...t }, r) =>
          (0, s.jsx)(E, {
            ref: r,
            className: (0, L.cn)(
              "flex h-full w-full items-center justify-center rounded-full bg-muted",
              e,
            ),
            ...t,
          }),
        );
        $.displayName = E.displayName;
        var _ = r(9400),
          F = r(4590),
          O = r(883),
          V = r(2373),
          H = r(7722),
          q = [
            "a",
            "button",
            "div",
            "form",
            "h2",
            "h3",
            "img",
            "input",
            "label",
            "li",
            "nav",
            "ol",
            "p",
            "select",
            "span",
            "svg",
            "ul",
          ].reduce((e, t) => {
            let r = (0, N.TL)(`Primitive.${t}`),
              a = f.forwardRef((e, a) => {
                let { asChild: l, ...n } = e,
                  i = l ? r : t;
                return (
                  "undefined" != typeof window &&
                    (window[Symbol.for("radix-ui")] = !0),
                  (0, s.jsx)(i, { ...n, ref: a })
                );
              });
            return ((a.displayName = `Primitive.${t}`), { ...e, [t]: a });
          }, {}),
          J = "horizontal",
          U = ["horizontal", "vertical"],
          W = f.forwardRef((e, t) => {
            let { decorative: r, orientation: a = J, ...l } = e,
              n = U.includes(a) ? a : J;
            return (0, s.jsx)(q.div, {
              "data-orientation": n,
              ...(r
                ? { role: "none" }
                : {
                    "aria-orientation": "vertical" === n ? n : void 0,
                    role: "separator",
                  }),
              ...l,
              ref: t,
            });
          });
        W.displayName = "Separator";
        let B = f.forwardRef(
          (
            {
              className: e,
              orientation: t = "horizontal",
              decorative: r = !0,
              ...a
            },
            l,
          ) =>
            (0, s.jsx)(W, {
              ref: l,
              decorative: r,
              orientation: t,
              className: (0, L.cn)(
                "shrink-0 bg-border",
                "horizontal" === t ? "h-[1px] w-full" : "h-full w-[1px]",
                e,
              ),
              ...a,
            }),
        );
        B.displayName = W.displayName;
        var Y = r(5210);
        let T = g.Ik({
          name: g
            .Yj()
            .min(2, { message: "Name must be at least 2 characters." }),
          email: g.Yj().email({ message: "Please enter a valid email." }),
        });
        function X() {
          let {
              user: e,
              logout: t,
              updateProfile: r,
              isLoading: n,
            } = (0, Y.A)(),
            [g, v] = (0, f.useState)(!1),
            [j, N] = (0, f.useState)(!1),
            y = (0, p.mN)({
              resolver: (0, a.u)(T),
              defaultValues: { name: e?.name || "", email: e?.email || "" },
            });
          async function b(e) {
            N(!0);
            try {
              (await r({ name: e.name, email: e.email }))
                ? (h.oR.success("Profile updated successfully!"), v(!1))
                : h.oR.error("Failed to update profile. Please try again.");
            } catch (e) {
              (console.error("Profile update error:", e),
                h.oR.error("An unexpected error occurred"));
            } finally {
              N(!1);
            }
          }
          return n || !e
            ? (0, s.jsxs)("div", {
                className: "space-y-5",
                children: [
                  (0, s.jsx)("h1", {
                    className: "text-2xl font-bold tracking-tight",
                    children: "Profile",
                  }),
                  (0, s.jsx)(F.Zp, {
                    className: "rounded-2xl border-border/60",
                    children: (0, s.jsx)(F.Wu, {
                      className: "flex items-center justify-center py-16",
                      children: (0, s.jsx)(l.A, {
                        className: "h-8 w-8 animate-spin text-muted-foreground",
                      }),
                    }),
                  }),
                ],
              })
            : (0, s.jsxs)("div", {
                className: "space-y-5",
                children: [
                  (0, s.jsx)("h1", {
                    className: "text-2xl font-bold tracking-tight",
                    children: "Profile",
                  }),
                  (0, s.jsxs)("div", {
                    className:
                      "relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600 p-6 text-white shadow-xl shadow-blue-500/20",
                    children: [
                      (0, s.jsx)("div", {
                        className:
                          "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50",
                      }),
                      (0, s.jsxs)("div", {
                        className: "relative flex items-center gap-4",
                        children: [
                          (0, s.jsxs)(Z, {
                            className:
                              "w-20 h-20 border-2 border-white/30 shadow-lg",
                            children: [
                              (0, s.jsx)(G, { src: e.avatarUrl, alt: e.name }),
                              (0, s.jsx)($, {
                                className:
                                  "text-xl font-bold bg-white/20 text-white",
                                children: e.name
                                  .split(" ")
                                  .map((e) => e[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2),
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              (0, s.jsx)("h2", {
                                className:
                                  "text-xl font-bold text-white truncate",
                                children: e.name,
                              }),
                              (0, s.jsx)("p", {
                                className: "text-sm text-white/70 truncate",
                                children: e.email,
                              }),
                              e.id &&
                                (0, s.jsxs)("p", {
                                  className:
                                    "text-xs text-white/50 mt-1 font-mono",
                                  children: ["ID: ", e.id],
                                }),
                            ],
                          }),
                          (0, s.jsxs)(O.lG, {
                            open: g,
                            onOpenChange: v,
                            children: [
                              (0, s.jsx)(O.zM, {
                                asChild: !0,
                                children: (0, s.jsxs)(_.$, {
                                  size: "icon",
                                  variant: "ghost",
                                  className:
                                    "h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex-shrink-0",
                                  children: [
                                    (0, s.jsx)(i, { className: "h-4 w-4" }),
                                    (0, s.jsx)("span", {
                                      className: "sr-only",
                                      children: "Edit Profile",
                                    }),
                                  ],
                                }),
                              }),
                              (0, s.jsxs)(O.Cf, {
                                className: "sm:max-w-[425px] rounded-2xl",
                                children: [
                                  (0, s.jsxs)(O.c7, {
                                    children: [
                                      (0, s.jsx)(O.L3, {
                                        children: "Edit Profile",
                                      }),
                                      (0, s.jsx)(O.rr, {
                                        children:
                                          "Make changes to your profile here. Click save when you're done.",
                                      }),
                                    ],
                                  }),
                                  (0, s.jsx)(V.lV, {
                                    ...y,
                                    children: (0, s.jsxs)("form", {
                                      onSubmit: y.handleSubmit(b),
                                      className: "space-y-4 py-2",
                                      children: [
                                        (0, s.jsx)(V.zB, {
                                          control: y.control,
                                          name: "name",
                                          render: ({ field: e }) =>
                                            (0, s.jsxs)(V.eI, {
                                              children: [
                                                (0, s.jsx)(V.lR, {
                                                  children: "Name",
                                                }),
                                                (0, s.jsx)(V.MJ, {
                                                  children: (0, s.jsx)(H.p, {
                                                    placeholder: "Your Name",
                                                    className: "rounded-xl",
                                                    ...e,
                                                  }),
                                                }),
                                                (0, s.jsx)(V.C5, {}),
                                              ],
                                            }),
                                        }),
                                        (0, s.jsx)(V.zB, {
                                          control: y.control,
                                          name: "email",
                                          render: ({ field: e }) =>
                                            (0, s.jsxs)(V.eI, {
                                              children: [
                                                (0, s.jsx)(V.lR, {
                                                  children: "Email",
                                                }),
                                                (0, s.jsx)(V.MJ, {
                                                  children: (0, s.jsx)(H.p, {
                                                    type: "email",
                                                    placeholder:
                                                      "your@email.com",
                                                    className: "rounded-xl",
                                                    ...e,
                                                  }),
                                                }),
                                                (0, s.jsx)(V.C5, {}),
                                              ],
                                            }),
                                        }),
                                        (0, s.jsxs)(O.Es, {
                                          className: "pt-2",
                                          children: [
                                            (0, s.jsx)(O.HM, {
                                              asChild: !0,
                                              children: (0, s.jsx)(_.$, {
                                                type: "button",
                                                variant: "outline",
                                                className: "rounded-xl",
                                                children: "Cancel",
                                              }),
                                            }),
                                            (0, s.jsx)(_.$, {
                                              type: "submit",
                                              disabled: j,
                                              className: "rounded-xl",
                                              children: j
                                                ? (0, s.jsxs)(s.Fragment, {
                                                    children: [
                                                      (0, s.jsx)(l.A, {
                                                        className:
                                                          "mr-2 h-4 w-4 animate-spin",
                                                      }),
                                                      "Saving...",
                                                    ],
                                                  })
                                                : "Save changes",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, s.jsx)(F.Zp, {
                    className:
                      "rounded-2xl border-border/60 shadow-sm overflow-hidden",
                    children: (0, s.jsxs)(F.Wu, {
                      className: "p-0",
                      children: [
                        (0, s.jsxs)("button", {
                          className:
                            "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                          onClick: () => {
                            h.oR.info("Notifications settings coming soon!");
                          },
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0",
                              children: (0, s.jsx)(o, {
                                className: "h-4.5 w-4.5 text-orange-500",
                              }),
                            }),
                            (0, s.jsxs)("div", {
                              className: "flex-1",
                              children: [
                                (0, s.jsx)("p", {
                                  className: "text-sm font-medium",
                                  children: "Notifications",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: "Manage your alerts",
                                }),
                              ],
                            }),
                            (0, s.jsx)(d.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, s.jsx)(B, { className: "mx-5" }),
                        (0, s.jsxs)("button", {
                          className:
                            "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                          onClick: () => {
                            h.oR.info("Security settings coming soon!");
                          },
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0",
                              children: (0, s.jsx)(c, {
                                className: "h-4.5 w-4.5 text-blue-500",
                              }),
                            }),
                            (0, s.jsxs)("div", {
                              className: "flex-1",
                              children: [
                                (0, s.jsx)("p", {
                                  className: "text-sm font-medium",
                                  children: "Security",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: "Password & 2FA",
                                }),
                              ],
                            }),
                            (0, s.jsx)(d.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, s.jsx)(B, { className: "mx-5" }),
                        (0, s.jsxs)("button", {
                          className:
                            "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                          onClick: () => {
                            h.oR.info("Settings page coming soon!");
                          },
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center flex-shrink-0",
                              children: (0, s.jsx)(m, {
                                className: "h-4.5 w-4.5 text-slate-500",
                              }),
                            }),
                            (0, s.jsxs)("div", {
                              className: "flex-1",
                              children: [
                                (0, s.jsx)("p", {
                                  className: "text-sm font-medium",
                                  children: "Preferences",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: "App settings & themes",
                                }),
                              ],
                            }),
                            (0, s.jsx)(d.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, s.jsx)(B, { className: "mx-5" }),
                        (0, s.jsxs)("button", {
                          className:
                            "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                          onClick: () => {},
                          children: [
                            (0, s.jsx)("div", {
                              className:
                                "w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center flex-shrink-0",
                              children: (0, s.jsx)(u.A, {
                                className: "h-4.5 w-4.5 text-violet-500",
                              }),
                            }),
                            (0, s.jsxs)("div", {
                              className: "flex-1",
                              children: [
                                (0, s.jsx)("p", {
                                  className: "text-sm font-medium",
                                  children: "Account Details",
                                }),
                                (0, s.jsx)("p", {
                                  className: "text-xs text-muted-foreground",
                                  children: "Linked accounts & KYC",
                                }),
                              ],
                            }),
                            (0, s.jsx)(d.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, s.jsxs)(O.lG, {
                    children: [
                      (0, s.jsx)(O.zM, {
                        asChild: !0,
                        children: (0, s.jsxs)(_.$, {
                          variant: "outline",
                          className:
                            "w-full h-12 rounded-xl border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium",
                          children: [
                            (0, s.jsx)(x, { className: "mr-2 h-4 w-4" }),
                            "Log Out",
                          ],
                        }),
                      }),
                      (0, s.jsxs)(O.Cf, {
                        className: "sm:max-w-[425px] rounded-2xl",
                        children: [
                          (0, s.jsxs)(O.c7, {
                            children: [
                              (0, s.jsx)(O.L3, { children: "Log Out" }),
                              (0, s.jsx)(O.rr, {
                                children:
                                  "Are you sure you want to log out of your account?",
                              }),
                            ],
                          }),
                          (0, s.jsxs)(O.Es, {
                            children: [
                              (0, s.jsx)(O.HM, {
                                asChild: !0,
                                children: (0, s.jsx)(_.$, {
                                  type: "button",
                                  variant: "outline",
                                  className: "rounded-xl",
                                  children: "Cancel",
                                }),
                              }),
                              (0, s.jsx)(O.HM, {
                                asChild: !0,
                                children: (0, s.jsx)(_.$, {
                                  type: "button",
                                  variant: "destructive",
                                  className: "rounded-xl",
                                  onClick: () => {
                                    t();
                                  },
                                  children: "Log Out",
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              });
        }
      },
      883: (e, t, r) => {
        "use strict";
        r.d(t, {
          Cf: () => x,
          Es: () => p,
          HM: () => m,
          L3: () => h,
          c7: () => f,
          lG: () => o,
          rr: () => g,
          zM: () => d,
        });
        var s = r(5512),
          a = r(7902),
          l = r(4269),
          n = r(8009),
          i = r(4195);
        let o = a.bL,
          d = a.l9,
          c = a.ZL,
          m = a.bm,
          u = n.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)(a.hJ, {
              ref: r,
              className: (0, i.cn)(
                "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                e,
              ),
              ...t,
            }),
          );
        u.displayName = a.hJ.displayName;
        let x = n.forwardRef(({ className: e, children: t, ...r }, n) =>
          (0, s.jsxs)(c, {
            children: [
              (0, s.jsx)(u, {}),
              (0, s.jsxs)(a.UC, {
                ref: n,
                className: (0, i.cn)(
                  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                  e,
                ),
                ...r,
                children: [
                  t,
                  (0, s.jsxs)(a.bm, {
                    className:
                      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                    children: [
                      (0, s.jsx)(l.A, { className: "h-4 w-4" }),
                      (0, s.jsx)("span", {
                        className: "sr-only",
                        children: "Close",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        );
        x.displayName = a.UC.displayName;
        let f = ({ className: e, ...t }) =>
          (0, s.jsx)("div", {
            className: (0, i.cn)(
              "flex flex-col space-y-1.5 text-center sm:text-left",
              e,
            ),
            ...t,
          });
        f.displayName = "DialogHeader";
        let p = ({ className: e, ...t }) =>
          (0, s.jsx)("div", {
            className: (0, i.cn)(
              "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
              e,
            ),
            ...t,
          });
        p.displayName = "DialogFooter";
        let h = n.forwardRef(({ className: e, ...t }, r) =>
          (0, s.jsx)(a.hE, {
            ref: r,
            className: (0, i.cn)(
              "text-lg font-semibold leading-none tracking-tight",
              e,
            ),
            ...t,
          }),
        );
        h.displayName = a.hE.displayName;
        let g = n.forwardRef(({ className: e, ...t }, r) =>
          (0, s.jsx)(a.VY, {
            ref: r,
            className: (0, i.cn)("text-sm text-muted-foreground", e),
            ...t,
          }),
        );
        g.displayName = a.VY.displayName;
      },
      2373: (e, t, r) => {
        "use strict";
        r.d(t, {
          lV: () => u,
          MJ: () => j,
          Rr: () => N,
          zB: () => f,
          eI: () => g,
          lR: () => v,
          C5: () => y,
        });
        var s = r(5512),
          a = r(2705),
          l = r(8009),
          n = r(6868),
          i = r(69),
          o = r(1643),
          d = r(4195);
        let c = (0, o.F)(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          ),
          m = l.forwardRef(({ className: e, ...t }, r) =>
            (0, s.jsx)(i.b, { ref: r, className: (0, d.cn)(c(), e), ...t }),
          );
        m.displayName = i.b.displayName;
        let u = n.Op,
          x = l.createContext({}),
          f = ({ ...e }) =>
            (0, s.jsx)(x.Provider, {
              value: { name: e.name },
              children: (0, s.jsx)(n.xI, { ...e }),
            }),
          p = () => {
            let e = l.useContext(x),
              t = l.useContext(h),
              { getFieldState: r, formState: s } = (0, n.xW)(),
              a = r(e.name, s);
            if (!e)
              throw Error("useFormField should be used within <FormField>");
            let { id: i } = t;
            return {
              id: i,
              name: e.name,
              formItemId: `${i}-form-item`,
              formDescriptionId: `${i}-form-item-description`,
              formMessageId: `${i}-form-item-message`,
              ...a,
            };
          },
          h = l.createContext({}),
          g = l.forwardRef(({ className: e, ...t }, r) => {
            let a = l.useId();
            return (0, s.jsx)(h.Provider, {
              value: { id: a },
              children: (0, s.jsx)("div", {
                ref: r,
                className: (0, d.cn)("space-y-2", e),
                ...t,
              }),
            });
          });
        g.displayName = "FormItem";
        let v = l.forwardRef(({ className: e, ...t }, r) => {
          let { error: a, formItemId: l } = p();
          return (0, s.jsx)(m, {
            ref: r,
            className: (0, d.cn)(a && "text-destructive", e),
            htmlFor: l,
            ...t,
          });
        });
        v.displayName = "FormLabel";
        let j = l.forwardRef(({ ...e }, t) => {
          let {
            error: r,
            formItemId: l,
            formDescriptionId: n,
            formMessageId: i,
          } = p();
          return (0, s.jsx)(a.DX, {
            ref: t,
            id: l,
            "aria-describedby": r ? `${n} ${i}` : `${n}`,
            "aria-invalid": !!r,
            ...e,
          });
        });
        j.displayName = "FormControl";
        let N = l.forwardRef(({ className: e, ...t }, r) => {
          let { formDescriptionId: a } = p();
          return (0, s.jsx)("p", {
            ref: r,
            id: a,
            className: (0, d.cn)("text-[0.8rem] text-muted-foreground", e),
            ...t,
          });
        });
        N.displayName = "FormDescription";
        let y = l.forwardRef(({ className: e, children: t, ...r }, a) => {
          let { error: l, formMessageId: n } = p(),
            i = l ? String(l?.message) : t;
          return i
            ? (0, s.jsx)("p", {
                ref: a,
                id: n,
                className: (0, d.cn)(
                  "text-[0.8rem] font-medium text-destructive",
                  e,
                ),
                ...r,
                children: i,
              })
            : null;
        });
        y.displayName = "FormMessage";
      },
      7722: (e, t, r) => {
        "use strict";
        r.d(t, { p: () => n });
        var s = r(5512),
          a = r(8009),
          l = r(4195);
        let n = a.forwardRef(({ className: e, type: t, ...r }, a) =>
          (0, s.jsx)("input", {
            type: t,
            className: (0, l.cn)(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              e,
            ),
            ref: a,
            ...r,
          }),
        );
        n.displayName = "Input";
      },
      1891: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => s }));
        let s = (0, r(6760).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/profile/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/profile/page.tsx",
          "default",
        );
      },
      440: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => a }));
        var s = r(8077);
        let a = async (e) => [
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
    s = t.X(0, [638, 778, 77, 370, 74, 96], () => r(109));
  module.exports = s;
})();
