---
id: composition-vs-inheritance
title: Kompozíció és öröklődés
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.

</div>

A React egy erőteljes kompozíciós modellel rendelkezik, és ajánljuk is a kompozíció használatát öröklődés helyett, a kód komponensek közötti újrafelhasználásának érdekében.

Ebben a fejezetben szemügyre veszünk néhány problémát ahol a még új React fejlesztők előszeretettel nyúlnak az örökléshez, és megmutatjuk hogyan lehet ezeket kompozícióval megoldani.

## Elszigetelés {#containment}

Néhány komponens nem ismeri a saját gyermekeit idő előtt. Ez igen gyakori olyan komponensek esetében mint a `Sidebar` vagy a `Dialog`, amik általános "dobozokat" képviselnek.

Azt ajánljuk, hogy ilyen komponensek esetében használd a speciális `children` (gyermekek) prop-ot, hogy ezen komponensek kimenetébe közvetlenül le tudd küldeni a gyermek elemeket:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Ez lehetővé teszi más komponenseknek tetszőleges számú gyermeket küldeni ezen komponenseknek, JSX-be való beágyazással:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Üdvözöljük
      </h1>
      <p className="Dialog-message">
        Köszönjük, hogy meglátogatta űrhajónkat!
      </p>
    </FancyBorder>
  );
}
```

**[Próbáld ki CodePen-en](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

Bármi ami a `<FancyBorder>` JSX címkéi között van, `children` prop-ként lesz leküldve a `FancyBorder` komponensnek. Mivel a `FancyBorder` egy `<div>`-ben rendereli a `{props.children}`-t, a legküldött elem meg fog jelenni a végső kimenetben.

Ha nem is gyakran, de néha szükséged lehet több "lyukra" is egy komponensben. Ilyen esetekben előrukkolhatsz egy saját megoldással a `children` helyett:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

A React elemek mint a `<Contacts />` és a `<Chat />` csak objektumok, szóval le tudod őket küldeni prop-ként, mint bármilyen más adatot. Ez a megközelítés ismerős lehet számodra más könyvtárakból "slot" (rés)-ként, de a React esetében nincs semmilyen megkötés, hogy mit küldesz le prop-ként.

## Specializáció {#specialization}

Némely esetben úgy tekintünk komponensekre, mint más komponensek "speciális esetére". Például mondhatjuk, hogy a `WelcomeDialog` a `Dialog` egy speciális esete.

A React-ben ez is kompozícióval érhető el, ahol egy "specifikusabb" komponens egy "általánosabb" komponenst renderel, amiket prop-okkal konfigurál:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Üdvözöljük"
      message="Köszönjük, hogy meglátogatta űrhajónkat!" />
  );
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

A kompozíció ugyanolyan jól működik osztályként definiált komponensek esetében is:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Kutató Program"
              message="Hogy hívjunk?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Írj fel engem!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Üdv a fedélzeten, ${this.state.login}!`);
  }
}
```

[**Próbáld ki CodePen-en**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## És mi a helyzet az örökléssel? {#so-what-about-inheritance}

A Facebook-nál a React-et több ezernyi komponensben használjuk, és egyetlen esetet sem találtunk, ahol komponens öröklő hierarchia készítését ajánlanánk.

A prop-ok és a kompozíció minden szabadságot megadnak ahhoz, hogy egy biztonságos és határozott módon tudd kifejezni a komponensed kinézetét és viselkedését. Emlékezz, hogy a komponensek tetszőleges számú prop-ot fogadhatnak, beleértve primitív értékeket, React elemeket és függvényeket.

Ha újra szeretnél használni egy nem felhasználói felület specifikus tulajdonságot komponensek között, akkor ajánljuk hogy azt szeparáld ki egy saját JavaScript modulba. A komponensek ezt importálni és használni tudják bármi féle öröklő kiterjesztés nélkül, legyen az függvény, objektum, vagy egy osztály.
