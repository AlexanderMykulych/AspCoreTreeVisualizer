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
                template: "#rule-controll"
            }));
        }
    };
});
System.register("components/Diagram/AddDependPointWindow", ["vue", "lodash", "components/Diagram/RuleControll"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
                data: function () {
                    return {
                        point: null,
                        selectedCharacteristic: null,
                        togglesValues: []
                    };
                },
                mounted: function () {
                    var $this = this;
                    $(this.elId).on('hidden.bs.modal', function () {
                        $this.show = false;
                    });
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
                        this.$emit("addpoint", point);
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
                    selectedCharacteristic: function (val) {
                        this.togglesValues = [];
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
                //this._endAction();
                //this.diagram._pageBackgroundLayer && ej.datavisualization.Diagram.PageUtil._updatePageSize(this.diagram);
                //this.singleAction && this.diagram.activateTool("select");
                //delete this.diagramBounds;
                //this._adjustLines = { lines: [] };
                //this._undoObject = null;
                //this._redoObject = null
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
                        selectedNodes: []
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
                    addPoint: function (point) {
                        var _this = this;
                        var $this = this;
                        var pointName = point.name;
                        var firstSelectedNode = this.diagram.findNode(this.selectedNodes[0]);
                        var endPoint = pointName;
                        this.$emit("on-add-node", {
                            graph: this.diagramId,
                            point: lodash_2.default.merge({
                                name: pointName,
                                offsetX: firstSelectedNode.offsetX,
                                offsetY: firstSelectedNode.offsetY + 200,
                                Options: {
                                    type: PointType_1.PointType.characteristic
                                }
                            }, point.options)
                        });
                        if (this.selectedNodes.length > 1) {
                            var andPointName = "AND_" + pointName;
                            endPoint = andPointName;
                            this.$emit("on-add-node", {
                                graph: this.diagramId,
                                point: {
                                    name: andPointName,
                                    offsetX: firstSelectedNode.offsetX,
                                    offsetY: firstSelectedNode.offsetY + 100,
                                    Options: {
                                        type: PointType_1.PointType.aggregator
                                    }
                                }
                            });
                            $this.$emit("on-add-connection", {
                                graph: this.diagramId,
                                dep: {
                                    Start: endPoint,
                                    End: pointName,
                                    Name: endPoint + "_" + pointName
                                }
                            });
                        }
                        lodash_2.default.forEach(this.selectedNodes, function (node) {
                            $this.$emit("on-add-connection", {
                                graph: _this.diagramId,
                                dep: {
                                    Start: node,
                                    End: endPoint,
                                    Name: node + "_" + endPoint
                                }
                            });
                        });
                        this.showAddDependModal = false;
                    }
                },
                mounted: function () {
                    var $this = this;
                    this.bus.$on("add-depend-point", function (option) {
                        var selected = $this.diagram.selectionList[0];
                        if (selected.type === "basic") {
                            $this.selectedNodes = [selected.name];
                        }
                        else if (selected.type === "pseudoGroup") {
                            $this.selectedNodes = selected.children;
                        }
                        $this.showAddDependModal = true;
                    });
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
System.register("Store/GraphStore", ["vuex-typescript", "lodash", "Model/PointType"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var vuex_typescript_1, lodash_3, PointType_2, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, getCharacteristicsList, addGraph, addPoint, addDependency;
    return {
        setters: [
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
                                }]
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
                                    return {
                                        name: con.Name,
                                        sourceNode: con.Start,
                                        targetNode: con.End
                                    };
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
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var vue_4, vuex_1, GraphStore_1, createStore;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (GraphStore_1_1) {
                GraphStore_1 = GraphStore_1_1;
            }
        ],
        execute: function () {
            vue_4.default.use(vuex_1.default);
            exports_16("createStore", createStore = function () {
                return new vuex_1.default.Store({
                    modules: {
                        graph: GraphStore_1.graphModule
                    }
                });
            });
        }
    };
});
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore", "Model/PointType"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var vue_5, CharacteristicDiagram_1, RootStore_1, graph, PointType_3, store;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
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
            exports_17("default", vue_5.default.extend({
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
    var vue_6, AppHello_1, v;
    return {
        setters: [
            function (vue_6_1) {
                vue_6 = vue_6_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            }
        ],
        execute: function () {
            //Vuex plugin
            //Root Component
            v = new vue_6.default({
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
    var vue_7, lodash_4, axios_1;
    return {
        setters: [
            function (vue_7_1) {
                vue_7 = vue_7_1;
            },
            function (lodash_4_1) {
                lodash_4 = lodash_4_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            exports_19("default", vue_7.default.extend({
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
//# sourceMappingURL=app-bandle.js.map