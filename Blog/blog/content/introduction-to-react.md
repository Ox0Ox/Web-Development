---
slug: introduction-to-react
title: Introduction to React
description: Learn the basics of React, a powerful JavaScript library for building user interfaces, covering components, state, and props.
content: 
---

# Introduction to React
React is a popular JavaScript library for building user interfaces, particularly single-page applications where fast, interactive user experiences are essential. Below are key concepts you need to understand to get started with React:

## Components
In React, the UI is built using **components**. Components are reusable, self-contained blocks of code that define how a part of the UI should appear.

### Functional Component Example
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
Class Component Example
jsx
Copy code
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React applications are typically made up of multiple components that work together to form the UI.

## JSX
JSX stands for JavaScript XML. It allows you to write HTML elements directly within JavaScript code, making the UI more intuitive to build.

### JSX Example
```jsx
const element = <h1>Hello, world!</h1>;
```
JSX is not required to use React, but it makes the code more readable and concise.

## State and Props
State and props are the two key mechanisms for managing data in React components.

### State
State is an object that represents the dynamic parts of a component. When the state changes, the component re-renders to reflect the update.

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## Props
Props (short for properties) allow data to be passed from one component to another. Unlike state, props are immutable and set by the parent component.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}
```
## Handling Events
React handles events similarly to HTML, but with some syntax differences. Event handlers in React are passed as functions, and the events use camelCase naming conventions.

### Event Handling Example
```jsx
function Button() {
  function handleClick() {
    alert('Button clicked!');
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```
## Conditional Rendering
React components can conditionally render UI elements based on the state or props.

### Conditional Rendering Example
```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```
## Lists and Keys
In React, you can render lists of elements using the map() method, and each element should have a unique key prop to help React identify which items have changed.

### List Example
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>{number}</li>
      ))}
    </ul>
  );
}
```
## React Hooks
React introduced Hooks to manage state and side effects in functional components. The most commonly used hooks are useState and useEffect.

### useState Hook
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
### useEffect Hook
The useEffect hook allows you to perform side effects in functional components, such as data fetching or subscribing to events.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return <div>Data: {data}</div>;
}
```

## Conclusion
React simplifies the process of building interactive UIs by breaking the interface into reusable components and managing data efficiently with state and props. With the addition of hooks, React has become more powerful, allowing developers to write cleaner and more flexible code.

### Key Points:
React components are the building blocks of a React application.
JSX allows you to write HTML-like syntax in JavaScript.
State is used to manage dynamic data, while props are used to pass data between components.
Hooks like useState and useEffect provide state and lifecycle management in functional components.
