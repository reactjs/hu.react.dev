---
id: tutorial
title: "Tutoriál: Bevezetés a React-be"
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

## Mielőtt Elkezdjük a Tutoriált {#before-we-start-the-tutorial}

Ebben a tutoriálban egy kis játékot fogunk készíteni. **Csábító lehet átugrani, mivel nem játékokat készítesz -- de azért adj neki egy esélyt.** A technikák amiket itt tanulsz alapvetőek bármilyen React alkalmazáshoz, és ha ezeket sikerül elsajátítanod, úgy sokkal jobban meg fogod érteni a React működését.

>Tipp
>
>Ez a tutoriál azoknak szól, akik a **gyakorlatias tanulást** szeretik. Ha te az alap koncepciók tanulását preferálod, nézd meg a [lépésről-lépésre útmutatónkat](/docs/hello-world.html). Elképzelhető, hogy ezt a tutoriált és az útmutatót egymást kiegészítőnek találod majd.

Ez a tutoriál szekciókra van felosztva:

* [Beállítások a Tutoriálhoz](#setup-for-the-tutorial) ad egy **kezdőpontot** a tutoriál követéséhez
* [Áttekintés](#overview) megtanítja a React **alapokat**: komponensek, prop-ok, és a state (állapot).
* [Játék Befejezése](#completing-the-game) segít a **leggyakoribb technikák** elsajátításában a React-ben.
* [Időutazás Hozzáadása](#adding-time-travel) egy **átfogóbb képet** ad a React egyedi erősségeiről.

Hogy eredményes légy, nem kötelező befejezned minden egyes szekciót egyszerre. Próbálj meg olyan messzire eljutni, amennyire tudsz -- akkor is, ha ez egy vagy két szekció.

### Mit Készítünk? {#what-are-we-building}

Ebben a tutoriálban megmutatjuk, hogy hogyan készíthetsz egy tic-tac-toe játékot React-ben.

<!-- REVIEW: -Maybe translate codepen? -->
Itt megnézheted, hogy mit is készítünk: **[Végeredmény](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Ha a kódot nem teljesen érted, vagy ha nem világos a szintaxis, ne aggódj! A tutoriál célja, hogy megértesse veled a Reactet, és annak szintaxisát.

Ajánljuk, hogy mielőtt folytatnád ezt a tutoriált, olvass utána a tic-tac-toe játéknak. Egy funkció amit felfedezhetsz az az, hogy a jobb oldalon van egy számozott lista a játék táblájáról. Ez egy az összes korábbi lépést tartalmazó lista, ami a játék menete során folyamatosan frissítve van.

Ha megismerkedtél a tic-tac-toe játékkal, nyugodtan zárd be. Ez a tutoriál egy egyszerű sablont használ kiindulópontnak. A következő lépés felkészíteni téged, hogy elkezdhessük fejleszteni a játékot.

### Előfeltételek {#prerequisites}

Feltételezzük, hogy van már valami tapasztalatod a HTML-el és Javascript-tel, de a tutoriál követése akkor sem lehet probléma, ha egy másik programózi nyelvből jösz. Továbbá feltételezzük, hogy olyan programozói koncepciók mint a függvények, objektumok, tömbök és - egy bizonyos fokig - az osztályok is ismertek számodra.

Ha először szeretnéd átnézni a JavaScript-et akkor [ezt az útmutatót](https://developer.mozilla.org/hu/docs/Web/JavaScript/a_javascript_ujboli_bemutatasa) ajánljuk. Megjegyzés: Ebben a tutoriálban pár ES6 (a JavaScript jelenlegi verziója) funkciót is használunk, többek között [nyílfunkciókat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [osztályokat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), és [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) utasításokat. A [Babel REPL](babel://es5-syntax-example) segítségével leellenőrízheted, hogy az ES6 mivé lesz lefordítva.

## Beállítások a Tutoriálhoz {#setup-for-the-tutorial}

Ezt a tutoriált két féle képpen is elvégezheted: kódolhatsz a böngésződből, vagy felállíthatsz egy helyi fejlesztői környezetet.

### "1. Opció: Kódolj a Böngésződben" {#setup-option-1-write-code-in-the-browser}

A leggyorsabban így kezdhetsz neki!

<!-- REVIEW: -Maybe translate codepen? -->
Először is nyisd meg a **[Kezdő kódot](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** egy új fülben. Az új fül egy új, üres tic-tac-toe táblát és a React kódot kell hogy mutassa. Ez a React az amit ebben a tutoriálban szerkeszteni fogunk.

Ugord át a második opciót, és a React áttekintéséhez menj az [Áttekintés](#overview) szekcióhoz.

### "2. Opció: Helyi Fejlesztői Környezet" {#setup-option-2-local-development-environment}

Ez az opció szabadon választható, és nem kötelező a tutoriál elvégzéséhez!

<br>

<details>

<summary><b>Választható: Instrukciók helyi környezetből való követéshez, a kedvenc szövegszerkesztődhöz</b></summary>

Ahhoz hogy követni tudd a tutoriált egy általad választott szerkesztőből, ez az opció kicsivel több beállítást igényel. Íme a lépések:

1. Győzödj meg róla, hogy a [Node.js](https://nodejs.org/en/) egy jelenlegi verziója telepítve van.
2. Kövesd a [Create React App telepítési útmutatóját](/docs/create-a-new-react-app.html#create-react-app) egy új projekt létrehozásához.

```bash
npx create-react-app my-app
```

3. Törölj minden fájlt az új projekt `src/` mappábjában 

> Megjegyzés:
>
>**Ne töröld az egész `src` mappát, csak az eredeti forrásfájlokat a mappában.** A következő lépésben ki fogjuk cserélni az alap forrásfájlokat ebben a projektben.

```bash
cd my-app
cd src

# Ha Mac-et vagy Linux-ot használsz:
rm -f *

# Vagy ha Windows-on vagy:
del *

# Ezután lépj vissza a projekt mappára
cd ..
```

4. Hozz létre egy `index.css` fájlt a `src/` mappában, tartalma pedig legyen [ez a CSS kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0100).

5. Hozz létre egy `index.js` fájlt a `src/` mappában, tartalma pedig legyen [ez a JS kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0010).

6. Add hozzá a következő három sort az `index.js` fájl tetejéhez a `src/` mappában:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

Ha mindent jól csináltál, és most lefuttatod az `npm start` parancsot a projekt mappájában és megnyitod a `http://localhost:3000`-t a böngészőben, egy üres tic-tac-toe mezőt kell, hogy láss.

Szintaxis kiemeléshez a következő [instrukciókat](https://babeljs.io/docs/editors) ajánljuk.

</details>

### Segítség, Elakadtam! {#help-im-stuck}

Ha bármikor elekadsz, a [közösségi támogatási források](/community/support.html) segíthet. Különösen a [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) lehet hasznos, ha gyorsan szeretnél segítséget kapni. Ha nem érkezik válasz, vagy még mindig el vagy akadva, nyiss egy issue-t és segítünk.

## Áttekintés {#overview}

Most hogy minden készen áll, kezdjük a React áttekintésével!

### Mi az a React? {#what-is-react}

A React egy deklaratív, effektív, és rugalmas JavaScript könyvtár felhasználói felületek készítéséhez. Lehetővé teszi komplex felhasználói felületek összeállítását izolált kódrészletekből, amiket "komponenseknek" hívunk.

A React rendelkezik egy pár komponens típussal, de most kezdjük a `React.Comoponent` aloszállyal:

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

Nemsokára beszélünk a vicces XML szerű tag-ek ről is. A komponsensek segítségével mondjuk meg a React-nek, hogy mit szeretnénk látni a képernyőn. Ha az adatunk megváltozik, a React hatékonyan frissíti és újrarendereli a komponensünket.

Itt a ShoppingList egy **React komponens osztály**, vagy **React komponens típus**. Egy komponens paramétereket fogad, amiket **props**-nak hívunk (angol "properties" rövidítése), és egy nézet hierarchiát ad vissza a `render` metóduson keresztül.

A `render` metódus egy *leírását* adja vissza annak, amit a képernyőn szeretnél látni. A React fogja a leírást és megjeleníti az eredményt. Pontosabban a `render` metódus egy **React elem**-et ad vissza, ami egy könnyűsúlyú leírása annak, amit renderelni kell. A legtöbb React fejlesztő egy speciális szintaxist használ, ezt "JSX"-nek hívják, ami könnyebbé teszi ezen a struktúrák írását. A `<div />` szintaxist `React.createEelement('div')`-é transzformáljuk kompiláláskor. A fenti példa egyenértékű az alábbival:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 gyermekei ... */),
  React.createElement('ul', /* ... ul gyermekei ... */)
);
```

[Nézd meg a teljes verziót.](babel://tutorial-expanded-version)

Ha érdekel a `createElement()` részletesebb leírása, nézd meg az [API referenciát](/docs/react-api.html#createelement), de ebben a tutoriálban ezt nem fogjuk használni. A JSX-et viszont igen.

A JSX rendelkezik a JavaScript minden erejével. A JSX-ben *bármilyen* JavaScript kifejezést tehetsz kapcsos zárójelek közé. Minden React elem egy JavaScript objektum amit váltózokban tárolhatsz, vagy körbeküldhetsz a programodban.

A fenti `ShoppingList` komponens csak beépített DOM komponenseket renderel, mint a `<div />` és az `<li />`. De összeállíthatsz és renderelhetsz egyedi React komponenseket is. Például a `<ShoppingList />` írásával utalhatunk az egész bevásárlólistára. Minden React komponens elzártan és függetlenül operálhat; ez lehetővé teszi számodra komplex felhasználói kezelőfelületek építését egyszerű komponensekből.

## Kezdő Kód Ellenőrzése {#inspecting-the-starter-code}

Ha a tutoriálon a **böngésződből** fogsz dolgozni, nyisd meg ezt a kódot egy új fülön: **[Kezdő Kód](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Ha **helyi környezetben** fogsz dolgozni, nyisd meg a `src/index.js` fájlt a projekt mappádban (már korábban szerkesztetted a fájlt a [beállítások](#setup-option-2-local-development-environment) részben).

Ez a Kezdő Kód szolgál alapul ahhoz amit készítünk. A CSS stíluslapot megadtuk, hogy csak a React-re és a tic-tac-toe játék programozására kelljen fókuszálnod.

A kód tanulmányozásával megállapíthatod, hogy három féle React komponensünk van:

* Square
* Board
* Game

A Square komponens egy egyszerű `<button>`-t renderel, amíg a Board 9 Square-t. A Game komponens egy játéktáblát renderel helyörző értékekkel, amiket később módosítunk. Jelenleg nincs egyetlen interaktív komponens sem.

### Adattovábbítás Prop-okkal {#passing-data-through-props}

Hogy végre bemocskoljuk a kezünk, küldjük adatot a Board komponensből a Square komponensnek.

Erősen ajánljuk, hogy minden kódot kézzel írj a tutoriál során, és ne használj másolás/beillszetést. Ez hozzá fog járulni ahhoz, hogy jobban megértsd mi is történik, és később minden magától jön majd.

A Board `renderSquare` metódusában változtasd meg a kódot, hogy egy `value` prop-ot tudj küldeni a Square komponensnek:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
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

Gratulálunk! Sikeresen "leküldtél egy prop-ot" egy szülő Board komponensből egy gyermek Square komponensnek. React alkalmazásokban a prop-ok leküldésével tudsz információt mozgatni szülőktől gyermek komponenseknek.

### Készíts egy Interaktív Komponenst {#making-an-interactive-component}

Töltsük ki a Square komponenst egy "X"-el, ha rákattintunk.
Először is változtasd meg a button taget a `render()` metódus visszatérésében erre:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('kattintás'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Ha most kattintasz a Square-re, egy értesítést kell láss a böngésződben.

>Megjegyzés
>
>A kevesebb gépelés és a [`this` félreérthető viselkedésének](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) elkerülése érdekében, innentől a [nyílfunkció szintaxist](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) fogjuk használni az eseménykezelőkhöz:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('kattintás')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Vedd észre hogy, az `onClick={() => alert('kattintás')}` segítségével *egy függvényt* küldünk le prop-ként `onClick` néven. A React csak kattintás után fogja meghívni ezt a függvényt. Gyakori hiba csak ennyit írni `onClick={alert('kattintás')}`, és elfelejteni `() =>` részt. Ez meghívná a függvényt a komponens minden újrarenderelésénél.

Következő lépésként azt próbáljuk elérni, hogy a Square komponens "emlékezzen" arra hogy rá lett kattintva, és töltse ki magát egy "X"-el. Ahhoz hogy komponensek "emlékezni" tudjanak, **state**-t (állapotot) használnak.

React komponensekben állapotot a `this.state` segítségével deklarálhatunk a konstruktorban. A `this.state` állapotra úgy kell tekintenünk, hogy az privát legyen abban az osztályban amiben az definálva lett. Tároljuk a Square jelenlegi értékét a `this.state` objektumban, és változtassuk azt meg, ha a Square-re kattintunk.

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
      <button className="square" onClick={() => alert('kattintás')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Megjegyzés
>
>[JavaScript osztályokban](https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Classes), mindig meg kell hívnod `super` metódust amikor definiálod a konstruktort egy alosztályban. Minden React komponens osztály ami rendelkezik egy `constructor`-al, egy `super(props)` hívással kell, hogy kezdődjön.

Most pedig változtassuk meg a Square `render` metódusát, hogy az állapot jelenlegi értékét mutassa:

* Cseréld ki `this.props.value`-t `this.state.value`-ra a `<button>` tag-ben.
* Cseréld ki az `onClick={...}` eseménykezelőt erre: `onClick={() => this.setState({value: 'X'})}`.
* Tedd `className` és `onClick` prop-okat külön sorokba a jobb olvashatóság érdekében.

Ezen változtatások után a `<button>` tag amit a Square `render` metódusa visszatérít így néz ki:

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

Amikor a Square komponens `render` metódusában az `onClick` kezelő meghívja a `this.setState` metódust, a React újrarendereli a Square komponenst minden alkalommal amikor a `<button>` elemre rákattintunk. A frissítés után a Square `this.state.value` értéke `'X'` lesz, tehát egy `X`-et fogunk látni a játéktáblán. Ha bármelyik Square-re kattintasz, egy `X` kell hogy megjelenjen.

Amikor a `setState` metódust megívjuk egy komponensben, a React automatikusan frissíti annak minden gyermek komponensét is.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Fejlesztői Eszközök {#developer-tools}

A React Devtools fejlesztői eszközök kiegészítő [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)-hoz és [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)-hoz segít a React komponens fa vizsgálatában a böngésződ fejlesztői eszközeivel.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

A React DevTools segít ellenőrizni a React komponenseid prop-jait és állapotait (state).

<!-- TODO: Translate Inspect -->
A React DevTools telepítése után kattints bármelyik elemre jobb egérgombbal az oldalon, majd kattitnts az "Inspect"-re a fejlesztői eszközök megnyitásához. Ekkor egy React fül nyílik meg utolsó fülként a jobb oldalon.

**Ha azonban a CodePen-en dolgozol, egy pár extra lépésre szükség van ahhoz, hogy egy műküdjön:**

1. Jelentkezz be vagy regisztálj, és erősítsd meg az e-mail-ed (spam elkerülése érdekében).
2. Kattints a "Fork" gombra.
3. Kattints a "Change View"-ra, majd válaszd a "Debug mode"-t.
4. Az új megnyíló fülön, a fejleszői eszközökben lesz egy React fül.

## Játék Befejezése {#completing-the-game}

Kész vagyunk a tic-tac-toe játék alap építőelemeivel. Egy teljes játékhoz azonban az "X"-ek és "O"-k elhelyezésének a váltakozására van szükségünk a játéktáblán, és szüségünk van egy módra, hogy megállapíthassuk a győztest.

### Állapot Felemelése {#lifting-state-up}

Jelenleg minden Square komponens külön kezeli a játék állapotát. A győztes ellenőrzéséhez mind a 9 négyzet értékét egy helyen fogjuk kezelni.

Azt gondolhatnánk, hogy a Board komponens csak egyszerűen végigkérdezi minden Square állapotát. Bár ez lehetséges a React-ben, nem támogatjuk, mert így a kód nehezen érthetővé válik, fogékony lesz hibákra, és nehéz lesz újraírni. Ehelyett a legjobb módszer ha a játék állapotát a szülő Board komponensben tároljuk minden Square komponens helyett. A Board komponens meg tudja mondani minden Square komponensnek mit mutasson prop-ok leküldésével, [ahogyan egy számot is leküldtünk minden Square komponensnek](#passing-data-through-props)

**Adat gyűjtéséhez több gyermektől, vagy ahhoz hogy két gyermek komponens kommunikálni tudjon egymással, az állapotot amin a komponensek osztozni fognak egy köszös szülő komponensben kell hogy deklaráld. A szülő komponens ezután le tudja küldeni a megosztott állapotot a gyermekeknek prop-ok segítségével; ez szinkronizálja a gyermekeket egymással és a szülő komponensükkel.**

A helyi állapot felemelése egy szülő komponensbe gyakroi tevékyenség amikor React komponenseket írunk újra. -- Ragadjuk meg az alkalmat és próbáljuk ezt ki gyakorlatban.

Adj hozzá egy konstruktort a Board komponenshez és állítsd be a kezdő állapotot, hogy az tartalmazzon egy tömböt 9 null értékkel, amik a 9 négyzetnek felelnek meg:

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

Amikor később töltjük ki a táblát, a `this.state.sqares` tömb valahogy így fog kinézni:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

A Board komponens `renderSquare` metóudsa jelenleg így néz ki:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Kezdetben [leküldtük a `value` prop-ot](#passing-data-through-props) a Board komponensből ahhoz, hogy számokat mutassunk 0-tól 8-ig minden Square komobensben. Egy másik korábbli lépésben lecseréltük a számokat "X" jelekre amit a [Square komponens saját állapota határozott meg](#making-an-interactive-component). A Square komponens jelenleg ezért nem veszi figyelmbe a `value` prop értékét, amit a Board komponens küld neki.

Most megint igyénybe fogjuk venni a prop küldési mechanizmust. Úgy módosítjük a Board komponenst, hogy az értesítsen minden Square komponenst annak jelenlegi értékéről (`'X'`, `'O'`, vagy `null`). A `squares` tömböt már korábban definiáltuk a Board komponens konstruktorában, és most úgy módosítjúk a Board komponens `renderSquare` metódusát, hogy az ebből a tömbből olvasson:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

Így most minden Square komponens fogadni egy `value` prop-ot, ami egy `'X'`, `'O'`, vagy `null` üres négyzetek esetében.

A következőben meg kell változtatnunk mi történjen, ha a Square komponensre rákattintanak. Most már a Board komponens kezeli melyik négyzetek vannak kitöltve. Valahogy el kell érnünk, hogy a Square komponens frissítse a Board állapotát. Mivel az állapot privát arra a komponensre nézve amiben az definiálva van, a Board állapota nem frissíthető közvetlenül a Square komponensből.

Ehelyett leküldünk egy függvényt a Board komponensből a Square-nek, és hagyjuk hogy a Square meghívja ezt a függvényt amikor egy négyzetre kattintanak. Ehhez meg kell változtatnunk a `renderSquare` metódust a Board komponensben:

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
>Az olvashatóság érdekében a visszaküldött elemet több sorba tördeljük, és hozzáadunk zárójeleket is, hogy a JavaScript ne adjon pontosvesszőt a `return` után így megtörve a kódunkat.

Így már két prop-ot küldünk le a Board-ból a Square-nek: `value` és `onClick`. Az `onClick` prop egy függvény amit a Square meg tud hívni, ha rákattintanak. A következő változásokat eszközöljük a Square komponensen:

* Cseréld le a `this.state.value`-t `this.props.value`-ra a Square `render` metódusában
* Cseréld le a `this.setState()`-t `this.props.onClick()`-re a Square `render` metódusában
* Töröld a `constructor`-t  a Square komponensből, mivel az többé nem követi a játék állását

A változások után a Square komponens így néz ki:

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

1. Az `onClick` prop a beépített DOM `<button>` komponensben közli a React-el, hogy állítson fel egy kattintás esemélyfigyelőt.
2. Amikor a gombra kattintanak, a React meghívja az `onClick` eseményfigyelőt, ami a Square komponens `render()` metódusában definiálva lett.
3. Ez az eseményfigyelő meghívja a `this.props.onClick()` függvényt. A Square `onClick` prop-ja a Board komponensben lett definiálva.
4. Mivel a Board leküldte a `onClick={() => this.handleClick(i)}` prop-ot a Square komponensnek, a Square meghívja a `this.handleClick(i)` függvényt, ha rákattintanak.
5. Mivel a `handleClick()` metódust még nem definiáltuk, a kódunk összeomlik. Ha most kattintasz egy négyzetre, egy piros hibát kell látnod a képernyőt, ami valami olyat mond, hogy "this.handleClik is not a function", azaz "a this.handleClick nem függvény".

>Megjegyzés
>
>A `<button>` button elem `onClick` attribútumának van egy speciális jelentése a React számára, mivel ez egy beépített komponens. Egy egyedi komponens mint például a Square, a megnezvezés tőled függ. Más nevet is adhatuk a Square `onClick` prop-jának, vagy a Board `handleClick` metódusának, és a kód ugyanúgy működne. A React-ben megállapodás alapján `on[Event]`-nek hívjuk azokat a prop-okat amik eseményeket képviselnek, és `handle[Event]`-nek azokat a metódusokat amik esemélyeket kezelnek.

Ha rákattintuk egy Square komponensre, egy hibát kell hogy kapjunk, mivel a `handleClick` még nincs definiálva. Most hozzáadjuk a `handleClick` metódust a Board osztályhoz:

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
    const status = 'Next player: X';

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

Ezen változtatások után újra rá tudunk kattintani a Square komponensekre hogy kitöltsük őket, ahogy eddig is. Azonban az állapot most már a Board komponensben van tárolva, ahelyett, hogy minden Square külön tárolná a saját állapotát. Ha a Board állapota megváltozik, a Square komponens automatikusan újra fog renderelni. Minden négyzet állapotának a Board komponensben való tárolása lehetővé teszi hogy a jövőben megállapítsuk a győztest.

Mivel a Square komponens többé nem kezel állapotot, a Square komponens most már csak a Board komponenstől fogad értékeket, és értesíti azt ha rákattintanak. React nyelven ez azt jelenti, hogy a Square komponensek  **irányított komponensek**. A Board komponens teljes mértékben irányítja őket.

Vedd észre hogy a `handleClick` metódusban meghívjuk a `.slice()` metódust a tömbbön, hogy a `squares` tömb egy másolatát módosítsuk, ne az eredetit. A következő szekcióban elmagyarázzuk miért készítjük ezt a `squares` tömb másolatot.

### Miért Fontos a Megváltoztathatatlanság {#why-immutability-is-important}

Az előző kód példában azt tanácsoltuk hogy a `.slice()` metódussal készítsünk egy `squares` tömb másolatot, hogy ne az eredeti tömböt módosítsuk. Most megvitatjuk a megváltoztathatatlanságot és hogy miért fontos ezt megtanulni.

Adat változatására két általános megközelítés létezik. Az első megközelítés az, hogy közvetlenül *megváltoztatjuk* az adat értékét. A második megközelítés lecserélni az adatot egy másolattal ami tartalmazza a kívánt változtatásokat.

#### Adatváltozás Mutációval {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'György'};
player.score = 2;
// A player most {score: 2, name: 'György'}
```

#### Adatváltozás Mutáció Nélkül {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'György'};

var newPlayer = Object.assign({}, player, {score: 2});
// A player változatlan, a newPlayer pedig {score: 2, name: 'György'}

// Vagy ha használod az objektum terítési szintaxis javaslatot, ezt is írhatod:
// var newPlayer = {...player, score: 2};
```

A végeredmény ugyanaz, de azzal hogy nem közvetlenül változtatjuk meg az eredeti (vagy eredeti alá rendelt) adatot, hasznos lehet a lent leírt okokból.

#### Komplex Tulajdonságok Válnak Egyszerűvé {#complex-features-become-simple}

A megváltoztathatatlanság bonyolult tulajdonságok válnak egyszerűen implementálhatóvá. Később ebben a tutorialban implementálni fogunk egy "időutazó" funkciót ami lehetővé teszi számunkra a tic-tac-toe játék lépéstörténetének tanulmányozását és abban való korábbi lépésre való "visszaugrást". Ez a funkció nem specifikus játékokra -- a képesség visszavonni vagy újracsinálni bizonyos tevékenységeket egy gyakori követelmény alkalmazásokban. A közvetlen adatváltozás elkerülésével érintetlenül tudjuk megtartani a játék lépéstörténetének korábbi verzióit, és ezt később újrahasznosíthatjuk.

#### Változások Detektálása {#detecting-changes}

Változások detektálása megváltoztatható objektumokban nehéz feladat, mivel azok közvetlenül módosíthatóak. Ez a detektálás megköveteli a megváltoztatható objektumtól annak összehasonlítását saját maga korábbi másolataihoz és a teljes objektum fa bejárását.

Változások detektálása egy megváltoztathatatlan objektumban jelentősen egyszerűbb. Ha a megváltoztathatatlan objektum amire referálunk különbözik a korábbitól, akkor az objektum megváltozott.

#### Újrarenderelés Meghatározása React-ben {#determining-when-to-re-render-in-react}

A megváltoztathatatlanság legfőbb előnye, hogy az segít _tiszta komponenseket_ építeni React-ben. A megváltoztathatatlan adat könnyen megállapíthatja ha valamilyen változás történt ami segít meghatározni hogy egy komponensnek újra kell-e renderelnie.

Többet tanulhatsz a `shouldComponentUpdate()` metódusról és hogy hogyan készíts *tiszta komponenseket* a [Teljesítmény Optimalizáció](/docs/optimizing-performance.html#examples) olvasásával.

### Függvény Komponensek {#function-components}

Most átalakítjuk a Square komponenst egy **függvény komponenssé**.

A React-ben a **függvény komponensek** egy egyszerűbb módja komponensek írásának amik csak egy `render` metódust tartalmaznak, és nincs saját állapotuk. Ahelyett hogy osztályokat definiálunk amik a `React.Component` kiterjesztései, írhatunk egy függvényt ami veszi a `prop`-okat inputként, és visszaküldi azt, amit renderelni kéne. A függvény komponensek írása kevesébé időigényes, és sok komponens kifejezhető így.

Cseréld le a Square oszályt erre a függvényre:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Lecseréltük a `this.props`-t `props`-ra mindkét helyen ahol megjelent.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Megjegyzés
>
>Amikor módosítottuk a Square függvényt egy függvény komponense, megváltoztattuk a `onClick={() => this.props.onClick()}`-t is egy rövidebb `onClick={props.onClick}` formára is (vedd észre a zárójelek hiányát *mindkettő* oldalon).

### Szerepváltás {#taking-turns}

We now need to fix an obvious defect in our tic-tac-toe game: the "O"s cannot be marked on the board.

We'll set the first move to be "X" by default. We can set this default by modifying the initial state in our Board constructor:

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

Each time a player moves, `xIsNext` (a boolean) will be flipped to determine which player goes next and the game's state will be saved. We'll update the Board's `handleClick` function to flip the value of `xIsNext`:

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

With this change, "X"s and "O"s can take turns. Try it!

Let's also change the "status" text in Board's `render` so that it displays which player has the next turn:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // the rest has not changed
```

After applying these changes, you should have this Board component:

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
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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

### Győztes Kinevezése {#declaring-a-winner}

Now that we show which player's turn is next, we should also show when the game is won and there are no more turns to make. Copy this helper function and paste it at the end of the file:

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

Given an array of 9 squares, this function will check for a winner and return `'X'`, `'O'`, or `null` as appropriate.

We will call `calculateWinner(squares)` in the Board's `render` function to check if a player has won. If a player has won, we can display text such as "Winner: X" or "Winner: O". We'll replace the `status` declaration in Board's `render` function with this code:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // the rest has not changed
```

We can now change the Board's `handleClick` function to return early by ignoring a click if someone has won the game or if a Square is already filled:

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

Congratulations! You now have a working tic-tac-toe game. And you've just learned the basics of React too. So *you're* probably the real winner here.

## Időutazás Hozzáadása {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Lépéstörténet Tárolása {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
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

Now we need to decide which component should own the `history` state.

### Állapot Felemelése, Újra {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

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
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

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
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

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

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

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

>Note
>
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Korábbi Lépések Mutatása {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Azonosító Kulcs Választása {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Időutazás Implementálása {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

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

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

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

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[Nézd meg a teljes kódot ezen a ponton](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Összegzés {#wrapping-up}

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).
