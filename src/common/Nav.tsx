import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LookupItem } from '../models/LookupItem';
import { BaseFunctionComponent } from './BaseComponent';
import { Helpers } from './Helpers';
import './Nav.scss';

const Nav: BaseFunctionComponent = () => {
  const [tags, setTags] = useState<LookupItem[]>([]);

  useEffect(() => {
    Helpers.lookups.getLookupList('Tags').then((d) => {
      setTags(d);
    });
  }, []);

  return (
    <div className="nav-scroller py-1 mb-2">
      <nav className="nav d-flex justify-content-between">
        {tags.map((t, idx) => {
          return (
            <Link to={`/posts/${t.id}`} className="p-2 link-secondary" key={t.id}>
              {t.val}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export { Nav };
