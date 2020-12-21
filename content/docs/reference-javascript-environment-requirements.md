---
id: javascript-environment-requirements
title: JavaScript környezeti követelmények
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
A React 16 függ a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) és [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) kollekció típusoktól. Ha régebbi böngészőket és eszközöket is támogatsz, amik ezt még alapból nem támogatják (pl. IE < 11), vagy előírásnak nem megfelelően vannak implementálva (pl. IE 11), fontold meg egy globális polyfill beágyazását az összecsomagolt alkalmazásodba, mint például a [core-js](https://github.com/zloirock/core-js) vagy a [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 923629258fce174a89231c88c90805d9e5b0278d

Egy core-js polyfillel ellátott React 16 környezet, ami régebbi böngészőket is támogat, így nézne ki:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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
