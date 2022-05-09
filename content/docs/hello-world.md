---
id: hello-world
title: Helló, világ!
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

A legkisebb React példa így néz ki:

<<<<<<< HEAD
```js
ReactDOM.render(
  <h1>Helló, világ!</h1>,
  document.getElementById('root')
);
=======
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985
```

Ez egy címsort jelenít meg "Helló, világ!" szöveggel a weboldalon.

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrpgNB?editors=1010)**

Kattints a fenti hivatkozásra az online szerkesztő megnyitásához. Bátran végezz változtatásokat, és figyeld meg hogyan befolyásolják a kimenetet. Az útmutató legtöbb oldala ehhez hasonló szerkeszthető példákat tartalmaz.


## Hogyan használd helyesen az útmutatót {#how-to-read-this-guide}

Ebben az útmutatóban a React alkalmazások építőkockáit fogjuk megvizsgálni: elemeket és komponenseket. Miután elsajátítottad használatukat, összetett alkalmazásokat tudsz majd létrehozni kis újrafelhasználható részekből.

>Tipp
>
>Ez az útmutató azok számára készült, akik előnyben részesítik a **koncepciók lépésről lépésre történő tanulását**. Ha jobban szereted gyakorlati példák közben megszerezni a tudást, nézd meg a [gyakorlati tutoriált](/tutorial/tutorial.html). Ezt az útmutatót és a tutoriált egymás kiegészítésének is tekintheted.

Ez az első fejezet lépésről lépésre vezet végig a React alapvető fogalmain. A navigációs oldalsávon megtalálhatod az összes fejezet listáját. Ha ezt mobilkészülékről olvasod, akkor a képernyő jobb alsó sarkában található gomb megnyomásával érheted el a navigációt.

Az útmutató minden fejezete a korábbi fejezetekben megszerzett tudásra épít. **A React nagy részét meg tudod tanulni azzal, ha elolvasod a "Fő fogalmak" című útmutató fejezeteit az oldalsávban megjelenő sorrendben.** Például a következő fejezet a ["Bevezetés a JSX-be"](/docs/introducing-jsx.html) ez után.

## Feltételezett tudásszint {#knowledge-level-assumptions}

A React egy JavaScript könyvtár, ezért feltételezzük, hogy van alapvető ismereted a JavaScript programozási nyelvből. **Ha nem érzed magabiztosnak magad nézd át [a JavaScript tutoriált](https://developer.mozilla.org/hu/docs/Web/JavaScript/a_javascript_ujboli_bemutatasa), hogy ellenőrizd a tudásszinted** és hogy biztosan haladni tudj az útmutató olvasása közben anélkül, hogy elakadnál. Ez körübelül 30 perc és egy óra közötti időtartamot vesz igénybe, de utána nem fogod úgy érezni, mintha egyszerre kell megtanulnod a React-et és a JavaScript nyelvet is.

>Megjegyzés
>
<<<<<<< HEAD
>Ez az útmutató esetenként újabb JavaScript szintaxist használ a példákban. Ha az elmúlt években nem foglalkoztál a JavaScript nyelvvel, [ez a három pont](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) segíteni fog eligazodni.
=======
>This guide occasionally uses some newer JavaScript syntax in the examples. If you haven't worked with JavaScript in the last few years, [these three points](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) should get you most of the way.
>>>>>>> 26a870e1c6e232062b760d37620d85802750e985


## Lássunk neki! {#lets-get-started}

Folytasd a görgetést lefelé, és a hivatkozás az [útmutató következő fejezetéhez](/docs/introducing-jsx.html) közvetlenül a honlap lábléce előtt lesz megtalálható.


