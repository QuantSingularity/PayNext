(() => {
  var e = {};
  ((e.id = 165),
    (e.ids = [165]),
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
      7196: (e, r, t) => {
        "use strict";
        (t.r(r),
          t.d(r, {
            GlobalError: () => o.a,
            __next_app__: () => c,
            pages: () => m,
            routeModule: () => u,
            tree: () => d,
          }));
        var s = t(260),
          a = t(8203),
          n = t(5155),
          o = t.n(n),
          i = t(7292),
          l = {};
        for (let e in i)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (l[e] = () => i[e]);
        t.d(r, l);
        let d = [
            "",
            {
              children: [
                "send",
                {
                  children: [
                    "__PAGE__",
                    {},
                    {
                      page: [
                        () => Promise.resolve().then(t.bind(t, 6878)),
                        "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/send/page.tsx",
                      ],
                    },
                  ],
                },
                {
                  metadata: {
                    icon: [
                      async (e) =>
                        (await Promise.resolve().then(t.bind(t, 440))).default(
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
                () => Promise.resolve().then(t.bind(t, 1354)),
                "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(t.t.bind(t, 9937, 23)),
                "next/dist/client/components/not-found-error",
              ],
              forbidden: [
                () => Promise.resolve().then(t.t.bind(t, 9116, 23)),
                "next/dist/client/components/forbidden-error",
              ],
              unauthorized: [
                () => Promise.resolve().then(t.t.bind(t, 1485, 23)),
                "next/dist/client/components/unauthorized-error",
              ],
              metadata: {
                icon: [
                  async (e) =>
                    (await Promise.resolve().then(t.bind(t, 440))).default(e),
                ],
                apple: [],
                openGraph: [],
                twitter: [],
                manifest: void 0,
              },
            },
          ],
          m = [
            "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/send/page.tsx",
          ],
          c = { require: t, loadChunk: () => Promise.resolve() },
          u = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/send/page",
              pathname: "/send",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      3210: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 6878));
      },
      3378: (e, r, t) => {
        Promise.resolve().then(t.bind(t, 5168));
      },
      5168: (e, r, t) => {
        "use strict";
        (t.r(r), t.d(r, { default: () => N }));
        var s = t(5512),
          a = t(1914),
          n = t(5607),
          o = t(3468);
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
        var d = t(6235),
          m = t(9334),
          c = t(8009),
          u = t(6868),
          p = t(1542),
          x = t(5009),
          f = t(9400),
          h = t(4590),
          b = t(2373),
          g = t(7722),
          j = t(3612);
        let v = x.Ik({
          recipient: x
            .Yj()
            .min(3, { message: "Recipient must be at least 3 characters." }),
          amount: x.au
            .number({ invalid_type_error: "Amount must be a number." })
            .positive({ message: "Amount must be a positive number." })
            .multipleOf(0.01, {
              message: "Amount can have at most 2 decimal places.",
            }),
          memo: x.Yj().optional(),
        });
        function y() {
          (0, m.useSearchParams)();
          let [e, r] = (0, c.useState)(!1),
            [t, o] = (0, c.useState)(null),
            x = (0, u.mN)({
              resolver: (0, a.u)(v),
              defaultValues: { recipient: "", amount: void 0, memo: "" },
            });
          async function y(e) {
            r(!0);
            try {
              let r = j.kY ? j.GP : j.uE,
                t = await r.sendPayment({
                  recipient: e.recipient,
                  amount: e.amount,
                  memo: e.memo,
                });
              if (t.success && t.data) {
                let r = t.data;
                (o(r.transactionId),
                  p.oR.success(
                    `Successfully sent $${e.amount.toFixed(2)} to ${e.recipient}!`,
                  ),
                  x.reset());
              } else
                p.oR.error(
                  t.error?.message || "Failed to send money. Please try again.",
                );
            } catch (e) {
              (console.error("Payment error:", e),
                p.oR.error("An unexpected error occurred. Please try again."));
            } finally {
              r(!1);
            }
          }
          return (0, s.jsxs)("div", {
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
              t &&
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
                          children: ["Ref: ", t],
                        }),
                      ],
                    }),
                  ],
                }),
              (0, s.jsxs)(h.Zp, {
                className: "rounded-2xl border-border/60 shadow-sm",
                children: [
                  (0, s.jsx)(h.aR, {
                    className: "pb-3 pt-5 px-5",
                    children: (0, s.jsx)(h.ZB, {
                      className: "text-base font-semibold",
                      children: "Payment Details",
                    }),
                  }),
                  (0, s.jsx)(h.Wu, {
                    className: "px-5 pb-5",
                    children: (0, s.jsx)(b.lV, {
                      ...x,
                      children: (0, s.jsxs)("form", {
                        onSubmit: x.handleSubmit(y),
                        className: "space-y-5",
                        children: [
                          (0, s.jsx)(b.zB, {
                            control: x.control,
                            name: "recipient",
                            render: ({ field: e }) =>
                              (0, s.jsxs)(b.eI, {
                                children: [
                                  (0, s.jsx)(b.lR, {
                                    className: "text-sm font-medium",
                                    children: "Recipient",
                                  }),
                                  (0, s.jsx)(b.MJ, {
                                    children: (0, s.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, s.jsx)(l, {
                                          className:
                                            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                                        }),
                                        (0, s.jsx)(g.p, {
                                          placeholder:
                                            "Username, email, or phone",
                                          className:
                                            "pl-9 rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary",
                                          ...e,
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, s.jsx)(b.Rr, {
                                    className: "text-xs",
                                    children:
                                      "Enter the username, email, or phone number of the recipient.",
                                  }),
                                  (0, s.jsx)(b.C5, {}),
                                ],
                              }),
                          }),
                          (0, s.jsx)(b.zB, {
                            control: x.control,
                            name: "amount",
                            render: ({ field: e }) =>
                              (0, s.jsxs)(b.eI, {
                                children: [
                                  (0, s.jsx)(b.lR, {
                                    className: "text-sm font-medium",
                                    children: "Amount ($)",
                                  }),
                                  (0, s.jsx)(b.MJ, {
                                    children: (0, s.jsxs)("div", {
                                      className: "relative",
                                      children: [
                                        (0, s.jsx)("span", {
                                          className:
                                            "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm",
                                          children: "$",
                                        }),
                                        (0, s.jsx)(g.p, {
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
                                  (0, s.jsx)(b.C5, {}),
                                ],
                              }),
                          }),
                          (0, s.jsx)(b.zB, {
                            control: x.control,
                            name: "memo",
                            render: ({ field: e }) =>
                              (0, s.jsxs)(b.eI, {
                                children: [
                                  (0, s.jsxs)(b.lR, {
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
                                  (0, s.jsx)(b.MJ, {
                                    children: (0, s.jsx)(g.p, {
                                      placeholder: "What's this payment for?",
                                      className:
                                        "rounded-xl h-11 bg-muted/30 border-border/50 focus:border-primary",
                                      ...e,
                                    }),
                                  }),
                                  (0, s.jsx)(b.C5, {}),
                                ],
                              }),
                          }),
                          (0, s.jsx)(f.$, {
                            type: "submit",
                            className:
                              "w-full h-12 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all",
                            disabled: e,
                            children: e
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
          });
        }
        function N() {
          return (0, s.jsx)(c.Suspense, {
            fallback: (0, s.jsx)("div", {
              className: "flex items-center justify-center min-h-[400px]",
              children: (0, s.jsx)(d.A, {
                className: "h-8 w-8 animate-spin text-blue-600",
              }),
            }),
            children: (0, s.jsx)(y, {}),
          });
        }
      },
      2373: (e, r, t) => {
        "use strict";
        t.d(r, {
          lV: () => u,
          MJ: () => j,
          Rr: () => v,
          zB: () => x,
          eI: () => b,
          lR: () => g,
          C5: () => y,
        });
        var s = t(5512),
          a = t(2705),
          n = t(8009),
          o = t(6868),
          i = t(69),
          l = t(1643),
          d = t(4195);
        let m = (0, l.F)(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          ),
          c = n.forwardRef(({ className: e, ...r }, t) =>
            (0, s.jsx)(i.b, { ref: t, className: (0, d.cn)(m(), e), ...r }),
          );
        c.displayName = i.b.displayName;
        let u = o.Op,
          p = n.createContext({}),
          x = ({ ...e }) =>
            (0, s.jsx)(p.Provider, {
              value: { name: e.name },
              children: (0, s.jsx)(o.xI, { ...e }),
            }),
          f = () => {
            let e = n.useContext(p),
              r = n.useContext(h),
              { getFieldState: t, formState: s } = (0, o.xW)(),
              a = t(e.name, s);
            if (!e)
              throw Error("useFormField should be used within <FormField>");
            let { id: i } = r;
            return {
              id: i,
              name: e.name,
              formItemId: `${i}-form-item`,
              formDescriptionId: `${i}-form-item-description`,
              formMessageId: `${i}-form-item-message`,
              ...a,
            };
          },
          h = n.createContext({}),
          b = n.forwardRef(({ className: e, ...r }, t) => {
            let a = n.useId();
            return (0, s.jsx)(h.Provider, {
              value: { id: a },
              children: (0, s.jsx)("div", {
                ref: t,
                className: (0, d.cn)("space-y-2", e),
                ...r,
              }),
            });
          });
        b.displayName = "FormItem";
        let g = n.forwardRef(({ className: e, ...r }, t) => {
          let { error: a, formItemId: n } = f();
          return (0, s.jsx)(c, {
            ref: t,
            className: (0, d.cn)(a && "text-destructive", e),
            htmlFor: n,
            ...r,
          });
        });
        g.displayName = "FormLabel";
        let j = n.forwardRef(({ ...e }, r) => {
          let {
            error: t,
            formItemId: n,
            formDescriptionId: o,
            formMessageId: i,
          } = f();
          return (0, s.jsx)(a.DX, {
            ref: r,
            id: n,
            "aria-describedby": t ? `${o} ${i}` : `${o}`,
            "aria-invalid": !!t,
            ...e,
          });
        });
        j.displayName = "FormControl";
        let v = n.forwardRef(({ className: e, ...r }, t) => {
          let { formDescriptionId: a } = f();
          return (0, s.jsx)("p", {
            ref: t,
            id: a,
            className: (0, d.cn)("text-[0.8rem] text-muted-foreground", e),
            ...r,
          });
        });
        v.displayName = "FormDescription";
        let y = n.forwardRef(({ className: e, children: r, ...t }, a) => {
          let { error: n, formMessageId: o } = f(),
            i = n ? String(n?.message) : r;
          return i
            ? (0, s.jsx)("p", {
                ref: a,
                id: o,
                className: (0, d.cn)(
                  "text-[0.8rem] font-medium text-destructive",
                  e,
                ),
                ...t,
                children: i,
              })
            : null;
        });
        y.displayName = "FormMessage";
      },
      7722: (e, r, t) => {
        "use strict";
        t.d(r, { p: () => o });
        var s = t(5512),
          a = t(8009),
          n = t(4195);
        let o = a.forwardRef(({ className: e, type: r, ...t }, a) =>
          (0, s.jsx)("input", {
            type: r,
            className: (0, n.cn)(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              e,
            ),
            ref: a,
            ...t,
          }),
        );
        o.displayName = "Input";
      },
      6878: (e, r, t) => {
        "use strict";
        (t.r(r), t.d(r, { default: () => s }));
        let s = (0, t(6760).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/send/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/mnt/c/Users/36202/OneDrive/Desktop/PayNext/mobile-frontend/src/app/send/page.tsx",
          "default",
        );
      },
      440: (e, r, t) => {
        "use strict";
        (t.r(r), t.d(r, { default: () => a }));
        var s = t(8077);
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
  var r = require("../../webpack-runtime.js");
  r.C(e);
  var t = (e) => r((r.s = e)),
    s = r.X(0, [638, 778, 77, 370, 96], () => t(7196));
  module.exports = s;
})();
