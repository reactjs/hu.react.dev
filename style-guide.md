# Univerzális stílus útmutató

## Kezdő lépések
Kezdésnek olvasd el [ezt a kommentet](https://github.com/reactjs/hu.reactjs.org/issues/1#issue-445691844)

## Fejléc azonosítók

Minden fejlécnek van egy saját azonosítója:

```md
## Try React {#try-react}
```

Ezeket az azonosítókat **ne** fordítsd le! Ezek a navigáció szempontjából fontosak, és ha megváltoznak, a külső linkek nem fognak működni, azaz:

```md
See the [beginning section](/getting-started#try-react) for more information.
```

✅ TEDD:

```md
## Próbáld ki a React-et {#try-react}
```

❌ NE TEDD:

```md
## Próbáld ki a React-et {#probald-ki-a-reactet}
```

Ez elérhetetlenné teszi a fenti linket.

## Szöveg Kódblokkokban

A kódblokkokban lévő szövegeket - a kommentek, esetleg a sztringek kivételével - ne fordítsd le. Vigyázz, hogy kódra utaló sztringeket ne fordíts le!

Példa:
```js
// Example
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ TEDD:

```js
// Példa
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ EZ IS OK:

```js
// Példa
const element = <h1>Helló világ</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

❌ NE TEDD:

```js
// Példa
const element = <h1>Helló világ</h1>;
// "root" refers to an element ID.
// DO NOT TRANSLATE
ReactDOM.render(element, document.getElementById('gyökér'));
```

❌ SEMMIKÉPP NE TEDD:

```js
// Példa
const elem = <h1>Helló világ</h1>;
ReactDOM.renderelés(elem, dokumentum.elemKiemeléseAzonosítóval('gyökér'));
```

## Külső linkek

Ha egy külső link például egy az [MDN]-en vagy [Wikipédia]-n lévő cikkre mutat, és az adott cikk rendelkezik magyar fordítással, akkor azt a verziót linkeld.

[MDN]: https://developer.mozilla.org/hu/
[Wikipédia]: https://hu.wikipedia.org/wiki/Kezd%C5%91lap

Példa:

```md
React is a [JavaScript library](https://en.wikipedia.org/wiki/JavaScript_library).
```

✅ OK:

```md
A React egy [JavaScript könyvtár](https://hu.wikipedia.org/wiki/JavaScript_könyvtár).
```

Egyéb esetben (pl.: Stack Overflow, YouTube videók, stb.), linkelj az angol forráshoz.

## Gyakori technikai, vagy React specifikus kifejezések:
[ Glossary 📚 #2](https://github.com/reactjs/hu.reactjs.org/issues/2)

## Hasznos források:

1. [Angol-magyar informatikai szótár](https://www.tankonyvtar.hu/hu/tartalom/tkt/angol-magyar/index.html)
2. [IT-Szótár](http://www.itszotar.hu/)
3. Tippeket elfogadunk 😉


**Annak érdekében, hogy külsős - magyarul nem beszélő - karbantartók is követni tudják a fordítási folyamatot, a forráskódban és Giten/GitHubon (pl.: Git commit üzenetben, Git issue hozzászólásokban) használd az angolt, amennyiben az nem akadályoz meg a tiszta, egyértelmű kommunikációban.**


### Egyéb
- Az olvasót egyes szám második személyként (tegeződő) formában szólítsd meg. (Nincs szükség formalitásra. 🚫🧐)
- Ahol lehet, ragaszkodj az eredeti kis-nagy betűíráshoz.
- Figyelj az egyes és többes számokra.
- Ha kérdésed van, nyiss egy [issue](https://github.com/reactjs/hu.reactjs.org/issues/new)-t GitHubon, vagy írj [@balazsorban44](https://github.com/balazsorban44)-nek, vagy [@gergely-nagy](http://github.com/gergely-nagy)-nak. 

Sok szerencsét a fordítóknak! 🍀
