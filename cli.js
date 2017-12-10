#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const ora = require('ora');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const currency = ['USD',
	'BTC',
	'AFA',
	'ALL',
	'DZD',
	'AOA',
	'ARS',
	'AMD',
	'AWG',
	'AUD',
	'AZN',
	'BSD',
	'BHD',
	'BDT',
	'BBD',
	'BYR',
	'BEF',
	'BZD',
	'BMD',
	'BTN',
	'BOB',
	'BAM',
	'BWP',
	'BRL',
	'GBP',
	'BND',
	'BGN',
	'BIF',
	'KHR',
	'CAD',
	'CVE',
	'KYD',
	'XAF',
	'XPF',
	'CLP',
	'CNY',
	'COP',
	'KMF',
	'CDF',
	'CRC',
	'HRK',
	'CUC',
	'CZK',
	'DKK',
	'DJF',
	'DOP',
	'XCD',
	'EGP',
	'ERN',
	'EEK',
	'ETB',
	'EUR',
	'FKP',
	'FJD',
	'GMD',
	'GEL',
	'DEM',
	'GHS',
	'GIP',
	'GTQ',
	'GNF',
	'GYD',
	'HTG',
	'HNL',
	'HKD',
	'HUF',
	'ISK',
	'INR',
	'IDR',
	'IRR',
	'IQD',
	'ILS',
	'ITL',
	'JMD',
	'JPY',
	'JOD',
	'KZT',
	'KES',
	'KWD',
	'KGS',
	'LAK',
	'LVL',
	'LBP',
	'LSL',
	'LRD',
	'LYD',
	'LTL',
	'MOP',
	'MKD',
	'MGA',
	'MWK',
	'MYR',
	'MVR',
	'MRO',
	'MUR',
	'MXN',
	'MDL',
	'MNT',
	'MAD',
	'MZM',
	'MMK',
	'NAD',
	'NPR',
	'ANG',
	'TWD',
	'NZD',
	'NIO',
	'NGN',
	'KPW',
	'NOK',
	'OMR',
	'PKR',
	'PAB',
	'PGK',
	'PYG',
	'PEN',
	'PHP',
	'PLN',
	'QAR',
	'RON',
	'RUB',
	'RWF',
	'SVC',
	'WST',
	'SAR',
	'RSD',
	'SCR',
	'SLL',
	'SGD',
	'SKK',
	'SBD',
	'SOS',
	'ZAR',
	'KRW',
	'XDR',
	'LKR',
	'SHP',
	'SDG',
	'SRD',
	'SZL',
	'SEK',
	'CHF',
	'SYP',
	'STD',
	'TJS',
	'TZS',
	'THB',
	'TOP',
	'TTD',
	'TND',
	'TRY',
	'TMT',
	'UGX',
	'UAH',
	'AED',
	'UYU',
	'UZS',
	'VUV',
	'VEF',
	'VND',
	'XOF',
	'YER',
	'ZMK'
];

const cur = currency[Math.floor(Math.random() * currency.length)].toLowerCase();

const arg = process.argv[2] || '1';
const inf = process.argv[3] || cur;

const url = `https://www.google.com/search?q=${arg}+${inf}+to+bitcoin`;

const end = process.exit;
const spinner = ora();

if (arg === '--help') {
	logUpdate(`
 Usage : c2b
       : c2b <amount> <currency>

 Help  :
  $ c2b 10 usd
  $ c2b 100 inr
  $ c2b 1000 euro
  `);
	end(1);
}

dns.lookup('google.com', err => {
	if (err) {
		logUpdate(`\n ✖ Couldn't convert. You're offline! \n\n ✔ Type $ c2b --help for more help\n`);
		end(1);
	} else {
		logUpdate();
		spinner.text = `Converting`;
		spinner.start();
		got(url).then(res => {
			const rates = res.body;
			logUpdate(`\n ⏩ ${rates.split('138%"><b>')[1].split('</b>')[0]}\n`);
			spinner.stop();
		}).catch(err => {
			if (err) {
				logUpdate(`\n ✖ ${inf} is not a currency! \n`);
				end(1);
			}
		});
	}
});
