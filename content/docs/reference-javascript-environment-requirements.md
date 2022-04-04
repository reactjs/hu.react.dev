---
id: javascript-environment-requirements
title: JavaScript környezeti követelmények
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
A React 16 függ a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) és [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) kollekció típusoktól. Ha régebbi böngészőket és eszközöket is támogatsz, amik ezt még alapból nem támogatják (pl. IE < 11), vagy előírásnak nem megfelelően vannak implementálva (pl. IE 11), fontold meg egy globális polyfill beágyazását az összecsomagolt alkalmazásodba, mint például a [core-js](https://github.com/zloirock/core-js).

Egy core-js polyfillel ellátott React 16 környezet, ami régebbi böngészőket is támogat, így nézne ki:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Helló világ!</h1>,
  document.getElementById('root')
);
```

A React függ a `requestAnimationFrame` metódustól is (tesztkörnyezetekben szintúgy).
A `requestAnimationFrame` alátételezéséhez használhatod a [raf](https://www.npmjs.com/package/raf) csomagot:

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
