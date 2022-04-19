import * as React from "react";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../config/firebaseConfig";
import { Config} from "../config/Config";
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import {Article} from "../models/Article";
import { Editor } from '@tinymce/tinymce-react';
import {Helpers} from "../common/Helpers";
import { Page } from "../common/Page";
import { toast } from 'react-toastify';

const AddArticle: BaseFunctionComponent<{}> = props => {
    const user = useContext(AuthContext);

    const [formData, setFormData] = useState(new Article());
    const [imageData, setImageData] = useState(new Blob());

    const [progress, setProgress] = useState(0);
	const [saving, setSaving] = useState(false);

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
		setSaving(true);
        if (!formData.title || !formData.content) {
            alert("Please fill all the fields");
			setSaving(false);
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
							toast.success('Article Added', {
								position: "top-right",
								autoClose: 5000,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: 1,
							});
                            setProgress(0);
                        })
                        .catch((err) => {
                            console.error(err);
							toast.error('Error adding article', {
								position: "top-right",
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
							});
                        }).finally(() => {
							setSaving(false);
						});
                });
            }
        );
    };

    return (
        <Page>
            {!user ? (
                <>
                    <h2>
                        Login Dummy
                    </h2>
                </>
            ) : (
                <>
					<div
						className="row"
					>
						<div className="col">
							<h2>Create Article</h2>
						</div>
					</div>
					<div
						className="row mt-4"
					>
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
                    {/* description */}
					<div
						className="row mt-4"
					>
						<div className="col">
							<label htmlFor="">Description</label>
							<Editor
								onEditorChange={(e) => {
									handleContentChange(e)
								}}
								value={formData.content}
								init={{
									apiKey: Config.tinyApiKey,
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
						</div>
					</div>  
					{/* image */}
					<div
						className="row mt-4"
					>
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
					<div
						className="row mt-4"
					>
						<div className="col">
							<button
								className="btn btn-lg btn-primary w-100"
								onClick={handlePublish}
								disabled={saving}
							>				
								{
									!saving ? <>Publish</> : <>Saving...</>
								}
							</button>
						</div>
					</div>
                </>
            )}
        </Page>
    );
};

export { AddArticle };
