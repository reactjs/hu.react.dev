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

Gyakran több komponens kell hogy ugyanzon adat változását tükrözze. Ebben az esetben a megosztott állapot legközelebbi közös ősbe való felemelését ajánljuk. Lássuk hogy hogyan is működik ez a gyakorlatban.

Ebben a fejezetben egy hőmérséklet kalkulátort fogunk készíteni ami azt számolja ki, hogy a víz forr-e egy adott hőmérsékleten.

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

Kezdhetjük egy `TemperatureInput` komponens kivonásával a `Calculator`-ból. Hozzáadunk egy `scale` prop-ot ami lehet `"c"` vagy `"f"`:

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

Most már két beivteli mezőnk van, de ha az egyikbe beírod a hőmérsékletet, a másik nem frissül. Ez ellentmond a követelményünknek: az értékek legyenek szinkronban.

Valamint a `BoilingVerdict`-et sem tudjuk megjeleníteni a `Calculator`-ból. A `Calculator` nem ismeri a jelenlegi hőmérsékletet mert az el van rejtve a `TemperatureInput`-ban.

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

Ez a két függvény számokat konvertál. Írunk egy harmadik függvényt, ami vesz egy `temperature` sztringet és egy konvertáló függvényt argumentumként, és egy sztringet ad vissza. Ezt arra fogjuk használni, hogy az egyik input értékét kiszámoljuk a ámsik értékének alapján.

Érvénytelen `temperature` esetében egy üres sztringet ad vissza, és az értéket három tizedesjegyre kerekíti:

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

Például a `tryConvert('abc', toCelsius)` egy üres sztringet ad vissza, és a `tryConvert('10.22', toFahrenheit)` pedig `'50.396'`-t.

## Állapot felemelése {#lifting-state-up}

Jelenleg mindkét `TemperatureInput` komponens függetlenül tárolja a saját helyi állapotát:

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

Azonban azt szeretnénk, ha a két input szinkronban lenne egymással. Ha frissítjük a Celsius inputot, a Fahrenheit-nek tükröznie kell a konvertált hőmérsékletet, és oda-vissza.

A React-ben az állapot megosztása azon komponensek között amelyek azt igénylik úgy történik, hogy az állapotot azok legközelebbi közös ősébe mozgatjuk. Ezt hívjuk a "állapot felemelésének". El fogjuk távolítani a helyi állapotot a `TemperatureInput`-ból és a `Calculator`-ba költöztetjük azt.

Ha a `Calculator` birtokolja a megosztott állapotot, ezzel a jelenlegi hőmérséklet "igazságának forrásává" válik mindkét input esetében. Mindkét inputot utasítani tudja, hogy olyan értéket vegyenek fel, ami konzisztens a másikkal. Mivel mindkét `TemperatureInput` komponens propjai ugyanabból a szülő `Calculator` komponensből jönnek, a két input így mindig szinkronban lesz.

Lássuk lépésről-lépésre hogyan is működik ez.

Előszőr is, cseréljük le a `this.state.temperature`-t `this.props.temperature`-ra a `TemperatureInput` komponensben. Átmenetileg tegyük fel, hogy a `this.props.temperature` létezik, bár később le kell azt küldjük a `Calculator`-ból:

```js{3}
  render() {
    // Előtte: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

Azt tudjuk, hogy a [prop-ok csak olvashatóak](/docs/components-and-props.html#props-are-read-only). Mikor a `temperature` a helyi állapotban volt, a `TemperatureInput` csak egyszerűen meg tudta hívni a `this.setState()`-t annak megváltoztatásához. Azzal hogy a `temperature` a szülő komponensből most prop-ként jön, a `TemperatureInput` elvesztette az irányítást felette.

A React-ben ezt általában úgy oldunk meg, hogy egy komponenst "kontrollálttá" teszünk. Ugyanúgy ahogy a DOM `<input>` fogad `value` és egy `onChange` prop-ot, az egyedi `TemperatureInput` is fogadhat egy `temperature` és egy `onTemperatureChange` prop-ot annak szülő komponensétől, a `Calculator`-tól.

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

A `onTemperatureChange` prop a `temperature` prop-pal együtt a szülő komponens `Calculator` által lesz szolgáltatva. Ez fogja kezelni a változást annak saját helyi állapotát változtatva, ezzel újrarenderelve mindkét inputot az új értékekkel. Nemsokára megnézzük a `Calculator` új implementációját is.

Mielőtt belemerülnénk a `Calculator` változtatásaiba, vegyük át a `TemperatureInput` konmponensen eszközölt változtatásainkat. Eltávolítottuk annak helyi állapotát és a `this.state.temperature` olvasása helyett most a `this.props.temperature`-t olvassuk. A `this.setState()` meghívása helyett ha változást akarunk okozni, most a `this.props.onTemperatureChange()` metódust hívjuk meg, amit a `Calculator` szolgáltat majd:

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

Most pedig forduljunk a `Calculator` komopnens felé.

A jelenlegi inputot a `temperature` és `scale` helyi állapotban fogjuk tárolni. Ez az beviteli mezőkből "felemelt" állapot és ez fog az "igazság forrásaként" szolgálni mindkettőnek. Ez az összes adat minimális reprezentációja amit ismernünk kell annak érdekében, hogy mindkét inputot renderelni tudjuk.

Például ha 37-et írunk be a Celsius beviteli mezőbe, a `Calculator` komponens állapota így fog kinézni:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Ha később a Farhernheit mezőbe írunk 212-t, a `Calculator` állapota így fog kinézni:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Eltárolhattuk volna mindkét input értékét is, de úgy néz ki hogy ez felesleges. Elég ha csak a legutoljára változott inputot tároljuk, és a mértékegységet amit képvisel. Eztuán szimplán a jelenlegi `temperature` és `scale` értékekből ki tudjuk következtetni a másik input értékét.

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

Így ha most bármelyik inputot szerkesztjük, a `this.state.temperature` és a `this.state.scale` frissülni fog a `Calculator`-ban. Az egyik input úgy kapja meg az értéket ahogy az el van tárolva, szóval bármilyen felhasználói input meg van őrizve, míg a másik input mindig ez alapján lesz újrakalkulálva.

Vegyük át mi történik mikor egy inputot szerkesztesz:

* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` has specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.

Every update goes through the same steps so the inputs stay in sync.

## Megtanult leckék {#lessons-learned}

There should be a single "source of truth" for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the [top-down data flow](/docs/state-and-lifecycle.html#the-data-flows-down).

Lifting state involves writing more "boilerplate" code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state "lives" in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably shouldn't be in the state. For example, instead of storing both `celsiusValue` and `fahrenheitValue`, we store just the last edited `temperature` and its `scale`. The value of the other input can always be calculated from them in the `render()` method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

When you see something wrong in the UI, you can use [React Developer Tools](https://github.com/facebook/react-devtools) to inspect the props and move up the tree until you find the component responsible for updating the state. This lets you trace the bugs to their source:

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">

