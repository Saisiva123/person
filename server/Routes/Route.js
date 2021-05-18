const express = require("express");
const router = express.Router();
const navigation = require("../modules/db");

router.get('/navCategories', (req, res) => {
    navigation.navCategories.find({}, { _id: 0 }).then((data) => {
        var navCatData = data[0];
        res.json(navCatData);
    })
})

router.get('/getProductDetails/:product', (req, res) => {
    var product = req.params.product;
    navigation.productDetails.find({}, { _id: 0, [product]: 1 }).then(data => {
        console.log(data[0])
        res.json(data[0]);
    })
})

router.get('/getProducts', (req, res) => {
    //http://localhost:3000/api/getroducts?product=Masks&value=totRating&type=desc&page=2&limit=30

    var product = req.query.product;
    var valueToSort = req.query.value;
    var typeOfSort = req.query.type;   
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);
    var startIndex = (limit * page) - limit;
    console.log(valueToSort);

   navigation.productDetails.find({},{_id:0,[product+".ITEMS"]:1}).then(data=>
        {
            var value=JSON.parse(JSON.stringify(data));
            var items=value[0][product]["ITEMS"];
            var unsortedData=items;
            var sortedData=items.sort(GetSortOrder(valueToSort, typeOfSort));
            

            res.json({
                records:valueToSort=="undefined" || "null" ? unsortedData.slice(startIndex,startIndex+limit)
                :sortedData.slice(startIndex,startIndex+limit),
                currPage:page,
                totItems:items.length,
                startIndexOfCurrPage:startIndex
            })
        })
})

function GetSortOrder(prop, type) {
    if (type == "asc") {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }
    else {
        return function (a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }
}



module.exports = router;