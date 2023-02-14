import { Article, H2, P, A } from '@/components/Components';

export const metadata = {
  title: 'White-labeling with React'
};

export default function Page() {
  return (
    <Article
      title="White-labeling with React"
      datetime="2020-05-18"
      datetitle="May 18th, 2020"
      author="Thomas Hintz"
    >
      <P>
        White-labeling allows you to utilize one code-base across multiple brands or &quot;skins&quot;. With React projects there are multiple ways to achieve this. The two main techniques are at compile time or at run time. The technique you use will depend on your application goals. For the Alpha Centauri Farming game we utilized compile time white-labeling but for other projects we&apos;ve used run time white-labeling. In this article we will be specifically discussing run time white-labeling in React environments.
      </P>
      <H2>Goal</H2>
      <P>
        The main goal of white-labeling is to be able to use the same code base while having interchangeable assets that can be selected at run time, like say based on the domain name of the site being served. So ideally your React code does not change at all across the different &quot;labels&quot; and the label can be set in one place and the rest of your React application will automatically utilize it.
      </P>
      <H2>Implementation</H2>
      <P>
        With React we actually have a built in mechanism that makes this really easy: React contexts. If we create a context for our labeling then all we have to do is set the label at the top of the component hierarchy and the rest of the application can just utilize the selected label. This is similar to how themeing is often done in React.
      </P>
      <P>
        To make this even easier I&apos;ve packaged up the context and its providers and consumers into an npm package: <A href="https://code.thintz.com/react-whitelabel/about/">react-whitelabel</A>.
      </P>
      <P>
        So how do we use this package to white-label our React app? Here is a basic example:
      </P>
      <pre id="yui_3_17_2_1_1676155966281_489"><code id="yui_3_17_2_1_1676155966281_488">{`// ... imports

// Setup our white labels.
// We have two labels: 'cars' and 'trucks'
const labels = {
  cars: {
    logo: '/imgs/car.jpg'    // each label has a 'logo' property
  },
  trucks: {
    logo: '/imgs/truck.jpg'
  }
};

// The label to render. This would be dynamic in a real application.
const label = 'cars';

// Our main entry point, this is where we setup the provider.
export default class App extends React.Component {
  render() {
    // We render the provider and the rest of the app here.
    // For now the label is hardcoded to 'cars'. In a real
    // application this would be dynamic.
    return (
      <WhiteLabelProvider labels={labels} selectedLabel={label}>
        <div className={label}>
          <Header />
          ...
        </div>
      </WhiteLabelProvider>
    );
  }
}

// Here we utilize the selected label to render the logo.
// In this case 'src' will be '/imgs/car.jpg' because 'cars'
// is our selected label.
class HeaderComponent extends React.Component {
  render() {
    <img src={this.props.label.logo} alt='Logo' />
  }
}

// And finally we setup the Header component to utilize the
// white-label context so we can access the 'label' prop.
const Header = withWhiteLabelContext(HeaderComponent);`}</code></pre>
      <P>
        To see a fully working example check out the <A href="https://code.thintz.com/react-whitelabel/about/">docs</A>.
      </P>
      <P>
        So how does this example work? First we setup our labels. This is just a Javascript object where each key maps to a label. Each label is also an object made up of referenceable keys. The <code>WhiteLabelProvider</code> then takes the labels and the selected label as input and then provides the selected label&apos;s object to the rest of the app. This object is accessible using a <code>WhiteLabelConsumer</code> or the <code>withWhiteLabelContext</code> wrapper. If we then made the selectedLabel dynamic, say via calling <code>window.location.hostname</code>, then we would have a fully run time dynamic white-label.
      </P>
      <P>
        Also note that we are using the selected label&apos;s name as a class name in a top level div. This allows us to use the white-labeling with our CSS assets just by selecting based on the label name like <code>{`.cars a { ... }`}</code>.
      </P>
      <P>
        While the <A href="https://code.thintz.com/react-whitelabel/about/">react-whitelabel library</A> is not necessary for React run time white-labeling it does make it easier and more maintainable. If you implement it yourself you will likely do the same thing the library already does for you. If your interested learning more about react-whitelabel feel free to checkout the <A href="https://code.thintz.com/react-whitelabel/about/">docs</A> or the <A href="https://www.npmjs.com/package/react-whitelabel">npm page</A>.
      </P>
    </Article>
  );
};
