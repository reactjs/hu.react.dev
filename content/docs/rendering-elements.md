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

A React-el készített alkalmazásoknak általában egy gyökér DOM csomópontjuk van. Ha egy már meglévő alkalmazásba akarod a React-et integrálni, annyi elszigetelt gyökér DOM csomópontot vehetsz fel, amennyit szeretnél.

<<<<<<< HEAD
Egy React elem gyökér DOM csomópontba való rendereléséhez, add meg mindkettőt paraméterként a `ReactDOM.render()` metódusnak:
=======
To render a React element into a root DOM node, pass both to [`ReactDOM.render()`](/docs/react-dom.html#render):
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

Ez egy "Helló, világ"-ot jelenít meg az oldalon.

## A renderelt elem frissítése {#updating-the-rendered-element}

A React elemek [megváltoztathatatlanok](https://en.wikipedia.org/wiki/Immutable_object). Ha egyszer készítettél egy elemet, már nem tudod annak gyermekeit vagy attribútumait módosítani. Egy elem olyan mint egy sima képkocka egy filmben: az felhasználói felületet reprezentálja egy adott pillanatban.

<<<<<<< HEAD
Az eddigi tudásunkkal az egyetlen módja a felhasználói felületünk frissítésének ha egy új elemet hozunk létre, és megadjuk paraméterként a `ReactDOM.render()`-nek.
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to [`ReactDOM.render()`](/docs/react-dom.html#render).
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

Vedd ezt a ketyegő óra példát:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

<<<<<<< HEAD
Ez minden másodpercben meghívja a `ReactDOM.render()`-t a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) visszahívó metódusából.
=======
It calls [`ReactDOM.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

>**Megjegyzés:**
>
<<<<<<< HEAD
>Gyakorlatban a legtöbb React alkalmazás csak egyszer hívja meg a `ReactDOM.render()` metódust. A következő fejezetben megtanuljuk, hogy hogyan tudunk ilyen kódot egységbe foglalni [állapot-teljes komponensekkel](/docs/state-and-lifecycle.html).
=======
>In practice, most React apps only call [`ReactDOM.render()`](/docs/react-dom.html#render) once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504
>
>Ajánljuk, hogy ne ugord át ezeket a témákat, mert egymásra építenek.

## A React csak akkor frissít, ha szükséges {#react-only-updates-whats-necessary}

A React DOM összehasonlítja az elemeket és azok gyermekeit a korábbiakkal, és csak azokat a változtatásokat eszközöli a DOM-on, amik a DOM kívánt állapotának eléréséhez szükségesek.

Ezt megerősítheted a [legutolsó példa](codepen://rendering-elements/update-rendered-element) vizsgálatával a böngészői eszközökkel:

![A DOM vizsgáló fokozatos frissítést mutat](../images/docs/granular-dom-updates.gif)

Hacsak egy elemet is készítünk ami leírja a teljes felhasználói felület fát minden egyes kettyenéshez, a React DOM akkor is csak a megváltozott szövegcsomópontok tartalmát fogja frissíteni.

<<<<<<< HEAD
Tapasztalataink szerint úgy gondolni a felhasználói felületre hogy az hogyan is nézzen ki egy adott pillanatban ahelyett hogy hogyan fog változni az idő múlásával, egy csomó programhibát gátol meg.
=======
In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504
