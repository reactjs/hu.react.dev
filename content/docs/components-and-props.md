---
id: components-and-props
title: Komponensek és prop-ok
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

A komponensek lehetővé teszik számodra a felhasználói felület független, újrafelhasználható darabokra való felosztását, és segítenek hogy minden darabról a többitől elzártan tudj gondolkodni. Ez az oldal a komponensek lényegét mutatja be. A [részletes komponens API referenciát itt](/docs/react-component.html) találod.

Elviekben a komponensek olyanok mint a JavaScript függvények. Egy tetszőleges számú inputot fogadnak (amiket "prop"-oknak hívunk) és egy React elemet adnak vissza ami leírja mi jelenjen meg a képernyőn.

## Függvény és Osztály komponensek {#function-and-class-components}

Egy komponens legegyszerűbb definiálásának módja egy JavaScript függvény:

```js
function Welcome(props) {
  return <h1>Helló, {props.name}</h1>;
}
```

Ez a függvény egy érvényes React komponens, mivel egyetlen "props" (angol properties, vagy tulajdonságok) objektum argumentuma van ami adatot tartalmaz, és egy React elemet ad vissza. Egy ilyen komponenst hívunk "függvény komponensnek", mert szó szerint csak egy JavaScript függvény.

Emellett használhatsz [ES6 osztályokat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) is komponensek definiálásához:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Helló, {this.props.name}</h1>;
  }
}
```

A React szemszögéből a fenti két komponens egymással megegyező.

Mind a függvény-, és osztálykomponensek rendelkeznek néhány extra funkcióval, amit a [következő fejezetekben](/docs/state-and-lifecycle.html) beszélünk meg.

## Egy komponens renderelése {#rendering-a-component}

Korábban csak olyan React elemekkel találkoztunk, amik csak DOM címkéket képviseltek:

```js
const element = <div />;
```

Azonban az elemek képviselhetnek a felhasználó által definiált komponenseket is:

```js
const element = <Welcome name="Sára" />;
```

Ha a React egy olyan elemet lát, ami egy felhasználó által definiált komponenst képvisel, akkor a JSX attribútumokat és a gyermekeket egy sima objektumként küldi le a komponensnek. Ezt az objektumot hívjuk "props"-nak.

Például ez a kód a "Helló, Sára" szöveget rendereli az oldalon:

```js{1,6}
function Welcome(props) {
  return <h1>Helló, {props.name}</h1>;
}

<<<<<<< HEAD
const element = <Welcome name="Sára" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;
root.render(element);
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**

Foglaljuk össze mi történik ebben a példában:

<<<<<<< HEAD
1. Meghívjuk a `ReactDOM.render()` metódust a `<Welcome name="Sára" />` elemmel.
2. A React meghívja a `Welcome` komponenst a `{name: 'Sára'}` props objektummal.
3. A `Welcome` komponensünk visszaadja a `<h1>Helló, Sára</h1>` elemet eredményként.
4. A React DOM hatékonyan frissíti a DOM-ot hogy az megegyezzen a `<h1>Helló, Sára</h1>`-val.
=======
1. We call `root.render()` with the `<Welcome name="Sara" />` element.
2. React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3. Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4. React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.
>>>>>>> 951fae39f0e12dc061f1564d02b2f4707c0541c4

>**Megjegyzés:** A komponensek neveit mindig nagybetűvel kezdd.
>
>Azokat a komponenseket amik kisbetűvel kezdődnek, a React szimpla DOM címkékként kezeli. Például a `<div />` egy HTML div címkét képvisel, de a `<Welcome />` egy komponenst, és szükséges, hogy a `Welcome` a hatókörben legyen.
>
>Ha többet szeretnél megtudni ezen közös megegyezés mögötti érvelésről, olvasd el a [JSX-ről mélyebben](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) részt.

## Komponensek komponálása {#composing-components}

A komponensek utalhatnak más komponensekre is a kimenetükben. Ez lehetővé teszi számunkra, hogy ugyanazt a komponens absztrakciót használjuk bármilyen részletességgel. Egy gomb, egy űrlap, egy dialógus, egy képernyő: React alkalmazásokban ezek általában mind komponensként vannak kifejezve.

Például készíthetünk egy `App` komponenst, ami több `Welcome` komponenst renderel:

```js{8-10}
function Welcome(props) {
  return <h1>Helló, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sára" />
      <Welcome name="Kata" />
      <Welcome name="Edit" />
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**

Tipikusan az új React alkalmazásoknak van egy `App` komponensük a legfelsőbb szinten. Azonban ha egy meglévő alkalmazásba integrálod a Reactet, dolgozhatsz lentről felfelé fokozatosan haladva, kezdve kis komponensekkel, mint egy `Button` amíg el nem éred a nézet hierarchia csúcsát.

## Komponensek kivonása {#extracting-components}

Ne félj a komponenseket kisebb komponensekké feldarabolni.

Vedd ezt a `Comment` komponenst példának:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**

Ez fogad egy `author` (objektumot), `text` (karakterláncot), és `date` (dátumot) props-ként, és egy kommentet ír le egy közösségi média weblapon.

Ezt a komponenst furfangos lehet megváltoztatni a sok egymásba ágyazás miatt, és nehéz is újra felhasználni az egyedülálló részeit. Vonjunk ki egy pár komponenst belőle.

Először is kivonjuk az `Avatar` komponenst:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Az `Avatar`-nak nem kell tudnia, hogy mit is renderelünk a `Comment`-ben. Ezért is adtunk a prop-jának egy általánosabb nevet mint a `user`, az `author` helyett.

Ajánljuk a prop-ok elnevezését a komponens saját szemszögéből nézve, a kontextus helyett amiben az használva van.

Most egy kicsit tudunk egyszerűsíteni a `Comment` komponensen:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

A következőben kivonjuk a `UserInfo` komponenst ami az `Avatar`-t rendereli a felhasználó neve mellett:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

Ez tovább egyszerűsíti a `Comment` komponensünket:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrJNJY?editors=1010)**

A komponensek kivonása elsőre morgós munkának tűnhet, de nagyobb alkalmazások esetén gyorsan megtérül, ha egy újrafelhasználható komponenspalettával rendelkezünk. Egy jó ökölszabály, ha a felhasználói kezelőfelületed valamelyik része többször fel van használva (`Button`, `Panel`, `Avatar`), vagy elég bonyolult saját magában is (`App`, `FeedStory`, `Comment`), akkor jó jelölt lehet arra, hogy egy külön komponensbe emeljük ki.

## A prop-ok csak olvashatók {#props-are-read-only}

Függetlenül hogy egy komponenst [függvényként vagy osztályként](#function-and-class-components) deklarálsz, az soha nem módosíthatja annak saját prop-jait. Vedd ezt a `sum` függvényt:

```js
function sum(a, b) {
  return a + b;
}
```

Egy ilyen függvényt ["tiszta"](https://hu.wikipedia.org/wiki/Tiszta_függvény) függvénynek nevezünk, mert nem kísérli megváltoztatni a bemenetét, és mindig ugyanazt az eredményt adja ugyanazon bemenet esetében.

Összehasonlításképpen ez a függvény nem tiszta, mert megváltoztatja a saját bemenetét:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

A React elég rugalmas, de van egy szigorú szabálya:

**Minden React komponensnek tiszta függvényként kell viselkednie annak prop-jaira tekintettel**

Természetesen az alkalmazások felhasználói felületei dinamikusak és idővel változnak. A [következő fejezetben](/docs/state-and-lifecycle.html) bemutatunk egy új koncepciót, az állapotot, vagyis a "state"-t. A állapotok lehetővé teszik a React komponenseknek hogy idővel megváltoztassák a kimenetüket a felhasználó interakciói, hálózati válaszok, vagy bármi más esetén, anélkül, hogy ezt a szabályt megszegnénk.
