import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function main() {
	const args = process.argv.slice(2);
	if (args.length < 2) {
		console.error('Usage: npx tsx scripts/capture-screenshot.ts <url> <outputPath>');
		console.error('Example: npx tsx scripts/capture-screenshot.ts http://localhost:4200/home ./screenshot.png');
		process.exit(1);
	}

	const [url, outputPath] = args;

	// Ensure output directory exists
	const outputDir = path.dirname(outputPath);
	if (outputDir && !fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	try {
		const browser = await chromium.launch({ headless: true });
		const context = await browser.newContext({
			viewport: { width: 1200, height: 768 }
		});
		const page = await context.newPage();

		await page.goto(url, { waitUntil: 'networkidle' });
		await page.screenshot({ path: outputPath, fullPage: true });
		await browser.close();

		console.log(`Screenshot saved to: ${outputPath}`);
	} catch (error) {
		console.error('Failed to capture screenshot:', error);
		process.exit(1);
	}
}

main();
