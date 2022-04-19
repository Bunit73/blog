import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { Page } from "../common/Page";
import { db } from "../config/firebaseConfig";
import {Article} from "../models/Article";
import {Helpers} from "../common/Helpers";

const Post: BaseFunctionComponent<{}> = props => {
	const { id } = useParams();
	const [article, setArticle] = useState(new Article());
	
	useEffect(() => {
		if(id){
			Helpers.fsDb.getArticle(id ? id : "").then(d => {
				setArticle(d)
			});
		}
		
	}, [id]);
	
    return (
		<>
		</>
	);
};

export { Post };