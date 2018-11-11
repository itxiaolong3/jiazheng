function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function r(e) {
    return /^([a-z][a-z\d+-.]*:)?\/\//i.test(e);
}

function o(e, t) {
    return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}

function u(e) {
    return new Promise(function(t, n) {
        wx.request(Object.assign({}, e, {
            success: function(n) {
                n.config = e, t(n);
            },
            fail: function(t) {
                n(new f(500, t.errMsg, e, t));
            },
            complete: void 0
        }));
    });
}

function s(e) {
    return new Promise(function(t, n) {
        wx.uploadFile(Object.assign({}, e, {
            success: function(n) {
                n.config = e, t(n);
            },
            fail: function(t) {
                n(new f(500, t.errMsg, e, t));
            },
            complete: void 0
        })).onProgressUpdate(e.onProgressUpdate);
    });
}

function i(e) {
    (e = Object.assign({}, i.defaults, e)).baseURL && !r(e.url) && (e.url = o(e.baseURL, e.url));
    var t = null;
    t = e.filePath || e.isUpload ? s : u;
    var n = [].concat(a.request, [ {
        fulfilled: t,
        rejected: null
    } ], a.response), c = Promise.resolve(e);
    return n.forEach(function(e) {
        return c = c.then(e.fulfilled, e.rejected);
    }), l.default.promiseSupportCallbacks(c, e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.HttpException = void 0;

var c = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}();

exports.default = i;

var l = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./util")), f = exports.HttpException = function(r) {
    function o(n, r, u, s) {
        e(this, o);
        var i = t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
        return i.name = "HttpException", i.code = n, i.message = r, i.config = u, i.result = s, 
        i;
    }
    return n(o, Error), c(o, [ {
        key: "toString",
        value: function() {
            return this.message;
        }
    } ]), o;
}();

[ "get", "post", "put", "delete" ].forEach(function(e) {
    i[e] = function(t, n, r, o) {
        return i(Object.assign(o || {}, {
            url: t,
            method: e,
            data: n,
            success: r
        }));
    };
}), i.all = function(e) {
    return Promise.all(e);
}, i.defaults = {};

var a = {
    request: [],
    response: []
};

i.addRequestInterceptor = function(e, t) {
    return a.request.push({
        fulfilled: e,
        rejected: t
    }) - 1;
}, i.removeRequestInterceptor = function(e) {
    a.request.splice(e, 0);
}, i.addResponseInterceptor = function(e, t) {
    return a.response.push({
        fulfilled: e,
        rejected: t
    }) - 1;
}, i.removeResponseInterceptor = function(e) {
    a.response.splice(e, 0);
};