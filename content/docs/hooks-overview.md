---
id: hooks-overview
title: Horgok egy pillantásra
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

A *Horgok* a React 16.8-as verziójában lettek hozzáadva. Osztályok létrehozása nélkül is lehetőséget kínálnak állapot, és más React funkciók használatához.

A horgok [visszafelé kompatibilisek](/docs/hooks-intro.html#no-breaking-changes). Ez az oldal tapasztalt React felhasználóknak ad egy áttekintést a Horgokról. Ez egy gyorsütemű áttekintés. Ha összezavarodnál, keress egy ilyen sárga dobozt:

>Részletes magyarázat
>
>Olvasd el a [Motiváció](/docs/hooks-intro.html#motivation) részt, hogy megértsd, miért is adjuk a Horgokat a Reacthez.

**↑↑↑ Minden szekció egy ilyen sárga dobozzal végződik.** Részletes magyarázatokat linkelnek.

## 📌 Állapot horog {#state-hook}

Ez a példa egy számlálót renderel. A gombra kattintáskor növeli az értéket:

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // Egy új állapot változó deklarálása, amit "count"-nak fogunk hívni
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

Itt, a `useState` egy *Horog* (mindjárt arról is beszélünk, hogy ez mit is jelent). Egy függvénykomponensben hívjuk meg, hogy ahhoz állapotot tudjunk rendelni. A React az újrarenderelések között megőrzi ezt az állapot. A `useState` egy párt ad vissza: a *jelenlegi* állapotértéket, és egy függvényt, amivel azt frissíteni tudjuk. Ezt a függvényt meghívhatod egy eseménykezelőből, vagy máshonnan is. Hasonló az osztályokban megtalálható `this.setState`-hez, kivéve, hogy ez nem egyesíti a régi és az új állapotokat. (Az [Állapot Horog használata](/docs/hooks-state.html) fejezetben mutatni fogunk egy példát, ami összehasonlítja a `useState`-t és a `this.state`-t.)

A `useState` egyetlen argumentuma az állapot kezdeti értéke. A fenti példában ez `0`, mert a számlálónk nullától indul. Jegyezd meg, hogy a `this.state`-től eltérően az állapot itt nem egy objektum -- bár lehetne, ha azt szeretnéd. A kezdeti állapot argumentum csupán az első renderelés alkalmával van használva.

#### Több állapotváltozó deklarálása {#declaring-multiple-state-variables}

Az Állapot Horgot többször is használhatod egy komponensen belül:

```js
function ExampleWithManyStates() {
  // Deklarálj egyszerre több állapotváltozót!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banán');
  const [todos, setTodos] = useState([{ text: 'Tanuld meg a Horgokat' }]);
  // ...
}
```

A [tömb lebontó](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) szintaxis lehetővé teszi számunkra különféle nevet adni a `useState` hívásakor a deklarált állapotváltozóknak. Ezek a nevek nem a `useState` API részei. Ehelyett a React feltételezi, hogy ha a `useState`-t többször is meghívod, akkor ezt minden renderelés során ugyanabban a sorrendben teszed. Később vissza fogunk térni arra, hogy ez miért működik, és mikor igazán hasznos.

#### De mi is egy Horog igazából? {#but-what-is-a-hook}

A horgok függvények, amik "beleakaszkodnak" a React állapot és életciklus funkciókba függvénykomponensekből. A horgok nem működnek osztálykomponensekben -- a React használatát teszik lehetővé, osztályok nélkül. (Meglévő komponensek átírását egyik napról a másikra [nem ajánljuk](/docs/hooks-intro.html#gradual-adoption-strategy), de új komponensekben elkezdhetsz Horgokat használni, ha szeretnéd.)

A React biztosít néhány beépített Horgot, mint a `useState`. Saját Horgokat is készíthetsz, ha állapotteljes viselkedést szeretnél különböző komponensek között megosztani. Először nézzük a beépített Horgokat.

>Részletes magyarázat
>
>Az Állapot Horogról az annak dedikált oldalon többet tanulhatsz: [Állapot Horog használata](/docs/hooks-state.html).

## ⚡️ Hatás Horog {#effect-hook}

Valószínűleg hajtottál már végre adatlehívást, feliratkozást, vagy manuális DOM változást React komponensekből. Ezeket a műveleteket "mellékhatásoknak" (vagy röviden csak "hatásoknak") hívjuk, mert más komponensekre is kihatással lehetnek, és renderelés közben nem elvégezhető műveletek. 

A Hatás Horog, `useEffect`, mellékhatások elvégzését teszi lehetővé függvénykomponensekből. Ugyanazt a célt szolgálja mint a React osztálybeli `componentDidMount`, `componentDidUpdate`, és `componentWillUnmount`, de egy egyszerű API-be sűrítve. (A [Hatás Horog használata](/docs/hooks-state.html) fejezetben mutatni fogunk egy példát, ami összehasonlítja a `useEffect`-et ezekkel a metódusokkal.)

Például ez a komponens a dokumentum címét változtatja meg azután, hogy a React frissítette a DOM-ot:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Hasonló a componentDidMount és componentDidUpdate-hez:
  useEffect(() => {
    // A dokumentum címének frissítése a böngésző API segítségével
    document.title = `${count} alkalommal kattintottál`;
  });

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

Amikor meghívod a `useEffect`-et, azt közlöd a Reacttel, hogy az futtassa a "hatás" függvényed azután, hogy a változásokat eszközölte a DOM-on. A hatások a komponensen belül vannak deklarálva, hogy hozzáférjenek a propokhoz és az állapothoz. Alapértelmezés szerint a React minden renderelés után lefuttatja ezeket a hatásokat -- **beleértve** az első renderelést is. (A [Hatás Horog használata](/docs/hooks-effect.html) fejezetben beszélni fogunk arról, hogy ez hogyan hasonlítható össze az osztályok életciklusaival.)

A hatások opcionálisan azt is közölhetik, hogy hogyan "takarítsanak fel" maguk után egy függvény visszaadásával. Például ez a komponens egy hatást használ egy barát online státuszára való feliratkozásához, és arról való leiratkozással takarít fel maga után:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Betöltés...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

Ebben a példában a React akkor iratkozik le a `ChatAPI`-ről, amikor a komponens leválik, valamint a hatás újrahívása előtt is, későbbi renderelések következtében. (Ha szeretnéd, létezik módja annak, hogy [közöld a Reacttel az újrafeliratkozások átugrását](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects), amennyiben a `props.friend.id` amit a `ChatAPI`-nek adtunk át nem változott.)

Ahogyan a `useState` esetében is, úgy több hatást is használhatsz egy komponensen belül:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} alkalommal kattintottál`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

A Horgok lehetővé teszik mellékhatások összerendezését egy komponensben a darabok összefüggését alapul véve (mint például feliratkozások hozzáadása, eltávolítása) ahelyett, hogy ezek feldarabolására kényszerülnél az életciklus metódusok miatt.

>Részletes magyarázat
>
>A Hatás Horogról az annak dedikált oldalon többet tanulhatsz: [Hatás Horog használata](/docs/hooks-effect.html).

## ✌️ A horgok szabályai {#rules-of-hooks}

A horgok JavaScript függvények, de további két szabályt szabnak meg:

* Horgokat csakis a **legfelsőbb szinten** hívj meg. Ne hívj meg horgokat ciklusokban, feltételes ágakban, vagy egymásba ágyazott függvényekben.
* Horgokat csakis **React függvénykomponensekből** hívj meg. Ne hívj meg horgokat általános JavaScript függvényekből. (Csakis egy másik helye létezik a horgok szabályos meghívásának -- a saját, egyedi horgaidban. Ezekről nemsokára tanulni fogunk.)

Szolgáltatunk egy [linter plugint](https://www.npmjs.com/package/eslint-plugin-react-hooks), ami ezen szabályok automatikus betartására kényszerít. Megértjük, ha ezek a szabályok elsőre korlátozónak és összezavarónak tűnnek, de alapvetőek a horgok helyes működéséhez.

>Részletes magyarázat
>
>Ezekről a szabályokról az ezeknek dedikált oldalon többet tanulhatsz: [Horgok szabályai](/docs/hooks-rules.html).

## 💡 Készítsd el a saját horgod {#building-your-own-hooks}

Néha szeretnénk állapotteljes logikát megosztani komponensek között. Hagyományosan ennek a problémának két népszerű megoldása létezett: [felsőbb rendű komponensek](/docs/higher-order-components.html) és [render propok](/docs/render-props.html). Az egyedi horgok ezt a problémát oldják meg, extra komponensek a komponensfádhoz való hozzáadása nélkül.

Korábban ezen az oldalon bemutattuk a `FriendStatus` komponenst ami meghívja a `useState` és `useEffect` horgokat egy barát online státuszára való feliratkozáshoz. Tegyük fel, hogy egy másik komponensben újra fel szeretnénk használni a feliratkozó logikát.

Először is kivonjuk a logikát egy egyedi horogba, amit `useFriendStatus`-nak hívunk:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Ez egy `friendID`-t fogad argumentumként, és a barátunk online állapotát adja vissza.

Így már mindkét komponensben használhatjuk:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Betöltés...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Ezen komponensek állapota egymástól teljesen független. A horgok az *állapotteljes logika* újrafelhasználásának egy módja, nem maguknak az állapotoknak. Valójában minden egyes horog *meghívás*-nak teljesen elzárt állapota van -- szóval ugyanazt az egyedi horgot akár kétszer is használhatod egy komponensen belül.

Az egyedi horgok sokkal inkább egy közös egyezmény eredményei, mint egy egyedi funkció. Ha egy függvény neve a "`use`" szóval kezdődik, és más horgokat hív meg, akkor azt mondjuk, hogy az egy egyedi horog. A `useSomething` elnevezési gyakorlat a módja, ami lehetővé teszi a linter pluginunknak horgokat használó kódban hibákat találni.

Írhatsz egyedi horgokat, ami a felhasználási esetek egy széles skáláját fedi le, mint például űrlapok kezelése, animációk, deklaratív feliratkozások, időzítők, és valószínűleg sok más eset, amiket nem vettünk figyelembe. Izgatottan figyeljük, hogy a React közösség milyen egyedi horgokkal rukkol elő.

>Részletes magyarázat
>
>Az egyedik horgokról az ennek dedikált oldalon többet tanulhatsz: [Saját horgok készítése](/docs/hooks-custom.html).

## 🔌 Egyéb horgok {#other-hooks}

Van néhány kevésbé használt beépített horog is, amit hasznosnak találhatsz. Például a [`useContext`](/docs/hooks-reference.html#usecontext) lehetővé teszi a React kontextusokra való feliratkozást, egymásba ágyazások nélkül:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

És a [`useReducer`](/docs/hooks-reference.html#usereducer), ami komplex komponensek állapotának kezelését teszi lehetővé reducer-ek segítségével:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Részletes magyarázat
>
>Minden beépített horogról az ennek dedikált oldalon többet tanulhatsz: [Horgok API referencia](/docs/hooks-reference.html).

## Következő lépések {#next-steps}

Hűha, ez gyors volt! Ha néhány dolog nem teljesen volt világos, vagy részletesebben szeretnél valamiről tanulni, elolvashatod a következő oldalakat, kezdve az [Állapot Horog](/docs/hooks-state.html) dokumentációjával.

Megnézheted a [Horgok API referencia](/docs/hooks-reference.html) oldalát, és a [Horgok GY.I.K.](/docs/hooks-faq.html) oldalát is.

Végezetül ne hagyd ki a [bemutató oldalt](/docs/hooks-intro.html), ami a horgok hozzáadásának a *miértjét* magyarázza el, és hogy hogyan fogjuk őket osztályok mellett használni -- az alkalmazásaink átírása nélkül.
