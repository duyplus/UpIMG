/**
 * UpIMG
 * @authors DUYPLUS <duyplusdz@gmail.com>
 * @version v1.0.0
 * @link https://github.com/duyplus/UpIMG
 * @License 
 */
! function() {
    "use strict";

    function e(e, i) {
        this.maximumWidth = e || 1200, this.picaSettings = i || {
            quality: 3,
            alpha: !1,
            unsharpAmount: 40,
            unsharpRadius: .5,
            unsharpThreshold: 0
        }, this.pica = window.pica, this.files = {}
    }

    function i(e, i, a, t) {
        function s(e, i, a) {
            function t() {
                function e(e) {
                    console.log(e ? "UpIMGLib: resize error" : "UpIMGLib: resized", i + 1, "/", a.length), o.UpIMG.processedCB(o.processed)
                }
                var t, s, o = this;
                s = document.createElement("canvas"), s.width = o.width, s.height = o.height, t = s.getContext("2d"), t.drawImage(o, 0, 0), "function" == typeof o.UpIMG.loadedCB && o.UpIMG.loadedCB();
                var n, p = !1;
                n = document.createElement("canvas"), o.width > o.UpIMG.maximumWidth ? (n.width = o.UpIMG.maximumWidth, n.height = o.height / o.width * n.width, p = !0) : (n.width = o.width, n.height = o.height), t = n.getContext("2d"), t.drawImage(o, 0, 0), o.processed.original.canvas = s, o.processed.resized.canvas = n, o.processed.current = i + 1, o.processed.total = a.length, p ? o.UpIMG.pica.resizeCanvas(s, n, this.UpIMG.picaSettings, e) : o.UpIMG.processedCB(o.processed)
            }
            var s = new Image;
            s.src = window.URL.createObjectURL(e), s.UpIMG = this, s.onload = t, s.processed = {
                resized: {},
                original: {
                    type: e.type,
                    size: e.size,
                    name: e.name,
                    lastModified: e.lastModified
                }
            }
        }
        console.log("UpIMGLib: processing started");
        var o = this;
        o.processedCB = e, o.originalCanvas = i, o.processedCanvas = a, o.loadedCB = t, o.files.map(s, o)
    }

    function a() {
        function i(e) {
            var i = new ZeroClipboard(e.buttons),
                a = !1;
            return i.on("ready", function(t) {
                a = !0, e.buttons.text("copy").prop("disabled", !1), i.on("aftercopy", function(i) {
                    e.buttons.addClass("btn-default").removeClass("btn-success").text("copy"), $(i.target).removeClass("btn-default").addClass("btn-success").text("copied")
                })
            }), a
        }

        function a(e) {
            console.log("UpIMGApp: file input changed");
            var i = e.data.UpIMG,
                a = $(this)[0].files;
            0 !== a.length && ($(".image").addClass("hide"), $(".extra").addClass("hide"), $(".container").val(""), $("#status").removeClass("hide").text("loading..."), i.files = [].slice.call(a), i.process(s, $("#original")[0], $("#processed")[0], 1 === a.length ? t : !1))
        }

        function t() {
            $(".image").addClass("hide"), $("#original").removeClass("hide"), $("#status").removeClass("hide").text("processing...")
        }

        function s(e) {
            function i(i) {
                1 === e.total ? o(i, e.original) : n(i, e.original)
            }
            
            console.log("UpIMGApp: uploading", e.current, "/", e.total), 1 === e.total && ($(".image").addClass("hide"), $("#processed").removeClass("hide"), $("#status").removeClass("hide").text("saving..."));
            var a = e.resized.canvas.toDataURL(e.original.type);
            $.post(p, {
                image: a
            }, i)
        }

        function o(e, i) { 
            e = JSON.parse(e);           
            if (e.saved) {
                console.log("UpIMGApp: upload done for '" + i.name + "'");
                var a =  e.saved;
                $("#direct-link").val(a), $("#forum-code").val("[img]" + a + "[/img]"), $("#common-mark").val("![" + i.name + "](" + a + ")"), $("#quick-copy").removeClass("hide"), $("#status").addClass("hide").text(""), $(".copy-button").addClass("btn-default").removeClass("btn-success"), $("#uploaded").attr("src", a), $("#uploaded").load(function() {
                    $(".image").addClass("hide"), $("#uploaded").removeClass("hide")
                })
            } else console.log("UpIMGApp: upload failed for '" + i.name + "'"), $("#status").text("upload failed")
        }

        function n(e, i) {
            e = JSON.parse(e); 
            if (e.saved) {
                console.log("UpIMGApp: upload done for '" + i.name + "'");
                var a = e.saved,
                    t = "[img]" + a + "[/img]",
                    s = "![" + i.name + "](" + a + ")",
                    o = $("#multiple-direct-link"),
                    n = $("#multiple-bbcode"),
                    p = $("#multiple-markdown");
                $("#status").addClass("hide"), $("#multiple").removeClass("hide"), o.val(o.val() + a + "\n"), n.val(n.val() + t + "\n"), p.val(p.val() + s + "\n")
            } else console.log("UpIMGApp: upload failed for '" + i.name + "'")
        }
        console.log("UpIMGApp: starting app");
        var p = "api.php",
            l = p,
            d = 1200,
            c = {
                quality: 3,
                alpha: !1,
                unsharpAmount: 40,
                unsharpRadius: .5,
                unsharpThreshold: 0
            },
            r = {
                type: "file",
                multiple: !0,
                accept: "image/jpeg, image/png"
            },
            u = (window.pica, $("#file-input")),
            h = new e(d, c),
            k = {
                swfPath: "/img/ZeroClipboard.swf",
                buttons: $(".copy-button")
            };
        $("#image-select-button").click(function() {
            u.trigger("click")
        }), u.prop(r).change({
            UpIMG: h
        }, a), $('input[type="text"]').click(function() {
            $(this).select()
        }), $(".btn-default").click(function() {
            $(this).blur()
        }), $(".tab").click(function(e) {
            $(".tab").removeClass("active"), $(this).addClass("active"), $(".container").addClass("hide"), $("#" + $(this).attr("link")).removeClass("hide")
        }), ZeroClipboard.config({
            swfPath: k.swfPath
        });
        i(k)
    }
    e.prototype.process = i, $(a)
}();
