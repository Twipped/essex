Essex
===
A JSX template engine

## Why?

The vast majority of server side JSX tools end up turning into gigantic frameworks built against React or Svelt. What do you do if you just want to render html using JSX? No state management, no client side hydration, just plain old HTML generation.

Well there's [`template-jsx`](http://npm.im/template-jsx), but it only supports syncronous function calls, and it renders when the elements are created. What if you want to defer rendering? What if you want to perform async IO? What if you want context passing?

That's where Essex comes in. Essex components do not render anything until you pass your component tree to the `render()` function. They perform no state management, there's no hooks or eventing, and every component renders asyncronously.

**This is not React**

You cannot use React hooks with this code, you cannot use most React components with this code. I'm working on getting [Emotion](https://emotion.sh) working with it, but even that will be limited. If you're building anything other than a static site generator or a progressively enhanced backend driven website, this probably isn't the right library for you.  But if you ARE doing server-side rendering... you might find this useful.

## Setup

#### Configuring for Babel

Essex works seamlessly with `@babel/preset-react`, all you need to do is tell Babel how to find the JSX runtime.

```json
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "essex",
      },
    ],
  ]
}
```

#### Configuring for MDX

```js
import { compile } from "@mdx-js/mdx";

const __dirname = path.dirname((new URL(import.meta.url)).pathname);

const source = await fs.readFile(path.resolve(__dirname, 'markdown.mdx'));

const result = await compile(source, {
  jsxRuntime: "automatic",
  jsxImportSource: "essex"
});
```

#### Configuring for TypeScript

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "essex",
    //...
  }
}
```


## Usage

```js
import { render } from 'essex';

function Title ({ title, date }) {
  return <h1>{title}{date && <span>({date})</span>}</h1>
}

async function MyComponent () {
  const res = await fetch("http://example.com/movie.json");
  const data = await res.json();
  return (
    <div class="movie">
      <Title title={data.title} date={data.releaseDate} />
      <p>{data.description}</p>
    </div>
  )
}

const html = render(<MyComponent />);
```

## Contexts

Contexts can be created either as unique symbols only accessible with the original context, or they can be created as named properties available via `this`.

**Example 1:**

```jsx
import { createContext } from 'essex';

const MyContext = createContext('MyContext');

function App () {
  return (
    <MyContext.Provider value={{ foo: 'bar' }}>
      <div>
        <UIElement />
      </div>
    </MyContext.Provider>
  )
}

function UIElement () {
  const context = this.getContext(MyContext);
  return <em>{context.foo}</em>
}
```

```jsx
import { ContextProvider } from 'essex';

function App () {
  return (
    {/* NOTE: Some scope names are reserved for the parent Context prototype. */}
    <ContextProvider scope="foo" value="bar">
      <div>
        <UIElement />
      </div>
    </MyContext.Provider>
  )
}

function UIElement () {
  return <em>{this.foo}</em>
}
```

## Render Order

Essex element trees are rendered asyncronously, but that rendering is executed in a specific order,
linearlly by their respective layers within the heirarchy. If an element is a component, then that
component will be executed, passing in any child elements provided beneath it. None of those children
will be rendered unless they are returned by the component. After the component executes, Essex will
then render any JSX elements the component returned, in order that they were received.
If an element is just an html tag, then the children will be rendered linerally with the tag.

That's a lot to parse, so here's an example JSX tree, numbered in the order in which everything is rendered. The order is always preserved, but the functions will be executed outside of that loop. In this example,
`Number5` returns the children it receives, `Number6` returns new children, and `Number7` returns nothing.

```jsx
<Number1>
  <Number2>Header</Number2>
  <Number3 />
  <div>
    <Number4>
    <Number5>
      <Number8>1</Number8>
      <Number9>2</Number9>
      <Number10>3</Number10>
    </Number5>
  </div>
  <Number6/>
    {/* -> */}
      <Number11 />
  <Number7>
    <NeverRenders />
  </Number7>
</Number1>
```

There are some exceptions to this; for example, if two siblings both return children, but the first
sibling takes longer to process an asyncronous call, then the second sibling's children may render first.

```jsx
<Number1Slow />
  {/* -> */}
    <Number4 />
<Number2Fast />
  {/* -> */}
    <Number3 />
```

This can make working with contextual state very tricky, since a parent component may need state set
by deep descendents in its child elements. Essex provides several tools to help control the rendering
order, while still preserving output order.

### Priority Groups

The `Priority` symbol exported by essex allows for marking sibling elements for rendering ahead of or after their siblings by passing it as a prop. The default priority for all elements is 0, so you can dictate rendering order by setting it to a number higher or lower than 0.

This is useful if a component needs to alter a context state before its siblings render, but must present its output after them, or if a component needs to be first in the presentation, but needs state set by another sibling.

```jsx
import { PRIORITY } from 'essex';

function Component () {
  return (
    <>
      <RenderMeThird {...{[Priority]:1 }} />
      <RenderMeFirst {...{[Priority]:-1 }} />
      <RenderMeSecond />
    </>
  )
}

```

### Deferred Components

By default all component functions receive their `children` as unrendered JSX elements, but sometimes a component needs their children to render first. In thie case, the component can be marked for deferred rendering by setting the `Deferred` symbol on its static properties. Essex will render its children before execution, and then pass in the fully rendered html when invoking the component.

```jsx
import { DEFER } from 'essex';

function Component ({ children }) {
  // `children` will contain fully rendered html
}
Component.Deferred = true;
```

**Further documentation TBD**