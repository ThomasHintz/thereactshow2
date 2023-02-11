import Image from 'next/image'

import { Article, H2, P, A } from '@/components/Components';

import renderTreeFlow from '@/images/render-tree-flow.gif';
import renderTreeMemo from '@/images/render-tree-memo.gif';

export default function Page() {
  return (
    <Article
      title="How React Renders Component Trees and How To Make It Faster"
      datetime="2020-07-17"
      datetitle="July 17th, 2020"
      author="Thomas Hintz"
    >
      <P>
        What happens when you update state in a React component? Does React intelligently isolate the update to only components that need to be re-rendered? No. In fact, by default, React does not attempt to optimize re-renders at all.
      </P>
      <P>
        This means that if the state of a component changes React will re-render that component <em>and all child components</em>! Usually this is not a problem either because updates are infrequent or because your render methods or functions are cheap and fast. But as your component tree grows in size or your lists of components grow this can quickly become a major problem causing jankiness and a drop in responsiveness.
      </P>
      <H2>Background</H2>
      <P>
        Before React and similar libraries were created a large source of front-end bugs was the browser DOM being out-of-sync with your internal app state. This could easily happen when manually trying to keep the two in sync. React was designed to solve this problem and to efficiently map your internal state to the DOM. It was not designed to intelligently render a tree of components. Instead React intentionally left that process simple and unoptimized.
      </P>
      <Image
        src={renderTreeFlow}
        alt="diagram showing the render flow"
      />
      <figcaption className="mb-8">
        <i>Shows the default rendering flow of React when state is changed on the root node.</i>
      </figcaption>
      <P>
        So let's say you run into this point of unoptimization where your app is getting janky and you've discovered that React is re-rendering expensive components even when there is no reason to, what can you do about it?
      </P>
      <H2>Solution</H2>
      <P>
        The React developers are not unaware of this problem and have actually included tools to address it. The simplest tools are <A href="https://reactjs.org/docs/react-api.html#reactpurecomponent">React.PureComponent</A> and <A href="https://reactjs.org/docs/react-api.html#reactmemo">React.memo</A>. For class based components you can extend React.PureComponent and for function components you can wrap them with React.memo. In both cases what this does is memoize your components based on your props. React will only re-render the component if your props change.
      </P>
      <pre>
        <code>
          {`// Example React.PureComponent usage

export default class ExpensiveToRender extends React.PureComponent {
  ...
}
// Example React.memo usage

export default React.memo(function ExpensiveToRender(props) {
  ...
});`}
        </code>
      </pre>
      <P>
        Essentially this means that when React says "component: please render now" the component checks its cache to see if any props have changed and if they haven't changed it replies "here you go you can just use the result I calculated previously for these components". React takes that result and now the process of rendering down that part of the tree is completed without any extra work being done.
      </P>
      <Image
        src={renderTreeMemo}
        alt="diagram showing the render flow when it stops at a memoized component"
      />
      <figcaption className="mb-8">
        <i>Shows the rendering flow of React when a child is memoized (border turns blue).</i>
      </figcaption>
      <H2>Details</H2>
      <P>
        It's important to be aware of how these function though. They perform a shallow comparison of props. This works well in general but if any of your props are arrays, JS objects, or anonymous functions you can run in to cases where you expect your component to be re-rendered but it isn't. For example, if you pass an array to a component and then later add an item to that array you might expect your component to be re-rendered but it isn't. This is because React only did a shallow comparison on the array and saw that it was the same array. It doesn't scan the array contents. To get React to re-render your component when you change the contents of an array you need to instead return a new array. This is true for other non primitives, like objects. In general if you use <code>React.PureComponent</code> or <code>React.memo</code> you will be better off programming in a pure functional style.
      </P>
      <P>
        Another issue to be aware of when using <code>React.PureComponent</code> or <code>React.memo</code> is that sometimes your component will keep getting rendered even when you think that it shouldn't be; that none of the props have changed. This is similar to the previous case but in reverse. Instead of you not passing React a new object when you should have been, you pass a prop as a new object every time when you weren't planning to. This is most commonly seen when passing object literals or anonymous functions as props. An object literal gets instantiated into a new object every time it gets executed. So even if the contents of the object literal haven't changed it still creates a new object and React isn't checking to see if the contents have changed only whether it's a new object or not. So make sure to create these objects outside the render path.
      </P>
      <P>
        Why doesn't React just perform deep checks instead? Well this deep check can lead to bad performance which isn't what you want with a performance optimization!
      </P>
      <P>
        <code>React.PureComponent</code> isn't the only way to control when your class component renders: React also provides the lifecycle method <code>componentShouldUpdate</code>. With it you can explicitly tell React when to render the component. Generally though this method is discouraged and React recommends using <code>React.PureComponent</code>.
      </P>
      <P>
        In summary, if you run in to performance bottlenecks with rendering then start by using <code>React.PureComponent</code> or <code>React.memo</code> and programming in a pure style. While there are cases where they aren't the solutions they are generally a good starting point. I've written more detailed articles about when to use both <code>React.PureComponent</code> and <code>React.memo</code>.
      </P>
    </Article>
  );
};
