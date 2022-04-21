import { Timestamp } from 'firebase/compat/firestore';

interface IArticle {
    title: string;
    content: string;
    titleImageUrl: string;
	titleImageBase: string;
    createdAt: 	Timestamp;
    tags: string[];
    comments: string[];
}

class Article implements  IArticle{
    content: string;
    createdAt: 	Timestamp;
    title: string;
    titleImageUrl: string;
	titleImageBase: string;
    tags: string[];
    comments: string[];

    constructor() {
        this.content = "";
        this.createdAt = new Timestamp();
        this.title = "";
        this.titleImageUrl = "";
		this.titleImageBase = "";
        this.tags = [];
        this.comments = [];
    }
}

export  { Article }


