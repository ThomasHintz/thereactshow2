import { Article, H2, P } from '@/components/Components';

export const metadata = {
  title: 'Should you use Redux with React?'
};

export default function Page() {
  return (
    <Article
      title="Should you use Redux with React?"
      datetime="2020-05-05"
      datetitle="May 5th, 2020"
      author="Thomas Hintz"
    >
      <P>
        For years it was very common to see Redux used on React projects to manage application state but now it is less common to see new React projects utilizing Redux. What has changed? And does that change make sense?
      </P>
      <P>
        Large front-end React applications usually have a lot of state to store and manage. This is usually divided into two types of state: domain specific state and component specific state. Domain specific state is state that relates to your application domain, like say an array of todo&apos;s in a todo list. Whereas component specific state is state that is needed for the functioning of an individual component or group of components, like storing what the user has entered in a text input or whether a form is valid or not.
      </P>
      <P>
        React has always been good at managing state specific to a component but if state was application wide, like domain state often is, or if component state touches a large hierarchy of components, like say a theme, React was originally very unwieldy. This is where libraries like Redux became not just useful but often necessary. Redux allowed you to share state across components in a composable yet convenient way. Redux has other benefits as well but based on its real world usage in most React projects it was primarily used to make up for state management deficiencies in React. This, however, is no longer necessary.
      </P>
      <H2>What has changed?</H2>
      <P>
        In the intervening years React has introduced it&apos;s own solution to cross-cutting state: contexts. They&apos;ve also introduced Redux like APIs, including reducers. In fact, much of Redux can now be replicated purely in React with just a few lines of supporting library code. React has also improved its lifecycle hooks to make working with state easier. So now using Redux to improve cross-cutting state management is no longer necessary since React can handle that itself.
      </P>
      <P>
        This isn&apos;t the end of the story, however. From a technical standpoint Redux can be used in a modular, contained fashion but in the real world this rarely happened because it took more discipline and boilerplate and many large React/Redux projects ended up with components being tightly coupled to the larger Redux state tree. This made it very difficult to add features or track down bugs once the app grew large, especially with multiple contributors.
      </P>
      <P>
        So not only did Redux usage lead to unmaintainable code but it was, in the relevant ways, replaced by React itself. React now can be used to create unmaintainable code in the same way Redux was but in practice it seems to be less common because it integrates more tightly. In Redux projects oftentimes all of the state would in the Redux tree which made it really easy for any component anywhere to access or modify the state which creates a big bowl of spaghetti code. Whereas in React, contexts are generally only consumed when needed which tends to cause the components that really shouldn&apos;t be using global state to keep their state more contained. This makes the code easier to work with.
      </P>
      <H2>No more Redux</H2>
      <P>
        So from a technical standpoint Redux is no longer needed for what most people used it for and projects that don&apos;t use it often end up with higher quality code. React can be used in a similar way to Redux now which does mean that it can lead to equally poor state management so maintaining good coding practices is still important. And Redux does still have its uses and can be used to write high quality code it&apos;s just that in the past it was often used poorly and for many projects is no longer necessary.
      </P>
    </Article>
  );
};
