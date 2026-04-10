(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [636],
  {
    508: (e, t, r) => {
      Promise.resolve().then(r.bind(r, 3391));
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
    3027: (e, t, r) => {
      "use strict";
      var s = r(2115),
        a =
          "function" == typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t)
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
    4236: (e, t, r) => {
      "use strict";
      e.exports = r(3027);
    },
    3391: (e, t, r) => {
      "use strict";
      (r.r(t), r.d(t, { default: () => X }));
      var s = r(5155),
        a = r(2679),
        l = r(4505),
        n = r(2134);
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
      var d = r(6967);
      let c = (0, n.A)("Shield", [
          [
            "path",
            {
              d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
              key: "oel41y",
            },
          ],
        ]),
        u = (0, n.A)("Settings", [
          [
            "path",
            {
              d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
              key: "1qme2f",
            },
          ],
          ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
        ]);
      var m = r(1466);
      let x = (0, n.A)("LogOut", [
        [
          "path",
          { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" },
        ],
        ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
        ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
      ]);
      var f = r(2115),
        h = r(9606),
        p = r(814),
        j = r(4563),
        v = r(1524),
        N = r(6611);
      r(7650);
      var g = r(2317),
        w = [
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
          let r = (0, g.TL)(`Primitive.${t}`),
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
        y = r(4236);
      function b() {
        return () => {};
      }
      var k = "Avatar",
        [C, I] = (function (e, t = []) {
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
        [S, M] = C(k),
        R = f.forwardRef((e, t) => {
          let { __scopeAvatar: r, ...a } = e,
            [l, n] = f.useState("idle");
          return (0, s.jsx)(S, {
            scope: r,
            imageLoadingStatus: l,
            onImageLoadingStatusChange: n,
            children: (0, s.jsx)(w.span, { ...a, ref: t }),
          });
        });
      R.displayName = k;
      var A = "AvatarImage",
        P = f.forwardRef((e, t) => {
          let {
              __scopeAvatar: r,
              src: a,
              onLoadingStatusChange: l = () => {},
              ...n
            } = e,
            i = M(A, r),
            o = (function (e, t) {
              let { referrerPolicy: r, crossOrigin: s } = t,
                a = (0, y.useSyncExternalStore)(
                  b,
                  () => !0,
                  () => !1,
                ),
                l = f.useRef(null),
                n = a
                  ? (l.current || (l.current = new window.Image()), l.current)
                  : null,
                [i, o] = f.useState(() => Z(n, e));
              return (
                (0, N.N)(() => {
                  o(Z(n, e));
                }, [n, e]),
                (0, N.N)(() => {
                  let e = (e) => () => {
                    o(e);
                  };
                  if (!n) return;
                  let t = e("loaded"),
                    a = e("error");
                  return (
                    n.addEventListener("load", t),
                    n.addEventListener("error", a),
                    r && (n.referrerPolicy = r),
                    "string" == typeof s && (n.crossOrigin = s),
                    () => {
                      (n.removeEventListener("load", t),
                        n.removeEventListener("error", a));
                    }
                  );
                }, [n, s, r]),
                i
              );
            })(a, n),
            d = (0, v.c)((e) => {
              (l(e), i.onImageLoadingStatusChange(e));
            });
          return (
            (0, N.N)(() => {
              "idle" !== o && d(o);
            }, [o, d]),
            "loaded" === o ? (0, s.jsx)(w.img, { ...n, ref: t, src: a }) : null
          );
        });
      P.displayName = A;
      var E = "AvatarFallback",
        L = f.forwardRef((e, t) => {
          let { __scopeAvatar: r, delayMs: a, ...l } = e,
            n = M(E, r),
            [i, o] = f.useState(void 0 === a);
          return (
            f.useEffect(() => {
              if (void 0 !== a) {
                let e = window.setTimeout(() => o(!0), a);
                return () => window.clearTimeout(e);
              }
            }, [a]),
            i && "loaded" !== n.imageLoadingStatus
              ? (0, s.jsx)(w.span, { ...l, ref: t })
              : null
          );
        });
      function Z(e, t) {
        return e
          ? t
            ? (e.src !== t && (e.src = t),
              e.complete && e.naturalWidth > 0 ? "loaded" : "loading")
            : "error"
          : "idle";
      }
      L.displayName = E;
      var z = r(1567);
      let F = f.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)(R, {
          ref: t,
          className: (0, z.cn)(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            r,
          ),
          ...a,
        });
      });
      F.displayName = R.displayName;
      let D = f.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)(P, {
          ref: t,
          className: (0, z.cn)("aspect-square h-full w-full", r),
          ...a,
        });
      });
      D.displayName = P.displayName;
      let $ = f.forwardRef((e, t) => {
        let { className: r, ...a } = e;
        return (0, s.jsx)(L, {
          ref: t,
          className: (0, z.cn)(
            "flex h-full w-full items-center justify-center rounded-full bg-muted",
            r,
          ),
          ...a,
        });
      });
      $.displayName = L.displayName;
      var G = r(3312),
        H = r(9749),
        V = r(1344),
        J = r(3886),
        O = r(3900),
        W = [
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
          let r = (0, g.TL)(`Primitive.${t}`),
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
        _ = "horizontal",
        B = ["horizontal", "vertical"],
        T = f.forwardRef((e, t) => {
          let { decorative: r, orientation: a = _, ...l } = e,
            n = B.includes(a) ? a : _;
          return (0, s.jsx)(W.div, {
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
      T.displayName = "Separator";
      let Y = f.forwardRef((e, t) => {
        let {
          className: r,
          orientation: a = "horizontal",
          decorative: l = !0,
          ...n
        } = e;
        return (0, s.jsx)(T, {
          ref: t,
          decorative: l,
          orientation: a,
          className: (0, z.cn)(
            "shrink-0 bg-border",
            "horizontal" === a ? "h-[1px] w-full" : "h-full w-[1px]",
            r,
          ),
          ...n,
        });
      });
      Y.displayName = T.displayName;
      var Q = r(7146);
      let U = j.Ik({
        name: j.Yj().min(2, { message: "Name must be at least 2 characters." }),
        email: j.Yj().email({ message: "Please enter a valid email." }),
      });
      function X() {
        let { user: e, logout: t, updateProfile: r, isLoading: n } = (0, Q.A)(),
          [j, v] = (0, f.useState)(!1),
          [N, g] = (0, f.useState)(!1),
          w = (0, h.mN)({
            resolver: (0, a.u)(U),
            defaultValues: {
              name: (null == e ? void 0 : e.name) || "",
              email: (null == e ? void 0 : e.email) || "",
            },
          });
        async function y(e) {
          g(!0);
          try {
            (await r({ name: e.name, email: e.email }))
              ? (p.oR.success("Profile updated successfully!"), v(!1))
              : p.oR.error("Failed to update profile. Please try again.");
          } catch (e) {
            (console.error("Profile update error:", e),
              p.oR.error("An unexpected error occurred"));
          } finally {
            g(!1);
          }
        }
        return ((0, f.useEffect)(() => {
          e && w.reset({ name: e.name, email: e.email });
        }, [e, w]),
        n || !e)
          ? (0, s.jsxs)("div", {
              className: "space-y-5",
              children: [
                (0, s.jsx)("h1", {
                  className: "text-2xl font-bold tracking-tight",
                  children: "Profile",
                }),
                (0, s.jsx)(H.Zp, {
                  className: "rounded-2xl border-border/60",
                  children: (0, s.jsx)(H.Wu, {
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
                        (0, s.jsxs)(F, {
                          className:
                            "w-20 h-20 border-2 border-white/30 shadow-lg",
                          children: [
                            (0, s.jsx)(D, { src: e.avatarUrl, alt: e.name }),
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
                        (0, s.jsxs)(V.lG, {
                          open: j,
                          onOpenChange: v,
                          children: [
                            (0, s.jsx)(V.zM, {
                              asChild: !0,
                              children: (0, s.jsxs)(G.$, {
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
                            (0, s.jsxs)(V.Cf, {
                              className: "sm:max-w-[425px] rounded-2xl",
                              children: [
                                (0, s.jsxs)(V.c7, {
                                  children: [
                                    (0, s.jsx)(V.L3, {
                                      children: "Edit Profile",
                                    }),
                                    (0, s.jsx)(V.rr, {
                                      children:
                                        "Make changes to your profile here. Click save when you're done.",
                                    }),
                                  ],
                                }),
                                (0, s.jsx)(J.lV, {
                                  ...w,
                                  children: (0, s.jsxs)("form", {
                                    onSubmit: w.handleSubmit(y),
                                    className: "space-y-4 py-2",
                                    children: [
                                      (0, s.jsx)(J.zB, {
                                        control: w.control,
                                        name: "name",
                                        render: (e) => {
                                          let { field: t } = e;
                                          return (0, s.jsxs)(J.eI, {
                                            children: [
                                              (0, s.jsx)(J.lR, {
                                                children: "Name",
                                              }),
                                              (0, s.jsx)(J.MJ, {
                                                children: (0, s.jsx)(O.p, {
                                                  placeholder: "Your Name",
                                                  className: "rounded-xl",
                                                  ...t,
                                                }),
                                              }),
                                              (0, s.jsx)(J.C5, {}),
                                            ],
                                          });
                                        },
                                      }),
                                      (0, s.jsx)(J.zB, {
                                        control: w.control,
                                        name: "email",
                                        render: (e) => {
                                          let { field: t } = e;
                                          return (0, s.jsxs)(J.eI, {
                                            children: [
                                              (0, s.jsx)(J.lR, {
                                                children: "Email",
                                              }),
                                              (0, s.jsx)(J.MJ, {
                                                children: (0, s.jsx)(O.p, {
                                                  type: "email",
                                                  placeholder: "your@email.com",
                                                  className: "rounded-xl",
                                                  ...t,
                                                }),
                                              }),
                                              (0, s.jsx)(J.C5, {}),
                                            ],
                                          });
                                        },
                                      }),
                                      (0, s.jsxs)(V.Es, {
                                        className: "pt-2",
                                        children: [
                                          (0, s.jsx)(V.HM, {
                                            asChild: !0,
                                            children: (0, s.jsx)(G.$, {
                                              type: "button",
                                              variant: "outline",
                                              className: "rounded-xl",
                                              children: "Cancel",
                                            }),
                                          }),
                                          (0, s.jsx)(G.$, {
                                            type: "submit",
                                            disabled: N,
                                            className: "rounded-xl",
                                            children: N
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
                (0, s.jsx)(H.Zp, {
                  className:
                    "rounded-2xl border-border/60 shadow-sm overflow-hidden",
                  children: (0, s.jsxs)(H.Wu, {
                    className: "p-0",
                    children: [
                      (0, s.jsxs)("button", {
                        className:
                          "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                        onClick: () => {
                          p.oR.info("Notifications settings coming soon!");
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
                      (0, s.jsx)(Y, { className: "mx-5" }),
                      (0, s.jsxs)("button", {
                        className:
                          "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                        onClick: () => {
                          p.oR.info("Security settings coming soon!");
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
                      (0, s.jsx)(Y, { className: "mx-5" }),
                      (0, s.jsxs)("button", {
                        className:
                          "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                        onClick: () => {
                          p.oR.info("Settings page coming soon!");
                        },
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center flex-shrink-0",
                            children: (0, s.jsx)(u, {
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
                      (0, s.jsx)(Y, { className: "mx-5" }),
                      (0, s.jsxs)("button", {
                        className:
                          "w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors text-left",
                        onClick: () => {},
                        children: [
                          (0, s.jsx)("div", {
                            className:
                              "w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center flex-shrink-0",
                            children: (0, s.jsx)(m.A, {
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
                (0, s.jsxs)(V.lG, {
                  children: [
                    (0, s.jsx)(V.zM, {
                      asChild: !0,
                      children: (0, s.jsxs)(G.$, {
                        variant: "outline",
                        className:
                          "w-full h-12 rounded-xl border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium",
                        children: [
                          (0, s.jsx)(x, { className: "mr-2 h-4 w-4" }),
                          "Log Out",
                        ],
                      }),
                    }),
                    (0, s.jsxs)(V.Cf, {
                      className: "sm:max-w-[425px] rounded-2xl",
                      children: [
                        (0, s.jsxs)(V.c7, {
                          children: [
                            (0, s.jsx)(V.L3, { children: "Log Out" }),
                            (0, s.jsx)(V.rr, {
                              children:
                                "Are you sure you want to log out of your account?",
                            }),
                          ],
                        }),
                        (0, s.jsxs)(V.Es, {
                          children: [
                            (0, s.jsx)(V.HM, {
                              asChild: !0,
                              children: (0, s.jsx)(G.$, {
                                type: "button",
                                variant: "outline",
                                className: "rounded-xl",
                                children: "Cancel",
                              }),
                            }),
                            (0, s.jsx)(V.HM, {
                              asChild: !0,
                              children: (0, s.jsx)(G.$, {
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
    3886: (e, t, r) => {
      "use strict";
      r.d(t, {
        lV: () => m,
        MJ: () => N,
        Rr: () => g,
        zB: () => f,
        eI: () => j,
        lR: () => v,
        C5: () => w,
      });
      var s = r(5155),
        a = r(2317),
        l = r(2115),
        n = r(9606),
        i = r(4352),
        o = r(1027),
        d = r(1567);
      let c = (0, o.F)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        ),
        u = l.forwardRef((e, t) => {
          let { className: r, ...a } = e;
          return (0, s.jsx)(i.b, {
            ref: t,
            className: (0, d.cn)(c(), r),
            ...a,
          });
        });
      u.displayName = i.b.displayName;
      let m = n.Op,
        x = l.createContext({}),
        f = (e) => {
          let { ...t } = e;
          return (0, s.jsx)(x.Provider, {
            value: { name: t.name },
            children: (0, s.jsx)(n.xI, { ...t }),
          });
        },
        h = () => {
          let e = l.useContext(x),
            t = l.useContext(p),
            { getFieldState: r, formState: s } = (0, n.xW)(),
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
        p = l.createContext({}),
        j = l.forwardRef((e, t) => {
          let { className: r, ...a } = e,
            n = l.useId();
          return (0, s.jsx)(p.Provider, {
            value: { id: n },
            children: (0, s.jsx)("div", {
              ref: t,
              className: (0, d.cn)("space-y-2", r),
              ...a,
            }),
          });
        });
      j.displayName = "FormItem";
      let v = l.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { error: l, formItemId: n } = h();
        return (0, s.jsx)(u, {
          ref: t,
          className: (0, d.cn)(l && "text-destructive", r),
          htmlFor: n,
          ...a,
        });
      });
      v.displayName = "FormLabel";
      let N = l.forwardRef((e, t) => {
        let { ...r } = e,
          {
            error: l,
            formItemId: n,
            formDescriptionId: i,
            formMessageId: o,
          } = h();
        return (0, s.jsx)(a.DX, {
          ref: t,
          id: n,
          "aria-describedby": l ? "".concat(i, " ").concat(o) : "".concat(i),
          "aria-invalid": !!l,
          ...r,
        });
      });
      N.displayName = "FormControl";
      let g = l.forwardRef((e, t) => {
        let { className: r, ...a } = e,
          { formDescriptionId: l } = h();
        return (0, s.jsx)("p", {
          ref: t,
          id: l,
          className: (0, d.cn)("text-[0.8rem] text-muted-foreground", r),
          ...a,
        });
      });
      g.displayName = "FormDescription";
      let w = l.forwardRef((e, t) => {
        let { className: r, children: a, ...l } = e,
          { error: n, formMessageId: i } = h(),
          o = n ? String(null == n ? void 0 : n.message) : a;
        return o
          ? (0, s.jsx)("p", {
              ref: t,
              id: i,
              className: (0, d.cn)(
                "text-[0.8rem] font-medium text-destructive",
                r,
              ),
              ...l,
              children: o,
            })
          : null;
      });
      w.displayName = "FormMessage";
    },
    3900: (e, t, r) => {
      "use strict";
      r.d(t, { p: () => n });
      var s = r(5155),
        a = r(2115),
        l = r(1567);
      let n = a.forwardRef((e, t) => {
        let { className: r, type: a, ...n } = e;
        return (0, s.jsx)("input", {
          type: a,
          className: (0, l.cn)(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            r,
          ),
          ref: t,
          ...n,
        });
      });
      n.displayName = "Input";
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    (e.O(0, [327, 971, 807, 721, 441, 517, 358], () => t(508)), (_N_E = e.O()));
  },
]);
