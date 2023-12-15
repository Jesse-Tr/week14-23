// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDir = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-cs55-13-2023.pantheonsite.io/wp-json/twentytwentyone-child/v1/special";

// function returns ids for all json objects in array
export async function getAllIds() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    // console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // use map() on array to extract just id properties into new array of obj values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
  // above code returns an array with nested obj values that looks like this:
  // [
  //   {
  //     params: {
  //       id: 3
  //     }
  //   },
  //   {
  //     params: {
  //       id: 2
  //     }
  //   }
  // ]
}

// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  
  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);
/*
  // here is where you would run the forEach to convert acf_fields string data into JSON
  // loop thru each object in array returned as JSON
  jsonObj.forEach(
    function(item) {
      // reformat string contained in delimited acf field data, add curlies and quotes
      let x = '{"' + item.acf_fields + '"}';
      // https://www.w3schools.com/jsref/jsref_replace.asp
      // x = x.replace(/,/g,'","');
      x = x.replaceAll(',','","');
      // x = x.replace(/:/g,'":"');
      x = x.replaceAll(':','":"');
      // now that we have a string that is in valid json format, convert it to json
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
      let y = JSON.parse(x);
      console.log(y);
      console.log(y.first_name);
      item.acf_fields = y;
    }
  );*/
  
  // sort json array by name property
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

export async function getData(idRequested) {
  // get filepath to json file
  // const filePath = path.join(dataDir, 'persons.json');

  // load json file contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }

  // convert string from file into json array object
  // const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  // find object value in array that has matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === idRequested;
  });

  // extract object value in filtered array if any
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  // console.log(objReturned);

  // return object value found
  return objReturned;
}