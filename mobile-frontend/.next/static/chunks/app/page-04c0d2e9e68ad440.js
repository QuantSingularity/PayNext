(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    2015: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 7464));
    },
    7464: (e, s, t) => {
      "use strict";
      (t.r(s), t.d(s, { default: () => k }));
      var a = t(5155),
        r = t(98),
        l = t(8283),
        n = t(3577),
        c = t(7568),
        d = t(6967),
        o = t(8251),
        i = t(8017),
        m = t(8173),
        x = t.n(m),
        u = t(6046),
        h = t(2115),
        p = t(814),
        g = t(8129);
      let b = (e) => {
        let { onScanSuccess: s, onScanFailure: t } = e,
          r = (0, h.useRef)(null),
          l = (0, h.useRef)(!1),
          n = "html5qr-code-full-region";
        return (
          (0, h.useEffect)(() => {
            if (!r.current) {
              let e = new g.TF(
                n,
                {
                  fps: 10,
                  qrbox: (e, s) => {
                    let t = Math.floor(0.7 * Math.min(e, s));
                    return { width: t, height: t };
                  },
                  rememberLastUsedCamera: !0,
                  supportedScanTypes: [g.a8.SCAN_TYPE_CAMERA],
                },
                !1,
              );
              (e.render(
                (e, t) => {
                  l.current || ((l.current = !0), s(e, t));
                },
                (e) => {
                  t && t(e);
                },
              ),
                (r.current = e));
            }
            return () => {
              r.current &&
                (r.current.clear().catch((e) => {
                  console.error(
                    "Failed to clear html5-qrcode scanner on unmount.",
                    e,
                  );
                }),
                (r.current = null));
            };
          }, [s, t]),
          (0, a.jsx)("div", { id: n, className: "w-full" })
        );
      };
      var f = t(3312),
        j = t(9749),
        N = t(1344),
        w = t(7081),
        v = t(7146),
        y = t(1410);
      function k() {
        let [e, s] = (0, h.useState)(null),
          [t, m] = (0, h.useState)([]),
          [g, k] = (0, h.useState)(!0),
          [I, R] = (0, h.useState)(!1),
          { user: S } = (0, v.A)(),
          C = (0, u.useRouter)();
        (0, h.useEffect)(() => {
          (async () => {
            k(!0);
            try {
              let e = y.kY ? y.GP : y.uE,
                [t, a] = await Promise.all([
                  e.getBalance(),
                  e.getTransactions(5),
                ]);
              if (t.success && t.data) {
                let e = t.data;
                s(e.balance);
              } else p.oR.error("Failed to load balance data");
              a.success && a.data
                ? m(a.data)
                : p.oR.error("Failed to load transaction data");
            } catch (e) {
              (console.error("Failed to fetch data:", e),
                p.oR.error("Failed to load dashboard data"));
            } finally {
              k(!1);
            }
          })();
        }, []);
        let A = async (e, s) => {
            (console.log("Scan result: ".concat(e), s), R(!1));
            try {
              if (e.startsWith("paynext://")) {
                let s = new URL(e),
                  t = s.hostname;
                if ("request" === t) {
                  let e = s.searchParams.get("details");
                  if (e) {
                    let s = JSON.parse(decodeURIComponent(e));
                    (C.push(
                      "/send?recipient="
                        .concat(s.userId, "&amount=")
                        .concat(s.amount, "&memo=")
                        .concat(encodeURIComponent(s.memo || "")),
                    ),
                      p.oR.success("Opening payment form..."));
                  }
                } else if ("pay" === t) {
                  let e = s.searchParams.get("details");
                  if (e) {
                    let s = JSON.parse(decodeURIComponent(e));
                    (C.push(
                      "/send?recipient="
                        .concat(s.recipient, "&amount=")
                        .concat(s.amount),
                    ),
                      p.oR.success("Opening payment form..."));
                  }
                } else p.oR.info("QR Code Scanned: ".concat(e));
              } else
                (C.push("/send?recipient=".concat(encodeURIComponent(e))),
                  p.oR.info("Recipient scanned. Opening payment form..."));
            } catch (e) {
              (console.error("Failed to parse QR code:", e),
                p.oR.error("Invalid QR code format"));
            }
          },
          Z = (e) => {
            try {
              return new Date(e).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            } catch (s) {
              return e;
            }
          };
        return (0, a.jsxs)("div", {
          className: "space-y-5",
          children: [
            (0, a.jsxs)("div", {
              className:
                "relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-violet-600 p-6 text-white shadow-xl shadow-blue-500/20",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50",
                }),
                (0, a.jsxs)("div", {
                  className: "relative",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center justify-between mb-4",
                      children: [
                        (0, a.jsx)("div", {
                          children: S
                            ? (0, a.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, a.jsx)("div", {
                                    className:
                                      "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold",
                                    children: S.name
                                      .split(" ")
                                      .map((e) => e[0])
                                      .join("")
                                      .toUpperCase()
                                      .slice(0, 2),
                                  }),
                                  (0, a.jsxs)("p", {
                                    className: "text-sm text-white/80",
                                    children: [
                                      "Welcome back, ",
                                      S.name.split(" ")[0],
                                    ],
                                  }),
                                ],
                              })
                            : (0, a.jsx)("p", {
                                className: "text-sm text-white/70",
                                children: "Your Wallet",
                              }),
                        }),
                        (0, a.jsx)(r.A, { className: "h-5 w-5 text-white/40" }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "text-sm text-white/70 mb-1",
                      children: "Available Balance",
                    }),
                    g
                      ? (0, a.jsx)(w.E, {
                          className: "h-12 w-48 bg-white/20 rounded-xl",
                        })
                      : (0, a.jsxs)("p", {
                          className: "text-5xl font-bold tracking-tight",
                          children: ["$", null !== e ? e.toFixed(2) : "—"],
                        }),
                    (0, a.jsx)("p", {
                      className: "text-xs text-white/50 mt-3",
                      children: "USD • PayNext Wallet",
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              className: "grid grid-cols-3 gap-3",
              children: [
                (0, a.jsx)(x(), {
                  href: "/send",
                  passHref: !0,
                  children: (0, a.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors",
                        children: (0, a.jsx)(l.A, {
                          className: "h-5 w-5 text-blue-600 dark:text-blue-400",
                        }),
                      }),
                      (0, a.jsx)("span", {
                        className: "text-xs font-medium text-foreground/80",
                        children: "Send",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(x(), {
                  href: "/request",
                  passHref: !0,
                  children: (0, a.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-green-200 transition-all cursor-pointer group",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors",
                        children: (0, a.jsx)(n.A, {
                          className:
                            "h-5 w-5 text-green-600 dark:text-green-400",
                        }),
                      }),
                      (0, a.jsx)("span", {
                        className: "text-xs font-medium text-foreground/80",
                        children: "Request",
                      }),
                    ],
                  }),
                }),
                (0, a.jsxs)(N.lG, {
                  open: I,
                  onOpenChange: R,
                  children: [
                    (0, a.jsx)(N.zM, {
                      asChild: !0,
                      children: (0, a.jsxs)("div", {
                        className:
                          "flex flex-col items-center justify-center gap-2 rounded-2xl bg-card border border-border/60 p-4 h-24 shadow-sm hover:shadow-md hover:border-violet-200 transition-all cursor-pointer group",
                        children: [
                          (0, a.jsx)("div", {
                            className:
                              "w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-900/50 transition-colors",
                            children: (0, a.jsx)(c.A, {
                              className:
                                "h-5 w-5 text-violet-600 dark:text-violet-400",
                            }),
                          }),
                          (0, a.jsx)("span", {
                            className: "text-xs font-medium text-foreground/80",
                            children: "Scan QR",
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsxs)(N.Cf, {
                      className:
                        "max-w-md w-full p-0 rounded-2xl overflow-hidden",
                      children: [
                        (0, a.jsx)(N.c7, {
                          className: "p-5 border-b bg-muted/30",
                          children: (0, a.jsx)(N.L3, {
                            className: "text-base",
                            children: "Scan QR Code",
                          }),
                        }),
                        (0, a.jsx)("div", {
                          className: "p-5",
                          children:
                            I &&
                            (0, a.jsx)(b, {
                              onScanSuccess: A,
                              onScanFailure: (e) => {},
                            }),
                        }),
                        (0, a.jsx)(N.HM, {
                          asChild: !0,
                          children: (0, a.jsxs)(f.$, {
                            type: "button",
                            variant: "ghost",
                            size: "sm",
                            className:
                              "absolute top-4 right-4 h-8 w-8 p-0 rounded-full",
                            children: [
                              (0, a.jsx)("span", {
                                className: "sr-only",
                                children: "Close",
                              }),
                              (0, a.jsx)("span", {
                                "aria-hidden": !0,
                                children: "✕",
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
            (0, a.jsxs)(j.Zp, {
              className: "rounded-2xl border-border/60 shadow-sm",
              children: [
                (0, a.jsxs)(j.aR, {
                  className:
                    "flex flex-row items-center justify-between pb-3 pt-5 px-5",
                  children: [
                    (0, a.jsx)(j.ZB, {
                      className: "text-base font-semibold",
                      children: "Recent Activity",
                    }),
                    (0, a.jsx)(x(), {
                      href: "/transactions",
                      children: (0, a.jsxs)(f.$, {
                        variant: "ghost",
                        size: "sm",
                        className:
                          "text-blue-600 dark:text-blue-400 hover:text-blue-700 -mr-2 h-8 gap-1 text-xs font-medium",
                        children: [
                          "View All",
                          (0, a.jsx)(d.A, { className: "h-3.5 w-3.5" }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, a.jsx)(j.Wu, {
                  className: "px-5 pb-5",
                  children: g
                    ? (0, a.jsx)("div", {
                        className: "space-y-4",
                        children: [1, 2, 3].map((e) =>
                          (0, a.jsxs)(
                            "div",
                            {
                              className: "flex items-center gap-3",
                              children: [
                                (0, a.jsx)(w.E, {
                                  className:
                                    "h-10 w-10 rounded-xl flex-shrink-0",
                                }),
                                (0, a.jsxs)("div", {
                                  className: "flex-1 space-y-1.5",
                                  children: [
                                    (0, a.jsx)(w.E, {
                                      className: "h-3.5 w-32",
                                    }),
                                    (0, a.jsx)(w.E, { className: "h-3 w-20" }),
                                  ],
                                }),
                                (0, a.jsx)(w.E, { className: "h-4 w-16" }),
                              ],
                            },
                            e,
                          ),
                        ),
                      })
                    : t.length > 0
                      ? (0, a.jsx)("ul", {
                          className: "space-y-1",
                          children: t.map((e) =>
                            (0, a.jsxs)(
                              "li",
                              {
                                className:
                                  "flex items-center gap-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors -mx-2 px-2",
                                children: [
                                  (0, a.jsx)("div", {
                                    className:
                                      "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ".concat(
                                        e.amount < 0
                                          ? "bg-red-50 dark:bg-red-900/20"
                                          : "bg-green-50 dark:bg-green-900/20",
                                      ),
                                    children:
                                      e.amount < 0
                                        ? (0, a.jsx)(o.A, {
                                            className:
                                              "h-4.5 w-4.5 text-red-500 dark:text-red-400",
                                          })
                                        : (0, a.jsx)(i.A, {
                                            className:
                                              "h-4.5 w-4.5 text-green-500 dark:text-green-400",
                                          }),
                                  }),
                                  (0, a.jsxs)("div", {
                                    className: "flex-grow min-w-0",
                                    children: [
                                      (0, a.jsx)("p", {
                                        className:
                                          "font-medium text-sm truncate",
                                        children: e.description,
                                      }),
                                      (0, a.jsxs)("p", {
                                        className:
                                          "text-xs text-muted-foreground mt-0.5",
                                        children: [
                                          Z(e.date),
                                          e.status &&
                                            (0, a.jsx)("span", {
                                              className:
                                                "ml-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ".concat(
                                                  "completed" === e.status
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                                                ),
                                              children: e.status,
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("p", {
                                    className:
                                      "font-semibold text-sm tabular-nums flex-shrink-0 ".concat(
                                        e.amount < 0
                                          ? "text-red-600 dark:text-red-400"
                                          : "text-green-600 dark:text-green-400",
                                      ),
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
                      : (0, a.jsxs)("div", {
                          className: "flex flex-col items-center py-8 gap-2",
                          children: [
                            (0, a.jsx)("div", {
                              className:
                                "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1",
                              children: (0, a.jsx)(i.A, {
                                className: "h-6 w-6 text-muted-foreground",
                              }),
                            }),
                            (0, a.jsx)("p", {
                              className:
                                "text-sm font-medium text-muted-foreground",
                              children: "No transactions yet",
                            }),
                            (0, a.jsx)("p", {
                              className: "text-xs text-muted-foreground/70",
                              children: "Your activity will appear here",
                            }),
                          ],
                        }),
                }),
              ],
            }),
          ],
        });
      }
    },
    7081: (e, s, t) => {
      "use strict";
      t.d(s, { E: () => l });
      var a = t(5155),
        r = t(1567);
      function l(e) {
        let { className: s, ...t } = e;
        return (0, a.jsx)("div", {
          className: (0, r.cn)("animate-pulse rounded-md bg-primary/10", s),
          ...t,
        });
      }
    },
  },
  (e) => {
    var s = (s) => e((e.s = s));
    (e.O(0, [604, 327, 807, 104, 501, 721, 441, 517, 358], () => s(2015)),
      (_N_E = e.O()));
  },
]);
