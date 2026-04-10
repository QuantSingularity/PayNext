"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [721],
  {
    3312: (e, t, s) => {
      s.d(t, { $: () => d });
      var a = s(5155),
        r = s(2317),
        n = s(1027),
        o = s(2115),
        i = s(1567);
      let c = (0, n.F)(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          {
            variants: {
              variant: {
                default:
                  "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive:
                  "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                  "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                  "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
              },
              size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
              },
            },
            defaultVariants: { variant: "default", size: "default" },
          },
        ),
        d = o.forwardRef((e, t) => {
          let { className: s, variant: n, size: o, asChild: d = !1, ...l } = e,
            u = d ? r.DX : "button";
          return (0, a.jsx)(u, {
            className: (0, i.cn)(c({ variant: n, size: o, className: s })),
            ref: t,
            ...l,
          });
        });
      d.displayName = "Button";
    },
    9749: (e, t, s) => {
      s.d(t, {
        BT: () => d,
        Wu: () => l,
        ZB: () => c,
        Zp: () => o,
        aR: () => i,
        wL: () => u,
      });
      var a = s(5155),
        r = s(2115),
        n = s(1567);
      let o = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)(
            "rounded-xl border bg-card text-card-foreground shadow",
            s,
          ),
          ...r,
        });
      });
      o.displayName = "Card";
      let i = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex flex-col space-y-1.5 p-6", s),
          ...r,
        });
      });
      i.displayName = "CardHeader";
      let c = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)("font-semibold leading-none tracking-tight", s),
          ...r,
        });
      });
      c.displayName = "CardTitle";
      let d = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)("text-sm text-muted-foreground", s),
          ...r,
        });
      });
      d.displayName = "CardDescription";
      let l = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)("p-6 pt-0", s),
          ...r,
        });
      });
      l.displayName = "CardContent";
      let u = r.forwardRef((e, t) => {
        let { className: s, ...r } = e;
        return (0, a.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex items-center p-6 pt-0", s),
          ...r,
        });
      });
      u.displayName = "CardFooter";
    },
    1344: (e, t, s) => {
      s.d(t, {
        Cf: () => f,
        Es: () => y,
        HM: () => u,
        L3: () => p,
        c7: () => g,
        lG: () => c,
        rr: () => h,
        zM: () => d,
      });
      var a = s(5155),
        r = s(7139),
        n = s(767),
        o = s(2115),
        i = s(1567);
      let c = r.bL,
        d = r.l9,
        l = r.ZL,
        u = r.bm,
        m = o.forwardRef((e, t) => {
          let { className: s, ...n } = e;
          return (0, a.jsx)(r.hJ, {
            ref: t,
            className: (0, i.cn)(
              "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              s,
            ),
            ...n,
          });
        });
      m.displayName = r.hJ.displayName;
      let f = o.forwardRef((e, t) => {
        let { className: s, children: o, ...c } = e;
        return (0, a.jsxs)(l, {
          children: [
            (0, a.jsx)(m, {}),
            (0, a.jsxs)(r.UC, {
              ref: t,
              className: (0, i.cn)(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                s,
              ),
              ...c,
              children: [
                o,
                (0, a.jsxs)(r.bm, {
                  className:
                    "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                  children: [
                    (0, a.jsx)(n.A, { className: "h-4 w-4" }),
                    (0, a.jsx)("span", {
                      className: "sr-only",
                      children: "Close",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      });
      f.displayName = r.UC.displayName;
      let g = (e) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)("div", {
          className: (0, i.cn)(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            t,
          ),
          ...s,
        });
      };
      g.displayName = "DialogHeader";
      let y = (e) => {
        let { className: t, ...s } = e;
        return (0, a.jsx)("div", {
          className: (0, i.cn)(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            t,
          ),
          ...s,
        });
      };
      y.displayName = "DialogFooter";
      let p = o.forwardRef((e, t) => {
        let { className: s, ...n } = e;
        return (0, a.jsx)(r.hE, {
          ref: t,
          className: (0, i.cn)(
            "text-lg font-semibold leading-none tracking-tight",
            s,
          ),
          ...n,
        });
      });
      p.displayName = r.hE.displayName;
      let h = o.forwardRef((e, t) => {
        let { className: s, ...n } = e;
        return (0, a.jsx)(r.VY, {
          ref: t,
          className: (0, i.cn)("text-sm text-muted-foreground", s),
          ...n,
        });
      });
      h.displayName = r.VY.displayName;
    },
    7146: (e, t, s) => {
      s.d(t, { A: () => d, AuthProvider: () => c });
      var a = s(5155),
        r = s(2115),
        n = s(814),
        o = s(1410);
      let i = (0, r.createContext)(void 0);
      function c(e) {
        let { children: t } = e,
          [s, c] = (0, r.useState)(null),
          [d, l] = (0, r.useState)(!0),
          u = (0, r.useCallback)(async () => {
            try {
              let e = o.kY ? o.GP : o.uE,
                t = await e.getUserProfile();
              t.success && t.data && c(t.data);
            } catch (e) {
              console.error("Failed to refresh user:", e);
            }
          }, []);
        (0, r.useEffect)(() => {
          (async () => {
            (localStorage.getItem("auth_token") && (await u()), l(!1));
          })();
        }, [u]);
        let m = async (e, t) => {
            try {
              if (o.kY) {
                let e = "mock_jwt_token_".concat(Date.now());
                o.uE.setToken(e);
                let t = await o.GP.getUserProfile();
                if (t.success && t.data)
                  return (
                    c(t.data),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
              } else {
                var s;
                let a = await o.uE.login(e, t);
                if (a.success && a.data) {
                  let { token: e, user: t } = a.data;
                  return (
                    o.uE.setToken(e),
                    c(t),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
                }
                n.oR.error(
                  (null === (s = a.error) || void 0 === s
                    ? void 0
                    : s.message) || "Login failed",
                );
              }
            } catch (e) {
              n.oR.error("Login failed");
            }
            return !1;
          },
          f = async (e, t, s) => {
            try {
              var a;
              let r = await o.uE.register({ name: e, email: t, password: s });
              if (r.success)
                return (
                  n.oR.success("Registration successful! Please log in."),
                  !0
                );
              return (
                n.oR.error(
                  (null === (a = r.error) || void 0 === a
                    ? void 0
                    : a.message) || "Registration failed",
                ),
                !1
              );
            } catch (e) {
              return (n.oR.error("Registration failed"), !1);
            }
          },
          g = async (e) => {
            try {
              let t = o.kY ? o.GP : o.uE;
              if ((await t.updateUserProfile(e)).success)
                return (c((t) => (t ? { ...t, ...e } : null)), !0);
              return !1;
            } catch (e) {
              return !1;
            }
          };
        return (0, a.jsx)(i.Provider, {
          value: {
            user: s,
            isAuthenticated: !!s,
            isLoading: d,
            login: m,
            register: f,
            logout: () => {
              (o.uE.clearToken(),
                c(null),
                n.oR.info("Logged out successfully"));
            },
            updateProfile: g,
            refreshUser: u,
          },
          children: t,
        });
      }
      function d() {
        let e = (0, r.useContext)(i);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
    },
    1410: (e, t, s) => {
      s.d(t, { GP: () => d, kY: () => c, uE: () => i });
      var a = s(2818);
      let r = a.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
        n = a.env.NEXT_PUBLIC_API_GATEWAY_URL || "".concat(r, "/api");
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
            let a = await fetch("".concat(this.baseUrl).concat(e), {
                ...t,
                headers: s,
              }),
              r = await a.json();
            if (!a.ok)
              return {
                success: !1,
                error: {
                  message: r.message || "An error occurred",
                  status: a.status,
                  code: r.code,
                },
              };
            return { success: !0, data: r };
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
        c = "development" === a.env.NEXT_PUBLIC_ENV,
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
      s.d(t, { cn: () => n });
      var a = s(3463),
        r = s(9795);
      function n() {
        for (var e = arguments.length, t = Array(e), s = 0; s < e; s++)
          t[s] = arguments[s];
        return (0, r.QP)((0, a.$)(t));
      }
    },
  },
]);
