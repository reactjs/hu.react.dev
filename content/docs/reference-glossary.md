---
id: glossary
title: React szójegyzék
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Single-page applikáció {#single-page-application}

Egy single-page, vagy egyoldalas applikáció egy olyan alkalmazás, ami a futáshoz egyetlen HTML oldalt és az összes szükséges egyéb fájlt (pl.: JavaScript és CSS) tölti be. Bármilyen interakció az oldallal vagy alárendelt oldalakkal nem igényel a szerver felé kérést, ami azt jelenti, az oldal nem töltődik újra.

A React-ben tudsz single-page applikációkat készíteni, de ez nem kötelező. A React arra is jó lehet, ha egy létező weboldal kisebb részeit szeretnéd feljavítani extra interaktivitással. A React-ben írt kód békésen együtt tud élni a szerveren renderelt kóddal, mint például PHP, vagy más kliens-oldali könyvtárakkal. Valójában a Facebook-nál is pont így használjuk a React-et.

## ES6, ES2015, ES2016, stb. {#es6-es2015-es2016-etc}

Ezek a mozaikszavak mind az ECMAScript nyelv specifikáció standard legújabb verziójaira utalnak, aminek a JavaScript nyelv az egyik implementációja. Az ES6-os verzió (ES2015-ként is ismert) sok újdonságot tartalmaz a korábbi verziókhoz képest, mint például: nyíl függvények, osztályok, sablon literálok, `let` és `const` állítások. Az egyes verziókról [itt](https://en.wikipedia.org/wiki/ECMAScript#Versions) tanulhatsz többet.

## Fordítóprogramok {#compilers}

Egy JavaScript fordítóprogram fogja a JavaScript kódot, transzformálja és visszaadja azt egy másik JavaScript kódformátumban. Leggyakrabban az ES6 szintaxis transzformálására használt, azért hogy a régebbi böngészők is értelmezni tudják a kódot. A React esetében egyik leggyakrabban használt ilyen fordítóprogram a [Babel](https://babeljs.io/).

## Kötegelők {#bundlers}

A kötegelők fogják a különálló (gyakran több száz) modulokban megírt JavaScript és CSS kódot, és egyesítik azt néhány böngészőkre jobban optimalizált fájlban. Néhány, a React alkalmazások esetében gyakran használt kötegelő például a [Webpack](https://webpack.js.org/) és a [Browserify](http://browserify.org/).

## Csomagkezelők {#package-managers}

A csomagkezelők olyan eszközök, amik lehetővé teszik egy projekt függőségeinek a kezelését. Az [npm](https://www.npmjs.com/) és a [Yarn](https://yarnpkg.com/) két gyakran használt csomagkezelő a React alkalmazások esetében. Mindkettő egy kliens ugyanahhoz az npm csomag regisztrátorhoz.

## CDN {#cdn}

A CDN a Content Delivery Network (tartalom szolgáltató hálózat) rövidítése. A CDN-ek gyorsítótárazott, statikus tartalmat szolgáltatnak egy világot átszelő szerverhálón keresztül.

## JSX {#jsx}

A JSX egy JavaScript szintaxis kiegészítés. Hasonló egy sablon nyelvhez, de a JavaScript teljes erejével rendelkezik. A JSX le van fordítva `React.createElement()` hívásokra, ami egyszerű JavaScript objektumokat térít vissza, amiket "React elemeknek" hívunk. Egy egyszerű bevezetőért [nézd meg a dokumentációt itt](/docs/introducing-jsx.html), egy mélyebbre ható JSX tutoriálért pedig nézd meg [ezt](/docs/jsx-in-depth.html).

A React DOM camelCase konvenciókat használ tulajdonságok elnevezésére HTML attribútum nevek helyett. Például a `tabindex` JSX-ben `tabIndex`-é válik. A `class` attribútumot is `className`-ként kell írjuk, mivel a `class` a JavaScript-ben egy fenntartott szó:

<<<<<<< HEAD
```js
const name = 'Klaudia';
ReactDOM.render(
  <h1 className="hello">A nevem {name}!</h1>,
  document.getElementById('root')
);
```  
=======
```jsx
<h1 className="hello">My name is Clementine!</h1>
```
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985

## [Elemek](/docs/rendering-elements.html) {#elements}

A React elemek a React alkalmazások építőkockái. Könnyen összetéveszthető a sokkal ismertebb "komponens" fogalmával. Egy elem azt írja le, amit a képernyőn szeretnél látni. A React elemek megváltoztathatatlanok.

```js
const element = <h1>Helló, világ</h1>;
```

Az elemeket általában nem közvetlenül használjuk, hanem egy komponens adja őket vissza.

## [Komponensek](/docs/components-and-props.html) {#components}

A React komponensek kis, újrafelhasználható kódrészletek, amik React elemeket adnak vissza, amiket az oldalra renderelünk. A React komponens legegyszerűbb verziója egy egyszerű JavaScript függvény, ami egy React elemet ad vissza:

```js
function Welcome(props) {
  return <h1>Helló, {props.name}</h1>;
}
```

A komponensek lehetnek ES6 osztályok is:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Helló, {this.props.name}</h1>;
  }
}
```

A komponenseket le tudjuk bontani különálló funkcionális részekre és használni azokat más komponensekben. A komponensek vissza tudnak adni más komponenseket, tömböket, sztringeket és számokat. Egy jó ökölszabály, hogy ha a kezelőfelületed egy részét több helyen is használod (Button, Panel, Avatar), vagy elég komplex saját magában is (App, FeedStory, Comment), akkor ez egy jó jelölt lehet egy újrafelhasználható komponens készítéséhez. A komponenseket mindig nagybetűvel kezdjük (`<Wrapper/>` **nem** `<wrapper/>`). Több információért a komponensek rendereléséről nézd meg [ezt a dokumentációt](/docs/components-and-props.html#rendering-a-component).

### [`prop`-ok](/docs/components-and-props.html) {#props}

A `props`, vagy prop-ok a React komponens bemenetei. Adatot tartalmaznak, amiket szülő komponensekből küldünk le gyermek komponenseknek.

Jegyezd meg, hogy a `props` csakis olvasható. Soha, semmilyen körülmények között ne módosítsd őket:

```js
// Helytelen!
props.number = 42;
```

Ha valamilyen értéket kell módósítani egy felhasználó vagy hálózaton érkező bemenetre válaszolva, használd inkább a `state`-t.

### `props.children` {#propschildren}

A `props.children` minden komponensen elérhető. Tartalma minden ami egy komponens kezdő és záró címkéi között van. Például:

```js
<Welcome>Helló, világ!</Welcome>
```

A `Helló, világ!` sztring elérhető a `props.children`-ben a `Welcome` komponensben:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

Osztálykomponensek esetében használd a `this.props.children`-t:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`, vagy helyi állapot](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Egy komponensnek `state`-re, helyi állapotra van szüksége, ha az azzal párosított adat az idő során változni fog. Például egy `Checkbox` komponensnek szüksége lehet egy `isChecked` értékre az állapotában, vagy egy `NewsFeed` komponens talán nyomon akarja követni a `fetchedPosts`-okat annak helyi állapotában.

A legfontosabb különbség a `state` és a `props` között, hogy a `props` szülő komponensekből van átadva, amíg a `state`-t a komponens maga kezeli. Egy komponens nem változtathatja meg annak saját `props` értékeit, de a `state`-t igen.

Minden változó adatot egyetlen komponens kell, hogy "birtokoljon" a saját állapotában. Ne próbálj állapotokat szinkronizálni két különböző komponensben. Ehelyett [emeld fel az állapotot](/docs/lifting-state-up.html) a legközelebbi közös ősbe, és küldd le azt prop-ként mindkét komponensnek.

## [Életciklus metódusok](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Az életciklus metódusok egyedi funkciók, amik egy komponens különböző fázisaiban hajtódnak végre. Vannak elérhető metódusok ahhoz, amikor egy komponens létrejön és a DOM-ba van illesztve ([előkészítés](/docs/react-component.html#mounting)), amikor a komponens frissül, és amikor a komponens le van választva és eltávolítva a DOM-ból.

 ## [Kontrollált](/docs/forms.html#controlled-components) vs. [kontrollálatlan komponensek](/docs/uncontrolled-components.html)

A React két különböző módon kezeli az űrlap bemeneteket.

Egy olyan bemeneti űrlap elemet aminek az értékét a React irányítja, *kontrollált komponensnek* hívunk. Amikor egy felhasználó adatot ír be egy kontrollált komponensbe, egy változás eseménykezelő lesz meghívva és a kódod eldönti, hogy a bevitt érték érvényes-e (a frissített érték újrarenderelésével). Ha nem renderelsz újra, az űrlap elem változatlan marad.

Egy *kontrollálatlan komponens* ugyanúgy működik, mint az űrlap elemek a React-en kívül. Amikor a felhasználó adatot ír be egy űrlap mezőbe (egy input doboz, legördülő menü, stb.) a frissített információ anélkül lesz tükrözve, hogy a React-nek bármit is tennie kéne. Azonban ez azt is jelenti, hogy nem tudsz egy mezőt arra kényszeríteni, hogy egy bizonyos értéket vegyen fel.

A legtöbb esetben próbálj kontrollált komponenseket használni.

## [Kulcsok](/docs/lists-and-keys.html) {#keys}

A "key", vagy kulcs egy speciális sztring attribútum, amit elemtömbök létrehozásakor az elemeknek kell tartalmaznia. A kulcsok segítenek a Reactnek azonosítani melyik elemek változtak, lettek hozzáadva vagy törölve. A kulcsokat egy tömbön belül kell hozzáadni, hogy az elemek egy stabil azonossággal rendelkezzenek.

A kulcsoknak csak testvér elemek között kell egyedinek lenniük ugyanabban a tömbben. Nem kell, hogy egyediek legyenek az egész alkalmazásban vagy akár egy szimpla komponensben sem.

Ne használj olyasmit, mint a `Math.random()` kulcsnak. Fontos, hogy a kulcsoknak "stabil azonosságuk" legyen újrarenderelések között, hogy a React el tudja dönteni melyik elemek lettek hozzáadva, törölve, átrendezve. Ideális esetben a kulcsoknak meg kell felelniük az adatból származó egyedi és stabil azonosítóknak, mint például a `post.id`.

## [Ref-ek](/docs/refs-and-the-dom.html) {#refs}

A React támogat egy speciális attribútumot, amit bármelyik komponenshez tudsz kötni. A `ref` attribútum lehet egy objektum amit a [`React.createRef()` függvény](/docs/react-api.html#reactcreateref) készített, vagy egy visszahívó függvény, vagy egy sztring (korábbi API-ben). Ha a `ref` attribútum egy visszahívó függvény, a függvény fogadja a mögöttes DOM elemet vagy osztály példányt (az elem típusától függően) argumentumként. Ez lehetővé teszi, hogy közvetlenül irányítsuk a DOM elemet vagy komponens példányt.

Bánj takarékosan a ref-ekkel. Ha azt veszed észre magadon, hogy túl gyakran használod őket csak azért, hogy a "dolgok csak simán működjenek" az alkalmazásodban, fontold meg a [fentről-lefelé adatfolyam](/docs/lifting-state-up.html) technika megismerését.

## [Események](/docs/handling-events.html) {#events}

A React eseménykezelésének van néhány szintaxisbeli különbsége:

* A React eseménykezelők camelCase neveket használnak, kisbetűk helyett.
* JSX-el sztring helyett egy függvényt adsz meg eseménykezelőnek.

## [Összeegyeztetés](/docs/reconciliation.html) {#reconciliation}

Amikor egy komponens egyik prop-ja vagy helyi állapota megváltozik, a React eldönti, hogy egy tényleges DOM frissítés is szükséges-e az újonnan visszatérített és az előző renderelés elemeinek összehasonlításával. Ha azok nem egyenlőek, a React frissíti a DOM-ot. Ezt a folyamatot hívjuk "összeegyeztetésnek".
