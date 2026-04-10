(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [165],
  {
    7598: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 9159));
    },
    8283: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => s });
      let s = (0, r(2134).A)("Send", [
        ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
        ["path", { d: "M22 2 11 13", key: "nzbqef" }],
      ]);
    },
    6046: (e, t, r) => {
      "use strict";
      var s = r(6658);
      (r.o(s, "usePathname") &&
        r.d(t, {
          usePathname: function () {
            return s.usePathname;
          },
        }),
        r.o(s, "useRouter") &&
          r.d(t, {
            useRouter: function () {
              return s.useRouter;
            },
          }),
        r.o(s, "useSearchParams") &&
          r.d(t, {
            useSearchParams: function () {
              return s.useSearchParams;
            },
          }));
    },
    9159: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => j }));
      var s = r(5155),
        a = r(2679),
        n = r(8283),
        o = r(2134);
      let i = (0, o.A)("ArrowRight", [
          ["path", { d: "M5 12h14", key: "1ays0h" }],
          ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
        ]),
        l = (0, o.A)("CircleUser", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
          [
            "path",
            {
              d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",
              key: "154egf",
            },
          ],
        ]);
      var d = r(4505),
        c = r(6046),
        m = r(2115),
        u = r(9606),
        h = r(814),
        f = r(4563),
        p = r(3312),
        x = r(9749),
        g = r(3886),
        y = r(3900),
        b = r(1410);
      let v = f.Ik({
        recipient: f
          .Yj()
          .min(3, { message: "Recipient must be at least 3 characters." }),
        amount: f.au
          .number({ invalid_type_error: "Amount must be a number." })
          .positive({ message: "Amount must be a positive number." })
          .multipleOf(0.01, {
            message: "Amount can have at most 2 decimal places.",
          }),
        memo: f.Yj().optional(),
      });
      function N() {
        let e = (0, c.useSearchParams)(),
          [t, r] = (0, m.useState)(!1),
          [o, f] = (0, m.useState)(null),
          N = (0, u.mN)({
            resolver: (0, a.u)(v),
            defaultValues: { recipient: "", amount: void 0, memo: "" },
          });
        async function j(e) {
          r(!0);
          try {
            let r = b.kY ? b.GP : b.uE,
              s = await r.sendPayment({
                recipient: e.recipient,
                amount: e.amount,
                memo: e.memo,
              });
            if (s.success && s.data) {
              let t = s.data;
              (f(t.transactionId),
                h.oR.success(
                  "Successfully sent $"
                    .concat(e.amount.toFixed(2), " to ")
                    .concat(e.recipient, "!"),
                ),
                N.reset());
            } else {
              var t;
              h.oR.error(
                (null === (t = s.error) || void 0 === t ? void 0 : t.message) ||
                  "Failed to send money. Please try again.",
              );
            }
          } catch (e) {
            (console.error("Payment error:", e),
              h.oR.error("An unexpected error occurred. Please try again."));
          } finally {
            r(!1);
          }
        }
        return (
          (0, m.useEffect)(() => {
            let t = e.get("recipient"),
              r = e.get("amount"),
              s = e.get("memo");
            if ((t && N.setValue("recipient", decodeURIComponent(t)), r)) {
              let e = parseFloat(r);
              !isNaN(e) && e > 0 && N.setValue("amount", e);
            }
            s && N.setValue("memo", decodeURIComponent(s));
          }, [e, N]),
          (0, s.jsxs)("div", {
            className: "space-y-5",
            children: [
              (0, s.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [
                  (0, s.jsx)("div", {
                    className:
                      "w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center",
                    children: (0, s.jsx)(n.A, {
                      className: "h-5 w-5 text-blue-600 dark:text-blue-400",
                    }),
                  }),
                  (0, s.jsx)("h1", {
                    className: "text-2xl font-bold tracking-tight",
                    children: "Send Money",
                  }),
                ],
              }),
              o &&
                (0, s.jsxs)("div", {
                  className:
                    "rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3",
                  children: [
                    (0, s.jsx)("div", {
                      className:
                        "w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 mt-0.5",
                      children: (0, s.jsx)(i, {
                        className: "h-4 w-4 text-green-600 dark:text-green-400",
                      }),
                    }),
                    (0, s.jsxs)("div", {
                      children: [
                        (0, s.jsx)("p", {
                          className:
                            "text-sm font-semibold text-green-800 dark:text-green-300",
                          children: "Payment sent!",
                        }),
                        (0, s.jsxs)("p", {
                          className:
                            "text-xs text-green-600 dark:text-green-400 mt-0.5 font-mono",
                          children: ["Ref: ", o],
                        }),
                      ],
                    }),
                  ],
                }),
              (0, s.jsxs)(x.Zp, {
                className: "rounded-2xl border-border/60 shadow-sm",
                children: [
                  (0, s.jsx)(x.aR, {
                    className: "pb-3 pt-5 px-5",
                    children: (0, s.jsx)(x.ZB, {
                      className: "text-base font-semibold",
                      children: "Payment Details",
                    }),
                  }),
                  (0, s.jsx)(x.Wu, {
                    className: "px-5 pb-5",
                    children: (0, s.jsx)(g.lV, {
                      ...N,
                      children: (0, s.jsxs)("form", {
                        onSubmit: N.handleSubmit(j),
                        className: "space-y-5",
                        children: [
                          (0, s.jsx)(g.zB, {
                            control: N.control,
                            name: "recipient",
                            render: (e) => {
                              let { field: t } = e;
                              return (0, s.jsxs)(g.eI, {
                                children: [
                                  (0, s.jsx)(g.lR, {
                                    className: "text-sm font-medium",
                                    children: "Recipient",
                                  }),
                                  (0, s.jsx)(g.MJ, {
                                    children: (0, s.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, s.jsx)(l, {
                                          className:
                                            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                        }),
                                        (0, s.jsx)(y.p, {
                                          placeholder:
                                            "Username, email, or phone",
                                          className:
                                            "pl-9 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary",
                                          ...t,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, s.jsx)(g.Rr, {
                                    className: "text-xs",
                                    children:
                                      "Enter the username, email, or phone number of the recipient.",
                                  }),
                                  (0, s.jsx)(g.C5, {}),
                                ],
                              });
                            },
                          }),
                          (0, s.jsx)(g.zB, {
                            control: N.control,
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
                            control: N.control,
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
                                      placeholder: "What's this payment for?",
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
                          (0, s.jsx)(p.$, {
                            type: "submit",
                            className:
                              "w-full h-12 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all",
                            disabled: t,
                            children: t
                              ? (0, s.jsxs)(s.Fragment, {
                                  children: [
                                    (0, s.jsx)(d.A, {
                                      className: "mr-2 h-4 w-4 animate-spin",
                                    }),
                                    "Sending...",
                                  ],
                                })
                              : (0, s.jsxs)(s.Fragment, {
                                  children: [
                                    (0, s.jsx)(n.A, {
                                      className: "mr-2 h-4 w-4",
                                    }),
                                    "Send Money",
                                  ],
                                }),
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            ],
          })
        );
      }
      function j() {
        return (0, s.jsx)(m.Suspense, {
          fallback: (0, s.jsx)("div", {
            className: "flex items-center justify-center min-h-[400px]",
            children: (0, s.jsx)(d.A, {
              className: "h-8 w-8 animate-spin text-blue-600",
            }),
          }),
          children: (0, s.jsx)(N, {}),
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
        d = o.forwardRef((e, t) => {
          let { className: r, variant: n, size: o, asChild: d = !1, ...c } = e,
            m = d ? a.DX : "button";
          return (0, s.jsx)(m, {
            className: (0, i.cn)(l({ variant: n, size: o, className: r })),
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
        ZB: () => l,
        Zp: () => o,
        aR: () => i,
        wL: () => m,
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
      let m = a.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex items-center p-6 pt-0", r),
          ...a,
        });
      });
      m.displayName = "CardFooter";
    },
    3886: (e, t, r) => {
      "use strict";
      r.d(t, {
        lV: () => u,
        MJ: () => b,
        Rr: () => v,
        zB: () => f,
        eI: () => g,
        lR: () => y,
        C5: () => N,
      });
      var s = r(5155),
        a = r(2317),
        n = r(2115),
        o = r(9606),
        i = r(4352),
        l = r(1027),
        d = r(1567);
      let c = (0, l.F)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        ),
        m = n.forwardRef((e, t) => {
          let { className: r, ...a } = e;
          return (0, s.jsx)(i.b, {
            ref: t,
            className: (0, d.cn)(c(), r),
            ...a,
          });
        });
      m.displayName = i.b.displayName;
      let u = o.Op,
        h = n.createContext({}),
        f = (e) => {
          let { ...t } = e;
          return (0, s.jsx)(h.Provider, {
            value: { name: t.name },
            children: (0, s.jsx)(o.xI, { ...t }),
          });
        },
        p = () => {
          let e = n.useContext(h),
            t = n.useContext(x),
            { getFieldState: r, formState: s } = (0, o.xW)(),
            a = r(e.name, s);
          if (!e) throw Error("useFormField should be used within <FormField>");
          let { id: i } = t;
          return {
            id: i,
            name: e.name,
            formItemId: "".concat(i, "-form-item"),
            formDescriptionId: "".concat(i, "-form-item-description"),
            formMessageId: "".concat(i, "-form-item-message"),
            ...a,
          };
        },
        x = n.createContext({}),
        g = n.forwardRef((e, t) => {
          let { className: r, ...a } = e,
            o = n.useId();
          return (0, s.jsx)(x.Provider, {
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
          { error: n, formItemId: o } = p();
        return (0, s.jsx)(m, {
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
            formDescriptionId: i,
            formMessageId: l,
          } = p();
        return (0, s.jsx)(a.DX, {
          ref: t,
          id: o,
          "aria-describedby": n ? "".concat(i, " ").concat(l) : "".concat(i),
          "aria-invalid": !!n,
          ...r,
        });
      });
      b.displayName = "FormControl";
      let v = n.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { formDescriptionId: n } = p();
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
          { error: o, formMessageId: i } = p(),
          l = o ? String(null == o ? void 0 : o.message) : a;
        return l
          ? (0, s.jsx)("p", {
              ref: t,
              id: i,
              className: (0, d.cn)(
                "text-[0.8rem] font-medium text-destructive",
                r,
              ),
              ...n,
              children: l,
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
    1410: (e, t, r) => {
      "use strict";
      r.d(t, { GP: () => d, kY: () => l, uE: () => i });
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
    (e.O(0, [327, 971, 441, 517, 358], () => t(7598)), (_N_E = e.O()));
  },
]);
