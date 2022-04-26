import { useEffect, useState } from 'react';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { Container } from '../common/Container';
import { Header } from '../common/Header';
import { Helpers } from '../common/Helpers';
import { Article } from '../models/Article';
import { ArticlePreview } from './ArticlePreview';

const Home: BaseFunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    Helpers.fsDb
      .getRecentArticles(5)
      .then((d) => {
        setPosts(d);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Container>
        <Header />
        {/* <Nav /> */}
      </Container>
      <main>
        <Container>
          <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="col-md-8 px-0">
              <h1 className="display-4 fst-italic">{`It's my blog about stuff and things`}</h1>
              <p className="lead my-3">{`A data dump of whats on my mind`}</p>
            </div>
          </div>
        </Container>
        <Container>
          {loading ? (
            <div>Loading..</div>
          ) : (
            <>
              {posts.map((p) => {
                return <ArticlePreview key={p.id} post={p} />;
              })}
            </>
          )}
        </Container>
      </main>
    </>
  );
};

export { Home };
