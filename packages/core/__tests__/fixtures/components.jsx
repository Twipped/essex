
import { ContextProvider } from '../../src/context';

export function Span ({ children }) {
  return <span>{children}</span>;
}

export function span () {
  return <Span>Hello</Span>;
}

export function spanFragment () {
  return <Span><>Hello</></Span>;
}

export async function ContextReceiver () {
  return <Span>{this.FOO}</Span>;
}

export function ContextWrapper () {
  return (
    <ContextProvider scope="FOO" value="VALUE">
      <div>
        <ContextReceiver />
      </div>
    </ContextProvider>
  );
}

export function Throws ({ message = 'oh no!' }) {
  throw new Error(message);
}

export function DeepThrow () {
  return <Span><div><Throws /></div></Span>;
}
