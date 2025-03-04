OpenInstall = function (e, n, t) {
    function parseUrlParams(n) {
        n = n || e.location.href;
        for (var t = n.indexOf("?"), r = -1 == t ? "" : n.substring(t + 1).replace(/\+/g, "%20"), i = r.split("&"), o = {}, a = 0; a < i.length; a++) {
            var c = i[a].split("="),
                u = decodeURIComponent(c[0] || ""),
                l = decodeURIComponent(c[1] || "");
            u && l && (void 0 === o[u] ? o[u] = l : "object" == typeof o[u] ? o[u].push(l) : o[u] = [o[u], l])
        }
        return o
    }
    function i(e) {
        var n = [];
        for (var t in e) {
            var r = e[t];
            if ("[object Array]" == Object.prototype.toString.call(r)) 
                for (var i = 0; i < r.length; i++) 
                    null != r[i] && void 0 !== r[i] && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(r[i]));
            else 
                null != r && void 0 !== r && n.push(encodeURIComponent(t) + "=" + encodeURIComponent(r))
        }
        return n.join("&")
    }
    function Url() {
        var e = 0,
            argCnt = arguments.length,
            t = arguments[e],
            hasParm = t.indexOf("?"),
            a = parseUrlParams(t);
        for (e = 1; e < argCnt; e++) {
                var c = arguments[e];
                for (var u in c) 
                    a[u] = c[u]
            }
        return (-1 == hasParm ? t : t.substring(0, hasParm)) + "?" + i(a)
    }
    function a() {
        this.arr = [],
        this.run = function (e) {
            this.arr ? this.arr[this.arr.length] = e : e()
        },
        this.isReady = function () {
            return null == this.arr
        },
        this.ready = function () {
            if (null != this.arr) for (var e = 0; e < this.arr.length; e++) this.arr[e]();
            this.arr = null
        }
    }
    function c(e) {
        var n = new t,
            r = e.data,
            i = e.url,
            o = e.method;
        r && "string" != typeof r && (r = A.stringify(r)),
        "POST" != o && r && (i = i + (i.indexOf("?") > -1 ? "&" : "?") + r, r = null),
        n.onreadystatechange = function () {
                if (4 == n.readyState) {
                    if (200 == n.status) {
                        var t = n.response || n.responseText || {};
                        e.success && e.success("string" == typeof t ? A.parse(t) : t)
                    } else e.error && e.error(n, n.statusText);
                    e.complete && e.complete(n)
                }
            },
        n.ontimeout = function () {
                e.error && e.error(n, n.statusText)
            };
        try {
                n.open(o, i, !1 !== e.async),
                n.withCredentials = !0;
                try {
                    n.setRequestHeader && e.contentType && n.setRequestHeader("Content-Type", e.contentType),
                    e.timeout && (n.timeout = e.timeout)
                } catch (e) {}
                n.send(r || null)
            } catch (e) {}
        return n
    }
    function u() {
        var e = n.createElement("canvas");
        if (e && "function" == typeof e.getContext) for (var t = ["webgl", "webgl2", "experimental-webgl2", "experimental-webgl"], r = 0; r < t.length; r++) {
            var i = t[r],
                o = e.getContext(i);
            if (o) {
                    var a = {};
                    a.context = i,
                    a.version = o.getParameter(o.VERSION),
                    a.vendor = o.getParameter(o.VENDOR),
                    a.sl_version = o.getParameter(o.SHADING_LANGUAGE_VERSION),
                    a.max_texture_size = o.getParameter(o.MAX_TEXTURE_SIZE);
                    var c = o.getExtension("WEBGL_debug_renderer_info");
                    return c && (a.vendor = o.getParameter(c.UNMASKED_VENDOR_WEBGL), a.renderer = o.getParameter(c.UNMASKED_RENDERER_WEBGL)),
                    a
                }
        }
        return {}
    }
    function l(n) {
        R(function (t) {
            var r, i, o, a;
            try {
                r = e.screen.width || "",
                i = e.screen.height || "",
                o = e.devicePixelRatio || "",
                a = u()
            } catch (e) {}
            for (var c = 0, t = t || [], l = t.length; c < l; c++) t[c] = C(t[c] || "");
            n({
                sw: C("" + (r || 0)),
                sh: C("" + (i || 0)),
                sp: o,
                gv: C(a.version || ""),
                gr: C(a.renderer || ""),
                li: t
            })
        })
    }
    function s(t, r, i) {
        var o = "ex",
            a = "ecC",
            c = "ommand",
            u = "co",
            l = "py",
            s = o + a + c,
            d = u + l;
        if ("function" != typeof n[s]) return !1;
        var f = n.createElement("div");
        f.innerHTML = t;
        for (var p = [], h = 0; h < f.children.length; h++) p[h] = f.children[h];
        for (var v, g, m = !1, b = r ? r + ((new Date).getTime() + (i || 1)) + "-" : null, h = 0; h < p.length; h++) {
                try {
                    if (v = p[h], y && (v.style.position = "absolute", v.style.top = "-100px"), n.body.appendChild(v), "SELECT" === v.nodeName) v.focus();
                    else if ("INPUT" === v.nodeName || "TEXTAREA" === v.nodeName) {
                        b && (v.value = x(O(v.value) + b));
                        var C = v.hasAttribute("readonly");
                        C || v.setAttribute("readonly", ""),
                        v.select(),
                        v.setSelectionRange(0, v.value.length),
                        C || v.removeAttribute("readonly")
                    } else {
                        v.hasAttribute("contenteditable") && v.focus(),
                        b && v.setAttribute("class", b),
                        g = e.getSelection();
                        var E = n.createRange();
                        E.selectNode(v),
                        g.removeAllRanges(),
                        g.addRange(E)
                    }
                    m = n[s](d)
                } catch (e) {
                    m = !1
                }
                n.body.removeChild(v)
            }
        return g && g.removeAllRanges(),
        m
    }
    function d(e, t) {
        var r, i, o = !1;
        o ? (r = "hidden", i = "qbrowserVisibilityChange") : void 0 !== n.hidden ? (r = "hidden", i = "visibilitychange") : void 0 !== n.msHidden ? (r = "msHidden", i = "msvisibilitychange") : void 0 !== n.webkitHidden && (r = "webkitHidden", i = "webkitvisibilitychange");
        var a = function (e) {
            return o && e && void 0 !== e.hidden ? e.hidden : n[r]
        },
            c = setTimeout(function () {
                null == c || a() || (e(), c = null)
            }, t),
            u = function (e) {
                null != c && a(e) && (clearTimeout(c), c = null, n.removeEventListener(i, u))
            };
        i && n.addEventListener(i, u, !1)
    }
    function f(e, n, t, r) {
        "function" == typeof t && d(t, r),
        S[e](n)
    }
    var p = 2,
        userAgent = navigator.userAgent,
        isIphone = userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPod") > -1,
        isAndroid = userAgent.indexOf("Android") > -1,
        docReady = function () {
            "use strict";

            function t() {
                if (!o) {
                    o = !0;
                    for (var n = 0; n < i.length; n++) i[n].fn.call(e, i[n].ctx);
                    i = []
                }
            }
            function r() {
                "complete" === n.readyState && t()
            }
            var i = [],
                o = !1,
                a = !1;
            return setTimeout(t, 3e3),


            function (c, u) {
                    if (o) return void c(u);
                    i.push({
                        fn: c,
                        ctx: u
                    }),
                    "complete" === n.readyState || "loading" !== n.readyState && !n.documentElement.doScroll ? t() : a || (n.addEventListener ? (n.addEventListener("DOMContentLoaded", t, !1), e.addEventListener("load", t, !1)) : (n.attachEvent("onreadystatechange", r), e.attachEvent("onload", t)), a = !0)
                }
        }(),
        m = function () {},
        b = function () {
            function e(e, n) {
                var t, r, o, a, c = -1,
                    u = e.length,
                    l = [0, 0, 0, 0];
                for (t = []; ++c < u;) r = e[c],
                o = e[++c],
                l[0] = r >> 2,
                l[1] = (3 & r) << 4 | (o || 0) >> 4,
                c >= u ? l[2] = l[3] = 64 : (a = e[++c], l[2] = (15 & o) << 2 | (a || 0) >> 6, l[3] = c >= u ? 64 : 63 & a),
                t.push(i.charAt(l[0]), i.charAt(l[1]), i.charAt(l[2]), i.charAt(l[3]));
                var s = t.join("");
                return n ? s.replace(/=/g, "") : s
            }
            function n(e) {
                for (var n, t, r, o, a, c, u, l = [], s = 0; s < e.length;) o = i.indexOf(e.charAt(s++)),
                a = i.indexOf(e.charAt(s++)),
                c = i.indexOf(e.charAt(s++)),
                u = i.indexOf(e.charAt(s++)),
                n = o << 2 | a >> 4,
                t = (15 & a) << 4 | c >> 2,
                r = (3 & c) << 6 | u,
                l.push(n),
                64 != c && l.push(t),
                64 != u && l.push(r);
                return l
            }
            function t(e) {
                var n, t = -1,
                    r = e.length,
                    i = [];
                if (/^[\x00-\x7f]*$/.test(e)) for (; ++t < r;) i.push(e.charCodeAt(t));
                else for (; ++t < r;) n = e.charCodeAt(t),
                n < 128 ? i.push(n) : n < 2048 ? i.push(n >> 6 | 192, 63 & n | 128) : i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
                return i
            }
            function r(e) {
                var n, t, r, i = [],
                    o = 0;
                for (n = t = r = 0; o < e.length;) n = e[o],
                n < 128 ? (i.push(String.fromCharCode(n)), o++) : n > 191 && n < 224 ? (t = e[o + 1], i.push(String.fromCharCode((31 & n) << 6 | 63 & t)), o += 2) : (t = e[o + 1], r = e[o + 2], i.push(String.fromCharCode((15 & n) << 12 | (63 & t) << 6 | 63 & r)), o += 3);
                return i.join("")
            }
            var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
            return [function (n) {
                if (!n) return "";
                for (var r = t(n), i = r.length, o = 0; o < i; o++) r[o] = 150 ^ r[o];
                return e(r, !0)
            }, function (e) {
                if (!e) return "";
                for (var t = n(e), i = 0, o = t.length; i < o; i++) t[i] = 150 ^ t[i];
                return r(t)
            }, function (n) {
                return n ? e(t(n)) : ""
            }, function (e) {
                return e ? r(n(e)) : ""
            }]
        }(),
        C = b[0],
        E = b[1],
        x = b[2],
        O = b[3],
        R = function () {
            function n() {
                d.isReady() || (d.ready(), clearInterval(f), c && c.close())
            }
            function t(e) {
                n()
            }
            function r(e) {
                for (var n = e.split("."), t = 0, r = 0; r < n.length; r++) t = t << 8 | 255 & parseInt(n[r]);
                return t
            }
            function i(e) {
                for (var t, i, o, a, c = e.split("\r\n"), u = 0; u < c.length; u++) {
                    if (t = c[u], i = t.split(" "), 0 == t.indexOf("a=candidate:") && (o = i[7]) && "host" == o && (a = i[4]));
                    else if (0 == t.indexOf("a=rtcp:") && (o = i[2]) && "IP4" == o && (a = i[3]));
                    else if (0 != t.indexOf("c=") || !(o = i[1]) || "IP4" != o || !(a = i[2])) continue;
                    a && !l[a] && /[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(a) && ("0.0.0.0" == a || 0 == a.indexOf("127.") || 0 == a.indexOf("169.254") || 3758096384 == (4026531840 & r(a)) || (l[a] = 1, s.push(a)))
                }
                s.length && n()
            }
            var o, c, u, l = {},
                s = [],
                d = new a,
                f = setInterval(function () {
                    c && c.localDescription && c.localDescription.sdp && u != c.localDescription.sdp && (u = c.localDescription.sdp, i(u))
                }, 10);
            try {
                    (o = e.RTCPeerConnection || e.mozRTCPeerConnection || e.webkitRTCPeerConnection) ? (c = new o({
                        iceServers: []
                    }, {
                        optional: [{
                            RtpDataChannels: !0
                        }]
                    }), c.onicecandidate = function (e) {
                        e.candidate && e.candidate.candidate && i("a=" + e.candidate.candidate)
                    }, c.createDataChannel("openinstall"), c.createOffer(function (e) {
                        try {
                            c.setLocalDescription(e, function () {}, t)
                        } catch (e) {
                            t(e)
                        }
                    }, t), setTimeout(n, 100)) : t("not exists")
                } catch (e) {
                    t(e)
                }
            return function (e) {
                    d.run(function () {
                        e(s.slice(0))
                    })
                }
        }(),
        A = e.JSON || {
            parse: function (e) {
                return eval("(" + e + ")")
            },
            stringify: function () {
                var e = Object.prototype.toString,
                    n = Array.isArray ||
                function (n) {
                        return "[object Array]" === e.call(n)
                    },
                    t = {
                        '"': '\\"',
                        "\\": "\\\\",
                        "\b": "\\b",
                        "\f": "\\f",
                        "\n": "\\n",
                        "\r": "\\r",
                        "\t": "\\t"
                    },
                    r = function (e) {
                        return t[e] || "\\u" + (e.charCodeAt(0) + 65536).toString(16).substr(1)
                    },
                    i = /[\\"\u0000-\u001F\u2028\u2029]/g;
                return function t(o) {
                        if (null == o) return "null";
                        if ("number" == typeof o) return isFinite(o) ? o.toString() : "null";
                        if ("boolean" == typeof o) return o.toString();
                        if ("object" == typeof o) {
                            if ("function" == typeof o.toJSON) return t(o.toJSON());
                            if (n(o)) {
                                for (var a = "[", c = 0; c < o.length; c++) a += (c ? ", " : "") + t(o[c]);
                                return a + "]"
                            }
                            if ("[object Object]" === e.call(o)) {
                                var u = [];
                                for (var l in o) o.hasOwnProperty(l) && u.push(t(l) + ": " + t(o[l]));
                                return "{" + u.sort().join(", ") + "}"
                            }
                        }
                        return '"' + o.toString().replace(i, r) + '"'
                    }
            }()
        },
        S = {
            frm: function (e) {
                var t = n.createElement("iframe");
                t.style.display = "none",
                t.style.visibility = "hidden",
                t.src = e,
                n.body.appendChild(t)
            },
            loc: function (n) {
                e.location = n
            },
            hrf: function (e) {
                var t = n.createElement("a");
                t.style.display = "none",
                t.href = e,
                n.body.appendChild(t),
                t.click()
            },
            inhrf: function (e) {
                var t = n.createElement("script");
                t.setAttribute("type", "text/javascript"),
                t.innerHTML = '(function(){var a = document.createElement("a");a.style.display = "none";a.href = "' + e.replace(/"/g, '\\"') + '";document.body.appendChild(a);a.click();})()',
                n.body.appendChild(t)
            },
            open: function (n) {
                e.open(n)
            }
        },
        I = function (e, t) {
            function r() {
                if (y) {
                    v && d(function () {
                        n.body.appendChild(v)
                    }, 400);
                    var e = y;
                    S[b](e)
                } else v && n.body.appendChild(v)
            }
            function i(e, n, t) {
                p.run(function () {
                    t = t || {},
                    n && k && (e = !1),
                    A && n && (m(), P = s(A, T, w));
                    var i;
                    n && (i = r, N && c({
                        method: "POST",
                        url: N
                    })),
                    x && e ? f(O, x, i, t.timeout || R) : i && i()
                })
            }
            function u(t) {
                var r = e.mask || t;
                if ("function" == typeof r && (r = r() || t), "string" == typeof r) {
                    var i = n.createElement("div");
                    i.innerHTML = r,
                    r = i.children[0]
                }
                var o = function () {
                    n.body.removeChild(r)
                };
                return r.addEventListener ? r.addEventListener("click", o) : r.onclick = o,
                r
            }
            if (e = e || {}, !e.appKey) return void alert("appKey not specified");
            var p = new a,
                h = this;
            "function" == typeof e.onready && p.run(function () {
                    e.onready.call(h)
                }),
            e.buttonId && p.run(function () {
                    for (var t = e.buttonId.split(" "), r = 0; r < t.length; r++) {
                        var i = n.getElementById(t[r]);
                        i && i.addEventListener("click", function () {
                            h.wakeupOrInstall()
                        })
                    }
                });
            var v, y, b, C, x, O, R, A, T, w, P, k, L, N;
            this.wakeupOrInstall = function (e) {
                    i(!0, !0, e)
                },
            this.schemeWakeup = function (e) {
                    i(!0, !1, e)
                },
            this.install = function (e) {
                    i(!1, !0, e)
                },


            function () {
                    var n = {
                        channelCode: e.channelCode || I.parseUrlParams().channelCode,
                        c: e._channelRedirect ? 1 : null,
                        apkFileName: e.apkFileName,
                        preferWakeup: e.preferWakeup,
                        _pkgId: e._pkgId
                    };
                    l(function (r) {
                        c({
                            url: Url(I.server + "/web/init/" + e.appKey, n, r),
                            method: "POST",
                            contentType: "text/plain;charset=utf-8",
                            data: t,
                            success: function (e) {
                                docReady(function () {
                                    e.sh && (v = u(e.sh)),
                                    y = e.fu,
                                    b = e.fm,
                                    C = e.ft,
                                    x = e.su,
                                    O = e.sm,
                                    R = e.st,
                                    A = e.ph ? E(e.ph) : null,
                                    T = e.pyp ? E(e.pyp) : null,
                                    w = e.pye ? parseInt(E(e.pye) || "0") : 0,
                                    k = e.dsoi,
                                    L = e.channelCode,
                                    N = e.csu,
                                    p.ready()
                                })
                            }
                        })
                    })
                }()
        };
    return I.channelRedirect = function (e, n) {
            new I({
                appKey: e,
                channelCode: n,
                _channelRedirect: !0
            }).wakeupOrInstall()
        },
    I.parseUrlParams = parseUrlParams,
    I.docReady = docReady,
    I.server = "//openinstall.io",
    I.wakeupOrInstall = function (e, n, t, r, i) {
            n ? f(e, n, function () {
                S[t](r)
            }, i) : S[t](r)
        },
    I
}(window, document, XMLHttpRequest);