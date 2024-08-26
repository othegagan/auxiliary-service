"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTuroVehicleDataServerless = exports.copyTuroVehicleData = void 0;
const logger_1 = __importDefault(require("../../utils/logger.js"));
// import Nightmare from 'nightmare';
const puppeteer_1 = __importDefault(require("puppeteer"));
const copyTuroVehicleData = async (req, res) => {
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
        logger_1.default.error(`Scraping failed: ${error}`);
        res.status(500).json({ response: error });
    }
};
exports.copyTuroVehicleData = copyTuroVehicleData;
const copyTuroVehicleDataServerless = async (req, res) => {
    try {
        const { turolink } = req.body;
        const browser = await puppeteer_1.default.launch();
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
        logger_1.default.error(`Scraping failed: ${error}`);
        res.status(500).json({ response: error });
    }
};
exports.copyTuroVehicleDataServerless = copyTuroVehicleDataServerless;
//# sourceMappingURL=copyTuroVehicleData.controller.js.map