---
id: test-utils
title: Tesztelői segédeszközök
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**Importálás**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 npm-mel
```

## Áttekintés {#overview}

A `ReactTestUtils` egyszerűvé teszi a React komponensek tesztelését az általad választott tesztelői keretrendszerben. A Facebooknál a [Jest](https://facebook.github.io/jest/)-et használjuk a fájdalommentes JavaScript tesztelés érdekében. A Jest weboldalán lévő [React Tutorial](https://jestjs.io/docs/tutorial-react) segítségével megtanulhatod, hogy kezdhetsz neki a tesztelésnek.

> Megjegyzés:
>
> Mi a [React Testing Library](https://testing-library.com/react) használatát ajánljuk, ami úgy lett tervezve, hogy olyan komponenstesztek írására bátorítson, amik a végfelhasználó cselekedeit tükrözik.
>
> React 16, vagy korábbi verziók teszteléséhez az [Enzyme](https://airbnb.io/enzyme/) könyvtár segít a React Komponensek kimentéhez állításokat írni, valamit azokat manupulálni, vagy bejárni.


 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## Referencia {#reference}

### `act()` {#act}

Egy komponens állításokhoz való felkészítéshez vedd körül az azt renderelő és frissítéseket végrehajtó kódot egy  `act()` hívással. Ez közelebb viszi a tesztek futtatását ahhoz, ahogyan a React működik a böngészőben.

>Megjegyzés
>
> Ha a `react-test-renderer`-t használod, az is szolgáltat egy `act` exportot, ami hasonlóan működik.

Például, mondjuk hogy van ez a `Counter` komponensünk:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `${this.state.count} alkalommal kattintottál`;
  }
  componentDidUpdate() {
    document.title = `${this.state.count} alkalommal kattintottál`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>{this.state.count} alkalommal kattintottál</p>
        <button onClick={this.handleClick}>
          Kattints rám
        </button>
      </div>
    );
  }
}
```

Ezt így tudjuk tesztelni:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('tud egy számlálót renderelni, és frissíteni', () => {
  // Teszteld az első renderelést és a componentDidMount-ot
  act(() => {
    ReactDOM.createRoot(container).render(<Counter />);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('0 alkalommal kattintottál');
  expect(document.title).toBe('0 alkalommal kattintottál');

  // Teszteld a második renderelést, és a componentDidUpdate-t
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('1 alkalommal kattintottál');
  expect(document.title).toBe('1 alkalommal kattintottál');
});
```

- Ne feledd, hogy DOM események kiküldése csak akkor működik, ha a DOM konténer hozzá lett adva a `document`-hez. A sablonkód minimalizálásához használj egy könyvtárat, mint a [React Testing Library](https://testing-library.com/react).

- A [`receptek`](/docs/testing-recipes.html) dokumentum több részletet tartalmaz az `act()` működéséről példákkal, és annak használatáról.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Adj át egy leutánzott (mocked) komponensmodult ennek a metódusnak, hogy azt kiterjeszd hasznos metódusokkal, amik lehetővé teszik ezt úgy használni, mint egy ál-React komponenst. Szokásos renderelés helyett a komponens egy egyszerű `<div>`-vé válik (vagy más címkévé, ha a `mockTagName` meg lett adva), ami minden szolgáltatott gyermeket tartalmaz.

> Megjegyzés:
>
<<<<<<< HEAD
> A `mockComponent()` egy elavult API. Helyette a [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) használatát ajánljuk.
=======
> `mockComponent()` is a legacy API. We recommend using [`jest.mock()`](https://jestjs.io/docs/tutorial-react-native#mock-native-modules-using-jestmock) instead.
>>>>>>> 84ad3308338e2bb819f4f24fa8e9dfeeffaa970b

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

Ha az `element` egy bármilyen React elem, `true` értéket ad vissza.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

Ha az `element` egy bármilyen React elem, aminek a típusa `componentClass`, akkor `true` értéket ad vissza.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

Ha az `instance` egy DOM komponens (mint például `<div>`, vagy `<span>`), akkor `true` értéket ad vissza.

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

Ha az `instance` egy felhasználó által definiált komponens, mint például egy osztály vagy egy függvény, akkor `true` értéket ad vissza.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Ha az `instance` egy React komponens, aminek a típusa egy `componentClass`, akkor `true` értéket ad vissza.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

Bejár minden komponenst a `tree`-ben (fán) és összegyűjti az összes komponenst, ahol a `test(component)` `true`. Ez így magában nem túl hasznos, inkább primitívként, más tesztelői segédeszközökben használt.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Megtalálja minden komponens DOM elemét a renderelt fában, amik DOM komponensek, és osztálynevük megegyezik a `className`-mel.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Mint a [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass), de csak egy eredményre számít, és csak ezt az egy eredményt adja vissza, vagy egy kivételt dob, ha több egyezés is van.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Megtalálja minden komponens DOM elemét a renderelt fában, amik DOM komponensek, és címkenevük megegyezik a `tagName`-mel.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Mint a [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag), de csak egy eredményre számít, és csak ezt az egy eredményt adja vissza, vagy egy kivételt dob, ha több egyezés is van.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Megtalálja az összes komponens példányát, amik típusa megegyezik a `componentClass`-szal.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Mint a [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype), de csak egy eredményre számít, és csak ezt az egy eredményt adja vissza, vagy egy kivételt dob, ha több egyezés is van.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Egy React elemet renderel egy leválasztott DOM csomópontba, a dokumentumban. **Ez a függvény megköveteli a DOM jelenlétét.** Ez végülis ekvivalens ezzel:

```js
const domContainer = document.createElement('div');
ReactDOM.createRoot(domContainer).render(element);
```

> Megegyezés:
>
> Szükséged lesz a `window`, `window.document` és a `window.document.createElement` globális jelenlétére a `React` beimportálása **előtt**. Máskülönben a React azt fogja hinni, hogy nem fér hozzá a DOM-hoz és olyan metódusok, mint a `setState` nem fognak működni.

* * *

## Egyéb segédeszközök {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Egy esemény kiküldését szimulálja egy DOM csompóponton, az opcionális `eventData` eseménnyel kapcsolatos adattal.

A `Simulate` rendelkezik egy metódussal [minden eseményhez, amit a React megért](/docs/events.html#supported-events).

**Egy elemre kattintás**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Beviteli mező értékének megváltoztatása és az ENTER lenyomása.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'zsiráf';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Megjegyzés
>
> Minden eseménytulajdonságot szolgáltatnod kell, amit a komponensed használ (pl.: keyCode, which, stb...), mivel a React ezeket nem fogja neked létrehozni.

* * *
