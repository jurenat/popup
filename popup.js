/**
 * popUp - jQuery Plugin
 * version: 1.0.0
 * requires jQuery v1.7 or later
 *
 * License: MIT
 * Created by darkmoon on 4.2.16.
 * Copyright 2016 darkmoon - jurenatomas@gmail.com
 *
 */
(function ($) {
    $.fn.extend({
        popUp: function (options) {
            options = $.extend({}, $.PopUp.defaults, options);

            this.each(function () {
                new $.PopUp(this, options);
            });
            return this;
        }
    });

    $.PopUp = function (ctl, options) {
        $(ctl).on(
            {
                mouseenter: function (e) {
                    var content = options.content;
                    if (!options.useDataAttrs)
                        var data = options.data[$(this).data(options.identificator)];
                    var re = /{(.*?)}/g;
                    var m;
                    var repeatKeys = [];
                    var repeat = '';
                    if (options.contentRepeat !== null) {
                        while ((m = re.exec(options.contentRepeat)) !== null) {
                            if (m.index === re.lastIndex) {
                                re.lastIndex++;
                            }
                            repeatKeys.push(m);
                        }
                        var r = /{(\S+)}/;
                        m = r.exec(options.repeatKeyword);
                        data[m[1]].forEach(function (element) {
                            var toAdd = options.contentRepeat;
                            for (var i = 0; i < repeatKeys.length; i++) {
                                toAdd = toAdd.replace(repeatKeys[i][0], element[repeatKeys[i][1]]);
                            }
                            repeat = repeat.concat(toAdd);
                        });
                    }
                    while ((m = re.exec(options.content)) !== null) {
                        if (m.index === re.lastIndex) {
                            re.lastIndex++;
                        }
                        if (options.useDataAttrs) {
                            content = content.replace(m[0], $(this).data(m[1]));
                        } else {
                            if (data[m[1]] && m[0] != options.repeatKeyword) {
                                content = content.replace(m[0], data[m[1]]);
                            } else if (data[m[1]] && m[0] == options.repeatKeyword) {
                                content = content.replace(m[0], repeat);
                            }
                        }
                    }
                    if ($("#popup").length == 0) {
                        var elm = $("<div id='popup' style='display: none;top: " + (e.pageY - options.offset) + "px;left: " + (e.pageX + options.offset) + "px'>" + content + "</div>").appendTo("body");
                        switch (options.animationIn) {
                            case "fadeIn":
                                elm.fadeIn(options.timingIn);
                                break;
                            case "show":
                                elm.show(options.timingIn);
                                break;
                        }

                    }
                },
                mousemove: function (e) {
                    $("#popup").css({
                        "top": (e.pageY - options.offset) + "px",
                        "left": (e.pageX + options.offset) + "px"
                    });

                },
                mouseleave: function () {
                    var pop = $("#popup");
                    var func = (function () {
                        return function () {
                            $(".removing").remove()
                        };
                    });
                    pop.addClass("removing");
                    pop.removeAttr("id");
                    switch (options.animationOut) {
                        case "hide":
                            pop.hide(options.timingOut, func());
                            break;
                        case "fadeOut":
                            pop.fadeOut(options.timingOut, func());
                            break;
                    }
                }
            });
        if (!options.follow) {
            $(ctl).off("mousemove");
        }
    };

    // option defaults
    $.PopUp.defaults = {
        follow: true,
        offset: 10,
        content: "content",
        contentRepeat: null,
        repeatKeyword: "{repeat}",
        identificator: "id",
        data: undefined,
        useDataAttrs: false,
        timingIn: 750,
        timingOut: 250,
        animationIn: "fadeIn",
        animationOut: "fadeOut"
    };

})(jQuery);
