---
id: hooks-state
title: A Hatás Horog
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
> - [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
> - [`useEffect`](https://react.dev/reference/react/useEffect)

</div>

A *Horgok* a React egy új kiegészítése a 16.8-as verziótól kezdve. Lehetővé teszik számodra állapotok és más React funkciók használatát osztályok írása nélkül.

A *Hatás Horog* segítségével  mellékhatásokat tudsz elvégezni egy függvénykomponensben:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Hasonló a componentDidMount-hoz és a componentDidUpdate-hez:
  useEffect(() => {
    // A böngésző API segítségével frissíti a dokumentum címét
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

Ez a kódrészlet az [előző oldali számláló példára](/docs/hooks-state.html) épül, de hozzáadtunk egy új funkciót is: a dokumentum címét átállítottuk egy általunk írt üzenetre, amiben az van benne, hogy hányszor kattintottak.

Az Adatlekérés, feliratkozás, vagy a DOM manuális frissítése React komponensekben mind példa mellékhatásokra. Még ha nem is szoktad ezeket "mellékhatásoknak" (vagy csak "hatásoknak") hívni, valószínű, hogy már használtad őket a komponenseidben.

>Tipp
>
>Ha már ismered a React osztályok életciklus metódusait, a `useEffect` Horogra gondolhatsz úgy is, mint a `componentDidMount`, `componentDidUpdate`, és `componentWillUnmount` egyesítése.

Kétféle gyakori mellékhatás létezik React komponensekben: azok, amiknél nincs szükség takarításra, és azok, amiknél van. Most nézzük meg részletesebben, hogy mi ezek között a különbség.

## Takarítást nem igénylő hatások {#effects-without-cleanup}

Néha csak **azután szeretnénk egy kódrészletet futtatni, miután a React frissítette a DOM-ot.** Hálózati kérések, manuális DOM manipulálás vagy logolás mind példák arra, amik nem igényelnek takarítást. Ezt azért mondjuk, mert ezeket futtatás után el is felejthetjük. Most hasonlítsuk össze, hogy hogyan tudjuk kifejezni a mellékhatásokat osztályok vagy Horgok segítségével.

### Példa osztályok használatával {#example-using-classes}

A React osztályokban a `render` metódus önmagában nem kéne, hogy mellékhatásokat okozzon. Ez túl korai lenne -- általában *azután* szeretnénk a hatásokat végrehajtani, hogy a React frissítette a DOM-ot.

Emiatt a React osztályokban a mellékhatásokat a `componentDidMount`-ba és a `componentDidUpdate`-be helyezzük. Visszatérve a példánkhoz, itt van egy React számláló osztály, ami frissíti a dokumentum címét rögtön miután a React frissítette a DOM-ot:

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `${this.state.count} alkalommal kattintottál`;
  }

  componentDidUpdate() {
    document.title = `${this.state.count} alkalommal kattintottál`;
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

Figyeld meg, hogy **duplikálnunk kell a kódot ebben a két életciklus metódusban.**

Ez azért van, mert sok esetben ugyanazt a mellékhatást szeretnénk végrehajtani attól függetlenül, hogy a komponens most lett létrehozva, vagy csak frissítve lett. Alapvetően ezt minden renderelés után szeretnénk végrehajtani -- de a React osztálykomponenseknek nincs ilyen metódusa. Kiemelhetnénk egy külön metódusba, de még így is két helyről kéne azt meghívni.

Most nézzük, hogy hogyan tudjuk ugyanezt a `useEffect` Horoggal elérni.

### Példa Horgok használatával {#example-using-hooks}

Már láttuk ugyanezt a példát az oldal tetején, de nézzük meg még egyszer:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
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

**Mi csinál a `useEffect`?** Ennek a Horognak a használatával megmondhatod a Reactnek, hogy a komponensednek valamit csinálnia kell a renderelés után. A React megjegyzi az átadott függvényt (erre majd úgy hivatkozunk, mint a "hatás") és később, a DOM frissítések után meghívja ezt. Ebben a hatásban beállítjuk a dokumentum címét, de akár adatlekérést vagy valami más API hívást is elvégezhetnénk.

**Miért egy komponensen belül hívjuk meg a `useEffect`-et?** A `useEffect` komponensen belül való elhelyezése megengedi, hogy a `count` állapotváltozót (vagy bármelyik másik propot) elérjük közvetlenül a hatásból. Nem kell egy speciális API, hogy kiolvassuk -- ez már benne van a függvény hatókörében. A Horgok a JavaScript closure-öket használják ahelyett, hogy React-specifikus API-kat hoznának létre, mivel a JavaScriptben már van erre megoldás.

**Lefut-e a `useEffect` mind renderelés után?** Igen! Alapvetően az első rendereléskor *és* minden egyes frissítés után is lefut. (Majd később arról is beszélünk, hogy [hogyan szabjuk személyre ezt](#tip-optimizing-performance-by-skipping-effects).) Ahelyett, hogy "létrehozás"-ban és "frissítés"-ban gondolkozunk, egyszerűbb lehet, ha úgy gondolunk rá, hogy a hatások "renderelés után" történnek. A React garantálja, hogy a DOM már frissült, amikor a hatásokat futtatja.

### Részletes magyarázat {#detailed-explanation}

Most, hogy már többet tudunk a hatásokról, ezek a sorok több értelmet nyertek:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `${count} alkalommal kattintottál`;
  });
}
```

Deklaráljuk a `count` állapotváltozót és megmondjuk a Reactnek, hogy egy hatást kell végrehajtanunk. Átadunk egy függvényt a `useEffect` Horognak. A függvény, amit átadunk *lesz* a hatásunk. A hatásunkon belül beállítjuk a dokumentum címét a `document.title` böngésző API-val. A hatáson belül ki tudjuk olvasni a legfrissebb `count` értéket, mivel ez a függvényünk hatókörében van. Amikor a React rendereli a komponensünket, emlékezni fog a megadott hatásra, és lefuttatja ezt a DOM frissítése után. Ez minden rendereléskor megtörténik az elsőt is beleértve.

Gyakorlottabb JavaScript fejlesztők észrevehetik, hogy a `useEffect`-nek átadott függvény minden rendereléskor különböző lesz. Ez szándékosan van így. Valójában emiatt tudjuk kiolvasni a  `count` értékét a hatáson belül anélkül, hogy aggódnunk kéne a frissessége miatt. Minden egyes újrarendereléskor egy _másik_ hatást ütemezünk be felülírva az előzőt. Bizonyos tekintetben emiatt úgy tűnhet, hogy a hatás a renderelés eredményének a részeként viselkedik -- minden egyes hatás egy adott rendereléshez "tartozik". A [későbbieknek](#explanation-why-effects-run-on-each-update) látni fogjuk, hogy ez miért is hasznos.

>Tipp
>
>A `componentDidMount`-tal és a `componentDidUpdate`-tel ellentétben a `useEffect`-tel ütemezett hatások nem blokkolják a képernyőfrissítést. Emiatt az appod gyorsabbnak tűnhet. A legtöbb hatásnak nem kell szinkron történnie. Néhány kivételes esetben (például a felhasználói felület lemérése), amikor igen, van egy másik [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) Horog, aminek az API-ja ugyanaz, mint a `useEffect`-nek.

## Takarítást igénylő hatások {#effects-with-cleanup}

Korábban megnéztük, hogy hogyan fejezzünk ki takarítást nem igénylő mellékhatásokat. Azonban néhány hatásnak szüksége van rá. Például, amikor **feliratkozunk** egy külső adatfolyamra. Ebben az esetben fontos, hogy takarítást végezzünk, hogy ne okozzunk memóriaszivárgást! Hasonlítsuk össze, hogyan tudjuk ezt osztályokkal és Horgokkal megtenni.

### Példa osztályok használatával {#example-using-classes-1}

Egy React osztályban tipikusan a `componentDidMount`-ban állítanál be egy feliratkozást és a `componentWillUnmount`-ban iratkoznál le. Például, ha mondjuk van egy `ChatAPI` modulunk amivel feliratkozhatunk egy barátunk online állapotára. Egy osztállyal így tudnánk feliratkozni és kiírni az állapotát:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

Figyeld meg, hogy a `componentDidMount` és a `componentWillUnmount` egymás tükörképe. Az életciklus metódusok arra kényszerítenek minket, hogy ezt a logikát felosszuk különböző metódusok között, habár ezek fogalmilag ugyanahhoz a hatáshoz tartoznak.

>Megjegyzés
>
>A sasszemű olvasók észrevehették, hogy egy `componentDidUpdate` metódus is kéne ahhoz, hogy ez a példa teljesen korrekt legyen. Ezt most figyelmen kívül hagyjuk, de a [későbbiekben](#explanation-why-effects-run-on-each-update) visszatérünk erre.

### Példa Horgok használatával {#example-using-hooks-1}

Nézzük, hogy hogyan tudjuk ezt a komponenst átírni Horgok használatával.

Azt gondolhatnád, hogy egy külön hatás kell majd a takarításhoz. De a le- és feliratkozás kódja annyira összefügg, hogy a `useEffect`-et úgy terveztük, hogy ezeket egy helyen tarthassuk. Ha a hatásod egy függvénnyel tér vissza, a React a takarításkor fogja meghívni ezt:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Itt add meg, hogy hogyan takarítson ki a hatás lefutása után:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**Miért tértünk vissza egy függvénnyel a hatásból?** Ez az optimális takarítási mechanizmus a hatásokban. Minden hatás visszaadhat egy takarító függvényt. Így a fel- és leiratkozáshoz használt kódot egy helyen tárolhatjuk. Ezek ugyanahhoz a hatáshoz tartoznak!

**Pontosan mikor takarít fel a React egy hatást?** A React akkor takarít, amikor a komponens leválasztódik. Azonban, ahogy korábban megtanultuk, a hatások minden renderelésről lefutnak, és nem csak egyszer. Emiatt a React *minden egyes* rendereléskor kitakarít az előző renderelés után, mielőtt az új hatásokat futtatja. Később megbeszéljük, ez [miért is segít elkerülni a bugokat](#explanation-why-effects-run-on-each-update) és [hogyan tiltsuk le ezt a viselkedést a teljesítményproblémák elkerülése végett](#tip-optimizing-performance-by-skipping-effects).

>Megjegyzés
>
>Nem kell, hogy elnevezzük a függvényt, amivel visszatérünk a hatásból. Mi `cleanup`-nak (takarításnak) hívtuk itt, hogy egyértelmű legyen a célja, de egy nyílfüggvényt is visszaadhatsz vagy máshogy is hívhatod.

## Összefoglalás {#recap}

Megtanultuk, hogy a `useEffect`-tel kifejezhetünk különbözőféle hatásokat amik a renderelés után futnak le. Néhány hatásnak szüksége lehet takarításra, így ezek egy függvénnyel térnek vissza:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Más hatásoknak nem feltétlenül van szüksége erre, így ezek nem térnek vissza semmivel.

```js
  useEffect(() => {
    document.title = `${count} alkalommal kattintottál`;
  });
```

A Hatás Horog API-ja mindkét esetet lefedi.

-------------

**Ha úgy érzed, hogy már elég jól érted a Hatás Horgok működését, vagy ha ez most túl sok volt, átugorhatsz a [következő oldalra, ami a Horgok szabályairól](/docs/hooks-rules.html) szól.**

-------------

## Tippek a Hatások használatához {#tips-for-using-effects}

Az következő részben részletesebben kielemezzük a `useEffect` néhány tulajdonságát, ami a gyakorlottabb React felhasználók számára érdekes lehet. Ne érezd azt, hogy ezt most kötelező elolvasnod. A későbbiekben is visszatérhetsz erre az oldalra, hogy többet megtudj a Hatás Horog részleteiről.

### Tipp: Használj különálló hatásokat különböző funkciók megvalósítására {#tip-use-multiple-effects-to-separate-concerns}

Az egyik probléma amit a Horgok [Motivációja](/docs/hooks-intro.html#complex-components-become-hard-to-understand) részben kiemeltünk az az, hogy az osztály életciklus metódusok gyakran tartalmaznak egymással össze nem illő logikát, amíg összetartozó logika gyakran több metódusba osztódik fel. Íme egy komponens ami a számláló és a barát online státusz mutatójának logikáját vegyíti az előző példákból:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `${this.state.count} alkalommal kattintottál`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `${this.state.count} alkalommal kattintottál`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

Figyeld meg, hogy a logika, ami beállítja a `document.title`-t, szét van osztva a `componentDidMount` és a `componentDidUpdate` között. A feliratkozási logika pedig szét van osztva a `componentDidMount` és a `componentWillUnmount` között. A `componentDidMount`-ben mindkét logikából van kód.

Szóval hogyan tudják a Horgok megoldani ezt a problémát? Mint ahogy [az *Állapot* Horgot többször is fel tudod használni](/docs/hooks-state.html#tip-using-multiple-state-variables), ugyanúgy többféle hatást is használhatsz. Ez lehetőséget ad rá, hogy a különböző funkciókat külön hatásokba írjuk.

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} alkalommal kattintottál`;
  });

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
  // ...
}
```

**A Horgok használatával viselkedés alapján tudjuk felosztani a kódot**, ahelyett, hogy az életciklusok nevei alapján tennénk ezt. A React az *összes* hatást végrehajtja a komponensben a specifikáció sorrendjében.

### Magyarázat: Miért futnak le a hatások minden egyes frissítéskor {#explanation-why-effects-run-on-each-update}

Ha az osztályokhoz vagy szokva, elgondolkozhattál rajta, hogy a hatások takarítása miért történik meg minden újrarendereléskor, és nem csak akkor, amikor a komponens leválasztódik. Nézzünk meg egy gyakorlati példát arról, hogy ez a viselkedés miért segít nekünk hibamentesebb komponenseket írni.

[Fentebb ezen az oldalon](#example-using-classes-1) bemutattunk egy `FriendStatus` komponens példát, ami megjeleníti egy barátunk online állapotát. Az osztályunk kiolvassa a `friend.id`-t a `this.props`-ból, feliratkozik a barátunk állapotára a komponens létrejötte után és leiratkozik a leválasztáskor:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**De mi történik akkor, ha a `friend` prop megváltozik**, miközben a komponens épp látszik a felületen? A komponensünk továbbra is az előző barát állapotát jelenítené meg. Ez egy bug. Ez memóriaszivárgást vagy az alkalmazás összeomlását is okozhatná, mivel a leiratkozási metódus rossz ID-val hívódik meg.

Egy osztálykomponensben hozzá kéne adnunk a `componentDidUpdate`-t, hogy ezt az esetet is tudjuk kezelni:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Leiratkozás az előző friend.id-ról
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Feliratkozás a következő friend.id-re
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

A `componentDidUpdate` rossz használta egy gyakori hibaforrás React alkalmazásokban.

Most nézzük meg ezt a verziót, ami Horgokat használ:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Ebben nincs benne ugyanaz a hiba. (De nem is változtattunk semmit rajta.)

Nincs szükség külön kódra, ami a frissítéseket kezeli, mivel a `useEffect` *alapból* lekezeli ezeket. Ez kitakarítja az előző hatásokat, mielőtt az új lefutna. Hogy ezt illusztráljuk, itt van egy sorozat a feliratkozási és leiratkozási hívásokból:

```js
// Létrehozás a { friend: { id: 100 } } propokkal
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Az első hatás futtatása

// Frissítés { friend: { id: 200 } } propokkalí
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Az előző hatás kitakarítása
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // A következő hatás futtatása

// Frissítés { friend: { id: 300 } } propokkal
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Az előző hatás kitakarítása
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // A következő hatás futtatása

// Leválasztás
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Az utolsó hatás kitakarítása
```

Ez a viselkedés alapból biztosítja a konzisztenciát és megelőzi a hibákat, amik gyakoriak az osztálykomponensekben az elfelejtett logika miatt.

### Tipp: A teljesítmény optimalizálása a hatások elhagyásával {#tip-optimizing-performance-by-skipping-effects}

Néhány esetben teljesítményproblémákat okozhat a minden renderelés utáni hatások végrehajtása és azok takarítása. Az osztálykomponensekben ezt megoldhatjuk a `prevProps` és `prevState` összehasonlításával a `componentDidUpdate`-ben belül:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `${this.state.count} alkalommal kattintottál`;
  }
}
```

Ez a követelmény elég gyakori, így bele lett építve a `useEffect` Horog API-jába is. Megmondhatod a Reactnek, hogy *hagyja ki* ezt a hatást, ha bizonyos értékek nem változtak az újrarenderelés során. Ehhez a `useEffect`-nek második paraméterként egy tömböt kell átadni:

```js{3}
useEffect(() => {
  document.title = `${count} alkalommal kattintottál`;
}, [count]); // Csak akkor futtatja újra a hatást, ha a count megváltozott
```

A fenti példában a `[count]`-ot egy második paraméterként adjuk át. Ez mit jelent? Ha a `count`-nak `5` az értéke, akkor a komponensünk újrarenderelődik a `count` változatlan értékével, ami `5`, A React összehasonlítja az `[5]`-öt az előző renderelésből és az `[5]`-öt a következő renderelésből. Mivel a tömb összes eleme megegyezik (`5 === 5`), a React kihagyja a hatást. Ez a mi optimalizálásunk.

Amikor a `count` értéke `6`-ra frissül, a React összehasonlítja az előző renderelésbeli `[5]` tömb elemeit a következő renderelésbeli `[6]` tömbből. A mostani esetben a React újra lefuttatja a hatást, mivel `5 !== 6`. Ha több eleme is van a tömbnek, a React akkor is újrafuttatja a hatást, ha csak egy elem különbözik.

Ez akkor is működik, ha a hatásnak van egy takarítási fázisa is:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Csak akkor iratkozik fel újra, ha a props.friend.id megváltozott
```

Elképzelhető, hogy a jövőben ez a második argumentum automatikusan lesz hozzáadva egy fordítási transzformációval.

>Megjegyzés
>
>Ha ezt az optimalizálást használod, bizonyosodj meg róla, hogy **összes érték benne van a komponens hatóköréből (mint a propok és az állapot), amik az idő során változnak, és amit a hatás használ**. Enélkül a kódod elavult értékeket fog tartalmazni az előző renderelésekből. Tudj meg többet arról, hogy [hogyan kezeld a függvényeket](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies), és arról, hogy [mit csináljunk, ha a tömb túl gyakran változik](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>Ha egy hatást csak egyszer szeretnél futtatni és kitakarítani (létrehozáskor és leválasztáskor), átadhatsz egy üres tömböt (`[]`) második argumentumként. Ez megmondja a Reactnek, hogy a hatásod nem függ *semelyik* props vagy állapot értékétől, így ezt nem kell újrafuttatnia. Ez nem egy speciális eset -- abból következik, ahogyan a függőségek amúgy is működnek.
>
>Ha egy üres tömböt adsz át (`[]`), a propok és állapotváltozók a hatáson belül végig megtartják a kezdeti értéküket. Míg a `[]` átadása második paraméterként közelebb áll a `componentDidMount` és a `componentWillUnmount` már ismert modelljéhez, általában [jobb](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [megoldások](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) vannak arra, hogy hogyan tudjuk megelőzni a hatások túl gyakori futását. Ne felejts el azt sem, hogy a React késlelteti a `useEffect` lefuttatását a böngésző kirajzolási fázisa utánra, így ez az extra munka kevésbé jelent problémát.
>
>Ajánljuk az [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) szabály használatát, ami része az [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) csomagnak. Ez jelzi, ha a függőségek rosszul vannak megadva, és megoldást javasol.

## Következő lépések {#next-steps}

Gratulálunk! Ez egy hosszú oldal volt, de remélhetőleg a végére a legtöbb kérdésedet megválaszoltuk, ami felvetődött a hatások kapcsán. Mind az Állapot Horogról, mind a Hatás Horogról tanultál, és ezek kombinálásával *sok mindent* el tudsz érni. Ezek lefedik a legtöbb dolgot, amit az osztályoknál is használtunk -- és amit nem, azt megtalálhatod a [további Horgok](/docs/hooks-reference.html) között.

Azt is elkezdtük észrevenni, hogy a Horgok hogyan oldják meg a problémákat, amiről a [Motiváció](/docs/hooks-intro.html#motivation) részben írtunk. Láttuk, hogy a takarítási mechanizmus hogyan segít elkerülni a `componentDidUpdate`-ben és a `componentWillUnmount`-ben duplikált kódot, összehozza az összetartozó kódrészeket és segít elkerülni a hibákat. Azt is láttuk, hogy hogyan tudjuk különválasztani a hatásokat céljaik szerint, ami egy olyan dolog, amit az osztályokkal nem tudtunk megtenni.

Ezen a ponton érdekelhet, hogy hogyan működnek a Horgok. Hogyan tudja a React, hogy melyik `useState` hívás melyik állapotváltozóhoz tartozik az újrarendereléskor? Hogyan "kapcsolja össze" az előző és következő hatásokat minden frissítéskor? **A következő oldalon a [Horgok szabályairól](/docs/hooks-rules.html) fogunk tanulni -- ezek elengedhetetlenek a Horgok helyes használatához.**
