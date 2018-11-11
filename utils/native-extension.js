var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

Promise.prototype.finally || (Promise.prototype.finally = function(t) {
    var e = this.constructor;
    return this.then(function(o) {
        return e.resolve(t(o)).then(function() {
            return o;
        });
    }, function(o) {
        return e.resolve(t(o)).then(function() {
            throw o;
        });
    });
}), Array.prototype.shuffle || (Array.prototype.shuffle = function() {
    return this.slice().sort(function() {
        return .5 - Math.random();
    });
}), Object.isObject || (Object.isObject = function(e) {
    var o = void 0 === e ? "undefined" : t(e);
    return null !== e && ("object" === o || "function" === o);
}), Object.toObject || (Object.toObject = function(t) {
    if (null === t || void 0 === t) throw new TypeError("Cannot convert undefined or null to object");
    return Object(t);
}), Object.deepAssign || function() {
    function t(t, n, r) {
        var c = n[r];
        if (void 0 !== c && null !== c) {
            if (o.call(t, r) && (void 0 === t[r] || null === t[r])) throw new TypeError("Cannot convert undefined or null to object (" + r + ")");
            o.call(t, r) && Object.isObject(c) ? t[r] = e(Object(t[r]), n[r]) : t[r] = c;
        }
    }
    function e(e, r) {
        if (e === r) return e;
        r = Object(r);
        for (var c in r) o.call(r, c) && t(e, r, c);
        if (Object.getOwnPropertySymbols) for (var i = Object.getOwnPropertySymbols(r), u = 0; u < i.length; u++) n.call(r, i[u]) && t(e, r, i[u]);
        return e;
    }
    var o = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
    Object.deepAssign = function(t) {
        t = Object.toObject(t);
        for (var o = 1; o < arguments.length; o++) e(t, arguments[o]);
        return t;
    };
}();