(ns proto-repl-charts.graph
  "Contains functions for converting a graphs into display data. Displayed graphs
   are maps of nodes and edges. Nodes are maps with :id and :label. Edges are
   maps of :from and :to."
  (:require [clojure.string :as str]))

(defn- error
  "Throws an exception containing a message joined from the msg-parts."
  [& msg-parts]
  (let [msg (str/join " " msg-parts)
        ex #?(:clj (Exception. msg)
              :cljs (js/Error msg))]
   (throw ex)))

(def ^:private expected-msg
  (str "Expecting loom graph or a map containing :nodes and :edges. Nodes can be "
       "strings or maps with any of the fields here: "
       "http://visjs.org/docs/network/nodes.html Edges can be 2 item sequences "
       "or maps containing any of the fields described here: "
       "http://visjs.org/docs/network/edges.html."))

(defn nodes->display-data
  "Converts a sequence of nodes into nodes for display."
  [nodes]
  (when-not (or (set? nodes) (sequential? nodes))
    (error "Expected sequence of nodes." expected-msg))

  (if (map? (first nodes))
    nodes
    (mapv #(hash-map :id % :label %) nodes)))

(defn edges->display-data
  "Converts a sequence of edges into edges for display."
  [edges]
  (when-not (or (set? edges) (sequential? edges))
    (error "Expected sequence of edges." expected-msg))
  (cond
    (map? (first edges))
    edges

    (sequential? (first edges))
    (mapv #(hash-map :from (first %) :to (second %)) edges)

    :else
    (error "Unexpected type for edges." (type (first edges)) expected-msg)))

(defn map-graph->display-graph
  "Converts a graph passed in as a map to a display graph."
  [mg]
  (when-not (contains? mg :nodes)
    (error "Missing key :nodes." expected-msg))
  (when-not (contains? mg :edges)
    (error "Missing key :edges." expected-msg))
  (let [{:keys [nodes edges]} mg]
    {:nodes (nodes->display-data nodes)
     :edges (edges->display-data edges)}))

#?(:clj
   (require 'loom.graph))
#?(:clj
   (defn loom-graph->display-graph
     "Converts a loom graph to a display graph."
     [g]
     (let [nodes (nodes->display-data (loom.graph/nodes g))
           edges (if (loom.graph/directed? g)
                   ;; TODO use arrows for a directed graph
                   (edges->display-data (loom.graph/edges g))
                   ;; Non-directed graph. We don't want duplicate edges between nodes
                   ;; This will return edges twice for an undirected graph
                   (->> g loom.graph/edges (mapv sort) (into #{}) edges->display-data))]
      {:nodes nodes
       :edges edges}))
   :cljs (defn loom-graph->display-graph [g] g))

(defn loom-graph?
  [graph-data]
  #?(:clj (loom.graph/graph? graph-data)
     :cljs false))

(defn convert-graph-data-for-display
  "Converts graph data into data for display by vis.js."
  [graph-data options]
  (cond
    (loom-graph? graph-data)
    (assoc (loom-graph->display-graph graph-data) :options options)

    (map? graph-data)
    (assoc (map-graph->display-graph graph-data) :options options)

    :else
    (error "Unexpected graph data for display of type" (type graph-data) expected-msg)))
