---
id: thinking-in-react
title: Gondolkodj Reactben
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

A React, véleményünk szerint, elsőrendű módja nagy és gyors JavaScript alapú webalkalmazások készítésének. A Facebook és az Instagram esetében nekünk nagyon jól skálázódott.

Az egyik remek dolog – sok más mellett – ahogy a React átalakítja a gondolkodásodat az alkalmazásaidról miközben készíted őket. Ebben a fejezetben végigvezetünk a folyamaton, miközben megtervezünk és felépítünk egy kereshető terméktáblázatot React használatával.

## Kezdjük a skiccel {#start-with-a-mock}

Tegyük fel, hogy már van egy JSON API-nk és egy rajz a grafikusunktól. A skicc valahogy így néz ki:

![Mockup](../images/blog/thinking-in-react-mock.png)

A JSON API-tól kapott adatok így néznek ki:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## Első lépés: Bontsuk fel a felületet egy komponens hierarchiába! {#step-1-break-the-ui-into-a-component-hierarchy}

Az első dolgod, hogy körberajzolod az egyes komponenseket és alkomponenseket a skiccen, és nevet adsz nekik. Ha a grafikussal együtt dolgozol, előfordulhat, hogy ő már előtted megtette ezt, szóval irány, beszélj vele! A rajzon a rétegek nevei valószínűleg a React komponenseidnek fognak megfelelni.

Honnan tudhatod, hogy miből legyen komponens? Használhatod ugyanazt a módszert, amivel eldöntöd, hogy valaminek kell-e saját függvény vagy objektum. Az egyik ilyen az [egy felelősség alapelve](https://hu.wikipedia.org/wiki/Egy_felel%C5%91ss%C3%A9g_alapelve), vagyis a komponens lehetőleg csak egy dolgot csináljon. Ha növekszik, kisebb egységekre kell bontani.

Gyakran kell JSON adatokat megjeleníteni a felhasználónak. Mint ahogyan azt te is tapasztalni fogod, ha a modell helyesen van felépítve, akkor a UI (és így a komponensek struktúrája) szépen le fogja azt képezni. Ez annak köszönhető, hogy általában a UI és az adatmodell is ugyanazon *információs architektúra* alapján készül. Különítsd el a UI komponenseidet úgy, hogy minden komponens az adatmodell egy-egy darabjára illeszkedjen.

<<<<<<< HEAD
![Komponens diagram](../images/blog/thinking-in-react-components.png)

Amint látod, az app így öt komponensből áll. Dőlt betűvel emeltük ki az egyes komponensek által képviselt adatokat.
=======
![Diagram showing nesting of components](../images/blog/thinking-in-react-components.png)

You'll see here that we have five components in our app. We've italicized the data each component represents. The numbers in the image correspond to the numbers below.
>>>>>>> 07dbd86ca421c262157af673a2584a40fd3b2450

  1. **`FilterableProductTable` (narancs):** magába foglalja a teljes példánkat
  2. **`SearchBar` (kék):** ez fogadja az *adatbevitelt*
  3. **`ProductTable` (zöld):** megjeleníti és szűri az *adathalmazt* az *adatbevitel* alapján
  4. **`ProductCategoryRow` (türkiz):** egy fejlécet jelenít meg minden *kategóriához*
  5. **`ProductRow` (vörös):** megjelenít egy-egy *terméket*

Megvizsgálva a `ProductTable`-t látni fogod, hogy a fejléc (ami a "Termék" és "Ár" címkéket tartalmazza) nem független komponens. Ez ízlés kérdése is, lehet érvelni róla pro és kontra. Ebben a példában meghagyjuk ezt a `ProductTable` részeként, mert része az *adathalmaz* renderelésének ami a `ProductTable` felelőssége. A későbbiekben ha ez a fejléc bonyolultabbá válik (pl. lehetőséget kell adnunk rendezésre), érdemes megfontolni, hogy készítsünk egy önálló `ProductTableHeader` komponenst.

Most, hogy azonosítottuk a komponenseket a rajzunkon, rendezzük őket el egy hierarchiában. Az a komponens, ami egy másikon belül foglal helyet, legyen ennek a gyermeke:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Második lépés: Készítsünk egy statikus verziót Reactben {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Nézd meg a <a href="https://codepen.io/gaearon/pen/BwWzwm">Thinking In React: Step 2</a>-t a <a href="https://codepen.io">CodePen</a>en.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Most, hogy megvan a komponens hierarchiánk, ideje implementálni az appot. A legkönnyebb, ha elkészítünk egy olyan változatot, ami az adatmodellt felhasználva rendereli a UI-t, de még nem interaktív. Jobb ha szétválasztjuk ezeket, mert a statikus változat elkészítése leginkább csak gépelésből áll, ezzel szemben az interaktivitás megtervezése több gondolkodást és kevesebb gépelést igényel. Rögtön látni fogjuk, miért.

Az alkalmazás statikus változatának építéséhez - ami az adatmodellt rendereli - építsük fel a komponenseket, melyek más komponenseket hasznosítanak újra, az adatokat *props* használatával adva tovább. A *props* az egyik módja annak, amivel a szülő adatokat adhat a gyermek komponensnek. Ha esetleg már ismered a *state* (állapot) használatát, most még **ne használd** a statikus változatban. A *state* interaktivitás kezeléséhez van fenntartva. Segítségével az adataink időben változhatnak. Amíg a statikus változatot készíted, nem lesz rá szükség.

Építkezhetsz felülről lefelé vagy fordítva. Vagyis kezdheted a hierarchiában legmagasabban lévő (esetünkben ez a `FilterableProductTable`) komponenssel vagy alulról is (`ProductRow`). Egyszerűbb példáknál általában egyszerűbb fentről kezdeni, nagyobb projekteknél könnyebb, ha alulról felfelé haladsz, menet közben teszteket is készítve.

<<<<<<< HEAD
Ezt a lépést befejezve lesz egy könyvtárad többször hasznosítható komponensekből, melyek renderelik az adatmodellt. A komponenseknek csak `render()` metódusuk van, mivel ez még mindig a statikus változat. A hierarchia tetején csücsülő komponens (`FilterableProductTable`) egy propként kapja meg az adatmodellt. Ha változtatsz valamit az adatmodellen és újra meghívod a `ReactDOM.render()` metódust a UI frissülni fog. Láthatod, hogyan frissül a UI, hol változik. A React **egyirányú adatáramlása** (*one-way data flow* vagy *one-way binding*) mindent modulárisan és gyorsan kezel.

Fordulj a [React dokumentációhoz](/docs/) ha segítségre van szükséged a fenti lépés elvégzéséhez!
=======
At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `root.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

Refer to the [React docs](/docs/getting-started.html) if you need help executing this step.
>>>>>>> 07dbd86ca421c262157af673a2584a40fd3b2450

### Egy kis közjáték: props vagy state {#a-brief-interlude-props-vs-state}

Kétféle adatot használunk Reactban, van props és state. Fontos megérteni a különbséget; fusd végig a [hivatalos React dokumentációt](/docs/state-and-lifecycle.html) ha nem vagy biztos benne, hogy ez már világos! Lásd még [GY.I.K: state vagy props, mi a különbség?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Harmadik lépés: Azonosítsd a UI állapot minimális (de teljes) reprezentációját {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

Ahhoz, hogy a UI interaktív legyen, képesnek kell lenned változásokat kiváltani a mögöttes adatmodellben. A React ezt a **state** segítségével éri el.

A helyes felépítéshez először a megváltoztatható állapotok minimális halmazára van szükség. A kulcs itt, hogy [Ne ismételd önmagad](https://hu.wikipedia.org/wiki/Ne_ism%C3%A9teld_%C3%B6nmagad). Találd ki az abszolút minimális reprezentációt és számíttass ki minden mást menet közben igény szerint. Ha például egy TODO listát készítesz, legyen egy tömb a teendőkről, de nem kell egy külön változó a darabszámnak. Inkább mikor meg kell jeleníteni az elemek számát csak használd a *length*-et a tömbödből.

<<<<<<< HEAD
Vegyük végig a példánkban szereplő adatokat:
=======
Think of all the pieces of data in our example application. We have:
>>>>>>> 07dbd86ca421c262157af673a2584a40fd3b2450

  * Az eredeti terméklista
  * A szöveg amit a felhasználó megadott a keresésben
  * A jelölőnégyzet állapota
  * A szűrt terméklista

Nézzük hát ezekből mi lehet állapot? Ezeket a kérdéseket kell feltenned mindegyikkel kapcsolatban:

  1. Egy szülő komponenstől kaptuk props-on keresztül? Ha igen, akkor ez valószínűleg nem state.
  2. Változatlan marad az idő elteltével? Ha igen, feltehetőleg nem state.
  3. Elő tudod állítani az egyéb state és a props alapján? Ha igen, akkor nem state.

Az eredeti terméklista propsban érkezik, tehát nem state. A keresés szövege és a jelölőnégyzet state lesz, hiszen megváltozhatnak és nem számíthatók ki más adatokból. Végül a leszűrt terméklista sem state hiszen az eredeti lista és kereső szöveg valamint a jelölőnégyzet állapota alapján számolható.

Tehát ennyi lett a state:

  * A felhasználó által megadott keresőszöveg
  * A jelölőnégyzet értéke

## Negyedik lépés: Azonosítsd HOL kell tartanod a state-et {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">Nézd meg a <a href="https://codepen.io/gaearon/pen/qPrNQZ">Thinking In React: Step 4</a>-t a <a href="https://codepen.io">CodePen</a>en.</p>

OK, szóval meghatároztuk mi a minimális state az alkalmazásunkban. Most el kell döntenünk melyik komponens változtatja vagy *birtokolja* ezt a state-et.

Emlékezz: A React lényege az egy irányú adatáramlás a komponens hierarchiában. Talán nem egyértelmű melyik komponenshez melyik state tartozik. **Gyakran ezt megérteni a legnagyobb kihívás kezdők számára,** de csak kövesd ezeket a lépéseket:

Minden azonosított state-hez az alkalmazásodban:

  * Azonosíts minden komponenst amely renderel valamit az adott state alapján
  * Keresd meg a közös komponenst (egy bizonyos komponens a hierarchiában, ami felette áll state-et használó minden komponensnek).
  * Vagy a közös szülő, vagy egy másik a hierarchiában magasabban álló komponens kell birtokolja a state-et.
  * Ha nem találsz olyan komponenst ahol van értelme a state-et elhelyezni, létrehozhatsz egyet pusztán azért, hogy azt kezelje és illeszd a hierarchiába valahol a közös birtokló komponens felé.

Próbáljuk ki ezt a stratégiát az alkalmazásunkon:

  * A `ProductTable` le kell szűrje a listát és a `SearchBar` meg kell jelenítse a kereső szöveget és jelölőnégyzet állapotát.
  * A közös birtokló komponens számukra a `FilterableProductTable`.
  * Fogalmilag tényleg van értelme, hogy mindkét érték a `FilterableProductTable` komponensben lakjon.

Király, ezzel el is döntöttük, a state helye a `FilterableProductTable`. Először, vegyük fel hozzá a példány tulajdonságot a `FilterableProductTable` konstruktorába és adjunk neki kezdeti értéket is: `this.state = {filterText: '', inStockOnly: false}`. Ezután adjuk tovább a `filterText` és `inStockOnly` értékét a `ProductTable` és a `SearchBar` számára propsban. Végül a `ProductTable`-ben használjuk őket szűrésre és jelenítsük meg az értéküket a `SearchBar` űrlap mezőiben.

Hogy viselkedik az alkalmazás, ha a `filterText` értékét beállítod `"ball"`-nak és frissíted az app-ot? Láthatod, hogy az értékek ennek megfelelően jelennek meg.

## Ötödik lépés: Fordított adatáramlás {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">Nézd meg a <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a>-t a <a href="https://codepen.io">CodePen</a>en.</p>

Van tehát egy alkalmazásunk ami helyesen jeleníti meg az adatokat a props és a state függvényében lefelé áramoltatva ezeket a hierarchiában. Eljött az ideje, hogy a másik irányba is mozgassunk adatokat. A form komponenseinknek a hierarchia mélyén is tudniuk kell frissíteni a state-et a `FilterableProductTable`-ben.

Reactben ezt nagyon kifejezően ábrázolhatjuk, ami segíti megérteni a program hogyan is működik, de egy kicsit többet kell hozzá gépelni, mint a hagyományos kétirányú adatkapcsolat esetén.

<<<<<<< HEAD
Ha próbáltál szöveget beírni vagy kipipálni a jelölőnégyzetet a mostani verziónkban, akkor már láttad, hogy a React figyelmen kívül hagyja a bemeneteket. Ez szándékos, mivel így lehetséges, hogy a propsban kapott érték amit átadunk az `input`nak a `value`-ban  mindig azonos legyen a state-ben tárolt értékkel amit a `FilterableProductTable`-ból továbbadunk.
=======
If you try to type or check the box in the previous version of the example (step 4), you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.
>>>>>>> 07dbd86ca421c262157af673a2584a40fd3b2450

Gondoljuk végig mit szeretnénk, mi történjen. Azt akarjuk, hogy bármikor ha a felhasználó megváltoztatja az űrlapot mi frissíthessük a state-et, hogy az tükrözze a bemeneten kapott adatot. Mivel a komponensek csak a saját state-jüket frissíthetik, a `FilterableProductTable` callback függvényeket ad át a `SearchBar`-nak melyek meghívódnak valahányszor a state-et frissíteni kell. Használhatjuk az input mezők `onChange` eseményét, a `FilterableProductTable` által átadott callback-ek meghívhatják annak `setState()` metódusát és alkalmazásunk frissül majd.

## Ennyi volna {#and-thats-it}

Remélhetőleg ezután már van némi fogalmad, hogyan is gondolkodj, mikor egy komponenst vagy egy alkalmazást készítesz Reactban. Talán egy kicsit többet kellett gépelned, mint amit eddig megszoktál, de ne feledd, általában több időt töltünk a forráskód olvasásával, mint az írással, és kevésbé fárasztó ezt a moduláris, kifejező kódot olvasni. Amikor elkezdesz terjedelmes komponens könyvtárakat létrehozni, nagyra értékeled majd a modularitást és az olvashatóságot, és az újrahasznosíthatóság révén a kódod sorai rövidülni kezdenek. :)
