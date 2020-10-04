const puppeteer = require('puppeteer');

let getbooks = async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    await page.setViewport({width: 1200, height: 720});
    await page.waitFor(1000);

    const result = await page.evaluate(()=>{
        let data = [];        
        let elements = document.querySelectorAll('.product_pod');
        
        for(var element of elements){
            let title = element.childNodes[5].innerText;
            let price = element.childNodes[5].children[0].innerText;
            data.push({title,price});
        } 
        return data;
    });

    browser.close();
    return result;
};

getbooks().then((value) =>{
    console.log(value);
});