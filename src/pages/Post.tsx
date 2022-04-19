import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseFunctionComponent } from "../common/BaseComponent";
import { Page } from "../common/Page";
import { db } from "../config/firebaseConfig";
import {Article} from "../models/Article";
import {Helpers} from "../common/Helpers";
import parse from 'html-react-parser'

const Post: BaseFunctionComponent<{}> = props => {
	const { id } = useParams();
	const [article, setArticle] = useState(new Article());
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		if(id){
			setLoading(true);
			Helpers.fsDb.getArticle(id ? id : "").then(d => {
				setArticle(d);
				setLoading(false);
			});
		}
		
	}, [id]);
	
    return (
		<>
		{
			loading ? <>Loading</> : 
			<>
			    <div className="row">
				  <div className="col-3">
					<img
					  src={article.titleImageBase}
					  alt={article.title}
					  style={{ width: "100%", padding: 10 }}
					/>
				  </div>
				  <div className="col-9 mt-3">
					<h2>{article.title}</h2>					
					<hr />
					{parse(article.content)}
				  </div>
				</div>			
			</>
			
		}
		</>
	);
};

export { Post };