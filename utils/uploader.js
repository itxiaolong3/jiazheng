function t(t) {
    var e = this;
    return (t || []).forEach(function(t) {
        e.push({
            state: 0,
            path: t
        });
    }), this;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./request"));

(t.prototype = []).constructor = t, t.prototype.upload = function(t) {
    var o = this, n = function(t, e) {
        o.onUploadChange && o.onUploadChange.call(o, {
            file: t,
            index: e
        });
    }, r = function(t, o) {
        return (0, e.default)({
            url: "uploadImg",
            filePath: t.path,
            name: "file"
        }).then(function(e) {
            t.state = 1, t.url = e.data.picture_url, n(t, o);
        }, function() {
            t.state = 2, n(t, o);
        });
    };
    if (void 0 !== t) {
        var u = this[t];
        return r(u, t);
    }
    !function t(e) {
        r(o[e], e).finally(function() {
            e < o.length - 1 && t(e + 1);
        });
    }(0);
}, t.prototype.add = function(t) {
    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], o = this.push({
        state: 0,
        path: t
    }) - 1;
    return e && this.upload(o), o;
}, t.prototype.remove = function(t) {
    this.splice(t, 1);
}, t.prototype.getUploadedFiles = function() {
    var t = [];
    return this.forEach(function(e) {
        e.url && t.push(e.url);
    }), t;
}, t.prototype.toArray = function() {
    return Array.from(this);
}, t.prototype.onUploadChange = null, exports.default = t;