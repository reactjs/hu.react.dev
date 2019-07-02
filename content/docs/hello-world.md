---
id: hello-world
title: Helló, világ!
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

A legkisebb React példa így néz ki:

```js
ReactDOM.render(
  <h1>Helló, világ!</h1>,
  document.getElementById('root')
);
```

Ez egy címsort jelenít meg "Hello, világ!" szöveggel a weboldalon.

[](codepen://hello-world)

Kattints a fenti hivatkozásra az online szerkesztő megnyitásához. Bátran végezz változtatásokat, és figyeld meg hogyan befolyásolják a kimenetet. Az útmutató legtöbb oldala ehhez hasonló szerkeszthető példákat tartalmaz.


## Hogyan használd helyesen az útmutatót {#how-to-read-this-guide}

Ebben az útmutatóban a React alkalmazások építőkockáit fogjuk megvizsgálni: elemeket és komponenseket. Miután elsajátítottad használatukat, összetett alkalmazásokat tudsz majd létrehozni kis újrafelhasználható részekből.

>Tipp
>
>Ez az útmutató olyan emberek számárak készült, akik előnyben részesítik a **lépésről lépésre történő tanulást**. Ha jobban szereted gyakorlati példák közben megszerezni a tudást, nézd meg a [tutoriált](/tutorial/tutorial.html). Ezt az útmutatót és a tutoriált egymás kiegészítésének is tekintheted.

Ez az első fejezet lépésről lépésre vezet végig a React alapvető fogalmain. A navigációs oldalsávon megtalálhatod az összes fejezet listáját. Ha ezt mobilkészülékről olvasod, akkor a képernyő jobb alsó sarkában található gomb megnyomásával érheted el a navigációt.

Az útmutató minden fejezete a korábbi fejezetekben megszerzett tudásra épít. **Meg lehet tanulni a React nagy részét azzal, ha elolvasod a "Fő fogalmak" című útmutató fejezeteit az oldalsávban megjelenő sorrendben.** Például, a ["Bevezetés a JSX-be"](/docs/introducing-jsx.html) lesz a következő fejezet ezt .

## Feltételezett tudásszint {#knowledge-level-assumptions}

A React egy JavaScript könyvtár, ezért feltételezzük, hogy van alapvető ismereted a JavaScript programozási nyelvből. **Ha nem érzed magabiztosnak magad nézd át [a JavaScript tutoriált](https://developer.mozilla.org/hu/docs/Web/JavaScript/a_javascript_ujboli_bemutatasa), hogy ellenőrizd a tudásszinted** és biztosítsd magadnak a haladást az útmutató olvasása közben anélkül, hogy elakadnál. Ez körübelül 30 perc és egy óra közötti időtartam lesz, de utána nem fogod úgy érezni, mintha egyszerre kell megtanulnod a React-et és a JavaScipt nyelvet is.

>Megjegyzés
>
>Ez az útmutató esetenként újabb JavaScript szintaktikát használ a példákban. Ha az elmúlt években nem foglalkoztál a JavaScript nyelvel, [ez a három pont](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) segíteni fog eligazodni.


## Lássunk neki! {#lets-get-started}

Folytasd a görgetést lefelé, és a hivatkozás az [útmutató következő fejezetéhez](/docs/introducing-jsx.html) közvetlenül a honlap lábléce előtt lesz megtalálható.


