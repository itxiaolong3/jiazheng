Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = {};

exports.default = {
    addEventListener: function(o, r) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!o || !isNaN(parseInt(o))) throw TypeError("监听器名称只能为英文字母以及下划线！");
        if (void 0 === t[o] && (t[o] = []), "object" !== (void 0 === r ? "undefined" : e(r)) && (r = {
            callback: r
        }), "function" != typeof r.callback) throw TypeError("监听器必须是一个function！");
        r.once = n, t[o].push(r);
    },
    removeEventListener: function(e, o) {
        if ("function" == typeof o) {
            var r = function(e, t) {
                var o = e.indexOf(t);
                -1 !== o && e.splice(o, 1);
            };
            e && isNaN(parseInt(e)) ? r(t[e] || [], o) : t.forEach(function(e) {
                return r(e, o);
            });
        }
    },
    fireEventListener: function(e, o) {
        if (!e || !isNaN(parseInt(e))) throw TypeError("监听器名称只能为英文字母以及下划线！");
        for (var r = t[e] || [], n = 0; n < r.length; n++) {
            var i = r[n];
            if (i.once && (r.splice(n, 1), n--), !1 === i.callback.call(i.thisArg, o)) break;
        }
    }
};