{{^include-prc}}
(ns {{ns-name}}.core)
{{/include-prc}}
{{#include-prc}}
(ns {{ns-name}}.core
  (:require [proto-repl-charts.charts :as charts]))
{{/include-prc}}

;; Start the REPL by pressing ctrl-alt-l / cmd-alt-l

;; Send this block of code to the REPL with ctrl-alt-b / cmd-alt-b
(+ 2 2)

{{#include-prc}}
;; A small proto-repl-charts demo
;; Execute this block to see the result visualized
(charts/line-chart
 "Trigonometry"
 {"sin" (map #(Math/sin %) (range 0.0 6.0 0.2))
  "cos" (map #(Math/cos %) (range 0.0 6.0 0.2))})
{{/include-prc}}
