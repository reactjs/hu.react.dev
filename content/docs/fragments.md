---
id: fragments
title: Töredékek
permalink: docs/fragments.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React:
>
> - [`<Fragment>`](https://react.dev/reference/react/Fragment)

</div>

Egy általános minta a React-ben, hogy egy komponens több elemet ad vissza. A töredékek segítenek gyermekek listáját csoportosítani anélkül, hogy új csomópontot adnál a DOM-hoz.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

Létezik egy új [rövid szintaxis](#short-syntax) is a deklarálásukhoz.

## Motiváció {#motivation}

Komponensek esetében gyakori minta, hogy az gyermekek listájával térjen vissza. Vegyük példának ezt a React kódrészletet:

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

A `<Columns />`-nak több `<td>` elemet kell visszaadnia hogy a megjelenített HTML érvényes legyen. Ha egy szülő div-et használunk a `<Columns />` komponens `render()` metódusában, akkor az eredményül kapott HTML érvénytelen lesz.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Helló</td>
        <td>Világ</td>
      </div>
    );
  }
}
```

a következő `<Table />` kimenetet eredményezi:

```jsx
<table>
  <tr>
    <div>
      <td>Helló</td>
      <td>Világ</td>
    </div>
  </tr>
</table>
```

A töredékek ezt a problémát oldják meg.

## Használat {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Helló</td>
        <td>Világ</td>
      </React.Fragment>
    );
  }
}
```

ami a következő helyes `<Table />` kimenetet eredményezi:

```jsx
<table>
  <tr>
    <td>Helló</td>
    <td>Világ</td>
  </tr>
</table>
```

### Rövid szintaxis {#short-syntax}

Van egy új, rövidebb szintaxis, amit a töredékek deklarálásához használhatsz. Úgy néz ki, mint az üres címkék:

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Helló</td>
        <td>Világ</td>
      </>
    );
  }
}
```

Ugyanúgy használhatod a `<></>`-t, mint ahogy más elemeket is, azzal a különbséggel, hogy ez nem támogatja a kulcsokat és az attribútumokat.

### Kulcsot használó töredékek {#keyed-fragments}

A töredékek, amik a `<React.Fragment>` szintaxissal vannak deklarálva tartalmazhatnak kulcsokat. Ennek az egyik felhasználási módja egy kollekció leképezése töredékek tömbre -- például egy leíráslista létrehozására:

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 'key' nélkül a React figyelmeztetést fog dobni
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

A `key` az egyetlen olyan attribútum, amelyet át lehet adni egy `Fragment`-nek. A jövőben további attribútumok, például eseménykezelők is támogatást kaphatnak.

### Élő demó {#live-demo}

Ebben a [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000)-ben kipróbálhatod az új JSX  töredék szintaxist.
