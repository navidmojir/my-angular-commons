import { Pipe, PipeTransform } from '@angular/core';

export interface EnumStruct {
	faTitle: string;
	value: string;
}


export abstract class  EnumTranslatorPipe implements PipeTransform {

	protected abstract getEnums(): EnumStruct[];
	
	public transform(value: string, args?: any): string {		
		return this.findInArray(this.getEnums(), value);
	}
	
	private findInArray(arr: Array<EnumStruct>, value: string) : string 
	{
		let result = arr.filter(obj => obj.value == value);
		if(result.length == 1)
			return result[0].faTitle;
		return "";
	}

}
