const starBtn = document.getElementById("star-btn")
const fireBtn = document.getElementById("fire-btn")

const liveSales = document.getElementById("live-sales")
const liveAchievements = document.getElementById("live-achievements")

const totalSales = document.querySelector(".total-sales")
const totalAchievements = document.querySelector(".total-achievements")

const totalRevenue = document.getElementById("total-revenue")
const totalCommission = document.getElementById("total-commission")

const resetBtn = document.getElementById("reset-btn")

const countDataFromLocalStorage = JSON.parse(localStorage.getItem("salesCount"))


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
    emoji: "✨",
    revenue: 300,
    commision: 75
}

function getDataFromLocalStorage(input) {  
    return JSON.parse(localStorage.getItem(input))
}

// checks if there is a data for salesCount 
if ( countDataFromLocalStorage !== null ) {
    salesCount = countDataFromLocalStorage // gets the data from local
    totalSales.textContent = salesCount // renders data to html

    achievementsCount = getDataFromLocalStorage("achievementsCount") // gets data from local through function
    totalAchievements.textContent = achievementsCount

    salesLog = getDataFromLocalStorage("salesLog")
    liveSales.textContent = salesLog

    achievementsLog = getDataFromLocalStorage("achievementsLog")
    liveAchievements.textContent = achievementsLog

    revenueLog = getDataFromLocalStorage("revenueLog")
    totalRevenue.textContent = "$" + revenueLog

    commisionLog = getDataFromLocalStorage("commisionLog")
    totalCommission.textContent = "$" + commisionLog
 }

starBtn.addEventListener("click", function(){ // listens for star button
    add(productA)
    
})

fireBtn.addEventListener("click", function(){ // listens for fire button
   add(productB)
})

function add(product) { 
    if ( salesLog.length < 36 ) { 
        salesCount++                          // adds 1 to count 
        totalSales.textContent = salesCount       // renders data to html
        saveToLocal("salesCount", salesCount)   // saves data to local through function

        salesLog += product.emoji       // adds emoji to output
        liveSales.textContent = salesLog  // renders data to html
        saveToLocal("salesLog", salesLog) // saves data to local through function
        getMoney(product)
        
        checkAchievement(salesLog.length === 1, "🔔")     // checks achievements through function
        checkAchievement(salesCount === 15, "🏆")
        checkAchievement(revenueLog >= 2500, "💰")

        
    }
}


function checkAchievement(criteria, emoji) {
    if (criteria) { // if criteria is true
      achievementsCount++ 
      totalAchievements.textContent = achievementsCount  // renders data to html
  
      achievementsLog += emoji // ads emoji to output
      liveAchievements.textContent = achievementsLog  // renders data to html
  
      saveToLocal("achievementsCount", achievementsCount)  // saves data to local through function
      saveToLocal("achievementsLog", achievementsLog)
    }
  }
function getMoney(product) {
    
    revenueLog += product.revenue // adds product revenue and commision to outputs
    commisionLog += product.commision

    totalRevenue.textContent = "$" + revenueLog     // renders data to html
    totalCommission.textContent = "$" + commisionLog
   
    saveToLocal("revenueLog", revenueLog)       // saves data to local through function
    saveToLocal("commisionLog", commisionLog)
}


resetBtn.addEventListener("click", function(){     // listens for reset button
        window.confirm("Do you really want to delete all?") // shows a confirmation windows if user confirm, executes the code
        salesLog = ""
        liveSales.textContent = salesLog

        achievementsLog = ""
        liveAchievements.textContent = achievementsLog

        salesCount = 0
        totalSales.textContent = salesCount

        achievementsCount = 0
        totalAchievements.textContent = achievementsCount

        revenueLog = 0
        totalRevenue.textContent = "$" + revenueLog

        commisionLog = 0
        totalCommission.textContent = "$" + commisionLog

        localStorage.clear()
    }
)

function saveToLocal(arrayName, input) {        // saves data to local
    localStorage.setItem(arrayName, JSON.stringify(input))  // sets item to local and makes string before setting
}


