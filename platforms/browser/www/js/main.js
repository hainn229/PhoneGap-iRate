const restaurantData = [{
        name: "The Coffee House",
        type: "Coffee",
        owner: "Mr. John",
        image: "img/thecoffeehouse.jpg",
        address: "No 88, Cao Thang .St, 4 .Dist, HCM Province.",
        cost: "$$$",
        rate_service: 3,
        rate_clean: 5,
        rate_food: 2,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-05-11 11:00"
    },
    {
        name: "Bits & Pizzas",
        type: "Fast Food",
        owner: "Mrs. Maria",
        image: "img/bitsandpizzas.jpg",
        address: "Merriwa, New South Wales.",
        cost: "$",
        rate_service: 5,
        rate_clean: 4,
        rate_food: 4,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-10-22 10:00"
    },
    {
        name: "Costa Seafood",
        type: "Sea Food",
        owner: "Mr. Marcus",
        image: "img/costaseafood.jpg",
        address: "No 36, Tran Phu .St, Loc Tho .Dist, Nha Trang Province.",
        cost: "$$$$",
        rate_service: 4,
        rate_clean: 2,
        rate_food: 2,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-02-02 10:00"
    },
    {
        name: "YOLO Restaurant",
        type: "Bar",
        owner: "Mr. Peter",
        image: "img/yolo.jpg",
        address: "Admiraliteitsstraat 17B, 3063 EJ Rotterdam, Netherlands",
        cost: "$$$$$",
        rate_service: 3,
        rate_clean: 5,
        rate_food: 4,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-07-08 10:00"
    },
    {
        name: "Highway4",
        type: "Restaurant",
        owner: "Mr. Hoang",
        image: "img/highway4.jpg",
        address: "No 575, Kim Ma .St, Ngoc Khanh, Ba Dinh .Dist, Ha Noi",
        cost: "$$$$",
        rate_service: 4,
        rate_clean: 2,
        rate_food: 3,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-12-10 12:00"
    },
    {
        name: "Lotteria",
        type: "Fast Food",
        owner: "Mrs. Ant",
        image: "img/lotteria.jpg",
        address: "No 103, Nguyen Khanh Toan .St, Cau Giay .Dist, Ha Noi",
        cost: "$$",
        rate_service: 2,
        rate_clean: 4,
        rate_food: 5,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-06-09 10:00"
    },
    {
        name: "The Bistro",
        type: "Restaurant",
        owner: "Mr. Viet",
        image: "img/thebistro.jpg",
        address: "No 2/2C Khu Ngoai Giao Doan Van Phuc, Kim Ma .St, Ba Dinh .Dist, Ha Noi",
        cost: "$$$$",
        rate_service: 3,
        rate_clean: 4,
        rate_food: 3,
        notes: "Notes is a collection of beautifully designed coffee shops and bars, serving Notes single origin speciality coffee, craft beers, well-chosen wines and classic ...",
        date_time: "2020-11-11 09:00"
    }
];
var iRateDBver1;

// Create database by IndexedDB
var request = window.indexedDB.open("iRateDB", 1);
request.onupgradeneeded = function(event) {
    var iRateDBver1 = event.target.result;
    var objectStore = iRateDBver1.createObjectStore("iRate", { keyPath: "id", autoIncrement: true });
    for (var i in restaurantData) {
        objectStore.add(restaurantData[i])
    }
}
request.onsuccess = function(event) {
    iRateDBver1 = request.result;
    console.log("success: " + iRateDBver1);
};

// Request data in database
function getAllData(collectionName) {
    const transaction = iRateDBver1.transaction([collectionName], "readonly")
    const objectStore = transaction.objectStore(collectionName)
    request = objectStore.getAll();
    return request
}

// Send data in Homepage
function Home() {
    const resType = getAllData("iRate")
    resType.onsuccess = (event) => {
        const results = event.target.result
        for (var i in results) {
            let html = `
            <li style="list-style-type: none;">
                <div class="d-flex flex-row ">
                    <div class="align-self-xl-start">
                        <a rateId="${results[i].id}" id="details" style="text-decoration: none;" data-toggle="modal" data-target="#detail">
                            <img src="${results[i].image}" style="width: 100px; height: 100px; border-bottom: 2px solid whitesmoke;">
                        </a>
                    </div>
                    <div class="align-self-xl-baseline ml-2">
                        <a rateId="${results[i].id}" id="details" style="text-decoration: none;"  data-toggle="modal" data-target="#detail">
                            <h2 style="text-transform: capitalize">${results[i].name}</h2>
                        </a>
                        <p style="font-style: italic; text-transform: capitalize">${results[i].cost} - ${results[i].type}</p>
                        <p style="text-transform: capitalize">Service: ${results[i].rate_service} <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star"></i></span> | Clean: ${results[i].rate_clean} <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star"></i></span> | Food: ${results[i].rate_food} <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star"></i></span></p>
                        <p style="text-transform: capitalize">Average Rating: <span>${parseFloat((Number(results[i].rate_food) + Number(results[i].rate_clean) + Number(results[i].rate_service))/3).toFixed(1)}</span> <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star"></i></span></p>
                    </div>
                    <div class="align-self-xl-end ml-2">
                        <button style="position: absolute; top: 5%; right: 2%; color:red;" class="btn" onclick="vibrate()" rateId="${results[i].id}" id="delete"><i class="fa fa-trash" ></i></button>
                    </div>
                </div>
            </li>
            `
            $('#restaurants').append(html);
        }
    }
}

// Add new data
function Add(collectionName, data) {
    const Newdata = iRateDBver1.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    Newdata.onsuccess = () => {
        window.localStorage = "#add"
        $('#addrate').each(function() {
            this.reset()
        })
        alert("Successfully!")
        $('#restaurants').empty()
        Home()
    }
    Newdata.onerror = () => {
        alert('Error Add Rate')
    }
}

// Delete data
function Delete(data) {
    const dataDelete = iRateDBver1.transaction(["iRate"], "readwrite").
    objectStore("iRate").delete(Number(data))
    dataDelete.onsuccess = function() {
        alert("Error Delete Rate")
    }
    return dataDelete
}

// Get data details
function Details(data) {
    const dataGet = iRateDBver1.transaction(["iRate"], "readonly").objectStore("iRate").get(Number(data))
    dataGet.onerror = function() {
        alert("Error Get Details Rate")
    }
    return dataGet
}


// Print rate star
function printStar(starNumber, elementID) {
    for (let i = 1; i <= starNumber; i++) {
        let html = `
        <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star ${i}"></i></span>`
        $(`#${elementID}`).append(html)
    }
}
$(window).on("load", function() {
    Home()
});

$(document).ready(function() {
    $('#home').on('click', () => {
        $('#restaurants').empty()
        Home()
    })

    // Add data in form "#addrate"
    $('#addrate').on('submit', function() {
        const rate = {
            name: $('#name').val(),
            type: $('#type').val(),
            owner: $('#owner').val(),
            address: $('#address').val(),
            cost: $('#cost').val(),
            rate_service: $('#rate_service').val(),
            rate_clean: $('#rate_clean').val(),
            rate_food: $('#rate_food').val(),
            date_time: $('#date').val() + " " + $('#time').val(),
            notes: $('#notes').val(),
            image: 'https://cdn.otstatic.com/legacy-cw/default2-original.png',
        }
        Add("iRate", rate)
        return false
    });

    // get and deleta data by id
    $(document).on('click', '#delete', function() {
        const rateid = $(this).attr("rateId")
        const result = Delete(Number(rateid))
        result.onsuccess = function() {
            $('#restaurants').empty()
            Home()
        }
    })

    // get and view data details in modal "#detail"
    $(document).on('click', '#details', function() {
        const rateId = $(this).attr("rateId")
        const result = Details(rateId)
        result.onsuccess = function(event) {
            $(location).attr('href', "#detail")
            const restDetails = event.target.result
            const html = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Details</h5>
                            <button type="button" class="btn btn-default" style="position: absolute; top: 5px;right: 10px; width: 50px;" data-dismiss="modal" aria-label="Close">
                                <a href="#home"><i class="fa fa-times"></i></a>
                            </button>
                        </div>
                        <div class="modal-body" style="word-wrap: break-word; text-align: justify; text-justify: inter-word;">
                            <img src="${restDetails.image}" style="width: 100%;max-width: 500px;height: auto;">
                            <h2 style="text-transform: capitalize">${restDetails.name}</h2>
                            <h5 style="text-transform: capitalize; font-style: italic;">${restDetails.cost} - ${restDetails.type}</h5>                 
                            <h5 style="text-transform: capitalize; word-wrap: break-word;">Address: ${restDetails.address}</h5>
                            <p id="service_star" style="text-transform: capitalize">Rating for Service: </p>
                            <p id="clean_star" style="text-transform: capitalize">Rating for Cleanliness: </p>
                            <p id="food_star" style="text-transform: capitalize">Rating for Food Quality: </p>
                            <p style="text-transform: capitalize">Average Rating: <span>${parseFloat((Number(restDetails.rate_food) + Number(restDetails.rate_clean) + Number(restDetails.rate_service))/3).toFixed(1)}</span> <span style="color: rgba(233, 233, 33, 0.788);"><i class="fa fa-star"></i></span></p>
                            <p style="text-transform: capitalize">Date & Time of Visit: ${restDetails.date_time}
                            <p style="text-transform: capitalize;">Notes: ${restDetails.notes}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal"><a href="#home">Close</a></button>
                        </div>
                    </div>
                </div>
             `
            $('#detail').empty().append(html)

            // print rate start by id
            printStar(Number(restDetails.rate_service), "service_star");
            printStar(Number(restDetails.rate_clean), "clean_star");
            printStar(Number(restDetails.rate_food), "food_star");
        }
    })
})

//  RING & VIBRATE
function ring() {
    navigator.notification.beep(0.3);
}

function vibrate() {
    navigator.vibrate(100);
}