---
id: create-a-new-react-app
title: Új React alkalmazás készítése
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

A legjobb felhasználói és fejlesztői élmény érdekében használj egy integrált eszközláncot.

Ez az oldal néhány népszerű React eszközláncot ír le, amik az alábbi feladatokban segítenek:

* Sok fájl és komponens kezelése.
* Külső npm könyvtárak használata.
* Gyakori hibák korai felfedése.
* CSS és JS élő szerkesztése fejlesztői módban.
* A kimenet optimalizálása a végstádiumhoz.

Az ezen az oldalon ajánlott eszközláncok **nem igényelnek konfigurációt a kezdéshez**.

## Lehet, hogy nincs szükséged eszközláncokra {#you-might-not-need-a-toolchain}

Ha a fent említett problémák egyikét sem tapasztalod, vagy még nem mozogsz otthon a JavaScript eszközök közt, vedd fontolóra a [React hozzáadását egy HTML oldalhoz egy egyszerű `<script>` címkével](/docs/add-react-to-a-website.html), vagy adott esetben [JSX-el együtt](/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

Ez egyben a **legegyszerűbb módja a React egy meglévő oldalba való integrálásának.**  Ha hasznosnak találod, később bármikor hozzáadhatsz egy nagyobb eszközláncot!

## Ajánlott eszközláncok {#recommended-toolchains}

A React csapat főként ezeket a megoldásokat ajánlja:

- Ha **tanulod a Reactet** vagy **egy [single-page](/docs/glossary.html#single-page-application) alkalmazást készítesz,** használd a [Create React App](#create-react-app)-t.
- Ha egy **Node.js-sel szerveroldalon renderelt weblapot** építesz, próbáld ki a [Next.js](#nextjs)-t.
- Ha egy **statikus, tartalom-orientált weblapot** építesz, próbáld ki a [Gatsby](#gatsby)-t.
- Ha egy **komponens könyvtárat** építesz, vagy **egy meglévő kódbázissal integrálsz**, próbálj ki egy [kissé rugalmasabb eszközláncot](#more-flexible-toolchains).


### Create React App {#create-react-app}

A [Create React App](https://github.com/facebookincubator/create-react-app) egy komfortos környezet a **React tanulásához** és a legjobb módja **egy új [single-page](/docs/glossary.html#single-page-application) alkalmazás** készítésére Reactben.

<<<<<<< HEAD
Úgy állítja fel a fejlesztői környezeted, hogy használni tudd a legújabb JavaScript funkciókat, egy kellemes fejlesztői élményt biztosít és optimalizálja az alkalmazásod a végstádiumban. A gépednek rendelkeznie kell [Node 10.16 vagy annál újabb, és npm 5.6 vagy annál újabb](https://nodejs.org/en/) verzióival. Egy projekt készítéséhez futtasd ezt:
=======
It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have [Node >= 14.0.0 and npm >= 5.6](https://nodejs.org/en/) on your machine. To create a project, run:
>>>>>>> a88b1e1331126287ccf03f2f4ec25ec38513b911

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Megjegyzés
>
>Az `npx` az első sorban nem elírás -- ez egy [csomag futtató eszköz ami az npm 5.2 óta elérhető](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

A Create React App nem kezel szerveroldali logikát vagy adatbázisokat; csak egy frontend építő futószalagot készít, szóval bármilyen backendet használhatsz. A motorháztető alatt [Babel](https://babeljs.io/)-t és [webpack](https://webpack.js.org/)-et használ, de semmit nem kell tudnod róluk.

Amikor készen állsz a publikálásra, az `npm run build` futtatása elkészíti az alkalmazásod egy optimalizált változatát a `build` mappában. A Create React Appről többet tanulhatsz [annak README fájljából](https://github.com/facebookincubator/create-react-app#create-react-app--) és a [felhasználói útmutatóból](https://facebook.github.io/create-react-app/).

### Next.js {#nextjs}

A [Next.js](https://nextjs.org/) egy népszerű és könnyűsúlyú React keretrendszer **statikus és szerver-renderelt alkalmazások** építéséhez. Alapból magában foglal **stílus és útválasztó (routing) megoldásokat**  és feltételezi, hogy [Node.js](https://nodejs.org/)-t használsz a szerver környezetben.

Tanuld meg a Next.js használatát [a hivatalos útmutatóból](https://nextjs.org/learn/).

### Gatsby {#gatsby}

A [Gatsby](https://www.gatsbyjs.org/) a legjobb módja **statikus weblapok** készítésének Reacttel. Lehetővé teszi React komponensek használatát, de előrenderelt HTML-t és CSS-t eredményez, ami garantálja a gyors betöltést.

Tanuld meg a Gatsby használatát [a hivatalos útmutatóból](https://www.gatsbyjs.org/docs/) és [kezdő csomagok egy galériájából](https://www.gatsbyjs.org/docs/gatsby-starters/).

### Kissé rugalmasabb eszközláncok {#more-flexible-toolchains}

A következő eszközláncok több rugalmasságot és lehetőséget biztosítanak. Tapasztaltabb felhasználóknak ajánljuk:

- A **[Neutrino](https://neutrinojs.org/)** kombinálja a [webpack](https://webpack.js.org/) erejét a presetek egyszerűségével, és tartalmaz egy presetet [React alkalmazásokhoz](https://neutrinojs.org/packages/react/) és [React komponensekhez](https://neutrinojs.org/packages/react-components/).

- Az **[Nx](https://nx.dev/react)** egy full-stack monorepo fejlesztéshez való eszközkészlet, ami egyebek mellett beépített React, Next.js, [Express](https://expressjs.com/) támogatással is rendelkezik.

- A **[Parcel](https://parceljs.org/)** egy gyors, konfigurálást nem igénylő webalkalmazás csomagoló ami [Reacttel is működik](https://parceljs.org/recipes.html#react).

- A **[Razzle](https://github.com/jaredpalmer/razzle)** egy konfigurálást nem igénylő szerveroldali renderelő keretrendszer, de több rugalmasságot biztosít, mint a Next.js.

## Eszközlánc készítése a semmiből {#creating-a-toolchain-from-scratch}

Egy JavaScript eszközlánc tipikusan ezekből áll:

* Egy **csomagkezelő**, mint a [Yarn](https://yarnpkg.com/) vagy az [npm](https://www.npmjs.com/). Ez lehetővé teszi a harmadik féltől származó csomagok hatalmas ökoszisztémájának kihasználását, valamint egyszerű telepítését vagy frissítését.

* Egy **csomagoló**, mint a [webpack](https://webpack.js.org/) vagy a [Parcel](https://parceljs.org/). Moduláris kód írását teszi lehetővé, amit aztán kisebb csomagokká csomagol a gyorsabb betöltési idő optimalizálása érdekében.

* Egy **fordítóprogram**, mint a [Babel](https://babeljs.io/). Modern JavaScript kód írását teszi lehetővé, ami még így is működni fog régebbi böngészőkben.

Ha inkább szeretnél egy saját JavaScript eszközláncot összeállítani a semmiből, akkor [nézd meg ezt az útmutatót](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658), ami a Create React App funkcionalitását utánozza.

Ne felejts el meggyőződni róla, hogy az egyedi eszközláncod [helyesen van beállítva a végstádiumhoz](/docs/optimizing-performance.html#use-the-production-build).
