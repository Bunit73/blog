import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArticlePreview } from '../common/ArticlePreview';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { Container } from '../common/Container';
import { Header } from '../common/Header';
import { Helpers } from '../common/Helpers';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Nav } from '../common/Nav';
import { Article } from '../models/Article';

const Articles: BaseFunctionComponent = () => {
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    let searchTag = 0;
    if (tag) {
      searchTag = parseInt(tag);
      Helpers.fsDb
        .getArticlesByTagId(searchTag)
        .then((d) => {
          setPosts(d);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Helpers.fsDb
        .getRecentArticles(10)
        .then((d) => {
          setPosts(d);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    let searchTag = 0;
    if (tag) {
      searchTag = parseInt(tag);
      Helpers.fsDb
        .getArticlesByTagId(searchTag)
        .then((d) => {
          setPosts(d);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tag]);

  return (
    <>
      <Container>
        <Header />
        <Nav />
      </Container>
      <main>
        <Container>
          {loading ? (
            <div className="row mt-5">
              <div className="col d-flex justify-content-between">
                <LoadingSpinner />
                <LoadingSpinner />
                <LoadingSpinner />
                <LoadingSpinner />
                <LoadingSpinner />
              </div>
            </div>
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

export { Articles };
