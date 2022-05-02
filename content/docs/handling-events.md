---
id: handling-events
title: Események kezelése
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

A React elemek eseményeinek kezelése nagyon hasonló a DOM elemek eseménykezeléséhez. Viszont van néhány szintaxisbeli különbség: 

* A React események elnevezésére camelCase-t használunk kisbetűk helyett.
* A JSX-ben string helyett függvényt adunk át az eseménykezelőnek.

Például ez a HTML:

```html
<button onclick="activateLasers()">
  Lézerek aktiválása
</button>
```

kissé máshogyan néz ki Reactben:

```js{1}
<button onClick={activateLasers}>
  Lézerek aktiválása
</button>
```

<<<<<<< HEAD
Egy másik különbség, hogy Reactben `false` érték visszaadásával nem tudod megakadályozni az alapviselkedést. Határozottan meg kell hívni a `preventDefault`-ot. Egyszerű HTML-ben például egy link alapviselkedésének megváltoztatásához írhatjuk ezt:

```html
<a href="#" onclick="console.log('Rákattintottak a linkre.'); return false">
  Kattints rám
</a>
```

Reactben ez így nézne ki:
****
```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Rákattintottak a linkre.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Kattints rám
    </a>
=======
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

In React, this could instead be:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
>>>>>>> 5f3a9756e00e256735a5f52df19b403d8fdd3a9d
  );
}
```

Itt az `e` egy szintetikus esemény. A React ezeket a szintetikus eseményeket a [W3C specifikáció](https://www.w3.org/TR/DOM-Level-3-Events/) alapján definiálja, emiatt nem kell a böngészők közötti kompatibilitással törődnöd. A React események nem teljesen úgy működnek mint a natív események. Ha többen szeretnél erről megtudni, nézd meg a [`SyntheticEvent`](/docs/events.html) referenciát.

Reactben általában nem kell meghívnod az `addEventListener`-t  hogy eseménykezelőket adj hozzá egy DOM elemhez miután az létrejött. Ehelyett szimplán akkor add hozzá, amikor az elem először renderelődik.

Amikor egy komponenst [ES6 osztályként](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) definiálsz, az eseménykezelő általában egy függvény az adott osztályban. Például ez a `Toggle` komponens egy gombot renderel, ami az "ON" és "OFF" közötti kapcsolást teszi lehetővé a felhasználó számára:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Ez a kötés(binding) szükséges a `this` használatához a callbackben
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**Próbáld ki CodePenen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

Légy óvatos a `this` használatával a JSX callbackekben. A JavaScriptben az osztálymetódusok alapesetben nincsenek [hozzákötve](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) a `this`-hez. Ha elfelejtenéd hozzákötni a `this.handleClick`-et a `this`-hez és így rendeled hozzá az `onClick`-hez, a `this` `undefined` értékű lesz amikor a metódus meghívódik.

Ez nem React-specifikus viselkedés, hanem alapvetően [így működnek a függvények JavaScriptben](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Általában, ha egy metódusra a `()` nélkül hivatkozol, például `onClick={this.handleClick}`, hozzá kell kötnöd ezt a metódust a `this`-hez.

Ha a `bind` hívás zavar téged, kétféle módon is kikerülheted. Ha a kísérleti [nyilvános osztálymező szintaxist](https://babeljs.io/docs/plugins/transform-class-properties/) használod, a kötéshez osztálymezőket is használhatsz:

```js{2-6}
class LoggingButton extends React.Component {
  // Ez a szintaxis biztosítja a `this` handleClickhez kötését.
  // Vigyázat: ez *kísérleti* szintaxis.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Kattints rám
      </button>
    );
  }
}
```

Ez a szintaxis alapból be van kapcsolva [Create React App-ban](https://github.com/facebookincubator/create-react-app).

Az osztálymező szintaxis helyett [nyilas metódusokat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) is használhatsz a callbackben:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // Ez a szintaxis biztosítja a `this` handleClickhez való kötését
    return (
      <button onClick={() => this.handleClick()}>
        Kattints rám
      </button>
    );
  }
}
```

A probléma ezzel a szintaxissal az, hogy a `LoggingButton` minden egyes renderelésekor egy új callbacket hozunk létre. A legtöbb esetben ez nem gond. Viszont ha ezt a callbacket gyermek komponenseknek adjuk tovább, azok feleslegesen renderelődhetnek újra. Az efféle teljesítményproblémák elkerülése érdekében általában a konstruktoron belüli kötést vagy az osztálymező szintaxis használatát ajánljuk.

## Argumentumok átadása az eseménykezelőknek {#passing-arguments-to-event-handlers}

Egy cikluson belül gyakori, hogy egy extra paramétert is szeretnénk átadni egy eseménykezelőnek. Például ha `id` a sor azonosítója, a következők bármelyike működhet:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Sor törlése</button>
<button onClick={this.deleteRow.bind(this, id)}>Sor törlése</button>
```

A fenti két sor ekvivalens, és sorrendben [nyilas függvényeket](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) és [`Function.prototype.bind`-ot](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) használnak.

Mindkét esetben az `e` argumentum, ami a React eseményt reprezentálja, az ID után egy második paraméterként lesz átadva. A nyilas függvénnyel explicit módon adjuk át, viszont a `bind` használatával minden további argumentum automatikusan átadódik.
