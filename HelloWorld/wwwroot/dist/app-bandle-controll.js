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
                    values: Array,
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
    var PointType, AggregationType, CharacteristicType;
    return {
        setters: [],
        execute: function () {
            (function (PointType) {
                PointType[PointType["start"] = 0] = "start";
                PointType[PointType["characteristic"] = 1] = "characteristic";
                PointType[PointType["aggregator"] = 2] = "aggregator";
            })(PointType || (PointType = {}));
            exports_4("PointType", PointType);
            (function (AggregationType) {
                AggregationType[AggregationType["And"] = 0] = "And";
                AggregationType[AggregationType["Or"] = 1] = "Or";
            })(AggregationType || (AggregationType = {}));
            exports_4("AggregationType", AggregationType);
            (function (CharacteristicType) {
                CharacteristicType["Lookup"] = "TsiGuidValue";
                CharacteristicType["String"] = "TsiStringValue";
                CharacteristicType["Int"] = "TsiIntValue";
                CharacteristicType["DateTime"] = "TsiDateTimeValue";
            })(CharacteristicType || (CharacteristicType = {}));
            exports_4("CharacteristicType", CharacteristicType);
        }
    };
});
System.register("components/Diagram/AnyValueControll", ["vue", "Model/PointType"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var vue_2, PointType_1;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (PointType_1_1) {
                PointType_1 = PointType_1_1;
            }
        ],
        execute: function () {
            exports_5("default", vue_2.default.extend({
                template: "#any-value",
                props: ["type", "value", "label"],
                computed: {
                    controllType: function () {
                        switch (this.type) {
                            case PointType_1.CharacteristicType.String:
                                return "text";
                            case PointType_1.CharacteristicType.Int:
                                return "number";
                            case PointType_1.CharacteristicType.DateTime:
                                return "datetime";
                            default:
                                return null;
                        }
                    }
                },
                methods: {
                    updateValue: function (value) {
                        this.$emit("input", value);
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll", "mixins/IdGenerator", "Model/PointType", "components/Diagram/AnyValueControll"], function (exports_6, context_6) {
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
                Value: null,
                Roles: null,
                Required: false,
                Options: {
                    type: PointType_2.PointType.characteristic
                }
            },
            uniqId: IdGenerator_1.uniqId(),
            offsetYDelta: 250,
            addExistCharacteristic: false,
            existPoint: null,
            dependency: null,
            aggregation: PointType_2.AggregationType.And
        };
    }
    var vue_3, lodash_4, RuleControll_1, IdGenerator_1, PointType_2, AnyValueControll_1, _Vue;
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
            function (IdGenerator_1_1) {
                IdGenerator_1 = IdGenerator_1_1;
            },
            function (PointType_2_1) {
                PointType_2 = PointType_2_1;
            },
            function (AnyValueControll_1_1) {
                AnyValueControll_1 = AnyValueControll_1_1;
            }
        ],
        execute: function () {
            _Vue = vue_3.default;
            exports_6("default", _Vue.extend({
                template: "#add-depend-point",
                props: ["show", "id", "default_dependency", "roles", "defaultPoint", "defaultDependency", "isModalWindow", "points", "characteristics"],
                components: {
                    RuleControll: RuleControll_1.default,
                    AnyValue: AnyValueControll_1.default
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
                    },
                    characterValueUrl: function () {
                        return this.point.Characteristic ? "api/CharacteristicLookupValue/" + this.point.Characteristic.lookupName : null;
                    },
                    isAggregationNeed: function () {
                        return this.dependency && this.dependency.length > 1;
                    },
                    pointTypeAnd: function () {
                        return PointType_2.AggregationType.And;
                    },
                    pointTypeOr: function () {
                        return PointType_2.AggregationType.Or;
                    },
                    aggregationLabel: function () {
                        return this.aggregation === PointType_2.AggregationType.And ? "And" : "Or";
                    },
                    isPointCharacteristicLookup: function () {
                        return this.point.Characteristic && this.point.Characteristic.characteristicType === PointType_2.CharacteristicType.Lookup;
                    },
                    characteristicType: function () {
                        return this.point.Characteristic ? this.point.Characteristic.characteristicType : null;
                    }
                },
                asyncComputed: {
                    characteristicValues: function () {
                        var _this = this;
                        return new Promise(function (resolve) {
                            if (_this.characterValueUrl) {
                                _this.$http.get(_this.characterValueUrl, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                })
                                    .then(function (response) { return resolve(response.data.map(function (x) {
                                    return {
                                        Id: x.id,
                                        Name: x.name
                                    };
                                })); });
                            }
                            else {
                                resolve();
                            }
                        });
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
                                Label: this.aggregationLabel,
                                Options: {
                                    type: PointType_2.PointType.aggregator,
                                    aggregation: this.aggregation
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
                    },
                    default_dependency: function (dep) {
                        this.dependency = _Vue.util.extend([], dep);
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
System.register("components/Diagram/Test/GraphTestControll", ["vue", "Model/PointType", "lodash", "components/Diagram/AnyValueControll"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vue_4, PointType_3, lodash_5, AnyValueControll_2;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (PointType_3_1) {
                PointType_3 = PointType_3_1;
            },
            function (lodash_5_1) {
                lodash_5 = lodash_5_1;
            },
            function (AnyValueControll_2_1) {
                AnyValueControll_2 = AnyValueControll_2_1;
            }
        ],
        execute: function () {
            exports_13("default", vue_4.default.extend({
                template: "#graph-test",
                props: ["graph"],
                components: {
                    AnyValue: AnyValueControll_2.default
                },
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
                            var startPoint = lodash_5.default.find(this.points, function (p) { return p.Options.type === PointType_3.PointType.start; });
                            result = this.getVisibleChildrens(startPoint);
                        }
                        return result;
                    },
                    activeCharacteristics: function () {
                        var result = this.activePoints.filter(function (x) { return x.Options.type === PointType_3.PointType.characteristic; });
                        this.$emit("active", result);
                        return result;
                    },
                    points: function () {
                        return this.graph.Nodes;
                    }
                },
                methods: {
                    isFromStart: function (node) {
                        return lodash_5.default.findIndex(this.graph.Connectors, function (x) { return x.Start.Options.type === PointType_3.PointType.start && x.End.name === node.name; }) >= 0;
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
                            if (start.Options.type === PointType_3.PointType.characteristic) {
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
                            return _this.checkDependency(x, deps);
                        });
                        var activeChildrens = [];
                        actives.forEach(function (x) { return activeChildrens = lodash_5.default.concat(activeChildrens, _this.getVisibleChildrens(x)); });
                        return lodash_5.default.union(actives, activeChildrens);
                    },
                    checkDependency: function (point, deps) {
                        var _this = this;
                        if (lodash_5.default.includes([PointType_3.PointType.characteristic, PointType_3.PointType.start], point.Options.type) ||
                            (point.Options.type === PointType_3.PointType.aggregator && point.Options.aggregation === PointType_3.AggregationType.Or)) {
                            return lodash_5.default.some(deps, function (dep) { return _this.isDependencyPass(dep); });
                        }
                        if (point.Options.type === PointType_3.PointType.aggregator && point.Options.aggregation === PointType_3.AggregationType.And) {
                            return lodash_5.default.every(deps, function (dep) { return _this.isDependencyPass(dep); });
                        }
                    },
                    isLookup: function (point) {
                        return point.Characteristic ? point.Characteristic.characteristicType === PointType_3.CharacteristicType.Lookup : false;
                    },
                    getPointType: function (point) {
                        return point.Characteristic ? point.Characteristic.characteristicType : null;
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
    var vue_5, lodash_6, m_lodash_1, AddDependPointWindow_1, AddDependedPoint_1, ChangePointSettingHandler_1, PointType_4, IdGenerator_2, GraphTestControll_1, _Vue, constraints;
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
            function (PointType_4_1) {
                PointType_4 = PointType_4_1;
            },
            function (IdGenerator_2_1) {
                IdGenerator_2 = IdGenerator_2_1;
            },
            function (GraphTestControll_1_1) {
                GraphTestControll_1 = GraphTestControll_1_1;
            }
        ],
        execute: function () {
            _Vue = vue_5.default;
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
                        return this.selectedNodes ? this.selectedNodes
                            .filter(function (x) { return x.Options.type != PointType_4.PointType.characteristic || x.Characteristic.characteristicType === PointType_4.CharacteristicType.Lookup; })
                            .map(function (x) {
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
                    },
                    saveGraphUrl: function () {
                        return "api/SettingsTreeConfig";
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
                            var active = node.Options.type === PointType_4.PointType.start || lodash_6.default.findIndex(actives, function (x) { return x.name === node.name; }) >= 0;
                            var properties = !_this.IsOverviewActive && active ? {
                                fillColor: "#a6f568"
                            } : _this.getNodeProperties(node);
                            _this.diagram.updateNode(node.name, properties);
                        });
                    },
                    getNodeProperties: function (node) {
                        switch (node.Options.type) {
                            case PointType_4.PointType.start:
                                return {
                                    fillColor: "#29c15f",
                                    shape: "ellipse"
                                };
                            case PointType_4.PointType.characteristic:
                                return {
                                    fillColor: node.Characteristic.characteristicType === PointType_4.CharacteristicType.Lookup ? "#2085c9" : "#f55710",
                                    shape: "rectangle"
                                };
                            case PointType_4.PointType.aggregator:
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
                    },
                    saveGraph: function () {
                        var preparedGraph = this.prepareGraphForSave(this.graph);
                        var jGraph = JSON.stringify(this.graph);
                        this.$http.post(this.saveGraphUrl, jGraph)
                            .than(function (response) { return alert("Збереження пройшло успішно!"); }, function (error) { return alert(error); });
                    },
                    prepareGraphForSave: function (graph) {
                        var preparedGraph = _Vue.util.extend({}, this.graph);
                        preparedGraph.Nodes = preparedGraph.Nodes.map(function (x) { return lodash_6.default.merge(x, {
                            pointType: x.Options.type
                        }); });
                        return preparedGraph;
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
    var vue_6, vuex_typescript_1, lodash_7, IdGenerator_3, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty, removeConnection, removeNode;
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
            function (IdGenerator_3_1) {
                IdGenerator_3 = IdGenerator_3_1;
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
                    //plugins: [vuexLocal.plugin],
                    strict: true
                });
            });
        }
    };
});
System.register("components/ModalWindow/ModalWindow", ["vue", "mixins/IdGenerator"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var vue_8, IdGenerator_4;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
            },
            function (IdGenerator_4_1) {
                IdGenerator_4 = IdGenerator_4_1;
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
                    this.elId = IdGenerator_4.uniqId();
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
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType", "mixins/IdGenerator", "components/ModalWindow/Standart/StandartModalWindow"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var vue_10, CharacteristicDiagram_1, RootStore_1, graph, PointType_5, IdGenerator_5, StandartModalWindow_1, _Vue, store;
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
            function (PointType_5_1) {
                PointType_5 = PointType_5_1;
            },
            function (IdGenerator_5_1) {
                IdGenerator_5 = IdGenerator_5_1;
            },
            function (StandartModalWindow_1_1) {
                StandartModalWindow_1 = StandartModalWindow_1_1;
            }
        ],
        execute: function () {
            _Vue = vue_10.default;
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
                    }
                },
                asyncData: {
                    characteristics: function () {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            _this.$http.get(_this.characteristicUrl, {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                .then(function (response) { return resolve(response.data.map(function (x) {
                                return {
                                    Id: x.id,
                                    Name: x.name,
                                    lookupName: x.lookupName,
                                    characteristicType: x.characteristicType
                                };
                            })); });
                        });
                    },
                    categories: function () {
                        var _this = this;
                        return new Promise(function (resolve, reject) {
                            _this.$http.get(_this.categoryUrl)
                                .then(function (response) { return resolve(response.data.map(function (x) {
                                return {
                                    Id: x.id,
                                    Name: x.name
                                };
                            })); });
                        });
                    }
                },
                methods: {
                    addGraphClick: function () {
                        this.showAddGraph = true;
                    },
                    addGraph: function () {
                        this.showAddGraph = false;
                        graph.addGraph(this.$store, {
                            Name: "Graph_" + IdGenerator_5.uniqId(),
                            Points: [{
                                    name: IdGenerator_5.uniqId(),
                                    offsetX: 500,
                                    offsetY: 20,
                                    Label: "Start",
                                    Options: {
                                        type: PointType_5.PointType.start
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
System.register("indexCharTree", ["vue", "components/AppHello", "vue-async-data-2", "vue-async-computed", "vue-select", "vue-resource"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var vue_11, AppHello_1, vue_async_data_2_1, vue_async_computed_1, vue_select_1, vue_resource_1, _vueResource, _Vue, v;
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
            },
            function (vue_resource_1_1) {
                vue_resource_1 = vue_resource_1_1;
            }
        ],
        execute: function () {
            _vueResource = vue_resource_1.default;
            //Plugin
            vue_11.default.use(vue_async_data_2_1.default.AsyncDataPlugin);
            vue_11.default.use(_vueResource);
            vue_11.default.use(vue_async_computed_1.default);
            vue_11.default.component('v-select', vue_select_1.default);
            _Vue = vue_11.default;
            _Vue.http.interceptors.push(function (request, next) {
                request.headers.set('Content-Type', 'application/json');
                next();
            });
            _Vue.http.options.root = document.location.origin;
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
System.register("components/AsyncSelect/AsyncSelectComponent", ["vue", "mixins/IdGenerator"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var vue_12, IdGenerator_6, _Vue;
    return {
        setters: [
            function (vue_12_1) {
                vue_12 = vue_12_1;
            },
            function (IdGenerator_6_1) {
                IdGenerator_6 = IdGenerator_6_1;
            }
        ],
        execute: function () {
            _Vue = vue_12.default;
            exports_27("default", _Vue.extend({
                template: "#async-select",
                props: {
                    id: {
                        type: String,
                        default: IdGenerator_6.uniqId()
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
System.register("components/Category/AddCategoryGraphWindow", ["vue", "mixins/IdGenerator"], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var vue_13, IdGenerator_7;
    return {
        setters: [
            function (vue_13_1) {
                vue_13 = vue_13_1;
            },
            function (IdGenerator_7_1) {
                IdGenerator_7 = IdGenerator_7_1;
            }
        ],
        execute: function () {
            exports_28("default", vue_13.default.extend({
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
System.register("Model/CharacteristicPoint", [], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/IDependencyRole", [], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS1jb250cm9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvSWRHZW5lcmF0b3IudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BbnlWYWx1ZUNvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vSGFuZGxlci9BZGREZXBlbmRlZFBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb2xlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0RlcGVuZGVuY3kudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQmFzZVBvaW50LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0dyYXBoLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL0NoYXJhY3RlcmlzdGljLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1Jvb3RTdGF0ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaC50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9HcmFwaFN0b3JlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL1N0b3JlL1Jvb3RTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL01vZGFsV2luZG93L01vZGFsV2luZG93LnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvTW9kYWxXaW5kb3cvU3RhbmRhcnQvU3RhbmRhcnRNb2RhbFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2luZGV4Q2hhclRyZWUudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9Bc3luY1NlbGVjdC9Bc3luY1NlbGVjdENvbXBvbmVudC50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0NhdGVnb3J5L0FkZENhdGVnb3J5R3JhcGhXaW5kb3cudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNQb2ludC50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9JRGVwZW5kZW5jeVJvbGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3RhcnRQb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQSx5QkFBd0MsSUFBSSxFQUFFLElBQVEsRUFBRSxRQUFRLEVBQUUsT0FBWTtRQUFoQyxxQkFBQSxFQUFBLFFBQVE7UUFBWSx3QkFBQSxFQUFBLFlBQVk7UUFDN0UsSUFBSSxHQUFHLEdBQUcsZ0JBQUMsQ0FBQyxPQUFPLENBQUMsY0FBTSxPQUFBLGdCQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQS9CLENBQStCLEVB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cnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lbW9pemVEZWJvdW5jZShmdW5jLCB3YWl0ID0gMCwgcmVzb2x2ZXIsIG9wdGlvbnMgPSB7fSkge1xyXG5cdHZhciBtZW0gPSBfLm1lbW9pemUoKCkgPT4gXy5kZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSwgcmVzb2x2ZXIpO1xyXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSBmdW5jdGlvbihvYmplY3QsIGJhc2UpIHtcblx0ZnVuY3Rpb24gY2hhbmdlcyhvYmplY3QsIGJhc2UpIHtcblx0XHRyZXR1cm4gXy50cmFuc2Zvcm0ob2JqZWN0LCBmdW5jdGlvbiAocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG5cdFx0XHRpZiAoIV8uaXNFcXVhbCh2YWx1ZSwgYmFzZVtrZXldKSkge1xuXHRcdFx0XHR2YXIgcmVzID0gKF8uaXNPYmplY3QodmFsdWUpICYmIF8uaXNPYmplY3QoYmFzZVtrZXldKSkgPyBjaGFuZ2VzKHZhbHVlLCBiYXNlW2tleV0pIDogdmFsdWU7XG5cdFx0XHRcdGlmICghXy5pc0VtcHR5KHJlcykpIHtcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHZhciBjaGFuZ2VkID0gY2hhbmdlcyhvYmplY3QsIGJhc2UpO1xuXHRyZXR1cm4gXy5pc0VtcHR5KGNoYW5nZWQpID8gbnVsbCA6IGNoYW5nZWQ7XG59IiwiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgbWFwQWN0aW9ucyB9IGZyb20gXCJ2dWV4XCI7XHJcbi8v0J/RgNC4INC60L7QvNC/0LjQu9GP0YbQuNC4IHR5cGVzY3JpcHQg0LLRi9GB0LrQsNC60LjQstCw0LXRgiDQvtGI0LjQsdC60LAgXCLQvdC1INC90LDRhdC+0LTQuNGCINGB0LLQvtC50YHRgtCy0LAgdG9nZ2xlc1JvbGVzXCIg0YLQvtC70YzQutC+INC60L7Qs9C00LAgcHJvcHM6IE9iamVjdFxyXG4vL9Ce0LHRhdC+0LTQvdC+0LUg0YDQtdGI0LXQvdC40LVcclxudmFyIFZ1ZVA6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZVAuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiB7XHJcblx0XHR2YWx1ZXM6IEFycmF5LFxyXG5cdFx0aW5kZXg6IFtOdW1iZXIsIFN0cmluZ10sXHJcblx0XHRyb2xlczogQXJyYXksXHJcblx0XHRyb2xlV2l0aERldGFpbDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0dHlwZTogQXJyYXksXHJcblx0XHRcdGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZWxlY3RlZFJvbGU6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRvblJvbGVTZWxlY3RDbGljaygpIHtcclxuXHRcdFx0dGhpcy5hZGRSb2xlKHtcclxuXHRcdFx0XHRyb2xlOiB0aGlzLnNlbGVjdGVkUm9sZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRhZGRSb2xlKHJvbGVJbmZvKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnB1c2gocm9sZUluZm8pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZVJvbGVCeUluZGV4KGluZGV4KSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlc1JvbGVzLnNwbGljZShpbmRleCwgMSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dW5pcSgpIHtcclxuXHRcdFx0cmV0dXJuIFwiX1wiICsgdGhpcy5pbmRleDtcclxuXHRcdH0sXHJcblx0XHRleGlzdHNSb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucm9sZXMuZmlsdGVyKHggPT5cclxuXHRcdFx0XHRfLmZpbmRJbmRleCh0aGlzLnRvZ2dsZXNSb2xlcywgKHk6IGFueSkgPT4geS5yb2xlLk5hbWUgPT0geC5OYW1lKSA8IDBcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHRzeW5jX3RvZ2dsZXNWYWx1ZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1ZhbHVlcykgPyBbXSA6IHRoaXMudG9nZ2xlc1ZhbHVlcztcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0KHZhbCkge1xyXG5cdFx0XHRcdHRoaXMuJGVtaXQoXCJ1cGRhdGU6dG9nZ2xlc1ZhbHVlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3luY190b2dnbGVzUm9sZXM6IHtcclxuXHRcdFx0Z2V0KCkge1xyXG5cdFx0XHRcdHJldHVybiAhXy5pc0FycmF5KHRoaXMudG9nZ2xlc1JvbGVzKSA/IFtdIDogdGhpcy50b2dnbGVzUm9sZXM7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldCh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLiRlbWl0KFwidXBkYXRlOnRvZ2dsZXNSb2xlc1wiLCB2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgdW5pcUlkID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBfLnVuaXF1ZUlkKCkgKyBcIl9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbn07IiwiXHJcbmV4cG9ydCBlbnVtIFBvaW50VHlwZSB7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGNoYXJhY3RlcmlzdGljLFxyXG5cdGFnZ3JlZ2F0b3JcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQWdncmVnYXRpb25UeXBlIHtcclxuXHRBbmQgPSAwLFxyXG5cdE9yXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENoYXJhY3RlcmlzdGljVHlwZSB7XHJcblx0TG9va3VwID0gXCJUc2lHdWlkVmFsdWVcIixcclxuXHRTdHJpbmcgPSBcIlRzaVN0cmluZ1ZhbHVlXCIsXHJcblx0SW50ID0gXCJUc2lJbnRWYWx1ZVwiLFxyXG5cdERhdGVUaW1lID0gXCJUc2lEYXRlVGltZVZhbHVlXCJcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1R5cGUgfSBmcm9tIFwiLi4vLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjYW55LXZhbHVlXCIsXHJcblx0cHJvcHM6IFtcInR5cGVcIiwgXCJ2YWx1ZVwiLCBcImxhYmVsXCJdLFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRjb250cm9sbFR5cGUoKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpcy50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBDaGFyYWN0ZXJpc3RpY1R5cGUuU3RyaW5nOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwidGV4dFwiO1xyXG5cdFx0XHRcdGNhc2UgQ2hhcmFjdGVyaXN0aWNUeXBlLkludDpcclxuXHRcdFx0XHRcdHJldHVybiBcIm51bWJlclwiO1xyXG5cdFx0XHRcdGNhc2UgQ2hhcmFjdGVyaXN0aWNUeXBlLkRhdGVUaW1lOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwiZGF0ZXRpbWVcIjtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdHVwZGF0ZVZhbHVlKHZhbHVlKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJpbnB1dFwiLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFJ1bGVDb250cm9sbCBmcm9tIFwiLi9SdWxlQ29udHJvbGxcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uLy4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUsIEFnZ3JlZ2F0aW9uVHlwZSwgQ2hhcmFjdGVyaXN0aWNUeXBlIH0gZnJvbSBcIi4uLy4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgQW55VmFsdWUgZnJvbSBcIi4uL0RpYWdyYW0vQW55VmFsdWVDb250cm9sbFwiO1xyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuZGVjbGFyZSBjb25zdCBPYmplY3Q6IGFueTtcclxudmFyIF9WdWU6IGFueSA9IFZ1ZTtcclxuXHJcbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZSgpIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0cG9pbnQ6IHtcclxuXHRcdFx0bmFtZTogbnVsbCxcclxuXHRcdFx0RGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0XHRMYWJlbDogbnVsbCxcclxuXHRcdFx0Q2hhcmFjdGVyaXN0aWM6IG51bGwsXHJcblx0XHRcdFZhbHVlczogW10sXHJcblx0XHRcdFZhbHVlOiBudWxsLFxyXG5cdFx0XHRSb2xlczogbnVsbCxcclxuXHRcdFx0UmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR1bmlxSWQ6IHVuaXFJZCgpLFxyXG5cdFx0b2Zmc2V0WURlbHRhOiAyNTAsXHJcblx0XHRhZGRFeGlzdENoYXJhY3RlcmlzdGljOiBmYWxzZSxcclxuXHRcdGV4aXN0UG9pbnQ6IG51bGwsXHJcblx0XHRkZXBlbmRlbmN5OiBudWxsLFxyXG5cdFx0YWdncmVnYXRpb246IEFnZ3JlZ2F0aW9uVHlwZS5BbmRcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI2FkZC1kZXBlbmQtcG9pbnRcIixcclxuXHRwcm9wczogW1wic2hvd1wiLCBcImlkXCIsIFwiZGVmYXVsdF9kZXBlbmRlbmN5XCIsIFwicm9sZXNcIiwgXCJkZWZhdWx0UG9pbnRcIiwgXCJkZWZhdWx0RGVwZW5kZW5jeVwiLCBcImlzTW9kYWxXaW5kb3dcIiwgXCJwb2ludHNcIiwgXCJjaGFyYWN0ZXJpc3RpY3NcIl0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0UnVsZUNvbnRyb2xsLFxyXG5cdFx0QW55VmFsdWVcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRlbElkKCkge1xyXG5cdFx0XHRyZXR1cm4gXCIjYWRkLWRlcGVuZC1wb2ludF9cIiArIHRoaXMuaWQ7XHJcblx0XHR9LFxyXG5cdFx0bWFpbkNsYXNzT2JqZWN0KCkge1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG1vZGFsOiB0aGlzLmlzTW9kYWxXaW5kb3csXHJcblx0XHRcdFx0ZmFkZTogdGhpcy5pc01vZGFsV2luZG93XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0bW9kYWxNYXhXaWR0aCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaXNNb2RhbFdpbmRvdyA/IFwiODAlXCIgOiBcIjEwMCVcIjtcclxuXHRcdH0sXHJcblx0XHRlbmRQb2ludCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkRXhpc3RDaGFyYWN0ZXJpc3RpYyA/IHRoaXMuZXhpc3RQb2ludCA6IF8ubWVyZ2UodGhpcy5wb2ludCwgeyBuYW1lOiB1bmlxSWQoKSB9KTtcclxuXHRcdH0sXHJcblx0XHRjaGFyYWN0ZXJWYWx1ZVVybCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucG9pbnQuQ2hhcmFjdGVyaXN0aWMgPyBcImFwaS9DaGFyYWN0ZXJpc3RpY0xvb2t1cFZhbHVlL1wiICsgdGhpcy5wb2ludC5DaGFyYWN0ZXJpc3RpYy5sb29rdXBOYW1lIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRpc0FnZ3JlZ2F0aW9uTmVlZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGVwZW5kZW5jeSAmJiB0aGlzLmRlcGVuZGVuY3kubGVuZ3RoID4gMTtcclxuXHRcdH0sXHJcblx0XHRwb2ludFR5cGVBbmQoKSB7XHJcblx0XHRcdHJldHVybiBBZ2dyZWdhdGlvblR5cGUuQW5kO1xyXG5cdFx0fSxcclxuXHRcdHBvaW50VHlwZU9yKCkge1xyXG5cdFx0XHRyZXR1cm4gQWdncmVnYXRpb25UeXBlLk9yO1xyXG5cdFx0fSxcclxuXHRcdGFnZ3JlZ2F0aW9uTGFiZWwoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmFnZ3JlZ2F0aW9uID09PSBBZ2dyZWdhdGlvblR5cGUuQW5kID8gXCJBbmRcIiA6IFwiT3JcIjtcclxuXHRcdH0sXHJcblx0XHRpc1BvaW50Q2hhcmFjdGVyaXN0aWNMb29rdXAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnBvaW50LkNoYXJhY3RlcmlzdGljICYmIHRoaXMucG9pbnQuQ2hhcmFjdGVyaXN0aWMuY2hhcmFjdGVyaXN0aWNUeXBlID09PSBDaGFyYWN0ZXJpc3RpY1R5cGUuTG9va3VwO1xyXG5cdFx0fSxcclxuXHRcdGNoYXJhY3RlcmlzdGljVHlwZSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucG9pbnQuQ2hhcmFjdGVyaXN0aWMgPyB0aGlzLnBvaW50LkNoYXJhY3RlcmlzdGljLmNoYXJhY3RlcmlzdGljVHlwZSA6IG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHRhc3luY0NvbXB1dGVkOiB7XHJcblx0XHRjaGFyYWN0ZXJpc3RpY1ZhbHVlcygpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdGlmICh0aGlzLmNoYXJhY3RlclZhbHVlVXJsKSB7XHJcblx0XHRcdFx0XHR0aGlzLiRodHRwLmdldCh0aGlzLmNoYXJhY3RlclZhbHVlVXJsLCB7XHJcblx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlLmRhdGEubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRJZDogeC5pZCxcclxuXHRcdFx0XHRcdFx0XHRcdE5hbWU6IHgubmFtZVxyXG5cdFx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHRcdH0pKSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGF0YTogZ2V0RGVmYXVsdFZhbHVlLFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuZWxJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbih0aGlzLiRkYXRhLCBnZXREZWZhdWx0VmFsdWUoKSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoKSB7XHJcblx0XHRcdHZhciBkZXBlbmRlbmN5ID0gdGhpcy5kZXBlbmRlbmN5O1xyXG5cdFx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXRCeURlcGVuZGVuY3kodGhpcy5kZXBlbmRlbmN5KTtcclxuXHJcblx0XHRcdHZhciBwb2ludHMgPSBbXTtcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5tZXJnZSh0aGlzLmVuZFBvaW50LCB7XHJcblx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0LnkgKyB0aGlzLm9mZnNldFlEZWx0YVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGVuZFBvaW50OiBhbnkgPSBwb2ludDtcclxuXHJcblx0XHRcdHBvaW50cy5wdXNoKHBvaW50KTtcclxuXHRcdFx0aWYgKGRlcGVuZGVuY3kubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBhZGRQb2ludCA9IHtcclxuXHRcdFx0XHRcdG5hbWU6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TGFiZWw6IHRoaXMuYWdncmVnYXRpb25MYWJlbCxcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmFnZ3JlZ2F0b3IsXHJcblx0XHRcdFx0XHRcdGFnZ3JlZ2F0aW9uOiB0aGlzLmFnZ3JlZ2F0aW9uXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0LngsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiBvZmZzZXQueSArIHRoaXMub2Zmc2V0WURlbHRhIC8gMlxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cG9pbnRzLnB1c2goYWRkUG9pbnQpO1xyXG5cdFx0XHRcdGVuZFBvaW50ID0gYWRkUG9pbnQ7XHJcblx0XHRcdFx0ZGVwZW5kZW5jeS5wdXNoKHtcclxuXHRcdFx0XHRcdEVuZDogcG9pbnQsXHJcblx0XHRcdFx0XHRTdGFydDogZW5kUG9pbnQsXHJcblx0XHRcdFx0XHROYW1lOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdFJ1bGVzOiBbXVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlcGVuZGVuY3kuZmlsdGVyKHggPT4geC5FbmQgPT09IG51bGwpLmZvckVhY2goeCA9PiB4LkVuZCA9IGVuZFBvaW50KTtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNvbW1pdC1wb2ludFwiLCB7XHJcblx0XHRcdFx0cG9pbnRzOiBwb2ludHMsXHJcblx0XHRcdFx0ZGVwZW5kZW5jeTogZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlUG9pbnQoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjb21taXQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdHBvaW50czogW3RoaXMucG9pbnRdLFxyXG5cdFx0XHRcdGRlcGVuZGVuY3k6IHRoaXMuZGVwZW5kZW5jeVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvblJ1bGVDaGFuZ2UodmFsKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IHZhbC5pbmRleDtcclxuXHRcdFx0VnVlLnNldCh0aGlzLnJ1bGVzLCBpbmRleCwgdmFsKTtcclxuXHRcdH0sXHJcblx0XHRvblNlbGVjdENoYXJSdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHQvL3RoaXMucG9pbnQuVmFsdWVzID0gdmFsLlZhbHVlcztcclxuXHRcdFx0Ly90aGlzLnBvaW50LlJvbGVzID0gdmFsLlJvbGVzO1xyXG5cdFx0fSxcclxuXHRcdGdldE9mZnNldEJ5RGVwZW5kZW5jeShkZXBlbmRlbmNpZXMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0gXy5maXJzdChkZXBlbmRlbmNpZXMpO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHg6IGRlcC5TdGFydC5vZmZzZXRYLFxyXG5cdFx0XHRcdHk6IGRlcC5TdGFydC5vZmZzZXRZXHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0c2hvdyh2YWwpIHtcclxuXHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcInNob3dcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwiaGlkZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGRlZmF1bHRQb2ludChkZWZhdWx0UG9pbnQpIHtcclxuXHRcdFx0aWYgKGRlZmF1bHRQb2ludCkge1xyXG5cdFx0XHRcdHRoaXMucG9pbnQgPSBkZWZhdWx0UG9pbnQ7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkZWZhdWx0X2RlcGVuZGVuY3koZGVwKSB7XHJcblx0XHRcdHRoaXMuZGVwZW5kZW5jeSA9IF9WdWUudXRpbC5leHRlbmQoW10sIGRlcCk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBhZGREZXBlbmRQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJhZGQtZGVwZW5kLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQWRkXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbUxlZnQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTE0LjYxMywxMGMwLDAuMjMtMC4xODgsMC40MTktMC40MTksMC40MTlIMTAuNDJ2My43NzRjMCwwLjIzLTAuMTg5LDAuNDItMC40MiwwLjQycy0wLjQxOS0wLjE4OS0wLjQxOS0wLjQydi0zLjc3NEg1LjgwNmMtMC4yMywwLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDE5czAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5aDMuNzc1VjUuODA2YzAtMC4yMywwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOXMwLjQyLDAuMTg5LDAuNDIsMC40MTl2My43NzVoMy43NzRDMTQuNDI1LDkuNTgxLDE0LjYxMyw5Ljc3LDE0LjYxMywxMCBNMTcuOTY5LDEwYzAsNC40MDEtMy41NjcsNy45NjktNy45NjksNy45NjljLTQuNDAyLDAtNy45NjktMy41NjctNy45NjktNy45NjljMC00LjQwMiwzLjU2Ny03Ljk2OSw3Ljk2OS03Ljk2OUMxNC40MDEsMi4wMzEsMTcuOTY5LDUuNTk4LDE3Ljk2OSwxMCBNMTcuMTMsMTBjMC0zLjkzMi0zLjE5OC03LjEzLTcuMTMtNy4xM1MyLjg3LDYuMDY4LDIuODcsMTBjMCwzLjkzMywzLjE5OCw3LjEzLDcuMTMsNy4xM1MxNy4xMywxMy45MzMsMTcuMTMsMTBcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBDaGFuZ2VQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbj86IGFueSkge1xyXG5cdHZhciBmdW5jID0gKGZ1bmN0aW9uIChiYXNlOiBhbnkpIHtcclxuXHRcdGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uZXh0ZW5kKEFkZERlcGVuZFBvaW50LCBiYXNlKTtcclxuXHJcblx0XHRmdW5jdGlvbiBBZGREZXBlbmRQb2ludChuYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0YmFzZS5jYWxsKHRoaXMsIG5hbWUpO1xyXG5cdFx0XHR0aGlzLnNpbmdsZUFjdGlvbiA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvbmVkTm9kZXMgPSBbXTtcclxuXHRcdFx0dGhpcy5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuXHRcdH1cclxuXHRcdEFkZERlcGVuZFBvaW50LnByb3RvdHlwZS5tb3VzZXVwID0gZnVuY3Rpb24gKGV2dDogYW55KSB7XHJcblx0XHRcdGJhc2UucHJvdG90eXBlLm1vdXNldXAuY2FsbCh0aGlzLCBldnQpO1xyXG5cdFx0XHRvcHRpb24uYnVzLiRlbWl0KFwiY2hhbmdlLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQ2hhbmdlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbVJpZ2h0O1xyXG5cdGFkZERlcGVuZFBvaW50LnZpc2libGUgPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LmVuYWJsZU11bHRpU2VsZWN0aW9uID0gZmFsc2U7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTAsMi4xNzJjLTQuMzI0LDAtNy44MjgsMy41MDQtNy44MjgsNy44MjhTNS42NzYsMTcuODI4LDEwLDE3LjgyOGM0LjMyNCwwLDcuODI4LTMuNTA0LDcuODI4LTcuODI4UzE0LjMyNCwyLjE3MiwxMCwyLjE3Mk0xMCwxNy4wMDRjLTMuODYzLDAtNy4wMDQtMy4xNDEtNy4wMDQtNy4wMDNTNi4xMzcsMi45OTcsMTAsMi45OTdjMy44NjIsMCw3LjAwNCwzLjE0MSw3LjAwNCw3LjAwNFMxMy44NjIsMTcuMDA0LDEwLDE3LjAwNE0xMCw4LjU1OWMtMC43OTUsMC0xLjQ0MiwwLjY0Ni0xLjQ0MiwxLjQ0MlM5LjIwNSwxMS40NDMsMTAsMTEuNDQzczEuNDQxLTAuNjQ3LDEuNDQxLTEuNDQzUzEwLjc5NSw4LjU1OSwxMCw4LjU1OSBNMTAsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThTOS42Niw5LjM4MiwxMCw5LjM4MlMxMC42MTgsOS42NjEsMTAuNjE4LDEwUzEwLjM0LDEwLjYxOSwxMCwxMC42MTkgTTE0LjEyLDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ3LDEuNDQzLDEuNDQyLDEuNDQzczEuNDQyLTAuNjQ3LDEuNDQyLTEuNDQzUzE0LjkxNSw4LjU1OSwxNC4xMiw4LjU1OSBNMTQuMTIsMTAuNjE5Yy0wLjM0LDAtMC42MTgtMC4yNzgtMC42MTgtMC42MThzMC4yNzgtMC42MTgsMC42MTgtMC42MThTMTQuNzM4LDkuNjYxLDE0LjczOCwxMFMxNC40NiwxMC42MTksMTQuMTIsMTAuNjE5IE01Ljg4LDguNTU5Yy0wLjc5NSwwLTEuNDQyLDAuNjQ2LTEuNDQyLDEuNDQyczAuNjQ2LDEuNDQzLDEuNDQyLDEuNDQzUzcuMzIyLDEwLjc5Niw3LjMyMiwxMFM2LjY3NSw4LjU1OSw1Ljg4LDguNTU5IE01Ljg4LDEwLjYxOWMtMC4zNCwwLTAuNjE4LTAuMjc4LTAuNjE4LTAuNjE4UzUuNTQsOS4zODIsNS44OCw5LjM4MlM2LjQ5OCw5LjY2MSw2LjQ5OCwxMFM2LjIyLDEwLjYxOSw1Ljg4LDEwLjYxOVwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0SWQ6IHN0cmluZztcclxuXHROYW1lOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvbGVcclxue1xyXG5cdElkOiBzdHJpbmc7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU/OiBDaGFyYWN0ZXJpc3RpY1ZhbHVlO1xyXG59IiwiaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEZXBlbmRlbmN5IHtcclxuXHRTdGFydDogQmFzZVBvaW50LFxyXG5cdE5hbWU6IHN0cmluZzsgXHJcblx0TGFiZWw/OiBzdHJpbmc7XHJcblx0RW5kOiBCYXNlUG9pbnQ7XHJcblx0Um9sZXM/OiBBcnJheTxJUm9sZT47XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUsIEFnZ3JlZ2F0aW9uVHlwZSB9IGZyb20gXCIuL1BvaW50VHlwZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBCYXNlUG9pbnQge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRvZmZzZXRYOiBhbnk7XHJcblx0b2Zmc2V0WTogYW55O1xyXG5cdE9wdGlvbnM6IHtcclxuXHRcdHR5cGU6IFBvaW50VHlwZTtcclxuXHRcdGFnZ3JlZ2F0aW9uPzogQWdncmVnYXRpb25UeXBlO1xyXG5cdH0sXHJcblx0TGFiZWw6IHN0cmluZztcclxuXHRDYXRlZ29yeToge1xyXG5cdFx0SWQ6IHN0cmluZyxcclxuXHRcdE5hbWU6IHN0cmluZ1xyXG5cdH07XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlLCBBZ2dyZWdhdGlvblR5cGUsIENoYXJhY3RlcmlzdGljVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgQW55VmFsdWUgZnJvbSBcIi4uL0FueVZhbHVlQ29udHJvbGxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNncmFwaC10ZXN0XCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCJdLFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdEFueVZhbHVlXHJcblx0fSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2VsZWN0ZWRWYWx1ZXM6IFtdLFxyXG5cdFx0XHRkeW5hbWljOiB7XHJcblx0XHRcdFx0UG9pbnRzOiBbXVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGFjdGl2ZVBvaW50cygpIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0XHRpZiAodGhpcy5wb2ludHMpIHtcclxuXHRcdFx0XHR2YXIgc3RhcnRQb2ludCA9IF8uZmluZCh0aGlzLnBvaW50cywgcCA9PiBwLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0KTtcclxuXHRcdFx0XHRyZXN1bHQgPSB0aGlzLmdldFZpc2libGVDaGlsZHJlbnMoc3RhcnRQb2ludCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH0sXHJcblx0XHRhY3RpdmVDaGFyYWN0ZXJpc3RpY3MoKSB7XHJcblx0XHRcdHZhciByZXN1bHQgPSB0aGlzLmFjdGl2ZVBvaW50cy5maWx0ZXIoeCA9PiB4Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKTtcclxuXHRcdFx0dGhpcy4kZW1pdChcImFjdGl2ZVwiLCByZXN1bHQpO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fSxcclxuXHRcdHBvaW50cygpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRpc0Zyb21TdGFydChub2RlKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmRJbmRleCh0aGlzLmdyYXBoLkNvbm5lY3RvcnMsICh4OiBhbnkpID0+IHguU3RhcnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuc3RhcnQgJiYgeC5FbmQubmFtZSA9PT0gbm9kZS5uYW1lKSA+PSAwO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50SW5EZXBlbmRlbmNpZXMocG9pbnQpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LkVuZC5uYW1lID09PSBwb2ludC5uYW1lKTtcclxuXHRcdH0sXHJcblx0XHRnZXRTdGFydFBvaW50QnlEZXAoZGVwKSB7XHJcblx0XHRcdHJldHVybiBfLmZpbmQodGhpcy5wb2ludHMsIHggPT4geC5uYW1lID09PSBkZXAuU3RhcnQubmFtZSk7XHJcblx0XHR9LFxyXG5cdFx0cmVBY3RpdmVDaGlsZHJlbnMocG9pbnQpIHtcclxuXHRcdFx0dmFyIGNoaWxkcmVucyA9IHRoaXMuZ2V0Q2hpbGRyZW4ocG9pbnQpO1xyXG5cdFx0XHRjaGlsZHJlbnMuZm9yRWFjaChjaGlsZCA9PiB7XHJcblx0XHRcdFx0aWYgKCFjaGlsZCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgZGVwcyA9IHRoaXMuZ2V0UG9pbnRJbkRlcGVuZGVuY2llcyhjaGlsZCk7XHJcblx0XHRcdFx0Y2hpbGQuQWN0aXZlID0gXy5maW5kSW5kZXgoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKSA+PSAwO1xyXG5cdFx0XHRcdGlmICghY2hpbGQuQWN0aXZlKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlQWN0aXZlQ2hpbGRyZW5zKGNoaWxkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGdldENoaWxkcmVuKG5vZGUpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5maWx0ZXIoeCA9PiB4LlN0YXJ0Lm5hbWUgPT09IG5vZGUubmFtZSkubWFwKHggPT4gdGhpcy5nZXRQb2ludEJ5TmFtZSh4LkVuZC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0aXNEZXBlbmRlbmN5UGFzcyhkZXApIHtcclxuXHRcdFx0dmFyIHN0YXJ0ID0gZGVwLlN0YXJ0O1xyXG5cdFx0XHR2YXIgdmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzW3N0YXJ0Lm5hbWVdO1xyXG5cdFx0XHRpZiAoZGVwLlJ1bGVzKSB7XHJcblx0XHRcdFx0aWYgKHN0YXJ0Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljKSB7XHJcblx0XHRcdFx0XHRpZiAoXy5pc0FycmF5KGRlcC5SdWxlcy5WYWx1ZXMpICYmIGRlcC5SdWxlcy5WYWx1ZXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBfLmZpbmRJbmRleChkZXAuUnVsZXMuVmFsdWVzLCAoeDogYW55KSA9PiB4LklkID09PSB2YWx1ZS5JZCkgPj0gMDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50QnlOYW1lKG5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIF8uZmluZCh0aGlzLnBvaW50cywgeCA9PiB4Lm5hbWUgPT09IG5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdGdldFZpc2libGVDaGlsZHJlbnM6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0XHR2YXIgY2hpbGRyZW5zID0gdGhpcy5nZXRDaGlsZHJlbihwb2ludCk7XHJcblx0XHRcdHZhciBhY3RpdmVzID0gY2hpbGRyZW5zLmZpbHRlcih4ID0+IHtcclxuXHRcdFx0XHRpZiAoIXgpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dmFyIGRlcHMgPSB0aGlzLmdldFBvaW50SW5EZXBlbmRlbmNpZXMoeCk7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2hlY2tEZXBlbmRlbmN5KHgsIGRlcHMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dmFyIGFjdGl2ZUNoaWxkcmVucyA9IFtdO1xyXG5cdFx0XHRhY3RpdmVzLmZvckVhY2goeCA9PiBhY3RpdmVDaGlsZHJlbnMgPSBfLmNvbmNhdChhY3RpdmVDaGlsZHJlbnMsIHRoaXMuZ2V0VmlzaWJsZUNoaWxkcmVucyh4KSkpO1xyXG5cdFx0XHRyZXR1cm4gXy51bmlvbihhY3RpdmVzLCBhY3RpdmVDaGlsZHJlbnMpO1xyXG5cdFx0fSxcclxuXHRcdGNoZWNrRGVwZW5kZW5jeShwb2ludCwgZGVwcykge1xyXG5cdFx0XHRpZiAoXy5pbmNsdWRlcyhbUG9pbnRUeXBlLmNoYXJhY3RlcmlzdGljLCBQb2ludFR5cGUuc3RhcnRdLCBwb2ludC5PcHRpb25zLnR5cGUpIHx8XHJcblx0XHRcdFx0KHBvaW50Lk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLmFnZ3JlZ2F0b3IgJiYgcG9pbnQuT3B0aW9ucy5hZ2dyZWdhdGlvbiA9PT0gQWdncmVnYXRpb25UeXBlLk9yKSkge1xyXG5cdFx0XHRcdHJldHVybiBfLnNvbWUoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocG9pbnQuT3B0aW9ucy50eXBlID09PSBQb2ludFR5cGUuYWdncmVnYXRvciAmJiBwb2ludC5PcHRpb25zLmFnZ3JlZ2F0aW9uID09PSBBZ2dyZWdhdGlvblR5cGUuQW5kKSB7XHJcblx0XHRcdFx0cmV0dXJuIF8uZXZlcnkoZGVwcywgZGVwID0+IHRoaXMuaXNEZXBlbmRlbmN5UGFzcyhkZXApKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGlzTG9va3VwKHBvaW50KSB7XHJcblx0XHRcdHJldHVybiBwb2ludC5DaGFyYWN0ZXJpc3RpYyA/IHBvaW50LkNoYXJhY3RlcmlzdGljLmNoYXJhY3RlcmlzdGljVHlwZSA9PT0gQ2hhcmFjdGVyaXN0aWNUeXBlLkxvb2t1cCA6IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGdldFBvaW50VHlwZShwb2ludCkge1xyXG5cdFx0XHRyZXR1cm4gcG9pbnQuQ2hhcmFjdGVyaXN0aWMgPyBwb2ludC5DaGFyYWN0ZXJpc3RpYy5jaGFyYWN0ZXJpc3RpY1R5cGUgOiBudWxsO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKCkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiZ3JhcGgtY2hhbmdlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFwic3luY2Z1c2lvblwiO1xyXG5pbXBvcnQgbWVtb2l6ZURlYm91bmNlLCB7IGRpZmZlcmVuY2UgfSBmcm9tIFwiLi4vbWl4aW5zL21fbG9kYXNoXCI7XHJcbmltcG9ydCBhZGREZXBlbmRNb2RhbFdpbmRvdyBmcm9tIFwiLi9EaWFncmFtL0FkZERlcGVuZFBvaW50V2luZG93XCI7XHJcbmltcG9ydCBjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0FkZERlcGVuZGVkUG9pbnRcIjtcclxuaW1wb3J0IGNyZWF0ZUNoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXIgZnJvbSBcIi4vRGlhZ3JhbS9IYW5kbGVyL0NoYW5nZVBvaW50U2V0dGluZ0hhbmRsZXJcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUsIENoYXJhY3RlcmlzdGljVHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB0ZXN0Q29udHJvbGwgZnJvbSBcIi4vRGlhZ3JhbS9UZXN0L0dyYXBoVGVzdENvbnRyb2xsXCI7XHJcbmRlY2xhcmUgY29uc3QgZWo6IGFueTtcclxudmFyIF9WdWU6IGFueSA9IFZ1ZTtcclxudmFyIGNvbnN0cmFpbnRzID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRGVmYXVsdCB8IGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uRGlhZ3JhbUNvbnN0cmFpbnRzLkZsb2F0RWxlbWVudHM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjY2hhcmFjdGVyaXN0aWMtZGlhZ3JhbVwiLFxyXG5cdHByb3BzOiBbXCJncmFwaFwiLCBcImNsYXNzZXNcIiwgXCJoZWlnaHRcIiwgXCJjaGFyYWN0ZXJpc3RpY3NcIiwgXCJyb2xlc1wiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YnVzOiBuZXcgVnVlKCksXHJcblx0XHRcdHNob3dEZXBlbmRNb2RhbDogZmFsc2UsXHJcblx0XHRcdG9mZnNldFlNYXJnaW46IDI1MCxcclxuXHRcdFx0YWRkTW9kZTogZmFsc2UsXHJcblx0XHRcdGRpYWdyYW1Jbml0OiBmYWxzZSxcclxuXHRcdFx0c2VsZWN0ZWROb2RlczogW10sXHJcblx0XHRcdGlzTW9kYWxXaW5kb3c6IHRydWUsXHJcblx0XHRcdElzT3ZlcnZpZXdBY3RpdmU6IHRydWVcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0aGVpZ2h0UHgoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmhlaWdodCArIFwicHhcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5hbWU7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuZGlhZ3JhbUlkO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1PdmVydmlld0VsSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1FbElkICsgXCJfb3ZlcnZpZXdcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5kaWFncmFtSW5pdCA/ICQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKFwiaW5zdGFuY2VcIikgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZSgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWROb2RlcyAmJiB0aGlzLnNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMCA/IHRoaXMuc2VsZWN0ZWROb2Rlc1swXSA6IG51bGw7XHJcblx0XHR9LFxyXG5cdFx0Zmlyc3RTZWxlY3ROb2RlVmFsdWVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5maXJzdFNlbGVjdE5vZGUgPyB0aGlzLmZpcnN0U2VsZWN0Tm9kZS5WYWx1ZXMgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGZpcnN0U2VsZWN0Tm9kZURlcGVuZGVuY3koKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoICYmIHRoaXMuZmlyc3RTZWxlY3ROb2RlID8gdGhpcy5ncmFwaC5Db25uZWN0b3JzLmZpbHRlcih4ID0+IHguRW5kLm5hbWUgPT09IHRoaXMuZmlyc3RTZWxlY3ROb2RlLm5hbWUpIDogbnVsbDtcclxuXHRcdH0sXHJcblx0XHRkZXBlbmRTZWxlY3RlZE5vZGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE5vZGVzID8gdGhpcy5zZWxlY3RlZE5vZGVzXHJcblx0XHRcdFx0LmZpbHRlcih4ID0+IHguT3B0aW9ucy50eXBlICE9IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYyB8fCB4LkNoYXJhY3RlcmlzdGljLmNoYXJhY3RlcmlzdGljVHlwZSA9PT0gQ2hhcmFjdGVyaXN0aWNUeXBlLkxvb2t1cClcclxuXHRcdFx0XHQubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRcdFN0YXJ0OiB4LFxyXG5cdFx0XHRcdFx0XHRFbmQ6IG51bGwsXHJcblx0XHRcdFx0XHRcdFJ1bGVzOiB7XHJcblx0XHRcdFx0XHRcdFx0VmFsdWVzOiBbXSxcclxuXHRcdFx0XHRcdFx0XHRSb2xlczogW11cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0fSkgOiBudWxsO1xyXG5cdFx0fSxcclxuXHRcdGNvbm5lY3RvcnMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4gdGhpcy51cGRhdGVDb25uZWN0b3JMYWJlbCh4KSk7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLkNvbm5lY3RvcnM7XHJcblx0XHR9LFxyXG5cdFx0bm9kZXMoKSB7XHJcblx0XHRcdHRoaXMuZ3JhcGguTm9kZXMuZm9yRWFjaCh4ID0+IHRoaXMudXBkYXRlTm9kZUxhYmVsKHgpKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTm9kZXM7XHJcblx0XHR9LFxyXG5cdFx0c2F2ZUdyYXBoVXJsKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJhcGkvU2V0dGluZ3NUcmVlQ29uZmlnXCI7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRzZWxlY3Rpb25DaGFuZ2Uoc2VsZWN0ZWRJdGVtcykge1xyXG5cdFx0XHRpZiAoIXNlbGVjdGVkSXRlbXMgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IG51bGw7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBzZWxlY3RlZE5vZGVzID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoeCA9PiB4Ll90eXBlID09PSBcIm5vZGVcIik7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IF8ubWFwKHNlbGVjdGVkTm9kZXMsICh4OiBhbnkpID0+IF8uZmluZCh0aGlzLmdyYXBoLk5vZGVzLCB5ID0+IHkubmFtZSA9PT0geC5uYW1lKSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnRBbmREZXBlbmRlbmN5KG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IG9wdGlvbnMucG9pbnRzO1xyXG5cdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG9wdGlvbnMuZGVwZW5kZW5jeTtcclxuXHJcblx0XHRcdHBvaW50cy5mb3JFYWNoKHBvaW50ID0+IHRoaXMuY29tbWl0UG9pbnQocG9pbnQpKTtcclxuXHRcdFx0ZGVwZW5kZW5jeS5mb3JFYWNoKGRlcCA9PiB0aGlzLmNvbW1pdENvbm5lY3Rpb24oZGVwKSk7XHJcblxyXG5cdFx0XHR0aGlzLnNob3dEZXBlbmRNb2RhbCA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGNvbW1pdENvbm5lY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRkZXA6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0Y29tbWl0UG9pbnQob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRwb2ludDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHRoaXMuYWRkTW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb24/OiBhbnkpIHtcclxuXHRcdFx0dGhpcy5hZGRNb2RlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuc2hvd0RlcGVuZE1vZGFsID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR1cGRhdGVOb2RlUHJvcDogbWVtb2l6ZURlYm91bmNlKGZ1bmN0aW9uIChhcmdzKSB7XHJcblx0XHRcdHZhciBub2RlID0gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIG5vZGUgPT4gbm9kZS5uYW1lID09PSBhcmdzLmVsZW1lbnQubmFtZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcIm5vZGUtcHJvcC1jaGFuZ2VcIiwge1xyXG5cdFx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdG5hbWU6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdHByb3BOYW1lOiBhcmdzLnByb3BlcnR5TmFtZSxcclxuXHRcdFx0XHRcdG5ld1ZhbHVlOiBhcmdzLmVsZW1lbnRbYXJncy5wcm9wZXJ0eU5hbWVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDUwMCwgeCA9PiB4LnByb3BlcnR5TmFtZSksXHJcblx0XHR1cGRhdGVOb2RlTGFiZWwobm9kZSkge1xyXG5cdFx0XHRpZiAobm9kZS5PcHRpb25zKSB7XHJcblx0XHRcdFx0dmFyIHByb3BlcnR5ID0gdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHRfLmFzc2lnbihub2RlLCBwcm9wZXJ0eSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFub2RlLmxhYmVscyB8fCBub2RlLmxhYmVscy5sZW5ndGggPD0gMCkge1xyXG5cdFx0XHRcdG5vZGUubGFiZWxzID0gW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwibGFiZWwxXCIsXHJcblx0XHRcdFx0XHRib2xkOiB0cnVlLFxyXG5cdFx0XHRcdFx0Zm9udENvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQsXHJcblx0XHRcdFx0XHR2ZXJ0aWNhbEFsaWdubWVudDogZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5WZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20sXHJcblx0XHRcdFx0XHRvZmZzZXQ6IHtcclxuXHRcdFx0XHRcdFx0eTogMS4yLFxyXG5cdFx0XHRcdFx0XHR4OiAwLjhcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRib3VuZGFyeUNvbnN0cmFpbnRzOiBmYWxzZVxyXG5cdFx0XHRcdH1dO1xyXG5cdFx0XHR9XHJcblx0XHRcdG5vZGUubGFiZWxzWzBdLnRleHQgPSBub2RlLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZUNvbm5lY3RvckxhYmVsKGNvbm5lY3Rvcikge1xyXG5cdFx0XHRpZiAoIWNvbm5lY3Rvci5sYWJlbHMgfHwgY29ubmVjdG9yLmxhYmVscy5sZW5naHQgPD0gMCkge1xyXG5cdFx0XHRcdGNvbm5lY3Rvci5sYWJlbHMgPSBbe1xyXG5cdFx0XHRcdFx0bmFtZTogXCJsYWJlbDJcIixcclxuXHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRmb250Q29sb3I6IFwiYmxhY2tcIixcclxuXHRcdFx0XHRcdGFsaWdubWVudDogXCJjZW50ZXJcIixcclxuXHRcdFx0XHRcdGJvdW5kYXJ5Q29uc3RyYWludHM6IGZhbHNlLFxyXG5cdFx0XHRcdFx0b2Zmc2V0OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlBvaW50KDAsIDApXHJcblx0XHRcdFx0fV07XHJcblx0XHRcdH1cclxuXHRcdFx0Y29ubmVjdG9yLmxhYmVsc1swXS50ZXh0ID0gY29ubmVjdG9yLkxhYmVsO1xyXG5cdFx0fSxcclxuXHRcdGdvVGVzdCgpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Z29PdmVydmlldygpIHtcclxuXHRcdFx0dGhpcy5Jc092ZXJ2aWV3QWN0aXZlID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHR0ZXN0QWN0aXZlTm9kZShhY3RpdmVzKSB7XHJcblx0XHRcdGlmICghXy5pc0FycmF5KGFjdGl2ZXMpIHx8ICF0aGlzLmRpYWdyYW0pIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5ncmFwaC5Ob2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG5cdFx0XHRcdHZhciBhY3RpdmUgPSBub2RlLk9wdGlvbnMudHlwZSA9PT0gUG9pbnRUeXBlLnN0YXJ0IHx8IF8uZmluZEluZGV4KGFjdGl2ZXMsIHggPT4geC5uYW1lID09PSBub2RlLm5hbWUpID49IDA7XHJcblx0XHRcdFx0dmFyIHByb3BlcnRpZXMgPSAhdGhpcy5Jc092ZXJ2aWV3QWN0aXZlICYmIGFjdGl2ZSA/IHtcclxuXHRcdFx0XHRcdGZpbGxDb2xvcjogXCIjYTZmNTY4XCJcclxuXHRcdFx0XHR9IDogdGhpcy5nZXROb2RlUHJvcGVydGllcyhub2RlKTtcclxuXHRcdFx0XHR0aGlzLmRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIHByb3BlcnRpZXMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9LFxyXG5cdFx0Z2V0Tm9kZVByb3BlcnRpZXMobm9kZSkge1xyXG5cdFx0XHRzd2l0Y2ggKG5vZGUuT3B0aW9ucy50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBQb2ludFR5cGUuc3RhcnQ6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiIzI5YzE1ZlwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvcjogbm9kZS5DaGFyYWN0ZXJpc3RpYy5jaGFyYWN0ZXJpc3RpY1R5cGUgPT09IENoYXJhY3RlcmlzdGljVHlwZS5Mb29rdXAgPyBcIiMyMDg1YzlcIiA6IFwiI2Y1NTcxMFwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJyZWN0YW5nbGVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgUG9pbnRUeXBlLmFnZ3JlZ2F0b3I6XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3I6IFwiI2VjN2UwZFwiLFxyXG5cdFx0XHRcdFx0XHRzaGFwZTogXCJlbGxpcHNlXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHJlbW92ZUNvbm5lY3Rvcihjb25uZWN0b3IpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcInJlbW92ZS1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdGNvbm5lY3Rvck5hbWU6IGNvbm5lY3Rvci5OYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUobm9kZSkge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwicmVtb3ZlLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0bm9kZU5hbWU6IG5vZGUubmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjb25uZWN0aW9uQ2hhbmdlKG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIGRlcDogYW55ID0ge1xyXG5cdFx0XHRcdE5hbWU6IG9wdGlvbnMuZWxlbWVudC5OYW1lXHJcblx0XHRcdH07XHJcblx0XHRcdHN3aXRjaCAob3B0aW9ucy5lbmRQb2ludCkge1xyXG5cdFx0XHRcdGNhc2UgXCJ0YXJnZXRFbmRQb2ludFwiOlxyXG5cdFx0XHRcdFx0ZGVwLkVuZCA9IG9wdGlvbnMuY29ubmVjdGlvblxyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcInNvdXJjZUVuZFBvaW50XCI6XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmdyYXBoLk5hbWUsXHJcblx0XHRcdFx0ZGVwXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHNhdmVHcmFwaCgpIHtcclxuXHRcdFx0dmFyIHByZXBhcmVkR3JhcGggPSB0aGlzLnByZXBhcmVHcmFwaEZvclNhdmUodGhpcy5ncmFwaCk7XHJcblx0XHRcdHZhciBqR3JhcGggPSBKU09OLnN0cmluZ2lmeSh0aGlzLmdyYXBoKTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuJGh0dHAucG9zdCh0aGlzLnNhdmVHcmFwaFVybCwgakdyYXBoKVxyXG5cdFx0XHRcdC50aGFuKHJlc3BvbnNlID0+IGFsZXJ0KFwi0JfQsdC10YDQtdC20LXQvdC90Y8g0L/RgNC+0LnRiNC70L4g0YPRgdC/0ZbRiNC90L4hXCIpLCBlcnJvciA9PiBhbGVydChlcnJvcikpO1xyXG5cdFx0fSxcclxuXHRcdHByZXBhcmVHcmFwaEZvclNhdmUoZ3JhcGgpIHtcclxuXHRcdFx0dmFyIHByZXBhcmVkR3JhcGggPSBfVnVlLnV0aWwuZXh0ZW5kKHt9LCB0aGlzLmdyYXBoKTtcclxuXHRcdFx0cHJlcGFyZWRHcmFwaC5Ob2RlcyA9IHByZXBhcmVkR3JhcGguTm9kZXMubWFwKHggPT4gXy5tZXJnZSh4LCB7XHJcblx0XHRcdFx0cG9pbnRUeXBlOiB4Lk9wdGlvbnMudHlwZVxyXG5cdFx0XHR9KSlcclxuXHRcdFx0cmV0dXJuIHByZXBhcmVkR3JhcGg7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0dmFyICR0aGlzID0gdGhpcztcclxuXHRcdHRoaXMuYnVzLiRvbihcImFkZC1kZXBlbmQtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdHRoaXMuYnVzLiRvbihcImNoYW5nZS1wb2ludFwiLCAob3B0aW9ucz86IGFueSkgPT4gdGhpcy5vcGVuQ2hhbmdlUG9pbnRNb2RhbChvcHRpb25zKSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbSh7XHJcblx0XHRcdGVuYWJsZUNvbnRleHRNZW51OiBmYWxzZSxcclxuXHRcdFx0Y29uc3RyYWludHMsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4LFxyXG5cdFx0XHRub2RlczogdGhpcy5ub2RlcyxcclxuXHRcdFx0Y29ubmVjdG9yczogdGhpcy5jb25uZWN0b3JzLFxyXG5cdFx0XHRkZWZhdWx0U2V0dGluZ3M6IHtcclxuXHRcdFx0XHRub2RlOiB7XHJcblx0XHRcdFx0XHR3aWR0aDogNjUsXHJcblx0XHRcdFx0XHRoZWlnaHQ6IDY1LFxyXG5cdFx0XHRcdFx0Ym9yZGVyV2lkdGg6IDBcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGNvbm5lY3Rvcjoge1xyXG5cdFx0XHRcdFx0c2VnbWVudHM6IFt7XHJcblx0XHRcdFx0XHRcdFwidHlwZVwiOiBcIm9ydGhvZ29uYWxcIlxyXG5cdFx0XHRcdFx0fV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNjcm9sbFNldHRpbmdzOiB7XHJcblx0XHRcdFx0aG9yaXpvbnRhbE9mZnNldDogMCxcclxuXHRcdFx0XHR2ZXJ0aWNhbE9mZnNldDogMCxcclxuXHRcdFx0XHR6b29tRmFjdG9yOiAwLjJcclxuXHRcdFx0fSxcclxuXHRcdFx0ZW5hYmxlQXV0b1Njcm9sbDogdHJ1ZSxcclxuXHRcdFx0cGFnZVNldHRpbmdzOiB7XHJcblx0XHRcdFx0c2Nyb2xsTGltaXQ6IFwiaW5maW5pdHlcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZWxlY3RlZEl0ZW1zOiB7XHJcblx0XHRcdFx0dXNlckhhbmRsZXM6IFtjcmVhdGVBZGREZXBlbmRQb2ludEhhbmRsZXIoe1xyXG5cdFx0XHRcdFx0YnVzOiB0aGlzLmJ1c1xyXG5cdFx0XHRcdH0pLCBjcmVhdGVDaGFuZ2VQb2ludFNldHRpbmdIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KV1cclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvcGVydHlDaGFuZ2UoYXJncykge1xyXG5cdFx0XHRcdGlmIChhcmdzLmVsZW1lbnRUeXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdFx0aWYgKF8uaW5jbHVkZXMoW1wib2Zmc2V0WFwiLCBcIm9mZnNldFlcIl0sIGFyZ3MucHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHQkdGhpcy51cGRhdGVOb2RlUHJvcChhcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdHNlbGVjdGlvbkNoYW5nZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdFx0XHQkdGhpcy5zZWxlY3Rpb25DaGFuZ2Uob3B0aW9ucy5zZWxlY3RlZEl0ZW1zKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29ubmVjdG9yQ29sbGVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY2hhbmdlVHlwZSA9PT0gXCJyZW1vdmVcIikge1xyXG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ29ubmVjdG9yKG9wdGlvbnMuZWxlbWVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRub2RlQ29sbGVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuY2hhbmdlVHlwZSA9PT0gXCJyZW1vdmVcIikge1xyXG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlTm9kZShvcHRpb25zLmVsZW1lbnQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y29ubmVjdGlvbkNoYW5nZShvcHRpb25zKSB7XHJcblx0XHRcdFx0JHRoaXMuY29ubmVjdGlvbkNoYW5nZShvcHRpb25zKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHQkKHRoaXMuZGlhZ3JhbU92ZXJ2aWV3RWxJZCkuZWpPdmVydmlldyh7XHJcblx0XHRcdHNvdXJjZUlEOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHhcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5kaWFncmFtSW5pdCA9IHRydWU7XHJcblx0fSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRhZGREZXBlbmRNb2RhbFdpbmRvdyxcclxuXHRcdHRlc3RDb250cm9sbFxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdGdyYXBoKHZhbCkge1xyXG5cdFx0XHR2YXIgZGlhZ3JhbSA9IHRoaXMuZGlhZ3JhbTtcclxuXHRcdFx0dmFyIG5vZGVzID0gZGlhZ3JhbS5ub2RlcygpO1xyXG5cdFx0XHR2YXIgY29ubmVjdG9ycyA9IGRpYWdyYW0uY29ubmVjdG9ycygpO1xyXG5cdFx0XHR2YWwuTm9kZXMuZm9yRWFjaCh4ID0+IHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZU5vZGVMYWJlbCh4KTtcclxuXHRcdFx0XHR2YXIgbm9kZSA9IF8uZmluZChub2RlcywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lm5hbWUpO1xyXG5cdFx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZk5vZGUgPSBkaWZmZXJlbmNlKHgsIG5vZGUpO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZOb2RlKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTm9kZShub2RlLm5hbWUsIGRpZmZOb2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBkaWZmTGFiZWwgPSBkaWZmZXJlbmNlKHgubGFiZWxzWzBdLCBub2RlLmxhYmVsc1swXSk7XHJcblx0XHRcdFx0XHRpZiAoZGlmZkxhYmVsKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwobm9kZS5uYW1lLCBub2RlLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR2YWwuQ29ubmVjdG9ycy5mb3JFYWNoKHggPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlQ29ubmVjdG9yTGFiZWwoeCk7XHJcblx0XHRcdFx0dmFyIGNvbm4gPSBfLmZpbmQoY29ubmVjdG9ycywgKHk6IGFueSkgPT4geS5uYW1lID09PSB4Lk5hbWUpO1xyXG5cdFx0XHRcdGlmIChjb25uKSB7XHJcblx0XHRcdFx0XHR2YXIgZGlmZkNvbm4gPSBkaWZmZXJlbmNlKHgsIGNvbm4pO1xyXG5cdFx0XHRcdFx0aWYgKGRpZmZDb25uKSB7XHJcblx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlQ29ubmVjdG9yKGNvbm4ubmFtZSwgZGlmZkNvbm4pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGNvbm4ubGFiZWxzLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0XHRcdFx0dmFyIGRpZmZMYWJlbCA9IGRpZmZlcmVuY2UoeC5sYWJlbHNbMF0sIGNvbm4ubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdFx0aWYgKGRpZmZMYWJlbCkge1xyXG5cdFx0XHRcdFx0XHRcdGRpYWdyYW0udXBkYXRlTGFiZWwoY29ubi5uYW1lLCBjb25uLmxhYmVsc1swXSwgZGlmZkxhYmVsKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0ZGlhZ3JhbS5hZGRMYWJlbChjb25uLm5hbWUsIHgubGFiZWxzWzBdKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZGlhZ3JhbS5hZGQoeClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IHsgQWN0aW9uQ29udGV4dCwgU3RvcmUgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBnZXRTdG9yZUFjY2Vzc29ycyB9IGZyb20gXCJ2dWV4LXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi9EZXBlbmRlbmN5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdyYXBoIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0UG9pbnRzOiBBcnJheTxCYXNlUG9pbnQ+O1xyXG5cdERlcGVuZGVuY2llczogQXJyYXk8RGVwZW5kZW5jeT47XHJcbn0iLCJpbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpYyB7XHJcblx0TmFtZTogc3RyaW5nO1xyXG5cdFZhbHVlczogQXJyYXk8Q2hhcmFjdGVyaXN0aWNWYWx1ZT47XHJcbn0iLCJpbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuL0dyYXBoXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNcIjtcclxuaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdGF0ZSB7XHJcblx0R3JhcGhzOiBBcnJheTxHcmFwaD47XHJcblx0Q2hhcmFjdGVyaXN0aWNzOiBBcnJheTxDaGFyYWN0ZXJpc3RpYz47XHJcblx0Um9sZXM6IEFycmF5PElSb2xlPjtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XHJcblx0bmFtZTogc3RyaW5nXHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIENvbm5lY3RvciB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdHNvdXJjZU5vZGU6IHN0cmluZztcclxuXHR0YXJnZXROb2RlOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4vTm9kZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi9Db25uZWN0b3JcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2ZHcmFwaCB7XHJcblx0TmFtZTogc3RyaW5nLFxyXG5cdE5vZGVzOiBBcnJheTxOb2RlPjtcclxuXHRDb25uZWN0b3JzOiBBcnJheTxDb25uZWN0b3I+O1xyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IEFjdGlvbkNvbnRleHQsIFN0b3JlLCBHZXR0ZXJUcmVlIH0gZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgZ2V0U3RvcmVBY2Nlc3NvcnMgfSBmcm9tIFwidnVleC10eXBlc2NyaXB0XCI7XHJcbmltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL0dyYXBoXCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBTZkdyYXBoIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Db25uZWN0b3JcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJodHRwMlwiO1xyXG5pbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4uL01vZGVsL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHsgUG9pbnRUeXBlIH0gZnJvbSBcIi4uL01vZGVsL1BvaW50VHlwZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG50eXBlIEdyYXBoQ29udGV4dCA9IEFjdGlvbkNvbnRleHQ8Um9vdFN0YXRlLCBSb290U3RhdGU+O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdyYXBoTW9kdWxlID0ge1xyXG5cdG5hbWVzcGFjZWQ6IHRydWUsXHJcblxyXG5cdHN0YXRlOiB7XHJcblx0XHRHcmFwaHM6IFtcclxuXHRcdF0sXHJcblx0XHRDaGFyYWN0ZXJpc3RpY3M6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAxXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDJcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAzXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDNcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMVwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAzXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNFwiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDVcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA2XCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgN1wiXHJcblx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDhcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA5XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRdLFxyXG5cdFx0Um9sZXM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdElkOiB1bmlxSWQoKSxcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRJZDogdW5pcUlkKCksXHJcblx0XHRcdFx0TmFtZTogXCJSb2xlIDJcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0SWQ6IHVuaXFJZCgpLFxyXG5cdFx0XHRcdE5hbWU6IFwiUm9sZSAzXCJcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cdH0sXHJcblx0Z2V0dGVyczoge1xyXG5cdFx0Z2V0R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzO1xyXG5cdFx0fSxcclxuXHRcdGdyYXBoQ291bnQoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzLmxlbmd0aDtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKG5hbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdHZhciBncmFwaCA9IF8uZmlyc3Qoc3RhdGUuR3JhcGhzLmZpbHRlcih4ID0+IHguTmFtZSA9PT0gbmFtZSkpO1xyXG5cdFx0XHRcdHJldHVybiBncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlKShncmFwaCk7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKGdyYXBoOiBHcmFwaCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHROYW1lOiBncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0Tm9kZXM6IGdyYXBoLlBvaW50cyxcclxuXHRcdFx0XHRcdENvbm5lY3RvcnM6IF8ubWFwKGdyYXBoLkRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGNvbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5tZXJnZSh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29uLk5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c291cmNlTm9kZTogY29uLlN0YXJ0ID8gY29uLlN0YXJ0Lm5hbWUgOiBudWxsLFxyXG5cdFx0XHRcdFx0XHRcdHRhcmdldE5vZGU6IGNvbi5FbmQgPyBjb24uRW5kLm5hbWU6IG51bGxcclxuXHRcdFx0XHRcdFx0fSwgY29uKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkNoYXJhY3RlcmlzdGljcztcclxuXHRcdH0sXHJcblx0XHRnZXRSb2xlcyhzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5Sb2xlcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG11dGF0aW9uczoge1xyXG5cdFx0YWRkR3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogR3JhcGgpIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLnB1c2goaXRlbSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlUG9pbnRJbmRleCA9IF8uZmluZEluZGV4KGdyYXBoLlBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ucG9pbnQubmFtZSk7XHJcblxyXG5cdFx0XHRpZiAoZHVwbGljYXRlUG9pbnRJbmRleCA8IDApIHtcclxuXHRcdFx0XHRncmFwaC5Qb2ludHMucHVzaChpdGVtLnBvaW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlUG9pbnQgPSBncmFwaC5Qb2ludHNbZHVwbGljYXRlUG9pbnRJbmRleF07XHJcblx0XHRcdFx0Xy5hc3NpZ24oZHVwbGljYXRlUG9pbnQsIGl0ZW0ucG9pbnQpO1xyXG5cdFx0XHRcdGdyYXBoLlBvaW50cy5zcGxpY2UoZHVwbGljYXRlUG9pbnRJbmRleCwgMSwgZHVwbGljYXRlUG9pbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0YWRkRGVwZW5kZW5jeShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdC8vVE9ETzog0J/RgNC40LzQtdC90LjRgtGMINC40LfQvNC10L3QuNC1INC6INC00LjQsNCz0YDQsNC80LVcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpO1xyXG5cdFx0XHR2YXIgZHVwbGljYXRlRGVwSW5kZXggPSBfLmZpbmRJbmRleChncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBpdGVtLmRlcC5OYW1lKTtcclxuXHRcdFx0aWYgKGR1cGxpY2F0ZURlcEluZGV4IDwgMCkge1xyXG5cdFx0XHRcdGdyYXBoLkRlcGVuZGVuY2llcy5wdXNoKGl0ZW0uZGVwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgZHVwbGljYXRlRGVwID0gZ3JhcGguRGVwZW5kZW5jaWVzW2R1cGxpY2F0ZURlcEluZGV4XTtcclxuXHRcdFx0XHRfLmFzc2lnbihkdXBsaWNhdGVEZXAsIGl0ZW0uZGVwKTtcclxuXHRcdFx0XHRncmFwaC5EZXBlbmRlbmNpZXMuc3BsaWNlKGR1cGxpY2F0ZURlcEluZGV4LCAxLCBkdXBsaWNhdGVEZXApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlTm9kZVByb3BlcnR5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKS5Qb2ludHM7XHJcblx0XHRcdHZhciBwb2ludCA9IF8uZmluZChwb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLm5hbWUpO1xyXG5cdFx0XHRWdWUuc2V0KHBvaW50LCBpdGVtLnByb3BOYW1lLCBpdGVtLm5ld1ZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKHN0YXRlOiBSb290U3RhdGUsIG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgY29ubmVjdG9yTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5EZXBlbmRlbmNpZXMsIHggPT4geC5OYW1lID09PSBvcHRpb25zLmNvbm5lY3Rvck5hbWUpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUoc3RhdGU6IFJvb3RTdGF0ZSwgb3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0dmFyIGdyYXBoID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IG9wdGlvbnMuZ3JhcGgpO1xyXG5cdFx0XHRfLnJlbW92ZShncmFwaC5Qb2ludHMsIHggPT4geC5uYW1lID09PSBvcHRpb25zLm5vZGVOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCB7IHJlYWQsIGNvbW1pdCB9ID1cclxuXHRnZXRTdG9yZUFjY2Vzc29yczxSb290U3RhdGUsIFJvb3RTdGF0ZT4oXCJncmFwaFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgcmVhZEdyYXBoQ291bnQgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ3JhcGhDb3VudCk7XHJcbmV4cG9ydCBjb25zdCBnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGdldENoYXJhY3RlcmlzdGljc0xpc3QgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCk7XHJcbmV4cG9ydCBjb25zdCBnZXRSb2xlcyA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRSb2xlcyk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkR3JhcGggPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZEdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGRQb2ludCk7XHJcbmV4cG9ydCBjb25zdCBhZGREZXBlbmRlbmN5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGREZXBlbmRlbmN5KTtcclxuZXhwb3J0IGNvbnN0IGNoYW5nZU5vZGVQcm9wZXJ0eSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuY2hhbmdlTm9kZVByb3BlcnR5KTtcclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNvbm5lY3Rpb24gPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLnJlbW92ZUNvbm5lY3Rpb24pO1xyXG5leHBvcnQgY29uc3QgcmVtb3ZlTm9kZSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMucmVtb3ZlTm9kZSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gXCIuLi9Nb2RlbC9Sb290U3RhdGVcIjtcclxuaW1wb3J0IHsgZ3JhcGhNb2R1bGUgYXMgZ3JhcGggfSBmcm9tIFwiLi9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCBWdWV4UGVyc2lzdGVuY2UgZnJvbSBcInZ1ZXgtcGVyc2lzdFwiO1xyXG5cclxuVnVlLnVzZShWdWV4KTtcclxuXHJcbmNvbnN0IHZ1ZXhMb2NhbCA9IG5ldyBWdWV4UGVyc2lzdGVuY2Uoe1xyXG5cdHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRyZXR1cm4gbmV3IFZ1ZXguU3RvcmU8Um9vdFN0YXRlPih7XHJcblx0XHRtb2R1bGVzOiB7XHJcblx0XHRcdGdyYXBoXHJcblx0XHR9LFxyXG5cdFx0Ly9wbHVnaW5zOiBbdnVleExvY2FsLnBsdWdpbl0sXHJcblx0XHRzdHJpY3Q6IHRydWVcclxuXHR9KVxyXG59OyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyB1bmlxSWQgfSBmcm9tIFwiLi4vLi4vbWl4aW5zL0lkR2VuZXJhdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjbW9kYWwtd2luZG93XCIsXHJcblx0cHJvcHM6IFtcInNob3dcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGVsSWQ6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0c2VsZWN0b3JJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI1wiICsgdGhpcy5lbElkO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlZCgpIHtcclxuXHRcdHRoaXMuZWxJZCA9IHVuaXFJZCgpO1xyXG5cdH0sXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdCQodGhpcy5zZWxlY3RvcklkKVxyXG5cdFx0XHQub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuY2xvc2UoKSk7XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRjbG9zZSgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNsb3NlXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHNob3codmFsKSB7XHJcblx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHQkKHRoaXMuc2VsZWN0b3JJZCkubW9kYWwoXCJzaG93XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQodGhpcy5zZWxlY3RvcklkKS5tb2RhbChcImhpZGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgTW9kYWxXaW5kb3cgZnJvbSBcIi4uL01vZGFsV2luZG93XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjc3RhbmRhcnQtbW9kYWwtd2luZG93XCIsXHJcblx0cHJvcHM6IFtcInRpdGxlXCIsIFwic2hvd1wiXSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRjbG9zZSgpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcImNsb3NlXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0TW9kYWxXaW5kb3dcclxuXHR9XHJcbn0pOyIsIi8vIENsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzXHJcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJpc3RpY0RpYWdyYW0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNEaWFncmFtXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSBcIi4uL1N0b3JlL1Jvb3RTdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBncmFwaCBmcm9tIFwiLi4vU3RvcmUvR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vTW9kZWwvRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IFN0YW5kYXJ0TW9kYWxXaW5kb3cgZnJvbSBcIi4uL2NvbXBvbmVudHMvTW9kYWxXaW5kb3cvU3RhbmRhcnQvU3RhbmRhcnRNb2RhbFdpbmRvd1wiO1xyXG52YXIgX1Z1ZTogYW55ID0gVnVlO1xyXG5cclxudmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoKTtcclxuZXhwb3J0IGRlZmF1bHQgX1Z1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiAnI2FwcC1oZWxsby10ZW1wbGF0ZScsXHJcblx0c3RvcmUsXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1lc3NhZ2U6IFwidGVzdCBtZXNzYWdlXCIsXHJcblx0XHRcdHNob3dBZGRHcmFwaDogZmFsc2UsXHJcblx0XHRcdGFkZGVkQ2F0ZWdvcnk6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0dGVzdCgpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSlbMF0uUG9pbnRzLm1hcCh4ID0+IHguTGFiZWwpO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1zKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGgucmVhZEdyYXBoKHRoaXMuJHN0b3JlKS5tYXAoeCA9PiBncmFwaC5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaCh0aGlzLiRzdG9yZSkoeCkpO1xyXG5cdFx0fSxcclxuXHRcdHJvbGVzKCkge1xyXG5cdFx0XHRyZXR1cm4gZ3JhcGguZ2V0Um9sZXModGhpcy4kc3RvcmUpO1xyXG5cdFx0fSxcclxuXHRcdGNoYXJhY3RlcmlzdGljVXJsKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJhcGkvR2V0Q2hhcmFjdGVyaXN0aWNcIjtcclxuXHRcdH0sXHJcblx0XHRjYXRlZ29yeVVybCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiYXBpL0dldENhdGVnb3J5XCI7XHJcblx0XHR9XHJcblx0fSxcclxuXHRhc3luY0RhdGE6IHtcclxuXHRcdGNoYXJhY3RlcmlzdGljcygpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0XHR0aGlzLiRodHRwLmdldCh0aGlzLmNoYXJhY3RlcmlzdGljVXJsLCB7XHJcblx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlLmRhdGEubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdElkOiB4LmlkLFxyXG5cdFx0XHRcdFx0XHRcdE5hbWU6IHgubmFtZSxcclxuXHRcdFx0XHRcdFx0XHRsb29rdXBOYW1lOiB4Lmxvb2t1cE5hbWUsXHJcblx0XHRcdFx0XHRcdFx0Y2hhcmFjdGVyaXN0aWNUeXBlOiB4LmNoYXJhY3RlcmlzdGljVHlwZVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fSkpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRjYXRlZ29yaWVzKCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuJGh0dHAuZ2V0KHRoaXMuY2F0ZWdvcnlVcmwpXHJcblx0XHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlLmRhdGEubWFwKHggPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdElkOiB4LmlkLFxyXG5cdFx0XHRcdFx0XHRcdE5hbWU6IHgubmFtZVxyXG5cdFx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0fSkpKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZEdyYXBoQ2xpY2soKSB7XHJcblx0XHRcdHRoaXMuc2hvd0FkZEdyYXBoID0gdHJ1ZTtcclxuXHRcdH0sXHJcblx0XHRhZGRHcmFwaCgpIHtcclxuXHRcdFx0dGhpcy5zaG93QWRkR3JhcGggPSBmYWxzZTtcclxuXHRcdFx0Z3JhcGguYWRkR3JhcGgodGhpcy4kc3RvcmUsIHtcclxuXHRcdFx0XHROYW1lOiBcIkdyYXBoX1wiICsgdW5pcUlkKCksXHJcblx0XHRcdFx0UG9pbnRzOiBbe1xyXG5cdFx0XHRcdFx0bmFtZTogdW5pcUlkKCksXHJcblx0XHRcdFx0XHRvZmZzZXRYOiA1MDAsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiAyMCxcclxuXHRcdFx0XHRcdExhYmVsOiBcIlN0YXJ0XCIsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdENhdGVnb3J5OiB0aGlzLmFkZGVkQ2F0ZWdvcnlcclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZE5vZGUobm9kZTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkUG9pbnQodGhpcy4kc3RvcmUsIG5vZGUpO1xyXG5cdFx0fSxcclxuXHRcdGFkZENvbm5lY3Rpb24oY29ubmVjdDogeyBncmFwaDogc3RyaW5nLCBkZXA6IERlcGVuZGVuY3kgfSkge1xyXG5cdFx0XHRncmFwaC5hZGREZXBlbmRlbmN5KHRoaXMuJHN0b3JlLCBjb25uZWN0KTtcclxuXHRcdH0sXHJcblx0XHRvbk5vZGVQcm9wQ2hhbmdlKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0Z3JhcGguY2hhbmdlTm9kZVByb3BlcnR5KHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH0sXHJcblx0XHRyZW1vdmVDb25uZWN0aW9uKG9wdGlvbnM6IHtncmFwaDogc3RyaW5nLCBjb25uZWN0b3JOYW1lOiBzdHJpbmd9KSB7XHJcblx0XHRcdGdyYXBoLnJlbW92ZUNvbm5lY3Rpb24odGhpcy4kc3RvcmUsIG9wdGlvbnMpO1xyXG5cdFx0fSxcclxuXHRcdHJlbW92ZU5vZGUob3B0aW9uczogeyBncmFwaDogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nIH0pIHtcclxuXHRcdFx0Z3JhcGgucmVtb3ZlTm9kZSh0aGlzLiRzdG9yZSwgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0fSxcclxuICAgIGNvbXBvbmVudHM6IHtcclxuXHRcdENoYXJhY3RlcmlzdGljRGlhZ3JhbSxcclxuXHRcdFN0YW5kYXJ0TW9kYWxXaW5kb3dcclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBBcHBIZWxsbyBmcm9tIFwiLi9jb21wb25lbnRzL0FwcEhlbGxvXCI7XHJcbmltcG9ydCBsb2Rhc2hNaXhpbiBmcm9tIFwiLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuaW1wb3J0IGFzeW5jRGF0YSBmcm9tIFwidnVlLWFzeW5jLWRhdGEtMlwiO1xyXG5pbXBvcnQgQXN5bmNDb21wdXRlZCBmcm9tIFwidnVlLWFzeW5jLWNvbXB1dGVkXCI7XHJcbmltcG9ydCB2U2VsZWN0IGZyb20gXCJ2dWUtc2VsZWN0XCI7XHJcbmltcG9ydCB2dWVSZXNvdXJjZSBmcm9tIFwidnVlLXJlc291cmNlXCI7XHJcbnZhciBfdnVlUmVzb3VyY2U6IGFueSA9IHZ1ZVJlc291cmNlO1xyXG5cclxuLy9QbHVnaW5cclxuVnVlLnVzZShhc3luY0RhdGEuQXN5bmNEYXRhUGx1Z2luKTtcclxuVnVlLnVzZShfdnVlUmVzb3VyY2UpO1xyXG5WdWUudXNlKEFzeW5jQ29tcHV0ZWQpO1xyXG5WdWUuY29tcG9uZW50KCd2LXNlbGVjdCcsIHZTZWxlY3QpXHJcblxyXG52YXIgX1Z1ZTogYW55ID0gVnVlO1xyXG5fVnVlLmh0dHAuaW50ZXJjZXB0b3JzLnB1c2goKHJlcXVlc3QsIG5leHQpID0+IHtcclxuXHRyZXF1ZXN0LmhlYWRlcnMuc2V0KCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdG5leHQoKTtcclxufSk7XHJcbl9WdWUuaHR0cC5vcHRpb25zLnJvb3QgPSBkb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XHJcbi8vUm9vdCBDb21wb25lbnRcclxubGV0IHYgPSBuZXcgVnVlKHtcclxuXHRlbDogXCIjYXBwLXJvb3RcIixcclxuXHR0ZW1wbGF0ZTogJzxBcHBIZWxsby8+JyxcclxuXHQvL3JlbmRlcjogaCA9PiBoKEFwcEhlbGxvQ29tcG9uZW50KSxcclxuXHRjb21wb25lbnRzOiB7XHJcblx0XHRBcHBIZWxsb1xyXG5cdH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgdW5pcUlkIH0gZnJvbSBcIi4uLy4uL21peGlucy9JZEdlbmVyYXRvclwiO1xyXG5cclxudmFyIF9WdWU6IGFueSA9IFZ1ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9WdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjYXN5bmMtc2VsZWN0XCIsXHJcblx0cHJvcHM6IHtcclxuXHRcdGlkOiB7XHJcblx0XHRcdHR5cGU6IFN0cmluZyxcclxuXHRcdFx0ZGVmYXVsdDogdW5pcUlkKClcclxuXHRcdH0sXHJcblx0XHR1cmw6IFN0cmluZ1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdHN5bmNfaWQoKSB7XHJcblx0XHRcdHJldHVybiBcInNlbGVjdF9cIiArIHRoaXMuaWQ7XHJcblx0XHR9XHJcblx0fSxcclxuXHRhc3luY0RhdGE6IHtcclxuXHRcdHVzZXJOYW1lKCkge1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoXyA9PiB7XHJcblx0XHRcdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA+IDAuNSkge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKCdyaXNhJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRyZWplY3QoJ2ZldGNoIGVycm9yLi4uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IHVuaXFJZCB9IGZyb20gXCIuLi8uLi9taXhpbnMvSWRHZW5lcmF0b3JcIjtcclxuaW1wb3J0IEFzeW5jU2VsZWN0IGZyb20gXCIuLi9Bc3luY1NlbGVjdC9Bc3luY1NlbGVjdENvbXBvbmVudFwiO1xyXG5kZWNsYXJlIGNvbnN0ICQ6IGFueTtcclxuZGVjbGFyZSBjb25zdCBPYmplY3Q6IGFueTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNhZGQtZ3JhcGhcIixcclxuXHRwcm9wczogW1wiY2F0ZWdvcmllc1wiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c2hvdzogZmFsc2UsXHJcblx0XHRcdGVsSWQ6IG51bGxcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuZWxJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cdH0sXHJcblx0Y3JlYXRlZCgpIHtcclxuXHRcdHRoaXMuZWxJZCA9IHVuaXFJZCgpO1xyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Y2xvc2UoKSB7XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJjbG9zZVwiKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRzaG93KHZhbCkge1xyXG5cdFx0XHRpZiAodmFsKSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwic2hvd1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJoaWRlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1BvaW50IGV4dGVuZHMgQmFzZVBvaW50IHtcclxuXHRDaGFyYWN0ZXJpc3RpYzogQ2hhcmFjdGVyaXN0aWM7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxuXHRSZXF1aXJlZD86IGJvb2xlYW47XHJcblx0RGVmYXVsdFZhbHVlPzogQ2hhcmFjdGVyaXN0aWNWYWx1ZTtcclxufSIsImltcG9ydCB7RGVwZW5kZW5jeX0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQge0lSb2xlfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElEZXBlbmRlbmN5Um9sZSB7XHJcblx0RGVwZW5kZW5jeTogRGVwZW5kZW5jeTtcclxuXHRSb2xlOiBJUm9sZTtcclxufSIsIiJdfQ==