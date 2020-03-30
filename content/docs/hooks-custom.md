---
id: hooks-custom
title: Saját Horgok készítése
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

A *Horgok* a React 16.8-as verziójában lettek hozzáadva. Osztályok létrehozása nélkül is lehetőséget kínálnak állapot, és más React funkciók használatához.

A saját Horgok készítésével lehetőséged van komponenslogika újrafelhasználható függvényekbe való kivonására.

Amikor [a Hatás Horog használatáról](/docs/hooks-effect.html#example-using-hooks-1) tanultunk, láttuk, hogy ez a csevegőalkalmazás komponens egy üzenetet jelenít meg arról, hogy egy barátunk státusza éppen online vagy offline:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

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

Most tegyük fel, hogy a csevegőalkalmazásunk rendelkezik egy kontaktlistával is, és az online lévő felhasználók neveit zöld színnel akarjuk renderelni. Átmásolhatjuk a hasonló logikát a `FriendListItem` komponensből, de ez nem lenne ideális:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Ehelyett jó lenne megosztani ezt a logikát a `FriendStatus` és `FriendListItem` komponensek között.

Hagyományosan a Reactben két népszerű módja létezett állapot teljes logika komponensek közti megosztására: [render propok](/docs/render-props.html) és [felsőbb rendű komponensek](/docs/higher-order-components.html). Most azt nézzük meg, hogy a Horgok hogyan oldják meg majdnem ugyanazokat a problémákat anélkül, hogy arra kényszerítenének bennünket, hogy új komponenseket adjunk hozzá a fához.

## Egy egyedi Horog kivonása {#extracting-a-custom-hook}

Amikor logikát szeretnénk megosztani két JavaScript függvény között, azt ki szoktuk vonni egy harmadik függvénybe. Mindkét komponens és a Horgok is függvények, szóval ez itt is működni fog!

**Egy egyedi Horog egy JavaScript függvény, aminek a neve a "`use`" előtaggal kezdődik, és meghívhat más Horgokat is.** Például az alábbi `useFrientStatus` az első egyedi Horgunk:

```js{3}
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Semmi új nincs benne -- a logika a fentebbi komponensből lett átmásolva. Ahogyan egy komponensben is, itt szintén ügyelj rá, hogy a Horgokat ne feltételesen hívd meg az egyedi Horog legfelsőbb szintjén.

Egy React komponenssel ellentétben, egy egyedi Horognak nem kell egy specifikus szignatúrával rendelkeznie. Mi dönthetünk az argumentumokról, és hogy mit adjon vissza, ha egyáltalán bármit is vissza kell adnia. Más szóval ez csak egy egyszerű függvény. A neve mindig `use`-val kell hogy kezdődjön annak érdekében, hogy első pillantásra el tudd dönteni, hogy vonatkoznak-e rá a [Horgok szabályai](/docs/hooks-rules.html).

A `useFriendStatus` Horgunk lényege, hogy feliratkozzon egy barátunk státuszára. Ezért fogad egy `friendID`-t argumentumként, és adja vissza ennek a barátnak az online státuszát:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

Most lássuk, hogy hogyan tudjuk használni az egyedi Horgunkat.

## Egyedi Horog használata {#using-a-custom-hook}

A kezdetben a kitűzött célunk az volt, hogy eltávolítsuk a duplikált logikát a `FriendStatus` és `FriendListitem` 
komponensekből. Mindkettő a barátunk státuszát szeretné tudni.

Most hogy kivontuk ezt a logikát egy `useFriendStatus` horogba, *egyszerűen elkezdhetjük ezt használni*:

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

**Ez a kód megegyezik az eredeti példával?** Igen, pontosan ugyanúgy működik. Ha közelebbről is megnézed, észreveheted, hogy semmilyen változást nem eszközöltünk a viselkedésen. Csak annyit tettünk, hogy kivontunk valamennyi közös kódot két függvényből egy különálló függvénybe. **Az egyedi Horgok egy olyan konvenció, ami természetesen következik a Horgok tervezéséből, inkább mint hogy egy React funkció lenne.**

**Muszáj az egyedi Horgaim neveit "`use`"-val kezdenem?** Kérünk, tedd. Ez a konvenció nagyon fontos. Enélkül nem tudjuk automatikusan leellenőrizni, hogy a [Horgok szabályai](/docs/hooks-rules.html) meg lettek-e szegve, mert nem tudhatjuk, hogy egy bizonyos függvényen belül vannak-e Horog meghívások.

**Két, ugyanazt a Horgot használó komponens saját állapotukat is megosztja?** Nem. Az egyedi Horgok egy mechanizmus *állapot teljes logika* újrafelhasználására (mint például feliratkozás, vagy jelenlegi érték megjegyzése), de minden alkalommal amikor egy egyedi Horgot használsz, minden állapot és hatás teljesen elzártan működik.

**Hogyan kap egy egyedi Horog elzárt állapotot?** A Horog minden *meghívása* elzárt állapottal rendelkezik. Mivel a `useFriendStatus`-t közvetlenül hívjuk meg, a React szemszögéből a komponensünk csak `useState` és `useEffect` hívásokat végez. És ahogy [korábban](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) [megtanultuk](/docs/hooks-state.html#tip-using-multiple-state-variables), a `useState` és `useEffect` akárhányszor meghívható egy komponensben, és azok teljesen függetlenek lesznek.

### Tipp: Információ átadása Horgok között {#tip-pass-information-between-hooks}

Mivel a Horgok függvények, át tudunk adni információt közöttük.

Hogy ezt illusztráljuk, egy másik komponenst használunk az elméleti csevegőalkalmazás példánkból. Ez egy csevegő üzenet címzettválasztó, ami azt jelzi, hogy a jelenleg választott barátunk online van-e.

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

A választott barát azonosítóját a `recipientID` állapot változóban tartjuk, és frissítjük, ha a felhasználó egy másik barátot választ a `<select>` menüből.

Mivel a `useState` Horog meghívás a a `recipientID` állapot változó legújabb értékét adja vissza, ezt átadhatjuk a `useFriendStatus` Horognak argumentumként:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Így tudjuk, ha a *jelenleg kiválasztott* barátunk online van-e. Ha egy másik barátot választunk, és frissítjük a `recipientID` állapot változót, a `useFriendStatus` Horgunk leiratkozik az előzőleg választott barátunkról, és feliratkozik az újonnan választott státuszára.

## `useYourImagination()` (Használd a képzeleted) {#useyourimagination}

Az egyedi Horgok olyan flexibilitást nyújtanak logika megosztására, ami korábban nem volt lehetséges a React komponensekben. Írhatsz egy egyedi Horgot ami űrlapkezeléstől animáción, deklaratív feliratkozásokon, és időzítőkön át, valószínűleg általunk nem is gondolt eseteket is lefed. Mi több, olyan Horgokat építhetsz, amiket ugyanolyan könnyű használni, mint a React beépített funkcióit.

Próbálj a korai absztrakcióknak ellenállni. Most, hogy a függvénykomponensek többet tudnak csinálni, valószínű, hogy, az átlag függvénykomponensed a kódbázisodban hosszabb lesz. Ez normális -- ne érezd úgy, hogy *muszáj* azonnal Horgokra lebontanod azt. De arra is bátorítunk, hogy próbálj meg olyan esetek után fürkészni, ahol egy komplex logikát egy egyszerű interfész mögé tudnál rejteni, vagy egy zavaros komponenst tudsz átláthatóbbá tenni egyedi Horgokkal.

Lehet például, hogy van egy komplex komponensed, ami sok helyi állapotot tartalmaz, amit alkalmi módon kezelsz. A `useState` nem teszi egyszerűbbé a frissítési logika centralizálását, szóval lehet, hogy egy [Redux](https://redux.js.org/)-szerű redukátort inkább preferálnál:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... más akciók ...
    default:
      return state;
  }
}
```

A redukátorokat nagyon kézenfekvő elzártan tesztelni, és jól skálázódnak komplex frissítési logika kifejezése esetén. Továbbá kisebb redukátorokra is lebonthatod őket, ha szükséges. Azonban lehet, hogy szimplán élvezed a React helyi állapotának előnyeit, vagy csak nem akarsz egy extra könyvtárat telepíteni.

Szóval mi lenne, ha írni tudnánk egy `useReducer` Horgot, ami a komponensünk *helyi* állapotát tudná kezelni egy redukátorral? Egy leegyszerűsített változat így nézne ki:

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

Ezt így tudnánk használni a komponensünkben, ahol a redukátor hajtaná az állapotkezelést:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

Az igény arra, hogy komplex komponensek helyi állapotát kezelni tudjuk egy redukátorral elég általános, így a `useReducer` Horgot közvetlenül beépítettük a Reactbe. Megtalálható a többi beépített Horoggal együtt, a [Horgok API referencia](/docs/hooks-reference.html) oldalon.
