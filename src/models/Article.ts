import { Timestamp } from 'firebase/firestore';

interface IArticle {
  title: string;
  subtitle: string;
  content: string;
  titleImageBase: string;
  createdAt: Timestamp;
  tagIds: number[];
  comments: string[];
}

class Article implements IArticle {
  content: string;
  createdAt: Timestamp;
  title: string;
  subtitle: string;
  titleImageBase: string;
  tagIds: number[];
  comments: string[];

  constructor() {
    this.content = '';
    this.createdAt = new Timestamp(0, 0);
    this.title = '';
    this.subtitle = '';
    this.titleImageBase = '';
    this.tagIds = [];
    this.comments = [];
  }
}

export { Article };
