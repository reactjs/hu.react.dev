---
id: lifting-state-up
title: Állapot felemelése
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Gyakran több komponensnek kell ugyanazon adat változását tükrözze. Ebben az esetben a megosztott állapot legközelebbi közös ősbe való felemelését ajánljuk. Lássuk, hogy hogyan is működik ez a gyakorlatban.

Ebben a fejezetben egy hőmérséklet-kalkulátort fogunk készíteni, ami azt számolja ki, hogy a víz forr-e egy adott hőmérsékleten.

Kezdjük egy `BoilingVerdict` komponenssel. Ez egy `celsius` prop-ot fogad, és kiírja, hogy ez elég-e a víz forrásához:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>A víz forrna.</p>;
  }
  return <p>A víz nem forrna.</p>;
}
```

A következőben egy `Calculator` komponenst készítünk. Ez egy `<input>`-ot renderel ami lehetővé teszi a hőmérséklet bevitelét és annak értékét a `this.state.temperature`-ban tárolja.

Továbbá rendereli a `BoilingVerdict`-et is a jelenlegi bevitt értékkel.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Adja meg a hőmérsékletet Celsius egységben:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## Második input hozzáadása {#adding-a-second-input}

A legújabb követelményünk a Celsius input mellett egy Fahrenheit beviteli mező, és hogy ezek szinkronban legyenek.

Kezdhetjük egy `TemperatureInput` komponens kivonásával a `Calculator`-ból. Hozzáadunk egy `scale` prop-ot ami a `"c"` vagy `"f"` értékeket veheti fel:

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Adja meg a hőmérsékletet {scaleNames[scale]} egységben:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Így most meg tudjuk változtatni a `Calculator` komponenst, hogy az két külön hőmérséklet inputot rendereljen:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Most már két beviteli mezőnk van, de ha az egyikbe beírod a hőmérsékletet, a másik nem frissül. Ez ellentmond a követelményünknek: az értékek legyenek szinkronban.

Valamint a `BoilingVerdict`-et sem tudjuk megjeleníteni a `Calculator`-ból. A `Calculator` nem ismeri a jelenlegi hőmérsékletet, mert az el van rejtve a `TemperatureInput`-ban.

## Konvertáló függvények írása {#writing-conversion-functions}

Először írjunk két függvényt ami a Celsius-t konvertálja Fahrenheit-té és vissza:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Ez a két függvény számokat konvertál. Írunk egy harmadik függvényt, ami vesz egy `temperature` sztringet és egy konvertáló függvényt argumentumként, és egy sztringet ad vissza. Ezt arra használjuk majd, hogy az egyik input értékét a másik értékének alapján ki tudjuk számolni.

Érvénytelen `temperature` esetében a függvény egy üres sztringet ad vissza, valamint az értéket három tizedesjegyre kerekíti:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

A `tryConvert('abc', toCelsius)` például egy üres sztringet ad vissza, a `tryConvert('10.22', toFahrenheit)` pedig `'50.396'`-t.

## Állapot felemelése {#lifting-state-up}

Jelenleg mindkét `TemperatureInput` komponens egymástól függetlenül tárolja a saját helyi állapotát:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

Mi azonban azt szeretnénk, ha a két input szinkronban lenne egymással. Ha frissítjük a Celsius inputot, a Fahrenheit-nek tükröznie kell a konvertált hőmérsékletet, és oda-vissza.

A Reactben az állapot megosztása azon komponensek között, amelyek ezt igénylik, úgy történik, hogy az állapotot azok legközelebbi közös ősébe mozgatjuk. Ezt hívjuk az "állapot felemelésének". A `TemperatureInput` helyi állapotát eltávolítjuk és a `Calculator`-ba költöztetjük azt.

Ha a `Calculator` birtokolja a megosztott állapotot, ezzel a jelenlegi hőmérséklet "igazságának forrásává" válik mindkét input számára. Mindkét inputot utasítani tudja, hogy olyan értéket vegyenek fel, ami konzisztens a másikkal. Mivel mindkét `TemperatureInput` komponens prop-jai ugyanabból a szülő `Calculator` komponensből jönnek, a két input így mindig szinkronban lesz.

Lássuk lépésről-lépésre, hogyan is működik ez.

Először is, cseréljük le a `this.state.temperature`-t `this.props.temperature`-ra a `TemperatureInput` komponensben. Átmenetileg tegyük fel, hogy a `this.props.temperature` létezik, bár később le kell azt küldjük a `Calculator`-ból:

```js{3}
  render() {
    // Előtte: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Azt tudjuk, hogy a [prop-ok csak olvashatóak](/docs/components-and-props.html#props-are-read-only). Mikor a `temperature` a helyi állapotban volt, a `TemperatureInput` csak egyszerűen meg tudta hívni a `this.setState()`-t annak megváltoztatásához. Azzal hogy a `temperature` most prop-ként jön a szülő komponensből, a `TemperatureInput` elvesztette az irányítást felette.

A Reactben ezt általában úgy oldjuk meg, hogy egy komponenst "kontrollálttá" teszünk. Ugyanúgy ahogy a DOM `<input>` fogad egy `value` és egy `onChange` prop-ot, az egyedi `TemperatureInput` is fogadhat egy `temperature` és egy `onTemperatureChange` prop-ot annak szülő komponensétől, a `Calculator`-tól.

Most, amikor a `TemperatureInput` frissíteni akarja annak hőmérsékletét, a `this.props.onTemperatureChange`-t fogja meghívni:

```js{3}
  handleChange(e) {
    // Előtte: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Megjegyzés:
>
>A `temperature` és `onTemperatureChange` prop-oknak nincs különösebb jelentésük egyedi komponensekben. Bárminek hívhattuk volna őket, például `value` és `onChange`, ami egy gyakori szokás.

Az `onTemperatureChange` prop a `temperature` prop-pal együtt a szülő `Calculator` komponens által lesz szolgáltatva. Ez fogja kezelni a változást annak saját helyi állapotát változtatva, ezzel újrarenderelve mindkét inputot az új értékekkel. Nemsokára rátérünk a `Calculator` új implementációjára is.

Mielőtt belemerülnénk a `Calculator` változtatásaiba, vegyük át a `TemperatureInput` komponensen eszközölt változtatásainkat. Eltávolítottuk annak helyi állapotát és a `this.state.temperature` olvasása helyett most a `this.props.temperature`-t olvassuk. A `this.setState()` meghívása helyett ha változást akarunk eszközölni, most a `this.props.onTemperatureChange()` metódust hívjuk meg, amit a `Calculator` szolgáltat majd:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Adja meg a hőmérsékletet {scaleNames[scale]} egységben:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Most pedig forduljunk a `Calculator` komponens felé.

A jelenlegi inputot a `temperature` és `scale` helyi állapotban fogjuk tárolni. Ez a beviteli mezőkből "felemelt" állapot és ez fog az "igazság forrásaként" szolgálni mindkettő számára. Ez az összes adat minimális reprezentációja, amit ismernünk kell ahhoz, hogy mindkét inputot renderelni tudjuk.

Például ha 37-et írunk be a Celsius beviteli mezőbe, a `Calculator` komponens állapota így fog kinézni:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Ha később a Fahrenheit mezőbe írunk 212-t, a `Calculator` állapota így fog kinézni:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Eltárolhattuk volna mindkét input értékét is, de ez valószínűleg felesleges. Elég, ha csak a legutoljára változott input értéket és annak mértékegységét tároljuk. Ezután a jelenlegi `temperature` és `scale` értékekből egyszerűen ki tudjuk következtetni a másik input értékét is.

Az inputok szinkronizálva lesznek, mivel azok értékei ugyanabból az állapotból vannak kalkulálva:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

Így, ha most bármelyik inputot is szerkesztjük, a `this.state.temperature` és a `this.state.scale` frissülni fog a `Calculator`-ban. Az egyik input úgy kapja meg az értéket, ahogy az el van tárolva, szóval bármilyen felhasználói input meg van őrizve, míg a másik input mindig ez alapján lesz újrakalkulálva.

Vegyük át mi történik, mikor egy inputot szerkesztesz:

* A React meghívja a DOM `<input>`-on `onChange`-ként definiált függvényt. A mi esetünkben ez a `handleChange` metódus a `TemperatureInput` komponensben.
* A `handleChange` metódus a `TemperatureInput` komponensben meghívja a `this.props.onTemperatureChange()`-t a kívánt új értékkel. Ennek prop-jait, az `onTemperatureChange`-t beleértve, a `Calculator` szülőkomponens szolgáltatja.
* Amikor korábban renderelt, a `Calculator` meghatározta, hogy a Celsius `TemperatureInput` `onTemperatureChange` metódusa a `Calculator` `handleCelsiusChange` metódusa legyen, a Fahrenheit `TemperatureInpiut` `onTemperatureChange` metódusa pedig a `Calculator` `handleFahrenheitChange` metódus. Szóval ezen két `Calculator` metódusok bármelyike meg lesz hívva attól függően, hogy melyik inputot szerkesztjük.
* Ezekben a metódusokban, a `Calculator` komponens megkéri a Reactet, hogy renderelje magát újra a `this.setState()` meghívásával az új beviteli értékkel és az utoljára szerkesztett input mértékegységével.
* A React meghívja a `Calculator` komponens `render` metódusát, hogy megtudja hogyan is nézzen ki a kezelőfelület. Mindkét input értéke újra lesz számolva a jelenlegi hőmérséklet és az aktív mértékegység alapján. Itt történik a hőmérséklet konvertálása.
* A React meghívja az egyéni `TemperatureInput` komponensek `render` metódusait azok új prop-jaival, amiket a `Calculator` határozott meg. Ezáltal megtudja, hogy hogyan is nézzen ki a kezelőfelület.
* A React meghívja a `BoilingVerdict` komponens `render` metódusát a Celsiusban megadott hőmérséklet prop-pal.
* A React DOM frissíti a DOM-ot a hőmérséklet vízforralásról szóló ítéletével és hogy az egyezzen a kívánt inputok értékeivel. Az újonnan szerkesztett input a jelenlegi értékét kapja, míg a másik input a konvertálás utáni hőmérsékleti értéket.

Minden frissítés ugyanezeken a lépéseken megy keresztül, így az inputok szinkronban maradnak.

## Megtanult dolgok {#lessons-learned}

Egy React alkalmazásban minden változó adatnak egy "igaz forrása" kell, hogy legyen. Általában az állapot először ahhoz a komponenshez lesz hozzáadva, aminek arra szüksége van a rendereléshez. Ezután ha egy másik komponensnek is szüksége van erre, az állapotot felemelheted a legközelebbi közös ősbe. Ahelyett, hogy állapotokat próbálnál szinkronban tartani, támaszkodj [felülről-lefelé irányuló adatfolyamokra](/docs/state-and-lifecycle.html#the-data-flows-down).

Az állapot felemelése több "sablon kód" írását eredményezi, mint a kétirányú összekötő megközelítések, de egy előnyként felhozható, hogy kevesebb munkát igényel a hibák izolálása. Mivel bármelyik állapot valamilyen komponensben "él" és csakis ez a komponens tudja azt megváltoztatni, a hibák sokkal kisebb felületen jelentkeznek. Továbbá bármilyen egyéni logikát implementálhatsz bizonyos felhasználói input elutasítására vagy transzformálására.

Ha valami prop-ból és állapotból is eredeztethető, akkor annak valószínűleg nem az állapotban van a helye. Például ahelyett hogy mind a `celsiusValue`-t és `fahrenheitValue`-t is eltárolnánk, elég ha csak a legutoljára szerkesztett `temperature` és `scale` értékeket tároljuk. A másik input értéke mindig kiszámítható ezekből a `render()`metódusban. Ez lehetővé teszi számunkra a másik mező kiürítését vagy értékének a kerekítését a felhasználói input pontosságának elvesztése nélkül.

<<<<<<< HEAD
Ha valami hibát észlelsz a kezelőfelületben, használhatod a [React Fejlesztői Eszközöket](https://github.com/facebook/react/tree/master/packages/react-devtools) a prop-ok vizsgálatához, valamint egészen addig mozoghatsz felfelé a komponensfában, amíg meg nem találod az állapot frissítéséért felelős komponenst. Ez elvezethet a hibák forrásához:
=======
When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">
>>>>>>> a88b1e1331126287ccf03f2f4ec25ec38513b911

<img src="../images/docs/react-devtools-state.gif" alt="Állapot monitorozása a React Fejlesztői Eszközökben" max-width="100%" height="100%">
