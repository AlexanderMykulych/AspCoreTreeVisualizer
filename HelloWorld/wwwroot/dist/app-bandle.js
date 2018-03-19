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
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll", "mixins/IdGenerator", "Model/PointType", "components/AsyncSelect/AsyncSelectComponent"], function (exports_6, context_6) {
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
            selectedCharacteristic: null,
            uniqId: IdGenerator_2.uniqId(),
            offsetYDelta: 250,
            addExistCharacteristic: false,
            existPoint: null
        };
    }
    var vue_3, lodash_4, RuleControll_1, IdGenerator_2, PointType_1, AsyncSelectComponent_1;
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
            },
            function (AsyncSelectComponent_1_1) {
                AsyncSelectComponent_1 = AsyncSelectComponent_1_1;
            }
        ],
        execute: function () {
            exports_6("default", vue_3.default.extend({
                template: "#add-depend-point",
                props: ["show", "id", "dependency", "characteristics", "roles", "defaultPoint", "defaultDependency", "isModalWindow", "points"],
                components: {
                    RuleControll: RuleControll_1.default,
                    AsyncSelect: AsyncSelectComponent_1.default
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
System.register("Store/GraphStore", ["vue", "vuex-typescript", "lodash", "Model/PointType", "mixins/IdGenerator"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var vue_6, vuex_typescript_1, lodash_7, PointType_4, IdGenerator_4, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty, removeConnection, removeNode;
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
            function (PointType_4_1) {
                PointType_4 = PointType_4_1;
            },
            function (IdGenerator_4_1) {
                IdGenerator_4 = IdGenerator_4_1;
            }
        ],
        execute: function () {
            exports_21("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [{
                            Name: "Graph1",
                            Points: [
                                {
                                    name: IdGenerator_4.uniqId(),
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
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType", "mixins/IdGenerator"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var vue_8, CharacteristicDiagram_1, RootStore_1, graph, PointType_5, IdGenerator_5, store;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
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
            function (IdGenerator_5_1) {
                IdGenerator_5 = IdGenerator_5_1;
            }
        ],
        execute: function () {
            store = RootStore_1.createStore();
            exports_23("default", vue_8.default.extend({
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
                                    name: IdGenerator_5.uniqId(),
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
System.register("index", ["vue", "components/AppHello", "vue-async-data-2"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var vue_9, AppHello_1, vue_async_data_2_1, v;
    return {
        setters: [
            function (vue_9_1) {
                vue_9 = vue_9_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            },
            function (vue_async_data_2_1_1) {
                vue_async_data_2_1 = vue_async_data_2_1_1;
            }
        ],
        execute: function () {
            //Plugin
            vue_9.default.use(vue_async_data_2_1.default.AsyncDataPlugin);
            //Root Component
            v = new vue_9.default({
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
System.register("Model/CharacteristicPoint", [], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/IDependencyRole", [], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQXN5bmNTZWxlY3QvQXN5bmNTZWxlY3RDb21wb25lbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL0FkZERlcGVuZFBvaW50V2luZG93LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0FkZERlcGVuZGVkUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL0hhbmRsZXIvQ2hhbmdlUG9pbnRTZXR0aW5nSGFuZGxlci50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9DaGFyYWN0ZXJpc3RpY1ZhbHVlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1JvbGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvRGVwZW5kZW5jeS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9CYXNlUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1Rlc3QvR3JhcGhUZXN0Q29udHJvbGwudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9DaGFyYWN0ZXJpc3RpY0RpYWdyYW0udHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWMudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUm9vdFN0YXRlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Db25uZWN0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL0dyYXBoU3RvcmUudHMiLCIuLi8uLi9DbGllbnRBcHAvU3RvcmUvUm9vdFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQXBwSGVsbG8udHMiLCIuLi8uLi9DbGllbnRBcHAvaW5kZXgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNQb2ludC50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9JRGVwZW5kZW5jeVJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0EseUJBQXdDLElBQUksRUFBRSxJQUFRLEVBQUUsUUFBUSxFQUFFLE9BQVk7UUFBaEMscUJBQUEsRUFBQSxRQUFRO1FBQVksd0JBQUEsRUFBQSxZQUFZO1FBQzdFLElBQUksR0FBRyxHQUFHLGdCQUFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUEvQixDQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFBO0lBQ0YsQ0FBQzs7Ozs7Ozs7OztZQUVELHdCQUFhLFVBQVUsR0FBRyxVQUFTLE1BQU0sRUFBRSxJQUFJO2dCQUM5QyxpQkFBaUIsTUFBTSxFQUFFLElBQUk7b0JBQzVCLE1BQU0sQ0FBQyxnQkFBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUc7d0JB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K0M7d0JBQy9ELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM5QyxDQUFDO29CQUNELFVBQVUsWUFBQyxPQUE0Qzt3QkFDdEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN4QyxDQUFDO2lCQUNEO2dCQUNFLFVBQVUsRUFBRTtvQkFDZCxxQkFBcUIsaUNBQUE7aUJBQ2xCO2FBQ0osQ0FBQztRQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDaEVKLFFBQVE7WUFDUixhQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFHbkMsZ0JBQWdCO1lBQ1osQ0FBQyxHQUFHLElBQUksYUFBRyxDQUFDO2dCQUNaLEVBQUUsRUFBRSxXQUFXO2dCQUNsQixRQUFRLEVBQUUsYUFBYTtnQkFDcEIsb0NBQW9DO2dCQUNwQyxVQUFVLEVBQUU7b0JBQ2QsUUFBUSxvQkFBQTtpQkFDTDthQUNKLENBQUMsQ0FBQztRQUFBLENBQUM7Ozs7Ozs7OztRQ1ZILENBQUM7Ozs7Ozs7OztRQ0hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lbW9pemVEZWJvdW5jZShmdW5jLCB3YWl0ID0gMCwgcmVzb2x2ZXIsIG9wdGlvbnMgPSB7fSkge1xyXG5cdHZhciBtZW0gPSBfLm1lbW9pemUoKCkgPT4gXy5kZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSwgcmVzb2x2ZXIpO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSBmdW5jdGlvbihvYmplY3QsIGJhc2UpIHtcblx0ZnVuY3Rpb24gY2hhbmdlcyhvYmplY3QsIGJhc2UpIHtcblx0XHRyZXR1cm4gXy50cmFuc2Zvcm0ob2JqZWN0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG5cdFx0XHRpZiAoIV8uaXNFcXVhbCh2YWx1ZSwgYmFzZVtrZXldKSkge1xuXHRcdFx0XHR2YXIgcmVzID0gKF8uaXNPYmplY3QodmFsdWUpICYmIF8uaXNPYmplY3QoYmFzZVtrZXldKSkgPyBjaGFuZ2VzKHZhbHVlLCBiYXNlW2tleV0pIDogdmFsdWU7XG5cdFx0XHRcdGlmICghXy5pc0VtcHR5KHJlcykpIHtcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHZhciBjaGFuZ2VkID0gY2hhbmdlcyhvYmplY3QsIGJhc2UpO1xuXHRyZXR1cm4gXy5pc0VtcHR5KGNoYW5nZWQpID8gbnVsbCA6IGNoYW5nZWQ7XG59IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XHJcbi8v0J/RgNC4INC60L7QvNC/0LjQu9GP0YbQuNC4IHR5cGVzY3JpcHQg0LLRi9GB0LrQsNC60LjQstCw0LXRgiDQvtGI0LjQsdC60LAgXCLQvdC1INC90LDRhdC+0LTQuNGCINGB0LLQvtC50YHRgtCy0LAgdG9nZ2xlc1JvbGVzXCIg0YLQvtC70YzQutC+INC60L7Qs9C00LAgcHJvcHM6IE9iamVjdFxyXG4vL9Ce0LHRhdC+0LTQvdC+0LUg0YDQtdGI0LXQvdC40LVcclxudmFyIFZ1ZVA6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZVAuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRwb2ludDogT2JqZWN0LFxyXG5cdFx0aW5kZXg6IFtOdW1iZXIsIFN0cmluZ10sXHJcblx0XHRyb2xlczogQXJyYXksXHJcblx0XHRyb2xlV2l0aERldGFpbDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFJvbGU6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRvblJvbGVTZWxlY3RDbGljaygpIHtcclxuXHRcdFx0dGhpcy5hZGRSb2xlKHtcclxuXHRcdFx0XHRyb2xlOiB0aGlzLnNlbGVjdGVkUm9sZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGRSb2xlKHJvbGVJbmZvKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnB1c2gocm9sZUluZm8pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZVJvbGVCeUluZGV4KGluZGV4KSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dW5pcSgpIHtcclxuXHRcdFx0cmV0dXJuIFwiX1wiICsgdGhpcy5pbmRleDtcclxuXHRcdH0sXHJcblx0XHRleGlzdHNSb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucm9sZXMuZmlsdGVyKHggPT5cclxuXHRcdFx0XHRfLmZpbmRJbmRleCh0aGlzLnRvZ2dsZXNSb2xlcywgKHk6IGFueSkgPT4geS5yb2xlLk5hbWUgPT0geC5OYW1lKSA8IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1ZhbHVlcykgPyBbXSA6IHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1JvbGVzKSA/IFtdIDogdGhpcy50b2dnbGVzUm9sZXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwidXBkYXRlOnRvZ2dsZXNSb2xlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdW5pcUlkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBfLnVuaXF1ZUlkKCkgKyBcIl9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbn07IiwiXHJcbmV4cG9ydCBlbnVtIFBvaW50VHlwZSB7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGNoYXJhY3RlcmlzdGljLFxyXG5cdGFnZ3JlZ2F0b3JcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi8uLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuXHJcbnZhciBfVnVlOiBhbnkgPSBWdWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FzeW5jLXNlbGVjdFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHRpZDoge1xyXG5cdFx0XHR0eXBlOiBTdHJpbmcsXHJcblx0XHRcdGRlZmF1bHQ6IHVuaXFJZCgpXHJcblx0XHR9LFxyXG5cdFx0dXJsOiBTdHJpbmdcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRzeW5jX2lkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJzZWxlY3RfXCIgKyB0aGlzLmlkO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0YXN5bmNEYXRhOiB7XHJcblx0XHR1c2VyTmFtZSgpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KF8gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKE1hdGgucmFuZG9tKCkgPiAwLjUpIHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgncmlzYScpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmVqZWN0KCdmZXRjaCBlcnJvci4uLicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgUnVsZUNvbnRyb2xsIGZyb20gXCIuL1J1bGVDb250cm9sbFwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IEFzeW5jU2VsZWN0IGZyb20gXCIuLi9Bc3luY1NlbGVjdC9Bc3luY1NlbGVjdENvbXBvbmVudFwiO1xyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuZGVjbGFyZSBjb25zdCBPYmplY3Q6IGFueTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cG9pbnQ6IHtcclxuXHRcdFx0bmFtZTogbnVsbCxcclxuXHRcdFx0RGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0XHRMYWJlbDogbnVsbCxcclxuXHRcdFx0Q2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFJvbGVzOiBudWxsLFxyXG5cdFx0XHRSZXF1aXJlZDogZmFsc2UsXHJcblx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWNcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHNlbGVjdGVkQ2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHR1bmlxSWQ6IHVuaXFJZCgpLFxyXG5cdFx0b2Zmc2V0WURlbHRhOiAyNTAsXHJcblx0XHRhZGRFeGlzdENoYXJhY3RlcmlzdGljOiBmYWxzZSxcclxuXHRcdGV4aXN0UG9pbnQ6IG51bGxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjYWRkLWRlcGVuZC1wb2ludFwiLFxyXG5cdHByb3BzOiBbXCJzaG93XCIsIFwiaWRcIiwgXCJkZXBlbmRlbmN5XCIsIFwiY2hhcmFjdGVyaXN0aWNzXCIsIFwicm9sZXNcIiwgXCJkZWZhdWx0UG9pbnRcIiwgXCJkZWZhdWx0RGVwZW5kZW5jeVwiLCBcImlzTW9kYWxXaW5kb3dcIiwgXCJwb2ludHNcIl0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0UnVsZUNvbnRyb2xsLFxyXG5cdFx0QXN5bmNTZWxlY3RcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRlbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjYWRkLWRlcGVuZC1wb2ludF9cIiArIHRoaXMuaWQ7XHJcblx0XHR9LFxyXG5cdFx0bWFpbkNsYXNzT2JqZWN0KCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG1vZGFsOiB0aGlzLmlzTW9kYWxXaW5kb3csXHJcblx0XHRcdFx0ZmFkZTogdGhpcy5pc01vZGFsV2luZG93XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0bW9kYWxNYXhXaWR0aCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNNb2RhbFdpbmRvdyA/IFwiODAlXCIgOiBcIjEwMCVcIjtcclxuXHRcdH0sXHJcblx0XHRlbmRQb2ludCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkRXhpc3RDaGFyYWN0ZXJpc3RpYyA/IHRoaXMuZXhpc3RQb2ludCA6IF8ubWVyZ2UodGhpcy5wb2ludCwgeyBuYW1lOiB1bmlxSWQoKSB9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGE6IGdldERlZmF1bHRWYWx1ZSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0JCh0aGlzLmVsSWQpXHJcblx0XHRcdC5vbignaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gdGhpcy5jbG9zZSgpKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGNsb3NlKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY2xvc2VcIik7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcy4kZGF0YSwgZ2V0RGVmYXVsdFZhbHVlKCkpO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KCkge1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IHRoaXMuZGVwZW5kZW5jeTtcclxuXHRcdFx0dmFyIG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0QnlEZXBlbmRlbmN5KHRoaXMuZGVwZW5kZW5jeSk7XHJcblxyXG5cdFx0XHR2YXIgcG9pbnRzID0gW107XHJcblx0XHRcdHZhciBwb2ludCA9IF8ubWVyZ2UodGhpcy5lbmRQb2ludCwge1xyXG5cdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdG9mZnNldFk6IG9mZnNldC55ICsgdGhpcy5vZmZzZXRZRGVsdGFcclxuXHRcdFx0fSk7XHJcblx0XHRcdHZhciBlbmRQb2ludDogYW55ID0gcG9pbnQ7XHJcblxyXG5cdFx0XHRwb2ludHMucHVzaChwb2ludCk7XHJcblx0XHRcdGlmIChkZXBlbmRlbmN5Lmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0XHR2YXIgYWRkUG9pbnQgPSB7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIkFuZFwiLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuYWdncmVnYXRvclxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IG9mZnNldC54LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YSAvIDJcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBvaW50cy5wdXNoKGFkZFBvaW50KTtcclxuXHRcdFx0XHRlbmRQb2ludCA9IGFkZFBvaW50O1xyXG5cdFx0XHRcdGRlcGVuZGVuY3kucHVzaCh7XHJcblx0XHRcdFx0XHRFbmQ6IHBvaW50LFxyXG5cdFx0XHRcdFx0U3RhcnQ6IGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRSdWxlczogW11cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkZXBlbmRlbmN5LmZpbHRlcih4ID0+IHguRW5kID09PSBudWxsKS5mb3JFYWNoKHggPT4geC5FbmQgPSBlbmRQb2ludCk7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogcG9pbnRzLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IGRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fSxcclxuXHRcdGNoYW5nZVBvaW50KCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiY29tbWl0LXBvaW50XCIsIHtcclxuXHRcdFx0XHRwb2ludHM6IFt0aGlzLnBvaW50XSxcclxuXHRcdFx0XHRkZXBlbmRlbmN5OiB0aGlzLmRlcGVuZGVuY3lcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b25SdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSB2YWwuaW5kZXg7XHJcblx0XHRcdFZ1ZS5zZXQodGhpcy5ydWxlcywgaW5kZXgsIHZhbCk7XHJcblx0XHR9LFxyXG5cdFx0b25TZWxlY3RDaGFyUnVsZUNoYW5nZSh2YWwpIHtcclxuXHRcdFx0Ly90aGlzLnBvaW50LlZhbHVlcyA9IHZhbC5WYWx1ZXM7XHJcblx0XHRcdC8vdGhpcy5wb2ludC5Sb2xlcyA9IHZhbC5Sb2xlcztcclxuXHRcdH0sXHJcblx0XHRnZXRPZmZzZXRCeURlcGVuZGVuY3koZGVwZW5kZW5jaWVzKSB7XHJcblx0XHRcdHZhciBkZXA6IGFueSA9IF8uZmlyc3QoZGVwZW5kZW5jaWVzKTtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR4OiBkZXAuU3RhcnQub2Zmc2V0WCxcclxuXHRcdFx0XHR5OiBkZXAuU3RhcnQub2Zmc2V0WVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHNob3codmFsKSB7XHJcblx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJzaG93XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcImhpZGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkZWZhdWx0UG9pbnQoZGVmYXVsdFBvaW50KSB7XHJcblx0XHRcdGlmIChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0XHR0aGlzLnBvaW50ID0gZGVmYXVsdFBvaW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBhZGREZXBlbmRQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJhZGQtZGVwZW5kLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQWRkXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbUxlZnQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTE0LjYxMywxMGMwLDAuMjMtMC4xODgsMC40MTktMC40MTksMC40MTlIMTAuNDJ2My43NzRjMCwwLjIzLTAuMTg5LDAuNDItMC40MiwwLjQycy0wLjQxOS0wLjE4OS0wLjQxOS0wLjQydi0zLjc3NEg1LjgwNmMtMC4yMywwLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDE5czAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5aDMuNzc1VjUuODA2YzAtMC4yMywwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOXMwLjQyLDAuMTg5LDAuNDIsMC40MTl2My43NzVoMy43NzRDMTQuNDI1LDkuNTgxLDE0LjYxMyw5Ljc3LDE0LjYxMywxMCBNMTcuOTY5LDEwYzAsNC40MDEtMy41NjcsNy45NjktNy45NjksNy45NjljLTQuNDAyLDAtNy45NjktMy41NjctNy45NjktNy45NjljMC00LjQwMiwzLjU2Ny03Ljk2OSw3Ljk2OS03Ljk2OUMxNC40MDEsMi4wMzEsMTcuOTY5LDUuNTk4LDE3Ljk2OSwxMCBNMTcuMTMsMTBjMC0zLjkzMi0zLjE5OC03LjEzLTcuMTMtNy4xM1MyLjg3LDYuMDY4LDIuODcsMTBjMCwzLjkzMywzLjE5OCw3LjEzLDcuMTMsNy4xM1MxNy4xMywxMy45MzMsMTcuMTMsMTBcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBDaGFuZ2VQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbj86IGFueSkge1xyXG5cdHZhciBmdW5jID0gKGZ1bmN0aW9uIChiYXNlOiBhbnkpIHtcclxuXHRcdGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uZXh0ZW5kKEFkZERlcGVuZFBvaW50LCBiYXNlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBBZGREZXBlbmRQb2ludChuYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0YmFzZS5jYWxsKHRoaXMsIG5hbWUpO1xyXG5cdFx0XHR0aGlzLnNpbmdsZUFjdGlvbiA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvbmVkTm9kZXMgPSBbXTtcclxuXHRcdFx0dGhpcy5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHRcdH1cclxuXHRcdEFkZERlcGVuZFBvaW50LnByb3RvdHlwZS5tb3VzZXVwID0gZnVuY3Rpb24gKGV2dDogYW55KSB7XHJcblx0XHRcdGJhc2UucHJvdG90eXBlLm1vdXNldXAuY2FsbCh0aGlzLCBldnQpO1xyXG5cdFx0XHRvcHRpb24uYnVzLiRlbWl0KFwiY2hhbmdlLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQ2hhbmdlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbVJpZ2h0O1xyXG5cdGFkZERlcGVuZFBvaW50LnZpc2libGUgPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LmVuYWJsZU11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTAsMi4xNzJjLTQuMzI0LDAtNy44MjgsMy41MDQtNy44MjgsNy44MjhTNS42NzYsMTcuODI4LDEwLDE3LjgyOGM0LjMyNCwwLDcuODI4LTMuNTA0LDcuODI4LTcuODI4UzE0LjMyNCwyLjE3MiwxMCwyLjE3Mk0xMCwxNy4wMDRjLTMuODYzLDAtNy4wMDQtMy4xNDEtNy4wMDQtNy4wMDNTNi4xMzcsMi45OTcsMTAsMi45OTdjMy44NjIsMCw3LjAwNCwzLjE0MSw3LjAwNCw3LjAwNFMxMy44NjIsMTcuMDA0LDEwLDE3LjAwNE0xMCw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MlM5LjIwNSwxMS40NDMsMTAsMTEuNDQzczEuNDQxLTAuNjQ3LDEuNDQxLTEuNDQzUzEwLjc5NSw4LjU1OSwxMCw4LjU1OSBNMTAsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTOS42Niw5LjM4MiwxMCw5LjM4MlMxMC42MTgsOS42NjEsMTAuNjE4LDEwUzEwLjM0LDEwLjYxOSwxMCwxMC42MTkgTTE0LjEyLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ3LDEuNDQzLDEuNDQyLDEuNDQzczEuNDQyLTAuNjQ3LDEuNDQyLTEuNDQzUzE0LjkxNSw4LjU1OSwxNC4xMiw4LjU1OSBNMTQuMTIsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThzMC4yNzgtMC42MTgsMC42MTgtMC42MThTMTQuNzM4LDkuNjYxLDE0LjczOCwxMFMxNC40NiwxMC42MTksMTQuMTIsMTAuNjE5IE01Ljg4LDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ2LDEuNDQzLDEuNDQyLDEuNDQzUzcuMzIyLDEwLjc5Niw3LjMyMiwxMFM2LjY3NSw4LjU1OSw1Ljg4LDguNTU5IE01Ljg4LDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4UzUuNTQsOS4zODIsNS44OCw5LjM4MlM2LjQ5OCw5LjY2MSw2LjQ5OCwxMFM2LjIyLDEwLjYxOSw1Ljg4LDEwLjYxOVwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvbGVcclxue1xyXG5cdElkOiBzdHJpbmc7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU/OiBDaGFyYWN0ZXJpc3RpY1ZhbHVlO1xyXG59IiwiaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5IHtcclxuXHRTdGFydDogQmFzZVBvaW50LFxyXG5cdE5hbWU6IHN0cmluZzsgXHJcblx0TGFiZWw/OiBzdHJpbmc7XHJcblx0RW5kOiBCYXNlUG9pbnQ7XHJcblx0Um9sZXM/OiBBcnJheTxJUm9sZT47XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi9Qb2ludFR5cGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVBvaW50IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0b2Zmc2V0WDogYW55O1xyXG5cdG9mZnNldFk6IGFueTtcclxuXHRPcHRpb25zOiB7XHJcblx0XHR0eXBlOiBQb2ludFR5cGU7XHJcblx0fSxcclxuXHRMYWJlbDogc3RyaW5nO1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2dyYXBoLXRlc3RcIixcclxuXHRwcm9wczogW1wiZ3JhcGhcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNlbGVjdGVkVmFsdWVzOiBbXSxcclxuXHRcdFx0ZHluYW1pYzoge1xyXG5cdFx0XHRcdFBvaW50czogW11cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRhY3RpdmVQb2ludHMoKSB7XHJcblx0XHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdFx0aWYgKHRoaXMucG9pbnRzKSB7XHJcblx0XHRcdFx0dmFyIHN0YXJ0UG9pbnQgPSBfLmZpbmQodGhpcy5wb2ludHMsIHAgPT4gcC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5zdGFydCk7XHJcblx0XHRcdFx0cmVzdWx0ID0gdGhpcy5nZXRWaXNpYmxlQ2hpbGRyZW5zKHN0YXJ0UG9pbnQpLmZpbHRlcih4ID0+IHguT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJhY3RpdmVcIiwgcmVzdWx0KTtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRwb2ludHMoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5vZGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0aXNGcm9tU3RhcnQobm9kZSkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgodGhpcy5ncmFwaC5Db25uZWN0b3JzLCAoeDogYW55KSA9PiB4LlN0YXJ0Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0ICYmIHguRW5kLm5hbWUgPT09IG5vZGUubmFtZSkgPj0gMDtcclxuXHRcdH0sXHJcblx0XHRnZXRQb2ludEluRGVwZW5kZW5jaWVzKHBvaW50KSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5FbmQubmFtZSA9PT0gcG9pbnQubmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3RhcnRQb2ludEJ5RGVwKGRlcCkge1xyXG5cdFx0XHRyZXR1cm4gXy5maW5kKHRoaXMucG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gZGVwLlN0YXJ0Lm5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlQWN0aXZlQ2hpbGRyZW5zKHBvaW50KSB7XHJcblx0XHRcdHZhciBjaGlsZHJlbnMgPSB0aGlzLmdldENoaWxkcmVuKHBvaW50KTtcclxuXHRcdFx0Y2hpbGRyZW5zLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cdFx0XHRcdGlmICghY2hpbGQpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGRlcHMgPSB0aGlzLmdldFBvaW50SW5EZXBlbmRlbmNpZXMoY2hpbGQpO1xyXG5cdFx0XHRcdGNoaWxkLkFjdGl2ZSA9IF8uZmluZEluZGV4KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSkgPj0gMDtcclxuXHRcdFx0XHRpZiAoIWNoaWxkLkFjdGl2ZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5yZUFjdGl2ZUNoaWxkcmVucyhjaGlsZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGlsZHJlbihub2RlKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMuZmlsdGVyKHggPT4geC5TdGFydC5uYW1lID09PSBub2RlLm5hbWUpLm1hcCh4ID0+IHRoaXMuZ2V0UG9pbnRCeU5hbWUoeC5FbmQubmFtZSkpO1xyXG5cdFx0fSxcclxuXHRcdGlzRGVwZW5kZW5jeVBhc3MoZGVwKSB7XHJcblx0XHRcdHZhciBzdGFydCA9IGRlcC5TdGFydDtcclxuXHRcdFx0dmFyIHZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1tzdGFydC5uYW1lXTtcclxuXHRcdFx0aWYgKGRlcC5SdWxlcykge1xyXG5cdFx0XHRcdGlmIChzdGFydC5PcHRpb25zLnR5cGUgPT09IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYykge1xyXG5cdFx0XHRcdFx0aWYgKF8uaXNBcnJheShkZXAuUnVsZXMuVmFsdWVzKSAmJiBkZXAuUnVsZXMuVmFsdWVzLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gXy5maW5kSW5kZXgoZGVwLlJ1bGVzLlZhbHVlcywgKHg6IGFueSkgPT4geC5JZCA9PT0gdmFsdWUuSWQpID49IDA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRnZXRQb2ludEJ5TmFtZShuYW1lKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmQodGhpcy5wb2ludHMsIHggPT4geC5uYW1lID09PSBuYW1lKTtcclxuXHRcdH0sXHJcblx0XHRnZXRWaXNpYmxlQ2hpbGRyZW5zOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVucyA9IHRoaXMuZ2V0Q2hpbGRyZW4ocG9pbnQpO1xyXG5cdFx0XHR2YXIgYWN0aXZlcyA9IGNoaWxkcmVucy5maWx0ZXIoeCA9PiB7XHJcblx0XHRcdFx0aWYgKCF4KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBkZXBzID0gdGhpcy5nZXRQb2ludEluRGVwZW5kZW5jaWVzKHgpO1xyXG5cdFx0XHRcdHN3aXRjaCAoeC5PcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljOlxyXG5cdFx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuc3RhcnQ6XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLmZpbmRJbmRleChkZXBzLCBkZXAgPT4gdGhpcy5pc0RlcGVuZGVuY3lQYXNzKGRlcCkpID49IDA7XHJcblx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLmV2ZXJ5KGRlcHMsIGRlcCA9PiB0aGlzLmlzRGVwZW5kZW5jeVBhc3MoZGVwKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGFjdGl2ZUNoaWxkcmVucyA9IFtdO1xyXG5cdFx0XHRhY3RpdmVzLmZvckVhY2goeCA9PiBhY3RpdmVDaGlsZHJlbnMgPSBfLmNvbmNhdChhY3RpdmVDaGlsZHJlbnMsIHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVucyh4KSkpO1xyXG5cdFx0XHRyZXR1cm4gXy51bmlvbihhY3RpdmVzLCBhY3RpdmVDaGlsZHJlbnMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiZ3JhcGgtY2hhbmdlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFwic3luY2Z1c2lvblwiO1xyXG5pbXBvcnQgbWVtb2l6ZURlYm91bmNlLCB7IGRpZmZlcmVuY2UgfSBmcm9tIFwiLi4vbWl4aW5zL21fbG9kYXNoXCI7XHJcbmltcG9ydCBhZGREZXBlbmRNb2RhbFdpbmRvdyBmcm9tIFwiLi9EaWFncmFtL0FkZERlcGVuZFBvaW50V2luZG93XCI7XHJcbmltcG9ydCBjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0FkZERlcGVuZGVkUG9pbnRcIjtcclxuaW1wb3J0IGNyZWF0ZUNoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXJcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgdGVzdENvbnRyb2xsIGZyb20gXCIuL0RpYWdyYW0vVGVzdC9HcmFwaFRlc3RDb250cm9sbFwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcbnZhciBjb25zdHJhaW50cyA9IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uRGlhZ3JhbUNvbnN0cmFpbnRzLkRlZmF1bHQgfCBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5GbG9hdEVsZW1lbnRzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2NoYXJhY3RlcmlzdGljLWRpYWdyYW1cIixcclxuXHRwcm9wczogW1wiZ3JhcGhcIiwgXCJjbGFzc2VzXCIsIFwiaGVpZ2h0XCIsIFwiY2hhcmFjdGVyaXN0aWNzXCIsIFwicm9sZXNcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGJ1czogbmV3IFZ1ZSgpLFxyXG5cdFx0XHRzaG93RGVwZW5kTW9kYWw6IGZhbHNlLFxyXG5cdFx0XHRvZmZzZXRZTWFyZ2luOiAyNTAsXHJcblx0XHRcdGFkZE1vZGU6IGZhbHNlLFxyXG5cdFx0XHRkaWFncmFtSW5pdDogZmFsc2UsXHJcblx0XHRcdHNlbGVjdGVkTm9kZXM6IFtdLFxyXG5cdFx0XHRpc01vZGFsV2luZG93OiB0cnVlLFxyXG5cdFx0XHRJc092ZXJ2aWV3QWN0aXZlOiB0cnVlXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGhlaWdodFB4KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5oZWlnaHQgKyBcInB4XCI7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUlkKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5OYW1lO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1FbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjXCIgKyB0aGlzLmRpYWdyYW1JZDtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtT3ZlcnZpZXdFbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFncmFtRWxJZCArIFwiX292ZXJ2aWV3XCI7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlhZ3JhbUluaXQgPyAkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbShcImluc3RhbmNlXCIpIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGUoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNlbGVjdGVkTm9kZXMgJiYgdGhpcy5zZWxlY3RlZE5vZGVzLmxlbmd0aCA+IDAgPyB0aGlzLnNlbGVjdGVkTm9kZXNbMF0gOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZVZhbHVlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmlyc3RTZWxlY3ROb2RlID8gdGhpcy5maXJzdFNlbGVjdE5vZGUuVmFsdWVzIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRmaXJzdFNlbGVjdE5vZGVEZXBlbmRlbmN5KCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaCAmJiB0aGlzLmZpcnN0U2VsZWN0Tm9kZSA/IHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LkVuZC5uYW1lID09PSB0aGlzLmZpcnN0U2VsZWN0Tm9kZS5uYW1lKSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0ZGVwZW5kU2VsZWN0ZWROb2RlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWROb2RlcyA/IHRoaXMuc2VsZWN0ZWROb2Rlcy5tYXAoeCA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdE5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0U3RhcnQ6IHgsXHJcblx0XHRcdFx0XHRFbmQ6IG51bGwsXHJcblx0XHRcdFx0XHRSdWxlczoge1xyXG5cdFx0XHRcdFx0XHRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRcdFx0XHRSb2xlczogW11cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9KSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Y29ubmVjdG9ycygpIHtcclxuXHRcdFx0dGhpcy5ncmFwaC5Db25uZWN0b3JzLmZvckVhY2goeCA9PiB0aGlzLnVwZGF0ZUNvbm5lY3RvckxhYmVsKHgpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycztcclxuXHRcdH0sXHJcblx0XHRub2RlcygpIHtcclxuXHRcdFx0dGhpcy5ncmFwaC5Ob2Rlcy5mb3JFYWNoKHggPT4gdGhpcy51cGRhdGVOb2RlTGFiZWwoeCkpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFwaC5Ob2RlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdHNlbGVjdGlvbkNoYW5nZShzZWxlY3RlZEl0ZW1zKSB7XHJcblx0XHRcdGlmICghc2VsZWN0ZWRJdGVtcyB8fCBzZWxlY3RlZEl0ZW1zLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZE5vZGVzID0gbnVsbDtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIHNlbGVjdGVkTm9kZXMgPSBzZWxlY3RlZEl0ZW1zLmZpbHRlcih4ID0+IHguX3R5cGUgPT09IFwibm9kZVwiKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGVzID0gXy5tYXAoc2VsZWN0ZWROb2RlcywgKHg6IGFueSkgPT4gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIHkgPT4geS5uYW1lID09PSB4Lm5hbWUpKTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRQb2ludEFuZERlcGVuZGVuY3kob3B0aW9ucykge1xyXG5cdFx0XHR2YXIgcG9pbnRzID0gb3B0aW9ucy5wb2ludHM7XHJcblx0XHRcdHZhciBkZXBlbmRlbmN5ID0gb3B0aW9ucy5kZXBlbmRlbmN5O1xyXG5cclxuXHRcdFx0cG9pbnRzLmZvckVhY2gocG9pbnQgPT4gdGhpcy5jb21taXRQb2ludChwb2ludCkpO1xyXG5cdFx0XHRkZXBlbmRlbmN5LmZvckVhY2goZGVwID0+IHRoaXMuY29tbWl0Q29ubmVjdGlvbihkZXApKTtcclxuXHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0Q29ubmVjdGlvbihvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJvbi1hZGQtY29ubmVjdGlvblwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZGlhZ3JhbUlkLFxyXG5cdFx0XHRcdGRlcDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb21taXRQb2ludChvcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJvbi1hZGQtbm9kZVwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZGlhZ3JhbUlkLFxyXG5cdFx0XHRcdHBvaW50OiBvcHRpb25zXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5BZGREZXBlbmRNb2RhbChvcHRpb24/OiBhbnkpIHtcclxuXHRcdFx0dGhpcy5hZGRNb2RlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdG9wZW5DaGFuZ2VQb2ludE1vZGFsKG9wdGlvbj86IGFueSkge1xyXG5cdFx0XHR0aGlzLmFkZE1vZGUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5zaG93RGVwZW5kTW9kYWwgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZU5vZGVQcm9wOiBtZW1vaXplRGVib3VuY2UoZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQodGhpcy5ncmFwaC5Ob2Rlcywgbm9kZSA9PiBub2RlLm5hbWUgPT09IGFyZ3MuZWxlbWVudC5uYW1lKTtcclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwibm9kZS1wcm9wLWNoYW5nZVwiLCB7XHJcblx0XHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0bmFtZTogbm9kZS5uYW1lLFxyXG5cdFx0XHRcdFx0cHJvcE5hbWU6IGFyZ3MucHJvcGVydHlOYW1lLFxyXG5cdFx0XHRcdFx0bmV3VmFsdWU6IGFyZ3MuZWxlbWVudFthcmdzLnByb3BlcnR5TmFtZV1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgNTAwLCB4ID0+IHgucHJvcGVydHlOYW1lKSxcclxuXHRcdHVwZGF0ZU5vZGVMYWJlbChub2RlKSB7XHJcblx0XHRcdGlmIChub2RlLk9wdGlvbnMpIHtcclxuXHRcdFx0XHR2YXIgcHJvcGVydHkgPSB0aGlzLmdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpO1xyXG5cdFx0XHRcdF8uYXNzaWduKG5vZGUsIHByb3BlcnR5KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIW5vZGUubGFiZWxzIHx8IG5vZGUubGFiZWxzLmxlbmd0aCA8PSAwKSB7XHJcblx0XHRcdFx0bm9kZS5sYWJlbHMgPSBbe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJsYWJlbDFcIixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRmb250Q29sb3I6IFwiYmxhY2tcIixcclxuXHRcdFx0XHRcdGhvcml6b250YWxBbGlnbm1lbnQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uSG9yaXpvbnRhbEFsaWdubWVudC5SaWdodCxcclxuXHRcdFx0XHRcdHZlcnRpY2FsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSxcclxuXHRcdFx0XHRcdG9mZnNldDoge1xyXG5cdFx0XHRcdFx0XHR5OiAxLjIsXHJcblx0XHRcdFx0XHRcdHg6IDAuOFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGJvdW5kYXJ5Q29uc3RyYWludHM6IGZhbHNlXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdFx0bm9kZS5sYWJlbHNbMF0udGV4dCA9IG5vZGUuTGFiZWw7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlQ29ubmVjdG9yTGFiZWwoY29ubmVjdG9yKSB7XHJcblx0XHRcdGlmICghY29ubmVjdG9yLmxhYmVscyB8fCBjb25uZWN0b3IubGFiZWxzLmxlbmdodCA8PSAwKSB7XHJcblx0XHRcdFx0Y29ubmVjdG9yLmxhYmVscyA9IFt7XHJcblx0XHRcdFx0XHRuYW1lOiBcImxhYmVsMlwiLFxyXG5cdFx0XHRcdFx0Ym9sZDogdHJ1ZSxcclxuXHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0YWxpZ25tZW50OiBcImNlbnRlclwiLFxyXG5cdFx0XHRcdFx0Ym91bmRhcnlDb25zdHJhaW50czogZmFsc2UsXHJcblx0XHRcdFx0XHRvZmZzZXQ6IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uUG9pbnQoMCwgMClcclxuXHRcdFx0XHR9XTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25uZWN0b3IubGFiZWxzWzBdLnRleHQgPSBjb25uZWN0b3IuTGFiZWw7XHJcblx0XHR9LFxyXG5cdFx0Z29UZXN0KCkge1xyXG5cdFx0XHR0aGlzLklzT3ZlcnZpZXdBY3RpdmUgPSBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRnb092ZXJ2aWV3KCkge1xyXG5cdFx0XHR0aGlzLklzT3ZlcnZpZXdBY3RpdmUgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHRlc3RBY3RpdmVOb2RlKGFjdGl2ZXMpIHtcclxuXHRcdFx0aWYgKCFfLmlzQXJyYXkoYWN0aXZlcykgfHwgIXRoaXMuZGlhZ3JhbSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmdyYXBoLk5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcblx0XHRcdFx0dmFyIGFjdGl2ZSA9IG5vZGUuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQgfHwgXy5maW5kSW5kZXgoYWN0aXZlcywgeCA9PiB4Lm5hbWUgPT09IG5vZGUubmFtZSkgPj0gMDtcclxuXHRcdFx0XHR2YXIgcHJvcGVydGllcyA9ICF0aGlzLklzT3ZlcnZpZXdBY3RpdmUgJiYgYWN0aXZlID8ge1xyXG5cdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiNhNmY1NjhcIlxyXG5cdFx0XHRcdH0gOiB0aGlzLmdldE5vZGVQcm9wZXJ0aWVzKG5vZGUpO1xyXG5cdFx0XHRcdHRoaXMuZGlhZ3JhbS51cGRhdGVOb2RlKG5vZGUubmFtZSwgcHJvcGVydGllcyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdH0sXHJcblx0XHRnZXROb2RlUHJvcGVydGllcyhub2RlKSB7XHJcblx0XHRcdHN3aXRjaCAobm9kZS5PcHRpb25zLnR5cGUpIHtcclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5zdGFydDpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjMjljMTVmXCIsXHJcblx0XHRcdFx0XHRcdHNoYXBlOiBcImVsbGlwc2VcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiMyMDg1YzlcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwicmVjdGFuZ2xlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yOiBcIiNlYzdlMGRcIixcclxuXHRcdFx0XHRcdFx0c2hhcGU6IFwiZWxsaXBzZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0b3IoY29ubmVjdG9yKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJyZW1vdmUtY29ubmVjdGlvblwiLCB7XHJcblx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRjb25uZWN0b3JOYW1lOiBjb25uZWN0b3IuTmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVOb2RlKG5vZGUpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcInJlbW92ZS1ub2RlXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdG5vZGVOYW1lOiBub2RlLm5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29ubmVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdHZhciBkZXA6IGFueSA9IHtcclxuXHRcdFx0XHROYW1lOiBvcHRpb25zLmVsZW1lbnQuTmFtZVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRzd2l0Y2ggKG9wdGlvbnMuZW5kUG9pbnQpIHtcclxuXHRcdFx0XHRjYXNlIFwidGFyZ2V0RW5kUG9pbnRcIjpcclxuXHRcdFx0XHRcdGRlcC5FbmQgPSBvcHRpb25zLmNvbm5lY3Rpb25cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgXCJzb3VyY2VFbmRQb2ludFwiOlxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdGRlcFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHR2YXIgJHRoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5idXMuJG9uKFwiYWRkLWRlcGVuZC1wb2ludFwiLCAob3B0aW9ucz86IGFueSkgPT4gdGhpcy5vcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9ucykpO1xyXG5cdFx0dGhpcy5idXMuJG9uKFwiY2hhbmdlLXBvaW50XCIsIChvcHRpb25zPzogYW55KSA9PiB0aGlzLm9wZW5DaGFuZ2VQb2ludE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdCQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKHtcclxuXHRcdFx0ZW5hYmxlQ29udGV4dE1lbnU6IGZhbHNlLFxyXG5cdFx0XHRjb25zdHJhaW50cyxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHgsXHJcblx0XHRcdG5vZGVzOiB0aGlzLm5vZGVzLFxyXG5cdFx0XHRjb25uZWN0b3JzOiB0aGlzLmNvbm5lY3RvcnMsXHJcblx0XHRcdGRlZmF1bHRTZXR0aW5nczoge1xyXG5cdFx0XHRcdG5vZGU6IHtcclxuXHRcdFx0XHRcdHdpZHRoOiA2NSxcclxuXHRcdFx0XHRcdGhlaWdodDogNjUsXHJcblx0XHRcdFx0XHRib3JkZXJXaWR0aDogMFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29ubmVjdG9yOiB7XHJcblx0XHRcdFx0XHRzZWdtZW50czogW3tcclxuXHRcdFx0XHRcdFx0XCJ0eXBlXCI6IFwib3J0aG9nb25hbFwiXHJcblx0XHRcdFx0XHR9XVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c2Nyb2xsU2V0dGluZ3M6IHtcclxuXHRcdFx0XHRob3Jpem9udGFsT2Zmc2V0OiAwLFxyXG5cdFx0XHRcdHZlcnRpY2FsT2Zmc2V0OiAwLFxyXG5cdFx0XHRcdHpvb21GYWN0b3I6IDAuMlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbmFibGVBdXRvU2Nyb2xsOiB0cnVlLFxyXG5cdFx0XHRwYWdlU2V0dGluZ3M6IHtcclxuXHRcdFx0XHRzY3JvbGxMaW1pdDogXCJpbmZpbml0eVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGVkSXRlbXM6IHtcclxuXHRcdFx0XHR1c2VySGFuZGxlczogW2NyZWF0ZUFkZERlcGVuZFBvaW50SGFuZGxlcih7XHJcblx0XHRcdFx0XHRidXM6IHRoaXMuYnVzXHJcblx0XHRcdFx0fSksIGNyZWF0ZUNoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIoe1xyXG5cdFx0XHRcdFx0YnVzOiB0aGlzLmJ1c1xyXG5cdFx0XHRcdH0pXVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwcm9wZXJ0eUNoYW5nZShhcmdzKSB7XHJcblx0XHRcdFx0JHRoaXMuJGVtaXQoXCJwcm9wZXJ0eUNoYW5nZVwiLCBhcmdzKTtcclxuXHRcdFx0XHRpZiAoYXJncy5lbGVtZW50VHlwZSA9PT0gXCJub2RlXCIpIHtcclxuXHRcdFx0XHRcdGlmIChfLmluY2x1ZGVzKFtcIm9mZnNldFhcIiwgXCJvZmZzZXRZXCJdLCBhcmdzLnByb3BlcnR5TmFtZSkpIHtcclxuXHRcdFx0XHRcdFx0JHRoaXMudXBkYXRlTm9kZVByb3AoYXJncyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3Rpb25DaGFuZ2U6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRcdFx0JHRoaXMuc2VsZWN0aW9uQ2hhbmdlKG9wdGlvbnMuc2VsZWN0ZWRJdGVtcyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbm5lY3RvckNvbGxlY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmNoYW5nZVR5cGUgPT09IFwicmVtb3ZlXCIpIHtcclxuXHRcdFx0XHRcdCR0aGlzLnJlbW92ZUNvbm5lY3RvcihvcHRpb25zLmVsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0bm9kZUNvbGxlY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdGlmIChvcHRpb25zLmNoYW5nZVR5cGUgPT09IFwicmVtb3ZlXCIpIHtcclxuXHRcdFx0XHRcdCR0aGlzLnJlbW92ZU5vZGUob3B0aW9ucy5lbGVtZW50KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbm5lY3Rpb25DaGFuZ2Uob3B0aW9ucykge1xyXG5cdFx0XHRcdCR0aGlzLmNvbm5lY3Rpb25DaGFuZ2Uob3B0aW9ucyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1PdmVydmlld0VsSWQpLmVqT3ZlcnZpZXcoe1xyXG5cdFx0XHRzb3VyY2VJRDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuZGlhZ3JhbUluaXQgPSB0cnVlO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0YWRkRGVwZW5kTW9kYWxXaW5kb3csXHJcblx0XHR0ZXN0Q29udHJvbGxcclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRncmFwaCh2YWwpIHtcclxuXHRcdFx0dmFyIGRpYWdyYW0gPSB0aGlzLmRpYWdyYW07XHJcblx0XHRcdHZhciBub2RlcyA9IGRpYWdyYW0ubm9kZXMoKTtcclxuXHRcdFx0dmFyIGNvbm5lY3RvcnMgPSBkaWFncmFtLmNvbm5lY3RvcnMoKTtcclxuXHRcdFx0dmFsLk5vZGVzLmZvckVhY2goeCA9PiB7XHJcblx0XHRcdFx0dGhpcy51cGRhdGVOb2RlTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQobm9kZXMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5uYW1lKTtcclxuXHRcdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZOb2RlID0gZGlmZmVyZW5jZSh4LCBub2RlKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmTm9kZSkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZU5vZGUobm9kZS5uYW1lLCBkaWZmTm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgZGlmZkxhYmVsID0gZGlmZmVyZW5jZSh4LmxhYmVsc1swXSwgbm9kZS5sYWJlbHNbMF0pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKG5vZGUubmFtZSwgbm9kZS5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFsLkNvbm5lY3RvcnMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZUNvbm5lY3RvckxhYmVsKHgpO1xyXG5cdFx0XHRcdHZhciBjb25uID0gXy5maW5kKGNvbm5lY3RvcnMsICh5OiBhbnkpID0+IHkubmFtZSA9PT0geC5OYW1lKTtcclxuXHRcdFx0XHRpZiAoY29ubikge1xyXG5cdFx0XHRcdFx0dmFyIGRpZmZDb25uID0gZGlmZmVyZW5jZSh4LCBjb25uKTtcclxuXHRcdFx0XHRcdGlmIChkaWZmQ29ubikge1xyXG5cdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUNvbm5lY3Rvcihjb25uLm5hbWUsIGRpZmZDb25uKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChjb25uLmxhYmVscy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBjb25uLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRcdGlmIChkaWZmTGFiZWwpIHtcclxuXHRcdFx0XHRcdFx0XHRkaWFncmFtLnVwZGF0ZUxhYmVsKGNvbm4ubmFtZSwgY29ubi5sYWJlbHNbMF0sIGRpZmZMYWJlbCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0uYWRkTGFiZWwoY29ubi5uYW1lLCB4LmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGRpYWdyYW0uYWRkKHgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFBvaW50czogQXJyYXk8QmFzZVBvaW50PjtcclxuXHREZXBlbmRlbmNpZXM6IEFycmF5PERlcGVuZGVuY3k+O1xyXG59IiwiaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljVmFsdWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWMge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRWYWx1ZXM6IEFycmF5PENoYXJhY3RlcmlzdGljVmFsdWU+O1xyXG59IiwiaW1wb3J0IHsgR3JhcGggfSBmcm9tIFwiLi9HcmFwaFwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpYyB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljXCI7XHJcbmltcG9ydCB7IElSb2xlIH0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb290U3RhdGUge1xyXG5cdEdyYXBoczogQXJyYXk8R3JhcGg+O1xyXG5cdENoYXJhY3RlcmlzdGljczogQXJyYXk8Q2hhcmFjdGVyaXN0aWM+O1xyXG5cdFJvbGVzOiBBcnJheTxJUm9sZT47XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG5cdG5hbWU6IHN0cmluZ1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb25uZWN0b3Ige1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRzb3VyY2VOb2RlOiBzdHJpbmc7XHJcblx0dGFyZ2V0Tm9kZTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vQ29ubmVjdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNmR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZyxcclxuXHROb2RlczogQXJyYXk8Tm9kZT47XHJcblx0Q29ubmVjdG9yczogQXJyYXk8Q29ubmVjdG9yPjtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSwgR2V0dGVyVHJlZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgU2ZHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGhcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxudHlwZSBHcmFwaENvbnRleHQgPSBBY3Rpb25Db250ZXh0PFJvb3RTdGF0ZSwgUm9vdFN0YXRlPjtcclxuXHJcbmV4cG9ydCBjb25zdCBncmFwaE1vZHVsZSA9IHtcclxuXHRuYW1lc3BhY2VkOiB0cnVlLFxyXG5cclxuXHRzdGF0ZToge1xyXG5cdFx0R3JhcGhzOiBbe1xyXG5cdFx0XHROYW1lOiBcIkdyYXBoMVwiLFxyXG5cdFx0XHRQb2ludHM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiA2MCxcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLnN0YXJ0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdLFxyXG5cdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHR9XSxcclxuXHRcdENoYXJhY3RlcmlzdGljczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDFcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMlwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgM1wiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA0XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDZcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA3XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOFwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDlcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdF0sXHJcblx0XHRSb2xlczogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAxXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMlwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDNcIlxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHRnZXR0ZXJzOiB7XHJcblx0XHRnZXRHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHM7XHJcblx0XHR9LFxyXG5cdFx0Z3JhcGhDb3VudChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5HcmFwaHMubGVuZ3RoO1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZShzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAobmFtZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0dmFyIGdyYXBoID0gXy5maXJzdChzdGF0ZS5HcmFwaHMuZmlsdGVyKHggPT4geC5OYW1lID09PSBuYW1lKSk7XHJcblx0XHRcdFx0cmV0dXJuIGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGUpKGdyYXBoKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiAoZ3JhcGg6IEdyYXBoKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdE5hbWU6IGdyYXBoLk5hbWUsXHJcblx0XHRcdFx0XHROb2RlczogZ3JhcGguUG9pbnRzLFxyXG5cdFx0XHRcdFx0Q29ubmVjdG9yczogXy5tYXAoZ3JhcGguRGVwZW5kZW5jaWVzLCBmdW5jdGlvbiAoY29uKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBfLm1lcmdlKHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBjb24uTmFtZSxcclxuXHRcdFx0XHRcdFx0XHRzb3VyY2VOb2RlOiBjb24uU3RhcnQgPyBjb24uU3RhcnQubmFtZSA6IG51bGwsXHJcblx0XHRcdFx0XHRcdFx0dGFyZ2V0Tm9kZTogY29uLkVuZCA/IGNvbi5FbmQubmFtZTogbnVsbFxyXG5cdFx0XHRcdFx0XHR9LCBjb24pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGdldENoYXJhY3RlcmlzdGljc0xpc3Qoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuQ2hhcmFjdGVyaXN0aWNzO1xyXG5cdFx0fSxcclxuXHRcdGdldFJvbGVzKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLlJvbGVzO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bXV0YXRpb25zOiB7XHJcblx0XHRhZGRHcmFwaChzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiBHcmFwaCkge1xyXG5cdFx0XHRzdGF0ZS5HcmFwaHMucHVzaChpdGVtKTtcclxuXHRcdH0sXHJcblx0XHRhZGRQb2ludChzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaCk7XHJcblx0XHRcdHZhciBkdXBsaWNhdGVQb2ludEluZGV4ID0gXy5maW5kSW5kZXgoZ3JhcGguUG9pbnRzLCB4ID0+IHgubmFtZSA9PT0gaXRlbS5wb2ludC5uYW1lKTtcclxuXHJcblx0XHRcdGlmIChkdXBsaWNhdGVQb2ludEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5wdXNoKGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkdXBsaWNhdGVQb2ludCA9IGdyYXBoLlBvaW50c1tkdXBsaWNhdGVQb2ludEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVQb2ludCwgaXRlbS5wb2ludCk7XHJcblx0XHRcdFx0Z3JhcGguUG9pbnRzLnNwbGljZShkdXBsaWNhdGVQb2ludEluZGV4LCAxLCBkdXBsaWNhdGVQb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRhZGREZXBlbmRlbmN5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Ly9UT0RPOiDQn9GA0LjQvNC10L3QuNGC0Ywg0LjQt9C80LXQvdC40LUg0Log0LTQuNCw0LPRgNCw0LzQtVxyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaCk7XHJcblx0XHRcdHZhciBkdXBsaWNhdGVEZXBJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLkRlcGVuZGVuY2llcywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZGVwLk5hbWUpO1xyXG5cdFx0XHRpZiAoZHVwbGljYXRlRGVwSW5kZXggPCAwKSB7XHJcblx0XHRcdFx0Z3JhcGguRGVwZW5kZW5jaWVzLnB1c2goaXRlbS5kZXApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBkdXBsaWNhdGVEZXAgPSBncmFwaC5EZXBlbmRlbmNpZXNbZHVwbGljYXRlRGVwSW5kZXhdO1xyXG5cdFx0XHRcdF8uYXNzaWduKGR1cGxpY2F0ZURlcCwgaXRlbS5kZXApO1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5zcGxpY2UoZHVwbGljYXRlRGVwSW5kZXgsIDEsIGR1cGxpY2F0ZURlcCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjaGFuZ2VOb2RlUHJvcGVydHkoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHR2YXIgcG9pbnRzID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpLlBvaW50cztcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5maW5kKHBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ubmFtZSk7XHJcblx0XHRcdFZ1ZS5zZXQocG9pbnQsIGl0ZW0ucHJvcE5hbWUsIGl0ZW0ubmV3VmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rpb24oc3RhdGU6IFJvb3RTdGF0ZSwgb3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBjb25uZWN0b3JOYW1lOiBzdHJpbmcgfSkge1xyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gb3B0aW9ucy5ncmFwaCk7XHJcblx0XHRcdF8ucmVtb3ZlKGdyYXBoLkRlcGVuZGVuY2llcywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuY29ubmVjdG9yTmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlTm9kZShzdGF0ZTogUm9vdFN0YXRlLCBvcHRpb25zOiB7IGdyYXBoOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcgfSkge1xyXG5cdFx0XHR2YXIgZ3JhcGggPSBfLmZpbmQoc3RhdGUuR3JhcGhzLCB4ID0+IHguTmFtZSA9PT0gb3B0aW9ucy5ncmFwaCk7XHJcblx0XHRcdF8ucmVtb3ZlKGdyYXBoLlBvaW50cywgeCA9PiB4Lm5hbWUgPT09IG9wdGlvbnMubm9kZU5hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHsgcmVhZCwgY29tbWl0IH0gPVxyXG5cdGdldFN0b3JlQWNjZXNzb3JzPFJvb3RTdGF0ZSwgUm9vdFN0YXRlPihcImdyYXBoXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRHcmFwaCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGhDb3VudCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5ncmFwaENvdW50KTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZSA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUpO1xyXG5leHBvcnQgY29uc3QgZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KTtcclxuZXhwb3J0IGNvbnN0IGdldFJvbGVzID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFJvbGVzKTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRHcmFwaCA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkR3JhcGgpO1xyXG5leHBvcnQgY29uc3QgYWRkUG9pbnQgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZFBvaW50KTtcclxuZXhwb3J0IGNvbnN0IGFkZERlcGVuZGVuY3kgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZERlcGVuZGVuY3kpO1xyXG5leHBvcnQgY29uc3QgY2hhbmdlTm9kZVByb3BlcnR5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5jaGFuZ2VOb2RlUHJvcGVydHkpO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ29ubmVjdGlvbiA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMucmVtb3ZlQ29ubmVjdGlvbik7XHJcbmV4cG9ydCBjb25zdCByZW1vdmVOb2RlID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5yZW1vdmVOb2RlKTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSBcIi4uL01vZGVsL1Jvb3RTdGF0ZVwiO1xyXG5pbXBvcnQgeyBncmFwaE1vZHVsZSBhcyBncmFwaCB9IGZyb20gXCIuL0dyYXBoU3RvcmVcIjtcclxuaW1wb3J0IFZ1ZXhQZXJzaXN0ZW5jZSBmcm9tIFwidnVleC1wZXJzaXN0XCI7XHJcblxyXG5WdWUudXNlKFZ1ZXgpO1xyXG5cclxuY29uc3QgdnVleExvY2FsID0gbmV3IFZ1ZXhQZXJzaXN0ZW5jZSh7XHJcblx0c3RvcmFnZTogd2luZG93LmxvY2FsU3RvcmFnZVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBuZXcgVnVleC5TdG9yZTxSb290U3RhdGU+KHtcclxuXHRcdG1vZHVsZXM6IHtcclxuXHRcdFx0Z3JhcGhcclxuXHRcdH0sXHJcblx0XHRwbHVnaW5zOiBbdnVleExvY2FsLnBsdWdpbl0sXHJcblx0XHRzdHJpY3Q6IHRydWVcclxuXHR9KVxyXG59OyIsIi8vIENsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzXHJcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJpc3RpY0RpYWdyYW0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNEaWFncmFtXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSBcIi4uL1N0b3JlL1Jvb3RTdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBncmFwaCBmcm9tIFwiLi4vU3RvcmUvR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vTW9kZWwvRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuXHJcblxyXG52YXIgc3RvcmUgPSBjcmVhdGVTdG9yZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogJyNhcHAtaGVsbG8tdGVtcGxhdGUnLFxyXG5cdHN0b3JlLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtZXNzYWdlOiBcInRlc3QgbWVzc2FnZVwiXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdHRlc3QoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5yZWFkR3JhcGgodGhpcy4kc3RvcmUpWzBdLlBvaW50cy5tYXAoeCA9PiB4LkxhYmVsKTtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSkubWFwKHggPT4gZ3JhcGguZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgodGhpcy4kc3RvcmUpKHgpKTtcclxuXHRcdH0sXHJcblx0XHRjaGFyYWN0ZXJpc3RpY3MoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHRoaXMuJHN0b3JlKTtcclxuXHRcdH0sXHJcblx0XHRyb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLmdldFJvbGVzKHRoaXMuJHN0b3JlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZEdyYXBoKCkge1xyXG5cdFx0XHRncmFwaC5hZGRHcmFwaCh0aGlzLiRzdG9yZSwge1xyXG5cdFx0XHRcdE5hbWU6IFwiR3JhcGhcIiArIChncmFwaC5yZWFkR3JhcGhDb3VudCh0aGlzLiRzdG9yZSkgKyAxKSxcclxuXHRcdFx0XHRQb2ludHM6IFt7XHJcblx0XHRcdFx0XHRuYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDIwLFxyXG5cdFx0XHRcdFx0TGFiZWw6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLnN0YXJ0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0RGVwZW5kZW5jaWVzOiBbXVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGROb2RlKG5vZGU6IHsgZ3JhcGg6IHN0cmluZywgcG9pbnQ6IEJhc2VQb2ludCB9KSB7XHJcblx0XHRcdGdyYXBoLmFkZFBvaW50KHRoaXMuJHN0b3JlLCBub2RlKTtcclxuXHRcdH0sXHJcblx0XHRhZGRDb25uZWN0aW9uKGNvbm5lY3Q6IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkRGVwZW5kZW5jeSh0aGlzLiRzdG9yZSwgY29ubmVjdCk7XHJcblx0XHR9LFxyXG5cdFx0b25Ob2RlUHJvcENoYW5nZShvcHRpb25zOiB7IGdyYXBoOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcHJvcE5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSB9KSB7XHJcblx0XHRcdGdyYXBoLmNoYW5nZU5vZGVQcm9wZXJ0eSh0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9LFxyXG5cdFx0cmVtb3ZlQ29ubmVjdGlvbihvcHRpb25zOiB7Z3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nfSkge1xyXG5cdFx0XHRncmFwaC5yZW1vdmVDb25uZWN0aW9uKHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVOb2RlKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbm9kZU5hbWU6IHN0cmluZyB9KSB7XHJcblx0XHRcdGdyYXBoLnJlbW92ZU5vZGUodGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRDaGFyYWN0ZXJpc3RpY0RpYWdyYW1cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IEFwcEhlbGxvIGZyb20gXCIuL2NvbXBvbmVudHMvQXBwSGVsbG9cIjtcclxuaW1wb3J0IGxvZGFzaE1peGluIGZyb20gXCIuL21peGlucy9tX2xvZGFzaFwiO1xyXG5pbXBvcnQgYXN5bmNEYXRhIGZyb20gXCJ2dWUtYXN5bmMtZGF0YS0yXCI7XHJcblxyXG4vL1BsdWdpblxyXG5WdWUudXNlKGFzeW5jRGF0YS5Bc3luY0RhdGFQbHVnaW4pO1xyXG5cclxuXHJcbi8vUm9vdCBDb21wb25lbnRcclxubGV0IHYgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNhcHAtcm9vdFwiLFxyXG5cdHRlbXBsYXRlOiAnPEFwcEhlbGxvLz4nLFxyXG4gICAgLy9yZW5kZXI6IGggPT4gaChBcHBIZWxsb0NvbXBvbmVudCksXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRBcHBIZWxsb1xyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1BvaW50IGV4dGVuZHMgQmFzZVBvaW50IHtcclxuXHRDaGFyYWN0ZXJpc3RpYzogQ2hhcmFjdGVyaXN0aWM7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxuXHRSZXF1aXJlZD86IGJvb2xlYW47XHJcblx0RGVmYXVsdFZhbHVlPzogQ2hhcmFjdGVyaXN0aWNWYWx1ZTtcclxufSIsImltcG9ydCB7RGVwZW5kZW5jeX0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQge0lSb2xlfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZXBlbmRlbmN5Um9sZSB7XHJcblx0RGVwZW5kZW5jeTogRGVwZW5kZW5jeTtcclxuXHRSb2xlOiBJUm9sZTtcclxufSJdfQ==