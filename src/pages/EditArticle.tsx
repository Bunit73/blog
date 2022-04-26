import { BaseFunctionComponent } from '../common/BaseComponent';
import { Config } from '../config/Config';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Article } from '../models/Article';
import { Editor } from '@tinymce/tinymce-react';
import { Helpers } from '../common/Helpers';
import { Container } from '../common/Container';
import { toast } from 'react-toastify';
import { LookupItem } from '../models/LookupItem';
import { Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const EditArticle: BaseFunctionComponent = () => {
  const { id } = useParams();
  const user = useContext(AuthContext);
  const [formData, setFormData] = useState(new Article());
  const [tags, setTags] = useState<LookupItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Helpers.lookups.getLookupList('Tags').then((d) => {
      setTags(d);
    });
    if (id) {
      setLoading(true);
      Helpers.fsDb.getArticle(id ? id : '').then((d) => {
        setFormData(d);
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addFormTags = (id: number) => {
    const form = { ...formData };
    Object.assign(form, formData);
    form.tagIds.push(id);
    setFormData(form);
  };

  const removeFormTags = (id: number) => {
    const form = { ...formData };
    Object.assign(form, formData);
    form.tagIds = form.tagIds.filter((x) => {
      x !== id;
    });
    setFormData(form);
  };

  const handleContentChange = (e: string) => {
    const form = new Article();
    Object.assign(form, formData);
    form.content = e;
    setFormData(form);
  };

  const handleImageChange = (e: any) => {
    const form = new Article();
    Object.assign(form, formData);
    Helpers.files.fileToBase64(e.target.files[0]).then((d) => {
      form.titleImageBase = d;
      setFormData(form);
    });
  };

  const handlePublish = () => {
    setSaving(true);
    if (!formData.title || !formData.content) {
      alert('Please fill all the fields');
      setSaving(false);
      return;
    }

    formData.createdAt = Timestamp.now();
    formData.id = Helpers.guids.createGuid();

    Helpers.fsDb
      .saveArticle(formData)
      .then((d) => {
        toast.success('Article Edited', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1
        });
        setFormData(new Article());
      })
      .catch((err) => {
        toast.error('Error editing article', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <Container
      className={'mb-4'}
      style={{
        width: '100vw'
      }}>
      {!user ? (
        <>
          <h2>Login Dummy</h2>
        </>
      ) : (
        <div className="w-100">
          <div className="row">
            <div className="col">
              <h2>Create Article</h2>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="floatingInput">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="floatingInput">Sub Title</label>
              <textarea
                id="subtitle"
                name="subtitle"
                className="form-control"
                value={formData.subtitle}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="floatingInput">Tags</label>
              <div className="row">
                <div className="col">
                  {tags.map((t) => {
                    return (
                      <div key={t.id} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              addFormTags(t.id);
                            } else {
                              removeFormTags(t.id);
                            }
                          }}
                          checked={formData.tagIds.indexOf(t.id) > -1}
                        />
                        <label className="form-check-label">{t.val}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="floatingInput">Friendly Url</label>
              <input
                id="friendlyUrl"
                type="text"
                name="friendlyUrl"
                className="form-control"
                value={formData.friendlyUrl}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {/* description */}
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="">Description</label>
              <Editor
                onEditorChange={(e) => {
                  handleContentChange(e);
                }}
                value={formData.content}
                init={{
                  apiKey: Config.tinyApiKey,
                  height: 500,
                  menubar: 'tools',
                  plugins: 'code lists image link paste table',
                  toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code | removeformat | link | image | forecolor, table',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
          </div>
          {/* image */}
          <div className="row mt-4">
            <div className="col">
              <label htmlFor="imageUpload">Image</label>
              <input
                id="imageUpload"
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button
                className="btn btn-lg btn-primary w-100"
                onClick={handlePublish}
                disabled={saving}>
                {!saving ? <>Publish</> : <>Saving</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export { EditArticle };
