---
title: Állapot-teljes komponens
order: 1
domid: timer-example
---

Az beviteli adaton kívül (ami `this.props`-ként érhető el), egy komponens saját belső állapotát is kezelni tudja (ez `this.state`-ként érhető el). Ha egy komponens állapota megváltozik, a renderelt tartalom frissítve lesz a `render()` metódus újrahívásával.
