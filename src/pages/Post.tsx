import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { Container } from '../common/Container';
import { Article } from '../models/Article';
import { Helpers } from '../common/Helpers';
import parse from 'html-react-parser';
import { Header } from '../common/Header';
import './Post.scss';
import { LookupItem } from '../models/LookupItem';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TagBadge } from '../common/TagBadge';

const Post: BaseFunctionComponent = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(new Article());
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<LookupItem[]>([]);

  useEffect(() => {
    Helpers.lookups.getLookupList('Tags').then((d) => {
      setTags(d);
    });
    if (id) {
      setLoading(true);
      Helpers.fsDb.getArticle(id ? id : '').then((d) => {
        setArticle(d);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Container>
            <Header />
          </Container>
          <Container className="container-md">
            {article.tagIds.length > 0 && (
              <div className="row p-2">
                <div className="col">
                  {article.tagIds.map((t, idx) => {
                    return (
                      <TagBadge
                        className={'margin-right-10'}
                        key={idx}
                        text={Helpers.lookups.getLookupVal(t, tags)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <main className="border-top border-dark post p-4 mb-4">
              <Container>
                <div className="mb-4">
                  <h1 className="display-4 fst-italic">{article.title}</h1>
                  <h2 className="lead">{article.subtitle}</h2>
                  <small>{Helpers.dates.toLocalTime(article.createdAt.toDate())}</small>
                  <div className="d-flex align-items-center justify-content-center px-0">
                    <img
                      src={article.titleImageBase}
                      alt={article.title}
                      className={'rounded hero-img'}
                    />
                  </div>
                </div>
              </Container>
              <hr />
              <Container>{parse(article.content)}</Container>
            </main>
          </Container>
        </>
      )}
    </>
  );
};

export { Post };
