---
id: lists-and-keys
title: Listák és kulcsok
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Először is vegyük át hogyan alakítunk át listákat JavaScript-ben.

Vegyük az alábbi kódot. A [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) függvény fog egy számokkal teli tömböt (`numbers`) és megduplázza annak értékeit. A `map()` által visszaadott új tömböt hozzárendeljük a `doubled` változóhoz, és kiírjuk a konzolba:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Ez a kód a `[2, 4, 6, 8, 10]` tömböt írja ki a konzolba.

A React-ben tömböket [elemlistákká](/docs/rendering-elements.html) majdnem ugyanígy transzformálunk.

### Komponensek többszöri renderelése {#rendering-multiple-components}

Elemkollekciókat kapcsos zárójelek segítségével `{}` készíthetsz és [illeszthetsz JSX-be](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

Az alábbiakban egy `numbers` tömbön iterálunk végig a [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) függvény használatával. Minden elemhez visszaadunk egy `<li>` elemet. Végül hozzárendeljük a kapott elemek tömbjét a `listItems`-hez:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

<<<<<<< HEAD
A `listItems` tömböt belefoglaljuk egy `<ul>` elembe, és [azt a DOM-ba rendereljük](/docs/rendering-elements.html#rendering-an-element-into-the-dom):
=======
Then, we can include the entire `listItems` array inside a `<ul>` element:
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

```javascript{2}
<ul>{listItems}</ul>
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Ez a kód egy pontokba szedett számlistát mutat 1-től 5-ig.

### Alap lista komponens {#basic-list-component}

Listákat általában egy [komponensbe](/docs/components-and-props.html) szeretnénk renderelni.

Az előző példát át tudjuk alakítani egy komponenssé, ami fogad egy `numbers` tömböt, és egy elemlistát ad vissza.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```

Ha ezt a kódot futtatod, egy figyelmeztetést fogsz kapni, hogy minden listaelemnek rendelkeznie kell egy kulccsal. A "key" (kulcs) egy speciális szöveges attribútum, amit fel kell vegyél ha listaelemeket készítesz. A következő szekcióban megbeszéljük hogy ez miért is fontos.

Rendeljünk hozzá egy `key`-t a listaelemeinkhez a `numbers.map()`-en belül, hogy kijavítsuk a kulcs problémát.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Kulcsok {#keys}

A kulcsok segítenek a React-nek azonosítani, hogy mely elemek változtak, lettek hozzáadva, vagy épp törölve. A kulcsokat a tömbön belül kell az elemekhez hozzárendelnünk a stabil azonosíthatóság érdekében:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

A legjobb módja egy kulcs választásának ha egy szöveget használunk, ami egyedien azonosít egy listaelemet annak testvérei között. Leggyakrabban az adatod ID azonosítókulcsa lehet a legjobb kulcs:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Ha nincs egy stabil ID azonosítókulcsod a renderelt elemekhez, akkor használhatod az elemindexet is kulcsként utolsó lehetőségként:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Csak akkor tedd ezt, ha nincs egy stabil ID azonosítókulcsod
  <li key={index}>
    {todo.text}
  </li>
);
```

Ha az elemek sorrendje változhat, akkor nem ajánljuk indexek használatát kulcsként. Ez negatívan hathat ki a teljesítményre és problémákat okozhat a komponens állapotában. Nézd meg Robin Pokorny' cikkét egy [mélyebbre ható magyarázatért, az index mint kulcs használatáról](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318). Ha úgy döntesz, hogy nem rendelsz egy explicit kulcsot a listaelemekhez, a React automatikusan az indexet fogja kulcsként használni.

Itt egy [mélyebbre ható magyarázat, hogy miért is fontosak a kulcsok](/docs/reconciliation.html#recursing-on-children) ha többet szeretnél tanulni.

### Komponensek kivonása kulcsokkal {#extracting-components-with-keys}

A kulcsoknak csak a környező tömb kontextusában van értelmük.

Például ha [kivonsz](/docs/components-and-props.html#extracting-components) egy `ListItem` komponenst, a kulcsot a `<ListItem />` elemen kell hogy tartsd, nem pedig áttenni azt az `<li>` elemre a `ListItem`-en belül.

**Példa: Helytelen kulcshasználat**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Hibás! Itt a kulcs definiálásának nincs semmi értelme:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Hibás! A kulcsot itt kell definiálni:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

**Példa: Helyes kulcshasználat**

```javascript{2,3,9,10}
function ListItem(props) {
  // Helyes! Itt a kulcs definiálásának nincs semmi értelme:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Helyes! A kulcsot itt kell definiálni:
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

Egy jó ökölszabály, hogy a `map()`-en belül lévő minden elemnek rendelkeznie kell egy kulccsal.

### A kulcsoknak csak testvéreik között kell egyedinek lenniük {#keys-must-only-be-unique-among-siblings}

<<<<<<< HEAD
A kulcsoknak egyedinek kell lenniük testvéreik között. Azonban nem kell, hogy globálisan is egyediek legyenek. Ugyanazokat a kulcsokat használhatjuk két különböző tömb készítése esetén:
=======
Keys used within arrays should be unique among their siblings. However, they don't need to be globally unique. We can use the same keys when we produce two different arrays:
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Helló, világ', content: 'Üdövzlünk a React tanulói kurzusában!'},
  {id: 2, title: 'Telepítés', content: 'A React-et npm-ből tudod telepíteni.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

A kulcsok a React számára szolgálnak utalásként, de leküldve nem lesznek a komponenseidnek. Ha ugyanarra az értékre van szükséged a komponensedben is, akkor azt egy másik prop névvel is explicit módon meg kell adnod:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

A fenti példával a `Post` komponens olvasni tudja `props.id`-t, de a `props.key`-t nem.

### map() JSX-be ágyazása {#embedding-map-in-jsx}

A fenti példákban külön deklaráltuk a `listItems` változót és belevettük azt a JSX-be:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

A JSX lehetővé teszi [bármilyen kifejezés beágyazását](/docs/introducing-jsx.html#embedding-expressions-in-jsx) kapcsos zárójelek között, így a `map()` eredményét is:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Ennek néha tisztább kód az eredménye, de ezzel a stílussal könnyű visszaélni. Ahogy a JavaScript-ben is, tőled függ hogy megéri-e kivonni egy változót az olvashatóság érdekében. Tartsd észben hogy ha a `map()` teste túl beágyazott, talán itt az ideje [kivonni egy komponenst](/docs/components-and-props.html#extracting-components).
