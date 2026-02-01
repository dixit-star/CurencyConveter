let inputRate = document.getElementById("inputrate");
let FromCuntryName = document.getElementById("fromcountryname");
let toCuntryName = document.getElementById("tocountryname");
let fromCuntryimg = document.getElementById("fromcountryimg");
let toCuntryimg = document.getElementById("tocountryimg");
let btn = document.getElementById("btn");
let msg = document.querySelector(".msg");
let errorMsg = document.getElementById("errormsg");
let iconImg = document.getElementById("iconImg");

//creating defult value of country code into toselector which is USD
toFlagDefult = () => {
  let element = document.createElement("option");
  element.innerText = Object.keys(countryList)[149];
  toCuntryName.append(element);
};
toFlagDefult();

let fromSelect = () => {
  //add the element in drop down from countryList object into Fromselector

  for (let i = 0; i <= 158; i++) {
    let element = document.createElement("option");
    element.innerText = Object.keys(countryList)[i];
    FromCuntryName.append(element);
  }

  //set the flag according to country code
  let newcountryCode = countryList[FromCuntryName.value];
  fromCuntryimg.innerHTML = `<img src="https://flagsapi.com/${newcountryCode}/flat/64.png" alt="" srcset=""></img>`;
};

fromSelect();

FromCuntryName.addEventListener("click", (e) => {
  fromSelect();
  e.stopImmediatePropagation();
});

//add the element in drop down from countryList object into toSelector
let toSelect = () => {
  for (let i = 0; i <= 158; i++) {
    let element = document.createElement("option");
    element.innerText = Object.keys(countryList)[i];
    toCuntryName.append(element);
  }

  //set the flag according to country code
  let newcountryCode = countryList[toCuntryName.value];
  toCuntryimg.innerHTML = `<img src="https://flagsapi.com/${newcountryCode}/flat/64.png" alt="" srcset=""></img>`;
};

toSelect();

toCuntryName.addEventListener("click", () => {
  toSelect();
});

let swep = () => {
  let temp = FromCuntryName.value;
  FromCuntryName.value = toCuntryName.value;
  toCuntryName.value = temp;
};
iconImg.addEventListener("click", () => {
  swep();
  fromSelect();
  toSelect();
  fetchData();
});
//API data fetching

async function fetchData() {
  try {
    let fromcountryNameValue = FromCuntryName.value.toLowerCase();
    let tocountrynameValue = toCuntryName.value.toLowerCase();
    let apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromcountryNameValue}.json`;
    let response = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    });
    let data = await response.json();
    let convertedValue =
      inputRate.value * data[fromcountryNameValue][tocountrynameValue];
    let newconvertedValue = convertedValue.toFixed(2);
    msg.innerText = `${inputRate.value} ${FromCuntryName.value} =  ${newconvertedValue} ${toCuntryName.value}`;
  } catch (error) {
    errorMsg.innerText = `*Cannot get the data`;
    console.log(error);
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputRate.value <= 0) {
    errorMsg.innerText = `*Please enter correct value`;
  } else {
    fetchData();
    errorMsg.innerText = ``;
  }
});
