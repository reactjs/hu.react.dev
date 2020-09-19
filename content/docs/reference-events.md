---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Ez a referencia útmutató a `SyntheticEvent` csomagolót dokumentálja, ami a React Eseményrendszere egy részét képzi. Ha többet szeretnél tanulni erről, nézd meg az [Események kezelése](/docs/handling-events.html) útmutatót.

## Áttekintés {#overview}

Az eseménykezelőidnek a `SyntheticEvent` példányai lesznek átadva, ami egy böngészőtől független konténer, a böngésző natív eseményei körül. Ugyanazzal az interfésszel rendelkezik mint a natív események, a `stopPropagation()`-t és a `preventDefault()`-ot beleértve, kivéve, hogy ezek az események a böngészőktől függetlenül egységesen működnek.

Ha azon kapod magad, hogy valamiért szükséged van az egyik mögöttes böngészőeseményre, `nativeEvent` attribútummal egyszerűen hozzáférhetsz ahhoz. A szintetikus események különböznek, és nem közvetlenül képezik le a natív böngésző eseményeket. Például az `onMouseLeave`-ben az `event.nativeEvent` a `mouseout` eseményre fog mutatni. A pontos leképezés nem része a nyilvános API-nek, és bármikor megváltozhat. Minden `SyntheticEvent` objektum a következő attribútumokkal rendelkezik:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Megjegyzés:
>
> A v0.14-től kezdve `false` érték visszaadása egy eseménykezelőben nem állítja meg az esemény terjedését. Ehelyett manuálisan kell, hogy meghívd vagy az `e.stopPropagation()`-t, vagy az `e.preventDefault`-ot, attól függően melyik a helyes a te esetedben.

### Események összegyűjtése {#event-pooling}

A `SyntheticEvent` egy közös készletben van. Ez azt jelenti, hogy a `SyntheticEvent` objektum újrafelhasználható és minden tulajdonság ki lesz nullázva az esemény callbackjének meghívása után.
Ez a teljesítmény növelése érdekében történik.
Így az eseményhez nem férhetsz aszinkron módon.

```javascript
function onClick(event) {
  console.log(event); // => kinullázott objektum.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Nem fog működni. A this.state.clickEvent csak null értékeket fog tartalmazni.
  this.setState({clickEvent: event});

  // Az esemény értékeket még így is ki tudod exportálni.
  this.setState({eventType: event.type});
}
```

> Megjegyzés:
>
> Ha szeretnél az események tulajdonságaihoz aszinkron módon hozzáférni, meg kell hogy hívd az `event.persist()` metódust az eseményen, ami eltávolítja a szintetikus eseményt a medencéből és lehetővé teszi az eseményre mutató hivatkozások megtartását felhasználói kóddal.

## Támogatott események {#supported-events}

A React normalizálja az eseményeket annak érdekében, hogy a tulajdonságaik egységesek legyenek böngészőtől függetlenül.

Az alábbi eseménykezelők egy esemény által lettek elindítva a "bubbling" fázisban. Egy eseménykezelő regisztrálásához a "capture" fázisban add hozzá a `Capture` szót az esemény nevéhez; például az `onClick` helyett használd az `onClickCapture`-t kattintási események kezeléséhez a capture fázisban.

- [Áttekintés {#overview}](#áttekintés-overview)
  - [Események összegyűjtése {#event-pooling}](#események-összegyűjtése-event-pooling)
- [Támogatott események {#supported-events}](#támogatott-események-supported-events)
- [Referencia {#reference}](#referencia-reference)
  - [Vágólapesemények {#clipboard-events}](#vágólapesemények-clipboard-events)
  - [Kompozíció-események {#composition-events}](#kompozíció-események-composition-events)
  - [Billentyűzet-események {#keyboard-events}](#billentyűzet-események-keyboard-events)
  - [Fókuszálás-események {#focus-events}](#fókuszálás-események-focus-events)
  - [Űrlapesemények {#form-events}](#űrlapesemények-form-events)
  - [Általános események {#generic-events}](#általános-események-generic-events)
  - [Egéresemények {#mouse-events}](#egéresemények-mouse-events)
  - [Mutatóesemények {#pointer-events}](#mutatóesemények-pointer-events)
  - [Kiválasztás-események {#selection-events}](#kiválasztás-események-selection-events)
  - [Érintőesemények {#touch-events}](#érintőesemények-touch-events)
  - [Felhasználói felület eseményei {#ui-events}](#felhasználói-felület-eseményei-ui-events)
  - [Görgőesemények {#wheel-events}](#görgőesemények-wheel-events)
  - [Médiaesemények {#media-events}](#médiaesemények-media-events)
  - [Képesemények {#image-events}](#képesemények-image-events)
  - [Animáció-események {#animation-events}](#animáció-események-animation-events)
  - [Átmenet-események {#transition-events}](#átmenet-események-transition-events)
  - [Egyéb események {#other-events}](#egyéb-események-other-events)

* * *

## Referencia {#reference}

### Vágólapesemények {#clipboard-events}

Eseménynevek:

```
onCopy onCut onPaste
```

Tulajdonságok:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Kompozíció-események {#composition-events}

Eseménynevek:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Tulajdonságok:

```javascript
string data

```

* * *

### Billentyűzet-események {#keyboard-events}

Eseménynevek:

```
onKeyDown onKeyPress onKeyUp
```

Tulajdonságok:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

A `key` tulajdonság bármilyen értéket felvehet, ami szerepel a [3-as szintű DOM események specifikációjában](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Fókuszálás-események {#focus-events}

Eseménynevek:

```
onFocus onBlur
```

Ezek a fókuszálás-események minden elemen működnek a React DOM-ban, nem csak az űrlapelemeken.

Tulajdonságok:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Űrlapesemények {#form-events}

Eseménynevek:

```
onChange onInput onInvalid onReset onSubmit 
```

Még több információért az onChange eseményről, nézd meg az [Űrlapok](/docs/forms.html) fejezetet.
For more information about the onChange event, see [Forms](/docs/forms.html).

* * *

### Általános események {#generic-events}

Eseménynevek:

```
onError onLoad
```

* * *

### Egéresemények {#mouse-events}

Eseménynevek:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

Az `onMouseEnter` és `onMouseLeave` események a normális bubbling helyett abból az elemből terjednek, amiből az egér épp kilépett, afelé az elem felé, amibe belelépett, és nincs capture fázisuk.

Tulajdonságok:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Mutatóesemények {#pointer-events}

Eseménynevek:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

Az `onPointerEnter` és `onPointerLeave` események a normális bubbling helyett abból az elemből terjednek, amiből a mutató épp kilépett, afelé az elem felé, amibe belelépett, és nincs capture fázisuk.

Tulajdonságok:

A [W3 specifikációt](https://www.w3.org/TR/pointerevents/) követve, a mutatóesemények az [Egéreseményeket](#mouse-events) terjesztik ki a következő tulajdonságokkal:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Egy megjegyzés böngészők közötti támogatásról:

A mutatóesemények még nem minden böngésző által támogatottak (ennek a cikknek az írása közben a következő böngészők támogatják: Chrome, Firefox, Edge, és Internet Explorer). A React szándékosan nem használ polyfillt más böngészők támogatásához, mert egy standardhoz idomuló polyfill jelentősen növelné a `react-dom` csomagméretét.

Ha az alkalmazásod mutatóeseményeket használ, azt ajánljuk, hogy adj hozzá egy harmadik féltől származó esemény polyfillt.

* * *

### Kiválasztás-események {#selection-events}

Eseménynevek:

```
onSelect
```

* * *

### Érintőesemények {#touch-events}

Eseménynevek:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Tulajdonságok:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### Felhasználói felület eseményei {#ui-events}

Eseménynevek:

```
onScroll
```

Tulajdonságok:

```javascript
number detail
DOMAbstractView view
```

* * *

### Görgőesemények {#wheel-events}

Eseménynevek:

```
onWheel
```

Tulajdonságok:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Médiaesemények {#media-events}

Eseménynevek:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Képesemények {#image-events}

Eseménynevek:

```
onLoad onError
```

* * *

### Animáció-események {#animation-events}

Eseménynevek:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Tulajdonságok:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Átmenet-események {#transition-events}

Eseménynevek:

```
onTransitionEnd
```

Tulajdonságok:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Egyéb események {#other-events}

Eseménynevek:

```
onToggle
```
