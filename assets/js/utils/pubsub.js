/**
 * @class PubSub
 * @classdesc Small pub/sub system
 * @example:
 *
 *      PubSub.subscribe('event', data => {
 *           ...
 *		});
 *
 *	    PubSub.publish('event', {
 *	        ...
 *	    });
 */

export const PubSub = {

	/**
	 * @property {object} Store all the topics available
	 */
	topics: window.globalBus || ( window.globalBus = {} ),

	/**
	 * @method hasProps Check if a topic exists
	 * @param {string} topic
	 * @return {boolean}
	 */
	hasProps( topic ){

		return this.topics.hasOwnProperty( topic );

	},

	/**
	 * @method subscribe Subscribe to a specific topic
	 * @param {string} topic the topic we're subscribing to
	 * @param {function} handler the handler to run
	 * @return {object} Utility to remove a topic from the store
	 */
	subscribe( topic, handler ) {

		// Create the topic's object if not yet created
		if ( ! this.hasProps( topic ) ) {

			this.topics[topic] = [];

		}

		// Add the handler to queue
		const index = this.topics[topic].push( handler ) - 1;

		// Provide handle back for removal of topic
		return {
			remove: () => {
				delete this.topics[topic][index];
			}
		};
	},

	/**
	 * @method publish Publish a specific topic
	 * @param {string} topic the topic we're publishing
	 * @param {object} data data to pass to the handler
	 */
	publish( topic, data = {} ) {

		if ( ! this.hasProps( topic ) ) {

			return;

		}

		// Cycle through this.topics queue & fire!
		this.topics[topic].forEach( item => item( data ) );

	}

};
