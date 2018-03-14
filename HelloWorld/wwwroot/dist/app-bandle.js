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
    var lodash_1;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("components/Diagram/RuleControll", ["vue"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var vue_1;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_2("default", vue_1.default.extend({
                template: "#rule-controll",
                props: ["point", "index", "roles"],
                data: function () {
                    return {
                        togglesValues: [],
                        togglesRoles: []
                    };
                },
                watch: {
                    point: function () {
                        this.togglesValues = [];
                    },
                    togglesValues: function () {
                        var value = {
                            Point: this.point,
                            Values: this.togglesValues,
                            Roles: this.togglesRoles,
                            index: this.index
                        };
                        this.$emit("rule-change", value);
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function getDefaultData() {
        return {
            point: null,
            required: false,
            defaultValue: null,
            selectedCharacteristic: null,
            togglesValues: [],
            rules: []
        };
    }
    var vue_2, lodash_2, RuleControll_1;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (lodash_2_1) {
                lodash_2 = lodash_2_1;
            },
            function (RuleControll_1_1) {
                RuleControll_1 = RuleControll_1_1;
            }
        ],
        execute: function () {
            ;
            exports_3("default", vue_2.default.extend({
                template: "#add-depend-point",
                props: ["show", "id", "startpoints", "characteristics", "roles"],
                components: {
                    RuleControll: RuleControll_1.default
                },
                computed: {
                    elId: function () {
                        return "#add-depend-point_" + this.id;
                    }
                },
                data: getDefaultData,
                mounted: function () {
                    var _this = this;
                    $(this.elId)
                        .on('hidden.bs.modal', function () { return _this.show = false; });
                },
                methods: {
                    addPoint: function () {
                        var point = lodash_2.default.merge({
                            name: this.point
                        }, {
                            options: {
                                Characteristic: this.selectedCharacteristic,
                                Values: this.togglesValues,
                                Required: this.required,
                                DefaultValue: this.defaultValue
                            }
                        });
                        this.$emit("addpoint", {
                            rules: this.rules,
                            point: point
                        });
                        this.clearData();
                    },
                    clearData: function () {
                        Object.assign(this.$data, getDefaultData());
                    },
                    onRuleChange: function (val) {
                        var index = val.index;
                        vue_2.default.set(this.rules, index, val);
                    }
                },
                watch: {
                    show: function (val) {
                        if (val) {
                            $(this.elId).modal("show");
                            this.clearData();
                        }
                        else {
                            $(this.elId).modal("hide");
                        }
                    },
                    togglesValues: function (values) {
                        if (values == null || values.length === 0) {
                            this.defaultValue = null;
                        }
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependedPoint", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
    exports_4("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/PointType", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var PointType;
    return {
        setters: [],
        execute: function () {
            (function (PointType) {
                PointType[PointType["start"] = 0] = "start";
                PointType[PointType["characteristic"] = 1] = "characteristic";
                PointType[PointType["aggregator"] = 2] = "aggregator";
            })(PointType || (PointType = {}));
            exports_5("PointType", PointType);
        }
    };
});
System.register("components/CharacteristicDiagram", ["vue", "lodash", "syncfusion", "mixins/m_lodash", "components/Diagram/AddDependPointWindow", "components/Diagram/AddDependedPoint", "Model/PointType"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var vue_3, lodash_3, m_lodash_1, AddDependPointWindow_1, AddDependedPoint_1, PointType_1, constraints;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (lodash_3_1) {
                lodash_3 = lodash_3_1;
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
            function (PointType_1_1) {
                PointType_1 = PointType_1_1;
            }
        ],
        execute: function () {
            constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;
            exports_6("default", vue_3.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height", "characteristics", "roles"],
                data: function () {
                    return {
                        bus: new vue_3.default(),
                        showAddDependModal: false,
                        selectedNodes: [],
                        offsetYMargin: 250
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
                        return $(this.diagramElId).ejDiagram("instance");
                    }
                },
                methods: {
                    addDependentPoint: function (options) {
                        var _this = this;
                        var point = options.point;
                        var rules = options.rules;
                        var pointName = point.name;
                        var firstSelectedNode = this.selectedNodes[0];
                        var offsetX = firstSelectedNode.offsetX;
                        var offsetY = firstSelectedNode.offsetY;
                        var endPoint = pointName;
                        this.addPoint(lodash_3.default.merge({
                            name: pointName,
                            offsetX: offsetX,
                            offsetY: offsetY + this.offsetYMargin,
                            Options: {
                                type: PointType_1.PointType.characteristic
                            },
                            labels: [{
                                    text: pointName
                                }]
                        }, point.options));
                        if (this.selectedNodes.length > 1) {
                            var andPointName = "AND_" + pointName;
                            endPoint = andPointName;
                            this.addPoint({
                                name: andPointName,
                                offsetX: offsetX,
                                offsetY: offsetY + this.offsetYMargin / 2,
                                Options: {
                                    type: PointType_1.PointType.aggregator
                                }
                            });
                            this.addConnection({
                                Start: endPoint,
                                End: pointName,
                                Name: endPoint + "_" + pointName
                            });
                        }
                        lodash_3.default.forEach(this.selectedNodes, function (node) {
                            _this.addConnection({
                                Start: node.name,
                                End: endPoint,
                                Name: node.name + "_" + endPoint,
                                Rules: rules
                            });
                        });
                        this.showAddDependModal = false;
                    },
                    addConnection: function (options) {
                        this.$emit("on-add-connection", {
                            graph: this.diagramId,
                            dep: options
                        });
                    },
                    addPoint: function (options) {
                        this.$emit("on-add-node", {
                            graph: this.diagramId,
                            point: options
                        });
                    },
                    openAddDependModal: function (option) {
                        var _this = this;
                        var selected = this.diagram.selectionList[0];
                        var selectedNodes = [];
                        if (selected._type === "node") {
                            selectedNodes = [selected.name];
                        }
                        else if (selected.type === "pseudoGroup") {
                            selectedNodes = selected.children;
                        }
                        this.selectedNodes = lodash_3.default.map(selectedNodes, function (x) { return _this.diagram.findNode(x); });
                        this.showAddDependModal = true;
                    },
                    updateNodeProp: m_lodash_1.default(function (args) {
                        var node = lodash_3.default.find(this.graph.Nodes, function (node) { return node.name === args.element.name; });
                        if (node) {
                            this.$emit("node-prop-change", {
                                graph: this.graph.Name,
                                name: node.name,
                                propName: args.propertyName,
                                newValue: args.element[args.propertyName]
                            });
                        }
                    }, 500, function (x) { return x.propertyName; })
                    //	function () {
                    //	var mem = _.memoize(function (memArgs) {
                    //		var fun = _.debounce(function (args) {
                    //			var node = _.find(this.graph.Nodes, node => node.name === args.element.name);
                    //			if (node) {
                    //				this.$emit("node-prop-change", {
                    //					graph: this.graph.Name,
                    //					name: node.name,
                    //					propName: args.propertyName,
                    //					newValue: args.element[args.propertyName]
                    //				});
                    //			}
                    //		}, 1000);
                    //		window["fun"].push(fun);
                    //		return fun;
                    //	}, args => args.propertyName);
                    //	mem.apply(this, arguments).apply(this, arguments);
                    //}
                },
                mounted: function () {
                    var _this = this;
                    var $this = this;
                    this.bus.$on("add-depend-point", function (options) { return _this.openAddDependModal(options); });
                    $(this.diagramElId).ejDiagram({
                        enableContextMenu: false,
                        constraints: constraints,
                        width: "100%",
                        height: this.heightPx,
                        nodes: this.graph.Nodes,
                        connectors: this.graph.Connectors,
                        defaultSettings: {
                            node: {
                                width: 65,
                                height: 65,
                                labels: [{
                                        name: "label1",
                                        bold: true,
                                        fontColor: "black",
                                        horizontalAlignment: ej.datavisualization.Diagram.HorizontalAlignment.Right,
                                        verticalAlignment: ej.datavisualization.Diagram.VerticalAlignment.Bottom,
                                        offset: {
                                            y: 1.2,
                                            x: 0.8
                                        }
                                    }],
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
                                })]
                        },
                        nodeTemplate: function (diagram, node) {
                            if (node.Options) {
                                var type = node.Options.type;
                                switch (type) {
                                    case PointType_1.PointType.start:
                                        node.fillColor = "#29c15f";
                                        node.shape = "ellipse";
                                        break;
                                    case PointType_1.PointType.characteristic:
                                        node.fillColor = "#2085c9";
                                        node.shape = "rectangle";
                                        break;
                                    case PointType_1.PointType.aggregator:
                                        node.fillColor = "#ec7e0d";
                                        node.shape = "ellipse";
                                        break;
                                }
                            }
                        },
                        propertyChange: function (args) {
                            if (args.elementType === "node") {
                                if (lodash_3.default.includes(["offsetX", "offsetY"], args.propertyName)) {
                                    $this.updateNodeProp(args);
                                }
                            }
                        }
                    });
                    $(this.diagramOverviewElId).ejOverview({
                        sourceID: this.diagramId,
                        width: "100%",
                        height: this.heightPx
                    });
                },
                components: {
                    addDependModalWindow: AddDependPointWindow_1.default
                },
                watch: {
                    graph: function (val) {
                        var diagram = this.diagram;
                        lodash_3.default.filter(val.Nodes, function (node) {
                            return !lodash_3.default.find(diagram.nodes(), function (x) { return x.name === node.name; });
                        })
                            .forEach(function (x) {
                            return diagram.add(lodash_3.default.merge(x, {
                                labels: [{
                                        text: x.name
                                    }]
                            }));
                        });
                        lodash_3.default.filter(val.Connectors, function (con) {
                            return !lodash_3.default.find(diagram.connectors(), function (x) { return x.name === con.name; });
                        })
                            .forEach(function (x) { return diagram.add(x); });
                    }
                }
            }));
        }
    };
});
System.register("Model/Role", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Dependency", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/BasePoint", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Graph", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/CharacteristicValue", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Characteristic", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/RootState", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Node", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Connector", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Graph", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Store/GraphStore", ["vue", "vuex-typescript", "lodash", "Model/PointType"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var vue_4, vuex_typescript_1, lodash_4, PointType_2, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, getRoles, addGraph, addPoint, addDependency, changeNodeProperty;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_4_1) {
                lodash_4 = lodash_4_1;
            },
            function (PointType_2_1) {
                PointType_2 = PointType_2_1;
            }
        ],
        execute: function () {
            exports_17("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [{
                            Name: "Graph1",
                            Points: [
                                {
                                    name: "Start",
                                    labels: [{
                                            text: "Start Point"
                                        }],
                                    offsetX: 500,
                                    offsetY: 60,
                                    Options: {
                                        type: PointType_2.PointType.start
                                    }
                                }
                            ],
                            Dependencies: []
                        }],
                    Characteristics: [
                        {
                            Name: "Char 1",
                            Values: [{
                                    Name: "Char 1. Value 1"
                                }, {
                                    Name: "Char 1. Value 2"
                                }]
                        },
                        {
                            Name: "Char 2",
                            Values: [{
                                    Name: "Char 2. Value 1"
                                }, {
                                    Name: "Char 2. Value 2"
                                }, {
                                    Name: "Char 2. Value 3"
                                }
                            ]
                        },
                        {
                            Name: "Char 3",
                            Values: [{
                                    Name: "Char 3. Value 1"
                                }, {
                                    Name: "Char 3. Value 2"
                                }, {
                                    Name: "Char 3. Value 3"
                                }, {
                                    Name: "Char 3. Value 4"
                                }, {
                                    Name: "Char 3. Value 5"
                                }, {
                                    Name: "Char 3. Value 6"
                                }, {
                                    Name: "Char 3. Value 7"
                                }, {
                                    Name: "Char 3. Value 8"
                                }, {
                                    Name: "Char 3. Value 9"
                                }
                            ]
                        }
                    ],
                    Roles: [
                        {
                            Name: "Role 1"
                        },
                        {
                            Name: "Role 2"
                        },
                        {
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
                            var graph = lodash_4.default.first(state.Graphs.filter(function (x) { return x.Name === name; }));
                            return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
                        };
                    },
                    getSyncfusiongGraphByGraph: function (state) {
                        return function (graph) {
                            return {
                                Name: graph.Name,
                                Nodes: graph.Points,
                                Connectors: lodash_4.default.map(graph.Dependencies, function (con) {
                                    return lodash_4.default.merge({
                                        name: con.Name,
                                        sourceNode: con.Start,
                                        targetNode: con.End
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
                        state.Graphs.filter(function (x) { return x.Name === item.graph; })[0].Points.push(item.point);
                    },
                    addDependency: function (state, item) {
                        state.Graphs.filter(function (x) { return x.Name === item.graph; })[0].Dependencies.push(item.dep);
                    },
                    changeNodeProperty: function (state, item) {
                        var points = lodash_4.default.find(state.Graphs, function (x) { return x.Name === item.graph; }).Points;
                        var point = lodash_4.default.find(points, function (x) { return x.name === item.name; });
                        vue_4.default.set(point, item.propName, item.newValue);
                    }
                }
            });
            _a = vuex_typescript_1.getStoreAccessors("graph"), read = _a.read, commit = _a.commit;
            exports_17("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_17("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_17("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_17("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_17("getCharacteristicsList", getCharacteristicsList = read(graphModule.getters.getCharacteristicsList));
            exports_17("getRoles", getRoles = read(graphModule.getters.getRoles));
            exports_17("addGraph", addGraph = commit(graphModule.mutations.addGraph));
            exports_17("addPoint", addPoint = commit(graphModule.mutations.addPoint));
            exports_17("addDependency", addDependency = commit(graphModule.mutations.addDependency));
            exports_17("changeNodeProperty", changeNodeProperty = commit(graphModule.mutations.changeNodeProperty));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore", "vuex-persist"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var vue_5, vuex_1, GraphStore_1, vuex_persist_1, vuexLocal, createStore;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
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
            vue_5.default.use(vuex_1.default);
            vuexLocal = new vuex_persist_1.default({
                storage: window.localStorage
            });
            exports_18("createStore", createStore = function () {
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
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var vue_6, CharacteristicDiagram_1, RootStore_1, graph, PointType_3, store;
    return {
        setters: [
            function (vue_6_1) {
                vue_6 = vue_6_1;
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
            function (PointType_3_1) {
                PointType_3 = PointType_3_1;
            }
        ],
        execute: function () {
            store = RootStore_1.createStore();
            exports_19("default", vue_6.default.extend({
                template: '#app-hello-template',
                store: store,
                data: function () {
                    return {
                        message: "test message"
                    };
                },
                computed: {
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
                                    name: "Start",
                                    offsetX: 500,
                                    offsetY: 20,
                                    labels: [{
                                            text: "Start Point"
                                        }],
                                    Options: {
                                        type: PointType_3.PointType.start
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
System.register("index", ["vue", "components/AppHello"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var vue_7, AppHello_1, v;
    return {
        setters: [
            function (vue_7_1) {
                vue_7 = vue_7_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            }
        ],
        execute: function () {
            //Root Component
            v = new vue_7.default({
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
System.register("components/TestVue", ["vue", "lodash", "axios"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var vue_8, lodash_5, axios_1;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
            },
            function (lodash_5_1) {
                lodash_5 = lodash_5_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            exports_21("default", vue_8.default.extend({
                template: "#test-temp",
                data: function () {
                    return {
                        question: '',
                        answer: 'Пока вы не зададите вопрос, я не могу ответить!'
                    };
                },
                watch: {
                    // эта функция запускается при любом изменении вопроса
                    question: function (newQuestion, oldQuestion) {
                        this.answer = 'Ожидаю, когда вы закончите печатать...';
                        this.getAnswer();
                    }
                },
                methods: {
                    getAnswer: lodash_5.default.debounce(function () {
                        if (this.question.indexOf('?') === -1) {
                            this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                            return;
                        }
                        this.answer = 'Думаю...';
                        var vm = this;
                        axios_1.default.get('https://yesno.wtf/api')
                            .then(function (response) {
                            vm.answer = lodash_5.default.capitalize(response.data.answer);
                        })
                            .catch(function (error) {
                            vm.answer = 'Ошибка! Не могу связаться с API. ' + error;
                        });
                    }, 
                    // Это число миллисекунд, которое мы ждём, после того как пользователь прекратил печатать.
                    500)
                }
            }));
        }
    };
});
System.register("Model/CharacteristicPoint", [], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/IDependencyRole", [], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9taXhpbnMvbV9sb2Rhc2gudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL1J1bGVDb250cm9sbC50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vQWRkRGVwZW5kUG9pbnRXaW5kb3cudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9EaWFncmFtL0FkZERlcGVuZGVkUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvUG9pbnRUeXBlLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvQ2hhcmFjdGVyaXN0aWNEaWFncmFtLnRzIiwiLi4vLi4vQ2xpZW50QXBwL01vZGVsL1JvbGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvRGVwZW5kZW5jeS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9CYXNlUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9DaGFyYWN0ZXJpc3RpYy50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb290U3RhdGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL05vZGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0Nvbm5lY3Rvci50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvU3RvcmUvR3JhcGhTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9Sb290U3RvcmUudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9BcHBIZWxsby50cyIsIi4uLy4uL0NsaWVudEFwcC9pbmRleC50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL1Rlc3RWdWUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNQb2ludC50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9JRGVwZW5kZW5jeVJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0EseUJBQXdDLElBQUksRUFBRSxJQUFRLEVBQUUsUUFBUSxFQUFFLE9BQVk7UUFBaEMscUJBQUEsRUFBQSxRQUFRO1FBQVksd0JBQUEsRUFBQSxZQUFZO1FBQzdFLElBQUksR0FBRyxHQUFHLGdCQUFDLENBQUMsT0FBTyxDQUFDLGNBQU0sT0FBQSxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUEvQixDQUErQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFBO0lBQ0YsQ0FBQzs7Ozs7Ozs7OztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O2lDQ0phLGFBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUNsQyxJQUFJO29CQUNILE1BQU0sQ0FBQzt3QkFDTixhQUFhLEVBQUUsRUFBRTt3QkFDakIsWUFBWSxFQUFFLEVBQUU7cUJBQ2hCLENBQUM7Z0JBQ0gsQ0FBQztnQkFDRCxLQUFLLEVBQUU7b0JBQ04sS0FBSzt3QkFDSixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztvQkFDekIsQ0FBQztvQkFDRCxhQUFhO3dCQUNaLElBQUksS0FBSyxHQUFHOzRCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzs0QkFD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QUFHLG1DQUFtQyxHQUFHLEtBQUssQ0FBQTt3QkFDeEQsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCwwRkFBMEY7b0JBQzFGLEdBQUcsQ0FDSDtpQkFDRDthQUNELENBQ0Q7UUFBQyxDQUFDOzs7Ozs7Ozs7UUNqQ0YsQ0FBQzs7Ozs7Ozs7O1FDSEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVtb2l6ZURlYm91bmNlKGZ1bmMsIHdhaXQgPSAwLCByZXNvbHZlciwgb3B0aW9ucyA9IHt9KSB7XHJcblx0dmFyIG1lbSA9IF8ubWVtb2l6ZSgoKSA9PiBfLmRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpLCByZXNvbHZlcik7XHJcblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdG1lbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0fVxyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiBbXCJwb2ludFwiLCBcImluZGV4XCIsIFwicm9sZXNcIl0sXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRvZ2dsZXNWYWx1ZXM6IFtdLFxyXG5cdFx0XHR0b2dnbGVzUm9sZXM6IFtdXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0d2F0Y2g6IHtcclxuXHRcdHBvaW50KCkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZXNWYWx1ZXMgPSBbXTtcclxuXHRcdH0sXHJcblx0XHR0b2dnbGVzVmFsdWVzKCkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSB7XHJcblx0XHRcdFx0UG9pbnQ6IHRoaXMucG9pbnQsXHJcblx0XHRcdFx0VmFsdWVzOiB0aGlzLnRvZ2dsZXNWYWx1ZXMsXHJcblx0XHRcdFx0Um9sZXM6IHRoaXMudG9nZ2xlc1JvbGVzLFxyXG5cdFx0XHRcdGluZGV4OiB0aGlzLmluZGV4XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJydWxlLWNoYW5nZVwiLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFJ1bGVDb250cm9sbCBmcm9tIFwiLi9SdWxlQ29udHJvbGxcIjtcclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgT2JqZWN0OiBhbnk7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdERhdGEoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHBvaW50OiBudWxsLFxyXG5cdFx0cmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0c2VsZWN0ZWRDaGFyYWN0ZXJpc3RpYzogbnVsbCxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IFtdLFxyXG5cdFx0cnVsZXM6IFtdXHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNhZGQtZGVwZW5kLXBvaW50XCIsXHJcblx0cHJvcHM6IFtcInNob3dcIiwgXCJpZFwiLCBcInN0YXJ0cG9pbnRzXCIsIFwiY2hhcmFjdGVyaXN0aWNzXCIsIFwicm9sZXNcIl0sXHJcblx0Y29tcG9uZW50czoge1xyXG5cdFx0UnVsZUNvbnRyb2xsXHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0ZWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI2FkZC1kZXBlbmQtcG9pbnRfXCIgKyB0aGlzLmlkO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0ZGF0YTogZ2V0RGVmYXVsdERhdGEsXHJcblx0bW91bnRlZCgpIHtcclxuXHRcdCQodGhpcy5lbElkKVxyXG5cdFx0XHQub24oJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+IHRoaXMuc2hvdyA9IGZhbHNlKTtcclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZFBvaW50KCkge1xyXG5cdFx0XHR2YXIgcG9pbnQgPSBfLm1lcmdlKHtcclxuXHRcdFx0XHRcdG5hbWU6IHRoaXMucG9pbnRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0Q2hhcmFjdGVyaXN0aWM6IHRoaXMuc2VsZWN0ZWRDaGFyYWN0ZXJpc3RpYyxcclxuXHRcdFx0XHRcdFx0VmFsdWVzOiB0aGlzLnRvZ2dsZXNWYWx1ZXMsXHJcblx0XHRcdFx0XHRcdFJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxyXG5cdFx0XHRcdFx0XHREZWZhdWx0VmFsdWU6IHRoaXMuZGVmYXVsdFZhbHVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiYWRkcG9pbnRcIiwge1xyXG5cdFx0XHRcdHJ1bGVzOiB0aGlzLnJ1bGVzLFxyXG5cdFx0XHRcdHBvaW50OiBwb2ludFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5jbGVhckRhdGEoKTtcclxuXHRcdH0sXHJcblx0XHRjbGVhckRhdGEoKSB7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcy4kZGF0YSwgZ2V0RGVmYXVsdERhdGEoKSk7XHJcblx0XHR9LFxyXG5cdFx0b25SdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSB2YWwuaW5kZXg7XHJcblx0XHRcdFZ1ZS5zZXQodGhpcy5ydWxlcywgaW5kZXgsIHZhbCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0c2hvdyh2YWwpIHtcclxuXHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcInNob3dcIik7XHJcblx0XHRcdFx0dGhpcy5jbGVhckRhdGEoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQkKHRoaXMuZWxJZCkubW9kYWwoXCJoaWRlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dG9nZ2xlc1ZhbHVlcyh2YWx1ZXMpIHtcclxuXHRcdFx0aWYgKHZhbHVlcyA9PSBudWxsIHx8IHZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLmRlZmF1bHRWYWx1ZSA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5kZWNsYXJlIGNvbnN0IGVqOiBhbnk7XHJcblxyXG4vL2V4cG9ydCBkZWZhdWx0IGFkZERlcGVuZFBvaW50O1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb24/OiBhbnkpIHtcclxuXHR2YXIgZnVuYyA9IChmdW5jdGlvbiAoYmFzZTogYW55KSB7XHJcblx0XHRlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLmV4dGVuZChBZGREZXBlbmRQb2ludCwgYmFzZSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gQWRkRGVwZW5kUG9pbnQobmFtZTogc3RyaW5nKSB7XHJcblx0XHRcdGJhc2UuY2FsbCh0aGlzLCBuYW1lKTtcclxuXHRcdFx0dGhpcy5zaW5nbGVBY3Rpb24gPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNsb25lZE5vZGVzID0gW107XHJcblx0XHRcdHRoaXMuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcblx0XHR9XHJcblx0XHRBZGREZXBlbmRQb2ludC5wcm90b3R5cGUubW91c2V1cCA9IGZ1bmN0aW9uIChldnQ6IGFueSkge1xyXG5cdFx0XHRiYXNlLnByb3RvdHlwZS5tb3VzZXVwLmNhbGwodGhpcywgZXZ0KTtcclxuXHRcdFx0b3B0aW9uLmJ1cy4kZW1pdChcImFkZC1kZXBlbmQtcG9pbnRcIiwge1xyXG5cdFx0XHRcdG5vZGVzOiB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIEFkZERlcGVuZFBvaW50O1xyXG5cdH0oZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Ub29sQmFzZSkpO1xyXG5cclxuXHR2YXIgdXNlckhhbmRsZXMgPSBbXTtcclxuXHR2YXIgYWRkRGVwZW5kUG9pbnQgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGUoKTtcclxuXHRhZGREZXBlbmRQb2ludC5uYW1lID0gXCJBZGRcIjtcclxuXHRhZGREZXBlbmRQb2ludC50b29sID0gbmV3IGZ1bmMoYWRkRGVwZW5kUG9pbnQubmFtZSk7XHJcblx0YWRkRGVwZW5kUG9pbnQucG9zaXRpb24gPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlVzZXJIYW5kbGVQb3NpdGlvbnMuQm90dG9tTGVmdDtcclxuXHRhZGREZXBlbmRQb2ludC52aXNpYmxlID0gdHJ1ZTtcclxuXHRhZGREZXBlbmRQb2ludC5lbmFibGVNdWx0aVNlbGVjdGlvbiA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuc2l6ZSA9IDM1O1xyXG5cdGFkZERlcGVuZFBvaW50LmJhY2tncm91bmRDb2xvciA9IFwiIzRENEQ0RFwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhDb2xvciA9IFwid2hpdGVcIjtcclxuXHRhZGREZXBlbmRQb2ludC5ib3JkZXJXaWR0aCA9IFwiMVwiO1xyXG5cdGFkZERlcGVuZFBvaW50LnBhdGhEYXRhID0gXCJNMTQuNjEzLDEwYzAsMC4yMy0wLjE4OCwwLjQxOS0wLjQxOSwwLjQxOUgxMC40MnYzLjc3NGMwLDAuMjMtMC4xODksMC40Mi0wLjQyLDAuNDJzLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDJ2LTMuNzc0SDUuODA2Yy0wLjIzLDAtMC40MTktMC4xODktMC40MTktMC40MTlzMC4xODktMC40MTksMC40MTktMC40MTloMy43NzVWNS44MDZjMC0wLjIzLDAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5czAuNDIsMC4xODksMC40MiwwLjQxOXYzLjc3NWgzLjc3NEMxNC40MjUsOS41ODEsMTQuNjEzLDkuNzcsMTQuNjEzLDEwIE0xNy45NjksMTBjMCw0LjQwMS0zLjU2Nyw3Ljk2OS03Ljk2OSw3Ljk2OWMtNC40MDIsMC03Ljk2OS0zLjU2Ny03Ljk2OS03Ljk2OWMwLTQuNDAyLDMuNTY3LTcuOTY5LDcuOTY5LTcuOTY5QzE0LjQwMSwyLjAzMSwxNy45NjksNS41OTgsMTcuOTY5LDEwIE0xNy4xMywxMGMwLTMuOTMyLTMuMTk4LTcuMTMtNy4xMy03LjEzUzIuODcsNi4wNjgsMi44NywxMGMwLDMuOTMzLDMuMTk4LDcuMTMsNy4xMyw3LjEzUzE3LjEzLDEzLjkzMywxNy4xMywxMFwiO1xyXG5cdHJldHVybiBhZGREZXBlbmRQb2ludDtcclxufSIsIlxyXG5leHBvcnQgZW51bSBQb2ludFR5cGUge1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRjaGFyYWN0ZXJpc3RpYyxcclxuXHRhZ2dyZWdhdG9yXHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgXCJzeW5jZnVzaW9uXCI7XHJcbmltcG9ydCBtZW1vaXplRGVib3VuY2UgZnJvbSBcIi4uL21peGlucy9tX2xvZGFzaFwiO1xyXG5pbXBvcnQgYWRkRGVwZW5kTW9kYWxXaW5kb3cgZnJvbSBcIi4vRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvd1wiO1xyXG5pbXBvcnQgY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vQWRkRGVwZW5kZWRQb2ludFwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG52YXIgY29uc3RyYWludHMgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5EZWZhdWx0IHwgZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRmxvYXRFbGVtZW50cztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNjaGFyYWN0ZXJpc3RpYy1kaWFncmFtXCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCIsIFwiY2xhc3Nlc1wiLCBcImhlaWdodFwiLCBcImNoYXJhY3RlcmlzdGljc1wiLCBcInJvbGVzXCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRidXM6IG5ldyBWdWUoKSxcclxuXHRcdFx0c2hvd0FkZERlcGVuZE1vZGFsOiBmYWxzZSxcclxuXHRcdFx0c2VsZWN0ZWROb2RlczogW10sXHJcblx0XHRcdG9mZnNldFlNYXJnaW46IDI1MFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRoZWlnaHRQeCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaGVpZ2h0ICsgXCJweFwiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1JZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhcGguTmFtZTtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtRWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIFwiI1wiICsgdGhpcy5kaWFncmFtSWQ7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbU92ZXJ2aWV3RWxJZCgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZGlhZ3JhbUVsSWQgKyBcIl9vdmVydmlld1wiO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW0oKSB7XHJcblx0XHRcdHJldHVybiAkKHRoaXMuZGlhZ3JhbUVsSWQpLmVqRGlhZ3JhbShcImluc3RhbmNlXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0YWRkRGVwZW5kZW50UG9pbnQob3B0aW9ucykge1xyXG5cdFx0XHR2YXIgcG9pbnQgPSBvcHRpb25zLnBvaW50O1xyXG5cdFx0XHR2YXIgcnVsZXMgPSBvcHRpb25zLnJ1bGVzO1xyXG5cdFx0XHR2YXIgcG9pbnROYW1lID0gcG9pbnQubmFtZTtcclxuXHRcdFx0dmFyIGZpcnN0U2VsZWN0ZWROb2RlID0gdGhpcy5zZWxlY3RlZE5vZGVzWzBdO1xyXG5cdFx0XHR2YXIgb2Zmc2V0WCA9IGZpcnN0U2VsZWN0ZWROb2RlLm9mZnNldFg7XHJcblx0XHRcdHZhciBvZmZzZXRZID0gZmlyc3RTZWxlY3RlZE5vZGUub2Zmc2V0WTtcclxuXHRcdFx0dmFyIGVuZFBvaW50ID0gcG9pbnROYW1lO1xyXG5cclxuXHRcdFx0dGhpcy5hZGRQb2ludChfLm1lcmdlKHtcclxuXHRcdFx0XHRuYW1lOiBwb2ludE5hbWUsXHJcblx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0WCxcclxuXHRcdFx0XHRvZmZzZXRZOiBvZmZzZXRZICsgdGhpcy5vZmZzZXRZTWFyZ2luLFxyXG5cdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpY1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0dGV4dDogcG9pbnROYW1lXHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fSwgcG9pbnQub3B0aW9ucykpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWROb2Rlcy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0dmFyIGFuZFBvaW50TmFtZSA9IFwiQU5EX1wiICsgcG9pbnROYW1lO1xyXG5cdFx0XHRcdGVuZFBvaW50ID0gYW5kUG9pbnROYW1lO1xyXG5cdFx0XHRcdHRoaXMuYWRkUG9pbnQoe1xyXG5cdFx0XHRcdFx0bmFtZTogYW5kUG9pbnROYW1lLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogb2Zmc2V0WCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IG9mZnNldFkgKyB0aGlzLm9mZnNldFlNYXJnaW4gLyAyLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuYWdncmVnYXRvclxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHRoaXMuYWRkQ29ubmVjdGlvbih7XHJcblx0XHRcdFx0XHRTdGFydDogZW5kUG9pbnQsXHJcblx0XHRcdFx0XHRFbmQ6IHBvaW50TmFtZSxcclxuXHRcdFx0XHRcdE5hbWU6IGVuZFBvaW50ICsgXCJfXCIgKyBwb2ludE5hbWVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfLmZvckVhY2godGhpcy5zZWxlY3RlZE5vZGVzLCBub2RlID0+IHtcclxuXHRcdFx0XHR0aGlzLmFkZENvbm5lY3Rpb24oe1xyXG5cdFx0XHRcdFx0U3RhcnQ6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdEVuZDogZW5kUG9pbnQsXHJcblx0XHRcdFx0XHROYW1lOiBub2RlLm5hbWUgKyBcIl9cIiArIGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0UnVsZXM6IHJ1bGVzXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnNob3dBZGREZXBlbmRNb2RhbCA9IGZhbHNlO1xyXG5cdFx0fSxcclxuXHRcdGFkZENvbm5lY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLWNvbm5lY3Rpb25cIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRkZXA6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQob3B0aW9ucykge1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwib24tYWRkLW5vZGVcIiwge1xyXG5cdFx0XHRcdGdyYXBoOiB0aGlzLmRpYWdyYW1JZCxcclxuXHRcdFx0XHRwb2ludDogb3B0aW9uc1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHRvcGVuQWRkRGVwZW5kTW9kYWwob3B0aW9uPzogYW55KSB7XHJcblx0XHRcdHZhciBzZWxlY3RlZCA9IHRoaXMuZGlhZ3JhbS5zZWxlY3Rpb25MaXN0WzBdO1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWROb2RlcyA9IFtdO1xyXG5cdFx0XHRpZiAoc2VsZWN0ZWQuX3R5cGUgPT09IFwibm9kZVwiKSB7XHJcblx0XHRcdFx0c2VsZWN0ZWROb2RlcyA9IFtzZWxlY3RlZC5uYW1lXTtcclxuXHRcdFx0fSBlbHNlIGlmIChzZWxlY3RlZC50eXBlID09PSBcInBzZXVkb0dyb3VwXCIpIHtcclxuXHRcdFx0XHRzZWxlY3RlZE5vZGVzID0gc2VsZWN0ZWQuY2hpbGRyZW47XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zZWxlY3RlZE5vZGVzID0gXy5tYXAoc2VsZWN0ZWROb2RlcywgeCA9PiB0aGlzLmRpYWdyYW0uZmluZE5vZGUoeCkpO1xyXG5cdFx0XHR0aGlzLnNob3dBZGREZXBlbmRNb2RhbCA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0dXBkYXRlTm9kZVByb3A6IG1lbW9pemVEZWJvdW5jZShmdW5jdGlvbihhcmdzKSB7XHJcblx0XHRcdHZhciBub2RlID0gXy5maW5kKHRoaXMuZ3JhcGguTm9kZXMsIG5vZGUgPT4gbm9kZS5uYW1lID09PSBhcmdzLmVsZW1lbnQubmFtZSk7XHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdChcIm5vZGUtcHJvcC1jaGFuZ2VcIiwge1xyXG5cdFx0XHRcdFx0Z3JhcGg6IHRoaXMuZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdG5hbWU6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdHByb3BOYW1lOiBhcmdzLnByb3BlcnR5TmFtZSxcclxuXHRcdFx0XHRcdG5ld1ZhbHVlOiBhcmdzLmVsZW1lbnRbYXJncy5wcm9wZXJ0eU5hbWVdXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDUwMCwgeCA9PiB4LnByb3BlcnR5TmFtZSlcclxuXHRcdC8vXHRmdW5jdGlvbiAoKSB7XHJcblx0XHQvL1x0dmFyIG1lbSA9IF8ubWVtb2l6ZShmdW5jdGlvbiAobWVtQXJncykge1xyXG5cdFx0Ly9cdFx0dmFyIGZ1biA9IF8uZGVib3VuY2UoZnVuY3Rpb24gKGFyZ3MpIHtcclxuXHRcdC8vXHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQodGhpcy5ncmFwaC5Ob2Rlcywgbm9kZSA9PiBub2RlLm5hbWUgPT09IGFyZ3MuZWxlbWVudC5uYW1lKTtcclxuXHRcdC8vXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdC8vXHRcdFx0XHR0aGlzLiRlbWl0KFwibm9kZS1wcm9wLWNoYW5nZVwiLCB7XHJcblx0XHQvL1x0XHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0Ly9cdFx0XHRcdFx0bmFtZTogbm9kZS5uYW1lLFxyXG5cdFx0Ly9cdFx0XHRcdFx0cHJvcE5hbWU6IGFyZ3MucHJvcGVydHlOYW1lLFxyXG5cdFx0Ly9cdFx0XHRcdFx0bmV3VmFsdWU6IGFyZ3MuZWxlbWVudFthcmdzLnByb3BlcnR5TmFtZV1cclxuXHRcdC8vXHRcdFx0XHR9KTtcclxuXHRcdC8vXHRcdFx0fVxyXG5cdFx0Ly9cdFx0fSwgMTAwMCk7XHJcblx0XHQvL1x0XHR3aW5kb3dbXCJmdW5cIl0ucHVzaChmdW4pO1xyXG5cdFx0Ly9cdFx0cmV0dXJuIGZ1bjtcclxuXHRcdC8vXHR9LCBhcmdzID0+IGFyZ3MucHJvcGVydHlOYW1lKTtcclxuXHRcdC8vXHRtZW0uYXBwbHkodGhpcywgYXJndW1lbnRzKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0Ly99XHJcblx0fSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0dmFyICR0aGlzID0gdGhpcztcclxuXHRcdHRoaXMuYnVzLiRvbihcImFkZC1kZXBlbmQtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdCQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKHtcclxuXHRcdFx0ZW5hYmxlQ29udGV4dE1lbnU6IGZhbHNlLFxyXG5cdFx0XHRjb25zdHJhaW50cyxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHgsXHJcblx0XHRcdG5vZGVzOiB0aGlzLmdyYXBoLk5vZGVzLFxyXG5cdFx0XHRjb25uZWN0b3JzOiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMsXHJcblx0XHRcdGRlZmF1bHRTZXR0aW5nczoge1xyXG5cdFx0XHRcdG5vZGU6IHtcclxuXHRcdFx0XHRcdHdpZHRoOiA2NSxcclxuXHRcdFx0XHRcdGhlaWdodDogNjUsXHJcblx0XHRcdFx0XHRsYWJlbHM6IFt7XHJcblx0XHRcdFx0XHRcdG5hbWU6IFwibGFiZWwxXCIsXHJcblx0XHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQsXHJcblx0XHRcdFx0XHRcdHZlcnRpY2FsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSxcclxuXHRcdFx0XHRcdFx0b2Zmc2V0OiB7XHJcblx0XHRcdFx0XHRcdFx0eTogMS4yLFxyXG5cdFx0XHRcdFx0XHRcdHg6IDAuOFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XSxcclxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb25uZWN0b3I6IHtcclxuXHRcdFx0XHRcdHNlZ21lbnRzOiBbe1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJvcnRob2dvbmFsXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY3JvbGxTZXR0aW5nczoge1xyXG5cdFx0XHRcdGhvcml6b250YWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0dmVydGljYWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0em9vbUZhY3RvcjogMC4yXHJcblx0XHRcdH0sXHJcblx0XHRcdGVuYWJsZUF1dG9TY3JvbGw6IHRydWUsXHJcblx0XHRcdHBhZ2VTZXR0aW5nczoge1xyXG5cdFx0XHRcdHNjcm9sbExpbWl0OiBcImluZmluaXR5XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczoge1xyXG5cdFx0XHRcdHVzZXJIYW5kbGVzOiBbY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KV1cclxuXHRcdFx0fSxcclxuXHRcdFx0bm9kZVRlbXBsYXRlKGRpYWdyYW0sIG5vZGUpIHtcclxuXHRcdFx0XHRpZiAobm9kZS5PcHRpb25zKSB7XHJcblx0XHRcdFx0XHR2YXIgdHlwZSA9IG5vZGUuT3B0aW9ucy50eXBlO1xyXG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHRcdG5vZGUuZmlsbENvbG9yID0gXCIjMjljMTVmXCI7XHJcblx0XHRcdFx0XHRcdFx0bm9kZS5zaGFwZSA9IFwiZWxsaXBzZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdFx0XHRub2RlLmZpbGxDb2xvciA9IFwiIzIwODVjOVwiO1xyXG5cdFx0XHRcdFx0XHRcdG5vZGUuc2hhcGUgPSBcInJlY3RhbmdsZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOlxyXG5cdFx0XHRcdFx0XHRcdG5vZGUuZmlsbENvbG9yID0gXCIjZWM3ZTBkXCI7XHJcblx0XHRcdFx0XHRcdFx0bm9kZS5zaGFwZSA9IFwiZWxsaXBzZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvcGVydHlDaGFuZ2UoYXJncykge1xyXG5cdFx0XHRcdGlmIChhcmdzLmVsZW1lbnRUeXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdFx0aWYgKF8uaW5jbHVkZXMoW1wib2Zmc2V0WFwiLCBcIm9mZnNldFlcIl0sIGFyZ3MucHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHQkdGhpcy51cGRhdGVOb2RlUHJvcChhcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1PdmVydmlld0VsSWQpLmVqT3ZlcnZpZXcoe1xyXG5cdFx0XHRzb3VyY2VJRDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdGFkZERlcGVuZE1vZGFsV2luZG93XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Z3JhcGgodmFsKSB7XHJcblx0XHRcdHZhciBkaWFncmFtID0gdGhpcy5kaWFncmFtO1xyXG5cdFx0XHRfLmZpbHRlcih2YWwuTm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRcdFx0cmV0dXJuICFfLmZpbmQoZGlhZ3JhbS5ub2RlcygpLCB4ID0+IHgubmFtZSA9PT0gbm9kZS5uYW1lKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQuZm9yRWFjaCh4ID0+XHJcblx0XHRcdFx0XHRkaWFncmFtLmFkZChcclxuXHRcdFx0XHRcdFx0Xy5tZXJnZSh4LCB7XHJcblx0XHRcdFx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogeC5uYW1lXHJcblx0XHRcdFx0XHRcdFx0fV1cclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRfLmZpbHRlcih2YWwuQ29ubmVjdG9ycywgZnVuY3Rpb24gKGNvbikge1xyXG5cdFx0XHRcdHJldHVybiAhXy5maW5kKGRpYWdyYW0uY29ubmVjdG9ycygpLCB4ID0+IHgubmFtZSA9PT0gY29uLm5hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC5mb3JFYWNoKHggPT4gZGlhZ3JhbS5hZGQoeCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJvbGVcclxue1xyXG5cdE5hbWU6IHN0cmluZ1xyXG59IiwiaW1wb3J0IHsgSVJvbGUgfSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVuY3kge1xyXG5cdFN0YXJ0OiBzdHJpbmcsXHJcblx0TmFtZT86IHN0cmluZzsgXHJcblx0RW5kOiBzdHJpbmc7XHJcblx0Um9sZXM/OiBBcnJheTxJUm9sZT47XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi9Qb2ludFR5cGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVBvaW50IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0b2Zmc2V0WDogYW55O1xyXG5cdG9mZnNldFk6IGFueTtcclxuXHRPcHRpb25zOiB7XHJcblx0XHR0eXBlOiBQb2ludFR5cGU7XHJcblx0fSxcclxuXHRsYWJlbHM/OiBhbnk7XHJcbn0iLCJpbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRQb2ludHM6IEFycmF5PEJhc2VQb2ludD47XHJcblx0RGVwZW5kZW5jaWVzOiBBcnJheTxEZXBlbmRlbmN5PjtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0VmFsdWU6IHN0cmluZztcclxufSIsImltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxufSIsImltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4vR3JhcGhcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBJUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUm9vdFN0YXRlIHtcclxuXHRHcmFwaHM6IEFycmF5PEdyYXBoPjtcclxuXHRDaGFyYWN0ZXJpc3RpY3M6IEFycmF5PENoYXJhY3RlcmlzdGljPjtcclxuXHRSb2xlczogQXJyYXk8SVJvbGU+O1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBOb2RlIHtcclxuXHRuYW1lOiBzdHJpbmdcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdG9yIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0c291cmNlTm9kZTogc3RyaW5nO1xyXG5cdHRhcmdldE5vZGU6IHN0cmluZztcclxufSIsImltcG9ydCB7IE5vZGUgfSBmcm9tIFwiLi9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuL0Nvbm5lY3RvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZkdyYXBoIHtcclxuXHROYW1lOiBzdHJpbmcsXHJcblx0Tm9kZXM6IEFycmF5PE5vZGU+O1xyXG5cdENvbm5lY3RvcnM6IEFycmF5PENvbm5lY3Rvcj47XHJcbn0iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IHsgQWN0aW9uQ29udGV4dCwgU3RvcmUsIEdldHRlclRyZWUgfSBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBnZXRTdG9yZUFjY2Vzc29ycyB9IGZyb20gXCJ2dWV4LXR5cGVzY3JpcHRcIjtcclxuaW1wb3J0IHsgR3JhcGggfSBmcm9tIFwiLi4vTW9kZWwvR3JhcGhcIjtcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSBcIi4uL01vZGVsL1Jvb3RTdGF0ZVwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IFNmR3JhcGggfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0dyYXBoXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvTm9kZVwiO1xyXG5pbXBvcnQgeyBDb25uZWN0b3IgfSBmcm9tIFwiLi4vTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0Nvbm5lY3RvclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vTW9kZWwvRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcblxyXG50eXBlIEdyYXBoQ29udGV4dCA9IEFjdGlvbkNvbnRleHQ8Um9vdFN0YXRlLCBSb290U3RhdGU+O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdyYXBoTW9kdWxlID0ge1xyXG5cdG5hbWVzcGFjZWQ6IHRydWUsXHJcblxyXG5cdHN0YXRlOiB7XHJcblx0XHRHcmFwaHM6IFt7XHJcblx0XHRcdE5hbWU6IFwiR3JhcGgxXCIsXHJcblx0XHRcdFBvaW50czogW1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdGxhYmVsczogW3tcclxuXHRcdFx0XHRcdFx0dGV4dDogXCJTdGFydCBQb2ludFwiXHJcblx0XHRcdFx0XHR9XSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDYwLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdF0sXHJcblx0XHRcdERlcGVuZGVuY2llczogW11cclxuXHRcdH1dLFxyXG5cdFx0Q2hhcmFjdGVyaXN0aWNzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIkNoYXIgMVwiLFxyXG5cdFx0XHRcdFZhbHVlczogW3tcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMS4gVmFsdWUgMlwiXHJcblx0XHRcdFx0fV1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAyXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgMVwiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAzXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgMVwiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDNcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNFwiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA1XCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDZcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgN1wiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA4XCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDlcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0XSxcclxuXHRcdFJvbGVzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgMlwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHROYW1lOiBcIlJvbGUgM1wiXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9LFxyXG5cdGdldHRlcnM6IHtcclxuXHRcdGdldEdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocztcclxuXHRcdH0sXHJcblx0XHRncmFwaENvdW50KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkdyYXBocy5sZW5ndGg7XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChuYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHR2YXIgZ3JhcGggPSBfLmZpcnN0KHN0YXRlLkdyYXBocy5maWx0ZXIoeCA9PiB4Lk5hbWUgPT09IG5hbWUpKTtcclxuXHRcdFx0XHRyZXR1cm4gZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uZ0dyYXBoQnlHcmFwaChzdGF0ZSkoZ3JhcGgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIChncmFwaDogR3JhcGgpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0TmFtZTogZ3JhcGguTmFtZSxcclxuXHRcdFx0XHRcdE5vZGVzOiBncmFwaC5Qb2ludHMsXHJcblx0XHRcdFx0XHRDb25uZWN0b3JzOiBfLm1hcChncmFwaC5EZXBlbmRlbmNpZXMsIGZ1bmN0aW9uIChjb24pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIF8ubWVyZ2Uoe1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGNvbi5OYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHNvdXJjZU5vZGU6IGNvbi5TdGFydCxcclxuXHRcdFx0XHRcdFx0XHR0YXJnZXROb2RlOiBjb24uRW5kXHJcblx0XHRcdFx0XHRcdH0sIGNvbik7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0Z2V0Q2hhcmFjdGVyaXN0aWNzTGlzdChzdGF0ZTogUm9vdFN0YXRlKSB7XHJcblx0XHRcdHJldHVybiBzdGF0ZS5DaGFyYWN0ZXJpc3RpY3M7XHJcblx0XHR9LFxyXG5cdFx0Z2V0Um9sZXMoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuUm9sZXM7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtdXRhdGlvbnM6IHtcclxuXHRcdGFkZEdyYXBoKHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IEdyYXBoKSB7XHJcblx0XHRcdHN0YXRlLkdyYXBocy5wdXNoKGl0ZW0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgcG9pbnQ6IEJhc2VQb2ludCB9KSB7XHJcblx0XHRcdHN0YXRlLkdyYXBocy5maWx0ZXIoeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpWzBdLlBvaW50cy5wdXNoKGl0ZW0ucG9pbnQpO1xyXG5cdFx0fSxcclxuXHRcdGFkZERlcGVuZGVuY3koc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBkZXA6IERlcGVuZGVuY3kgfSkge1xyXG5cdFx0XHRzdGF0ZS5HcmFwaHMuZmlsdGVyKHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKVswXS5EZXBlbmRlbmNpZXMucHVzaChpdGVtLmRlcCk7XHJcblx0XHR9LFxyXG5cdFx0Y2hhbmdlTm9kZVByb3BlcnR5KHN0YXRlOiBSb290U3RhdGUsIGl0ZW06IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0dmFyIHBvaW50cyA9IF8uZmluZChzdGF0ZS5HcmFwaHMsIHggPT4geC5OYW1lID09PSBpdGVtLmdyYXBoKS5Qb2ludHM7XHJcblx0XHRcdHZhciBwb2ludCA9IF8uZmluZChwb2ludHMsIHggPT4geC5uYW1lID09PSBpdGVtLm5hbWUpO1xyXG5cdFx0XHRWdWUuc2V0KHBvaW50LCBpdGVtLnByb3BOYW1lLCBpdGVtLm5ld1ZhbHVlKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5jb25zdCB7IHJlYWQsIGNvbW1pdCB9ID1cclxuXHRnZXRTdG9yZUFjY2Vzc29yczxSb290U3RhdGUsIFJvb3RTdGF0ZT4oXCJncmFwaFwiKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgcmVhZEdyYXBoQ291bnQgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ3JhcGhDb3VudCk7XHJcbmV4cG9ydCBjb25zdCBnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbkdyYXBoQnlOYW1lKTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoID0gcmVhZChncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGdldENoYXJhY3RlcmlzdGljc0xpc3QgPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCk7XHJcbmV4cG9ydCBjb25zdCBnZXRSb2xlcyA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRSb2xlcyk7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkR3JhcGggPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZEdyYXBoKTtcclxuZXhwb3J0IGNvbnN0IGFkZFBvaW50ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGRQb2ludCk7XHJcbmV4cG9ydCBjb25zdCBhZGREZXBlbmRlbmN5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5hZGREZXBlbmRlbmN5KTtcclxuZXhwb3J0IGNvbnN0IGNoYW5nZU5vZGVQcm9wZXJ0eSA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuY2hhbmdlTm9kZVByb3BlcnR5KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSBcIi4uL01vZGVsL1Jvb3RTdGF0ZVwiO1xyXG5pbXBvcnQgeyBncmFwaE1vZHVsZSBhcyBncmFwaCB9IGZyb20gXCIuL0dyYXBoU3RvcmVcIjtcclxuaW1wb3J0IFZ1ZXhQZXJzaXN0ZW5jZSBmcm9tIFwidnVleC1wZXJzaXN0XCI7XHJcblxyXG5WdWUudXNlKFZ1ZXgpO1xyXG5cclxuY29uc3QgdnVleExvY2FsID0gbmV3IFZ1ZXhQZXJzaXN0ZW5jZSh7XHJcblx0c3RvcmFnZTogd2luZG93LmxvY2FsU3RvcmFnZVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKCkge1xyXG5cdHJldHVybiBuZXcgVnVleC5TdG9yZTxSb290U3RhdGU+KHtcclxuXHRcdG1vZHVsZXM6IHtcclxuXHRcdFx0Z3JhcGhcclxuXHRcdH0sXHJcblx0XHRwbHVnaW5zOiBbdnVleExvY2FsLnBsdWdpbl0sXHJcblx0XHRzdHJpY3Q6IHRydWVcclxuXHR9KVxyXG59OyIsIi8vIENsaWVudEFwcC9jb21wb25lbnRzL0FwcEhlbGxvLnRzXHJcbmltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJpc3RpY0RpYWdyYW0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNEaWFncmFtXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSBcIi4uL1N0b3JlL1Jvb3RTdG9yZVwiO1xyXG5pbXBvcnQgKiBhcyBncmFwaCBmcm9tIFwiLi4vU3RvcmUvR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi4vTW9kZWwvQmFzZVBvaW50XCI7XHJcbmltcG9ydCB7IERlcGVuZGVuY3kgfSBmcm9tIFwiLi4vTW9kZWwvRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvUG9pbnRUeXBlXCI7XHJcblxyXG5cclxudmFyIHN0b3JlID0gY3JlYXRlU3RvcmUoKTtcclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6ICcjYXBwLWhlbGxvLXRlbXBsYXRlJyxcclxuXHRzdG9yZSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bWVzc2FnZTogXCJ0ZXN0IG1lc3NhZ2VcIlxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHRkaWFncmFtcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLnJlYWRHcmFwaCh0aGlzLiRzdG9yZSkubWFwKHggPT4gZ3JhcGguZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgodGhpcy4kc3RvcmUpKHgpKTtcclxuXHRcdH0sXHJcblx0XHRjaGFyYWN0ZXJpc3RpY3MoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHRoaXMuJHN0b3JlKTtcclxuXHRcdH0sXHJcblx0XHRyb2xlcygpIHtcclxuXHRcdFx0cmV0dXJuIGdyYXBoLmdldFJvbGVzKHRoaXMuJHN0b3JlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZEdyYXBoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGdyYXBoLmFkZEdyYXBoKHRoaXMuJHN0b3JlLCB7XHJcblx0XHRcdFx0TmFtZTogXCJHcmFwaFwiICsgKGdyYXBoLnJlYWRHcmFwaENvdW50KHRoaXMuJHN0b3JlKSArIDEpLFxyXG5cdFx0XHRcdFBvaW50czogW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDIwLFxyXG5cdFx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIlN0YXJ0IFBvaW50XCJcclxuXHRcdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZE5vZGU6IGZ1bmN0aW9uIChub2RlOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHRncmFwaC5hZGRQb2ludCh0aGlzLiRzdG9yZSwgbm9kZSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkQ29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Q6IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkRGVwZW5kZW5jeSh0aGlzLiRzdG9yZSwgY29ubmVjdCk7XHJcblx0XHR9LFxyXG5cdFx0b25Ob2RlUHJvcENoYW5nZTogZnVuY3Rpb24gKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0Z3JhcGguY2hhbmdlTm9kZVByb3BlcnR5KHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9LFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0Q2hhcmFjdGVyaXN0aWNEaWFncmFtXHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBBcHBIZWxsbyBmcm9tIFwiLi9jb21wb25lbnRzL0FwcEhlbGxvXCI7XHJcbmltcG9ydCBsb2Rhc2hNaXhpbiBmcm9tIFwiLi9taXhpbnMvbV9sb2Rhc2hcIjtcclxuXHJcbi8vUm9vdCBDb21wb25lbnRcclxubGV0IHYgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNhcHAtcm9vdFwiLFxyXG5cdHRlbXBsYXRlOiAnPEFwcEhlbGxvLz4nLFxyXG4gICAgLy9yZW5kZXI6IGggPT4gaChBcHBIZWxsb0NvbXBvbmVudCksXHJcbiAgICBjb21wb25lbnRzOiB7XHJcblx0XHRBcHBIZWxsb1xyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjdGVzdC10ZW1wXCIsXHJcblx0ZGF0YSgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHF1ZXN0aW9uOiAnJyxcclxuXHRcdFx0YW5zd2VyOiAn0J/QvtC60LAg0LLRiyDQvdC1INC30LDQtNCw0LTQuNGC0LUg0LLQvtC/0YDQvtGBLCDRjyDQvdC1INC80L7Qs9GDINC+0YLQstC10YLQuNGC0YwhJ1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHQvLyDRjdGC0LAg0YTRg9C90LrRhtC40Y8g0LfQsNC/0YPRgdC60LDQtdGC0YHRjyDQv9GA0Lgg0LvRjtCx0L7QvCDQuNC30LzQtdC90LXQvdC40Lgg0LLQvtC/0YDQvtGB0LBcclxuXHRcdHF1ZXN0aW9uKG5ld1F1ZXN0aW9uLCBvbGRRdWVzdGlvbikge1xyXG5cdFx0XHR0aGlzLmFuc3dlciA9ICfQntC20LjQtNCw0Y4sINC60L7Qs9C00LAg0LLRiyDQt9Cw0LrQvtC90YfQuNGC0LUg0L/QtdGH0LDRgtCw0YLRjC4uLidcclxuXHRcdFx0dGhpcy5nZXRBbnN3ZXIoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGdldEFuc3dlcjpcclxuXHRcdFx0IF8uZGVib3VuY2UoXHJcblx0XHRcdFx0ZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5xdWVzdGlvbi5pbmRleE9mKCc/JykgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYW5zd2VyID0gJ9CS0L7Qv9GA0L7RgdGLINC+0LHRi9GH0L3QviDQt9Cw0LrQsNC90YfQuNCy0LDRjtGC0YHRjyDQstC+0L/RgNC+0YHQuNGC0LXQu9GM0L3Ri9C8INC30L3QsNC60L7QvC4gOy0pJztcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dGhpcy5hbnN3ZXIgPSAn0JTRg9C80LDRji4uLic7XHJcblx0XHRcdFx0XHR2YXIgdm0gPSB0aGlzO1xyXG5cdFx0XHRcdFx0YXhpb3MuZ2V0KCdodHRwczovL3llc25vLnd0Zi9hcGknKVxyXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHZtLmFuc3dlciA9IF8uY2FwaXRhbGl6ZShyZXNwb25zZS5kYXRhLmFuc3dlcik7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdHZtLmFuc3dlciA9ICfQntGI0LjQsdC60LAhINCd0LUg0LzQvtCz0YMg0YHQstGP0LfQsNGC0YzRgdGPINGBIEFQSS4gJyArIGVycm9yXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly8g0K3RgtC+INGH0LjRgdC70L4g0LzQuNC70LvQuNGB0LXQutGD0L3QtCwg0LrQvtGC0L7RgNC+0LUg0LzRiyDQttC00ZHQvCwg0L/QvtGB0LvQtSDRgtC+0LPQviDQutCw0Log0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC/0YDQtdC60YDQsNGC0LjQuyDQv9C10YfQsNGC0LDRgtGMLlxyXG5cdFx0XHRcdDUwMFxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG4pOyIsImltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpYyB9IGZyb20gXCIuL0NoYXJhY3RlcmlzdGljXCI7XHJcbmltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljUG9pbnQgZXh0ZW5kcyBCYXNlUG9pbnQge1xyXG5cdENoYXJhY3RlcmlzdGljOiBDaGFyYWN0ZXJpc3RpYztcclxuXHRWYWx1ZXM6IEFycmF5PENoYXJhY3RlcmlzdGljVmFsdWU+O1xyXG5cdFJlcXVpcmVkPzogYm9vbGVhbjtcclxuXHREZWZhdWx0VmFsdWU6IENoYXJhY3RlcmlzdGljVmFsdWU7XHJcbn0iLCJpbXBvcnQge0RlcGVuZGVuY3l9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuaW1wb3J0IHtJUm9sZX0gZnJvbSBcIi4vUm9sZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRGVwZW5kZW5jeVJvbGUge1xyXG5cdERlcGVuZGVuY3k6IERlcGVuZGVuY3k7XHJcblx0Um9sZTogSVJvbGU7XHJcbn0iXX0=