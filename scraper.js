const pup = require('puppeteer');

(async (url) => {
	const browser = await pup.launch();

	const page = await browser.newPage();

	await page.goto(url);

	const titles = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#video-title > yt-formatted-string")).map( t => t.textContent);
	});

	const links = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("h3 > #video-title")).map(l => l.href);
	});

	const channels = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#channel-info #text > a")).map(c => c.textContent);
	});

	const views = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#metadata #metadata-line > span:nth-child(3)")).map(v => v.textContent);
	});

	const videoAges = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#metadata #metadata-line > span:nth-child(4)")).map(a => a.textContent)});

	const channelData = titles.map((elem, index) => [elem, links[index], channels[index], views[index], videoAges[index]])
	console.log(channelData);

	await browser.close();
})('https://www.youtube.com/results?search_query=Best+travel+destinations')
