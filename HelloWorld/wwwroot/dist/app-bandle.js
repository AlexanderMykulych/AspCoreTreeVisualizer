System.register("components/Diagram/AddDependPointWindow", ["vue"], function (exports_1, context_1) {
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
                template: "#add-depend-point",
                props: ["show", "id", "startpoints"],
                computed: {
                    elId: function () {
                        return "#add-depend-point_" + this.id;
                    }
                },
                data: function () {
                    return {
                        point: null
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
                        this.$emit("addpoint", this.point);
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
System.register("components/Diagram/AddDependedPoint", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
    exports_2("default", default_1);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("components/CharacteristicDiagram", ["vue", "lodash", "syncfusion", "components/Diagram/AddDependPointWindow", "components/Diagram/AddDependedPoint"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var vue_2, lodash_1, AddDependPointWindow_1, AddDependedPoint_1, constraints;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (_1) {
            },
            function (AddDependPointWindow_1_1) {
                AddDependPointWindow_1 = AddDependPointWindow_1_1;
            },
            function (AddDependedPoint_1_1) {
                AddDependedPoint_1 = AddDependedPoint_1_1;
            }
        ],
        execute: function () {
            constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;
            exports_3("default", vue_2.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height"],
                data: function () {
                    return {
                        bus: new vue_2.default(),
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
                    addPoint: function (pointName) {
                        var _this = this;
                        var $this = this;
                        this.$emit("on-add-node", {
                            graph: this.diagramId,
                            point: {
                                Name: pointName
                            }
                        });
                        lodash_1.default.forEach(this.selectedNodes, function (node) {
                            $this.$emit("on-add-connection", {
                                graph: _this.diagramId,
                                dep: {
                                    Start: node,
                                    End: pointName,
                                    Name: node + "_" + pointName
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
                        layout: {
                            type: ej.datavisualization.Diagram.LayoutTypes.HierarchicalTree
                        },
                        defaultSettings: {
                            node: {
                                width: 100,
                                height: 40,
                                fillColor: "darkcyan",
                                labels: [{
                                        name: "label1",
                                        bold: true,
                                        fontColor: "white"
                                    }]
                            },
                            connector: {
                                segments: [{
                                        "type": "orthogonal"
                                    }]
                            }
                        },
                        nodeTemplate: function (diagram, node) {
                            node.name = node.Name;
                            node.labels[0].text = node.name;
                        },
                        //connectorTemplate(diagram, connector) {
                        //	connector.name = connector.Name;
                        //	connector.sourceNode = connector.Start;
                        //	connector.targetNode = connector.End;
                        //},
                        selectedItems: {
                            userHandles: [AddDependedPoint_1.default({
                                    bus: this.bus
                                })]
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
                        lodash_1.default.filter(val.Nodes, function (node) {
                            return !lodash_1.default.find(diagram.nodes, function (x) { return x.Name === node.Name; });
                        })
                            .forEach(function (x) { return diagram.add(x); });
                        lodash_1.default.filter(val.Connectors, function (con) {
                            return !lodash_1.default.find(diagram.connectors, function (x) { return x.name === con.name; });
                        })
                            .forEach(function (x) { return diagram.add(x); });
                        diagram.layout();
                    }
                }
            }));
        }
    };
});
System.register("Model/Dependency", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/BasePoint", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/Graph", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/RootState", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Node", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Connector", [], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/SyncfusionGraph/Graph", [], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Store/GraphStore", ["vuex-typescript", "lodash"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var vuex_typescript_1, lodash_2, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, addGraph, addPoint, addDependency;
    return {
        setters: [
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_2_1) {
                lodash_2 = lodash_2_1;
            }
        ],
        execute: function () {
            exports_11("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [{
                            Name: "Graph1",
                            Points: [
                                {
                                    Name: "Start"
                                }, {
                                    Name: "Point2"
                                }, {
                                    Name: "Point3"
                                }, {
                                    Name: "Point4"
                                }, {
                                    Name: "Point5"
                                }, {
                                    Name: "Point6"
                                }, {
                                    Name: "Point7"
                                }
                            ],
                            Dependencies: [
                                {
                                    Start: "Start",
                                    Name: "C1",
                                    End: "Point2"
                                },
                                {
                                    Start: "Point2",
                                    Name: "C2",
                                    End: "Point3"
                                },
                                {
                                    Start: "Point2",
                                    Name: "C3",
                                    End: "Point4"
                                },
                                {
                                    Start: "Start",
                                    Name: "C4",
                                    End: "Point5"
                                },
                                {
                                    Start: "Point5",
                                    Name: "C5",
                                    End: "Point6"
                                },
                                {
                                    Start: "Start",
                                    Name: "C6",
                                    End: "Point7"
                                }
                            ]
                        }]
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
                            var graph = lodash_2.default.first(state.Graphs.filter(function (x) { return x.Name === name; }));
                            return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
                        };
                    },
                    getSyncfusiongGraphByGraph: function (state) {
                        return function (graph) {
                            return {
                                Name: graph.Name,
                                Nodes: graph.Points,
                                Connectors: lodash_2.default.map(graph.Dependencies, function (con) {
                                    return {
                                        name: con.Name,
                                        sourceNode: con.Start,
                                        targetNode: con.End
                                    };
                                })
                            };
                        };
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
            exports_11("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_11("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_11("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_11("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_11("addGraph", addGraph = commit(graphModule.mutations.addGraph));
            exports_11("addPoint", addPoint = commit(graphModule.mutations.addPoint));
            exports_11("addDependency", addDependency = commit(graphModule.mutations.addDependency));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var vue_3, vuex_1, GraphStore_1, createStore;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (GraphStore_1_1) {
                GraphStore_1 = GraphStore_1_1;
            }
        ],
        execute: function () {
            vue_3.default.use(vuex_1.default);
            exports_12("createStore", createStore = function () {
                return new vuex_1.default.Store({
                    modules: {
                        graph: GraphStore_1.graphModule
                    }
                });
            });
        }
    };
});
System.register("components/AppHello", ["vue", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vue_4, CharacteristicDiagram_1, RootStore_1, graph, store;
    return {
        setters: [
            function (vue_4_1) {
                vue_4 = vue_4_1;
            },
            function (CharacteristicDiagram_1_1) {
                CharacteristicDiagram_1 = CharacteristicDiagram_1_1;
            },
            function (RootStore_1_1) {
                RootStore_1 = RootStore_1_1;
            },
            function (graph_1) {
                graph = graph_1;
            }
        ],
        execute: function () {
            store = RootStore_1.createStore();
            exports_13("default", vue_4.default.extend({
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
                    }
                },
                methods: {
                    addGraph: function () {
                        graph.addGraph(this.$store, {
                            Name: "Graph" + (graph.readGraphCount(this.$store) + 1),
                            Points: [{
                                    Name: "Start"
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
System.register("index", ["vue", "components/AppHello"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var vue_5, AppHello_1, v;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
            },
            function (AppHello_1_1) {
                AppHello_1 = AppHello_1_1;
            }
        ],
        execute: function () {
            //Vuex plugin
            //Root Component
            v = new vue_5.default({
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
System.register("components/TestVue", ["vue", "lodash", "axios"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var vue_6, lodash_3, axios_1;
    return {
        setters: [
            function (vue_6_1) {
                vue_6 = vue_6_1;
            },
            function (lodash_3_1) {
                lodash_3 = lodash_3_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            exports_15("default", vue_6.default.extend({
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
                    getAnswer: lodash_3.default.debounce(function () {
                        if (this.question.indexOf('?') === -1) {
                            this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                            return;
                        }
                        this.answer = 'Думаю...';
                        var vm = this;
                        axios_1.default.get('https://yesno.wtf/api')
                            .then(function (response) {
                            vm.answer = lodash_3.default.capitalize(response.data.answer);
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
System.register("Model/Characteristic", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/CharacteristicValue", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Model/CharacteristicPoint", [], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=app-bandle.js.map