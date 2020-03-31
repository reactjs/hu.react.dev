---
id: hooks-state
title: A State Horog használata
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

A *Horog* egy új kiegészítés a React 16.8-as verziójától kezdve. Ennek segítségével osztályok nélkül is használhatsz belső állapotot és egyéb React funkciókat.

A [bevezető](/docs/hooks-intro.html) ezt a példát használta a Horgok bemutatására:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // Egy új állapotváltozó deklarálása, ami "count"-nak nevezünk el
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count} alkalommal kattintottál</p>
      <button onClick={() => setCount(count + 1)}>
        Kattints rám
      </button>
    </div>
  );
}
```

A Horgok bevezetéseképpen először ezt a kódot fogjuk osszehasonlítani egy osztályok segítségével írt megfelelőjével:

## Osztállyal írt ekvivalens  {#equivalent-class-example}

Ha már használtál React osztályokat, ez a kód ismerősnek tűnhet: 

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.count} alkalommal kattintottál</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Kattints rám
        </button>
      </div>
    );
  }
}
```

Az állapot először `{ count: 0 }` értéket vesz fel, ezután megnöveljük a `state.count` értékét, amikor a felhasználó rákattint a gombra, a `this.setState()` meghívásával. A későbbiekben ebből az osztályból fogunk idézni.

>Megjegyzés
>
>Esetleg elgondolkozhattál azon, hogy miért egy számlálót használunk itt egy realisztikusabb példa helyett. Ez azért van, hogy az APIra tudjunk fókuszálni, amíg még csak ismerkedünk a Horgokkal.

## Horgok és függvénykomponensek {#hooks-and-function-components}

Emlékeztetőképpen a függvénykomponensek így néznek ki Reactben:

```js
const Example = (props) => {
  // Itt használhatsz Horgokat!
  return <div />;
}
```

vagy így:

```js
function Example(props) {
  // Itt használhatsz Horgokat!
  return <div />;
}
```

Ezeket előzőleg "állapot nélküli komponenseknek" hívtuk. Mostantól kezdve viszont már használhatsz állapotot is ezekben, így ezentúl inkább "függvénykomponensekként" hívatkozunk rájuk.

A Horgok **nem** működnek osztályokon belül. De használhatod őket osztályok helyett.

## Mi is a Horog? {#whats-a-hook}

Az új példánk a `useState` Horog importálásával kezdődik:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Mi is a Horog?** A Horog egy speciális függvény, aminek a segítségével "beleakaszkodhatsz" React funkciókba. Például a `useState` egy olyan Horog, aminek a segítségével állapotot adhatsz hozzá a függvénykomponensekhez. Később többféle Horgot is megvizsgálunk.

**Mikor használjak Horgokat?** Ha van egy függvénykomponensed, amihez állapotot szeretnél hozzáadni, előzőleg osztállyá kellett konvertálnod. Mostantól kezdve viszont Horgokat is használhatsz ehelyett a meglévő függvénykomponensben. Most ezt fogjuk kipróbálni!

>Megjegyzés:
>
>Van néhány speciális szabály, hogy hol és hogyan használhatsz Horgokat egy komponensen belül. Ezekről a [Horgok szabályai](/docs/hooks-rules.html) fejezetben tanulunk majd.

## Állapotváltozó deklarálása {#declaring-a-state-variable}

Egy osztályban a `count` állapotváltozó `0`-ra inicializálása a  `this.state` `{ count: 0 }`-ra állításával történik a konstruktorban:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Egy függvénykomponensben nincs `this`, így nem tudjuk beállítani vagy kiolvasni a `this.state`-et. Ehelyett közvetlenül a `useState` Horgot hívjuk meg a komponensben:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Egy új állapotváltozó deklarálása, ami "count"-nak nevezünk el
  const [count, setCount] = useState(0);
```

**Mit csinál a `useState` hívás?** Ez egy "állapotváltozót" deklarál. A mi változónkat `count`-nak hívják, de bármi másnak is elnevezhetjük, például `banana`. Ez egy módszer az értékek "megőrzésére" a függvényhívások között — a `useState` egy új módszer ugyanarra, amit a  `this.state`-tel érünk el az osztályokban. Normális esetben a változók "eltűnnek" a függvény hívásának befejezésekor, de az állapotváltozókat megőrzi a React.

**Mit adunk át argumentumként a `useState`-nek?** Az egyetlen argumentum a `useState()` Horogban a kezdeti állapot. Az osztályokkal ellentétben az állapotváltozónak nem kell objektumnak lennie. Használhatunk egy sima számot vagy sztringet, ha csak erre van épp szükségünk. A fenti példánkban csak egy számra van szükségünk a felhasználói kattintások számának tárolására, így `0`-t adunk meg kezdeti értékként. (Ha két különböző értéket szeretnénk tárolni az állapotban, a `useState()`-et kétszer hívnánk meg.)

**Mit ad vissza a `useState`?** Két értéket ad vissza: a jelenlegi állapotváltozót és egy függvényt, amivel ezt frissíteni tudjuk. Ezért írjuk így: `const [count, setCount] = useState()`. Ez hasonló a `this.state.count` és `this.setState`-hez egy osztályban, kivéve, hogy ezek párban érkeznek. Ha még nem barátkoztál meg ezzel a szintakszissal, vissza fogunk erre térni az [oldal alján](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Most, hogy tudjuk, hogy mit csinál a `useState` Horog, a példánk jobban érthető:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Egy új állapotváltozó deklarálása, amit "count"-nak fogunk hívni
  const [count, setCount] = useState(0);
```

Egy `count` állapotváltozót deklarálunk és `0`-ra állítjuk. A React megjegyzi az értékét a renderelések között, és a legfrissebb értéket adja át függvényünknek. Ha meg szeretnénk változtatni a `count` értékét, meghívhatjuk a `setCount`-ot.

>Megjegyzés
>
>Esetleg ezen tűnődhetsz: a `useState`-et miért nem `createState`-nek hívjuk?
>
>A "Create" (létrehozás) nem lenne teljesen pontos megnevezés, mivel az állapot csak az első renderelés alkalmával hozódik létre. A későbbi renderelésekkor a `useState` a legfrissebb állapotot adja vissza. Különben nem lenne "állapot"! Egy másik oka is van, hogy a Horog nevek miért *mindig* `use`-zal kezdődnek. Hogy miért, arról a [Horgok szabályai](/docs/hooks-rules.html) részben tanulunk majd.

## Az állapot kiolvasása {#reading-state}

Ha a jelenlegi count értéket szeretnénk kiolvasni egy osztályban, a `this.state.count`-et olvassuk:

```js
  <p>{this.state.count} alkalommal kattintottál</p>
```

Egy függvényben közvetlenül a `count` változót tudjuk használni:


```js
  <p>{count} alkalommal kattintottál</p>
```

## Az állapot módosítása {#updating-state}

Egy osztályban a `this.setState()` meghívásával tudjuk a `count` változót módosítani:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Kattints rám
  </button>
```

Egy függvényben már van `setCount` és `count` változónk, így nincs szükségünk a `this`-re:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    Kattints rám
  </button>
```

## Összefoglalás {#recap}

Most **összegezzünk, hogy mit tanultunk eddig sorról-sorra** és figyeljük meg, hogy mindent értünk-e.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>{count} alkalommal kattintottál</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Kattints rám
11:        </button>
12:      </div>
13:    );
14:  }
```

* **1. sor:** A `useState` Horgot beimportáljuk Reactből. Ennek a segítségével helyi állapotot tarthatunk a függvénykomponensünkben.
* **4. sor:** Az `Example` komponensben egy új állapotváltozót deklarálunk a `useState` Horog meghívásával. Ez egy pár változót ad vissza, amit most el fogunk nevezni. A első változót `count`-nak hívjuk, mivel ez tárolja a kattintások számát. `0`-ként inicializáljuk, amit a `useState` egyetlen argumentumaként adunk át. A második kapott változó egy függvény. Ezzel fogjuk módosítani a `count` változót, ezért ezt `setCount`-nak hívjuk.
* **9. sor:** Amikor a felhasználó a gombra kattint, meghívjuk a `setCount`-ot az új értékkel. Ezután a React újrarendereli az `Example` komponenst a `count` új értékével.

Elképzelhető, hogy ez kezdésképpen túl sok információ egyszerre. Ne siesd el! Ha elvesztél a magyarázatban, nézd meg újra a fenti kódot és próbáld kiolvasni fentről lefelé. Megígérjük, hogy amint megpróbálod "elfelejteni", hogy hogyan működik az állapot az osztályokban és friss szemekkel nézel erre a példára, máris értelmet fog nyerni.

### Tipp: Mit jelentenek a szögletes zárójelek? {#tip-what-do-square-brackets-mean}

Már valószínűleg észrevetted a szögletes zárójeleket, amikor egy állapotváltozót deklarálunk:

```js
  const [count, setCount] = useState(0);
```

A baloldai nevek nem részei a React APInak. Ezeket bárhogy hívhatod:

```js
  const [fruit, setFruit] = useState('banana');
```

Ezt a JavaScript szintaxist ["tömb lebontásnak"](https://developer.mozilla.org/hu/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) hívjuk. Ez azt jelenti, hogy két új változót csinálunk, ami `fruit` és `setFruit` lesz, ahol a `fruit` az első értéke lesz annak, amit a `useState` visszad és `setFruit` a második. Ez ekvivalens ezzel a kóddal:

```js
  var fruitStateVariable = useState('banana'); // Visszaad egy párt
  var fruit = fruitStateVariable[0]; // Az első változó
  var setFruit = fruitStateVariable[1]; // A második változó
```

Amikor `useState`-tel deklarálunk egy új állapotváltozót, egy párt fog visszadni — egy tömböt két elemmel. Az első elem a jelenlegi érték, a második egy függvény amivel a értéket módosíthatjuk. A `[0]` és `[1]` használata kissé zavaró, mivel ennek sajátos jelentése van. Ezért inkább a tömb szétbontást használjuk.

>Megjegyzés
>
>Lehet, hogy kiváncsi vagy, hogy honnan tudja a React, hogy melyik `useState` hívás melyik komponensnek felel meg, mivel nem adunk át semmiféle `this`-t a Reactnek. Ezt a kérdést [itt fogjuk megválaszolni](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) több más kérdéssel együtt a GY.I.K. oldalon.

### Tipp: Több állapotváltozó használata {#tip-using-multiple-state-variables}

Állapotváltozók `[something, setSomething]` párkét való definiálása azért is hasznos, mivel *különböző* neveket tudunk adni különböző állapotváltozóknak, ha többet is szeretnénk használni:

```js
function ExampleWithManyStates() {
  // Több állapotváltozó deklarálása!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

A fenti komponensben van egy `age`, `fruit` és `todos` lokális változónk, és külön-külön tudjuk ezeket módosítani:

```js
  function handleOrangeClick() {
    // Hasonló a this.setState({ fruit: 'orange' })-hez
    setFruit('orange');
  }
```

Nem **kell** több változót használnod. Az állapotváltozók objektumokat és tömböket is tudnak tárolni, így az összetartozó adatokat egy helyen tudod tárolni. Viszont az oszálybeli `this.setState`-tel ellentétben a módosítás mindig *lecseréli* az állapotot az összefésülés helyett.

Több ajánlást is olvashatsz a független állapotváltozók felosztásáról [a GY.I.K.-beb](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## Következő lépések {#next-steps}

Ezen az oldalon az egyik React által szolgáltatott Horogról tanultuk, amit `useState`-nek hívnak. Néha úgy is fogunk erre hivatkozni, mint az "Állapot Horog". Ezáltal helyi állapotot tudunk a függvénykomponensekhez adni -- amit most először csináltunk!

Arról is tanultunk egy kicsit, hogy mik azok a Horgok. A Horgok függvények, amikkel "beleakaszkodhatsz" React funkciókba a függvénykomponensekből. A nevük mindig `use`-zal kezdődik és vannak még egyéb Horgok is, amikről még nem esett szó.

**Most folytassuk [a következő Horog megtanulásával: `useEffect`.](/docs/hooks-effect.html)** Ezzel melléhatásokat végezhetsz el egy komponensben és hasonló az osztálybeli életciklus metódusokhoz.
