---
id: react-api
title: React legfelső szintű API
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

A `React` a belépési pont a React könyvtárba. Amennyiben a Reactet egy <script> tag segítségével töltöd be, ezek a legfelsőbb szintű API-k a `React` globális változón keresztül lesznek elérhetőek. ES6 és npm esetében írhatod ezt: import React from 'react'. ES5 és npm esetében pedig írhatod az következőt: var React = require('react').

## Áttekintés {#overview}

### Komponensek {#components}

A React komponensek segítéségével a kezelőfelületet feldarabolhatod független, újrafelhasználható darabokká, és minden darabról elzártan tudsz gondolkozni. A React komponensek definiálhatók a `React.Component` vagy a `React.PureCompnent` alosztályozásával.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Ha nem használsz ES6 osztályokat, használhatod a `create-react-class` modult. Több információért lásd: [A React használata ES6 nélkül](/docs/react-without-es6.html) fejezetet.

A React komponensek függvényekként is definiálhatóak, amiket be is tudunk csomagolni:

- [`React.memo`](#reactmemo)

### React elemek készítése {#creating-react-elements}

A kezelőfelületed leírásához a [JSX használatát](/docs/introducing-jsx.html) ajánljuk. Minden JSX elem csak szintaktikus cukor a [`React.createElement()`](#createelement) meghívásához. Ha JSX-t használsz, a következő metódusokat nem fogod közvetlenül meghívni.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Több információért lásd a [React JSX nélkül](/docs/react-without-jsx.html) fejezetet.

### Elemek transzformálása {#transforming-elements}

A `React` több API-t is kínál elemek manipulálásához:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Töredékek {#fragments}

Ahhoz, hogy több elemet tudj egyszerre renderelni anélkül, hogy azokat becsomagolnád egy másik komponensbe, a `React` egy saját komponenst szolgáltat.

- [`React.Fragment`](#reactfragment)

### Refek {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Felfüggesztés {#suspense}

A Suspense lehetővé teszi hogy a komponensek "várni tudjanak" valamire renderelés előtt. A Suspense jelenleg csak egy esetben használható: [komponensek dinamikus betöltése `React.lazy` segítségével](/docs/code-splitting.html#reactlazy). A jövőben más forgatókönyvek is támogatva lesznek, mint például az adatlehívás.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Horgok {#hooks}

A *horgok* a React 16.8 egy új kiegészítései. Lehetővé teszik helyi állapot és egyéb React tulajdonságok használatát osztályok írása nélkül. A horgoknak van egy [saját dokumentáció fejezete](/docs/hooks-intro.html) és egy különálló API referenciája:

- [Alapvető horgok](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Egyéb horgok](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## Referencia {#reference}

### `React.Component` {#reactcomponent}

A `React.Component` a React komponensek alaposztálya abban az esetben, ha azok [ES6 osztályokkal](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) vannak definiálva:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Helló, {this.props.name}</h1>;
  }
}
```

Ha egy listát szeretnél a `React.Component` osztály metódusairól és tulajdonságairól, nézd meg a [React.Component API referenciát](/docs/react-component.html).

* * *

### `React.PureComponent` {#reactpurecomponent}

A `React.PureComponent` hasonló a [`React.Component`](#reactcomponent)-hez. A különbség annyi, hogy a [`React.Component`](#reactcomponent) nem implementálja a [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) metódust, míg a `React.PureComponent` igen, egy sekély prop és állapot összehasonlítással.

Ha a React komponensed `render()` függvénye ugyanazt az eredményt rendereli ugyanazon propok és állapot esetében, akkor néhány esetben használhatod a `React.PureComponent`-t a teljesítmény fokozása érdekében.

> Megjegyzés
>
> A `React.PureComponent` `shouldComponentUpdate()` metódusa csak sekély objektum összehasonlítást végez. Ha az objektumok komplex adatstruktúrákat tartalmaznak, az hamisan negatívat eredményezhet mélyebb különbségek esetében. Csak akkor terjessz ki a `PureComponent`-el, ha egyszerű propokra és állapotra számítasz, vagy használd a [`forceUpdate()`](/docs/react-component.html#forceupdate) metódust ha tudod, hogy a mély adatstruktúrák megváltoztak. Vagy vedd fontolóra [megváltoztathatatlan objektumok](https://facebook.github.io/immutable-js/) használatát a mélyebb adatstruktúrák gyors összehasonlításának megkönnyítése érdekében.
>
> Továbbá a `React.PureComponent` `shouldComponentUpdate()` metódusa kihagyja a prop frissítéseket a komponens teljes alfája esetén. Bizonyosodj meg róla, hogy a komponens minden gyermeke szintúgy "tiszta" (pure).

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* renderelés propok használatával */
});
```

A `React.memo` egy [felsőbb rendű komponens](/docs/higher-order-components.html). Hasonló a [`React.PureComponent`](#reactpurecomponent)-hez, csak osztály komponensek helyett függvény komponensekhez való.

Ha a függvény komponensed ugyanazt rendereli ugyanazon propok esetében, csomagold be egy `React.memo` meghívásba, hogy bizonyos esetekben memoizálni tudd az eredményt a teljesítmény fokozása érdekében. Ez azt jelenti, hogy a React kihagyja a komponens renderelését, és újrafelhasználja az utoljára renderelt eredményt.

A `React.memo` csak a propok változásait figzeli. Ha a `React.memo`-val körbevett függvényed implementációja rendelkezik egy [`useState`](/docs/hooks-state.html) vagy [`useContext`](/docs/hooks-reference.html#usecontext) horoggal, az újra lesz renderelve, amennyiben az állapot vagy a kontextus megváltozik.

Komplex prop objektumok esetében alapértelmezés szerint csak sekély összehasonlítást végez. Ha teljes kontrollt szeretnél az összehasonlítás felett, a második argumentumként megadhatsz egy egyedi összehasonlító függvényt.

```javascript
function MyComponent(props) {
  /* renderelés propok használatával */
}
function areEqual(prevProps, nextProps) {
  /*
  abban az esetben ha a nextProps-ot a rendernek átadva
  ugyanazt az eredményt kapnánk mint a prevProps esetében,
  adj vissza true értéket,
  máskülönben pedig false-t
  */
}
export default React.memo(MyComponent, areEqual);
```

Ez a metódus csakis **[a teljesítmény optimalizálása](/docs/optimizing-performance.html)** céljából létezik. Ne bízd magad rá csak azért, hogy "elkerülj" néhány renderelést, mivel ez hibákhoz vezethet.

> Megjegyzés
>
> A [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) osztálykomponens metódussal ellentétben, az `areEqual` függvény `true` értéket ad vissza, ha a propok egyenlőek, és `false` értéket ha nem azok. Ez a `shouldComponentUpdate` inverze.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Egy adott típusú [React elemet](/docs/rendering-elements.html) készít és ad vissza. A type argumentum lehet egy címke név sztring (mint például `'div'` vagy `'span'`), egy [React komponens](/docs/components-and-props.html) típus (akár osztály vagy függvény), vagy egy [React töredék](#reactfragment) típus.

A [JSX](/docs/introducing-jsx.html)-ben írt kód át lesz konvertálva, hogy az a `React.createElement()`-et használja. Ha JSX-et használsz, a `React.createElement()`-et tipikusan nem kell közvetlenül meghívnod. Nézd meg a [React JSX nélkül](/docs/react-without-jsx.html) fejezetet, ha többet akarsz megtudni.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Egy `element`-et alapul véve egy új React elemet klónoz és ad vissza. A keletkezett elem rendelkezni fog az eredeti elem és az új propok sekély összefonásával. Az új gyermekek átveszik a meglévő gyermekek helyét. A `key` és `ref` attribútumok meg lesznek tartva az eredeti elemből.

A `React.cloneElement()` majdnem ekvivalens ezzel:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

De a `ref` attribútumokat is megőrzi. Ez azt jelenti, hogy ha egy olyan gyermeket kapsz, ami rendelkezik `ref`-el, akkor azt nem fogod véletlenül sem ellopni az ősöktől. Az új elemhez ugyanaz a `ref` lesz hozzákapcsolva.

Ez az API az elavult `React.addons.cloneWithProps()` leváltására lett létrehozva.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Egy függvényt ad vissza ami bizonyos típusú React elemeket produkál. Mint ahogy a [`React.createElement()`](#createelement) esetében is, a type argumentum lehet egy címke név sztring (mint például `'div'` vagy `'span'`), egy [React komponens](/docs/components-and-props.html) típus (akár osztály vagy függvény), vagy egy [React töredék](#reactfragment) típus.

Ez a segédfüggvény egy korábbról örökölt függvénynek számít, és arra biztatunk, hogy inkább használj JSX-et, vagy közvetlenül a `React.createElement()`-et.

Ha JSX-et használsz, a `React.createFactory()`-t általában nem fogod közvetlenül meghívni. Nézd meg a [React JSX nélkül](/docs/react-without-jsx.html) fejezetet, ha többet akarsz megtudni.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Azt ellenőrzi, hogy az objektum érvényes React elemnek minősül-e. `true` vagy `false` értéket ad vissza.

* * *

### `React.Children` {#reactchildren}

A `React.Children` segédeszközként szolgál, ha a nem áttetsző `this.props.children` adatstruktúrával kell dolgozni.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

Egy függvényt hív meg a `this`-t `thisArg`-ra állítva a `children` minden közvetlen gyermekén. Ha a `children` egy tömb, akkor azt bejárva a függvény minden gyermeken meg lesz hívva. Ha a children `null` vagy `undefined` értékű, ez a metódus `null` vagy `undefined` értéket ad vissza egy tömb helyett.

> Megjegyzés
>
> Ha a `children` egy `Fragment` akkor az egy szimpla gyermekként lesz kezelve, ezért nem lesz bejárva.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

Mint a [`React.Children.map()`](#reactchildrenmap) de nem ad vissza tömböt.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

Az `children`-ben lévő összes komponens számát adja vissza, egyenlő azzal ahányszor a visszahívó függvény át lett adva a `map` vagy `forEach`-nek.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

Azt ellenőrzi, hogy a `children`-nek csak egy gyermeke van-e (egy React elemből áll), és visszaadja azt. Máskülönben ez a metódus egy hibát dob.

> Megjegyzés:
>
> A `React.Children.only()` nem fogadja el a [`React.Children.map()`](#reactchildrenmap) visszaadott értékét, mert az egy tömb, nem pedig egy React elem.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

A nem áttetsző `children` adatstruktúrát adja vissza egy lapos tömbként, egy kulcsot rendelve minden gyermekhez. Hasznos lehet ha gyermekek listáját akarod manipulálni a render metódusodban, különösen ha át akarod rendezni, vagy le akarsz vágni a `this.props.children`-ből mielőtt azt lejjebb adod.

> Megjegyzés:
>
> Gyermekek listájának lapítása közben a `React.Children.toArray()` megváltoztatja a kulcsokat a beágyazott tömbök szemantikájának megtartása érdekében. Azaz a `toArray` a visszaadott tömbben minden kulcshoz hozzáad egy prefixumot, hogy minden elem kulcsa az azt tartalmazó tömb hatókörében legyen.

* * *

### `React.Fragment` {#reactfragment}

A `React.Fragment` komponens több elem visszaadását teszi lehetővé a `render()` metódusban anélkül, hogy új DOM elemet hozna létre.

```javascript
render() {
  return (
    <React.Fragment>
      Valami szöveg.
      <h2>Egy fejléc</h2>
    </React.Fragment>
  );
}
```

Használhatod a gyorsított `<></>` szintaxissal is. Még több információért nézd meg a [React v16.2.0 Továbbfejlesztett Töredékek támogatás](/blog/2017/11/28/react-v16.2.0-fragment-support.html) blog posztot.


### `React.createRef` {#reactcreateref}

A `React.createRef` egy [ref](/docs/refs-and-the-dom.html)-et hoz létre, amit a ref attribútummal csatolhatunk React elemekhez.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

A `React.forwardRef` egy React komponenst hoz létre, ami továbbadja a kapott [ref](/docs/refs-and-the-dom.html) attribútumot egy másik komponensnek lejjebb a komponensfában. Ezt nem gyakran kell alkalmazni, de két speciális esetben hasznos tud lenni:

* [Refek továbbítása DOM elemeknek](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Refek továbbítása felsőbb rendű komponenseknek](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

A `React.forwardRef` egy renderelő függvényt fogad argumentumként. A React ezt a függvényt hívja meg a `props` és `ref` argumentumokkal. Ez a függvény egy React csomópontot kell, hogy visszaadjon.

`embed:reference-react-forward-ref.js`

A fenti példában a React továbbad egy a `<FancyButton ref={ref}>` elemnek adott `ref`-et második argumentumként a renderelő függvénynek a `React.forwardRef` meghívásában. Ez a renderelő függvény továbbadja a `ref`-et a `<button ref={ref}>` elemnek.

Ennek eredményeképp, azután hogy a React hozzácsatolja a refet, a `ref.current` közvetlenül a `<button>` DOM elem példányára fog mutatni.

További információért nézd meg a [refek továbbítása](/docs/forwarding-refs.html) fejezetet.

### `React.lazy` {#reactlazy}

A `React.lazy()` segítségével egy dinamikusan betöltődő komponenst tudsz definiálni. Ez segít csökkenteni az összecsomagolt kód méretét úgy, hogy a kezdetleges renderelés által nem használt komponensek betöltése késleltetve lesz.

A használatáról többet tanulhatsz a [kód felvágás dokumentációban](/docs/code-splitting.html#reactlazy). Valószínűleg [ezt a cikket](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) is megnézheted, ami részletesebben is elmagyarázza a használatot.

```js
// Ez a komponens dinamikusan van betöltve
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Megjegyzendő, hogy a `lazy` komponensek renderelése megköveteli, hogy valahol feljebb a komponensfában legyen egy `<React.Suspense>`. Így tudsz megadni egy betöltés indikátort.

> **Megjegyzés**
>
> A `React.lazy` használata dinamikus import segítségével megköveteli, hogy a Promise objektum elérhető legyen a JS környezetben. Ez IE11 és az alatt egy polyfill használatát követeli meg.

### `React.Suspense` {#reactsuspense}

A `React.Suspense` segítségével egy betöltés indikátort tudsz megadni abban az esetben ha néhány komponens a komponensfában lejjebb még nem áll készen renderelésre. Jelenleg a `<React.Suspense>` **egyetlen** támogatott esete a lustán betöltő komponensek:

```js
// Ez a komponens dinamikusan van betöltve
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Amíg az OtherComponent tölt, mutasd a <Spinner>-t
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

A [kód felvágó útmutatónkban](/docs/code-splitting.html#reactlazy) ez dokumentálva van. Jegyezd meg, hogy a `lazy` (lusta) komponensek lehetnek mélyen a `Suspense` fában -- nem kell mindegyiket egyesével körbevenni. A legjobb gyakorlat ha a `<Suspense>`-t oda helyezed ahol egy betöltés indikátort akarsz látni, a `lazy()`-t pedig oda ahol kódot akarsz felvágni.

Bár ez jelenleg még nem támogatott, a jövőben a `Suspense` több forgatókönyvet fog támogatni, mint például adatlehívást. Erről az [ütemtervünkben](/blog/2018/11/27/react-16-roadmap.html) olvashatsz.

>Megjegyzés:
>
> A `ReactDOMServer` még nem támogatja a `React.lazy()`-t és a `<React.Suspense>`-t. Ez egy köztudott limitáció, ami a jövőben kerül megoldásra.
