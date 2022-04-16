interface IArticle {
    title: string;
    content: string;
    titleImageUrl: string;
    createdAt: Date;
    tags: string[];
    comments: string[];
}

class Article implements  IArticle{
    content: string;
    createdAt: Date;
    title: string;
    titleImageUrl: string;
    tags: string[];
    comments: string[];

    constructor() {
        this.content = "";
        this.createdAt = new Date();
        this.title = "";
        this.titleImageUrl = "";
        this.tags = [];
        this.comments = [];
    }
}

export  { Article }


