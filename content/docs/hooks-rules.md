---
id: hooks-rules
title: Horgok szabályai
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

A *Horgok* a React 16.8-as verziójában lettek hozzáadva. Osztályok létrehozása nélkül is lehetőséget kínálnak állapot, és más React funkciók használatához.

A Horgok JavaScript függvények, de használatukkor két szabályt be kell tarts. Szolgáltatunk egy linter plugint, ami ezen szabályok automatikus betartására kényszerít:

### Horgokat csakis a legfelsőbb szinten hívj meg {#only-call-hooks-at-the-top-level}

**Ne hívj meg Horgokat ciklusokban, feltételes ágakban, vagy egymásba ágyazott függvényekben.** A Horgokat mindig a React függvényed legfelső szintjén hívd meg, bármely korai visszatérés előtt. Ennek a szabálynak a betartásával gondoskodsz róla, hogy a Horgok a komponens minden renderelésénél ugyanabban a sorrendben legyenek meghívva. Ez teszi lehetővé a React számára több `useState` és `useEffect` hívás esetén az állapot megőrzését. (Ha kíváncsi vagy, [lentebb](#explanation) ezt részletesen is kifejtjük.)

### Horgokat csakis React függvényekből hívj meg {#only-call-hooks-from-react-functions}

**Ne hívj meg Horgokat általános JavaScript függvényekből.** Ehelyett:

* ✅ Horgokat React függvénykomponensekből hívj meg.
* ✅ Horgokat egyedi Horgokból hívj meg (erről többet fogunk tanulni [a következő oldalon](/docs/hooks-custom.html)).

Ennek a szabálynak a betartásával gondoskodsz róla, hogy minden állapotteljes komponenslogika tisztán kiolvasható legyen a forráskódból.

## ESLint Plugin {#eslint-plugin}

Kiadtunk egy ESLint plugint [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) néven, ami ezt a két szabályt segít betartani. Ha ki szeretnéd próbálni, így tudod hozzáadni a projektedhez:

Ezt a plugint a [Create React App](/docs/create-a-new-react-app.html#create-react-app) alapból tartalmazza.

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```js
// Az ESLint konfigurációd
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Ellenőrzi a Horgok szabályainak betartását
    "react-hooks/exhaustive-deps": "warn" // Ellenőrzi a hatásfüggőségeket
  }
}
```

**[A saját Horgod](/docs/hooks-custom.html) írásához most továbbléphetsz a következő oldalra.** Ezen az oldalon tovább magyarázzuk az érveléseinket ezen szabályok mellett.

## Magyarázat {#explanation}

Ahogy [korábban megtanultuk](/docs/hooks-state.html#tip-using-multiple-state-variables), egy komponensben egyszerre több Állapot és Hatás Horgot is használhatunk:

```js
function Form() {
  // 1. Használd a név állapotváltozót
  const [name, setName] = useState('Mary');

  // 2. Használj egy hatást az űrlap megőrzésére
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Használd a családi név állapotváltozót
  const [surname, setSurname] = useState('Poppins');

  // 4. Használj egy hatást a dokumentum címének frissítéséhez
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

Szóval hogyan is tudja a React, hogy melyik állapothoz melyik `useState` hívás tartozik? A válasz, hogy **a React a Horgok meghívásának sorrendjére hagyatkozik**. A példánk azért működik, mert a Horgok meghívásának sorrendje minden renderelés során ugyanaz:

```js
// ------------
// Első renderelés
// ------------
useState('Mary')           // 1. Inicializáld a név állapotváltozót 'Mary'-vel
useEffect(persistForm)     // 2. Adj hozzá egy hatást az űrlap megőrzéséért
useState('Poppins')        // 3. Inicializáld a családi név állapotváltozót 'Poppins'-szal
useEffect(updateTitle)     // 4. Adj hozzá egy hatást a cím frissítéséért

// -------------
// Második renderelés
// -------------
useState('Mary')           // 1. Olvasd ki a énv állapotváltozót (az argumentum ignorálva van)
useEffect(persistForm)     // 2. Cseréld le a hatást az űrlap megőrzéséért
useState('Poppins')        // 3. Olvasd ki a családi név állapotváltozót (az argumentum ignorálva van)
useEffect(updateTitle)     // 4. Cseréld ki a hatást a cím frissítéséért

// ...
```

Egészen addig, amíg a Horgok meghívása nem változik a renderelések között, a React asszociálni tudja a helyi állapotokat ezekkel. De mi történik, ha az egyik Horog meghívását (például a `persistForm` hatást) egy feltételbe tesszük?

```js
  // 🔴 Ezzel megszegjük az első szabályt, mivel a Horgot egy feltételben használjuk
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

A `name !== ''` feltétel `true` az első rendereléskor, szóval lefuttatjuk a Horgot. Azonban a következő rendereléskor a felhasználó törölheti az űrlapot, ezzel `false`-ra állítva feltételt. Most, hogy a renderelés során kihagyjuk a Horog meghívását, a Horgok meghívásának sorrendje megváltozik:

```js
useState('Mary')           // 1. Olvasd ki a énv állapotváltozót (az argumentum ignorálva van)
// useEffect(persistForm)  // 🔴 Ez a Horog ki lett hagyva!
useState('Poppins')        // 🔴 2 (de az előbb 3 volt). Nem tudja kiolvasni a családi név állapotváltozót
useEffect(updateTitle)     // 🔴 3 (de az előbb 4 volt). Nem tudja kicserélni a hatást
```

A React nem tudhatta, hogy mit adjon vissza a második `useState` Horog meghívásakor. A React arra számított, hogy a komponensben lévő második Horog meghívása a `persistForm` hatásnak felel meg, ahogyan az előző rendereléskor is, de most már nem ez a helyzet. Mostantól minden Horog meghívás a kihagyás után el van csúszva eggyel, ami hibákhoz vezet.

**Ezért kell, hogy a Horgok csak a komponensünk legfelsőbb szintjén legyenek meghívva.** Ha egy hatást feltételesen szeretnénk futtatni, vigyük át a feltételt a Horgon *belülre*:

```js
  useEffect(function persistForm() {
    // 👍 Így már nem szegjük meg az első szabályt
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Jegyezd meg, hogy ettől a problémától nem kell tartanod, ha használod a [szolgáltatott lint szabályt](https://www.npmjs.com/package/eslint-plugin-react-hooks).** De most már azt is tudod, hogy *miért* működnek így a Horgok, és milyen hibákat előz meg a szabály.

## Következő lépések {#next-steps}

Végre, készen állunk [saját Horgaid írásának](/docs/hooks-custom.html) tanulására! Az Egyedi Horgok lehetővé teszik a React által szolgáltatott Horgokat saját absztrakcióidba kombinálni, és állapotteljes logika újrafelhasználását különböző komponensek között.
