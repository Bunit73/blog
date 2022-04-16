import * as React from "react";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../config/firebaseConfig";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {Article} from "../models/Article";
import { Editor } from '@tinymce/tinymce-react';
import {Helpers} from "../common/Helpers";


const AddArticle: BaseFunctionComponent<{}> = props => {
    const user = useContext(AuthContext);

    const [formData, setFormData] = useState(new Article());
    const [imageData, setImageData] = useState(new Blob());

    const [progress, setProgress] = useState(0);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (e: string) => {
        let form = new Article();
        Object.assign(form, formData);
        form.content = e;
        setFormData(form);
    };

    const handleImageChange = (e: any) => {
        setImageData(e.target.files[0]);
        // setFormData({ ...formData, titleImage: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.title || !formData.content) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(
            storage,
            `/images/${Helpers.guids.createGuid()}`
        );

        const uploadImage = uploadBytesResumable(storageRef, imageData);

        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent);
            },
            (err) => {
                console.log(err);
            },
            () => {
                // setFormData(new Article());

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "Articles");
                    formData.titleImageUrl = url;
                    console.log(formData)
                    addDoc(articleRef, {...formData})
                        .then(() => {
                            // toast("Article added successfully", { type: "success" });
                            setProgress(0);
                        })
                        .catch((err) => {
                            // toast("Error adding article", { type: "error" });
                        });
                });
            }
        );
    };

    return (
        <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
            {!user ? (
                <>
                    <h2>
                        <Link to="/signin">Login to create article</Link>
                    </h2>
                    Don't have an account? <Link to="/register">Signup</Link>
                </>
            ) : (
                <>
                    <h2>Create article</h2>
                    <div className="form-group">
                        <label htmlFor="">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    {/* description */}
                    <label htmlFor="">Description</label>
                    <Editor
                        onEditorChange={(e) => {
                            handleContentChange(e)
                        }}
                        value={formData.content}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />

                    {/* image */}
                    <label htmlFor="">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleImageChange(e)}
                    />

                    {progress === 0 ? null : (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-striped mt-2"
                                style={{ width: `${progress}%` }}
                            >
                                {`uploading image ${progress}%`}
                            </div>
                        </div>
                    )}
                    <button
                        className="form-control btn-primary mt-2"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </>
            )}
        </div>
    );
};

export { AddArticle };
