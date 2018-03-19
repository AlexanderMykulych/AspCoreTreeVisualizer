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
                        default: []
                    },
                    togglesRoles: {
                        type: Array,
                        default: []
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
                            return this.togglesValues;
                        },
                        set: function (val) {
                            this.$emit("update:togglesValues", val);
                        }
                    },
                    sync_togglesRoles: {
                        get: function () {
                            return this.togglesRoles;
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
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll", "mixins/IdGenerator", "Model/PointType"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
            selectedCharacteristic: null,
            uniqId: IdGenerator_1.uniqId(),
            offsetYDelta: 250
        };
    }
    var vue_2, lodash_4, RuleControll_1, IdGenerator_1, PointType_1;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (lodash_4_1) {
                lodash_4 = lodash_4_1;
            },
            function (RuleControll_1_1) {
                RuleControll_1 = RuleControll_1_1;
            },
            function (IdGenerator_1_1) {
                IdGenerator_1 = IdGenerator_1_1;
            },
            function (PointType_1_1) {
                PointType_1 = PointType_1_1;
            }
        ],
        execute: function () {
            exports_5("default", vue_2.default.extend({
                template: "#add-depend-point",
                props: ["show", "id", "dependency", "characteristics", "roles", "defaultPoint", "defaultDependency", "isModalWindow"],
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
                        var point = lodash_4.default.merge(this.point, {
                            name: IdGenerator_1.uniqId(),
                            offsetX: offset.x,
                            offsetY: offset.y + this.offsetYDelta
                        });
                        var endPoint = point;
                        points.push(point);
                        if (dependency.length > 1) {
                            var addPoint = {
                                name: IdGenerator_1.uniqId(),
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
                                Name: IdGenerator_1.uniqId(),
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
                        vue_2.default.set(this.rules, index, val);
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
System.register("components/Diagram/Handler/AddDependedPoint", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
    exports_6("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/Diagram/Handler/ChangePointSettingHandler", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
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
    exports_7("default", default_2);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/CharacteristicValue", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Role", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Dependency", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/BasePoint", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/Diagram/Test/GraphTestControll", ["vue", "Model/PointType", "lodash"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var vue_3, PointType_2, lodash_5;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (PointType_2_1) {
                PointType_2 = PointType_2_1;
            },
            function (lodash_5_1) {
                lodash_5 = lodash_5_1;
            }
        ],
        execute: function () {
            exports_12("default", vue_3.default.extend({
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
System.register("components/CharacteristicDiagram", ["vue", "lodash", "syncfusion", "mixins/m_lodash", "components/Diagram/AddDependPointWindow", "components/Diagram/Handler/AddDependedPoint", "components/Diagram/Handler/ChangePointSettingHandler", "Model/PointType", "mixins/IdGenerator", "components/Diagram/Test/GraphTestControll"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vue_4, lodash_6, m_lodash_1, AddDependPointWindow_1, AddDependedPoint_1, ChangePointSettingHandler_1, PointType_3, IdGenerator_2, GraphTestControll_1, constraints;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
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
            function (IdGenerator_2_1) {
                IdGenerator_2 = IdGenerator_2_1;
            },
            function (GraphTestControll_1_1) {
                GraphTestControll_1 = GraphTestControll_1_1;
            }
        ],
        execute: function () {
            constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;
            exports_13("default", vue_4.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height", "characteristics", "roles"],
                data: function () {
                    return {
                        bus: new vue_4.default(),
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
                                Name: IdGenerator_2.uniqId(),
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
System.register("Model/Graph", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Characteristic", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/RootState", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Node", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Connector", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Graph", [], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Store/GraphStore", ["vue", "vuex-typescript", "lodash", "Model/PointType", "mixins/IdGenerator"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var vue_5, vuex_typescript_1, lodash_7, PointType_4, IdGenerator_3, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty, removeConnection;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
            },
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_7_1) {
                lodash_7 = lodash_7_1;
            },
            function (PointType_4_1) {
                PointType_4 = PointType_4_1;
            },
            function (IdGenerator_3_1) {
                IdGenerator_3 = IdGenerator_3_1;
            }
        ],
        execute: function () {
            exports_20("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [{
                            Name: "Graph1",
                            Points: [
                                {
                                    name: IdGenerator_3.uniqId(),
                                    Label: "Start",
                                    offsetX: 500,
                                    offsetY: 60,
                                    Options: {
                                        type: PointType_4.PointType.start
                                    }
                                }
                            ],
                            Dependencies: []
                        }],
                    Characteristics: [
                        {
                            Name: "Char 1",
                            Values: [{
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 1. Value 1"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 1. Value 2"
                                }]
                        },
                        {
                            Name: "Char 2",
                            Values: [{
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 2. Value 1"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 2. Value 2"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 2. Value 3"
                                }
                            ]
                        },
                        {
                            Name: "Char 3",
                            Values: [{
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 1"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 2"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 3"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 4"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 5"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 6"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 7"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 8"
                                }, {
                                    Id: IdGenerator_3.uniqId(),
                                    Name: "Char 3. Value 9"
                                }
                            ]
                        }
                    ],
                    Roles: [
                        {
                            Id: IdGenerator_3.uniqId(),
                            Name: "Role 1"
                        },
                        {
                            Id: IdGenerator_3.uniqId(),
                            Name: "Role 2"
                        },
                        {
                            Id: IdGenerator_3.uniqId(),
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
                                        sourceNode: con.Start.name,
                                        targetNode: con.End.name
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
                        vue_5.default.set(point, item.propName, item.newValue);
                    },
                    removeConnection: function (state, options) {
                        var graph = lodash_7.default.find(state.Graphs, function (x) { return x.Name === options.graph; });
                        lodash_7.default.remove(graph.Dependencies, function (x) { return x.Name === options.connectorName; });
                    }
                }
            });
            _a = vuex_typescript_1.getStoreAccessors("graph"), read = _a.read, commit = _a.commit;
            exports_20("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_20("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_20("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_20("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_20("getCharacteristicsList", getCharacteristicsList = read(graphModule.getters.getCharacteristicsList));
            exports_20("getRoles", getRoles = read(graphModule.getters.getRoles));
            exports_20("addGraph", addGraph = commit(graphModule.mutations.addGraph));
            exports_20("addPoint", addPoint = commit(graphModule.mutations.addPoint));
            exports_20("addDependency", addDependency = commit(graphModule.mutations.addDependency));
            exports_20("changeNodeProperty", changeNodeProperty = commit(graphModule.mutations.changeNodeProperty));
            exports_20("removeConnection", removeConnection = commit(graphModule.mutations.removeConnection));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore", "vuex-persist"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var vue_6, vuex_1, GraphStore_1, vuex_persist_1, vuexLocal, createStore;
    return {
        setters: [
            function (vue_6_1) {
                vue_6 = vue_6_1;
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
            vue_6.default.use(vuex_1.default);
            vuexLocal = new vuex_persist_1.default({
                storage: window.localStorage
            });
            exports_21("createStore", createStore = function () {
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
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType", "mixins/IdGenerator"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var vue_7, CharacteristicDiagram_1, RootStore_1, graph, PointType_5, IdGenerator_4, store;
    return {
        setters: [
            function (vue_7_1) {
                vue_7 = vue_7_1;
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
            function (PointType_5_1) {
                PointType_5 = PointType_5_1;
            },
            function (IdGenerator_4_1) {
                IdGenerator_4 = IdGenerator_4_1;
            }
        ],
        execute: function () {
            store = RootStore_1.createStore();
            exports_22("default", vue_7.default.extend({
                template: '#app-hello-template',
                store: store,
                data: function () {
                    return {
                        message: "test message"
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
                    characteristics: function () {
                        return graph.getCharacteristicsList(this.$store);
                    },
                    roles: function () {
                        return graph.getRoles(this.$store);
                    }
                },
                methods: {
                    addGraph: function () {
                        graph.addGraph(this.$store, {
                            Name: "Graph" + (graph.readGraphCount(this.$store) + 1),
                            Points: [{
                                    name: IdGenerator_4.uniqId(),
                                    offsetX: 500,
                                    offsetY: 20,
                                    Label: "Start",
                                    Options: {
                                        type: PointType_5.PointType.start
                                    }
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
                    }
                },
                components: {
                    CharacteristicDiagram: CharacteristicDiagram_1.default
                }
            }));
        }
    };
});
System.register("index", ["vue", "components/AppHello"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var vue_8, AppHello_1, v;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            }
        ],
        execute: function () {
            //Root Component
            v = new vue_8.default({
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
System.register("Model/CharacteristicPoint", [], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/IDependencyRole", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb2xlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0RlcGVuZGVuY3kudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQmFzZVBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1Jvb3RTdGF0ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaC50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9HcmFwaFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL1Jvb3RTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2luZGV4LnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvSURlcGVuZGVuY3lSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLHlCQUF3QyxJQUFJLEVBQUUsSUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFZO1FBQWhDLHFCQUFBLEVBQUEsUUFBUTtRQUFZLHdCQUFBLEVBQUEsWUFBWTtRQUM3RSxJQUFJLEdBQUcsR0FBRyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUM7WUFDTixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtJQUNGLENBQUM7Ozs7Ozs7Ozs7WUFFRCx3QkFBYSxVQUFVLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSTtnQkFDOUMsaUJBQWlCLE1BQU0sRUFBRSxJQUFJO29CQUM1QixNQUFNLENBQUMsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO3dCQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMs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QyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQ0QsZ0JBQWdCLFlBQUMsT0FBeUU7d0JBQ3pGLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUNoRCxDQUFDO29CQUNELGdCQUFnQixZQUFDLE9BQStDO3dCQUMvRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDOUMsQ0FBQztpQkFDRDtnQkFDRSxVQUFVLEVBQUU7b0JBQ2QscUJBQXFCLGlDQUFBO2lCQUNsQjthQUNKLENBQUM7UUFBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztZQzlESixnQkFBZ0I7WUFDWixDQUFDLEdBQUcsSUFBSSxhQUFHLENBQUM7Z0JBQ1osRUFBRSxFQUFFLFdBQVc7Z0JBQ2xCLFFBQVEsRUFBRSxhQUFhO2dCQUNwQixvQ0FBb0M7Z0JBQ3BDLFVBQVUsRUFBRTtvQkFDZCxRQUFRLG9CQUFBO2lCQUNMO2FBQ0osQ0FBQyxDQUFDO1FBQUEsQ0FBQzs7Ozs7Ozs7O1FDTEgsQ0FBQzs7Ozs7Ozs7O1FDSEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVtb2l6ZURlYm91bmNlKGZ1bmMsIHdhaXQgPSAwLCByZXNvbHZlciwgb3B0aW9ucyA9IHt9KSB7XHJcblx0dmFyIG1lbSA9IF8ubWVtb2l6ZSgoKSA9PiBfLmRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpLCByZXNvbHZlcik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdG1lbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGlmZmVyZW5jZSA9IGZ1bmN0aW9uKG9iamVjdCwgYmFzZSkge1xuXHRmdW5jdGlvbiBjaGFuZ2VzKG9iamVjdCwgYmFzZSkge1xuXHRcdHJldHVybiBfLnRyYW5zZm9ybShvYmplY3QsIGZ1bmN0aW9uIChyZXN1bHQsIHZhbHVlLCBrZXkpIHtcblx0XHRcdGlmICghXy5pc0VxdWFsKHZhbHVlLCBiYXNlW2tleV0pKSB7XG5cdFx0XHRcdHZhciByZXMgPSAoXy5pc09iamVjdCh2YWx1ZSkgJiYgXy5pc09iamVjdChiYXNlW2tleV0pKSA/IGNoYW5nZXModmFsdWUsIGJhc2Vba2V5XSkgOiB2YWx1ZTtcblx0XHRcdFx0aWYgKCFfLmlzRW1wdHkocmVzKSkge1xuXHRcdFx0XHRcdHJlc3VsdFtrZXldID0gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0dmFyIGNoYW5nZWQgPSBjaGFuZ2VzKG9iamVjdCwgYmFzZSk7XG5cdHJldHVybiBfLmlzRW1wdHkoY2hhbmdlZCkgPyBudWxsIDogY2hhbmdlZDtcbn0iLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBtYXBBY3Rpb25zIH0gZnJvbSBcInZ1ZXhcIjtcclxuLy/Qn9GA0Lgg0LrQvtC80L/QuNC70Y/RhtC40LggdHlwZXNjcmlwdCDQstGL0YHQutCw0LrQuNCy0LDQtdGCINC+0YjQuNCx0LrQsCBcItC90LUg0L3QsNGF0L7QtNC40YIg0YHQstC+0LnRgdGC0LLQsCB0b2dnbGVzUm9sZXNcIiDRgtC+0LvRjNC60L4g0LrQvtCz0LTQsCBwcm9wczogT2JqZWN0XHJcbi8v0J7QsdGF0L7QtNC90L7QtSDRgNC10YjQtdC90LjQtVxyXG52YXIgVnVlUDogYW55ID0gVnVlO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlUC5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNydWxlLWNvbnRyb2xsXCIsXHJcblx0cHJvcHM6IHtcclxuXHRcdHBvaW50OiBPYmplY3QsXHJcblx0XHRpbmRleDogW051bWJlciwgU3RyaW5nXSxcclxuXHRcdHJvbGVzOiBBcnJheSxcclxuXHRcdHJvbGVXaXRoRGV0YWlsOiB7XHJcblx0XHRcdHR5cGU6IEJvb2xlYW4sXHJcblx0XHRcdGRlZmF1bHQ6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0dG9nZ2xlc1ZhbHVlczoge1xyXG5cdFx0XHR0eXBlOiBBcnJheSxcclxuXHRcdFx0ZGVmYXVsdDogW11cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IFtdXHJcblx0XHR9XHJcblx0fSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWRSb2xlOiBudWxsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0b25Sb2xlU2VsZWN0Q2xpY2soKSB7XHJcblx0XHRcdHRoaXMuYWRkUm9sZSh7XHJcblx0XHRcdFx0cm9sZTogdGhpcy5zZWxlY3RlZFJvbGVcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUm9sZShyb2xlSW5mbykge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZXNSb2xlcy5wdXNoKHJvbGVJbmZvKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVSb2xlQnlJbmRleChpbmRleCkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZXNSb2xlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdHVuaXEoKSB7XHJcblx0XHRcdHJldHVybiBcIl9cIiArIHRoaXMuaW5kZXg7XHJcblx0XHR9LFxyXG5cdFx0ZXhpc3RzUm9sZXMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnJvbGVzLmZpbHRlcih4ID0+XHJcblx0XHRcdFx0Xy5maW5kSW5kZXgodGhpcy50b2dnbGVzUm9sZXMsICh5OiBhbnkpID0+IHkucm9sZS5OYW1lID09IHguTmFtZSkgPCAwXHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzVmFsdWVzOiB7XHJcblx0XHRcdGdldCgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy50b2dnbGVzVmFsdWVzO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXQodmFsKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcInVwZGF0ZTp0b2dnbGVzVmFsdWVzXCIsIHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNSb2xlczoge1xyXG5cdFx0XHRnZXQoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudG9nZ2xlc1JvbGVzO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXQodmFsKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcInVwZGF0ZTp0b2dnbGVzUm9sZXNcIiwgdmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVuaXFJZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gXy51bmlxdWVJZCgpICsgXCJfXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDApO1xyXG59OyIsIlxyXG5leHBvcnQgZW51bSBQb2ludFR5cGUge1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRjaGFyYWN0ZXJpc3RpYyxcclxuXHRhZ2dyZWdhdG9yXHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFJ1bGVDb250cm9sbCBmcm9tIFwiLi9SdWxlQ29udHJvbGxcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uLy4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmRlY2xhcmUgY29uc3QgJDogYW55O1xyXG5kZWNsYXJlIGNvbnN0IE9iamVjdDogYW55O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRwb2ludDoge1xyXG5cdFx0XHRuYW1lOiBudWxsLFxyXG5cdFx0XHREZWZhdWx0VmFsdWU6IG51bGwsXHJcblx0XHRcdExhYmVsOiBudWxsLFxyXG5cdFx0XHRDaGFyYWN0ZXJpc3RpYzogbnVsbCxcclxuXHRcdFx0VmFsdWVzOiBbXSxcclxuXHRcdFx0Um9sZXM6IG51bGwsXHJcblx0XHRcdFJlcXVpcmVkOiBmYWxzZSxcclxuXHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpY1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c2VsZWN0ZWRDaGFyYWN0ZXJpc3RpYzogbnVsbCxcclxuXHRcdHVuaXFJZDogdW5pcUlkKCksXHJcblx0XHRvZmZzZXRZRGVsdGE6IDI1MFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNhZGQtZGVwZW5kLXBvaW50XCIsXHJcblx0cHJvcHM6IFtcInNob3dcIiwgXCJpZFwiLCBcImRlcGVuZGVuY3lcIiwgXCJjaGFyYWN0ZXJpc3RpY3NcIiwgXCJyb2xlc1wiLCBcImRlZmF1bHRQb2ludFwiLCBcImRlZmF1bHREZXBlbmRlbmN5XCIsIFwiaXNNb2RhbFdpbmRvd1wiXSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRSdWxlQ29udHJvbGxcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRlbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjYWRkLWRlcGVuZC1wb2ludF9cIiArIHRoaXMuaWQ7XHJcblx0XHR9LFxyXG5cdFx0bWFpbkNsYXNzT2JqZWN0KCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG1vZGFsOiB0aGlzLmlzTW9kYWxXaW5kb3csXHJcblx0XHRcdFx0ZmFkZTogdGhpcy5pc01vZGFsV2luZG93XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0bW9kYWxNYXhXaWR0aCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNNb2RhbFdpbmRvdyA/IFwiODAlXCIgOiBcIjEwMCVcIjtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGE6IGdldERlZmF1bHRWYWx1ZSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0JCh0aGlzLmVsSWQpXHJcblx0XHRcdC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGNsb3NlKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY2xvc2VcIik7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcy4kZGF0YSwgZ2V0RGVmYXVsdFZhbHVlKCkpO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KCkge1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IHRoaXMuZGVwZW5kZW5jeTtcclxuXHRcdFx0dmFyIG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0QnlEZXBlbmRlbmN5KHRoaXMuZGVwZW5kZW5jeSk7XHJcblxyXG5cdFx0XHR2YXIgcG9pbnRzID0gW107XHJcblx0XHRcdHZhciBwb2ludCA9IF8ubWVyZ2UodGhpcy5wb2ludCwge1xyXG5cdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdG9mZnNldFk6IG9mZnNldC55ICsgdGhpcy5vZmZzZXRZRGVsdGFcclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBlbmRQb2ludDogYW55ID0gcG9pbnQ7XHJcblxyXG5cdFx0XHRwb2ludHMucHVzaChwb2ludCk7XHJcblx0XHRcdGlmIChkZXBlbmRlbmN5Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHR2YXIgYWRkUG9pbnQgPSB7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIkFuZFwiLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuYWdncmVnYXRvclxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YSAvIDJcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBvaW50cy5wdXNoKGFkZFBvaW50KTtcclxuXHRcdFx0XHRlbmRQb2ludCA9IGFkZFBvaW50O1xyXG5cdFx0XHRcdGRlcGVuZGVuY3kucHVzaCh7XHJcblx0XHRcdFx0XHRFbmQ6IHBvaW50LFxyXG5cdFx0XHRcdFx0U3RhcnQ6IGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRSdWxlczogW11cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZXBlbmRlbmN5LmZpbHRlcih4ID0+IHguRW5kID09PSBudWxsKS5mb3JFYWNoKHggPT4geC5FbmQgPSBlbmRQb2ludCk7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogcG9pbnRzLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IGRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNoYW5nZVBvaW50KCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY29tbWl0LXBvaW50XCIsIHtcclxuXHRcdFx0XHRwb2ludHM6IFt0aGlzLnBvaW50XSxcclxuXHRcdFx0XHRkZXBlbmRlbmN5OiB0aGlzLmRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b25SdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSB2YWwuaW5kZXg7XHJcblx0XHRcdFZ1ZS5zZXQodGhpcy5ydWxlcywgaW5kZXgsIHZhbCk7XHJcblx0XHR9LFxyXG5cdFx0b25TZWxlY3RDaGFyUnVsZUNoYW5nZSh2YWwpIHtcclxuXHRcdFx0Ly90aGlzLnBvaW50LlZhbHVlcyA9IHZhbC5WYWx1ZXM7XHJcblx0XHRcdC8vdGhpcy5wb2ludC5Sb2xlcyA9IHZhbC5Sb2xlcztcclxuXHRcdH0sXHJcblx0XHRnZXRPZmZzZXRCeURlcGVuZGVuY3koZGVwZW5kZW5jaWVzKSB7XHJcblx0XHRcdHZhciBkZXA6IGFueSA9IF8uZmlyc3QoZGVwZW5kZW5jaWVzKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR4OiBkZXAuU3RhcnQub2Zmc2V0WCxcclxuXHRcdFx0XHR5OiBkZXAuU3RhcnQub2Zmc2V0WVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHNob3codmFsKSB7XHJcblx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJzaG93XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcImhpZGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkZWZhdWx0UG9pbnQoZGVmYXVsdFBvaW50KSB7XHJcblx0XHRcdGlmIChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLnBvaW50ID0gZGVmYXVsdFBvaW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBhZGREZXBlbmRQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJhZGQtZGVwZW5kLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQWRkXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbUxlZnQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTE0LjYxMywxMGMwLDAuMjMtMC4xODgsMC40MTktMC40MTksMC40MTlIMTAuNDJ2My43NzRjMCwwLjIzLTAuMTg5LDAuNDItMC40MiwwLjQycy0wLjQxOS0wLjE4OS0wLjQxOS0wLjQydi0zLjc3NEg1LjgwNmMtMC4yMywwLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDE5czAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5aDMuNzc1VjUuODA2YzAtMC4yMywwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOXMwLjQyLDAuMTg5LDAuNDIsMC40MTl2My43NzVoMy43NzRDMTQuNDI1LDkuNTgxLDE0LjYxMyw5Ljc3LDE0LjYxMywxMCBNMTcuOTY5LDEwYzAsNC40MDEtMy41NjcsNy45NjktNy45NjksNy45NjljLTQuNDAyLDAtNy45NjktMy41NjctNy45NjktNy45NjljMC00LjQwMiwzLjU2Ny03Ljk2OSw3Ljk2OS03Ljk2OUMxNC40MDEsMi4wMzEsMTcuOTY5LDUuNTk4LDE3Ljk2OSwxMCBNMTcuMTMsMTBjMC0zLjkzMi0zLjE5OC03LjEzLTcuMTMtNy4xM1MyLjg3LDYuMDY4LDIuODcsMTBjMCwzLjkzMywzLjE5OCw3LjEzLDcuMTMsNy4xM1MxNy4xMywxMy45MzMsMTcuMTMsMTBcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBDaGFuZ2VQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbj86IGFueSkge1xyXG5cdHZhciBmdW5jID0gKGZ1bmN0aW9uIChiYXNlOiBhbnkpIHtcclxuXHRcdGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uZXh0ZW5kKEFkZERlcGVuZFBvaW50LCBiYXNlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBBZGREZXBlbmRQb2ludChuYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0YmFzZS5jYWxsKHRoaXMsIG5hbWUpO1xyXG5cdFx0XHR0aGlzLnNpbmdsZUFjdGlvbiA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvbmVkTm9kZXMgPSBbXTtcclxuXHRcdFx0dGhpcy5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHRcdH1cclxuXHRcdEFkZERlcGVuZFBvaW50LnByb3RvdHlwZS5tb3VzZXVwID0gZnVuY3Rpb24gKGV2dDogYW55KSB7XHJcblx0XHRcdGJhc2UucHJvdG90eXBlLm1vdXNldXAuY2FsbCh0aGlzLCBldnQpO1xyXG5cdFx0XHRvcHRpb24uYnVzLiRlbWl0KFwiY2hhbmdlLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQ2hhbmdlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbVJpZ2h0O1xyXG5cdGFkZERlcGVuZFBvaW50LnZpc2libGUgPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LmVuYWJsZU11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTAsMi4xNzJjLTQuMzI0LDAtNy44MjgsMy41MDQtNy44MjgsNy44MjhTNS42NzYsMTcuODI4LDEwLDE3LjgyOGM0LjMyNCwwLDcuODI4LTMuNTA0LDcuODI4LTcuODI4UzE0LjMyNCwyLjE3MiwxMCwyLjE3Mk0xMCwxNy4wMDRjLTMuODYzLDAtNy4wMDQtMy4xNDEtNy4wMDQtNy4wMDNTNi4xMzcsMi45OTcsMTAsMi45OTdjMy44NjIsMCw3LjAwNCwzLjE0MSw3LjAwNCw3LjAwNFMxMy44NjIsMTcuMDA0LDEwLDE3LjAwNE0xMCw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MlM5LjIwNSwxMS40NDMsMTAsMTEuNDQzczEuNDQxLTAuNjQ3LDEuNDQxLTEuNDQzUzEwLjc5NSw4LjU1OSwxMCw4LjU1OSBNMTAsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTOS42Niw5LjM4MiwxMCw5LjM4MlMxMC42MTgsOS42NjEsMTAuNjE4LDEwUzEwLjM0LDEwLjYxOSwxMCwxMC42MTkgTTE0LjEyLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ3LDEuNDQzLDEuNDQyLDEuNDQzczEuNDQyLTAuNjQ3LDEuNDQyLTEuNDQzUzE0LjkxNSw4LjU1OSwxNC4xMiw4LjU1OSBNMTQuMTIsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThzMC4yNzgtMC42MTgsMC42MTgtMC42MThTMTQuNzM4LDkuNjYxLDE0LjczOCwxMFMxNC40NiwxMC42MTksMTQuMTIsMTAuNjE5IE01Ljg4LDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ2LDEuNDQzLDEuNDQyLDEuNDQzUzcuMzIyLDEwLjc5Niw3LjMyMiwxMFM2LjY3NSw4LjU1OSw1Ljg4LDguNTU5IE01Ljg4LDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4UzUuNTQsOS4zODIsNS44OCw5LjM4MlM2LjQ5OCw5LjY2MSw2LjQ5OCwxMFM2LjIyLDEwLjYxOSw1Ljg4LDEwLjYxOVwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvbGVcclxue1xyXG5cdElkOiBzdHJpbmc7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU/OiBDaGFyYWN0ZXJpc3RpY1ZhbHVlO1xyXG59IiwiaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5IHtcclxuXHRTdGFydDogQmFzZVBvaW50LFxyXG5cdE5hbWU6IHN0cmluZzsgXHJcblx0TGFiZWw/OiBzdHJpbmc7XHJcblx0RW5kOiBCYXNlUG9pbnQ7XHJcblx0Um9sZXM/OiBBcnJheTxJUm9sZT47XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi9Qb2ludFR5cGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVBvaW50IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0b2Zmc2V0WDogYW55O1xyXG5cdG9mZnNldFk6IGFueTtcclxuXHRPcHRpb25zOiB7XHJcblx0XHR0eXBlOiBQb2ludFR5cGU7XHJcblx0fSxcclxuXHRMYWJlbDogc3RyaW5nO1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2dyYXBoLXRlc3RcIixcclxuXHRwcm9wczogW1wiZ3JhcGhcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNlbGVjdGVkVmFsdWVzOiBbXSxcclxuXHRcdFx0ZHluYW1pYzoge1xyXG5cdFx0XHRcdFBvaW50czogW11cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRhY3RpdmVQb2ludHMoKSB7XHJcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdFx0aWYgKHRoaXMucG9pbnRzKSB7XHJcblx0XHRcdFx0dmFyIHN0YXJ0UG9pbnQgPSBfLmZpbmQodGhpcy5wb2ludHMsIHAgPT4gcC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCk7XHJcblx0XHRcdFx0cmVzdWx0ID0gdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW5zKHN0YXJ0UG9pbnQpLmZpbHRlcih4ID0+IHguT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJhY3RpdmVcIiwgcmVzdWx0KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRwb2ludHMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5vZGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0aXNGcm9tU3RhcnQobm9kZSkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgodGhpcy5ncmFwaC5Db25uZWN0b3JzLCAoeDogYW55KSA9PiB4LlN0YXJ0Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0ICYmIHguRW5kLm5hbWUgPT09IG5vZGUubmFtZSkgPj0gMDtcclxuXHRcdH0sXHJcblx0XHRnZXRQb2ludEluRGVwZW5kZW5jaWVzKHBvaW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5FbmQubmFtZSA9PT0gcG9pbnQubmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3RhcnRQb2ludEJ5RGVwKGRlcCkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kKHRoaXMucG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gZGVwLlN0YXJ0Lm5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlQWN0aXZlQ2hpbGRyZW5zKHBvaW50KSB7XHJcblx0XHRcdHZhciBjaGlsZHJlbnMgPSB0aGlzLmdldENoaWxkcmVuKHBvaW50KTtcclxuXHRcdFx0Y2hpbGRyZW5zLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmICghY2hpbGQpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGRlcHMgPSB0aGlzLmdldFBvaW50SW5EZXBlbmRlbmNpZXMoY2hpbGQpO1xyXG5cdFx0XHRcdGNoaWxkLkFjdGl2ZSA9IF8uZmluZEluZGV4KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSkgPj0gMDtcclxuXHRcdFx0XHRpZiAoIWNoaWxkLkFjdGl2ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5yZUFjdGl2ZUNoaWxkcmVucyhjaGlsZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGlsZHJlbihub2RlKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5TdGFydC5uYW1lID09PSBub2RlLm5hbWUpLm1hcCh4ID0+IHRoaXMuZ2V0UG9pbnRCeU5hbWUoeC5FbmQubmFtZSkpO1xyXG5cdFx0fSxcclxuXHRcdGlzRGVwZW5kZW5jeVBhc3MoZGVwKSB7XHJcblx0XHRcdHZhciBzdGFydCA9IGRlcC5TdGFydDtcclxuXHRcdFx0dmFyIHZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1tzdGFydC5uYW1lXTtcclxuXHRcdFx0aWYgKGRlcC5SdWxlcykge1xyXG5cdFx0XHRcdGlmIChzdGFydC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYykge1xyXG5cdFx0XHRcdFx0aWYgKF8uaXNBcnJheShkZXAuUnVsZXMuVmFsdWVzKSAmJiBkZXAuUnVsZXMuVmFsdWVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgoZGVwLlJ1bGVzLlZhbHVlcywgKHg6IGFueSkgPT4geC5JZCA9PT0gdmFsdWUuSWQpID49IDA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRQb2ludEJ5TmFtZShuYW1lKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmQodGhpcy5wb2ludHMsIHggPT4geC5uYW1lID09PSBuYW1lKTtcclxuXHRcdH0sXHJcblx0XHRnZXRWaXNpYmxlQ2hpbGRyZW5zOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVucyA9IHRoaXMuZ2V0Q2hpbGRyZW4ocG9pbnQpO1xyXG5cdFx0XHR2YXIgYWN0aXZlcyA9IGNoaWxkcmVucy5maWx0ZXIoeCA9PiB7XHJcblx0XHRcdFx0aWYgKCF4KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBkZXBzID0gdGhpcy5nZXRQb2ludEluRGVwZW5kZW5jaWVzKHgpO1xyXG5cdFx0XHRcdHN3aXRjaCAoeC5PcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljOlxyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuc3RhcnQ6XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLmZpbmRJbmRleChkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpID49IDA7XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLmV2ZXJ5KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGFjdGl2ZUNoaWxkcmVucyA9IFtdO1xyXG5cdFx0XHRhY3RpdmVzLmZvckVhY2goeCA9PiBhY3RpdmVDaGlsZHJlbnMgPSBfLmNvbmNhdChhY3RpdmVDaGlsZHJlbnMsIHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVucyh4KSkpO1xyXG5cdFx0XHRyZXR1cm4gXy51bmlvbihhY3RpdmVzLCBhY3RpdmVDaGlsZHJlbnMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiZ3JhcGgtY2hhbmdlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFwic3luY2Z1c2lvblwiO1xyXG5pbXBvcnQgbWVtb2l6ZURlYm91bmNlLCB7IGRpZmZlcmVuY2UgfSBmcm9tIFwiLi4vbWl4aW5zL21fbG9kYXNoXCI7XHJcbmltcG9ydCBhZGREZXBlbmRNb2RhbFdpbmRvdyBmcm9tIFwiLi9EaWFncmFtL0FkZERlcGVuZFBvaW50V2luZG93XCI7XHJcbmltcG9ydCBjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0FkZERlcGVuZGVkUG9pbnRcIjtcclxuaW1wb3J0IGNyZWF0ZUNoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXJcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgdGVzdENvbnRyb2xsIGZyb20gXCIuL0RpYWdyYW0vVGVzdC9HcmFwaFRlc3RDb250cm9sbFwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcbnZhciBjb25zdHJhaW50cyA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uRGlhZ3JhbUNvbnN0cmFpbnRzLkRlZmF1bHQgfCBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5GbG9hdEVsZW1lbnRzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2NoYXJhY3RlcmlzdGljLWRpYWdyYW1cIixcclxuXHRwcm9wczogW1wiZ3JhcGhcIiwgXCJjbGFzc2VzXCIsIFwiaGVpZ2h0XCIsIFwiY2hhcmFjdGVyaXN0aWNzXCIsIFwicm9sZXNcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGJ1czogbmV3IFZ1ZSgpLFxyXG5cdFx0XHRzaG93RGVwZW5kTW9kYWw6IGZhbHNlLFxyXG5cdFx0XHRvZmZzZXRZTWFyZ2luOiAyNTAsXHJcblx0XHRcdGFkZE1vZGU6IGZhbHNlLFxyXG5cdFx0XHRkaWFncmFtSW5pdDogZmFsc2UsXHJcblx0XHRcdHNlbGVjdGVkTm9kZXM6IFtdLFxyXG5cdFx0XHRpc01vZGFsV2luZG93OiB0cnVlLFxyXG5cdFx0XHRJc092ZXJ2aWV3QWN0aXZlOiB0cnVlXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGhlaWdodFB4KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5oZWlnaHQgKyBcInB4XCI7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUlkKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5OYW1lO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1FbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjXCIgKyB0aGlzLmRpYWdyYW1JZDtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtT3ZlcnZpZXdFbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFncmFtRWxJZCArIFwiX292ZXJ2aWV3XCI7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlhZ3JhbUluaXQgPyAkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbShcImluc3RhbmNlXCIpIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGUoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdGVkTm9kZXMgJiYgdGhpcy5zZWxlY3RlZE5vZGVzLmxlbmd0aCA+IDAgPyB0aGlzLnNlbGVjdGVkTm9kZXNbMF0gOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZVZhbHVlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmlyc3RTZWxlY3ROb2RlID8gdGhpcy5maXJzdFNlbGVjdE5vZGUuVmFsdWVzIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGVEZXBlbmRlbmN5KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaCAmJiB0aGlzLmZpcnN0U2VsZWN0Tm9kZSA/IHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LkVuZC5uYW1lID09PSB0aGlzLmZpcnN0U2VsZWN0Tm9kZS5uYW1lKSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0ZGVwZW5kU2VsZWN0ZWROb2RlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWROb2RlcyA/IHRoaXMuc2VsZWN0ZWROb2Rlcy5tYXAoeCA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdE5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0U3RhcnQ6IHgsXHJcblx0XHRcdFx0XHRFbmQ6IG51bGwsXHJcblx0XHRcdFx0XHRSdWxlczoge1xyXG5cdFx0XHRcdFx0XHRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRcdFx0XHRSb2xlczogW11cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Y29ubmVjdG9ycygpIHtcclxuXHRcdFx0dGhpcy5ncmFwaC5Db25uZWN0b3JzLmZvckVhY2goeCA9PiB0aGlzLnVwZGF0ZUNvbm5lY3RvckxhYmVsKHgpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycztcclxuXHRcdH0sXHJcblx0XHRub2RlcygpIHtcclxuXHRcdFx0dGhpcy5ncmFwaC5Ob2Rlcy5mb3JFYWNoKHggPT4gdGhpcy51cGRhdGVOb2RlTGFiZWwoeCkpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Ob2RlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdHNlbGVjdGlvbkNoYW5nZShzZWxlY3RlZEl0ZW1zKSB7XHJcblx0XHRcdGlmICghc2VsZWN0ZWRJdGVtcyB8fCBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZE5vZGVzID0gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxlY3RlZEl0ZW1zLmZpbHRlcih4ID0+IHguX3R5cGUgPT09IFwibm9kZVwiKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGVzID0gXy5tYXAoc2VsZWN0ZWROb2RlcywgKHg6IGFueSkgPT4gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIHkgPT4geS5uYW1lID09PSB4Lm5hbWUpKTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRQb2ludEFuZERlcGVuZGVuY3kob3B0aW9ucykge1xyXG5cdFx0XHR2YXIgcG9pbnRzID0gb3B0aW9ucy5wb2ludHM7XHJcblx0XHRcdHZhciBkZXBlbmRlbmN5ID0gb3B0aW9ucy5kZXBlbmRlbmN5O1xyXG5cclxuXHRcdFx0cG9pbnRzLmZvckVhY2gocG9pbnQgPT4gdGhpcy5jb21taXRQb2ludChwb2ludCkpO1xyXG5cdFx0XHRkZXBlbmRlbmN5LmZvckVhY2goZGVwID0+IHRoaXMuY29tbWl0Q29ubmVjdGlvbihkZXApKTtcclxuXHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0Q29ubmVjdGlvbihvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJvbi1hZGQtY29ubmVjdGlvblwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZGlhZ3JhbUlkLFxyXG5cdFx0XHRcdGRlcDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRQb2ludChvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJvbi1hZGQtbm9kZVwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZGlhZ3JhbUlkLFxyXG5cdFx0XHRcdHBvaW50OiBvcHRpb25zXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5BZGREZXBlbmRNb2RhbChvcHRpb24/OiBhbnkpIHtcclxuXHRcdFx0dGhpcy5hZGRNb2RlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5DaGFuZ2VQb2ludE1vZGFsKG9wdGlvbj86IGFueSkge1xyXG5cdFx0XHR0aGlzLmFkZE1vZGUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZU5vZGVQcm9wOiBtZW1vaXplRGVib3VuY2UoZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQodGhpcy5ncmFwaC5Ob2Rlcywgbm9kZSA9PiBub2RlLm5hbWUgPT09IGFyZ3MuZWxlbWVudC5uYW1lKTtcclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwibm9kZS1wcm9wLWNoYW5nZVwiLCB7XHJcblx0XHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0bmFtZTogbm9kZS5uYW1lLFxyXG5cdFx0XHRcdFx0cHJvcE5hbWU6IGFyZ3MucHJvcGVydHlOYW1lLFxyXG5cdFx0XHRcdFx0bmV3VmFsdWU6IGFyZ3MuZWxlbWVudFthcmdzLnByb3BlcnR5TmFtZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgNTAwLCB4ID0+IHgucHJvcGVydHlOYW1lKSxcclxuXHRcdHVwZGF0ZU5vZGVMYWJlbChub2RlKSB7XHJcblx0XHRcdGlmIChub2RlLk9wdGlvbnMpIHtcclxuXHRcdFx0XHR2YXIgcHJvcGVydHkgPSB0aGlzLmdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpO1xyXG5cdFx0XHRcdF8uYXNzaWduKG5vZGUsIHByb3BlcnR5KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIW5vZGUubGFiZWxzIHx8IG5vZGUubGFiZWxzLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdFx0bm9kZS5sYWJlbHMgPSBbe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJsYWJlbDFcIixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRmb250Q29sb3I6IFwiYmxhY2tcIixcclxuXHRcdFx0XHRcdGhvcml6b250YWxBbGlnbm1lbnQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uSG9yaXpvbnRhbEFsaWdubWVudC5SaWdodCxcclxuXHRcdFx0XHRcdHZlcnRpY2FsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSxcclxuXHRcdFx0XHRcdG9mZnNldDoge1xyXG5cdFx0XHRcdFx0XHR5OiAxLjIsXHJcblx0XHRcdFx0XHRcdHg6IDAuOFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGJvdW5kYXJ5Q29uc3RyYWludHM6IGZhbHNlXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdFx0bm9kZS5sYWJlbHNbMF0udGV4dCA9IG5vZGUuTGFiZWw7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlQ29ubmVjdG9yTGFiZWwoY29ubmVjdG9yKSB7XHJcblx0XHRcdGlmICghY29ubmVjdG9yLmxhYmVscyB8fCBjb25uZWN0b3IubGFiZWxzLmxlbmdodCA8PSAwKSB7XHJcblx0XHRcdFx0Y29ubmVjdG9yLmxhYmVscyA9IFt7XHJcblx0XHRcdFx0XHRuYW1lOiBcImxhYmVsMlwiLFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZSxcclxuXHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0YWxpZ25tZW50OiBcImNlbnRlclwiLFxyXG5cdFx0XHRcdFx0Ym91bmRhcnlDb25zdHJhaW50czogZmFsc2UsXHJcblx0XHRcdFx0XHRvZmZzZXQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uUG9pbnQoMCwgMClcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25uZWN0b3IubGFiZWxzWzBdLnRleHQgPSBjb25uZWN0b3IuTGFiZWw7XHJcblx0XHR9LFxyXG5cdFx0Z29UZXN0KCkge1xyXG5cdFx0XHR0aGlzLklzT3ZlcnZpZXdBY3RpdmUgPSBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRnb092ZXJ2aWV3KCkge1xyXG5cdFx0XHR0aGlzLklzT3ZlcnZpZXdBY3RpdmUgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHRlc3RBY3RpdmVOb2RlKGFjdGl2ZXMpIHtcclxuXHRcdFx0aWYgKCFfLmlzQXJyYXkoYWN0aXZlcykgfHwgIXRoaXMuZGlhZ3JhbSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmdyYXBoLk5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0dmFyIGFjdGl2ZSA9IG5vZGUuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQgfHwgXy5maW5kSW5kZXgoYWN0aXZlcywgeCA9PiB4Lm5hbWUgPT09IG5vZGUubmFtZSkgPj0gMDtcclxuXHRcdFx0XHR2YXIgcHJvcGVydGllcyA9ICF0aGlzLklzT3ZlcnZpZXdBY3RpdmUgJiYgYWN0aXZlID8ge1xyXG5cdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiNhNmY1NjhcIlxyXG5cdFx0XHRcdH0gOiB0aGlzLmdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpO1xyXG5cdFx0XHRcdHRoaXMuZGlhZ3JhbS51cGRhdGVOb2RlKG5vZGUubmFtZSwgcHJvcGVydGllcyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHRnZXROb2RlUHJvcGVydGllcyhub2RlKSB7XHJcblx0XHRcdHN3aXRjaCAobm9kZS5PcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5zdGFydDpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjMjljMTVmXCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcImVsbGlwc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiMyMDg1YzlcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwicmVjdGFuZ2xlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiNlYzdlMGRcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwiZWxsaXBzZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0b3IoY29ubmVjdG9yKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJyZW1vdmUtY29ubmVjdGlvblwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRjb25uZWN0b3JOYW1lOiBjb25uZWN0b3IuTmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHR2YXIgJHRoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5idXMuJG9uKFwiYWRkLWRlcGVuZC1wb2ludFwiLCAob3B0aW9ucz86IGFueSkgPT4gdGhpcy5vcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9ucykpO1xyXG5cdFx0dGhpcy5idXMuJG9uKFwiY2hhbmdlLXBvaW50XCIsIChvcHRpb25zPzogYW55KSA9PiB0aGlzLm9wZW5DaGFuZ2VQb2ludE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdCQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKHtcclxuXHRcdFx0ZW5hYmxlQ29udGV4dE1lbnU6IGZhbHNlLFxyXG5cdFx0XHRjb25zdHJhaW50cyxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHgsXHJcblx0XHRcdG5vZGVzOiB0aGlzLm5vZGVzLFxyXG5cdFx0XHRjb25uZWN0b3JzOiB0aGlzLmNvbm5lY3RvcnMsXHJcblx0XHRcdGRlZmF1bHRTZXR0aW5nczoge1xyXG5cdFx0XHRcdG5vZGU6IHtcclxuXHRcdFx0XHRcdHdpZHRoOiA2NSxcclxuXHRcdFx0XHRcdGhlaWdodDogNjUsXHJcblx0XHRcdFx0XHRib3JkZXJXaWR0aDogMFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29ubmVjdG9yOiB7XHJcblx0XHRcdFx0XHRzZWdtZW50czogW3tcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwib3J0aG9nb25hbFwiXHJcblx0XHRcdFx0XHR9XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2Nyb2xsU2V0dGluZ3M6IHtcclxuXHRcdFx0XHRob3Jpem9udGFsT2Zmc2V0OiAwLFxyXG5cdFx0XHRcdHZlcnRpY2FsT2Zmc2V0OiAwLFxyXG5cdFx0XHRcdHpvb21GYWN0b3I6IDAuMlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbmFibGVBdXRvU2Nyb2xsOiB0cnVlLFxyXG5cdFx0XHRwYWdlU2V0dGluZ3M6IHtcclxuXHRcdFx0XHRzY3JvbGxMaW1pdDogXCJpbmZpbml0eVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGVkSXRlbXM6IHtcclxuXHRcdFx0XHR1c2VySGFuZGxlczogW2NyZWF0ZUFkZERlcGVuZFBvaW50SGFuZGxlcih7XHJcblx0XHRcdFx0XHRidXM6IHRoaXMuYnVzXHJcblx0XHRcdFx0fSksIGNyZWF0ZUNoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIoe1xyXG5cdFx0XHRcdFx0YnVzOiB0aGlzLmJ1c1xyXG5cdFx0XHRcdH0pXVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwcm9wZXJ0eUNoYW5nZShhcmdzKSB7XHJcblx0XHRcdFx0aWYgKGFyZ3MuZWxlbWVudFR5cGUgPT09IFwibm9kZVwiKSB7XHJcblx0XHRcdFx0XHRpZiAoXy5pbmNsdWRlcyhbXCJvZmZzZXRYXCIsIFwib2Zmc2V0WVwiXSwgYXJncy5wcm9wZXJ0eU5hbWUpKSB7XHJcblx0XHRcdFx0XHRcdCR0aGlzLnVwZGF0ZU5vZGVQcm9wKGFyZ3MpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0aW9uQ2hhbmdlOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0XHRcdCR0aGlzLnNlbGVjdGlvbkNoYW5nZShvcHRpb25zLnNlbGVjdGVkSXRlbXMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb25uZWN0b3JDb2xsZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAob3B0aW9ucy5jaGFuZ2VUeXBlID09PSBcInJlbW92ZVwiKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDb25uZWN0b3Iob3B0aW9ucy5lbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1PdmVydmlld0VsSWQpLmVqT3ZlcnZpZXcoe1xyXG5cdFx0XHRzb3VyY2VJRDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuZGlhZ3JhbUluaXQgPSB0cnVlO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0YWRkRGVwZW5kTW9kYWxXaW5kb3csXHJcblx0XHR0ZXN0Q29udHJvbGxcclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRncmFwaCh2YWwpIHtcclxuXHRcdFx0dmFyIGRpYWdyYW0gPSB0aGlzLmRpYWdyYW07XHJcblx0XHRcdHZhciBub2RlcyA9IGRpYWdyYW0ubm9kZXMoKTtcclxuXHRcdFx0dmFyIGNvbm5lY3RvcnMgPSBkaWFncmFtLmNvbm5lY3RvcnMoKTtcclxuXHRcdFx0dmFsLk5vZGVzLmZvckVhY2goeCA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGVOb2RlTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQobm9kZXMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5uYW1lKTtcclxuXHRcdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZOb2RlID0gZGlmZmVyZW5jZSh4LCBub2RlKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmTm9kZSkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZU5vZGUobm9kZS5uYW1lLCBkaWZmTm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgZGlmZkxhYmVsID0gZGlmZmVyZW5jZSh4LmxhYmVsc1swXSwgbm9kZS5sYWJlbHNbMF0pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKG5vZGUubmFtZSwgbm9kZS5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFsLkNvbm5lY3RvcnMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZUNvbm5lY3RvckxhYmVsKHgpO1xyXG5cdFx0XHRcdHZhciBjb25uID0gXy5maW5kKGNvbm5lY3RvcnMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5OYW1lKTtcclxuXHRcdFx0XHRpZiAoY29ubikge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZDb25uID0gZGlmZmVyZW5jZSh4LCBjb25uKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmQ29ubikge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUNvbm5lY3Rvcihjb25uLm5hbWUsIGRpZmZDb25uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChjb25uLmxhYmVscy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBjb25uLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRcdGlmIChkaWZmTGFiZWwpIHtcclxuXHRcdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKGNvbm4ubmFtZSwgY29ubi5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0uYWRkTGFiZWwoY29ubi5uYW1lLCB4LmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFBvaW50czogQXJyYXk8QmFzZVBvaW50PjtcclxuXHREZXBlbmRlbmNpZXM6IEFycmF5PERlcGVuZGVuY3k+O1xyXG59IiwiaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWMge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRWYWx1ZXM6IEFycmF5PENoYXJhY3RlcmlzdGljVmFsdWU+O1xyXG59IiwiaW1wb3J0IHsgR3JhcGggfSBmcm9tIFwiLi9HcmFwaFwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpYyB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljXCI7XHJcbmltcG9ydCB7IElSb2xlIH0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb290U3RhdGUge1xyXG5cdEdyYXBoczogQXJyYXk8R3JhcGg+O1xyXG5cdENoYXJhY3RlcmlzdGljczogQXJyYXk8Q2hhcmFjdGVyaXN0aWM+O1xyXG5cdFJvbGVzOiBBcnJheTxJUm9sZT47XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG5cdG5hbWU6IHN0cmluZ1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb25uZWN0b3Ige1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRzb3VyY2VOb2RlOiBzdHJpbmc7XHJcblx0dGFyZ2V0Tm9kZTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vQ29ubmVjdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNmR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZyxcclxuXHROb2RlczogQXJyYXk8Tm9kZT47XHJcblx0Q29ubmVjdG9yczogQXJyYXk8Q29ubmVjdG9yPjtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSwgR2V0dGVyVHJlZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgU2ZHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGhcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxudHlwZSBHcmFwaENvbnRleHQgPSBBY3Rpb25Db250ZXh0PFJvb3RTdGF0ZSwgUm9vdFN0YXRlPjtcclxuXHJcbmV4cG9ydCBjb25zdCBncmFwaE1vZHVsZSA9IHtcclxuXHRuYW1lc3BhY2VkOiB0cnVlLFxyXG5cclxuXHRzdGF0ZToge1xyXG5cdFx0R3JhcGhzOiBbe1xyXG5cdFx0XHROYW1lOiBcIkdyYXBoMVwiLFxyXG5cdFx0XHRQb2ludHM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiA2MCxcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLnN0YXJ0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdLFxyXG5cdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHR9XSxcclxuXHRcdENoYXJhY3RlcmlzdGljczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDFcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMlwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgM1wiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA0XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDZcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA3XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOFwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDlcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdF0sXHJcblx0XHRSb2xlczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAxXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMlwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDNcIlxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHRnZXR0ZXJzOiB7XHJcblx0XHRnZXRHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHM7XHJcblx0XHR9LFxyXG5cdFx0Z3JhcGhDb3VudChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHMubGVuZ3RoO1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZShzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAobmFtZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0dmFyIGdyYXBoID0gXy5maXJzdChzdGF0ZS5HcmFwaHMuZmlsdGVyKHggPT4geC5OYW1lID09PSBuYW1lKSk7XHJcblx0XHRcdFx0cmV0dXJuIGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGUpKGdyYXBoKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAoZ3JhcGg6IEdyYXBoKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdE5hbWU6IGdyYXBoLk5hbWUsXHJcblx0XHRcdFx0XHROb2RlczogZ3JhcGguUG9pbnRzLFxyXG5cdFx0XHRcdFx0Q29ubmVjdG9yczogXy5tYXAoZ3JhcGguRGVwZW5kZW5jaWVzLCBmdW5jdGlvbiAoY29uKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLm1lcmdlKHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBjb24uTmFtZSxcclxuXHRcdFx0XHRcdFx0XHRzb3VyY2VOb2RlOiBjb24uU3RhcnQubmFtZSxcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXROb2RlOiBjb24uRW5kLm5hbWVcclxuXHRcdFx0XHRcdFx0fSwgY29uKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkNoYXJhY3RlcmlzdGljcztcclxuXHRcdH0sXHJcblx0XHRnZXRSb2xlcyhzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5Sb2xlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG11dGF0aW9uczoge1xyXG5cdFx0YWRkR3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogR3JhcGgpIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLnB1c2goaXRlbSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlUG9pbnRJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLlBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ucG9pbnQubmFtZSk7XHJcblxyXG5cdFx0XHRpZiAoZHVwbGljYXRlUG9pbnRJbmRleCA8IDApIHtcclxuXHRcdFx0XHRncmFwaC5Qb2ludHMucHVzaChpdGVtLnBvaW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlUG9pbnQgPSBncmFwaC5Qb2ludHNbZHVwbGljYXRlUG9pbnRJbmRleF07XHJcblx0XHRcdFx0Xy5hc3NpZ24oZHVwbGljYXRlUG9pbnQsIGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5zcGxpY2UoZHVwbGljYXRlUG9pbnRJbmRleCwgMSwgZHVwbGljYXRlUG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YWRkRGVwZW5kZW5jeShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdC8vVE9ETzog0J/RgNC40LzQtdC90LjRgtGMINC40LfQvNC10L3QuNC1INC6INC00LjQsNCz0YDQsNC80LVcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlRGVwSW5kZXggPSBfLmZpbmRJbmRleChncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBpdGVtLmRlcC5OYW1lKTtcclxuXHRcdFx0aWYgKGR1cGxpY2F0ZURlcEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5wdXNoKGl0ZW0uZGVwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlRGVwID0gZ3JhcGguRGVwZW5kZW5jaWVzW2R1cGxpY2F0ZURlcEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVEZXAsIGl0ZW0uZGVwKTtcclxuXHRcdFx0XHRncmFwaC5EZXBlbmRlbmNpZXMuc3BsaWNlKGR1cGxpY2F0ZURlcEluZGV4LCAxLCBkdXBsaWNhdGVEZXApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlTm9kZVByb3BlcnR5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKS5Qb2ludHM7XHJcblx0XHRcdHZhciBwb2ludCA9IF8uZmluZChwb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLm5hbWUpO1xyXG5cdFx0XHRWdWUuc2V0KHBvaW50LCBpdGVtLnByb3BOYW1lLCBpdGVtLm5ld1ZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKHN0YXRlOiBSb290U3RhdGUsIG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmNvbm5lY3Rvck5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHsgcmVhZCwgY29tbWl0IH0gPVxyXG5cdGdldFN0b3JlQWNjZXNzb3JzPFJvb3RTdGF0ZSwgUm9vdFN0YXRlPihcImdyYXBoXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRHcmFwaCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGhDb3VudCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5ncmFwaENvdW50KTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZSA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUpO1xyXG5leHBvcnQgY29uc3QgZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KTtcclxuZXhwb3J0IGNvbnN0IGdldFJvbGVzID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFJvbGVzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRHcmFwaCA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkR3JhcGgpO1xyXG5leHBvcnQgY29uc3QgYWRkUG9pbnQgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZFBvaW50KTtcclxuZXhwb3J0IGNvbnN0IGFkZERlcGVuZGVuY3kgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZERlcGVuZGVuY3kpO1xyXG5leHBvcnQgY29uc3QgY2hhbmdlTm9kZVByb3BlcnR5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5jaGFuZ2VOb2RlUHJvcGVydHkpO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ29ubmVjdGlvbiA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMucmVtb3ZlQ29ubmVjdGlvbik7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IHsgZ3JhcGhNb2R1bGUgYXMgZ3JhcGggfSBmcm9tIFwiLi9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCBWdWV4UGVyc2lzdGVuY2UgZnJvbSBcInZ1ZXgtcGVyc2lzdFwiO1xyXG5cclxuVnVlLnVzZShWdWV4KTtcclxuXHJcbmNvbnN0IHZ1ZXhMb2NhbCA9IG5ldyBWdWV4UGVyc2lzdGVuY2Uoe1xyXG5cdHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gbmV3IFZ1ZXguU3RvcmU8Um9vdFN0YXRlPih7XHJcblx0XHRtb2R1bGVzOiB7XHJcblx0XHRcdGdyYXBoXHJcblx0XHR9LFxyXG5cdFx0cGx1Z2luczogW3Z1ZXhMb2NhbC5wbHVnaW5dLFxyXG5cdFx0c3RyaWN0OiB0cnVlXHJcblx0fSlcclxufTsiLCIvLyBDbGllbnRBcHAvY29tcG9uZW50cy9BcHBIZWxsby50c1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyaXN0aWNEaWFncmFtIGZyb20gXCIuL0NoYXJhY3RlcmlzdGljRGlhZ3JhbVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCIuLi9TdG9yZS9Sb290U3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZ3JhcGggZnJvbSBcIi4uL1N0b3JlL0dyYXBoU3RvcmVcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG5cclxudmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoKTtcclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6ICcjYXBwLWhlbGxvLXRlbXBsYXRlJyxcclxuXHRzdG9yZSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bWVzc2FnZTogXCJ0ZXN0IG1lc3NhZ2VcIlxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHR0ZXN0KCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGgucmVhZEdyYXBoKHRoaXMuJHN0b3JlKVswXS5Qb2ludHMubWFwKHggPT4geC5MYWJlbCk7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbXMoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5yZWFkR3JhcGgodGhpcy4kc3RvcmUpLm1hcCh4ID0+IGdyYXBoLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHRoaXMuJHN0b3JlKSh4KSk7XHJcblx0XHR9LFxyXG5cdFx0Y2hhcmFjdGVyaXN0aWNzKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGguZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCh0aGlzLiRzdG9yZSk7XHJcblx0XHR9LFxyXG5cdFx0cm9sZXMoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5nZXRSb2xlcyh0aGlzLiRzdG9yZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRhZGRHcmFwaCgpIHtcclxuXHRcdFx0Z3JhcGguYWRkR3JhcGgodGhpcy4kc3RvcmUsIHtcclxuXHRcdFx0XHROYW1lOiBcIkdyYXBoXCIgKyAoZ3JhcGgucmVhZEdyYXBoQ291bnQodGhpcy4kc3RvcmUpICsgMSksXHJcblx0XHRcdFx0UG9pbnRzOiBbe1xyXG5cdFx0XHRcdFx0bmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiAyMCxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkTm9kZShub2RlOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHRncmFwaC5hZGRQb2ludCh0aGlzLiRzdG9yZSwgbm9kZSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkQ29ubmVjdGlvbihjb25uZWN0OiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdGdyYXBoLmFkZERlcGVuZGVuY3kodGhpcy4kc3RvcmUsIGNvbm5lY3QpO1xyXG5cdFx0fSxcclxuXHRcdG9uTm9kZVByb3BDaGFuZ2Uob3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHRncmFwaC5jaGFuZ2VOb2RlUHJvcGVydHkodGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rpb24ob3B0aW9uczoge2dyYXBoOiBzdHJpbmcsIGNvbm5lY3Rvck5hbWU6IHN0cmluZ30pIHtcclxuXHRcdFx0Z3JhcGgucmVtb3ZlQ29ubmVjdGlvbih0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fSxcclxuICAgIGNvbXBvbmVudHM6IHtcclxuXHRcdENoYXJhY3RlcmlzdGljRGlhZ3JhbVxyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQXBwSGVsbG8gZnJvbSBcIi4vY29tcG9uZW50cy9BcHBIZWxsb1wiO1xyXG5pbXBvcnQgbG9kYXNoTWl4aW4gZnJvbSBcIi4vbWl4aW5zL21fbG9kYXNoXCI7XHJcblxyXG4vL1Jvb3QgQ29tcG9uZW50XHJcbmxldCB2ID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogXCIjYXBwLXJvb3RcIixcclxuXHR0ZW1wbGF0ZTogJzxBcHBIZWxsby8+JyxcclxuICAgIC8vcmVuZGVyOiBoID0+IGgoQXBwSGVsbG9Db21wb25lbnQpLFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0QXBwSGVsbG9cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNQb2ludCBleHRlbmRzIEJhc2VQb2ludCB7XHJcblx0Q2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcblx0UmVxdWlyZWQ/OiBib29sZWFuO1xyXG5cdERlZmF1bHRWYWx1ZT86IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQge0RlcGVuZGVuY3l9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHtJUm9sZX0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVwZW5kZW5jeVJvbGUge1xyXG5cdERlcGVuZGVuY3k6IERlcGVuZGVuY3k7XHJcblx0Um9sZTogSVJvbGU7XHJcbn0iXX0=