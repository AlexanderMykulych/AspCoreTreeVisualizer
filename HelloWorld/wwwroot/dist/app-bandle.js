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
            offsetYDelta: 250,
            addExistCharacteristic: false,
            existPoint: null
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
                props: ["show", "id", "dependency", "characteristics", "roles", "defaultPoint", "defaultDependency", "isModalWindow", "points"],
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
                        return this.addExistCharacteristic ? this.existPoint : lodash_4.default.merge(this.point, { name: IdGenerator_1.uniqId() });
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
    var vue_5, vuex_typescript_1, lodash_7, PointType_4, IdGenerator_3, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty, removeConnection, removeNode;
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
                        vue_5.default.set(point, item.propName, item.newValue);
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
            exports_20("removeNode", removeNode = commit(graphModule.mutations.removeNode));
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
                    },
                    removeNode: function (options) {
                        graph.removeNode(this.$store, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb2xlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0RlcGVuZGVuY3kudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQmFzZVBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1Jvb3RTdGF0ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaC50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9HcmFwaFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL1Jvb3RTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2luZGV4LnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvSURlcGVuZGVuY3lSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLHlCQUF3QyxJQUFJLEVBQUUsSUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFZO1FBQWhDLHFCQUFBLEVBQUEsUUFBUTtRQUFZLHdCQUFBLEVBQUEsWUFBWTtRQUM3RSxJQUFJLEdBQUcsR0FBRyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUM7WUFDTixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtJQUNGLENBQUM7Ozs7Ozs7Ozs7WUFFRCx3QkFBYSxVQUFVLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSTtnQkFDOUMsaUJBQWlCLE1BQU0sRUFBRSxJQUFJO29CQUM1QixNQUFNLENBQUMsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO3dCQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMs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LE9BQU8sQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUNELGdCQUFnQixZQUFDLE9BQXlFO3dCQUN6RixLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFDRCxnQkFBZ0IsWUFBQyxPQUErQzt3QkFDL0QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzlDLENBQUM7b0JBQ0QsVUFBVSxZQUFDLE9BQTRDO3dCQUN0RCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3hDLENBQUM7aUJBQ0Q7Z0JBQ0UsVUFBVSxFQUFFO29CQUNkLHFCQUFxQixpQ0FBQTtpQkFDbEI7YUFDSixDQUFDO1FBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNqRUosZ0JBQWdCO1lBQ1osQ0FBQyxHQUFHLElBQUksYUFBRyxDQUFDO2dCQUNaLEVBQUUsRUFBRSxXQUFXO2dCQUNsQixRQUFRLEVBQUUsYUFBYTtnQkFDcEIsb0NBQW9DO2dCQUNwQyxVQUFVLEVBQUU7b0JBQ2QsUUFBUSxvQkFBQTtpQkFDTDthQUNKLENBQUMsQ0FBQztRQUFBLENBQUM7Ozs7Ozs7OztRQ0xILENBQUM7Ozs7Ozs7OztRQ0hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lbW9pemVEZWJvdW5jZShmdW5jLCB3YWl0ID0gMCwgcmVzb2x2ZXIsIG9wdGlvbnMgPSB7fSkge1xyXG5cdHZhciBtZW0gPSBfLm1lbW9pemUoKCkgPT4gXy5kZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSwgcmVzb2x2ZXIpO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSBmdW5jdGlvbihvYmplY3QsIGJhc2UpIHtcblx0ZnVuY3Rpb24gY2hhbmdlcyhvYmplY3QsIGJhc2UpIHtcblx0XHRyZXR1cm4gXy50cmFuc2Zvcm0ob2JqZWN0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG5cdFx0XHRpZiAoIV8uaXNFcXVhbCh2YWx1ZSwgYmFzZVtrZXldKSkge1xuXHRcdFx0XHR2YXIgcmVzID0gKF8uaXNPYmplY3QodmFsdWUpICYmIF8uaXNPYmplY3QoYmFzZVtrZXldKSkgPyBjaGFuZ2VzKHZhbHVlLCBiYXNlW2tleV0pIDogdmFsdWU7XG5cdFx0XHRcdGlmICghXy5pc0VtcHR5KHJlcykpIHtcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHZhciBjaGFuZ2VkID0gY2hhbmdlcyhvYmplY3QsIGJhc2UpO1xuXHRyZXR1cm4gXy5pc0VtcHR5KGNoYW5nZWQpID8gbnVsbCA6IGNoYW5nZWQ7XG59IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XHJcbi8v0J/RgNC4INC60L7QvNC/0LjQu9GP0YbQuNC4IHR5cGVzY3JpcHQg0LLRi9GB0LrQsNC60LjQstCw0LXRgiDQvtGI0LjQsdC60LAgXCLQvdC1INC90LDRhdC+0LTQuNGCINGB0LLQvtC50YHRgtCy0LAgdG9nZ2xlc1JvbGVzXCIg0YLQvtC70YzQutC+INC60L7Qs9C00LAgcHJvcHM6IE9iamVjdFxyXG4vL9Ce0LHRhdC+0LTQvdC+0LUg0YDQtdGI0LXQvdC40LVcclxudmFyIFZ1ZVA6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZVAuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRwb2ludDogT2JqZWN0LFxyXG5cdFx0aW5kZXg6IFtOdW1iZXIsIFN0cmluZ10sXHJcblx0XHRyb2xlczogQXJyYXksXHJcblx0XHRyb2xlV2l0aERldGFpbDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFJvbGU6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRvblJvbGVTZWxlY3RDbGljaygpIHtcclxuXHRcdFx0dGhpcy5hZGRSb2xlKHtcclxuXHRcdFx0XHRyb2xlOiB0aGlzLnNlbGVjdGVkUm9sZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGRSb2xlKHJvbGVJbmZvKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnB1c2gocm9sZUluZm8pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZVJvbGVCeUluZGV4KGluZGV4KSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dW5pcSgpIHtcclxuXHRcdFx0cmV0dXJuIFwiX1wiICsgdGhpcy5pbmRleDtcclxuXHRcdH0sXHJcblx0XHRleGlzdHNSb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucm9sZXMuZmlsdGVyKHggPT5cclxuXHRcdFx0XHRfLmZpbmRJbmRleCh0aGlzLnRvZ2dsZXNSb2xlcywgKHk6IGFueSkgPT4geS5yb2xlLk5hbWUgPT0geC5OYW1lKSA8IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1ZhbHVlcykgPyBbXSA6IHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1JvbGVzKSA/IFtdIDogdGhpcy50b2dnbGVzUm9sZXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwidXBkYXRlOnRvZ2dsZXNSb2xlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdW5pcUlkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBfLnVuaXF1ZUlkKCkgKyBcIl9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbn07IiwiXHJcbmV4cG9ydCBlbnVtIFBvaW50VHlwZSB7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGNoYXJhY3RlcmlzdGljLFxyXG5cdGFnZ3JlZ2F0b3JcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgUnVsZUNvbnRyb2xsIGZyb20gXCIuL1J1bGVDb250cm9sbFwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgT2JqZWN0OiBhbnk7XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHBvaW50OiB7XHJcblx0XHRcdG5hbWU6IG51bGwsXHJcblx0XHRcdERlZmF1bHRWYWx1ZTogbnVsbCxcclxuXHRcdFx0TGFiZWw6IG51bGwsXHJcblx0XHRcdENoYXJhY3RlcmlzdGljOiBudWxsLFxyXG5cdFx0XHRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRSb2xlczogbnVsbCxcclxuXHRcdFx0UmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RlZENoYXJhY3RlcmlzdGljOiBudWxsLFxyXG5cdFx0dW5pcUlkOiB1bmlxSWQoKSxcclxuXHRcdG9mZnNldFlEZWx0YTogMjUwLFxyXG5cdFx0YWRkRXhpc3RDaGFyYWN0ZXJpc3RpYzogZmFsc2UsXHJcblx0XHRleGlzdFBvaW50OiBudWxsXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FkZC1kZXBlbmQtcG9pbnRcIixcclxuXHRwcm9wczogW1wic2hvd1wiLCBcImlkXCIsIFwiZGVwZW5kZW5jeVwiLCBcImNoYXJhY3RlcmlzdGljc1wiLCBcInJvbGVzXCIsIFwiZGVmYXVsdFBvaW50XCIsIFwiZGVmYXVsdERlcGVuZGVuY3lcIiwgXCJpc01vZGFsV2luZG93XCIsIFwicG9pbnRzXCJdLFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdFJ1bGVDb250cm9sbFxyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNhZGQtZGVwZW5kLXBvaW50X1wiICsgdGhpcy5pZDtcclxuXHRcdH0sXHJcblx0XHRtYWluQ2xhc3NPYmplY3QoKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0bW9kYWw6IHRoaXMuaXNNb2RhbFdpbmRvdyxcclxuXHRcdFx0XHRmYWRlOiB0aGlzLmlzTW9kYWxXaW5kb3dcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRtb2RhbE1heFdpZHRoKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc01vZGFsV2luZG93ID8gXCI4MCVcIiA6IFwiMTAwJVwiO1xyXG5cdFx0fSxcclxuXHRcdGVuZFBvaW50KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRFeGlzdENoYXJhY3RlcmlzdGljID8gdGhpcy5leGlzdFBvaW50IDogXy5tZXJnZSh0aGlzLnBvaW50LCB7IG5hbWU6IHVuaXFJZCgpIH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGF0YTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuZWxJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLiRkYXRhLCBnZXREZWZhdWx0VmFsdWUoKSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoKSB7XHJcblx0XHRcdHZhciBkZXBlbmRlbmN5ID0gdGhpcy5kZXBlbmRlbmN5O1xyXG5cdFx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXRCeURlcGVuZGVuY3kodGhpcy5kZXBlbmRlbmN5KTtcclxuXHJcblx0XHRcdHZhciBwb2ludHMgPSBbXTtcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5tZXJnZSh0aGlzLmVuZFBvaW50LCB7XHJcblx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGVuZFBvaW50OiBhbnkgPSBwb2ludDtcclxuXHJcblx0XHRcdHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHRcdFx0aWYgKGRlcGVuZGVuY3kubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBhZGRQb2ludCA9IHtcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TGFiZWw6IFwiQW5kXCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5hZ2dyZWdhdG9yXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiBvZmZzZXQueSArIHRoaXMub2Zmc2V0WURlbHRhIC8gMlxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cG9pbnRzLnB1c2goYWRkUG9pbnQpO1xyXG5cdFx0XHRcdGVuZFBvaW50ID0gYWRkUG9pbnQ7XHJcblx0XHRcdFx0ZGVwZW5kZW5jeS5wdXNoKHtcclxuXHRcdFx0XHRcdEVuZDogcG9pbnQsXHJcblx0XHRcdFx0XHRTdGFydDogZW5kUG9pbnQsXHJcblx0XHRcdFx0XHROYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdFJ1bGVzOiBbXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlcGVuZGVuY3kuZmlsdGVyKHggPT4geC5FbmQgPT09IG51bGwpLmZvckVhY2goeCA9PiB4LkVuZCA9IGVuZFBvaW50KTtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNvbW1pdC1wb2ludFwiLCB7XHJcblx0XHRcdFx0cG9pbnRzOiBwb2ludHMsXHJcblx0XHRcdFx0ZGVwZW5kZW5jeTogZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlUG9pbnQoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogW3RoaXMucG9pbnRdLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IHRoaXMuZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvblJ1bGVDaGFuZ2UodmFsKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IHZhbC5pbmRleDtcclxuXHRcdFx0VnVlLnNldCh0aGlzLnJ1bGVzLCBpbmRleCwgdmFsKTtcclxuXHRcdH0sXHJcblx0XHRvblNlbGVjdENoYXJSdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHQvL3RoaXMucG9pbnQuVmFsdWVzID0gdmFsLlZhbHVlcztcclxuXHRcdFx0Ly90aGlzLnBvaW50LlJvbGVzID0gdmFsLlJvbGVzO1xyXG5cdFx0fSxcclxuXHRcdGdldE9mZnNldEJ5RGVwZW5kZW5jeShkZXBlbmRlbmNpZXMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0gXy5maXJzdChkZXBlbmRlbmNpZXMpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHg6IGRlcC5TdGFydC5vZmZzZXRYLFxyXG5cdFx0XHRcdHk6IGRlcC5TdGFydC5vZmZzZXRZXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0c2hvdyh2YWwpIHtcclxuXHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcInNob3dcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwiaGlkZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGRlZmF1bHRQb2ludChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0aWYgKGRlZmF1bHRQb2ludCkge1xyXG5cdFx0XHRcdHRoaXMucG9pbnQgPSBkZWZhdWx0UG9pbnQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IGFkZERlcGVuZFBvaW50O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb24/OiBhbnkpIHtcclxuXHR2YXIgZnVuYyA9IChmdW5jdGlvbiAoYmFzZTogYW55KSB7XHJcblx0XHRlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLmV4dGVuZChBZGREZXBlbmRQb2ludCwgYmFzZSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gQWRkRGVwZW5kUG9pbnQobmFtZTogc3RyaW5nKSB7XHJcblx0XHRcdGJhc2UuY2FsbCh0aGlzLCBuYW1lKTtcclxuXHRcdFx0dGhpcy5zaW5nbGVBY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNsb25lZE5vZGVzID0gW107XHJcblx0XHRcdHRoaXMuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcblx0XHR9XHJcblx0XHRBZGREZXBlbmRQb2ludC5wcm90b3R5cGUubW91c2V1cCA9IGZ1bmN0aW9uIChldnQ6IGFueSkge1xyXG5cdFx0XHRiYXNlLnByb3RvdHlwZS5tb3VzZXVwLmNhbGwodGhpcywgZXZ0KTtcclxuXHRcdFx0b3B0aW9uLmJ1cy4kZW1pdChcImFkZC1kZXBlbmQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdG5vZGVzOiB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIEFkZERlcGVuZFBvaW50O1xyXG5cdH0oZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ub29sQmFzZSkpO1xyXG5cclxuXHR2YXIgdXNlckhhbmRsZXMgPSBbXTtcclxuXHR2YXIgYWRkRGVwZW5kUG9pbnQgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGUoKTtcclxuXHRhZGREZXBlbmRQb2ludC5uYW1lID0gXCJBZGRcIjtcclxuXHRhZGREZXBlbmRQb2ludC50b29sID0gbmV3IGZ1bmMoYWRkRGVwZW5kUG9pbnQubmFtZSk7XHJcblx0YWRkRGVwZW5kUG9pbnQucG9zaXRpb24gPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGVQb3NpdGlvbnMuQm90dG9tTGVmdDtcclxuXHRhZGREZXBlbmRQb2ludC52aXNpYmxlID0gdHJ1ZTtcclxuXHRhZGREZXBlbmRQb2ludC5lbmFibGVNdWx0aVNlbGVjdGlvbiA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTQuNjEzLDEwYzAsMC4yMy0wLjE4OCwwLjQxOS0wLjQxOSwwLjQxOUgxMC40MnYzLjc3NGMwLDAuMjMtMC4xODksMC40Mi0wLjQyLDAuNDJzLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDJ2LTMuNzc0SDUuODA2Yy0wLjIzLDAtMC40MTktMC4xODktMC40MTktMC40MTlzMC4xODktMC40MTksMC40MTktMC40MTloMy43NzVWNS44MDZjMC0wLjIzLDAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5czAuNDIsMC4xODksMC40MiwwLjQxOXYzLjc3NWgzLjc3NEMxNC40MjUsOS41ODEsMTQuNjEzLDkuNzcsMTQuNjEzLDEwIE0xNy45NjksMTBjMCw0LjQwMS0zLjU2Nyw3Ljk2OS03Ljk2OSw3Ljk2OWMtNC40MDIsMC03Ljk2OS0zLjU2Ny03Ljk2OS03Ljk2OWMwLTQuNDAyLDMuNTY3LTcuOTY5LDcuOTY5LTcuOTY5QzE0LjQwMSwyLjAzMSwxNy45NjksNS41OTgsMTcuOTY5LDEwIE0xNy4xMywxMGMwLTMuOTMyLTMuMTk4LTcuMTMtNy4xMy03LjEzUzIuODcsNi4wNjgsMi44NywxMGMwLDMuOTMzLDMuMTk4LDcuMTMsNy4xMyw3LjEzUzE3LjEzLDEzLjkzMywxNy4xMywxMFwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IENoYW5nZVBvaW50O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJjaGFuZ2UtcG9pbnRcIiwge1xyXG5cdFx0XHRcdG5vZGVzOiB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIEFkZERlcGVuZFBvaW50O1xyXG5cdH0oZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ub29sQmFzZSkpO1xyXG5cclxuXHR2YXIgdXNlckhhbmRsZXMgPSBbXTtcclxuXHR2YXIgYWRkRGVwZW5kUG9pbnQgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGUoKTtcclxuXHRhZGREZXBlbmRQb2ludC5uYW1lID0gXCJDaGFuZ2VcIjtcclxuXHRhZGREZXBlbmRQb2ludC50b29sID0gbmV3IGZ1bmMoYWRkRGVwZW5kUG9pbnQubmFtZSk7XHJcblx0YWRkRGVwZW5kUG9pbnQucG9zaXRpb24gPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGVQb3NpdGlvbnMuQm90dG9tUmlnaHQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHRhZGREZXBlbmRQb2ludC5zaXplID0gMzU7XHJcblx0YWRkRGVwZW5kUG9pbnQuYmFja2dyb3VuZENvbG9yID0gXCIjNEQ0RDREXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aENvbG9yID0gXCJ3aGl0ZVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LmJvcmRlcldpZHRoID0gXCIxXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aERhdGEgPSBcIk0xMCwyLjE3MmMtNC4zMjQsMC03LjgyOCwzLjUwNC03LjgyOCw3LjgyOFM1LjY3NiwxNy44MjgsMTAsMTcuODI4YzQuMzI0LDAsNy44MjgtMy41MDQsNy44MjgtNy44MjhTMTQuMzI0LDIuMTcyLDEwLDIuMTcyTTEwLDE3LjAwNGMtMy44NjMsMC03LjAwNC0zLjE0MS03LjAwNC03LjAwM1M2LjEzNywyLjk5NywxMCwyLjk5N2MzLjg2MiwwLDcuMDA0LDMuMTQxLDcuMDA0LDcuMDA0UzEzLjg2MiwxNy4wMDQsMTAsMTcuMDA0TTEwLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyUzkuMjA1LDExLjQ0MywxMCwxMS40NDNzMS40NDEtMC42NDcsMS40NDEtMS40NDNTMTAuNzk1LDguNTU5LDEwLDguNTU5IE0xMCwxMC42MTljLTAuMzQsMC0wLjYxOC0wLjI3OC0wLjYxOC0wLjYxOFM5LjY2LDkuMzgyLDEwLDkuMzgyUzEwLjYxOCw5LjY2MSwxMC42MTgsMTBTMTAuMzQsMTAuNjE5LDEwLDEwLjYxOSBNMTQuMTIsOC41NTljLTAuNzk1LDAtMS40NDIsMC42NDYtMS40NDIsMS40NDJzMC42NDcsMS40NDMsMS40NDIsMS40NDNzMS40NDItMC42NDcsMS40NDItMS40NDNTMTQuOTE1LDguNTU5LDE0LjEyLDguNTU5IE0xNC4xMiwxMC42MTljLTAuMzQsMC0wLjYxOC0wLjI3OC0wLjYxOC0wLjYxOHMwLjI3OC0wLjYxOCwwLjYxOC0wLjYxOFMxNC43MzgsOS42NjEsMTQuNzM4LDEwUzE0LjQ2LDEwLjYxOSwxNC4xMiwxMC42MTkgTTUuODgsOC41NTljLTAuNzk1LDAtMS40NDIsMC42NDYtMS40NDIsMS40NDJzMC42NDYsMS40NDMsMS40NDIsMS40NDNTNy4zMjIsMTAuNzk2LDcuMzIyLDEwUzYuNjc1LDguNTU5LDUuODgsOC41NTkgTTUuODgsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTNS41NCw5LjM4Miw1Ljg4LDkuMzgyUzYuNDk4LDkuNjYxLDYuNDk4LDEwUzYuMjIsMTAuNjE5LDUuODgsMTAuNjE5XCI7XHJcblx0cmV0dXJuIGFkZERlcGVuZFBvaW50O1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1ZhbHVlIHtcclxuXHRJZDogc3RyaW5nO1xyXG5cdE5hbWU6IHN0cmluZztcclxufSIsImltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUm9sZVxyXG57XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0UmVxdWlyZWQ/OiBib29sZWFuO1xyXG5cdERlZmF1bHRWYWx1ZT86IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQgeyBJUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVuY3kge1xyXG5cdFN0YXJ0OiBCYXNlUG9pbnQsXHJcblx0TmFtZTogc3RyaW5nOyBcclxuXHRMYWJlbD86IHN0cmluZztcclxuXHRFbmQ6IEJhc2VQb2ludDtcclxuXHRSb2xlcz86IEFycmF5PElSb2xlPjtcclxufSIsImltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuL1BvaW50VHlwZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXNlUG9pbnQge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRvZmZzZXRYOiBhbnk7XHJcblx0b2Zmc2V0WTogYW55O1xyXG5cdE9wdGlvbnM6IHtcclxuXHRcdHR5cGU6IFBvaW50VHlwZTtcclxuXHR9LFxyXG5cdExhYmVsOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjZ3JhcGgtdGVzdFwiLFxyXG5cdHByb3BzOiBbXCJncmFwaFwiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRkeW5hbWljOiB7XHJcblx0XHRcdFx0UG9pbnRzOiBbXVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGFjdGl2ZVBvaW50cygpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRpZiAodGhpcy5wb2ludHMpIHtcclxuXHRcdFx0XHR2YXIgc3RhcnRQb2ludCA9IF8uZmluZCh0aGlzLnBvaW50cywgcCA9PiBwLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0KTtcclxuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLmdldFZpc2libGVDaGlsZHJlbnMoc3RhcnRQb2ludCkuZmlsdGVyKHggPT4geC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kZW1pdChcImFjdGl2ZVwiLCByZXN1bHQpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHBvaW50cygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRpc0Zyb21TdGFydChub2RlKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmRJbmRleCh0aGlzLmdyYXBoLkNvbm5lY3RvcnMsICh4OiBhbnkpID0+IHguU3RhcnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQgJiYgeC5FbmQubmFtZSA9PT0gbm9kZS5uYW1lKSA+PSAwO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50SW5EZXBlbmRlbmNpZXMocG9pbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LkVuZC5uYW1lID09PSBwb2ludC5uYW1lKTtcclxuXHRcdH0sXHJcblx0XHRnZXRTdGFydFBvaW50QnlEZXAoZGVwKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmQodGhpcy5wb2ludHMsIHggPT4geC5uYW1lID09PSBkZXAuU3RhcnQubmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0cmVBY3RpdmVDaGlsZHJlbnMocG9pbnQpIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVucyA9IHRoaXMuZ2V0Q2hpbGRyZW4ocG9pbnQpO1xyXG5cdFx0XHRjaGlsZHJlbnMuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYgKCFjaGlsZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgZGVwcyA9IHRoaXMuZ2V0UG9pbnRJbkRlcGVuZGVuY2llcyhjaGlsZCk7XHJcblx0XHRcdFx0Y2hpbGQuQWN0aXZlID0gXy5maW5kSW5kZXgoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKSA+PSAwO1xyXG5cdFx0XHRcdGlmICghY2hpbGQuQWN0aXZlKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlQWN0aXZlQ2hpbGRyZW5zKGNoaWxkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGdldENoaWxkcmVuKG5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LlN0YXJ0Lm5hbWUgPT09IG5vZGUubmFtZSkubWFwKHggPT4gdGhpcy5nZXRQb2ludEJ5TmFtZSh4LkVuZC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0aXNEZXBlbmRlbmN5UGFzcyhkZXApIHtcclxuXHRcdFx0dmFyIHN0YXJ0ID0gZGVwLlN0YXJ0O1xyXG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzW3N0YXJ0Lm5hbWVdO1xyXG5cdFx0XHRpZiAoZGVwLlJ1bGVzKSB7XHJcblx0XHRcdFx0aWYgKHN0YXJ0Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKSB7XHJcblx0XHRcdFx0XHRpZiAoXy5pc0FycmF5KGRlcC5SdWxlcy5WYWx1ZXMpICYmIGRlcC5SdWxlcy5WYWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfLmZpbmRJbmRleChkZXAuUnVsZXMuVmFsdWVzLCAoeDogYW55KSA9PiB4LklkID09PSB2YWx1ZS5JZCkgPj0gMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50QnlOYW1lKG5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZCh0aGlzLnBvaW50cywgeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdGdldFZpc2libGVDaGlsZHJlbnM6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0XHR2YXIgY2hpbGRyZW5zID0gdGhpcy5nZXRDaGlsZHJlbihwb2ludCk7XHJcblx0XHRcdHZhciBhY3RpdmVzID0gY2hpbGRyZW5zLmZpbHRlcih4ID0+IHtcclxuXHRcdFx0XHRpZiAoIXgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGRlcHMgPSB0aGlzLmdldFBvaW50SW5EZXBlbmRlbmNpZXMoeCk7XHJcblx0XHRcdFx0c3dpdGNoICh4Lk9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWM6XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5zdGFydDpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSkgPj0gMDtcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmFnZ3JlZ2F0b3I6IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8uZXZlcnkoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgYWN0aXZlQ2hpbGRyZW5zID0gW107XHJcblx0XHRcdGFjdGl2ZXMuZm9yRWFjaCh4ID0+IGFjdGl2ZUNoaWxkcmVucyA9IF8uY29uY2F0KGFjdGl2ZUNoaWxkcmVucywgdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW5zKHgpKSk7XHJcblx0XHRcdHJldHVybiBfLnVuaW9uKGFjdGl2ZXMsIGFjdGl2ZUNoaWxkcmVucyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Z3JhcGgoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJncmFwaC1jaGFuZ2VcIik7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgXCJzeW5jZnVzaW9uXCI7XHJcbmltcG9ydCBtZW1vaXplRGVib3VuY2UsIHsgZGlmZmVyZW5jZSB9IGZyb20gXCIuLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuaW1wb3J0IGFkZERlcGVuZE1vZGFsV2luZG93IGZyb20gXCIuL0RpYWdyYW0vQWRkRGVwZW5kUG9pbnRXaW5kb3dcIjtcclxuaW1wb3J0IGNyZWF0ZUFkZERlcGVuZFBvaW50SGFuZGxlciBmcm9tIFwiLi9EaWFncmFtL0hhbmRsZXIvQWRkRGVwZW5kZWRQb2ludFwiO1xyXG5pbXBvcnQgY3JlYXRlQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlciBmcm9tIFwiLi9EaWFncmFtL0hhbmRsZXIvQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB0ZXN0Q29udHJvbGwgZnJvbSBcIi4vRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsXCI7XHJcbmRlY2xhcmUgY29uc3QgZWo6IGFueTtcclxudmFyIGNvbnN0cmFpbnRzID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRGVmYXVsdCB8IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uRGlhZ3JhbUNvbnN0cmFpbnRzLkZsb2F0RWxlbWVudHM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjY2hhcmFjdGVyaXN0aWMtZGlhZ3JhbVwiLFxyXG5cdHByb3BzOiBbXCJncmFwaFwiLCBcImNsYXNzZXNcIiwgXCJoZWlnaHRcIiwgXCJjaGFyYWN0ZXJpc3RpY3NcIiwgXCJyb2xlc1wiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YnVzOiBuZXcgVnVlKCksXHJcblx0XHRcdHNob3dEZXBlbmRNb2RhbDogZmFsc2UsXHJcblx0XHRcdG9mZnNldFlNYXJnaW46IDI1MCxcclxuXHRcdFx0YWRkTW9kZTogZmFsc2UsXHJcblx0XHRcdGRpYWdyYW1Jbml0OiBmYWxzZSxcclxuXHRcdFx0c2VsZWN0ZWROb2RlczogW10sXHJcblx0XHRcdGlzTW9kYWxXaW5kb3c6IHRydWUsXHJcblx0XHRcdElzT3ZlcnZpZXdBY3RpdmU6IHRydWVcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0aGVpZ2h0UHgoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmhlaWdodCArIFwicHhcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5hbWU7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuZGlhZ3JhbUlkO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1PdmVydmlld0VsSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1FbElkICsgXCJfb3ZlcnZpZXdcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFncmFtSW5pdCA/ICQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKFwiaW5zdGFuY2VcIikgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWROb2RlcyAmJiB0aGlzLnNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMCA/IHRoaXMuc2VsZWN0ZWROb2Rlc1swXSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlVmFsdWVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5maXJzdFNlbGVjdE5vZGUgPyB0aGlzLmZpcnN0U2VsZWN0Tm9kZS5WYWx1ZXMgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZURlcGVuZGVuY3koKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoICYmIHRoaXMuZmlyc3RTZWxlY3ROb2RlID8gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguRW5kLm5hbWUgPT09IHRoaXMuZmlyc3RTZWxlY3ROb2RlLm5hbWUpIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRkZXBlbmRTZWxlY3RlZE5vZGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE5vZGVzID8gdGhpcy5zZWxlY3RlZE5vZGVzLm1hcCh4ID0+IHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRTdGFydDogeCxcclxuXHRcdFx0XHRcdEVuZDogbnVsbCxcclxuXHRcdFx0XHRcdFJ1bGVzOiB7XHJcblx0XHRcdFx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFx0XHRcdFJvbGVzOiBbXVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0pIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRjb25uZWN0b3JzKCkge1xyXG5cdFx0XHR0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZm9yRWFjaCh4ID0+IHRoaXMudXBkYXRlQ29ubmVjdG9yTGFiZWwoeCkpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzO1xyXG5cdFx0fSxcclxuXHRcdG5vZGVzKCkge1xyXG5cdFx0XHR0aGlzLmdyYXBoLk5vZGVzLmZvckVhY2goeCA9PiB0aGlzLnVwZGF0ZU5vZGVMYWJlbCh4KSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5vZGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0c2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGVkSXRlbXMpIHtcclxuXHRcdFx0aWYgKCFzZWxlY3RlZEl0ZW1zIHx8IHNlbGVjdGVkSXRlbXMubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSBudWxsO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGVjdGVkSXRlbXMuZmlsdGVyKHggPT4geC5fdHlwZSA9PT0gXCJub2RlXCIpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSBfLm1hcChzZWxlY3RlZE5vZGVzLCAoeDogYW55KSA9PiBfLmZpbmQodGhpcy5ncmFwaC5Ob2RlcywgeSA9PiB5Lm5hbWUgPT09IHgubmFtZSkpO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdFBvaW50QW5kRGVwZW5kZW5jeShvcHRpb25zKSB7XHJcblx0XHRcdHZhciBwb2ludHMgPSBvcHRpb25zLnBvaW50cztcclxuXHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBvcHRpb25zLmRlcGVuZGVuY3k7XHJcblxyXG5cdFx0XHRwb2ludHMuZm9yRWFjaChwb2ludCA9PiB0aGlzLmNvbW1pdFBvaW50KHBvaW50KSk7XHJcblx0XHRcdGRlcGVuZGVuY3kuZm9yRWFjaChkZXAgPT4gdGhpcy5jb21taXRDb25uZWN0aW9uKGRlcCkpO1xyXG5cclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRDb25uZWN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0ZGVwOiBvcHRpb25zXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdFBvaW50KG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1ub2RlXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0cG9pbnQ6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbj86IGFueSkge1xyXG5cdFx0XHR0aGlzLmFkZE1vZGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkNoYW5nZVBvaW50TW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHRoaXMuYWRkTW9kZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlTm9kZVByb3A6IG1lbW9pemVEZWJvdW5jZShmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0XHR2YXIgbm9kZSA9IF8uZmluZCh0aGlzLmdyYXBoLk5vZGVzLCBub2RlID0+IG5vZGUubmFtZSA9PT0gYXJncy5lbGVtZW50Lm5hbWUpO1xyXG5cdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJub2RlLXByb3AtY2hhbmdlXCIsIHtcclxuXHRcdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0XHRuYW1lOiBub2RlLm5hbWUsXHJcblx0XHRcdFx0XHRwcm9wTmFtZTogYXJncy5wcm9wZXJ0eU5hbWUsXHJcblx0XHRcdFx0XHRuZXdWYWx1ZTogYXJncy5lbGVtZW50W2FyZ3MucHJvcGVydHlOYW1lXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LCA1MDAsIHggPT4geC5wcm9wZXJ0eU5hbWUpLFxyXG5cdFx0dXBkYXRlTm9kZUxhYmVsKG5vZGUpIHtcclxuXHRcdFx0aWYgKG5vZGUuT3B0aW9ucykge1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0eSA9IHRoaXMuZ2V0Tm9kZVByb3BlcnRpZXMobm9kZSk7XHJcblx0XHRcdFx0Xy5hc3NpZ24obm9kZSwgcHJvcGVydHkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghbm9kZS5sYWJlbHMgfHwgbm9kZS5sYWJlbHMubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0XHRub2RlLmxhYmVscyA9IFt7XHJcblx0XHRcdFx0XHRuYW1lOiBcImxhYmVsMVwiLFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZSxcclxuXHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0aG9yaXpvbnRhbEFsaWdubWVudDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ib3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0LFxyXG5cdFx0XHRcdFx0dmVydGljYWxBbGlnbm1lbnQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVmVydGljYWxBbGlnbm1lbnQuQm90dG9tLFxyXG5cdFx0XHRcdFx0b2Zmc2V0OiB7XHJcblx0XHRcdFx0XHRcdHk6IDEuMixcclxuXHRcdFx0XHRcdFx0eDogMC44XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ym91bmRhcnlDb25zdHJhaW50czogZmFsc2VcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRub2RlLmxhYmVsc1swXS50ZXh0ID0gbm9kZS5MYWJlbDtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVDb25uZWN0b3JMYWJlbChjb25uZWN0b3IpIHtcclxuXHRcdFx0aWYgKCFjb25uZWN0b3IubGFiZWxzIHx8IGNvbm5lY3Rvci5sYWJlbHMubGVuZ2h0IDw9IDApIHtcclxuXHRcdFx0XHRjb25uZWN0b3IubGFiZWxzID0gW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwibGFiZWwyXCIsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0XHRhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRib3VuZGFyeUNvbnN0cmFpbnRzOiBmYWxzZSxcclxuXHRcdFx0XHRcdG9mZnNldDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Qb2ludCgwLCAwKVxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbm5lY3Rvci5sYWJlbHNbMF0udGV4dCA9IGNvbm5lY3Rvci5MYWJlbDtcclxuXHRcdH0sXHJcblx0XHRnb1Rlc3QoKSB7XHJcblx0XHRcdHRoaXMuSXNPdmVydmlld0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGdvT3ZlcnZpZXcoKSB7XHJcblx0XHRcdHRoaXMuSXNPdmVydmlld0FjdGl2ZSA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0dGVzdEFjdGl2ZU5vZGUoYWN0aXZlcykge1xyXG5cdFx0XHRpZiAoIV8uaXNBcnJheShhY3RpdmVzKSB8fCAhdGhpcy5kaWFncmFtKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZ3JhcGguTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHR2YXIgYWN0aXZlID0gbm9kZS5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCB8fCBfLmZpbmRJbmRleChhY3RpdmVzLCB4ID0+IHgubmFtZSA9PT0gbm9kZS5uYW1lKSA+PSAwO1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0aWVzID0gIXRoaXMuSXNPdmVydmlld0FjdGl2ZSAmJiBhY3RpdmUgPyB7XHJcblx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiI2E2ZjU2OFwiXHJcblx0XHRcdFx0fSA6IHRoaXMuZ2V0Tm9kZVByb3BlcnRpZXMobm9kZSk7XHJcblx0XHRcdFx0dGhpcy5kaWFncmFtLnVwZGF0ZU5vZGUobm9kZS5uYW1lLCBwcm9wZXJ0aWVzKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpIHtcclxuXHRcdFx0c3dpdGNoIChub2RlLk9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiMyOWMxNWZcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwiZWxsaXBzZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWM6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiIzIwODVjOVwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJyZWN0YW5nbGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmFnZ3JlZ2F0b3I6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiI2VjN2UwZFwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rvcihjb25uZWN0b3IpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcInJlbW92ZS1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdGNvbm5lY3Rvck5hbWU6IGNvbm5lY3Rvci5OYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUobm9kZSkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwicmVtb3ZlLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0bm9kZU5hbWU6IG5vZGUubmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb25uZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0ge1xyXG5cdFx0XHRcdE5hbWU6IG9wdGlvbnMuZWxlbWVudC5OYW1lXHJcblx0XHRcdH07XHJcblx0XHRcdHN3aXRjaCAob3B0aW9ucy5lbmRQb2ludCkge1xyXG5cdFx0XHRcdGNhc2UgXCJ0YXJnZXRFbmRQb2ludFwiOlxyXG5cdFx0XHRcdFx0ZGVwLkVuZCA9IG9wdGlvbnMuY29ubmVjdGlvblxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcInNvdXJjZUVuZFBvaW50XCI6XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0ZGVwXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdHZhciAkdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1cy4kb24oXCJhZGQtZGVwZW5kLXBvaW50XCIsIChvcHRpb25zPzogYW55KSA9PiB0aGlzLm9wZW5BZGREZXBlbmRNb2RhbChvcHRpb25zKSk7XHJcblx0XHR0aGlzLmJ1cy4kb24oXCJjaGFuZ2UtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkNoYW5nZVBvaW50TW9kYWwob3B0aW9ucykpO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1FbElkKS5lakRpYWdyYW0oe1xyXG5cdFx0XHRlbmFibGVDb250ZXh0TWVudTogZmFsc2UsXHJcblx0XHRcdGNvbnN0cmFpbnRzLFxyXG5cdFx0XHR3aWR0aDogXCIxMDAlXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHRQeCxcclxuXHRcdFx0bm9kZXM6IHRoaXMubm9kZXMsXHJcblx0XHRcdGNvbm5lY3RvcnM6IHRoaXMuY29ubmVjdG9ycyxcclxuXHRcdFx0ZGVmYXVsdFNldHRpbmdzOiB7XHJcblx0XHRcdFx0bm9kZToge1xyXG5cdFx0XHRcdFx0d2lkdGg6IDY1LFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiA2NSxcclxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb25uZWN0b3I6IHtcclxuXHRcdFx0XHRcdHNlZ21lbnRzOiBbe1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJvcnRob2dvbmFsXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY3JvbGxTZXR0aW5nczoge1xyXG5cdFx0XHRcdGhvcml6b250YWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0dmVydGljYWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0em9vbUZhY3RvcjogMC4yXHJcblx0XHRcdH0sXHJcblx0XHRcdGVuYWJsZUF1dG9TY3JvbGw6IHRydWUsXHJcblx0XHRcdHBhZ2VTZXR0aW5nczoge1xyXG5cdFx0XHRcdHNjcm9sbExpbWl0OiBcImluZmluaXR5XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczoge1xyXG5cdFx0XHRcdHVzZXJIYW5kbGVzOiBbY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KSwgY3JlYXRlQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlcih7XHJcblx0XHRcdFx0XHRidXM6IHRoaXMuYnVzXHJcblx0XHRcdFx0fSldXHJcblx0XHRcdH0sXHJcblx0XHRcdHByb3BlcnR5Q2hhbmdlKGFyZ3MpIHtcclxuXHRcdFx0XHQkdGhpcy4kZW1pdChcInByb3BlcnR5Q2hhbmdlXCIsIGFyZ3MpO1xyXG5cdFx0XHRcdGlmIChhcmdzLmVsZW1lbnRUeXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdFx0aWYgKF8uaW5jbHVkZXMoW1wib2Zmc2V0WFwiLCBcIm9mZnNldFlcIl0sIGFyZ3MucHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHQkdGhpcy51cGRhdGVOb2RlUHJvcChhcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGlvbkNoYW5nZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdFx0XHQkdGhpcy5zZWxlY3Rpb25DaGFuZ2Uob3B0aW9ucy5zZWxlY3RlZEl0ZW1zKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29ubmVjdG9yQ29sbGVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY2hhbmdlVHlwZSA9PT0gXCJyZW1vdmVcIikge1xyXG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ29ubmVjdG9yKG9wdGlvbnMuZWxlbWVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRub2RlQ29sbGVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY2hhbmdlVHlwZSA9PT0gXCJyZW1vdmVcIikge1xyXG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlTm9kZShvcHRpb25zLmVsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y29ubmVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0JHRoaXMuY29ubmVjdGlvbkNoYW5nZShvcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbU92ZXJ2aWV3RWxJZCkuZWpPdmVydmlldyh7XHJcblx0XHRcdHNvdXJjZUlEOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHhcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5kaWFncmFtSW5pdCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRhZGREZXBlbmRNb2RhbFdpbmRvdyxcclxuXHRcdHRlc3RDb250cm9sbFxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKHZhbCkge1xyXG5cdFx0XHR2YXIgZGlhZ3JhbSA9IHRoaXMuZGlhZ3JhbTtcclxuXHRcdFx0dmFyIG5vZGVzID0gZGlhZ3JhbS5ub2RlcygpO1xyXG5cdFx0XHR2YXIgY29ubmVjdG9ycyA9IGRpYWdyYW0uY29ubmVjdG9ycygpO1xyXG5cdFx0XHR2YWwuTm9kZXMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZU5vZGVMYWJlbCh4KTtcclxuXHRcdFx0XHR2YXIgbm9kZSA9IF8uZmluZChub2RlcywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lm5hbWUpO1xyXG5cdFx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZk5vZGUgPSBkaWZmZXJlbmNlKHgsIG5vZGUpO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZOb2RlKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIGRpZmZOb2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBub2RlLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRpZiAoZGlmZkxhYmVsKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwobm9kZS5uYW1lLCBub2RlLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YWwuQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlQ29ubmVjdG9yTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIGNvbm4gPSBfLmZpbmQoY29ubmVjdG9ycywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lk5hbWUpO1xyXG5cdFx0XHRcdGlmIChjb25uKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZkNvbm4gPSBkaWZmZXJlbmNlKHgsIGNvbm4pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZDb25uKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlQ29ubmVjdG9yKGNvbm4ubmFtZSwgZGlmZkNvbm4pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGNvbm4ubGFiZWxzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyIGRpZmZMYWJlbCA9IGRpZmZlcmVuY2UoeC5sYWJlbHNbMF0sIGNvbm4ubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwoY29ubi5uYW1lLCBjb25uLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS5hZGRMYWJlbChjb25uLm5hbWUsIHgubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IHsgQWN0aW9uQ29udGV4dCwgU3RvcmUgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBnZXRTdG9yZUFjY2Vzc29ycyB9IGZyb20gXCJ2dWV4LXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyYXBoIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0UG9pbnRzOiBBcnJheTxCYXNlUG9pbnQ+O1xyXG5cdERlcGVuZGVuY2llczogQXJyYXk8RGVwZW5kZW5jeT47XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpYyB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcbn0iLCJpbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuL0dyYXBoXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdGF0ZSB7XHJcblx0R3JhcGhzOiBBcnJheTxHcmFwaD47XHJcblx0Q2hhcmFjdGVyaXN0aWNzOiBBcnJheTxDaGFyYWN0ZXJpc3RpYz47XHJcblx0Um9sZXM6IEFycmF5PElSb2xlPjtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XHJcblx0bmFtZTogc3RyaW5nXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIENvbm5lY3RvciB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHNvdXJjZU5vZGU6IHN0cmluZztcclxuXHR0YXJnZXROb2RlOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9Db25uZWN0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ZHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nLFxyXG5cdE5vZGVzOiBBcnJheTxOb2RlPjtcclxuXHRDb25uZWN0b3JzOiBBcnJheTxDb25uZWN0b3I+O1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlLCBHZXR0ZXJUcmVlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL0dyYXBoXCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBTZkdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Db25uZWN0b3JcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG50eXBlIEdyYXBoQ29udGV4dCA9IEFjdGlvbkNvbnRleHQ8Um9vdFN0YXRlLCBSb290U3RhdGU+O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdyYXBoTW9kdWxlID0ge1xyXG5cdG5hbWVzcGFjZWQ6IHRydWUsXHJcblxyXG5cdHN0YXRlOiB7XHJcblx0XHRHcmFwaHM6IFt7XHJcblx0XHRcdE5hbWU6IFwiR3JhcGgxXCIsXHJcblx0XHRcdFBvaW50czogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TGFiZWw6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDYwLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF0sXHJcblx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdH1dLFxyXG5cdFx0Q2hhcmFjdGVyaXN0aWNzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMVwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAyXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgM1wiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAzXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgM1wiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDRcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA1XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDdcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA4XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOVwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0XSxcclxuXHRcdFJvbGVzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDFcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAyXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgM1wiXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9LFxyXG5cdGdldHRlcnM6IHtcclxuXHRcdGdldEdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocztcclxuXHRcdH0sXHJcblx0XHRncmFwaENvdW50KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocy5sZW5ndGg7XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChuYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHR2YXIgZ3JhcGggPSBfLmZpcnN0KHN0YXRlLkdyYXBocy5maWx0ZXIoeCA9PiB4Lk5hbWUgPT09IG5hbWUpKTtcclxuXHRcdFx0XHRyZXR1cm4gZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZSkoZ3JhcGgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChncmFwaDogR3JhcGgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0TmFtZTogZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdE5vZGVzOiBncmFwaC5Qb2ludHMsXHJcblx0XHRcdFx0XHRDb25uZWN0b3JzOiBfLm1hcChncmFwaC5EZXBlbmRlbmNpZXMsIGZ1bmN0aW9uIChjb24pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8ubWVyZ2Uoe1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGNvbi5OYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHNvdXJjZU5vZGU6IGNvbi5TdGFydCA/IGNvbi5TdGFydC5uYW1lIDogbnVsbCxcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXROb2RlOiBjb24uRW5kID8gY29uLkVuZC5uYW1lOiBudWxsXHJcblx0XHRcdFx0XHRcdH0sIGNvbik7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0Z2V0Q2hhcmFjdGVyaXN0aWNzTGlzdChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5DaGFyYWN0ZXJpc3RpY3M7XHJcblx0XHR9LFxyXG5cdFx0Z2V0Um9sZXMoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuUm9sZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtdXRhdGlvbnM6IHtcclxuXHRcdGFkZEdyYXBoKHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IEdyYXBoKSB7XHJcblx0XHRcdHN0YXRlLkdyYXBocy5wdXNoKGl0ZW0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgcG9pbnQ6IEJhc2VQb2ludCB9KSB7XHJcblx0XHRcdHZhciBncmFwaCA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKTtcclxuXHRcdFx0dmFyIGR1cGxpY2F0ZVBvaW50SW5kZXggPSBfLmZpbmRJbmRleChncmFwaC5Qb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLnBvaW50Lm5hbWUpO1xyXG5cclxuXHRcdFx0aWYgKGR1cGxpY2F0ZVBvaW50SW5kZXggPCAwKSB7XHJcblx0XHRcdFx0Z3JhcGguUG9pbnRzLnB1c2goaXRlbS5wb2ludCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGR1cGxpY2F0ZVBvaW50ID0gZ3JhcGguUG9pbnRzW2R1cGxpY2F0ZVBvaW50SW5kZXhdO1xyXG5cdFx0XHRcdF8uYXNzaWduKGR1cGxpY2F0ZVBvaW50LCBpdGVtLnBvaW50KTtcclxuXHRcdFx0XHRncmFwaC5Qb2ludHMuc3BsaWNlKGR1cGxpY2F0ZVBvaW50SW5kZXgsIDEsIGR1cGxpY2F0ZVBvaW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGFkZERlcGVuZGVuY3koc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBkZXA6IERlcGVuZGVuY3kgfSkge1xyXG5cdFx0XHQvL1RPRE86INCf0YDQuNC80LXQvdC40YLRjCDQuNC30LzQtdC90LjQtSDQuiDQtNC40LDQs9GA0LDQvNC1XHJcblx0XHRcdHZhciBncmFwaCA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKTtcclxuXHRcdFx0dmFyIGR1cGxpY2F0ZURlcEluZGV4ID0gXy5maW5kSW5kZXgoZ3JhcGguRGVwZW5kZW5jaWVzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5kZXAuTmFtZSk7XHJcblx0XHRcdGlmIChkdXBsaWNhdGVEZXBJbmRleCA8IDApIHtcclxuXHRcdFx0XHRncmFwaC5EZXBlbmRlbmNpZXMucHVzaChpdGVtLmRlcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGR1cGxpY2F0ZURlcCA9IGdyYXBoLkRlcGVuZGVuY2llc1tkdXBsaWNhdGVEZXBJbmRleF07XHJcblx0XHRcdFx0Xy5hc3NpZ24oZHVwbGljYXRlRGVwLCBpdGVtLmRlcCk7XHJcblx0XHRcdFx0Z3JhcGguRGVwZW5kZW5jaWVzLnNwbGljZShkdXBsaWNhdGVEZXBJbmRleCwgMSwgZHVwbGljYXRlRGVwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGNoYW5nZU5vZGVQcm9wZXJ0eShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSB9KSB7XHJcblx0XHRcdHZhciBwb2ludHMgPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaCkuUG9pbnRzO1xyXG5cdFx0XHR2YXIgcG9pbnQgPSBfLmZpbmQocG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gaXRlbS5uYW1lKTtcclxuXHRcdFx0VnVlLnNldChwb2ludCwgaXRlbS5wcm9wTmFtZSwgaXRlbS5uZXdWYWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlQ29ubmVjdGlvbihzdGF0ZTogUm9vdFN0YXRlLCBvcHRpb25zOiB7IGdyYXBoOiBzdHJpbmcsIGNvbm5lY3Rvck5hbWU6IHN0cmluZyB9KSB7XHJcblx0XHRcdHZhciBncmFwaCA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmdyYXBoKTtcclxuXHRcdFx0Xy5yZW1vdmUoZ3JhcGguRGVwZW5kZW5jaWVzLCB4ID0+IHguTmFtZSA9PT0gb3B0aW9ucy5jb25uZWN0b3JOYW1lKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVOb2RlKHN0YXRlOiBSb290U3RhdGUsIG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbm9kZU5hbWU6IHN0cmluZyB9KSB7XHJcblx0XHRcdHZhciBncmFwaCA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmdyYXBoKTtcclxuXHRcdFx0Xy5yZW1vdmUoZ3JhcGguUG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gb3B0aW9ucy5ub2RlTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuY29uc3QgeyByZWFkLCBjb21taXQgfSA9XHJcblx0Z2V0U3RvcmVBY2Nlc3NvcnM8Um9vdFN0YXRlLCBSb290U3RhdGU+KFwiZ3JhcGhcIik7XHJcblxyXG5leHBvcnQgY29uc3QgcmVhZEdyYXBoID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldEdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IHJlYWRHcmFwaENvdW50ID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdyYXBoQ291bnQpO1xyXG5leHBvcnQgY29uc3QgZ2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZSk7XHJcbmV4cG9ydCBjb25zdCBnZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCBnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0ID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldENoYXJhY3RlcmlzdGljc0xpc3QpO1xyXG5leHBvcnQgY29uc3QgZ2V0Um9sZXMgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0Um9sZXMpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEdyYXBoID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGRHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCBhZGRQb2ludCA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkUG9pbnQpO1xyXG5leHBvcnQgY29uc3QgYWRkRGVwZW5kZW5jeSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkRGVwZW5kZW5jeSk7XHJcbmV4cG9ydCBjb25zdCBjaGFuZ2VOb2RlUHJvcGVydHkgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmNoYW5nZU5vZGVQcm9wZXJ0eSk7XHJcbmV4cG9ydCBjb25zdCByZW1vdmVDb25uZWN0aW9uID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5yZW1vdmVDb25uZWN0aW9uKTtcclxuZXhwb3J0IGNvbnN0IHJlbW92ZU5vZGUgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLnJlbW92ZU5vZGUpOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCB7IGdyYXBoTW9kdWxlIGFzIGdyYXBoIH0gZnJvbSBcIi4vR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgVnVleFBlcnNpc3RlbmNlIGZyb20gXCJ2dWV4LXBlcnNpc3RcIjtcclxuXHJcblZ1ZS51c2UoVnVleCk7XHJcblxyXG5jb25zdCB2dWV4TG9jYWwgPSBuZXcgVnVleFBlcnNpc3RlbmNlKHtcclxuXHRzdG9yYWdlOiB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIG5ldyBWdWV4LlN0b3JlPFJvb3RTdGF0ZT4oe1xyXG5cdFx0bW9kdWxlczoge1xyXG5cdFx0XHRncmFwaFxyXG5cdFx0fSxcclxuXHRcdHBsdWdpbnM6IFt2dWV4TG9jYWwucGx1Z2luXSxcclxuXHRcdHN0cmljdDogdHJ1ZVxyXG5cdH0pXHJcbn07IiwiLy8gQ2xpZW50QXBwL2NvbXBvbmVudHMvQXBwSGVsbG8udHNcclxuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IENoYXJhY3RlcmlzdGljRGlhZ3JhbSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY0RpYWdyYW1cIjtcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tIFwiLi4vU3RvcmUvUm9vdFN0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGdyYXBoIGZyb20gXCIuLi9TdG9yZS9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxuXHJcbnZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKCk7XHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiAnI2FwcC1oZWxsby10ZW1wbGF0ZScsXHJcblx0c3RvcmUsXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1lc3NhZ2U6IFwidGVzdCBtZXNzYWdlXCJcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dGVzdCgpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSlbMF0uUG9pbnRzLm1hcCh4ID0+IHguTGFiZWwpO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1zKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGgucmVhZEdyYXBoKHRoaXMuJHN0b3JlKS5tYXAoeCA9PiBncmFwaC5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaCh0aGlzLiRzdG9yZSkoeCkpO1xyXG5cdFx0fSxcclxuXHRcdGNoYXJhY3RlcmlzdGljcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLmdldENoYXJhY3RlcmlzdGljc0xpc3QodGhpcy4kc3RvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHJvbGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGguZ2V0Um9sZXModGhpcy4kc3RvcmUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0YWRkR3JhcGgoKSB7XHJcblx0XHRcdGdyYXBoLmFkZEdyYXBoKHRoaXMuJHN0b3JlLCB7XHJcblx0XHRcdFx0TmFtZTogXCJHcmFwaFwiICsgKGdyYXBoLnJlYWRHcmFwaENvdW50KHRoaXMuJHN0b3JlKSArIDEpLFxyXG5cdFx0XHRcdFBvaW50czogW3tcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogNTAwLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogMjAsXHJcblx0XHRcdFx0XHRMYWJlbDogXCJTdGFydFwiLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZE5vZGUobm9kZTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkUG9pbnQodGhpcy4kc3RvcmUsIG5vZGUpO1xyXG5cdFx0fSxcclxuXHRcdGFkZENvbm5lY3Rpb24oY29ubmVjdDogeyBncmFwaDogc3RyaW5nLCBkZXA6IERlcGVuZGVuY3kgfSkge1xyXG5cdFx0XHRncmFwaC5hZGREZXBlbmRlbmN5KHRoaXMuJHN0b3JlLCBjb25uZWN0KTtcclxuXHRcdH0sXHJcblx0XHRvbk5vZGVQcm9wQ2hhbmdlKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0Z3JhcGguY2hhbmdlTm9kZVByb3BlcnR5KHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKG9wdGlvbnM6IHtncmFwaDogc3RyaW5nLCBjb25uZWN0b3JOYW1lOiBzdHJpbmd9KSB7XHJcblx0XHRcdGdyYXBoLnJlbW92ZUNvbm5lY3Rpb24odGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUob3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0Z3JhcGgucmVtb3ZlTm9kZSh0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fSxcclxuICAgIGNvbXBvbmVudHM6IHtcclxuXHRcdENoYXJhY3RlcmlzdGljRGlhZ3JhbVxyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQXBwSGVsbG8gZnJvbSBcIi4vY29tcG9uZW50cy9BcHBIZWxsb1wiO1xyXG5pbXBvcnQgbG9kYXNoTWl4aW4gZnJvbSBcIi4vbWl4aW5zL21fbG9kYXNoXCI7XHJcblxyXG4vL1Jvb3QgQ29tcG9uZW50XHJcbmxldCB2ID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogXCIjYXBwLXJvb3RcIixcclxuXHR0ZW1wbGF0ZTogJzxBcHBIZWxsby8+JyxcclxuICAgIC8vcmVuZGVyOiBoID0+IGgoQXBwSGVsbG9Db21wb25lbnQpLFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0QXBwSGVsbG9cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNQb2ludCBleHRlbmRzIEJhc2VQb2ludCB7XHJcblx0Q2hhcmFjdGVyaXN0aWM6IENoYXJhY3RlcmlzdGljO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcblx0UmVxdWlyZWQ/OiBib29sZWFuO1xyXG5cdERlZmF1bHRWYWx1ZT86IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQge0RlcGVuZGVuY3l9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHtJUm9sZX0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVwZW5kZW5jeVJvbGUge1xyXG5cdERlcGVuZGVuY3k6IERlcGVuZGVuY3k7XHJcblx0Um9sZTogSVJvbGU7XHJcbn0iXX0=