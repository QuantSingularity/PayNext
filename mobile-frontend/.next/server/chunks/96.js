((exports.id = 96),
  (exports.ids = [96]),
  (exports.modules = {
    6420: (e, t, r) => {
      (Promise.resolve().then(r.t.bind(r, 3219, 23)),
        Promise.resolve().then(r.t.bind(r, 4863, 23)),
        Promise.resolve().then(r.t.bind(r, 5155, 23)),
        Promise.resolve().then(r.t.bind(r, 802, 23)),
        Promise.resolve().then(r.t.bind(r, 9350, 23)),
        Promise.resolve().then(r.t.bind(r, 8530, 23)),
        Promise.resolve().then(r.t.bind(r, 8921, 23)));
    },
    1508: (e, t, r) => {
      (Promise.resolve().then(r.t.bind(r, 6959, 23)),
        Promise.resolve().then(r.t.bind(r, 3875, 23)),
        Promise.resolve().then(r.t.bind(r, 8903, 23)),
        Promise.resolve().then(r.t.bind(r, 7174, 23)),
        Promise.resolve().then(r.t.bind(r, 4178, 23)),
        Promise.resolve().then(r.t.bind(r, 7190, 23)),
        Promise.resolve().then(r.t.bind(r, 1365, 23)));
    },
    7456: (e, t, r) => {
      (Promise.resolve().then(r.bind(r, 5827)),
        Promise.resolve().then(r.bind(r, 29)),
        Promise.resolve().then(r.bind(r, 2321)),
        Promise.resolve().then(r.bind(r, 4223)),
        Promise.resolve().then(r.bind(r, 6758)));
    },
    1008: (e, t, r) => {
      (Promise.resolve().then(r.bind(r, 3371)),
        Promise.resolve().then(r.bind(r, 8457)),
        Promise.resolve().then(r.bind(r, 7186)),
        Promise.resolve().then(r.bind(r, 7195)),
        Promise.resolve().then(r.bind(r, 5210)));
    },
    8457: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => h });
      var s = r(5512),
        o = r(9998),
        n = r(5607),
        a = r(5357),
        i = r(7798),
        l = r(8531),
        d = r.n(l),
        c = r(9334),
        u = r(4195);
      let m = [
          { href: "/", label: "Home", icon: o.A },
          { href: "/send", label: "Send", icon: n.A },
          { href: "/request", label: "Request", icon: a.A },
          { href: "/profile", label: "Profile", icon: i.A },
        ],
        h = () => {
          let e = (0, c.usePathname)();
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
                    o = t.icon;
                  return (0, s.jsxs)(
                    d(),
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
                          children: (0, s.jsx)(o, {
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
    7186: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => d });
      var s = r(5512),
        o = r(7418),
        n = r(8009),
        a = r(9400),
        i = r(4590);
      class l extends n.Component {
        constructor(e) {
          (super(e),
            (this.handleReset = () => {
              (this.setState({ hasError: !1, error: null }),
                (window.location.href = "/"));
            }),
            (this.state = { hasError: !1, error: null }));
        }
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
                            (0, s.jsx)(o.A, {
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
                      children: (0, s.jsx)(a.$, {
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
      }
      let d = l;
    },
    9400: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => d });
      var s = r(5512),
        o = r(2705),
        n = r(1643),
        a = r(8009),
        i = r(4195);
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
        d = a.forwardRef(
          ({ className: e, variant: t, size: r, asChild: n = !1, ...a }, d) => {
            let c = n ? o.DX : "button";
            return (0, s.jsx)(c, {
              className: (0, i.cn)(l({ variant: t, size: r, className: e })),
              ref: d,
              ...a,
            });
          },
        );
      d.displayName = "Button";
    },
    4590: (e, t, r) => {
      "use strict";
      r.d(t, {
        BT: () => d,
        Wu: () => c,
        ZB: () => l,
        Zp: () => a,
        aR: () => i,
        wL: () => u,
      });
      var s = r(5512),
        o = r(8009),
        n = r(4195);
      let a = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)(
            "rounded-xl border bg-card text-card-foreground shadow",
            e,
          ),
          ...t,
        }),
      );
      a.displayName = "Card";
      let i = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)("flex flex-col space-y-1.5 p-6", e),
          ...t,
        }),
      );
      i.displayName = "CardHeader";
      let l = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)("font-semibold leading-none tracking-tight", e),
          ...t,
        }),
      );
      l.displayName = "CardTitle";
      let d = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)("text-sm text-muted-foreground", e),
          ...t,
        }),
      );
      d.displayName = "CardDescription";
      let c = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)("p-6 pt-0", e),
          ...t,
        }),
      );
      c.displayName = "CardContent";
      let u = o.forwardRef(({ className: e, ...t }, r) =>
        (0, s.jsx)("div", {
          ref: r,
          className: (0, n.cn)("flex items-center p-6 pt-0", e),
          ...t,
        }),
      );
      u.displayName = "CardFooter";
    },
    7195: (e, t, r) => {
      "use strict";
      r.d(t, { Toaster: () => a });
      var s = r(5512),
        o = r(3371),
        n = r(1542);
      let a = ({ ...e }) => {
        let { theme: t = "system" } = (0, o.D)();
        return (0, s.jsx)(n.l$, {
          theme: t,
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
          ...e,
        });
      };
    },
    5210: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => d, AuthProvider: () => l });
      var s = r(5512),
        o = r(8009),
        n = r(1542),
        a = r(3612);
      let i = (0, o.createContext)(void 0);
      function l({ children: e }) {
        let [t, r] = (0, o.useState)(null),
          [l, d] = (0, o.useState)(!0),
          c = (0, o.useCallback)(async () => {
            try {
              let e = a.kY ? a.GP : a.uE,
                t = await e.getUserProfile();
              t.success && t.data && r(t.data);
            } catch (e) {
              console.error("Failed to refresh user:", e);
            }
          }, []),
          u = async (e, t) => {
            try {
              if (a.kY) {
                let e = `mock_jwt_token_${Date.now()}`;
                a.uE.setToken(e);
                let t = await a.GP.getUserProfile();
                if (t.success && t.data)
                  return (
                    r(t.data),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
              } else {
                let s = await a.uE.login(e, t);
                if (s.success && s.data) {
                  let { token: e, user: t } = s.data;
                  return (
                    a.uE.setToken(e),
                    r(t),
                    n.oR.success("Logged in successfully!"),
                    !0
                  );
                }
                n.oR.error(s.error?.message || "Login failed");
              }
            } catch (e) {
              n.oR.error("Login failed");
            }
            return !1;
          },
          m = async (e, t, r) => {
            try {
              let s = await a.uE.register({ name: e, email: t, password: r });
              if (s.success)
                return (
                  n.oR.success("Registration successful! Please log in."),
                  !0
                );
              return (
                n.oR.error(s.error?.message || "Registration failed"),
                !1
              );
            } catch (e) {
              return (n.oR.error("Registration failed"), !1);
            }
          },
          h = async (e) => {
            try {
              let t = a.kY ? a.GP : a.uE;
              if ((await t.updateUserProfile(e)).success)
                return (r((t) => (t ? { ...t, ...e } : null)), !0);
              return !1;
            } catch (e) {
              return !1;
            }
          };
        return (0, s.jsx)(i.Provider, {
          value: {
            user: t,
            isAuthenticated: !!t,
            isLoading: l,
            login: u,
            register: m,
            logout: () => {
              (a.uE.clearToken(),
                r(null),
                n.oR.info("Logged out successfully"));
            },
            updateProfile: h,
            refreshUser: c,
          },
          children: e,
        });
      }
      function d() {
        let e = (0, o.useContext)(i);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
    },
    3612: (e, t, r) => {
      "use strict";
      r.d(t, { GP: () => l, kY: () => i, uE: () => a });
      let s = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
        o = process.env.NEXT_PUBLIC_API_GATEWAY_URL || `${s}/api`;
      class n {
        constructor(e = o) {
          ((this.token = null), (this.baseUrl = e), this.loadToken());
        }
        loadToken() {}
        setToken(e) {
          this.token = e;
        }
        clearToken() {
          this.token = null;
        }
        async request(e, t = {}) {
          let r = { "Content-Type": "application/json", ...t.headers };
          this.token && (r.Authorization = `Bearer ${this.token}`);
          try {
            let s = await fetch(`${this.baseUrl}${e}`, { ...t, headers: r }),
              o = await s.json();
            if (!s.ok)
              return {
                success: !1,
                error: {
                  message: o.message || "An error occurred",
                  status: s.status,
                  code: o.code,
                },
              };
            return { success: !0, data: o };
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
        async getTransactions(e = 10) {
          return this.request(`/transactions?limit=${e}`, { method: "GET" });
        }
        async getTransactionById(e) {
          return this.request(`/transactions/${e}`, { method: "GET" });
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
      }
      let a = new n(),
        i = "development" === process.env.NEXT_PUBLIC_ENV,
        l = {
          getBalance: async () => (
            await new Promise((e) => setTimeout(e, 500)),
            { success: !0, data: { balance: 1234.56, currency: "USD" } }
          ),
          getTransactions: async (e = 10) => (
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
          ),
          sendPayment: async (e) =>
            (await new Promise((e) => setTimeout(e, 1e3)), Math.random() > 0.2)
              ? {
                  success: !0,
                  data: {
                    transactionId: `txn_${Date.now()}`,
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
                requestId: `req_${Date.now()}`,
                qrCode: `paynext://request?details=${encodeURIComponent(JSON.stringify(e))}`,
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
    4195: (e, t, r) => {
      "use strict";
      r.d(t, { cn: () => n });
      var s = r(2281),
        o = r(4805);
      function n(...e) {
        return (0, o.QP)((0, s.$)(e));
      }
    },
    1354: (e, t, r) => {
      "use strict";
      (r.r(t),
        r.d(t, { default: () => h, metadata: () => u, viewport: () => m }));
      var s = r(2740),
        o = r(1001),
        n = r.n(o);
      r(1135);
      var a = r(5827),
        i = r(29),
        l = r(2321),
        d = r(4223),
        c = r(6758);
      let u = {
          title: "PayNext Mobile",
          description:
            "Modern mobile payment wallet — send, receive, and manage money",
          manifest: "/manifest.json",
          appleWebApp: {
            capable: !0,
            statusBarStyle: "default",
            title: "PayNext",
          },
        },
        m = {
          width: "device-width",
          initialScale: 1,
          maximumScale: 1,
          userScalable: !1,
          viewportFit: "cover",
        };
      function h({ children: e }) {
        return (0, s.jsx)("html", {
          lang: "en",
          suppressHydrationWarning: !0,
          className: n().variable,
          children: (0, s.jsx)("body", {
            className: "bg-background text-foreground font-sans antialiased",
            children: (0, s.jsx)(a.ThemeProvider, {
              attribute: "class",
              defaultTheme: "system",
              enableSystem: !0,
              disableTransitionOnChange: !0,
              children: (0, s.jsx)(c.AuthProvider, {
                children: (0, s.jsx)(l.default, {
                  children: (0, s.jsxs)("div", {
                    className: "min-h-screen flex flex-col",
                    children: [
                      (0, s.jsx)("main", {
                        className:
                          "flex-grow container mx-auto max-w-md px-4 pt-4 pb-24",
                        children: e,
                      }),
                      (0, s.jsx)(i.default, {}),
                      (0, s.jsx)(d.Toaster, {
                        position: "top-center",
                        richColors: !0,
                      }),
                    ],
                  }),
                }),
              }),
            }),
          }),
        });
      }
    },
    29: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => s });
      let s = (0, r(6760).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/components/BottomNav.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/components/BottomNav.tsx",
        "default",
      );
    },
    2321: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => s });
      let s = (0, r(6760).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/components/ErrorBoundary.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/components/ErrorBoundary.tsx",
        "default",
      );
    },
    4223: (e, t, r) => {
      "use strict";
      r.d(t, { Toaster: () => s });
      let s = (0, r(6760).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Toaster() from the server but Toaster is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/components/ui/sonner.tsx",
        "Toaster",
      );
    },
    6758: (e, t, r) => {
      "use strict";
      r.d(t, { AuthProvider: () => o });
      var s = r(6760);
      let o = (0, s.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call AuthProvider() from the server but AuthProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/contexts/AuthContext.tsx",
        "AuthProvider",
      );
      (0, s.registerClientReference)(
        function () {
          throw Error(
            "Attempted to call useAuth() from the server but useAuth is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/contexts/AuthContext.tsx",
        "useAuth",
      );
    },
    1135: () => {},
  }));
