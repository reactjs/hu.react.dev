---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Amennyiben a Reactet egy `<script>` tag segítségével töltöd be, ezek a legfelsőbb szintű API-k a `ReactDOM` globális változón keresztül lesznek elérhetőek. ES6 és npm esetében írhatod ezt: `import ReactDOM from 'react-dom'`. ES5 és npm esetében pedig írhatod az következőt: `var ReactDOM = require('react-dom')`.

## Áttekintés {#overview}

A `react-dom` csomag DOM specifikus metódusokkal szolgál, amiket az alkalmazásod legfelsőbb szintjén használhatsz, valamint egy menekülési utat is biztosít a React modellen kívülre, ha erre lenne szükséged. A legtöbb komponensednek nem lesz szüksége erre a modulra.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Böngésző támogatás {#browser-support}

A React az Internet Explorer 9-től kezdve az összes népszerű böngészőt támogatja, bár régebbi böngészők esetében mint az IE 9 és IE 10, [néhány polyfill megkövetelt](/docs/javascript-environment-requirements.html).

> Megjegyzés
>
> Olyan régi böngészőket, amik nem támogatják az ES5 metódusokat nem támogatunk, de elképzelhető, hogy polyfillek, mint az [es5-shim és es5-sham](https://github.com/es-shims/es5-shim) oldalba illesztésével a kód működni fog régebbi böngészőkben is. Ha ezt az utat választod, magadra vagy utalva.

* * *

## Referencia {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Egy React elemet renderel a DOM-ba a megadott `container`-be és egy komponens [referenciát](/docs/more-about-refs.html) ad vissza (vagy [állapot nélküli komponensek](/docs/components-and-props.html#function-and-class-components) esetében `null` értéket).

Ha a React elem korábban egy `container`-be lett renderelve, akkor ezen egy frissítést fog végrehajtani és csak a DOM azon részeit fogja megváltoztatni, amik ahhoz szükségesek, hogy a DOM tükrözze a legújabb React elemet.

Ha az opcionális visszahívó függvény meg van adva, ez akkor lesz meghívva, amikor a komponens renderelt, vagy frissített.

> Megjegyzés:
>
> A `ReactDOM.render()` kontrollálja a megadott konténer csomópont tartalmát. Bármiféle korábbról meglévő DOM elem ki lesz cserélve az első meghívás alkalmával. A későbbi meghívások a React DOM diffing algoritmusát használják a hatékony frissítésekért.
>
> A `ReactDOM.render()` nem módosítja a konténer csomópontot (csak a konténer gyermekeit). Egy komponenst lehetséges egy DOM csomópontba úgy beilleszteni, hogy az ne módosítsa a meglévő gyermekeket.
>
<<<<<<< HEAD
> A `ReactDOM.render()` jelenleg egy referenciát ad vissza a gyökér `ReactComponent` példányhoz. Azonban ennek a visszaadott értéknek a használata örökölt/elavult viselkedés
> és a használata elkerülendő, mivel a jövőbeli React verziók néhány esetben aszinkron módon renderelhetnek komponenseket. Ha szükséged van egy referenciára a gyökér `ReactComponent` példányhoz, a preferált megoldás ha egy 
> [visszahívó ref](/docs/more-about-refs.html#the-ref-callback-attribute)-et kapcsolsz a gyökérelemhez.
=======
> `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>>>>>>> a08e1fd4b574a4d2d55e292af9eb01d55a526303
>
> A `ReactDOM.render()` használata szerver oldali renderelés hidrálásához elavultnak számít és a React 17-ben el lesz távolítva. Használd inkább a [`hydrate()`](#hydrate) metódust.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Ugyanaz, mint a [`render()`](#render), de azon konténer HTML tartalmának hidrálásához használt, amit a [`ReactDOMServer`](/docs/react-dom-server.html) renderelt. A React megkísérel eseményhallgatókat hozzácsatolni a meglévő sémához.

A React arra számít, hogy a renderelt tartalom megegyezik a szerveren és a kliensen. Habár el tud simítani különbségeket a szövegtartalomban, de az eltéréseket kezeld hibákként és javítsd ki őket. Fejlesztői módban hidrálás közben a React figyelmeztet az eltérésekről. Arra, hogy az attribútum különbségek is ki lesznek javítva, nincs garancia. Ez a teljesítmény szempontjából fontos, mivel a legtöbb alkalmazásban az eltérések ritkák és ezért a teljes séma validálása meglehetősen drága lenne.

Ha egy szimpla elem attribútuma vagy szövegtartalma elkerülhetetlenül különbözne a szerver és a kliens közt (például időbélyegek), akkor elnémíthatod a figyelmeztetést a `suppressHydrationWarning={true}` hozzáadásával az elemhez. Ez csak egy szint mélységig működik és csak egy menekülő útnak van szánva. Ne használd túl sokat. Hacsak nem szövegtartalom, a React még így sem fogja megkísérelni megfoltozni, így ez jövőbeni frissítésekig inkonzisztens maradhat.

Ha szándékosan szeretnél valamit renderelni, ami eltér a szerveren és a kliensen, használhatsz kétmenetes renderelést. Azon komponensek, amik mást renderelnek a kliensen, azok például ki tudnak olvasni egy `this.state.isClient` változót, amit `true` értékre állíthatsz a `componentDidMount()` metódusban. Így a kezdetleges renderelés ugyanazt a tartalmat rendereli, mint a szerver, az eltéréseket elkerülve, de egy második menet is be fog következni szinkron módon rögtön a hidrálás után. Megjegyzendő, hogy ez a módszer lassabbá teszi a komponenseidet, mivel kétszer kell renderelniük, szóval csak óvatosan használd.

Ne felejts el a lassú interneteléréssel rendelkezők felhasználói élményére sem gondolni. A JavaScript kód akár jelentősen később töltődhet be, mint a kezdetleges HTML render, szóval ha valami eltérőt renderelsz a csak kliens oldali menetben, az átmenet csikorgós lehet. Azonban, ha jól van végrehajtva, előnyös lehet a szerveren egy "vázat" renderelni az alkalmazásnak, és csupán néhány extra modult kell mutatni a kliensen. Az előző bekezdés magyarázatából megtudhatod, hogy ezt hogyan lehet sémabeli eltérési hibák nélkül megtenni.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Egy létrehozott React komponenst választ le a DOM-ról először kitakarítva az eseménykezelőket és az állapotát. Ha a konténerben nem lett komponens létrehozva, ennek a függvénynek a meghívása nem fog semmit csinálni. Ha a komponens le lett választva, `true` értéket ad vissza, ha nem volt komponens, amit le kellett választani, akkor pedig `false` értéket.

* * *

### `findDOMNode()` {#finddomnode}

> Megjegyzés:
>
> A `findDOMNode` egy menekülési út, ami alsóbbrendű DOM csomópontok eléréséhez szolgált. A legtöbb esetben ennek a használata nem ajánlott, mert rést üt a komponens absztrakcióján. [`StrictMode`-ban elavultnak lett minősítve.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Ha a komponens már létezik a DOM-ban, ez a megegyező natív böngészőbeli DOM elemet adja vissza. Ez a metódus hasznos lehet értékek kiolvasására a DOM-ból, mint például űrlap mezők értékei, vagy DOM számítások végrehajtása. **A legtöbb esetben a `findDOMNode` használata teljes mértékben elkerülhető ha hozzácsatolsz egy refet a DOM csomóponthoz.**

Amikor egy komponens `null` vagy `false` értéket renderel, a `findDOMNode` `null` értéket ad vissza. Ha a komponens egy sztringgé renderelődik, a `findDOMNode` egy szöveg DOM csomópontot ad vissza, ami ennek értéket tartalmazza. A React 16 óta egy komponens egy több gyermekből álló töredéket is visszaadhat. Ebben az esetben a `findDOMNode` az első megegyező nem üres gyermek DOM csomópontját adja vissza.

> Megjegyzés:
>
> A `findDOMNode` csak létrehozott komponenseken működik (tehát olyan kompnenseken, amik a DOM-ba lettek helyezve). Ha egy olyan komponensen próbálod meghívni ami még nem lett létrehozva (például olyan komponens `render()` metódusában próbálod meghívni a `findDOMNode()`-t ami még nem lett létrehozva) egy kivétel lesz dobva.
>
> A `findDOMNode` nem használható függvény komponenseken.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Egy portált hoz létre. A portálok [olyan DOM csomópontba való gyermekek renderelését teszik lehetővé, amik kívül esnek a DOM komponens hierarchiáján](/docs/portals.html).
