---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

A `ReactDOMServer` objektum komponensek statikus sémává való renderelését teszi lehetővé. Tipikusan egy Node szerveren használt:

```js
// ES modulok
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Áttekintés {#overview}

A következő metódusok mind böngésző-, és szerverkörnyezetben is használhatóak:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Ezek a további metódusok függenek a `stream` csomagtól, tehát **csak a szerveren elérhetőek** és nem fognak működni a böngészőben.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referencia {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Egy React elemet renderel annak kezdetleges HTML formájába. A React egy HTML sztringet ad vissza. Ezzel a metódussal HTML-t tudsz generálni a szerveren és ezt a sémát le tudod küldeni a kezdetleges lekérésben egy gyorsabb oldalbetöltésért és hogy lehetővé tedd a keresőmotorknak az oldalad vizsgálatát SEO optimalizálás céljából.

Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

A [`renderToString`](#rendertostring)-hez hasonló, kivéve hogy nem hoz létre extra DOM attribútumokat - mint például a `data-reactroot`-  amiket a React használ belsőleg. Ez akkor hasznos ha a Reactet egy szimpla statikus oldal generátorként akarod használni, mivel az extra attribútumok lecsupaszításával pár bájtot meg lehet takarítani.

Ha a Reactet a kliens oldalon tervezed használni hogy interaktívvá tedd a sémát, ne használd ezt a metódust. Helyette használd a [`renderToString`](#rendertostring)-t a szerveren és a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)-t a kliensen.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Egy React elemet renderel annak kezdetleges HTML formájába. Egy [Readable streamet](https://nodejs.org/api/stream.html#stream_readable_streams) ad vissza, ami egy HTML sztringet ad ki. A folyam HTML kimenete tökéletesen megegyezik azzal amit a [`ReactDOMServer.renderToString`](#rendertostring) adna vissza. Ezt a metódust a szerveren tudod arra használni, hogy le tudd küldeni a sémát a kezdetleges lekérésben gyorsabb oldalbetöltésért és hogy lehetővé tedd a keresőmotorknak az oldalad vizsgálatát SEO optimalizálás céljából.

Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.

> Megjegyzés:
>
> Csakis a szerveren működik. Ez az API nem elérhető a böngészőben.
>
> Az ezen metódus által visszaadott folyam (stream) egy utf-8-ban kódolt bájtfolyamot ad vissza. Ha a folyamra egy másik kódolási formában van szükséged, nézz utána projekteknek mint például az [iconv-lite](https://www.npmjs.com/package/iconv-lite), ami folyamok transzformálását teszi lehetővé szövegek transzkódolásához.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

A [`renderToNodeStream`](#rendertonodestream)-hez hasonló, kivéve hogy nem hoz létre extra DOM attribútumokat - mint például a `data-reactroot`-  amiket a React használ belsőleg. Ez akkor hasznos ha a Reactet egy szimpla statikus oldal generátorként akarod használni, mivel az extra attribútumok lecsupaszításával pár bájtot meg lehet takarítani.

A folyam HTML kimenete tökéletesen megegyezik azzal amit a [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) adna vissza.

Ha a Reactet a kliens oldalon tervezed használni hogy interaktívvá tedd a sémát, ne használd ezt a metódust. Helyette használd a [`renderToNodeStream`](#rendertonodestream)-t a szerveren és a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)-t a kliensen.

> Megjegyzés:
>
> Csakis a szerveren működik. Ez az API nem elérhető a böngészőben.
>
> Az ezen metódus által visszaadott folyam (stream) egy utf-8-ban kódolt bájtfolyamot ad vissza. Ha a folyamra egy másik kódolási formában van szükséged, nézz utána projekteknek mint például az [iconv-lite](https://www.npmjs.com/package/iconv-lite), ami folyamok transzformálását teszi lehetővé szövegek transzkódolásához.
