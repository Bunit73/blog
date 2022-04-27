import { Timestamp } from 'firebase/firestore';

interface IArticle {
  title: string;
  subtitle: string;
  content: string;
  titleImageBase: string;
  createdAt: Timestamp;
  editedAt: Timestamp | null;
  tagIds: number[];
  comments: string[];
  id: string;
  friendlyUrl: string;
}

class Article implements IArticle {
  content: string;
  createdAt: Timestamp;
  editedAt: Timestamp | null;
  title: string;
  subtitle: string;
  titleImageBase: string;
  tagIds: number[];
  comments: string[];
  id: string;
  friendlyUrl: string;

  constructor() {
    this.content = '';
    this.createdAt = new Timestamp(0, 0);
    this.editedAt = null;
    this.title = '';
    this.subtitle = '';
    this.titleImageBase = '';
    this.tagIds = [];
    this.comments = [];
    this.id = '';
    this.friendlyUrl = '';
  }
}

export { Article };
