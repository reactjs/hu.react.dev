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

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referencia {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Egy React elemet renderel annak kezdetleges HTML formájába. A React egy HTML sztringet ad vissza. Ezzel a metódussal HTML-t tudsz generálni a szerveren és ezt a sémát le tudod küldeni a kezdetleges lekérésben egy gyorsabb oldalbetöltésért, valamint hogy lehetővé tedd az oldalad vizsgálatát keresőmotoroknak SEO optimalizálás céljából.

<<<<<<< HEAD
Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg, ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

A [`renderToString`](#rendertostring)-hez hasonló, kivéve, hogy nem hoz létre extra DOM attribútumokat - mint például a `data-reactroot` -  amiket a React belsőleg használ. Ez akkor hasznos, ha a Reactet egy szimpla statikus oldalgenerátorként akarod használni, mivel az extra attribútumok lecsupaszításával pár bájtot meg lehet takarítani.

<<<<<<< HEAD
Ha a Reactet a kliens oldalon tervezed használni, hogy interaktívvá tedd a sémát, ne használd ezt a metódust. Helyette használd a [`renderToString`](#rendertostring)-t a szerveren és a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)-t a kliensen.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

Egy React elemet renderel annak kezdetleges HTML formájába. Egy [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)-et ad vissza, ami pedig egy HTML sztringet. A folyam HTML kimenete tökéletesen megegyezik azzal, amit a [`ReactDOMServer.renderToString`](#rendertostring) adna vissza. Ezzel a metódussal HTML-t tudsz generálni a szerveren és ezt a sémát le tudod küldeni a kezdetleges lekérésben egy gyorsabb oldalbetöltésért, valamint hogy lehetővé tedd az oldalad vizsgálatát keresőmotoroknak SEO optimalizálás céljából.

<<<<<<< HEAD
Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg, ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

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

A [`renderToNodeStream`](#rendertonodestream)-hez hasonló, kivéve, hogy nem hoz létre extra DOM attribútumokat - mint például a `data-reactroot` -  amiket a React belsőleg használ. Ez akkor hasznos, ha a Reactet egy szimpla statikus oldalgenerátorként akarod használni, mivel az extra attribútumok lecsupaszításával pár bájtot meg lehet takarítani.

A folyam HTML kimenete tökéletesen megegyezik azzal, amit a [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) adna vissza.

<<<<<<< HEAD
Ha a Reactet a kliens oldalon tervezed használni, hogy interaktívvá tedd a sémát, ne használd ezt a metódust. Helyette használd a [`renderToNodeStream`](#rendertonodestream)-t a szerveren és a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)-t a kliensen.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Megjegyzés:
>
> Csakis a szerveren működik. Ez az API nem elérhető a böngészőben.
>
> Az ezen metódus által visszaadott folyam (stream) egy utf-8-ban kódolt bájtfolyamot ad vissza. Ha a folyamra egy másik kódolási formában van szükséged, nézz utána projekteknek mint például az [iconv-lite](https://www.npmjs.com/package/iconv-lite), ami folyamok transzformálását teszi lehetővé szövegek transzkódolásához.
