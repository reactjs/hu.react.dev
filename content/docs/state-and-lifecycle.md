---
id: state-and-lifecycle
title: Állapot és életciklus
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

Ez az oldal az állapot és életciklus fogalmait mutatja be egy React komponensben. A [részletes komponens API referenciát itt](/docs/react-component.html) találod.

Vedd a ketyegő óra példát [az egyik korábbi fejezetből](/docs/rendering-elements.html#updating-the-rendered-element). Az [Elemek renderelése](/docs/rendering-elements.html#rendering-an-element-into-the-dom) fejezetben csak egyetlen módját tanultuk meg a felhasználói felület frissítésének. A `ReactDOM.render()` metódus meghívásával megváltoztatjuk a renderelt kimenetet:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Helló, világ!</h1>
      <h2>Az idő {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

Ebben a fejezetben megtanuljuk, hogy hogyan tudjuk a `Clock` komponenst igazán újrafelhasználhatóvá és egységbe foglalttá tenni. Saját időzítőt fog beállítani, hogy minden másodpercben frissíteni tudja önmagát.

Kezdhetjük azzal, hogy hogyan foglaljuk egységbe azt, ahogyan az óra kinéz:

```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Helló, világ!</h1>
      <h2>Az idő {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Azonban ebből hiányzik valami nagyon fontos: Az a tény, hogy a `Clock` komponens beállít egy időzítőt és minden másodpercben frissíti a felhasználói felületet, a `Clock` komponens saját implementációs részlete kell hogy legyen.

Ideális esetben ezt egyszer szeretnénk megírni és hagyjuk a `Clock`-ot saját magát frissíteni:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Ennek az implementálásához szükségünk lesz egy "állapot"-ra ("state") a `Clock` komponensben.

Az állapot hasonló a prop-okhoz, de privát a komponensre nézve, és teljes mértékben irányított a komponens által.

## Függvény konvertálása osztállyá {#converting-a-function-to-a-class}

Egy függvény komponenst, mint például a `Clock`-ot, ebben az öt lépésben tudsz osztállyá konvertálni:

1. Készíts egy [ES6 osztályt](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ugyanazzal a névvel és terjeszd ki a `React.Component` osztályt.

2. Adj hozzá egy üres `render()` metódust.

3. Helyezd át a a függvény testét a `render()` metódusba.

4. Nevezd át a `props`-ot `this.props`-ra a `render()` testében.

5. Töröld a megmaradt üres függvény deklarációt.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

A `Clock` most már osztályként van definiálva függvény helyett.

A `render` metódus minden alkalommal meg lesz hívva ha egy frissítés történik, de amíg a `<Clock />`-ot ugyanabba a DOM csomópontba rendereljük, addig a `Clock` osztálynak csupán egy példánya lesz használva. Ez lehetővé teszi olyan funkciók hozzáadását mint a helyi állapot és életciklus metódusok.

## Helyi állapot hozzáadása egy osztályhoz {#adding-local-state-to-a-class}

Helyezzük át a `date` objektumot a props-ból a state-be három lépésben:

1) Nevezd át a `this.props.date`-et `this.state.date`-re a `render()` metódusban:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) Adj hozzá egy [osztály konstruktort](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor), ami hozzárendel egy kezdetleges `this.state`-et:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Figyeld meg, hogy hogyan adjuk át az alapkonstruktornak a `props`-ot:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Az osztálykomponensek konstruktorai mindig meg kell hogy hívják az alapkonstruktort a `props` átadásával.

3) Töröld ki a `date` prop-ot a `<Clock />` elemből:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Az időzítő kódját később adjuk vissza a komponensbe.

Az eredmény így néz ki:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

A következőben hagyjuk, hogy a `Clock` maga állítson be egy időzítőt és frissítse magát minden másodpercben.

## Életciklus metódusok hozzáadása egy osztályhoz {#adding-lifecycle-methods-to-a-class}

Sok komponenssel rendelkező alkalmazásokban nagyon fontos, hogy a komponensek által elfoglalt erőforrásokat felszabadítsuk, amikor azok elpusztulnak.

Szeretnénk [felállítani egy időzítőt](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval), amikor a `Clock` először renderelődik DOM-ba. A Reactben ezt hívjuk "előkészítés"-nek, vagy "mounting"-nak.

Azt is szeretnénk, ha az [időzítő törölve lenne](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval), amikor a DOM által készített `Clock` el lesz távolítva. A React-ben ezt hívjuk "leválasztás"-nak vagy "unmounting"-nak.

A komponens oszályban tudunk speciális metódusokat deklarálni, amik lefuttatnak egy kódot amikor a komponens előkészül, vagy leválik:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Ezeket a metódusokat "életciklus" metódusoknak" hívjuk.

A `componentDidMount()` metódus azután fut le, hogy a komponens kimenete a DOM-ba lett renderelve. Ez egy jó hely az időzítő beállítására:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Vedd észre, hogy az időzítő azonosítóját közvetlenül a `this`-re mentjük (`this.timerID`).

Míg a `this.props`-ot maga a React állítja fel, és a `this.state`-nek speciális jelentése van, te nyugodtan adhatsz hozzá manuálisan egyéb mezőket, ha valamit tárolni szeretnél, ami nem vesz részt az adatfolyamban (mint például az időzítő azonosító).

Az időzítőt a `componentWillUnmount()` életciklus metódusban fogjuk leállítani:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Végezetül implementálni fogunk egy `tick()` metódust, amit a `Clock` komponens fog futtatni minden másodpercben.

Ez a `this.setState()` metódus segítségével fogja a komponens helyi állapotát frissíteni.

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Helló, világ!</h1>
        <h2>Az idő {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Az óra most már minden másodpercben kettyen.

Vegyük át gyorsan mi is történik és a metódusok milyen sorrendben vannak meghívva:

1) Amikor a `<Clock />`-ot átadjuk a `ReactDOM.render()` metódusnak, a React meghívja a `Clock` komponens konstruktorát. Mivel a `Clock` komponensnek meg kell jelenítenie a jelenlegi időt, ez inicializál egy `this.state`-et, ami egy objektumot tartalmaz a jelenlegi idővel. Később ezt az állapotot frissítjük.

2) Ezután a React meghívja a `Clock` komponens `render()` metódusát. A React ennek segítségével állapítja meg, hogy mit kell mutatnia a képernyőn. A React ezután frissíti a DOM-ot, hogy az megegyezzen a `Clock` render kimenetével.

3) Amikor a `Clock` kimenet be van illesztve a DOM-ba, a React meghívja a `componentDidMount()` életciklus metódust. Ezen belül a `Clock` komponens megkéri a böngészőt, hogy az állítson fel egy időzítőt, ami minden másodpercben meghívja a komponens `tick()` metódusát.

4) A böngésző minden másodpercben meghívja a `tick()` metódust. Ezen belül, a `Clock` komponens beütemez egy kezelői felület frissítést a `setState()` meghívásával egy objektummal, ami a jelenlegi időt tartalmazza. A `setState()` hívásnak köszönhetően a React tudja, hogy az állapot megváltozott, és újra meghívja a `render()` metódust, hogy megtudja, minek kéne megjelennie a képernyőn. Ezúttal a `this.state.date` a `render()` metódusban más lesz, és ezért a render kimenete tartalmazni fogja a frissítet időt. A React ennek megfelelően frissíti a DOM-ot.

5) Ha a `Clock` komponens el lesz távolítva a DOM-ból, a React meghívja a `componentWillUnmount()` életciklus metódust és az időzítő így megáll.

## Az állapot helyes használata {#using-state-correctly}

Három dolog van, amit tudnod kell a `setState()` metódusról.

### Ne módosítsd az állapotot közvetlenül {#do-not-modify-state-directly}

Például ez nem fogja újrarenderelni a komponenst:

```js
// Helytelen
this.state.comment = 'Helló';
```

Használd helyette a `setState()`-t:

```js
// Helyes
this.setState({comment: 'Helló'});
```

Az egyetlen hely, ahol bármit is hozzárendelhetsz a `this.state`-hez, az a konstruktor.

### Az állapot frissítések lehetnek aszinkronok {#state-updates-may-be-asynchronous}

A React összefoghat egy csomó `setState()` hívást egy szimpla frissítésbe a teljesítmény növelése érdekében.

Mivel a `this.props` és a `this.state` frissülhet aszinkron módon, nem szabad az értékeikre hagyatkoznod a következő állapot kiszámításához.

Például ez a kód lehet, hogy nem fogja tudni frissíteni a számlálót:

```js
// Helytelen
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Hogy ezt kijavítsd, használd a `setState()` másik formáját, ami egy függvényt fogad argumentumként egy objektum helyett. A függvény fogadja az előző állapotot első argumentumként, valamint az előző props-ot másodikként:

```js
// Helyes
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

A fentiekben egy [nyíl függvényt](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) használtunk, de ez működne egy átlagos függvénnyel is:

```js
// Helyes
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Az állapot frissítések egyesítve vannak {#state-updates-are-merged}

Amikor meghívod a `setState()` metódust, a React egyesíti az általad szolgáltatott objektumot a jelenlegi állapottal.

Például az állapotod tartalmazhat számos független változót:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Ezek aztán függetlenül frissíthetőek különálló `setState()` hívásokkal:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Az egyesítés sekély, tehát a `this.setState({comments})` érintetlenül hagyja a `this.state.posts`-ot, de teljesen lecseréli a `this.state.comments`-et.

## Az adat lefelé folyik {#the-data-flows-down}

Sem a felnőtt, sem a gyermek komponens nem tudhatja, hogy egy bizonyos komponens állapotteljes vagy állapot nélküli, és az sem kell hogy érdekelje őket, hogy függvényként vagy osztályként van-e definiálva.

Ezért van az, hogy az állapotot gyakran hívjuk helyinek, vagy egységbe zártnak. Nem hozzáférhető semelyik másik komponensből, csak abból amelyik birtokolja és beállítja.

Egy komponens dönthet úgy, hogy leküldi a saját állapotát prop-ként a gyermek komponenseinek:

```js
<FormattedDate date={this.state.date} />
```

A `FormattedDate` komponens megkapja a `date`-et a props-ban, és nem tudja, hogy az a `Clock` állapotából, a `Clock` prop-jából jött, vagy kézzel lett beírva:

```js
function FormattedDate(props) {
  return <h2>Az idő {props.date.toLocaleTimeString()}.</h2>;
}
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Ezt közismerten "felülről lefelé irányuló", vagy egyirányú adatfolyamnak hívjuk. Egy adott állapotot mindig csak egy bizonyos komponens birtokolhat, és ez az állapot csakis a komponensfában 'alatta lévő' komponensek adataira vagy megjelenésére hathat.

Ha úgy képzelsz el egy komponensfát, mint a prop-ok vízesését, minden komponens állapota olyan, mint egy plusz vízforrás, ami tetszőleges pontokon belecsatlakozik a lefelé haladó áramlatba.

Hogy megmutassuk azt, hogy minden komponens tényleg teljesen izolált, készíthetünk egy `App` komponenst, ami három `<Clock>`-t renderel:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Minden `Clock` beállítja a saját időzítőjét és ezek egymástól függetlenül frissülnek.

Az, hogy egy React komponens állapotteljes vagy állapot nélküli, a saját implementációs részletének tekinthető, ami idővel változhat. Emiatt használhatsz állapot nélküli komponenseket állapotteljes komponenseken belül, és ugyanígy fordítva is.
