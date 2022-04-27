import { BaseFunctionComponent } from '../common/BaseComponent';
import { Helpers } from '../common/Helpers';
import { Article } from '../models/Article';
import './ArticlePreview.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LookupItem } from '../models/LookupItem';

const ArticlePreview: BaseFunctionComponent<{ post: Article }> = (props) => {
  const [tags, setTags] = useState<LookupItem[]>([]);

  useEffect(() => {
    Helpers.lookups.getLookupList('Tags').then((d) => {
      setTags(d);
    });
  }, []);

  return (
    <div className="card flex-md-row mb-4 box-shadow h-md-250">
      <div className="card-body d-flex flex-column align-items-start">
        {props.post.tagIds.map((t, idx) => {
          return (
            <strong key={idx} className="d-inline-block mb-2 text-primary">
              {Helpers.lookups.getLookupVal(t, tags)}
            </strong>
          );
        })}
        <h3 className="mb-0">
          <Link className="text-dark" to={`/post/${props.post.friendlyUrl}`}>
            {props.post.title}
          </Link>
        </h3>
        <div className="mb-1 text-muted">
          {Helpers.dates.toLocalTime(props.post.createdAt.toDate())}
        </div>
        <p className="card-text mb-auto">{props.post.subtitle}</p>
        <Link to={`/post/${props.post.friendlyUrl}`}>{'Read More →'}</Link>
      </div>
      <img
        className="card-img-right flex-auto d-none d-md-block preview-img rounded"
        data-src="holder.js/200x250?theme=thumb"
        alt={props.post.title}
        src={props.post.titleImageBase}
        data-holder-rendered="true"
      />
    </div>
  );
};

export { ArticlePreview };
