//invoke stdlib
const lib = require('lib');

//instantiate stdlib module
module.exports = function (slots, callback) {

	//invoke yahoo-finance and lodash 
	var yahooFinance = require('yahoo-finance');
	var _ = require('lodash');

	//instantiate variables
	var FIELDS = _.flatten([['s', 'n', 'l1']]);
	var SYMBOL = nameToSymbol(slots.company.value);
	var value = '';
	
	//get stock quote for yahoo api
	yahooFinance.snapshot({
	  fields: FIELDS,
	  symbol: SYMBOL
	}, function (err, snapshot) {
	  	if (err) { throw err; }
	  rawStock = JSON.stringify(snapshot, null, 2);
	  stock = JSON.parse(rawStock);
	  value = stock.lastTradePriceOnly;
	  name = stock.name;

	  //return string for Alexa to speak
	  return callback(null, 'The last traded price for ' + name + ' is $' + value);
	});

	//map name to symbol
	function nameToSymbol(name){
		if(name=='apple'||name=='Apple'){
			return 'AAPL';
		}
		else if(name=='microsoft'||name=='Microsoft'){
			return 'MSFT';
		}
		else if(name=='amazon'||name=='Amazon'){
			return 'AMZN';
		}
		else if(name=='google'||name=='Google'){
			return 'GOOG';
		}
		else{
			return 'DLX';
		}
	}
};