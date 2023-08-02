// import dummyjson from 'dummy-json'

// import { parse } from 'dummy-json'
// import { writeFileSync, readFileSync } from 'fs'

const {parse} = require("dummy-json")
const {writeFileSync, readFileSync} = require("fs")


let myData = []
let succeeded = true
let status = 0
let isError = false
async function fetchProducts() {
  try {
    // after this line, our function will wait for the `fetch()` call to be settled
    // the `fetch()` call will either return a Response or throw an error
    const response = await fetch(
      "https://fakestoreapi.com/products",
    )
    if (!response.ok) {
      succeeded = false
      status = response.status
      return [myData, succeeded, status, isError]
      // throw new Error(`HTTP error: ${response.status}`)
    }
    // after this line, our function will wait for the `response.json()` call to be settled
    // the `response.json()` call will either return the parsed JSON object or throw an error
    const Data = await response.json()
    myData = main(Data)
    console.log(myData)
    
    const jsonData = JSON.parse(myData)

    // Convert the JavaScript object back into a JSON string
    const jsonString = JSON.stringify(jsonData)

    writeFileSync('data.json', jsonString, 'utf-8', (err) => {
      if (err) throw err
      console.log('Data added to file')
    })

    const update_data = readFileSync('data.json');
    const updated_jsonData = JSON.parse(update_data);
    console.log("After Adding data",JSON.stringify(updated_jsonData, null, 4))
    
  } catch (error) {
    isError = error !== undefined ? true : false
    return [myData, succeeded, status, isError]
    // console.error(`Could not get products: ${error}`);
  }
}

fetchProducts()

function main(data){

  const reviewsTemplate = `
    {"reviewsList":
      [{{#repeat 20}}
      {
        "{{add @index 1}}": {
          "dateAdded": "{{date '2018' '2020' 'MM/DD/YYYY'}}",
          "five": {
            "rating": 5,
            "reviewList": [
              {{#repeat min=1 max=50}}
              {
                "review": "{{lorem min=1 max=50}}",
                "date": "{{date '2020' '2023' 'MM/DD/YYYY'}}"
              }
              {{/repeat}}
            ]
          },
          "four": {
            "rating": 4,
            "reviewList": [
              {{#repeat min=1 max=50}}
              {
                "review": "{{lorem min=1 max=50}}",
                "date": "{{date '2020' '2023' 'MM/DD/YYYY'}}"
              }
              {{/repeat}}
            ]
          },
          "three": {
            "rating": 3,
            "reviewList": [
              {{#repeat min=1 max=50}}
              {
                "review": "{{lorem min=1 max=50}}",
                "date": "{{date '2020' '2023' 'MM/DD/YYYY'}}"
              }
              {{/repeat}}
            ]
          },
          "two": {
            "rating": 2,
            "reviewList": [
              {{#repeat min=1 max=50}}
              {
                "review": "{{lorem min=1 max=50}}",
                "date": "{{date '2020' '2023' 'MM/DD/YYYY'}}"
              }
              {{/repeat}}
            ]
          },
          "one": {
            "rating": 1,
            "reviewList": [
              {{#repeat min=1 max=50}}
              {
                "review": "{{lorem min=1 max=50}}",
                "date": "{{date '2020' '2023' 'MM/DD/YYYY'}}"
              }
              {{/repeat}}
            ]
          }
        }
      }
      {{/repeat}}]
    }`
  const resultReviews = parse(reviewsTemplate)
  const reviews = JSON.parse(resultReviews)
  // console.log(reviews)

  const inStockList = data.map((product) => {
    let obj = {}
    obj[product.id] = Math.floor(Math.random()*100)+1
    return obj
  })

  const meanRatingList = reviews.reviewsList.map((obj, i) => {
      const sum = (obj[i+1].five.reviewList.length*5)+
        (obj[i+1].four.reviewList.length*4)+
        (obj[i+1].three.reviewList.length*3)+
        (obj[i+1].two.reviewList.length*2)+
        (obj[i+1].one.reviewList.length*1)
      let newObj = {}
      const total = obj[i+1].five.reviewList.length + 
      obj[i+1].four.reviewList.length +
      obj[i+1].three.reviewList.length + 
      obj[i+1].two.reviewList.length +
      obj[i+1].one.reviewList.length
      newObj[i+1] = Math.round(sum/total)
      return newObj
  })

  const ratingsList = reviews.reviewsList.map((obj, i) => {
    let newObj = {}
    newObj[i+1] = {}
    newObj[i+1][5] = obj[i+1].five.reviewList.length
    newObj[i+1][4] = obj[i+1].four.reviewList.length
    newObj[i+1][3] = obj[i+1].three.reviewList.length
    newObj[i+1][2] = obj[i+1].two.reviewList.length
    newObj[i+1][1] = obj[i+1].one.reviewList.length
    return newObj
  })

  const datesAddedList = reviews.reviewsList.map((obj, i) => {
    let newObj = {}
    newObj[i+1] = obj[i+1].dateAdded
    return newObj
  })

  //create one main Data object for whole project

  const myData = data.map((dataObj, i) => {
    return {...dataObj, 
              inStock: inStockList[i][dataObj.id],
              ratings: ratingsList[i][dataObj.id],
              reviews: reviews.reviewsList[i][dataObj.id],
              meanRating: meanRatingList[i][dataObj.id],
              dateAdded: datesAddedList[i][dataObj.id]}
  })

  return myData

} 

// export {data, succeed, httpStatus, hasError}