---
id: react-without-jsx
title: React JSX nélkül
permalink: docs/react-without-jsx.html
---

Nem kötelező a JSX-et választani, ha Reactet használsz. A React JSX nélkül különösen hasznos, ha nem akarsz külön fordítási lépést létrehozni a build környezetedben.

Minden egyes JSX elem csak egy rövidítés a `React.createElement(component, props, ...children)` metódus hívására. Így, mindent amit JSX-szel le tudsz írni, meg tudod csinálni JSX nélkül is, sima JavaScriptet használva.

Például, ez a JSX-szet használó kódrészlet:

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

ReactDOM.render(
  <Hello toWhat="World" />,
  document.getElementById('root')
);
```

átírható a következő, JSX-szet nem használó kódra:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```
Próbáld ki [az online Babel fordítót](babel://jsx-simple-example), ha szeretnél több példát látni rá, hogyan alakítjuk át a JSXet JavaScriptté.

A komponens megadható sztringként, a `React.Component` alosztályaként vagy egy sima függvényként.

Ha úgy érzed, hogy túl időigényes mindig kigépelni a `React.createElement`-et, egy gyakori megoldás, a függvény egy rövidítéshez rendelése:

```js
const e = React.createElement;

ReactDOM.render(
  e('div', null, 'Hello World'),
  document.getElementById('root')
);
```
A `React.createElement`-nek ezt a rövidített formáját használva, már sokkal kényelmesebb React kódot írni, még JSX nélkül is.

Ha inkább más alternatív megoldást keresel, nézz bele a közösségi projektbe mint amilyen a [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) és a [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) amik segíthetnek tömörebb kódot írni.
