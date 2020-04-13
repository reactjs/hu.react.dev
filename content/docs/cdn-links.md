---
id: cdn-links
title: CDN linkek
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

A React és a ReactDOM egyaránt elérhető CDN-en keresztül.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

A fenti verziók csak a fejlesztésre értendőek, és nem megfelelőek éles környezetben való használathoz. A React kicsinyített és optimalizált változatai a következő helyen érhetőek el:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

A `react` és a `react-dom` adott verziójának betöltéséhez cseréld ki a `16`-ot a verziószámra.

### Miért szükséges a `crossorigin` attribútum? {#why-the-crossorigin-attribute}

Ha a React-et egy CDN-ből szeretnéd kiszolgálni, ajánljuk, hogy hagyd a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribútumot beállítva:

```html
<script crossorigin src="..."></script>
```

Javasoljuk ellenőrizd, hogy az általad használt CDN beállította az `Access-Control-Allow-Origin: *` HTTP fejlécet:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Ez jobb [hibakezelési élményt](/blog/2017/07/26/error-handling-in-react-16.html) tesz lehetővé a React 16 és későbbi verzióiban.
