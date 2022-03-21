
export class CustomAction {
    private _title: string;
    private _onClick: any;


	constructor(title: string, onClick: any) {
		this._title = title;
		this._onClick = onClick;
	}


    /**
     * Getter title
     * @return {string}
     */
	public get title(): string {
		return this._title;
	}


    /**
     * Getter onClick
     * @return {any}
     */
	public get onClick(): any {
		return this._onClick;
	}

    
}