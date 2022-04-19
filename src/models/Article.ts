interface IArticle {
    title: string;
    content: string;
    titleImageUrl: string;
	titleImageBase: string;
    createdAt: Date;
    tags: string[];
    comments: string[];
}

class Article implements  IArticle{
    content: string;
    createdAt: Date;
    title: string;
    titleImageUrl: string;
	titleImageBase: string;
    tags: string[];
    comments: string[];

    constructor() {
        this.content = "";
        this.createdAt = new Date();
        this.title = "";
        this.titleImageUrl = "";
		this.titleImageBase = "";
        this.tags = [];
        this.comments = [];
    }
}

export  { Article }


