import { Pipe, PipeTransform } from '@angular/core';

interface EnumStruct {
	faTitle: string;
	value: string;
}

@Pipe({
  name: 'enumTranslator'
})
export class EnumTranslatorPipe implements PipeTransform {

	readonly enums = [		
	];
	
	public transform(value: string, args?: any): string {		
		return this.findInArray(this.enums, value);
	}
	
	private findInArray(arr: Array<EnumStruct>, value: string) : string 
	{
		let result = arr.filter(obj => obj.value == value);
		if(result.length == 1)
			return result[0].faTitle;
		return "";
	}

}
