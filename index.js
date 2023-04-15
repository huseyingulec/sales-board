const starBtn = document.getElementById("star-btn")
const fireBtn = document.getElementById("fire-btn")

const liveSales = document.getElementById("live-sales")
const liveAchievements = document.getElementById("live-achievements")

const totalSales = document.querySelector(".total-sales")
const totalAchievements = document.querySelector(".total-achievements")

const totalRevenue = document.getElementById("total-revenue")
const totalCommission = document.getElementById("total-commission")

const resetBtn = document.getElementById("reset-btn")

const countFromLocal = JSON.parse(localStorage.getItem("salesCount"))


let salesLog = "" // sales output
let achievementsLog = ""  // achievements output

let salesCount = 0 // counts
let achievementsCount = 0

let revenueLog = 0
let commisionLog = 0


// Product A info
const productA = {
    emoji: "⭐",
    revenue: 200,
    commision: 50
}

// Product B info
const productB = {
    emoji: "🔥",
    revenue: 300,
    commision: 75
}

function fromLocal(input) {  
    return JSON.parse(localStorage.getItem(input))
}

// checks if there is a data for salesCount 
if ( typeof countFromLocal !== undefined ) {
    salesCount = countFromLocal // gets the data from local
    totalSales.innerHTML = salesCount // renders data to html

    achievementsCount = fromLocal("achievementsCount") // gets data from local through function
    totalAchievements.innerHTML = achievementsCount

    salesLog = fromLocal("salesLog")
    liveSales.innerHTML = salesLog

    achievementsLog = fromLocal("achievementsLog")
    liveAchievements.innerHTML = achievementsLog

    revenueLog = fromLocal("revenueLog")
    totalRevenue.innerHTML = revenueLog

    commisionLog = fromLocal("commisionLog")
    totalCommission.innerHTML = commisionLog
 }

starBtn.addEventListener("click", function(){ // listens for star button
    add(productA)
    
})

fireBtn.addEventListener("click", function(){ // listens for fire button
   add(productB)
})

function add(product) { 
    if ( salesLog.length < 15 ) { 
        salesCount++                          // adds 1 to count 
        totalSales.innerHTML = salesCount       // renders data to html
        saveToLocal("salesCount", salesCount)   // saves data to local through function

        salesLog += product.emoji       // adds emoji to output
        liveSales.innerHTML = salesLog  // renders data to html
        saveToLocal("salesLog", salesLog) // saves data to local through function

        addAchievement(salesLog.length === 1, "🔔")     // adds achievements through function
        addAchievement(salesCount === 15, "🏆")
        addAchievement(revenueLog >= 2500, "💰")

        getMoney(product)
    }
}


function addAchievement(criteria, emoji) {
    if (criteria) { // if criteria is true
      achievementsCount++ 
      totalAchievements.innerHTML = achievementsCount  // renders data to html
  
      achievementsLog += emoji // ads emoji to output
      liveAchievements.innerHTML = achievementsLog  // renders data to html
  
      saveToLocal("achievementsCount", achievementsCount)  // saves data to local through function
      saveToLocal("achievementsLog", achievementsLog)
    }
  }
function getMoney(product) {
    
    revenueLog += product.revenue // adds product revenue and commision to outputs
    commisionLog += product.commision

    totalRevenue.innerHTML = revenueLog     // renders data to html
    totalCommission.innerHTML = commisionLog
   
    saveToLocal("revenueLog", revenueLog)       // saves data to local through function
    saveToLocal("commisionLog", commisionLog)
}


resetBtn.addEventListener("click", function(){     // listens for reset button
        window.confirm("Do you really want to delete all?") // shows a confirmation windows if user confirm, executes the code
        salesLog = ""
        liveSales.innerHTML = salesLog

        achievementsLog = ""
        liveAchievements.innerHTML = achievementsLog

        salesCount = 0
        totalSales.innerHTML = salesCount

        achievementsCount = 0
        totalAchievements.innerHTML = achievementsCount

        revenueLog = 0
        totalRevenue.innerHTML = revenueLog

        commisionLog = 0
        totalCommission.innerHTML = commisionLog

        localStorage.clear()
    }
)

function saveToLocal(arrayName, input) {        // saves data to local
    localStorage.setItem(arrayName, JSON.stringify(input))  // sets item to local and makes string before setting
}


