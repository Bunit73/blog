import { db } from '../config/firebaseConfig';
import { Article } from '../models/Article';
import { LookupItem } from '../models/LookupItem';
import firebase from 'firebase/compat/app';
import { setDoc, collection, doc } from 'firebase/firestore';
import moment from 'moment';

export class Helpers {
  static dates = {
    toLocalTime(date: Date): string {
      return moment(date).format('MMM Do YY');
    }
  };

  static files = {
    fileToBase64(file: File): Promise<string> {
      //https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = (error) => reject(error);
      });
    }
  };

  static lookups = {
    async getLookupList(listId: string) {
      const retval: LookupItem[] = [];
      const converter = {
        toFirestore: (data: LookupItem) => data,
        fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as LookupItem
      };

      const docs = await db.collection(listId).withConverter(converter).get();

      docs.forEach((doc) => {
        retval.push(doc.data());
      });

      return retval;
    },

    getLookupVal(id: number, lookupList: LookupItem[]): string {
      for (const x of lookupList) {
        if (x.id === id) {
          return x.val;
        }
      }
      return '';
    }
  };

  static guids = {
    createGuid(): string {
      let result: string;
      let i: string;
      let j: number;

      result = '';
      for (j = 0; j < 32; j++) {
        if (j === 8 || j === 12 || j === 16 || j === 20) {
          result = result + '-';
        }

        i = Math.floor(Math.random() * 16)
          .toString(16)
          .toLowerCase();
        result = result + i;
      }
      return new Guid(result).ToString();
    },
    isEmpty(stringToCheck: string): boolean {
      if (stringToCheck) {
        return stringToCheck === '00000000-0000-0000-0000-000000000000';
      } else {
        return true;
      }
    },
    createEmpty(): string {
      return '00000000-0000-0000-0000-000000000000';
    }
  };

  static fsDb = {
    // https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945
    async getArticle(id: string) {
      const converter = {
        toFirestore: (data: Article) => data,
        fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as Article
      };

      const doc = await db.collection('Articles').withConverter(converter).doc(id).get();

      const article = doc.data();

      if (article) {
        return article;
      } else {
        return new Article();
      }
    },
    async saveArticle(a: Article) {
      setDoc(doc(db, 'Articles', a.friendlyUrl), { ...a })
        .then(() => {
          return a;
        })
        .catch((err) => {
          return err;
        });
    },
    async getRecentArticles(count: number) {
      const retval: Article[] = [];
      const converter = {
        toFirestore: (data: Article) => data,
        fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as Article
      };

      const docs = await db
        .collection('Articles')
        .orderBy('createdAt', 'desc')
        .withConverter(converter)
        .limit(count)
        .get();

      docs.forEach((doc) => {
        retval.push(doc.data());
      });

      return retval;
    },
    async getArticlesByTagId(tag: number) {
      const retval: Article[] = [];
      const converter = {
        toFirestore: (data: Article) => data,
        fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as Article
      };

      const docs = await db
        .collection('Articles')
        .where('tagIds', 'array-contains', tag)
        .orderBy('createdAt', 'desc')
        .withConverter(converter)
        .get();

      docs.forEach((doc) => {
        retval.push(doc.data());
      });

      console.log(retval);

      return retval;
    }
  };
}

class Guid {
  constructor(public guid: string) {
    this._guid = guid;
  }

  private _guid: string;

  public ToString(): string {
    return this.guid;
  }
}
