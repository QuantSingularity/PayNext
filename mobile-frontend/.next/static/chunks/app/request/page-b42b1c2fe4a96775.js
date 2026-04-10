(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [144],
  {
    7219: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 6815));
    },
    6815: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => w }));
      var s = r(5155),
        a = r(2679),
        n = r(3577),
        o = r(4505),
        l = r(3920),
        i = r(6075),
        d = r(1773),
        c = r(3084),
        u = r(2115),
        m = r(9606),
        f = r(814),
        x = r(4563),
        h = r(3312),
        p = r(9749),
        g = r(3886),
        y = r(3900),
        b = r(7146),
        v = r(1410);
      let N = x.Ik({
        amount: x.au
          .number({ invalid_type_error: "Amount must be a number." })
          .positive({ message: "Amount must be a positive number." })
          .multipleOf(0.01, {
            message: "Amount can have at most 2 decimal places.",
          }),
        memo: x.Yj().optional(),
      });
      function w() {
        let [e, t] = (0, u.useState)(null),
          [r, x] = (0, u.useState)(null),
          [w, j] = (0, u.useState)(!1),
          { user: P } = (0, b.A)(),
          k = (0, m.mN)({
            resolver: (0, a.u)(N),
            defaultValues: { amount: void 0, memo: "" },
          });
        async function R(e) {
          j(!0);
          try {
            let s = v.kY ? v.GP : v.uE,
              a = await s.requestPayment({ amount: e.amount, memo: e.memo });
            if (a.success && a.data) {
              let r = { amount: e.amount, memo: e.memo || "" };
              x(r);
              let s = {
                  userId: (null == P ? void 0 : P.id) || "user123",
                  amount: e.amount,
                  memo: e.memo || "Payment Request",
                  timestamp: Date.now(),
                },
                a = "paynext://request?details=".concat(
                  encodeURIComponent(JSON.stringify(s)),
                );
              (t(a), f.oR.success("Payment request created successfully!"));
            } else {
              var r;
              f.oR.error(
                (null === (r = a.error) || void 0 === r ? void 0 : r.message) ||
                  "Failed to create payment request",
              );
            }
          } catch (e) {
            (console.error("Request error:", e),
              f.oR.error("An unexpected error occurred"));
          } finally {
            j(!1);
          }
        }
        let C = async () => {
            if (e)
              try {
                (await navigator.clipboard.writeText(e),
                  f.oR.success("Payment link copied to clipboard!"));
              } catch (e) {
                (console.error("Failed to copy:", e),
                  f.oR.error("Failed to copy link"));
              }
          },
          S = async () => {
            if (e && r) {
              if (navigator.share)
                try {
                  await navigator.share({
                    title: "PayNext Payment Request",
                    text: "Please pay me $"
                      .concat(r.amount.toFixed(2))
                      .concat(r.memo ? " for ".concat(r.memo) : ""),
                    url: e,
                  });
                } catch (e) {
                  "AbortError" !== e.name && C();
                }
              else C();
            }
          };
        return (0, s.jsxs)("div", {
          className: "space-y-5",
          children: [
            (0, s.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [
                (0, s.jsx)("div", {
                  className:
                    "w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center",
                  children: (0, s.jsx)(n.A, {
                    className: "h-5 w-5 text-green-600 dark:text-green-400",
                  }),
                }),
                (0, s.jsx)("h1", {
                  className: "text-2xl font-bold tracking-tight",
                  children: "Request Money",
                }),
              ],
            }),
            e
              ? (0, s.jsxs)(p.Zp, {
                  className: "rounded-2xl border-border/60 shadow-sm",
                  children: [
                    (0, s.jsxs)(p.aR, {
                      className: "pb-3 pt-5 px-5 text-center",
                      children: [
                        (0, s.jsx)(p.ZB, {
                          className: "text-base font-semibold",
                          children: "Your Payment Request",
                        }),
                        r &&
                          (0, s.jsxs)("p", {
                            className:
                              "text-2xl font-bold text-green-600 dark:text-green-400 mt-1",
                            children: ["$", r.amount.toFixed(2)],
                          }),
                        (null == r ? void 0 : r.memo) &&
                          (0, s.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children: r.memo,
                          }),
                      ],
                    }),
                    (0, s.jsxs)(p.Wu, {
                      className: "px-5 pb-3 flex flex-col items-center gap-5",
                      children: [
                        (0, s.jsx)("div", {
                          className:
                            "p-4 bg-white rounded-2xl shadow-inner border border-border/40",
                          children: (0, s.jsx)(c.X, {
                            value: e,
                            size: 200,
                            bgColor: "#ffffff",
                            fgColor: "#1a1a2e",
                            level: "M",
                            includeMargin: !1,
                          }),
                        }),
                        (0, s.jsx)("div", {
                          className:
                            "w-full p-3 bg-muted/50 rounded-xl border border-border/40",
                          children: (0, s.jsx)("p", {
                            className:
                              "text-xs text-muted-foreground break-all font-mono leading-relaxed",
                            children: e,
                          }),
                        }),
                      ],
                    }),
                    (0, s.jsxs)(p.wL, {
                      className: "flex flex-col gap-2.5 px-5 pb-5",
                      children: [
                        (0, s.jsxs)("div", {
                          className: "grid grid-cols-2 gap-2.5 w-full",
                          children: [
                            (0, s.jsxs)(h.$, {
                              variant: "outline",
                              className:
                                "rounded-xl h-11 text-sm font-medium border-border/60",
                              onClick: C,
                              children: [
                                (0, s.jsx)(l.A, { className: "mr-2 h-4 w-4" }),
                                "Copy Link",
                              ],
                            }),
                            (0, s.jsxs)(h.$, {
                              variant: "outline",
                              className:
                                "rounded-xl h-11 text-sm font-medium border-border/60",
                              onClick: S,
                              children: [
                                (0, s.jsx)(i.A, { className: "mr-2 h-4 w-4" }),
                                "Share",
                              ],
                            }),
                          ],
                        }),
                        (0, s.jsxs)(h.$, {
                          variant: "ghost",
                          className:
                            "w-full rounded-xl h-11 text-sm font-medium text-muted-foreground hover:text-foreground",
                          onClick: () => {
                            (t(null), x(null), k.reset());
                          },
                          children: [
                            (0, s.jsx)(d.A, { className: "mr-2 h-4 w-4" }),
                            "New Request",
                          ],
                        }),
                      ],
                    }),
                  ],
                })
              : (0, s.jsxs)(p.Zp, {
                  className: "rounded-2xl border-border/60 shadow-sm",
                  children: [
                    (0, s.jsx)(p.aR, {
                      className: "pb-3 pt-5 px-5",
                      children: (0, s.jsx)(p.ZB, {
                        className: "text-base font-semibold",
                        children: "Create Payment Request",
                      }),
                    }),
                    (0, s.jsx)(p.Wu, {
                      className: "px-5 pb-5",
                      children: (0, s.jsx)(g.lV, {
                        ...k,
                        children: (0, s.jsxs)("form", {
                          onSubmit: k.handleSubmit(R),
                          className: "space-y-5",
                          children: [
                            (0, s.jsx)(g.zB, {
                              control: k.control,
                              name: "amount",
                              render: (e) => {
                                var t;
                                let { field: r } = e;
                                return (0, s.jsxs)(g.eI, {
                                  children: [
                                    (0, s.jsx)(g.lR, {
                                      className: "text-sm font-medium",
                                      children: "Amount ($)",
                                    }),
                                    (0, s.jsx)(g.MJ, {
                                      children: (0, s.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                          (0, s.jsx)("span", {
                                            className:
                                              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm",
                                            children: "$",
                                          }),
                                          (0, s.jsx)(y.p, {
                                            type: "number",
                                            step: "0.01",
                                            min: "0.01",
                                            placeholder: "0.00",
                                            className:
                                              "pl-7 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary text-lg font-semibold",
                                            ...r,
                                            value:
                                              null !== (t = r.value) &&
                                              void 0 !== t
                                                ? t
                                                : "",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, s.jsx)(g.C5, {}),
                                  ],
                                });
                              },
                            }),
                            (0, s.jsx)(g.zB, {
                              control: k.control,
                              name: "memo",
                              render: (e) => {
                                let { field: t } = e;
                                return (0, s.jsxs)(g.eI, {
                                  children: [
                                    (0, s.jsxs)(g.lR, {
                                      className: "text-sm font-medium",
                                      children: [
                                        "Memo",
                                        " ",
                                        (0, s.jsx)("span", {
                                          className:
                                            "text-muted-foreground font-normal",
                                          children: "(Optional)",
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)(g.MJ, {
                                      children: (0, s.jsx)(y.p, {
                                        placeholder: "What's this request for?",
                                        className:
                                          "rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary",
                                        ...t,
                                      }),
                                    }),
                                    (0, s.jsx)(g.C5, {}),
                                  ],
                                });
                              },
                            }),
                            (0, s.jsx)(h.$, {
                              type: "submit",
                              className:
                                "w-full h-12 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 shadow-md shadow-green-500/20 transition-all",
                              disabled: w,
                              children: w
                                ? (0, s.jsxs)(s.Fragment, {
                                    children: [
                                      (0, s.jsx)(o.A, {
                                        className: "mr-2 h-4 w-4 animate-spin",
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
    3312: (e, t, r) => {
      "use strict";
      r.d(t, { $: () => d });
      var s = r(5155),
        a = r(2317),
        n = r(1027),
        o = r(2115),
        l = r(1567);
      let i = (0, n.F)(
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
          let { className: r, variant: n, size: o, asChild: d = !1, ...c } = e,
            u = d ? a.DX : "button";
          return (0, s.jsx)(u, {
            className: (0, l.cn)(i({ variant: n, size: o, className: r })),
            ref: t,
            ...c,
          });
        });
      d.displayName = "Button";
    },
    9749: (e, t, r) => {
      "use strict";
      r.d(t, {
        BT: () => d,
        Wu: () => c,
        ZB: () => i,
        Zp: () => o,
        aR: () => l,
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
      let l = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex flex-col space-y-1.5 p-6", r),
          ...a,
        });
      });
      l.displayName = "CardHeader";
      let i = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("font-semibold leading-none tracking-tight", r),
          ...a,
        });
      });
      i.displayName = "CardTitle";
      let d = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("text-sm text-muted-foreground", r),
          ...a,
        });
      });
      d.displayName = "CardDescription";
      let c = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("p-6 pt-0", r),
          ...a,
        });
      });
      c.displayName = "CardContent";
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
    3886: (e, t, r) => {
      "use strict";
      r.d(t, {
        lV: () => m,
        MJ: () => b,
        Rr: () => v,
        zB: () => x,
        eI: () => g,
        lR: () => y,
        C5: () => N,
      });
      var s = r(5155),
        a = r(2317),
        n = r(2115),
        o = r(9606),
        l = r(4352),
        i = r(1027),
        d = r(1567);
      let c = (0, i.F)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        ),
        u = n.forwardRef((e, t) => {
          let { className: r, ...a } = e;
          return (0, s.jsx)(l.b, {
            ref: t,
            className: (0, d.cn)(c(), r),
            ...a,
          });
        });
      u.displayName = l.b.displayName;
      let m = o.Op,
        f = n.createContext({}),
        x = (e) => {
          let { ...t } = e;
          return (0, s.jsx)(f.Provider, {
            value: { name: t.name },
            children: (0, s.jsx)(o.xI, { ...t }),
          });
        },
        h = () => {
          let e = n.useContext(f),
            t = n.useContext(p),
            { getFieldState: r, formState: s } = (0, o.xW)(),
            a = r(e.name, s);
          if (!e) throw Error("useFormField should be used within <FormField>");
          let { id: l } = t;
          return {
            id: l,
            name: e.name,
            formItemId: "".concat(l, "-form-item"),
            formDescriptionId: "".concat(l, "-form-item-description"),
            formMessageId: "".concat(l, "-form-item-message"),
            ...a,
          };
        },
        p = n.createContext({}),
        g = n.forwardRef((e, t) => {
          let { className: r, ...a } = e,
            o = n.useId();
          return (0, s.jsx)(p.Provider, {
            value: { id: o },
            children: (0, s.jsx)("div", {
              ref: t,
              className: (0, d.cn)("space-y-2", r),
              ...a,
            }),
          });
        });
      g.displayName = "FormItem";
      let y = n.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { error: n, formItemId: o } = h();
        return (0, s.jsx)(u, {
          ref: t,
          className: (0, d.cn)(n && "text-destructive", r),
          htmlFor: o,
          ...a,
        });
      });
      y.displayName = "FormLabel";
      let b = n.forwardRef((e, t) => {
        let { ...r } = e,
          {
            error: n,
            formItemId: o,
            formDescriptionId: l,
            formMessageId: i,
          } = h();
        return (0, s.jsx)(a.DX, {
          ref: t,
          id: o,
          "aria-describedby": n ? "".concat(l, " ").concat(i) : "".concat(l),
          "aria-invalid": !!n,
          ...r,
        });
      });
      b.displayName = "FormControl";
      let v = n.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { formDescriptionId: n } = h();
        return (0, s.jsx)("p", {
          ref: t,
          id: n,
          className: (0, d.cn)("text-[0.8rem] text-muted-foreground", r),
          ...a,
        });
      });
      v.displayName = "FormDescription";
      let N = n.forwardRef((e, t) => {
        let { className: r, children: a, ...n } = e,
          { error: o, formMessageId: l } = h(),
          i = o ? String(null == o ? void 0 : o.message) : a;
        return i
          ? (0, s.jsx)("p", {
              ref: t,
              id: l,
              className: (0, d.cn)(
                "text-[0.8rem] font-medium text-destructive",
                r,
              ),
              ...n,
              children: i,
            })
          : null;
      });
      N.displayName = "FormMessage";
    },
    3900: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => o });
      var s = r(5155),
        a = r(2115),
        n = r(1567);
      let o = a.forwardRef((e, t) => {
        let { className: r, type: a, ...o } = e;
        return (0, s.jsx)("input", {
          type: a,
          className: (0, n.cn)(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            r,
          ),
          ref: t,
          ...o,
        });
      });
      o.displayName = "Input";
    },
    7146: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => d, AuthProvider: () => i });
      var s = r(5155),
        a = r(2115),
        n = r(814),
        o = r(1410);
      let l = (0, a.createContext)(void 0);
      function i(e) {
        let { children: t } = e,
          [r, i] = (0, a.useState)(null),
          [d, c] = (0, a.useState)(!0),
          u = (0, a.useCallback)(async () => {
            try {
              let e = o.kY ? o.GP : o.uE,
                t = await e.getUserProfile();
              t.success && t.data && i(t.data);
            } catch (e) {
              console.error("Failed to refresh user:", e);
            }
          }, []);
        (0, a.useEffect)(() => {
          (async () => {
            (localStorage.getItem("auth_token") && (await u()), c(!1));
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
                    i(t.data),
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
                    i(t),
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
          f = async (e, t, r) => {
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
          x = async (e) => {
            try {
              let t = o.kY ? o.GP : o.uE;
              if ((await t.updateUserProfile(e)).success)
                return (i((t) => (t ? { ...t, ...e } : null)), !0);
              return !1;
            } catch (e) {
              return !1;
            }
          };
        return (0, s.jsx)(l.Provider, {
          value: {
            user: r,
            isAuthenticated: !!r,
            isLoading: d,
            login: m,
            register: f,
            logout: () => {
              (o.uE.clearToken(),
                i(null),
                n.oR.info("Logged out successfully"));
            },
            updateProfile: x,
            refreshUser: u,
          },
          children: t,
        });
      }
      function d() {
        let e = (0, a.useContext)(l);
        if (void 0 === e)
          throw Error("useAuth must be used within an AuthProvider");
        return e;
      }
    },
    1410: (e, t, r) => {
      "use strict";
      r.d(t, { GP: () => d, kY: () => i, uE: () => l });
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
      let l = new o(),
        i = "development" === s.env.NEXT_PUBLIC_ENV,
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
  },
  (e) => {
    var t = (t) => e((e.s = t));
    (e.O(0, [327, 971, 123, 441, 517, 358], () => t(7219)), (_N_E = e.O()));
  },
]);
