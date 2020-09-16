function mergeSort(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, mid);
  let rightArr = arr.slice(mid);
  let left = mergeSort(leftArr);
  let right = mergeSort(rightArr);

 return merge(left, right);
}

function merge(left, right){
  const merged = [];
  let i = 0; let j = 0;
  while(i < left.length && j < right.length){
    if(left[i] <= right[j]){
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }
  while(i < left.length){
    merged.push(left[i]);
    i++;
  }
  while(j < right.length){
    merged.push(right[j]);
    j++;
  }

  return merged;

}

let toOrder = [4, 6, 1, 9, 6, 0, 4];
console.log(mergeSort(toOrder));