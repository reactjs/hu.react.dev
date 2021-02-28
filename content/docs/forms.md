---
id: forms
title: Űrlapok
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

A HTML űrlap elemek kissé máshogy működnek a többi DOM elemhez képest Reactben, mert az űrlap elemek alapvetően egy saját belső állapotot tartanak nyilván. Például ez az űrlap szimpla HTML-ben egy nevet fogad be: 

```html
<form>
  <label>
    Név:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Amikor a felhasználó beküldi ezt az űrlapot, a HTML alapviselkedése miatt ez egy új oldalra fog navigálni. Ha ezt a viselkedést szeretnéd elérni Reactben, eleve működni fog. De a legtöbb esetben érdemesebb egy JavaScript függvényben lekezelni az űrlap beküldését, aminek hozzáférése van a felhasználó által bevitt adatokhoz. Ennek elérése általában az úgynevezett "kontrollált komponensek" módszerével lehetséges.

## Kontrollált komponensek {#controlled-components}

A HTML űrlap elemek, mint az `<input>`, `<textarea>` és `<select>`, általában fenntartják a saját belső állapotukat, amit felhasználói bevitel alapján változtatnak. A Reactben a módosítható állapotot általában a komponens állapotában tároljuk, és csak a [`setState()`](/docs/react-component.html#setstate) meghívásával változik.   

Ezt a kettőt összekombinálhatjuk ha a React állapotot vesszük az "egyedüli igazságforrás"-ként. Így a React komponens, ami az űrlapot rendereli, azt is kontrollálja, hogy mi történik az űrlapban a felhasználói bevitel hatására. Egy beviteli elem, aminek az értékét ily módon a React kontrollál, "kontrollált komponens"-nek hívjuk.

Például ha azt szeretnénk hogy az előző példa kiírja a konzolra a nevet az űrlap beküldésekor, létrehozhatjuk az űrlapot egy kontrollált komponensként: 

```javascript{4,10-12,21,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ezt a nevet küldték be: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Név:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Próbáld ki CodePenen**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Mivel a `value` attribútum be van állítva az elemen, a megjelenített érték mindig `this.state.value` lesz, ez teszi a React állapotot az egyéni igazságforrássá. Mivel a `handleChange` minden egyes billentyűleütéskor frissíti a React állapotot, a megjelenített érték is frissülni fog a felhasználó bevitele eredményeképpen.

Egy kontrollált komponensben minden állapotmódosításhoz hozzá kell rendelni egy eseménykezelő függvényt. Ez egyszerűvé teszi a felhasználó által bevitt adat módosítását vagy érvényesítését. Például ha szeretnénk biztosítani, hogy a nevek csupa nagybetűvel legyenek írva, így módosíthatjuk a `handleChange`-t:   

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
Egy kontrollált komponensben a bemenet értékét mindig a React állapot vezérli. Habár ez azt jelenti, hogy egy kicsivel több kódot kell írnod, de így ezt az értéket több komponensnek is át tudod adni, vagy eseménykezelőkből a kezdeti állapotba állítani.

## A textarea címke {#the-textarea-tag}

A HTML-ben a `<textarea>` tartalma a gyermeke által van definiálva:

```html
<textarea>
  Hellóka, ez itt némi szöveg egy szövegterületen
</textarea>
```

Reactben a `<textarea>` ehelyett egy `value` attribútumot használ. Így az űrlap, ami `<textarea>`-t használ, nagyon hasonló az egysoros beviteli mezőhöz:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Írj egy esszét a kedvenc DOM elemedről.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Beküldtek egy esszét: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Esszé:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Figyeld meg, hogy a `this.state.value` a konstruktorban kerül inicializálásra, így a szövegterület már az elején tartalmazni fog némi szöveget.

## A select címke {#the-select-tag}

A HTML-ben a `<select>` egy legördülő menüt hoz elő. Ez a HTML például egy ízesítésekből álló legördülő menüt tartalmaz:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Kókusz</option>
  <option value="mango">Mangó</option>
</select>
```

Figyeld meg, hogy a Kókusz opció van kiválasztva alapból, mivel ez tartalmazza a `selected` attribútumot. A React a `selected` attribútum helyett a `value` attribútumot használja a gyökér `select` címkén. Ez így egyszerűbb egy kontrollált komponensben, mivel így csak egy helyen kell módosítani az értéket. Például:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Válaszd ki a kedvenc ízesítésedet:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Kókusz</option>
            <option value="mango">Mangó</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**Próbáld ki CodePenen**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

Alapvetően ezáltal mind az `<input type="text">`, `<textarea>` és `<select>` is hasonlóan működik - mindegyiknek van egy `value` attribútuma, amit használhatsz egy kontrollált komponens létrehozásához.

> Megjegyzés
>
> Ha egy tömböt rendelsz a `value` attribútumhoz, akár több opciót is kiválaszthatsz egyszerre a `select` címkében:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## A fájlbeviteli címke {#the-file-input-tag}

A HTML-ben az `<input type="file">` segítségével a felhasználó kiválaszthat egy vagy több fájlt a saját gépéről a szerverre feltöltéshez vagy a JavaScript [Fájl API-val](https://developer.mozilla.org/hu/docs/Web/API/File/Fajlok_hasznalata_webes_alkalmazasokban) való manipuláláshoz.

```html
<input type="file" />
```

Mivel ez csak olvasható értékkel rendelkezik, ez egy **kontrollálatlan** komponens.  Erről a többi kontrollálatlan komponenssel együtt olvashatsz [később a dokumentációban](/docs/uncontrolled-components.html#the-file-input-tag).

## Több bemenet kezelése {#handling-multiple-inputs}

Ha több kontrollált `input` elemet is kezelned kell, hozzáadhatsz egy `name` attribútumot az egyes elemekhez, így az eseménykezelő függvény az `event.target.name` alapján tudja eldönteni, hogy mit csináljon. 

Például:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**Próbáld ki CodePenen**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Figyeld meg, hogy hogyan használtuk az ES6 [kiszámított mező név](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) szintaxist, hogy frissíteni tudjuk az állapotkulcsot, ami a megadott bemenet nevével egyezik meg:

```js{2}
this.setState({
  [name]: value
});
```

Ez ekvivalens a következő ES5 kóddal:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Valamint, mivel a `setState()` automatikusan [összefésüli a részleges állapotot a jelenlegi állapottal](/docs/state-and-lifecycle.html#state-updates-are-merged), elég csak a megváltozott állapotot átadni.

## Kontrollált bemenet null értéke {#controlled-input-null-value}

A `value` megadása egy [kontrollált komponensen](/docs/forms.html#controlled-components) megakadályozza a felhasználót abban, hogy az engedélyünk nélkül változtassa meg a beviteli adatokat. Ha megadtál egy `value`-t, de a bemenet mégis szerkeszthető, valószínűleg véletlenül `undefined` vagy `null`-ra állítottad a `value`-t.

A következő kódrészlet ezt demonstrálja. (A bemenet eleinte nem szerkeszthető, de egy rövid késleltetés után szerkeszthetővé válik.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Kontrollált komponens alternatívák {#alternatives-to-controlled-components}

Néha nehézkes lehet kontrollált komponenseket használni, mivel minden lehetséges adatváltoztatási módhoz kell egy eseménykezelőt írnod és hozzá kell kötni az összes belső állapotot a React komponens állapotához. Ez különösen bosszantó lehet, amikor meglévő kódot kell átírni Reactbe, vagy amikor egy nem React-alapú könyvtárat kell egy React applikációba integrálni. Ezekben az esetekben érdekes lehet a [kontrollálatlan komponensek](/docs/uncontrolled-components.html) használata, az űrlap bementek egy alternatív implementációs módszere.

## Teljes értékű megoldás {#fully-fledged-solutions}

Ha egy meglévő teljes értékű megoldást keresel, amiben már benne van a validáció, a meglátogatott mezők nyomon követése és az űrlap beküldésének kezelése, a [Formik](https://jaredpalmer.com/formik) az egyik legnépszerűbb választás. Ugyanakkor ez is hasonló alapelvekre épül, mint a kontrollált komponensek vagy az állapotmenedzsment - így ne felejtsd el ezeket sem megtanulni.
