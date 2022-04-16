export class Helpers {
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
