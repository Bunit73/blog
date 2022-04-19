import { db } from "../config/firebaseConfig";
import {Article} from "../models/Article";
import firebase from 'firebase/compat/app';
import { Timestamp, collection, addDoc } from "firebase/firestore";

export class Helpers {
	static files = {
		fileToBase64(file:File): Promise<string> {
			//https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
			return new Promise<string> ((resolve,reject)=> {
				 const reader = new FileReader();
				 reader.readAsDataURL(file);
				 reader.onload = () => resolve(reader.result?.toString() || '');
				 reader.onerror = error => reject(error);
			 })
			}
	};
	
    static guids = {
        createGuid(): string {
            let result: string;
            let i: string;
            let j: number;

            result = "";
            for (j = 0; j < 32; j++) {
                if (j === 8 || j === 12 || j === 16 || j === 20) {
                    result = result + "-";
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
                return stringToCheck === "00000000-0000-0000-0000-000000000000";
            } else {
                return true;
            }
        },
        createEmpty(): string {
            return "00000000-0000-0000-0000-000000000000";
        },
    };
	
	static fsDb = {
		async getArticle(id: string) {
			const converter = {
				toFirestore: (data: Article) => data,
				fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
				snap.data() as Article
			}
			
			const doc = await db
				.collection('Articles')				
				.withConverter(converter)
				.doc(id)				
				.get();
			
			const article = doc.data();
			
			if(article){
				return article;
			} else {
				return new Article();
			}
		},
		async saveArticle(a: Article) {
				const articleRef = collection(db, "Articles");
                    console.log(a)
                    addDoc(articleRef, {...a})
                        .then(() => {
							return a;
                        })
                        .catch((err) => {
							return err;
				})
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
