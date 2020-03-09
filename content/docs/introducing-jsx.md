---
id: introducing-jsx
title: JSX bemutatása
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Vizsgáljuk meg a következő változó deklarálást:

```js
const element = <h1>Helló, világ!</h1>;
```

Ez a furcsa szintaxis se nem szöveg se nem HTML.

JSX-nek hívják, ami egy szintaxis kiterjesztés a JavaScript nyelvhez. Ajánlani tudjuk a React-el való használatát a felhasználói felület kinézetének leírásához. A JSX egy sablonnyelvre emlékeztethet, de a JavaScript teljes erejével bír.

A JSX React "elemeket" állít elő. A DOM-ba való renderelésüket a [következő szekcióban](/docs/rendering-elements.html) fogjuk megvizsgálni. Lent megtalálod a JSX alapjait, amelyek az elinduláshoz szükségesek.

### Miért a JSX? {#why-jsx}

A React azt az elvet vallja, hogy a megjelenítési logika eleve összekapcsolódik a többi felhasználói felületi logikával: az események kezelésével, állapotok időbeni változásával, és hogy az adat hogyan van előkészítve annak megjelenítéséhez.

Ahelyett, hogy a *technológiákat* mesterségesen elválasztaná azzal, hogy a jelölést és a logikát külön fájlokba helyezi, a React szempontok szerint szeparál lazán összekapcsolt „komponenseknek” nevezett egységekkel, amelyek mindkettőt tartalmazzák. Vissza fogunk térni a komponensekhez egy [későbbi szekcióban](/docs/components-and-props.html), ha még nem vagy otthon a jelölés JS-ben való használatával, [ez a beszélgetés](https://www.youtube.com/watch?v=x7cQ3mrcKaY) meggyőzhet téged.

A React [nem követeli meg](/docs/react-without-jsx.html) a JSX használatát, de a legtöbb ember hasznosnak találja mint vizuális segédeszköz ha felhasználói felülettel dolgozik JavaScript kódban. Ezenkívül azt is lehetővé teszi, hogy a React hasznosabb hiba- és figyelmeztető üzeneteket jelenítsen meg.

Ezeket tisztázva, kezdjünk is bele!

### Beágyazott kifejezések JSX-ben {#embedding-expressions-in-jsx}

A következő példában egy `name` változót deklarálunk, majd a JSX-ben használjuk úgy, hogy kapcsos zárójelbe tesszük:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Helló, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

A JSX-be bármilyen érvényes [JavaScript kifejezést](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) beilleszthetsz kapcsos zárójelek közé. Például a `2 + 2`, `user.firstName`, vagy a `formatName(user)` mind érvényes JavaScript kifejezések.

Az alábbi példában a `formatName (user)` JavaScript függvény meghívásának eredményét ágyazzuk be a `<h1>` elembe.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Helló, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

A JSX-et több sorra bontottuk az olvashatóság érdekében. Bár ez nem kötelező, de ha így csinálod akkor azt javasoljuk, hogy tedd zárójelek közé, hogy elkerüld az [automatikus pontosvessző beillesztésének](https://stackoverflow.com/q/2846283) buktatóit.

### A JSX egy kifejezés is {#jsx-is-an-expression-too}

A fordítás után a JSX kifejezések normál JavaScript hívásokká válnak, és JavaScript objektumokra értékelődnek ki.

Ez azt jelenti, hogy a JSX-et használhatod `if` utasításokban és `for` ciklusokban, hozzárendelheted változókhoz, és paraméterként vagy visszatérési értékként is használhatod egy függvény esetében:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Helló, {formatName(user)}!</h1>;
  }
  return <h1>Helló, idegen.</h1>;
}
```

### Attribútumok meghatározása a JSX segítségével {#specifying-attributes-with-jsx}

Idézőjelek segítségével megadhatsz karakterláncokat attribútumként:

```js
const element = <div tabIndex="0"></div>;
```

Kapcsos zárójelekkel beágyazhatsz JavaScript kifejezést egy attribútumba:

```js
const element = <img src={user.avatarUrl}></img>;
```

Ne használj idézőjeleket kapcsos zárójelek körül, mikor JavaScript kifejezést ágyazol be egy attribútumba. Használhatsz idézőjeleket (karakterláncokhoz) vagy kapcsos zárójelet (kifejezésekhez), de mindkettőt egy attribútumon belül ne.

>**Figyelem:**
>
>Mivel a JSX közelebb áll a JavaScripthez, mint a HTML-hez, a REACT DOM a `camelCase` elnevezési stílust használja a HTML attribútumnevek helyett.
>
>Például a `class` JSX-ben [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)-re változik, a `tabindex`-et pedig [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)-ként tudjuk használni.

### Gyermekek megadása JSX-ben {#specifying-children-with-jsx}

Ha egy címke üres, akkor azonnal lezárhatod egy `/>` (önlezáró) taggel, mint ahogy XML-ben is:

```js
const element = <img src={user.avatarUrl} />;
```

A JSX-címkék gyermekeket is tartalmazhatnak:

```js
const element = (
  <div>
    <h1>Helló!</h1>
    <h2>Jó itt látni.</h2>
  </div>
);
```

### A JSX megakadályozza az injekciós támadásokat {#jsx-prevents-injection-attacks}

A felhasználói bevitel beágyazása a JSX-be biztonságos:

```js
const title = response.potentiallyMaliciousInput;
// Ez biztonságos:
const element = <h1>{title}</h1>;
```

Alapértelmezés szerint a React DOM [szanitálja](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) az összes JSX-be beágyazott értéket, mielőtt azokat megjelenítené. Így biztosítja azt, hogy soha nem tudsz bármi olyat injektálni, amit kifejezetten nem a te alkalmazásodban írtak. Minden átalakul karakterlánccá, mielőtt megjelenítésre kerül. Ez segít megelőzni az [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) típusú támadásokat.

### A JSX objektumokat reprezentál {#jsx-represents-objects}

A Babel a JSX-et `React.createElement()` hívásokra fordítja le.

Ez a két példa megegyezik:

```js
const element = (
  <h1 className="greeting">
    Helló, világ!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Helló, világ!'
);
```

A `React.createElement()` végrehajt pár ellenőrzést a hibamentes kód megírásának érdekében, de alapvetően ehhez hasonló objektumokat hoz létre:

```js
// Megjegyzés: ez a szerkezet egyszerűsített
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Helló, világ!'
  }
};
```

Ezeket az objektumokat "React elemeknek" nevezzük. Gondolhatunk rájuk úgy, mint annak a leírása amit a képernyőn látni szeretnénk. A React olvassa ezeket az objektumokat és arra használja, hogy a DOM-ot felépítse és naprakészen tartsa.

A [következő szekcióban](/docs/rendering-elements.html) megvizsgáljuk a React elemek DOM-ba való renderelését.

>**Tipp:**
>
>Javasoljuk, hogy általad használt kódszerkesztőben használd a ["Babel" nyelvdefiníciót](https://babeljs.io/docs/editors), így az ES6 és JSX kódrészek is helyesen lesznek kiemelve.
