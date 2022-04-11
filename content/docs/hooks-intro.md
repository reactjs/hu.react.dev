---
id: hooks-intro
title: Horgok bemutatása
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

A *Horgok* a React egy új kiegészítése a 16.8-as verziótól kezdve. Lehetővé teszik számodra állapotok és más React funkciók használatát osztályok írása nélkül.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Deklarálj egy új, "count" nevű állapot változót
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count} alkalommal kattintottál.</p>
      <button onClick={() => setCount(count + 1)}>
        Kattints rám
      </button>
    </div>
  );
}
```

Ez az új, `useState` nevű függvény az első "Horog" amiről tanulni fogunk, de ez a példa csak egy kis kedvcsináló. Ne aggódj, ha még nem teljesen érted!

**A [következő oldalon](/docs/hooks-overview.html) elkezdheted a Horgok tanulását.** Ezen az oldalon tovább magyarázzuk, hogy miért adjuk hozzá a Horgokat a Reacthez és hogyan segíthetnek téged nagyszerű alkalmazások írásában.

>Megjegyzés
>
> A React 16.8.0 az első kiadás ami támogatja a Horgokat. Frissítéskor ne felejtsd el az összes csomagot frissíteni, beleértve a React DOM-ot.
> A [React Native a 0.59-es kiadás óta](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) támogatja a Horgokat.

## Videó bemutató {#video-introduction}

A React Conf 2018-on Sophie Alpert és Dan Abramov mutatták be a Horgokat, akiket Ryan Florence követett, ő a használatukat egy alkalmazás Horgokra való átírásával demonstrálta. A videót megnézheted itt:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Nincs "breaking change" {#no-breaking-changes}

Mielőtt folytatjuk, tudd, hogy a Horgok:

* **Teljesen szabadon választhatóak.** A Horgokat kipróbálhatod néhány komponensben anélkül, hogy meglévő kódot kéne átírnod. De ha nem szeretnéd, nem kell most azonnal megtanulnod a Horgok használatát.
* **100%-ban visszafelé kompatibilisak.** A Horgok egyetlen "breaking change"-t sem tartalmaznak.
* **Már most elérhetőek.** A Horgokat a v16.8.0 kiadással már most használhatod.

**Nincs tervben az osztályok eltávolítása Reactből.** Ennek az oldalnak [egy lentebbi szekciójában](#gradual-adoption-strategy) többet olvashatsz a Horgokat fokozatosan adoptáló stratégiájáról.

**Nem helyezik új alapokra a Reactről tanult koncepciókat.** A Horgok ehelyett egy közvetlenebb API-t nyújtanak számodra a React koncepcióihoz, amiket már ismersz: prop-ok, állapot, kontextus, ref-ek és életciklus. Ahogy később meg is fogjuk mutatni, a Horgok egy új, erőteljes módját is lehetővé teszik ezek kombinálására.

**Ha csak el szeretnéd kezdeni a Horgok tanulását, nyugodtan [ugorj a következő oldalra!](/docs/hooks-overview.html)** Vagy folytathatod ennek az oldalnak az olvasását, hogy többet megtudj arról, hogy miért adjuk hozzá a Horgokat a Reacthez és hogyan kezdhetjük el használni őket anélkül, hogy át kéne írnunk az alkalmazásainkat.

## Motiváció {#motivation}

A Horgok a React többféle, látszólag nem összefüggő problémáit oldják meg, amiket öt év alatt több tízezer komponens írása és karbantartása alatt fedeztünk fel. Ha csak tanulod a Reactet, napi szinten használod, vagy egy másik könyvtárat preferálsz hasonló komponensmodellel, valószínű te is felismersz néhányat ezen problémák közül.

### Állapotteljes logika megosztása komponensek közt nehéz {#its-hard-to-reuse-stateful-logic-between-components}

A React nem ajánl megoldást újrafelhasználható viselkedés egy komponenshez "csatolásához" (például egy adatbázishoz kapcsolás). Ha már egy ideje Reacttel dolgozol, ismerős lehet a [render prop-ok](/docs/render-props.html) és a [magasabb rendű komponensek](/docs/higher-order-components.html) mintája, amik ezt próbálják megoldani. De ezek használata a komponenseid átrendezését igénylik, ami nehézkes lehet és a kód nehezebben lesz követhető. Ha ránézel egy tipikus React alkalmazásra a React Fejlesztői Eszközből, valószínűleg találkozni fogsz a "csomagoló pokollal", ahol komponensek több rétegnyi ellátó (provider) és fogyasztóval (consumer), magasabb rendű komponensekkel, render prop-okkal és más absztrakciókkal vannak körbevéve. Ki tudnánk [őket szűrni a Fejlesztői Eszközben](https://github.com/facebook/react-devtools/pull/503), de ez egy mélyebb problémára mutat rá: A Reactnek szüksége van egy jobb primitívre állapotteljes logika megosztására.

A Horgok segítségével kivonhatod az állapotteljes logikát egy komponensből, hogy azt külön tudd tesztelni és újra fel tudd használni. **A Horgok lehetővé teszik állapotteljes logika újrafelhasználását a komponens hierarchiád megváltoztatása nélkül.** Ez lehetővé teszi a Horgok megosztását komponensek között, vagy a közösséggel.

Ezt részletesebben kibeszéljük a [Készítsd el a saját Horgod](/docs/hooks-custom.html) fejezetben.

### A bonyolult komponensek egyre nehezebben érthetőek {#complex-components-become-hard-to-understand}

Gyakran kellett komponenseket kezelnünk, amik egyszerűnek indultak, de egy nagy, állapotteljes, mellékhatásokkal teli, kezelhetetlen zűrzavarrá váltak. Minden egyes életciklus metódus gyakran tartalmaz oda nem illő logikát. Például egy komponens végrehajthat adatlehívást a `componentDidMount`-ban és a `componentDidUpdate`-ben. De ugyanez a `componentDidMount` metódus tartalmazhat más, oda nem illő logikát ami eseményhallgatókat állít fel, ezek eltávolítása pedig a `componentWillUnmount`-ban történik. Együtt változó, egymástól függő kód elválasztódik egymástól, miközben teljesen össze nem illő kódrészletek ugyanabban a metódusban végzik. Ez könnyen hibákhoz és ellentmondásokhoz vezethet.

A legtöbb esetben ezeket a komponenseket nem lehet kisebb egységekre feldarabolni, mert az állapotteljes logika szanaszét van. Valamint tesztelni is nehéz őket. Ez az egyik oka, hogy sokan szeretik a Reactet különálló állapotkezelő könyvtárakkal kombinálni. Azonban ez gyakran túl sok absztrakcióval jár, fájlok közötti ugrálást igényel és nehezebbé teszik a komponenseid újrafelhasználását.

Ezen problémák megoldására, **a Horgokkal egy komponenst fel tudsz darabolni kisebb függvényekké, a darabok összefüggőségét alapul véve (például egy feliratkozás felállítása, vagy adatlehívás)** ahelyett, hogy a feldarabolást életciklusok diktálnák. Opcionálisan, a helyi állapot kiszámíthatóbbá tételéhez választhatsz egy redukátort (reducer).

Ezt részletesebben kibeszéljük a [A Hatás Horog](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) fejezetben.

### Az osztályok az embereket és gépeket is megzavarják {#classes-confuse-both-people-and-machines}

Azon kívül, hogy a kód újrafelhasználását és rendezését nehezebbé teszik, azt is észrevettük, hogy az osztályok a React tanulásában is akadályt képezhetnek. Értened kell a `this` működését JavaScriptben, ami nagyon különböző a legtöbb nyelv működéséhez képest. Emlékezned kell az eseményhallgatók megkötésére (bind). Instabil [szintaxis javaslatok nélkül](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) a kód nagyon bőbeszédűvé válik. Az emberek tökéletesen megértik a prop-okat, az állapotot, a fentről-lefelé irányuló adatfolyamot, de még mindig küzdenek az osztályokkal. A függvény és osztály közötti megkülönböztetés a Reactben, és hogy mikor melyiket kell használni, még gyakorlott React fejlesztők között is nézeteltérésekhez vezet.

Továbbá, a React nagyjából már öt éve kint van, és azt szeretnék, ha a következő öt évben is releváns maradna. Ahogy a [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) és mások is mutatják, a komponensek [idő előtti kompilációjának](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) nagy jövője van. Főleg ha az nem korlátozott sablonokra. A közelmúltban kísérletezni kezdtünk a [komponens hajtogatással](https://github.com/facebook/react/issues/7323) a [Prepack](https://prepack.io/) használatával, és az eredmény jónak ígérkezik. Azonban úgy találtuk, hogy az osztálykomponensek akaratlan mintákra bátorítanak, amik ezek optimalizálását nehézkessé teszik. Az osztályokkal problémák lépnek fel a ma eszközeiben is. Például az osztályokat nehéz jól kisebbíteni és az azonnali újratöltést (hot reloading) is döcögőssé és megbízhatatlanná teszik. Egy olyan API-t szeretnénk bemutatni, ami a kódot nagyobb eséllyel tartja a jobban optimalizálható pályán.

Ezen problémák megoldására, a **Horgok a React funkcióinak használatát teszik lehetővé osztályok nélkül.** Elméletben a React komponensek mindig közelebb álltak a függvényekhez. A Horgok felkarolják a függvényeket, de anélkül, hogy feláldoznák a React gyakorlati szellemét. A Horgok egy imperatív menekülőutat szolgáltatnak, és nem igényelnek bonyolult funkcionális vagy reaktív programozási technikákat.

>Példák
>
>A [Horgok egy pillantásra](/docs/hooks-overview.html) egy jó hely elkezdeni a Horgok tanulását.

## Fokozatos adoptáló stratégia {#gradual-adoption-strategy}

>**Röviden: Nincs tervben az osztályok eltávolítása Reactből.**

Tisztában vagyunk vele, hogy a React fejlesztők termékek leszállítására fókuszálnak és nincs idejük minden új kiadott API változást megnézni. A Horgok még nagyon újak, ezért lehet, hogy megéri várni, amíg több példa és tutoriál jelenik meg, mielőtt elkezdenéd tanulni, vagy adoptálni őket.

Azt is megértjük, hogy a léc nagyon magas egy új React primitív hozzáadásakor. Az érdeklődő olvasóknak készítettünk egy [részletes RFC-t](https://github.com/reactjs/rfcs/pull/68), ami mélyebbre menően foglalkozik a motivációval és egy extra perspektívát ad a specifikus tervezési döntésekről és az Horgok ihletőiről.

<<<<<<< HEAD
**Alapvető, hogy a Horgok együtt tudnak működni a meglévő kódoddal, hogy fokozatosan tudd őket adoptálni.** Senki nem sürget a Horgokra migrálással. Ajánljuk a "nagy átírások" elkerülését, főleg meglévő, bonyolult osztálykomponensek esetében. Hogy "Horgokban kezdj el látni", egy új gondolkodásmódot igényel. Tapasztalataink szerint a legjobb mód a Horgok használatára új, és nem kritikus komponensek, de győződj meg róla, hogy a csapatodban mindenki komfortosan érzi magát velük. A Horgok kipróbálása után nyugodtan [küldj nekünk visszajelzést](https://github.com/facebook/react/issues/new), legyen az pozitív, vagy negatív.
=======
**Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.** There is no rush to migrate to Hooks. We recommend avoiding any "big rewrites", especially for existing, complex class components. It takes a bit of a mind shift to start "thinking in Hooks". In our experience, it's best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

A Horgokkal azt szeretnénk elérni, hogy az osztályok minden jelenleg elérhető használati módját lefedjék, de **az előrelátható jövőben folytatni fogjuk az osztályok támogatását is.** A Facebooknál több tízezer komponenst írtunk osztályokban, és egyáltalán nincs tervben ezek átírása. Ehelyett a Horgokat csak új kódban használjuk közvetlenül osztályok mellett.

## GY.I.K {#frequently-asked-questions}

Készítettünk egy [Horgok GY.I.K oldalt](/docs/hooks-faq.html), ami a Horgokkal kapcsolatos leggyakoribb kérdéseket válaszolja meg.

## A következő lépések {#next-steps}

Ennek az oldalnak a végére érve most már nagyjából lehet egy elképzelésed arról, hogy a Horgok milyen problémákat próbálnak megoldani, de valószínűleg sok részlet még nem teljesen tiszta. Ne aggódj! **Most menjünk a [következő oldalra](/docs/hooks-overview.html), ahol a Horgokról példákon keresztül kezdhetünk el tanulni.**
