export const capitalize = (string) => {

  return string.charAt(0).toUpperCase() + string.slice(1);
    
}

export const capitalizeAll = (string) => {

  return string.toUpperCase()
}


export const sortArrayByIndex = (arr,index) => {

  arr.sort((a,b) => a[index] > b[index]);

  return arr
}