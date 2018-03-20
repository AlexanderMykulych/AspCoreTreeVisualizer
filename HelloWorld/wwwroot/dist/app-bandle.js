System.register("mixins/m_lodash", ["lodash"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function memoizeDebounce(func, wait, resolver, options) {
        if (wait === void 0) { wait = 0; }
        if (options === void 0) { options = {}; }
        var mem = lodash_1.default.memoize(function () { return lodash_1.default.debounce(func, wait, options); }, resolver);
        return function () {
            mem.apply(this, arguments).apply(this, arguments);
        };
    }
    exports_1("default", memoizeDebounce);
    var lodash_1, difference;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("difference", difference = function (object, base) {
                function changes(object, base) {
                    return lodash_1.default.transform(object, function (result, value, key) {
                        if (!lodash_1.default.isEqual(value, base[key])) {
                            var res = (lodash_1.default.isObject(value) && lodash_1.default.isObject(base[key])) ? changes(value, base[key]) : value;
                            if (!lodash_1.default.isEmpty(res)) {
                                result[key] = res;
                            }
                        }
                    });
                }
                var changed = changes(object, base);
                return lodash_1.default.isEmpty(changed) ? null : changed;
            });
        }
    };
});
System.register("components/Diagram/RuleControll", ["lodash", "vue"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var lodash_2, vue_1, VueP;
    return {
        setters: [
            function (lodash_2_1) {
                lodash_2 = lodash_2_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            //При компиляции typescript выскакивает ошибка "не находит свойства togglesRoles" только когда props: Object
            //Обходное решение
            VueP = vue_1.default;
            exports_2("default", VueP.extend({
                template: "#rule-controll",
                props: {
                    point: Object,
                    index: [Number, String],
                    roles: Array,
                    roleWithDetail: {
                        type: Boolean,
                        default: false
                    },
                    togglesValues: {
                        type: Array,
                        default: function () {
                            return [];
                        }
                    },
                    togglesRoles: {
                        type: Array,
                        default: function () {
                            return [];
                        }
                    }
                },
                data: function () {
                    return {
                        selectedRole: null
                    };
                },
                methods: {
                    onRoleSelectClick: function () {
                        this.addRole({
                            role: this.selectedRole
                        });
                    },
                    addRole: function (roleInfo) {
                        this.togglesRoles.push(roleInfo);
                    },
                    removeRoleByIndex: function (index) {
                        this.togglesRoles.splice(index, 1);
                    }
                },
                computed: {
                    uniq: function () {
                        return "_" + this.index;
                    },
                    existsRoles: function () {
                        var _this = this;
                        return this.roles.filter(function (x) {
                            return lodash_2.default.findIndex(_this.togglesRoles, function (y) { return y.role.Name == x.Name; }) < 0;
                        });
                    },
                    sync_togglesValues: {
                        get: function () {
                            return !lodash_2.default.isArray(this.togglesValues) ? [] : this.togglesValues;
                        },
                        set: function (val) {
                            this.$emit("update:togglesValues", val);
                        }
                    },
                    sync_togglesRoles: {
                        get: function () {
                            return !lodash_2.default.isArray(this.togglesRoles) ? [] : this.togglesRoles;
                        },
                        set: function (val) {
                            this.$emit("update:togglesRoles", val);
                        }
                    }
                }
            }));
        }
    };
});
System.register("mixins/IdGenerator", ["lodash"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var lodash_3, uniqId;
    return {
        setters: [
            function (lodash_3_1) {
                lodash_3 = lodash_3_1;
            }
        ],
        execute: function () {
            exports_3("uniqId", uniqId = function () {
                return lodash_3.default.uniqueId() + "_" + Math.round(Math.random() * 100);
            });
        }
    };
});
System.register("Model/PointType", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var PointType;
    return {
        setters: [],
        execute: function () {
            (function (PointType) {
                PointType[PointType["start"] = 0] = "start";
                PointType[PointType["characteristic"] = 1] = "characteristic";
                PointType[PointType["aggregator"] = 2] = "aggregator";
            })(PointType || (PointType = {}));
            exports_4("PointType", PointType);
        }
    };
});
System.register("components/AsyncSelect/AsyncSelectComponent", ["vue", "mixins/IdGenerator"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var vue_2, IdGenerator_1, _Vue;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (IdGenerator_1_1) {
                IdGenerator_1 = IdGenerator_1_1;
            }
        ],
        execute: function () {
            _Vue = vue_2.default;
            exports_5("default", _Vue.extend({
                template: "#async-select",
                props: {
                    id: {
                        type: String,
                        default: IdGenerator_1.uniqId()
                    },
                    url: String
                },
                computed: {
                    sync_id: function () {
                        return "select_" + this.id;
                    }
                },
                asyncData: {
                    userName: function () {
                        return new Promise(function (resolve, reject) {
                            setTimeout(function (_) {
                                if (Math.random() > 0.5) {
                                    resolve('risa');
                                }
                                else {
                                    reject('fetch error...');
                                }
                            }, 1000);
                        });
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll", "mixins/IdGenerator", "Model/PointType"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    function getDefaultValue() {
        return {
            point: {
                name: null,
                DefaultValue: null,
                Label: null,
                Characteristic: null,
                Values: [],
                Roles: null,
                Required: false,
                Options: {
                    type: PointType_1.PointType.characteristic
                }
            },
            uniqId: IdGenerator_2.uniqId(),
            offsetYDelta: 250,
            addExistCharacteristic: false,
            existPoint: null
        };
    }
    var vue_3, lodash_4, RuleControll_1, IdGenerator_2, PointType_1;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (lodash_4_1) {
                lodash_4 = lodash_4_1;
            },
            function (RuleControll_1_1) {
                RuleControll_1 = RuleControll_1_1;
            },
            function (IdGenerator_2_1) {
                IdGenerator_2 = IdGenerator_2_1;
            },
            function (PointType_1_1) {
                PointType_1 = PointType_1_1;
            }
        ],
        execute: function () {
            exports_6("default", vue_3.default.extend({
                template: "#add-depend-point",
                props: ["show", "id", "dependency", "roles", "defaultPoint", "defaultDependency", "isModalWindow", "points", "characteristics"],
                components: {
                    RuleControll: RuleControll_1.default
                },
                computed: {
                    elId: function () {
                        return "#add-depend-point_" + this.id;
                    },
                    mainClassObject: function () {
                        return {
                            modal: this.isModalWindow,
                            fade: this.isModalWindow
                        };
                    },
                    modalMaxWidth: function () {
                        return this.isModalWindow ? "80%" : "100%";
                    },
                    endPoint: function () {
                        return this.addExistCharacteristic ? this.existPoint : lodash_4.default.merge(this.point, { name: IdGenerator_2.uniqId() });
                    }
                },
                data: getDefaultValue,
                mounted: function () {
                    var _this = this;
                    $(this.elId)
                        .on('hidden.bs.modal', function () { return _this.close(); });
                },
                methods: {
                    close: function () {
                        this.$emit("close");
                        Object.assign(this.$data, getDefaultValue());
                    },
                    addPoint: function () {
                        var dependency = this.dependency;
                        var offset = this.getOffsetByDependency(this.dependency);
                        var points = [];
                        var point = lodash_4.default.merge(this.endPoint, {
                            offsetX: offset.x,
                            offsetY: offset.y + this.offsetYDelta
                        });
                        var endPoint = point;
                        points.push(point);
                        if (dependency.length > 1) {
                            var addPoint = {
                                name: IdGenerator_2.uniqId(),
                                Label: "And",
                                Options: {
                                    type: PointType_1.PointType.aggregator
                                },
                                offsetX: offset.x,
                                offsetY: offset.y + this.offsetYDelta / 2
                            };
                            points.push(addPoint);
                            endPoint = addPoint;
                            dependency.push({
                                End: point,
                                Start: endPoint,
                                Name: IdGenerator_2.uniqId(),
                                Rules: []
                            });
                        }
                        dependency.filter(function (x) { return x.End === null; }).forEach(function (x) { return x.End = endPoint; });
                        this.$emit("commit-point", {
                            points: points,
                            dependency: dependency
                        });
                    },
                    changePoint: function () {
                        this.$emit("commit-point", {
                            points: [this.point],
                            dependency: this.dependency
                        });
                    },
                    onRuleChange: function (val) {
                        var index = val.index;
                        vue_3.default.set(this.rules, index, val);
                    },
                    onSelectCharRuleChange: function (val) {
                        //this.point.Values = val.Values;
                        //this.point.Roles = val.Roles;
                    },
                    getOffsetByDependency: function (dependencies) {
                        var dep = lodash_4.default.first(dependencies);
                        return {
                            x: dep.Start.offsetX,
                            y: dep.Start.offsetY
                        };
                    }
                },
                watch: {
                    show: function (val) {
                        if (val) {
                            $(this.elId).modal("show");
                        }
                        else {
                            $(this.elId).modal("hide");
                        }
                    },
                    defaultPoint: function (defaultPoint) {
                        if (defaultPoint) {
                            this.point = defaultPoint;
                        }
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/Handler/AddDependedPoint", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    //export default addDependPoint;
    function default_1(option) {
        var func = (function (base) {
            ej.datavisualization.Diagram.extend(AddDependPoint, base);
            function AddDependPoint(name) {
                base.call(this, name);
                this.singleAction = true;
                this.clonedNodes = [];
                this.cursor = "pointer";
            }
            AddDependPoint.prototype.mouseup = function (evt) {
                base.prototype.mouseup.call(this, evt);
                option.bus.$emit("add-depend-point", {
                    nodes: this.diagram.selectionList
                });
            };
            return AddDependPoint;
        }(ej.datavisualization.Diagram.ToolBase));
        var userHandles = [];
        var addDependPoint = ej.datavisualization.Diagram.UserHandle();
        addDependPoint.name = "Add";
        addDependPoint.tool = new func(addDependPoint.name);
        addDependPoint.position = ej.datavisualization.Diagram.UserHandlePositions.BottomLeft;
        addDependPoint.visible = true;
        addDependPoint.enableMultiSelection = true;
        addDependPoint.size = 35;
        addDependPoint.backgroundColor = "#4D4D4D";
        addDependPoint.pathColor = "white";
        addDependPoint.borderWidth = "1";
        addDependPoint.pathData = "M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10";
        return addDependPoint;
    }
    exports_7("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/Diagram/Handler/ChangePointSettingHandler", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    //export default ChangePoint;
    function default_2(option) {
        var func = (function (base) {
            ej.datavisualization.Diagram.extend(AddDependPoint, base);
            function AddDependPoint(name) {
                base.call(this, name);
                this.singleAction = true;
                this.clonedNodes = [];
                this.cursor = "pointer";
            }
            AddDependPoint.prototype.mouseup = function (evt) {
                base.prototype.mouseup.call(this, evt);
                option.bus.$emit("change-point", {
                    nodes: this.diagram.selectionList
                });
            };
            return AddDependPoint;
        }(ej.datavisualization.Diagram.ToolBase));
        var userHandles = [];
        var addDependPoint = ej.datavisualization.Diagram.UserHandle();
        addDependPoint.name = "Change";
        addDependPoint.tool = new func(addDependPoint.name);
        addDependPoint.position = ej.datavisualization.Diagram.UserHandlePositions.BottomRight;
        addDependPoint.visible = true;
        addDependPoint.enableMultiSelection = false;
        addDependPoint.size = 35;
        addDependPoint.backgroundColor = "#4D4D4D";
        addDependPoint.pathColor = "white";
        addDependPoint.borderWidth = "1";
        addDependPoint.pathData = "M10,2.172c-4.324,0-7.828,3.504-7.828,7.828S5.676,17.828,10,17.828c4.324,0,7.828-3.504,7.828-7.828S14.324,2.172,10,2.172M10,17.004c-3.863,0-7.004-3.141-7.004-7.003S6.137,2.997,10,2.997c3.862,0,7.004,3.141,7.004,7.004S13.862,17.004,10,17.004M10,8.559c-0.795,0-1.442,0.646-1.442,1.442S9.205,11.443,10,11.443s1.441-0.647,1.441-1.443S10.795,8.559,10,8.559 M10,10.619c-0.34,0-0.618-0.278-0.618-0.618S9.66,9.382,10,9.382S10.618,9.661,10.618,10S10.34,10.619,10,10.619 M14.12,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.647,1.443,1.442,1.443s1.442-0.647,1.442-1.443S14.915,8.559,14.12,8.559 M14.12,10.619c-0.34,0-0.618-0.278-0.618-0.618s0.278-0.618,0.618-0.618S14.738,9.661,14.738,10S14.46,10.619,14.12,10.619 M5.88,8.559c-0.795,0-1.442,0.646-1.442,1.442s0.646,1.443,1.442,1.443S7.322,10.796,7.322,10S6.675,8.559,5.88,8.559 M5.88,10.619c-0.34,0-0.618-0.278-0.618-0.618S5.54,9.382,5.88,9.382S6.498,9.661,6.498,10S6.22,10.619,5.88,10.619";
        return addDependPoint;
    }
    exports_8("default", default_2);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/CharacteristicValue", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Role", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Dependency", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/BasePoint", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/Diagram/Test/GraphTestControll", ["vue", "Model/PointType", "lodash"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vue_4, PointType_2, lodash_5;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (PointType_2_1) {
                PointType_2 = PointType_2_1;
            },
            function (lodash_5_1) {
                lodash_5 = lodash_5_1;
            }
        ],
        execute: function () {
            exports_13("default", vue_4.default.extend({
                template: "#graph-test",
                props: ["graph"],
                data: function () {
                    return {
                        selectedValues: [],
                        dynamic: {
                            Points: []
                        }
                    };
                },
                computed: {
                    activePoints: function () {
                        var result = [];
                        if (this.points) {
                            var startPoint = lodash_5.default.find(this.points, function (p) { return p.Options.type === PointType_2.PointType.start; });
                            result = this.getVisibleChildrens(startPoint).filter(function (x) { return x.Options.type === PointType_2.PointType.characteristic; });
                        }
                        this.$emit("active", result);
                        return result;
                    },
                    points: function () {
                        return this.graph.Nodes;
                    }
                },
                methods: {
                    isFromStart: function (node) {
                        return lodash_5.default.findIndex(this.graph.Connectors, function (x) { return x.Start.Options.type === PointType_2.PointType.start && x.End.name === node.name; }) >= 0;
                    },
                    getPointInDependencies: function (point) {
                        return this.graph.Connectors.filter(function (x) { return x.End.name === point.name; });
                    },
                    getStartPointByDep: function (dep) {
                        return lodash_5.default.find(this.points, function (x) { return x.name === dep.Start.name; });
                    },
                    reActiveChildrens: function (point) {
                        var _this = this;
                        var childrens = this.getChildren(point);
                        childrens.forEach(function (child) {
                            if (!child) {
                                return;
                            }
                            var deps = _this.getPointInDependencies(child);
                            child.Active = lodash_5.default.findIndex(deps, function (dep) { return _this.isDependencyPass(dep); }) >= 0;
                            if (!child.Active) {
                                _this.reActiveChildrens(child);
                            }
                        });
                    },
                    getChildren: function (node) {
                        var _this = this;
                        return this.graph.Connectors.filter(function (x) { return x.Start.name === node.name; }).map(function (x) { return _this.getPointByName(x.End.name); });
                    },
                    isDependencyPass: function (dep) {
                        var start = dep.Start;
                        var value = this.selectedValues[start.name];
                        if (dep.Rules) {
                            if (start.Options.type === PointType_2.PointType.characteristic) {
                                if (lodash_5.default.isArray(dep.Rules.Values) && dep.Rules.Values.length) {
                                    if (value) {
                                        return lodash_5.default.findIndex(dep.Rules.Values, function (x) { return x.Id === value.Id; }) >= 0;
                                    }
                                    return false;
                                }
                            }
                        }
                        return true;
                    },
                    getPointByName: function (name) {
                        return lodash_5.default.find(this.points, function (x) { return x.name === name; });
                    },
                    getVisibleChildrens: function (point) {
                        var _this = this;
                        var childrens = this.getChildren(point);
                        var actives = childrens.filter(function (x) {
                            if (!x) {
                                return false;
                            }
                            var deps = _this.getPointInDependencies(x);
                            switch (x.Options.type) {
                                case PointType_2.PointType.characteristic:
                                case PointType_2.PointType.start:
                                    return lodash_5.default.findIndex(deps, function (dep) { return _this.isDependencyPass(dep); }) >= 0;
                                case PointType_2.PointType.aggregator: {
                                    return lodash_5.default.every(deps, function (dep) { return _this.isDependencyPass(dep); });
                                }
                            }
                        });
                        var activeChildrens = [];
                        actives.forEach(function (x) { return activeChildrens = lodash_5.default.concat(activeChildrens, _this.getVisibleChildrens(x)); });
                        return lodash_5.default.union(actives, activeChildrens);
                    }
                },
                watch: {
                    graph: function () {
                        this.$emit("graph-change");
                    }
                }
            }));
        }
    };
});
System.register("components/CharacteristicDiagram", ["vue", "lodash", "syncfusion", "mixins/m_lodash", "components/Diagram/AddDependPointWindow", "components/Diagram/Handler/AddDependedPoint", "components/Diagram/Handler/ChangePointSettingHandler", "Model/PointType", "mixins/IdGenerator", "components/Diagram/Test/GraphTestControll"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var vue_5, lodash_6, m_lodash_1, AddDependPointWindow_1, AddDependedPoint_1, ChangePointSettingHandler_1, PointType_3, IdGenerator_3, GraphTestControll_1, constraints;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
            },
            function (lodash_6_1) {
                lodash_6 = lodash_6_1;
            },
            function (_1) {
            },
            function (m_lodash_1_1) {
                m_lodash_1 = m_lodash_1_1;
            },
            function (AddDependPointWindow_1_1) {
                AddDependPointWindow_1 = AddDependPointWindow_1_1;
            },
            function (AddDependedPoint_1_1) {
                AddDependedPoint_1 = AddDependedPoint_1_1;
            },
            function (ChangePointSettingHandler_1_1) {
                ChangePointSettingHandler_1 = ChangePointSettingHandler_1_1;
            },
            function (PointType_3_1) {
                PointType_3 = PointType_3_1;
            },
            function (IdGenerator_3_1) {
                IdGenerator_3 = IdGenerator_3_1;
            },
            function (GraphTestControll_1_1) {
                GraphTestControll_1 = GraphTestControll_1_1;
            }
        ],
        execute: function () {
            constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;
            exports_14("default", vue_5.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height", "characteristics", "roles"],
                data: function () {
                    return {
                        bus: new vue_5.default(),
                        showDependModal: false,
                        offsetYMargin: 250,
                        addMode: false,
                        diagramInit: false,
                        selectedNodes: [],
                        isModalWindow: true,
                        IsOverviewActive: true
                    };
                },
                computed: {
                    heightPx: function () {
                        return this.height + "px";
                    },
                    diagramId: function () {
                        return this.graph.Name;
                    },
                    diagramElId: function () {
                        return "#" + this.diagramId;
                    },
                    diagramOverviewElId: function () {
                        return this.diagramElId + "_overview";
                    },
                    diagram: function () {
                        return this.diagramInit ? $(this.diagramElId).ejDiagram("instance") : null;
                    },
                    firstSelectNode: function () {
                        return this.selectedNodes && this.selectedNodes.length > 0 ? this.selectedNodes[0] : null;
                    },
                    firstSelectNodeValues: function () {
                        return this.firstSelectNode ? this.firstSelectNode.Values : null;
                    },
                    firstSelectNodeDependency: function () {
                        var _this = this;
                        return this.graph && this.firstSelectNode ? this.graph.Connectors.filter(function (x) { return x.End.name === _this.firstSelectNode.name; }) : null;
                    },
                    dependSelectedNodes: function () {
                        return this.selectedNodes ? this.selectedNodes.map(function (x) {
                            return {
                                Name: IdGenerator_3.uniqId(),
                                Start: x,
                                End: null,
                                Rules: {
                                    Values: [],
                                    Roles: []
                                }
                            };
                        }) : null;
                    },
                    connectors: function () {
                        var _this = this;
                        this.graph.Connectors.forEach(function (x) { return _this.updateConnectorLabel(x); });
                        return this.graph.Connectors;
                    },
                    nodes: function () {
                        var _this = this;
                        this.graph.Nodes.forEach(function (x) { return _this.updateNodeLabel(x); });
                        return this.graph.Nodes;
                    }
                },
                methods: {
                    selectionChange: function (selectedItems) {
                        var _this = this;
                        if (!selectedItems || selectedItems.length <= 0) {
                            this.selectedNodes = null;
                            return;
                        }
                        var selectedNodes = selectedItems.filter(function (x) { return x._type === "node"; });
                        this.selectedNodes = lodash_6.default.map(selectedNodes, function (x) { return lodash_6.default.find(_this.graph.Nodes, function (y) { return y.name === x.name; }); });
                    },
                    commitPointAndDependency: function (options) {
                        var _this = this;
                        var points = options.points;
                        var dependency = options.dependency;
                        points.forEach(function (point) { return _this.commitPoint(point); });
                        dependency.forEach(function (dep) { return _this.commitConnection(dep); });
                        this.showDependModal = false;
                    },
                    commitConnection: function (options) {
                        this.$emit("on-add-connection", {
                            graph: this.diagramId,
                            dep: options
                        });
                    },
                    commitPoint: function (options) {
                        this.$emit("on-add-node", {
                            graph: this.diagramId,
                            point: options
                        });
                    },
                    openAddDependModal: function (option) {
                        this.addMode = true;
                        this.showDependModal = true;
                    },
                    openChangePointModal: function (option) {
                        this.addMode = false;
                        this.showDependModal = true;
                    },
                    updateNodeProp: m_lodash_1.default(function (args) {
                        var node = lodash_6.default.find(this.graph.Nodes, function (node) { return node.name === args.element.name; });
                        if (node) {
                            this.$emit("node-prop-change", {
                                graph: this.graph.Name,
                                name: node.name,
                                propName: args.propertyName,
                                newValue: args.element[args.propertyName]
                            });
                        }
                    }, 500, function (x) { return x.propertyName; }),
                    updateNodeLabel: function (node) {
                        if (node.Options) {
                            var property = this.getNodeProperties(node);
                            lodash_6.default.assign(node, property);
                        }
                        if (!node.labels || node.labels.length <= 0) {
                            node.labels = [{
                                    name: "label1",
                                    bold: true,
                                    fontColor: "black",
                                    horizontalAlignment: ej.datavisualization.Diagram.HorizontalAlignment.Right,
                                    verticalAlignment: ej.datavisualization.Diagram.VerticalAlignment.Bottom,
                                    offset: {
                                        y: 1.2,
                                        x: 0.8
                                    },
                                    boundaryConstraints: false
                                }];
                        }
                        node.labels[0].text = node.Label;
                    },
                    updateConnectorLabel: function (connector) {
                        if (!connector.labels || connector.labels.lenght <= 0) {
                            connector.labels = [{
                                    name: "label2",
                                    bold: true,
                                    fontColor: "black",
                                    alignment: "center",
                                    boundaryConstraints: false,
                                    offset: ej.datavisualization.Diagram.Point(0, 0)
                                }];
                        }
                        connector.labels[0].text = connector.Label;
                    },
                    goTest: function () {
                        this.IsOverviewActive = false;
                    },
                    goOverview: function () {
                        this.IsOverviewActive = true;
                    },
                    testActiveNode: function (actives) {
                        var _this = this;
                        if (!lodash_6.default.isArray(actives) || !this.diagram) {
                            return;
                        }
                        this.graph.Nodes.forEach(function (node) {
                            var active = node.Options.type === PointType_3.PointType.start || lodash_6.default.findIndex(actives, function (x) { return x.name === node.name; }) >= 0;
                            var properties = !_this.IsOverviewActive && active ? {
                                fillColor: "#a6f568"
                            } : _this.getNodeProperties(node);
                            _this.diagram.updateNode(node.name, properties);
                        });
                    },
                    getNodeProperties: function (node) {
                        switch (node.Options.type) {
                            case PointType_3.PointType.start:
                                return {
                                    fillColor: "#29c15f",
                                    shape: "ellipse"
                                };
                            case PointType_3.PointType.characteristic:
                                return {
                                    fillColor: "#2085c9",
                                    shape: "rectangle"
                                };
                            case PointType_3.PointType.aggregator:
                                return {
                                    fillColor: "#ec7e0d",
                                    shape: "ellipse"
                                };
                        }
                    },
                    removeConnector: function (connector) {
                        this.$emit("remove-connection", {
                            graph: this.graph.Name,
                            connectorName: connector.Name
                        });
                    },
                    removeNode: function (node) {
                        this.$emit("remove-node", {
                            graph: this.graph.Name,
                            nodeName: node.name
                        });
                    },
                    connectionChange: function (options) {
                        var dep = {
                            Name: options.element.Name
                        };
                        switch (options.endPoint) {
                            case "targetEndPoint":
                                dep.End = options.connection;
                                break;
                            case "sourceEndPoint":
                                return;
                            default:
                                return;
                        }
                        this.$emit("on-add-connection", {
                            graph: this.graph.Name,
                            dep: dep
                        });
                    }
                },
                mounted: function () {
                    var _this = this;
                    var $this = this;
                    this.bus.$on("add-depend-point", function (options) { return _this.openAddDependModal(options); });
                    this.bus.$on("change-point", function (options) { return _this.openChangePointModal(options); });
                    $(this.diagramElId).ejDiagram({
                        enableContextMenu: false,
                        constraints: constraints,
                        width: "100%",
                        height: this.heightPx,
                        nodes: this.nodes,
                        connectors: this.connectors,
                        defaultSettings: {
                            node: {
                                width: 65,
                                height: 65,
                                borderWidth: 0
                            },
                            connector: {
                                segments: [{
                                        "type": "orthogonal"
                                    }]
                            }
                        },
                        scrollSettings: {
                            horizontalOffset: 0,
                            verticalOffset: 0,
                            zoomFactor: 0.2
                        },
                        enableAutoScroll: true,
                        pageSettings: {
                            scrollLimit: "infinity"
                        },
                        selectedItems: {
                            userHandles: [AddDependedPoint_1.default({
                                    bus: this.bus
                                }), ChangePointSettingHandler_1.default({
                                    bus: this.bus
                                })]
                        },
                        propertyChange: function (args) {
                            $this.$emit("propertyChange", args);
                            if (args.elementType === "node") {
                                if (lodash_6.default.includes(["offsetX", "offsetY"], args.propertyName)) {
                                    $this.updateNodeProp(args);
                                }
                            }
                        },
                        selectionChange: function (options) {
                            $this.selectionChange(options.selectedItems);
                        },
                        connectorCollectionChange: function (options) {
                            if (options.changeType === "remove") {
                                $this.removeConnector(options.element);
                            }
                        },
                        nodeCollectionChange: function (options) {
                            if (options.changeType === "remove") {
                                $this.removeNode(options.element);
                            }
                        },
                        connectionChange: function (options) {
                            $this.connectionChange(options);
                        }
                    });
                    $(this.diagramOverviewElId).ejOverview({
                        sourceID: this.diagramId,
                        width: "100%",
                        height: this.heightPx
                    });
                    this.diagramInit = true;
                },
                components: {
                    addDependModalWindow: AddDependPointWindow_1.default,
                    testControll: GraphTestControll_1.default
                },
                watch: {
                    graph: function (val) {
                        var _this = this;
                        var diagram = this.diagram;
                        var nodes = diagram.nodes();
                        var connectors = diagram.connectors();
                        val.Nodes.forEach(function (x) {
                            _this.updateNodeLabel(x);
                            var node = lodash_6.default.find(nodes, function (y) { return y.name === x.name; });
                            if (node) {
                                var diffNode = m_lodash_1.difference(x, node);
                                if (diffNode) {
                                    diagram.updateNode(node.name, diffNode);
                                }
                                var diffLabel = m_lodash_1.difference(x.labels[0], node.labels[0]);
                                if (diffLabel) {
                                    diagram.updateLabel(node.name, node.labels[0], diffLabel);
                                }
                            }
                            else {
                                diagram.add(x);
                            }
                        });
                        val.Connectors.forEach(function (x) {
                            _this.updateConnectorLabel(x);
                            var conn = lodash_6.default.find(connectors, function (y) { return y.name === x.Name; });
                            if (conn) {
                                var diffConn = m_lodash_1.difference(x, conn);
                                if (diffConn) {
                                    diagram.updateConnector(conn.name, diffConn);
                                }
                                if (conn.labels.length > 0) {
                                    var diffLabel = m_lodash_1.difference(x.labels[0], conn.labels[0]);
                                    if (diffLabel) {
                                        diagram.updateLabel(conn.name, conn.labels[0], diffLabel);
                                    }
                                }
                                else {
                                    diagram.addLabel(conn.name, x.labels[0]);
                                }
                            }
                            else {
                                diagram.add(x);
                            }
                        });
                    }
                }
            }));
        }
    };
});
System.register("Model/Graph", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Characteristic", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/RootState", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Node", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Connector", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Graph", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Store/GraphStore", ["vue", "vuex-typescript", "lodash", "mixins/IdGenerator"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var vue_6, vuex_typescript_1, lodash_7, IdGenerator_4, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty, removeConnection, removeNode;
    return {
        setters: [
            function (vue_6_1) {
                vue_6 = vue_6_1;
            },
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_7_1) {
                lodash_7 = lodash_7_1;
            },
            function (IdGenerator_4_1) {
                IdGenerator_4 = IdGenerator_4_1;
            }
        ],
        execute: function () {
            exports_21("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [],
                    Characteristics: [
                        {
                            Name: "Char 1",
                            Values: [{
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 1. Value 1"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 1. Value 2"
                                }]
                        },
                        {
                            Name: "Char 2",
                            Values: [{
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 2. Value 1"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 2. Value 2"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 2. Value 3"
                                }
                            ]
                        },
                        {
                            Name: "Char 3",
                            Values: [{
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 1"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 2"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 3"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 4"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 5"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 6"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 7"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 8"
                                }, {
                                    Id: IdGenerator_4.uniqId(),
                                    Name: "Char 3. Value 9"
                                }
                            ]
                        }
                    ],
                    Roles: [
                        {
                            Id: IdGenerator_4.uniqId(),
                            Name: "Role 1"
                        },
                        {
                            Id: IdGenerator_4.uniqId(),
                            Name: "Role 2"
                        },
                        {
                            Id: IdGenerator_4.uniqId(),
                            Name: "Role 3"
                        }
                    ]
                },
                getters: {
                    getGraph: function (state) {
                        return state.Graphs;
                    },
                    graphCount: function (state) {
                        return state.Graphs.length;
                    },
                    getSyncfusionGraphByName: function (state) {
                        return function (name) {
                            var graph = lodash_7.default.first(state.Graphs.filter(function (x) { return x.Name === name; }));
                            return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
                        };
                    },
                    getSyncfusiongGraphByGraph: function (state) {
                        return function (graph) {
                            return {
                                Name: graph.Name,
                                Nodes: graph.Points,
                                Connectors: lodash_7.default.map(graph.Dependencies, function (con) {
                                    return lodash_7.default.merge({
                                        name: con.Name,
                                        sourceNode: con.Start ? con.Start.name : null,
                                        targetNode: con.End ? con.End.name : null
                                    }, con);
                                })
                            };
                        };
                    },
                    getCharacteristicsList: function (state) {
                        return state.Characteristics;
                    },
                    getRoles: function (state) {
                        return state.Roles;
                    }
                },
                mutations: {
                    addGraph: function (state, item) {
                        state.Graphs.push(item);
                    },
                    addPoint: function (state, item) {
                        var graph = lodash_7.default.find(state.Graphs, function (x) { return x.Name === item.graph; });
                        var duplicatePointIndex = lodash_7.default.findIndex(graph.Points, function (x) { return x.name === item.point.name; });
                        if (duplicatePointIndex < 0) {
                            graph.Points.push(item.point);
                        }
                        else {
                            var duplicatePoint = graph.Points[duplicatePointIndex];
                            lodash_7.default.assign(duplicatePoint, item.point);
                            graph.Points.splice(duplicatePointIndex, 1, duplicatePoint);
                        }
                    },
                    addDependency: function (state, item) {
                        //TODO: Применить измение к диаграме
                        var graph = lodash_7.default.find(state.Graphs, function (x) { return x.Name === item.graph; });
                        var duplicateDepIndex = lodash_7.default.findIndex(graph.Dependencies, function (x) { return x.Name === item.dep.Name; });
                        if (duplicateDepIndex < 0) {
                            graph.Dependencies.push(item.dep);
                        }
                        else {
                            var duplicateDep = graph.Dependencies[duplicateDepIndex];
                            lodash_7.default.assign(duplicateDep, item.dep);
                            graph.Dependencies.splice(duplicateDepIndex, 1, duplicateDep);
                        }
                    },
                    changeNodeProperty: function (state, item) {
                        var points = lodash_7.default.find(state.Graphs, function (x) { return x.Name === item.graph; }).Points;
                        var point = lodash_7.default.find(points, function (x) { return x.name === item.name; });
                        vue_6.default.set(point, item.propName, item.newValue);
                    },
                    removeConnection: function (state, options) {
                        var graph = lodash_7.default.find(state.Graphs, function (x) { return x.Name === options.graph; });
                        lodash_7.default.remove(graph.Dependencies, function (x) { return x.Name === options.connectorName; });
                    },
                    removeNode: function (state, options) {
                        var graph = lodash_7.default.find(state.Graphs, function (x) { return x.Name === options.graph; });
                        lodash_7.default.remove(graph.Points, function (x) { return x.name === options.nodeName; });
                    }
                }
            });
            _a = vuex_typescript_1.getStoreAccessors("graph"), read = _a.read, commit = _a.commit;
            exports_21("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_21("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_21("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_21("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_21("getCharacteristicsList", getCharacteristicsList = read(graphModule.getters.getCharacteristicsList));
            exports_21("getRoles", getRoles = read(graphModule.getters.getRoles));
            exports_21("addGraph", addGraph = commit(graphModule.mutations.addGraph));
            exports_21("addPoint", addPoint = commit(graphModule.mutations.addPoint));
            exports_21("addDependency", addDependency = commit(graphModule.mutations.addDependency));
            exports_21("changeNodeProperty", changeNodeProperty = commit(graphModule.mutations.changeNodeProperty));
            exports_21("removeConnection", removeConnection = commit(graphModule.mutations.removeConnection));
            exports_21("removeNode", removeNode = commit(graphModule.mutations.removeNode));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore", "vuex-persist"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var vue_7, vuex_1, GraphStore_1, vuex_persist_1, vuexLocal, createStore;
    return {
        setters: [
            function (vue_7_1) {
                vue_7 = vue_7_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (GraphStore_1_1) {
                GraphStore_1 = GraphStore_1_1;
            },
            function (vuex_persist_1_1) {
                vuex_persist_1 = vuex_persist_1_1;
            }
        ],
        execute: function () {
            vue_7.default.use(vuex_1.default);
            vuexLocal = new vuex_persist_1.default({
                storage: window.localStorage
            });
            exports_22("createStore", createStore = function () {
                return new vuex_1.default.Store({
                    modules: {
                        graph: GraphStore_1.graphModule
                    },
                    plugins: [vuexLocal.plugin],
                    strict: true
                });
            });
        }
    };
});
System.register("components/ModalWindow/ModalWindow", ["vue", "mixins/IdGenerator"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var vue_8, IdGenerator_5;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
            },
            function (IdGenerator_5_1) {
                IdGenerator_5 = IdGenerator_5_1;
            }
        ],
        execute: function () {
            exports_23("default", vue_8.default.extend({
                template: "#modal-window",
                props: ["show"],
                data: function () {
                    return {
                        elId: null
                    };
                },
                computed: {
                    selectorId: function () {
                        return "#" + this.elId;
                    }
                },
                created: function () {
                    this.elId = IdGenerator_5.uniqId();
                },
                mounted: function () {
                    var _this = this;
                    $(this.selectorId)
                        .on('hidden.bs.modal', function () { return _this.close(); });
                },
                methods: {
                    close: function () {
                        this.$emit("close");
                    }
                },
                watch: {
                    show: function (val) {
                        if (val) {
                            $(this.selectorId).modal("show");
                        }
                        else {
                            $(this.selectorId).modal("hide");
                        }
                    }
                }
            }));
        }
    };
});
System.register("components/ModalWindow/Standart/StandartModalWindow", ["vue", "components/ModalWindow/ModalWindow"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var vue_9, ModalWindow_1;
    return {
        setters: [
            function (vue_9_1) {
                vue_9 = vue_9_1;
            },
            function (ModalWindow_1_1) {
                ModalWindow_1 = ModalWindow_1_1;
            }
        ],
        execute: function () {
            exports_24("default", vue_9.default.extend({
                template: "#standart-modal-window",
                props: ["title", "show"],
                methods: {
                    close: function () {
                        this.$emit("close");
                    }
                },
                components: {
                    ModalWindow: ModalWindow_1.default
                }
            }));
        }
    };
});
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType", "mixins/IdGenerator", "components/ModalWindow/Standart/StandartModalWindow", "axios"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var vue_10, CharacteristicDiagram_1, RootStore_1, graph, PointType_4, IdGenerator_6, StandartModalWindow_1, axios_1, _Vue, _axios, store;
    return {
        setters: [
            function (vue_10_1) {
                vue_10 = vue_10_1;
            },
            function (CharacteristicDiagram_1_1) {
                CharacteristicDiagram_1 = CharacteristicDiagram_1_1;
            },
            function (RootStore_1_1) {
                RootStore_1 = RootStore_1_1;
            },
            function (graph_1) {
                graph = graph_1;
            },
            function (PointType_4_1) {
                PointType_4 = PointType_4_1;
            },
            function (IdGenerator_6_1) {
                IdGenerator_6 = IdGenerator_6_1;
            },
            function (StandartModalWindow_1_1) {
                StandartModalWindow_1 = StandartModalWindow_1_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            _Vue = vue_10.default;
            _axios = axios_1.default;
            store = RootStore_1.createStore();
            exports_25("default", _Vue.extend({
                template: '#app-hello-template',
                store: store,
                data: function () {
                    return {
                        message: "test message",
                        showAddGraph: false,
                        addedCategory: null
                    };
                },
                computed: {
                    test: function () {
                        return graph.readGraph(this.$store)[0].Points.map(function (x) { return x.Label; });
                    },
                    diagrams: function () {
                        var _this = this;
                        return graph.readGraph(this.$store).map(function (x) { return graph.getSyncfusiongGraphByGraph(_this.$store)(x); });
                    },
                    roles: function () {
                        return graph.getRoles(this.$store);
                    },
                    characteristicUrl: function () {
                        return "api/GetCharacteristic";
                    },
                    categoryUrl: function () {
                        return "api/GetCategory";
                    },
                },
                asyncData: {
                    characteristics: function () {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            _axios({
                                url: _this.characteristicUrl,
                                data: {}
                            })
                                .then(function (response) { return resolve(response.data.map(function (x) {
                                return {
                                    Id: x.id,
                                    Name: x.name
                                };
                            })); });
                        });
                    },
                    categories: function () {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            _axios.get(_this.categoryUrl, {
                                data: {},
                                transformResponse: _axios.defaults.transformResponse.concat(function (data) {
                                    return data.map(function (x) {
                                        return {
                                            Id: x.id,
                                            Name: x.name
                                        };
                                    });
                                })
                            })
                                .then(function (response) { return resolve(response.data); });
                        });
                    }
                },
                methods: {
                    addGraphClick: function () {
                        this.showAddGraph = true;
                    },
                    addGraph: function () {
                        graph.addGraph(this.$store, {
                            Name: "Graph_" + IdGenerator_6.uniqId(),
                            Points: [{
                                    name: IdGenerator_6.uniqId(),
                                    offsetX: 500,
                                    offsetY: 20,
                                    Label: "Start",
                                    Options: {
                                        type: PointType_4.PointType.start
                                    },
                                    Category: this.addedCategory
                                }],
                            Dependencies: []
                        });
                    },
                    addNode: function (node) {
                        graph.addPoint(this.$store, node);
                    },
                    addConnection: function (connect) {
                        graph.addDependency(this.$store, connect);
                    },
                    onNodePropChange: function (options) {
                        graph.changeNodeProperty(this.$store, options);
                    },
                    removeConnection: function (options) {
                        graph.removeConnection(this.$store, options);
                    },
                    removeNode: function (options) {
                        graph.removeNode(this.$store, options);
                    }
                },
                components: {
                    CharacteristicDiagram: CharacteristicDiagram_1.default,
                    StandartModalWindow: StandartModalWindow_1.default
                }
            }));
        }
    };
});
System.register("index", ["vue", "components/AppHello", "vue-async-data-2", "vue-async-computed", "vue-select"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var vue_11, AppHello_1, vue_async_data_2_1, vue_async_computed_1, vue_select_1, v;
    return {
        setters: [
            function (vue_11_1) {
                vue_11 = vue_11_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            },
            function (vue_async_data_2_1_1) {
                vue_async_data_2_1 = vue_async_data_2_1_1;
            },
            function (vue_async_computed_1_1) {
                vue_async_computed_1 = vue_async_computed_1_1;
            },
            function (vue_select_1_1) {
                vue_select_1 = vue_select_1_1;
            }
        ],
        execute: function () {
            //Plugin
            vue_11.default.use(vue_async_data_2_1.default.AsyncDataPlugin);
            vue_11.default.use(vue_async_computed_1.default);
            vue_11.default.component('v-select', vue_select_1.default);
            //Root Component
            v = new vue_11.default({
                el: "#app-root",
                template: '<AppHello/>',
                //render: h => h(AppHelloComponent),
                components: {
                    AppHello: AppHello_1.default
                }
            });
        }
    };
});
System.register("Model/CharacteristicPoint", [], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/IDependencyRole", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/Category/AddCategoryGraphWindow", ["vue", "mixins/IdGenerator"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var vue_12, IdGenerator_7;
    return {
        setters: [
            function (vue_12_1) {
                vue_12 = vue_12_1;
            },
            function (IdGenerator_7_1) {
                IdGenerator_7 = IdGenerator_7_1;
            }
        ],
        execute: function () {
            exports_29("default", vue_12.default.extend({
                template: "#add-graph",
                props: ["categories"],
                data: function () {
                    return {
                        show: false,
                        elId: null
                    };
                },
                mounted: function () {
                    var _this = this;
                    $(this.elId)
                        .on('hidden.bs.modal', function () { return _this.close(); });
                },
                created: function () {
                    this.elId = IdGenerator_7.uniqId();
                },
                methods: {
                    close: function () {
                        this.$emit("close");
                    }
                },
                watch: {
                    show: function (val) {
                        if (val) {
                            $(this.elId).modal("show");
                        }
                        else {
                            $(this.elId).modal("hide");
                        }
                    }
                }
            }));
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQXN5bmNTZWxlY3QvQXN5bmNTZWxlY3RDb21wb25lbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL0FkZERlcGVuZFBvaW50V2luZG93LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0FkZERlcGVuZGVkUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL0hhbmRsZXIvQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlci50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9DaGFyYWN0ZXJpc3RpY1ZhbHVlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1JvbGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvRGVwZW5kZW5jeS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9CYXNlUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1Rlc3QvR3JhcGhUZXN0Q29udHJvbGwudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9DaGFyYWN0ZXJpc3RpY0RpYWdyYW0udHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWMudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUm9vdFN0YXRlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Db25uZWN0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL0dyYXBoU3RvcmUudHMiLCIuLi8uLi9DbGllbnRBcHAvU3RvcmUvUm9vdFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTW9kYWxXaW5kb3cvTW9kYWxXaW5kb3cudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9Nb2RhbFdpbmRvdy9TdGFuZGFydC9TdGFuZGFydE1vZGFsV2luZG93LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQXBwSGVsbG8udHMiLCIuLi8uLi9DbGllbnRBcHAvaW5kZXgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNQb2ludC50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9JRGVwZW5kZW5jeVJvbGUudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9DYXRlZ29yeS9BZGRDYXRlZ29yeUdyYXBoV2luZG93LnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N0YXJ0UG9pbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0EseUJBQXdDLElBQUksRUFBRSxJQUFRLEVBQUUsUUFBUSxFQUFFLE9BQVk7UUFBaEMscUJBQUEsRUFBQSxRQUFRO1FBQVksd0JBQUEsRUFBQSxZQUFZO1FBQzdFLElBQUksR0FBRyxHQUFHLGdCQUFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUEvQixDQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMs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Y2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lbW9pemVEZWJvdW5jZShmdW5jLCB3YWl0ID0gMCwgcmVzb2x2ZXIsIG9wdGlvbnMgPSB7fSkge1xyXG5cdHZhciBtZW0gPSBfLm1lbW9pemUoKCkgPT4gXy5kZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSwgcmVzb2x2ZXIpO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSBmdW5jdGlvbihvYmplY3QsIGJhc2UpIHtcblx0ZnVuY3Rpb24gY2hhbmdlcyhvYmplY3QsIGJhc2UpIHtcblx0XHRyZXR1cm4gXy50cmFuc2Zvcm0ob2JqZWN0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG5cdFx0XHRpZiAoIV8uaXNFcXVhbCh2YWx1ZSwgYmFzZVtrZXldKSkge1xuXHRcdFx0XHR2YXIgcmVzID0gKF8uaXNPYmplY3QodmFsdWUpICYmIF8uaXNPYmplY3QoYmFzZVtrZXldKSkgPyBjaGFuZ2VzKHZhbHVlLCBiYXNlW2tleV0pIDogdmFsdWU7XG5cdFx0XHRcdGlmICghXy5pc0VtcHR5KHJlcykpIHtcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHZhciBjaGFuZ2VkID0gY2hhbmdlcyhvYmplY3QsIGJhc2UpO1xuXHRyZXR1cm4gXy5pc0VtcHR5KGNoYW5nZWQpID8gbnVsbCA6IGNoYW5nZWQ7XG59IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XHJcbi8v0J/RgNC4INC60L7QvNC/0LjQu9GP0YbQuNC4IHR5cGVzY3JpcHQg0LLRi9GB0LrQsNC60LjQstCw0LXRgiDQvtGI0LjQsdC60LAgXCLQvdC1INC90LDRhdC+0LTQuNGCINGB0LLQvtC50YHRgtCy0LAgdG9nZ2xlc1JvbGVzXCIg0YLQvtC70YzQutC+INC60L7Qs9C00LAgcHJvcHM6IE9iamVjdFxyXG4vL9Ce0LHRhdC+0LTQvdC+0LUg0YDQtdGI0LXQvdC40LVcclxudmFyIFZ1ZVA6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZVAuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRwb2ludDogT2JqZWN0LFxyXG5cdFx0aW5kZXg6IFtOdW1iZXIsIFN0cmluZ10sXHJcblx0XHRyb2xlczogQXJyYXksXHJcblx0XHRyb2xlV2l0aERldGFpbDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFJvbGU6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRvblJvbGVTZWxlY3RDbGljaygpIHtcclxuXHRcdFx0dGhpcy5hZGRSb2xlKHtcclxuXHRcdFx0XHRyb2xlOiB0aGlzLnNlbGVjdGVkUm9sZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGRSb2xlKHJvbGVJbmZvKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnB1c2gocm9sZUluZm8pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZVJvbGVCeUluZGV4KGluZGV4KSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dW5pcSgpIHtcclxuXHRcdFx0cmV0dXJuIFwiX1wiICsgdGhpcy5pbmRleDtcclxuXHRcdH0sXHJcblx0XHRleGlzdHNSb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucm9sZXMuZmlsdGVyKHggPT5cclxuXHRcdFx0XHRfLmZpbmRJbmRleCh0aGlzLnRvZ2dsZXNSb2xlcywgKHk6IGFueSkgPT4geS5yb2xlLk5hbWUgPT0geC5OYW1lKSA8IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1ZhbHVlcykgPyBbXSA6IHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1JvbGVzKSA/IFtdIDogdGhpcy50b2dnbGVzUm9sZXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwidXBkYXRlOnRvZ2dsZXNSb2xlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdW5pcUlkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBfLnVuaXF1ZUlkKCkgKyBcIl9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbn07IiwiXHJcbmV4cG9ydCBlbnVtIFBvaW50VHlwZSB7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGNoYXJhY3RlcmlzdGljLFxyXG5cdGFnZ3JlZ2F0b3JcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi8uLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuXHJcbnZhciBfVnVlOiBhbnkgPSBWdWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FzeW5jLXNlbGVjdFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRpZDoge1xyXG5cdFx0XHR0eXBlOiBTdHJpbmcsXHJcblx0XHRcdGRlZmF1bHQ6IHVuaXFJZCgpXHJcblx0XHR9LFxyXG5cdFx0dXJsOiBTdHJpbmdcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRzeW5jX2lkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJzZWxlY3RfXCIgKyB0aGlzLmlkO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0YXN5bmNEYXRhOiB7XHJcblx0XHR1c2VyTmFtZSgpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KF8gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgncmlzYScpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KCdmZXRjaCBlcnJvci4uLicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgUnVsZUNvbnRyb2xsIGZyb20gXCIuL1J1bGVDb250cm9sbFwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IEFzeW5jU2VsZWN0IGZyb20gXCIuLi9Bc3luY1NlbGVjdC9Bc3luY1NlbGVjdENvbXBvbmVudFwiO1xyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuZGVjbGFyZSBjb25zdCBPYmplY3Q6IGFueTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cG9pbnQ6IHtcclxuXHRcdFx0bmFtZTogbnVsbCxcclxuXHRcdFx0RGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0XHRMYWJlbDogbnVsbCxcclxuXHRcdFx0Q2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFJvbGVzOiBudWxsLFxyXG5cdFx0XHRSZXF1aXJlZDogZmFsc2UsXHJcblx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWNcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHVuaXFJZDogdW5pcUlkKCksXHJcblx0XHRvZmZzZXRZRGVsdGE6IDI1MCxcclxuXHRcdGFkZEV4aXN0Q2hhcmFjdGVyaXN0aWM6IGZhbHNlLFxyXG5cdFx0ZXhpc3RQb2ludDogbnVsbFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNhZGQtZGVwZW5kLXBvaW50XCIsXHJcblx0cHJvcHM6IFtcInNob3dcIiwgXCJpZFwiLCBcImRlcGVuZGVuY3lcIiwgXCJyb2xlc1wiLCBcImRlZmF1bHRQb2ludFwiLCBcImRlZmF1bHREZXBlbmRlbmN5XCIsIFwiaXNNb2RhbFdpbmRvd1wiLCBcInBvaW50c1wiLCBcImNoYXJhY3RlcmlzdGljc1wiXSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRSdWxlQ29udHJvbGxcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRlbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjYWRkLWRlcGVuZC1wb2ludF9cIiArIHRoaXMuaWQ7XHJcblx0XHR9LFxyXG5cdFx0bWFpbkNsYXNzT2JqZWN0KCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG1vZGFsOiB0aGlzLmlzTW9kYWxXaW5kb3csXHJcblx0XHRcdFx0ZmFkZTogdGhpcy5pc01vZGFsV2luZG93XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0bW9kYWxNYXhXaWR0aCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNNb2RhbFdpbmRvdyA/IFwiODAlXCIgOiBcIjEwMCVcIjtcclxuXHRcdH0sXHJcblx0XHRlbmRQb2ludCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkRXhpc3RDaGFyYWN0ZXJpc3RpYyA/IHRoaXMuZXhpc3RQb2ludCA6IF8ubWVyZ2UodGhpcy5wb2ludCwgeyBuYW1lOiB1bmlxSWQoKSB9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGE6IGdldERlZmF1bHRWYWx1ZSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0JCh0aGlzLmVsSWQpXHJcblx0XHRcdC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGNsb3NlKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY2xvc2VcIik7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcy4kZGF0YSwgZ2V0RGVmYXVsdFZhbHVlKCkpO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KCkge1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IHRoaXMuZGVwZW5kZW5jeTtcclxuXHRcdFx0dmFyIG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0QnlEZXBlbmRlbmN5KHRoaXMuZGVwZW5kZW5jeSk7XHJcblxyXG5cdFx0XHR2YXIgcG9pbnRzID0gW107XHJcblx0XHRcdHZhciBwb2ludCA9IF8ubWVyZ2UodGhpcy5lbmRQb2ludCwge1xyXG5cdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdG9mZnNldFk6IG9mZnNldC55ICsgdGhpcy5vZmZzZXRZRGVsdGFcclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBlbmRQb2ludDogYW55ID0gcG9pbnQ7XHJcblxyXG5cdFx0XHRwb2ludHMucHVzaChwb2ludCk7XHJcblx0XHRcdGlmIChkZXBlbmRlbmN5Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHR2YXIgYWRkUG9pbnQgPSB7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIkFuZFwiLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuYWdncmVnYXRvclxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YSAvIDJcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBvaW50cy5wdXNoKGFkZFBvaW50KTtcclxuXHRcdFx0XHRlbmRQb2ludCA9IGFkZFBvaW50O1xyXG5cdFx0XHRcdGRlcGVuZGVuY3kucHVzaCh7XHJcblx0XHRcdFx0XHRFbmQ6IHBvaW50LFxyXG5cdFx0XHRcdFx0U3RhcnQ6IGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRSdWxlczogW11cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZXBlbmRlbmN5LmZpbHRlcih4ID0+IHguRW5kID09PSBudWxsKS5mb3JFYWNoKHggPT4geC5FbmQgPSBlbmRQb2ludCk7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogcG9pbnRzLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IGRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNoYW5nZVBvaW50KCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY29tbWl0LXBvaW50XCIsIHtcclxuXHRcdFx0XHRwb2ludHM6IFt0aGlzLnBvaW50XSxcclxuXHRcdFx0XHRkZXBlbmRlbmN5OiB0aGlzLmRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b25SdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSB2YWwuaW5kZXg7XHJcblx0XHRcdFZ1ZS5zZXQodGhpcy5ydWxlcywgaW5kZXgsIHZhbCk7XHJcblx0XHR9LFxyXG5cdFx0b25TZWxlY3RDaGFyUnVsZUNoYW5nZSh2YWwpIHtcclxuXHRcdFx0Ly90aGlzLnBvaW50LlZhbHVlcyA9IHZhbC5WYWx1ZXM7XHJcblx0XHRcdC8vdGhpcy5wb2ludC5Sb2xlcyA9IHZhbC5Sb2xlcztcclxuXHRcdH0sXHJcblx0XHRnZXRPZmZzZXRCeURlcGVuZGVuY3koZGVwZW5kZW5jaWVzKSB7XHJcblx0XHRcdHZhciBkZXA6IGFueSA9IF8uZmlyc3QoZGVwZW5kZW5jaWVzKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR4OiBkZXAuU3RhcnQub2Zmc2V0WCxcclxuXHRcdFx0XHR5OiBkZXAuU3RhcnQub2Zmc2V0WVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHNob3codmFsKSB7XHJcblx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJzaG93XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcImhpZGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkZWZhdWx0UG9pbnQoZGVmYXVsdFBvaW50KSB7XHJcblx0XHRcdGlmIChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLnBvaW50ID0gZGVmYXVsdFBvaW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBhZGREZXBlbmRQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJhZGQtZGVwZW5kLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQWRkXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbUxlZnQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTE0LjYxMywxMGMwLDAuMjMtMC4xODgsMC40MTktMC40MTksMC40MTlIMTAuNDJ2My43NzRjMCwwLjIzLTAuMTg5LDAuNDItMC40MiwwLjQycy0wLjQxOS0wLjE4OS0wLjQxOS0wLjQydi0zLjc3NEg1LjgwNmMtMC4yMywwLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDE5czAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5aDMuNzc1VjUuODA2YzAtMC4yMywwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOXMwLjQyLDAuMTg5LDAuNDIsMC40MTl2My43NzVoMy43NzRDMTQuNDI1LDkuNTgxLDE0LjYxMyw5Ljc3LDE0LjYxMywxMCBNMTcuOTY5LDEwYzAsNC40MDEtMy41NjcsNy45NjktNy45NjksNy45NjljLTQuNDAyLDAtNy45NjktMy41NjctNy45NjktNy45NjljMC00LjQwMiwzLjU2Ny03Ljk2OSw3Ljk2OS03Ljk2OUMxNC40MDEsMi4wMzEsMTcuOTY5LDUuNTk4LDE3Ljk2OSwxMCBNMTcuMTMsMTBjMC0zLjkzMi0zLjE5OC03LjEzLTcuMTMtNy4xM1MyLjg3LDYuMDY4LDIuODcsMTBjMCwzLjkzMywzLjE5OCw3LjEzLDcuMTMsNy4xM1MxNy4xMywxMy45MzMsMTcuMTMsMTBcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBDaGFuZ2VQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbj86IGFueSkge1xyXG5cdHZhciBmdW5jID0gKGZ1bmN0aW9uIChiYXNlOiBhbnkpIHtcclxuXHRcdGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uZXh0ZW5kKEFkZERlcGVuZFBvaW50LCBiYXNlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBBZGREZXBlbmRQb2ludChuYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0YmFzZS5jYWxsKHRoaXMsIG5hbWUpO1xyXG5cdFx0XHR0aGlzLnNpbmdsZUFjdGlvbiA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvbmVkTm9kZXMgPSBbXTtcclxuXHRcdFx0dGhpcy5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHRcdH1cclxuXHRcdEFkZERlcGVuZFBvaW50LnByb3RvdHlwZS5tb3VzZXVwID0gZnVuY3Rpb24gKGV2dDogYW55KSB7XHJcblx0XHRcdGJhc2UucHJvdG90eXBlLm1vdXNldXAuY2FsbCh0aGlzLCBldnQpO1xyXG5cdFx0XHRvcHRpb24uYnVzLiRlbWl0KFwiY2hhbmdlLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQ2hhbmdlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbVJpZ2h0O1xyXG5cdGFkZERlcGVuZFBvaW50LnZpc2libGUgPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LmVuYWJsZU11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTAsMi4xNzJjLTQuMzI0LDAtNy44MjgsMy41MDQtNy44MjgsNy44MjhTNS42NzYsMTcuODI4LDEwLDE3LjgyOGM0LjMyNCwwLDcuODI4LTMuNTA0LDcuODI4LTcuODI4UzE0LjMyNCwyLjE3MiwxMCwyLjE3Mk0xMCwxNy4wMDRjLTMuODYzLDAtNy4wMDQtMy4xNDEtNy4wMDQtNy4wMDNTNi4xMzcsMi45OTcsMTAsMi45OTdjMy44NjIsMCw3LjAwNCwzLjE0MSw3LjAwNCw3LjAwNFMxMy44NjIsMTcuMDA0LDEwLDE3LjAwNE0xMCw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MlM5LjIwNSwxMS40NDMsMTAsMTEuNDQzczEuNDQxLTAuNjQ3LDEuNDQxLTEuNDQzUzEwLjc5NSw4LjU1OSwxMCw4LjU1OSBNMTAsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTOS42Niw5LjM4MiwxMCw5LjM4MlMxMC42MTgsOS42NjEsMTAuNjE4LDEwUzEwLjM0LDEwLjYxOSwxMCwxMC42MTkgTTE0LjEyLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ3LDEuNDQzLDEuNDQyLDEuNDQzczEuNDQyLTAuNjQ3LDEuNDQyLTEuNDQzUzE0LjkxNSw4LjU1OSwxNC4xMiw4LjU1OSBNMTQuMTIsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThzMC4yNzgtMC42MTgsMC42MTgtMC42MThTMTQuNzM4LDkuNjYxLDE0LjczOCwxMFMxNC40NiwxMC42MTksMTQuMTIsMTAuNjE5IE01Ljg4LDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ2LDEuNDQzLDEuNDQyLDEuNDQzUzcuMzIyLDEwLjc5Niw3LjMyMiwxMFM2LjY3NSw4LjU1OSw1Ljg4LDguNTU5IE01Ljg4LDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4UzUuNTQsOS4zODIsNS44OCw5LjM4MlM2LjQ5OCw5LjY2MSw2LjQ5OCwxMFM2LjIyLDEwLjYxOSw1Ljg4LDEwLjYxOVwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvbGVcclxue1xyXG5cdElkOiBzdHJpbmc7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU/OiBDaGFyYWN0ZXJpc3RpY1ZhbHVlO1xyXG59IiwiaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5IHtcclxuXHRTdGFydDogQmFzZVBvaW50LFxyXG5cdE5hbWU6IHN0cmluZzsgXHJcblx0TGFiZWw/OiBzdHJpbmc7XHJcblx0RW5kOiBCYXNlUG9pbnQ7XHJcblx0Um9sZXM/OiBBcnJheTxJUm9sZT47XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi9Qb2ludFR5cGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVBvaW50IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0b2Zmc2V0WDogYW55O1xyXG5cdG9mZnNldFk6IGFueTtcclxuXHRPcHRpb25zOiB7XHJcblx0XHR0eXBlOiBQb2ludFR5cGU7XHJcblx0fSxcclxuXHRMYWJlbDogc3RyaW5nO1xyXG5cdENhdGVnb3J5OiB7XHJcblx0XHRJZDogc3RyaW5nLFxyXG5cdFx0TmFtZTogc3RyaW5nXHJcblx0fTtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNncmFwaC10ZXN0XCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFZhbHVlczogW10sXHJcblx0XHRcdGR5bmFtaWM6IHtcclxuXHRcdFx0XHRQb2ludHM6IFtdXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0YWN0aXZlUG9pbnRzKCkge1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdGlmICh0aGlzLnBvaW50cykge1xyXG5cdFx0XHRcdHZhciBzdGFydFBvaW50ID0gXy5maW5kKHRoaXMucG9pbnRzLCBwID0+IHAuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQpO1xyXG5cdFx0XHRcdHJlc3VsdCA9IHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVucyhzdGFydFBvaW50KS5maWx0ZXIoeCA9PiB4Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbWl0KFwiYWN0aXZlXCIsIHJlc3VsdCk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9LFxyXG5cdFx0cG9pbnRzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Ob2RlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGlzRnJvbVN0YXJ0KG5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KHRoaXMuZ3JhcGguQ29ubmVjdG9ycywgKHg6IGFueSkgPT4geC5TdGFydC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCAmJiB4LkVuZC5uYW1lID09PSBub2RlLm5hbWUpID49IDA7XHJcblx0XHR9LFxyXG5cdFx0Z2V0UG9pbnRJbkRlcGVuZGVuY2llcyhwb2ludCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguRW5kLm5hbWUgPT09IHBvaW50Lm5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdGdldFN0YXJ0UG9pbnRCeURlcChkZXApIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZCh0aGlzLnBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGRlcC5TdGFydC5uYW1lKTtcclxuXHRcdH0sXHJcblx0XHRyZUFjdGl2ZUNoaWxkcmVucyhwb2ludCkge1xyXG5cdFx0XHR2YXIgY2hpbGRyZW5zID0gdGhpcy5nZXRDaGlsZHJlbihwb2ludCk7XHJcblx0XHRcdGNoaWxkcmVucy5mb3JFYWNoKGNoaWxkID0+IHtcclxuXHRcdFx0XHRpZiAoIWNoaWxkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBkZXBzID0gdGhpcy5nZXRQb2ludEluRGVwZW5kZW5jaWVzKGNoaWxkKTtcclxuXHRcdFx0XHRjaGlsZC5BY3RpdmUgPSBfLmZpbmRJbmRleChkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpID49IDA7XHJcblx0XHRcdFx0aWYgKCFjaGlsZC5BY3RpdmUpIHtcclxuXHRcdFx0XHRcdHRoaXMucmVBY3RpdmVDaGlsZHJlbnMoY2hpbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0Q2hpbGRyZW4obm9kZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguU3RhcnQubmFtZSA9PT0gbm9kZS5uYW1lKS5tYXAoeCA9PiB0aGlzLmdldFBvaW50QnlOYW1lKHguRW5kLm5hbWUpKTtcclxuXHRcdH0sXHJcblx0XHRpc0RlcGVuZGVuY3lQYXNzKGRlcCkge1xyXG5cdFx0XHR2YXIgc3RhcnQgPSBkZXAuU3RhcnQ7XHJcblx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbc3RhcnQubmFtZV07XHJcblx0XHRcdGlmIChkZXAuUnVsZXMpIHtcclxuXHRcdFx0XHRpZiAoc3RhcnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWMpIHtcclxuXHRcdFx0XHRcdGlmIChfLmlzQXJyYXkoZGVwLlJ1bGVzLlZhbHVlcykgJiYgZGVwLlJ1bGVzLlZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KGRlcC5SdWxlcy5WYWx1ZXMsICh4OiBhbnkpID0+IHguSWQgPT09IHZhbHVlLklkKSA+PSAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cdFx0Z2V0UG9pbnRCeU5hbWUobmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kKHRoaXMucG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gbmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmlzaWJsZUNoaWxkcmVuczogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRcdHZhciBjaGlsZHJlbnMgPSB0aGlzLmdldENoaWxkcmVuKHBvaW50KTtcclxuXHRcdFx0dmFyIGFjdGl2ZXMgPSBjaGlsZHJlbnMuZmlsdGVyKHggPT4ge1xyXG5cdFx0XHRcdGlmICgheCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgZGVwcyA9IHRoaXMuZ2V0UG9pbnRJbkRlcGVuZGVuY2llcyh4KTtcclxuXHRcdFx0XHRzd2l0Y2ggKHguT3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKSA+PSAwO1xyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuYWdncmVnYXRvcjoge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5ldmVyeShkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBhY3RpdmVDaGlsZHJlbnMgPSBbXTtcclxuXHRcdFx0YWN0aXZlcy5mb3JFYWNoKHggPT4gYWN0aXZlQ2hpbGRyZW5zID0gXy5jb25jYXQoYWN0aXZlQ2hpbGRyZW5zLCB0aGlzLmdldFZpc2libGVDaGlsZHJlbnMoeCkpKTtcclxuXHRcdFx0cmV0dXJuIF8udW5pb24oYWN0aXZlcywgYWN0aXZlQ2hpbGRyZW5zKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRncmFwaCgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImdyYXBoLWNoYW5nZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBcInN5bmNmdXNpb25cIjtcclxuaW1wb3J0IG1lbW9pemVEZWJvdW5jZSwgeyBkaWZmZXJlbmNlIH0gZnJvbSBcIi4uL21peGlucy9tX2xvZGFzaFwiO1xyXG5pbXBvcnQgYWRkRGVwZW5kTW9kYWxXaW5kb3cgZnJvbSBcIi4vRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvd1wiO1xyXG5pbXBvcnQgY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50XCI7XHJcbmltcG9ydCBjcmVhdGVDaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vSGFuZGxlci9DaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHRlc3RDb250cm9sbCBmcm9tIFwiLi9EaWFncmFtL1Rlc3QvR3JhcGhUZXN0Q29udHJvbGxcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG52YXIgY29uc3RyYWludHMgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5EZWZhdWx0IHwgZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRmxvYXRFbGVtZW50cztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNjaGFyYWN0ZXJpc3RpYy1kaWFncmFtXCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCIsIFwiY2xhc3Nlc1wiLCBcImhlaWdodFwiLCBcImNoYXJhY3RlcmlzdGljc1wiLCBcInJvbGVzXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRidXM6IG5ldyBWdWUoKSxcclxuXHRcdFx0c2hvd0RlcGVuZE1vZGFsOiBmYWxzZSxcclxuXHRcdFx0b2Zmc2V0WU1hcmdpbjogMjUwLFxyXG5cdFx0XHRhZGRNb2RlOiBmYWxzZSxcclxuXHRcdFx0ZGlhZ3JhbUluaXQ6IGZhbHNlLFxyXG5cdFx0XHRzZWxlY3RlZE5vZGVzOiBbXSxcclxuXHRcdFx0aXNNb2RhbFdpbmRvdzogdHJ1ZSxcclxuXHRcdFx0SXNPdmVydmlld0FjdGl2ZTogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRoZWlnaHRQeCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1JZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTmFtZTtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtRWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI1wiICsgdGhpcy5kaWFncmFtSWQ7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbU92ZXJ2aWV3RWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlhZ3JhbUVsSWQgKyBcIl9vdmVydmlld1wiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1Jbml0ID8gJCh0aGlzLmRpYWdyYW1FbElkKS5lakRpYWdyYW0oXCJpbnN0YW5jZVwiKSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE5vZGVzICYmIHRoaXMuc2VsZWN0ZWROb2Rlcy5sZW5ndGggPiAwID8gdGhpcy5zZWxlY3RlZE5vZGVzWzBdIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGVWYWx1ZXMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmZpcnN0U2VsZWN0Tm9kZSA/IHRoaXMuZmlyc3RTZWxlY3ROb2RlLlZhbHVlcyA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlRGVwZW5kZW5jeSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGggJiYgdGhpcy5maXJzdFNlbGVjdE5vZGUgPyB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5FbmQubmFtZSA9PT0gdGhpcy5maXJzdFNlbGVjdE5vZGUubmFtZSkgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGRlcGVuZFNlbGVjdGVkTm9kZXMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdGVkTm9kZXMgPyB0aGlzLnNlbGVjdGVkTm9kZXMubWFwKHggPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHROYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdFN0YXJ0OiB4LFxyXG5cdFx0XHRcdFx0RW5kOiBudWxsLFxyXG5cdFx0XHRcdFx0UnVsZXM6IHtcclxuXHRcdFx0XHRcdFx0VmFsdWVzOiBbXSxcclxuXHRcdFx0XHRcdFx0Um9sZXM6IFtdXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSkgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGNvbm5lY3RvcnMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4gdGhpcy51cGRhdGVDb25uZWN0b3JMYWJlbCh4KSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnM7XHJcblx0XHR9LFxyXG5cdFx0bm9kZXMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguTm9kZXMuZm9yRWFjaCh4ID0+IHRoaXMudXBkYXRlTm9kZUxhYmVsKHgpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRzZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0ZWRJdGVtcykge1xyXG5cdFx0XHRpZiAoIXNlbGVjdGVkSXRlbXMgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoeCA9PiB4Ll90eXBlID09PSBcIm5vZGVcIik7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IF8ubWFwKHNlbGVjdGVkTm9kZXMsICh4OiBhbnkpID0+IF8uZmluZCh0aGlzLmdyYXBoLk5vZGVzLCB5ID0+IHkubmFtZSA9PT0geC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnRBbmREZXBlbmRlbmN5KG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IG9wdGlvbnMucG9pbnRzO1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG9wdGlvbnMuZGVwZW5kZW5jeTtcclxuXHJcblx0XHRcdHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHRoaXMuY29tbWl0UG9pbnQocG9pbnQpKTtcclxuXHRcdFx0ZGVwZW5kZW5jeS5mb3JFYWNoKGRlcCA9PiB0aGlzLmNvbW1pdENvbm5lY3Rpb24oZGVwKSk7XHJcblxyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdENvbm5lY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRkZXA6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnQob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRwb2ludDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHRoaXMuYWRkTW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb24/OiBhbnkpIHtcclxuXHRcdFx0dGhpcy5hZGRNb2RlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVOb2RlUHJvcDogbWVtb2l6ZURlYm91bmNlKGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHRcdHZhciBub2RlID0gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIG5vZGUgPT4gbm9kZS5uYW1lID09PSBhcmdzLmVsZW1lbnQubmFtZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcIm5vZGUtcHJvcC1jaGFuZ2VcIiwge1xyXG5cdFx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdG5hbWU6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdHByb3BOYW1lOiBhcmdzLnByb3BlcnR5TmFtZSxcclxuXHRcdFx0XHRcdG5ld1ZhbHVlOiBhcmdzLmVsZW1lbnRbYXJncy5wcm9wZXJ0eU5hbWVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDUwMCwgeCA9PiB4LnByb3BlcnR5TmFtZSksXHJcblx0XHR1cGRhdGVOb2RlTGFiZWwobm9kZSkge1xyXG5cdFx0XHRpZiAobm9kZS5PcHRpb25zKSB7XHJcblx0XHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHRfLmFzc2lnbihub2RlLCBwcm9wZXJ0eSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFub2RlLmxhYmVscyB8fCBub2RlLmxhYmVscy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdG5vZGUubGFiZWxzID0gW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwibGFiZWwxXCIsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQsXHJcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWdubWVudDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20sXHJcblx0XHRcdFx0XHRvZmZzZXQ6IHtcclxuXHRcdFx0XHRcdFx0eTogMS4yLFxyXG5cdFx0XHRcdFx0XHR4OiAwLjhcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRib3VuZGFyeUNvbnN0cmFpbnRzOiBmYWxzZVxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHRcdG5vZGUubGFiZWxzWzBdLnRleHQgPSBub2RlLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZUNvbm5lY3RvckxhYmVsKGNvbm5lY3Rvcikge1xyXG5cdFx0XHRpZiAoIWNvbm5lY3Rvci5sYWJlbHMgfHwgY29ubmVjdG9yLmxhYmVscy5sZW5naHQgPD0gMCkge1xyXG5cdFx0XHRcdGNvbm5lY3Rvci5sYWJlbHMgPSBbe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJsYWJlbDJcIixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRmb250Q29sb3I6IFwiYmxhY2tcIixcclxuXHRcdFx0XHRcdGFsaWdubWVudDogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdGJvdW5kYXJ5Q29uc3RyYWludHM6IGZhbHNlLFxyXG5cdFx0XHRcdFx0b2Zmc2V0OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlBvaW50KDAsIDApXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdFx0Y29ubmVjdG9yLmxhYmVsc1swXS50ZXh0ID0gY29ubmVjdG9yLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdGdvVGVzdCgpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Z29PdmVydmlldygpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR0ZXN0QWN0aXZlTm9kZShhY3RpdmVzKSB7XHJcblx0XHRcdGlmICghXy5pc0FycmF5KGFjdGl2ZXMpIHx8ICF0aGlzLmRpYWdyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5ncmFwaC5Ob2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRcdHZhciBhY3RpdmUgPSBub2RlLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0IHx8IF8uZmluZEluZGV4KGFjdGl2ZXMsIHggPT4geC5uYW1lID09PSBub2RlLm5hbWUpID49IDA7XHJcblx0XHRcdFx0dmFyIHByb3BlcnRpZXMgPSAhdGhpcy5Jc092ZXJ2aWV3QWN0aXZlICYmIGFjdGl2ZSA/IHtcclxuXHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjYTZmNTY4XCJcclxuXHRcdFx0XHR9IDogdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHR0aGlzLmRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIHByb3BlcnRpZXMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Z2V0Tm9kZVByb3BlcnRpZXMobm9kZSkge1xyXG5cdFx0XHRzd2l0Y2ggKG5vZGUuT3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuc3RhcnQ6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiIzI5YzE1ZlwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjMjA4NWM5XCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcInJlY3RhbmdsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuYWdncmVnYXRvcjpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjZWM3ZTBkXCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcImVsbGlwc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlQ29ubmVjdG9yKGNvbm5lY3Rvcikge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwicmVtb3ZlLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0Y29ubmVjdG9yTmFtZTogY29ubmVjdG9yLk5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlTm9kZShub2RlKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJyZW1vdmUtbm9kZVwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRub2RlTmFtZTogbm9kZS5uYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbm5lY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHR2YXIgZGVwOiBhbnkgPSB7XHJcblx0XHRcdFx0TmFtZTogb3B0aW9ucy5lbGVtZW50Lk5hbWVcclxuXHRcdFx0fTtcclxuXHRcdFx0c3dpdGNoIChvcHRpb25zLmVuZFBvaW50KSB7XHJcblx0XHRcdFx0Y2FzZSBcInRhcmdldEVuZFBvaW50XCI6XHJcblx0XHRcdFx0XHRkZXAuRW5kID0gb3B0aW9ucy5jb25uZWN0aW9uXHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRjYXNlIFwic291cmNlRW5kUG9pbnRcIjpcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJvbi1hZGQtY29ubmVjdGlvblwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRkZXBcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0dmFyICR0aGlzID0gdGhpcztcclxuXHRcdHRoaXMuYnVzLiRvbihcImFkZC1kZXBlbmQtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdHRoaXMuYnVzLiRvbihcImNoYW5nZS1wb2ludFwiLCAob3B0aW9ucz86IGFueSkgPT4gdGhpcy5vcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb25zKSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbSh7XHJcblx0XHRcdGVuYWJsZUNvbnRleHRNZW51OiBmYWxzZSxcclxuXHRcdFx0Y29uc3RyYWludHMsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4LFxyXG5cdFx0XHRub2RlczogdGhpcy5ub2RlcyxcclxuXHRcdFx0Y29ubmVjdG9yczogdGhpcy5jb25uZWN0b3JzLFxyXG5cdFx0XHRkZWZhdWx0U2V0dGluZ3M6IHtcclxuXHRcdFx0XHRub2RlOiB7XHJcblx0XHRcdFx0XHR3aWR0aDogNjUsXHJcblx0XHRcdFx0XHRoZWlnaHQ6IDY1LFxyXG5cdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IDBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbm5lY3Rvcjoge1xyXG5cdFx0XHRcdFx0c2VnbWVudHM6IFt7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIm9ydGhvZ29uYWxcIlxyXG5cdFx0XHRcdFx0fV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNjcm9sbFNldHRpbmdzOiB7XHJcblx0XHRcdFx0aG9yaXpvbnRhbE9mZnNldDogMCxcclxuXHRcdFx0XHR2ZXJ0aWNhbE9mZnNldDogMCxcclxuXHRcdFx0XHR6b29tRmFjdG9yOiAwLjJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW5hYmxlQXV0b1Njcm9sbDogdHJ1ZSxcclxuXHRcdFx0cGFnZVNldHRpbmdzOiB7XHJcblx0XHRcdFx0c2Nyb2xsTGltaXQ6IFwiaW5maW5pdHlcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RlZEl0ZW1zOiB7XHJcblx0XHRcdFx0dXNlckhhbmRsZXM6IFtjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIoe1xyXG5cdFx0XHRcdFx0YnVzOiB0aGlzLmJ1c1xyXG5cdFx0XHRcdH0pLCBjcmVhdGVDaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KV1cclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvcGVydHlDaGFuZ2UoYXJncykge1xyXG5cdFx0XHRcdCR0aGlzLiRlbWl0KFwicHJvcGVydHlDaGFuZ2VcIiwgYXJncyk7XHJcblx0XHRcdFx0aWYgKGFyZ3MuZWxlbWVudFR5cGUgPT09IFwibm9kZVwiKSB7XHJcblx0XHRcdFx0XHRpZiAoXy5pbmNsdWRlcyhbXCJvZmZzZXRYXCIsIFwib2Zmc2V0WVwiXSwgYXJncy5wcm9wZXJ0eU5hbWUpKSB7XHJcblx0XHRcdFx0XHRcdCR0aGlzLnVwZGF0ZU5vZGVQcm9wKGFyZ3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0aW9uQ2hhbmdlOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0XHRcdCR0aGlzLnNlbGVjdGlvbkNoYW5nZShvcHRpb25zLnNlbGVjdGVkSXRlbXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb25uZWN0b3JDb2xsZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5jaGFuZ2VUeXBlID09PSBcInJlbW92ZVwiKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDb25uZWN0b3Iob3B0aW9ucy5lbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG5vZGVDb2xsZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5jaGFuZ2VUeXBlID09PSBcInJlbW92ZVwiKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5yZW1vdmVOb2RlKG9wdGlvbnMuZWxlbWVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb25uZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0XHQkdGhpcy5jb25uZWN0aW9uQ2hhbmdlKG9wdGlvbnMpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQodGhpcy5kaWFncmFtT3ZlcnZpZXdFbElkKS5lak92ZXJ2aWV3KHtcclxuXHRcdFx0c291cmNlSUQ6IHRoaXMuZGlhZ3JhbUlkLFxyXG5cdFx0XHR3aWR0aDogXCIxMDAlXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHRQeFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmRpYWdyYW1Jbml0ID0gdHJ1ZTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdGFkZERlcGVuZE1vZGFsV2luZG93LFxyXG5cdFx0dGVzdENvbnRyb2xsXHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Z3JhcGgodmFsKSB7XHJcblx0XHRcdHZhciBkaWFncmFtID0gdGhpcy5kaWFncmFtO1xyXG5cdFx0XHR2YXIgbm9kZXMgPSBkaWFncmFtLm5vZGVzKCk7XHJcblx0XHRcdHZhciBjb25uZWN0b3JzID0gZGlhZ3JhbS5jb25uZWN0b3JzKCk7XHJcblx0XHRcdHZhbC5Ob2Rlcy5mb3JFYWNoKHggPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlTm9kZUxhYmVsKHgpO1xyXG5cdFx0XHRcdHZhciBub2RlID0gXy5maW5kKG5vZGVzLCAoeTogYW55KSA9PiB5Lm5hbWUgPT09IHgubmFtZSk7XHJcblx0XHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHRcdHZhciBkaWZmTm9kZSA9IGRpZmZlcmVuY2UoeCwgbm9kZSk7XHJcblx0XHRcdFx0XHRpZiAoZGlmZk5vZGUpIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS51cGRhdGVOb2RlKG5vZGUubmFtZSwgZGlmZk5vZGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dmFyIGRpZmZMYWJlbCA9IGRpZmZlcmVuY2UoeC5sYWJlbHNbMF0sIG5vZGUubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmTGFiZWwpIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS51cGRhdGVMYWJlbChub2RlLm5hbWUsIG5vZGUubGFiZWxzWzBdLCBkaWZmTGFiZWwpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRkaWFncmFtLmFkZCh4KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhbC5Db25uZWN0b3JzLmZvckVhY2goeCA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGVDb25uZWN0b3JMYWJlbCh4KTtcclxuXHRcdFx0XHR2YXIgY29ubiA9IF8uZmluZChjb25uZWN0b3JzLCAoeTogYW55KSA9PiB5Lm5hbWUgPT09IHguTmFtZSk7XHJcblx0XHRcdFx0aWYgKGNvbm4pIHtcclxuXHRcdFx0XHRcdHZhciBkaWZmQ29ubiA9IGRpZmZlcmVuY2UoeCwgY29ubik7XHJcblx0XHRcdFx0XHRpZiAoZGlmZkNvbm4pIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS51cGRhdGVDb25uZWN0b3IoY29ubi5uYW1lLCBkaWZmQ29ubik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoY29ubi5sYWJlbHMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgZGlmZkxhYmVsID0gZGlmZmVyZW5jZSh4LmxhYmVsc1swXSwgY29ubi5sYWJlbHNbMF0pO1xyXG5cdFx0XHRcdFx0XHRpZiAoZGlmZkxhYmVsKSB7XHJcblx0XHRcdFx0XHRcdFx0ZGlhZ3JhbS51cGRhdGVMYWJlbChjb25uLm5hbWUsIGNvbm4ubGFiZWxzWzBdLCBkaWZmTGFiZWwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLmFkZExhYmVsKGNvbm4ubmFtZSwgeC5sYWJlbHNbMF0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRkaWFncmFtLmFkZCh4KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRQb2ludHM6IEFycmF5PEJhc2VQb2ludD47XHJcblx0RGVwZW5kZW5jaWVzOiBBcnJheTxEZXBlbmRlbmN5PjtcclxufSIsImltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxufSIsImltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4vR3JhcGhcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBJUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm9vdFN0YXRlIHtcclxuXHRHcmFwaHM6IEFycmF5PEdyYXBoPjtcclxuXHRDaGFyYWN0ZXJpc3RpY3M6IEFycmF5PENoYXJhY3RlcmlzdGljPjtcclxuXHRSb2xlczogQXJyYXk8SVJvbGU+O1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcclxuXHRuYW1lOiBzdHJpbmdcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdG9yIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0c291cmNlTm9kZTogc3RyaW5nO1xyXG5cdHRhcmdldE5vZGU6IHN0cmluZztcclxufSIsImltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuL0Nvbm5lY3RvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZkdyYXBoIHtcclxuXHROYW1lOiBzdHJpbmcsXHJcblx0Tm9kZXM6IEFycmF5PE5vZGU+O1xyXG5cdENvbm5lY3RvcnM6IEFycmF5PENvbm5lY3Rvcj47XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgQWN0aW9uQ29udGV4dCwgU3RvcmUsIEdldHRlclRyZWUgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBnZXRTdG9yZUFjY2Vzc29ycyB9IGZyb20gXCJ2dWV4LXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgR3JhcGggfSBmcm9tIFwiLi4vTW9kZWwvR3JhcGhcIjtcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSBcIi4uL01vZGVsL1Jvb3RTdGF0ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IFNmR3JhcGggfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0dyYXBoXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0Nvbm5lY3RvclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vTW9kZWwvRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuXHJcbnR5cGUgR3JhcGhDb250ZXh0ID0gQWN0aW9uQ29udGV4dDxSb290U3RhdGUsIFJvb3RTdGF0ZT47XHJcblxyXG5leHBvcnQgY29uc3QgZ3JhcGhNb2R1bGUgPSB7XHJcblx0bmFtZXNwYWNlZDogdHJ1ZSxcclxuXHJcblx0c3RhdGU6IHtcclxuXHRcdEdyYXBoczogW1xyXG5cdFx0Ly9cdHtcclxuXHRcdC8vXHROYW1lOiBcIkdyYXBoMVwiLFxyXG5cdFx0Ly9cdFBvaW50czogW1xyXG5cdFx0Ly9cdFx0e1xyXG5cdFx0Ly9cdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdC8vXHRcdFx0TGFiZWw6IFwiU3RhcnRcIixcclxuXHRcdC8vXHRcdFx0b2Zmc2V0WDogNTAwLFxyXG5cdFx0Ly9cdFx0XHRvZmZzZXRZOiA2MCxcclxuXHRcdC8vXHRcdFx0T3B0aW9uczoge1xyXG5cdFx0Ly9cdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0Ly9cdFx0XHR9XHJcblx0XHQvL1x0XHR9XHJcblx0XHQvL1x0XSxcclxuXHRcdC8vXHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHQvL31cclxuXHRcdF0sXHJcblx0XHRDaGFyYWN0ZXJpc3RpY3M6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAxXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDJcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAzXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDNcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAzXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNFwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDVcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA2XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgN1wiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDhcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA5XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRdLFxyXG5cdFx0Um9sZXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDJcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAzXCJcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cdH0sXHJcblx0Z2V0dGVyczoge1xyXG5cdFx0Z2V0R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzO1xyXG5cdFx0fSxcclxuXHRcdGdyYXBoQ291bnQoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzLmxlbmd0aDtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKG5hbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdHZhciBncmFwaCA9IF8uZmlyc3Qoc3RhdGUuR3JhcGhzLmZpbHRlcih4ID0+IHguTmFtZSA9PT0gbmFtZSkpO1xyXG5cdFx0XHRcdHJldHVybiBncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlKShncmFwaCk7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKGdyYXBoOiBHcmFwaCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHROYW1lOiBncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0Tm9kZXM6IGdyYXBoLlBvaW50cyxcclxuXHRcdFx0XHRcdENvbm5lY3RvcnM6IF8ubWFwKGdyYXBoLkRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGNvbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5tZXJnZSh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29uLk5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c291cmNlTm9kZTogY29uLlN0YXJ0ID8gY29uLlN0YXJ0Lm5hbWUgOiBudWxsLFxyXG5cdFx0XHRcdFx0XHRcdHRhcmdldE5vZGU6IGNvbi5FbmQgPyBjb24uRW5kLm5hbWU6IG51bGxcclxuXHRcdFx0XHRcdFx0fSwgY29uKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkNoYXJhY3RlcmlzdGljcztcclxuXHRcdH0sXHJcblx0XHRnZXRSb2xlcyhzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5Sb2xlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG11dGF0aW9uczoge1xyXG5cdFx0YWRkR3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogR3JhcGgpIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLnB1c2goaXRlbSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlUG9pbnRJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLlBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ucG9pbnQubmFtZSk7XHJcblxyXG5cdFx0XHRpZiAoZHVwbGljYXRlUG9pbnRJbmRleCA8IDApIHtcclxuXHRcdFx0XHRncmFwaC5Qb2ludHMucHVzaChpdGVtLnBvaW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlUG9pbnQgPSBncmFwaC5Qb2ludHNbZHVwbGljYXRlUG9pbnRJbmRleF07XHJcblx0XHRcdFx0Xy5hc3NpZ24oZHVwbGljYXRlUG9pbnQsIGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5zcGxpY2UoZHVwbGljYXRlUG9pbnRJbmRleCwgMSwgZHVwbGljYXRlUG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YWRkRGVwZW5kZW5jeShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdC8vVE9ETzog0J/RgNC40LzQtdC90LjRgtGMINC40LfQvNC10L3QuNC1INC6INC00LjQsNCz0YDQsNC80LVcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlRGVwSW5kZXggPSBfLmZpbmRJbmRleChncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBpdGVtLmRlcC5OYW1lKTtcclxuXHRcdFx0aWYgKGR1cGxpY2F0ZURlcEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5wdXNoKGl0ZW0uZGVwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlRGVwID0gZ3JhcGguRGVwZW5kZW5jaWVzW2R1cGxpY2F0ZURlcEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVEZXAsIGl0ZW0uZGVwKTtcclxuXHRcdFx0XHRncmFwaC5EZXBlbmRlbmNpZXMuc3BsaWNlKGR1cGxpY2F0ZURlcEluZGV4LCAxLCBkdXBsaWNhdGVEZXApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlTm9kZVByb3BlcnR5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKS5Qb2ludHM7XHJcblx0XHRcdHZhciBwb2ludCA9IF8uZmluZChwb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLm5hbWUpO1xyXG5cdFx0XHRWdWUuc2V0KHBvaW50LCBpdGVtLnByb3BOYW1lLCBpdGVtLm5ld1ZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKHN0YXRlOiBSb290U3RhdGUsIG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmNvbm5lY3Rvck5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUoc3RhdGU6IFJvb3RTdGF0ZSwgb3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5Qb2ludHMsIHggPT4geC5uYW1lID09PSBvcHRpb25zLm5vZGVOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCB7IHJlYWQsIGNvbW1pdCB9ID1cclxuXHRnZXRTdG9yZUFjY2Vzc29yczxSb290U3RhdGUsIFJvb3RTdGF0ZT4oXCJncmFwaFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgcmVhZEdyYXBoQ291bnQgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ3JhcGhDb3VudCk7XHJcbmV4cG9ydCBjb25zdCBnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGdldENoYXJhY3RlcmlzdGljc0xpc3QgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCk7XHJcbmV4cG9ydCBjb25zdCBnZXRSb2xlcyA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRSb2xlcyk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkR3JhcGggPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZEdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGRQb2ludCk7XHJcbmV4cG9ydCBjb25zdCBhZGREZXBlbmRlbmN5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGREZXBlbmRlbmN5KTtcclxuZXhwb3J0IGNvbnN0IGNoYW5nZU5vZGVQcm9wZXJ0eSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuY2hhbmdlTm9kZVByb3BlcnR5KTtcclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNvbm5lY3Rpb24gPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLnJlbW92ZUNvbm5lY3Rpb24pO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9kZSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMucmVtb3ZlTm9kZSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IHsgZ3JhcGhNb2R1bGUgYXMgZ3JhcGggfSBmcm9tIFwiLi9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCBWdWV4UGVyc2lzdGVuY2UgZnJvbSBcInZ1ZXgtcGVyc2lzdFwiO1xyXG5cclxuVnVlLnVzZShWdWV4KTtcclxuXHJcbmNvbnN0IHZ1ZXhMb2NhbCA9IG5ldyBWdWV4UGVyc2lzdGVuY2Uoe1xyXG5cdHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gbmV3IFZ1ZXguU3RvcmU8Um9vdFN0YXRlPih7XHJcblx0XHRtb2R1bGVzOiB7XHJcblx0XHRcdGdyYXBoXHJcblx0XHR9LFxyXG5cdFx0cGx1Z2luczogW3Z1ZXhMb2NhbC5wbHVnaW5dLFxyXG5cdFx0c3RyaWN0OiB0cnVlXHJcblx0fSlcclxufTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uLy4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI21vZGFsLXdpbmRvd1wiLFxyXG5cdHByb3BzOiBbXCJzaG93XCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlbElkOiBudWxsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdHNlbGVjdG9ySWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuZWxJZDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNyZWF0ZWQoKSB7XHJcblx0XHR0aGlzLmVsSWQgPSB1bmlxSWQoKTtcclxuXHR9LFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuc2VsZWN0b3JJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRzaG93KHZhbCkge1xyXG5cdFx0XHRpZiAodmFsKSB7XHJcblx0XHRcdFx0JCh0aGlzLnNlbGVjdG9ySWQpLm1vZGFsKFwic2hvd1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMuc2VsZWN0b3JJZCkubW9kYWwoXCJoaWRlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IE1vZGFsV2luZG93IGZyb20gXCIuLi9Nb2RhbFdpbmRvd1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI3N0YW5kYXJ0LW1vZGFsLXdpbmRvd1wiLFxyXG5cdHByb3BzOiBbXCJ0aXRsZVwiLCBcInNob3dcIl0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdE1vZGFsV2luZG93XHJcblx0fVxyXG59KTsiLCIvLyBDbGllbnRBcHAvY29tcG9uZW50cy9BcHBIZWxsby50c1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyaXN0aWNEaWFncmFtIGZyb20gXCIuL0NoYXJhY3RlcmlzdGljRGlhZ3JhbVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCIuLi9TdG9yZS9Sb290U3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZ3JhcGggZnJvbSBcIi4uL1N0b3JlL0dyYXBoU3RvcmVcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCBTdGFuZGFydE1vZGFsV2luZG93IGZyb20gXCIuLi9jb21wb25lbnRzL01vZGFsV2luZG93L1N0YW5kYXJ0L1N0YW5kYXJ0TW9kYWxXaW5kb3dcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG52YXIgX1Z1ZTogYW55ID0gVnVlO1xyXG52YXIgX2F4aW9zOiBhbnkgPSBheGlvcztcclxuXHJcbnZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKCk7XHJcbmV4cG9ydCBkZWZhdWx0IF9WdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogJyNhcHAtaGVsbG8tdGVtcGxhdGUnLFxyXG5cdHN0b3JlLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtZXNzYWdlOiBcInRlc3QgbWVzc2FnZVwiLFxyXG5cdFx0XHRzaG93QWRkR3JhcGg6IGZhbHNlLFxyXG5cdFx0XHRhZGRlZENhdGVnb3J5OiBudWxsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdHRlc3QoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5yZWFkR3JhcGgodGhpcy4kc3RvcmUpWzBdLlBvaW50cy5tYXAoeCA9PiB4LkxhYmVsKTtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSkubWFwKHggPT4gZ3JhcGguZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgodGhpcy4kc3RvcmUpKHgpKTtcclxuXHRcdH0sXHJcblx0XHRyb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLmdldFJvbGVzKHRoaXMuJHN0b3JlKTtcclxuXHRcdH0sXHJcblx0XHRjaGFyYWN0ZXJpc3RpY1VybCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiYXBpL0dldENoYXJhY3RlcmlzdGljXCI7XHJcblx0XHR9LFxyXG5cdFx0Y2F0ZWdvcnlVcmwoKSB7XHJcblx0XHRcdHJldHVybiBcImFwaS9HZXRDYXRlZ29yeVwiO1xyXG5cdFx0fSxcclxuXHR9LFxyXG5cdGFzeW5jRGF0YToge1xyXG5cdFx0Y2hhcmFjdGVyaXN0aWNzKCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdF9heGlvcyh7XHJcblx0XHRcdFx0XHR1cmw6IHRoaXMuY2hhcmFjdGVyaXN0aWNVcmwsXHJcblx0XHRcdFx0XHRkYXRhOiB7fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZS5kYXRhLm1hcCh4ID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRJZDogeC5pZCxcclxuXHRcdFx0XHRcdFx0XHROYW1lOiB4Lm5hbWVcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH0pKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y2F0ZWdvcmllcygpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHRfYXhpb3MuZ2V0KHRoaXMuY2F0ZWdvcnlVcmwsIHtcclxuXHRcdFx0XHRcdGRhdGE6IHt9LFxyXG5cdFx0XHRcdFx0dHJhbnNmb3JtUmVzcG9uc2U6IF9heGlvcy5kZWZhdWx0cy50cmFuc2Zvcm1SZXNwb25zZS5jb25jYXQoKGRhdGEpID0+IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRJZDogeC5pZCxcclxuXHRcdFx0XHRcdFx0XHRcdE5hbWU6IHgubmFtZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZS5kYXRhKSlcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRhZGRHcmFwaENsaWNrKCkge1xyXG5cdFx0XHR0aGlzLnNob3dBZGRHcmFwaCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0YWRkR3JhcGgoKSB7XHJcblx0XHRcdGdyYXBoLmFkZEdyYXBoKHRoaXMuJHN0b3JlLCB7XHJcblx0XHRcdFx0TmFtZTogXCJHcmFwaF9cIiArIHVuaXFJZCgpLFxyXG5cdFx0XHRcdFBvaW50czogW3tcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogNTAwLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogMjAsXHJcblx0XHRcdFx0XHRMYWJlbDogXCJTdGFydFwiLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRDYXRlZ29yeTogdGhpcy5hZGRlZENhdGVnb3J5XHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0RGVwZW5kZW5jaWVzOiBbXVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGROb2RlKG5vZGU6IHsgZ3JhcGg6IHN0cmluZywgcG9pbnQ6IEJhc2VQb2ludCB9KSB7XHJcblx0XHRcdGdyYXBoLmFkZFBvaW50KHRoaXMuJHN0b3JlLCBub2RlKTtcclxuXHRcdH0sXHJcblx0XHRhZGRDb25uZWN0aW9uKGNvbm5lY3Q6IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkRGVwZW5kZW5jeSh0aGlzLiRzdG9yZSwgY29ubmVjdCk7XHJcblx0XHR9LFxyXG5cdFx0b25Ob2RlUHJvcENoYW5nZShvcHRpb25zOiB7IGdyYXBoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSB9KSB7XHJcblx0XHRcdGdyYXBoLmNoYW5nZU5vZGVQcm9wZXJ0eSh0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlQ29ubmVjdGlvbihvcHRpb25zOiB7Z3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nfSkge1xyXG5cdFx0XHRncmFwaC5yZW1vdmVDb25uZWN0aW9uKHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVOb2RlKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbm9kZU5hbWU6IHN0cmluZyB9KSB7XHJcblx0XHRcdGdyYXBoLnJlbW92ZU5vZGUodGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRDaGFyYWN0ZXJpc3RpY0RpYWdyYW0sXHJcblx0XHRTdGFuZGFydE1vZGFsV2luZG93XHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBBcHBIZWxsbyBmcm9tIFwiLi9jb21wb25lbnRzL0FwcEhlbGxvXCI7XHJcbmltcG9ydCBsb2Rhc2hNaXhpbiBmcm9tIFwiLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuaW1wb3J0IGFzeW5jRGF0YSBmcm9tIFwidnVlLWFzeW5jLWRhdGEtMlwiO1xyXG5pbXBvcnQgQXN5bmNDb21wdXRlZCBmcm9tIFwidnVlLWFzeW5jLWNvbXB1dGVkXCI7XHJcbmltcG9ydCB2U2VsZWN0IGZyb20gXCJ2dWUtc2VsZWN0XCI7XHJcblxyXG4vL1BsdWdpblxyXG5WdWUudXNlKGFzeW5jRGF0YS5Bc3luY0RhdGFQbHVnaW4pO1xyXG5WdWUudXNlKEFzeW5jQ29tcHV0ZWQpO1xyXG5WdWUuY29tcG9uZW50KCd2LXNlbGVjdCcsIHZTZWxlY3QpXHJcblxyXG4vL1Jvb3QgQ29tcG9uZW50XHJcbmxldCB2ID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogXCIjYXBwLXJvb3RcIixcclxuXHR0ZW1wbGF0ZTogJzxBcHBIZWxsby8+JyxcclxuICAgIC8vcmVuZGVyOiBoID0+IGgoQXBwSGVsbG9Db21wb25lbnQpLFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0QXBwSGVsbG9cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNQb2ludCBleHRlbmRzIEJhc2VQb2ludCB7XHJcblx0Q2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcblx0UmVxdWlyZWQ/OiBib29sZWFuO1xyXG5cdERlZmF1bHRWYWx1ZT86IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQge0RlcGVuZGVuY3l9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHtJUm9sZX0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVwZW5kZW5jeVJvbGUge1xyXG5cdERlcGVuZGVuY3k6IERlcGVuZGVuY3k7XHJcblx0Um9sZTogSVJvbGU7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uLy4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgQXN5bmNTZWxlY3QgZnJvbSBcIi4uL0FzeW5jU2VsZWN0L0FzeW5jU2VsZWN0Q29tcG9uZW50XCI7XHJcbmRlY2xhcmUgY29uc3QgJDogYW55O1xyXG5kZWNsYXJlIGNvbnN0IE9iamVjdDogYW55O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FkZC1ncmFwaFwiLFxyXG5cdHByb3BzOiBbXCJjYXRlZ29yaWVzXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzaG93OiBmYWxzZSxcclxuXHRcdFx0ZWxJZDogbnVsbFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdCQodGhpcy5lbElkKVxyXG5cdFx0XHQub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcblx0fSxcclxuXHRjcmVhdGVkKCkge1xyXG5cdFx0dGhpcy5lbElkID0gdW5pcUlkKCk7XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRjbG9zZSgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNsb3NlXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHNob3codmFsKSB7XHJcblx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJzaG93XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcImhpZGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsIiJdfQ==