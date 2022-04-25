---
id: getting-started
title: Kezdés
permalink: docs/getting-started.html
next: add-react-to-a-website.html
redirect_from:
  - "docs/"
  - "docs/index.html"
  - "docs/getting-started-ko-KR.html"
  - "docs/getting-started-zh-CN.html"
  - "docs/installation.html"
  - "download.html"
  - "downloads.html"
  - "docs/try-react.html"
  - "docs/tooling-integration.html"
  - "docs/package-management.html"
  - "docs/language-tooling.html"
  - "docs/environments.html"
---

Ez az oldal áttekintést nyújt a React dokumentációjához és a kapcsolódó anyagokhoz.

A **React** egy JavaScript könyvtár, amit felhasználói felületek programozására használunk. Tanulj meg mindent a Reactről a [főoldalról kezdve](/) vagy az [útmutatókból](/tutorial/tutorial.html).

---

- [Próbáld ki a Reactet](#try-react)
- [Tanuld meg a Reactet](#learn-react)
- [Maradj tájékozott](#staying-informed)
- [Verzió kezelt dokumentáció](#versioned-documentation)
- [Hiányzik valami?](#something-missing)

## Próbáld ki a Reactet {#try-react}

A React folyamatos adaptációra lett tervezve és **pont annyi Reactet használhatsz a kódodban amennyit szeretnél.** Ha csak ismerkednél a Reacttel, hozzáadnál néhány interaktív komponenst egy szimpla HTML oldalhoz, vagy akár egy komplex React-alapú alkalmazást készítenél, az ebben a részben található linkek segítségedre lesznek.

### Online Játszóterek {#online-playgrounds}

Az Online Játszótereken lehetőséged van kipróbálni a React funkcionalitásait. Próbáld ki a Helló Világ sablont [CodePenen](codepen://hello-world), [CodeSandboxon](https://codesandbox.io/s/new), vagy [Stackblitzen](https://stackblitz.com/fork/react).

<<<<<<< HEAD
Ha a saját kódszerkesztődet használnád, [letöltheted ezt a HTML fájlt](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html), szerkesztheted és megnyithatod a lokális böngésződben. Ez egy lassú kód transzformációt tartalmaz, így ezt csak a példakód futtatásához ajánljuk.
=======
If you prefer to use your own text editor, you can also [download this HTML file](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html), edit it, and open it from the local filesystem in your browser. It does a slow runtime code transformation, so we'd only recommend using this for simple demos.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

### React hozzáadása egy weboldalhoz {#add-react-to-a-website}

[A Reactet egy perc alatt hozzá tudod adni egy meglévő HTML weboldalhoz](/docs/add-react-to-a-website.html). Ezután fokozatosan hozzáadhatsz újabb React funkcionalitásokat, vagy egyszerűen csak egy pár dinamikus komponenst is használhatsz belőle.

### Készíts egy új React alkalmazást {#create-a-new-react-app}

Ha egy új React projektbe kezdesz, egy [egyszerű HTML oldal script címkékkel](/docs/add-react-to-a-website.html) lehet a legjobb megoldás. Csak egy percbe telik beállítani!

Ahogy az alkalmazásod nőni kezd, elkezdhetsz gondolkodni egy integráltabb megoldásban. Többféle JavaScript eszközláncot is ajánlunk nagyobb alkalmazásokhoz. Ezek mindegyike csak kevés vagy szinte semmilyen konfigurációt nem igényel és segítségükkel teljes hozzáférést nyersz a gazdag React ökoszisztémához. [Tanuld meg hogyan.](/docs/create-a-new-react-app.html)

## Tanuld meg a Reactet {#learn-react}

A kezdő React programozók különféle nyelvekből és hátterekből érkeznek. Reméljük ez a rész segítségedre lesz akár az elméleti vagy a gyakorlatiasabb tanulást kedveled.

* Ha inkább a **gyakorlati úton való tanulást preferálod**, kezdd a [gyakorlati útmutatóval](/tutorial/tutorial.html).
* Ha inkább **lépésekben tanulnád meg az elméleti anyagot**, kezdd a [bevezetés a főbb koncepciókba](/docs/hello-world.html) oldalunkkal.

Mint az összes többi új technológiának, a Reactnek is van egy tanulási görbéje. Némi türelemmel és sok gyakorlással *meg fogod* tanulni. 

### Első példák {#first-examples}

A [React főoldala](/) tartalmaz néhány kis példát egy valós idejű szövegszerkesztőben. Még ha nem is tudsz semmit a Reactről, próbáld megváltoztatni a kódot és figyeld meg, hogy ez hogy változtat az eredményen.

### React kezdőknek {#react-for-beginners}

Ha úgy érzed, hogy a React dokumentáció túl nagy léptékben halad, [olvasd el ezt a Tania Rascia által írt ismeretőt](https://www.taniarascia.com/getting-started-with-react/). Ez részletes, kezdők által is könnyen érthető módon mutatja be a legfontosabb React koncepciókat . Ha ezt elolvastad, próbálkozz újra a hivatalos dokumentációval.

### React dizájnereknek {#react-for-designers}

Amennyiben dizájner háttérrel rendelkezel, [ez a dokumentáció](https://reactfordesigners.com/) egy jó kezdés lehet.

### JavaScript anyagok {#javascript-resources}

A React dokumentációja feltételez valamennyi meglévő JavaScript tudást. Nem kell, hogy profi legyél belőle, de nehezebb úgy megtanulni a Reactet, ha közben a JavaScriptet is az alapoktól kell megtanulnod.

Ezt a [JavaScript ismertetőt](https://developer.mozilla.org/hu/docs/Web/JavaScript/a_javascript_ujboli_bemutatasa) ajánljuk a tudásszinted ellenőrzéséhez. Ennek az elolvasása körülbelül fél-1 órát vesz igénybe, de ezután sokkal magabiztosabban tudod majd a React tanulását elkezdeni.

>Tipp
>
>Ha bármikor elakadnál a JavaScriptben, az [MDN](https://developer.mozilla.org/hu/docs/Web/JavaScript) és [javascript.info](https://javascript.info/) weboldalak a segítségedre lehetnek. A [közösségi támogatói fórumon](/community/support.html) szintén segítséget tudsz kérni.

### Gyakorlati útmutató {#practical-tutorial}

Amennyiben inkább a **gyakorlati úton való tanulást preferálod,** látogass el a [gyakorlati útmutatónkhoz](/tutorial/tutorial.html). Ebben az útmutatóban egy tic-tac-toe játékot írunk Reactben. Lehetséges, hogy ezt legszívesebben kihagynád, ha nem szoktál játékokat írni -- de mindenesetre adj ennek egy esélyt. Az útmutatóban leírt technikák alapvetőek lesznek *bármely* React applikációban, és ezeknek a begyakorlása által mélyebben megértheted a Reactet.

### Lépésenkénti útmutató {#step-by-step-guide}

Amennyiben inkább **lépésekben tanulnád meg az elméleti anyagot,** a [bevezetés a főbb koncepciókba](/docs/hello-world.html) a legjobb hely a tanulást elkezdeni. Minden egyes fejezet az előző fejezetekben bevezetett koncepciókra épít, így nem fogsz semmit kihagyni a tanulás során.

### Gondolkodj Reactben {#thinking-in-react}

Sok React felhasználó tanúskodik arról, hogy a [Gondolkodj Reactben](/docs/thinking-in-react.html) útmutató elolvasása után történt, amikor a React először "bekattant" nekik. Ez valószínűleg az egyik legrégebbi React leírás, de ma még épp ugyanannyira releváns.

### Ajánlott kurzusok {#recommended-courses}

Néhány ember hasznosabbnak találhatja a React könyveket vagy videó kurzusokat, mint a hivatalos dokumentációt. Fenntartunk egy [listát a legnépszerűbb ajánlott forrásokról](/community/courses.html), ezek közül némelyik ingyenes is.

### Magasabb szintű koncepciók {#advanced-concepts}

Amennyiben már megismerkedtél a [főbb koncepciókkal](/docs/hello-world.html) és játszottál egy kicsit a Reacttel, lehet, hogy érdekelhetnek a magasabb szintű koncepciók is. Ez a fejezet bevezet az erőteljesebb, de kevésbé használt React funkcionalitásokba, mint a [kontextus](/docs/context.html) és a [referenciák](/docs/refs-and-the-dom.html).

### API referencia {#api-reference}

Ez a fejezet hasznos lehet, ha egy konkrét React API-ról szeretnél többet tanulni. Például a [`React.Component` API referencia](/docs/react-component.html) információt nyújt a `setState()` működéséről, és hogy mire használhatóak a különböző életciklus metódusok.

### Szójegyzék és GYIK {#glossary-and-faq}

A [szójegyzék](/docs/glossary.html) egy lista a React dokumentáció leggyakoribb kifejezéseiről. A GYIK-ben a leggyakoribb kérdések és válaszok találhatóak, többek között [hogyan csináljunk AJAX kéréseket](/docs/faq-ajax.html), [komponens állapot](/docs/faq-state.html), és [fájlstruktúra](/docs/faq-structure.html).

## Maradj tájékozott {#staying-informed}

A React csapat közleményeinek a [React blog](/blog/) a hivatalos forrása. Mindenféle fontos dolog, például a kiadási jegyzetek vagy elavulási tájékoztató is ide lesz először kiposztolva.

Twitteren is követheted a [@reactjs felhasználót](https://twitter.com/reactjs), de akkor sem maradsz le semmiről, ha csak a blogot olvasod.

<<<<<<< HEAD
Nem minden React kiadás érdemli meg a saját blog bejegyzését, de minden kiadásnak van egy saját részletes változási jegyzéke [`CHANGELOG.md` fájl a React repóban](https://github.com/facebook/react/blob/master/CHANGELOG.md), valamint a [Kiadások](https://github.com/facebook/react/releases) oldalon.
=======
Not every React release deserves its own blog post, but you can find a detailed changelog for every release in the [`CHANGELOG.md` file in the React repository](https://github.com/facebook/react/blob/main/CHANGELOG.md), as well as on the [Releases](https://github.com/facebook/react/releases) page.
>>>>>>> 1d21630e126af0f4c04ff392934dcee80fc54892

## Verzió kezelt dokumentáció {#versioned-documentation}

Ez a dokumentáció mindig a legújabb stabil React verziót tükrözi. A React 16 óta a régebbi verziók dokumentációi egy [külön oldalon találhatóak](/versions). Megjegyzendő, hogy a régebbi verziók dokumentációs oldala csak egy pillanatnyi másolat a kiadás pillanatában, és nincs később folyamatosan frissítve.

## Valami hiányzik? {#something-missing}

Ha valami hiányzik a dokumentációból, vagy egy részt zavarosnak találsz, kérjük [nyiss egy új ügyet a dokumentáció repóban](https://github.com/reactjs/reactjs.org/issues/new) a javasolt változtatásokkal, vagy küldj egy tweetet a [@reactjs felhasználónak](https://twitter.com/reactjs). Várjuk észrevételeidet!
