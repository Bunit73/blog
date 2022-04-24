import * as React from 'react';
import { BaseFunctionComponent } from '../common/BaseComponent';
import { Config } from '../config/Config';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Article } from '../models/Article';
import { Editor } from '@tinymce/tinymce-react';
import { Helpers } from '../common/Helpers';
import { Page } from '../common/Page';
import { toast } from 'react-toastify';

const AddArticle: BaseFunctionComponent = () => {
  const user = useContext(AuthContext);

  useEffect(() => {
    Helpers.lookups.getLookupList('Tags');
  }, []);

  const [formData, setFormData] = useState(new Article());
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    Helpers.fsDb
      .saveArticle(formData)
      .then((d) => {
        toast.success('Article Added', {
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
        toast.error('Error adding article', {
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
    <Page>
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
                  plugins: 'code',
                  toolbar: 'code',
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
                disabled={saving}
              >
                {!saving ? <>Publish</> : <>Saving</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export { AddArticle };
