---
id: glossary
title: React kifejezések szójegyzéke
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Single-page applikáció {#single-page-application}

Egy single-page, vagy egyoldalas applikáció egy olyan alkalmazás, ami a futáshoz egyetlen HTML oldalt és az összes szükséges egyéb fájlt (pl.: JavaScript és CSS) tölti be. Bármilyen interakció az oldallal vagy alárendelt oldalakkal nem igényel a szerver felé kérést, ami azt jelenti, az oldal nem töltődik újra.

A React-ben tudsz single-page applikációkat készíteni, de ez nem követelmény. A React arra is jó, ha egy létező weboldal kisebb részeit szeretnéd feljavítani extra interaktivitással. A React-ben írt kód békésen együtt tud élni a szerveren renderelt kóddal, mint például PHP, vagy más kliens-oldali könyvtárakkal. Valójában a Facebook-nál is pont így használjuk a React-et.

## ES6, ES2015, ES2016, stb. {#es6-es2015-es2016-etc}

Ezek a mozaikszavak mind az ECMAScript nyelv specifikáció standard legújabb verziójaira utalnak aminek a JavaScript nyelv az egyik implementációja. Az ES6-os verzió (ES2015-ként is ismert) sok újdonságot tartalmaz a korábbi verziókhoz képest, mint például: nyíl függvények, osztályok, sablon literálok, `let` és `const` állítások. Az egyes verziókról [itt](https://en.wikipedia.org/wiki/ECMAScript#Versions) tanulhatsz többet.

## Fordítóprogramok {#compilers}

Egy JavaScript fordítóprogram fogja a JavaScript kódot, transzformálja és visszaadja azt JavaScript kódként egy másik formátumban. Leggyakoribb esetben az ES6 szintaxis transzformálására használt, annak érdekében hogy a régebbi böngészők is értelmezni tudják a kódot. A React esetében egyik leggyakrabban használt ilyen fordítóprogram a [Babel](https://babeljs.io/).

## Kötegelők {#bundlers}

A kötegelők fogják a különálló (gyakran több száz) modulokban írt JavaScript és CSS kódot , és egyesítik azt néhány böngészőkre jobban optimalizált fájlban. Néhány, a React alkalmazások esetében gyakran használt kötegelő például a [Webpack](https://webpack.js.org/) és a [Browserify](http://browserify.org/).

## Csomag kezelők {#package-managers}

A csomag kezelők olyan eszközök, amik lehetővé teszik egy projekt függőségeinek a kezelését. Az [npm](https://www.npmjs.com/) és a [Yarn](https://yarnpkg.com/) két gyakran használt csomag kezelő a React alkalmazások esetében. Mindkettő egy kliens ugyanazon az npm csomag regisztrátorhoz.

## CDN {#cdn}

A CDN a Content Delivery Network (tartalom szolgáltató hálózat) rövidítése. A CDN-ek gyorsítótárazott, statikus tartalmat szolgáltatnak egy világot átszelő szerverhálón keresztül.

## JSX {#jsx}

A JSX egy JavaScript szintaxis kiegészítés. Hasonló egy sablon nyelvhez, de a JavaScript teljes erejével rendelkezik. A JSX le van fordítva `React.createElement()` hívásokra, ami egyszerű JavaScript objektumokat térít vissza, amiket "React elemeknek" hívunk. Egy egyszerű bevezetőért [nézd meg a dokumentációt itt](/docs/introducing-jsx.html), egy mélyebbre ható JSX tutoriálért pedig nézd meg [ezt](/docs/jsx-in-depth.html).

A React DOM camelCase konvenciókat használ tulajdonságok elnevezésére HTML attribútum nevek helyett. Például a `tabindex` JSX-ben `tabIndex`-é válik. A `class` attribútumot is `className`-ként kell írjuk, mivel a `class` a JavaScript-ben egy fenntartott szó:

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">A nevem {name}!</h1>,
  document.getElementById('root')
);
```  

## [Elemek](/docs/rendering-elements.html) {#elements}

React elements are the building blocks of React applications. One might confuse elements with a more widely known concept of "components". An element describes what you want to see on the screen. React elements are immutable.

```js
const element = <h1>Helló, világ</h1>;
```

Typically, elements are not used directly, but get returned from components.

## [Komponensek](/docs/components-and-props.html) {#components}

React components are small, reusable pieces of code that return a React element to be rendered to the page. The simplest version of React component is a plain JavaScript function that returns a React element:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Components can also be ES6 classes:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Components can be broken down into distinct pieces of functionality and used within other components. Components can return other components, arrays, strings and numbers. A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component. Component names should also always start with a capital letter (`<Wrapper/>` **not** `<wrapper/>`). See [this documentation](/docs/components-and-props.html#rendering-a-component) for more information on rendering components. 

### [`prop`-ok](/docs/components-and-props.html) {#props}

`props` are inputs to a React component. They are data passed down from a parent component to a child component.

Remember that `props` are readonly. They should not be modified in any way:

```js
// Wrong!
props.number = 42;
```

If you need to modify some value in response to user input or a network response, use `state` instead.

### `props.children` {#propschildren}

`props.children` is available on every component. It contains the content between the opening and closing tags of a component. For example:

```js
<Welcome>Hello world!</Welcome>
```

The string `Hello world!` is available in `props.children` in the `Welcome` component:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

For components defined as classes, use `this.props.children`:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`, vagy helyi állapot](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

A component needs `state` when some data associated with it changes over time. For example, a `Checkbox` component might need `isChecked` in its state, and a `NewsFeed` component might want to keep track of `fetchedPosts` in its state.

The most important difference between `state` and `props` is that `props` are passed from a parent component, but `state` is managed by the component itself. A component cannot change its `props`, but it can change its `state`.

For each particular piece of changing data, there should be just one component that "owns" it in its state. Don't try to synchronize states of two different components. Instead, [lift it up](/docs/lifting-state-up.html) to their closest shared ancestor, and pass it down as props to both of them.

## [Életciklus metódusok](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Kontrollált](/docs/forms.html#controlled-components) vs. [kontrollálatlan komponensek](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Kulcsok](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Ref-ek](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Események](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Összeegyeztetés](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
