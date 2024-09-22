interface Blogtype{
    slug: string
    content: string
    title: string
    description: string
    imageurl? : string
}

const sampleBlogs: Blogtype[] = [
    {
      slug: 'introduction-to-react',
      title: 'Introduction to React',
      description: 'Learn the basics of React, a popular JavaScript library for building user interfaces.',
      content: `## What is React?  
      React is a JavaScript library for building user interfaces, particularly for single-page applications. It allows developers to create large web applications that can change data, without reloading the page.`,
    },
    {
      slug: 'advanced-javascript',
      title: 'Advanced JavaScript',
      description: 'Dive deeper into JavaScript with this guide covering advanced topics like closures and promises.',
      content: `## Understanding Closures  
      Closures are an important concept in JavaScript. A closure gives you access to an outer function's scope from an inner function. Closures are created every time a function is created, at function creation time.`,
    },
    {
      slug: 'tailwind-css-guide',
      title: 'Tailwind CSS Guide',
      description: 'A complete guide to using Tailwind CSS, a utility-first CSS framework for rapidly building custom designs.',
      content: `## Why Tailwind CSS?  
      Tailwind CSS provides low-level utility classes that let you build completely custom designs without ever leaving your HTML. It’s a highly customizable, utility-first framework that makes styling your HTML easier and faster.`,
    },
    {
      slug: 'understanding-async-await',
      title: 'Understanding Async/Await in JavaScript',
      description: 'Master asynchronous programming in JavaScript with this introduction to async/await.',
      content: `## Async/Await Explained  
      Async/await is syntactic sugar built on top of promises. It allows you to write asynchronous code in a synchronous style, improving code readability and maintainability.`,
    },
    {
      slug: 'mastering-git',
      title: 'Mastering Git',
      description: 'A comprehensive guide to version control using Git, the most widely used version control system.',
      content: `## Why Git?  
      Git is a distributed version control system that allows multiple people to work on a project, manage code versions, and collaborate efficiently.`,
    },
    {
      slug: 'css-grid-vs-flexbox',
      title: 'CSS Grid vs Flexbox',
      description: 'Understand the differences between CSS Grid and Flexbox, and when to use each for layout design.',
      content: `## CSS Grid  
      CSS Grid is a powerful 2D layout system that allows you to design web pages with both rows and columns, providing greater flexibility in creating complex layouts.`,
    },
    {
      slug: 'building-rest-apis',
      title: 'Building REST APIs with Node.js',
      description: 'Learn how to build robust RESTful APIs using Node.js and Express, following best practices.',
      content: `## What is a REST API?  
      A REST API (Representational State Transfer) is a set of rules that developers follow when creating APIs, allowing different systems to communicate over HTTP.`,
    },
    {
      slug: 'the-evolution-of-javascript',
      title: 'The Evolution of JavaScript',
      description: 'Explore the history and evolution of JavaScript, from its humble beginnings to the modern ES6+ era.',
      content: `## JavaScript: Then and Now  
      JavaScript has come a long way since its creation in 1995. From simple scripting tasks to building complex applications, JavaScript's evolution has been remarkable.`,
    }
]

export default sampleBlogs
