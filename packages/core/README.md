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



**Further documentation TBD**