---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

Ez az oldal egy részletes API referenciát tartalmaz a React Component osztálydefiníciójáról. Feltételezzük, hogy már tisztában vagy a React alapkoncepcióival, mint a [Komponensek és Propok](/docs/components-and-props.html), valamint az [Állapot és Életciklus](/docs/state-and-lifecycle.html). Ha még nem, akkor ezeket olvasd el először.

## Áttekintés {#overview}

Reactben egy komponenst osztályként vagy metódusként is definiálhatsz. Azok a komponensek, amiket osztályként definiáltak, több funkcionalitással rendelkeznek, amiket részletesen kifejtünk ezen az oldalon. Egy React komponens definiálásához ki kell terjesztenünk a `React.Component`-et:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Helló, {this.props.name}</h1>;
  }
}
```

Az egyetlen metódus amit *kötelező* definiálni egy `React.Component`-ben, az úgynevezett [`render()`](#render) metódus. Az összes többi függvény, amit ezen az oldalon bemutatunk, opcionális.  

**Erősen ellenezzük a saját alaposztály definiálását.** A React komponensekben [a kód újrafelhasználását elsősorban kompozíción keresztül érjük el az öröklődés helyett](/docs/composition-vs-inheritance.html).

>Megjegyzés:
>
>A Reactben nem kötelező ES6 szintaxist használni. Ha inkább szeretnéd elkerülni, helyette használhatod a `create-react-class` modult vagy egy hasonló egyedi absztrakciót. Látogass el a [React használata ES6 nélkül](/docs/react-without-es6.html) szekcióhoz, hogy többet megtudj erről. 

### A komponens életciklus {#the-component-lifecycle}

Minden egyes komponenshez több "életciklusmetódus" is tartozik, amiket felülírhatsz, hogy az életciklusa különböző pontjain tudj kódot futtatni. **Ezt az [életciklus diagramot](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) használhatod puskaként.** Az alábbi listában a legtöbbet használt életciklusmetódusok **félkövér betűvel** vannak jelölve. A többit általában csak ritkán használjuk.

#### Létrehozás {#mounting}

Ezek a metódusok a következő sorrendben hívódnak meg, amikor egy komponens létrejön és belekerül a DOM-ba:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Megjegyzés:
>
>Ezek a metódusok elavulttá lettek minősítve és [elkerülendőek](/blog/2018/03/27/update-on-async-rendering.html) új kód írásakor:
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Frissítés {#updating}

Egy frissítés történhet propok vagy állapot változása esetén. Ezek a metódusok a következő sorrendben hajtódnak végre egy komponens újrarenderelésekor:  

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Megjegyzés:
>
>Ezek a metódusok elavulttá lettek minősítve és [elkerülendőek](/blog/2018/03/27/update-on-async-rendering.html) új kód írásakor:
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Leválasztás {#unmounting}

Ez a metódus hívódik meg, amikor egy komponens eltávolítódik a DOM-ból:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Hibakezelés {#error-handling}

Ezek a metódusok hívódnak meg, amikor hiba történik renderelés közben, egy életciklusmetódusban, vagy bármely gyermekkomponens konstruktorában.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Egyéb API-k {#other-apis}

Minden egyes komponensnek van néhány egyéb API-ja is:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Osztálytulajdonságok {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### Példánytulajdonságok {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Referencia {#reference}

### Legtöbbet használt életciklusmetódusok {#commonly-used-lifecycle-methods}

Az ebben a részben található metódusok lefedik a használati esetek nagyrészét, amikkel a React komponensek írása közben találkozhatsz. **Vizuális referenciaként nézd meg ezt az [életcikus diagramot](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### `render()` {#render}

```javascript
render()
```

A `render()` metódus az egyetlen kötelezően implementálandó metódus egy osztálykomponensben.

Amikor meghívódik, a `this.props` és `this.state` alapján vissza kell adnia a következők valamelyikét:

- **React elemek.** Általában [JSX](/docs/introducing-jsx.html) definiálja. Például mind a `<div />` és a `<MyComponent />` is React elemek, amik a Reactet sorrendben egy DOM csomópont és egy felhasználó által definiált komponens renderelésére utasítják.
- **Tömbök és töredékek.** Ezek több elemet is vissza tudnak adni egyszerre a render függvényből. Részletekért lásd a [töredékek](/docs/fragments.html) dokumentációját.
- **Portálok**. Ez egy különálló DOM alfát tud renderelni. Részletekért lásd a [portálok](/docs/portals.html) dokumentációját.
- **Sztringek és számok.** Ezek szövegként kerülnek renderelésre a DOM-ban.
- **Logikai változók vagy `null`**. Nem renderel semmit. (Többnyire azért van, hogy segítse a `return test && <Child />` mintát, ahol a `test` egy logikai változó.)

A `render()` tiszta függvény kell, hogy legyen, ami azt jelenti, hogy nem módosítja a komponens állapotát, minden egyes híváskor ugyanazt adja vissza, és közvetlenül nem kommunikál a böngészővel.

Ha a böngészővel kell kommunikálnod, ezt a `componentDidMount()`-ban vagy más életciklusmetódusokban tedd meg. A `render()` tisztán tartása segít a komponens egyszerűbbé tételében.

> Megjegyzés
>
> A `render()` nem hívódik meg, ha a [`shouldComponentUpdate()`](#shouldcomponentupdate) hamisat ad vissza.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Nem kell konstruktort implementálnod a React komponensedben, ha nem inicializálod a helyi állapotot és nem bind-olsz metódusokat.**

Egy React komponens konstruktora a DOM-ba helyeződés előtt hívódik meg. Egy `React.Component` konstruktorában először a `super(props)`-t kell meghívni minden más hívás előtt. Enélkül a `this.props` undefined értékű lesz a konstruktorban, ami hibákhoz vezethet.

A React konstruktorokat általában kétféle okból használjuk:

* Inicializálni a [helyi állapotot](/docs/state-and-lifecycle.html) egy objektum `this.state`-hez rendelésével.
* Hozzákötni [eseménykezelő](/docs/handling-events.html) metódusokat egy komponenspéldányhoz.
  
**Nem szabad a `setState()`-et** meghívni a `constructor()`-ban. Ehelyett, ha a komponensednek helyi állapotot kell használnia, **rendeld hozzá a kezdő állapotot a `this.state`-hez** közvetlenül a konstruktorban:

```js
constructor(props) {
  super(props);
  // Ne hívd meg a this.setState()-et itt!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

A konstruktor az egyetlen hely, ahol a `this.state`-hez közvetlenül hozzárendelhetsz egy értéket. Mindenhol máshol a `this.setState()`-et használd ehelyett.

Kerüld el a mellékhatások bevezetését vagy a feliratkozásokat a konstruktorban. Ezekre az esetekre inkább a `componentDidMount()`-ot használd.

>Megjegyzés
>
>**Kerüld el a propok helyi állapotba való másolását! Ez egy gyakori hiba:**
>
>```js
>constructor(props) {
>  super(props);
>  // Ezt ne csináld!
>  this.state = { color: props.color };
>}
>```
>
>A probléma az, hogy ez mind felesleges (a `this.props.color`-t közvetlenül is tudod használni ehelyett), mind pedig hibákat generál (a `color` prop frissülése nem fog megjelenni a helyi állapotban).
>
>**Ezt csak akkor használd, ha direkt szeretnéd figyelmen kívül hagyni a prop frissüléseit.** Ebben az esetben a propot átnevezhetjük `initialColor`-nak (vagyis kezdeti szín) vagy `defaultColor`-nak (alapszín). Ezután kényszerítheted a komponenst, hogy "újraindítsa" a belső állapotát [a `key` megváltoztatásával](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key), amikor szükséges.
>
>Olvasd el a [blogbejegyzésünket a származtatott állapot elkerüléséről](/blog/2018/06/07/you-probably-dont-need-derived-state.html), ha tudni szeretnéd, hogy mit csinálj, amikor úgy gondolod, hogy szükséged van az állapot propokból való származtatására.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

A `componentDidMount()` rögtön azután hívódik meg, miután a komponens létrejött (belekerült a fába). Az inicializálás, ami DOM csomópontokat igényel, ide kerül. Ha távoli végpontból kell adatokat betöltened, ez egy jó hely a hálózati kérés elindítására.

Ez a metódus arra is jó, ha feliratozásokat kell felállítanod. Ha ezt teszed, ne felejts el leiratkozni a `componentWillUnmount()`-ban.

A **`setState()`-et akár azonnal is meghívhatod** a `componentDidMount()`-ban. Ez egy extra renderelést fog eredményezni, de ez azelőtt fog megtörténni, mielőtt a böngésző frissíti a képernyőt. Ez garantálja, hogy habár a `render()` kétszer fog meghívódni ebben az esetben, a felhasználó nem fogja a közbenső állapotot látni. Ezt a mintát óvatosan használd, mivel sokszor teljesítményproblémákat okoz. A legtöbb esetben ehelyett már a `constructor()`-ban hozzá tudod rendelni a kezdeti értéket a helyi állapothoz. Azonban szükséges lehet például dialógusok vagy címkék esetében, amik egy DOM csomópont helyzetétől vagy méretétől függenek. 

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

A `componentDidUpdate()` rögtön egy frissítés után hívódik meg. Ez a metódus nem hívódik meg a kezdeti rendereléskor.

Ez egy jó alkalom arra, hogy változtatásokat hajts végre a DOM-on, amikor egy komponens frissült. Ez egy jó hely arra is, hogy hálózati kéréseket hajts végre, de csak akkor, ha összehasonlítod a jelenlegi propokat az előző propokkal (például nincs szükség a hálózati kérésre, ha a propok nem változtak). 

```js
componentDidUpdate(prevProps) {
  // Tipikus használat (ne felejtsd el a propokat összehasonlítani):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

A **`setState()`-et akár azonnal is meghívhatod** a `componentDidUpdate()`-ben, de figyelj arra, hogy ennek **egy feltételben kell elhelyezkednie**, mint a fenti példában, különben egy végtelen ciklus lesz az eredmény. Ez ugyancsak okoz egy extra újrarenderelést, ami bár nem látható a felhasználó számára, de befolyásolhatja a komponens teljesítményét. Ha a helyi állapot egy részét a propból képzed le, fontold meg ehelyett a prop közvetlen használatát. Itt olvashatsz többet a [hibákról, amik a propok helyi állapotba való másolásakor fordulnak elő](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Ha a komponensed implementálja a `getSnapshotBeforeUpdate()` életciklus metódust (ami ritka), az érték, amit visszaad, a `componentDidUpdate()` egy harmadik paramétereként lesz átadva. Egyébként ez a paraméter undefined értékű lesz. 

> Megjegyzés
>
> A `componentDidUpdate()` nem lesz meghívva, ha a [`shouldComponentUpdate()`](#shouldcomponentupdate) hamisat ad vissza.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

A `componentWillUnmount()` rögtön azután hívódik meg, hogy a komponens lecsatolódott és megsemmisült. Bármilyennemű takarítást itt végezz el, például időzítők érvénytelenítése, hálózati kérések visszavonása, vagy azon feliratkozások törlése, amik a `componentDidMount()`-ban lettek létrehozva.

A **`setState()`-et soha ne hívd meg** a `componentWillUnmount()`-ban, mivel a komponens nem fog újrarenderelődni. Ha egy komponenspéldány lecsatolódott, már nem fog újra létrejönni.

* * *

### Ritkán használt életciklusmetódusok {#rarely-used-lifecycle-methods}

A metódusok ebben a részben ritka használati eseteknek felelnek meg. Néha hasznosak, de a legtöbb komponensed nem fogja használni egyiket sem. **A legtöbbet ezek közül [ezen az életciklus diagramon](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) láthatod, ha rákattintatsz a "Show less common lifecycles" (Mutassa a kevésbé használt életciklusmetódusokat is) jelölőnégyzetre a tetején.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

A `shouldComponentUpdate()`-t akkor használd, amikor a Reacttel tudatni szeretnéd, hogy a komponens kimenetét nem befolyásolja a jelenlegi állapot vagy prop változás. Az alapviselkedés az, hogy minden egyes állapotváltozáskor újrarenderelődik, és a legtöbb esetben elég erre az alapviselkedésre támaszkodni.   

A `shouldComponentUpdate()` a renderelés előtt hívódik meg, amikor éppen új propokat vagy új helyi állapotot kap a komponens. Alapból `true`-t ad vissza. Ez a metódus nem hívódik meg a kezdeti rendereléskor, vagy amikor a `forceUpdate()` használva van.

Ez a metódus kizárólag **[teljesítmény-optimalizálásra](/docs/optimizing-performance.html) használatos.** Ne támaszkodj erre, ha szeretnél "meggátolni" egy renderelést, mivel ez hibákhoz vezethet. **Fontold meg a beépített [`PureComponent`](/docs/react-api.html#reactpurecomponent)** használatát a kézzel írt `shouldComponentUpdate()` helyett. A `PureComponent` egy sekély összehasonlítást hajt végre a propokon és állapoton, és csökkenti az esélyét, hogy egy szükséges frissítés kimarad.

Ha biztos vagy abban, hogy kézzel szeretnéd megírni, összehasonlíthatod a `this.props`-ot a `nextProps`-szal és a `this.state`-et a `nextState`-tel, és `false`-ot adj vissza, ha a frissítés kihagyható. Megjegyzendő, hogy a `false` visszatérési érték nem fogja megakadályozni a gyermekek újrarenderelését, amikor az *ő saját* állapotuk változik meg.

Nem ajánlatos mély összehasonlítást végezni a `JSON.stringify()` használatával a `shouldComponentUpdate()`-ben. Ez nagyon nem hatékony és a teljesítmény rovására megy.

Jelenleg, ha a `shouldComponentUpdate()` `false`-ot ad vissza, akkor az [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), és [`componentDidUpdate()`](#componentdidupdate) metódusok nem lesznek meghívva. Elképzelhető, hogy a React a jövőben a `shouldComponentUpdate()`-t csak ajánlásként fogja használni, és `false` visszatérési érték esetében is újrarenderelheti a komponenst.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

A `getDerivedStateFromProps` közvetlenül a renderelés előtt hajtódik végre a kezdeti renderelésnél és frissítéskor is. Az állapot módosításához egy objektumot kell visszaadnia, vagy `null` értéket, hogy ne módosítson semmit.

Ez a metódus csak [ritka használati esetekre](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) való, amikor a helyi állapot a propok változásaitól függ. Például hasznos lehet egy `<Transition>` komponens implementálására, ami összehasonlítja az előző és a következő gyermekeit, hogy eldöntse, melyiket animálja kifelé vagy befelé.

A leszármaztatott állapot beszédes kódhoz vezet, ami a komponenseidet kevésbé átláthatóvá teszi.  
[Győződj meg róla, hogy tisztában vagy egyszerűbb alternatívákkal is:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* Ha muszáj **mellékhatást végrehajtanod** (például adatlekérés vagy animáció) egy propokban történt változás hatására, használd a [`componentDidUpdate`](#componentdidupdate) életciklus metódust ehelyett.

* Ha **adatokat akarsz újraszámítani csak akkor, ha prop változás történt**, [használj egy memoizálás segítőt](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* Ha **"újra kell inicializálni" az állapot egy részét prop változás hatására**, fontold meg a komponens [teljesen kontrollálttá tételét](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component), vagy [teljesen kontrollálatlaná tételét egy `key`-vel](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) ehelyett.

Ennek a metódusnak nincs hozzáférése a komponenspéldányhoz. Ha szeretnéd, újrahasználhatsz némi kódot a `getDerivedStateFromProps()` és a többi osztálymetódus között a propok és helyi állapot tiszta függvényeinek kiemelésével az osztálydefiníción kívülre.

Megjegyzendő, hogy ez a metódus *minden egyes* renderelődéskor meghívódik, októl függetlenül. Ez ellentétes az `UNSAFE_componentWillReceiveProps` viselkedésével, ami csak akkor hívódik meg, ha az újrarenderelődés a szülőkomponens miatt történt, és nem a helyi `setState` hívás által.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

A `getSnapshotBeforeUpdate()` rögtön azelőtt hívódik meg, hogy a legutóbb renderelt kimenet el van mentve pl. a DOM-ba. Ez lehetővé teszi, hogy a komponens kiragadjon információkat a DOM-ból (pl. görgetési pozíció), mielőtt az potenciálisan megváltozna. Bármely érték, amit ez a metódus visszaad, a `componentDidUpdate()`-nek lesz átadva.

Ez a használati eset nem gyakori, de előfordulhat olyan felhasználói felületeken, mint például egy csevegőalkalmazás, aminek speciálisan kell kezelnie a görgetési pozíciót.

Egy pillanatfelvételi érték (vagy `null`) legyen a visszatérés értéke.

Például:

`embed:react-component-reference/get-snapshot-before-update.js`

A fenti példákban fontos, hogy kiolvassuk a `scrollHeight` értékét a `getSnapshotBeforeUpdate`-ben, mivel időeltolódás lehet a "renderelési" életciklus fázis (mint a `render`) és "elmentési" életciklus fázis (mint a `getSnapshotBeforeUpdate` vagy a `componentDidUpdate`) között.

* * *

### Hibahatárok {#error-boundaries}

A [hibahatárok](/docs/error-boundaries.html) React komponensek, amik elkapják a JavaScript hibákat bárhol a komponensfában, kinaplózzák ezeket, és egy tartalék UI-t jelenítenek meg az összeomlott komponensfa helyett. A hibahatárok elkapják a hibákat renderelés közben, az életciklusmetódusokban, és a teljes gyermekkomponensfa konstruktoraiban.

Egy osztálykomponens hibahatárrá válik, ha definiálja a `static getDerivedStateFromError()` és/vagy a `componentDidCatch()` életciklus metódust. Az állapotváltoztatás ezekben az életciklusokban lehetővé teszi az alatta lévő fában történő kezeletlen JavaScript hibák elkapását és egy tartelék komponens megjelenítését.

Csak akkor használd ezeket a hibahatárokat, ha váratlan hibákat szeretnél helyreállítani; **ne használd a normál működés irányítására.**

További részletekért lásd a [*Hibakezelés React 16-ban*](/blog/2017/07/26/error-handling-in-react-16.html) szekciót.

> Megjegyzés
> 
> A hibahatárok csak a fában **alattuk** lévő komponensek hibáit kapják el. Egy hibahatár nem tud elkapni egy saját magában történő hibát.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

Ez az életciklusmetódus akkor hívódik meg, amikor egy hiba dobódott egy alatta lévő komponensben.
Paraméterként kapja meg a dobott hibát és egy olyan értéket kell visszaadnia, ami az állapotot fogja frissíteni.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Frissíti az állapotot, hogy a következő renderelésnél a tartalék UI jelenjen meg
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Bármilyen tartalék UI-t renderelhetsz itt
      return <h1>Valami hiba történt.</h1>;
    }

    return this.props.children;
  }
}
```

> Megjegyzés
>
> A `getDerivedStateFromError()` a "renderelési" fázis alatt hívódik meg, úgyhogy a mellékhatások nem megengedettek.
 Azokra az esetekre inkább a `componentDidCatch()`-t használd.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

Ez az életciklusmetódus egy alatta lévő komponensben történt hiba dobása után hívódik meg. 
Két paramétert fogad:

1. `error` - A dobott hiba.
2. `info` - Egy objektum, amiben van egy `componentStack` kulcs, ami [információt tartalmaz a komponensről, amelyik a hibát dobta](/docs/error-boundaries.html#component-stack-traces).


A `componentDidCatch()` az "elmentési" fázis közben hívódik meg, úgyhogy a mellékhatások itt meg vannak engedve.
Ez olyan dolgokra használható, mint például hibák naplózása:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Frissíti az állapotot, hogy a következő renderelésnél a tartalék UI jelenjen meg
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // "componentStack" példa:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Bármilyen tartalék UI-t renderelhetsz itt
      return <h1>Valami hiba történt.</h1>;
    }

    return this.props.children;
  }
}
```

<<<<<<< HEAD
> Megjegyzés
> 
> Hiba esetén egy tartelék UI-t renderelhetsz a `componentDidCatch()`-ben a `setState` meghívásával, de ez elavulttá válik majd a következő kiadásokban.
> Ehelyett használd a `static getDerivedStateFromError()`-t a tartalék UI renderelésére.
=======
Production and development builds of React slightly differ in the way `componentDidCatch()` handles errors.

On development, the errors will bubble up to `window`, this means that any `window.onerror` or `window.addEventListener('error', callback)` will intercept the errors that have been caught by `componentDidCatch()`.

On production, instead, the errors will not bubble up, which means any ancestor error handler will only receive errors not explicitly caught by `componentDidCatch()`.

> Note
>
> In the event of an error, you can render a fallback UI with `componentDidCatch()` by calling `setState`, but this will be deprecated in a future release.
> Use `static getDerivedStateFromError()` to handle fallback rendering instead.
>>>>>>> 4fc709d0576d0f0f1f8ea8b6bb341a12944b5510

* * *

### Elavult életciklusmetódusok {#legacy-lifecycle-methods}

Az alábbi életciklusmetódusok "elavulttá" váltak. Még mindig működnek, de új kódban már nem ajánljuk a használatát. Ebben a [blogbejegyzésben](/blog/2018/03/27/update-on-async-rendering.html) többet megtudhatsz az elavult életciklusmetódusok lecseréléséről.

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Megjegyzés
>
> Ezt az életciklust előzőleg `componentWillMount`-nak hívták. Ez a név a 17-es verzióig működni fog. Használd a [`rename-unsafe-lifecycles` kódmódosítót](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), hogy automatikusan frissítsd a komponenseidet.

`UNSAFE_componentWillMount()` közvetlenül a betöltés előtt hívódik meg. Ez a `render()` előtt van, így a `setState()` szinkron hívása ebben a metódusban nem fog extra renderelést előidézni. Mi általában a `constructor()`-t ajánljuk az állapot inicializálására.

Kerüld el a mellékhatások vagy feliratkozások bevezetését ebben a metódusban. Azokra az esetekre inkább a `componentDidMount()`-ot használd.

Ez az egyetlen életciklusmetódus ami meghívódik a szerveren rendereléskor.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Megjegyzés
>
> Ezt az életciklust előzőleg `componentWillReceiveProps`-nak hívták. Ez a név a 17-es verzióig működni fog. Használd a [`rename-unsafe-lifecycles` kódmódosítót](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), hogy automatikusan frissítsd a komponenseidet.

> Megjegyzés:
>
> Ennek az életciklusmetódusnak a használata gyakran vezet hibákhoz és inkonzisztenciákhoz
>
> * Ha **mellékhatást kell végrehajtanod**, (például adatlekérés vagy egy animáció) a propokban történt változások határásra, használd a [`componentDidUpdate`](#componentdidupdate) életciklust ehelyett.
> * Ha a `componentWillReceiveProps`-ot használtad az **adatok újraszámítására a propok változásai alapján**, [használj memoizálás segítőt ehelyett](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * Ha a `componentWillReceiveProps`-ot használtad, hogy **"újrainicializáld" az  állapot egy részét a propok változásának hatására**, fontold meg a komponens [teljesen kontrollálttá tételét](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component), vagy [teljesen kontrollálatlanná egy `key`-vel](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) ehelyett.
>
> A többi használati esetben [kövesd az ajánlásokat, amik ebben a származtatott állapotról szóló blogbejegyzésben találhatóak](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

Az `UNSAFE_componentWillReceiveProps()` azelőtt hívódik meg, mielőtt egy betöltött komponens új propokat kapna. Ha meg kell változtatnod az állapotot a propok változásának hatására, (például, újrainicializálás), összehasonlíthatod a `this.props`-ot a `nextProps`-szal és állapotot változtathatsz a `this.setState()`-tel ebben a metódusban.

Megjegyzendő, hogy ha egy szülő komponens miatt renderelődik újra a komponensed, ez a metódus meghívódik akkor is, ha a propok nem változtak. Hasonlítsd össze a jelenlegi és következő értékeket, ha csak a változásokat akarod lekezelni.

A React nem hívja meg az `UNSAFE_componentWillReceiveProps()`-t a kezdeti prop értékekkel a [betöltés](#mounting) közben. Csak akkor hívja meg ezt a metódust, ha a komponens néhány propja frissülhet. A `this.setState()` meghívása általában nem idézi elő az `UNSAFE_componentWillReceiveProps()` meghívását.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Mejegyzés
>
> Ezt az életciklust előzőleg `componentWillUpdate`-nek hívták. Ez a név a 17-es verzióig működni fog. Használd a [`rename-unsafe-lifecycles` kódmódosítót](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles), hogy automatikusan frissítsd a komponenseidet.

Az `UNSAFE_componentWillUpdate()` közvetlenül renderelés előtt hívódik meg, amikor új propok és állapotok kerülnek fogadásra. Ez egy jó lehetőség arra, hogy előkészítést végezzünk el egy frissítés előtt. Ez a metódus nem hívódik meg a kezdeti rendereléskor.

Megjegyzendő, hogy itt nem hívhatod meg a `this.setState()`-et; valamint bármi mást sem (pl. kezdeményezni egy Redux műveletet), ami egy frissítést kezdeményezne a React komponensben a `UNSAFE_componentWillUpdate()` visszatérése előtt.

Általában ez a metódus kicserélhető a `componentDidUpdate()`-tel. Ha ebben a metódusban a DOM-ból olvastál ki (pl. a görgetési pozíció elmentése), ezt a logikát áthelyezheted a `getSnapshotBeforeUpdate()`-be.

> Megjegyzés
>
> A `UNSAFE_componentWillUpdate()` nem hívódik meg, ha a [`shouldComponentUpdate()`](#shouldcomponentupdate) hamisat ad vissza.

* * *

## Egyéb API-k {#other-apis-1}

A fenti életciklusmetódusokkal ellentétben (amiket a React hív meg neked), a következő metódusokat *te magad* hívhatod meg a komponenseidből.

Csak ez a kettő van: `setState()` és `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater, [callback])
```

 A `setState()` egy várakozási sorba helyezi a komponens állapotának változásait és utasítja a Reactet, hogy ez a komponens a gyermekeivel együtt újrarendereljen az új állapottal. Ez az elsődleges metódus a kezelői felület frissítéséhez az eseménykezelők és szerver általi válasz hatására.

Gondolj a `setState()`-re mint *kérés*, egy azonnali parancs helyett a komponens frissítésére. A jobb észlelt teljesítmény érdekében a React dönthet úgy, hogy késlelteti a végrehajtást, és aztán több komponenst is egyszerre frissít. A React nem garantálja, hogy az állapotfrissítések azonnal megtörténnek.

A `setState()` nem mindig frissíti rögtön a komponenst. Lehet, hogy összevonja más frissítésekkel, vagy késlelteti a frissítést. Emiatt a `this.state` kiolvasása rögtön a `setState()` meghívása után egy potenciális buktató. Ehelyett használd a `componentDidUpdate`-t vagy a `setState` callbackjét (`setState(updater, callback)`), ezek közül bármelyik garantáltan lefut egy frissítés megtörténte után. Ha az állapotot egy előző állapot alapján kell beállítanod, olvass az `updater` argumentumról alább.

A `setState()` mindig újrarendereléshez vezet, kivéve, ha a `shouldComponentUpdate()` `false`-ot ad vissza. Ha megváltoztatható objektumokat használsz és nem lehet implementálni feltételes renderelő logikát a `shouldComponentUpdate()`-ben, a felesleges renderelések elkerülése érdekében a `setState()`-et csak akkor hívd meg, ha az új állapot különbözik az előzőtől.

Az első argumentum egy `updater` függvény az alábbi szignatúrával:

```javascript
(state, props) => stateChange
```

A `state` egy referencia a komponens állapotára a frissítés idejében. Ezt nem szabad közvetlenül módosítani. Ehelyett a változásokat reprezentáld egy új objektumban a `state` és `props` alapján. Például tegyük fel, hogy meg akarjuk növelni egy állapotváltozó értéket `props.step`-pel:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Mind `state` és `props` értéke, amit a frissítőfüggvény (updater) által kaptunk, garantáltan friss lesz. A frissítőfüggvény kimenete a `state`-tel kerül sekélyen összefésülésre.

A `setState()` második paramétere egy opcionális callback függvény, ami akkor lesz meghívva, amikor a `setState` lefutott és a komponens újrarenderelt. Mi általában hasonló logikához a `componentDidUpdate()`-et ajánljuk ehelyett.

A `setState()` első argumentuma függvény helyett lehet objektum is:

```javascript
setState(stateChange[, callback])
```

Ez a `stateChange` egy sekély összefésülését végzi el az új állapotba, pl., amikor egy kosár elemeinek számát változtatod meg:

```javascript
this.setState({quantity: 2})
```

A `setState()` ezen formája aszinkron, és az egy ciklus alatt bekövetkező hívások összevonódhatnak. Például, ha egy elem értéket többször is megnöveled egy cikluson belül, az ezzel lesz ekvivalens:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Az ugyanabban a ciklusban lévő egymás utáni hívások felülírják egymást, így az elem értéke csak egyszer lesz megnövelve. Ha a következő állapot a jelenlegi állapotra épül, a frissítőfüggvény használatát javasoljuk ehelyett:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

További részletekért lásd:

* [Állapot és Életciklus leírása](/docs/state-and-lifecycle.html)
* [Részletesen: Mikor és miért vonódnak össze a `setState()` hívások?](https://stackoverflow.com/a/48610973/458193)
* [Részletesen: Miért nem frissül a `this.state` azonnal?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

Alapesetben, amikor a komponensed állapota vagy propjai változnak, a komponensed újrarenderelődik. Ha a `render()` metódusod valami más adattól is függ, utasíthatod a Reactet az újrarenderelésre a `forceUpdate()` meghívásával.

A `forceUpdate()` meghívása a `render()` hívását fogja előidézni a komponensben, kihagyva a `shouldComponentUpdate()`-t. Ez ugyanakkor előidézi a normális életciklusmetódusok meghívását a gyermekkomponensekben a `shouldComponentUpdate()`-tel együtt. Viszont a React ugyanúgy csak akkor frissíti a DOM-ot, ha változás történt.

Általában elkerülendő a `forceUpdate()` használata és csak a `this.props` és `this.state`-ből olvass a `render()`-ben.

* * *

## Osztálytulajdonságok {#class-properties-1}

### `defaultProps` {#defaultprops}

A `defaultProps`-ot egy a komponensen lévő tulajdonságként tudjuk definiálni, a propok alapértékeinek beállításához az osztályon. Ez az `undefined` értékű propoknál használatos, a `null` értékűeknél nem. Például:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

Ha a `props.color` nincs megadva, az alapértéke `'blue'` lesz:

```js
  render() {
    return <CustomButton /> ; // A props.color blue-ra lesz állítva
  }
```

Ha a `props.color` értéke `null`, `null` is marad:

```js
  render() {
    return <CustomButton color={null} /> ; // A props.color értéke null marad
  }
```

* * *

### `displayName` {#displayname}

A `displayName` szöveg hibakeresésnél használatos. Általában ezt nem kell explicit módon beállítanod, mivel ez az a függvény vagy osztály nevéből van kikövetkeztetve, amelyik definiálja a komponenst. Ezt lehet, hogy be akarod állítani, ha expliciten szeretnél egy másik nevet megjeleníteni hibakeresés miatt, vagy amikor egy magasabb rendű komponenst hozol létre, lásd a [Csomagold be a megjelenítési nevet a könnyebb hibakeresés érdekében](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) szekciót a részletekért.

* * *

## Példánytulajdonságok {#instance-properties-1}

### `props` {#props}

A `this.props` a propokat tartalmazza, amik ennek a komponensnek a meghívója által lettek definiálva. Lásd a [Komponensek és Propok](/docs/components-and-props.html) szekciót a propok bemutatásához.

A `this.props.children` egy speciális prop, ami általában a JSX kifejezés gyermekcímkéi által van meghatározva a szülő címke helyett.

### `state` {#state}

Az állapot komponensspecifikus adatot tartalmaz, ami idővel változhat. Az állapot felhasználó által definiált, és egyszerű JavaScript objektumnak kell lennie.

Ha egy érték nincs rendereléshez vagy adatáramláshoz használva (például egy időzítő azonosítója), nem kell az állapotba tenned. Az ilyen értékeket mezőkként definiálhatod a komponenspéldányon.

Lásd az [Állapot és Életciklus](/docs/state-and-lifecycle.html) leírást további információkért az állapotról.

Soha ne változtasd meg a `this.state`-et közvetlenül, mivel a `setState()` hívás lehet, hogy megváltoztatja ezt később. Tekintsd a `this.state`-et úgy, mintha megváltoztathatatlan lenne.
