import puppeteer from 'puppeteer';
import fs from 'fs';
import ltl from '../util/linetoline.mjs';

/**
 * 
 * @param {string} sv searchvalue
 * @returns {{ code: number, value: any }} OrionNumber
 */
async function doTheFetch(sv) {
    const encodedvalue = encodeURIComponent(sv);
    const url = `https://hanteonews.com/ko/search?keyword=${encodedvalue}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });
    const articleDummy = await page.waitForSelector('::-p-xpath(//*[@id="root"]/div[4]/div[2]/div/div[1]/div[2]/div[1])');
    
    // AllDivs를 가져오기
    const allDivs = await articleDummy.$$("div.sc-bXZogI.hCcWGV");

    // 각 div의 textContent를 가져오기
    const divTexts = await Promise.all(allDivs.map(async (div) => {
        return await page.evaluate(el => el.textContent.trim(), div); // div의 텍스트 내용 가져오기
    }));

    // 검색어가 포함된 줄만 필터링
    const filteredResults = divTexts.filter(text => text.includes(sv));

    // 결과를 파일에 저장
    const ALL = filteredResults.join('\n');
    fs.writeFileSync("../dist/dust.txt", ALL, "utf-8");
    analyzeLine();

    await browser.close();
}

function analyzeLine() {
    const lines = ltl("../dist/dust.txt");
    lines.forEach(line => {
        const splitLines = line.split("    ");
        // console.log(splitLines);
        const secondSplitlines = splitLines[1].split(".");
        console.log(secondSplitlines);
    })
}

doTheFetch("");
