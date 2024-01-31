!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).ShareButtons = t());
})(this, function () {
  "use strict";
  var A = window,
    S = A.document;
  var e = new (function () {
    function u(e, r) {
      return e.replace(/\{(\d+)\}/g, function (e, t) {
        return r[t] || e;
      });
    }
    function l(e) {
      return e.join(" - ");
    }
    function h(e) {
      A.console.log(e);
    }
    function r(e) {
      for (var t = S.querySelectorAll(e), r = 0; r < t.length; r++)
        t[r].style.display = "none";
    }
    var d = "copy",
      p = "share",
      f = "navigator.share(): ",
      n = "This feature is not supported on this browser or operating system.";
    function b(e) {
      return encodeURIComponent(e);
    }
    function m(e) {
      return decodeURIComponent(e);
    }
    this.i = function () {
      for (var e = S.querySelectorAll(".share-btn"), t = e.length; t--; )
        a(e[t]);
      A.navigator.clipboard ||
        (r('[data-id="copy"]'), h("navigator.clipboard(): " + n)),
        A.navigator.canShare || (r('[data-id="share"]'), h(f + n));
    };
    var a = function (e) {
        for (var t = e.querySelectorAll("a"), r = t.length; r--; )
          i(t[r], { id: "", url: o(e), title: c(e), desc: s(e) });
      },
      i = function (e, t) {
        (t.id = y(e, "data-id")), t.id && (w(e, "click"), g(e, "click", t));
      },
      o = function (e) {
        return y(e, "data-url") || A.location.href || " ";
      },
      c = function (e) {
        return y(e, "data-title") || S.title || " ";
      },
      s = function (e) {
        var t = S.querySelector("meta[name=description]");
        return y(e, "data-desc") || (t && y(t, "content")) || " ";
      },
      k = 0,
      v = {},
      w = function (e, t) {
        var r = e.getAttribute("data-sharebtn-ref");
        r &&
          (e.removeEventListener
            ? e.removeEventListener(t, v[r])
            : e.detachEvent("on" + t, v[r + "ie"]));
      },
      g = function (e, t, r) {
        function n() {
          x(r.id, r.url, r.title, r.desc);
        }
        function a() {
          n.call(e);
        }
        var i = e.getAttribute("data-sharebtn-ref");
        i || ((i = ++k), e.setAttribute("data-sharebtn-ref", i)),
          (v[i] = n),
          (v[i + "ie"] = a),
          e.addEventListener
            ? e.addEventListener(t, n)
            : e.attachEvent("on" + t, a);
      },
      y = function (e, t) {
        return e.getAttribute(t);
      },
      x = function (e, t, r, n) {
        var a = b(t),
          i = b(n),
          o = b(r),
          c = o || i || "";
        switch (e) {
          case "fb":
            E(
              u("https://www.facebook.com/sharer/sharer.php?u={0}&quote={1}", [
                a,
                o,
              ]),
              r
            );
            break;
          case "vk":
            E(
              u("https://vk.com/share.php?url={0}&title={1}", [a, l([o, i])]),
              r
            );
            break;
          case "tw":
            E(
              u("https://twitter.com/intent/tweet?url={0}&text={1}", [
                a,
                l([o, i]),
              ]),
              r
            );
            break;
          case "tg":
            E(u("https://t.me/share/url?url={0}&text={1}", [a, l([o, i])]), r);
            break;
          case "pk":
            E(
              u("https://getpocket.com/edit?url={0}&title={1}", [a, l([o, i])]),
              r
            );
            break;
          case "re":
            E(u("https://reddit.com/submit?url={0}&title={1}", [a, o]), r);
            break;
          case "ev":
            E(
              u("https://www.evernote.com/clip.action?url={0}&t={1}", [a, o]),
              r
            );
            break;
          case "in":
            E(
              u(
                "https://www.linkedin.com/shareArticle?mini=true&url={0}&title={1}&summary={2}&source={0}",
                [a, o, l([o, i])]
              ),
              r
            );
            break;
          case "pi":
            E(
              u(
                "https://pinterest.com/pin/create/button/?url={0}&media={0}&description={1}",
                [a, l([o, i])]
              ),
              r
            );
            break;
          case "sk":
            E(
              u("https://web.skype.com/share?url={0}&source=button&text={1}", [
                a,
                l([o, i]),
              ]),
              r
            );
            break;
          case "wa":
            E(u("https://wa.me/?text={0}%20{1}", [l([o, i]), a]), r);
            break;
          case "ok":
            E(
              u(
                "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={0}",
                [a]
              ),
              r
            );
            break;
          case "tu":
            E(
              u(
                "https://www.tumblr.com/widgets/share/tool?posttype=link&title={0}&caption={0}&content={1}&canonicalUrl={1}&shareSource=tumblr_share_button",
                [l([o, i]), a]
              ),
              r
            );
            break;
          case "hn":
            E(
              u("https://news.ycombinator.com/submitlink?t={0}&u={1}", [
                l([o, i]),
                a,
              ]),
              r
            );
            break;
          case "xi":
            E(
              u("https://www.xing.com/app/user?op=share;url={0};title={1}", [
                a,
                l([o, i]),
              ]),
              r
            );
            break;
          case "mail":
            0 < o.length && 0 < i.length && (c = l([o, i])),
              0 < a.length && (c = c + " / " + a),
              (A.location.href = u("mailto:?subject={0}&body={1}", [o, c]));
            break;
          case "print":
            A.print();
            break;
          case d:
            A.navigator.clipboard.writeText(m(a));
            break;
          case p:
            var s = { title: (c = m(l([o, i]))), text: c, url: m(a) };
            A.navigator
              .share(s)
              .then(function () {})
              .catch(function (e) {
                h(f + "Error");
              });
        }
      },
      E = function (e, t) {
        var r = void 0 !== A.screenLeft ? A.screenLeft : screen.left,
          n = void 0 !== A.screenTop ? A.screenTop : screen.top,
          a = A.innerWidth || S.documentElement.clientWidth || screen.width,
          i = A.innerHeight || S.documentElement.clientHeight || screen.height,
          r = A.open(
            e,
            "",
            u(
              "resizable,toolbar=yes,location=yes,scrollbars=yes,menubar=yes,width={0},height={1},top={2},left={3}",
              [600, 400, i / 3 - 400 / 3 + n, a / 2 - 300 + r]
            )
          );
        null !== r && r.focus && r.focus();
      };
  })();
  return (
    e.i(),
    {
      update: function () {
        e.i();
      },
    }
  );
});
