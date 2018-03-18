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
    var vue_5, vuex_typescript_1, lodash_7, PointType_4, IdGenerator_3, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb2xlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0RlcGVuZGVuY3kudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQmFzZVBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1Jvb3RTdGF0ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaC50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9HcmFwaFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL1Jvb3RTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2luZGV4LnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvSURlcGVuZGVuY3lSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLHlCQUF3QyxJQUFJLEVBQUUsSUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFZO1FBQWhDLHFCQUFBLEVBQUEsUUFBUTtRQUFZLHdCQUFBLEVBQUEsWUFBWTtRQUM3RSxJQUFJLEdBQUcsR0FBRyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUM7WUFDTixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtJQUNGLENBQUM7Ozs7Ozs7Ozs7WUFFRCx3QkFBYSxVQUFVLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSTtnQkFDOUMsaUJBQWlCLE1BQU0sRUFBRSxJQUFJO29CQUM1QixNQUFNLENBQUMsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO3dCQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMs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QUNGLFlBQVksRUFBRSxFQUFFO3lCQUNoQixDQUFDLENBQUM7b0JBQ0osQ0FBQztvQkFDRCxPQUFPLEVBQUUsVUFBVSxJQUF5Qzt3QkFDM0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUNELGFBQWEsRUFBRSxVQUFVLE9BQTJDO3dCQUNuRSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQ0QsZ0JBQWdCLEVBQUUsVUFBVSxPQUF5RTt3QkFDcEcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ2hELENBQUM7aUJBQ0Q7Z0JBQ0UsVUFBVSxFQUFFO29CQUNkLHFCQUFxQixpQ0FBQTtpQkFDbEI7YUFDSixDQUFDO1FBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUMzREosZ0JBQWdCO1lBQ1osQ0FBQyxHQUFHLElBQUksYUFBRyxDQUFDO2dCQUNaLEVBQUUsRUFBRSxXQUFXO2dCQUNsQixRQUFRLEVBQUUsYUFBYTtnQkFDcEIsb0NBQW9DO2dCQUNwQyxVQUFVLEVBQUU7b0JBQ2QsUUFBUSxvQkFBQTtpQkFDTDthQUNKLENBQUMsQ0FBQztRQUFBLENBQUM7Ozs7Ozs7OztRQ0xILENBQUM7Ozs7Ozs7OztRQ0hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lbW9pemVEZWJvdW5jZShmdW5jLCB3YWl0ID0gMCwgcmVzb2x2ZXIsIG9wdGlvbnMgPSB7fSkge1xyXG5cdHZhciBtZW0gPSBfLm1lbW9pemUoKCkgPT4gXy5kZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSwgcmVzb2x2ZXIpO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSBmdW5jdGlvbihvYmplY3QsIGJhc2UpIHtcblx0ZnVuY3Rpb24gY2hhbmdlcyhvYmplY3QsIGJhc2UpIHtcblx0XHRyZXR1cm4gXy50cmFuc2Zvcm0ob2JqZWN0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG5cdFx0XHRpZiAoIV8uaXNFcXVhbCh2YWx1ZSwgYmFzZVtrZXldKSkge1xuXHRcdFx0XHR2YXIgcmVzID0gKF8uaXNPYmplY3QodmFsdWUpICYmIF8uaXNPYmplY3QoYmFzZVtrZXldKSkgPyBjaGFuZ2VzKHZhbHVlLCBiYXNlW2tleV0pIDogdmFsdWU7XG5cdFx0XHRcdGlmICghXy5pc0VtcHR5KHJlcykpIHtcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHZhciBjaGFuZ2VkID0gY2hhbmdlcyhvYmplY3QsIGJhc2UpO1xuXHRyZXR1cm4gXy5pc0VtcHR5KGNoYW5nZWQpID8gbnVsbCA6IGNoYW5nZWQ7XG59IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XHJcbi8v0J/RgNC4INC60L7QvNC/0LjQu9GP0YbQuNC4IHR5cGVzY3JpcHQg0LLRi9GB0LrQsNC60LjQstCw0LXRgiDQvtGI0LjQsdC60LAgXCLQvdC1INC90LDRhdC+0LTQuNGCINGB0LLQvtC50YHRgtCy0LAgdG9nZ2xlc1JvbGVzXCIg0YLQvtC70YzQutC+INC60L7Qs9C00LAgcHJvcHM6IE9iamVjdFxyXG4vL9Ce0LHRhdC+0LTQvdC+0LUg0YDQtdGI0LXQvdC40LVcclxudmFyIFZ1ZVA6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZVAuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRwb2ludDogT2JqZWN0LFxyXG5cdFx0aW5kZXg6IFtOdW1iZXIsIFN0cmluZ10sXHJcblx0XHRyb2xlczogQXJyYXksXHJcblx0XHRyb2xlV2l0aERldGFpbDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IFtdXHJcblx0XHR9LFxyXG5cdFx0dG9nZ2xlc1JvbGVzOiB7XHJcblx0XHRcdHR5cGU6IEFycmF5LFxyXG5cdFx0XHRkZWZhdWx0OiBbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNlbGVjdGVkUm9sZTogbnVsbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdG9uUm9sZVNlbGVjdENsaWNrKCkge1xyXG5cdFx0XHR0aGlzLmFkZFJvbGUoe1xyXG5cdFx0XHRcdHJvbGU6IHRoaXMuc2VsZWN0ZWRSb2xlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZFJvbGUocm9sZUluZm8pIHtcclxuXHRcdFx0dGhpcy50b2dnbGVzUm9sZXMucHVzaChyb2xlSW5mbyk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlUm9sZUJ5SW5kZXgoaW5kZXgpIHtcclxuXHRcdFx0dGhpcy50b2dnbGVzUm9sZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHR1bmlxKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJfXCIgKyB0aGlzLmluZGV4O1xyXG5cdFx0fSxcclxuXHRcdGV4aXN0c1JvbGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yb2xlcy5maWx0ZXIoeCA9PlxyXG5cdFx0XHRcdF8uZmluZEluZGV4KHRoaXMudG9nZ2xlc1JvbGVzLCAoeTogYW55KSA9PiB5LnJvbGUuTmFtZSA9PSB4Lk5hbWUpIDwgMFxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHN5bmNfdG9nZ2xlc1ZhbHVlczoge1xyXG5cdFx0XHRnZXQoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnRvZ2dsZXNSb2xlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1JvbGVzXCIsIHZhbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1bmlxSWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIF8udW5pcXVlSWQoKSArIFwiX1wiICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwKTtcclxufTsiLCJcclxuZXhwb3J0IGVudW0gUG9pbnRUeXBlIHtcclxuXHRzdGFydCA9IDAsXHJcblx0Y2hhcmFjdGVyaXN0aWMsXHJcblx0YWdncmVnYXRvclxyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBSdWxlQ29udHJvbGwgZnJvbSBcIi4vUnVsZUNvbnRyb2xsXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi8uLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uLy4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuZGVjbGFyZSBjb25zdCBPYmplY3Q6IGFueTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cG9pbnQ6IHtcclxuXHRcdFx0bmFtZTogbnVsbCxcclxuXHRcdFx0RGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0XHRMYWJlbDogbnVsbCxcclxuXHRcdFx0Q2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFJvbGVzOiBudWxsLFxyXG5cdFx0XHRSZXF1aXJlZDogZmFsc2UsXHJcblx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWNcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdGVkQ2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHR1bmlxSWQ6IHVuaXFJZCgpLFxyXG5cdFx0b2Zmc2V0WURlbHRhOiAyNTBcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjYWRkLWRlcGVuZC1wb2ludFwiLFxyXG5cdHByb3BzOiBbXCJzaG93XCIsIFwiaWRcIiwgXCJkZXBlbmRlbmN5XCIsIFwiY2hhcmFjdGVyaXN0aWNzXCIsIFwicm9sZXNcIiwgXCJkZWZhdWx0UG9pbnRcIiwgXCJkZWZhdWx0RGVwZW5kZW5jeVwiLCBcImlzTW9kYWxXaW5kb3dcIl0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0UnVsZUNvbnRyb2xsXHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0ZWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI2FkZC1kZXBlbmQtcG9pbnRfXCIgKyB0aGlzLmlkO1xyXG5cdFx0fSxcclxuXHRcdG1haW5DbGFzc09iamVjdCgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRtb2RhbDogdGhpcy5pc01vZGFsV2luZG93LFxyXG5cdFx0XHRcdGZhZGU6IHRoaXMuaXNNb2RhbFdpbmRvd1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdG1vZGFsTWF4V2lkdGgoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmlzTW9kYWxXaW5kb3cgPyBcIjgwJVwiIDogXCIxMDAlXCI7XHJcblx0XHR9XHJcblx0fSxcclxuXHRkYXRhOiBnZXREZWZhdWx0VmFsdWUsXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdCQodGhpcy5lbElkKVxyXG5cdFx0XHQub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRjbG9zZSgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNsb3NlXCIpO1xyXG5cdFx0XHRPYmplY3QuYXNzaWduKHRoaXMuJGRhdGEsIGdldERlZmF1bHRWYWx1ZSgpKTtcclxuXHRcdH0sXHJcblx0XHRhZGRQb2ludCgpIHtcclxuXHRcdFx0dmFyIGRlcGVuZGVuY3kgPSB0aGlzLmRlcGVuZGVuY3k7XHJcblx0XHRcdHZhciBvZmZzZXQgPSB0aGlzLmdldE9mZnNldEJ5RGVwZW5kZW5jeSh0aGlzLmRlcGVuZGVuY3kpO1xyXG5cclxuXHRcdFx0dmFyIHBvaW50cyA9IFtdO1xyXG5cdFx0XHR2YXIgcG9pbnQgPSBfLm1lcmdlKHRoaXMucG9pbnQsIHtcclxuXHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRvZmZzZXRYOiBvZmZzZXQueCxcclxuXHRcdFx0XHRvZmZzZXRZOiBvZmZzZXQueSArIHRoaXMub2Zmc2V0WURlbHRhXHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgZW5kUG9pbnQ6IGFueSA9IHBvaW50O1xyXG5cclxuXHRcdFx0cG9pbnRzLnB1c2gocG9pbnQpO1xyXG5cdFx0XHRpZiAoZGVwZW5kZW5jeS5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0dmFyIGFkZFBvaW50ID0ge1xyXG5cdFx0XHRcdFx0bmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRMYWJlbDogXCJBbmRcIixcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmFnZ3JlZ2F0b3JcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRvZmZzZXRYOiBvZmZzZXQueCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IG9mZnNldC55ICsgdGhpcy5vZmZzZXRZRGVsdGEgLyAyXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRwb2ludHMucHVzaChhZGRQb2ludCk7XHJcblx0XHRcdFx0ZW5kUG9pbnQgPSBhZGRQb2ludDtcclxuXHRcdFx0XHRkZXBlbmRlbmN5LnB1c2goe1xyXG5cdFx0XHRcdFx0RW5kOiBwb2ludCxcclxuXHRcdFx0XHRcdFN0YXJ0OiBlbmRQb2ludCxcclxuXHRcdFx0XHRcdE5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0UnVsZXM6IFtdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVwZW5kZW5jeS5maWx0ZXIoeCA9PiB4LkVuZCA9PT0gbnVsbCkuZm9yRWFjaCh4ID0+IHguRW5kID0gZW5kUG9pbnQpO1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY29tbWl0LXBvaW50XCIsIHtcclxuXHRcdFx0XHRwb2ludHM6IHBvaW50cyxcclxuXHRcdFx0XHRkZXBlbmRlbmN5OiBkZXBlbmRlbmN5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH0sXHJcblx0XHRjaGFuZ2VQb2ludCgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNvbW1pdC1wb2ludFwiLCB7XHJcblx0XHRcdFx0cG9pbnRzOiBbdGhpcy5wb2ludF0sXHJcblx0XHRcdFx0ZGVwZW5kZW5jeTogdGhpcy5kZXBlbmRlbmN5XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdG9uUnVsZUNoYW5nZSh2YWwpIHtcclxuXHRcdFx0dmFyIGluZGV4ID0gdmFsLmluZGV4O1xyXG5cdFx0XHRWdWUuc2V0KHRoaXMucnVsZXMsIGluZGV4LCB2YWwpO1xyXG5cdFx0fSxcclxuXHRcdG9uU2VsZWN0Q2hhclJ1bGVDaGFuZ2UodmFsKSB7XHJcblx0XHRcdC8vdGhpcy5wb2ludC5WYWx1ZXMgPSB2YWwuVmFsdWVzO1xyXG5cdFx0XHQvL3RoaXMucG9pbnQuUm9sZXMgPSB2YWwuUm9sZXM7XHJcblx0XHR9LFxyXG5cdFx0Z2V0T2Zmc2V0QnlEZXBlbmRlbmN5KGRlcGVuZGVuY2llcykge1xyXG5cdFx0XHR2YXIgZGVwOiBhbnkgPSBfLmZpcnN0KGRlcGVuZGVuY2llcyk7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0eDogZGVwLlN0YXJ0Lm9mZnNldFgsXHJcblx0XHRcdFx0eTogZGVwLlN0YXJ0Lm9mZnNldFlcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRzaG93KHZhbCkge1xyXG5cdFx0XHRpZiAodmFsKSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwic2hvd1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJoaWRlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZGVmYXVsdFBvaW50KGRlZmF1bHRQb2ludCkge1xyXG5cdFx0XHRpZiAoZGVmYXVsdFBvaW50KSB7XHJcblx0XHRcdFx0dGhpcy5wb2ludCA9IGRlZmF1bHRQb2ludDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmRlY2xhcmUgY29uc3QgZWo6IGFueTtcclxuXHJcbi8vZXhwb3J0IGRlZmF1bHQgYWRkRGVwZW5kUG9pbnQ7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbj86IGFueSkge1xyXG5cdHZhciBmdW5jID0gKGZ1bmN0aW9uIChiYXNlOiBhbnkpIHtcclxuXHRcdGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uZXh0ZW5kKEFkZERlcGVuZFBvaW50LCBiYXNlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBBZGREZXBlbmRQb2ludChuYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0YmFzZS5jYWxsKHRoaXMsIG5hbWUpO1xyXG5cdFx0XHR0aGlzLnNpbmdsZUFjdGlvbiA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvbmVkTm9kZXMgPSBbXTtcclxuXHRcdFx0dGhpcy5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHRcdH1cclxuXHRcdEFkZERlcGVuZFBvaW50LnByb3RvdHlwZS5tb3VzZXVwID0gZnVuY3Rpb24gKGV2dDogYW55KSB7XHJcblx0XHRcdGJhc2UucHJvdG90eXBlLm1vdXNldXAuY2FsbCh0aGlzLCBldnQpO1xyXG5cdFx0XHRvcHRpb24uYnVzLiRlbWl0KFwiYWRkLWRlcGVuZC1wb2ludFwiLCB7XHJcblx0XHRcdFx0bm9kZXM6IHRoaXMuZGlhZ3JhbS5zZWxlY3Rpb25MaXN0XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH07XHJcblx0XHRyZXR1cm4gQWRkRGVwZW5kUG9pbnQ7XHJcblx0fShlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlRvb2xCYXNlKSk7XHJcblxyXG5cdHZhciB1c2VySGFuZGxlcyA9IFtdO1xyXG5cdHZhciBhZGREZXBlbmRQb2ludCA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVXNlckhhbmRsZSgpO1xyXG5cdGFkZERlcGVuZFBvaW50Lm5hbWUgPSBcIkFkZFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnRvb2wgPSBuZXcgZnVuYyhhZGREZXBlbmRQb2ludC5uYW1lKTtcclxuXHRhZGREZXBlbmRQb2ludC5wb3NpdGlvbiA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVXNlckhhbmRsZVBvc2l0aW9ucy5Cb3R0b21MZWZ0O1xyXG5cdGFkZERlcGVuZFBvaW50LnZpc2libGUgPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LmVuYWJsZU11bHRpU2VsZWN0aW9uID0gdHJ1ZTtcclxuXHRhZGREZXBlbmRQb2ludC5zaXplID0gMzU7XHJcblx0YWRkRGVwZW5kUG9pbnQuYmFja2dyb3VuZENvbG9yID0gXCIjNEQ0RDREXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aENvbG9yID0gXCJ3aGl0ZVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LmJvcmRlcldpZHRoID0gXCIxXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aERhdGEgPSBcIk0xNC42MTMsMTBjMCwwLjIzLTAuMTg4LDAuNDE5LTAuNDE5LDAuNDE5SDEwLjQydjMuNzc0YzAsMC4yMy0wLjE4OSwwLjQyLTAuNDIsMC40MnMtMC40MTktMC4xODktMC40MTktMC40MnYtMy43NzRINS44MDZjLTAuMjMsMC0wLjQxOS0wLjE4OS0wLjQxOS0wLjQxOXMwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOWgzLjc3NVY1LjgwNmMwLTAuMjMsMC4xODktMC40MTksMC40MTktMC40MTlzMC40MiwwLjE4OSwwLjQyLDAuNDE5djMuNzc1aDMuNzc0QzE0LjQyNSw5LjU4MSwxNC42MTMsOS43NywxNC42MTMsMTAgTTE3Ljk2OSwxMGMwLDQuNDAxLTMuNTY3LDcuOTY5LTcuOTY5LDcuOTY5Yy00LjQwMiwwLTcuOTY5LTMuNTY3LTcuOTY5LTcuOTY5YzAtNC40MDIsMy41NjctNy45NjksNy45NjktNy45NjlDMTQuNDAxLDIuMDMxLDE3Ljk2OSw1LjU5OCwxNy45NjksMTAgTTE3LjEzLDEwYzAtMy45MzItMy4xOTgtNy4xMy03LjEzLTcuMTNTMi44Nyw2LjA2OCwyLjg3LDEwYzAsMy45MzMsMy4xOTgsNy4xMyw3LjEzLDcuMTNTMTcuMTMsMTMuOTMzLDE3LjEzLDEwXCI7XHJcblx0cmV0dXJuIGFkZERlcGVuZFBvaW50O1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmRlY2xhcmUgY29uc3QgZWo6IGFueTtcclxuXHJcbi8vZXhwb3J0IGRlZmF1bHQgQ2hhbmdlUG9pbnQ7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb24/OiBhbnkpIHtcclxuXHR2YXIgZnVuYyA9IChmdW5jdGlvbiAoYmFzZTogYW55KSB7XHJcblx0XHRlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLmV4dGVuZChBZGREZXBlbmRQb2ludCwgYmFzZSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gQWRkRGVwZW5kUG9pbnQobmFtZTogc3RyaW5nKSB7XHJcblx0XHRcdGJhc2UuY2FsbCh0aGlzLCBuYW1lKTtcclxuXHRcdFx0dGhpcy5zaW5nbGVBY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNsb25lZE5vZGVzID0gW107XHJcblx0XHRcdHRoaXMuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcblx0XHR9XHJcblx0XHRBZGREZXBlbmRQb2ludC5wcm90b3R5cGUubW91c2V1cCA9IGZ1bmN0aW9uIChldnQ6IGFueSkge1xyXG5cdFx0XHRiYXNlLnByb3RvdHlwZS5tb3VzZXVwLmNhbGwodGhpcywgZXZ0KTtcclxuXHRcdFx0b3B0aW9uLmJ1cy4kZW1pdChcImNoYW5nZS1wb2ludFwiLCB7XHJcblx0XHRcdFx0bm9kZXM6IHRoaXMuZGlhZ3JhbS5zZWxlY3Rpb25MaXN0XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gQWRkRGVwZW5kUG9pbnQ7XHJcblx0fShlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlRvb2xCYXNlKSk7XHJcblxyXG5cdHZhciB1c2VySGFuZGxlcyA9IFtdO1xyXG5cdHZhciBhZGREZXBlbmRQb2ludCA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVXNlckhhbmRsZSgpO1xyXG5cdGFkZERlcGVuZFBvaW50Lm5hbWUgPSBcIkNoYW5nZVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnRvb2wgPSBuZXcgZnVuYyhhZGREZXBlbmRQb2ludC5uYW1lKTtcclxuXHRhZGREZXBlbmRQb2ludC5wb3NpdGlvbiA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVXNlckhhbmRsZVBvc2l0aW9ucy5Cb3R0b21SaWdodDtcclxuXHRhZGREZXBlbmRQb2ludC52aXNpYmxlID0gdHJ1ZTtcclxuXHRhZGREZXBlbmRQb2ludC5lbmFibGVNdWx0aVNlbGVjdGlvbiA9IGZhbHNlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTEwLDIuMTcyYy00LjMyNCwwLTcuODI4LDMuNTA0LTcuODI4LDcuODI4UzUuNjc2LDE3LjgyOCwxMCwxNy44MjhjNC4zMjQsMCw3LjgyOC0zLjUwNCw3LjgyOC03LjgyOFMxNC4zMjQsMi4xNzIsMTAsMi4xNzJNMTAsMTcuMDA0Yy0zLjg2MywwLTcuMDA0LTMuMTQxLTcuMDA0LTcuMDAzUzYuMTM3LDIuOTk3LDEwLDIuOTk3YzMuODYyLDAsNy4wMDQsMy4xNDEsNy4wMDQsNy4wMDRTMTMuODYyLDE3LjAwNCwxMCwxNy4wMDRNMTAsOC41NTljLTAuNzk1LDAtMS40NDIsMC42NDYtMS40NDIsMS40NDJTOS4yMDUsMTEuNDQzLDEwLDExLjQ0M3MxLjQ0MS0wLjY0NywxLjQ0MS0xLjQ0M1MxMC43OTUsOC41NTksMTAsOC41NTkgTTEwLDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4UzkuNjYsOS4zODIsMTAsOS4zODJTMTAuNjE4LDkuNjYxLDEwLjYxOCwxMFMxMC4zNCwxMC42MTksMTAsMTAuNjE5IE0xNC4xMiw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MnMwLjY0NywxLjQ0MywxLjQ0MiwxLjQ0M3MxLjQ0Mi0wLjY0NywxLjQ0Mi0xLjQ0M1MxNC45MTUsOC41NTksMTQuMTIsOC41NTkgTTE0LjEyLDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4czAuMjc4LTAuNjE4LDAuNjE4LTAuNjE4UzE0LjczOCw5LjY2MSwxNC43MzgsMTBTMTQuNDYsMTAuNjE5LDE0LjEyLDEwLjYxOSBNNS44OCw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MnMwLjY0NiwxLjQ0MywxLjQ0MiwxLjQ0M1M3LjMyMiwxMC43OTYsNy4zMjIsMTBTNi42NzUsOC41NTksNS44OCw4LjU1OSBNNS44OCwxMC42MTljLTAuMzQsMC0wLjYxOC0wLjI3OC0wLjYxOC0wLjYxOFM1LjU0LDkuMzgyLDUuODgsOS4zODJTNi40OTgsOS42NjEsNi40OTgsMTBTNi4yMiwxMC42MTksNS44OCwxMC42MTlcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljVmFsdWUge1xyXG5cdElkOiBzdHJpbmc7XHJcblx0TmFtZTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSb2xlXHJcbntcclxuXHRJZDogc3RyaW5nO1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRSZXF1aXJlZD86IGJvb2xlYW47XHJcblx0RGVmYXVsdFZhbHVlPzogQ2hhcmFjdGVyaXN0aWNWYWx1ZTtcclxufSIsImltcG9ydCB7IElSb2xlIH0gZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGVwZW5kZW5jeSB7XHJcblx0U3RhcnQ6IEJhc2VQb2ludCxcclxuXHROYW1lOiBzdHJpbmc7IFxyXG5cdExhYmVsPzogc3RyaW5nO1xyXG5cdEVuZDogQmFzZVBvaW50O1xyXG5cdFJvbGVzPzogQXJyYXk8SVJvbGU+O1xyXG59IiwiaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4vUG9pbnRUeXBlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VQb2ludCB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdG9mZnNldFg6IGFueTtcclxuXHRvZmZzZXRZOiBhbnk7XHJcblx0T3B0aW9uczoge1xyXG5cdFx0dHlwZTogUG9pbnRUeXBlO1xyXG5cdH0sXHJcblx0TGFiZWw6IHN0cmluZztcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNncmFwaC10ZXN0XCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFZhbHVlczogW10sXHJcblx0XHRcdGR5bmFtaWM6IHtcclxuXHRcdFx0XHRQb2ludHM6IFtdXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0YWN0aXZlUG9pbnRzKCkge1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRcdGlmICh0aGlzLnBvaW50cykge1xyXG5cdFx0XHRcdHZhciBzdGFydFBvaW50ID0gXy5maW5kKHRoaXMucG9pbnRzLCBwID0+IHAuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQpO1xyXG5cdFx0XHRcdHJlc3VsdCA9IHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVucyhzdGFydFBvaW50KS5maWx0ZXIoeCA9PiB4Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbWl0KFwiYWN0aXZlXCIsIHJlc3VsdCk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9LFxyXG5cdFx0cG9pbnRzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Ob2RlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGlzRnJvbVN0YXJ0KG5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KHRoaXMuZ3JhcGguQ29ubmVjdG9ycywgKHg6IGFueSkgPT4geC5TdGFydC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCAmJiB4LkVuZC5uYW1lID09PSBub2RlLm5hbWUpID49IDA7XHJcblx0XHR9LFxyXG5cdFx0Z2V0UG9pbnRJbkRlcGVuZGVuY2llcyhwb2ludCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguRW5kLm5hbWUgPT09IHBvaW50Lm5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdGdldFN0YXJ0UG9pbnRCeURlcChkZXApIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZCh0aGlzLnBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGRlcC5TdGFydC5uYW1lKTtcclxuXHRcdH0sXHJcblx0XHRyZUFjdGl2ZUNoaWxkcmVucyhwb2ludCkge1xyXG5cdFx0XHR2YXIgY2hpbGRyZW5zID0gdGhpcy5nZXRDaGlsZHJlbihwb2ludCk7XHJcblx0XHRcdGNoaWxkcmVucy5mb3JFYWNoKGNoaWxkID0+IHtcclxuXHRcdFx0XHRpZiAoIWNoaWxkKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBkZXBzID0gdGhpcy5nZXRQb2ludEluRGVwZW5kZW5jaWVzKGNoaWxkKTtcclxuXHRcdFx0XHRjaGlsZC5BY3RpdmUgPSBfLmZpbmRJbmRleChkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpID49IDA7XHJcblx0XHRcdFx0aWYgKCFjaGlsZC5BY3RpdmUpIHtcclxuXHRcdFx0XHRcdHRoaXMucmVBY3RpdmVDaGlsZHJlbnMoY2hpbGQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0Q2hpbGRyZW4obm9kZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguU3RhcnQubmFtZSA9PT0gbm9kZS5uYW1lKS5tYXAoeCA9PiB0aGlzLmdldFBvaW50QnlOYW1lKHguRW5kLm5hbWUpKTtcclxuXHRcdH0sXHJcblx0XHRpc0RlcGVuZGVuY3lQYXNzKGRlcCkge1xyXG5cdFx0XHR2YXIgc3RhcnQgPSBkZXAuU3RhcnQ7XHJcblx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbc3RhcnQubmFtZV07XHJcblx0XHRcdGlmIChkZXAuUnVsZXMpIHtcclxuXHRcdFx0XHRpZiAoc3RhcnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWMpIHtcclxuXHRcdFx0XHRcdGlmIChfLmlzQXJyYXkoZGVwLlJ1bGVzLlZhbHVlcykgJiYgZGVwLlJ1bGVzLlZhbHVlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KGRlcC5SdWxlcy5WYWx1ZXMsICh4OiBhbnkpID0+IHguSWQgPT09IHZhbHVlLklkKSA+PSAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cdFx0Z2V0UG9pbnRCeU5hbWUobmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kKHRoaXMucG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gbmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0VmlzaWJsZUNoaWxkcmVuczogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRcdHZhciBjaGlsZHJlbnMgPSB0aGlzLmdldENoaWxkcmVuKHBvaW50KTtcclxuXHRcdFx0dmFyIGFjdGl2ZXMgPSBjaGlsZHJlbnMuZmlsdGVyKHggPT4ge1xyXG5cdFx0XHRcdGlmICgheCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgZGVwcyA9IHRoaXMuZ2V0UG9pbnRJbkRlcGVuZGVuY2llcyh4KTtcclxuXHRcdFx0XHRzd2l0Y2ggKHguT3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKSA+PSAwO1xyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuYWdncmVnYXRvcjoge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5ldmVyeShkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBhY3RpdmVDaGlsZHJlbnMgPSBbXTtcclxuXHRcdFx0YWN0aXZlcy5mb3JFYWNoKHggPT4gYWN0aXZlQ2hpbGRyZW5zID0gXy5jb25jYXQoYWN0aXZlQ2hpbGRyZW5zLCB0aGlzLmdldFZpc2libGVDaGlsZHJlbnMoeCkpKTtcclxuXHRcdFx0cmV0dXJuIF8udW5pb24oYWN0aXZlcywgYWN0aXZlQ2hpbGRyZW5zKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRncmFwaCgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImdyYXBoLWNoYW5nZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBcInN5bmNmdXNpb25cIjtcclxuaW1wb3J0IG1lbW9pemVEZWJvdW5jZSwgeyBkaWZmZXJlbmNlIH0gZnJvbSBcIi4uL21peGlucy9tX2xvZGFzaFwiO1xyXG5pbXBvcnQgYWRkRGVwZW5kTW9kYWxXaW5kb3cgZnJvbSBcIi4vRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvd1wiO1xyXG5pbXBvcnQgY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50XCI7XHJcbmltcG9ydCBjcmVhdGVDaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vSGFuZGxlci9DaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHRlc3RDb250cm9sbCBmcm9tIFwiLi9EaWFncmFtL1Rlc3QvR3JhcGhUZXN0Q29udHJvbGxcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG52YXIgY29uc3RyYWludHMgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5EZWZhdWx0IHwgZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRmxvYXRFbGVtZW50cztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNjaGFyYWN0ZXJpc3RpYy1kaWFncmFtXCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCIsIFwiY2xhc3Nlc1wiLCBcImhlaWdodFwiLCBcImNoYXJhY3RlcmlzdGljc1wiLCBcInJvbGVzXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRidXM6IG5ldyBWdWUoKSxcclxuXHRcdFx0c2hvd0RlcGVuZE1vZGFsOiBmYWxzZSxcclxuXHRcdFx0b2Zmc2V0WU1hcmdpbjogMjUwLFxyXG5cdFx0XHRhZGRNb2RlOiBmYWxzZSxcclxuXHRcdFx0ZGlhZ3JhbUluaXQ6IGZhbHNlLFxyXG5cdFx0XHRzZWxlY3RlZE5vZGVzOiBbXSxcclxuXHRcdFx0aXNNb2RhbFdpbmRvdzogdHJ1ZSxcclxuXHRcdFx0SXNPdmVydmlld0FjdGl2ZTogdHJ1ZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRoZWlnaHRQeCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1JZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTmFtZTtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtRWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI1wiICsgdGhpcy5kaWFncmFtSWQ7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbU92ZXJ2aWV3RWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlhZ3JhbUVsSWQgKyBcIl9vdmVydmlld1wiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW0oKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1Jbml0ID8gJCh0aGlzLmRpYWdyYW1FbElkKS5lakRpYWdyYW0oXCJpbnN0YW5jZVwiKSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE5vZGVzICYmIHRoaXMuc2VsZWN0ZWROb2Rlcy5sZW5ndGggPiAwID8gdGhpcy5zZWxlY3RlZE5vZGVzWzBdIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGVWYWx1ZXMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmZpcnN0U2VsZWN0Tm9kZSA/IHRoaXMuZmlyc3RTZWxlY3ROb2RlLlZhbHVlcyA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlRGVwZW5kZW5jeSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGggJiYgdGhpcy5maXJzdFNlbGVjdE5vZGUgPyB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5FbmQubmFtZSA9PT0gdGhpcy5maXJzdFNlbGVjdE5vZGUubmFtZSkgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGRlcGVuZFNlbGVjdGVkTm9kZXMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdGVkTm9kZXMgPyB0aGlzLnNlbGVjdGVkTm9kZXMubWFwKHggPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHROYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdFN0YXJ0OiB4LFxyXG5cdFx0XHRcdFx0RW5kOiBudWxsLFxyXG5cdFx0XHRcdFx0UnVsZXM6IHtcclxuXHRcdFx0XHRcdFx0VmFsdWVzOiBbXSxcclxuXHRcdFx0XHRcdFx0Um9sZXM6IFtdXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSkgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGNvbm5lY3RvcnMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4gdGhpcy51cGRhdGVDb25uZWN0b3JMYWJlbCh4KSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnM7XHJcblx0XHR9LFxyXG5cdFx0bm9kZXMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguTm9kZXMuZm9yRWFjaCh4ID0+IHRoaXMudXBkYXRlTm9kZUxhYmVsKHgpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRzZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0ZWRJdGVtcykge1xyXG5cdFx0XHRpZiAoIXNlbGVjdGVkSXRlbXMgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoeCA9PiB4Ll90eXBlID09PSBcIm5vZGVcIik7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IF8ubWFwKHNlbGVjdGVkTm9kZXMsICh4OiBhbnkpID0+IF8uZmluZCh0aGlzLmdyYXBoLk5vZGVzLCB5ID0+IHkubmFtZSA9PT0geC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnRBbmREZXBlbmRlbmN5KG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IG9wdGlvbnMucG9pbnRzO1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG9wdGlvbnMuZGVwZW5kZW5jeTtcclxuXHJcblx0XHRcdHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHRoaXMuY29tbWl0UG9pbnQocG9pbnQpKTtcclxuXHRcdFx0ZGVwZW5kZW5jeS5mb3JFYWNoKGRlcCA9PiB0aGlzLmNvbW1pdENvbm5lY3Rpb24oZGVwKSk7XHJcblxyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdENvbm5lY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRkZXA6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnQob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRwb2ludDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHRoaXMuYWRkTW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb24/OiBhbnkpIHtcclxuXHRcdFx0dGhpcy5hZGRNb2RlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVOb2RlUHJvcDogbWVtb2l6ZURlYm91bmNlKGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHRcdHZhciBub2RlID0gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIG5vZGUgPT4gbm9kZS5uYW1lID09PSBhcmdzLmVsZW1lbnQubmFtZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcIm5vZGUtcHJvcC1jaGFuZ2VcIiwge1xyXG5cdFx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdG5hbWU6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdHByb3BOYW1lOiBhcmdzLnByb3BlcnR5TmFtZSxcclxuXHRcdFx0XHRcdG5ld1ZhbHVlOiBhcmdzLmVsZW1lbnRbYXJncy5wcm9wZXJ0eU5hbWVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDUwMCwgeCA9PiB4LnByb3BlcnR5TmFtZSksXHJcblx0XHR1cGRhdGVOb2RlTGFiZWwobm9kZSkge1xyXG5cdFx0XHRpZiAobm9kZS5PcHRpb25zKSB7XHJcblx0XHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHRfLmFzc2lnbihub2RlLCBwcm9wZXJ0eSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFub2RlLmxhYmVscyB8fCBub2RlLmxhYmVscy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdG5vZGUubGFiZWxzID0gW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwibGFiZWwxXCIsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQsXHJcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWdubWVudDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20sXHJcblx0XHRcdFx0XHRvZmZzZXQ6IHtcclxuXHRcdFx0XHRcdFx0eTogMS4yLFxyXG5cdFx0XHRcdFx0XHR4OiAwLjhcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRib3VuZGFyeUNvbnN0cmFpbnRzOiBmYWxzZVxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHRcdG5vZGUubGFiZWxzWzBdLnRleHQgPSBub2RlLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZUNvbm5lY3RvckxhYmVsKGNvbm5lY3Rvcikge1xyXG5cdFx0XHRpZiAoIWNvbm5lY3Rvci5sYWJlbHMgfHwgY29ubmVjdG9yLmxhYmVscy5sZW5naHQgPD0gMCkge1xyXG5cdFx0XHRcdGNvbm5lY3Rvci5sYWJlbHMgPSBbe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJsYWJlbDJcIixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRmb250Q29sb3I6IFwiYmxhY2tcIixcclxuXHRcdFx0XHRcdGFsaWdubWVudDogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdGJvdW5kYXJ5Q29uc3RyYWludHM6IGZhbHNlLFxyXG5cdFx0XHRcdFx0b2Zmc2V0OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlBvaW50KDAsIDApXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdFx0Y29ubmVjdG9yLmxhYmVsc1swXS50ZXh0ID0gY29ubmVjdG9yLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdGdvVGVzdCgpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Z29PdmVydmlldygpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR0ZXN0QWN0aXZlTm9kZShhY3RpdmVzKSB7XHJcblx0XHRcdGlmICghXy5pc0FycmF5KGFjdGl2ZXMpIHx8ICF0aGlzLmRpYWdyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5ncmFwaC5Ob2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRcdHZhciBhY3RpdmUgPSBub2RlLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0IHx8IF8uZmluZEluZGV4KGFjdGl2ZXMsIHggPT4geC5uYW1lID09PSBub2RlLm5hbWUpID49IDA7XHJcblx0XHRcdFx0dmFyIHByb3BlcnRpZXMgPSAhdGhpcy5Jc092ZXJ2aWV3QWN0aXZlICYmIGFjdGl2ZSA/IHtcclxuXHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjYTZmNTY4XCJcclxuXHRcdFx0XHR9IDogdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHR0aGlzLmRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIHByb3BlcnRpZXMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Z2V0Tm9kZVByb3BlcnRpZXMobm9kZSkge1xyXG5cdFx0XHRzd2l0Y2ggKG5vZGUuT3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuc3RhcnQ6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiIzI5YzE1ZlwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjMjA4NWM5XCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcInJlY3RhbmdsZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuYWdncmVnYXRvcjpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjZWM3ZTBkXCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcImVsbGlwc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0dmFyICR0aGlzID0gdGhpcztcclxuXHRcdHRoaXMuYnVzLiRvbihcImFkZC1kZXBlbmQtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdHRoaXMuYnVzLiRvbihcImNoYW5nZS1wb2ludFwiLCAob3B0aW9ucz86IGFueSkgPT4gdGhpcy5vcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb25zKSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbSh7XHJcblx0XHRcdGVuYWJsZUNvbnRleHRNZW51OiBmYWxzZSxcclxuXHRcdFx0Y29uc3RyYWludHMsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4LFxyXG5cdFx0XHRub2RlczogdGhpcy5ub2RlcyxcclxuXHRcdFx0Y29ubmVjdG9yczogdGhpcy5jb25uZWN0b3JzLFxyXG5cdFx0XHRkZWZhdWx0U2V0dGluZ3M6IHtcclxuXHRcdFx0XHRub2RlOiB7XHJcblx0XHRcdFx0XHR3aWR0aDogNjUsXHJcblx0XHRcdFx0XHRoZWlnaHQ6IDY1LFxyXG5cdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IDBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbm5lY3Rvcjoge1xyXG5cdFx0XHRcdFx0c2VnbWVudHM6IFt7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIm9ydGhvZ29uYWxcIlxyXG5cdFx0XHRcdFx0fV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNjcm9sbFNldHRpbmdzOiB7XHJcblx0XHRcdFx0aG9yaXpvbnRhbE9mZnNldDogMCxcclxuXHRcdFx0XHR2ZXJ0aWNhbE9mZnNldDogMCxcclxuXHRcdFx0XHR6b29tRmFjdG9yOiAwLjJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW5hYmxlQXV0b1Njcm9sbDogdHJ1ZSxcclxuXHRcdFx0cGFnZVNldHRpbmdzOiB7XHJcblx0XHRcdFx0c2Nyb2xsTGltaXQ6IFwiaW5maW5pdHlcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RlZEl0ZW1zOiB7XHJcblx0XHRcdFx0dXNlckhhbmRsZXM6IFtjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIoe1xyXG5cdFx0XHRcdFx0YnVzOiB0aGlzLmJ1c1xyXG5cdFx0XHRcdH0pLCBjcmVhdGVDaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KV1cclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvcGVydHlDaGFuZ2UoYXJncykge1xyXG5cdFx0XHRcdGlmIChhcmdzLmVsZW1lbnRUeXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdFx0aWYgKF8uaW5jbHVkZXMoW1wib2Zmc2V0WFwiLCBcIm9mZnNldFlcIl0sIGFyZ3MucHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHQkdGhpcy51cGRhdGVOb2RlUHJvcChhcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGlvbkNoYW5nZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdFx0XHQkdGhpcy5zZWxlY3Rpb25DaGFuZ2Uob3B0aW9ucy5zZWxlY3RlZEl0ZW1zKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbU92ZXJ2aWV3RWxJZCkuZWpPdmVydmlldyh7XHJcblx0XHRcdHNvdXJjZUlEOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHhcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5kaWFncmFtSW5pdCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRhZGREZXBlbmRNb2RhbFdpbmRvdyxcclxuXHRcdHRlc3RDb250cm9sbFxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKHZhbCkge1xyXG5cdFx0XHR2YXIgZGlhZ3JhbSA9IHRoaXMuZGlhZ3JhbTtcclxuXHRcdFx0dmFyIG5vZGVzID0gZGlhZ3JhbS5ub2RlcygpO1xyXG5cdFx0XHR2YXIgY29ubmVjdG9ycyA9IGRpYWdyYW0uY29ubmVjdG9ycygpO1xyXG5cdFx0XHR2YWwuTm9kZXMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZU5vZGVMYWJlbCh4KTtcclxuXHRcdFx0XHR2YXIgbm9kZSA9IF8uZmluZChub2RlcywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lm5hbWUpO1xyXG5cdFx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZk5vZGUgPSBkaWZmZXJlbmNlKHgsIG5vZGUpO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZOb2RlKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIGRpZmZOb2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBub2RlLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRpZiAoZGlmZkxhYmVsKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwobm9kZS5uYW1lLCBub2RlLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YWwuQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlQ29ubmVjdG9yTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIGNvbm4gPSBfLmZpbmQoY29ubmVjdG9ycywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lk5hbWUpO1xyXG5cdFx0XHRcdGlmIChjb25uKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZkNvbm4gPSBkaWZmZXJlbmNlKHgsIGNvbm4pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZDb25uKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlQ29ubmVjdG9yKGNvbm4ubmFtZSwgZGlmZkNvbm4pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGNvbm4ubGFiZWxzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyIGRpZmZMYWJlbCA9IGRpZmZlcmVuY2UoeC5sYWJlbHNbMF0sIGNvbm4ubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwoY29ubi5uYW1lLCBjb25uLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS5hZGRMYWJlbChjb25uLm5hbWUsIHgubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IHsgQWN0aW9uQ29udGV4dCwgU3RvcmUgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBnZXRTdG9yZUFjY2Vzc29ycyB9IGZyb20gXCJ2dWV4LXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyYXBoIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0UG9pbnRzOiBBcnJheTxCYXNlUG9pbnQ+O1xyXG5cdERlcGVuZGVuY2llczogQXJyYXk8RGVwZW5kZW5jeT47XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpYyB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcbn0iLCJpbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuL0dyYXBoXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdGF0ZSB7XHJcblx0R3JhcGhzOiBBcnJheTxHcmFwaD47XHJcblx0Q2hhcmFjdGVyaXN0aWNzOiBBcnJheTxDaGFyYWN0ZXJpc3RpYz47XHJcblx0Um9sZXM6IEFycmF5PElSb2xlPjtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XHJcblx0bmFtZTogc3RyaW5nXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIENvbm5lY3RvciB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHNvdXJjZU5vZGU6IHN0cmluZztcclxuXHR0YXJnZXROb2RlOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9Db25uZWN0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ZHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nLFxyXG5cdE5vZGVzOiBBcnJheTxOb2RlPjtcclxuXHRDb25uZWN0b3JzOiBBcnJheTxDb25uZWN0b3I+O1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlLCBHZXR0ZXJUcmVlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL0dyYXBoXCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBTZkdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Db25uZWN0b3JcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG50eXBlIEdyYXBoQ29udGV4dCA9IEFjdGlvbkNvbnRleHQ8Um9vdFN0YXRlLCBSb290U3RhdGU+O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdyYXBoTW9kdWxlID0ge1xyXG5cdG5hbWVzcGFjZWQ6IHRydWUsXHJcblxyXG5cdHN0YXRlOiB7XHJcblx0XHRHcmFwaHM6IFt7XHJcblx0XHRcdE5hbWU6IFwiR3JhcGgxXCIsXHJcblx0XHRcdFBvaW50czogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TGFiZWw6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDYwLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF0sXHJcblx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdH1dLFxyXG5cdFx0Q2hhcmFjdGVyaXN0aWNzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMVwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAyXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgM1wiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAzXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgM1wiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDRcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA1XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDdcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA4XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOVwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0XSxcclxuXHRcdFJvbGVzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDFcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAyXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgM1wiXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9LFxyXG5cdGdldHRlcnM6IHtcclxuXHRcdGdldEdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocztcclxuXHRcdH0sXHJcblx0XHRncmFwaENvdW50KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocy5sZW5ndGg7XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChuYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHR2YXIgZ3JhcGggPSBfLmZpcnN0KHN0YXRlLkdyYXBocy5maWx0ZXIoeCA9PiB4Lk5hbWUgPT09IG5hbWUpKTtcclxuXHRcdFx0XHRyZXR1cm4gZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZSkoZ3JhcGgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChncmFwaDogR3JhcGgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0TmFtZTogZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdE5vZGVzOiBncmFwaC5Qb2ludHMsXHJcblx0XHRcdFx0XHRDb25uZWN0b3JzOiBfLm1hcChncmFwaC5EZXBlbmRlbmNpZXMsIGZ1bmN0aW9uIChjb24pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8ubWVyZ2Uoe1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGNvbi5OYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHNvdXJjZU5vZGU6IGNvbi5TdGFydC5uYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHRhcmdldE5vZGU6IGNvbi5FbmQubmFtZVxyXG5cdFx0XHRcdFx0XHR9LCBjb24pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGdldENoYXJhY3RlcmlzdGljc0xpc3Qoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuQ2hhcmFjdGVyaXN0aWNzO1xyXG5cdFx0fSxcclxuXHRcdGdldFJvbGVzKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLlJvbGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bXV0YXRpb25zOiB7XHJcblx0XHRhZGRHcmFwaChzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiBHcmFwaCkge1xyXG5cdFx0XHRzdGF0ZS5HcmFwaHMucHVzaChpdGVtKTtcclxuXHRcdH0sXHJcblx0XHRhZGRQb2ludChzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaCk7XHJcblx0XHRcdHZhciBkdXBsaWNhdGVQb2ludEluZGV4ID0gXy5maW5kSW5kZXgoZ3JhcGguUG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gaXRlbS5wb2ludC5uYW1lKTtcclxuXHJcblx0XHRcdGlmIChkdXBsaWNhdGVQb2ludEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5wdXNoKGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkdXBsaWNhdGVQb2ludCA9IGdyYXBoLlBvaW50c1tkdXBsaWNhdGVQb2ludEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVQb2ludCwgaXRlbS5wb2ludCk7XHJcblx0XHRcdFx0Z3JhcGguUG9pbnRzLnNwbGljZShkdXBsaWNhdGVQb2ludEluZGV4LCAxLCBkdXBsaWNhdGVQb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRhZGREZXBlbmRlbmN5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Ly9UT0RPOiDQn9GA0LjQvNC10L3QuNGC0Ywg0LjQt9C80LXQvdC40LUg0Log0LTQuNCw0LPRgNCw0LzQtVxyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaCk7XHJcblx0XHRcdHZhciBkdXBsaWNhdGVEZXBJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLkRlcGVuZGVuY2llcywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZGVwLk5hbWUpO1xyXG5cdFx0XHRpZiAoZHVwbGljYXRlRGVwSW5kZXggPCAwKSB7XHJcblx0XHRcdFx0Z3JhcGguRGVwZW5kZW5jaWVzLnB1c2goaXRlbS5kZXApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkdXBsaWNhdGVEZXAgPSBncmFwaC5EZXBlbmRlbmNpZXNbZHVwbGljYXRlRGVwSW5kZXhdO1xyXG5cdFx0XHRcdF8uYXNzaWduKGR1cGxpY2F0ZURlcCwgaXRlbS5kZXApO1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5zcGxpY2UoZHVwbGljYXRlRGVwSW5kZXgsIDEsIGR1cGxpY2F0ZURlcCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjaGFuZ2VOb2RlUHJvcGVydHkoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHR2YXIgcG9pbnRzID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpLlBvaW50cztcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5maW5kKHBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ubmFtZSk7XHJcblx0XHRcdFZ1ZS5zZXQocG9pbnQsIGl0ZW0ucHJvcE5hbWUsIGl0ZW0ubmV3VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHsgcmVhZCwgY29tbWl0IH0gPVxyXG5cdGdldFN0b3JlQWNjZXNzb3JzPFJvb3RTdGF0ZSwgUm9vdFN0YXRlPihcImdyYXBoXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRHcmFwaCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGhDb3VudCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5ncmFwaENvdW50KTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZSA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUpO1xyXG5leHBvcnQgY29uc3QgZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KTtcclxuZXhwb3J0IGNvbnN0IGdldFJvbGVzID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFJvbGVzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRHcmFwaCA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkR3JhcGgpO1xyXG5leHBvcnQgY29uc3QgYWRkUG9pbnQgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZFBvaW50KTtcclxuZXhwb3J0IGNvbnN0IGFkZERlcGVuZGVuY3kgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZERlcGVuZGVuY3kpO1xyXG5leHBvcnQgY29uc3QgY2hhbmdlTm9kZVByb3BlcnR5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5jaGFuZ2VOb2RlUHJvcGVydHkpOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCB7IGdyYXBoTW9kdWxlIGFzIGdyYXBoIH0gZnJvbSBcIi4vR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgVnVleFBlcnNpc3RlbmNlIGZyb20gXCJ2dWV4LXBlcnNpc3RcIjtcclxuXHJcblZ1ZS51c2UoVnVleCk7XHJcblxyXG5jb25zdCB2dWV4TG9jYWwgPSBuZXcgVnVleFBlcnNpc3RlbmNlKHtcclxuXHRzdG9yYWdlOiB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIG5ldyBWdWV4LlN0b3JlPFJvb3RTdGF0ZT4oe1xyXG5cdFx0bW9kdWxlczoge1xyXG5cdFx0XHRncmFwaFxyXG5cdFx0fSxcclxuXHRcdHBsdWdpbnM6IFt2dWV4TG9jYWwucGx1Z2luXSxcclxuXHRcdHN0cmljdDogdHJ1ZVxyXG5cdH0pXHJcbn07IiwiLy8gQ2xpZW50QXBwL2NvbXBvbmVudHMvQXBwSGVsbG8udHNcclxuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IENoYXJhY3RlcmlzdGljRGlhZ3JhbSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY0RpYWdyYW1cIjtcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tIFwiLi4vU3RvcmUvUm9vdFN0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGdyYXBoIGZyb20gXCIuLi9TdG9yZS9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxuXHJcbnZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKCk7XHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiAnI2FwcC1oZWxsby10ZW1wbGF0ZScsXHJcblx0c3RvcmUsXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1lc3NhZ2U6IFwidGVzdCBtZXNzYWdlXCJcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dGVzdCgpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSlbMF0uUG9pbnRzLm1hcCh4ID0+IHguTGFiZWwpO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1zKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGgucmVhZEdyYXBoKHRoaXMuJHN0b3JlKS5tYXAoeCA9PiBncmFwaC5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaCh0aGlzLiRzdG9yZSkoeCkpO1xyXG5cdFx0fSxcclxuXHRcdGNoYXJhY3RlcmlzdGljcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLmdldENoYXJhY3RlcmlzdGljc0xpc3QodGhpcy4kc3RvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHJvbGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGguZ2V0Um9sZXModGhpcy4kc3RvcmUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0YWRkR3JhcGg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Z3JhcGguYWRkR3JhcGgodGhpcy4kc3RvcmUsIHtcclxuXHRcdFx0XHROYW1lOiBcIkdyYXBoXCIgKyAoZ3JhcGgucmVhZEdyYXBoQ291bnQodGhpcy4kc3RvcmUpICsgMSksXHJcblx0XHRcdFx0UG9pbnRzOiBbe1xyXG5cdFx0XHRcdFx0bmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiAyMCxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkTm9kZTogZnVuY3Rpb24gKG5vZGU6IHsgZ3JhcGg6IHN0cmluZywgcG9pbnQ6IEJhc2VQb2ludCB9KSB7XHJcblx0XHRcdGdyYXBoLmFkZFBvaW50KHRoaXMuJHN0b3JlLCBub2RlKTtcclxuXHRcdH0sXHJcblx0XHRhZGRDb25uZWN0aW9uOiBmdW5jdGlvbiAoY29ubmVjdDogeyBncmFwaDogc3RyaW5nLCBkZXA6IERlcGVuZGVuY3kgfSkge1xyXG5cdFx0XHRncmFwaC5hZGREZXBlbmRlbmN5KHRoaXMuJHN0b3JlLCBjb25uZWN0KTtcclxuXHRcdH0sXHJcblx0XHRvbk5vZGVQcm9wQ2hhbmdlOiBmdW5jdGlvbiAob3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHRncmFwaC5jaGFuZ2VOb2RlUHJvcGVydHkodGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRDaGFyYWN0ZXJpc3RpY0RpYWdyYW1cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IEFwcEhlbGxvIGZyb20gXCIuL2NvbXBvbmVudHMvQXBwSGVsbG9cIjtcclxuaW1wb3J0IGxvZGFzaE1peGluIGZyb20gXCIuL21peGlucy9tX2xvZGFzaFwiO1xyXG5cclxuLy9Sb290IENvbXBvbmVudFxyXG5sZXQgdiA9IG5ldyBWdWUoe1xyXG4gICAgZWw6IFwiI2FwcC1yb290XCIsXHJcblx0dGVtcGxhdGU6ICc8QXBwSGVsbG8vPicsXHJcbiAgICAvL3JlbmRlcjogaCA9PiBoKEFwcEhlbGxvQ29tcG9uZW50KSxcclxuICAgIGNvbXBvbmVudHM6IHtcclxuXHRcdEFwcEhlbGxvXHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpYyB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljUG9pbnQgZXh0ZW5kcyBCYXNlUG9pbnQge1xyXG5cdENoYXJhY3RlcmlzdGljOiBDaGFyYWN0ZXJpc3RpYztcclxuXHRWYWx1ZXM6IEFycmF5PENoYXJhY3RlcmlzdGljVmFsdWU+O1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU/OiBDaGFyYWN0ZXJpc3RpY1ZhbHVlO1xyXG59IiwiaW1wb3J0IHtEZXBlbmRlbmN5fSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7SVJvbGV9IGZyb20gXCIuL1JvbGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3lSb2xlIHtcclxuXHREZXBlbmRlbmN5OiBEZXBlbmRlbmN5O1xyXG5cdFJvbGU6IElSb2xlO1xyXG59Il19