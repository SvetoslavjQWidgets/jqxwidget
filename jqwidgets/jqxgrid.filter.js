/*
jQWidgets v15.0.0 (2022-Nov)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */
(function(a) {
    a.extend(a.jqx._jqxGrid.prototype, {
        _updatefilterrowui: function(f) {
            var m = this.columns.records.length;
            var e = 0;
            var l = this;
            if (!this.filterrow) {
                return
            }
            for (var i = 0; i < m; i++) {
                var g = this.columns.records[i];
                var c = parseInt(g.width);
                if (c < g.minwidth) {
                    c = g.minwidth
                }
                if (c > g.maxwidth) {
                    c = g.maxwidth
                }
                var k = a(this.filterrow[0].cells[i]);
                k.css("left", e);
                var h = true;
                if (k.width() == c) {
                    h = false
                }
                if (f) {
                    h = true
                }
                k.width(c);
                if (!k[0]) {
                    continue
                }
                k[0].left = e;
                if (g.element) {
                    k[0].style.width = g.element.style.width;
                    k[0].style.left = g.element.style.left
                }
                if (!(g.hidden && g.hideable)) {
                    e += c
                } else {
                    k.css("display", "none")
                }
                if (!h) {
                    continue
                }
                if (g.createfilterwidget && g.filtertype == "custom") {
                    g.createfilterwidget(g, k)
                } else {
                    if (g.filterable) {
                        var d = function(n, o) {
                            var j = a(o.children()[0]);
                            if (j[0]) {
                                j[0].style.width = (c - 8) + "px";
                                if (a.jqx.browser.msie) {
                                    j[0].style.width = (c - 16) + "px"
                                }
                            }
                            j.attr("disabled", n.disabled)
                        };
                        switch (g.filtertype) {
                            case "number":
                            case "input":
                                a(k.children()[0]).width(c);
                                k.find("input")[0].style.width = (c - 30) + "px";
                                if (a.jqx.browser.msie) {
                                    k.find("input")[0].style.width = (c - 36) + "px"
                                }
                                k.find("input").attr("disabled", l.disabled);
                                a(k.find(".jqx-dropdownlist-state-normal")).jqxDropDownList({
                                    theme: l.theme,
                                    disabled: l.disabled
                                });
                                break;
                            case "date":
                            case "range":
                                if (this.host.jqxDateTimeInput) {
                                    a(k.children()[0]).jqxDateTimeInput({
                                        theme: l.theme,
                                        disabled: l.disabled,
                                        width: c - 10
                                    })
                                } else {
                                    d(this, k)
                                }
                                break;
                            case "textbox":
                            case "default":
                                d(this, k);
                                break;
                            case "list":
                            case "checkedlist":
                                if (this.host.jqxDropDownList) {
                                    a(k.children()[0]).jqxDropDownList({
                                        theme: l.theme,
                                        disabled: l.disabled,
                                        width: c - 10
                                    })
                                } else {
                                    d(this, k)
                                }
                                break;
                            case "bool":
                            case "boolean":
                                if (!this.host.jqxCheckBox) {
                                    d(this, k)
                                } else {
                                    a(k.children()[0]).jqxCheckBox({
                                        theme: l.theme,
                                        disabled: l.disabled
                                    })
                                }
                                break
                        }
                    }
                }
            }
            var b = a(this.filterrow.children()[0]);
            b.width(parseInt(e) + 2);
            b.height(this.filterrowheight)
        },
        clearfilterrow: function(d) {
            this._disablefilterrow = true;
            if (!this.columns.records) {
                return
            }
            var m = this.columns.records.length;
            var e = 0;
            for (var i = 0; i < m; i++) {
                var f = this.columns.records[i];
                var l = a(this.filterrow[0].cells[i]);
                if (typeof d == "string") {
                    if (f.displayfield != d) {
                        continue
                    }
                }
                if (f.filterable) {
                    var c = function(o, p) {
                        var j = a(p.children()[0]);
                        j.val("");
                        if (j[0]) {
                            o["_oldWriteText" + j[0].id] = ""
                        }
                    };
                    switch (f.filtertype) {
                        case "number":
                        case "input":
                            l.find("input").val("");
                            if (this.host.jqxDropDownList) {
                                var k = a(a(a(l).children()[0]).children()[1]);
                                k.jqxDropDownList("clearSelection");
                                var g = 0;
                                if (g == 0) {
                                    var b = this._getfiltersbytype(f.filtertype == "number" ? "number" : "string");
                                    var n = new a.jqx.filter();
                                    var h = n.getoperatorsbyfiltertype(f.filtertype == "number" ? "numberfilter" : "stringfilter");
                                    if (f.filtercondition != null) {
                                        g = h.indexOf(f.filtercondition.toUpperCase());
                                        if (g == -1) {
                                            g = f.filtertype == "number" ? 0 : 2
                                        }
                                    } else {
                                        g = f.filtertype == "number" ? 0 : 2
                                    }
                                }
                                k.jqxDropDownList({
                                    selectedIndex: g
                                });
                                k.jqxDropDownList("ensureVisible", g)
                            }
                            break;
                        case "date":
                        case "range":
                            if (this.host.jqxDateTimeInput) {
                                a(l.children()[0]).jqxDateTimeInput("setDate", null)
                            } else {
                                c(this, l)
                            }
                            break;
                        case "textbox":
                        case "default":
                            c(this, l);
                            break;
                        case "list":
                            if (this.host.jqxDropDownList) {
                                a(l.children()[0]).jqxDropDownList("clearSelection")
                            } else {
                                c(this, l)
                            }
                            break;
                        case "checkedlist":
                            if (this.host.jqxDropDownList) {
                                a(l.children()[0]).jqxDropDownList("checkAll", false)
                            } else {
                                c(this, l)
                            }
                            break;
                        case "bool":
                        case "boolean":
                            if (!this.host.jqxCheckBox) {
                                c(this, l)
                            } else {
                                a(l.children()[0]).jqxCheckBox({
                                    checked: null
                                })
                            }
                            break
                    }
                }
            }
            this._disablefilterrow = false
        },
        _applyfilterfromfilterrow: function() {
            if (this._disablefilterrow == true) {
                return
            }
            if (this.disabled) {
                return
            }
            var A = this.columns.records.length;
            var E = this.that;
            for (var u = 0; u < A; u++) {
                var l = new a.jqx.filter();
                var v = this.columns.records[u];
                if (!v.filterable) {
                    continue
                }
                if (v.datafield === null) {
                    continue
                }
                var f = E._getcolumntypebydatafield(v);
                var d = E._getfiltertype(f);
                var m = 1;
                var F = true;
                var e = v.filtertype;
                var C = function(j, M, J) {
                    var i = true;
                    if (j._filterwidget) {
                        var H = j._filterwidget.val();
                        if (H != "") {
                            var K = "equal";
                            if (M == "stringfilter") {
                                var K = "contains"
                            }
                            if (M == "numericfilter") {
                                if (E.gridlocalization.decimalseparator == ",") {
                                    if (H.indexOf(E.gridlocalization.decimalseparator) >= 0) {
                                        H = H.replace(E.gridlocalization.decimalseparator, ".")
                                    }
                                }
                            }
                            if (M != "stringfilter") {
                                var L = 0;
                                if (H.indexOf(">") != -1) {
                                    K = "greater_than";
                                    L = 1
                                }
                                if (H.indexOf("<") != -1) {
                                    K = "less_than";
                                    L = 1
                                }
                                if (H.indexOf("=") != -1) {
                                    if (K == "greater_than") {
                                        K = "greater_than_or_equal";
                                        L = 2
                                    } else {
                                        if (K == "less_than") {
                                            K = "less_than_or_equal";
                                            L = 2
                                        } else {
                                            K = "equal";
                                            L = 1
                                        }
                                    }
                                }
                                if (L != 0) {
                                    H = H.substring(L);
                                    if (H.length < 1) {
                                        return false
                                    }
                                }
                            }
                            if (j.filtercondition != undefined) {
                                K = j.filtercondition
                            }
                            if (M == "datefilter") {
                                var I = J.createfilter(M, H, K, null, j.cellsformat, E.gridlocalization)
                            } else {
                                var I = J.createfilter(M, H, K)
                            }
                            J.addfilter(m, I)
                        } else {
                            i = false
                        }
                    }
                    return i
                };
                switch (v.filtertype) {
                    case "range":
                    case "date":
                        if (v._filterwidget.jqxDateTimeInput) {
                            if (v.filtertype == "range") {
                                var q = v._filterwidget.jqxDateTimeInput("getRange");
                                if (q != null && q.from != null && q.to != null) {
                                    var p = "GREATER_THAN_OR_EQUAL";
                                    var s = new Date(0);
                                    s.setHours(0);
                                    s.setMinutes(0);
                                    s.setFullYear(q.from.getFullYear(), q.from.getMonth(), q.from.getDate());
                                    var r = new Date(0);
                                    r.setHours(0);
                                    r.setMinutes(0);
                                    r.setFullYear(q.to.getFullYear(), q.to.getMonth(), q.to.getDate());
                                    r.setHours(q.to.getHours());
                                    r.setMinutes(q.to.getMinutes());
                                    r.setSeconds(q.to.getSeconds());
                                    var z = l.createfilter(d, s, p);
                                    l.addfilter(0, z);
                                    var c = "LESS_THAN_OR_EQUAL";
                                    var y = l.createfilter(d, r, c);
                                    l.addfilter(0, y)
                                } else {
                                    F = false
                                }
                            } else {
                                var q = v._filterwidget.jqxDateTimeInput("getDate");
                                if (q != null) {
                                    var s = new Date(0);
                                    s.setHours(0);
                                    s.setMinutes(0);
                                    s.setFullYear(q.getFullYear(), q.getMonth(), q.getDate());
                                    if (v._filterwidget.jqxDateTimeInput("showTimeButton")) {
                                        s.setHours(q.getHours());
                                        s.setMinutes(q.getMinutes())
                                    }
                                    var p = "EQUAL";
                                    if (v.filtercondition != undefined) {
                                        p = v.filtercondition
                                    }
                                    var z = l.createfilter(d, s, p);
                                    var h = v._filterwidget.jqxDateTimeInput("showTimeButton");
                                    if (h) {
                                        z = l.createfilter(d, s, p, null, v.cellsformat)
                                    }
                                    l.addfilter(0, z)
                                } else {
                                    F = false
                                }
                            }
                        } else {
                            F = C(v, d, l)
                        }
                        break;
                    case "input":
                        if (v._filterwidget) {
                            var q = v._filterwidget.find("input").val();
                            var k = v._filterwidget.find(".filter").jqxDropDownList("selectedIndex");
                            var x = l.getoperatorsbyfiltertype(d)[k];
                            if (E.updatefilterconditions) {
                                var G = E.updatefilterconditions(d, l.getoperatorsbyfiltertype(d));
                                if (G != undefined) {
                                    l.setoperatorsbyfiltertype(d, G)
                                }
                                var x = l.getoperatorsbyfiltertype(d)[k]
                            }
                            var o = x == "NULL" || x == "NOT_NULL";
                            var t = x == "EMPTY" || x == "NOT_EMPTY";
                            if (q != undefined && q.length > 0 || o || t) {
                                z = l.createfilter(d, q, x, null, v.cellsformat, E.gridlocalization);
                                l.addfilter(0, z)
                            } else {
                                F = false
                            }
                        } else {
                            F = false
                        }
                        break;
                    case "number":
                        if (v._filterwidget) {
                            var q = v._filterwidget.find("input").val();
                            if (E.gridlocalization.decimalseparator == ",") {
                                if (q.indexOf(E.gridlocalization.decimalseparator) >= 0) {
                                    q = q.replace(E.gridlocalization.decimalseparator, ".")
                                }
                            }
                            var k = v._filterwidget.find(".filter").jqxDropDownList("selectedIndex");
                            var x = l.getoperatorsbyfiltertype(d)[k];
                            if (E.updatefilterconditions) {
                                var G = E.updatefilterconditions(d, l.getoperatorsbyfiltertype(d));
                                if (G != undefined) {
                                    l.setoperatorsbyfiltertype(d, G)
                                }
                                var x = l.getoperatorsbyfiltertype(d)[k]
                            }
                            var o = x == "NULL" || x == "NOT_NULL";
                            var t = x == "EMPTY" || x == "NOT_EMPTY";
                            if (q != undefined && q.length > 0 || o || t) {
                                z = l.createfilter(d, new Number(q), x, null, v.cellsformat, E.gridlocalization);
                                l.addfilter(0, z)
                            } else {
                                F = false
                            }
                        } else {
                            F = false
                        }
                        break;
                    case "textbox":
                    case "default":
                        F = C(v, d, l);
                        break;
                    case "bool":
                    case "boolean":
                        if (v._filterwidget.jqxCheckBox) {
                            var q = v._filterwidget.jqxCheckBox("checked");
                            if (q != null) {
                                var p = "equal";
                                var n = l.createfilter(d, q, p);
                                l.addfilter(m, n)
                            } else {
                                F = false
                            }
                        } else {
                            F = C(v, d, l)
                        }
                        break;
                    case "list":
                        var g = v._filterwidget.jqxDropDownList("listBox");
                        if (g.selectedIndex >= 0) {
                            var b = g.getSelectedItem();
                            var q = b.label;
                            var B = b.value;
                            var p = "equal";
                            if (q === "") {
                                p = "NULL"
                            }
                            var n = l.createfilter(d, q, p);
                            l.addfilter(m, n);
                            if (B !== q) {
                                n.data = B
                            }
                        } else {
                            F = false
                        }
                        break;
                    case "checkedlist":
                        if (v._filterwidget.jqxDropDownList) {
                            var g = v._filterwidget.jqxDropDownList("listBox");
                            var D = g.getCheckedItems();
                            if (D.length == 0) {
                                for (var w = 1; w < g.items.length; w++) {
                                    var q = g.items[w].label;
                                    var B = g.items[w].value;
                                    var p = "not_equal";
                                    if (q === "") {
                                        p = "NOT_NULL"
                                    }
                                    var n = l.createfilter(d, q, p);
                                    if (B !== q) {
                                        n.data = B
                                    }
                                    l.addfilter(0, n)
                                }
                                F = true
                            } else {
                                if (D.length != g.items.length) {
                                    for (var w = 0; w < D.length; w++) {
                                        var q = D[w].label;
                                        var B = D[w].value;
                                        var p = "equal";
                                        if (q === "") {
                                            p = "NULL"
                                        }
                                        var n = l.createfilter(d, q, p);
                                        if (B !== q) {
                                            n.data = B
                                        }
                                        l.addfilter(m, n)
                                    }
                                } else {
                                    F = false
                                }
                            }
                        } else {
                            F = C(v, d, l)
                        }
                        break
                }
                if (!this._loading) {
                    if (F) {
                        this.addfilter(v.displayfield, l, false)
                    } else {
                        this.removefilter(v.displayfield, false)
                    }
                }
            }
            if (!this._loading) {
                this.applyfilters("filterrow")
            }
        },
        _updatefilterrow: function() {
            var b = a('<div style="position: relative;" id="row00' + this.element.id + '"></div>');
            var f = 0;
            var o = this.columns.records.length;
            var m = this.toThemeProperty("jqx-grid-cell");
            m += " " + this.toThemeProperty("jqx-grid-cell-pinned");
            m += " " + this.toThemeProperty("jqx-grid-cell-filter-row");
            var r = o + 10;
            var s = new Array();
            var n = this.that;
            this.filterrow[0].cells = s;
            b.height(this.filterrowheight);
            this.filterrow.children().detach();
            this.filterrow.append(b);
            if (!this._filterrowcache) {
                this._filterrowcache = new Array()
            }
            this._initcolumntypes();
            var g = false;
            var d = new Array();
            var q = document.createDocumentFragment();
            for (var h = 0; h < o; h++) {
                var e = this.columns.records[h];
                var c = e.width;
                if (c < e.minwidth) {
                    c = e.minwidth
                }
                if (c > e.maxwidth) {
                    c = e.maxwidth
                }
                var l = document.createElement("div");
                l.style.overflow = "hidden";
                l.style.position = "absolute";
                l.style.height = "100%";
                l.className = m;
                l = a(l);
                q.appendChild(l[0]);
                l[0].style.left = f + "px";
                if (this.rtl) {
                    l.css("z-index", r++);
                    l.css("border-left-width", "1px")
                } else {
                    l.css("z-index", r--)
                }
                if (c == "auto") {
                    c = 0
                }
                l[0].style.width = parseFloat(c) + "px";
                l[0].left = f;
                if (!(e.hidden && e.hideable)) {
                    f += c
                } else {
                    l.css("display", "none")
                }
                s[s.length] = l[0];
                var k = true;
                if (!this.rtl) {
                    if (this.groupable) {
                        var p = (this.showrowdetailscolumn && this.rowdetails) ? 1 : 0;
                        if (this.groups.length + p > h) {
                            k = false
                        }
                    }
                    if (this.showrowdetailscolumn && this.rowdetails && h == 0) {
                        k = false
                    }
                } else {
                    if (this.groupable) {
                        var p = (this.showrowdetailscolumn && this.rowdetails) ? 1 : 0;
                        if (this.groups.length + p + h > o - 1) {
                            k = false
                        }
                    }
                    if (this.showrowdetailscolumn && this.rowdetails && h == o - 1) {
                        k = false
                    }
                }
                if (k) {
                    if (e.filtertype == "custom" && e.createfilterwidget) {
                        var i = function() {
                            n._applyfilterfromfilterrow()
                        };
                        e.createfilterwidget(e, l, i)
                    } else {
                        if (e.filterable) {
                            if (this._filterrowcache[e.datafield]) {
                                g = true;
                                l.append(this._filterrowcache[e.datafield]);
                                e._filterwidget = this._filterrowcache[e.datafield]
                            } else {
                                this._addfilterwidget(e, l, c);
                                d[e.datafield] = e._filterwidget
                            }
                        }
                    }
                }
            }
            b[0].appendChild(q);
            this._filterrowcache = d;
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                b.css("z-index", r--)
            }
            b.width(parseFloat(f) + 2);
            this.filterrow.addClass(m);
            this.filterrow.css("border-top-width", "1px");
            this.filterrow.css("border-right-width", "0px");
            if (g) {
                this._updatefilterrowui(true)
            }
        },
        _getfilterdataadapter: function(b) {
            var c = this.source._source ? true : false;
            if (!c) {
                var f = new a.jqx.dataAdapter(this.source, {
                    autoBind: false,
                    uniqueDataFields: [b.displayfield],
                    autoSort: true,
                    autoSortField: b.displayfield,
                    async: false
                })
            } else {
                var e = {
                    localdata: a.extend(true, {}, this.source.records),
                    datatype: this.source.datatype,
                    async: false
                };
                var d = this;
                var f = new a.jqx.dataAdapter(e, {
                    autoBind: false,
                    autoSort: true,
                    autoSortField: b.displayfield,
                    async: false,
                    uniqueDataFields: [b.displayfield],
                    beforeLoadComplete: function(g) {
                        var l = new Array();
                        if (b.cellsformat) {
                            var k = d._getcolumntypebydatafield(b);
                            for (var h = 0; h < g.length; h++) {
                                l.push(g[h]);
                                var j = g[h][b.displayfield];
                                g[h][b.displayfield + "JQValue"] = j;
                                if (k === "date") {
                                    if (j != null) {
                                        g[h][b.displayfield] = f.formatDate(j, b.cellsformat, d.gridlocalization)
                                    } else {
                                        g[h][b.displayfield] = ""
                                    }
                                } else {
                                    if (k === "number" || k === "float" || k === "int") {
                                        if (j != null) {
                                            g[h][b.displayfield] = f.formatNumber(j, b.cellsformat, d.gridlocalization)
                                        } else {
                                            g[h][b.displayfield] = ""
                                        }
                                    }
                                }
                            }
                            return l
                        } else {
                            return g
                        }
                    }
                })
            }
            if (b.filteritems && b.filteritems.length > 0) {
                var e = {
                    localdata: b.filteritems,
                    datatype: this.source.datatype,
                    async: false
                };
                var f = new a.jqx.dataAdapter(e, {
                    autoBind: false,
                    async: false
                })
            } else {
                if (b.filteritems) {
                    if (b.filteritems._source) {
                        b.filteritems._options.autoBind = false;
                        b.filteritems._options.async = false;
                        return b.filteritems
                    } else {
                        if (a.isFunction(b.filteritems)) {
                            return b.filteritems()
                        }
                    }
                }
            }
            return f
        },
        refreshfilterrow: function() {
            if (!this.showfilterrow) {
                return
            }
            this.refreshingfilter = true;
            this._updatefilterrowui();
            this._updatelistfilters(true, true);
            var h = this.that;
            var l = this.columns.records.length;
            for (var d = 0; d < l; d++) {
                var c = this.columns.records[d];
                if (c.filterable) {
                    if (c.filter) {
                        var b = c.filter.getfilters();
                        if (b.length > 0) {
                            var k = b[0].value;
                            var e = c._filterwidget;
                            var f = c._filterwidget.parent();
                            if (e != null) {
                                switch (c.filtertype) {
                                    case "number":
                                        f.find("input").val(k);
                                        if (this.host.jqxDropDownList) {
                                            var i = c.filter.getoperatorsbyfiltertype("numericfilter");
                                            e.find(".filter").jqxDropDownList("selectIndex", i.indexOf(b[0].condition))
                                        }
                                        break;
                                    case "input":
                                        f.find("input").val(k);
                                        if (this.host.jqxDropDownList) {
                                            var i = c.filter.getoperatorsbyfiltertype("stringfilter");
                                            e.find(".filter").jqxDropDownList("selectIndex", i.indexOf(b[0].condition))
                                        }
                                        break;
                                    case "date":
                                    case "range":
                                        if (this.host.jqxDateTimeInput) {
                                            var k = c.filter.getfilterat(0).filtervalue;
                                            if (k != undefined) {
                                                if (c.filter.getfilterat(1)) {
                                                    var g = c.filter.getfilterat(1).filtervalue
                                                } else {
                                                    g = k
                                                }
                                                if (c.filtertype == "range") {
                                                    a(f.children()[0]).jqxDateTimeInput("setRange", new Date(k), new Date(g))
                                                } else {
                                                    a(f.children()[0]).jqxDateTimeInput("setDate", new Date(k))
                                                }
                                            }
                                        } else {
                                            e.val(k)
                                        }
                                        break;
                                    case "textbox":
                                    case "default":
                                        e.val(k);
                                        h["_oldWriteText" + e[0].id] = k;
                                        break;
                                    case "bool":
                                    case "boolean":
                                        if (!this.host.jqxCheckBox) {
                                            e.val(k)
                                        } else {
                                            a(f.children()[0]).jqxCheckBox({
                                                checked: k
                                            })
                                        }
                                        break
                                }
                            }
                        }
                    }
                }
            }
            this.refreshingfilter = false
        },
        _destroyedfilters: function() {
            var g = this.that;
            var b = this.columns.records.length;
            for (var f = 0; f < b; f++) {
                var c = this.columns.records[f];
                if (c.filterable) {
                    var h = c._filterwidget;
                    if (c.filtertype == "list" || c.filtertype == "checkedlist") {
                        this.removeHandler(h, "select");
                        this.removeHandler(h, "close");
                        h.jqxDropDownList("destroy")
                    } else {
                        if (c.filtertype == "date" || c.filtertype == "range") {
                            this.removeHandler(h, "valueChanged");
                            h.jqxDateTimeInput("destroy")
                        } else {
                            if (c.filtertype == "bool") {
                                this.removeHandler(h, "change");
                                h.jqxCheckBox("destroy")
                            } else {
                                if (c.filtertype == "number" || c.filtertype === "input") {
                                    var d = h.find(".jqx-input");
                                    this.removeHandler(d, "keydown");
                                    var e = a(h.children()[1]);
                                    e.jqxDropDownList("destroy")
                                } else {
                                    this.removeHandler(h, "keydown")
                                }
                            }
                        }
                    }
                    h.remove()
                }
            }
        },
        _updatelistfilters: function(l, k) {
            var v = this.that;
            var t = this.columns.records.length;
            for (var p = 0; p < t; p++) {
                var q = this.columns.records[p];
                if (q.filterable) {
                    if (q.filtertype == "list" || q.filtertype == "checkedlist") {
                        var h = q._filterwidget;
                        if (!l) {
                            if (q.filter == undefined) {
                                h.jqxDropDownList("renderSelection");
                                continue
                            }
                        } else {
                            var e = this._getfilterdataadapter(q);
                            h.jqxDropDownList({
                                source: e
                            });
                            var d = h.jqxDropDownList("getItems");
                            var o = true;
                            if (d.length != e.records.length + 1) {
                                o = false
                            }
                            if (o) {
                                for (var s = 1; s < d.length; s++) {
                                    if (d[s].label != e.records[s - 1][q.displayfield]) {
                                        o = false;
                                        break
                                    }
                                }
                            }
                            if (o && !k) {
                                continue
                            }
                        }
                        var m = q.filtertype == "checkedlist" ? true : false;
                        var d = h.jqxDropDownList("getItems");
                        var b = h.jqxDropDownList("listBox");
                        h.jqxDropDownList("dataBind");
                        if (m) {
                            h.jqxDropDownList({
                                selectionRenderer: function() {
                                    return v.gridlocalization.filterselectstring
                                }
                            });
                            if (b.getItem(this.gridlocalization.filterselectallstring) == null) {
                                b.insertAt({
                                    label: this.gridlocalization.filterselectallstring
                                }, 0)
                            }
                            var n = a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + this.gridlocalization.filterselectstring + "</span>");
                            n.addClass(this.toThemeProperty("jqx-item"));
                            h.jqxDropDownList("setContent", n);
                            b.checkAll(false);
                            if (q.filter) {
                                var g = q.filter.getfilters();
                                for (var s = 0; s < b.items.length; s++) {
                                    var f = b.items[s].label;
                                    var r = undefined;
                                    a.each(g, function() {
                                        var i;
                                        if (this.condition == "NOT_EQUAL") {
                                            if (f == this.value) {
                                                i = false
                                            } else {
                                                i = true
                                            }
                                        } else {
                                            if (this.condition == "EQUAL") {
                                                if (f == this.value) {
                                                    i = true
                                                } else {
                                                    i = false
                                                }
                                            }
                                        }
                                        if (r == undefined && i !== undefined) {
                                            r = i
                                        } else {
                                            if (this.condition == "EQUAL") {
                                                r = r || i
                                            } else {
                                                r = r && i
                                            }
                                        }
                                    });
                                    if (r) {
                                        b.checkIndex(s, false, false)
                                    } else {
                                        b.uncheckIndex(s, false, false)
                                    }
                                }
                                b._updateCheckedItems();
                                var u = b.getCheckedItems().length;
                                if (b.items.length != u && u > 0) {
                                    b.host.jqxListBox("indeterminateIndex", 0, true, false)
                                }
                            }
                        } else {
                            if (b.getItem(this.gridlocalization.filterchoosestring) == null) {
                                b.insertAt({
                                    label: this.gridlocalization.filterchoosestring,
                                    value: ""
                                }, 0)
                            }
                            h.jqxDropDownList({
                                selectedIndex: 0
                            });
                            if (q.filter) {
                                var g = q.filter.getfilters();
                                var c = -1;
                                for (var s = 0; s < b.items.length; s++) {
                                    var f = b.items[s].label;
                                    a.each(g, function() {
                                        if (this.condition == "NOT_EQUAL") {
                                            return true
                                        }
                                        if (f == this.value) {
                                            c = s;
                                            return false
                                        }
                                    })
                                }
                                if (c != -1) {
                                    b.selectIndex(c)
                                }
                            }
                        }
                        if (d.length < 8) {
                            h.jqxDropDownList("autoDropDownHeight", true)
                        } else {
                            h.jqxDropDownList("autoDropDownHeight", false)
                        }
                    }
                }
            }
        },
        _renderfilter: function() {
            var f = this;
            var g = a("<div class='jqxGrid_main_filter_zoola'><div class='jqxGrid_left_filter_zoola'></div><div class='jqxGrid_right_filter_zoola'><div class='jqxGrid_search_filter'><input style='height: 100%; direction: ltr;' role='textbox' type='text' placeholder='Search here...'/><div style='cursor: pointer; height: 100%;'><div class='serach_btn_filter_zoola'></div></div></div><ul> <li> <div class='all_action_dropbox'> <div class='dropdown icon-btn-dropdown'> <a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-box-arrow-up' viewBox='0 0 16 16'> <path fill-rule='evenodd' d='M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z'/> <path fill-rule='evenodd' d='M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z'/> </svg> </a> <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'> <a href='javascript:;' id='"+f.element.id+"_excelExport' class='dropdown-item'>Export to Excel</a> <a href='javascript:;' id='"+f.element.id+"_csvExport' class='dropdown-item'>Export to CSV</a> <a href='javascript:;' id='"+f.element.id+"_pdfExport' class='dropdown-item'>Export to PDF</a> </div> </div> </div> </li> <li> <div class='all_action_dropbox'> <div class='dropdown icon-btn-dropdown'> <a class='dropdown-toggle' href='#' role='button' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-gear' viewBox='0 0 16 16'> <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z'/> <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z'/> </svg> </a> <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'> <a href='javascript:;' id='"+f.element.id+"_columnHideShow' class='dropdown-item'>Select columns to Display</a> <a href='javascript:;' id='"+f.element.id+"_columnAutoResizeBtn' class='dropdown-item'>Auto Resize Columns</a> </div> </div> </div> </li> </ul></div></div>");
            var m = g.find("input");
            var e = g.find(".jqxGrid_search_filter");
            m.addClass(this.toThemeProperty("jqx-input"));
            m.addClass(this.toThemeProperty("jqx-rc-l"));
            m.addClass(this.toThemeProperty("jqx-input-group-addon"));
            m.addClass(this.toThemeProperty("jqx-widget"));
            m.addClass(this.toThemeProperty("jqx-widget-content"));
            e.addClass(this.toThemeProperty("jqx-rc-all"));
            e.addClass(this.toThemeProperty("jqx-widget"));
            e.addClass(this.toThemeProperty("jqx-input-group"));
            e.addClass(this.toThemeProperty("jqx-fill-state-normal"));
            e.addClass(this.toThemeProperty("jqx-rc-r"));
            e.addClass(this.toThemeProperty("jqx-input-group-addon"));
            e.find(".serach_btn_filter_zoola").addClass(this.toThemeProperty("jqx-icon-search"));
            if (this.rtl) {
                m.addClass(this.toThemeProperty("jqx-rtl"));
                m.css("direction", "rtl")
            }
            this.filterbar.children().remove();
            this.filterbutton = e;
            var c = new Array();
            for (var d = 0; d < f.columns.records.length; d++) {
                if (f.columns.records[d].datafield && f.columns.records[d].filterable) {
                    c.push({
                        label: f.columns.records[d].text,
                        value: f.columns.records[d].displayfield
                    })
                }
            }
            var n = c.length < 10 ? true : false;
            // Updated by ajay
            // var j = a("<div style='position: relative;  display: none; margin-right: 4px; margin-left: 4px; float: left;'>" + this.gridlocalization.filtersearchstring + "</div>");
            var j = a("<div style='position: relative;  display: none; margin-right: 0px; margin-left: 0px; float: left;'></div>");
            this.filterbar.append(j);
            var b = a("<div class='filtercolumns' style='position: relative; margin-top:5px; margin-left:4px; margin-right: 4px; float: left;'></div>");
            this.filterbar.append(b);
            if (b.jqxDropDownList) {
                b.jqxDropDownList({
                    theme: this.theme,
                    enableBrowserBoundsDetection: true,
                    autoDropDownHeight: n,
                    rtl: f.rtl,
                    dropDownWidth: 220,
                    selectedIndex: 0,
                    width: "auto",
                    height: 25,
                    source: c,
                    displayMember: "label",
                    valueMember: "value"
                })
            }
            this.filtercolumnsList = b;
            m[0].parentElement.insertBefore(j[0], m[0]);
            var l = function(o) {
                f.filterinput.val("");
                for (var p = 0; p < f.dataview.filters.length; p++) {
                    var q = f.dataview.filters[p];
                    if (q.datafield === o) {
                        f.filterinput.val(q.filter.getfilterat(0).filtervalue)
                    }
                }
            };
            if (f.filterHeight !== 35) {}
            f._updateSimpleFilter = l;
            this.addHandler(b, "select", function(o) {
                var i = o.args.item.value;
                l(i)
            });
            if (this.filterbarmode === "simple") {
                this.filtercolumnsList.hide();
                j.show()
            } else {
                this.filtercolumnsList.show();
                j.hide()
            }
            var k = function() {
                if (!e.hasClass("jqx-fill-state-disabled")) {
                    var p = m.val();
                    if (b.jqxDropDownList) {
                        var s = b.jqxDropDownList("getSelectedItem")
                    }
                    var u = function(z, v, i) {
                        var y = new a.jqx.filter();
                        var x = f._getcolumnbydatafield(z);
                        var A = f._getfiltertype(x);
                        if (A == "datefilter") {
                            var w = y.createfilter(A, v, "EQUAL", null, z.cellsFormat, f.gridlocalization)
                        } else {
                            if (A == "numericfilter" || A == "booleanfilter") {
                                if (A == "numericfilter") {
                                    if (f.gridlocalization.decimalseparator == ",") {
                                        if (v.indexOf(f.gridlocalization.decimalseparator) >= 0) {
                                            v = v.replace(f.gridlocalization.decimalseparator, ".")
                                        }
                                    }
                                    if (v.indexOf(f.gridlocalization.currencysymbol) >= 0) {
                                        v = v.replace(f.gridlocalization.currencysymbol, "")
                                    }
                                    if (v.indexOf(f.gridlocalization.percentagesymbol) >= 0) {
                                        v = v.replace(f.gridlocalization.percentagesymbol, "")
                                    }
                                }
                                var w = y.createfilter(A, v, "EQUAL", null, z.cellsFormat, f.gridlocalization)
                            } else {
                                var w = y.createfilter(A, v, "CONTAINS")
                            }
                        }
                        y.operator = i;
                        y.addfilter(0, w);
                        return y
                    };
                    if (f.filterbarmode !== "simple") {
                        if (s) {
                            var t = s.value;
                            var r = u(t, p, "and");
                            if (p.length > 0) {
                                f.removefilter(t);
                                f.addfilter(t, r);
                                f.applyfilters()
                            } else {
                                f.removefilter(t);
                                f.applyfilters()
                            }
                        }
                    } else {
                        f.clearfilters(false, false);
                        if (p.length > 0) {
                            for (var o = 0; o < f.columns.records.length; o++) {
                                var q = f.columns.records[o];
                                var r = u(q, p, "or");
                                f.addfilter(q.datafield, r)
                            }
                        }
                        f.applyfilters()
                    }
                    if (f.dataview.filters.length == 0) {
                        f.filtericon.fadeOut(200)
                    } else {
                        f.filtericon.fadeIn(200)
                    }
                }
            };
            m.keydown(function(i) {
                if (i.keyCode === 13) {
                    k();
                    if (i.preventDefault) {
                        i.preventDefault()
                    }
                    return false
                }
            });
            e.click(function() {
                k()
            });
            this.filterinput = m;
            this.filterbar.append(g);
            var h = a("<div style='float: left; width: 16px; height: 16px; position: relative; margin: 3px;'></div>");
            h.attr("title", f.gridlocalization.filterclearstring);
            h.addClass(f.toThemeProperty("jqx-icon-close"));
            // e.append(h);
            g.append(h);
            h.hide();
            f.filtericon = h;
            h.click(function() {
                f.clearfilters();
                f.filtericon.fadeOut(200)
            });
            if (f.dataview.filters.length > 0) {
                l(f.dataview.filters[0].datafield)
            }
        },
        _renderfiltercolumn: function() {
            var b = this.that;
            if (this.filterable) {
                if (!this.columns.records) {
                    return
                }
                a.each(this.columns.records, function(d, e) {
                    var c = false;
                    if (b.autoshowfiltericon) {
                        if (this.filter) {
                            a(this.filtericon).show();
                            c = true
                        } else {
                            a(this.filtericon).hide()
                        }
                    } else {
                        if (this.filterable) {
                            a(this.filtericon).show();
                            c = true
                        }
                    }
                    this.element.removeAttribute("filter");
                    if (c) {
                        this.element.setAttribute("filter", true)
                    }
                    if (this.align == "right" && !this.renderer) {
                        if (this.element) {
                            if (!c) {
                                this.element.firstChild.firstChild.style.marginRight = "2px"
                            } else {
                                this.element.firstChild.firstChild.style.marginRight = "18px"
                            }
                        }
                    }
                })
            }
        },
        _initcolumntypes: function() {
            if (this.columns && this.columns.records) {
                var b = this.source._source.datafields;
                if (b) {
                    for (var c = 0; c < this.columns.records.length; c++) {
                        var d = this.columns.records[c];
                        if (d.datatype) {
                            continue
                        }
                        var e = "";
                        a.each(b, function() {
                            if (this.name == d.displayfield) {
                                if (this.type) {
                                    e = this.type
                                }
                                return false
                            }
                        });
                        if (e != "") {
                            d.datatype = e
                        } else {
                            d.datatype = ""
                        }
                    }
                }
            }
        },
        _getcolumntypebydatafield: function(f) {
            var g = this.that;
            var e = "string";
            var d = g.source.datafields || ((g.source._source) ? g.source._source.datafields : null);
            if (d) {
                var i = "";
                a.each(d, function() {
                    if (this.name == f.displayfield) {
                        if (this.type) {
                            i = this.type
                        }
                        return false
                    }
                });
                if (i) {
                    return i
                }
            }
            if (f != null) {
                if (this.dataview.cachedrecords == undefined) {
                    return e
                }
                var b = null;
                if (!this.virtualmode) {
                    if (this.dataview.cachedrecords.length == 0) {
                        return e
                    }
                    b = this.dataview.cachedrecords[0][f.displayfield];
                    if (b != null && b.toString() == "") {
                        return "string"
                    }
                } else {
                    a.each(this.dataview.cachedrecords, function() {
                        b = this[f.displayfield];
                        return false
                    })
                }
                if (b != null) {
                    if (typeof b == "boolean") {
                        e = "boolean"
                    } else {
                        if (a.jqx.dataFormat.isNumber(b)) {
                            e = "number"
                        } else {
                            var h = new Date(b);
                            if (h.toString() == "NaN" || h.toString() == "Invalid Date") {
                                if (a.jqx.dataFormat) {
                                    h = a.jqx.dataFormat.tryparsedate(b);
                                    if (h != null) {
                                        if (h && h.getFullYear()) {
                                            if (h.getFullYear() == 1970 && h.getMonth() == 0 && h.getDate() == 1) {
                                                var c = new Number(b);
                                                if (!isNaN(c)) {
                                                    return "number"
                                                }
                                                return "string"
                                            }
                                        }
                                        return "date"
                                    } else {
                                        e = "string"
                                    }
                                } else {
                                    e = "string"
                                }
                            } else {
                                e = "date"
                            }
                        }
                    }
                }
            }
            return e
        },
        _getfiltersbytype: function(b) {
            var c = this.that;
            var d = "";
            switch (b) {
                case "number":
                case "float":
                case "int":
                    d = c.gridlocalization.filternumericcomparisonoperators;
                    break;
                case "date":
                    d = c.gridlocalization.filterdatecomparisonoperators;
                    break;
                case "boolean":
                case "bool":
                    d = c.gridlocalization.filterbooleancomparisonoperators;
                    break;
                case "string":
                default:
                    d = c.gridlocalization.filterstringcomparisonoperators;
                    break
            }
            return d
        },
        _getfiltertype: function(b) {
            var c = "stringfilter";
            switch (b) {
                case "number":
                case "int":
                case "float":
                case "decimal":
                    c = "numericfilter";
                    break;
                case "boolean":
                case "bool":
                    c = "booleanfilter";
                    break;
                case "date":
                case "time":
                case "range":
                    c = "datefilter";
                    break;
                case "string":
                case "input":
                    c = "stringfilter";
                    break
            }
            return c
        },
        _buildfilter: function(r, l, F) {
            var f = a(l).find(".filter1");
            var G = a(l).find(".filter2");
            var K = a(l).find(".filter3");
            var k = a(l).find(".filtertext1" + r.element.id);
            var j = a(l).find(".filtertext2" + r.element.id);
            var A = k.val();
            var z = j.val();
            var M = r._getcolumntypebydatafield(F);
            var t = r._getfiltersbytype(M);
            var J = new a.jqx.filter();
            var w = r._getfiltertype(M);
            if (r.filtermode === "default" && (F.filtertype !== "list" && F.filtertype !== "checkedlist")) {
                var E = f.jqxDropDownList("selectedIndex");
                var c = G.jqxDropDownList("selectedIndex");
                var D = K.jqxDropDownList("selectedIndex");
                var e = null;
                var d = null;
                if (r.updatefilterconditions) {
                    var p = r.updatefilterconditions(w, J.getoperatorsbyfiltertype(w));
                    if (p != undefined) {
                        J.setoperatorsbyfiltertype(w, p)
                    }
                }
                var q = false;
                var L = J.getoperatorsbyfiltertype(w)[E];
                var K = J.getoperatorsbyfiltertype(w)[D];
                var v = L == "NULL" || L == "NOT_NULL";
                var h = L == "EMPTY" || L == "NOT_EMPTY";
                if (L == undefined) {
                    L = J.getoperatorsbyfiltertype(w)[0]
                }
                if (K == undefined) {
                    K = J.getoperatorsbyfiltertype(w)[0]
                }
                if (A.length > 0 || v || h) {
                    e = J.createfilter(w, A, L, null, F.cellsformat, r.gridlocalization);
                    J.addfilter(c, e);
                    q = true
                }
                var u = K == "NULL" || K == "NOT_NULL";
                var g = K == "EMPTY" || K == "NOT_EMPTY";
                if (z.length > 0 || u || g) {
                    d = J.createfilter(w, z, K, null, F.cellsformat, r.gridlocalization);
                    J.addfilter(c, d);
                    q = true
                }
                if (q) {
                    var C = F.displayfield;
                    this.addfilter(C, J, true)
                } else {
                    this._clearfilter(r, l, F)
                }
            } else {
                if (r.filtermode === "excel" || (F.filtertype === "list" || F.filtertype === "checkedlist")) {
                    var B = this;
                    var n = false;
                    var x = f.data().jqxListBox.instance;
                    var I = this.filtermode === "excel" || F.filtertype === "checkedlist";
                    var o = x.getCheckedItems();
                    if (!I) {
                        var o = x.getSelectedItems()
                    }
                    if (o.length == 0) {
                        for (var H = 1; H < x.items.length; H++) {
                            var m = x.items[H].value;
                            if (m === undefined) {
                                m = ""
                            }
                            var b = "not_equal";
                            if (m && m.indexOf) {
                                if (m.indexOf("|") >= 0 || m.indexOf(" AND ") >= 0 || m.indexOf(" OR ") >= 0 || m.indexOf(" and ") >= 0 || m.indexOf(" or ") >= 0) {
                                    m = m.replace("|", "");
                                    m = m.replace("AND", "");
                                    m = m.replace("OR", "");
                                    m = m.replace("and", "");
                                    m = m.replace("or", "");
                                    var b = "equal"
                                }
                            }
                            if (w == "datefilter") {
                                var y = J.createfilter(w, m, b, null, F.cellsformat, r.gridlocalization)
                            } else {
                                var y = J.createfilter(w, m, b, null)
                            }
                            J.addfilter(0, y)
                        }
                        n = true
                    } else {
                        if (o.length != x.items.length) {
                            n = true;
                            for (var H = 0; H < o.length; H++) {
                                if (r.gridlocalization.filterselectallstring === o[H].value) {
                                    continue
                                }
                                var m = o[H].value;
                                if (m === undefined) {
                                    m = ""
                                }
                                var b = "equal";
                                if (w == "datefilter") {
                                    var y = J.createfilter(w, m, b, null, F.cellsformat, r.gridlocalization)
                                } else {
                                    var y = J.createfilter(w, m, b, null)
                                }
                                var s = 1;
                                J.addfilter(s, y)
                            }
                        } else {
                            n = false
                        }
                    }
                    if (n) {
                        var C = F.displayfield;
                        this.addfilter(C, J, true)
                    } else {
                        var C = F.displayfield;
                        this.removefilter(C, true)
                    }
                }
            }
        },
        _clearfilter: function(e, c, d) {
            var b = d.displayfield;
            this.removefilter(b, true)
        },
        addfilter: function(d, e, c) {
            if (this._loading) {
                throw new Error("jqxGrid: " + this.loadingerrormessage);
                return false
            }
            var f = this.getcolumn(d);
            var b = this._getcolumn(d);
            if (f == undefined || f == null) {
                return
            }
            f.filter = e;
            if (b) {
                b.filter = e
            }
            this.dataview.addfilter(d, e);
            if (c == true && c != undefined) {
                this.applyfilters("add")
            }
        },
        removefilter: function(d, c) {
            if (this._loading) {
                throw new Error("jqxGrid: " + this.loadingerrormessage);
                return false
            }
            var e = this.getcolumn(d);
            var b = this._getcolumn(d);
            if (e == undefined || e == null) {
                return
            }
            if (e.filter == null) {
                return
            }
            this.dataview.removefilter(d, e.filter);
            e.filter = null;
            b.filter = null;
            if (this.showfilterrow) {
                this.clearfilterrow(d)
            }
            if (c == true || c !== false) {
                this.applyfilters("remove")
            }
        },
        applyfilters: function(f) {
            var c = false;
            if (this.dataview.filters.length >= 0 && (this.virtualmode || !this.source.localdata)) {
                if (this.source != null && this.source.filter) {
                    var g = -1;
                    if (this.pageable) {
                        g = this.dataview.pagenum;
                        this.dataview.pagenum = 0
                    } else {
                        this.vScrollInstance.setPosition(0);
                        this.loadondemand = true;
                        this._renderrows(this.virtualsizeinfo)
                    }
                    if (this.pageable && this.virtualmode) {
                        this.dataview.pagenum = 0
                    }
                    this.source.filter(this.dataview.filters, this.dataview.records, this.dataview.records.length);
                    if (this.pageable && !this.virtualmode) {
                        this.dataview.pagenum = g
                    }
                }
            }
            this._cellscache = new Array();
            if (this.dataview.clearsortdata) {
                this.dataview.clearsortdata()
            }
            if (!this.virtualmode) {
                var b = this.selectedrowindexes;
                var d = this.that;
                this.dataview.refresh();
                if (this.dataview.clearsortdata) {
                    if (this.sortcolumn && this.sortdirection) {
                        var e = this.sortdirection.ascending ? "asc" : "desc";
                        if (!this._loading) {
                            this.sortby(this.sortcolumn, e, null, false)
                        } else {
                            this.sortby(this.sortcolumn, e, null, false, false)
                        }
                    }
                }
            } else {
                if (this.pageable) {
                    this.dataview.updateview();
                    if (this.gotopage) {
                        this.gotopage(0)
                    }
                }
                this.rendergridcontent(false, false);
                if (this.showfilterrow) {
                    if (typeof f != "string" && a.isEmptyObject(f)) {
                        this.refreshfilterrow()
                    }
                }
                this._postrender("filter");
                this._raiseEvent(13, {
                    filters: this.dataview.filters
                });
                return
            }
            if (this.pageable) {
                this.dataview.updateview();
                if (this.gotopage) {
                    this.gotopage(0);
                    this.updatepagerdetails()
                }
            }
            this._updaterowsproperties();
            if (!this.groupable || (this.groupable && this.groups.length == 0)) {
                this._rowdetailscache = new Array();
                this.virtualsizeinfo = null;
                this._pagescache = new Array();
                if (this.columns && this.columns.records && this.columns.records.length > 0 && !this.columns.records[0].filtericon) {
                    this.prerenderrequired = true
                }
                this.rendergridcontent(true, false);
                this._updatecolumnwidths();
                this._updatecellwidths();
                this._renderrows(this.virtualsizeinfo);
                if (this.showaggregates && this._updatecolumnsaggregates) {
                    this._updatecolumnsaggregates()
                }
                this._postrender("filter")
            } else {
                this.collapseallgroups();
                this._rowdetailscache = new Array();
                this._render(true, true, false, false, false);
                if (this.showfilterrow) {
                    this._updatefocusedfilter()
                }
                this._updatecolumnwidths();
                this._updatecellwidths();
                this._renderrows(this.virtualsizeinfo);
                this._postrender("filter")
            }
            if (this.showfilterrow) {
                if (typeof f != "string" && a.isEmptyObject(f)) {
                    this.refreshfilterrow()
                }
            }
            this._raiseEvent(13, {
                filters: this.dataview.filters
            })
        },
        getfilterinformation: function() {
            var d = new Array();
            for (var b = 0; b < this.dataview.filters.length; b++) {
                var c = this.getcolumn(this.dataview.filters[b].datafield);
                d[b] = {
                    filter: this.dataview.filters[b].filter,
                    datafield: c.datafield,
                    displayfield: c.displayfield,
                    filtercolumn: c.datafield,
                    filtercolumntext: c.text
                }
            }
            return d
        },
        clearfilters: function(b) {
            var d = this.that;
            if (this.showfilterrow) {
                this.clearfilterrow()
            }
            if (this.columns.records) {
                var c = b == true || b !== false;
                a.each(this.columns.records, function() {
                    d.removefilter(this.displayfield, !c)
                })
            }
            if (b === false) {
                return
            }
            if (b == true || b !== false) {
                this.applyfilters("clear")
            }
        },
        _updatefilterpanel: function(s, p, E) {
            if (s == null || s == undefined) {
                s = this
            }
            var Q = s._getcolumntypebydatafield(E);
            var u = s._getfiltersbytype(Q);
            if (!s.host.jqxDropDownList) {
                throw new Error("jqxGrid: Missing reference to jqxdropdownlist.js.");
                return
            }
            s.filterpanel.detach();
            s.excelfilterpanel.detach();
            if (E.filterpanel) {
                E.filterpanel.detach()
            }
            a(p).children().detach();
            var k = a(s.menuitemsarray[6]);
            a(k).css("height", "190px");
            if (E.createfilterpanel && !E.filterpanel) {
                var K = a("<div class='filter' style='margin-left: 7px;'></div>");
                a(p).append(K);
                E.createfilterpanel(E.displayfield, K);
                E.filterpanel = K
            }
            if (E.filtertype === "list" || E.filtertype === "checkedlist") {
                a(p).append(s.excelfilterpanel)
            } else {
                if (E.filtertype !== "custom") {
                    a(p).append(s.filterpanel)
                } else {
                    if (E.filterpanel) {
                        a(p).append(E.filterpanel)
                    }
                }
            }
            var g = a(p);
            var N = g.find("#filterclearbutton" + s.element.id);
            var l = g.find("#filterbutton" + s.element.id);
            var f = g.find(".filter1");
            var m = g.find(".filter2");
            var P = g.find(".filter3");
            var j = g.find(".filtertext1" + s.element.id);
            var h = g.find(".filtertext2" + s.element.id);
            if (this._hasdatefilter && (E.filtertype !== "list" && E.filtertype !== "checkedlist" && E.filtertype !== "custom")) {
                var e = j.parent();
                var d = h.parent();
                e.children().remove();
                d.children().remove();
                if (E.filtertype == "date") {
                    s._showwhere.text(s.gridlocalization.filtershowrowdatestring);
                    var b = a("<div class='filtertext1" + s.element.id + "' style=''></div>");
                    e.append(b);
                    var n = function(c) {
                        var i = {
                            calendar: s.gridlocalization,
                            todayString: s.gridlocalization.todaystring,
                            clearString: s.gridlocalization.clearstring
                        };
                        c.jqxDateTimeInput({
                            disabled: s.disabled,
                            firstDayOfWeek: s.gridlocalization.firstDay,
                            localization: i,
                            rtl: s.rtl,
                            width: s._filterpanelwidth - 10,
                            height: this.filterMenuItemsHeight,
                            value: null,
                            formatString: E.cellsformat,
                            theme: s.theme
                        })
                    };
                    n(b);
                    var b = a("<div class='filtertext2" + s.element.id + "' style=''></div>");
                    d.append(b);
                    n(b)
                } else {
                    s._showwhere.text(s.gridlocalization.filtershowrowstring);
                    var b = a("<input autocomplete='off' class='filtertext1" + s.element.id + "' style='box-sizing: content-box; height: 16px; padding: 3px;' type='text'></input>");
                    e.append(b);
                    var n = function(c) {
                        c.addClass(s.toThemeProperty("jqx-input"));
                        c.addClass(s.toThemeProperty("jqx-filter-input jqx-widget-content"));
                        c.addClass(s.toThemeProperty("jqx-rc-all"));
                        c.width(s._filterpanelwidth - 18);
                        c[0].style.height = this.filterMenuItemsHeight + "px"
                    };
                    n(b);
                    var b = a("<input autocomplete='off' class='filtertext2" + s.element.id + "' style='box-sizing: content-box; height: 16px; padding: 3px;' type='text'></input>");
                    d.append(b);
                    n(b)
                }
                var j = g.find(".filtertext1" + s.element.id);
                var h = g.find(".filtertext2" + s.element.id)
            }
            if (E.filtertype != "date") {
                j.val("");
                h.val("")
            } else {
                j.val(null);
                h.val(null)
            }
            this.removeHandler(l, "click");
            this.addHandler(l, "click", function() {
                s._buildfilter(s, p, E);
                s._closemenu()
            });
            this.removeHandler(N, "click");
            this.addHandler(N, "click", function() {
                s._clearfilter(s, p, E);
                s._closemenu()
            });
            this.removeHandler(l, "keydown");
            this.addHandler(l, "keydown", function(c) {
                if (c.keyCode === 13) {
                    s._buildfilter(s, p, E);
                    s._closemenu()
                }
            });
            this.removeHandler(N, "keydown");
            this.addHandler(N, "keydown", function(c) {
                if (c.keyCode === 13) {
                    s._clearfilter(s, p, E);
                    s._closemenu()
                }
            });
            this.removeHandler(j, "keydown");
            this.addHandler(j, "keydown", function(c) {
                if (c.keyCode === 13) {
                    l.trigger("click")
                }
                if (c.keyCode === 27) {
                    s._closemenu()
                }
            });
            this.removeHandler(h, "keydown");
            this.addHandler(h, "keydown", function(c) {
                if (c.keyCode === 13) {
                    l.trigger("click")
                }
                if (c.keyCode === 27) {
                    s._closemenu()
                }
            });
            if (this.filtermode === "default" && (E.filtertype !== "list" && E.filtertype !== "checkedlist" && E.filtertype !== "custom")) {
                if (f.jqxDropDownList("source") != u) {
                    f.jqxDropDownList({
                        enableBrowserBoundsDetection: false,
                        source: u
                    });
                    P.jqxDropDownList({
                        enableBrowserBoundsDetection: false,
                        source: u
                    })
                }
                if (Q == "boolean" || Q == "bool") {
                    f.jqxDropDownList({
                        autoDropDownHeight: true,
                        selectedIndex: 0
                    });
                    P.jqxDropDownList({
                        autoDropDownHeight: true,
                        selectedIndex: 0
                    })
                } else {
                    var H = false;
                    if (u && u.length) {
                        if (u.length < 5) {
                            H = true
                        }
                    }
                    f.jqxDropDownList({
                        autoDropDownHeight: H,
                        selectedIndex: 2
                    });
                    P.jqxDropDownList({
                        autoDropDownHeight: H,
                        selectedIndex: 2
                    })
                }
                m.jqxDropDownList({
                    selectedIndex: 0
                });
                var z = E.filter;
                var M = new a.jqx.filter();
                var x = "";
                switch (Q) {
                    case "number":
                    case "int":
                    case "float":
                    case "decimal":
                        x = "numericfilter";
                        o = M.getoperatorsbyfiltertype("numericfilter");
                        break;
                    case "boolean":
                    case "bool":
                        x = "booleanfilter";
                        o = M.getoperatorsbyfiltertype("booleanfilter");
                        break;
                    case "date":
                    case "time":
                        x = "datefilter";
                        o = M.getoperatorsbyfiltertype("datefilter");
                        break;
                    case "string":
                        x = "stringfilter";
                        o = M.getoperatorsbyfiltertype("stringfilter");
                        break
                }
                if (z != null) {
                    var e = z.getfilterat(0);
                    var d = z.getfilterat(1);
                    var I = z.getoperatorat(0);
                    if (s.updatefilterconditions) {
                        var o = [];
                        var r = s.updatefilterconditions(x, o);
                        if (r != undefined) {
                            for (var O = 0; O < r.length; O++) {
                                r[O] = r[O].toUpperCase()
                            }
                            z.setoperatorsbyfiltertype(x, r);
                            o = r
                        }
                    }
                    var w = "default";
                    if (e != null) {
                        var D = o.indexOf(e.comparisonoperator);
                        var A = e.filtervalue;
                        j.val(A);
                        f.jqxDropDownList({
                            selectedIndex: D,
                            animationType: w
                        })
                    }
                    if (d != null) {
                        var C = o.indexOf(d.comparisonoperator);
                        var y = d.filtervalue;
                        h.val(y);
                        P.jqxDropDownList({
                            selectedIndex: C,
                            animationType: w
                        })
                    }
                    if (z.getoperatorat(0) == undefined) {
                        m.jqxDropDownList({
                            selectedIndex: 0,
                            animationType: w
                        })
                    } else {
                        if (z.getoperatorat(0) == "and" || z.getoperatorat(0) == 0) {
                            m.jqxDropDownList({
                                selectedIndex: 0
                            })
                        } else {
                            m.jqxDropDownList({
                                selectedIndex: 1
                            })
                        }
                    }
                }
                if (s.updatefilterpanel) {
                    s.updatefilterpanel(f, P, m, j, h, l, N, z, x, o)
                }
                if (!this._hasdatefilter || (this._hasdatefilter && E.filtertype != "date")) {
                    if (!this.touchdevice) {
                        j.focus();
                        setTimeout(function() {
                            j.focus()
                        }, 10)
                    }
                }
            } else {
                if (this.filtermode === "excel" || E.filtertype === "list" || E.filtertype === "checkedlist") {
                    var v = s._getfilterdataadapter(E);
                    var x = s._getfiltertype(Q);
                    var L = this.filtermode === "excel" || E.filtertype === "checkedlist";
                    if (E.filtertype == "date") {
                        s._showwhere.text(s.gridlocalization.filtershowrowstring)
                    }
                    f.jqxListBox("focus");
                    this.removeHandler(f, "keyup");
                    this.addHandler(f, "keyup", function(c) {
                        if (c.keyCode === 13) {
                            l.trigger("click")
                        }
                        if (c.keyCode === 27) {
                            s._closemenu()
                        }
                    });
                    if (E.cellsformat) {
                        f.jqxListBox({
                            checkboxes: L,
                            displayMember: E.displayfield,
                            valueMember: E.displayfield + "JQValue",
                            source: v
                        })
                    } else {
                        f.jqxListBox({
                            checkboxes: L,
                            displayMember: E.displayfield,
                            valueMember: E.displayfield,
                            source: v
                        })
                    }
                    if (L) {
                        f.jqxListBox("insertAt", {
                            label: s.gridlocalization.filterselectallstring
                        }, 0);
                        var F = f.data().jqxListBox.instance;
                        F.checkAll(false);
                        var B = this;
                        if (E.filter) {
                            F.uncheckAll(false);
                            var t = E.filter.getfilters();
                            for (var J = 0; J < F.items.length; J++) {
                                var G = F.items[J].value;
                                a.each(t, function() {
                                    if (this.condition == "NOT_EQUAL") {
                                        if (G != this.value) {
                                            F.uncheckIndex(J, false, false);
                                            return false
                                        } else {
                                            if (G != null && this.value != null && G.toString() != this.value.toString()) {
                                                F.uncheckIndex(J, false, false);
                                                return false
                                            }
                                        }
                                    } else {
                                        if (this.condition == "EQUAL") {
                                            if (G == this.value) {
                                                F.checkIndex(J, false, false);
                                                return false
                                            } else {
                                                if (G != null && this.value != null && G.toString() == this.value.toString()) {
                                                    F.checkIndex(J, false, false);
                                                    return false
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                            F._updateCheckedItems();
                            var q = F.getCheckedItems().length;
                            if (F.items.length != q && q > 0) {
                                F.host.jqxListBox("indeterminateIndex", 0, true, false)
                            }
                            if (q === F.items.length - 1) {
                                F.host.jqxListBox("checkIndex", 0, true, false)
                            }
                        }
                    } else {
                        if (E.filter) {
                            var F = f.data().jqxListBox.instance;
                            F.clearSelection();
                            var t = E.filter.getfilters();
                            for (var J = 0; J < F.items.length; J++) {
                                var G = F.items[J].value;
                                a.each(t, function() {
                                    if (this.condition == "NOT_EQUAL") {
                                        if (G != this.value) {
                                            F.unselectIndex(J, false, false);
                                            return false
                                        }
                                    } else {
                                        if (this.condition == "EQUAL") {
                                            if (G == this.value) {
                                                F.selectIndex(J, true, false);
                                                return false
                                            }
                                        }
                                    }
                                })
                            }
                            F._renderItems()
                        }
                    }
                }
            }
        },
        _initfilterpanel: function(z, b, c, p, w) {
            if (z == null || z == undefined) {
                z = this
            }
            b[0].innerHTML = "";
            var t = a("<div class='filter' style='position: absolute; bottom: 3px; margin-left: 3px;'></div>");
            b.append(t);
            var n = a("<div class='filter showwhere' style='height: 18px; margin-top: 3px; margin-bottom: 3px;'></div>");
            n.text(z.gridlocalization.filtershowrowstring);
            this._showwhere = n;
            var o = w ? "ex" : "";
            var v = a("<div class='filter filter1' id='filter1" + z.element.id + o + "'></div>");
            var h = a("<div class='filter filter2' id='filter2" + z.element.id + o + "' style='margin-top: 3px; margin-bottom: 3px;'></div>");
            var s = a("<div class='filter filter3' id='filter3" + z.element.id + o + "'></div>");
            var e = z._getcolumntypebydatafield(c);
            if (!v.jqxDropDownList) {
                throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");
                return
            }
            var q = z._getfiltersbytype(e);
            this._hasdatefilter = false;
            this._filterpanelwidth = p;
            if (this.columns && this.columns.records) {
                for (var u = 0; u < this.columns.records.length; u++) {
                    if (this.columns.records[u].filtertype == "date") {
                        this._hasdatefilter = true;
                        break
                    }
                }
            } else {
                if (this.columns && !this.columns.records) {
                    for (var u = 0; u < this.columns.length; u++) {
                        if (this.columns[u].filtertype == "date") {
                            this._hasdatefilter = true;
                            break
                        }
                    }
                }
            }
            var k = a("<div style='margin-top:3px;' class='filter'><input autocomplete='off' class='filtertext1" + z.element.id + "' style='padding: 3px; height: 17px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>");
            var m = k.find("input");
            m.addClass(this.toThemeProperty("jqx-input"));
            m.addClass(this.toThemeProperty("jqx-filter-input jqx-widget-content"));
            m.addClass(this.toThemeProperty("jqx-rc-all"));
            m.width(p - 18);
            var l = a("<div style='margin-top:3px;' class='filter'><input autocomplete='off' class='filtertext2" + z.element.id + "' style='padding: 3px; height: 17px; margin-top: 3px;' type='text'></input></div>");
            var j = l.find("input");
            j.addClass(this.toThemeProperty("jqx-input"));
            j.addClass(this.toThemeProperty("jqx-filter-input jqx-widget-content"));
            j.addClass(this.toThemeProperty("jqx-rc-all"));
            j.width(p - 18);
            if (z.rtl) {
                m.css("direction", "rtl");
                j.css("direction", "rtl")
            }
            var g = a("<div class='filter' style='height: 35px; text-align:center; margin-top: 15px; margin-left:-2px;'></div>");
            var f = a('<span tabIndex=0 id="filterbutton' + z.element.id + '" class="primary filterbutton" style="padding: 6px 15px;">' + z.gridlocalization.filterstring + "</span>");
            g.append(f);
            var x = a('<span tabIndex=0 id="filterclearbutton' + z.element.id + '" class="secondary filterclearbutton" style="position: relative; left: 1px; padding: 6px 15px; margin-left: 7px;">' + z.gridlocalization.filterclearstring + "</span>");
            g.append(x);
            f.jqxButton({
                height: this.filterMenuItemsHeight,
                theme: z.theme
            });
            x.jqxButton({
                height: this.filterMenuItemsHeight,
                theme: z.theme
            });
            var y = function(A) {
                if (A) {
                    if (A.text().indexOf("case sensitive") != -1) {
                        var i = A.text();
                        i = i.replace("case sensitive", "match case");
                        A.text(i)
                    }
                    A.css("font-family", z.host.css("font-family"));
                    A.css("font-size", z.host.css("font-size"));
                    A.css("top", "2px");
                    A.css("position", "relative");
                    return A
                }
                return ""
            };
            if (this.filtermode === "default" && !w) {
                t.append(n);
                t.append(v);
                v.jqxDropDownList({
                    _checkForHiddenParent: false,
                    autoItemsHeight: true,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    selectedIndex: 2,
                    width: p - 10,
                    height: 24,
                    dropDownHeight: 150,
                    dropDownWidth: p - 10,
                    selectionRenderer: y,
                    source: q,
                    theme: z.theme
                });
                t.append(k);
                var r = new Array();
                r[0] = z.gridlocalization.filterandconditionstring;
                r[1] = z.gridlocalization.filterorconditionstring;
                h.jqxDropDownList({
                    _checkForHiddenParent: false,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    autoDropDownHeight: true,
                    selectedIndex: 0,
                    width: 60,
                    height: 24,
                    source: r,
                    selectionRenderer: y,
                    theme: z.theme
                });
                t.append(h);
                s.jqxDropDownList({
                    _checkForHiddenParent: false,
                    autoItemsHeight: true,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    selectedIndex: 2,
                    width: p - 10,
                    height: 24,
                    dropDownHeight: 150,
                    dropDownWidth: p - 10,
                    selectionRenderer: y,
                    source: q,
                    theme: z.theme
                });
                t.append(s);
                t.append(l)
            } else {
                if (this.filtermode === "excel" || w) {
                    t.append(n);
                    t.append(v);
                    v.attr("tabindex", 0);
                    v.jqxListBox({
                        rtl: z.rtl,
                        _checkForHiddenParent: false,
                        checkboxes: true,
                        selectedIndex: 2,
                        width: p - 10,
                        height: 130,
                        theme: z.theme
                    });
                    var d = true;
                    z.addHandler(v, "checkChange", function(B) {
                        if (!d) {
                            return
                        }
                        if (B.args.label != z.gridlocalization.filterselectallstring) {
                            d = false;
                            v.jqxListBox("checkIndex", 0, true, false);
                            var i = v.jqxListBox("getCheckedItems");
                            var A = v.jqxListBox("getItems");
                            if (i.length == 1) {
                                v.jqxListBox("uncheckIndex", 0, true, false)
                            } else {
                                if (A.length != i.length) {
                                    v.jqxListBox("indeterminateIndex", 0, true, false)
                                }
                            }
                            d = true
                        } else {
                            d = false;
                            if (B.args.checked) {
                                v.jqxListBox("checkAll", false)
                            } else {
                                v.jqxListBox("uncheckAll", false)
                            }
                            d = true
                        }
                    })
                }
            }
            t.append(g);
            if (z.updatefilterpanel) {
                z.updatefilterpanel(v, s, h, k, l, f, x, null, null, q)
            }
        }
    })
})(jqxBaseFramework);
(function(a) {
    a.extend(a.jqx._jqxGrid.prototype, {
        _updatefilterrowui: function(f) {
            var m = this.columns.records.length;
            var e = 0;
            var l = this;
            if (!this.filterrow) {
                return
            }
            for (var i = 0; i < m; i++) {
                var g = this.columns.records[i];
                var c = parseInt(g.width);
                if (c < g.minwidth) {
                    c = g.minwidth
                }
                if (c > g.maxwidth) {
                    c = g.maxwidth
                }
                var k = a(this.filterrow[0].cells[i]);
                k.css("left", e);
                var h = true;
                if (k.width() == c) {
                    h = false
                }
                if (f) {
                    h = true
                }
                k.width(c);
                k[0].left = e;
                if (g.element) {
                    k[0].style.width = g.element.style.width;
                    k[0].style.left = g.element.style.left
                }
                if (!(g.hidden && g.hideable)) {
                    e += c
                } else {
                    k.css("display", "none")
                }
                if (!h) {
                    continue
                }
                if (g.createfilterwidget && g.filtertype == "custom") {
                    g.createfilterwidget(g, k)
                } else {
                    if (g.filterable) {
                        var d = function(n, o) {
                            var j = a(o.children()[0]);
                            if (j[0]) {
                                j[0].style.width = (c - 8) + "px";
                                if (a.jqx.browser.msie) {
                                    j[0].style.width = (c - 16) + "px"
                                }
                            }
                            j.attr("disabled", n.disabled)
                        };
                        switch (g.filtertype) {
                            case "number":
                            case "input":
                                a(k.children()[0]).width(c);
                                k.find("input")[0].style.width = (c - 30) + "px";
                                if (a.jqx.browser.msie) {
                                    k.find("input")[0].style.width = (c - 36) + "px"
                                }
                                k.find("input").attr("disabled", l.disabled);
                                a(k.find(".jqx-dropdownlist-state-normal")).jqxDropDownList({
                                    theme: l.theme,
                                    disabled: l.disabled
                                });
                                break;
                            case "date":
                            case "range":
                                if (this.host.jqxDateTimeInput) {
                                    a(k.children()[0]).jqxDateTimeInput({
                                        theme: l.theme,
                                        disabled: l.disabled,
                                        width: c - 10
                                    })
                                } else {
                                    d(this, k)
                                }
                                break;
                            case "textbox":
                            case "default":
                                d(this, k);
                                break;
                            case "list":
                            case "checkedlist":
                                if (this.host.jqxDropDownList) {
                                    a(k.children()[0]).jqxDropDownList({
                                        theme: l.theme,
                                        disabled: l.disabled,
                                        width: c - 10
                                    })
                                } else {
                                    d(this, k)
                                }
                                break;
                            case "bool":
                            case "boolean":
                                if (!this.host.jqxCheckBox) {
                                    d(this, k)
                                } else {
                                    a(k.children()[0]).jqxCheckBox({
                                        theme: l.theme,
                                        disabled: l.disabled
                                    })
                                }
                                break
                        }
                    }
                }
            }
            var b = a(this.filterrow.children()[0]);
            b.width(parseInt(e) + 2);
            b.height(this.filterrowheight)
        },
        clearfilterrow: function(d) {
            this._disablefilterrow = true;
            if (!this.columns.records) {
                return
            }
            var m = this.columns.records.length;
            var e = 0;
            for (var i = 0; i < m; i++) {
                var f = this.columns.records[i];
                var l = a(this.filterrow[0].cells[i]);
                if (typeof d == "string") {
                    if (f.displayfield != d) {
                        continue
                    }
                }
                if (f.filterable) {
                    var c = function(o, p) {
                        var j = a(p.children()[0]);
                        j.val("");
                        if (j[0]) {
                            o["_oldWriteText" + j[0].id] = ""
                        }
                    };
                    switch (f.filtertype) {
                        case "number":
                        case "input":
                            l.find("input").val("");
                            if (this.host.jqxDropDownList) {
                                var k = a(a(a(l).children()[0]).children()[1]);
                                k.jqxDropDownList("clearSelection");
                                var g = 0;
                                if (g == 0) {
                                    var b = this._getfiltersbytype(f.filtertype == "number" ? "number" : "string");
                                    var n = new a.jqx.filter();
                                    var h = n.getoperatorsbyfiltertype(f.filtertype == "number" ? "numberfilter" : "stringfilter");
                                    if (f.filtercondition != null) {
                                        g = h.indexOf(f.filtercondition.toUpperCase());
                                        if (g == -1) {
                                            g = f.filtertype == "number" ? 0 : 2
                                        }
                                    } else {
                                        g = f.filtertype == "number" ? 0 : 2
                                    }
                                }
                                k.jqxDropDownList({
                                    selectedIndex: g
                                });
                                k.jqxDropDownList("ensureVisible", g)
                            }
                            break;
                        case "date":
                        case "range":
                            if (this.host.jqxDateTimeInput) {
                                a(l.children()[0]).jqxDateTimeInput("setDate", null)
                            } else {
                                c(this, l)
                            }
                            break;
                        case "textbox":
                        case "default":
                            c(this, l);
                            break;
                        case "list":
                            if (this.host.jqxDropDownList) {
                                a(l.children()[0]).jqxDropDownList("clearSelection")
                            } else {
                                c(this, l)
                            }
                            break;
                        case "checkedlist":
                            if (this.host.jqxDropDownList) {
                                a(l.children()[0]).jqxDropDownList("checkAll", false)
                            } else {
                                c(this, l)
                            }
                            break;
                        case "bool":
                        case "boolean":
                            if (!this.host.jqxCheckBox) {
                                c(this, l)
                            } else {
                                a(l.children()[0]).jqxCheckBox({
                                    checked: null
                                })
                            }
                            break
                    }
                }
            }
            this._disablefilterrow = false
        },
        _applyfilterfromfilterrow: function() {
            if (this._disablefilterrow == true) {
                return
            }
            if (this.disabled) {
                return
            }
            var B = this.columns.records.length;
            var F = this.that;
            for (var v = 0; v < B; v++) {
                var l = new a.jqx.filter();
                var w = this.columns.records[v];
                if (!w.filterable) {
                    continue
                }
                if (w.datafield === null) {
                    continue
                }
                var f = F._getcolumntypebydatafield(w);
                var d = F._getfiltertype(f);
                var m = 1;
                var G = true;
                var e = w.filtertype;
                var D = function(j, N, K) {
                    var i = true;
                    if (j._filterwidget) {
                        var I = j._filterwidget.val();
                        if (I != "") {
                            var L = "equal";
                            if (N == "stringfilter") {
                                var L = "contains"
                            }
                            if (N == "numericfilter") {
                                if (F.gridlocalization.decimalseparator == ",") {
                                    if (I.indexOf(F.gridlocalization.decimalseparator) >= 0) {
                                        I = I.replace(F.gridlocalization.decimalseparator, ".")
                                    }
                                }
                            }
                            if (N != "stringfilter") {
                                var M = 0;
                                if (I.indexOf(">") != -1) {
                                    L = "greater_than";
                                    M = 1
                                }
                                if (I.indexOf("<") != -1) {
                                    L = "less_than";
                                    M = 1
                                }
                                if (I.indexOf("=") != -1) {
                                    if (L == "greater_than") {
                                        L = "greater_than_or_equal";
                                        M = 2
                                    } else {
                                        if (L == "less_than") {
                                            L = "less_than_or_equal";
                                            M = 2
                                        } else {
                                            L = "equal";
                                            M = 1
                                        }
                                    }
                                }
                                if (M != 0) {
                                    I = I.substring(M);
                                    if (I.length < 1) {
                                        return false
                                    }
                                }
                            }
                            if (j.filtercondition != undefined) {
                                L = j.filtercondition
                            }
                            if (N == "datefilter") {
                                var J = K.createfilter(N, I, L, null, j.cellsformat, F.gridlocalization)
                            } else {
                                var J = K.createfilter(N, I, L)
                            }
                            K.addfilter(m, J)
                        } else {
                            i = false
                        }
                    }
                    return i
                };
                switch (w.filtertype) {
                    case "range":
                    case "date":
                        if (w._filterwidget.jqxDateTimeInput) {
                            if (w.filtertype == "range") {
                                var r = w._filterwidget.jqxDateTimeInput("getRange");
                                if (r != null && r.from != null && r.to != null) {
                                    var q = "GREATER_THAN_OR_EQUAL";
                                    var t = new Date(0);
                                    t.setHours(0);
                                    t.setMinutes(0);
                                    t.setFullYear(r.from.getFullYear(), r.from.getMonth(), r.from.getDate());
                                    var s = new Date(0);
                                    s.setHours(0);
                                    s.setMinutes(0);
                                    s.setFullYear(r.to.getFullYear(), r.to.getMonth(), r.to.getDate());
                                    s.setHours(r.to.getHours());
                                    s.setMinutes(r.to.getMinutes());
                                    s.setSeconds(r.to.getSeconds());
                                    var A = l.createfilter(d, t, q);
                                    l.addfilter(0, A);
                                    var c = "LESS_THAN_OR_EQUAL";
                                    var z = l.createfilter(d, s, c);
                                    l.addfilter(0, z)
                                } else {
                                    G = false
                                }
                            } else {
                                var r = w._filterwidget.jqxDateTimeInput("getDate");
                                if (r != null) {
                                    var t = new Date(0);
                                    t.setHours(0);
                                    t.setMinutes(0);
                                    t.setFullYear(r.getFullYear(), r.getMonth(), r.getDate());
                                    var h = w._filterwidget.jqxDateTimeInput("showTimeButton");
                                    if (h) {
                                        t.setHours(r.getHours());
                                        t.setMinutes(r.getMinutes())
                                    }
                                    var q = "EQUAL";
                                    if (w.filtercondition != undefined) {
                                        q = w.filtercondition
                                    }
                                    var A = l.createfilter(d, t, q);
                                    if (h) {
                                        A = l.createfilter(d, t, q, null, w.cellsformat)
                                    }
                                    l.addfilter(0, A)
                                } else {
                                    G = false
                                }
                            }
                        } else {
                            G = D(w, d, l)
                        }
                        break;
                    case "input":
                        if (w._filterwidget) {
                            var r = w._filterwidget.find("input").val();
                            var k = w._filterwidget.find(".filter").jqxDropDownList("selectedIndex");
                            var y = l.getoperatorsbyfiltertype(d)[k];
                            if (F.updatefilterconditions) {
                                var H = F.updatefilterconditions(d, l.getoperatorsbyfiltertype(d));
                                if (H != undefined) {
                                    l.setoperatorsbyfiltertype(d, H)
                                }
                                var y = l.getoperatorsbyfiltertype(d)[k]
                            }
                            var p = y == "NULL" || y == "NOT_NULL";
                            var u = y == "EMPTY" || y == "NOT_EMPTY";
                            if (r != undefined && r.length > 0 || p || u) {
                                A = l.createfilter(d, r, y, null, w.cellsformat, F.gridlocalization);
                                l.addfilter(0, A)
                            } else {
                                G = false
                            }
                        } else {
                            G = false
                        }
                        break;
                    case "number":
                        if (w._filterwidget) {
                            var r = w._filterwidget.find("input").val();
                            if (F.gridlocalization.decimalseparator == ",") {
                                if (r.indexOf(F.gridlocalization.decimalseparator) >= 0) {
                                    r = r.replace(F.gridlocalization.decimalseparator, ".")
                                }
                            }
                            var k = w._filterwidget.find(".filter").jqxDropDownList("selectedIndex");
                            var y = l.getoperatorsbyfiltertype(d)[k];
                            if (F.updatefilterconditions) {
                                var H = F.updatefilterconditions(d, l.getoperatorsbyfiltertype(d));
                                if (H != undefined) {
                                    l.setoperatorsbyfiltertype(d, H)
                                }
                                var y = l.getoperatorsbyfiltertype(d)[k]
                            }
                            var p = y == "NULL" || y == "NOT_NULL";
                            var u = y == "EMPTY" || y == "NOT_EMPTY";
                            if (r != undefined && r.length > 0 || p || u) {
                                A = l.createfilter(d, new Number(r), y, null, w.cellsformat, F.gridlocalization);
                                l.addfilter(0, A)
                            } else {
                                G = false
                            }
                        } else {
                            G = false
                        }
                        break;
                    case "textbox":
                    case "default":
                        G = D(w, d, l);
                        break;
                    case "bool":
                    case "boolean":
                        if (w._filterwidget.jqxCheckBox) {
                            var r = w._filterwidget.jqxCheckBox("checked");
                            if (r != null) {
                                var q = "equal";
                                var o = l.createfilter(d, r, q);
                                l.addfilter(m, o)
                            } else {
                                G = false
                            }
                        } else {
                            G = D(w, d, l)
                        }
                        break;
                    case "list":
                        var g = w._filterwidget.jqxDropDownList("listBox");
                        if (g.selectedIndex >= 0) {
                            var b = g.getSelectedItem();
                            var r = b.label;
                            var n = this.gridlocalization.filterchoosestring;
                            if (r !== "Please Choose:" && r !== n) {
                                var C = b.value;
                                var q = "equal";
                                if (r === "") {
                                    q = "NULL"
                                }
                                var o = l.createfilter(d, r, q);
                                l.addfilter(m, o);
                                if (C !== r) {
                                    o.data = C
                                }
                            }
                        } else {
                            G = false
                        }
                        break;
                    case "checkedlist":
                        if (w._filterwidget.jqxDropDownList) {
                            var g = w._filterwidget.jqxDropDownList("listBox");
                            var E = g.getCheckedItems();
                            if (E.length == 0) {
                                for (var x = 1; x < g.items.length; x++) {
                                    var r = g.items[x].label;
                                    var C = g.items[x].value;
                                    var q = "not_equal";
                                    if (r === "") {
                                        q = "NOT_NULL"
                                    }
                                    var o = l.createfilter(d, r, q);
                                    if (C !== r) {
                                        o.data = C
                                    }
                                    l.addfilter(0, o)
                                }
                                G = true
                            } else {
                                if (E.length != g.items.length) {
                                    for (var x = 0; x < E.length; x++) {
                                        var r = E[x].label;
                                        var C = E[x].value;
                                        var q = "equal";
                                        if (r === "") {
                                            q = "NULL"
                                        }
                                        var o = l.createfilter(d, r, q);
                                        if (C !== r) {
                                            o.data = C
                                        }
                                        l.addfilter(m, o)
                                    }
                                } else {
                                    G = false
                                }
                            }
                        } else {
                            G = D(w, d, l)
                        }
                        break
                }
                if (!this._loading) {
                    if (G) {
                        this.addfilter(w.displayfield, l, false)
                    } else {
                        this.removefilter(w.displayfield, false)
                    }
                }
            }
            if (!this._loading) {
                this.applyfilters("filterrow")
            }
        },
        _updatefilterrow: function() {
            var b = a('<div style="position: relative;" id="row00' + this.element.id + '"></div>');
            var f = 0;
            var o = this.columns.records.length;
            var m = this.toThemeProperty("jqx-grid-cell");
            m += " " + this.toThemeProperty("jqx-grid-cell-pinned");
            m += " " + this.toThemeProperty("jqx-grid-cell-filter-row");
            var r = o + 10;
            var s = new Array();
            var n = this.that;
            this.filterrow[0].cells = s;
            b.height(this.filterrowheight);
            this.filterrow.children().detach();
            this.filterrow.append(b);
            if (!this._filterrowcache) {
                this._filterrowcache = new Array()
            }
            this._initcolumntypes();
            var g = false;
            var d = new Array();
            var q = document.createDocumentFragment();
            for (var h = 0; h < o; h++) {
                var e = this.columns.records[h];
                var c = e.width;
                if (c < e.minwidth) {
                    c = e.minwidth
                }
                if (c > e.maxwidth) {
                    c = e.maxwidth
                }
                var l = document.createElement("div");
                l.style.overflow = "hidden";
                l.style.position = "absolute";
                l.style.height = "100%";
                l.className = m;
                l = a(l);
                q.appendChild(l[0]);
                l[0].style.left = f + "px";
                if (this.rtl) {
                    l.css("z-index", r++);
                    l.css("border-left-width", "1px")
                } else {
                    l.css("z-index", r--)
                }
                if (c == "auto") {
                    c = 0
                }
                l[0].style.width = parseFloat(c) + "px";
                l[0].left = f;
                if (!(e.hidden && e.hideable)) {
                    f += c
                } else {
                    l.css("display", "none")
                }
                s[s.length] = l[0];
                var k = true;
                if (!this.rtl) {
                    if (this.groupable) {
                        var p = (this.showrowdetailscolumn && this.rowdetails) ? 1 : 0;
                        if (this.groups.length + p > h) {
                            k = false
                        }
                    }
                    if (this.showrowdetailscolumn && this.rowdetails && h == 0) {
                        k = false
                    }
                } else {
                    if (this.groupable) {
                        var p = (this.showrowdetailscolumn && this.rowdetails) ? 1 : 0;
                        if (this.groups.length + p + h > o - 1) {
                            k = false
                        }
                    }
                    if (this.showrowdetailscolumn && this.rowdetails && h == o - 1) {
                        k = false
                    }
                }
                if (k) {
                    if (e.filtertype == "custom" && e.createfilterwidget) {
                        var i = function() {
                            n._applyfilterfromfilterrow()
                        };
                        e.createfilterwidget(e, l, i)
                    } else {
                        if (e.filterable) {
                            if (this._filterrowcache[e.datafield]) {
                                g = true;
                                l.append(this._filterrowcache[e.datafield]);
                                e._filterwidget = this._filterrowcache[e.datafield]
                            } else {
                                this._addfilterwidget(e, l, c);
                                d[e.datafield] = e._filterwidget
                            }
                        }
                    }
                }
            }
            b[0].appendChild(q);
            this._filterrowcache = d;
            if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
                b.css("z-index", r--)
            }
            b.width(parseFloat(f) + 2);
            this.filterrow.addClass(m);
            this.filterrow.css("border-top-width", "1px");
            this.filterrow.css("border-right-width", "0px");
            if (g) {
                this._updatefilterrowui(true)
            }
        },
        _addfilterwidget: function(D, d, B) {
            var I = this.that;
            var s = this;
            var A = "";
            var F = "";
            for (var G = 0; G < I.dataview.filters.length; G++) {
                var y = I.dataview.filters[G];
                if (y.datafield && y.datafield == D.datafield) {
                    var G = y.filter.getfilters()[0];
                    A = G.value;
                    if (D.filtertype === "range") {
                        A = {
                            from: A,
                            to: y.filter.getfilters()[1].value
                        }
                    }
                    F = G.condition;
                    D.filtercondition = F;
                    break
                }
            }
            var g = function(J, K) {
                var f = a('<input autocomplete="off" type="textarea"/>');
                f.attr("tabindex", 5 + D.visibleindex);
                f[0].id = a.jqx.utilities.createId();
                f.addClass(J.toThemeProperty("jqx-widget"));
                f.addClass(J.toThemeProperty("jqx-filter-input jqx-input jqx-input-widget"));
                f.addClass(J.toThemeProperty("jqx-rc-all"));
                f.addClass(J.toThemeProperty("jqx-widget-content"));
                if (J.rtl) {
                    f.css("direction", "rtl")
                }
                if (J.disabled) {
                    f.attr("disabled", true)
                }
                f.attr("disabled", false);
                f.appendTo(K);
                f.css("margin", "4px");
                f.width(B - 8);
                f.height(J.filterrowheight - 9);
                if (D.createfilterwidget) {
                    D.createfilterwidget(D, K, f)
                }
                D._filterwidget = f;
                f.focus(function() {
                    J.content[0].scrollLeft = 0;
                    setTimeout(function() {
                        J.content[0].scrollLeft = 0
                    }, 10);
                    J.focusedfilter = f;
                    f.addClass(J.toThemeProperty("jqx-fill-state-focus"));
                    return false
                });
                f.blur(function() {
                    f.removeClass(J.toThemeProperty("jqx-fill-state-focus"))
                });
                f.keydown(function(L) {
                    if (L.keyCode == "13") {
                        J._applyfilterfromfilterrow()
                    }
                    if (f[0]._writeTimer) {
                        clearTimeout(f[0]._writeTimer)
                    }
                    f[0]._writeTimer = setTimeout(function() {
                        if (!J._loading) {
                            if (!J["_oldWriteText" + f[0].id]) {
                                J["_oldWriteText" + f[0].id] = ""
                            }
                            if (J["_oldWriteText" + f[0].id].length > 0 && J["_oldWriteText" + f[0].id] != f.val()) {
                                J._applyfilterfromfilterrow();
                                J["_oldWriteText" + f[0].id] = f.val()
                            } else {
                                if (J["_oldWriteText" + f[0].id].length == 0) {
                                    J._applyfilterfromfilterrow();
                                    J["_oldWriteText" + f[0].id] = f.val()
                                }
                            }
                        }
                    }, D.filterdelay);
                    J.focusedfilter = f
                });
                J.host.removeClass("jqx-disableselect");
                J.content.removeClass("jqx-disableselect");
                f.val(A)
            };
            if (D.datatype != null) {
                if (D.filtertype == "number") {
                    if (D.datatype == "string" || D.datatype == "date" || D.datatype == "bool") {
                        D.filtertype = "textbox"
                    }
                }
                if (D.filtertype == "date") {
                    if (D.datatype == "string" || D.datatype == "number" || D.datatype == "bool") {
                        D.filtertype = "textbox"
                    }
                }
                if (D.filtertype == "bool") {
                    if (D.datatype == "string" || D.datatype == "number" || D.datatype == "date") {
                        D.filtertype = "textbox"
                    }
                }
            }
            switch (D.filtertype) {
                case "number":
                case "input":
                    var m = a("<div></div>");
                    m.width(d.width());
                    m.height(this.filterrowheight);
                    d.append(m);
                    var B = d.width() - 21;
                    var t = function(K, L, f) {
                        var J = a('<input style="float: left;" autocomplete="off" type="textarea"/>');
                        if (I.rtl) {
                            J.css("float", "right");
                            J.css("direction", "rtl")
                        }
                        J.attr("tabindex", 5 + D.visibleindex);
                        J[0].id = a.jqx.utilities.createId();
                        J.addClass(I.toThemeProperty("jqx-widget jqx-input jqx-rc-all jqx-input-widget jqx-filter-input jqx-widget-content"));
                        J.appendTo(K);
                        J.width(L - 10);
                        if (I.disabled) {
                            J.attr("disabled", true)
                        }
                        J.attr("disabled", false);
                        J[0].style.height = I.filterrowheight - 9 + "px";
                        J.css("margin", "4px");
                        J.css("margin-right", "3px");
                        J.focus(function() {
                            I.focusedfilter = J;
                            J.addClass(I.toThemeProperty("jqx-fill-state-focus"))
                        });
                        J.blur(function() {
                            J.removeClass(I.toThemeProperty("jqx-fill-state-focus"))
                        });
                        J.keydown(function(M) {
                            if (M.keyCode == "13") {
                                I._applyfilterfromfilterrow()
                            }
                            if (M.keyCode == "9") {
                                return
                            }
                            if (J[0]._writeTimer) {
                                clearTimeout(J[0]._writeTimer)
                            }
                            J[0]._writeTimer = setTimeout(function() {
                                if (!I._loading) {
                                    if (I["_oldWriteText" + J[0].id] != J.val()) {
                                        I._applyfilterfromfilterrow();
                                        I["_oldWriteText" + J[0].id] = J.val()
                                    }
                                }
                            }, D.filterdelay);
                            I.focusedfilter = J
                        });
                        J.val(A);
                        return J
                    };
                    t(m, B);
                    var C = I._getfiltersbytype(D.filtertype == "number" ? "number" : "string");
                    var u = a("<div class='filter' style='float: left;'></div>");
                    u.css("margin-top", "4px");
                    u.appendTo(m);
                    if (I.rtl) {
                        u.css("float", "right")
                    }
                    var h = 0;
                    if (D.filtercondition != null) {
                        var G = new a.jqx.filter();
                        var r = G.getoperatorsbyfiltertype(D.filtertype == "number" ? "numericfilter" : "stringfilter");
                        var e = r.indexOf(D.filtercondition.toUpperCase());
                        if (e != -1) {
                            h = e
                        }
                    }
                    var E = 180;
                    if (D.filtertype == "input") {
                        E = 240;
                        if (h == 0) {
                            var e = C.indexOf("contains") || 2;
                            if (e != -1 && D.filtercondition == null) {
                                h = e
                            } else {
                                h = -1
                            }
                        }
                    }
                    u.jqxDropDownList({
                        disabled: I.disabled,
                        touchMode: I.touchmode,
                        rtl: I.rtl,
                        dropDownHorizontalAlignment: "right",
                        enableBrowserBoundsDetection: true,
                        selectedIndex: h,
                        width: 20,
                        height: 27,
                        dropDownHeight: 150,
                        dropDownWidth: E,
                        source: C,
                        theme: I.theme
                    });
                    u.jqxDropDownList({
                        selectionRenderer: function(f) {
                            return ""
                        }
                    });
                    u.attr("tabindex", 5 + D.visibleindex);
                    u.jqxDropDownList("setContent", "");
                    u.find(".jqx-dropdownlist-content").hide();
                    if (D.createfilterwidget) {
                        D.createfilterwidget(D, d, m)
                    }
                    D._filterwidget = m;
                    var j = null;
                    this.addHandler(u, "open", function() {
                        s._activeFilterElement = u
                    });
                    this.addHandler(u, "select", function() {
                        var f = u.jqxDropDownList("getSelectedItem").label;
                        if (D._filterwidget.find("input").val().length > 0 && !I.refreshingfilter) {
                            I._applyfilterfromfilterrow()
                        }
                        if (D.filtertype == "input" && !I.refreshingfilter) {
                            I._applyfilterfromfilterrow()
                        } else {
                            if (D._filterwidget.find("input").val().length == 0 && !I.refreshingfilter) {
                                if (j == "null" || j == "not null" || f == "null" || f == "not null") {
                                    I._applyfilterfromfilterrow()
                                }
                            }
                        }
                        j = f
                    });
                    break;
                case "textbox":
                case "default":
                default:
                    g(this, d);
                    break;
                case "none":
                    break;
                case "date":
                case "range":
                    if (this.host.jqxDateTimeInput) {
                        var b = a("<div></div>");
                        b.css("margin", "4px");
                        b.css("margin-left", "5px");
                        b.appendTo(d);
                        var n = {
                            calendar: this.gridlocalization,
                            todayString: this.gridlocalization.todaystring,
                            clearString: this.gridlocalization.clearstring
                        };
                        b.jqxDateTimeInput({
                            firstDayOfWeek: this.gridlocalization.firstDay,
                            readonly: true,
                            disabled: I.disabled,
                            localization: n,
                            rtl: I.rtl,
                            showFooter: true,
                            formatString: D.cellsformat,
                            selectionMode: D.filtertype,
                            value: null,
                            theme: this.theme,
                            width: B - 9,
                            height: this.filterrowheight - 9
                        });
                        if (D.createfilterwidget) {
                            D.createfilterwidget(D, d, b)
                        }
                        if (A && A.from) {
                            b.jqxDateTimeInput("setRange", A.from, A.to)
                        } else {
                            if (A && A.toString().length > 1) {
                                b.val(A)
                            }
                        }
                        b.find("input").attr("tabindex", 5 + D.visibleindex);
                        D._filterwidget = b;
                        this.addHandler(b, "valueChanged", function(f) {
                            if (!I.refreshingfilter) {
                                I._applyfilterfromfilterrow();
                                I.focusedfilter = null
                            }
                        })
                    } else {
                        g(this, d)
                    }
                    break;
                case "list":
                case "checkedlist":
                    if (this.host.jqxDropDownList) {
                        var q = this._getfilterdataadapter(D);
                        var l = false;
                        var u = a("<div></div>");
                        u.css("margin", "4px");
                        u.css("margin-left", "5px");
                        var v = D.datafield;
                        var w = D.filtertype == "checkedlist" ? true : false;
                        var E = B < 150 ? 220 : "auto";
                        q.dataBind();
                        var p = q.records;
                        var k = p.length < 8 ? true : false;
                        l = k;
                        u.appendTo(d);
                        u.jqxDropDownList({
                            hint: false,
                            placeHolder: I.gridlocalization.filterchoosestring,
                            disabled: I.disabled,
                            touchMode: I.touchmode,
                            rtl: I.rtl,
                            checkboxes: w,
                            dropDownWidth: E,
                            source: q.records,
                            autoDropDownHeight: k,
                            theme: this.theme,
                            width: B - 9,
                            height: this.filterrowheight - 9,
                            displayMember: D.displayfield,
                            valueMember: v
                        });
                        u.attr("tabindex", 5 + D.visibleindex);
                        u.attr("default-placeholder", true);
                        if (D.createfilterwidget) {
                            D.createfilterwidget(D, d, u)
                        }
                        this.addHandler(u, "open", function() {
                            s._activeFilterElement = u
                        });
                        var c = u.jqxDropDownList("listBox");
                        if (w) {
                            u.jqxDropDownList({
                                selectionRenderer: function() {
                                    var f = '<span class="' + I.toThemeProperty("jqx-item") + '" style="top: 4px; position: relative; color: inherit; border: none; background-color: transparent;">' + I.gridlocalization.filterselectstring + "</span>";
                                    return f
                                }
                            });
                            var z = a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + I.gridlocalization.filterselectstring + "</span>");
                            z.addClass(this.toThemeProperty("jqx-item"));
                            if (c != undefined) {
                                if (!l) {
                                    c.host.height(200)
                                }
                                c.insertAt({
                                    label: I.gridlocalization.filterselectallstring
                                }, 0);
                                u.jqxDropDownList("setContent", z);
                                var i = true;
                                var H = new Array();
                                c.checkAll(false);
                                I.addHandler(c.host, "checkChange", function(K) {
                                    u[0]._selectionChanged = true;
                                    if (!i) {
                                        return
                                    }
                                    if (K.args.label != I.gridlocalization.filterselectallstring) {
                                        i = false;
                                        c.host.jqxListBox("checkIndex", 0, true, false);
                                        var f = c.host.jqxListBox("getCheckedItems");
                                        var J = c.host.jqxListBox("getItems");
                                        if (f.length == 1) {
                                            c.host.jqxListBox("uncheckIndex", 0, true, false)
                                        } else {
                                            if (J.length != f.length) {
                                                c.host.jqxListBox("indeterminateIndex", 0, true, false)
                                            }
                                        }
                                        i = true
                                    } else {
                                        i = false;
                                        if (K.args.checked) {
                                            c.host.jqxListBox("checkAll", false)
                                        } else {
                                            c.host.jqxListBox("uncheckAll", false)
                                        }
                                        i = true
                                    }
                                })
                            }
                        } else {
                            c.insertAt({
                                label: this.gridlocalization.filterchoosestring,
                                value: ""
                            }, 0);
                            u.jqxDropDownList({
                                selectedIndex: 0
                            })
                        }
                        D._filterwidget = u;
                        var o = u.jqxDropDownList("dropdownlistWrapper");
                        if (D.filtertype == "list") {
                            this.addHandler(u, "select", function(f) {
                                if (!I.refreshingfilter) {
                                    if (f.args && f.args.type != "none") {
                                        I._applyfilterfromfilterrow();
                                        I.focusedfilter = null
                                    }
                                }
                            })
                        } else {
                            this.addHandler(u, "close", function(f) {
                                if (u[0]._selectionChanged) {
                                    I._applyfilterfromfilterrow();
                                    I.focusedfilter = null;
                                    u[0]._selectionChanged = false
                                }
                            })
                        }
                    } else {
                        g(this, d)
                    }
                    break;
                case "bool":
                case "boolean":
                    if (this.host.jqxCheckBox) {
                        var x = a('<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -9px; margin-left: -12px;"></div>');
                        x.appendTo(d);
                        x.jqxCheckBox({
                            disabled: I.disabled,
                            enableContainerClick: false,
                            animationShowDelay: 0,
                            animationHideDelay: 0,
                            hasThreeStates: true,
                            theme: this.theme,
                            checked: null
                        });
                        x.attr("tabindex", 5 + D.visibleindex);
                        if (D.createfilterwidget) {
                            D.createfilterwidget(D, d, x)
                        }
                        if (A === true || A == "true") {
                            x.jqxCheckBox({
                                checked: true
                            })
                        } else {
                            if (A === false || A == "false") {
                                x.jqxCheckBox({
                                    checked: false
                                })
                            }
                        }
                        D._filterwidget = x;
                        this.addHandler(x, "change", function(f) {
                            if (!I.refreshingfilter) {
                                if (f.args) {
                                    I.focusedfilter = null;
                                    I._applyfilterfromfilterrow()
                                }
                            }
                        })
                    } else {
                        g(this, d)
                    }
                    break
            }
        },
        _getfilterdataadapter: function(b) {
            var c = this.source._source ? true : false;
            if (!c) {
                var f = new a.jqx.dataAdapter(this.source, {
                    autoBind: false,
                    uniqueDataFields: [b.displayfield],
                    autoSort: true,
                    autoSortField: b.displayfield,
                    async: false
                })
            } else {
                var e = {
                    localdata: a.extend(true, {}, this.source.records),
                    datatype: this.source.datatype,
                    async: false
                };
                var d = this;
                var f = new a.jqx.dataAdapter(e, {
                    autoBind: false,
                    autoSort: true,
                    autoSortField: b.displayfield,
                    async: false,
                    uniqueDataFields: [b.displayfield],
                    beforeLoadComplete: function(g) {
                        var l = new Array();
                        if (b.cellsformat) {
                            var k = d._getcolumntypebydatafield(b);
                            for (var h = 0; h < g.length; h++) {
                                l.push(g[h]);
                                var j = g[h][b.displayfield];
                                g[h][b.displayfield + "JQValue"] = j;
                                if (k === "date") {
                                    if (j != null) {
                                        g[h][b.displayfield] = f.formatDate(j, b.cellsformat, d.gridlocalization)
                                    } else {
                                        g[h][b.displayfield] = ""
                                    }
                                } else {
                                    if (k === "number" || k === "float" || k === "int") {
                                        if (j != null) {
                                            g[h][b.displayfield] = f.formatNumber(j, b.cellsformat, d.gridlocalization)
                                        } else {
                                            g[h][b.displayfield] = ""
                                        }
                                    }
                                }
                            }
                            return l
                        } else {
                            return g
                        }
                    }
                })
            }
            if (b.filteritems && b.filteritems.length > 0) {
                var e = {
                    localdata: b.filteritems,
                    datatype: this.source.datatype,
                    async: false
                };
                var f = new a.jqx.dataAdapter(e, {
                    autoBind: false,
                    async: false
                })
            } else {
                if (b.filteritems) {
                    if (b.filteritems._source) {
                        b.filteritems._options.autoBind = false;
                        b.filteritems._options.async = false;
                        return b.filteritems
                    } else {
                        if (a.isFunction(b.filteritems)) {
                            return b.filteritems()
                        }
                    }
                }
            }
            return f
        },
        refreshfilterrow: function() {
            if (!this.showfilterrow) {
                return
            }
            this.refreshingfilter = true;
            this._updatefilterrowui();
            this._updatelistfilters(true, true);
            var h = this.that;
            var l = this.columns.records.length;
            for (var d = 0; d < l; d++) {
                var c = this.columns.records[d];
                if (c.filterable) {
                    if (c.filter) {
                        var b = c.filter.getfilters();
                        if (b.length > 0) {
                            var k = b[0].value;
                            var e = c._filterwidget;
                            var f = c._filterwidget.parent();
                            if (e != null) {
                                switch (c.filtertype) {
                                    case "number":
                                        f.find("input").val(k);
                                        if (this.host.jqxDropDownList) {
                                            var i = c.filter.getoperatorsbyfiltertype("numericfilter");
                                            e.find(".filter").jqxDropDownList("selectIndex", i.indexOf(b[0].condition))
                                        }
                                        break;
                                    case "input":
                                        f.find("input").val(k);
                                        if (this.host.jqxDropDownList) {
                                            var i = c.filter.getoperatorsbyfiltertype("stringfilter");
                                            e.find(".filter").jqxDropDownList("selectIndex", i.indexOf(b[0].condition))
                                        }
                                        break;
                                    case "date":
                                    case "range":
                                        if (this.host.jqxDateTimeInput) {
                                            var k = c.filter.getfilterat(0).filtervalue;
                                            if (k != undefined) {
                                                if (c.filter.getfilterat(1)) {
                                                    var g = c.filter.getfilterat(1).filtervalue
                                                } else {
                                                    g = k
                                                }
                                                if (c.filtertype == "range") {
                                                    a(f.children()[0]).jqxDateTimeInput("setRange", new Date(k), new Date(g))
                                                } else {
                                                    a(f.children()[0]).jqxDateTimeInput("setDate", new Date(k))
                                                }
                                            }
                                        } else {
                                            e.val(k)
                                        }
                                        break;
                                    case "textbox":
                                    case "default":
                                        e.val(k);
                                        h["_oldWriteText" + e[0].id] = k;
                                        break;
                                    case "bool":
                                    case "boolean":
                                        if (!this.host.jqxCheckBox) {
                                            e.val(k)
                                        } else {
                                            a(f.children()[0]).jqxCheckBox({
                                                checked: k
                                            })
                                        }
                                        break
                                }
                            }
                        }
                    }
                }
            }
            this.refreshingfilter = false
        },
        _destroyedfilters: function() {
            var g = this.that;
            var b = this.columns.records.length;
            for (var f = 0; f < b; f++) {
                var c = this.columns.records[f];
                if (c.filterable) {
                    var h = c._filterwidget;
                    if (c.filtertype == "list" || c.filtertype == "checkedlist") {
                        this.removeHandler(h, "select");
                        this.removeHandler(h, "close");
                        h.jqxDropDownList("destroy")
                    } else {
                        if (c.filtertype == "date" || c.filtertype == "range") {
                            this.removeHandler(h, "valueChanged");
                            h.jqxDateTimeInput("destroy")
                        } else {
                            if (c.filtertype == "bool") {
                                this.removeHandler(h, "change");
                                h.jqxCheckBox("destroy")
                            } else {
                                if (c.filtertype == "number" || c.filtertype === "input") {
                                    var d = h.find(".jqx-input");
                                    this.removeHandler(d, "keydown");
                                    var e = a(h.children()[1]);
                                    e.jqxDropDownList("destroy")
                                } else {
                                    this.removeHandler(h, "keydown")
                                }
                            }
                        }
                    }
                    h.remove()
                }
            }
        },
        _updatelistfilters: function(l, k) {
            var v = this.that;
            var t = this.columns.records.length;
            for (var p = 0; p < t; p++) {
                var q = this.columns.records[p];
                if (q.filterable) {
                    if (q.filtertype == "list" || q.filtertype == "checkedlist") {
                        var h = q._filterwidget;
                        if (!l) {
                            if (q.filter == undefined) {
                                h.jqxDropDownList("renderSelection");
                                continue
                            }
                        } else {
                            var e = this._getfilterdataadapter(q);
                            h.jqxDropDownList({
                                source: e
                            });
                            var d = h.jqxDropDownList("getItems");
                            var o = true;
                            if (d.length != e.records.length + 1) {
                                o = false
                            }
                            if (o) {
                                for (var s = 1; s < d.length; s++) {
                                    if (d[s].label != e.records[s - 1][q.displayfield]) {
                                        o = false;
                                        break
                                    }
                                }
                            }
                            if (o && !k) {
                                continue
                            }
                        }
                        var m = q.filtertype == "checkedlist" ? true : false;
                        var d = h.jqxDropDownList("getItems");
                        var b = h.jqxDropDownList("listBox");
                        h.jqxDropDownList("dataBind");
                        if (m) {
                            h.jqxDropDownList({
                                selectionRenderer: function() {
                                    return v.gridlocalization.filterselectstring
                                }
                            });
                            if (b.getItem(this.gridlocalization.filterselectallstring) == null) {
                                b.insertAt({
                                    label: this.gridlocalization.filterselectallstring
                                }, 0)
                            }
                            var n = a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + this.gridlocalization.filterselectstring + "</span>");
                            n.addClass(this.toThemeProperty("jqx-item"));
                            h.jqxDropDownList("setContent", n);
                            b.checkAll(false);
                            if (q.filter) {
                                var g = q.filter.getfilters();
                                for (var s = 0; s < b.items.length; s++) {
                                    var f = b.items[s].label;
                                    var r = undefined;
                                    a.each(g, function() {
                                        var i;
                                        if (this.condition == "NOT_EQUAL") {
                                            if (f == this.value) {
                                                i = false
                                            } else {
                                                i = true
                                            }
                                        } else {
                                            if (this.condition == "EQUAL") {
                                                if (f == this.value) {
                                                    i = true
                                                } else {
                                                    i = false
                                                }
                                            }
                                        }
                                        if (r == undefined && i !== undefined) {
                                            r = i
                                        } else {
                                            if (this.condition == "EQUAL") {
                                                r = r || i
                                            } else {
                                                r = r && i
                                            }
                                        }
                                    });
                                    if (r) {
                                        b.checkIndex(s, false, false)
                                    } else {
                                        b.uncheckIndex(s, false, false)
                                    }
                                }
                                b._updateCheckedItems();
                                var u = b.getCheckedItems().length;
                                if (b.items.length != u && u > 0) {
                                    b.host.jqxListBox("indeterminateIndex", 0, true, false)
                                }
                            }
                        } else {
                            if (b.getItem(this.gridlocalization.filterchoosestring) == null) {
                                if (b.items[0].label !== this.gridlocalization.filterchoosestring) {
                                    b.insertAt({
                                        label: this.gridlocalization.filterchoosestring,
                                        value: ""
                                    }, 0)
                                }
                            }
                            h.jqxDropDownList({
                                selectedIndex: 0
                            });
                            if (q.filter) {
                                var g = q.filter.getfilters();
                                var c = -1;
                                for (var s = 0; s < b.items.length; s++) {
                                    var f = b.items[s].label;
                                    a.each(g, function() {
                                        if (this.condition == "NOT_EQUAL") {
                                            return true
                                        }
                                        if (f == this.value) {
                                            c = s;
                                            return false
                                        }
                                    })
                                }
                                if (c != -1) {
                                    b.selectIndex(c)
                                }
                            }
                        }
                        if (d.length < 8) {
                            h.jqxDropDownList("autoDropDownHeight", true)
                        } else {
                            h.jqxDropDownList("autoDropDownHeight", false)
                        }
                    }
                }
            }
        },
        _renderfiltercolumn: function() {
            var b = this.that;
            if (this.filterable) {
                if (!this.columns.records) {
                    return
                }
                a.each(this.columns.records, function(d, e) {
                    var c = false;
                    if (b.autoshowfiltericon) {
                        if (this.filter) {
                            a(this.filtericon).show();
                            c = true
                        } else {
                            a(this.filtericon).hide()
                        }
                    } else {
                        if (this.filterable) {
                            a(this.filtericon).show();
                            c = true
                        }
                    }
                    this.element.removeAttribute("filter");
                    if (c) {
                        this.element.setAttribute("filter", true)
                    }
                    if (this.align == "right" && !this.renderer) {
                        if (this.element) {
                            if (!c) {
                                this.element.firstChild.firstChild.style.marginRight = "2px"
                            } else {
                                this.element.firstChild.firstChild.style.marginRight = "18px"
                            }
                        }
                    }
                })
            }
        },
        _initcolumntypes: function() {
            if (this.columns && this.columns.records) {
                var b = this.source._source.datafields;
                if (b) {
                    for (var c = 0; c < this.columns.records.length; c++) {
                        var d = this.columns.records[c];
                        if (d.datatype) {
                            continue
                        }
                        var e = "";
                        a.each(b, function() {
                            if (this.name == d.displayfield) {
                                if (this.type) {
                                    e = this.type
                                }
                                return false
                            }
                        });
                        if (e != "") {
                            d.datatype = e
                        } else {
                            d.datatype = ""
                        }
                    }
                }
            }
        },
        _getcolumntypebydatafield: function(f) {
            var g = this.that;
            var e = "string";
            var d = g.source.datafields || ((g.source._source) ? g.source._source.datafields : null);
            if (d) {
                var i = "";
                a.each(d, function() {
                    if (this.name == f.displayfield) {
                        if (this.type) {
                            i = this.type
                        }
                        return false
                    }
                });
                if (i) {
                    return i
                }
            }
            if (f != null) {
                if (this.dataview.cachedrecords == undefined) {
                    return e
                }
                var b = null;
                if (!this.virtualmode) {
                    if (this.dataview.cachedrecords.length == 0) {
                        return e
                    }
                    b = this.dataview.cachedrecords[0][f.displayfield];
                    if (b != null && b.toString() == "") {
                        return "string"
                    }
                } else {
                    a.each(this.dataview.cachedrecords, function() {
                        b = this[f.displayfield];
                        return false
                    })
                }
                if (b != null) {
                    if (typeof b == "boolean") {
                        e = "boolean"
                    } else {
                        if (a.jqx.dataFormat.isNumber(b)) {
                            e = "number"
                        } else {
                            var h = new Date(b);
                            if (h.toString() == "NaN" || h.toString() == "Invalid Date") {
                                if (a.jqx.dataFormat) {
                                    h = a.jqx.dataFormat.tryparsedate(b);
                                    if (h != null) {
                                        if (h && h.getFullYear()) {
                                            if (h.getFullYear() == 1970 && h.getMonth() == 0 && h.getDate() == 1) {
                                                var c = new Number(b);
                                                if (!isNaN(c)) {
                                                    return "number"
                                                }
                                                return "string"
                                            }
                                        }
                                        return "date"
                                    } else {
                                        e = "string"
                                    }
                                } else {
                                    e = "string"
                                }
                            } else {
                                e = "date"
                            }
                        }
                    }
                }
            }
            return e
        },
        _getfiltersbytype: function(b) {
            var c = this.that;
            var d = "";
            switch (b) {
                case "number":
                case "float":
                case "int":
                    d = c.gridlocalization.filternumericcomparisonoperators;
                    break;
                case "date":
                    d = c.gridlocalization.filterdatecomparisonoperators;
                    break;
                case "boolean":
                case "bool":
                    d = c.gridlocalization.filterbooleancomparisonoperators;
                    break;
                case "string":
                default:
                    d = c.gridlocalization.filterstringcomparisonoperators;
                    break
            }
            return d
        },
        _getfiltertype: function(b) {
            var c = "stringfilter";
            switch (b) {
                case "number":
                case "int":
                case "float":
                case "decimal":
                    c = "numericfilter";
                    break;
                case "boolean":
                case "bool":
                    c = "booleanfilter";
                    break;
                case "date":
                case "time":
                case "range":
                    c = "datefilter";
                    break;
                case "string":
                case "input":
                    c = "stringfilter";
                    break
            }
            return c
        },
        _buildfilter: function(r, l, F) {
            var f = a(l).find(".filter1");
            var G = a(l).find(".filter2");
            var K = a(l).find(".filter3");
            var k = a(l).find(".filtertext1" + r.element.id);
            var j = a(l).find(".filtertext2" + r.element.id);
            var A = k.val();
            var z = j.val();
            var M = r._getcolumntypebydatafield(F);
            var t = r._getfiltersbytype(M);
            var J = new a.jqx.filter();
            var w = r._getfiltertype(M);
            if (r.filtermode === "default" && (F.filtertype !== "list" && F.filtertype !== "checkedlist")) {
                var E = f.jqxDropDownList("selectedIndex");
                var c = G.jqxDropDownList("selectedIndex");
                var D = K.jqxDropDownList("selectedIndex");
                var e = null;
                var d = null;
                if (r.updatefilterconditions) {
                    var p = r.updatefilterconditions(w, J.getoperatorsbyfiltertype(w));
                    if (p != undefined) {
                        J.setoperatorsbyfiltertype(w, p)
                    }
                }
                var q = false;
                var L = J.getoperatorsbyfiltertype(w)[E];
                var K = J.getoperatorsbyfiltertype(w)[D];
                var v = L == "NULL" || L == "NOT_NULL";
                var h = L == "EMPTY" || L == "NOT_EMPTY";
                if (L == undefined) {
                    L = J.getoperatorsbyfiltertype(w)[0]
                }
                if (K == undefined) {
                    K = J.getoperatorsbyfiltertype(w)[0]
                }
                if (A.length > 0 || v || h) {
                    e = J.createfilter(w, A, L, null, F.cellsformat, r.gridlocalization);
                    J.addfilter(c, e);
                    q = true
                }
                var u = K == "NULL" || K == "NOT_NULL";
                var g = K == "EMPTY" || K == "NOT_EMPTY";
                if (z.length > 0 || u || g) {
                    d = J.createfilter(w, z, K, null, F.cellsformat, r.gridlocalization);
                    J.addfilter(c, d);
                    q = true
                }
                if (q) {
                    var C = F.displayfield;
                    this.addfilter(C, J, true)
                } else {
                    this._clearfilter(r, l, F)
                }
            } else {
                if (r.filtermode === "excel" || (F.filtertype === "list" || F.filtertype === "checkedlist")) {
                    var B = this;
                    var n = false;
                    var x = f.data().jqxListBox.instance;
                    var I = this.filtermode === "excel" || F.filtertype === "checkedlist";
                    var o = x.getCheckedItems();
                    if (!I) {
                        var o = x.getSelectedItems()
                    }
                    if (o.length == 0) {
                        for (var H = 1; H < x.items.length; H++) {
                            var m = x.items[H].value;
                            if (m === undefined) {
                                m = ""
                            }
                            var b = "not_equal";
                            if (m && m.indexOf) {
                                if (m.indexOf("|") >= 0 || m.indexOf(" AND ") >= 0 || m.indexOf(" OR ") >= 0 || m.indexOf(" and ") >= 0 || m.indexOf(" or ") >= 0) {
                                    m = m.replace("|", "");
                                    m = m.replace("AND", "");
                                    m = m.replace("OR", "");
                                    m = m.replace("and", "");
                                    m = m.replace("or", "");
                                    var b = "equal"
                                }
                            }
                            if (w == "datefilter") {
                                var y = J.createfilter(w, m, b, null, F.cellsformat, r.gridlocalization)
                            } else {
                                var y = J.createfilter(w, m, b, null)
                            }
                            J.addfilter(0, y)
                        }
                        n = true
                    } else {
                        if (o.length != x.items.length) {
                            n = true;
                            for (var H = 0; H < o.length; H++) {
                                if (r.gridlocalization.filterselectallstring === o[H].value) {
                                    continue
                                }
                                var m = o[H].value;
                                if (m === undefined) {
                                    m = ""
                                }
                                var b = "equal";
                                if (w == "datefilter") {
                                    var y = J.createfilter(w, m, b, null, F.cellsformat, r.gridlocalization)
                                } else {
                                    var y = J.createfilter(w, m, b, null)
                                }
                                var s = 1;
                                J.addfilter(s, y)
                            }
                        } else {
                            n = false
                        }
                    }
                    if (n) {
                        var C = F.displayfield;
                        this.addfilter(C, J, true)
                    } else {
                        var C = F.displayfield;
                        this.removefilter(C, true)
                    }
                }
            }
        },
        _clearfilter: function(e, c, d) {
            var b = d.displayfield;
            this.removefilter(b, true)
        },
        addfilter: function(d, e, c) {
            if (this._loading) {
                throw new Error("jqxGrid: " + this.loadingerrormessage);
                return false
            }
            var f = this.getcolumn(d);
            var b = this._getcolumn(d);
            if (f == undefined || f == null) {
                return
            }
            f.filter = e;
            if (b == undefined || b == null) {
                return
            }
            b.filter = e;
            this.dataview.addfilter(d, e);
            if (c == true && c != undefined) {
                this.applyfilters("add")
            }
        },
        removefilter: function(d, c) {
            if (this._loading) {
                throw new Error("jqxGrid: " + this.loadingerrormessage);
                return false
            }
            var e = this.getcolumn(d);
            var b = this._getcolumn(d);
            if (e == undefined || e == null) {
                return
            }
            if (e.filter == null) {
                return
            }
            this.dataview.removefilter(d, e.filter);
            e.filter = null;
            b.filter = null;
            if (this.showfilterrow) {
                this.clearfilterrow(d)
            }
            if (c == true || c !== false) {
                this.applyfilters("remove")
            }
        },
        applyfilters: function(f) {
            var c = false;
            if (this.dataview.filters.length >= 0 && (this.virtualmode || !this.source.localdata)) {
                if (this.source != null && this.source.filter) {
                    var g = -1;
                    if (this.pageable) {
                        g = this.dataview.pagenum;
                        this.dataview.pagenum = 0
                    } else {
                        this.vScrollInstance.setPosition(0);
                        this.loadondemand = true;
                        this._renderrows(this.virtualsizeinfo)
                    }
                    if (this.pageable && this.virtualmode) {
                        this.dataview.pagenum = 0
                    }
                    this.source.filter(this.dataview.filters, this.dataview.records, this.dataview.records.length);
                    if (this.pageable && !this.virtualmode) {
                        this.dataview.pagenum = g
                    }
                }
            }
            this._cellscache = new Array();
            if (this.dataview.clearsortdata) {
                this.dataview.clearsortdata()
            }
            if (!this.virtualmode) {
                var b = this.selectedrowindexes;
                var d = this.that;
                this.dataview.refresh();
                if (this.dataview.clearsortdata) {
                    if (this.sortcolumn && this.sortdirection) {
                        var e = this.sortdirection.ascending ? "asc" : "desc";
                        if (!this._loading) {
                            this.sortby(this.sortcolumn, e, null, false)
                        } else {
                            this.sortby(this.sortcolumn, e, null, false, false)
                        }
                    }
                }
            } else {
                if (this.pageable) {
                    this.dataview.updateview();
                    if (this.gotopage) {
                        this.gotopage(0)
                    }
                }
                this.rendergridcontent(false, false);
                if (this.showfilterrow) {
                    if (typeof f != "string" && a.isEmptyObject(f)) {
                        this.refreshfilterrow()
                    }
                }
                this._postrender("filter");
                this._raiseEvent(13, {
                    filters: this.dataview.filters
                });
                return
            }
            if (this.pageable) {
                this.dataview.updateview();
                if (this.gotopage) {
                    this.gotopage(0);
                    this.updatepagerdetails()
                }
            }
            this._updaterowsproperties();
            if (!this.groupable || (this.groupable && this.groups.length == 0)) {
                this._rowdetailscache = new Array();
                this.virtualsizeinfo = null;
                this._pagescache = new Array();
                if (this.columns && this.columns.records && this.columns.records.length > 0 && !this.columns.records[0].filtericon) {
                    this.prerenderrequired = true
                }
                this.rendergridcontent(true, false);
                this._updatecolumnwidths();
                this._updatecellwidths();
                this._renderrows(this.virtualsizeinfo);
                if (this.showaggregates && this._updatecolumnsaggregates) {
                    this._updatecolumnsaggregates()
                }
                this._postrender("filter")
            } else {
                this.collapseallgroups();
                this._rowdetailscache = new Array();
                this._render(true, true, false, false, false);
                if (this.showfilterrow) {
                    this._updatefocusedfilter()
                }
                this._updatecolumnwidths();
                this._updatecellwidths();
                this._renderrows(this.virtualsizeinfo);
                this._postrender("group")
            }
            if (this.showfilterrow) {
                if (typeof f != "string" && a.isEmptyObject(f)) {
                    this.refreshfilterrow()
                }
            }
            this._raiseEvent(13, {
                filters: this.dataview.filters
            })
        },
        getfilterinformation: function() {
            var d = new Array();
            for (var b = 0; b < this.dataview.filters.length; b++) {
                var c = this.getcolumn(this.dataview.filters[b].datafield);
                d[b] = {
                    filter: this.dataview.filters[b].filter,
                    datafield: c.datafield,
                    displayfield: c.displayfield,
                    filtercolumn: c.datafield,
                    filtercolumntext: c.text
                }
            }
            return d
        },
        clearfilters: function(b) {
            var d = this.that;
            if (this.showfilterrow) {
                this.clearfilterrow()
            }
            if (this.columns.records) {
                var c = b == true || b !== false;
                a.each(this.columns.records, function() {
                    d.removefilter(this.displayfield, !c)
                })
            }
            if (b === false) {
                return
            }
            if (b == true || b !== false) {
                this.applyfilters("clear")
            }
        },
        _destroyfilterpanel: function() {
            var e = a(a.find("#filterclearbutton" + this.element.id));
            var d = a(a.find("#filterbutton" + this.element.id));
            var h = a(a.find("#filter1" + this.element.id));
            var c = a(a.find("#filter2" + this.element.id));
            var g = a(a.find("#filter3" + this.element.id));
            var f = a(a.find(".filtertext1" + this.element.id));
            var b = a(a.find(".filtertext2" + this.element.id));
            if (f.length > 0 && b.length > 0) {
                f.removeClass();
                b.removeClass();
                f.remove();
                b.remove()
            }
            if (e.length > 0) {
                e.jqxButton("destroy");
                d.jqxButton("destroy");
                this.removeHandler(e, "click");
                this.removeHandler(d, "click")
            }
            if (h.length > 0) {
                h.jqxDropDownList("destroy")
            }
            if (c.length > 0) {
                c.jqxDropDownList("destroy")
            }
            if (g.length > 0) {
                g.jqxDropDownList("destroy")
            }
            var h = a(a.find("#filter1" + this.element.id + "ex"));
            var c = a(a.find("#filter2" + this.element.id + "ex"));
            var g = a(a.find("#filter3" + this.element.id + "ex"));
            if (h.length > 0) {
                h.jqxDropDownList("destroy")
            }
            if (c.length > 0) {
                c.jqxDropDownList("destroy")
            }
            if (g.length > 0) {
                g.jqxDropDownList("destroy")
            }
            if (this.excelfilterpanel) {
                var h = a(this.excelfilterpanel).find("#filter1" + this.element.id + "ex");
                var c = a(this.excelfilterpanel).find("#filter2" + this.element.id + "ex");
                var g = a(this.excelfilterpanel).find("#filter3" + this.element.id + "ex");
                if (h.length > 0) {
                    this.removeHandler(h, "checkChange");
                    h.jqxListBox("destroy")
                }
                if (c.length > 0) {
                    c.jqxDropDownList("destroy")
                }
                if (g.length > 0) {
                    g.jqxDropDownList("destroy")
                }
                var e = a(this.excelfilterpanel).find("#filterclearbutton" + this.element.id + "ex");
                var d = a(this.excelfilterpanel).find("#filterbutton" + this.element.id + "ex");
                var h = a(this.excelfilterpanel).find("#filter1" + this.element.id + "ex");
                var c = a(this.excelfilterpanel).find("#filter2" + this.element.id + "ex");
                var g = a(this.excelfilterpanel).find("#filter3" + this.element.id + "ex");
                var f = a(this.excelfilterpanel).find(".filtertext1" + this.element.id + "ex");
                var b = a(this.excelfilterpanel).find(".filtertext2" + this.element.id + "ex");
                if (f.length > 0 && b.length > 0) {
                    f.removeClass();
                    b.removeClass();
                    f.remove();
                    b.remove()
                }
                if (e.length > 0) {
                    e.jqxButton("destroy");
                    d.jqxButton("destroy");
                    this.removeHandler(e, "click");
                    this.removeHandler(d, "click")
                }
                this.excelfilterpanel.removeData();
                this.excelfilterpanel.remove();
                delete this.excelfilterpanel
            }
        },
        _updatefilterpanel: function(s, p, F) {
            if (s == null || s == undefined) {
                s = this
            }
            var R = s._getcolumntypebydatafield(F);
            var u = s._getfiltersbytype(R);
            if (!s.host.jqxDropDownList) {
                throw new Error("jqxGrid: Missing reference to jqxdropdownlist.js.");
                return
            }
            s.filterpanel.detach();
            s.excelfilterpanel.detach();
            if (F.filterpanel) {
                F.filterpanel.detach()
            }
            a(p).children().detach();
            var k = a(s.menuitemsarray[6]);
            a(k).css("height", "220px");
            if (F.createfilterpanel && !F.filterpanel) {
                var L = a("<div class='filter' style='margin-left: 7px;'></div>");
                a(p).append(L);
                F.createfilterpanel(F.displayfield, L);
                F.filterpanel = L
            }
            if (F.filtertype === "list" || F.filtertype === "checkedlist") {
                a(p).append(s.excelfilterpanel)
            } else {
                if (F.filtertype !== "custom") {
                    a(p).append(s.filterpanel)
                } else {
                    if (F.filterpanel) {
                        a(p).append(F.filterpanel)
                    }
                }
            }
            this._showwhere = a(p).find(".filter.showwhere");
            var g = a(p);
            var O = g.find("#filterclearbutton" + s.element.id);
            var l = g.find("#filterbutton" + s.element.id);
            var f = g.find(".filter1");
            var m = g.find(".filter2");
            var Q = g.find(".filter3");
            var j = g.find(".filtertext1" + s.element.id);
            var h = g.find(".filtertext2" + s.element.id);
            if (this._hasdatefilter && (F.filtertype !== "list" && F.filtertype !== "checkedlist" && F.filtertype !== "custom")) {
                var e = j.parent();
                var d = h.parent();
                if (F.filtertype == "date") {
                    j.jqxDateTimeInput("destroy");
                    h.jqxDateTimeInput("destroy");
                    e.children().remove();
                    d.children().remove();
                    s._showwhere.text(s.gridlocalization.filtershowrowdatestring);
                    var b = a("<div class='filtertext1" + s.element.id + "' style=''></div>");
                    e.append(b);
                    var n = function(c) {
                        var i = {
                            calendar: s.gridlocalization,
                            todayString: s.gridlocalization.todaystring,
                            clearString: s.gridlocalization.clearstring
                        };
                        c.jqxDateTimeInput({
                            disabled: s.disabled,
                            firstDayOfWeek: s.gridlocalization.firstDay,
                            localization: i,
                            rtl: s.rtl,
                            width: s._filterpanelwidth - 10,
                            height: 24,
                            value: null,
                            formatString: F.cellsformat,
                            theme: s.theme
                        })
                    };
                    n(b);
                    var b = a("<div class='filtertext2" + s.element.id + "' style=''></div>");
                    d.append(b);
                    n(b)
                } else {
                    e.children().remove();
                    d.children().remove();
                    s._showwhere.text(s.gridlocalization.filtershowrowstring);
                    var b = a("<input autocomplete='off' class='filtertext1" + s.element.id + "' style='box-sizing: content-box; height: 16px; padding: 3px;' type='text'></input>");
                    e.append(b);
                    var n = function(c) {
                        c.addClass(s.toThemeProperty("jqx-input"));
                        c.addClass(s.toThemeProperty("jqx-filter-input jqx-widget-content"));
                        c.addClass(s.toThemeProperty("jqx-rc-all"));
                        c.width(s._filterpanelwidth - 18)
                    };
                    n(b);
                    var b = a("<input autocomplete='off' class='filtertext2" + s.element.id + "' style='box-sizing: content-box; height: 16px; padding: 3px;' type='text'></input>");
                    d.append(b);
                    n(b)
                }
                var j = g.find(".filtertext1" + s.element.id);
                var h = g.find(".filtertext2" + s.element.id)
            }
            if (F.filtertype != "date") {
                j.val("");
                h.val("")
            } else {
                j.val(null);
                h.val(null)
            }
            if (l.length > 0) {
                l.jqxButton({
                    height: this.filterMenuItemsHeight
                });
                O.jqxButton({
                    height: this.filterMenuItemsHeight
                });
                this.removeHandler(l, "click");
                this.addHandler(l, "click", function() {
                    s._buildfilter(s, p, F);
                    s._closemenu()
                });
                this.removeHandler(O, "click");
                this.addHandler(O, "click", function() {
                    s._clearfilter(s, p, F);
                    s._closemenu()
                });
                this.removeHandler(l, "keydown");
                this.addHandler(l, "keydown", function(c) {
                    if (c.keyCode === 13) {
                        s._buildfilter(s, p, F);
                        s._closemenu()
                    }
                });
                this.removeHandler(O, "keydown");
                this.addHandler(O, "keydown", function(c) {
                    if (c.keyCode === 13) {
                        s._clearfilter(s, p, F);
                        s._closemenu()
                    }
                })
            }
            if (j.length > 0) {
                this.removeHandler(j, "keydown");
                this.addHandler(j, "keydown", function(c) {
                    if (c.keyCode === 13) {
                        l.trigger("click")
                    }
                    if (c.keyCode === 27) {
                        s._closemenu()
                    }
                });
                this.removeHandler(h, "keydown");
                this.addHandler(h, "keydown", function(c) {
                    if (c.keyCode === 13) {
                        l.trigger("click")
                    }
                    if (c.keyCode === 27) {
                        s._closemenu()
                    }
                })
            }
            if (this.filtermode === "default" && (F.filtertype !== "list" && F.filtertype !== "checkedlist" && F.filtertype !== "custom")) {
                if (f.jqxDropDownList("source") != u) {
                    f.jqxDropDownList({
                        enableBrowserBoundsDetection: false,
                        source: u
                    });
                    Q.jqxDropDownList({
                        enableBrowserBoundsDetection: false,
                        source: u
                    })
                }
                if (R == "boolean" || R == "bool") {
                    f.jqxDropDownList({
                        autoDropDownHeight: true,
                        selectedIndex: 0
                    });
                    Q.jqxDropDownList({
                        autoDropDownHeight: true,
                        selectedIndex: 0
                    })
                } else {
                    var I = false;
                    if (u && u.length) {
                        if (u.length < 5) {
                            I = true
                        }
                    }
                    f.jqxDropDownList({
                        autoDropDownHeight: I,
                        selectedIndex: 2
                    });
                    Q.jqxDropDownList({
                        autoDropDownHeight: I,
                        selectedIndex: 2
                    })
                }
                m.jqxDropDownList({
                    selectedIndex: 0
                });
                var A = F.filter;
                var N = new a.jqx.filter();
                var y = "";
                switch (R) {
                    case "number":
                    case "int":
                    case "float":
                    case "decimal":
                        y = "numericfilter";
                        o = N.getoperatorsbyfiltertype("numericfilter");
                        break;
                    case "boolean":
                    case "bool":
                        y = "booleanfilter";
                        o = N.getoperatorsbyfiltertype("booleanfilter");
                        break;
                    case "date":
                    case "time":
                        y = "datefilter";
                        o = N.getoperatorsbyfiltertype("datefilter");
                        break;
                    case "string":
                        y = "stringfilter";
                        o = N.getoperatorsbyfiltertype("stringfilter");
                        break
                }
                if (A != null) {
                    var e = A.getfilterat(0);
                    var d = A.getfilterat(1);
                    var J = A.getoperatorat(0);
                    if (s.updatefilterconditions) {
                        var o = [];
                        var r = s.updatefilterconditions(y, o);
                        if (r != undefined) {
                            for (var P = 0; P < r.length; P++) {
                                r[P] = r[P].toUpperCase()
                            }
                            A.setoperatorsbyfiltertype(y, r);
                            o = r
                        }
                    }
                    var x = "default";
                    if (e != null) {
                        var E = o.indexOf(e.comparisonoperator);
                        var B = e.filtervalue;
                        j.val(B);
                        f.jqxDropDownList({
                            selectedIndex: E,
                            animationType: x
                        })
                    }
                    if (d != null) {
                        var D = o.indexOf(d.comparisonoperator);
                        var z = d.filtervalue;
                        h.val(z);
                        Q.jqxDropDownList({
                            selectedIndex: D,
                            animationType: x
                        })
                    }
                    if (A.getoperatorat(0) == undefined) {
                        m.jqxDropDownList({
                            selectedIndex: 0,
                            animationType: x
                        })
                    } else {
                        if (A.getoperatorat(0) == "and" || A.getoperatorat(0) == 0) {
                            m.jqxDropDownList({
                                selectedIndex: 0
                            })
                        } else {
                            m.jqxDropDownList({
                                selectedIndex: 1
                            })
                        }
                    }
                }
                if (s.updatefilterpanel) {
                    s.updatefilterpanel(f, Q, m, j, h, l, O, A, y, o)
                }
                if (!this._hasdatefilter || (this._hasdatefilter && F.filtertype != "date")) {
                    if (!this.touchdevice) {
                        j.focus();
                        setTimeout(function() {
                            j.focus()
                        }, 10)
                    }
                }
            } else {
                if (this.filtermode === "excel" || F.filtertype === "list" || F.filtertype === "checkedlist") {
                    var v = s._getfilterdataadapter(F);
                    var y = s._getfiltertype(R);
                    var M = this.filtermode === "excel" || F.filtertype === "checkedlist";
                    f.jqxListBox("focus");
                    this.removeHandler(f, "keyup");
                    this.addHandler(f, "keyup", function(c) {
                        if (c.keyCode === 13) {
                            l.trigger("click")
                        }
                        if (c.keyCode === 27) {
                            s._closemenu()
                        }
                    });
                    if (F.cellsformat) {
                        f.jqxListBox({
                            checkboxes: M,
                            displayMember: F.displayfield,
                            valueMember: F.displayfield + "JQValue",
                            source: v
                        })
                    } else {
                        f.jqxListBox({
                            checkboxes: M,
                            displayMember: F.displayfield,
                            valueMember: F.displayfield,
                            source: v
                        })
                    }
                    if (M) {
                        var w = f.jqxListBox("getItem", 0);
                        if (!(w && w.label === s.gridlocalization.filterselectallstring)) {
                            f.jqxListBox("insertAt", {
                                label: s.gridlocalization.filterselectallstring
                            }, 0)
                        }
                        var G = f.data().jqxListBox.instance;
                        G.checkAll(false);
                        var C = this;
                        if (F.filter) {
                            G.uncheckAll(false);
                            var t = F.filter.getfilters();
                            for (var K = 0; K < G.items.length; K++) {
                                var H = G.items[K].value;
                                a.each(t, function() {
                                    if (this.condition == "NOT_EQUAL") {
                                        if (H != this.value) {
                                            G.uncheckIndex(K, false, false);
                                            return false
                                        } else {
                                            if (H != null && this.value != null && H.toString() != this.value.toString()) {
                                                G.uncheckIndex(K, false, false);
                                                return false
                                            }
                                        }
                                    } else {
                                        if (this.condition == "EQUAL") {
                                            if (H == this.value) {
                                                G.checkIndex(K, false, false);
                                                return false
                                            } else {
                                                if (H != null && this.value != null && H.toString() == this.value.toString()) {
                                                    G.checkIndex(K, false, false);
                                                    return false
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                            G._updateCheckedItems();
                            var q = G.getCheckedItems().length;
                            if (G.items.length != q && q > 0) {
                                G.host.jqxListBox("indeterminateIndex", 0, true, false)
                            }
                            if (q === G.items.length - 1) {
                                G.host.jqxListBox("checkIndex", 0, true, false)
                            }
                        }
                    } else {
                        if (F.filter) {
                            var G = f.data().jqxListBox.instance;
                            G.clearSelection();
                            var t = F.filter.getfilters();
                            for (var K = 0; K < G.items.length; K++) {
                                var H = G.items[K].value;
                                a.each(t, function() {
                                    if (this.condition == "NOT_EQUAL") {
                                        if (H != this.value) {
                                            G.unselectIndex(K, false, false);
                                            return false
                                        }
                                    } else {
                                        if (this.condition == "EQUAL") {
                                            if (H == this.value) {
                                                G.selectIndex(K, true, false);
                                                return false
                                            }
                                        }
                                    }
                                })
                            }
                            G._renderItems()
                        }
                    }
                }
            }
        },
        _initfilterpanel: function(z, b, c, p, w) {
            if (z == null || z == undefined) {
                z = this
            }
            b[0].innerHTML = "";
            var t = a("<div class='filter' style='position: absolute; bottom: 3px; margin-left: 3px;'></div>");
            b.append(t);
            var n = a("<div class='filter showwhere' style='height: 18px; margin-top: 3px; margin-bottom: 3px;'></div>");
            n.text(z.gridlocalization.filtershowrowstring);
            this._showwhere = n;
            var o = w ? "ex" : "";
            var v = a("<div class='filter filter1' id='filter1" + z.element.id + o + "'></div>");
            var h = a("<div class='filter filter2' id='filter2" + z.element.id + o + "' style='margin-top: 3px; margin-bottom: 3px;'></div>");
            var s = a("<div class='filter filter3' id='filter3" + z.element.id + o + "'></div>");
            var e = z._getcolumntypebydatafield(c);
            if (!v.jqxDropDownList) {
                throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");
                return
            }
            var q = z._getfiltersbytype(e);
            this._hasdatefilter = false;
            this._filterpanelwidth = p;
            if (this.columns && this.columns.records) {
                for (var u = 0; u < this.columns.records.length; u++) {
                    if (this.columns.records[u].filtertype == "date") {
                        this._hasdatefilter = true;
                        break
                    }
                }
            } else {
                if (this.columns && !this.columns.records) {
                    for (var u = 0; u < this.columns.length; u++) {
                        if (this.columns[u].filtertype == "date") {
                            this._hasdatefilter = true;
                            break
                        }
                    }
                }
            }
            this._hasdatefilter = true;
            var k = a("<div style='margin-top:3px;' class='filter'><input autocomplete='off' class='filtertext1" + z.element.id + "' style='padding: 3px; height: 16px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>");
            var m = k.find("input");
            m.addClass(this.toThemeProperty("jqx-input"));
            m.addClass(this.toThemeProperty("jqx-filter-input jqx-widget-content"));
            m.addClass(this.toThemeProperty("jqx-rc-all"));
            m.width(p - 18);
            var l = a("<div style='margin-top:3px;' class='filter'><input autocomplete='off' class='filtertext2" + z.element.id + "' style='padding: 3px; height: 16px; margin-top: 3px;' type='text'></input></div>");
            var j = l.find("input");
            j.addClass(this.toThemeProperty("jqx-input"));
            j.addClass(this.toThemeProperty("jqx-filter-input jqx-widget-content"));
            j.addClass(this.toThemeProperty("jqx-rc-all"));
            j.width(p - 18);
            if (z.rtl) {
                m.css("direction", "rtl");
                j.css("direction", "rtl")
            }
            var g = a("<div class='filter' style='height: 35px; text-align:center; margin-top: 15px; margin-left:-2px;'></div>");
            var f = a('<span tabIndex=0 id="filterbutton' + z.element.id + '" class="primary filterbutton" style="padding: 6px 15px;">' + z.gridlocalization.filterstring + "</span>");
            g.append(f);
            var x = a('<span tabIndex=0 id="filterclearbutton' + z.element.id + '" class="filterclearbutton secondary" style="position: relative; left: 2px; padding: 6px 15px; margin-left: 7px;">' + z.gridlocalization.filterclearstring + "</span>");
            g.append(x);
            f.jqxButton({
                height: this.filterMenuItemsHeight,
                theme: z.theme
            });
            x.jqxButton({
                height: this.filterMenuItemsHeight,
                theme: z.theme
            });
            var y = function(A) {
                if (A) {
                    if (A.text().indexOf("case sensitive") != -1) {
                        var i = A.text();
                        i = i.replace("case sensitive", "match case");
                        A.text(i)
                    }
                    A.css("font-family", z.host.css("font-family"));
                    A.css("font-size", z.host.css("font-size"));
                    A.css("top", "2px");
                    A.css("position", "relative");
                    return A
                }
                return ""
            };
            if (this.filtermode === "default" && !w) {
                t.append(n);
                t.append(v);
                v.jqxDropDownList({
                    _checkForHiddenParent: false,
                    autoItemsHeight: true,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    selectedIndex: 2,
                    width: p - 10,
                    height: this.filterMenuItemsHeight,
                    dropDownHeight: 200,
                    dropDownWidth: p - 10,
                    selectionRenderer: y,
                    source: q,
                    theme: z.theme
                });
                t.append(k);
                var r = new Array();
                r[0] = z.gridlocalization.filterandconditionstring;
                r[1] = z.gridlocalization.filterorconditionstring;
                h.jqxDropDownList({
                    _checkForHiddenParent: false,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    autoDropDownHeight: true,
                    selectedIndex: 0,
                    width: 60,
                    height: this.filterMenuItemsHeight,
                    source: r,
                    selectionRenderer: y,
                    theme: z.theme
                });
                t.append(h);
                s.jqxDropDownList({
                    _checkForHiddenParent: false,
                    autoItemsHeight: true,
                    rtl: z.rtl,
                    enableBrowserBoundsDetection: false,
                    selectedIndex: 2,
                    width: p - 10,
                    height: this.filterMenuItemsHeight,
                    dropDownHeight: 200,
                    dropDownWidth: p - 10,
                    selectionRenderer: y,
                    source: q,
                    theme: z.theme
                });
                t.append(s);
                t.append(l)
            } else {
                if (this.filtermode === "excel" || w) {
                    t.append(n);
                    t.append(v);
                    v.attr("tabindex", 0);
                    v.jqxListBox({
                        rtl: z.rtl,
                        _checkForHiddenParent: false,
                        checkboxes: true,
                        selectedIndex: 2,
                        width: p - 10,
                        height: 160,
                        theme: z.theme
                    });
                    var d = true;
                    z.addHandler(v, "checkChange", function(B) {
                        if (!d) {
                            return
                        }
                        if (B.args.label != z.gridlocalization.filterselectallstring) {
                            d = false;
                            v.jqxListBox("checkIndex", 0, true, false);
                            var i = v.jqxListBox("getCheckedItems");
                            var A = v.jqxListBox("getItems");
                            if (i.length == 1) {
                                v.jqxListBox("uncheckIndex", 0, true, false)
                            } else {
                                if (A.length != i.length) {
                                    v.jqxListBox("indeterminateIndex", 0, true, false)
                                }
                            }
                            d = true
                        } else {
                            d = false;
                            if (B.args.checked) {
                                v.jqxListBox("checkAll", false)
                            } else {
                                v.jqxListBox("uncheckAll", false)
                            }
                            d = true
                        }
                    })
                }
            }
            t.append(g);
            if (z.updatefilterpanel) {
                z.updatefilterpanel(v, s, h, k, l, f, x, null, null, q)
            }
        }
    })
})(jqxBaseFramework);
