const fs = require('fs');
const { config } = require('process');
const puppeteer = require('puppeteer');
//const config = require('./config.json');
//const cookie = require('./cookie.json');

const returncomments = async()=> {
  const browser = await puppeteer.launch({headless: false});
  const context = browser.defaultBrowserContext();
  context.overridePermissions("https://www.facebook.com", []);
  const page = await browser.newPage();
  await page.setViewport({width: 920, height: 1080});
  await page.goto('https://www.facebook.com/login.php');
  
  await page.type("#email",config.username);
  await page.type("#pass",config.password);
  await Promise.all([
    await page.click('#loginbutton'),
    page.waitForNavigation({ waitUntil: 'networkidle0' })
  ]);
  await page.goto("https://mbasic.facebook.com/ufi/reaction/profile/browser/fetch/?limit=300&shown_ids=780767132038952%2C579182156085282%2C356026561856132%2C285746978482265%2C109382980630665%2C100056153193881%2C100056152980811%2C100056103541744%2C100056078374155&total_count=265567&ft_ent_identifier=10159097462306803");
  
  const result = await page.evaluate(()=>{
    let names = [];
    let elements = document.querySelectorAll('#root > table > tbody > tr > td > div > ul > li:nth-child(1) > table > tbody > tr > td > table > tbody > tr > td.s.bi > div > h3.bj');
    for(var element of elements){
      names.push(element.innerText);
      console.log(element);
    }
  });


  await browser.close();
  return result;
};

returncomments().then((value) =>{
  console.log(value);
});