System.register("components/Diagram/AddDependPointWindow", ["vue", "sweet-modal-vue"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, sweet_modal_vue_1, bus;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (sweet_modal_vue_1_1) {
                sweet_modal_vue_1 = sweet_modal_vue_1_1;
            }
        ],
        execute: function () {
            bus = new vue_1.default();
            exports_1("default", vue_1.default.extend({
                template: "#add-depend-point",
                components: {
                    SweetModal: sweet_modal_vue_1.SweetModal
                },
                created: function () {
                    bus.$on("add-depend-point", function () {
                        debugger;
                    });
                },
                methods: {
                    open: function () {
                        this.$refs.modal.open();
                    }
                }
            }));
        }
    };
});
System.register("components/Diagram/AddDependedPoint", ["vue"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var vue_2, bus, func, userHandles, addDependPoint;
    return {
        setters: [
            function (vue_2_1) {
                vue_2 = vue_2_1;
            }
        ],
        execute: function () {
            bus = new vue_2.default();
            func = (function (base) {
                ej.datavisualization.Diagram.extend(AddDependPoint, base);
                function AddDependPoint(name) {
                    base.call(this, name);
                }
                AddDependPoint.prototype.mouseup = function (evt) {
                    bus.$emit("add-depend-point");
                    base.prototype.mouseup.call(this, evt);
                };
                return AddDependPoint;
            }(ej.datavisualization.Diagram.ToolBase));
            userHandles = [];
            addDependPoint = ej.datavisualization.Diagram.UserHandle();
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
            exports_2("default", addDependPoint);
        }
    };
});
System.register("components/CharacteristicDiagram", ["vue", "syncfusion", "components/Diagram/AddDependedPoint"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var vue_3, AddDependedPoint_1, constraints;
    return {
        setters: [
            function (vue_3_1) {
                vue_3 = vue_3_1;
            },
            function (_1) {
            },
            function (AddDependedPoint_1_1) {
                AddDependedPoint_1 = AddDependedPoint_1_1;
            }
        ],
        execute: function () {
            constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;
            exports_3("default", vue_3.default.extend({
                template: "#characteristic-diagram",
                props: ["graph", "classes", "height"],
                computed: {
                    heightPx: function () {
                        return this.height + "px";
                    }
                },
                mounted: function () {
                    var diagramId = this.graph.Name;
                    $("#" + diagramId).ejDiagram({
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
                            node.labels[0].text = node.name;
                        },
                        selectedItems: {
                            userHandles: [AddDependedPoint_1.default]
                        }
                    });
                    $("#" + diagramId + "_overview").ejOverview({
                        sourceID: diagramId,
                        width: "100%",
                        height: this.heightPx
                    });
                    //$("#" + diagramId + "_symbolPallette").ejSymbolPalette({
                    //	diagramId,
                    //	palettes: [{
                    //		expanded: true,
                    //		items: [{
                    //			width: 40, height: 40,
                    //			offsetX: 20, offsetY: 20, shape: "ellipse",
                    //			paletteItem: {
                    //				width: 50,
                    //				height: 50,
                    //				margin: {
                    //					left: -5,
                    //					right: 20,
                    //					top: 0,
                    //					bottom: 20
                    //				}
                    //			}
                    //		}],
                    //	}],
                    //	width: "100%",
                    //	height: this.heightPx,
                    //	allowDrag: true,
                    //	showPaletteItemText: false,
                    //	paletteItemWidth: 50,
                    //	paletteItemHeight: 50, 
                    //});
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
    var vuex_typescript_1, lodash_1, graphModule, _a, read, commit, readGraph, readGraphCount, getSyncfusionGraphByName, getSyncfusiongGraphByGraph, addGraph;
    return {
        setters: [
            function (vuex_typescript_1_1) {
                vuex_typescript_1 = vuex_typescript_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_11("graphModule", graphModule = {
                namespaced: true,
                state: {
                    Graphs: [{
                            Name: "Graph1",
                            Start: {
                                Name: "Start Point",
                                To: [{
                                        Name: "Connect1",
                                        End: {
                                            Name: "Second Point"
                                        }
                                    }, {
                                        Name: "Connect2",
                                        End: {
                                            Name: "Point 2"
                                        }
                                    }, {
                                        Name: "Connect3",
                                        End: {
                                            Name: "point 3",
                                            To: [{
                                                    Name: "Con",
                                                    End: {
                                                        Name: "point 3.1"
                                                    }
                                                }]
                                        }
                                    }]
                            }
                        }, {
                            Name: "Graph2",
                            Start: {
                                Name: "Start Point",
                                To: [{
                                        Name: "Connect1",
                                        End: {
                                            Name: "Second Point"
                                        }
                                    }, {
                                        Name: "Connect2",
                                        End: {
                                            Name: "Point 2"
                                        }
                                    }, {
                                        Name: "Connect3",
                                        End: {
                                            Name: "point 3",
                                            To: [{
                                                    Name: "Con",
                                                    End: {
                                                        Name: "point 3.1"
                                                    }
                                                }]
                                        }
                                    }]
                            }
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
                            var graph = lodash_1.default.first(state.Graphs.filter(function (x) { return x.Name === name; }));
                            return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
                        };
                    },
                    getSyncfusiongGraphByGraph: function (state) {
                        return function (graph) {
                            return {
                                Name: graph.Name,
                                Nodes: graphModule.getters.getAllNodesByPoint(state)(graph.Start),
                                Connectors: graphModule.getters.getAllConnectorsByPoint(state)(graph.Start)
                            };
                        };
                    },
                    getAllNodesByPoint: function (state) {
                        return function (point) {
                            var nodes = [];
                            if (point == null) {
                                return nodes;
                            }
                            nodes.push({
                                name: point.Name
                            });
                            for (var i in point.To) {
                                var dep = point.To[i];
                                var toNodes = graphModule.getters.getAllNodesByPoint(state)(dep.End);
                                nodes = lodash_1.default.concat(nodes, toNodes);
                            }
                            return nodes;
                        };
                    },
                    getAllConnectorsByPoint: function (state) {
                        return function (point) {
                            var connectors = [];
                            if (point == null || point.To == null) {
                                return connectors;
                            }
                            for (var i in point.To) {
                                var dep = point.To[i];
                                connectors.push({
                                    name: dep.Name,
                                    sourceNode: point.Name,
                                    targetNode: dep.End.Name
                                });
                                var toConnectors = graphModule.getters.getAllConnectorsByPoint(state)(dep.End);
                                connectors = lodash_1.default.concat(connectors, toConnectors);
                            }
                            return connectors;
                        };
                    }
                },
                mutations: {
                    addGraph: function (state, item) {
                        state.Graphs.push(item);
                    }
                }
            });
            _a = vuex_typescript_1.getStoreAccessors("graph"), read = _a.read, commit = _a.commit;
            exports_11("readGraph", readGraph = read(graphModule.getters.getGraph));
            exports_11("readGraphCount", readGraphCount = read(graphModule.getters.graphCount));
            exports_11("getSyncfusionGraphByName", getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName));
            exports_11("getSyncfusiongGraphByGraph", getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph));
            exports_11("addGraph", addGraph = commit(graphModule.mutations.addGraph));
        }
    };
});
System.register("Store/RootStore", ["vue", "vuex", "Store/GraphStore"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
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
System.register("components/AppHello", ["vue", "components/Diagram/AddDependPointWindow", "components/CharacteristicDiagram", "Store/RootStore", "Store/GraphStore"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var vue_5, AddDependPointWindow_1, CharacteristicDiagram_1, RootStore_1, graph, store;
    return {
        setters: [
            function (vue_5_1) {
                vue_5 = vue_5_1;
            },
            function (AddDependPointWindow_1_1) {
                AddDependPointWindow_1 = AddDependPointWindow_1_1;
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
            exports_13("default", vue_5.default.extend({
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
                            Start: null
                        });
                    }
                },
                components: {
                    CharacteristicDiagram: CharacteristicDiagram_1.default,
                    addDependModalWindow: AddDependPointWindow_1.default
                }
            }));
        }
    };
});
System.register("index", ["vue", "components/AppHello"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
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
System.register("components/TestVue", ["vue", "lodash", "axios"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var vue_7, lodash_2, axios_1;
    return {
        setters: [
            function (vue_7_1) {
                vue_7 = vue_7_1;
            },
            function (lodash_2_1) {
                lodash_2 = lodash_2_1;
            },
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
            exports_15("default", vue_7.default.extend({
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
                    getAnswer: lodash_2.default.debounce(function () {
                        if (this.question.indexOf('?') === -1) {
                            this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                            return;
                        }
                        this.answer = 'Думаю...';
                        var vm = this;
                        axios_1.default.get('https://yesno.wtf/api')
                            .then(function (response) {
                            vm.answer = lodash_2.default.capitalize(response.data.answer);
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