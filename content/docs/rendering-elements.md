---
id: rendering-elements
title: Elemek renderelése
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Az elemek a React alkalmazások legkisebb építőegységei.

Egy elem azt írja le amit a képernyőn szeretnél látni:

```js
const element = <h1>Helló, világ</h1>;
```

A böngésző DOM elemeivel szemben, a React elemek sima objektumok, és olcsó őket gyártani. Azért hogy a React elemek megegyezzenek a DOM-mal és frissítve legyenek, a React DOM a felelős.

>**Megjegyzés:**
>
>Könnyű lehet összetéveszteni az elemeket a szélesebb körben ismert "komponensek" fogalmával. A komponenseket a [következő fejezetben](/docs/components-and-props.html) fogjuk bemutatni. A komponensek elemekből "tevődnek össze", és bátorítunk hogy olvasd el ezt a fejezetet mielőtt előre ugranál.

## Egy elem renderelése a DOM-ba {#rendering-an-element-into-the-dom}

Tegyük fel, hogy van egy `<div>` valahol a HTML fájlodban:

```html
<div id="root"></div>
```

Ezt hívjuk "gyökér" DOM csomópontnak, mert mindent ami benne van azt a React DOM fogja kezelni.

A React-el készített alkalmazásoknak általában egy gyökér DOM csomópontjuk van. Ha egy már meglévő alkalmazásba akarod a Reactet integrálni, annyi elszigetelt gyökér DOM csomópontot vehetsz fel, amennyit szeretnél.

<<<<<<< HEAD
Egy React elem gyökér DOM csomópontba való rendereléséhez, add meg mindkettőt paraméterként a [`ReactDOM.render()`](/docs/react-dom.html#render) metódusnak:
=======
To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

Ez egy "Helló, világ"-ot jelenít meg az oldalon.

## A renderelt elem frissítése {#updating-the-rendered-element}

A React elemek [megváltoztathatatlanok](https://en.wikipedia.org/wiki/Immutable_object). Ha egyszer készítettél egy elemet, már nem tudod annak gyermekeit vagy attribútumait módosítani. Egy elem olyan mint egy sima képkocka egy filmben: az felhasználói felületet reprezentálja egy adott pillanatban.

<<<<<<< HEAD
Az eddigi tudásunkkal az egyetlen módja a felhasználói felületünk frissítésének, ha egy új elemet hozunk létre, és megadjuk paraméterként a [`ReactDOM.render()`](/docs/react-dom.html#render)-nek.
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

Vedd ezt a ketyegő óra példát:

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

<<<<<<< HEAD
Ez minden másodpercben meghívja a [`ReactDOM.render()`](/docs/react-dom.html#render)-t a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) visszahívó metódusából.
=======
It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

>**Megjegyzés:**
>
<<<<<<< HEAD
>Gyakorlatban a legtöbb React alkalmazás csak egyszer hívja meg a [`ReactDOM.render()`](/docs/react-dom.html#render) metódust. A következő fejezetekben megtanuljuk, hogy hogyan tudunk ilyen kódot egységbe foglalni [állapot-teljes komponensekkel](/docs/state-and-lifecycle.html).
=======
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
>
>Ajánljuk, hogy ne ugord át ezeket a témákat, mert egymásra építenek.

## A React csak akkor frissít, ha szükséges {#react-only-updates-whats-necessary}

A React DOM összehasonlítja az elemeket és azok gyermekeit a korábbiakkal, és csak azokat a változtatásokat eszközöli a DOM-on, amik a DOM kívánt állapotának eléréséhez szükségesek.

<<<<<<< HEAD
Ezt megerősítheted a [legutolsó példa](codepen://rendering-elements/update-rendered-element) vizsgálatával a böngészői eszközökkel:
=======
You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

![A DOM vizsgáló fokozatos frissítést mutat](../images/docs/granular-dom-updates.gif)

Hacsak egy elemet is készítünk ami leírja a teljes felhasználói felület fát minden egyes kettyenéshez, a React DOM akkor is csak a megváltozott szövegcsomópontok tartalmát fogja frissíteni.

Tapasztalataink szerint, úgy gondolkodni a felhasználói felületről, hogy az hogyan fog kinézni egy adott pillanatban ahelyett, hogy hogyan fog változni az idő múlásával, rengeteg programhibát gátol meg.
