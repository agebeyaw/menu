/**
 * @const EVENT_NS Define a custom namespace as a prefix for all events
 * @type {string}
 */
const EVENT_NS = '__QULHP__';

export default EVENT_NS;

/**
 * @const EVENTS Collect app's custom events and lock down the collection by
 * passing it through `Object.freeze`
 * @type {Object}
 */
export const EVENTS = Object.freeze( {
	'aida_modal_open': `${EVENT_NS}AIDA:MODAL-OPEN`,

	'mfp_open': `${EVENT_NS}MFP:OPEN`,
} );
