function convertTemp() {
  const input = document.getElementById("tempInput").value;
  const From = document.getElementById("fromUnit").value;
  const To = document.getElementById("toUnit").value;
  const Result = document.getElementById("result");

  if (input === "" || isNaN(input)) {
    Result.innerText = "Please Input a valid Number";
    return;
  }

  let value = parseFloat(input);
  let result;

  //all values are convert into the celsius

  if (From === "fahrenheit") {
    value = ((value - 32) * 5) / 9;
  } else if (From === "kelvin") {
    value = value - 273.15;
  }

  // Convert Celsius to target unit
  if (To === "fahrenheit") {
    result = (value * 9) / 5 + 32;
  } else if (To === "kelvin") {
    result = value + 273.15;
  } else {
    result = value;
  }

  Result.innerText = ` ${result.toFixed(2)} ${unitSymbol(To)}`;
}

function unitSymbol(unit) {
  if (unit === "celsius") return "°C";
  if (unit === "fahrenheit") return "°F";
  return "K";
}
