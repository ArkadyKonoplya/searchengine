function addEvent(e, t, n) { e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, function() { return n.call(e, window.event) }) }

function log(e) {
    function t(e) {
        var t = document.getElementById("log"),
            n = document.createElement("div");
        n.appendChild(document.createTextNode(e)), t.appendChild(n)
    }
    loaded ? t(e) : logs.push(e), eventSet || (eventSet = !0, addEvent(window, "load", function() {
        loaded = !0;
        for (var e = 0; e < logs.length; e++) t(logs[e]);
        logs = []
    }))
}
var logs = [],
    eventSet = !1,
    loaded = !1;
! function(e, t) {
    function n() {
        if (!a) {
            a = !0;
            for (var e = 0; e < o.length; e++) o[e].fn.call(window, o[e].ctx);
            o = []
        }
    }

    function d() { "complete" === document.readyState && n() }
    e = e || "docReady", t = t || window;
    var o = [],
        a = !1,
        c = !1;
    t[e] = function(e, t) { return a ? void setTimeout(function() { e(t) }, 1) : (o.push({ fn: e, ctx: t }), void("complete" === document.readyState ? setTimeout(n, 1) : c || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", n, !1)) : (document.attachEvent("onreadystatechange", d), window.attachEvent("onload", n)), c = !0))) }
}("docReady", window);

window.cookies = function() {
    var e, t, n;
    return n = function(e) { return new RegExp("(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*") }, t = function(e) { return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=") }, e = /^(?:expires|max\-age|path|domain|secure)$/, {
        get: function(e) { return e && this.has(e) ? unescape(document.cookie.replace(n(e), "$1")) : null },
        set: function(t, n, r, s, a, c) {
            var i;
            if (t && !e.test(t)) {
                if (i = "", r) switch (typeof r) {
                    case "number":
                        i = "; max-age=" + r;
                        break;
                    case "string":
                        i = "unlimited" === r ? "; expires=Fri, 10 Jul 2099 13:05:42 UTC" : "; expires=" + r;
                        break;
                    case "object":
                        r.hasOwnProperty("toGMTString") && (i = "; expires=" + r.toGMTString())
                }
                document.cookie = escape(t) + "=" + escape(n) + i + (a ? "; domain=" + a : "") + (s ? "; path=" + s : "") + (c ? "; secure" : "")
            }
        },
        remove: function(e) {
            var t;
            e && this.has(e) && (t = new Date, t.setDate(t.getDate() - 100), document.cookie = escape(e) + "=; expires=" + t.toGMTString() + "; path=/")
        },
        has: function(e) { return t(e).test(document.cookie) },
        object: function(e) { var t; if (e && this.has(e)) return t = this.get(e), new Function("return " + unescape(t.replace(/\+/g, " ")))() }
    }
}();

window.Marker = {
    default_marker: set_marker,
    get: function() {
        return cookies.get('marker');
    },
    set: function(value) {
        domain = window.location.hostname;
        expire = new Date(+(new Date) + 60 * 60 * 24 * 30 * 1e3);
        cookies.set('marker', value, expire.toGMTString(), '/', domain);
        return value;
    },
    handle_marker: function(value) {
        if (value && this._new_marker(value) && (this.is_affiliate(value) || !this.is_affiliate(this.get()))) {
            return this.set(value);
        }
        if (!this.get()) {
            return this.set(this.default_marker);
        }
        return this.get();
    },
    _new_marker: function(value) {
        return value !== this.get();
    },
    get_from_params: function() {
        var a, b, i, p;
        a = window.location.search.substr(1).split('&');
        if (a === "") {
            return {};
        }
        b = {};
        i = 0;
        while (i < a.length) {
            p = a[i].split("=", 2);
            if (p.length === 1) {
                b[p[0]] = "";
            } else {
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            ++i;
        }
        return b.marker;
    },
    get_marker: function() {
        if (this.get_from_params() != null) {
            this.set(this.get_from_params())
        }
        if (this.get() == null) {
            this.set(this.default_marker);
        }
        return this.get() || this.default_marker;
    }
};
if (set_cookies == true) {
    marker = Marker.get_marker();
} else {
    var get_marker = Marker.get_from_params();
    if (get_marker == undefined) {
        marker = set_marker;
    } else {
        marker = get_marker;
    }

}


window.TP_FORM_SETTINGS = window.TP_FORM_SETTINGS || {};
window.TP_FORM_SETTINGS[set_handle] = {
    "handle": set_handle,
    "widget_name": "Search form #3",
    "border_radius": "2",
    "additional_marker": null,
    "search_host": "www.jetradar.com/searches/new",
    "width": 900,
    "show_logo": false,
    "marker": marker + '._landings'
};

$(document).ready(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/widgets/' + set_handle + '.js?v=707');
    $('#present__form, #choose__form').append(script);

});

docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/calendar_widget/iframe.js?marker=' + marker + '._landings&destination=BKK&currency=usd&width=800&searchUrl=www.jetradar.com%2Fsearches%2Fnew&one_way=false&only_direct=false&locale=en&period=year&range=7%2C14');
    document.getElementById('calendar__form').appendChild(script);
});


docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=PAR&destination_name=Paris');
    document.getElementById('popular__list__item-1').appendChild(script);
});


docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=BKK&destination_name=Bangkok');
    document.getElementById('popular__list__item-2').appendChild(script);
});

docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=TLV&destination_name=Tel%20Aviv-Yafo');
    document.getElementById('popular__list__item-3').appendChild(script);
});

docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=LON&destination_name=London');
    document.getElementById('popular__list__item-4').appendChild(script);
});

docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=NYC&destination_name=New%20York%2C%20NY');
    document.getElementById('popular__list__item-5').appendChild(script);
});

docReady(function() {
    var script = document.createElement('script');
    script.setAttribute('charset', 'utf-8');
    script.setAttribute('async', 'true');
    script.setAttribute('src', '//www.travelpayouts.com/weedle/widget.js?width=400px&marker=' + marker + '._landings&host=hydra.aviasales.ru&locale=en&currency=usd&destination=LAX&destination_name=Los%20Angeles%2C%20CA');
    document.getElementById('popular__list__item-6').appendChild(script);
});



docReady(function() {
    var logo1 = document.getElementById('logo-top');
    var logo2 = document.getElementById('logo-bottom');
    var href = "http://jetradar.com/?marker=" + marker + '._landings';
    logo1.setAttribute('href', href);
    logo2.setAttribute('href', href);
});