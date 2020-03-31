---
id: test-renderer
title: Tesztrenderelő
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**Importálás**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 npm-mel
```

## Áttekintés {#overview}

Ez a csomag egy React renderelőt nyújt, ami React komponensek, tiszta JavaScript objektumokként való renderelését teszi lehetővé, a DOM és natív mobilkörnyezetek nélkül.

Alapjában véve, ez a csomag a platform nézethierarchiájáról (ami hasonló a DOM fához) való pillanatképek készítését teszi egyszerűbbé, amiket egy React DOM, vagy React Native komponens renderel böngésző, vagy [jsdom](https://github.com/tmpvar/jsdom) használata nélkül.

Példa:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

Használhatod a Jest pillanatkép-tesztelő funkcióját a JSON fa automatikus fájlba való kimentéséhez, és hogy le tudd ellenőrizni, hogy a tesztjeid megváltoztak-e: [Itt tanulhatsz róla többet](https://jestjs.io/docs/en/snapshot-testing).

A kimenetet be is tudod járni, hogy konkrét csomópontokhoz tudj állításokat írni.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Helló</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Al</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Al']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer példány {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Referencia {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

Egy `TestRenderer` példányt készít az átadott React elemmel. Nem a valós DOM-ot használja, de így is kirendereli a teljes komponensfát a memóriába, hogy állításokat tudj róla írni. Egy [TestRenderer példányt](#testrenderer-instance) ad vissza.

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

Hasonló a [`react-dom/test-utils` csomag `act()` segédmetódusához](/docs/test-utils.html#act), a `TestRenderer.act` előkészít egy komponenst az állítások írásához. Használd az `act()` ezen verzióját a `TestRenderer.create` és `testRenderer.update` hívások becsomagolásához.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // A tesztelendő komponens

// rendereld a komponenst
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// írj állításokat a gyökérhez
expect(root.toJSON()).toMatchSnapshot();

// frissítsd néhány eltérő proppal
act(() => {
  root.update(<App value={2}/>);
})

// írj állításokat a gyökérhez
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Egy, a renderelt fát képviselő objektumot ad vissza. Ez a fa csak platformspecifikus csomópontokat és azok propjait tartalmazza, mint a `<div>`, vagy `<View>`, a felhasználó által írt komponenseket viszont nem. Ez jól jön [pillanatkép-teszteléskor](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest).

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Egy, a renderelt fát képviselő objektumot ad vissza. A reprezentáció részletesebb, mint amit a `toJSON()` ad vissza, és a felhasználó által írt komponenseket is tartalmazza. Valószínűleg erre a metódusra nem lesz szükséged, kivéve ha a saját állítási könyvtáradat írod a tesztrenderelőre építve.

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Újrarendereli a memóriában lévő fát egy új gyökérelemmel. Ez egy React frissítést szimulál a gyökéren. Ha az új elemnek ugyanaz a típusa és kulcsa mint az előzőnek, a fa frissítve lesz; máskülönben egy új fa lesz létrehozva.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```
Leválaszt egy memóriában lévő fát, a megfelelő életciklus-események meghívásával.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Ha elérhető, egy, a gyökérelemhez tartózó példányt ad vissza. Ha a gyökérelem egy függvénykomponens, ez nem fog működni, mivel a függvényeknek nincsenek példányaik.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

A gyökér "tesztpéldány" objektumát adja vissza, ami hasznos a fában lévő specifikus csomópontokhoz való állítások írásához. Mélyebben lévő "tesztpéldányok" megtalálásához is használhatod.

### `testInstance.find()` {#testinstancefind}
```javascript
testInstance.find(test)
```

Megtalálja azt az egyetlen leszármazott tesztpéldányt, ami esetében a `test(testInstance)` `true` értéket ad vissza. Egy hibát dob, ha a `test(testInstance)` nem csak egy tesztpéldány esetén ad vissza `true` értéket.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Megtalálja azt az egyetlen leszármazott tesztpéldányt, aminek a típusa megegyezik a megadott `type`-pal. Egy hibát dob, ha nem csak egy tesztpéldány létezik a megadott `type` típussal.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Megtalálja azt az egyetlen leszármazott tesztpéldányt, aminek a propjai megegyeznek a megadott `props`-szal. Egy hibát dob, ha nem csak egy tesztpéldány létezik a megadott `props` propokkal.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

Megtalálja az összes tesztpéldányt, aminél a `test(testInstance)` `true` értéket ad vissza.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Megtalálja az összes tesztpéldányt, ahol a típus megegyezik a megadott `type`-val.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Megtalálja az összes tesztpéldányt, ahol a propok megegyeznek a megadott `props`-szal.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

Ennek a tesztpéldánynak megfelelő komponenspéldány. Csak osztálykomponenseknél elérhető, mivel függvénykomponenseknek nincsenek példányai. Az adott komponens `this` értékével egyezik meg.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

Ennek a tesztpéldánynak megfelelő komponenstípus. Például, a `<Button/>` komponens típusa `Button`.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

Ennek a tesztpéldánynak megfelelő propok. Például, a `<Button size="small" />` propjai `{size: 'small'}`.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

Ennek a tesztpéldánynak a szülő tesztpéldánya.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

Ennek a tesztpéldánynak a gyermek tesztpéldányai.

## Ötletek {#ideas}

Opcióként átadhatod a `createNodeMock` függvényt a `TestRenderer.create`-nek, ami lehetőséget ad egyedi, hamis refek használatához.
A `createNodeMock` a jelenlegi elemet fogadja, és egy hamis refobjektumot kell, hogy visszaadjon.
Ez hasznos, amikor egy reftől függő komponenst tesztelsz.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // készíts egy hamis focus függvényt
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
