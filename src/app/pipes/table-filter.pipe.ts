import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
	transform(list: any[], args: any) {
		if(list == null)
			return null;
		
		const filters = args.filters;
		const columns = args.columns;

		const keys = Object.keys(filters).filter(key => filters[key]);
		const filterArray = item => keys.every(key =>
			(typeof(item[key].indexOf) == "function" && item[key].indexOf(filters[key]) >= 0)
			|| (typeof(item[key].indexOf) != "function" && columns.find(col => col.dataField == key).renderer(item[key]).indexOf(filters[key]) >= 0)
			);

		return keys.length ? list.filter(filterArray) : list;
	}
}