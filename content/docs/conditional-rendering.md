---
id: conditional-rendering
title: Feltételes renderelés
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

A React-ben olyan különböző komponenseket készíthetsz, amik különféle viselkedéseket tudnak elkülöníteni, magukba foglalni. Ezután tudsz kimondottan csak néhányat renderelni, az alkalmazás állapotától függően.

A feltételes renderelés React-ben ugyanúgy működik mint ahogy a feltételek működnek JavaScript-ben. Használj JavaScript operátorokat mint az [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) vagy a [feltételes operátor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) elemek készítéséhez, amik reprezentálják a jelenlegi állapotot, és hagyd hogy a React ennek megfelelően frissítse a felhasználói felületet.

Vedd ezt a két komponenst:

```js
function UserGreeting(props) {
  return <h1>Üdv újra!</h1>;
}

function GuestGreeting(props) {
  return <h1>Kérjük, regisztrálj.</h1>;
}
```

Készíteni fogunk egy `Greeting` komponenst, ami ezen komponensek egyikét fogja megjeleníteni attól függően, hogy a felhasználó be van-e jelentkezve:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Ez a példa különféle üdvözléseket renderel az `isLoggenIn` prop értékétől függően.

### Elem változók {#element-variables}

Használhatsz változókat elemek tárolására. Ez segít feltételesen renderelni a komponens egy részét, amíg a kimenet többi része nem változik.

Vedd ezt a két komponenst amik Kijelentkezés és Bejelentkezés gombokat képviselnek:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Bejelentkezés
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Kijelentkezés
    </button>
  );
}
```

Az alábbi példában készíteni fogunk egy `LoginControl` nevű [állapot-teljes komponenst](/docs/state-and-lifecycle.html#adding-local-state-to-a-class).

Ez vagy a `<LoginButton />`-t vagy pedig a `<LogoutButton />`-t fogja renderelni a jelenlegi állapotától függően. Valamint renderelni fogja a`<Greeting />`-et is az előző példából:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

Változók deklarálása és `if` utasítások használata teljesen rendben van egy komponens feltételes renderelése esetén, néha azonban talán szívesen használnál egy rövidebb szintaxist. Az alábbiakban elmagyarázzuk, hogy van néhány módja helyben kifejtett feltételeknek JSX-ben.

### Helyben kifejtett if logikai && operátorral {#inline-if-with-logical--operator}

<<<<<<< HEAD
Kapcsos zárójelekkel bármilyen [kifejezést JSX-be tudsz ágyazni](/docs/introducing-jsx.html#embedding-expressions-in-jsx). Ez magába foglalja a logikai `&&` operátort is. Hasznos lehet ha egy elemet feltételesen szeretnénk mutatni:
=======
You may [embed expressions in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:
>>>>>>> ee75c297574468f888574aae2d9620d64bb5b5a1

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Helló!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          {unreadMessages.length} olvasatlan üzeneted van.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Ez azért működik JavaScript-ben, mert a `true && kifejezés` mindig a `kifejezés`-re értékelődik ki, valamint a `false && kifejezés` pedig mindig `false`-ra.

Ezért ha a feltétel `true`, az elem ami `&&` operátor jobb oldalán van, meg fog jelenni a kimenetben. Ha a feltétel `false` a React figyelmen kívül hagyja az elemet.

### Helyben kifejtett if-else feltételes operátorral {#inline-if-else-with-conditional-operator}

A helyben kifejtett feltételes renderelés egy másik módja lehet a JavaScript feltételes operátor [`feltétel ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

Az alábbi példában ezt használjuk egy kis szövegrészlet feltételes renderelésére.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      A felhasználó <b>{isLoggedIn ? 'jelenleg be van ' : 'nincs be'}</b>jelentkezve.
    </div>
  );
}
```

Használható nagyobb kifejezésekhez is, bár így kevésbé nyilvánvaló mi is történik éppen:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

Ugyanúgy ahogy JavaScript-ben, te döntöd el hogy melyik stílust választod attól függően hogy te és a csapatod mit találnak olvashatóbbnak. Valamint emlékezz, ha a feltételek túl összetetté kezdenek válni, talán itt az ideje [kivonni egy komponenst](/docs/components-and-props.html#extracting-components).

### Komponens renderelésének megelőzése {#preventing-component-from-rendering}

Ritka esetekben szeretnéd ha a komponensed elrejtené magát akkor is, ha az más komponensek által renderelve lett. Ehhez egyszerűen adj vissza `null`-t a renderelés kimenetében.

Az alábbi példában a `<WarningBanner />` a `warn` prop értékétől függően van renderelve. Ha a prop értéke `false`, a komponens nem lesz renderelve:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Figyelem!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Elrejtés' : 'Mutatás'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**Próbáld ki a CodePen-en**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Ha a komponens `render` metódusában `null` értéket adunk vissza, az nem hat ki a komponens életciklus metódusainak meghívására. Például a `componentDidUpdate` ebben az esetben is meg lesz hívva.
