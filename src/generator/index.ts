import * as puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Liquid } from 'liquidjs';

export async function generatePDF(template:string, dataset:any){
	const engine = new Liquid()
	const content = readFileSync(
		resolve(__dirname, `../templates/${template}.html`),
		'utf-8'
	)
	const liquidParse = engine.parse(content)
	const render = await engine.render(liquidParse, dataset)
  	const browser = await puppeteer.launch();
  	const page = await browser.newPage();
  	await page.setContent(render)
	const pdfFile = await page.pdf({ format: 'letter', printBackground: true });
  	await browser.close();

	return pdfFile
}