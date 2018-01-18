const innerHTML = "/*\n Highcharts JS v4.2.5 (2016-05-06)\n Exporting module\n\n (c) 2010-2016 Torstein Honsi\n\n License: www.highcharts.com/license\n*/\n(function (f) {\n    typeof module === \"object\" && module.exports ? module.exports = f : f(Highcharts)\n})(function (f) {\n    var t = f.win,\n        k = t.document,\n        C = f.Chart,\n        v = f.addEvent,\n        D = f.removeEvent,\n        E = f.fireEvent,\n        s = f.createElement,\n        u = f.discardElement,\n        x = f.css,\n        l = f.merge,\n        q = f.each,\n        r = f.extend,\n        F = f.splat,\n        G = Math.max,\n        H = f.isTouchDevice,\n        I = f.Renderer.prototype.symbols,\n        A = f.getOptions(),\n        B;\n    r(A.lang, {\n        printChart: \"Print chart\",\n        downloadPNG: \"Download PNG image\",\n        downloadJPEG: \"Download JPEG image\",\n        downloadPDF: \"Download PDF document\",\n        downloadSVG: \"Download SVG vector image\",\n        contextButtonTitle: \"Chart context menu\"\n    });\n    A.navigation = {\n        menuStyle: {\n            border: \"1px solid #A0A0A0\",\n            background: \"#FFFFFF\",\n            padding: \"5px 0\"\n        },\n        menuItemStyle: {\n            padding: \"0 10px\",\n            background: \"none\",\n            color: \"#303030\",\n            fontSize: H ? \"14px\" : \"11px\"\n        },\n        menuItemHoverStyle: {\n            background: \"#4572A5\",\n            color: \"#FFFFFF\"\n        },\n        buttonOptions: {\n            symbolFill: \"#E0E0E0\",\n            symbolSize: 14,\n            symbolStroke: \"#666\",\n            symbolStrokeWidth: 3,\n            symbolX: 12.5,\n            symbolY: 10.5,\n            align: \"right\",\n            buttonSpacing: 3,\n            height: 22,\n            theme: {\n                fill: \"white\",\n                stroke: \"none\"\n            },\n            verticalAlign: \"top\",\n            width: 24\n        }\n    };\n    A.exporting = {\n        type: \"image/png\",\n        url: \"http://export.highcharts.com/\",\n        printMaxWidth: 780,\n        buttons: {\n            contextButton: {\n                menuClassName: \"highcharts-contextmenu\",\n                symbol: \"menu\",\n                _titleKey: \"contextButtonTitle\",\n                menuItems: [{\n                        textKey: \"printChart\",\n                        onclick: function () {\n                            this.print()\n                        }\n                    }, {\n                        separator: !0\n                    }, {\n                        textKey: \"downloadPNG\",\n                        onclick: function () {\n                            this.exportChart()\n                        }\n                    }, {\n                        textKey: \"downloadJPEG\",\n                        onclick: function () {\n                            this.exportChart({\n                                type: \"image/jpeg\"\n                            })\n                        }\n                    }, {\n                        textKey: \"downloadPDF\",\n                        onclick: function () {\n                            this.exportChart({\n                                type: \"application/pdf\"\n                            })\n                        }\n                    },\n                    {\n                        textKey: \"downloadSVG\",\n                        onclick: function () {\n                            this.exportChart({\n                                type: \"image/svg+xml\"\n                            })\n                        }\n                    }\n                ]\n            }\n        }\n    };\n    f.post = function (a, b, e) {\n        var c, a = s(\"form\", l({\n            method: \"post\",\n            action: a,\n            enctype: \"multipart/form-data\"\n        }, e), {\n            display: \"none\"\n        }, k.body);\n        for (c in b) s(\"input\", {\n            type: \"hidden\",\n            name: c,\n            value: b[c]\n        }, null, a);\n        a.submit();\n        u(a)\n    };\n    r(C.prototype, {\n        sanitizeSVG: function (a) {\n            return a.replace(/zIndex=\"[^\"]+\"/g, \"\").replace(/isShadow=\"[^\"]+\"/g, \"\").replace(/symbolName=\"[^\"]+\"/g, \"\").replace(/jQuery[0-9]+=\"[^\"]+\"/g, \"\").replace(/url\\([^#]+#/g, \"url(#\").replace(/<svg /,\n                '<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" ').replace(/ (NS[0-9]+\\:)?href=/g, \" xlink:href=\").replace(/\\n/, \" \").replace(/<\\/svg>.*?$/, \"</svg>\").replace(/(fill|stroke)=\"rgba\\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\\.]+)\\)\"/g, '$1=\"rgb($2)\" $1-opacity=\"$3\"').replace(/&nbsp;/g, \"\\u00a0\").replace(/&shy;/g, \"\\u00ad\").replace(/<IMG /g, \"<image \").replace(/<(\\/?)TITLE>/g, \"<$1title>\").replace(/height=([^\" ]+)/g, 'height=\"$1\"').replace(/width=([^\" ]+)/g, 'width=\"$1\"').replace(/hc-svg-href=\"([^\"]+)\">/g, 'xlink:href=\"$1\"/>').replace(/ id=([^\" >]+)/g,\n                ' id=\"$1\"').replace(/class=([^\" >]+)/g, 'class=\"$1\"').replace(/ transform /g, \" \").replace(/:(path|rect)/g, \"$1\").replace(/style=\"([^\"]+)\"/g, function (a) {\n                return a.toLowerCase()\n            })\n        },\n        getChartHTML: function () {\n            return this.container.innerHTML\n        },\n        getSVG: function (a) {\n            var b = this,\n                e, c, g, j, h, d = l(b.options, a),\n                m = d.exporting.allowHTML;\n            if (!k.createElementNS) k.createElementNS = function (a, b) {\n                return k.createElement(b)\n            };\n            c = s(\"div\", null, {\n                position: \"absolute\",\n                top: \"-9999em\",\n                width: b.chartWidth + \"px\",\n                height: b.chartHeight + \"px\"\n            }, k.body);\n            g = b.renderTo.style.width;\n            h = b.renderTo.style.height;\n            g = d.exporting.sourceWidth || d.chart.width || /px$/.test(g) && parseInt(g, 10) || 600;\n            h = d.exporting.sourceHeight || d.chart.height || /px$/.test(h) && parseInt(h, 10) || 400;\n            r(d.chart, {\n                animation: !1,\n                renderTo: c,\n                forExport: !0,\n                renderer: \"SVGRenderer\",\n                width: g,\n                height: h\n            });\n            d.exporting.enabled = !1;\n            delete d.data;\n            d.series = [];\n            q(b.series, function (a) {\n                j = l(a.userOptions, {\n                    animation: !1,\n                    enableMouseTracking: !1,\n                    showCheckbox: !1,\n                    visible: a.visible\n                });\n                j.isInternal || d.series.push(j)\n            });\n            a && q([\"xAxis\",\n                \"yAxis\"\n            ], function (b) {\n                q(F(a[b]), function (a, c) {\n                    d[b][c] = l(d[b][c], a)\n                })\n            });\n            e = new f.Chart(d, b.callback);\n            q([\"xAxis\", \"yAxis\"], function (a) {\n                q(b[a], function (b, c) {\n                    var d = e[a][c],\n                        f = b.getExtremes(),\n                        g = f.userMin,\n                        f = f.userMax;\n                    d && (g !== void 0 || f !== void 0) && d.setExtremes(g, f, !0, !1)\n                })\n            });\n            g = e.getChartHTML();\n            d = null;\n            e.destroy();\n            u(c);\n            if (m && (c = g.match(/<\\/svg>(.*?$)/))) c = '<foreignObject x=\"0\" y=\"0\" width=\"200\" height=\"200\"><body xmlns=\"http://www.w3.org/1999/xhtml\">' + c[1] + \"</body></foreignObject>\", g = g.replace(\"</svg>\", c + \"</svg>\");\n            g = this.sanitizeSVG(g);\n            return g = g.replace(/(url\\(#highcharts-[0-9]+)&quot;/g, \"$1\").replace(/&quot;/g, \"'\")\n        },\n        getSVGForExport: function (a, b) {\n            var e = this.options.exporting;\n            return this.getSVG(l({\n                chart: {\n                    borderRadius: 0\n                }\n            }, e.chartOptions, b, {\n                exporting: {\n                    sourceWidth: a && a.sourceWidth || e.sourceWidth,\n                    sourceHeight: a && a.sourceHeight || e.sourceHeight\n                }\n            }))\n        },\n        exportChart: function (a, b) {\n            var e = this.getSVGForExport(a, b),\n                a = l(this.options.exporting, a);\n            f.post(a.url, {\n                filename: a.filename || \"chart\",\n                type: a.type,\n                width: a.width || 0,\n                scale: a.scale ||\n                    2,\n                svg: e\n            }, a.formAttributes)\n        },\n        print: function () {\n            var a = this,\n                b = a.container,\n                e = [],\n                c = b.parentNode,\n                f = k.body,\n                j = f.childNodes,\n                h = a.options.exporting.printMaxWidth,\n                d, m, n;\n            if (!a.isPrinting) {\n                a.isPrinting = !0;\n                a.pointer.reset(null, 0);\n                E(a, \"beforePrint\");\n                if (n = h && a.chartWidth > h) d = a.hasUserSize, m = [a.chartWidth, a.chartHeight, !1], a.setSize(h, a.chartHeight, !1);\n                q(j, function (a, b) {\n                    if (a.nodeType === 1) e[b] = a.style.display, a.style.display = \"none\"\n                });\n                f.appendChild(b);\n                t.focus();\n                t.print();\n                setTimeout(function () {\n                    c.appendChild(b);\n                    q(j, function (a,\n                        b) {\n                        if (a.nodeType === 1) a.style.display = e[b]\n                    });\n                    a.isPrinting = !1;\n                    if (n) a.setSize.apply(a, m), a.hasUserSize = d;\n                    E(a, \"afterPrint\")\n                }, 1E3)\n            }\n        },\n        contextMenu: function (a, b, e, c, f, j, h) {\n            var d = this,\n                m = d.options.navigation,\n                n = m.menuItemStyle,\n                o = d.chartWidth,\n                p = d.chartHeight,\n                l = \"cache-\" + a,\n                i = d[l],\n                w = G(f, j),\n                y, z, t, u = function (b) {\n                    d.pointer.inClass(b.target, a) || z()\n                };\n            if (!i) d[l] = i = s(\"div\", {\n                className: a\n            }, {\n                position: \"absolute\",\n                zIndex: 1E3,\n                padding: w + \"px\"\n            }, d.container), y = s(\"div\", null, r({\n                MozBoxShadow: \"3px 3px 10px #888\",\n                WebkitBoxShadow: \"3px 3px 10px #888\",\n                boxShadow: \"3px 3px 10px #888\"\n            }, m.menuStyle), i), z = function () {\n                x(i, {\n                    display: \"none\"\n                });\n                h && h.setState(0);\n                d.openMenu = !1\n            }, v(i, \"mouseleave\", function () {\n                t = setTimeout(z, 500)\n            }), v(i, \"mouseenter\", function () {\n                clearTimeout(t)\n            }), v(k, \"mouseup\", u), v(d, \"destroy\", function () {\n                D(k, \"mouseup\", u)\n            }), q(b, function (a) {\n                if (a) {\n                    var b = a.separator ? s(\"hr\", null, null, y) : s(\"div\", {\n                        onmouseover: function () {\n                            x(this, m.menuItemHoverStyle)\n                        },\n                        onmouseout: function () {\n                            x(this, n)\n                        },\n                        onclick: function (b) {\n                            b && b.stopPropagation();\n                            z();\n                            a.onclick && a.onclick.apply(d,\n                                arguments)\n                        },\n                        innerHTML: a.text || d.options.lang[a.textKey]\n                    }, r({\n                        cursor: \"pointer\"\n                    }, n), y);\n                    d.exportDivElements.push(b)\n                }\n            }), d.exportDivElements.push(y, i), d.exportMenuWidth = i.offsetWidth, d.exportMenuHeight = i.offsetHeight;\n            b = {\n                display: \"block\"\n            };\n            e + d.exportMenuWidth > o ? b.right = o - e - f - w + \"px\" : b.left = e - w + \"px\";\n            c + j + d.exportMenuHeight > p && h.alignOptions.verticalAlign !== \"top\" ? b.bottom = p - c - w + \"px\" : b.top = c + j - w + \"px\";\n            x(i, b);\n            d.openMenu = !0\n        },\n        addButton: function (a) {\n            var b = this,\n                e = b.renderer,\n                c = l(b.options.navigation.buttonOptions, a),\n                g =\n                c.onclick,\n                j = c.menuItems,\n                h, d, m = {\n                    stroke: c.symbolStroke,\n                    fill: c.symbolFill\n                },\n                n = c.symbolSize || 12;\n            if (!b.btnCount) b.btnCount = 0;\n            if (!b.exportDivElements) b.exportDivElements = [], b.exportSVGElements = [];\n            if (c.enabled !== !1) {\n                var o = c.theme,\n                    p = o.states,\n                    k = p && p.hover,\n                    p = p && p.select,\n                    i;\n                delete o.states;\n                g ? i = function (a) {\n                    a.stopPropagation();\n                    g.call(b, a)\n                } : j && (i = function () {\n                    b.contextMenu(d.menuClassName, j, d.translateX, d.translateY, d.width, d.height, d);\n                    d.setState(2)\n                });\n                c.text && c.symbol ? o.paddingLeft = f.pick(o.paddingLeft, 25) : c.text ||\n                    r(o, {\n                        width: c.width,\n                        height: c.height,\n                        padding: 0\n                    });\n                d = e.button(c.text, 0, 0, i, o, k, p).attr({\n                    title: b.options.lang[c._titleKey],\n                    \"stroke-linecap\": \"round\",\n                    zIndex: 3\n                });\n                d.menuClassName = a.menuClassName || \"highcharts-menu-\" + b.btnCount++;\n                c.symbol && (h = e.symbol(c.symbol, c.symbolX - n / 2, c.symbolY - n / 2, n, n).attr(r(m, {\n                    \"stroke-width\": c.symbolStrokeWidth || 1,\n                    zIndex: 1\n                })).add(d));\n                d.add().align(r(c, {\n                    width: d.width,\n                    x: f.pick(c.x, B)\n                }), !0, \"spacingBox\");\n                B += (d.width + c.buttonSpacing) * (c.align === \"right\" ? -1 : 1);\n                b.exportSVGElements.push(d, h)\n            }\n        },\n        destroyExport: function (a) {\n            var a = a.target,\n                b, e;\n            for (b = 0; b < a.exportSVGElements.length; b++)\n                if (e = a.exportSVGElements[b]) e.onclick = e.ontouchstart = null, a.exportSVGElements[b] = e.destroy();\n            for (b = 0; b < a.exportDivElements.length; b++) e = a.exportDivElements[b], D(e, \"mouseleave\"), a.exportDivElements[b] = e.onmouseout = e.onmouseover = e.ontouchstart = e.onclick = null, u(e)\n        }\n    });\n    I.menu = function (a, b, e, c) {\n        return [\"M\", a, b + 2.5, \"L\", a + e, b + 2.5, \"M\", a, b + c / 2 + 0.5, \"L\", a + e, b + c / 2 + 0.5, \"M\", a, b + c - 1.5, \"L\", a + e, b + c - 1.5]\n    };\n    C.prototype.callbacks.push(function (a) {\n        var b,\n            e = a.options.exporting,\n            c = e.buttons;\n        B = 0;\n        if (e.enabled !== !1) {\n            for (b in c) a.addButton(c[b]);\n            v(a, \"destroy\", a.destroyExport)\n        }\n    })\n});";
const ss=document.querySelectorAll('script');
let target;
for(let i=0;i<ss.length;i++){
if(ss[i].src.indexOf('highcharts')!==-1){
    target=ss[i];
    break;
}
}
if(target){
    let parent = target.parentNode;
    let theScript = document.createElement('script');
    theScript.innerHTML = innerHTML;
    if ( parent.lastChild == target ){
         // 如果最后的节点是目标元素，则直接添加。因为默认是最后
         parent.appendChild( theScript );
    }
    else{
         //如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
         parent.insertBefore( theScript, target.nextSibling );
    }
}