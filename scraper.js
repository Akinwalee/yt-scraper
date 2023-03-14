import { launch } from 'puppeteer';

const getVideos = async (url) => {
	const browser = await launch({
		// timeout: 50000,
		// args: [ '--proxy-server=213.149.182.98:8080' ]
	});

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

	const videoAge = await page.evaluate(() => {
	return Array.from(document.querySelectorAll("#metadata #metadata-line > span:nth-child(4)")).map(a => a.textContent)});

	const channelData = titles.map((elem, index) => [elem, links[index], channels[index], views[index], videoAge[index]])
	console.log(channelData);

	await browser.close();
}

getVideos('https://www.youtube.com/results?search_query=Best+travel+destinations')
