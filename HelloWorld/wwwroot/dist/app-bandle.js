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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb2xlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0RlcGVuZGVuY3kudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQmFzZVBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1Jvb3RTdGF0ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaC50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9HcmFwaFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL1Jvb3RTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2luZGV4LnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvSURlcGVuZGVuY3lSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUNBLHlCQUF3QyxJQUFJLEVBQUUsSUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFZO1FBQWhDLHFCQUFBLEVBQUEsUUFBUTtRQUFZLHdCQUFBLEVBQUEsWUFBWTtRQUM3RSxJQUFJLEdBQUcsR0FBRyxnQkFBQyxDQUFDLE9BQU8sQ0FBQyxjQUFNLE9BQUEsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUM7WUFDTixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQTtJQUNGLENBQUM7Ozs7Ozs7Ozs7WUFFRCx3QkFBYSxVQUFVLEdBQUcsVUFBUyxNQUFNLEVBQUUsSUFBSTtnQkFDOUMsaUJBQWlCLE1BQU0sRUFBRSxJQUFJO29CQUM1QixNQUFNLENBQUMsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHO3dCQUN0RCxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMs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QUM5QyxDQUFDO29CQUNELFVBQVUsWUFBQyxPQUE0Qzt3QkFDdEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxDQUFDO2lCQUNEO2dCQUNFLFVBQVUsRUFBRTtvQkFDZCxxQkFBcUIsaUNBQUE7aUJBQ2xCO2FBQ0osQ0FBQztRQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDakVKLGdCQUFnQjtZQUNaLENBQUMsR0FBRyxJQUFJLGFBQUcsQ0FBQztnQkFDWixFQUFFLEVBQUUsV0FBVztnQkFDbEIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3BCLG9DQUFvQztnQkFDcEMsVUFBVSxFQUFFO29CQUNkLFFBQVEsb0JBQUE7aUJBQ0w7YUFDSixDQUFDLENBQUM7UUFBQSxDQUFDOzs7Ozs7Ozs7UUNMSCxDQUFDOzs7Ozs7Ozs7UUNIRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZW1vaXplRGVib3VuY2UoZnVuYywgd2FpdCA9IDAsIHJlc29sdmVyLCBvcHRpb25zID0ge30pIHtcclxuXHR2YXIgbWVtID0gXy5tZW1vaXplKCgpID0+IF8uZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucyksIHJlc29sdmVyKTtcclxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0bWVtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkaWZmZXJlbmNlID0gZnVuY3Rpb24ob2JqZWN0LCBiYXNlKSB7XG5cdGZ1bmN0aW9uIGNoYW5nZXMob2JqZWN0LCBiYXNlKSB7XG5cdFx0cmV0dXJuIF8udHJhbnNmb3JtKG9iamVjdCwgZnVuY3Rpb24gKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuXHRcdFx0aWYgKCFfLmlzRXF1YWwodmFsdWUsIGJhc2Vba2V5XSkpIHtcblx0XHRcdFx0dmFyIHJlcyA9IChfLmlzT2JqZWN0KHZhbHVlKSAmJiBfLmlzT2JqZWN0KGJhc2Vba2V5XSkpID8gY2hhbmdlcyh2YWx1ZSwgYmFzZVtrZXldKSA6IHZhbHVlO1xuXHRcdFx0XHRpZiAoIV8uaXNFbXB0eShyZXMpKSB7XG5cdFx0XHRcdFx0cmVzdWx0W2tleV0gPSByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHR2YXIgY2hhbmdlZCA9IGNoYW5nZXMob2JqZWN0LCBiYXNlKTtcblx0cmV0dXJuIF8uaXNFbXB0eShjaGFuZ2VkKSA/IG51bGwgOiBjaGFuZ2VkO1xufSIsImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IG1hcEFjdGlvbnMgfSBmcm9tIFwidnVleFwiO1xyXG4vL9Cf0YDQuCDQutC+0LzQv9C40LvRj9GG0LjQuCB0eXBlc2NyaXB0INCy0YvRgdC60LDQutC40LLQsNC10YIg0L7RiNC40LHQutCwIFwi0L3QtSDQvdCw0YXQvtC00LjRgiDRgdCy0L7QudGB0YLQstCwIHRvZ2dsZXNSb2xlc1wiINGC0L7Qu9GM0LrQviDQutC+0LPQtNCwIHByb3BzOiBPYmplY3RcclxuLy/QntCx0YXQvtC00L3QvtC1INGA0LXRiNC10L3QuNC1XHJcbnZhciBWdWVQOiBhbnkgPSBWdWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWVQLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI3J1bGUtY29udHJvbGxcIixcclxuXHRwcm9wczoge1xyXG5cdFx0cG9pbnQ6IE9iamVjdCxcclxuXHRcdGluZGV4OiBbTnVtYmVyLCBTdHJpbmddLFxyXG5cdFx0cm9sZXM6IEFycmF5LFxyXG5cdFx0cm9sZVdpdGhEZXRhaWw6IHtcclxuXHRcdFx0dHlwZTogQm9vbGVhbixcclxuXHRcdFx0ZGVmYXVsdDogZmFsc2VcclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzVmFsdWVzOiB7XHJcblx0XHRcdHR5cGU6IEFycmF5LFxyXG5cdFx0XHRkZWZhdWx0OiBbXVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNSb2xlczoge1xyXG5cdFx0XHR0eXBlOiBBcnJheSxcclxuXHRcdFx0ZGVmYXVsdDogW11cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFJvbGU6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRvblJvbGVTZWxlY3RDbGljaygpIHtcclxuXHRcdFx0dGhpcy5hZGRSb2xlKHtcclxuXHRcdFx0XHRyb2xlOiB0aGlzLnNlbGVjdGVkUm9sZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGRSb2xlKHJvbGVJbmZvKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnB1c2gocm9sZUluZm8pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZVJvbGVCeUluZGV4KGluZGV4KSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dW5pcSgpIHtcclxuXHRcdFx0cmV0dXJuIFwiX1wiICsgdGhpcy5pbmRleDtcclxuXHRcdH0sXHJcblx0XHRleGlzdHNSb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucm9sZXMuZmlsdGVyKHggPT5cclxuXHRcdFx0XHRfLmZpbmRJbmRleCh0aGlzLnRvZ2dsZXNSb2xlcywgKHk6IGFueSkgPT4geS5yb2xlLk5hbWUgPT0geC5OYW1lKSA8IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1ZhbHVlcykgPyBbXSA6IHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1JvbGVzKSA/IFtdIDogdGhpcy50b2dnbGVzUm9sZXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwidXBkYXRlOnRvZ2dsZXNSb2xlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdW5pcUlkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBfLnVuaXF1ZUlkKCkgKyBcIl9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbn07IiwiXHJcbmV4cG9ydCBlbnVtIFBvaW50VHlwZSB7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGNoYXJhY3RlcmlzdGljLFxyXG5cdGFnZ3JlZ2F0b3JcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgUnVsZUNvbnRyb2xsIGZyb20gXCIuL1J1bGVDb250cm9sbFwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgT2JqZWN0OiBhbnk7XHJcblxyXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHBvaW50OiB7XHJcblx0XHRcdG5hbWU6IG51bGwsXHJcblx0XHRcdERlZmF1bHRWYWx1ZTogbnVsbCxcclxuXHRcdFx0TGFiZWw6IG51bGwsXHJcblx0XHRcdENoYXJhY3RlcmlzdGljOiBudWxsLFxyXG5cdFx0XHRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRSb2xlczogbnVsbCxcclxuXHRcdFx0UmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRzZWxlY3RlZENoYXJhY3RlcmlzdGljOiBudWxsLFxyXG5cdFx0dW5pcUlkOiB1bmlxSWQoKSxcclxuXHRcdG9mZnNldFlEZWx0YTogMjUwLFxyXG5cdFx0YWRkRXhpc3RDaGFyYWN0ZXJpc3RpYzogZmFsc2UsXHJcblx0XHRleGlzdFBvaW50OiBudWxsXHJcblx0fTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FkZC1kZXBlbmQtcG9pbnRcIixcclxuXHRwcm9wczogW1wic2hvd1wiLCBcImlkXCIsIFwiZGVwZW5kZW5jeVwiLCBcImNoYXJhY3RlcmlzdGljc1wiLCBcInJvbGVzXCIsIFwiZGVmYXVsdFBvaW50XCIsIFwiZGVmYXVsdERlcGVuZGVuY3lcIiwgXCJpc01vZGFsV2luZG93XCIsIFwicG9pbnRzXCJdLFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdFJ1bGVDb250cm9sbFxyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNhZGQtZGVwZW5kLXBvaW50X1wiICsgdGhpcy5pZDtcclxuXHRcdH0sXHJcblx0XHRtYWluQ2xhc3NPYmplY3QoKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0bW9kYWw6IHRoaXMuaXNNb2RhbFdpbmRvdyxcclxuXHRcdFx0XHRmYWRlOiB0aGlzLmlzTW9kYWxXaW5kb3dcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRtb2RhbE1heFdpZHRoKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pc01vZGFsV2luZG93ID8gXCI4MCVcIiA6IFwiMTAwJVwiO1xyXG5cdFx0fSxcclxuXHRcdGVuZFBvaW50KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRFeGlzdENoYXJhY3RlcmlzdGljID8gdGhpcy5leGlzdFBvaW50IDogXy5tZXJnZSh0aGlzLnBvaW50LCB7IG5hbWU6IHVuaXFJZCgpIH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGF0YTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuZWxJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLiRkYXRhLCBnZXREZWZhdWx0VmFsdWUoKSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoKSB7XHJcblx0XHRcdHZhciBkZXBlbmRlbmN5ID0gdGhpcy5kZXBlbmRlbmN5O1xyXG5cdFx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXRCeURlcGVuZGVuY3kodGhpcy5kZXBlbmRlbmN5KTtcclxuXHJcblx0XHRcdHZhciBwb2ludHMgPSBbXTtcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5tZXJnZSh0aGlzLmVuZFBvaW50LCB7XHJcblx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGVuZFBvaW50OiBhbnkgPSBwb2ludDtcclxuXHJcblx0XHRcdHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHRcdFx0aWYgKGRlcGVuZGVuY3kubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBhZGRQb2ludCA9IHtcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TGFiZWw6IFwiQW5kXCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5hZ2dyZWdhdG9yXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiBvZmZzZXQueSArIHRoaXMub2Zmc2V0WURlbHRhIC8gMlxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cG9pbnRzLnB1c2goYWRkUG9pbnQpO1xyXG5cdFx0XHRcdGVuZFBvaW50ID0gYWRkUG9pbnQ7XHJcblx0XHRcdFx0ZGVwZW5kZW5jeS5wdXNoKHtcclxuXHRcdFx0XHRcdEVuZDogcG9pbnQsXHJcblx0XHRcdFx0XHRTdGFydDogZW5kUG9pbnQsXHJcblx0XHRcdFx0XHROYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdFJ1bGVzOiBbXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlcGVuZGVuY3kuZmlsdGVyKHggPT4geC5FbmQgPT09IG51bGwpLmZvckVhY2goeCA9PiB4LkVuZCA9IGVuZFBvaW50KTtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNvbW1pdC1wb2ludFwiLCB7XHJcblx0XHRcdFx0cG9pbnRzOiBwb2ludHMsXHJcblx0XHRcdFx0ZGVwZW5kZW5jeTogZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlUG9pbnQoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogW3RoaXMucG9pbnRdLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IHRoaXMuZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvblJ1bGVDaGFuZ2UodmFsKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IHZhbC5pbmRleDtcclxuXHRcdFx0VnVlLnNldCh0aGlzLnJ1bGVzLCBpbmRleCwgdmFsKTtcclxuXHRcdH0sXHJcblx0XHRvblNlbGVjdENoYXJSdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHQvL3RoaXMucG9pbnQuVmFsdWVzID0gdmFsLlZhbHVlcztcclxuXHRcdFx0Ly90aGlzLnBvaW50LlJvbGVzID0gdmFsLlJvbGVzO1xyXG5cdFx0fSxcclxuXHRcdGdldE9mZnNldEJ5RGVwZW5kZW5jeShkZXBlbmRlbmNpZXMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0gXy5maXJzdChkZXBlbmRlbmNpZXMpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHg6IGRlcC5TdGFydC5vZmZzZXRYLFxyXG5cdFx0XHRcdHk6IGRlcC5TdGFydC5vZmZzZXRZXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0c2hvdyh2YWwpIHtcclxuXHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcInNob3dcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwiaGlkZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGRlZmF1bHRQb2ludChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0aWYgKGRlZmF1bHRQb2ludCkge1xyXG5cdFx0XHRcdHRoaXMucG9pbnQgPSBkZWZhdWx0UG9pbnQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IGFkZERlcGVuZFBvaW50O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb24/OiBhbnkpIHtcclxuXHR2YXIgZnVuYyA9IChmdW5jdGlvbiAoYmFzZTogYW55KSB7XHJcblx0XHRlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLmV4dGVuZChBZGREZXBlbmRQb2ludCwgYmFzZSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gQWRkRGVwZW5kUG9pbnQobmFtZTogc3RyaW5nKSB7XHJcblx0XHRcdGJhc2UuY2FsbCh0aGlzLCBuYW1lKTtcclxuXHRcdFx0dGhpcy5zaW5nbGVBY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNsb25lZE5vZGVzID0gW107XHJcblx0XHRcdHRoaXMuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcblx0XHR9XHJcblx0XHRBZGREZXBlbmRQb2ludC5wcm90b3R5cGUubW91c2V1cCA9IGZ1bmN0aW9uIChldnQ6IGFueSkge1xyXG5cdFx0XHRiYXNlLnByb3RvdHlwZS5tb3VzZXVwLmNhbGwodGhpcywgZXZ0KTtcclxuXHRcdFx0b3B0aW9uLmJ1cy4kZW1pdChcImFkZC1kZXBlbmQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdG5vZGVzOiB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIEFkZERlcGVuZFBvaW50O1xyXG5cdH0oZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ub29sQmFzZSkpO1xyXG5cclxuXHR2YXIgdXNlckhhbmRsZXMgPSBbXTtcclxuXHR2YXIgYWRkRGVwZW5kUG9pbnQgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGUoKTtcclxuXHRhZGREZXBlbmRQb2ludC5uYW1lID0gXCJBZGRcIjtcclxuXHRhZGREZXBlbmRQb2ludC50b29sID0gbmV3IGZ1bmMoYWRkRGVwZW5kUG9pbnQubmFtZSk7XHJcblx0YWRkRGVwZW5kUG9pbnQucG9zaXRpb24gPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGVQb3NpdGlvbnMuQm90dG9tTGVmdDtcclxuXHRhZGREZXBlbmRQb2ludC52aXNpYmxlID0gdHJ1ZTtcclxuXHRhZGREZXBlbmRQb2ludC5lbmFibGVNdWx0aVNlbGVjdGlvbiA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTQuNjEzLDEwYzAsMC4yMy0wLjE4OCwwLjQxOS0wLjQxOSwwLjQxOUgxMC40MnYzLjc3NGMwLDAuMjMtMC4xODksMC40Mi0wLjQyLDAuNDJzLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDJ2LTMuNzc0SDUuODA2Yy0wLjIzLDAtMC40MTktMC4xODktMC40MTktMC40MTlzMC4xODktMC40MTksMC40MTktMC40MTloMy43NzVWNS44MDZjMC0wLjIzLDAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5czAuNDIsMC4xODksMC40MiwwLjQxOXYzLjc3NWgzLjc3NEMxNC40MjUsOS41ODEsMTQuNjEzLDkuNzcsMTQuNjEzLDEwIE0xNy45NjksMTBjMCw0LjQwMS0zLjU2Nyw3Ljk2OS03Ljk2OSw3Ljk2OWMtNC40MDIsMC03Ljk2OS0zLjU2Ny03Ljk2OS03Ljk2OWMwLTQuNDAyLDMuNTY3LTcuOTY5LDcuOTY5LTcuOTY5QzE0LjQwMSwyLjAzMSwxNy45NjksNS41OTgsMTcuOTY5LDEwIE0xNy4xMywxMGMwLTMuOTMyLTMuMTk4LTcuMTMtNy4xMy03LjEzUzIuODcsNi4wNjgsMi44NywxMGMwLDMuOTMzLDMuMTk4LDcuMTMsNy4xMyw3LjEzUzE3LjEzLDEzLjkzMywxNy4xMywxMFwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IENoYW5nZVBvaW50O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJjaGFuZ2UtcG9pbnRcIiwge1xyXG5cdFx0XHRcdG5vZGVzOiB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIEFkZERlcGVuZFBvaW50O1xyXG5cdH0oZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ub29sQmFzZSkpO1xyXG5cclxuXHR2YXIgdXNlckhhbmRsZXMgPSBbXTtcclxuXHR2YXIgYWRkRGVwZW5kUG9pbnQgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGUoKTtcclxuXHRhZGREZXBlbmRQb2ludC5uYW1lID0gXCJDaGFuZ2VcIjtcclxuXHRhZGREZXBlbmRQb2ludC50b29sID0gbmV3IGZ1bmMoYWRkRGVwZW5kUG9pbnQubmFtZSk7XHJcblx0YWRkRGVwZW5kUG9pbnQucG9zaXRpb24gPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGVQb3NpdGlvbnMuQm90dG9tUmlnaHQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSBmYWxzZTtcclxuXHRhZGREZXBlbmRQb2ludC5zaXplID0gMzU7XHJcblx0YWRkRGVwZW5kUG9pbnQuYmFja2dyb3VuZENvbG9yID0gXCIjNEQ0RDREXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aENvbG9yID0gXCJ3aGl0ZVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LmJvcmRlcldpZHRoID0gXCIxXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQucGF0aERhdGEgPSBcIk0xMCwyLjE3MmMtNC4zMjQsMC03LjgyOCwzLjUwNC03LjgyOCw3LjgyOFM1LjY3NiwxNy44MjgsMTAsMTcuODI4YzQuMzI0LDAsNy44MjgtMy41MDQsNy44MjgtNy44MjhTMTQuMzI0LDIuMTcyLDEwLDIuMTcyTTEwLDE3LjAwNGMtMy44NjMsMC03LjAwNC0zLjE0MS03LjAwNC03LjAwM1M2LjEzNywyLjk5NywxMCwyLjk5N2MzLjg2MiwwLDcuMDA0LDMuMTQxLDcuMDA0LDcuMDA0UzEzLjg2MiwxNy4wMDQsMTAsMTcuMDA0TTEwLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyUzkuMjA1LDExLjQ0MywxMCwxMS40NDNzMS40NDEtMC42NDcsMS40NDEtMS40NDNTMTAuNzk1LDguNTU5LDEwLDguNTU5IE0xMCwxMC42MTljLTAuMzQsMC0wLjYxOC0wLjI3OC0wLjYxOC0wLjYxOFM5LjY2LDkuMzgyLDEwLDkuMzgyUzEwLjYxOCw5LjY2MSwxMC42MTgsMTBTMTAuMzQsMTAuNjE5LDEwLDEwLjYxOSBNMTQuMTIsOC41NTljLTAuNzk1LDAtMS40NDIsMC42NDYtMS40NDIsMS40NDJzMC42NDcsMS40NDMsMS40NDIsMS40NDNzMS40NDItMC42NDcsMS40NDItMS40NDNTMTQuOTE1LDguNTU5LDE0LjEyLDguNTU5IE0xNC4xMiwxMC42MTljLTAuMzQsMC0wLjYxOC0wLjI3OC0wLjYxOC0wLjYxOHMwLjI3OC0wLjYxOCwwLjYxOC0wLjYxOFMxNC43MzgsOS42NjEsMTQuNzM4LDEwUzE0LjQ2LDEwLjYxOSwxNC4xMiwxMC42MTkgTTUuODgsOC41NTljLTAuNzk1LDAtMS40NDIsMC42NDYtMS40NDIsMS40NDJzMC42NDYsMS40NDMsMS40NDIsMS40NDNTNy4zMjIsMTAuNzk2LDcuMzIyLDEwUzYuNjc1LDguNTU5LDUuODgsOC41NTkgTTUuODgsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTNS41NCw5LjM4Miw1Ljg4LDkuMzgyUzYuNDk4LDkuNjYxLDYuNDk4LDEwUzYuMjIsMTAuNjE5LDUuODgsMTAuNjE5XCI7XHJcblx0cmV0dXJuIGFkZERlcGVuZFBvaW50O1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1ZhbHVlIHtcclxuXHRJZDogc3RyaW5nO1xyXG5cdE5hbWU6IHN0cmluZztcclxufSIsImltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUm9sZVxyXG57XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0UmVxdWlyZWQ/OiBib29sZWFuO1xyXG5cdERlZmF1bHRWYWx1ZT86IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQgeyBJUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVuY3kge1xyXG5cdFN0YXJ0OiBCYXNlUG9pbnQsXHJcblx0TmFtZTogc3RyaW5nOyBcclxuXHRMYWJlbD86IHN0cmluZztcclxuXHRFbmQ6IEJhc2VQb2ludDtcclxuXHRSb2xlcz86IEFycmF5PElSb2xlPjtcclxufSIsImltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuL1BvaW50VHlwZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXNlUG9pbnQge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRvZmZzZXRYOiBhbnk7XHJcblx0b2Zmc2V0WTogYW55O1xyXG5cdE9wdGlvbnM6IHtcclxuXHRcdHR5cGU6IFBvaW50VHlwZTtcclxuXHR9LFxyXG5cdExhYmVsOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjZ3JhcGgtdGVzdFwiLFxyXG5cdHByb3BzOiBbXCJncmFwaFwiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRkeW5hbWljOiB7XHJcblx0XHRcdFx0UG9pbnRzOiBbXVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGFjdGl2ZVBvaW50cygpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRpZiAodGhpcy5wb2ludHMpIHtcclxuXHRcdFx0XHR2YXIgc3RhcnRQb2ludCA9IF8uZmluZCh0aGlzLnBvaW50cywgcCA9PiBwLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0KTtcclxuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLmdldFZpc2libGVDaGlsZHJlbnMoc3RhcnRQb2ludCkuZmlsdGVyKHggPT4geC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kZW1pdChcImFjdGl2ZVwiLCByZXN1bHQpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHBvaW50cygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRpc0Zyb21TdGFydChub2RlKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmRJbmRleCh0aGlzLmdyYXBoLkNvbm5lY3RvcnMsICh4OiBhbnkpID0+IHguU3RhcnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQgJiYgeC5FbmQubmFtZSA9PT0gbm9kZS5uYW1lKSA+PSAwO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50SW5EZXBlbmRlbmNpZXMocG9pbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LkVuZC5uYW1lID09PSBwb2ludC5uYW1lKTtcclxuXHRcdH0sXHJcblx0XHRnZXRTdGFydFBvaW50QnlEZXAoZGVwKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmQodGhpcy5wb2ludHMsIHggPT4geC5uYW1lID09PSBkZXAuU3RhcnQubmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0cmVBY3RpdmVDaGlsZHJlbnMocG9pbnQpIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVucyA9IHRoaXMuZ2V0Q2hpbGRyZW4ocG9pbnQpO1xyXG5cdFx0XHRjaGlsZHJlbnMuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYgKCFjaGlsZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgZGVwcyA9IHRoaXMuZ2V0UG9pbnRJbkRlcGVuZGVuY2llcyhjaGlsZCk7XHJcblx0XHRcdFx0Y2hpbGQuQWN0aXZlID0gXy5maW5kSW5kZXgoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKSA+PSAwO1xyXG5cdFx0XHRcdGlmICghY2hpbGQuQWN0aXZlKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlQWN0aXZlQ2hpbGRyZW5zKGNoaWxkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGdldENoaWxkcmVuKG5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LlN0YXJ0Lm5hbWUgPT09IG5vZGUubmFtZSkubWFwKHggPT4gdGhpcy5nZXRQb2ludEJ5TmFtZSh4LkVuZC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0aXNEZXBlbmRlbmN5UGFzcyhkZXApIHtcclxuXHRcdFx0dmFyIHN0YXJ0ID0gZGVwLlN0YXJ0O1xyXG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzW3N0YXJ0Lm5hbWVdO1xyXG5cdFx0XHRpZiAoZGVwLlJ1bGVzKSB7XHJcblx0XHRcdFx0aWYgKHN0YXJ0Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKSB7XHJcblx0XHRcdFx0XHRpZiAoXy5pc0FycmF5KGRlcC5SdWxlcy5WYWx1ZXMpICYmIGRlcC5SdWxlcy5WYWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfLmZpbmRJbmRleChkZXAuUnVsZXMuVmFsdWVzLCAoeDogYW55KSA9PiB4LklkID09PSB2YWx1ZS5JZCkgPj0gMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50QnlOYW1lKG5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZCh0aGlzLnBvaW50cywgeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdGdldFZpc2libGVDaGlsZHJlbnM6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0XHR2YXIgY2hpbGRyZW5zID0gdGhpcy5nZXRDaGlsZHJlbihwb2ludCk7XHJcblx0XHRcdHZhciBhY3RpdmVzID0gY2hpbGRyZW5zLmZpbHRlcih4ID0+IHtcclxuXHRcdFx0XHRpZiAoIXgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGRlcHMgPSB0aGlzLmdldFBvaW50SW5EZXBlbmRlbmNpZXMoeCk7XHJcblx0XHRcdFx0c3dpdGNoICh4Lk9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWM6XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5zdGFydDpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8uZmluZEluZGV4KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSkgPj0gMDtcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmFnZ3JlZ2F0b3I6IHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8uZXZlcnkoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YXIgYWN0aXZlQ2hpbGRyZW5zID0gW107XHJcblx0XHRcdGFjdGl2ZXMuZm9yRWFjaCh4ID0+IGFjdGl2ZUNoaWxkcmVucyA9IF8uY29uY2F0KGFjdGl2ZUNoaWxkcmVucywgdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW5zKHgpKSk7XHJcblx0XHRcdHJldHVybiBfLnVuaW9uKGFjdGl2ZXMsIGFjdGl2ZUNoaWxkcmVucyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Z3JhcGgoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJncmFwaC1jaGFuZ2VcIik7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgXCJzeW5jZnVzaW9uXCI7XHJcbmltcG9ydCBtZW1vaXplRGVib3VuY2UsIHsgZGlmZmVyZW5jZSB9IGZyb20gXCIuLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuaW1wb3J0IGFkZERlcGVuZE1vZGFsV2luZG93IGZyb20gXCIuL0RpYWdyYW0vQWRkRGVwZW5kUG9pbnRXaW5kb3dcIjtcclxuaW1wb3J0IGNyZWF0ZUFkZERlcGVuZFBvaW50SGFuZGxlciBmcm9tIFwiLi9EaWFncmFtL0hhbmRsZXIvQWRkRGVwZW5kZWRQb2ludFwiO1xyXG5pbXBvcnQgY3JlYXRlQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlciBmcm9tIFwiLi9EaWFncmFtL0hhbmRsZXIvQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB0ZXN0Q29udHJvbGwgZnJvbSBcIi4vRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsXCI7XHJcbmRlY2xhcmUgY29uc3QgZWo6IGFueTtcclxudmFyIGNvbnN0cmFpbnRzID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRGVmYXVsdCB8IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uRGlhZ3JhbUNvbnN0cmFpbnRzLkZsb2F0RWxlbWVudHM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjY2hhcmFjdGVyaXN0aWMtZGlhZ3JhbVwiLFxyXG5cdHByb3BzOiBbXCJncmFwaFwiLCBcImNsYXNzZXNcIiwgXCJoZWlnaHRcIiwgXCJjaGFyYWN0ZXJpc3RpY3NcIiwgXCJyb2xlc1wiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YnVzOiBuZXcgVnVlKCksXHJcblx0XHRcdHNob3dEZXBlbmRNb2RhbDogZmFsc2UsXHJcblx0XHRcdG9mZnNldFlNYXJnaW46IDI1MCxcclxuXHRcdFx0YWRkTW9kZTogZmFsc2UsXHJcblx0XHRcdGRpYWdyYW1Jbml0OiBmYWxzZSxcclxuXHRcdFx0c2VsZWN0ZWROb2RlczogW10sXHJcblx0XHRcdGlzTW9kYWxXaW5kb3c6IHRydWUsXHJcblx0XHRcdElzT3ZlcnZpZXdBY3RpdmU6IHRydWVcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0aGVpZ2h0UHgoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmhlaWdodCArIFwicHhcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5hbWU7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuZGlhZ3JhbUlkO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1PdmVydmlld0VsSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1FbElkICsgXCJfb3ZlcnZpZXdcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFncmFtSW5pdCA/ICQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKFwiaW5zdGFuY2VcIikgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWROb2RlcyAmJiB0aGlzLnNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMCA/IHRoaXMuc2VsZWN0ZWROb2Rlc1swXSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlVmFsdWVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5maXJzdFNlbGVjdE5vZGUgPyB0aGlzLmZpcnN0U2VsZWN0Tm9kZS5WYWx1ZXMgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZURlcGVuZGVuY3koKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoICYmIHRoaXMuZmlyc3RTZWxlY3ROb2RlID8gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguRW5kLm5hbWUgPT09IHRoaXMuZmlyc3RTZWxlY3ROb2RlLm5hbWUpIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRkZXBlbmRTZWxlY3RlZE5vZGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE5vZGVzID8gdGhpcy5zZWxlY3RlZE5vZGVzLm1hcCh4ID0+IHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRTdGFydDogeCxcclxuXHRcdFx0XHRcdEVuZDogbnVsbCxcclxuXHRcdFx0XHRcdFJ1bGVzOiB7XHJcblx0XHRcdFx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFx0XHRcdFJvbGVzOiBbXVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0pIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRjb25uZWN0b3JzKCkge1xyXG5cdFx0XHR0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZm9yRWFjaCh4ID0+IHRoaXMudXBkYXRlQ29ubmVjdG9yTGFiZWwoeCkpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Db25uZWN0b3JzO1xyXG5cdFx0fSxcclxuXHRcdG5vZGVzKCkge1xyXG5cdFx0XHR0aGlzLmdyYXBoLk5vZGVzLmZvckVhY2goeCA9PiB0aGlzLnVwZGF0ZU5vZGVMYWJlbCh4KSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5vZGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0c2VsZWN0aW9uQ2hhbmdlKHNlbGVjdGVkSXRlbXMpIHtcclxuXHRcdFx0aWYgKCFzZWxlY3RlZEl0ZW1zIHx8IHNlbGVjdGVkSXRlbXMubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSBudWxsO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgc2VsZWN0ZWROb2RlcyA9IHNlbGVjdGVkSXRlbXMuZmlsdGVyKHggPT4geC5fdHlwZSA9PT0gXCJub2RlXCIpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkTm9kZXMgPSBfLm1hcChzZWxlY3RlZE5vZGVzLCAoeDogYW55KSA9PiBfLmZpbmQodGhpcy5ncmFwaC5Ob2RlcywgeSA9PiB5Lm5hbWUgPT09IHgubmFtZSkpO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdFBvaW50QW5kRGVwZW5kZW5jeShvcHRpb25zKSB7XHJcblx0XHRcdHZhciBwb2ludHMgPSBvcHRpb25zLnBvaW50cztcclxuXHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBvcHRpb25zLmRlcGVuZGVuY3k7XHJcblxyXG5cdFx0XHRwb2ludHMuZm9yRWFjaChwb2ludCA9PiB0aGlzLmNvbW1pdFBvaW50KHBvaW50KSk7XHJcblx0XHRcdGRlcGVuZGVuY3kuZm9yRWFjaChkZXAgPT4gdGhpcy5jb21taXRDb25uZWN0aW9uKGRlcCkpO1xyXG5cclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRDb25uZWN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0ZGVwOiBvcHRpb25zXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdFBvaW50KG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1ub2RlXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0cG9pbnQ6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbj86IGFueSkge1xyXG5cdFx0XHR0aGlzLmFkZE1vZGUgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkNoYW5nZVBvaW50TW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHRoaXMuYWRkTW9kZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlTm9kZVByb3A6IG1lbW9pemVEZWJvdW5jZShmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0XHR2YXIgbm9kZSA9IF8uZmluZCh0aGlzLmdyYXBoLk5vZGVzLCBub2RlID0+IG5vZGUubmFtZSA9PT0gYXJncy5lbGVtZW50Lm5hbWUpO1xyXG5cdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJub2RlLXByb3AtY2hhbmdlXCIsIHtcclxuXHRcdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0XHRuYW1lOiBub2RlLm5hbWUsXHJcblx0XHRcdFx0XHRwcm9wTmFtZTogYXJncy5wcm9wZXJ0eU5hbWUsXHJcblx0XHRcdFx0XHRuZXdWYWx1ZTogYXJncy5lbGVtZW50W2FyZ3MucHJvcGVydHlOYW1lXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LCA1MDAsIHggPT4geC5wcm9wZXJ0eU5hbWUpLFxyXG5cdFx0dXBkYXRlTm9kZUxhYmVsKG5vZGUpIHtcclxuXHRcdFx0aWYgKG5vZGUuT3B0aW9ucykge1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0eSA9IHRoaXMuZ2V0Tm9kZVByb3BlcnRpZXMobm9kZSk7XHJcblx0XHRcdFx0Xy5hc3NpZ24obm9kZSwgcHJvcGVydHkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghbm9kZS5sYWJlbHMgfHwgbm9kZS5sYWJlbHMubGVuZ3RoIDw9IDApIHtcclxuXHRcdFx0XHRub2RlLmxhYmVscyA9IFt7XHJcblx0XHRcdFx0XHRuYW1lOiBcImxhYmVsMVwiLFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZSxcclxuXHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0aG9yaXpvbnRhbEFsaWdubWVudDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ib3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0LFxyXG5cdFx0XHRcdFx0dmVydGljYWxBbGlnbm1lbnQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVmVydGljYWxBbGlnbm1lbnQuQm90dG9tLFxyXG5cdFx0XHRcdFx0b2Zmc2V0OiB7XHJcblx0XHRcdFx0XHRcdHk6IDEuMixcclxuXHRcdFx0XHRcdFx0eDogMC44XHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0Ym91bmRhcnlDb25zdHJhaW50czogZmFsc2VcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRub2RlLmxhYmVsc1swXS50ZXh0ID0gbm9kZS5MYWJlbDtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVDb25uZWN0b3JMYWJlbChjb25uZWN0b3IpIHtcclxuXHRcdFx0aWYgKCFjb25uZWN0b3IubGFiZWxzIHx8IGNvbm5lY3Rvci5sYWJlbHMubGVuZ2h0IDw9IDApIHtcclxuXHRcdFx0XHRjb25uZWN0b3IubGFiZWxzID0gW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwibGFiZWwyXCIsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0XHRhbGlnbm1lbnQ6IFwiY2VudGVyXCIsXHJcblx0XHRcdFx0XHRib3VuZGFyeUNvbnN0cmFpbnRzOiBmYWxzZSxcclxuXHRcdFx0XHRcdG9mZnNldDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Qb2ludCgwLCAwKVxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbm5lY3Rvci5sYWJlbHNbMF0udGV4dCA9IGNvbm5lY3Rvci5MYWJlbDtcclxuXHRcdH0sXHJcblx0XHRnb1Rlc3QoKSB7XHJcblx0XHRcdHRoaXMuSXNPdmVydmlld0FjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGdvT3ZlcnZpZXcoKSB7XHJcblx0XHRcdHRoaXMuSXNPdmVydmlld0FjdGl2ZSA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0dGVzdEFjdGl2ZU5vZGUoYWN0aXZlcykge1xyXG5cdFx0XHRpZiAoIV8uaXNBcnJheShhY3RpdmVzKSB8fCAhdGhpcy5kaWFncmFtKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZ3JhcGguTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuXHRcdFx0XHR2YXIgYWN0aXZlID0gbm9kZS5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCB8fCBfLmZpbmRJbmRleChhY3RpdmVzLCB4ID0+IHgubmFtZSA9PT0gbm9kZS5uYW1lKSA+PSAwO1xyXG5cdFx0XHRcdHZhciBwcm9wZXJ0aWVzID0gIXRoaXMuSXNPdmVydmlld0FjdGl2ZSAmJiBhY3RpdmUgPyB7XHJcblx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiI2E2ZjU2OFwiXHJcblx0XHRcdFx0fSA6IHRoaXMuZ2V0Tm9kZVByb3BlcnRpZXMobm9kZSk7XHJcblx0XHRcdFx0dGhpcy5kaWFncmFtLnVwZGF0ZU5vZGUobm9kZS5uYW1lLCBwcm9wZXJ0aWVzKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fSxcclxuXHRcdGdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpIHtcclxuXHRcdFx0c3dpdGNoIChub2RlLk9wdGlvbnMudHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiMyOWMxNWZcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwiZWxsaXBzZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWM6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiIzIwODVjOVwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJyZWN0YW5nbGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmFnZ3JlZ2F0b3I6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiI2VjN2UwZFwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rvcihjb25uZWN0b3IpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcInJlbW92ZS1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdGNvbm5lY3Rvck5hbWU6IGNvbm5lY3Rvci5OYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUobm9kZSkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwicmVtb3ZlLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0bm9kZU5hbWU6IG5vZGUubmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb25uZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0ge1xyXG5cdFx0XHRcdE5hbWU6IG9wdGlvbnMuZWxlbWVudC5OYW1lXHJcblx0XHRcdH07XHJcblx0XHRcdHN3aXRjaCAob3B0aW9ucy5lbmRQb2ludCkge1xyXG5cdFx0XHRcdGNhc2UgXCJ0YXJnZXRFbmRQb2ludFwiOlxyXG5cdFx0XHRcdFx0ZGVwLkVuZCA9IG9wdGlvbnMuY29ubmVjdGlvblxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcInNvdXJjZUVuZFBvaW50XCI6XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0ZGVwXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdHZhciAkdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1cy4kb24oXCJhZGQtZGVwZW5kLXBvaW50XCIsIChvcHRpb25zPzogYW55KSA9PiB0aGlzLm9wZW5BZGREZXBlbmRNb2RhbChvcHRpb25zKSk7XHJcblx0XHR0aGlzLmJ1cy4kb24oXCJjaGFuZ2UtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkNoYW5nZVBvaW50TW9kYWwob3B0aW9ucykpO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1FbElkKS5lakRpYWdyYW0oe1xyXG5cdFx0XHRlbmFibGVDb250ZXh0TWVudTogZmFsc2UsXHJcblx0XHRcdGNvbnN0cmFpbnRzLFxyXG5cdFx0XHR3aWR0aDogXCIxMDAlXCIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHRQeCxcclxuXHRcdFx0bm9kZXM6IHRoaXMubm9kZXMsXHJcblx0XHRcdGNvbm5lY3RvcnM6IHRoaXMuY29ubmVjdG9ycyxcclxuXHRcdFx0ZGVmYXVsdFNldHRpbmdzOiB7XHJcblx0XHRcdFx0bm9kZToge1xyXG5cdFx0XHRcdFx0d2lkdGg6IDY1LFxyXG5cdFx0XHRcdFx0aGVpZ2h0OiA2NSxcclxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb25uZWN0b3I6IHtcclxuXHRcdFx0XHRcdHNlZ21lbnRzOiBbe1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJvcnRob2dvbmFsXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY3JvbGxTZXR0aW5nczoge1xyXG5cdFx0XHRcdGhvcml6b250YWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0dmVydGljYWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0em9vbUZhY3RvcjogMC4yXHJcblx0XHRcdH0sXHJcblx0XHRcdGVuYWJsZUF1dG9TY3JvbGw6IHRydWUsXHJcblx0XHRcdHBhZ2VTZXR0aW5nczoge1xyXG5cdFx0XHRcdHNjcm9sbExpbWl0OiBcImluZmluaXR5XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczoge1xyXG5cdFx0XHRcdHVzZXJIYW5kbGVzOiBbY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KSwgY3JlYXRlQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlcih7XHJcblx0XHRcdFx0XHRidXM6IHRoaXMuYnVzXHJcblx0XHRcdFx0fSldXHJcblx0XHRcdH0sXHJcblx0XHRcdHByb3BlcnR5Q2hhbmdlKGFyZ3MpIHtcclxuXHRcdFx0XHRpZiAoYXJncy5lbGVtZW50VHlwZSA9PT0gXCJub2RlXCIpIHtcclxuXHRcdFx0XHRcdGlmIChfLmluY2x1ZGVzKFtcIm9mZnNldFhcIiwgXCJvZmZzZXRZXCJdLCBhcmdzLnByb3BlcnR5TmFtZSkpIHtcclxuXHRcdFx0XHRcdFx0JHRoaXMudXBkYXRlTm9kZVByb3AoYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3Rpb25DaGFuZ2U6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRcdFx0JHRoaXMuc2VsZWN0aW9uQ2hhbmdlKG9wdGlvbnMuc2VsZWN0ZWRJdGVtcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbm5lY3RvckNvbGxlY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmNoYW5nZVR5cGUgPT09IFwicmVtb3ZlXCIpIHtcclxuXHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNvbm5lY3RvcihvcHRpb25zLmVsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0bm9kZUNvbGxlY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmNoYW5nZVR5cGUgPT09IFwicmVtb3ZlXCIpIHtcclxuXHRcdFx0XHRcdCR0aGlzLnJlbW92ZU5vZGUob3B0aW9ucy5lbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbm5lY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdCR0aGlzLmNvbm5lY3Rpb25DaGFuZ2Uob3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1PdmVydmlld0VsSWQpLmVqT3ZlcnZpZXcoe1xyXG5cdFx0XHRzb3VyY2VJRDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuZGlhZ3JhbUluaXQgPSB0cnVlO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0YWRkRGVwZW5kTW9kYWxXaW5kb3csXHJcblx0XHR0ZXN0Q29udHJvbGxcclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRncmFwaCh2YWwpIHtcclxuXHRcdFx0dmFyIGRpYWdyYW0gPSB0aGlzLmRpYWdyYW07XHJcblx0XHRcdHZhciBub2RlcyA9IGRpYWdyYW0ubm9kZXMoKTtcclxuXHRcdFx0dmFyIGNvbm5lY3RvcnMgPSBkaWFncmFtLmNvbm5lY3RvcnMoKTtcclxuXHRcdFx0dmFsLk5vZGVzLmZvckVhY2goeCA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGVOb2RlTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQobm9kZXMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5uYW1lKTtcclxuXHRcdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZOb2RlID0gZGlmZmVyZW5jZSh4LCBub2RlKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmTm9kZSkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZU5vZGUobm9kZS5uYW1lLCBkaWZmTm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgZGlmZkxhYmVsID0gZGlmZmVyZW5jZSh4LmxhYmVsc1swXSwgbm9kZS5sYWJlbHNbMF0pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKG5vZGUubmFtZSwgbm9kZS5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFsLkNvbm5lY3RvcnMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZUNvbm5lY3RvckxhYmVsKHgpO1xyXG5cdFx0XHRcdHZhciBjb25uID0gXy5maW5kKGNvbm5lY3RvcnMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5OYW1lKTtcclxuXHRcdFx0XHRpZiAoY29ubikge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZDb25uID0gZGlmZmVyZW5jZSh4LCBjb25uKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmQ29ubikge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUNvbm5lY3Rvcihjb25uLm5hbWUsIGRpZmZDb25uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChjb25uLmxhYmVscy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBjb25uLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRcdGlmIChkaWZmTGFiZWwpIHtcclxuXHRcdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKGNvbm4ubmFtZSwgY29ubi5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0uYWRkTGFiZWwoY29ubi5uYW1lLCB4LmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFBvaW50czogQXJyYXk8QmFzZVBvaW50PjtcclxuXHREZXBlbmRlbmNpZXM6IEFycmF5PERlcGVuZGVuY3k+O1xyXG59IiwiaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWMge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRWYWx1ZXM6IEFycmF5PENoYXJhY3RlcmlzdGljVmFsdWU+O1xyXG59IiwiaW1wb3J0IHsgR3JhcGggfSBmcm9tIFwiLi9HcmFwaFwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpYyB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljXCI7XHJcbmltcG9ydCB7IElSb2xlIH0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb290U3RhdGUge1xyXG5cdEdyYXBoczogQXJyYXk8R3JhcGg+O1xyXG5cdENoYXJhY3RlcmlzdGljczogQXJyYXk8Q2hhcmFjdGVyaXN0aWM+O1xyXG5cdFJvbGVzOiBBcnJheTxJUm9sZT47XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG5cdG5hbWU6IHN0cmluZ1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb25uZWN0b3Ige1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRzb3VyY2VOb2RlOiBzdHJpbmc7XHJcblx0dGFyZ2V0Tm9kZTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vQ29ubmVjdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNmR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZyxcclxuXHROb2RlczogQXJyYXk8Tm9kZT47XHJcblx0Q29ubmVjdG9yczogQXJyYXk8Q29ubmVjdG9yPjtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSwgR2V0dGVyVHJlZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgU2ZHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGhcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxudHlwZSBHcmFwaENvbnRleHQgPSBBY3Rpb25Db250ZXh0PFJvb3RTdGF0ZSwgUm9vdFN0YXRlPjtcclxuXHJcbmV4cG9ydCBjb25zdCBncmFwaE1vZHVsZSA9IHtcclxuXHRuYW1lc3BhY2VkOiB0cnVlLFxyXG5cclxuXHRzdGF0ZToge1xyXG5cdFx0R3JhcGhzOiBbe1xyXG5cdFx0XHROYW1lOiBcIkdyYXBoMVwiLFxyXG5cdFx0XHRQb2ludHM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiA2MCxcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLnN0YXJ0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdLFxyXG5cdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHR9XSxcclxuXHRcdENoYXJhY3RlcmlzdGljczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDFcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMlwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgM1wiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA0XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDZcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA3XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOFwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDlcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdF0sXHJcblx0XHRSb2xlczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAxXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMlwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDNcIlxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHRnZXR0ZXJzOiB7XHJcblx0XHRnZXRHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHM7XHJcblx0XHR9LFxyXG5cdFx0Z3JhcGhDb3VudChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHMubGVuZ3RoO1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZShzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAobmFtZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0dmFyIGdyYXBoID0gXy5maXJzdChzdGF0ZS5HcmFwaHMuZmlsdGVyKHggPT4geC5OYW1lID09PSBuYW1lKSk7XHJcblx0XHRcdFx0cmV0dXJuIGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGUpKGdyYXBoKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAoZ3JhcGg6IEdyYXBoKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdE5hbWU6IGdyYXBoLk5hbWUsXHJcblx0XHRcdFx0XHROb2RlczogZ3JhcGguUG9pbnRzLFxyXG5cdFx0XHRcdFx0Q29ubmVjdG9yczogXy5tYXAoZ3JhcGguRGVwZW5kZW5jaWVzLCBmdW5jdGlvbiAoY29uKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLm1lcmdlKHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBjb24uTmFtZSxcclxuXHRcdFx0XHRcdFx0XHRzb3VyY2VOb2RlOiBjb24uU3RhcnQubmFtZSxcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXROb2RlOiBjb24uRW5kLm5hbWVcclxuXHRcdFx0XHRcdFx0fSwgY29uKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkNoYXJhY3RlcmlzdGljcztcclxuXHRcdH0sXHJcblx0XHRnZXRSb2xlcyhzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5Sb2xlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG11dGF0aW9uczoge1xyXG5cdFx0YWRkR3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogR3JhcGgpIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLnB1c2goaXRlbSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlUG9pbnRJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLlBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ucG9pbnQubmFtZSk7XHJcblxyXG5cdFx0XHRpZiAoZHVwbGljYXRlUG9pbnRJbmRleCA8IDApIHtcclxuXHRcdFx0XHRncmFwaC5Qb2ludHMucHVzaChpdGVtLnBvaW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlUG9pbnQgPSBncmFwaC5Qb2ludHNbZHVwbGljYXRlUG9pbnRJbmRleF07XHJcblx0XHRcdFx0Xy5hc3NpZ24oZHVwbGljYXRlUG9pbnQsIGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5zcGxpY2UoZHVwbGljYXRlUG9pbnRJbmRleCwgMSwgZHVwbGljYXRlUG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YWRkRGVwZW5kZW5jeShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdC8vVE9ETzog0J/RgNC40LzQtdC90LjRgtGMINC40LfQvNC10L3QuNC1INC6INC00LjQsNCz0YDQsNC80LVcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlRGVwSW5kZXggPSBfLmZpbmRJbmRleChncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBpdGVtLmRlcC5OYW1lKTtcclxuXHRcdFx0aWYgKGR1cGxpY2F0ZURlcEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5wdXNoKGl0ZW0uZGVwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlRGVwID0gZ3JhcGguRGVwZW5kZW5jaWVzW2R1cGxpY2F0ZURlcEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVEZXAsIGl0ZW0uZGVwKTtcclxuXHRcdFx0XHRncmFwaC5EZXBlbmRlbmNpZXMuc3BsaWNlKGR1cGxpY2F0ZURlcEluZGV4LCAxLCBkdXBsaWNhdGVEZXApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlTm9kZVByb3BlcnR5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKS5Qb2ludHM7XHJcblx0XHRcdHZhciBwb2ludCA9IF8uZmluZChwb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLm5hbWUpO1xyXG5cdFx0XHRWdWUuc2V0KHBvaW50LCBpdGVtLnByb3BOYW1lLCBpdGVtLm5ld1ZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKHN0YXRlOiBSb290U3RhdGUsIG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmNvbm5lY3Rvck5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUoc3RhdGU6IFJvb3RTdGF0ZSwgb3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5Qb2ludHMsIHggPT4geC5uYW1lID09PSBvcHRpb25zLm5vZGVOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCB7IHJlYWQsIGNvbW1pdCB9ID1cclxuXHRnZXRTdG9yZUFjY2Vzc29yczxSb290U3RhdGUsIFJvb3RTdGF0ZT4oXCJncmFwaFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgcmVhZEdyYXBoQ291bnQgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ3JhcGhDb3VudCk7XHJcbmV4cG9ydCBjb25zdCBnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGdldENoYXJhY3RlcmlzdGljc0xpc3QgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCk7XHJcbmV4cG9ydCBjb25zdCBnZXRSb2xlcyA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRSb2xlcyk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkR3JhcGggPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZEdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGRQb2ludCk7XHJcbmV4cG9ydCBjb25zdCBhZGREZXBlbmRlbmN5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGREZXBlbmRlbmN5KTtcclxuZXhwb3J0IGNvbnN0IGNoYW5nZU5vZGVQcm9wZXJ0eSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuY2hhbmdlTm9kZVByb3BlcnR5KTtcclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNvbm5lY3Rpb24gPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLnJlbW92ZUNvbm5lY3Rpb24pO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9kZSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMucmVtb3ZlTm9kZSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IHsgZ3JhcGhNb2R1bGUgYXMgZ3JhcGggfSBmcm9tIFwiLi9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCBWdWV4UGVyc2lzdGVuY2UgZnJvbSBcInZ1ZXgtcGVyc2lzdFwiO1xyXG5cclxuVnVlLnVzZShWdWV4KTtcclxuXHJcbmNvbnN0IHZ1ZXhMb2NhbCA9IG5ldyBWdWV4UGVyc2lzdGVuY2Uoe1xyXG5cdHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gbmV3IFZ1ZXguU3RvcmU8Um9vdFN0YXRlPih7XHJcblx0XHRtb2R1bGVzOiB7XHJcblx0XHRcdGdyYXBoXHJcblx0XHR9LFxyXG5cdFx0cGx1Z2luczogW3Z1ZXhMb2NhbC5wbHVnaW5dLFxyXG5cdFx0c3RyaWN0OiB0cnVlXHJcblx0fSlcclxufTsiLCIvLyBDbGllbnRBcHAvY29tcG9uZW50cy9BcHBIZWxsby50c1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyaXN0aWNEaWFncmFtIGZyb20gXCIuL0NoYXJhY3RlcmlzdGljRGlhZ3JhbVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCIuLi9TdG9yZS9Sb290U3RvcmVcIjtcclxuaW1wb3J0ICogYXMgZ3JhcGggZnJvbSBcIi4uL1N0b3JlL0dyYXBoU3RvcmVcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG5cclxudmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoKTtcclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6ICcjYXBwLWhlbGxvLXRlbXBsYXRlJyxcclxuXHRzdG9yZSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bWVzc2FnZTogXCJ0ZXN0IG1lc3NhZ2VcIlxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHR0ZXN0KCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGgucmVhZEdyYXBoKHRoaXMuJHN0b3JlKVswXS5Qb2ludHMubWFwKHggPT4geC5MYWJlbCk7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbXMoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5yZWFkR3JhcGgodGhpcy4kc3RvcmUpLm1hcCh4ID0+IGdyYXBoLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHRoaXMuJHN0b3JlKSh4KSk7XHJcblx0XHR9LFxyXG5cdFx0Y2hhcmFjdGVyaXN0aWNzKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGguZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCh0aGlzLiRzdG9yZSk7XHJcblx0XHR9LFxyXG5cdFx0cm9sZXMoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5nZXRSb2xlcyh0aGlzLiRzdG9yZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRhZGRHcmFwaCgpIHtcclxuXHRcdFx0Z3JhcGguYWRkR3JhcGgodGhpcy4kc3RvcmUsIHtcclxuXHRcdFx0XHROYW1lOiBcIkdyYXBoXCIgKyAoZ3JhcGgucmVhZEdyYXBoQ291bnQodGhpcy4kc3RvcmUpICsgMSksXHJcblx0XHRcdFx0UG9pbnRzOiBbe1xyXG5cdFx0XHRcdFx0bmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiAyMCxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkTm9kZShub2RlOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHRncmFwaC5hZGRQb2ludCh0aGlzLiRzdG9yZSwgbm9kZSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkQ29ubmVjdGlvbihjb25uZWN0OiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdGdyYXBoLmFkZERlcGVuZGVuY3kodGhpcy4kc3RvcmUsIGNvbm5lY3QpO1xyXG5cdFx0fSxcclxuXHRcdG9uTm9kZVByb3BDaGFuZ2Uob3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHRncmFwaC5jaGFuZ2VOb2RlUHJvcGVydHkodGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rpb24ob3B0aW9uczoge2dyYXBoOiBzdHJpbmcsIGNvbm5lY3Rvck5hbWU6IHN0cmluZ30pIHtcclxuXHRcdFx0Z3JhcGgucmVtb3ZlQ29ubmVjdGlvbih0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlTm9kZShvcHRpb25zOiB7IGdyYXBoOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcgfSkge1xyXG5cdFx0XHRncmFwaC5yZW1vdmVOb2RlKHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9LFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0Q2hhcmFjdGVyaXN0aWNEaWFncmFtXHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBBcHBIZWxsbyBmcm9tIFwiLi9jb21wb25lbnRzL0FwcEhlbGxvXCI7XHJcbmltcG9ydCBsb2Rhc2hNaXhpbiBmcm9tIFwiLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuXHJcbi8vUm9vdCBDb21wb25lbnRcclxubGV0IHYgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNhcHAtcm9vdFwiLFxyXG5cdHRlbXBsYXRlOiAnPEFwcEhlbGxvLz4nLFxyXG4gICAgLy9yZW5kZXI6IGggPT4gaChBcHBIZWxsb0NvbXBvbmVudCksXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRBcHBIZWxsb1xyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1BvaW50IGV4dGVuZHMgQmFzZVBvaW50IHtcclxuXHRDaGFyYWN0ZXJpc3RpYzogQ2hhcmFjdGVyaXN0aWM7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxuXHRSZXF1aXJlZD86IGJvb2xlYW47XHJcblx0RGVmYXVsdFZhbHVlPzogQ2hhcmFjdGVyaXN0aWNWYWx1ZTtcclxufSIsImltcG9ydCB7RGVwZW5kZW5jeX0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQge0lSb2xlfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZXBlbmRlbmN5Um9sZSB7XHJcblx0RGVwZW5kZW5jeTogRGVwZW5kZW5jeTtcclxuXHRSb2xlOiBJUm9sZTtcclxufSJdfQ==