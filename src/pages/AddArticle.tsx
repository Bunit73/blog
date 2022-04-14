import * as React from "react";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../config/firebaseConfig";
import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import { Link } from "react-router-dom";


const AddArticle: BaseFunctionComponent<{}> = props => {
    const user = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: Blob,
        createdAt: Timestamp.now().toDate(),
    });

    const [progress, setProgress] = useState(0);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: any) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!formData.title || !formData.description || !formData.image) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(
            storage,
            `/images/${Date.now()}${formData.image.name}`
        );

        const uploadImage = uploadBytesResumable(storageRef, formData.image.prototype);

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
                setFormData({
                    title: "",
                    description: "",
                    image: Blob,
                    createdAt: Timestamp.now().toDate()
                });

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, "Articles");
                    addDoc(articleRef, {
                        title: formData.title,
                        description: formData.description,
                        imageUrl: url,
                        createdAt: Timestamp.now().toDate(),
                        likes:[],
                        comments:[]
                    })
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
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={(e) => handleChange(e)}
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
