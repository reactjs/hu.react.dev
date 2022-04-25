---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
Amennyiben a Reactet egy `<script>` tag segítségével töltöd be, ezek a legfelsőbb szintű API-k a `ReactDOM` globális változón keresztül lesznek elérhetőek. ES6 és npm esetében írhatod ezt: `import ReactDOM from 'react-dom'`. ES5 és npm esetében pedig írhatod az következőt: `var ReactDOM = require('react-dom')`.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

## Áttekintés {#overview}

<<<<<<< HEAD
A `react-dom` csomag DOM specifikus metódusokkal szolgál, amiket az alkalmazásod legfelsőbb szintjén használhatsz, valamint egy menekülési utat is biztosít a React modellen kívülre, ha erre lenne szükséged. A legtöbb komponensednek nem lesz szüksége erre a modulra.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Böngésző támogatás {#browser-support}

<<<<<<< HEAD
A React az Internet Explorer 9-től kezdve az összes népszerű böngészőt támogatja, bár régebbi böngészők esetében mint az IE 9 és IE 10, [néhány polyfill megkövetelt](/docs/javascript-environment-requirements.html).
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

> Megjegyzés
>
<<<<<<< HEAD
> Olyan régi böngészőket, amik nem támogatják az ES5 metódusokat nem támogatunk, de elképzelhető, hogy polyfillek, mint az [es5-shim és es5-sham](https://github.com/es-shims/es5-shim) oldalba illesztésével a kód működni fog régebbi böngészőkben is. Ha ezt az utat választod, magadra vagy utalva.

* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

## Referencia {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
Egy React elemet renderel a DOM-ba a megadott `container`-be és egy komponens [referenciát](/docs/more-about-refs.html) ad vissza (vagy [állapot nélküli komponensek](/docs/components-and-props.html#function-and-class-components) esetében `null` értéket).
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

Ha a React elem korábban egy `container`-be lett renderelve, akkor ezen egy frissítést fog végrehajtani és csak a DOM azon részeit fogja megváltoztatni, amik ahhoz szükségesek, hogy a DOM tükrözze a legújabb React elemet.

Ha az opcionális visszahívó függvény meg van adva, ez akkor lesz meghívva, amikor a komponens renderelt, vagy frissített.

> Megjegyzés:
>
<<<<<<< HEAD
> A `ReactDOM.render()` kontrollálja a megadott konténer csomópont tartalmát. Bármiféle korábbról meglévő DOM elem ki lesz cserélve az első meghívás alkalmával. A későbbi meghívások a React DOM diffing algoritmusát használják a hatékony frissítésekért.
>
> A `ReactDOM.render()` nem módosítja a konténer csomópontot (csak a konténer gyermekeit). Egy komponenst lehetséges egy DOM csomópontba úgy beilleszteni, hogy az ne módosítsa a meglévő gyermekeket.
>
> A `ReactDOM.render()` jelenleg egy referenciát ad vissza a gyökér `ReactComponent` példányhoz. Azonban ennek a visszaadott értéknek a használata örökölt/elavult viselkedés
> és a használata elkerülendő, mivel a jövőbeli React verziók néhány esetben aszinkron módon renderelhetnek komponenseket. Ha szükséged van egy referenciára a gyökér `ReactComponent` példányhoz, a preferált megoldás ha egy 
> [visszahívó ref](/docs/more-about-refs.html#the-ref-callback-attribute)-et kapcsolsz a gyökérelemhez.
>
> A `ReactDOM.render()` használata szerver oldali renderelés hidrálásához elavultnak számít és a React 17-ben el lesz távolítva. Használd inkább a [`hydrate()`](#hydrate) metódust.
=======
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

* * *

### `hydrate()` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
Ugyanaz, mint a [`render()`](#render), de azon konténer HTML tartalmának hidrálásához használt, amit a [`ReactDOMServer`](/docs/react-dom-server.html) renderelt. A React megkísérel eseményhallgatókat hozzácsatolni a meglévő sémához.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

A React arra számít, hogy a renderelt tartalom megegyezik a szerveren és a kliensen. Habár el tud simítani különbségeket a szövegtartalomban, de az eltéréseket kezeld hibákként és javítsd ki őket. Fejlesztői módban hidrálás közben a React figyelmeztet az eltérésekről. Arra, hogy az attribútum különbségek is ki lesznek javítva, nincs garancia. Ez a teljesítmény szempontjából fontos, mivel a legtöbb alkalmazásban az eltérések ritkák és ezért a teljes séma validálása meglehetősen drága lenne.

Ha egy szimpla elem attribútuma vagy szövegtartalma elkerülhetetlenül különbözne a szerver és a kliens közt (például időbélyegek), akkor elnémíthatod a figyelmeztetést a `suppressHydrationWarning={true}` hozzáadásával az elemhez. Ez csak egy szint mélységig működik és csak egy menekülő útnak van szánva. Ne használd túl sokat. Hacsak nem szövegtartalom, a React még így sem fogja megkísérelni megfoltozni, így ez jövőbeni frissítésekig inkonzisztens maradhat.

Ha szándékosan szeretnél valamit renderelni, ami eltér a szerveren és a kliensen, használhatsz kétmenetes renderelést. Azon komponensek, amik mást renderelnek a kliensen, azok például ki tudnak olvasni egy `this.state.isClient` változót, amit `true` értékre állíthatsz a `componentDidMount()` metódusban. Így a kezdetleges renderelés ugyanazt a tartalmat rendereli, mint a szerver, az eltéréseket elkerülve, de egy második menet is be fog következni szinkron módon rögtön a hidrálás után. Megjegyzendő, hogy ez a módszer lassabbá teszi a komponenseidet, mivel kétszer kell renderelniük, szóval csak óvatosan használd.

Ne felejts el a lassú interneteléréssel rendelkezők felhasználói élményére sem gondolni. A JavaScript kód akár jelentősen később töltődhet be, mint a kezdetleges HTML render, szóval ha valami eltérőt renderelsz a csak kliens oldali menetben, az átmenet csikorgós lehet. Azonban, ha jól van végrehajtva, előnyös lehet a szerveren egy "vázat" renderelni az alkalmazásnak, és csupán néhány extra modult kell mutatni a kliensen. Az előző bekezdés magyarázatából megtudhatod, hogy ezt hogyan lehet sémabeli eltérési hibák nélkül megtenni.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
Egy létrehozott React komponenst választ le a DOM-ról először kitakarítva az eseménykezelőket és az állapotát. Ha a konténerben nem lett komponens létrehozva, ennek a függvénynek a meghívása nem fog semmit csinálni. Ha a komponens le lett választva, `true` értéket ad vissza, ha nem volt komponens, amit le kellett választani, akkor pedig `false` értéket.
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

* * *

### `findDOMNode()` {#finddomnode}

> Megjegyzés:
>
> A `findDOMNode` egy menekülési út, ami alsóbbrendű DOM csomópontok eléréséhez szolgált. A legtöbb esetben ennek a használata nem ajánlott, mert rést üt a komponens absztrakcióján. [`StrictMode`-ban elavultnak lett minősítve.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
Ha a komponens már létezik a DOM-ban, ez a megegyező natív böngészőbeli DOM elemet adja vissza. Ez a metódus hasznos lehet értékek kiolvasására a DOM-ból, mint például űrlap mezők értékei, vagy DOM számítások végrehajtása. **A legtöbb esetben a `findDOMNode` használata teljes mértékben elkerülhető ha hozzácsatolsz egy refet a DOM csomóponthoz.**

Amikor egy komponens `null` vagy `false` értéket renderel, a `findDOMNode` `null` értéket ad vissza. Ha a komponens egy sztringgé renderelődik, a `findDOMNode` egy szöveg DOM csomópontot ad vissza, ami ennek értéket tartalmazza. A React 16 óta egy komponens egy több gyermekből álló töredéket is visszaadhat. Ebben az esetben a `findDOMNode` az első megegyező nem üres gyermek DOM csomópontját adja vissza.

> Megjegyzés:
>
> A `findDOMNode` csak létrehozott komponenseken működik (tehát olyan kompnenseken, amik a DOM-ba lettek helyezve). Ha egy olyan komponensen próbálod meghívni ami még nem lett létrehozva (például olyan komponens `render()` metódusában próbálod meghívni a `findDOMNode()`-t ami még nem lett létrehozva) egy kivétel lesz dobva.
>
> A `findDOMNode` nem használható függvény komponenseken.

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Egy portált hoz létre. A portálok [olyan DOM csomópontba való gyermekek renderelését teszik lehetővé, amik kívül esnek a DOM komponens hierarchiáján](/docs/portals.html).
=======
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892
