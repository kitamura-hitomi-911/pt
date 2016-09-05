/**
 *
 * @param {string}current_date
 * @param {string}target_date
 * @returns {boolean}
 */
function isCut2weeksToBeHeld(current_date, target_date){
	var is_cut = false;
	if(current_date && target_date){
		var current_date_obj = dateStr2dateObj(current_date);
		var target_date_obj = dateStr2dateObj(target_date);
		if(current_date_obj && target_date_obj && target_date_obj.getTime()-current_date_obj.getTime() >= 14*24*60*60*1000){
			is_cut = true;
		}
	}
	return is_cut;
}

/**
 *
 * @param {string}date_str
 * @returns {boolean}
 */
function dateStr2dateObj(date_str){
	var is_valid = false;
	var date_obj = new Date(date_str);
	if(!isNaN(date_obj.getTime())){
		var year = date_obj.getFullYear();
		var month = date_obj.getMonth() + 1*1;
		var date = date_obj.getDate();
		if(date_str == year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)){
			is_valid = date_obj;
		}
	}
	return is_valid;
}
/**
 *
 * @param {string}date_str
 * @returns {boolean}
 */
function isDateWithinPeriod(date_str){
	var is_within = false;
	var start_date = new Date('2017-11-01');
	var end_date = new Date('2017-11-30');
	var date_obj = dateStr2dateObj(date_str);
	if(date_obj && date_obj.getTime() >= start_date.getTime() && date_obj.getTime() <= end_date.getTime()){
		is_within = true;
	}
	return is_within;
}