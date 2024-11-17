import logger from '@/utils/logger';
// import Nightmare from 'nightmare';
import puppeteer from 'puppeteer';
export const copyTuroVehicleData = async (req, res) => {
    try {
        const { turolink } = req.body;
        // const nightmare = new Nightmare({ show: false });
        // const result: ScrapedContent = await nightmare
        //     .goto(turolink)
        //     .wait('.seo-pages-19qxpf6-StyledText')
        //     .evaluate(() => {
        //         const content: Partial<ScrapedContent> = {};
        //         let elements = document.querySelectorAll('.seo-pages-19qxpf6-StyledText');
        //         content.description = Array.from(elements).map((element) => element.textContent || '');
        //         content.description = content.description.splice(0, content.description.length / 2);
        //         elements = document.querySelectorAll('.seo-pages-1qmfcgr-MediaObjectBody');
        //         content.features = Array.from(elements).map((element) => element.textContent || '');
        //         content.features = content.features.splice(0, content.features.length / 2);
        //         elements = document.querySelectorAll('h1.seo-pages-l1y6tk-StyledText');
        //         content.name = Array.from(elements).map((element: any) => element.innerText || '');
        //         content.name = content.name.splice(0, content.name.length / 2);
        //         elements = document.querySelectorAll('.seo-pages-12sl3fd');
        //         content.masterdata = Array.from(elements).map((element: any) => element.innerText || '');
        //         content.masterdata = content.masterdata.splice(0, content.masterdata.length / 2);
        //         elements = document.querySelectorAll('.e1wb47j10.seo-pages-lhv0k3');
        //         const allwritings = Array.from(elements).map((element: any) => element.innerText);
        //         const guidelinesElement = allwritings.find((text) => text.startsWith('GUIDELINES'));
        //         if (guidelinesElement) {
        //             content.guidelines = guidelinesElement.split('GUIDELINES')[1];
        //         }
        //         return content;
        //     })
        //     .end();
        res.status(200).json({ response: 'ok' });
    }
    catch (error) {
        logger.error(`Scraping failed: ${error}`);
        res.status(500).json({ response: error });
    }
};
export const copyTuroVehicleDataServerless = async (req, res) => {
    try {
        const { turolink } = req.body;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(turolink);
        // Example: Extract text from an element
        const content = await page.evaluate(() => {
            return document.querySelector('h1').innerText;
        });
        await browser.close();
        res.status(200).json({ content });
    }
    catch (error) {
        logger.error(`Scraping failed: ${error}`);
        res.status(500).json({ response: error });
    }
};
//# sourceMappingURL=copyTuroVehicleData.controller.js.map