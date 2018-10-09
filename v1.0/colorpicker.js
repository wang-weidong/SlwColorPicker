/**
 * colorPicker v1.0 2012.4 by WangWeidong 532873584@qq.com
 * colorPicker is released under the MIT license.
 */
;(function ($) {
    $.fn.colorPicker = function (o) {
        var defaults = {
                color: '#FFFFFF',
                btn_close: true,
                lang: 1 				//0:en, 1,中文
            },
            o = $.extend(defaults, o);
        return this.each(function () {
            var $this = $(this),
                _ie = !!window.ActiveXObject,
                _ie6 = _ie && !window.XMLHttpRequest,
                _c1 = ['ffffff', '000000', 'eeece1', '1f497d', '4f81bd', 'c0504d', '9bbb59', '8064a2', '4bacc6', 'f79646'],
                _c2 = ['f2f2f2', '7f7f7f', 'ddd9c3', 'c6d9f0', 'dbe5f1', 'f2dcdb', 'ebf1dd', 'e5e0ec', 'dbeef3', 'fdeada',
                    'd8d8d8', '595959', 'c4bd97', '8db3e2', 'b8cce4', 'e5b9b7', 'd7e3bc', 'ccc1d9', 'b7dde8', 'fbd5b5',
                    'bfbfbf', '3f3f3f', '938953', '548dd4', '95b3d7', 'd99694', 'c3d69b', 'b2a2c7', '92cddc', 'fac08f',
                    'a5a5a5', '262626', '494429', '17365d', '366092', '953734', '76923c', '5f497a', '31859b', 'e36c09',
                    '7f7f7f', '0c0c0c', '1d1b10', '0f243e', '244061', '632423', '4f6128', '3f3151', '205867', '974806'],
                _c3 = ['c00000', 'ff0000', 'ffc000', 'ffff00', '92d050', '00b050', '00b0f0', '0070c0', '002060', '7030a0'],
                _c4 = [
                    ['003366', '336699', '3366cc', '003399', '000099', '0000cc', '000066'],
                    ['006666', '006699', '0099cc', '0066cc', '0033cc', '0000ff', '3333ff', '333399'],
                    ['669999', '009999', '33cccc', '00ccff', '0099ff', '0066ff', '3366ff', '3333cc', '666699'],
                    ['339966', '00cc99', '00ffcc', '00ffff', '33ccff', '3399ff', '6699ff', '6666ff', '6600ff', '6600cc'],
                    ['339933', '00cc66', '00ff99', '66ffcc', '66ffff', '66ccff', '99ccff', '9999ff', '9966ff', '9933ff', '9900ff'],
                    ['006600', '00cc00', '00ff00', '66ff99', '99ffcc', 'ccffff', 'ccccff', 'cc99ff', 'cc66ff', 'cc33ff', 'cc00ff', '9900cc'],
                    ['003300', '009933', '33cc33', '66ff66', '99ff99', 'ccffcc', 'ffffff', 'ffccff', 'ff99ff', 'ff66ff', 'ff00ff', 'cc00cc', '660066'],
                    ['333300', '009900', '66ff33', '99ff66', 'ccff99', 'ffffcc', 'ffcccc', 'ff99cc', 'ff66cc', 'ff33cc', 'cc0099', '993399'],
                    ['336600', '669900', '99ff33', 'ccff66', 'ffff99', 'ffcc99', 'ff9999', 'ff6699', 'ff3399', 'cc3399', '990099'],
                    ['666633', '99cc00', 'ccff33', 'ffff66', 'ffcc66', 'ff9966', 'ff6666', 'ff0066', 'd60094', '993366'],
                    ['a58800', 'cccc00', 'ffff00', 'ffcc00', 'ff9933', 'ff6600', 'ff0033', 'cc0066', '660033'],
                    ['996633', 'cc9900', 'ff9900', 'cc6600', 'ff3300', 'ff0000', 'cc0000', '990033'],
                    ['663300', '996600', 'cc3300', '993300', '990000', '800000', '993333']
                ],
                _c = '',
                data = {
                    theme: ["Theme Colors", "主题颜色"],
                    stand: ["Standard Colors", "标准颜色"],
                    morec: ["Colors", "常用颜色"],
                    more: ["More", "更多"],
                    less: ["Less", "标准"],
                    close: ["Close", "关闭"]
                },
                $table = $('<div class="css-color"></div>'),
                iframeTpl = _ie6 ? '<iframe id="css-color-frm" hideFocus="true" frameborder="0" src="about:blank" style="position:absolute;z-index:-1;width:100%;top:0px;left:0px;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)"><\/iframe>' : '',
                init = function () {
                    _c = (isnull(_c) && isnull($this.val()) ? o.color.toUpperCase() : $this.val().toUpperCase());
                    document.body.appendChild($table.get(0));
                    var str = '<div class="lessDiv"><div style="float:left;">' + data.theme[o.lang] + '</div><a href="javascript:;" class="moreA">' + data.more[o.lang] + '>></a><div class="clear"></div><ul>';
                    for (var i = 0; i < 10; i++) str += '<li rel="#' + _c1[i] + '" style="background-color:#' + _c1[i] + '"></li>';
                    str += '</ul><div class="spacebar"></div><ul class="c2">';
                    for (var i = 0; i < 50; i++) {
                        var cls = '';
                        if (i < 10) cls = 'topLi';
                        else if (i > 39) cls = 'bottomLi';
                        str += '<li rel="#' + _c2[i] + '" class="' + cls + '" style="background-color:#' + _c2[i] + '"></li>';
                    }
                    str += '</ul><div class="clear"></div><div>' + data.stand[o.lang] + '</div><ul>';
                    for (var i = 0; i < 10; i++) str += '<li rel="#' + _c3[i] + '" style="background-color:#' + _c3[i] + '"></li>';
                    str += '</ul><div class="spacebar"></div></div>';
                    str += '<div class="moreDiv"><div style="float:left;">' + data.morec[o.lang] + '</div><a href="javascript:;" class="lessA">' + data.less[o.lang] + '>></a><div class="clear"></div>';
                    str += '<div class="moreUl">&nbsp;';
                    for (var i = 0; i < 13; i++) {
                        str += '<ul style="clear:both" class="mul' + i + '">'
                        for (var j = 0; j < _c4[i].length; j++)
                            str += '<li rel="#' + _c4[i][j] + '" style="background-color:#' + _c4[i][j] + '"></li>';
                        str += '</ul>';
                    }
                    str += '</div><div class="spacebar"></div></div>';
                    str += '<div><div class="cur"></div><div class="curText"></div><div class="pre"></div><div class="preText">#FFFFFF</div></div><div class="clear"></div>' + iframeTpl;
                    $table.append(str);
                    if (o.btn_close) $table.append('<div class="btnClose"><span>' + data.close[o.lang] + '</span></div>');
                    set(_c);
                    $('.moreA,.lessA', $table).click(function () {
                        $('.lessDiv,.moreDiv', $table).toggle();
                    });
                    $('li', $table).hover(function () {
                        var c = $(this).attr('rel').toUpperCase();
                        $('.pre', $table).css('background-color', c);
                        $('.preText', $table).html(c);
                    }).click(function () {
                        _c = $(this).attr('rel').toUpperCase();
                        set(_c);
                        close();
                    });
                    $('.btnClose', $table).click(function () {
                        close();
                    });
                },
                reverse = function (c) {
                    var r = (0xFFFFFF - parseInt(c.slice(-6), 16)).toString(16);
                    return "#" + ("000000" + r).slice(-6).toUpperCase();
                },
                close = function () {
                    $table.hide();
                },
                set = function (_c) {
                    $('.cur', $table).css('background-color', _c);
                    $('.curText', $table).html(_c);
                    $this.val(_c);
                    $this.css({'background-color': _c, 'color': reverse(_c)});
                };
            $this.click(function () {
                var o = $this.offset();
                $table.css({left: o.left + 'px', top: (o.top + $this.get(0).offsetHeight - 1) + 'px'});
                _ie6 && $('#css-color-frm').css({height: $table.height() + 'px'});
                $table.show();
            });
            init();
            $(document).bind('click', function (evt) {
                if ($table.is(":visible")) {
                    if ($this.is(evt.target) || $table.is(evt.target) || $table.has(evt.target).length > 0) return;
                    close();
                }
            });
        });
    };
    function isnull(str) {
        return (str == null || str == "" || typeof str == "undefined");
    };
})(jQuery)