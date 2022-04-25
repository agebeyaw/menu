/**
 * @class Validator
 * @classdesc Validation rules to check inputs against
 */
export const Validator = {

	/**
	 * @method lte Check if a given value is
	 * lesser then a comparison rule
	 * @param  {String} str     Input value to be checked
	 * @param  {Object} options Control options
	 * @return {Boolean}
	 */
	lte( str, options = {} ) {

		return str <= options.min;

	},

	/**
	 * @method gte Check if a given value is
	 * greater then a comparison rule
	 * @param  {String} str     Input value to be checked
	 * @param  {Object} options Control options
	 * @return {Boolean}
	 */
	gte( str, options = {} ) {

		return str >= options.min;

	},

	/**
	 * @method isEmpty Check if a given string is empty
	 * @param {String} str
	 * @return {boolean}
	 */
	isEmpty( str ){

		return str === '';

	},

	/**
	 * @method isEmptyObj Check if a given object is empty
	 * @param obj
	 * @return {boolean}
	 */
	isEmptyObj( obj ){

		return !Object.keys( obj ).length;

	},

	/**
	 * @method isEqualTo Check if a string is equal to a comparison value
	 * @param {String} str
	 * @param {Object} options
	 * @return {boolean}
	 */
	isEqualTo( str, options ){

		return str === options.compare;

	},

	/**
	 * @method isUndefined Check if an element is undefined
	 * @param {*} el
	 * @return {boolean}
	 */
	isUndefined( el ){

		return typeof el === 'undefined';

	},

	/**
	 * @method isNull Check if an element is null
	 * @param {*} el
	 * @return {boolean}
	 */
	isNull( el ) {

		return  el === null;

	},

	/**
	 * @method hasSize Check if an array is non empty
	 * @param {Array} item
	 * @return {boolean}
	 */
	hasSize( item ){

		return !!item.length;

	},

	/**
	 * @method hasOption Detect if a key is present into an object
	 * @param {object} options
	 * @param {string} key
	 * @return {boolean}
	 */
	hasOption( options, key ){

		return key in options;

	},

	/**
	 * @method isNumber check if an item is a number (returns true even if it is of a string type)
	 * @param {string} item
	 * @return {boolean}
	 */
	isNumber( item ){

		return !isNaN( item );

	},

	/**
	 * @method isValidUrl check if a string is a valid URL
	 * @param {string} url
	 * @return {boolean}
	 */
	isValidUrl( url ) {

		const pattern = new RegExp( '^(https?:\\/\\/)?' + // protocol
									'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
									'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
									'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
									'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
									'(\\#[-a-z\\d_]*)?$', 'i' ); // fragment locator

		return pattern.test( url );

	},

	/**
	 * @const oneOf
	 * @description check if the provided enums includes the provided value. Basically is a wrapper of object that implements
	 * include method
	 *
	 * @param enums array or string to be checked for a value inclusion
	 * @param value value used that will searched in the enums
	 *
	 * @return {boolean} true if the value is included, false otherwise
	 */
	oneOf( enums, value ) {
		return enums.includes( value );
	},


};
