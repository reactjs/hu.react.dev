---
id: dom-elements
title: DOM Elemek
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

A React egy böngészőfüggetlen DOM rendszert implementál a teljesítmény és böngészők közti kompatibilitás érdekében. Éltünk a lehetőséggel és lekerekítettünk néhány érdes sarkot a DOM implementációban.

A Reactben minden DOM tulajdonság és attribútum (az eseménykezelőket beleértve) camelCase formában kell, hogy legyen írva. Például a `tabindex` HTML attribútum a `tabIndex`-szel egyenértékű Reactben. A kivétel az `aria-*` és a `data-*` attribútumok, amik kisbetűsek. Például az `aria-label`-t megtarthatod `aria-label`-ként.

## Attribútumok közti különbségek {#differences-in-attributes}

Számos különbség van a React és a HTML attribútumainak működése között:

### checked {#checked}

A `checked` attribútum a `checkbox` vagy a `radio` típusú `<input>` komponens által támogatott. Használhatod arra, hogy azt jelöld egy komponens ki van-e választva, vagy sem. Ez hasznos kontrollált komponensek építése esetén. A `defaultChecked` kontrollálatlan megfelelője, ami a komponens létrejöttekor határozza meg, hogy az ki van-e választva, vagy sem.

### className {#classname}

Egy CSS osztály meghatározásához használd a `className` attribútumot. Ez minden általános DOM és SVG elemre vonatkozik, mint a `<div>`, `<a>` és a többi.

Ha a Reactet Web Komponensekkel használod (ami ritka), használd inkább a `class` attribútumot.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

A `dangerouslySetInnerHTML` a React `innerHTML` helyettesítője a böngésző DOM-ban. Általában HTML-t így bevinni kockázatos, mert akarva-akaratlanul [cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) támadásnak teszed ki vele a felhasználóidat. Szóval annak ellenére, hogy bevihetsz HTML-t a Reacttel, ki kell írnod a `dangerouslySetInnerHTML` attribútumot, ami egy objektumot fogad egy `__html` tulajdonsággal, ami emlékeztessen arra, hogy ez veszélyes. Például:

```js
function createMarkup() {
  return {__html: 'Első &middot; Második'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

Mivel a `for` egy JavaScriptnek fenntartott kulcsszó, a React elemek helyette a `htmlFor`-t használják.

### onChange {#onchange}

Az `onChange` esemény úgy viselkedik, ahogy elvárnád: amikor egy űrlap mezője megváltozik, ez az esemény meg lesz hívva. Szándékosan nem használjuk a beépített böngészőviselkedést, mivel az `onChange` egy helytelen elnevezés a viselkedésére, és a React erre az eseményre támaszkodik valósidejű felhasználói bevitelek kezelésére.

### selected {#selected}

Ha egy `<option>`-t kiválaszottként szeretnél megjelölni, referálj annak értékére a `<select>` `value` propjában. Nézd meg a [select címkét](/docs/forms.html#the-select-tag) további részletekért.

### style {#style}

>Megjegyzés
>
> Néhány példa a dokumentációban a `style`-t használja a kényelmesség érdekében, de a **style attribútum használata elsődleges elemstílusozásra általában nem ajánlott.** A legtöbb esetben [`className`](#classname) használata ajánlott, ami külső CSS stíluslapokban lévő osztályokra hivatkozik. A `style` a Reactben leggyakrabban rendereléskor dinamikusan kiszámított stílusok hozzáadásához használt. Lásd még [GY.I.K: Stílusozás és CSS](/docs/faq-styling.html).

A `style` attribútum egy camelCase formátumú tulajdonságokkal ellátott JavaScript objektum, CSS sztringek helyett. Ez konzisztens a DOM `style` JavaScript tulajdonságával, hatékonyabb és megelőzi az XSS biztonsági réseket. Például:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Helló világ!</div>;
}
```

Megjegyzendő hogy a stílusok nincsenek automatikusan prefixálva. Régebbi böngészők támogatásához szolgáltatnod kell a megfelelő tulajdonságokat:

```js
const divStyle = {
  WebkitTransition: 'all', // Figyeld meg a nagybetűs 'W'-t
  msTransition: 'all' // Az 'ms' az egyetlen vendor prefixum
};

function ComponentWithTransition() {
  return <div style={divStyle}>Ennek működnie kell böngészők között</div>;
}
```

A stíluskulcsok camelCase formátumban vannak, hogy konzisztens legyen az elérésük a DOM-on lévő csomópontokkal JS-ből. (pl. `node.style.backgroundImage`). A vendor prefixumok [kivétel az `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) nagybetűvel kell, hogy kezdődjenek. A `WebkitTransition`-nak ezért van nagy "W"-je.

A React automatikusan hozzáilleszti a "px"-et bizonyos numerikus sorközi stílustulajdonságok után. Ha más egységet használnál a "px" helyett, az értéket sztringként add meg a kívánt egységgel. Például:

```js
// Az stílus eredménye: '10px'
<div style={{ height: 10 }}>
  Helló világ!
</div>

// A stílus eredménye: '10%'
<div style={{ height: '10%' }}>
  Helló világ!
</div>
```

Habár nem minden stílustulajdonság van pixel sztringgé átkonvertálva. Néhányan egység nélkül maradnak (pl. `zoom`, `order`, `flex`). Az egység nélküli tulajdonságok teljes listáját [itt](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) találod.

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Általában egy figyelmeztetés jelenik meg, amikor egy elem gyermekekkel `contentEditable`-ként is meg van jelölve, mert ez nem fog működni. Ez az attribútu, elnyomja a figyelmeztetést. Csak akkor használd, ha egy könyvtárat készítesz, mint például a [Draft.js](https://facebook.github.io/draft-js/), ami manuálisam kezeli a `contentEditable`-t.

### suppressHydrationWarning {#suppresshydrationwarning}

Ha szerver oldali React renderelést használsz, általában van egy figyelmeztetés, amikor a szerver és a kliens tartalma eltér. Azonban ritka esetekben nagyon nehéz, vagy lehetetlen a tökéletes egyezést garantálni. Például a időbélyegek várhatóan eltérnek a szerveren és a kliensen.

Ha a `suppressHydrationWarning`-ot `true`-ra állítod, a React nem fog figyelmeztetni az attribútumok, vagy az elem tartalmának eltérése esetén. Ez csak egy szint mélységig működik, és egy menekülési útnak van szánva. Ne használd túl sokat. A hidrálásról többet olvashatsz a [`ReactDOM.hydrate()` dokumentációban](/docs/react-dom.html#hydrate).

### value {#value}

A `value` attribútumot az `<input>`, `<select>` és `<textarea>` komponensek támogatják. Használhatod a komponens értéknek a megadására. Hasznos kontrollált komponensek készítéséhez. A `defaultValue` a kontrollálatlan változata, amivel a komponens értékét akkor tudod állítani, amikor az először jön létre.

## Minden támogatott HTML attribútum {#all-supported-html-attributes}

A React 16-tól kezdve minden standard, [vagy egyedi](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM attribútum teljesen támogatott.

A React mindig is biztosított egy JavaScript centrikus API-t a DOM-hoz. Mivel a React komponensek gyakran használnak mind egyedi és DOM-mal kapcsolatos propokat, a React konvenció alapján `camelCase` formátumot használ úgy, ahogyan a DOM API-k:

```js
<div tabIndex={-1} />      // Pont, mint a node.tabIndex DOM API
<div className="Button" /> // Pont, mint a node.className DOM API
<input readOnly={true} />  // Pont, mint a node.readOnly DOM API
```

Ezek a propok nagyon hasonlóan működnek a megegyező HTML attribútumokhoz, a fentebb dokumentált speciális esetek kivételével.

Néhány React által támogatott DOM attribútum:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Hasonlóan, minden SVG attribútum teljes mértékben támogatott:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Használhatsz egyedi attribútumokat is, amíg azok teljesen kisbetűsek.
