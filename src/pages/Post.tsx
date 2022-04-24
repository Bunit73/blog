import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { Container } from '../common/Container';
import { Article } from '../models/Article';
import { Helpers } from '../common/Helpers';
import parse from 'html-react-parser';
import { Header } from '../common/Header';
import './Post.scss';

const Post: BaseFunctionComponent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(new Article());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      Helpers.fsDb.getArticle(id ? id : '').then((d) => {
        setArticle(d);
        console.log(d);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <>
      <Container>
        <Header />
      </Container>
      {loading ? (
        <>Loading</>
      ) : (
        <Container>
          <main className="border-top border-dark post p-2 mb-4">
            <Container>
              <div className="mb-4">
                <h1 className="display-4 fst-italic">{article.title}</h1>
                <h2 className="lead">{article.subtitle}</h2>
                <div className="col px-0">
                  <img
                    src={article.titleImageBase}
                    alt={article.title}
                    className={'rounded hero-img'}
                  />
                </div>
              </div>
            </Container>
            <hr />
            <Container>
              <div>{Helpers.dates.toLocalTime(article.createdAt.toDate())}</div>
              {parse(article.content)}
            </Container>
          </main>
        </Container>
      )}
    </>
  );
};

export { Post };
