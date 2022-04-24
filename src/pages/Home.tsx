import { BaseFunctionComponent } from '../common/BaseComponent';
import { Page } from '../common/Page';
import { Header } from '../common/Header';
import { Nav } from '../common/Nav';

const Home: BaseFunctionComponent = () => {
  return (
    <>
      <Page>
        <Header />
        <Nav />
      </Page>
      <main>
        <Page>
          <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
              <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
              <p className="lead my-3">
                Multiple lines of text that form the lede, informing new readers quickly and
                efficiently about what’s most interesting in this post’s contents.
              </p>
            </div>
          </div>
        </Page>
      </main>
    </>
  );
};

export { Home };
