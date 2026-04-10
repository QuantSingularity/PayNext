(() => {
  var e = {};
  ((e.id = 790),
    (e.ids = [790]),
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
      3088: (e, t, r) => {
        "use strict";
        (r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => u,
            pages: () => c,
            routeModule: () => m,
            tree: () => l,
          }));
        var s = r(260),
          a = r(8203),
          n = r(5155),
          i = r.n(n),
          o = r(7292),
          d = {};
        for (let e in o)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (d[e] = () => o[e]);
        r.d(t, d);
        let l = [
            "",
            {
              children: [
                "transactions",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(r.bind(r, 513)),
                        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/transactions/page.tsx",
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
            "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/transactions/page.tsx",
          ],
          u = { require: r, loadChunk: () => Promise.resolve() },
          m = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/transactions/page",
              pathname: "/transactions",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: l },
          });
      },
      7141: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 513));
      },
      293: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 2453));
      },
      8267: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(3468).A)("ArrowDownLeft", [
          ["path", { d: "M17 7 7 17", key: "15tmo1" }],
          ["path", { d: "M17 17H7V7", key: "1org7z" }],
        ]);
      },
      7223: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        let s = (0, r(3468).A)("ArrowUpRight", [
          ["path", { d: "M7 7h10v10", key: "1tivn9" }],
          ["path", { d: "M7 17 17 7", key: "1vkiza" }],
        ]);
      },
      2453: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => c }));
        var s = r(5512);
        let a = (0, r(3468).A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]);
        var n = r(7223),
          i = r(8267),
          o = r(8009);
        r(1542);
        var d = r(7722),
          l = r(7093);
        function c() {
          let [e, t] = (0, o.useState)([]),
            [r, c] = (0, o.useState)(!0),
            [u, m] = (0, o.useState)(""),
            p = (0, o.useMemo)(() => {
              if (!u.trim()) return e;
              let t = u.toLowerCase();
              return e.filter(
                (e) =>
                  e.description.toLowerCase().includes(t) ||
                  e.date.includes(t) ||
                  String(Math.abs(e.amount)).includes(t),
              );
            }, [e, u]),
            x = (e) => {
              try {
                return new Date(e).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              } catch {
                return e;
              }
            };
          return (0, s.jsxs)("div", {
            className: "space-y-5",
            children: [
              (0, s.jsx)("h1", {
                className: "text-2xl font-bold tracking-tight",
                children: "Transactions",
              }),
              (0, s.jsxs)("div", {
                className: "relative",
                children: [
                  (0, s.jsx)(a, {
                    className:
                      "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                  }),
                  (0, s.jsx)(d.p, {
                    placeholder: "Search transactions...",
                    className:
                      "pl-9 rounded-xl h-11 bg-muted/30 border-border/50",
                    value: u,
                    onChange: (e) => m(e.target.value),
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className:
                  "rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden",
                children: r
                  ? (0, s.jsx)("div", {
                      className: "divide-y divide-border/40",
                      children: [1, 2, 3, 4, 5].map((e) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: "flex items-center gap-3 p-4",
                            children: [
                              (0, s.jsx)(l.E, {
                                className: "h-10 w-10 rounded-xl flex-shrink-0",
                              }),
                              (0, s.jsxs)("div", {
                                className: "flex-1 space-y-1.5",
                                children: [
                                  (0, s.jsx)(l.E, { className: "h-3.5 w-36" }),
                                  (0, s.jsx)(l.E, { className: "h-3 w-24" }),
                                ],
                              }),
                              (0, s.jsx)(l.E, { className: "h-4 w-16" }),
                            ],
                          },
                          e,
                        ),
                      ),
                    })
                  : p.length > 0
                    ? (0, s.jsx)("ul", {
                        className: "divide-y divide-border/40",
                        children: p.map((e) =>
                          (0, s.jsxs)(
                            "li",
                            {
                              className:
                                "flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors",
                              children: [
                                (0, s.jsx)("div", {
                                  className: `w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${e.amount < 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"}`,
                                  children:
                                    e.amount < 0
                                      ? (0, s.jsx)(n.A, {
                                          className:
                                            "h-4.5 w-4.5 text-red-500 dark:text-red-400",
                                        })
                                      : (0, s.jsx)(i.A, {
                                          className:
                                            "h-4.5 w-4.5 text-green-500 dark:text-green-400",
                                        }),
                                }),
                                (0, s.jsxs)("div", {
                                  className: "flex-grow min-w-0",
                                  children: [
                                    (0, s.jsx)("p", {
                                      className: "font-medium text-sm truncate",
                                      children: e.description,
                                    }),
                                    (0, s.jsxs)("p", {
                                      className:
                                        "text-xs text-muted-foreground mt-0.5",
                                      children: [
                                        x(e.date),
                                        e.status &&
                                          (0, s.jsx)("span", {
                                            className: `ml-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${"completed" === e.status ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}`,
                                            children: e.status,
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("p", {
                                  className: `font-semibold text-sm tabular-nums flex-shrink-0 ${e.amount < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`,
                                  children: [
                                    e.amount < 0 ? "-" : "+",
                                    "$",
                                    Math.abs(e.amount).toFixed(2),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
                      })
                    : (0, s.jsxs)("div", {
                        className:
                          "flex flex-col items-center py-12 gap-2 text-center px-4",
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1",
                            children: (0, s.jsx)(a, {
                              className: "h-5 w-5 text-muted-foreground",
                            }),
                          }),
                          (0, s.jsx)("p", {
                            className:
                              "text-sm font-medium text-muted-foreground",
                            children: u
                              ? "No matching transactions"
                              : "No transactions yet",
                          }),
                          (0, s.jsx)("p", {
                            className: "text-xs text-muted-foreground/60",
                            children: u
                              ? "Try a different search term"
                              : "Your transactions will appear here",
                          }),
                        ],
                      }),
              }),
            ],
          });
        }
        r(3612);
      },
      7722: (e, t, r) => {
        "use strict";
        r.d(t, { p: () => i });
        var s = r(5512),
          a = r(8009),
          n = r(4195);
        let i = a.forwardRef(({ className: e, type: t, ...r }, a) =>
          (0, s.jsx)("input", {
            type: t,
            className: (0, n.cn)(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              e,
            ),
            ref: a,
            ...r,
          }),
        );
        i.displayName = "Input";
      },
      7093: (e, t, r) => {
        "use strict";
        r.d(t, { E: () => n });
        var s = r(5512),
          a = r(4195);
        function n({ className: e, ...t }) {
          return (0, s.jsx)("div", {
            className: (0, a.cn)("animate-pulse rounded-md bg-primary/10", e),
            ...t,
          });
        }
      },
      513: (e, t, r) => {
        "use strict";
        (r.r(t), r.d(t, { default: () => s }));
        let s = (0, r(6760).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/transactions/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/transactions/page.tsx",
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
    s = t.X(0, [638, 778, 77, 96], () => r(3088));
  module.exports = s;
})();
