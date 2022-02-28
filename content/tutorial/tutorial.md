---
id: tutorial
title: "Tutoriál: Bevezetés a Reactbe"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Ez a tutoriál nem feltételez korábbi React ismereteket.

## Mielőtt elkezdjük a Tutoriált {#before-we-start-the-tutorial}

Ebben a tutoriálban egy kis játékot fogunk készíteni. **Csábító lehet átugrani, mivel nem játékokat készítesz -- de azért adj neki egy esélyt.** A technikák, amiket itt tanulsz, alapvetőek bármilyen React alkalmazáshoz, és ha ezeket sikerül elsajátítanod, úgy sokkal jobban meg fogod érteni a React működését.

>Tipp
>
>Ez a tutoriál azoknak szól, akik a **gyakorlatias tanulást** szeretik. Ha te az alap koncepciók tanulását preferálod, nézd meg a [lépésről-lépésre útmutatónkat](/docs/hello-world.html). Elképzelhető, hogy ezt a tutoriált és az útmutatót egymás kiegészítésének találod majd.

Ez a tutoriál szekciókra van felosztva:

* [Beállítások a Tutoriálhoz](#setup-for-the-tutorial) ad egy **kezdőpontot** a tutoriál követéséhez.
* [Áttekintés](#overview) megtanítja a React **alapokat**: komponensek, propok, és a state (állapot).
* [Játék befejezése](#completing-the-game) segít a **leggyakoribb technikák** elsajátításában a Reactben.
* [Időutazás hozzáadása](#adding-time-travel) egy **átfogóbb képet** ad a React egyedi erősségeiről.

Nem kell minden egyes szekciót egyszerre befejezned, hogy eredményes légy. Próbálj meg olyan messzire eljutni, amennyire tudsz -- akkor is, ha ez egy, vagy két szekció.

### Mit készítünk? {#what-are-we-building}

Ebben a tutoriálban megmutatjuk, hogy hogyan készíthetsz egy tic-tac-toe játékot Reactben.

Itt megnézheted, hogy mit is készítünk: **[Végeredmény](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Ha a kódot nem teljesen érted, vagy ha nem világos a szintaxis, ne aggódj! A tutoriál célja, hogy megértesse veled a Reactet, és annak szintaxisát.

Ajánljuk, hogy mielőtt folytatnád ezt a tutoriált, olvass utána a tic-tac-toe játéknak. Az egyik funkció amit észrevehetsz, az a jobb oldalon lévő számozott lista a játék táblájáról. Ez a lista tartalmazza az összes korábbi lépést, ami a játék menete során folyamatosan frissül.

Ha megismerkedtél a tic-tac-toe játékkal, nyugodtan zárd be. Ez a tutoriál egy egyszerű sablont használ kiindulópontként. A következő lépés felkészíteni téged, hogy elkezdhessük a játék fejlesztését.

### Előfeltételek {#prerequisites}

Feltételezzük, hogy van már valami tapasztalatod a HTML-el és JavaScripttel, de a tutoriál követése akkor sem lehet probléma, ha egy másik programozói nyelvből jössz. Továbbá feltételezzük, hogy olyan programozói koncepciók, mint a függvények, objektumok, tömbök és - egy bizonyos fokig - az osztályok is ismertek számodra.

Ha először szeretnéd átnézni a JavaScriptet, akkor [ezt az útmutatót](https://developer.mozilla.org/hu/docs/Web/JavaScript/a_javascript_ujboli_bemutatasa) ajánljuk. Megjegyzés: Ebben a tutoriálban pár ES6 (a JavaScript jelenlegi verziója) funkciót is használunk, többek között [nyílfunkciókat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [osztályokat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), és [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) utasításokat. A [Babel REPL](babel://es5-syntax-example) segítségével leellenőrízheted, hogy az ES6 mivé lesz lefordítva.

## Beállítások a Tutoriálhoz {#setup-for-the-tutorial}

Ezt a tutoriált kétféleképpen is elvégezheted: kódolhatsz a böngésződből, vagy felállíthatsz egy helyi fejlesztői környezetet.

### 1. Opció: kódolj a böngésződben {#setup-option-1-write-code-in-the-browser}

A leggyorsabban így állhatsz neki!

Először is nyisd meg a **[Kezdő kódot](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** egy új fülön. Az új fül egy új, üres tic-tac-toe táblát és a React kódot kell, hogy mutassa. Ez a React kód az, amit ebben a tutoriálban szerkeszteni fogunk.

Ugord át a második opciót, és a React áttekintéséhez menj az [Áttekintés](#overview) szekcióhoz.

### 2. Opció: helyi fejlesztői környezet {#setup-option-2-local-development-environment}

Ez az opció szabadon választható, és nem kötelező a tutoriál elvégzéséhez!

<br>

<details>

<summary><b>Választható: Instrukciók helyi környezetből való követéshez, a kedvenc szövegszerkesztődhöz</b></summary>

Ahhoz, hogy követni tudd a tutoriált egy általad választott szerkesztőből, ez az opció kicsivel több beállítást igényel. Íme a lépések:

1. Győződj meg róla, hogy a [Node.js](https://nodejs.org/en/) egy jelenlegi verziója telepítve van.
2. Kövesd a [Create React App telepítési útmutatóját](/docs/create-a-new-react-app.html#create-react-app) egy új projekt létrehozásához.

```bash
npx create-react-app my-app
```

3. Törölj minden fájlt az új projekt `src/` mappájában.

> Megjegyzés:
>
>**Ne töröld az egész `src` mappát, csak az eredeti forrásfájlokat a mappában.** A következő lépésben ki fogjuk cserélni az alap forrásfájlokat ebben a projektben.

```bash
cd my-app
cd src

# Ha Macet, vagy Linuxot használsz:
rm -f *

# Vagy ha Windowson vagy:
del *

# Ezután lépj vissza a projekt mappába
cd ..
```

4. Hozz létre egy `index.css` fájlt a `src/` mappában, tartalma pedig legyen [ez a CSS kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. Hozz létre egy `index.js` fájlt a `src/` mappában, tartalma pedig legyen [ez a JS kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Add hozzá a következő három sort az `index.js` fájl tetejéhez, a `src/` mappában:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Ha mindent jól csináltál, és most lefuttatod az `npm start` parancsot a projekt mappájában, és megnyitod a `http://localhost:3000`-t a böngészőben, egy üres tic-tac-toe mezőt kell, hogy láss.

Szintaxis kiemeléshez a következő [instrukciókat](https://babeljs.io/docs/editors) ajánljuk.

</details>

### Segítség, elakadtam! {#help-im-stuck}

Ha bármikor elakadsz, a [közösségi támogatási források](/community/support.html) segíthet. Különösen a [Reactiflux Chat](https://discord.gg/reactiflux) lehet hasznos, ha gyorsan szeretnél segítséget kapni. Ha nem érkezik válasz, vagy még mindig el vagy akadva, nyiss egy issue-t és segítünk.

## Áttekintés {#overview}

Most, hogy minden készen áll, kezdjük a React áttekintésével!

### Mi az a React? {#what-is-react}

A React egy deklaratív, effektív, és rugalmas JavaScript könyvtár, felhasználói felületek készítéséhez. Lehetővé teszi komplex felhasználói felületek összeállítását izolált kódrészletekből, amiket "komponenseknek" hívunk.

A React rendelkezik egy pár komponenstípussal, de most kezdjük a `React.Component` alosztállyal:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>{this.props.name} bevásárlólistája</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Példa használata: <ShoppingList name="Mark" />
```

Nemsokára beszélünk a vicces XML-szerű címkékről is. A komponensek segítségével mondjuk meg a Reactnek, hogy mit szeretnénk látni a képernyőn. Ha az adatunk megváltozik, a React hatékonyan frissíti és újrarendereli a komponensünket.

Itt a ShoppingList egy **React komponensosztály**, vagy **React komponenstípus**. Egy komponens paramétereket fogad, amiket **props**-nak hívunk (angol "properties" rövidítése), és egy nézethierarchiát ad vissza, a `render` metóduson keresztül.

A `render` metódus egy *leírását* adja vissza annak, amit a képernyőn szeretnél látni. A React fogja a leírást, és megjeleníti az eredményt. Pontosabban, a `render` metódus egy **React elem**-et ad vissza, ami egy könnyűsúlyú leírása annak, amit renderelni kell. A legtöbb React fejlesztő egy speciális szintaxist használ, ezt "JSX"-nek hívják, ami könnyebbé teszi ezen struktúrák írását. A `<div />` szintaxist `React.createEelement('div')`-té transzformáljuk kompiláláskor. A fenti példa egyenértékű az alábbival:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 gyermekei ... */),
  React.createElement('ul', /* ... ul gyermekei ... */)
);
```

[Nézd meg a teljes verziót.](babel://tutorial-expanded-version)

Ha érdekel a `createElement()` részletesebb leírása, nézd meg az [API referenciát](/docs/react-api.html#createelement), de ebben a tutoriálban ezt nem fogjuk használni. A JSX-et viszont igen.

A JSX rendelkezik a JavaScript minden erejével. A JSX-be *bármilyen* JavaScript kifejezést tehetsz, kapcsos zárójelek közé. Minden React elem egy JavaScript objektum, amit változókban tárolhatsz, vagy körbeküldhetsz a programodban.

A fenti `ShoppingList` komponens csak beépített DOM komponenseket renderel, mint a `<div />` és az `<li />`. De összeállíthatsz és renderelhetsz egyedi React komponenseket is. Például a `<ShoppingList />` írásával utalhatunk az egész bevásárlólistára. Minden React komponens elzártan és függetlenül operálhat; ez lehetővé teszi számodra komplex felhasználói kezelőfelületek építését egyszerű komponensekből.

### Kezdő kód ellenőrzése {#inspecting-the-starter-code}

Ha a tutoriálon a **böngésződből** fogsz dolgozni, nyisd meg ezt a kódot egy új fülön: **[Kezdő kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Ha **helyi környezetben** fogsz dolgozni, nyisd meg a `src/index.js` fájlt a projekt mappádban (már korábban szerkesztetted a fájlt a [beállítások](#setup-option-2-local-development-environment) részben).

Ez a Kezdő kód az alapja annak, amit készítünk. A CSS stíluslapot megadtuk, hogy csak a Reactre és a tic-tac-toe játék programozására kelljen fókuszálnod.

A kód tanulmányozásával megállapíthatod, hogy háromféle React komponensünk van:

* Square
* Board
* Game

A Square komponens egy egyszerű `<button>`-t renderel, amíg a Board 9 Square-t. A Game komponens egy játéktáblát renderel helyőrző értékekkel, amiket később módosítunk. Jelenleg nincs egyetlen interaktív komponens sem.

### Adattovábbítás propokkal {#passing-data-through-props}

Hogy végre bemocskoljuk a kezünk, küldjünk adatot a Board komponensből a Square komponensnek.

Erősen ajánljuk, hogy minden kódot kézzel írj a tutoriál során, és ne használj másolás/beillesztést. Ez hozzá fog járulni ahhoz, hogy jobban megértsd mi is történik, és később minden magától jön majd.

A Board `renderSquare` metódusában változtasd meg a kódot, hogy egy `value` propot tudj küldeni a Square komponensnek:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

Változtasd meg a Square komponens `render` metódusát úgy, hogy átírod a `{/* TODO */}` részt `{this.props.value}`-ra:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Előtte:

![React Devtools](../images/tutorial/tictac-empty.png)

Utána: Egy számot kell láss minden négyzetben a renderelés során.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Gratulálunk! Sikeresen "leküldtél egy propot" egy szülő Board komponensből egy gyermek Square komponensnek. React alkalmazásokban a propok leküldésével tudsz információt mozgatni szülőktől gyermek komponenseknek.

### Készíts egy interaktív komponenst {#making-an-interactive-component}

Töltsük ki a Square komponenst egy "X"-szel, rákattintás esetén.
Először is változtasd meg a button címkét a `render()` metódus visszatérésében erre:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <button className="square" onClick={function() { alert('kattintás'); }}>
=======
      <button className="square" onClick={function() { console.log('click'); }}>
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42
        {this.props.value}
      </button>
    );
  }
}
```

<<<<<<< HEAD
Ha most kattintasz a Square-re, egy értesítést kell láss a böngésződben.
=======
If you click on a Square now, you should see 'click' in your browser's devtools console.
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

>Megjegyzés
>
>A kevesebb gépelés és a [`this` félreérthető viselkedésének](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) elkerülése érdekében, innentől a [nyílfunkció szintaxist](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) fogjuk használni az eseménykezelőkhöz:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
<<<<<<< HEAD
>      <button className="square" onClick={() => alert('kattintás')}>
=======
>      <button className="square" onClick={() => console.log('click')}>
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
<<<<<<< HEAD
>Vedd észre, hogy az `onClick={() => alert('kattintás')}` segítségével *egy függvényt* küldünk le propként `onClick` néven. A React csak kattintás után fogja meghívni ezt a függvényt. Gyakori hiba csak ennyit írni `onClick={alert('kattintás')}`, és elfelejteni a `() =>` részt. Ez meghívná a függvényt a komponens minden újrarenderelésénél.
=======
>Notice how with `onClick={() => console.log('click')}`, we're passing *a function* as the `onClick` prop. React will only call this function after a click. Forgetting `() =>` and writing `onClick={console.log('click')}` is a common mistake, and would fire every time the component re-renders.
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

Következő lépésként azt próbáljuk elérni, hogy a Square komponens "emlékezzen" arra, hogy rá lett kattintva, és töltse ki magát egy "X"-szel. Ahhoz, hogy komponensek "emlékezni" tudjanak, **state**-t (állapotot) használnak.

React komponensekben állapotot a `this.state` segítségével deklarálhatunk a konstruktorban. A `this.state` állapotra úgy kell tekintenünk, hogy az privát legyen abban az osztályban, amiben az definiálva lett. Tároljuk a Square jelenlegi értékét a `this.state` objektumban, és változtassuk azt meg, ha a Square-re kattintunk.

Először is adjunk hozzá egy konstruktort az osztályhoz, hogy inicializáljuk az állapotot:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
<<<<<<< HEAD
      <button className="square" onClick={() => alert('kattintás')}>
=======
      <button className="square" onClick={() => console.log('click')}>
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42
        {this.props.value}
      </button>
    );
  }
}
```

>Megjegyzés
>
>[JavaScript osztályokban](https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Classes) mindig meg kell hívnod a `super` metódust, amikor definiálod a konstruktort egy alosztályban. Minden React komponensosztály, ami rendelkezik egy `constructor`-ral, egy `super(props)` hívással kell, hogy kezdődjön.

Most pedig változtassuk meg a Square `render` metódusát, hogy az állapot jelenlegi értékét mutassa:

* Cseréld ki a `this.props.value`-t `this.state.value`-ra, a `<button>` címkében.
* Cseréld ki az `onClick={...}` eseménykezelőt erre: `onClick={() => this.setState({value: 'X'})}`.
* Tedd a `className` és `onClick` propokat külön sorokba, a jobb olvashatóság érdekében.

Ezen változtatások után a `<button>` címke, amit a Square `render` metódusa visszaad, így néz ki:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Amikor a Square komponens `render` metódusában az `onClick` kezelő meghívja a `this.setState` metódust, a React  minden alkalommal újra fogja renderelni a Square komponenst, amikor a `<button>` elemre rákattintunk. A frissítés után a Square `this.state.value` értéke `'X'` lesz, tehát egy `X`-szet fogunk látni a játéktáblán. Ha bármelyik Square-re kattintasz, egy `X` kell hogy megjelenjen.

Amikor a `setState` metódust meghívjuk egy komponensben, a React automatikusan frissíti annak minden gyermek komponensét is.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Fejlesztői eszközök {#developer-tools}

A React Devtools fejlesztői eszközök kiegészítő [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)-hoz és [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)-hoz segít a React komponens fa vizsgálatában, a böngésződ fejlesztői eszközeivel.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

A React DevTools segít ellenőrizni a React komponenseid propjait és állapotait (state).

A React DevTools telepítése után kattints bármelyik elemre jobb egérgombbal az oldalon, majd kattints a "Vizsgálat"-ra a fejlesztői eszközök megnyitásához. Ekkor a React fülek ("⚛️ Components" és "⚛️ Profiler") megjelennek a jobb oldalon utolsó két fülként. A komponensfa vizsgálatához használd a "⚛️ Components" fület.

**Ha azonban a CodePen-en dolgozol, szükség lesz pár extra lépésre ahhoz, hogy egy működjön:**

1. Jelentkezz be, vagy regisztrálj, és erősítsd meg az e-mailed (spam elkerülése érdekében).
2. Kattints a "Fork" gombra.
3. Kattints a "Change View"-ra, majd válaszd a "Debug mode"-t.
4. Az új megnyíló fülön, a fejlesztői eszközökben lesz egy React fül.

## Játék befejezése {#completing-the-game}

Kész vagyunk a tic-tac-toe játék alap építőelemeivel. Egy teljes játékhoz azonban az "X"-szek és "O"-k elhelyezésének a váltakozására van szükségünk a játéktáblán, és szükségünk van egy módra, hogy megállapíthassuk a győztest.

### Állapot felemelése {#lifting-state-up}

Jelenleg minden Square komponens külön kezeli a játék állapotát. A győztes ellenőrzéséhez mind a 9 négyzet értékét egy helyen fogjuk kezelni.

Azt gondolhatnánk, hogy a Board komponens csak egyszerűen végigkérdezi minden Square állapotát. Bár ez lehetséges a Reactben, nem támogatjuk, mert így a kód nehezen érthetővé válik, fogékony lesz hibákra, és nehéz lesz újraírni. Ehelyett a legjobb módszer az, ha a játék állapotát a szülő Board komponensben tároljuk minden Square komponens helyett. A Board komponens meg tudja mondani minden Square komponensnek mit mutasson propok leküldésével, [ahogyan egy számot is leküldtünk minden Square komponensnek](#passing-data-through-props)

**Több gyermekből való adatgyűjtéshez, vagy ahhoz, hogy két gyermekkomponens kommunikálni tudjon egymással, az állapotot, amin a komponensek osztozni fognak, egy közös szülőkomponensben kell, hogy deklaráld. A szülőkomponens ezután le tudja küldeni a megosztott állapotot a gyermekeknek propok segítségével; ez szinkronizálja a gyermekeket egymással és a szülő komponensükkel.**

A helyi állapot felemelése egy szülő komponensbe gyakori tevékenység, amikor React komponenseket írunk újra. -- Ragadjuk meg az alkalmat, és próbáljuk ezt ki gyakorlatban.

Adj hozzá egy konstruktort a Board komponenshez, és állítsd be a kezdő állapotot, hogy az tartalmazzon egy tömböt 9 null értékkel, amik a 9 négyzetnek felelnek meg:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }
```

Amikor később a táblát töltjük ki, a `this.state.sqares` tömb valahogy így fog kinézni:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

A Board komponens `renderSquare` metódusa jelenleg így néz ki:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Kezdetben, ahhoz számokat mutassunk 0-tól 8-ig minden Square komponensben, [leküldtük a `value` propot](#passing-data-through-props) a Board komponensből. Egy másik korábbi lépésben lecseréltük a számokat "X" jelekre, amit a [Square komponens saját állapota határozott meg](#making-an-interactive-component). A Square komponens jelenleg ezért nem veszi figyelembe a `value` prop értékét, amit a Board komponens küld neki.

Most megint igénybe fogjuk venni a propküldési mechanizmust. Úgy módosítjuk a Board komponenst, hogy az értesítsen minden Square komponenst annak jelenlegi értékéről (`'X'`, `'O'`, vagy `null`). A `squares` tömböt már korábban definiáltuk a Board komponens konstruktorában, és most úgy módosítjuk a Board komponens `renderSquare` metódusát, hogy az ebből a tömbből olvasson:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Így most minden Square komponens fogadni fog egy `value` propot, ami lehet `'X'`, `'O'`, vagy üres négyzetek esetében `null`.

A következőben meg kell változtatnunk mi történjen, ha a Square komponensre rákattintanak. Most már a Board komponens kezeli melyik négyzetek vannak kitöltve. Valahogy el kell érnünk, hogy a Square komponens frissítse a Board állapotát. Mivel az állapot privát arra a komponensre nézve amiben az definiálva van, a Board állapota nem frissíthető közvetlenül a Square komponensből.

Ehelyett leküldünk egy függvényt a Board komponensből a Square-nek, és hagyjuk, hogy a Square meghívja ezt a függvényt, amikor egy négyzetre kattintanak. Ehhez meg kell változtatnunk a `renderSquare` metódust a Board komponensben:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Megjegyzés
>
>Az olvashatóság érdekében a visszaküldött elemet több sorba tördeljük, és hozzáadunk zárójeleket is, hogy a JavaScript ne adjon pontosvesszőt a `return` után, ezzel elrontva a kódunkat.

Így már két propot küldünk le a Board-ból a Square-nek: `value` és `onClick`. Az `onClick` prop egy függvény, amit a Square meg tud hívni, ha rákattintanak. A Square komponensen a következő változásokat eszközöljük:

* Cseréld le a `this.state.value`-t `this.props.value`-ra a Square `render` metódusában
* Cseréld le a `this.setState()`-t `this.props.onClick()`-re a Square `render` metódusában
* Töröld a `constructor`-t  a Square komponensből, mivel az többé nem követi a játék állását

A Square komponens így néz ki a változtatások után:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Amikor a Square komponensre rákattintanak, az `onClick` függvény meg lesz hívva, amit a Board komponens szolgáltat. Íme egy összefoglaló, hogy ez hogyan is lehetséges:

<<<<<<< HEAD
1. Az `onClick` prop a beépített DOM `<button>` komponensben közli a Reacttel, hogy állítson fel egy eseményfigyelőt kattintásra.
2. Amikor a gombra kattintanak, a React meghívja az `onClick` eseményfigyelőt, ami a Square komponens `render()` metódusában definiálva lett.
3. Ez az eseményfigyelő meghívja a `this.props.onClick()` függvényt. A Square `onClick` propja a Board komponensben lett definiálva.
4. Mivel a Board leküldte az `onClick={() => this.handleClick(i)}` propot a Square komponensnek, a Square meghívja a `this.handleClick(i)` függvényt, ha rákattintanak.
5. Mivel a `handleClick()` metódust még nem definiáltuk, a kódunk összeomlik. Ha most kattintasz egy négyzetre, egy piros hibát kell látnod a képernyőn, ami valami olyat mond, hogy "this.handleClick is not a function", azaz "a this.handleClick nem függvény".
=======
1. The `onClick` prop on the built-in DOM `<button>` component tells React to set up a click event listener.
2. When the button is clicked, React will call the `onClick` event handler that is defined in Square's `render()` method.
3. This event handler calls `this.props.onClick()`. The Square's `onClick` prop was specified by the Board.
4. Since the Board passed `onClick={() => this.handleClick(i)}` to Square, the Square calls the Board's `handleClick(i)` when clicked.
5. We have not defined the `handleClick()` method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like "this.handleClick is not a function".
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

>Megjegyzés
>
>A `<button>` gombelem `onClick` attribútuma speciális jelentéssel bír a React számára, mivel ez egy beépített komponens. Egy egyedi komponens esetén, mint például a Square, a megnevezés tőled függ. A Square `onClick` propjának más nevet is adhatunk, vagy akár a Board `handleClick` metódusának, és a kód ugyanúgy működne. A Reactben, közös megállapodás alapján `on[Event]`-nek hívjuk azokat a propokat, amik eseményeket képviselnek és `handle[Event]`-nek azokat a metódusokat amik eseményeket kezelnek.

Ha rákattintunk egy Square komponensre, egy hibát kell hogy kapjunk, mivel a `handleClick` még nincs definiálva. Most hozzáadjuk a `handleClick` metódust a Board osztályhoz:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Következő játékos X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Ezen változtatások után újra rá tudunk kattintani a Square komponensekre, hogy kitöltsük őket, ahogy eddig is. Azonban az állapot most már a Board komponensben van tárolva ahelyett, hogy minden Square külön tárolná a saját állapotát. Ha a Board állapota megváltozik, a Square komponens automatikusan újra fog renderelni. Minden négyzet állapotának a Board komponensben való tárolása lehetővé teszi, hogy a jövőben megállapítsuk a győztest.

Mivel a Square komponens többé nem kezel állapotot, a Square komponens most már csak a Board komponenstől fogad értékeket, és értesíti azt, ha rákattintanak. React nyelven ez azt jelenti, hogy a Square komponensek  **kontrollált komponensek**. A Board komponens teljes mértékben irányítja őket.

Vedd észre, hogy a `handleClick` metódusban meghívjuk a `.slice()` metódust a tömbön, hogy a `squares` tömb egy másolatát módosítsuk, ne az eredetit. A következő szekcióban elmagyarázzuk, hogy miért készítjük ezt a `squares` tömb másolatot.

### Megváltoztathatatlanság fontossága {#why-immutability-is-important}

<<<<<<< HEAD
Az előző kódpéldában azt tanácsoltuk, hogy a `.slice()` metódussal készítsünk egy `squares` tömb másolatot, hogy ne az eredeti tömböt módosítsuk. Most megvitatjuk a megváltoztathatatlanságot, és hogy miért fontos ennek megtanulása.
=======
In the previous code example, we suggested that you create a copy of the `squares` array using the `slice()` method instead of modifying the existing array. We'll now discuss immutability and why immutability is important to learn.
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

Adatváltoztatásra két általános megközelítés létezik. Az első megközelítés az, hogy *közvetlenül megváltoztatjuk* az adat értékét. A második megközelítés lecserélni az adatot egy másolattal, ami tartalmazza a kívánt változtatásokat.

#### Adatváltozás mutációval {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'György'};
player.score = 2;
// A player most {score: 2, name: 'György'}
```

#### Adatváltozás mutáció nélkül {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'György'};

var newPlayer = Object.assign({}, player, {score: 2});
// A player változatlan, a newPlayer pedig {score: 2, name: 'György'}

// Vagy ha használod az objektum kiterítési szintaxisjavaslatot, ezt is írhatod:
// var newPlayer = {...player, score: 2};
```

A végeredmény ugyanaz, de azzal, hogy nem közvetlenül változtatjuk meg az eredeti (vagy eredeti alá rendelt) adatot, hasznos lehet a lent leírt okokból.

#### Komplex tulajdonságok válnak egyszerűvé {#complex-features-become-simple}

A megváltoztathatatlansággal bonyolult tulajdonságok válnak egyszerűen implementálhatóvá. Ebben a tutoriálban később implementálni fogunk egy "időutazó" funkciót, ami lehetővé teszi számunkra a tic-tac-toe játék lépéstörténetének tanulmányozását, és abban való korábbi lépésre való "visszaugrást". Ez a funkció nem egyedi játékokra -- a visszavonási képesség, vagy újracsinálni bizonyos tevékenységeket, egy gyakori követelmény alkalmazásokban. A közvetlen adatváltozás elkerülésével érintetlenül tudjuk tartani a játék lépéstörténetének korábbi verzióit, és ezt később újrahasznosíthatjuk.

#### Változások észlelése {#detecting-changes}

A változások észlelése megváltoztatható objektumokban nehéz feladat, mivel azok közvetlenül módosíthatóak. Ez az észlelés megköveteli a megváltoztatható objektumtól, hogy azt összehasonlítsuk saját maga korábbi másolataihoz és a teljes objektumfa bejárását.

A változások észlelése egy megváltoztathatatlan objektum esetén jelentősen egyszerűbb. Ha a megváltoztathatatlan objektum, amire referálunk különbözik a korábbitól, akkor az objektum megváltozott.

#### Újrarenderelés megállapítása Reactben {#determining-when-to-re-render-in-react}

A megváltoztathatatlanság legfőbb előnye, hogy az segít a Reactben _tiszta komponensek_ építésében. A megváltoztathatatlan adat könnyen megállapíthatja, ha valamilyen változás történt, ami azt segít meghatározni, hogy egy komponensnek újra kell-e renderelnie.

A `shouldComponentUpdate()` metódusról, és hogy hogyan készíts *tiszta komponenseket*, a [Teljesítmény optimalizálása](/docs/optimizing-performance.html#examples) olvasásával tanulhatsz többet.

### Függvénykomponensek {#function-components}

Most átalakítjuk a Square komponenst egy **függvénykomponenssé**.

A Reactben a **függvénykomponensek** egy egyszerűbb módja komponensek írásának, amik csak egy `render` metódust tartalmaznak, és nincs saját állapotuk. Ahelyett hogy osztályokat definiálunk, amik a `React.Component` kiterjesztései, írhatunk egy függvényt, ami veszi a `prop`-okat inputként, és azt adja vissza, amit renderelni kéne. A függvénykomponensek írása kevésbé időigényes, és sok komponens kifejezhető így.

Cseréld le a Square osztályt erre a függvényre:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Lecseréltük a `this.props`-t `props`-ra mindkét helyen, ahol megjelent.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Megjegyzés
>
>Amikor módosítottuk a Square függvényt egy függvénykomponensre, az `onClick={() => this.props.onClick()}`-t is megváltoztattuk egy rövidebb `onClick={props.onClick}` formára (vedd észre *mindkét* zárójel hiányát).

### Szerepváltás {#taking-turns}

Most pedig ki kell javítanunk egy egyértelmű hibát a tic-tac-toe játékunkban: "O"-kat még nem lehet felvinni a táblára.

Most beállítjuk az "X"-szet alapértelmezett első lépésnek. Az alapértelmezett lépést a kezdő állapot módosításával állíthatjuk be, a Board konstruktorában:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Minden alkalommal, mikor egy játékos lép, az `xIsNext` (egy boolean) értékét váltogatjuk, hogy meg tudjuk határozni melyik játékos következik, és hogy a játék állása el legyen mentve. Módosítsuk a Board `handleClick` metódusát, hogy váltogassa az `xIsNext` értékét:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Ezzel a változtatással, az "X"-szek és az "O"-k most már váltakoznak. Próbáld ki!

Változtassuk meg a "státusz" szöveget is a Board `render` metódusában, hogy azt is mutassa, hogy ki a következő játékos:

```javascript{2}
  render() {
    const status = 'Következő játékos: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // más változás nincs
```

Ezen változtatások után a Board komponensed így kell hogy kinézzen:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Következő játékos ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Győztes kihirdetése {#declaring-a-winner}

Most hogy már mutatjuk ki a következő játékos, azt is mutatnunk kéne, ha a játékot valaki megnyeri, és nincs több lépésre szükség. Másold be ezt a segédfüggvényt a fájl végére:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Adott egy 9 négyzetet tartalmazó tömb, ez a függvény leellenőrzi, hogy van-e győztes, és ennek megfelelően visszaadhat `'X'`-szet, `'O'`-t, vagy `null` értéket.

A `calculateWinner(squares)` függvényt meghívjuk a Board `render` metódusában, hogy megtudjuk van-e győztes. Ha egy játékos nyert, akkor mutathatunk valami olyan szöveget mint: "Győztes: X" vagy "Győztes: O". Cseréljük le a `status` deklarációját is a Board `render` metódusában erre a kódra:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Győztes: ' + winner;
    } else {
      status = 'Következő játékos ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // más változás nincs
```

Most már megváltoztathatjuk a Board `handleClick` metódusát is, hogy az előbb térjen vissza, ignorálva a kattintásokat, ha valaki megnyerte a játékot, vagy ha a Square már ki van töltve:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Gratulálunk! Most már van egy működő tic-tac-toe játékod. És közben megtanultad a React alapjait is. Szóval igazából itt *te vagy* az igazi nyertes.

## Időutazás hozzáadása {#adding-time-travel}

Egy utolsó gyakorlatként tegyük lehetővé az "időutazást" korábbi játékállásokhoz.

### Lépéstörténet tárolása {#storing-a-history-of-moves}

Ha mutáltuk (közvetlen megváltoztatás) volna a `squares` tömböt, az időutazás implementálása nagyon bonyolult lenne.

Mi azonban a `slice()` metódust használtuk új `squares` tömb másolatok létrehozásához minden lépésnél, és így [megváltoztathatatlanként kezeltük azt](#why-immutability-is-important). Ez lehetővé teszi majd a `squares` tömb minden korábbi verziójának eltárolását, és hogy navigálni tudjunk a már megtörtént lépések között.

A korábbi `squares` tömböket egy új, `history` nevű tömbben fogjuk tárolni. A `history` tömb a tábla minden állását tartalmazza az elsőtől az utolsó lépésig, és így néz ki:

```javascript
history = [
  // Az első lépés előtt
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // Az első lépés után
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // A második lépés után
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Most el kell döntenünk, hogy melyik komponens birtokolja a `history` állapotot.

### Állapot ismételt felemelése {#lifting-state-up-again}

Szeretnénk, ha a legfelsőbb szintű Game komponens mutatná a korábbi lépések listáját. Ehhez hozzá kell hogy férjen a `history`-hoz, szóval a `history` állapotot a legfelsőbb szintű Game komponensbe helyezzük.

A `history` állapot Game komponensben való elhelyezésével eltávolíthatjuk a `squares` állapotot annak gyermekkomponenséből, a Board komponensből. Ugyanúgy, ahogy a Square komponensből ["felemeltük az állapotot"](#lifting-state-up) a Board komponensbe, most felemeljük azt a Board-ból a legfelsőbb szintű Game komponensbe. Ez teljes felügyeletet ad a Game komponensnek a Board adatai felett, és utasíthatja a Board komponenst korábbi állások renderelésére a `history`-ból.

Először is beállítjuk a kezdeti állapotot a Game komponens konstruktorában:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* státusz */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Ezután beállítjuk, hogy a Board komponens a Game komponensből fogadja a `squares` és `onClick` propokat. Mivel már van egy egyszerű kattintáskezelőnk a Board-ban több Square komponenshez, meg kell mondanunk minden egyes Square komponens pozícióját is az `onClick` kezelőnek, hogy jelezzük melyik Square-re kattintottak. Íme a szükséges lépések a Board komponens átalakításához:

* Töröld a `constructor`-t a Board-ban.
* Cseréld le a `this.state.squares[i]`-t `this.props.squares[i]`-re a Board `renderSquare` metódusában.
* Cseréld le a `this.handleClick(i)`-t `this.props.onClick(i)`-re a Board `renderSquare` metódusában.

A Board komponens most így néz ki:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Győztes: ' + winner;
    } else {
      status = 'Következő játékos ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Frissítsük a Game komponens `render` metódusát, hogy az a legfrissebb history bejegyzést használja a játék státuszának megjelenítéséhez:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Győztes: ' + winner;
    } else {
      status = 'Következő játékos ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Mivel most már a Game komponens rendereli a játék státuszát, eltávolíthatjuk az ennek megfelelő kódot a Board `render` metódusából. Az újraírás után a Board `render` metódusa így néz ki:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Utoljára pedig át kell helyeznünk a `handleClick` metódust a Board komponensből a Game komponensbe. Módosítanunk is kell a `handleClick`-et, mivel a Game komponens állapota másként van strukturálva.
A Game `handleClick` metódusában összefűzzük a history bejegyzéseket a `history` állapotba.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Megjegyzés
>
>A tömb `push()` metódusával ellentétben, amit már korábbról ismerhetsz, a `concat()` metódus nem módosítja a korábbi tömböt, szóval ezt részesítjük előnyben.

Ezen a ponton a Board komponensnek csak a `renderSquare` és `render` metódusokra van szüksége. A játék állapota és a `handleClick` metódusok a Game komponensben kell legyenek.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Korábbi lépések mutatása {#showing-the-past-moves}

Mivel feljegyezzük a tic-tac-toe játék lépéstörténetét, most már mutatni tudjuk a játékosnak a korábbi lépések listáját.

Korábban megtanultuk, hogy a React elemek elsőosztályú JavaScript objektumok; körbe tudjuk őket küldözgetni az alkalmazásban. Hogy több elemet tudjunk renderelni Reactben, használhatunk egy tömböt, ami React elemeket tartalmaz.

A JavaScriptben a tömbök rendelkeznek egy [`map()` metódussal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), amit gyakran használnak adatok más adatra leképezésére, mint például:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

A `map` metódus használatával le tudjuk képezni a lépéstörténetünket React elemekre, amik gombokat képviselnek a képernyőn, és egy gomblistára, amikkel "ugrálni" tudunk korábbi lépésekre.

Most pedig `képezzük le` a `history`-t a Game komponens `render` metódusában:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Menj ide, lépés: #' + move :
        'Menj a játék kezdetéhez';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Győztes: ' + winner;
    } else {
      status = 'Következő játékos ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

<<<<<<< HEAD
A tic-tac-toe játék lépéstörténetében minden lépéshez létrehozunk egy `<li>`-t, ami tartalmaz egy `<button>` gombot. A gomb rendelkezik egy `onClick` kezelővel, ami meghív egy `this.jumpTo()` metódust. A `jumpTo()` metódust még nem implementáltuk. Egyenlőre egy listát kell látnunk a lépésekről, amik már megtörténtek a játék során, és egy figyelmeztetést a fejlesztői eszközözök konzolban, ami azt mondja:
=======
As we iterate through `history` array, `step` variable refers to the current `history` element value, and `move` refers to the current `history` element index. We are only interested in `move` here, hence `step` is not getting assigned to anything.

For each move in the tic-tac-toe game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Beszéljük meg, mit is jelent a fenti figyelmeztetés.

### Azonosító kulcs választása {#picking-a-key}

Amikor egy listát renderelünk, a React minden renderelt listaelemről tárol valamennyi információt. Amikor frissítünk egy listát, a Reactnek tudnia kell, hogy mi változott. Hozzá tudtunk adni, eltávolítani vagy megváltoztatni a lista sorrendjét, vagy megváltoztatni a lista elemeit.

Képzeld el az átmenetet erről

```html
<li>Aladár: 7 feladat van vissza</li>
<li>Balázs: 5 feladat van vissza</li>
```

erre

```html
<li>Balázs: 9 feladat van vissza</li>
<li>Klaudia: 8 feladat van vissza</li>
<li>Aladár: 5 feladat van vissza</li>
```

Ha valaki ezt olvasná a frissített számlálók mellett, valószínűleg azt mondaná, hogy Aladár és Balázs fel lett cserélve, és Klaudia be lett illesztve Aladár és Balázs közé. Azonban a React egy számítógépes program, nem érti mit is szerettünk volna elérni. Mivel a React nem ismeri a szándékainkat, minden listabejegyzésnek meg kell adnunk egy *kulcs* tulajdonságot, hogy az meg tudja különböztetni a bejegyzéseket annak testvéreitől. Egy alternatíva lehet a sztringek `aladar`, `balazs`, `klaudia` használata. Ha az adatokat egy adatbázisból jelenítenénk meg, akkor használhatnánk Aladár, Balázs és Klaudia adatbázis azonosítókulcsát egyedi kulcsnak.

```html
<li key={user.id}>{user.name}: {user.taskCount} feladat van vissza</li>
```

Mikor egy listát renderelünk újra, a React veszi minden lista elemének a kulcsát, és megkeresi az előző listaelemet a megegyező kulccsal. Ha a jelenlegi lista tartalmaz egy kulcsot, amit korábban nem, a React készít egy új komponenst. Ha a jelenlegi listában már nincs jelen egy korábban létező kulcs, a React törli az előző komponenst. Ha két kulcs egyezik, a komponens mozgatva lett. A kulcsok azonosítanak minden komponenst a Reactnek, ami lehetővé teszi annak az állapotok kezelését újrarenderelések között. Ha egy komponens kulcsa megváltozik, a komponens törölve lesz és újra létre lesz hozva, egy új állapottal.

A `key` egy speciális fenntartott tulajdonság a Reactben (a `ref`-el egyetemben, ami egy sokkal haladóbb funkció). Mikor egy új elemet készítünk, a React kivonja a `key` tulajdonságot, és közvetlenül eltárolja azt a visszaadott elemen. Ha úgy is tűnik, hogy a `key` a `prop`-ok közé tartozik, a `key`-re nem tudunk referálni a `this.prop.key`-vel. A React automatikusan használja a `key`-t, hogy eldöntse melyik komponenseket frissítse. Egy komponens nem tud annak `key` tulajdonságáról érdeklődni.

**Erősen ajánlott, hogy dinamikus listák esetében rendes kulcsokat rendelj hozzá a listaelemekhez.** Ha nem rendelkezel egy megfelelő kulccsal, fontold meg az adatod átalakítását, hogy létezzen megfelelő kulcs.

Ha nincs kulcs megadva, a React egy figyelmeztetést fog adni, és a tömb indexét fogja megadni alapértelmezett kulcsként. A tömb indexének kulcsként való használata problémás lehet, ha egy lista újra lesz rendezve, vagy új elem lesz hozzáadva, vagy egy elem lesz törölve. A `key={i}` határozott megadása elnémítja a figyelmeztetést, de ugyanaz a probléma áll majd fenn, mint a tömbindexek esetében, és a legtöbb esetben nem ajánlott.

A kulcsoknak nem kell globálisan egyedinek lenniük; csupán komponensek, és azok testvérei között kell, hogy egyediek legyenek.


### Időutazás implementálása {#implementing-time-travel}

A tic-tac-toe játék lépéstörténetében minden korábbi lépésnek van egy egyedi azonosítója: ez a lépés sorszáma. A lépések soha nincsenek átrendezve, törölve, beillesztve más lépések közé, szóval ebben az esetben tömbindex használata kulcsként biztonságosnak számít.

A Game komponens render metódusában hozzá tudjuk adni a kulcsot így `<li key={move}>` és a React figyelmeztetése a kulcsokról el kell, hogy tűnjön:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Menj erre ide, lépés: #' + move :
        'Menj a játék kezdetéhez';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Bármelyik listabejegyzés gombjára kattintva egy hiba ugrik fel, mert a `jumpTo` metódus nincs definiálva. Mielőtt implementálnánk a `jumpTo` metódust, adjuk hozzá a `stepNumber`-t a Game komponens állapotához, hogy jelezzük melyik lépést látjuk éppen.

Először is add hozzá a `stepNumber: 0`-t a kezdeti állapothoz a Game `contructor`-ban:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Ezután definiáljuk a `jumpTo` metódust a Game komponensben, hogy frissíteni tudjuk a `stepNumber`-t. Valamint az `xIsNext` értékét is igazra állítjuk, ha egy páros számot változtatunk:

```javascript{5-10}
  handleClick(i) {
    // ez a metódus nem változott
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // ez a metódus nem változott
  }
```

<<<<<<< HEAD
Most pedig egy pár változtatást eszközölünk a Game `handleClick` metódusában, egy négyzetre kattintáskor lesz meghívva.
=======
Notice in `jumpTo` method, we haven't updated `history` property of the state. That is because state updates are merged or in more simple words React will update only the properties mentioned in `setState` method leaving the remaining state as that is. For more info **[see the documentation](/docs/state-and-lifecycle.html#state-updates-are-merged)**.

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.
>>>>>>> 6bd09fe682e18ccd7747fcd7798fa8fb4d3edc42

A hozzáadott `stepNumber` állapot most már tükrözi a felhasználó által látott lépést. Ha lépünk egyet, frissítenünk kell a `stepNumber`-t azzal, hogy hozzáadjuk azt a `this.setState` argumentumához: `stepNumber: history.length`. Ez azt biztosítja, hogy ne ragadjunk le mindig ugyanannak a lépésnek a mutatásával minden új lépés után.

Cseréljük le a `this.state.history` olvasását is erre: `this.state.history.slice(0, this.state.stepNumber + 1)`. Ez azt biztosítja, hogy ha "visszautazunk az időben", és egy újat lépünk, akkor eltekintünk a "jövő" lépéseitől, amik így már helytelenek lennének.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Végezetül módosítsuk a Game komponens `render` metódusát, hogy a mindig legutolsó lépés renderelése helyett, inkább a kiválasztott lépést renderelje, amit `stepNumber` határoz meg:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // más változás nincs
```

Ha most rákattintunk bármelyik lépésre a játéktörténetben, a tic-tac-toa tábla azonnal úgy frissül, hogy azt az állást mutassa, ami a rákattintott lépés után történt.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Összegzés {#wrapping-up}

Gratulálunk! Készítettél egy tic-tac-toe játékot ami:

* Lehetővé teszi a tic-tac-toe játszását,
* Kihirdeti a győztest,
* Elmenti a játék lépéstörténetét a játék közben,
* Lehetővé teszi a játékosoknak újranézni a játéktábla korábbi állásait.

Szép munka! Reméljük, hogy ezek után te is úgy érzed, sikerült megragadnod a React működésének lényegét.

Nézd meg a végeredményt itt: **[Végeredmény](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

Ha van egy kis extra időd, vagy szeretnéd gyakorolni a React új képességeidet, íme pár ötlet a tic-tac-toe játék tökéletesítéséhez, nehézség szerint növekvő sorrendben:

1. Mutasd minden lépés pozícióját az (oszlop, sor) formátumban a lépéstörténet listában.
2. Tedd félkövérré az aktuálisan kiválasztott elemet a lépés listában.
3. Írd át a Board komponenst úgy, hogy az két ciklust használjon négyzetek készítéséhez belekódolás helyett.
4. Adj hozzá egy kapcsoló gombot, ami lehetővé teszi a lépések szortírozását növekvő vagy csökkenő sorrendben.
5. Ha valaki nyer, emeld ki a három négyzetet, ami lehetővé tette a játékosnak a nyerést.
6. Ha senki sem nyer, mutass egy üzenetet döntetlen eredményről.

Ezen a tutoriálon keresztül olyan React koncepciókat érintettünk mint elemek, komponensek, propok és állapot. Ezen témák részletesebb magyarázatához nézd meg a [dokumentáció többi részét](/docs/hello-world.html). Ha többet szeretnél tanulni komponensek definiálásról, nézd meg a [`React.Component` API hivatkozását](/docs/react-component.html).
