!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).lazyframe = e();
}(this, function() {
    "use strict";
    function t1() {
        return (t1 = Object.assign || function(t) {
            for(var e = 1; e < arguments.length; e++){
                var n = arguments[e];
                for(var i in n)Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            }
            return t;
        }).apply(this, arguments);
    }
    return function() {
        var e1, n1 = [], i1 = {
            vendor: void 0,
            id: void 0,
            src: void 0,
            thumbnail: void 0,
            title: void 0,
            initialized: !1,
            y: void 0,
            debounce: 250,
            lazyload: !0,
            autoplay: !0,
            initinview: !1,
            onLoad: function(t) {},
            onAppend: function(t) {},
            onThumbnailLoad: function(t) {}
        }, o1 = {
            regex: {
                youtube_nocookie: /(?:youtube-nocookie\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=)))([a-zA-Z0-9_-]{6,11})/,
                youtube: /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/,
                vimeo: /vimeo\.com\/(?:video\/)?([0-9]*)(?:\?|)/
            },
            condition: {
                youtube: function(t) {
                    return !(!t || 11 != t[1].length) && t[1];
                },
                youtube_nocookie: function(t) {
                    return !(!t || 11 != t[1].length) && t[1];
                },
                vimeo: function(t) {
                    return !!(t && 9 === t[1].length || 8 === t[1].length) && t[1];
                }
            },
            src: {
                youtube: function(t) {
                    return "https://www.youtube.com/embed/".concat(t.id, "/?autoplay=").concat(t.autoplay ? "1" : "0", "&").concat(t.query);
                },
                youtube_nocookie: function(t) {
                    return "https://www.youtube-nocookie.com/embed/".concat(t.id, "/?autoplay=").concat(t.autoplay ? "1" : "0", "&").concat(t.query);
                },
                vimeo: function(t) {
                    return "https://player.vimeo.com/video/".concat(t.id, "/?autoplay=").concat(t.autoplay ? "1" : "0", "&").concat(t.query);
                }
            },
            endpoint: function(t) {
                return "https://noembed.com/embed?url=".concat(t.src);
            },
            response: {
                title: function(t) {
                    return t.title;
                },
                thumbnail: function(t) {
                    return t.thumbnail_url;
                }
            }
        };
        function a1(t) {
            var n = this;
            if (t instanceof HTMLElement != !1 && !t.classList.contains("lazyframe--loaded")) {
                var i = {
                    el: t,
                    settings: r1(t)
                };
                i.el.addEventListener("click", function() {
                    i.el.appendChild(i.iframe);
                    var e = t.querySelectorAll("iframe");
                    i.settings.onAppend.call(n, e[0]);
                }), e1.lazyload ? c1(i) : l1(i, i.settings.thumbnail);
            }
        }
        function r1(n) {
            var i, a, r = Array.prototype.slice.apply(n.attributes).filter(function(t) {
                return "" !== t.value;
            }).reduce(function(t, e) {
                return t[0 === e.name.indexOf("data-") ? e.name.split("data-")[1] : e.name] = e.value, t;
            }, {}), l = t1({}, e1, r, {
                y: n.offsetTop,
                originalSrc: r.src,
                query: (i = r.src, a = i.split("?"), a[1] ? a[1] : null)
            });
            if (l.vendor) {
                var u = l.src.match(o1.regex[l.vendor]);
                l.id = o1.condition[l.vendor](u);
            }
            return l;
        }
        function l1(t2) {
            var e2 = this;
            !function(t) {
                return !(!t.vendor || t.title && t.thumbnail);
            }(t2.settings) ? c1(t2, !0) : function(t, e) {
                var n2 = o1.endpoint(t.settings), i = new XMLHttpRequest;
                i.open("GET", n2, !0), i.onload = function() {
                    if (i.status >= 200 && i.status < 400) {
                        var n = JSON.parse(i.responseText);
                        e(null, [
                            n,
                            t
                        ]);
                    } else e(!0);
                }, i.onerror = function() {
                    e(!0);
                }, i.send();
            }(t2, function(n, i) {
                if (!n) {
                    var a = i[0], r = i[1];
                    if (r.settings.title || (r.settings.title = o1.response.title(a)), !r.settings.thumbnail) {
                        var l = o1.response.thumbnail(a);
                        r.settings.thumbnail = l, t2.settings.onThumbnailLoad.call(e2, l);
                    }
                    c1(r, !0);
                }
            });
        }
        function u1() {
            var t3 = this, i2 = window.innerHeight, o = n1.length, a = function(e, n) {
                e.settings.initialized = !0, e.el.classList.add("lazyframe--loaded"), o--, l1(e), e.settings.initinview && e.el.click(), e.settings.onLoad.call(t3, e);
            };
            n1.filter(function(t) {
                return t.settings.y < i2;
            }).forEach(a);
            var r, u, c, s, d = (r = function() {
                m = f < window.pageYOffset, f = window.pageYOffset, m && n1.filter(function(t) {
                    return t.settings.y < i2 + f && !1 === t.settings.initialized;
                }).forEach(a), 0 === o && window.removeEventListener("scroll", d, !1);
            }, u = e1.debounce, function() {
                var t = this, e = arguments, n = function() {
                    s = null, c || r.apply(t, e);
                }, i = c && !s;
                clearTimeout(s), s = setTimeout(n, u), i && r.apply(t, e);
            }), f = 0, m = !1;
            window.addEventListener("scroll", d, !1);
        }
        function c1(t4, i) {
            if (t4.iframe = function(t) {
                var e = document.createDocumentFragment(), n = document.createElement("iframe");
                t.vendor && (t.src = o1.src[t.vendor](t));
                n.setAttribute("id", "lazyframe-".concat(t.id)), n.setAttribute("src", t.src), n.setAttribute("frameborder", 0), n.setAttribute("allowfullscreen", ""), t.autoplay && (n.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
                return e.appendChild(n), e;
            }(t4.settings), t4.settings.thumbnail && i && (t4.el.style.backgroundImage = "url(".concat(t4.settings.thumbnail, ")")), t4.settings.title && 0 === t4.el.children.length) {
                var a = document.createDocumentFragment(), r = document.createElement("span");
                r.className = "lazyframe__title", r.innerHTML = t4.settings.title, a.appendChild(r), t4.el.appendChild(a);
            }
            e1.lazyload || (t4.el.classList.add("lazyframe--loaded"), t4.settings.onLoad.call(this, t4), n1.push(t4)), t4.settings.initialized || n1.push(t4);
        }
        return function(n) {
            if (e1 = t1({}, i1, arguments.length <= 1 ? void 0 : arguments[1]), "string" == typeof n) for(var o = document.querySelectorAll(n), r = 0; r < o.length; r++)a1(o[r]);
            else if (void 0 === n.length) a1(n);
            else for(var l = 0; l < n.length; l++)a1(n[l]);
            e1.lazyload && u1();
        };
    }();
});

//# sourceMappingURL=presentacion.22c73027.js.map
