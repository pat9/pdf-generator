import { Body, Controller, Get, Post, Response, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { generatePDF } from './generator';

@Controller('pdf')
export class AppController {
  constructor(private readonly appService: AppService) {}

	@Post()
  	async create(@Body() pdfParams: any, @Response({ passthrough: true }) res) {
		const {template, dataset, name} = pdfParams
		const pdf = await generatePDF(template, dataset)
		res.set({
			'Content-Type': 'application/pdf',
      		'Content-Disposition': `attachment; filename="${ name || "pdf_generated"}.pdf"`,
		})
    	return new StreamableFile(pdf) 
  	}
}
