---
id: cdn-links
title: CDN linkek
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

A React és a ReactDOM egyaránt elérhető CDN-en keresztül.

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

A fenti verziók csak a fejlesztésre értendőek, és nem megfelelőek éles környezetben való használathoz. A React kicsinyített és optimalizált változatai a következő helyen érhetőek el:

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
A `react` és a `react-dom` egy adott verziójának betöltéséhez cseréld ki a `17`-et a kívánt verziószámra.
=======
To load a specific version of `react` and `react-dom`, replace `18` with the version number.
>>>>>>> 3aac8c59848046fb427aab4373a7aadd7069a24c

### Miért szükséges a `crossorigin` attribútum? {#why-the-crossorigin-attribute}

Ha a React-et egy CDN-ből szeretnéd kiszolgálni, ajánljuk, hogy hagyd a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribútumot beállítva:

```html
<script crossorigin src="..."></script>
```

Javasoljuk ellenőrizd, hogy az általad használt CDN beállította az `Access-Control-Allow-Origin: *` HTTP fejlécet:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Ez jobb [hibakezelési élményt](/blog/2017/07/26/error-handling-in-react-16.html) tesz lehetővé a React 16 és későbbi verzióiban.
