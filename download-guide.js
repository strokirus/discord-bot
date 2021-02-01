const cheerio = require('cheerio');
const fetch = require('node-fetch');

const config = require("./config.json");

exports.requestHero = async () => {
    const { HF: requestUrl } = config;

    const res = await fetch(requestUrl.guide).then(res => res.text());

    const $ = cheerio.load(res);
    const listHeroes = $('.heroes span a');

    const heroes = [];

    Object.keys(listHeroes).forEach(key => {
        if (Number.isNaN(+key)) {
            return;
        }

        const hero = listHeroes[key];

        const id = $(hero).attr("data-id");

        if (typeof id != 'undefined') {
            const name = $(hero).find('img').attr('src').split('/')[5].split('.')[0];
            heroes.push({ name, id });
        }
    });

    return heroes
}
	