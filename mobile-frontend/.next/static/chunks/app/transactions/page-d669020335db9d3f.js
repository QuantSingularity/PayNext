(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [790],
  {
    259: (e, t, s) => {
      Promise.resolve().then(s.bind(s, 7794));
    },
    8017: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => r });
      let r = (0, s(2134).A)("ArrowDownLeft", [
        ["path", { d: "M17 7 7 17", key: "15tmo1" }],
        ["path", { d: "M17 17H7V7", key: "1org7z" }],
      ]);
    },
    8251: (e, t, s) => {
      "use strict";
      s.d(t, { A: () => r });
      let r = (0, s(2134).A)("ArrowUpRight", [
        ["path", { d: "M7 7h10v10", key: "1tivn9" }],
        ["path", { d: "M7 17 17 7", key: "1vkiza" }],
      ]);
    },
    7794: (e, t, s) => {
      "use strict";
      (s.r(t), s.d(t, { default: () => m }));
      var r = s(5155);
      let a = (0, s(2134).A)("Search", [
        ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
        ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
      ]);
      var n = s(8251),
        o = s(8017),
        i = s(2115),
        c = s(814),
        d = s(3900),
        l = s(7081),
        u = s(1410);
      function m() {
        let [e, t] = (0, i.useState)([]),
          [s, m] = (0, i.useState)(!0),
          [h, x] = (0, i.useState)("");
        (0, i.useEffect)(() => {
          (async () => {
            m(!0);
            try {
              let e = u.kY ? u.GP : u.uE,
                s = await e.getTransactions(50);
              s.success && s.data
                ? t(s.data)
                : c.oR.error("Failed to load transactions");
            } catch (e) {
              (console.error("Failed to fetch transactions:", e),
                c.oR.error("Failed to load transactions"));
            } finally {
              m(!1);
            }
          })();
        }, []);
        let y = (0, i.useMemo)(() => {
            if (!h.trim()) return e;
            let t = h.toLowerCase();
            return e.filter(
              (e) =>
                e.description.toLowerCase().includes(t) ||
                e.date.includes(t) ||
                String(Math.abs(e.amount)).includes(t),
            );
          }, [e, h]),
          p = (e) => {
            try {
              return new Date(e).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            } catch (t) {
              return e;
            }
          };
        return (0, r.jsxs)("div", {
          className: "space-y-5",
          children: [
            (0, r.jsx)("h1", {
              className: "text-2xl font-bold tracking-tight",
              children: "Transactions",
            }),
            (0, r.jsxs)("div", {
              className: "relative",
              children: [
                (0, r.jsx)(a, {
                  className:
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                }),
                (0, r.jsx)(d.p, {
                  placeholder: "Search transactions...",
                  className:
                    "pl-9 rounded-xl h-11 bg-muted/30 border-border/50",
                  value: h,
                  onChange: (e) => x(e.target.value),
                }),
              ],
            }),
            (0, r.jsx)("div", {
              className:
                "rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden",
              children: s
                ? (0, r.jsx)("div", {
                    className: "divide-y divide-border/40",
                    children: [1, 2, 3, 4, 5].map((e) =>
                      (0, r.jsxs)(
                        "div",
                        {
                          className: "flex items-center gap-3 p-4",
                          children: [
                            (0, r.jsx)(l.E, {
                              className: "h-10 w-10 rounded-xl flex-shrink-0",
                            }),
                            (0, r.jsxs)("div", {
                              className: "flex-1 space-y-1.5",
                              children: [
                                (0, r.jsx)(l.E, { className: "h-3.5 w-36" }),
                                (0, r.jsx)(l.E, { className: "h-3 w-24" }),
                              ],
                            }),
                            (0, r.jsx)(l.E, { className: "h-4 w-16" }),
                          ],
                        },
                        e,
                      ),
                    ),
                  })
                : y.length > 0
                  ? (0, r.jsx)("ul", {
                      className: "divide-y divide-border/40",
                      children: y.map((e) =>
                        (0, r.jsxs)(
                          "li",
                          {
                            className:
                              "flex items-center gap-3 p-4 hover:bg-muted/40 transition-colors",
                            children: [
                              (0, r.jsx)("div", {
                                className:
                                  "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ".concat(
                                    e.amount < 0
                                      ? "bg-red-50 dark:bg-red-900/20"
                                      : "bg-green-50 dark:bg-green-900/20",
                                  ),
                                children:
                                  e.amount < 0
                                    ? (0, r.jsx)(n.A, {
                                        className:
                                          "h-4.5 w-4.5 text-red-500 dark:text-red-400",
                                      })
                                    : (0, r.jsx)(o.A, {
                                        className:
                                          "h-4.5 w-4.5 text-green-500 dark:text-green-400",
                                      }),
                              }),
                              (0, r.jsxs)("div", {
                                className: "flex-grow min-w-0",
                                children: [
                                  (0, r.jsx)("p", {
                                    className: "font-medium text-sm truncate",
                                    children: e.description,
                                  }),
                                  (0, r.jsxs)("p", {
                                    className:
                                      "text-xs text-muted-foreground mt-0.5",
                                    children: [
                                      p(e.date),
                                      e.status &&
                                        (0, r.jsx)("span", {
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
                              (0, r.jsxs)("p", {
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
                  : (0, r.jsxs)("div", {
                      className:
                        "flex flex-col items-center py-12 gap-2 text-center px-4",
                      children: [
                        (0, r.jsx)("div", {
                          className:
                            "w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-1",
                          children: (0, r.jsx)(a, {
                            className: "h-5 w-5 text-muted-foreground",
                          }),
                        }),
                        (0, r.jsx)("p", {
                          className:
                            "text-sm font-medium text-muted-foreground",
                          children: h
                            ? "No matching transactions"
                            : "No transactions yet",
                        }),
                        (0, r.jsx)("p", {
                          className: "text-xs text-muted-foreground/60",
                          children: h
                            ? "Try a different search term"
                            : "Your transactions will appear here",
                        }),
                      ],
                    }),
            }),
          ],
        });
      }
    },
    3900: (e, t, s) => {
      "use strict";
      s.d(t, { p: () => o });
      var r = s(5155),
        a = s(2115),
        n = s(1567);
      let o = a.forwardRef((e, t) => {
        let { className: s, type: a, ...o } = e;
        return (0, r.jsx)("input", {
          type: a,
          className: (0, n.cn)(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            s,
          ),
          ref: t,
          ...o,
        });
      });
      o.displayName = "Input";
    },
    7081: (e, t, s) => {
      "use strict";
      s.d(t, { E: () => n });
      var r = s(5155),
        a = s(1567);
      function n(e) {
        let { className: t, ...s } = e;
        return (0, r.jsx)("div", {
          className: (0, a.cn)("animate-pulse rounded-md bg-primary/10", t),
          ...s,
        });
      }
    },
    1410: (e, t, s) => {
      "use strict";
      s.d(t, { GP: () => d, kY: () => c, uE: () => i });
      var r = s(2818);
      let a = r.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
        n = r.env.NEXT_PUBLIC_API_GATEWAY_URL || "".concat(a, "/api");
      class o {
        loadToken() {
          this.token = localStorage.getItem("auth_token");
        }
        setToken(e) {
          ((this.token = e), localStorage.setItem("auth_token", e));
        }
        clearToken() {
          ((this.token = null), localStorage.removeItem("auth_token"));
        }
        async request(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            s = { "Content-Type": "application/json", ...t.headers };
          this.token && (s.Authorization = "Bearer ".concat(this.token));
          try {
            let r = await fetch("".concat(this.baseUrl).concat(e), {
                ...t,
                headers: s,
              }),
              a = await r.json();
            if (!r.ok)
              return {
                success: !1,
                error: {
                  message: a.message || "An error occurred",
                  status: r.status,
                  code: a.code,
                },
              };
            return { success: !0, data: a };
          } catch (e) {
            return (
              console.error("API request failed:", e),
              {
                success: !1,
                error: {
                  message: e instanceof Error ? e.message : "Network error",
                  status: 0,
                },
              }
            );
          }
        }
        async login(e, t) {
          return this.request("/users/login", {
            method: "POST",
            body: JSON.stringify({ email: e, password: t }),
          });
        }
        async register(e) {
          return this.request("/users/register", {
            method: "POST",
            body: JSON.stringify(e),
          });
        }
        async getUserProfile() {
          return this.request("/users/profile", { method: "GET" });
        }
        async updateUserProfile(e) {
          return this.request("/users/profile", {
            method: "PUT",
            body: JSON.stringify(e),
          });
        }
        async getBalance() {
          return this.request("/payments/balance", { method: "GET" });
        }
        async getTransactions() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
          return this.request("/transactions?limit=".concat(e), {
            method: "GET",
          });
        }
        async getTransactionById(e) {
          return this.request("/transactions/".concat(e), { method: "GET" });
        }
        async sendPayment(e) {
          return this.request("/payments/send", {
            method: "POST",
            body: JSON.stringify(e),
          });
        }
        async requestPayment(e) {
          return this.request("/payments/request", {
            method: "POST",
            body: JSON.stringify(e),
          });
        }
        async processQrPayment(e) {
          return this.request("/payments/qr", {
            method: "POST",
            body: JSON.stringify({ qrData: e }),
          });
        }
        constructor(e = n) {
          ((this.token = null), (this.baseUrl = e), this.loadToken());
        }
      }
      let i = new o(),
        c = "development" === r.env.NEXT_PUBLIC_ENV,
        d = {
          getBalance: async () => (
            await new Promise((e) => setTimeout(e, 500)),
            { success: !0, data: { balance: 1234.56, currency: "USD" } }
          ),
          async getTransactions() {
            let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 10;
            return (
              await new Promise((e) => setTimeout(e, 500)),
              {
                success: !0,
                data: [
                  {
                    id: "1",
                    type: "debit",
                    description: "Coffee Shop",
                    date: "2025-04-28",
                    amount: -5.5,
                    currency: "USD",
                    status: "completed",
                  },
                  {
                    id: "2",
                    type: "credit",
                    description: "Salary Deposit",
                    date: "2025-04-27",
                    amount: 2500,
                    currency: "USD",
                    status: "completed",
                  },
                  {
                    id: "3",
                    type: "debit",
                    description: "Online Store",
                    date: "2025-04-26",
                    amount: -78.9,
                    currency: "USD",
                    status: "completed",
                  },
                ].slice(0, e),
              }
            );
          },
          sendPayment: async (e) =>
            (await new Promise((e) => setTimeout(e, 1e3)), Math.random() > 0.2)
              ? {
                  success: !0,
                  data: {
                    transactionId: "txn_".concat(Date.now()),
                    status: "completed",
                    ...e,
                  },
                }
              : {
                  success: !1,
                  error: {
                    message: "Payment failed. Please try again.",
                    status: 400,
                  },
                },
          requestPayment: async (e) => (
            await new Promise((e) => setTimeout(e, 500)),
            {
              success: !0,
              data: {
                requestId: "req_".concat(Date.now()),
                qrCode: "paynext://request?details=".concat(
                  encodeURIComponent(JSON.stringify(e)),
                ),
                ...e,
              },
            }
          ),
          getUserProfile: async () => (
            await new Promise((e) => setTimeout(e, 300)),
            {
              success: !0,
              data: {
                id: "user_123",
                name: "Alex Johnson",
                email: "alex.j@example.com",
                avatarUrl: "https://github.com/shadcn.png",
              },
            }
          ),
          updateUserProfile: async (e) =>
            (await new Promise((e) => setTimeout(e, 500)), Math.random() > 0.2)
              ? { success: !0, data: e }
              : {
                  success: !1,
                  error: { message: "Failed to update profile", status: 400 },
                },
        };
    },
    1567: (e, t, s) => {
      "use strict";
      s.d(t, { cn: () => n });
      var r = s(3463),
        a = s(9795);
      function n() {
        for (var e = arguments.length, t = Array(e), s = 0; s < e; s++)
          t[s] = arguments[s];
        return (0, a.QP)((0, r.$)(t));
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    (e.O(0, [327, 441, 517, 358], () => t(259)), (_N_E = e.O()));
  },
]);
