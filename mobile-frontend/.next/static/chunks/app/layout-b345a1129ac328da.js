(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [177],
  {
    4520: (e, t, r) => {
      (Promise.resolve().then(r.bind(r, 7113)),
        Promise.resolve().then(r.t.bind(r, 6196, 23)),
        Promise.resolve().then(r.t.bind(r, 347, 23)),
        Promise.resolve().then(r.bind(r, 2105)),
        Promise.resolve().then(r.bind(r, 9031)),
        Promise.resolve().then(r.bind(r, 6795)),
        Promise.resolve().then(r.bind(r, 7146)));
    },
    1466: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => s });
      let s = (0, r(2134).A)("User", [
        [
          "path",
          { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" },
        ],
        ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
      ]);
    },
    2105: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => h });
      var s = r(5155);
      let a = (0, r(2134).A)("Home", [
        [
          "path",
          {
            d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "y5dka4",
          },
        ],
        ["polyline", { points: "9 22 9 12 15 12 15 22", key: "e2us08" }],
      ]);
      var n = r(8283),
        o = r(3577),
        i = r(1466),
        l = r(8173),
        c = r.n(l),
        d = r(6046),
        u = r(1567);
      let m = [
          { href: "/", label: "Home", icon: a },
          { href: "/send", label: "Send", icon: n.A },
          { href: "/request", label: "Request", icon: o.A },
          { href: "/profile", label: "Profile", icon: i.A },
        ],
        h = () => {
          let e = (0, d.usePathname)();
          return (0, s.jsxs)("nav", {
            className: "fixed bottom-0 left-0 right-0 z-50",
            children: [
              (0, s.jsx)("div", {
                className:
                  "absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-2xl",
              }),
              (0, s.jsx)("div", {
                className:
                  "relative max-w-md mx-auto flex justify-around items-center h-16 px-2",
                children: m.map((t) => {
                  let r = e === t.href,
                    a = t.icon;
                  return (0, s.jsxs)(
                    c(),
                    {
                      href: t.href,
                      className: (0, u.cn)(
                        "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
                        r
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      ),
                      children: [
                        (0, s.jsx)("div", {
                          className: (0, u.cn)(
                            "flex items-center justify-center w-10 h-6 rounded-full transition-all duration-200",
                            r && "bg-primary/10 dark:bg-primary/20",
                          ),
                          children: (0, s.jsx)(a, {
                            className: (0, u.cn)(
                              "h-5 w-5 transition-all duration-200",
                              r
                                ? "text-primary scale-110"
                                : "text-muted-foreground",
                            ),
                          }),
                        }),
                        (0, s.jsx)("span", {
                          className: (0, u.cn)(
                            "text-[10px] font-medium transition-all duration-200",
                            r ? "text-primary" : "text-muted-foreground",
                          ),
                          children: t.label,
                        }),
                      ],
                    },
                    t.href,
                  );
                }),
              }),
            ],
          });
        };
    },
    9031: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => c });
      var s = r(5155);
      let a = (0, r(2134).A)("CircleAlert", [
        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
        ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
        ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
      ]);
      var n = r(2115),
        o = r(3312),
        i = r(9749);
      class l extends n.Component {
        static getDerivedStateFromError(e) {
          return { hasError: !0, error: e };
        }
        componentDidCatch(e, t) {
          console.error("ErrorBoundary caught an error:", e, t);
        }
        render() {
          return this.state.hasError
            ? (0, s.jsx)("div", {
                className: "min-h-screen flex items-center justify-center p-4",
                children: (0, s.jsxs)(i.Zp, {
                  className: "max-w-md w-full",
                  children: [
                    (0, s.jsxs)(i.aR, {
                      children: [
                        (0, s.jsxs)("div", {
                          className: "flex items-center space-x-2",
                          children: [
                            (0, s.jsx)(a, {
                              className: "h-6 w-6 text-destructive",
                            }),
                            (0, s.jsx)(i.ZB, {
                              children: "Something went wrong",
                            }),
                          ],
                        }),
                        (0, s.jsx)(i.BT, {
                          children:
                            "We encountered an unexpected error. Please try again.",
                        }),
                      ],
                    }),
                    (0, s.jsx)(i.Wu, {
                      children:
                        this.state.error &&
                        (0, s.jsx)("div", {
                          className: "bg-muted p-3 rounded-md",
                          children: (0, s.jsx)("p", {
                            className:
                              "text-sm font-mono text-muted-foreground",
                            children: this.state.error.message,
                          }),
                        }),
                    }),
                    (0, s.jsx)(i.wL, {
                      children: (0, s.jsx)(o.$, {
                        onClick: this.handleReset,
                        className: "w-full",
                        children: "Return to Home",
                      }),
                    }),
                  ],
                }),
              })
            : this.props.children;
        }
        constructor(e) {
          (super(e),
            (this.handleReset = () => {
              (this.setState({ hasError: !1, error: null }),
                (window.location.href = "/"));
            }),
            (this.state = { hasError: !1, error: null }));
        }
      }
      let c = l;
    },
    3312: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => c });
      var s = r(5155),
        a = r(2317),
        n = r(1027),
        o = r(2115),
        i = r(1567);
      let l = (0, n.F)(
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
        c = o.forwardRef((e, t) => {
          let { className: r, variant: n, size: o, asChild: c = !1, ...d } = e,
            u = c ? a.DX : "button";
          return (0, s.jsx)(u, {
            className: (0, i.cn)(l({ variant: n, size: o, className: r })),
            ref: t,
            ...d,
          });
        });
      c.displayName = "Button";
    },
    9749: (e, t, r) => {
      "use strict";
      r.d(t, {
        BT: () => c,
        Wu: () => d,
        ZB: () => l,
        Zp: () => o,
        aR: () => i,
        wL: () => u,
      });
      var s = r(5155),
        a = r(2115),
        n = r(1567);
      let o = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)(
            "rounded-xl border bg-card text-card-foreground shadow",
            r,
          ),
          ...a,
        });
      });
      o.displayName = "Card";
      let i = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex flex-col space-y-1.5 p-6", r),
          ...a,
        });
      });
      i.displayName = "CardHeader";
      let l = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("font-semibold leading-none tracking-tight", r),
          ...a,
        });
      });
      l.displayName = "CardTitle";
      let c = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("text-sm text-muted-foreground", r),
          ...a,
        });
      });
      c.displayName = "CardDescription";
      let d = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("p-6 pt-0", r),
          ...a,
        });
      });
      d.displayName = "CardContent";
      let u = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex items-center p-6 pt-0", r),
          ...a,
        });
      });
      u.displayName = "CardFooter";
    },
    6795: (e, t, r) => {
      "use strict";
      r.d(t, { Toaster: () => o });
      var s = r(5155),
        a = r(7113),
        n = r(814);
      let o = (e) => {
        let { ...t } = e,
          { theme: r = "system" } = (0, a.D)();
        return (0, s.jsx)(n.l$, {
          theme: r,
          className: "toaster group",
          toastOptions: {
            classNames: {
              toast:
                "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
              description: "group-[.toast]:text-muted-foreground",
              actionButton:
                "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
              cancelButton:
                "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            },
          },
          ...t,
        });
      };
    },
    7146: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => c, AuthProvider: () => l });
      var s = r(5155),
        a = r(2115),
        n = r(814),
        o = r(1410);
      let i = (0, a.createContext)(void 0);
      function l(e) {
        let { children: t } = e,
          [r, l] = (0, a.useState)(null),
          [c, d] = (0, a.useState)(!0),
          u = (0, a.useCallback)(async () => {
            try {
              let e = o.kY ? o.GP : o.uE,
                t = await e.getUserProfile();
              t.success && t.data && l(t.data);
            } catch (e) {
              console.error("Failed to refresh user:", e);
            }
          }, []);
        (0, a.useEffect)(() => {
          (async () => {
            (localStorage.getItem("auth_token") && (await u()), d(!1));
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
                    l(t.data),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
              } else {
                var r;
                let s = await o.uE.login(e, t);
                if (s.success && s.data) {
                  let { token: e, user: t } = s.data;
                  return (
                    o.uE.setToken(e),
                    l(t),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
                }
                n.oR.error(
                  (null === (r = s.error) || void 0 === r
                    ? void 0
                    : r.message) || "Login failed",
                );
              }
            } catch (e) {
              n.oR.error("Login failed");
            }
            return !1;
          },
          h = async (e, t, r) => {
            try {
              var s;
              let a = await o.uE.register({ name: e, email: t, password: r });
              if (a.success)
                return (
                  n.oR.success("Registration successful! Please log in."),
                  !0
                );
              return (
                n.oR.error(
                  (null === (s = a.error) || void 0 === s
                    ? void 0
                    : s.message) || "Registration failed",
                ),
                !1
              );
            } catch (e) {
              return (n.oR.error("Registration failed"), !1);
            }
          },
          f = async (e) => {
            try {
              let t = o.kY ? o.GP : o.uE;
              if ((await t.updateUserProfile(e)).success)
                return (l((t) => (t ? { ...t, ...e } : null)), !0);
              return !1;
            } catch (e) {
              return !1;
            }
          };
        return (0, s.jsx)(i.Provider, {
          value: {
            user: r,
            isAuthenticated: !!r,
            isLoading: c,
            login: m,
            register: h,
            logout: () => {
              (o.uE.clearToken(),
                l(null),
                n.oR.info("Logged out successfully"));
            },
            updateProfile: f,
            refreshUser: u,
          },
          children: t,
        });
      }
      function c() {
        let e = (0, a.useContext)(i);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
    },
    1410: (e, t, r) => {
      "use strict";
      r.d(t, { GP: () => c, kY: () => l, uE: () => i });
      var s = r(2818);
      let a = s.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
        n = s.env.NEXT_PUBLIC_API_GATEWAY_URL || "".concat(a, "/api");
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
            r = { "Content-Type": "application/json", ...t.headers };
          this.token && (r.Authorization = "Bearer ".concat(this.token));
          try {
            let s = await fetch("".concat(this.baseUrl).concat(e), {
                ...t,
                headers: r,
              }),
              a = await s.json();
            if (!s.ok)
              return {
                success: !1,
                error: {
                  message: a.message || "An error occurred",
                  status: s.status,
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
        l = "development" === s.env.NEXT_PUBLIC_ENV,
        c = {
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
    1567: (e, t, r) => {
      "use strict";
      r.d(t, { cn: () => n });
      var s = r(3463),
        a = r(9795);
      function n() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return (0, a.QP)((0, s.$)(t));
      }
    },
    347: () => {},
    6196: (e) => {
      e.exports = {
        style: { fontFamily: "'Inter', 'Inter Fallback'", fontStyle: "normal" },
        className: "__className_f367f3",
        variable: "__variable_f367f3",
      };
    },
    7113: (e, t, r) => {
      "use strict";
      r.d(t, { D: () => d, ThemeProvider: () => u });
      var s = r(2115),
        a = (e, t, r, s, a, n, o, i) => {
          let l = document.documentElement,
            c = ["light", "dark"];
          function d(t) {
            ((Array.isArray(e) ? e : [e]).forEach((e) => {
              let r = "class" === e,
                s = r && n ? a.map((e) => n[e] || e) : a;
              r
                ? (l.classList.remove(...s),
                  l.classList.add(n && n[t] ? n[t] : t))
                : l.setAttribute(e, t);
            }),
              i && c.includes(t) && (l.style.colorScheme = t));
          }
          if (s) d(s);
          else
            try {
              let e = localStorage.getItem(t) || r,
                s =
                  o && "system" === e
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "dark"
                      : "light"
                    : e;
              d(s);
            } catch (e) {}
        },
        n = ["light", "dark"],
        o = "(prefers-color-scheme: dark)",
        i = "undefined" == typeof window,
        l = s.createContext(void 0),
        c = { setTheme: (e) => {}, themes: [] },
        d = () => {
          var e;
          return null != (e = s.useContext(l)) ? e : c;
        },
        u = (e) =>
          s.useContext(l)
            ? s.createElement(s.Fragment, null, e.children)
            : s.createElement(h, { ...e }),
        m = ["light", "dark"],
        h = (e) => {
          let {
              forcedTheme: t,
              disableTransitionOnChange: r = !1,
              enableSystem: a = !0,
              enableColorScheme: i = !0,
              storageKey: c = "theme",
              themes: d = m,
              defaultTheme: u = a ? "system" : "light",
              attribute: h = "data-theme",
              value: v,
              children: x,
              nonce: b,
              scriptProps: w,
            } = e,
            [k, P] = s.useState(() => y(c, u)),
            [T, N] = s.useState(() => ("system" === k ? p() : k)),
            S = v ? Object.values(v) : d,
            E = s.useCallback(
              (e) => {
                let t = e;
                if (!t) return;
                "system" === e && a && (t = p());
                let s = v ? v[t] : t,
                  o = r ? g(b) : null,
                  l = document.documentElement,
                  c = (e) => {
                    "class" === e
                      ? (l.classList.remove(...S), s && l.classList.add(s))
                      : e.startsWith("data-") &&
                        (s ? l.setAttribute(e, s) : l.removeAttribute(e));
                  };
                if ((Array.isArray(h) ? h.forEach(c) : c(h), i)) {
                  let e = n.includes(u) ? u : null,
                    r = n.includes(t) ? t : e;
                  l.style.colorScheme = r;
                }
                null == o || o();
              },
              [b],
            ),
            j = s.useCallback(
              (e) => {
                let t = "function" == typeof e ? e(k) : e;
                P(t);
                try {
                  localStorage.setItem(c, t);
                } catch (e) {}
              },
              [k],
            ),
            C = s.useCallback(
              (e) => {
                (N(p(e)), "system" === k && a && !t && E("system"));
              },
              [k, t],
            );
          (s.useEffect(() => {
            let e = window.matchMedia(o);
            return (e.addListener(C), C(e), () => e.removeListener(C));
          }, [C]),
            s.useEffect(() => {
              let e = (e) => {
                e.key === c && (e.newValue ? P(e.newValue) : j(u));
              };
              return (
                window.addEventListener("storage", e),
                () => window.removeEventListener("storage", e)
              );
            }, [j]),
            s.useEffect(() => {
              E(null != t ? t : k);
            }, [t, k]));
          let _ = s.useMemo(
            () => ({
              theme: k,
              setTheme: j,
              forcedTheme: t,
              resolvedTheme: "system" === k ? T : k,
              themes: a ? [...d, "system"] : d,
              systemTheme: a ? T : void 0,
            }),
            [k, j, t, T, a, d],
          );
          return s.createElement(
            l.Provider,
            { value: _ },
            s.createElement(f, {
              forcedTheme: t,
              storageKey: c,
              attribute: h,
              enableSystem: a,
              enableColorScheme: i,
              defaultTheme: u,
              value: v,
              themes: d,
              nonce: b,
              scriptProps: w,
            }),
            x,
          );
        },
        f = s.memo((e) => {
          let {
              forcedTheme: t,
              storageKey: r,
              attribute: n,
              enableSystem: o,
              enableColorScheme: i,
              defaultTheme: l,
              value: c,
              themes: d,
              nonce: u,
              scriptProps: m,
            } = e,
            h = JSON.stringify([n, r, l, t, d, c, o, i]).slice(1, -1);
          return s.createElement("script", {
            ...m,
            suppressHydrationWarning: !0,
            nonce: "undefined" == typeof window ? u : "",
            dangerouslySetInnerHTML: {
              __html: "(".concat(a.toString(), ")(").concat(h, ")"),
            },
          });
        }),
        y = (e, t) => {
          let r;
          if (!i) {
            try {
              r = localStorage.getItem(e) || void 0;
            } catch (e) {}
            return r || t;
          }
        },
        g = (e) => {
          let t = document.createElement("style");
          return (
            e && t.setAttribute("nonce", e),
            t.appendChild(
              document.createTextNode(
                "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
              ),
            ),
            document.head.appendChild(t),
            () => {
              (window.getComputedStyle(document.body),
                setTimeout(() => {
                  document.head.removeChild(t);
                }, 1));
            }
          );
        },
        p = (e) => (
          e || (e = window.matchMedia(o)),
          e.matches ? "dark" : "light"
        );
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    (e.O(0, [888, 327, 104, 441, 517, 358], () => t(4520)), (_N_E = e.O()));
  },
]);
