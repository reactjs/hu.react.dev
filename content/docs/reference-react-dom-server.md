---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

A `ReactDOMServer` objektum komponensek statikus sémává való renderelését teszi lehetővé. Tipikusan egy Node szerveren használt:

```js
<<<<<<< HEAD
// ES modulok
import ReactDOMServer from 'react-dom/server';
=======
// ES modules
import * as ReactDOMServer from 'react-dom/server';
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## Áttekintés {#overview}

<<<<<<< HEAD
A következő metódusok mind böngésző-, és szerverkörnyezetben is használhatóak:
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.dev/learn/nodejs-streams):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
Ezek a további metódusok függenek a `stream` csomagtól, tehát **csak a szerveren elérhetőek** és nem fognak működni a böngészőben.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Referencia {#reference}
=======
## Reference {#reference}
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

<<<<<<< HEAD
Egy React elemet renderel annak kezdetleges HTML formájába. A React egy HTML sztringet ad vissza. Ezzel a metódussal HTML-t tudsz generálni a szerveren és ezt a sémát le tudod küldeni a kezdetleges lekérésben egy gyorsabb oldalbetöltésért, valamint hogy lehetővé tedd az oldalad vizsgálatát keresőmotoroknak SEO optimalizálás céljából.

Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg, ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.
=======
Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

<<<<<<< HEAD
A [`renderToString`](#rendertostring)-hez hasonló, kivéve, hogy nem hoz létre extra DOM attribútumokat - mint például a `data-reactroot` -  amiket a React belsőleg használ. Ez akkor hasznos, ha a Reactet egy szimpla statikus oldalgenerátorként akarod használni, mivel az extra attribútumok lecsupaszításával pár bájtot meg lehet takarítani.

Ha a Reactet a kliens oldalon tervezed használni, hogy interaktívvá tedd a sémát, ne használd ezt a metódust. Helyette használd a [`renderToString`](#rendertostring)-t a szerveren és a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate)-t a kliensen.
=======
Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

* * *

### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
Egy React elemet renderel annak kezdetleges HTML formájába. Egy [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)-et ad vissza, ami pedig egy HTML sztringet. A folyam HTML kimenete tökéletesen megegyezik azzal, amit a [`ReactDOMServer.renderToString`](#rendertostring) adna vissza. Ezzel a metódussal HTML-t tudsz generálni a szerveren és ezt a sémát le tudod küldeni a kezdetleges lekérésben egy gyorsabb oldalbetöltésért, valamint hogy lehetővé tedd az oldalad vizsgálatát keresőmotoroknak SEO optimalizálás céljából.

Ha a [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) metódust egy olyan csomóponton hívod meg, ami már rendelkezik ezzel a szerveroldali sémával, a React megőrzi azt és csak eseménykezelőket csatol hozzá, ezzel lehetővé téve a gyors első alkalombeli betöltési élményt.
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

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
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d

> Megjegyzés:
>
> Csakis a szerveren működik. Ez az API nem elérhető a böngészőben.
>
<<<<<<< HEAD
> Az ezen metódus által visszaadott folyam (stream) egy utf-8-ban kódolt bájtfolyamot ad vissza. Ha a folyamra egy másik kódolási formában van szükséged, nézz utána projekteknek mint például az [iconv-lite](https://www.npmjs.com/package/iconv-lite), ami folyamok transzformálását teszi lehetővé szövegek transzkódolásához.
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d
