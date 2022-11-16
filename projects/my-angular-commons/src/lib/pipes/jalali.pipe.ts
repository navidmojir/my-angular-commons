import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

// convert epoch to shamsi
@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		if(value == null)
			return '-';
		let MomentDate = moment(new Date(value));
		return MomentDate.locale('fa').format('YYYY/MM/DD'); 
	}

}

@Pipe({
  name: 'jalalitime'
})
export class JalaliTimePipe implements PipeTransform {

	transform(value: any, args?: any): any {		
		if(value == null)
			return '-';
		let MomentDate = moment(new Date(value));
		return MomentDate.locale('fa').format('HH:mm:ss - YYYY/MM/DD'); 
	}

}
