System.register("components/Diagram/RuleControll", ["vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.default.extend({
                template: "#rule-controll",
                props: ["point", "index"],
                data: function () {
                    return {
                        togglesValues: []
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
                            Roles: null,
                            index: this.index
                        };
                        this.$emit("rule-change", value);
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
    var vue_2, lodash_1, RuleControll_1;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (RuleControll_1_1) {
                RuleControll_1 = RuleControll_1_1;
            }
        ],
        execute: function () {
            ;
            exports_2("default", vue_2.default.extend({
                template: "#add-depend-point",
                props: ["show", "id", "startpoints", "characteristics"],
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
                        var point = lodash_1.default.merge({
                            name: this.point
                        }, {
                            options: {
                                Characteristic: this.selectedCharacteristic,
                                Values: this.togglesValues
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
                            this.togglesValues = [];
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
System.register("components/Diagram/AddDependedPoint", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
    exports_3("default", default_1);
    return {
        setters: [],
        execute: function () {
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
System.register("components/CharacteristicDiagram", ["vue", "lodash", "syncfusion", "components/Diagram/AddDependPointWindow", "components/Diagram/AddDependedPoint", "Model/PointType"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var vue_3, lodash_2, AddDependPointWindow_1, AddDependedPoint_1, PointType_1, constraints;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (lodash_2_1) {
                lodash_2 = lodash_2_1;
            },
            function (_1) {
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
            exports_5("default", vue_3.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height", "characteristics"],
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
                        this.addPoint(lodash_2.default.merge({
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
                        lodash_2.default.forEach(this.selectedNodes, function (node) {
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
                        this.selectedNodes = lodash_2.default.map(selectedNodes, function (x) { return _this.diagram.findNode(x); });
                        this.showAddDependModal = true;
                    },
                    updateNodeProp: function () {
                        var mem = lodash_2.default.memoize(function (memArgs) {
                            return lodash_2.default.debounce(function (args) {
                                var node = lodash_2.default.find(this.graph.Nodes, function (node) { return node.name === args.element.name; });
                                if (node) {
                                    this.$emit("node-prop-change", {
                                        graph: this.graph.Name,
                                        name: node.name,
                                        propName: args.propertyName,
                                        newValue: args.element[args.propertyName]
                                    });
                                }
                            }, 500);
                        }, function (args) { return args.propertyName; });
                        mem.apply(this, arguments).apply(this, arguments);
                    }
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
                                if (lodash_2.default.includes(["offsetX", "offsetY"], args.propertyName)) {
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
                        lodash_2.default.filter(val.Nodes, function (node) {
                            return !lodash_2.default.find(diagram.nodes(), function (x) { return x.name === node.name; });
                        })
                            .forEach(function (x) {
                            return diagram.add(lodash_2.default.merge(x, {
                                labels: [{
                                        text: x.name
                                    }]
                            }));
                        });
                        lodash_2.default.filter(val.Connectors, function (con) {
                            return !lodash_2.default.find(diagram.connectors(), function (x) { return x.name === con.name; });
                        })
                            .forEach(function (x) { return diagram.add(x); });
                    }
                }
            }));
        }
    };
});
System.register("Model/Dependency", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/BasePoint", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Graph", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
System.register("Model/Characteristic", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/RootState", [], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Node", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Connector", [], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Graph", [], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Store/GraphStore", ["vue", "vuex-typescript", "lodash", "Model/PointType"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var vue_4, vuex_typescript_1, lodash_3, PointType_2, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, addGraph, addPoint, addDependency, changeNodeProperty;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_3_1) {
                lodash_3 = lodash_3_1;
            },
            function (PointType_2_1) {
                PointType_2 = PointType_2_1;
            }
        ],
        execute: function () {
            exports_15("graphModule", graphModule = {
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
                        },
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
                            var graph = lodash_3.default.first(state.Graphs.filter(function (x) { return x.Name === name; }));
                            return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
                        };
                    },
                    getSyncfusiongGraphByGraph: function (state) {
                        return function (graph) {
                            return {
                                Name: graph.Name,
                                Nodes: graph.Points,
                                Connectors: lodash_3.default.map(graph.Dependencies, function (con) {
                                    return lodash_3.default.merge({
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
                        var points = lodash_3.default.find(state.Graphs, function (x) { return x.Name === item.graph; }).Points;
                        var point = lodash_3.default.find(points, function (x) { return x.name === item.name; });
                        vue_4.default.set(point, item.propName, item.newValue);
                    }
                }
            });
            _a = vuex_typescript_1.getStoreAccessors("graph"), read = _a.read, commit = _a.commit;
            exports_15("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_15("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_15("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_15("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_15("getCharacteristicsList", getCharacteristicsList = read(graphModule.getters.getCharacteristicsList));
            exports_15("addGraph", addGraph = commit(graphModule.mutations.addGraph));
            exports_15("addPoint", addPoint = commit(graphModule.mutations.addPoint));
            exports_15("addDependency", addDependency = commit(graphModule.mutations.addDependency));
            exports_15("changeNodeProperty", changeNodeProperty = commit(graphModule.mutations.changeNodeProperty));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore", "vuex-persist"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
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
            exports_16("createStore", createStore = function () {
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
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
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
            exports_17("default", vue_6.default.extend({
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
System.register("index", ["vue", "components/AppHello"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
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
            //Vuex plugin
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
System.register("components/TestVue", ["vue", "lodash", "axios"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var vue_8, lodash_4, axios_1;
    return {
        setters: [
            function (vue_8_1) {
                vue_8 = vue_8_1;
            },
            function (lodash_4_1) {
                lodash_4 = lodash_4_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            exports_19("default", vue_8.default.extend({
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
                    getAnswer: lodash_4.default.debounce(function () {
                        if (this.question.indexOf('?') === -1) {
                            this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                            return;
                        }
                        this.answer = 'Думаю...';
                        var vm = this;
                        axios_1.default.get('https://yesno.wtf/api')
                            .then(function (response) {
                            vm.answer = lodash_4.default.capitalize(response.data.answer);
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
System.register("Model/CharacteristicPoint", [], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhbmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vUnVsZUNvbnRyb2xsLnRzIiwiLi4vLi4vQ2xpZW50QXBwL2NvbXBvbmVudHMvRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvdy50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL0RpYWdyYW0vQWRkRGVwZW5kZWRQb2ludC50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Qb2ludFR5cGUudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9DaGFyYWN0ZXJpc3RpY0RpYWdyYW0udHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvRGVwZW5kZW5jeS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9CYXNlUG9pbnQudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvQ2hhcmFjdGVyaXN0aWNWYWx1ZS50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9DaGFyYWN0ZXJpc3RpYy50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9Sb290U3RhdGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL05vZGUudHMiLCIuLi8uLi9DbGllbnRBcHAvTW9kZWwvU3luY2Z1c2lvbkdyYXBoL0Nvbm5lY3Rvci50cyIsIi4uLy4uL0NsaWVudEFwcC9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGgudHMiLCIuLi8uLi9DbGllbnRBcHAvU3RvcmUvR3JhcGhTdG9yZS50cyIsIi4uLy4uL0NsaWVudEFwcC9TdG9yZS9Sb290U3RvcmUudHMiLCIuLi8uLi9DbGllbnRBcHAvY29tcG9uZW50cy9BcHBIZWxsby50cyIsIi4uLy4uL0NsaWVudEFwcC9pbmRleC50cyIsIi4uLy4uL0NsaWVudEFwcC9jb21wb25lbnRzL1Rlc3RWdWUudHMiLCIuLi8uLi9D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QUNIO2lCQUNEO2FBQ0QsQ0FDRDtRQUFDLENBQUM7Ozs7Ozs7OztRQ2pDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogXCIjcnVsZS1jb250cm9sbFwiLFxyXG5cdHByb3BzOiBbXCJwb2ludFwiLCBcImluZGV4XCJdLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0b2dnbGVzVmFsdWVzOiBbXVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdHdhdGNoOiB7XHJcblx0XHRwb2ludCgpIHtcclxuXHRcdFx0dGhpcy50b2dnbGVzVmFsdWVzID0gW107XHJcblx0XHR9LFxyXG5cdFx0dG9nZ2xlc1ZhbHVlcygpIHtcclxuXHRcdFx0dmFyIHZhbHVlID0ge1xyXG5cdFx0XHRcdFBvaW50OiB0aGlzLnBvaW50LFxyXG5cdFx0XHRcdFZhbHVlczogdGhpcy50b2dnbGVzVmFsdWVzLFxyXG5cdFx0XHRcdFJvbGVzOiBudWxsLFxyXG5cdFx0XHRcdGluZGV4OiB0aGlzLmluZGV4XHJcblx0XHRcdH07XHJcblx0XHRcdHRoaXMuJGVtaXQoXCJydWxlLWNoYW5nZVwiLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IFJ1bGVDb250cm9sbCBmcm9tIFwiLi9SdWxlQ29udHJvbGxcIjtcclxuZGVjbGFyZSBjb25zdCAkOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgT2JqZWN0OiBhbnk7XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdERhdGEoKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHBvaW50OiBudWxsLFxyXG5cdFx0cmVxdWlyZWQ6IGZhbHNlLFxyXG5cdFx0ZGVmYXVsdFZhbHVlOiBudWxsLFxyXG5cdFx0c2VsZWN0ZWRDaGFyYWN0ZXJpc3RpYzogbnVsbCxcclxuXHRcdHRvZ2dsZXNWYWx1ZXM6IFtdLFxyXG5cdFx0cnVsZXM6IFtdXHJcblx0fTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNhZGQtZGVwZW5kLXBvaW50XCIsXHJcblx0cHJvcHM6IFtcInNob3dcIiwgXCJpZFwiLCBcInN0YXJ0cG9pbnRzXCIsIFwiY2hhcmFjdGVyaXN0aWNzXCJdLFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdFJ1bGVDb250cm9sbFxyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNhZGQtZGVwZW5kLXBvaW50X1wiICsgdGhpcy5pZDtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGRhdGE6IGdldERlZmF1bHREYXRhLFxyXG5cdG1vdW50ZWQoKSB7XHJcblx0XHQkKHRoaXMuZWxJZClcclxuXHRcdFx0Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiB0aGlzLnNob3cgPSBmYWxzZSk7XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRhZGRQb2ludCgpIHtcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5tZXJnZSh7XHJcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnBvaW50XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRvcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdENoYXJhY3RlcmlzdGljOiB0aGlzLnNlbGVjdGVkQ2hhcmFjdGVyaXN0aWMsXHJcblx0XHRcdFx0XHRcdFZhbHVlczogdGhpcy50b2dnbGVzVmFsdWVzXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHR0aGlzLiRlbWl0KFwiYWRkcG9pbnRcIiwge1xyXG5cdFx0XHRcdHJ1bGVzOiB0aGlzLnJ1bGVzLFxyXG5cdFx0XHRcdHBvaW50OiBwb2ludFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5jbGVhckRhdGEoKTtcclxuXHRcdH0sXHJcblx0XHRjbGVhckRhdGEoKSB7XHJcblx0XHRcdE9iamVjdC5hc3NpZ24odGhpcy4kZGF0YSwgZ2V0RGVmYXVsdERhdGEoKSk7XHJcblx0XHR9LFxyXG5cdFx0b25SdWxlQ2hhbmdlKHZhbCkge1xyXG5cdFx0XHR2YXIgaW5kZXggPSB2YWwuaW5kZXg7XHJcblx0XHRcdFZ1ZS5zZXQodGhpcy5ydWxlcywgaW5kZXgsIHZhbCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0c2hvdyh2YWwpIHtcclxuXHRcdFx0aWYgKHZhbCkge1xyXG5cdFx0XHRcdCQodGhpcy5lbElkKS5tb2RhbChcInNob3dcIik7XHJcblx0XHRcdFx0dGhpcy50b2dnbGVzVmFsdWVzID0gW107XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzLmVsSWQpLm1vZGFsKFwiaGlkZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRvZ2dsZXNWYWx1ZXModmFsdWVzKSB7XHJcblx0XHRcdGlmICh2YWx1ZXMgPT0gbnVsbCB8fCB2YWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5kZWZhdWx0VmFsdWUgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KTsiLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG5cclxuLy9leHBvcnQgZGVmYXVsdCBhZGREZXBlbmRQb2ludDtcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9uPzogYW55KSB7XHJcblx0dmFyIGZ1bmMgPSAoZnVuY3Rpb24gKGJhc2U6IGFueSkge1xyXG5cdFx0ZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5leHRlbmQoQWRkRGVwZW5kUG9pbnQsIGJhc2UpO1xyXG5cclxuXHRcdGZ1bmN0aW9uIEFkZERlcGVuZFBvaW50KG5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRiYXNlLmNhbGwodGhpcywgbmFtZSk7XHJcblx0XHRcdHRoaXMuc2luZ2xlQWN0aW9uID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jbG9uZWROb2RlcyA9IFtdO1xyXG5cdFx0XHR0aGlzLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG5cdFx0fVxyXG5cdFx0QWRkRGVwZW5kUG9pbnQucHJvdG90eXBlLm1vdXNldXAgPSBmdW5jdGlvbiAoZXZ0OiBhbnkpIHtcclxuXHRcdFx0YmFzZS5wcm90b3R5cGUubW91c2V1cC5jYWxsKHRoaXMsIGV2dCk7XHJcblx0XHRcdG9wdGlvbi5idXMuJGVtaXQoXCJhZGQtZGVwZW5kLXBvaW50XCIsIHtcclxuXHRcdFx0XHRub2RlczogdGhpcy5kaWFncmFtLnNlbGVjdGlvbkxpc3RcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBBZGREZXBlbmRQb2ludDtcclxuXHR9KGVqLmRhdGF2aXN1YWxpemF0aW9uLkRpYWdyYW0uVG9vbEJhc2UpKTtcclxuXHJcblx0dmFyIHVzZXJIYW5kbGVzID0gW107XHJcblx0dmFyIGFkZERlcGVuZFBvaW50ID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlKCk7XHJcblx0YWRkRGVwZW5kUG9pbnQubmFtZSA9IFwiQWRkXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQudG9vbCA9IG5ldyBmdW5jKGFkZERlcGVuZFBvaW50Lm5hbWUpO1xyXG5cdGFkZERlcGVuZFBvaW50LnBvc2l0aW9uID0gZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5Vc2VySGFuZGxlUG9zaXRpb25zLkJvdHRvbUxlZnQ7XHJcblx0YWRkRGVwZW5kUG9pbnQudmlzaWJsZSA9IHRydWU7XHJcblx0YWRkRGVwZW5kUG9pbnQuZW5hYmxlTXVsdGlTZWxlY3Rpb24gPSB0cnVlO1xyXG5cdGFkZERlcGVuZFBvaW50LnNpemUgPSAzNTtcclxuXHRhZGREZXBlbmRQb2ludC5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM0RDRENERcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoQ29sb3IgPSBcIndoaXRlXCI7XHJcblx0YWRkRGVwZW5kUG9pbnQuYm9yZGVyV2lkdGggPSBcIjFcIjtcclxuXHRhZGREZXBlbmRQb2ludC5wYXRoRGF0YSA9IFwiTTE0LjYxMywxMGMwLDAuMjMtMC4xODgsMC40MTktMC40MTksMC40MTlIMTAuNDJ2My43NzRjMCwwLjIzLTAuMTg5LDAuNDItMC40MiwwLjQycy0wLjQxOS0wLjE4OS0wLjQxOS0wLjQydi0zLjc3NEg1LjgwNmMtMC4yMywwLTAuNDE5LTAuMTg5LTAuNDE5LTAuNDE5czAuMTg5LTAuNDE5LDAuNDE5LTAuNDE5aDMuNzc1VjUuODA2YzAtMC4yMywwLjE4OS0wLjQxOSwwLjQxOS0wLjQxOXMwLjQyLDAuMTg5LDAuNDIsMC40MTl2My43NzVoMy43NzRDMTQuNDI1LDkuNTgxLDE0LjYxMyw5Ljc3LDE0LjYxMywxMCBNMTcuOTY5LDEwYzAsNC40MDEtMy41NjcsNy45NjktNy45NjksNy45NjljLTQuNDAyLDAtNy45NjktMy41NjctNy45NjktNy45NjljMC00LjQwMiwzLjU2Ny03Ljk2OSw3Ljk2OS03Ljk2OUMxNC40MDEsMi4wMzEsMTcuOTY5LDUuNTk4LDE3Ljk2OSwxMCBNMTcuMTMsMTBjMC0zLjkzMi0zLjE5OC03LjEzLTcuMTMtNy4xM1MyLjg3LDYuMDY4LDIuODcsMTBjMCwzLjkzMywzLjE5OCw3LjEzLDcuMTMsNy4xM1MxNy4xMywxMy45MzMsMTcuMTMsMTBcIjtcclxuXHRyZXR1cm4gYWRkRGVwZW5kUG9pbnQ7XHJcbn0iLCJcclxuZXhwb3J0IGVudW0gUG9pbnRUeXBlIHtcclxuXHRzdGFydCA9IDAsXHJcblx0Y2hhcmFjdGVyaXN0aWMsXHJcblx0YWdncmVnYXRvclxyXG59IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFwic3luY2Z1c2lvblwiO1xyXG5pbXBvcnQgYWRkRGVwZW5kTW9kYWxXaW5kb3cgZnJvbSBcIi4vRGlhZ3JhbS9BZGREZXBlbmRQb2ludFdpbmRvd1wiO1xyXG5pbXBvcnQgY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyIGZyb20gXCIuL0RpYWdyYW0vQWRkRGVwZW5kZWRQb2ludFwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcImh0dHAyXCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuZGVjbGFyZSBjb25zdCBlajogYW55O1xyXG52YXIgY29uc3RyYWludHMgPSBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkRpYWdyYW1Db25zdHJhaW50cy5EZWZhdWx0IHwgZWouZGF0YXZpc3VhbGl6YXRpb24uRGlhZ3JhbS5EaWFncmFtQ29uc3RyYWludHMuRmxvYXRFbGVtZW50cztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZS5leHRlbmQoe1xyXG5cdHRlbXBsYXRlOiBcIiNjaGFyYWN0ZXJpc3RpYy1kaWFncmFtXCIsXHJcblx0cHJvcHM6IFtcImdyYXBoXCIsIFwiY2xhc3Nlc1wiLCBcImhlaWdodFwiLCBcImNoYXJhY3RlcmlzdGljc1wiXSxcclxuXHRkYXRhKCkge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YnVzOiBuZXcgVnVlKCksXHJcblx0XHRcdHNob3dBZGREZXBlbmRNb2RhbDogZmFsc2UsXHJcblx0XHRcdHNlbGVjdGVkTm9kZXM6IFtdLFxyXG5cdFx0XHRvZmZzZXRZTWFyZ2luOiAyNTBcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wdXRlZDoge1xyXG5cdFx0aGVpZ2h0UHgoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmhlaWdodCArIFwicHhcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmdyYXBoLk5hbWU7XHJcblx0XHR9LFxyXG5cdFx0ZGlhZ3JhbUVsSWQoKSB7XHJcblx0XHRcdHJldHVybiBcIiNcIiArIHRoaXMuZGlhZ3JhbUlkO1xyXG5cdFx0fSxcclxuXHRcdGRpYWdyYW1PdmVydmlld0VsSWQoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmRpYWdyYW1FbElkICsgXCJfb3ZlcnZpZXdcIjtcclxuXHRcdH0sXHJcblx0XHRkaWFncmFtKCkge1xyXG5cdFx0XHRyZXR1cm4gJCh0aGlzLmRpYWdyYW1FbElkKS5lakRpYWdyYW0oXCJpbnN0YW5jZVwiKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZERlcGVuZGVudFBvaW50KG9wdGlvbnMpIHtcclxuXHRcdFx0dmFyIHBvaW50ID0gb3B0aW9ucy5wb2ludDtcclxuXHRcdFx0dmFyIHJ1bGVzID0gb3B0aW9ucy5ydWxlcztcclxuXHRcdFx0dmFyIHBvaW50TmFtZSA9IHBvaW50Lm5hbWU7XHJcblx0XHRcdHZhciBmaXJzdFNlbGVjdGVkTm9kZSA9IHRoaXMuc2VsZWN0ZWROb2Rlc1swXTtcclxuXHRcdFx0dmFyIG9mZnNldFggPSBmaXJzdFNlbGVjdGVkTm9kZS5vZmZzZXRYO1xyXG5cdFx0XHR2YXIgb2Zmc2V0WSA9IGZpcnN0U2VsZWN0ZWROb2RlLm9mZnNldFk7XHJcblx0XHRcdHZhciBlbmRQb2ludCA9IHBvaW50TmFtZTtcclxuXHJcblx0XHRcdHRoaXMuYWRkUG9pbnQoXy5tZXJnZSh7XHJcblx0XHRcdFx0bmFtZTogcG9pbnROYW1lLFxyXG5cdFx0XHRcdG9mZnNldFg6IG9mZnNldFgsXHJcblx0XHRcdFx0b2Zmc2V0WTogb2Zmc2V0WSArIHRoaXMub2Zmc2V0WU1hcmdpbixcclxuXHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuY2hhcmFjdGVyaXN0aWNcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGxhYmVsczogW3tcclxuXHRcdFx0XHRcdHRleHQ6IHBvaW50TmFtZVxyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH0sIHBvaW50Lm9wdGlvbnMpKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkTm9kZXMubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdHZhciBhbmRQb2ludE5hbWUgPSBcIkFORF9cIiArIHBvaW50TmFtZTtcclxuXHRcdFx0XHRlbmRQb2ludCA9IGFuZFBvaW50TmFtZTtcclxuXHRcdFx0XHR0aGlzLmFkZFBvaW50KHtcclxuXHRcdFx0XHRcdG5hbWU6IGFuZFBvaW50TmFtZSxcclxuXHRcdFx0XHRcdG9mZnNldFg6IG9mZnNldFgsXHJcblx0XHRcdFx0XHRvZmZzZXRZOiBvZmZzZXRZICsgdGhpcy5vZmZzZXRZTWFyZ2luIC8gMixcclxuXHRcdFx0XHRcdE9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0dHlwZTogUG9pbnRUeXBlLmFnZ3JlZ2F0b3JcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0aGlzLmFkZENvbm5lY3Rpb24oe1xyXG5cdFx0XHRcdFx0U3RhcnQ6IGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0RW5kOiBwb2ludE5hbWUsXHJcblx0XHRcdFx0XHROYW1lOiBlbmRQb2ludCArIFwiX1wiICsgcG9pbnROYW1lXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Xy5mb3JFYWNoKHRoaXMuc2VsZWN0ZWROb2Rlcywgbm9kZSA9PiB7XHJcblx0XHRcdFx0dGhpcy5hZGRDb25uZWN0aW9uKHtcclxuXHRcdFx0XHRcdFN0YXJ0OiBub2RlLm5hbWUsXHJcblx0XHRcdFx0XHRFbmQ6IGVuZFBvaW50LFxyXG5cdFx0XHRcdFx0TmFtZTogbm9kZS5uYW1lICsgXCJfXCIgKyBlbmRQb2ludCxcclxuXHRcdFx0XHRcdFJ1bGVzOiBydWxlc1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5zaG93QWRkRGVwZW5kTW9kYWwgPSBmYWxzZTtcclxuXHRcdH0sXHJcblx0XHRhZGRDb25uZWN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1jb25uZWN0aW9uXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0ZGVwOiBvcHRpb25zXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZFBvaW50KG9wdGlvbnMpIHtcclxuXHRcdFx0dGhpcy4kZW1pdChcIm9uLWFkZC1ub2RlXCIsIHtcclxuXHRcdFx0XHRncmFwaDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdFx0cG9pbnQ6IG9wdGlvbnNcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0b3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbj86IGFueSkge1xyXG5cdFx0XHR2YXIgc2VsZWN0ZWQgPSB0aGlzLmRpYWdyYW0uc2VsZWN0aW9uTGlzdFswXTtcclxuXHRcdFx0dmFyIHNlbGVjdGVkTm9kZXMgPSBbXTtcclxuXHRcdFx0aWYgKHNlbGVjdGVkLl90eXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdHNlbGVjdGVkTm9kZXMgPSBbc2VsZWN0ZWQubmFtZV07XHJcblx0XHRcdH0gZWxzZSBpZiAoc2VsZWN0ZWQudHlwZSA9PT0gXCJwc2V1ZG9Hcm91cFwiKSB7XHJcblx0XHRcdFx0c2VsZWN0ZWROb2RlcyA9IHNlbGVjdGVkLmNoaWxkcmVuO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWROb2RlcyA9IF8ubWFwKHNlbGVjdGVkTm9kZXMsIHggPT4gdGhpcy5kaWFncmFtLmZpbmROb2RlKHgpKTtcclxuXHRcdFx0dGhpcy5zaG93QWRkRGVwZW5kTW9kYWwgPSB0cnVlO1xyXG5cdFx0fSxcclxuXHRcdHVwZGF0ZU5vZGVQcm9wOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBtZW0gPSBfLm1lbW9pemUoZnVuY3Rpb24gKG1lbUFyZ3MpIHtcclxuXHRcdFx0XHRyZXR1cm4gXy5kZWJvdW5jZShmdW5jdGlvbiAoYXJncykge1xyXG5cdFx0XHRcdFx0dmFyIG5vZGUgPSBfLmZpbmQodGhpcy5ncmFwaC5Ob2Rlcywgbm9kZSA9PiBub2RlLm5hbWUgPT09IGFyZ3MuZWxlbWVudC5uYW1lKTtcclxuXHRcdFx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuJGVtaXQoXCJub2RlLXByb3AtY2hhbmdlXCIsIHtcclxuXHRcdFx0XHRcdFx0XHRncmFwaDogdGhpcy5ncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IG5vZGUubmFtZSxcclxuXHRcdFx0XHRcdFx0XHRwcm9wTmFtZTogYXJncy5wcm9wZXJ0eU5hbWUsXHJcblx0XHRcdFx0XHRcdFx0bmV3VmFsdWU6IGFyZ3MuZWxlbWVudFthcmdzLnByb3BlcnR5TmFtZV1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgNTAwKTtcclxuXHRcdFx0fSwgYXJncyA9PiBhcmdzLnByb3BlcnR5TmFtZSk7XHJcblx0XHRcdG1lbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtb3VudGVkKCkge1xyXG5cdFx0dmFyICR0aGlzID0gdGhpcztcclxuXHRcdHRoaXMuYnVzLiRvbihcImFkZC1kZXBlbmQtcG9pbnRcIiwgKG9wdGlvbnM/OiBhbnkpID0+IHRoaXMub3BlbkFkZERlcGVuZE1vZGFsKG9wdGlvbnMpKTtcclxuXHRcdCQodGhpcy5kaWFncmFtRWxJZCkuZWpEaWFncmFtKHtcclxuXHRcdFx0ZW5hYmxlQ29udGV4dE1lbnU6IGZhbHNlLFxyXG5cdFx0XHRjb25zdHJhaW50cyxcclxuXHRcdFx0d2lkdGg6IFwiMTAwJVwiLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0UHgsXHJcblx0XHRcdG5vZGVzOiB0aGlzLmdyYXBoLk5vZGVzLFxyXG5cdFx0XHRjb25uZWN0b3JzOiB0aGlzLmdyYXBoLkNvbm5lY3RvcnMsXHJcblx0XHRcdGRlZmF1bHRTZXR0aW5nczoge1xyXG5cdFx0XHRcdG5vZGU6IHtcclxuXHRcdFx0XHRcdHdpZHRoOiA2NSxcclxuXHRcdFx0XHRcdGhlaWdodDogNjUsXHJcblx0XHRcdFx0XHRsYWJlbHM6IFt7XHJcblx0XHRcdFx0XHRcdG5hbWU6IFwibGFiZWwxXCIsXHJcblx0XHRcdFx0XHRcdGJvbGQ6IHRydWUsXHJcblx0XHRcdFx0XHRcdGZvbnRDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdFx0XHRob3Jpem9udGFsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLkhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQsXHJcblx0XHRcdFx0XHRcdHZlcnRpY2FsQWxpZ25tZW50OiBlai5kYXRhdmlzdWFsaXphdGlvbi5EaWFncmFtLlZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSxcclxuXHRcdFx0XHRcdFx0b2Zmc2V0OiB7XHJcblx0XHRcdFx0XHRcdFx0eTogMS4yLFxyXG5cdFx0XHRcdFx0XHRcdHg6IDAuOFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XSxcclxuXHRcdFx0XHRcdGJvcmRlcldpZHRoOiAwXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjb25uZWN0b3I6IHtcclxuXHRcdFx0XHRcdHNlZ21lbnRzOiBbe1xyXG5cdFx0XHRcdFx0XHRcInR5cGVcIjogXCJvcnRob2dvbmFsXCJcclxuXHRcdFx0XHRcdH1dXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY3JvbGxTZXR0aW5nczoge1xyXG5cdFx0XHRcdGhvcml6b250YWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0dmVydGljYWxPZmZzZXQ6IDAsXHJcblx0XHRcdFx0em9vbUZhY3RvcjogMC4yXHJcblx0XHRcdH0sXHJcblx0XHRcdGVuYWJsZUF1dG9TY3JvbGw6IHRydWUsXHJcblx0XHRcdHBhZ2VTZXR0aW5nczoge1xyXG5cdFx0XHRcdHNjcm9sbExpbWl0OiBcImluZmluaXR5XCJcclxuXHRcdFx0fSxcclxuXHRcdFx0c2VsZWN0ZWRJdGVtczoge1xyXG5cdFx0XHRcdHVzZXJIYW5kbGVzOiBbY3JlYXRlQWRkRGVwZW5kUG9pbnRIYW5kbGVyKHtcclxuXHRcdFx0XHRcdGJ1czogdGhpcy5idXNcclxuXHRcdFx0XHR9KV1cclxuXHRcdFx0fSxcclxuXHRcdFx0bm9kZVRlbXBsYXRlKGRpYWdyYW0sIG5vZGUpIHtcclxuXHRcdFx0XHRpZiAobm9kZS5PcHRpb25zKSB7XHJcblx0XHRcdFx0XHR2YXIgdHlwZSA9IG5vZGUuT3B0aW9ucy50eXBlO1xyXG5cdFx0XHRcdFx0c3dpdGNoICh0eXBlKSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgUG9pbnRUeXBlLnN0YXJ0OlxyXG5cdFx0XHRcdFx0XHRcdG5vZGUuZmlsbENvbG9yID0gXCIjMjljMTVmXCI7XHJcblx0XHRcdFx0XHRcdFx0bm9kZS5zaGFwZSA9IFwiZWxsaXBzZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5jaGFyYWN0ZXJpc3RpYzpcclxuXHRcdFx0XHRcdFx0XHRub2RlLmZpbGxDb2xvciA9IFwiIzIwODVjOVwiO1xyXG5cdFx0XHRcdFx0XHRcdG5vZGUuc2hhcGUgPSBcInJlY3RhbmdsZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlIFBvaW50VHlwZS5hZ2dyZWdhdG9yOlxyXG5cdFx0XHRcdFx0XHRcdG5vZGUuZmlsbENvbG9yID0gXCIjZWM3ZTBkXCI7XHJcblx0XHRcdFx0XHRcdFx0bm9kZS5zaGFwZSA9IFwiZWxsaXBzZVwiO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvcGVydHlDaGFuZ2UoYXJncykge1xyXG5cdFx0XHRcdGlmIChhcmdzLmVsZW1lbnRUeXBlID09PSBcIm5vZGVcIikge1xyXG5cdFx0XHRcdFx0aWYgKF8uaW5jbHVkZXMoW1wib2Zmc2V0WFwiLCBcIm9mZnNldFlcIl0sIGFyZ3MucHJvcGVydHlOYW1lKSkge1xyXG5cdFx0XHRcdFx0XHQkdGhpcy51cGRhdGVOb2RlUHJvcChhcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0JCh0aGlzLmRpYWdyYW1PdmVydmlld0VsSWQpLmVqT3ZlcnZpZXcoe1xyXG5cdFx0XHRzb3VyY2VJRDogdGhpcy5kaWFncmFtSWQsXHJcblx0XHRcdHdpZHRoOiBcIjEwMCVcIixcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodFB4XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudHM6IHtcclxuXHRcdGFkZERlcGVuZE1vZGFsV2luZG93XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Z3JhcGgodmFsKSB7XHJcblx0XHRcdHZhciBkaWFncmFtID0gdGhpcy5kaWFncmFtO1xyXG5cdFx0XHRfLmZpbHRlcih2YWwuTm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRcdFx0cmV0dXJuICFfLmZpbmQoZGlhZ3JhbS5ub2RlcygpLCB4ID0+IHgubmFtZSA9PT0gbm9kZS5uYW1lKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQuZm9yRWFjaCh4ID0+XHJcblx0XHRcdFx0XHRkaWFncmFtLmFkZChcclxuXHRcdFx0XHRcdFx0Xy5tZXJnZSh4LCB7XHJcblx0XHRcdFx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dDogeC5uYW1lXHJcblx0XHRcdFx0XHRcdFx0fV1cclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdClcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRfLmZpbHRlcih2YWwuQ29ubmVjdG9ycywgZnVuY3Rpb24gKGNvbikge1xyXG5cdFx0XHRcdHJldHVybiAhXy5maW5kKGRpYWdyYW0uY29ubmVjdG9ycygpLCB4ID0+IHgubmFtZSA9PT0gY29uLm5hbWUpO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC5mb3JFYWNoKHggPT4gZGlhZ3JhbS5hZGQoeCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7IiwiaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4vQmFzZVBvaW50XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERlcGVuZGVuY3kge1xyXG5cdFN0YXJ0OiBzdHJpbmcsXHJcblx0TmFtZT86IHN0cmluZzsgXHJcblx0RW5kOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgeyBEZXBlbmRlbmN5IH0gZnJvbSBcIi4vRGVwZW5kZW5jeVwiO1xyXG5pbXBvcnQgeyBQb2ludFR5cGUgfSBmcm9tIFwiLi9Qb2ludFR5cGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQmFzZVBvaW50IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0b2Zmc2V0WDogYW55O1xyXG5cdG9mZnNldFk6IGFueTtcclxuXHRPcHRpb25zOiB7XHJcblx0XHR0eXBlOiBQb2ludFR5cGU7XHJcblx0fSxcclxuXHRsYWJlbHM/OiBhbnk7XHJcbn0iLCJpbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuL0RlcGVuZGVuY3lcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZztcclxuXHRQb2ludHM6IEFycmF5PEJhc2VQb2ludD47XHJcblx0RGVwZW5kZW5jaWVzOiBBcnJheTxEZXBlbmRlbmN5PjtcclxufSIsImV4cG9ydCBpbnRlcmZhY2UgQ2hhcmFjdGVyaXN0aWNWYWx1ZSB7XHJcblx0VmFsdWU6IHN0cmluZztcclxufSIsImltcG9ydCB7IENoYXJhY3RlcmlzdGljVmFsdWUgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENoYXJhY3RlcmlzdGljIHtcclxuXHROYW1lOiBzdHJpbmc7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxufSIsImltcG9ydCB7IEdyYXBoIH0gZnJvbSBcIi4vR3JhcGhcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSb290U3RhdGUge1xyXG5cdEdyYXBoczogQXJyYXk8R3JhcGg+O1xyXG5cdENoYXJhY3RlcmlzdGljczogQXJyYXk8Q2hhcmFjdGVyaXN0aWM+XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIE5vZGUge1xyXG5cdG5hbWU6IHN0cmluZ1xyXG59IiwiZXhwb3J0IGludGVyZmFjZSBDb25uZWN0b3Ige1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRzb3VyY2VOb2RlOiBzdHJpbmc7XHJcblx0dGFyZ2V0Tm9kZTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gXCIuL05vZGVcIjtcclxuaW1wb3J0IHsgQ29ubmVjdG9yIH0gZnJvbSBcIi4vQ29ubmVjdG9yXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNmR3JhcGgge1xyXG5cdE5hbWU6IHN0cmluZyxcclxuXHROb2RlczogQXJyYXk8Tm9kZT47XHJcblx0Q29ubmVjdG9yczogQXJyYXk8Q29ubmVjdG9yPjtcclxufSIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25Db250ZXh0LCBTdG9yZSwgR2V0dGVyVHJlZSB9IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCB7IGdldFN0b3JlQWNjZXNzb3JzIH0gZnJvbSBcInZ1ZXgtdHlwZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9HcmFwaFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgU2ZHcmFwaCB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvR3JhcGhcIjtcclxuaW1wb3J0IHsgQmFzZVBvaW50IH0gZnJvbSBcIi4uL01vZGVsL0Jhc2VQb2ludFwiO1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSBcIi4uL01vZGVsL1N5bmNmdXNpb25HcmFwaC9Ob2RlXCI7XHJcbmltcG9ydCB7IENvbm5lY3RvciB9IGZyb20gXCIuLi9Nb2RlbC9TeW5jZnVzaW9uR3JhcGgvQ29ubmVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwiaHR0cDJcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuXHJcbnR5cGUgR3JhcGhDb250ZXh0ID0gQWN0aW9uQ29udGV4dDxSb290U3RhdGUsIFJvb3RTdGF0ZT47XHJcblxyXG5leHBvcnQgY29uc3QgZ3JhcGhNb2R1bGUgPSB7XHJcblx0bmFtZXNwYWNlZDogdHJ1ZSxcclxuXHJcblx0c3RhdGU6IHtcclxuXHRcdEdyYXBoczogW3tcclxuXHRcdFx0TmFtZTogXCJHcmFwaDFcIixcclxuXHRcdFx0UG9pbnRzOiBbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJTdGFydFwiLFxyXG5cdFx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIlN0YXJ0IFBvaW50XCJcclxuXHRcdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WDogNTAwLFxyXG5cdFx0XHRcdFx0b2Zmc2V0WTogNjAsXHJcblx0XHRcdFx0XHRPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdHR5cGU6IFBvaW50VHlwZS5zdGFydFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XSxcclxuXHRcdFx0RGVwZW5kZW5jaWVzOiBbXVxyXG5cdFx0fV0sXHJcblx0XHRDaGFyYWN0ZXJpc3RpY3M6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdE5hbWU6IFwiQ2hhciAxXCIsXHJcblx0XHRcdFx0VmFsdWVzOiBbe1xyXG5cdFx0XHRcdFx0TmFtZTogXCJDaGFyIDEuIFZhbHVlIDFcIlxyXG5cdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAxLiBWYWx1ZSAyXCJcclxuXHRcdFx0XHR9XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDJcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAyLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDIuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMi4gVmFsdWUgM1wiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TmFtZTogXCJDaGFyIDNcIixcclxuXHRcdFx0XHRWYWx1ZXM6IFt7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSAxXCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDJcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgM1wiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA0XCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDVcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgNlwiXHJcblx0XHRcdFx0XHR9LCB7XHJcblx0XHRcdFx0XHRcdE5hbWU6IFwiQ2hhciAzLiBWYWx1ZSA3XCJcclxuXHRcdFx0XHRcdH0sIHtcclxuXHRcdFx0XHRcdFx0TmFtZTogXCJDaGFyIDMuIFZhbHVlIDhcIlxyXG5cdFx0XHRcdFx0fSwge1xyXG5cdFx0XHRcdFx0XHROYW1lOiBcIkNoYXIgMy4gVmFsdWUgOVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XVxyXG5cdH0sXHJcblx0Z2V0dGVyczoge1xyXG5cdFx0Z2V0R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzO1xyXG5cdFx0fSxcclxuXHRcdGdyYXBoQ291bnQoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gc3RhdGUuR3JhcGhzLmxlbmd0aDtcclxuXHRcdH0sXHJcblx0XHRnZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKG5hbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdHZhciBncmFwaCA9IF8uZmlyc3Qoc3RhdGUuR3JhcGhzLmZpbHRlcih4ID0+IHguTmFtZSA9PT0gbmFtZSkpO1xyXG5cdFx0XHRcdHJldHVybiBncmFwaE1vZHVsZS5nZXR0ZXJzLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHN0YXRlKShncmFwaCk7XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cdFx0Z2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gKGdyYXBoOiBHcmFwaCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHROYW1lOiBncmFwaC5OYW1lLFxyXG5cdFx0XHRcdFx0Tm9kZXM6IGdyYXBoLlBvaW50cyxcclxuXHRcdFx0XHRcdENvbm5lY3RvcnM6IF8ubWFwKGdyYXBoLkRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGNvbikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXy5tZXJnZSh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29uLk5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c291cmNlTm9kZTogY29uLlN0YXJ0LFxyXG5cdFx0XHRcdFx0XHRcdHRhcmdldE5vZGU6IGNvbi5FbmRcclxuXHRcdFx0XHRcdFx0fSwgY29uKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblx0XHRnZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHN0YXRlOiBSb290U3RhdGUpIHtcclxuXHRcdFx0cmV0dXJuIHN0YXRlLkNoYXJhY3RlcmlzdGljcztcclxuXHRcdH1cclxuXHR9LFxyXG5cdG11dGF0aW9uczoge1xyXG5cdFx0YWRkR3JhcGgoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogR3JhcGgpIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLnB1c2goaXRlbSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkUG9pbnQoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBwb2ludDogQmFzZVBvaW50IH0pIHtcclxuXHRcdFx0c3RhdGUuR3JhcGhzLmZpbHRlcih4ID0+IHguTmFtZSA9PT0gaXRlbS5ncmFwaClbMF0uUG9pbnRzLnB1c2goaXRlbS5wb2ludCk7XHJcblx0XHR9LFxyXG5cdFx0YWRkRGVwZW5kZW5jeShzdGF0ZTogUm9vdFN0YXRlLCBpdGVtOiB7IGdyYXBoOiBzdHJpbmcsIGRlcDogRGVwZW5kZW5jeSB9KSB7XHJcblx0XHRcdHN0YXRlLkdyYXBocy5maWx0ZXIoeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpWzBdLkRlcGVuZGVuY2llcy5wdXNoKGl0ZW0uZGVwKTtcclxuXHRcdH0sXHJcblx0XHRjaGFuZ2VOb2RlUHJvcGVydHkoc3RhdGU6IFJvb3RTdGF0ZSwgaXRlbTogeyBncmFwaDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHByb3BOYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkgfSkge1xyXG5cdFx0XHR2YXIgcG9pbnRzID0gXy5maW5kKHN0YXRlLkdyYXBocywgeCA9PiB4Lk5hbWUgPT09IGl0ZW0uZ3JhcGgpLlBvaW50cztcclxuXHRcdFx0dmFyIHBvaW50ID0gXy5maW5kKHBvaW50cywgeCA9PiB4Lm5hbWUgPT09IGl0ZW0ubmFtZSk7XHJcblx0XHRcdFZ1ZS5zZXQocG9pbnQsIGl0ZW0ucHJvcE5hbWUsIGl0ZW0ubmV3VmFsdWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmNvbnN0IHsgcmVhZCwgY29tbWl0IH0gPVxyXG5cdGdldFN0b3JlQWNjZXNzb3JzPFJvb3RTdGF0ZSwgUm9vdFN0YXRlPihcImdyYXBoXCIpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRHcmFwaCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRHcmFwaCk7XHJcbmV4cG9ydCBjb25zdCByZWFkR3JhcGhDb3VudCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5ncmFwaENvdW50KTtcclxuZXhwb3J0IGNvbnN0IGdldFN5bmNmdXNpb25HcmFwaEJ5TmFtZSA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRTeW5jZnVzaW9uR3JhcGhCeU5hbWUpO1xyXG5leHBvcnQgY29uc3QgZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGggPSByZWFkKGdyYXBoTW9kdWxlLmdldHRlcnMuZ2V0U3luY2Z1c2lvbmdHcmFwaEJ5R3JhcGgpO1xyXG5leHBvcnQgY29uc3QgZ2V0Q2hhcmFjdGVyaXN0aWNzTGlzdCA9IHJlYWQoZ3JhcGhNb2R1bGUuZ2V0dGVycy5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KTtcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRHcmFwaCA9IGNvbW1pdChncmFwaE1vZHVsZS5tdXRhdGlvbnMuYWRkR3JhcGgpO1xyXG5leHBvcnQgY29uc3QgYWRkUG9pbnQgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZFBvaW50KTtcclxuZXhwb3J0IGNvbnN0IGFkZERlcGVuZGVuY3kgPSBjb21taXQoZ3JhcGhNb2R1bGUubXV0YXRpb25zLmFkZERlcGVuZGVuY3kpO1xyXG5leHBvcnQgY29uc3QgY2hhbmdlTm9kZVByb3BlcnR5ID0gY29tbWl0KGdyYXBoTW9kdWxlLm11dGF0aW9ucy5jaGFuZ2VOb2RlUHJvcGVydHkpOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tIFwiLi4vTW9kZWwvUm9vdFN0YXRlXCI7XHJcbmltcG9ydCB7IGdyYXBoTW9kdWxlIGFzIGdyYXBoIH0gZnJvbSBcIi4vR3JhcGhTdG9yZVwiO1xyXG5pbXBvcnQgVnVleFBlcnNpc3RlbmNlIGZyb20gXCJ2dWV4LXBlcnNpc3RcIjtcclxuXHJcblZ1ZS51c2UoVnVleCk7XHJcblxyXG5jb25zdCB2dWV4TG9jYWwgPSBuZXcgVnVleFBlcnNpc3RlbmNlKHtcclxuXHRzdG9yYWdlOiB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbn0pXHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuIG5ldyBWdWV4LlN0b3JlPFJvb3RTdGF0ZT4oe1xyXG5cdFx0bW9kdWxlczoge1xyXG5cdFx0XHRncmFwaFxyXG5cdFx0fSxcclxuXHRcdHBsdWdpbnM6IFt2dWV4TG9jYWwucGx1Z2luXSxcclxuXHRcdHN0cmljdDogdHJ1ZVxyXG5cdH0pXHJcbn07IiwiLy8gQ2xpZW50QXBwL2NvbXBvbmVudHMvQXBwSGVsbG8udHNcclxuaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBWdWV4IGZyb20gXCJ2dWV4XCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IENoYXJhY3RlcmlzdGljRGlhZ3JhbSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY0RpYWdyYW1cIjtcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tIFwiLi4vU3RvcmUvUm9vdFN0b3JlXCI7XHJcbmltcG9ydCAqIGFzIGdyYXBoIGZyb20gXCIuLi9TdG9yZS9HcmFwaFN0b3JlXCI7XHJcbmltcG9ydCB7IEJhc2VQb2ludCB9IGZyb20gXCIuLi9Nb2RlbC9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gXCIuLi9Nb2RlbC9EZXBlbmRlbmN5XCI7XHJcbmltcG9ydCB7IFBvaW50VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Qb2ludFR5cGVcIjtcclxuXHJcblxyXG52YXIgc3RvcmUgPSBjcmVhdGVTdG9yZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBWdWUuZXh0ZW5kKHtcclxuXHR0ZW1wbGF0ZTogJyNhcHAtaGVsbG8tdGVtcGxhdGUnLFxyXG5cdHN0b3JlLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtZXNzYWdlOiBcInRlc3QgbWVzc2FnZVwiXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcHV0ZWQ6IHtcclxuXHRcdGRpYWdyYW1zOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5yZWFkR3JhcGgodGhpcy4kc3RvcmUpLm1hcCh4ID0+IGdyYXBoLmdldFN5bmNmdXNpb25nR3JhcGhCeUdyYXBoKHRoaXMuJHN0b3JlKSh4KSk7XHJcblx0XHR9LFxyXG5cdFx0Y2hhcmFjdGVyaXN0aWNzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBncmFwaC5nZXRDaGFyYWN0ZXJpc3RpY3NMaXN0KHRoaXMuJHN0b3JlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1ldGhvZHM6IHtcclxuXHRcdGFkZEdyYXBoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGdyYXBoLmFkZEdyYXBoKHRoaXMuJHN0b3JlLCB7XHJcblx0XHRcdFx0TmFtZTogXCJHcmFwaFwiICsgKGdyYXBoLnJlYWRHcmFwaENvdW50KHRoaXMuJHN0b3JlKSArIDEpLFxyXG5cdFx0XHRcdFBvaW50czogW3tcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3RhcnRcIixcclxuXHRcdFx0XHRcdG9mZnNldFg6IDUwMCxcclxuXHRcdFx0XHRcdG9mZnNldFk6IDIwLFxyXG5cdFx0XHRcdFx0bGFiZWxzOiBbe1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiBcIlN0YXJ0IFBvaW50XCJcclxuXHRcdFx0XHRcdH1dLFxyXG5cdFx0XHRcdFx0T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHR0eXBlOiBQb2ludFR5cGUuc3RhcnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XSxcclxuXHRcdFx0XHREZXBlbmRlbmNpZXM6IFtdXHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdGFkZE5vZGU6IGZ1bmN0aW9uIChub2RlOiB7IGdyYXBoOiBzdHJpbmcsIHBvaW50OiBCYXNlUG9pbnQgfSkge1xyXG5cdFx0XHRncmFwaC5hZGRQb2ludCh0aGlzLiRzdG9yZSwgbm9kZSk7XHJcblx0XHR9LFxyXG5cdFx0YWRkQ29ubmVjdGlvbjogZnVuY3Rpb24gKGNvbm5lY3Q6IHsgZ3JhcGg6IHN0cmluZywgZGVwOiBEZXBlbmRlbmN5IH0pIHtcclxuXHRcdFx0Z3JhcGguYWRkRGVwZW5kZW5jeSh0aGlzLiRzdG9yZSwgY29ubmVjdCk7XHJcblx0XHR9LFxyXG5cdFx0b25Ob2RlUHJvcENoYW5nZTogZnVuY3Rpb24gKG9wdGlvbnM6IHsgZ3JhcGg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwcm9wTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55IH0pIHtcclxuXHRcdFx0Z3JhcGguY2hhbmdlTm9kZVByb3BlcnR5KHRoaXMuJHN0b3JlLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHR9LFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0Q2hhcmFjdGVyaXN0aWNEaWFncmFtXHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgVnVleCBmcm9tIFwidnVleFwiO1xyXG5pbXBvcnQgQXBwSGVsbG8gZnJvbSBcIi4vY29tcG9uZW50cy9BcHBIZWxsb1wiO1xyXG5cclxuXHJcbi8vVnVleCBwbHVnaW5cclxuXHJcblxyXG4vL1Jvb3QgQ29tcG9uZW50XHJcbmxldCB2ID0gbmV3IFZ1ZSh7XHJcbiAgICBlbDogXCIjYXBwLXJvb3RcIixcclxuXHR0ZW1wbGF0ZTogJzxBcHBIZWxsby8+JyxcclxuICAgIC8vcmVuZGVyOiBoID0+IGgoQXBwSGVsbG9Db21wb25lbnQpLFxyXG4gICAgY29tcG9uZW50czoge1xyXG5cdFx0QXBwSGVsbG9cclxuICAgIH1cclxufSk7IiwiaW1wb3J0IFZ1ZSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVnVlLmV4dGVuZCh7XHJcblx0dGVtcGxhdGU6IFwiI3Rlc3QtdGVtcFwiLFxyXG5cdGRhdGEoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRxdWVzdGlvbjogJycsXHJcblx0XHRcdGFuc3dlcjogJ9Cf0L7QutCwINCy0Ysg0L3QtSDQt9Cw0LTQsNC00LjRgtC1INCy0L7Qv9GA0L7RgSwg0Y8g0L3QtSDQvNC+0LPRgyDQvtGC0LLQtdGC0LjRgtGMISdcclxuXHRcdH07XHJcblx0fSxcclxuXHR3YXRjaDoge1xyXG5cdFx0Ly8g0Y3RgtCwINGE0YPQvdC60YbQuNGPINC30LDQv9GD0YHQutCw0LXRgtGB0Y8g0L/RgNC4INC70Y7QsdC+0Lwg0LjQt9C80LXQvdC10L3QuNC4INCy0L7Qv9GA0L7RgdCwXHJcblx0XHRxdWVzdGlvbihuZXdRdWVzdGlvbiwgb2xkUXVlc3Rpb24pIHtcclxuXHRcdFx0dGhpcy5hbnN3ZXIgPSAn0J7QttC40LTQsNGOLCDQutC+0LPQtNCwINCy0Ysg0LfQsNC60L7QvdGH0LjRgtC1INC/0LXRh9Cw0YLQsNGC0YwuLi4nXHJcblx0XHRcdHRoaXMuZ2V0QW5zd2VyKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHRnZXRBbnN3ZXI6XHJcblx0XHRcdCBfLmRlYm91bmNlKFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMucXVlc3Rpb24uaW5kZXhPZignPycpID09PSAtMSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFuc3dlciA9ICfQktC+0L/RgNC+0YHRiyDQvtCx0YvRh9C90L4g0LfQsNC60LDQvdGH0LjQstCw0Y7RgtGB0Y8g0LLQvtC/0YDQvtGB0LjRgtC10LvRjNC90YvQvCDQt9C90LDQutC+0LwuIDstKSc7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRoaXMuYW5zd2VyID0gJ9CU0YPQvNCw0Y4uLi4nO1xyXG5cdFx0XHRcdFx0dmFyIHZtID0gdGhpcztcclxuXHRcdFx0XHRcdGF4aW9zLmdldCgnaHR0cHM6Ly95ZXNuby53dGYvYXBpJylcclxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHR2bS5hbnN3ZXIgPSBfLmNhcGl0YWxpemUocmVzcG9uc2UuZGF0YS5hbnN3ZXIpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuXHRcdFx0XHRcdFx0XHR2bS5hbnN3ZXIgPSAn0J7RiNC40LHQutCwISDQndC1INC80L7Qs9GDINGB0LLRj9C30LDRgtGM0YHRjyDRgSBBUEkuICcgKyBlcnJvclxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vINCt0YLQviDRh9C40YHQu9C+INC80LjQu9C70LjRgdC10LrRg9C90LQsINC60L7RgtC+0YDQvtC1INC80Ysg0LbQtNGR0LwsINC/0L7RgdC70LUg0YLQvtCz0L4g0LrQsNC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQv9GA0LXQutGA0LDRgtC40Lsg0L/QtdGH0LDRgtCw0YLRjC5cclxuXHRcdFx0XHQ1MDBcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxuKTsiLCJpbXBvcnQgeyBCYXNlUG9pbnQgfSBmcm9tIFwiLi9CYXNlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ2hhcmFjdGVyaXN0aWMgfSBmcm9tIFwiLi9DaGFyYWN0ZXJpc3RpY1wiO1xyXG5pbXBvcnQgeyBDaGFyYWN0ZXJpc3RpY1ZhbHVlIH0gZnJvbSBcIi4vQ2hhcmFjdGVyaXN0aWNWYWx1ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDaGFyYWN0ZXJpc3RpY1BvaW50IGV4dGVuZHMgQmFzZVBvaW50IHtcclxuXHRDaGFyYWN0ZXJpc3RpYzogQ2hhcmFjdGVyaXN0aWM7XHJcblx0VmFsdWVzOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxuXHRSZXF1aXJlZD86IGJvb2xlYW47XHJcblx0RGVmYXVsdFZhbHVlOiBBcnJheTxDaGFyYWN0ZXJpc3RpY1ZhbHVlPjtcclxufSJdfQ==