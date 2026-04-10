"use strict";
((exports.id = 74),
  (exports.ids = [74]),
  (exports.modules = {
    9905: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(3468).A)("ChevronRight", [
        ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }],
      ]);
    },
    4269: (e, t, n) => {
      n.d(t, { A: () => r });
      let r = (0, n(3468).A)("X", [
        ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
        ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
      ]);
    },
    7902: (e, t, n) => {
      n.d(t, {
        bm: () => td,
        UC: () => tl,
        VY: () => ts,
        hJ: () => tu,
        ZL: () => ta,
        bL: () => to,
        hE: () => tc,
        l9: () => ti,
      });
      var r,
        o,
        i,
        a = n(8009),
        u = n.t(a, 2);
      function l(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
        return function (r) {
          if ((e?.(r), !1 === n || !r.defaultPrevented)) return t?.(r);
        };
      }
      "undefined" != typeof window &&
        window.document &&
        window.document.createElement;
      var c = n(9952),
        s = n(5512),
        d = n(9397),
        f = u[" useId ".trim().toString()] || (() => void 0),
        p = 0;
      function m(e) {
        let [t, n] = a.useState(f());
        return (
          (0, d.N)(() => {
            e || n((e) => e ?? String(p++));
          }, [e]),
          e || (t ? `radix-${t}` : "")
        );
      }
      var v = u[" useInsertionEffect ".trim().toString()] || d.N,
        h = (Symbol("RADIX:SYNC_STATE"), n(5740)),
        g = Symbol("radix.slottable");
      function y(e) {
        return (
          a.isValidElement(e) &&
          "function" == typeof e.type &&
          "__radixId" in e.type &&
          e.type.__radixId === g
        );
      }
      var E = [
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
          let n = (function (e) {
              let t = (function (e) {
                  let t = a.forwardRef((e, t) => {
                    let { children: n, ...r } = e;
                    if (a.isValidElement(n)) {
                      let e, o;
                      let i =
                          (e = Object.getOwnPropertyDescriptor(
                            n.props,
                            "ref",
                          )?.get) &&
                          "isReactWarning" in e &&
                          e.isReactWarning
                            ? n.ref
                            : (e = Object.getOwnPropertyDescriptor(
                                  n,
                                  "ref",
                                )?.get) &&
                                "isReactWarning" in e &&
                                e.isReactWarning
                              ? n.props.ref
                              : n.props.ref || n.ref,
                        u = (function (e, t) {
                          let n = { ...t };
                          for (let r in t) {
                            let o = e[r],
                              i = t[r];
                            /^on[A-Z]/.test(r)
                              ? o && i
                                ? (n[r] = (...e) => {
                                    let t = i(...e);
                                    return (o(...e), t);
                                  })
                                : o && (n[r] = o)
                              : "style" === r
                                ? (n[r] = { ...o, ...i })
                                : "className" === r &&
                                  (n[r] = [o, i].filter(Boolean).join(" "));
                          }
                          return { ...e, ...n };
                        })(r, n.props);
                      return (
                        n.type !== a.Fragment &&
                          (u.ref = t ? (0, c.t)(t, i) : i),
                        a.cloneElement(n, u)
                      );
                    }
                    return a.Children.count(n) > 1
                      ? a.Children.only(null)
                      : null;
                  });
                  return ((t.displayName = `${e}.SlotClone`), t);
                })(e),
                n = a.forwardRef((e, n) => {
                  let { children: r, ...o } = e,
                    i = a.Children.toArray(r),
                    u = i.find(y);
                  if (u) {
                    let e = u.props.children,
                      r = i.map((t) =>
                        t !== u
                          ? t
                          : a.Children.count(e) > 1
                            ? a.Children.only(null)
                            : a.isValidElement(e)
                              ? e.props.children
                              : null,
                      );
                    return (0, s.jsx)(t, {
                      ...o,
                      ref: n,
                      children: a.isValidElement(e)
                        ? a.cloneElement(e, void 0, r)
                        : null,
                    });
                  }
                  return (0, s.jsx)(t, { ...o, ref: n, children: r });
                });
              return ((n.displayName = `${e}.Slot`), n);
            })(`Primitive.${t}`),
            r = a.forwardRef((e, r) => {
              let { asChild: o, ...i } = e,
                a = o ? n : t;
              return (
                "undefined" != typeof window &&
                  (window[Symbol.for("radix-ui")] = !0),
                (0, s.jsx)(a, { ...i, ref: r })
              );
            });
          return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
        }, {}),
        b = n(447),
        w = "dismissableLayer.update",
        C = a.createContext({
          layers: new Set(),
          layersWithOutsidePointerEventsDisabled: new Set(),
          branches: new Set(),
        }),
        N = a.forwardRef((e, t) => {
          let {
              disableOutsidePointerEvents: n = !1,
              onEscapeKeyDown: r,
              onPointerDownOutside: i,
              onFocusOutside: u,
              onInteractOutside: d,
              onDismiss: f,
              ...p
            } = e,
            m = a.useContext(C),
            [v, h] = a.useState(null),
            g = v?.ownerDocument ?? globalThis?.document,
            [, y] = a.useState({}),
            N = (0, c.s)(t, (e) => h(e)),
            S = Array.from(m.layers),
            [O] = [...m.layersWithOutsidePointerEventsDisabled].slice(-1),
            D = S.indexOf(O),
            P = v ? S.indexOf(v) : -1,
            A = m.layersWithOutsidePointerEventsDisabled.size > 0,
            T = P >= D,
            M = (function (e, t = globalThis?.document) {
              let n = (0, b.c)(e),
                r = a.useRef(!1),
                o = a.useRef(() => {});
              return (
                a.useEffect(() => {
                  let e = (e) => {
                      if (e.target && !r.current) {
                        let r = function () {
                            x("dismissableLayer.pointerDownOutside", n, i, {
                              discrete: !0,
                            });
                          },
                          i = { originalEvent: e };
                        "touch" === e.pointerType
                          ? (t.removeEventListener("click", o.current),
                            (o.current = r),
                            t.addEventListener("click", o.current, {
                              once: !0,
                            }))
                          : r();
                      } else t.removeEventListener("click", o.current);
                      r.current = !1;
                    },
                    i = window.setTimeout(() => {
                      t.addEventListener("pointerdown", e);
                    }, 0);
                  return () => {
                    (window.clearTimeout(i),
                      t.removeEventListener("pointerdown", e),
                      t.removeEventListener("click", o.current));
                  };
                }, [t, n]),
                { onPointerDownCapture: () => (r.current = !0) }
              );
            })((e) => {
              let t = e.target,
                n = [...m.branches].some((e) => e.contains(t));
              !T || n || (i?.(e), d?.(e), e.defaultPrevented || f?.());
            }, g),
            L = (function (e, t = globalThis?.document) {
              let n = (0, b.c)(e),
                r = a.useRef(!1);
              return (
                a.useEffect(() => {
                  let e = (e) => {
                    e.target &&
                      !r.current &&
                      x(
                        "dismissableLayer.focusOutside",
                        n,
                        { originalEvent: e },
                        { discrete: !1 },
                      );
                  };
                  return (
                    t.addEventListener("focusin", e),
                    () => t.removeEventListener("focusin", e)
                  );
                }, [t, n]),
                {
                  onFocusCapture: () => (r.current = !0),
                  onBlurCapture: () => (r.current = !1),
                }
              );
            })((e) => {
              let t = e.target;
              [...m.branches].some((e) => e.contains(t)) ||
                (u?.(e), d?.(e), e.defaultPrevented || f?.());
            }, g);
          return (
            (function (e, t = globalThis?.document) {
              let n = (0, b.c)(e);
              a.useEffect(() => {
                let e = (e) => {
                  "Escape" === e.key && n(e);
                };
                return (
                  t.addEventListener("keydown", e, { capture: !0 }),
                  () => t.removeEventListener("keydown", e, { capture: !0 })
                );
              }, [n, t]);
            })((e) => {
              P !== m.layers.size - 1 ||
                (r?.(e), !e.defaultPrevented && f && (e.preventDefault(), f()));
            }, g),
            a.useEffect(() => {
              if (v)
                return (
                  n &&
                    (0 === m.layersWithOutsidePointerEventsDisabled.size &&
                      ((o = g.body.style.pointerEvents),
                      (g.body.style.pointerEvents = "none")),
                    m.layersWithOutsidePointerEventsDisabled.add(v)),
                  m.layers.add(v),
                  R(),
                  () => {
                    n &&
                      1 === m.layersWithOutsidePointerEventsDisabled.size &&
                      (g.body.style.pointerEvents = o);
                  }
                );
            }, [v, g, n, m]),
            a.useEffect(
              () => () => {
                v &&
                  (m.layers.delete(v),
                  m.layersWithOutsidePointerEventsDisabled.delete(v),
                  R());
              },
              [v, m],
            ),
            a.useEffect(() => {
              let e = () => y({});
              return (
                document.addEventListener(w, e),
                () => document.removeEventListener(w, e)
              );
            }, []),
            (0, s.jsx)(E.div, {
              ...p,
              ref: N,
              style: {
                pointerEvents: A ? (T ? "auto" : "none") : void 0,
                ...e.style,
              },
              onFocusCapture: l(e.onFocusCapture, L.onFocusCapture),
              onBlurCapture: l(e.onBlurCapture, L.onBlurCapture),
              onPointerDownCapture: l(
                e.onPointerDownCapture,
                M.onPointerDownCapture,
              ),
            })
          );
        });
      function R() {
        let e = new CustomEvent(w);
        document.dispatchEvent(e);
      }
      function x(e, t, n, { discrete: r }) {
        let o = n.originalEvent.target,
          i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
        (t && o.addEventListener(e, t, { once: !0 }), r)
          ? o && h.flushSync(() => o.dispatchEvent(i))
          : o.dispatchEvent(i);
      }
      ((N.displayName = "DismissableLayer"),
        (a.forwardRef((e, t) => {
          let n = a.useContext(C),
            r = a.useRef(null),
            o = (0, c.s)(t, r);
          return (
            a.useEffect(() => {
              let e = r.current;
              if (e)
                return (
                  n.branches.add(e),
                  () => {
                    n.branches.delete(e);
                  }
                );
            }, [n.branches]),
            (0, s.jsx)(E.div, { ...e, ref: o })
          );
        }).displayName = "DismissableLayerBranch"));
      var S = "focusScope.autoFocusOnMount",
        O = "focusScope.autoFocusOnUnmount",
        D = { bubbles: !1, cancelable: !0 },
        P = a.forwardRef((e, t) => {
          let {
              loop: n = !1,
              trapped: r = !1,
              onMountAutoFocus: o,
              onUnmountAutoFocus: i,
              ...u
            } = e,
            [l, d] = a.useState(null),
            f = (0, b.c)(o),
            p = (0, b.c)(i),
            m = a.useRef(null),
            v = (0, c.s)(t, (e) => d(e)),
            h = a.useRef({
              paused: !1,
              pause() {
                this.paused = !0;
              },
              resume() {
                this.paused = !1;
              },
            }).current;
          (a.useEffect(() => {
            if (r) {
              let e = function (e) {
                  if (h.paused || !l) return;
                  let t = e.target;
                  l.contains(t)
                    ? (m.current = t)
                    : M(m.current, { select: !0 });
                },
                t = function (e) {
                  if (h.paused || !l) return;
                  let t = e.relatedTarget;
                  null === t || l.contains(t) || M(m.current, { select: !0 });
                };
              (document.addEventListener("focusin", e),
                document.addEventListener("focusout", t));
              let n = new MutationObserver(function (e) {
                if (document.activeElement === document.body)
                  for (let t of e) t.removedNodes.length > 0 && M(l);
              });
              return (
                l && n.observe(l, { childList: !0, subtree: !0 }),
                () => {
                  (document.removeEventListener("focusin", e),
                    document.removeEventListener("focusout", t),
                    n.disconnect());
                }
              );
            }
          }, [r, l, h.paused]),
            a.useEffect(() => {
              if (l) {
                L.add(h);
                let e = document.activeElement;
                if (!l.contains(e)) {
                  let t = new CustomEvent(S, D);
                  (l.addEventListener(S, f),
                    l.dispatchEvent(t),
                    t.defaultPrevented ||
                      ((function (e, { select: t = !1 } = {}) {
                        let n = document.activeElement;
                        for (let r of e)
                          if (
                            (M(r, { select: t }), document.activeElement !== n)
                          )
                            return;
                      })(
                        A(l).filter((e) => "A" !== e.tagName),
                        { select: !0 },
                      ),
                      document.activeElement === e && M(l)));
                }
                return () => {
                  (l.removeEventListener(S, f),
                    setTimeout(() => {
                      let t = new CustomEvent(O, D);
                      (l.addEventListener(O, p),
                        l.dispatchEvent(t),
                        t.defaultPrevented ||
                          M(e ?? document.body, { select: !0 }),
                        l.removeEventListener(O, p),
                        L.remove(h));
                    }, 0));
                };
              }
            }, [l, f, p, h]));
          let g = a.useCallback(
            (e) => {
              if ((!n && !r) || h.paused) return;
              let t = "Tab" === e.key && !e.altKey && !e.ctrlKey && !e.metaKey,
                o = document.activeElement;
              if (t && o) {
                let t = e.currentTarget,
                  [r, i] = (function (e) {
                    let t = A(e);
                    return [T(t, e), T(t.reverse(), e)];
                  })(t);
                r && i
                  ? e.shiftKey || o !== i
                    ? e.shiftKey &&
                      o === r &&
                      (e.preventDefault(), n && M(i, { select: !0 }))
                    : (e.preventDefault(), n && M(r, { select: !0 }))
                  : o === t && e.preventDefault();
              }
            },
            [n, r, h.paused],
          );
          return (0, s.jsx)(E.div, {
            tabIndex: -1,
            ...u,
            ref: v,
            onKeyDown: g,
          });
        });
      function A(e) {
        let t = [],
          n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: (e) => {
              let t = "INPUT" === e.tagName && "hidden" === e.type;
              return e.disabled || e.hidden || t
                ? NodeFilter.FILTER_SKIP
                : e.tabIndex >= 0
                  ? NodeFilter.FILTER_ACCEPT
                  : NodeFilter.FILTER_SKIP;
            },
          });
        for (; n.nextNode(); ) t.push(n.currentNode);
        return t;
      }
      function T(e, t) {
        for (let n of e)
          if (
            !(function (e, { upTo: t }) {
              if ("hidden" === getComputedStyle(e).visibility) return !0;
              for (; e && (void 0 === t || e !== t); ) {
                if ("none" === getComputedStyle(e).display) return !0;
                e = e.parentElement;
              }
              return !1;
            })(n, { upTo: t })
          )
            return n;
      }
      function M(e, { select: t = !1 } = {}) {
        if (e && e.focus) {
          var n;
          let r = document.activeElement;
          (e.focus({ preventScroll: !0 }),
            e !== r &&
              (n = e) instanceof HTMLInputElement &&
              "select" in n &&
              t &&
              e.select());
        }
      }
      P.displayName = "FocusScope";
      var L = (function () {
        let e = [];
        return {
          add(t) {
            let n = e[0];
            (t !== n && n?.pause(), (e = j(e, t)).unshift(t));
          },
          remove(t) {
            ((e = j(e, t)), e[0]?.resume());
          },
        };
      })();
      function j(e, t) {
        let n = [...e],
          r = n.indexOf(t);
        return (-1 !== r && n.splice(r, 1), n);
      }
      var I = a.forwardRef((e, t) => {
        let { container: n, ...r } = e,
          [o, i] = a.useState(!1);
        (0, d.N)(() => i(!0), []);
        let u = n || (o && globalThis?.document?.body);
        return u
          ? h.createPortal((0, s.jsx)(E.div, { ...r, ref: t }), u)
          : null;
      });
      I.displayName = "Portal";
      var k = (e) => {
        let { present: t, children: n } = e,
          r = (function (e) {
            var t, n;
            let [r, o] = a.useState(),
              i = a.useRef(null),
              u = a.useRef(e),
              l = a.useRef("none"),
              [c, s] =
                ((t = e ? "mounted" : "unmounted"),
                (n = {
                  mounted: {
                    UNMOUNT: "unmounted",
                    ANIMATION_OUT: "unmountSuspended",
                  },
                  unmountSuspended: {
                    MOUNT: "mounted",
                    ANIMATION_END: "unmounted",
                  },
                  unmounted: { MOUNT: "mounted" },
                }),
                a.useReducer((e, t) => n[e][t] ?? e, t));
            return (
              a.useEffect(() => {
                let e = F(i.current);
                l.current = "mounted" === c ? e : "none";
              }, [c]),
              (0, d.N)(() => {
                let t = i.current,
                  n = u.current;
                if (n !== e) {
                  let r = l.current,
                    o = F(t);
                  (e
                    ? s("MOUNT")
                    : "none" === o || t?.display === "none"
                      ? s("UNMOUNT")
                      : n && r !== o
                        ? s("ANIMATION_OUT")
                        : s("UNMOUNT"),
                    (u.current = e));
                }
              }, [e, s]),
              (0, d.N)(() => {
                if (r) {
                  let e;
                  let t = r.ownerDocument.defaultView ?? window,
                    n = (n) => {
                      let o = F(i.current).includes(
                        CSS.escape(n.animationName),
                      );
                      if (
                        n.target === r &&
                        o &&
                        (s("ANIMATION_END"), !u.current)
                      ) {
                        let n = r.style.animationFillMode;
                        ((r.style.animationFillMode = "forwards"),
                          (e = t.setTimeout(() => {
                            "forwards" === r.style.animationFillMode &&
                              (r.style.animationFillMode = n);
                          })));
                      }
                    },
                    o = (e) => {
                      e.target === r && (l.current = F(i.current));
                    };
                  return (
                    r.addEventListener("animationstart", o),
                    r.addEventListener("animationcancel", n),
                    r.addEventListener("animationend", n),
                    () => {
                      (t.clearTimeout(e),
                        r.removeEventListener("animationstart", o),
                        r.removeEventListener("animationcancel", n),
                        r.removeEventListener("animationend", n));
                    }
                  );
                }
                s("ANIMATION_END");
              }, [r, s]),
              {
                isPresent: ["mounted", "unmountSuspended"].includes(c),
                ref: a.useCallback((e) => {
                  ((i.current = e ? getComputedStyle(e) : null), o(e));
                }, []),
              }
            );
          })(t),
          o =
            "function" == typeof n
              ? n({ present: r.isPresent })
              : a.Children.only(n),
          i = (0, c.s)(
            r.ref,
            (function (e) {
              let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
                n = t && "isReactWarning" in t && t.isReactWarning;
              return n
                ? e.ref
                : (n =
                      (t = Object.getOwnPropertyDescriptor(e, "ref")?.get) &&
                      "isReactWarning" in t &&
                      t.isReactWarning)
                  ? e.props.ref
                  : e.props.ref || e.ref;
            })(o),
          );
        return "function" == typeof n || r.isPresent
          ? a.cloneElement(o, { ref: i })
          : null;
      };
      function F(e) {
        return e?.animationName || "none";
      }
      k.displayName = "Presence";
      var W = 0;
      function _() {
        let e = document.createElement("span");
        return (
          e.setAttribute("data-radix-focus-guard", ""),
          (e.tabIndex = 0),
          (e.style.outline = "none"),
          (e.style.opacity = "0"),
          (e.style.position = "fixed"),
          (e.style.pointerEvents = "none"),
          e
        );
      }
      var $ = function () {
        return ($ =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
      function B(e, t) {
        var n = {};
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) &&
            0 > t.indexOf(r) &&
            (n[r] = e[r]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var o = 0, r = Object.getOwnPropertySymbols(e);
            o < r.length;
            o++
          )
            0 > t.indexOf(r[o]) &&
              Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
              (n[r[o]] = e[r[o]]);
        return n;
      }
      (Object.create, Object.create);
      var U =
          ("function" == typeof SuppressedError && SuppressedError,
          "right-scroll-bar-position"),
        V = "width-before-scroll-bar";
      function K(e, t) {
        return ("function" == typeof e ? e(t) : e && (e.current = t), e);
      }
      var X = "undefined" != typeof window ? a.useLayoutEffect : a.useEffect,
        Y = new WeakMap();
      function Z(e) {
        return e;
      }
      var z = (function (e) {
          void 0 === e && (e = {});
          var t,
            n,
            r,
            o =
              (void 0 === t && (t = Z),
              (n = []),
              (r = !1),
              {
                read: function () {
                  if (r)
                    throw Error(
                      "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
                    );
                  return n.length ? n[n.length - 1] : null;
                },
                useMedium: function (e) {
                  var o = t(e, r);
                  return (
                    n.push(o),
                    function () {
                      n = n.filter(function (e) {
                        return e !== o;
                      });
                    }
                  );
                },
                assignSyncMedium: function (e) {
                  for (r = !0; n.length; ) {
                    var t = n;
                    ((n = []), t.forEach(e));
                  }
                  n = {
                    push: function (t) {
                      return e(t);
                    },
                    filter: function () {
                      return n;
                    },
                  };
                },
                assignMedium: function (e) {
                  r = !0;
                  var t = [];
                  if (n.length) {
                    var o = n;
                    ((n = []), o.forEach(e), (t = n));
                  }
                  var i = function () {
                      var n = t;
                      ((t = []), n.forEach(e));
                    },
                    a = function () {
                      return Promise.resolve().then(i);
                    };
                  (a(),
                    (n = {
                      push: function (e) {
                        (t.push(e), a());
                      },
                      filter: function (e) {
                        return ((t = t.filter(e)), n);
                      },
                    }));
                },
              });
          return ((o.options = $({ async: !0, ssr: !1 }, e)), o);
        })(),
        q = function () {},
        H = a.forwardRef(function (e, t) {
          var n,
            r,
            o,
            i,
            u = a.useRef(null),
            l = a.useState({
              onScrollCapture: q,
              onWheelCapture: q,
              onTouchMoveCapture: q,
            }),
            c = l[0],
            s = l[1],
            d = e.forwardProps,
            f = e.children,
            p = e.className,
            m = e.removeScrollBar,
            v = e.enabled,
            h = e.shards,
            g = e.sideCar,
            y = e.noRelative,
            E = e.noIsolation,
            b = e.inert,
            w = e.allowPinchZoom,
            C = e.as,
            N = e.gapMode,
            R = B(e, [
              "forwardProps",
              "children",
              "className",
              "removeScrollBar",
              "enabled",
              "shards",
              "sideCar",
              "noRelative",
              "noIsolation",
              "inert",
              "allowPinchZoom",
              "as",
              "gapMode",
            ]),
            x =
              ((n = [u, t]),
              (r = function (e) {
                return n.forEach(function (t) {
                  return K(t, e);
                });
              }),
              ((o = (0, a.useState)(function () {
                return {
                  value: null,
                  callback: r,
                  facade: {
                    get current() {
                      return o.value;
                    },
                    set current(value) {
                      var e = o.value;
                      e !== value && ((o.value = value), o.callback(value, e));
                    },
                  },
                };
              })[0]).callback = r),
              (i = o.facade),
              X(
                function () {
                  var e = Y.get(i);
                  if (e) {
                    var t = new Set(e),
                      r = new Set(n),
                      o = i.current;
                    (t.forEach(function (e) {
                      r.has(e) || K(e, null);
                    }),
                      r.forEach(function (e) {
                        t.has(e) || K(e, o);
                      }));
                  }
                  Y.set(i, n);
                },
                [n],
              ),
              i),
            S = $($({}, R), c);
          return a.createElement(
            a.Fragment,
            null,
            v &&
              a.createElement(g, {
                sideCar: z,
                removeScrollBar: m,
                shards: h,
                noRelative: y,
                noIsolation: E,
                inert: b,
                setCallbacks: s,
                allowPinchZoom: !!w,
                lockRef: u,
                gapMode: N,
              }),
            d
              ? a.cloneElement(a.Children.only(f), $($({}, S), { ref: x }))
              : a.createElement(
                  void 0 === C ? "div" : C,
                  $({}, S, { className: p, ref: x }),
                  f,
                ),
          );
        });
      ((H.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
        (H.classNames = { fullWidth: V, zeroRight: U }));
      var G = function (e) {
        var t = e.sideCar,
          n = B(e, ["sideCar"]);
        if (!t)
          throw Error(
            "Sidecar: please provide `sideCar` property to import the right car",
          );
        var r = t.read();
        if (!r) throw Error("Sidecar medium not found");
        return a.createElement(r, $({}, n));
      };
      G.isSideCarExport = !0;
      var J = function () {
          var e = 0,
            t = null;
          return {
            add: function (r) {
              if (
                0 == e &&
                (t = (function () {
                  if (!document) return null;
                  var e = document.createElement("style");
                  e.type = "text/css";
                  var t = i || n.nc;
                  return (t && e.setAttribute("nonce", t), e);
                })())
              ) {
                var o, a;
                ((o = t).styleSheet
                  ? (o.styleSheet.cssText = r)
                  : o.appendChild(document.createTextNode(r)),
                  (a = t),
                  (
                    document.head || document.getElementsByTagName("head")[0]
                  ).appendChild(a));
              }
              e++;
            },
            remove: function () {
              --e ||
                !t ||
                (t.parentNode && t.parentNode.removeChild(t), (t = null));
            },
          };
        },
        Q = function () {
          var e = J();
          return function (t, n) {
            a.useEffect(
              function () {
                return (
                  e.add(t),
                  function () {
                    e.remove();
                  }
                );
              },
              [t && n],
            );
          };
        },
        ee = function () {
          var e = Q();
          return function (t) {
            return (e(t.styles, t.dynamic), null);
          };
        },
        et = { left: 0, top: 0, right: 0, gap: 0 },
        en = function (e) {
          return parseInt(e || "", 10) || 0;
        },
        er = function (e) {
          var t = window.getComputedStyle(document.body),
            n = t["padding" === e ? "paddingLeft" : "marginLeft"],
            r = t["padding" === e ? "paddingTop" : "marginTop"],
            o = t["padding" === e ? "paddingRight" : "marginRight"];
          return [en(n), en(r), en(o)];
        },
        eo = function (e) {
          if ((void 0 === e && (e = "margin"), "undefined" == typeof window))
            return et;
          var t = er(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
          return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, r - n + t[2] - t[0]),
          };
        },
        ei = ee(),
        ea = "data-scroll-locked",
        eu = function (e, t, n, r) {
          var o = e.left,
            i = e.top,
            a = e.right,
            u = e.gap;
          return (
            void 0 === n && (n = "margin"),
            "\n  ."
              .concat("with-scroll-bars-hidden", " {\n   overflow: hidden ")
              .concat(r, ";\n   padding-right: ")
              .concat(u, "px ")
              .concat(r, ";\n  }\n  body[")
              .concat(ea, "] {\n    overflow: hidden ")
              .concat(r, ";\n    overscroll-behavior: contain;\n    ")
              .concat(
                [
                  t && "position: relative ".concat(r, ";"),
                  "margin" === n &&
                    "\n    padding-left: "
                      .concat(o, "px;\n    padding-top: ")
                      .concat(i, "px;\n    padding-right: ")
                      .concat(
                        a,
                        "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ",
                      )
                      .concat(u, "px ")
                      .concat(r, ";\n    "),
                  "padding" === n &&
                    "padding-right: ".concat(u, "px ").concat(r, ";"),
                ]
                  .filter(Boolean)
                  .join(""),
                "\n  }\n  \n  .",
              )
              .concat(U, " {\n    right: ")
              .concat(u, "px ")
              .concat(r, ";\n  }\n  \n  .")
              .concat(V, " {\n    margin-right: ")
              .concat(u, "px ")
              .concat(r, ";\n  }\n  \n  .")
              .concat(U, " .")
              .concat(U, " {\n    right: 0 ")
              .concat(r, ";\n  }\n  \n  .")
              .concat(V, " .")
              .concat(V, " {\n    margin-right: 0 ")
              .concat(r, ";\n  }\n  \n  body[")
              .concat(ea, "] {\n    ")
              .concat("--removed-body-scroll-bar-size", ": ")
              .concat(u, "px;\n  }\n")
          );
        },
        el = function () {
          var e = parseInt(document.body.getAttribute(ea) || "0", 10);
          return isFinite(e) ? e : 0;
        },
        ec = function () {
          a.useEffect(function () {
            return (
              document.body.setAttribute(ea, (el() + 1).toString()),
              function () {
                var e = el() - 1;
                e <= 0
                  ? document.body.removeAttribute(ea)
                  : document.body.setAttribute(ea, e.toString());
              }
            );
          }, []);
        },
        es = function (e) {
          var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            o = void 0 === r ? "margin" : r;
          ec();
          var i = a.useMemo(
            function () {
              return eo(o);
            },
            [o],
          );
          return a.createElement(ei, {
            styles: eu(i, !t, o, n ? "" : "!important"),
          });
        },
        ed = !1;
      if ("undefined" != typeof window)
        try {
          var ef = Object.defineProperty({}, "passive", {
            get: function () {
              return ((ed = !0), !0);
            },
          });
          (window.addEventListener("test", ef, ef),
            window.removeEventListener("test", ef, ef));
        } catch (e) {
          ed = !1;
        }
      var ep = !!ed && { passive: !1 },
        em = function (e, t) {
          if (!(e instanceof Element)) return !1;
          var n = window.getComputedStyle(e);
          return (
            "hidden" !== n[t] &&
            !(
              n.overflowY === n.overflowX &&
              "TEXTAREA" !== e.tagName &&
              "visible" === n[t]
            )
          );
        },
        ev = function (e, t) {
          var n = t.ownerDocument,
            r = t;
          do {
            if (
              ("undefined" != typeof ShadowRoot &&
                r instanceof ShadowRoot &&
                (r = r.host),
              eh(e, r))
            ) {
              var o = eg(e, r);
              if (o[1] > o[2]) return !0;
            }
            r = r.parentNode;
          } while (r && r !== n.body);
          return !1;
        },
        eh = function (e, t) {
          return "v" === e ? em(t, "overflowY") : em(t, "overflowX");
        },
        eg = function (e, t) {
          return "v" === e
            ? [t.scrollTop, t.scrollHeight, t.clientHeight]
            : [t.scrollLeft, t.scrollWidth, t.clientWidth];
        },
        ey = function (e, t, n, r, o) {
          var i,
            a =
              ((i = window.getComputedStyle(t).direction),
              "h" === e && "rtl" === i ? -1 : 1),
            u = a * r,
            l = n.target,
            c = t.contains(l),
            s = !1,
            d = u > 0,
            f = 0,
            p = 0;
          do {
            if (!l) break;
            var m = eg(e, l),
              v = m[0],
              h = m[1] - m[2] - a * v;
            (v || h) && eh(e, l) && ((f += h), (p += v));
            var g = l.parentNode;
            l = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
          } while (
            (!c && l !== document.body) ||
            (c && (t.contains(l) || t === l))
          );
          return (
            d && ((o && 1 > Math.abs(f)) || (!o && u > f))
              ? (s = !0)
              : !d && ((o && 1 > Math.abs(p)) || (!o && -u > p)) && (s = !0),
            s
          );
        },
        eE = function (e) {
          return "changedTouches" in e
            ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
            : [0, 0];
        },
        eb = function (e) {
          return [e.deltaX, e.deltaY];
        },
        ew = function (e) {
          return e && "current" in e ? e.current : e;
        },
        eC = 0,
        eN = [];
      let eR =
        ((r = function (e) {
          var t = a.useRef([]),
            n = a.useRef([0, 0]),
            r = a.useRef(),
            o = a.useState(eC++)[0],
            i = a.useState(ee)[0],
            u = a.useRef(e);
          (a.useEffect(
            function () {
              u.current = e;
            },
            [e],
          ),
            a.useEffect(
              function () {
                if (e.inert) {
                  document.body.classList.add("block-interactivity-".concat(o));
                  var t = (function (e, t, n) {
                    if (n || 2 == arguments.length)
                      for (var r, o = 0, i = t.length; o < i; o++)
                        (!r && o in t) ||
                          (r || (r = Array.prototype.slice.call(t, 0, o)),
                          (r[o] = t[o]));
                    return e.concat(r || Array.prototype.slice.call(t));
                  })([e.lockRef.current], (e.shards || []).map(ew), !0).filter(
                    Boolean,
                  );
                  return (
                    t.forEach(function (e) {
                      return e.classList.add("allow-interactivity-".concat(o));
                    }),
                    function () {
                      (document.body.classList.remove(
                        "block-interactivity-".concat(o),
                      ),
                        t.forEach(function (e) {
                          return e.classList.remove(
                            "allow-interactivity-".concat(o),
                          );
                        }));
                    }
                  );
                }
              },
              [e.inert, e.lockRef.current, e.shards],
            ));
          var l = a.useCallback(function (e, t) {
              if (
                ("touches" in e && 2 === e.touches.length) ||
                ("wheel" === e.type && e.ctrlKey)
              )
                return !u.current.allowPinchZoom;
              var o,
                i = eE(e),
                a = n.current,
                l = "deltaX" in e ? e.deltaX : a[0] - i[0],
                c = "deltaY" in e ? e.deltaY : a[1] - i[1],
                s = e.target,
                d = Math.abs(l) > Math.abs(c) ? "h" : "v";
              if ("touches" in e && "h" === d && "range" === s.type) return !1;
              var f = window.getSelection(),
                p = f && f.anchorNode;
              if (p && (p === s || p.contains(s))) return !1;
              var m = ev(d, s);
              if (!m) return !0;
              if (
                (m ? (o = d) : ((o = "v" === d ? "h" : "v"), (m = ev(d, s))),
                !m)
              )
                return !1;
              if (
                (!r.current &&
                  "changedTouches" in e &&
                  (l || c) &&
                  (r.current = o),
                !o)
              )
                return !0;
              var v = r.current || o;
              return ey(v, t, e, "h" === v ? l : c, !0);
            }, []),
            c = a.useCallback(function (e) {
              if (eN.length && eN[eN.length - 1] === i) {
                var n = "deltaY" in e ? eb(e) : eE(e),
                  r = t.current.filter(function (t) {
                    var r;
                    return (
                      t.name === e.type &&
                      (t.target === e.target || e.target === t.shadowParent) &&
                      (r = t.delta)[0] === n[0] &&
                      r[1] === n[1]
                    );
                  })[0];
                if (r && r.should) {
                  e.cancelable && e.preventDefault();
                  return;
                }
                if (!r) {
                  var o = (u.current.shards || [])
                    .map(ew)
                    .filter(Boolean)
                    .filter(function (t) {
                      return t.contains(e.target);
                    });
                  (o.length > 0 ? l(e, o[0]) : !u.current.noIsolation) &&
                    e.cancelable &&
                    e.preventDefault();
                }
              }
            }, []),
            s = a.useCallback(function (e, n, r, o) {
              var i = {
                name: e,
                delta: n,
                target: r,
                should: o,
                shadowParent: (function (e) {
                  for (var t = null; null !== e; )
                    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
                      (e = e.parentNode));
                  return t;
                })(r),
              };
              (t.current.push(i),
                setTimeout(function () {
                  t.current = t.current.filter(function (e) {
                    return e !== i;
                  });
                }, 1));
            }, []),
            d = a.useCallback(function (e) {
              ((n.current = eE(e)), (r.current = void 0));
            }, []),
            f = a.useCallback(function (t) {
              s(t.type, eb(t), t.target, l(t, e.lockRef.current));
            }, []),
            p = a.useCallback(function (t) {
              s(t.type, eE(t), t.target, l(t, e.lockRef.current));
            }, []);
          a.useEffect(function () {
            return (
              eN.push(i),
              e.setCallbacks({
                onScrollCapture: f,
                onWheelCapture: f,
                onTouchMoveCapture: p,
              }),
              document.addEventListener("wheel", c, ep),
              document.addEventListener("touchmove", c, ep),
              document.addEventListener("touchstart", d, ep),
              function () {
                ((eN = eN.filter(function (e) {
                  return e !== i;
                })),
                  document.removeEventListener("wheel", c, ep),
                  document.removeEventListener("touchmove", c, ep),
                  document.removeEventListener("touchstart", d, ep));
              }
            );
          }, []);
          var m = e.removeScrollBar,
            v = e.inert;
          return a.createElement(
            a.Fragment,
            null,
            v
              ? a.createElement(i, {
                  styles: "\n  .block-interactivity-"
                    .concat(
                      o,
                      " {pointer-events: none;}\n  .allow-interactivity-",
                    )
                    .concat(o, " {pointer-events: all;}\n"),
                })
              : null,
            m
              ? a.createElement(es, {
                  noRelative: e.noRelative,
                  gapMode: e.gapMode,
                })
              : null,
          );
        }),
        z.useMedium(r),
        G);
      var ex = a.forwardRef(function (e, t) {
        return a.createElement(H, $({}, e, { ref: t, sideCar: eR }));
      });
      ex.classNames = H.classNames;
      var eS = new WeakMap(),
        eO = new WeakMap(),
        eD = {},
        eP = 0,
        eA = function (e) {
          return e && (e.host || eA(e.parentNode));
        },
        eT = function (e, t, n, r) {
          var o = (Array.isArray(e) ? e : [e])
            .map(function (e) {
              if (t.contains(e)) return e;
              var n = eA(e);
              return n && t.contains(n)
                ? n
                : (console.error(
                    "aria-hidden",
                    e,
                    "in not contained inside",
                    t,
                    ". Doing nothing",
                  ),
                  null);
            })
            .filter(function (e) {
              return !!e;
            });
          eD[n] || (eD[n] = new WeakMap());
          var i = eD[n],
            a = [],
            u = new Set(),
            l = new Set(o),
            c = function (e) {
              !e || u.has(e) || (u.add(e), c(e.parentNode));
            };
          o.forEach(c);
          var s = function (e) {
            !e ||
              l.has(e) ||
              Array.prototype.forEach.call(e.children, function (e) {
                if (u.has(e)) s(e);
                else
                  try {
                    var t = e.getAttribute(r),
                      o = null !== t && "false" !== t,
                      l = (eS.get(e) || 0) + 1,
                      c = (i.get(e) || 0) + 1;
                    (eS.set(e, l),
                      i.set(e, c),
                      a.push(e),
                      1 === l && o && eO.set(e, !0),
                      1 === c && e.setAttribute(n, "true"),
                      o || e.setAttribute(r, "true"));
                  } catch (t) {
                    console.error("aria-hidden: cannot operate on ", e, t);
                  }
              });
          };
          return (
            s(t),
            u.clear(),
            eP++,
            function () {
              (a.forEach(function (e) {
                var t = eS.get(e) - 1,
                  o = i.get(e) - 1;
                (eS.set(e, t),
                  i.set(e, o),
                  t || (eO.has(e) || e.removeAttribute(r), eO.delete(e)),
                  o || e.removeAttribute(n));
              }),
                --eP ||
                  ((eS = new WeakMap()),
                  (eS = new WeakMap()),
                  (eO = new WeakMap()),
                  (eD = {})));
            }
          );
        },
        eM = function (e, t, n) {
          void 0 === n && (n = "data-aria-hidden");
          var r,
            o = Array.from(Array.isArray(e) ? e : [e]),
            i =
              t ||
              ((r = e),
              "undefined" == typeof document
                ? null
                : (Array.isArray(r) ? r[0] : r).ownerDocument.body);
          return i
            ? (o.push.apply(
                o,
                Array.from(i.querySelectorAll("[aria-live], script")),
              ),
              eT(o, i, n, "aria-hidden"))
            : function () {
                return null;
              };
        },
        eL = Symbol("radix.slottable");
      function ej(e) {
        return (
          a.isValidElement(e) &&
          "function" == typeof e.type &&
          "__radixId" in e.type &&
          e.type.__radixId === eL
        );
      }
      var eI = "Dialog",
        [ek, eF] = (function (e, t = []) {
          let n = [],
            r = () => {
              let t = n.map((e) => a.createContext(e));
              return function (n) {
                let r = n?.[e] || t;
                return a.useMemo(
                  () => ({ [`__scope${e}`]: { ...n, [e]: r } }),
                  [n, r],
                );
              };
            };
          return (
            (r.scopeName = e),
            [
              function (t, r) {
                let o = a.createContext(r),
                  i = n.length;
                n = [...n, r];
                let u = (t) => {
                  let { scope: n, children: r, ...u } = t,
                    l = n?.[e]?.[i] || o,
                    c = a.useMemo(() => u, Object.values(u));
                  return (0, s.jsx)(l.Provider, { value: c, children: r });
                };
                return (
                  (u.displayName = t + "Provider"),
                  [
                    u,
                    function (n, u) {
                      let l = u?.[e]?.[i] || o,
                        c = a.useContext(l);
                      if (c) return c;
                      if (void 0 !== r) return r;
                      throw Error(`\`${n}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let n = () => {
                  let n = e.map((e) => ({
                    useScope: e(),
                    scopeName: e.scopeName,
                  }));
                  return function (e) {
                    let r = n.reduce((t, { useScope: n, scopeName: r }) => {
                      let o = n(e)[`__scope${r}`];
                      return { ...t, ...o };
                    }, {});
                    return a.useMemo(
                      () => ({ [`__scope${t.scopeName}`]: r }),
                      [r],
                    );
                  };
                };
                return ((n.scopeName = t.scopeName), n);
              })(r, ...t),
            ]
          );
        })(eI),
        [eW, e_] = ek(eI),
        e$ = (e) => {
          let {
              __scopeDialog: t,
              children: n,
              open: r,
              defaultOpen: o,
              onOpenChange: i,
              modal: u = !0,
            } = e,
            l = a.useRef(null),
            c = a.useRef(null),
            [d, f] = (function ({
              prop: e,
              defaultProp: t,
              onChange: n = () => {},
              caller: r,
            }) {
              let [o, i, u] = (function ({ defaultProp: e, onChange: t }) {
                  let [n, r] = a.useState(e),
                    o = a.useRef(n),
                    i = a.useRef(t);
                  return (
                    v(() => {
                      i.current = t;
                    }, [t]),
                    a.useEffect(() => {
                      o.current !== n && (i.current?.(n), (o.current = n));
                    }, [n, o]),
                    [n, r, i]
                  );
                })({ defaultProp: t, onChange: n }),
                l = void 0 !== e,
                c = l ? e : o;
              {
                let t = a.useRef(void 0 !== e);
                a.useEffect(() => {
                  let e = t.current;
                  if (e !== l) {
                    let t = l ? "controlled" : "uncontrolled";
                    console.warn(
                      `${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${t}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
                    );
                  }
                  t.current = l;
                }, [l, r]);
              }
              return [
                c,
                a.useCallback(
                  (t) => {
                    if (l) {
                      let n = "function" == typeof t ? t(e) : t;
                      n !== e && u.current?.(n);
                    } else i(t);
                  },
                  [l, e, i, u],
                ),
              ];
            })({ prop: r, defaultProp: o ?? !1, onChange: i, caller: eI });
          return (0, s.jsx)(eW, {
            scope: t,
            triggerRef: l,
            contentRef: c,
            contentId: m(),
            titleId: m(),
            descriptionId: m(),
            open: d,
            onOpenChange: f,
            onOpenToggle: a.useCallback(() => f((e) => !e), [f]),
            modal: u,
            children: n,
          });
        };
      e$.displayName = eI;
      var eB = "DialogTrigger",
        eU = a.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = e_(eB, n),
            i = (0, c.s)(t, o.triggerRef);
          return (0, s.jsx)(E.button, {
            type: "button",
            "aria-haspopup": "dialog",
            "aria-expanded": o.open,
            "aria-controls": o.contentId,
            "data-state": e5(o.open),
            ...r,
            ref: i,
            onClick: l(e.onClick, o.onOpenToggle),
          });
        });
      eU.displayName = eB;
      var eV = "DialogPortal",
        [eK, eX] = ek(eV, { forceMount: void 0 }),
        eY = (e) => {
          let {
              __scopeDialog: t,
              forceMount: n,
              children: r,
              container: o,
            } = e,
            i = e_(eV, t);
          return (0, s.jsx)(eK, {
            scope: t,
            forceMount: n,
            children: a.Children.map(r, (e) =>
              (0, s.jsx)(k, {
                present: n || i.open,
                children: (0, s.jsx)(I, {
                  asChild: !0,
                  container: o,
                  children: e,
                }),
              }),
            ),
          });
        };
      eY.displayName = eV;
      var eZ = "DialogOverlay",
        ez = a.forwardRef((e, t) => {
          let n = eX(eZ, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...o } = e,
            i = e_(eZ, e.__scopeDialog);
          return i.modal
            ? (0, s.jsx)(k, {
                present: r || i.open,
                children: (0, s.jsx)(eH, { ...o, ref: t }),
              })
            : null;
        });
      ez.displayName = eZ;
      var eq = (function (e) {
          let t = (function (e) {
              let t = a.forwardRef((e, t) => {
                let { children: n, ...r } = e;
                if (a.isValidElement(n)) {
                  let e, o;
                  let i =
                      (e = Object.getOwnPropertyDescriptor(
                        n.props,
                        "ref",
                      )?.get) &&
                      "isReactWarning" in e &&
                      e.isReactWarning
                        ? n.ref
                        : (e = Object.getOwnPropertyDescriptor(
                              n,
                              "ref",
                            )?.get) &&
                            "isReactWarning" in e &&
                            e.isReactWarning
                          ? n.props.ref
                          : n.props.ref || n.ref,
                    u = (function (e, t) {
                      let n = { ...t };
                      for (let r in t) {
                        let o = e[r],
                          i = t[r];
                        /^on[A-Z]/.test(r)
                          ? o && i
                            ? (n[r] = (...e) => {
                                let t = i(...e);
                                return (o(...e), t);
                              })
                            : o && (n[r] = o)
                          : "style" === r
                            ? (n[r] = { ...o, ...i })
                            : "className" === r &&
                              (n[r] = [o, i].filter(Boolean).join(" "));
                      }
                      return { ...e, ...n };
                    })(r, n.props);
                  return (
                    n.type !== a.Fragment && (u.ref = t ? (0, c.t)(t, i) : i),
                    a.cloneElement(n, u)
                  );
                }
                return a.Children.count(n) > 1 ? a.Children.only(null) : null;
              });
              return ((t.displayName = `${e}.SlotClone`), t);
            })(e),
            n = a.forwardRef((e, n) => {
              let { children: r, ...o } = e,
                i = a.Children.toArray(r),
                u = i.find(ej);
              if (u) {
                let e = u.props.children,
                  r = i.map((t) =>
                    t !== u
                      ? t
                      : a.Children.count(e) > 1
                        ? a.Children.only(null)
                        : a.isValidElement(e)
                          ? e.props.children
                          : null,
                  );
                return (0, s.jsx)(t, {
                  ...o,
                  ref: n,
                  children: a.isValidElement(e)
                    ? a.cloneElement(e, void 0, r)
                    : null,
                });
              }
              return (0, s.jsx)(t, { ...o, ref: n, children: r });
            });
          return ((n.displayName = `${e}.Slot`), n);
        })("DialogOverlay.RemoveScroll"),
        eH = a.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = e_(eZ, n);
          return (0, s.jsx)(ex, {
            as: eq,
            allowPinchZoom: !0,
            shards: [o.contentRef],
            children: (0, s.jsx)(E.div, {
              "data-state": e5(o.open),
              ...r,
              ref: t,
              style: { pointerEvents: "auto", ...r.style },
            }),
          });
        }),
        eG = "DialogContent",
        eJ = a.forwardRef((e, t) => {
          let n = eX(eG, e.__scopeDialog),
            { forceMount: r = n.forceMount, ...o } = e,
            i = e_(eG, e.__scopeDialog);
          return (0, s.jsx)(k, {
            present: r || i.open,
            children: i.modal
              ? (0, s.jsx)(eQ, { ...o, ref: t })
              : (0, s.jsx)(e0, { ...o, ref: t }),
          });
        });
      eJ.displayName = eG;
      var eQ = a.forwardRef((e, t) => {
          let n = e_(eG, e.__scopeDialog),
            r = a.useRef(null),
            o = (0, c.s)(t, n.contentRef, r);
          return (
            a.useEffect(() => {
              let e = r.current;
              if (e) return eM(e);
            }, []),
            (0, s.jsx)(e1, {
              ...e,
              ref: o,
              trapFocus: n.open,
              disableOutsidePointerEvents: !0,
              onCloseAutoFocus: l(e.onCloseAutoFocus, (e) => {
                (e.preventDefault(), n.triggerRef.current?.focus());
              }),
              onPointerDownOutside: l(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  n = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || n) && e.preventDefault();
              }),
              onFocusOutside: l(e.onFocusOutside, (e) => e.preventDefault()),
            })
          );
        }),
        e0 = a.forwardRef((e, t) => {
          let n = e_(eG, e.__scopeDialog),
            r = a.useRef(!1),
            o = a.useRef(!1);
          return (0, s.jsx)(e1, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              (e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (r.current || n.triggerRef.current?.focus(),
                  t.preventDefault()),
                (r.current = !1),
                (o.current = !1));
            },
            onInteractOutside: (t) => {
              (e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((r.current = !0),
                  "pointerdown" !== t.detail.originalEvent.type ||
                    (o.current = !0)));
              let i = t.target;
              (n.triggerRef.current?.contains(i) && t.preventDefault(),
                "focusin" === t.detail.originalEvent.type &&
                  o.current &&
                  t.preventDefault());
            },
          });
        }),
        e1 = a.forwardRef((e, t) => {
          let {
              __scopeDialog: n,
              trapFocus: r,
              onOpenAutoFocus: o,
              onCloseAutoFocus: i,
              ...u
            } = e,
            l = e_(eG, n),
            d = a.useRef(null),
            f = (0, c.s)(t, d);
          return (
            a.useEffect(() => {
              let e = document.querySelectorAll("[data-radix-focus-guard]");
              return (
                document.body.insertAdjacentElement("afterbegin", e[0] ?? _()),
                document.body.insertAdjacentElement("beforeend", e[1] ?? _()),
                W++,
                () => {
                  (1 === W &&
                    document
                      .querySelectorAll("[data-radix-focus-guard]")
                      .forEach((e) => e.remove()),
                    W--);
                }
              );
            }, []),
            (0, s.jsxs)(s.Fragment, {
              children: [
                (0, s.jsx)(P, {
                  asChild: !0,
                  loop: !0,
                  trapped: r,
                  onMountAutoFocus: o,
                  onUnmountAutoFocus: i,
                  children: (0, s.jsx)(N, {
                    role: "dialog",
                    id: l.contentId,
                    "aria-describedby": l.descriptionId,
                    "aria-labelledby": l.titleId,
                    "data-state": e5(l.open),
                    ...u,
                    ref: f,
                    onDismiss: () => l.onOpenChange(!1),
                  }),
                }),
                (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsx)(tn, { titleId: l.titleId }),
                    (0, s.jsx)(tr, {
                      contentRef: d,
                      descriptionId: l.descriptionId,
                    }),
                  ],
                }),
              ],
            })
          );
        }),
        e2 = "DialogTitle",
        e9 = a.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = e_(e2, n);
          return (0, s.jsx)(E.h2, { id: o.titleId, ...r, ref: t });
        });
      e9.displayName = e2;
      var e6 = "DialogDescription",
        e4 = a.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = e_(e6, n);
          return (0, s.jsx)(E.p, { id: o.descriptionId, ...r, ref: t });
        });
      e4.displayName = e6;
      var e8 = "DialogClose",
        e7 = a.forwardRef((e, t) => {
          let { __scopeDialog: n, ...r } = e,
            o = e_(e8, n);
          return (0, s.jsx)(E.button, {
            type: "button",
            ...r,
            ref: t,
            onClick: l(e.onClick, () => o.onOpenChange(!1)),
          });
        });
      function e5(e) {
        return e ? "open" : "closed";
      }
      e7.displayName = e8;
      var e3 = "DialogTitleWarning",
        [te, tt] = (function (e, t) {
          let n = a.createContext(t),
            r = (e) => {
              let { children: t, ...r } = e,
                o = a.useMemo(() => r, Object.values(r));
              return (0, s.jsx)(n.Provider, { value: o, children: t });
            };
          return (
            (r.displayName = e + "Provider"),
            [
              r,
              function (r) {
                let o = a.useContext(n);
                if (o) return o;
                if (void 0 !== t) return t;
                throw Error(`\`${r}\` must be used within \`${e}\``);
              },
            ]
          );
        })(e3, { contentName: eG, titleName: e2, docsSlug: "dialog" }),
        tn = ({ titleId: e }) => {
          let t = tt(e3),
            n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
          return (
            a.useEffect(() => {
              e && !document.getElementById(e) && console.error(n);
            }, [n, e]),
            null
          );
        },
        tr = ({ contentRef: e, descriptionId: t }) => {
          let n = tt("DialogDescriptionWarning"),
            r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${n.contentName}}.`;
          return (
            a.useEffect(() => {
              let n = e.current?.getAttribute("aria-describedby");
              t && n && !document.getElementById(t) && console.warn(r);
            }, [r, e, t]),
            null
          );
        },
        to = e$,
        ti = eU,
        ta = eY,
        tu = ez,
        tl = eJ,
        tc = e9,
        ts = e4,
        td = e7;
    },
    447: (e, t, n) => {
      n.d(t, { c: () => o });
      var r = n(8009);
      function o(e) {
        let t = r.useRef(e);
        return (
          r.useEffect(() => {
            t.current = e;
          }),
          r.useMemo(
            () =>
              (...e) =>
                t.current?.(...e),
            [],
          )
        );
      }
    },
    9397: (e, t, n) => {
      n.d(t, { N: () => o });
      var r = n(8009),
        o = globalThis?.document ? r.useLayoutEffect : () => {};
    },
  }));
