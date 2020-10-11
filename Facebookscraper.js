const fs = require('fs');
const puppeteer = require('puppeteer');
const config = require('./config.json');


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
  await page.goto("https://mbasic.facebook.com/ufi/reaction/profile/browser/fetch/?limit=988&shown_ids=100056141316845%2C100056110479231%2C100056074987258%2C100056073161508%2C100056012564335%2C100055988528027%2C100055942509291%2C100055894009196%2C100055820603348%2C100055814629374&total_count=988&ft_ent_identifier=10159157769811803");
  
  const result = await page.evaluate(()=>{
    let elements,names = [];
    elements = document.querySelectorAll('h3.bj');
    for(var element of elements){
      names.push(element.innerText);
    }
    return names;
  });

  /*const result = await page.evaluate(()=>{
    let names = [];
    let elements = document.querySelectorAll('h3.bj');
    for(var element of elements){
      names.push(element.childNodes[0].innerText);
    }
  });
*/

  await browser.close();
  return result;
};

returncomments().then((value) =>{
  console.log(value);
});