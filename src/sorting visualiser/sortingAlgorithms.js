export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  
  const auxiliaryArray = array.slice();
  bubbleSortHelper(auxiliaryArray, animations);
  
  return animations;
}

function bubbleSortHelper(mainArray, animations) {
    const N = mainArray.length;
    for (let i = 0; i < N - 1; i++) {
        for (let j = 0; j < N - i - 1; j++) {
            animations.push({
                type : "color",
                indices : [j,j+1],
                color : "red"
            });
            if (mainArray[j] > mainArray[j + 1]) {
                const temp = mainArray[j];
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
                animations.push({
                type : "height",
                index : j,
                newHeight : mainArray[j]
            });
            animations.push({
                type : "height",
                index : j+1,
                newHeight : mainArray[j+1]
            });
            }
            animations.push({
                type : "color",
                indices : [j,j+1],
                color : "rgb(28, 153, 172)"
            });
        }
    }
}
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: "color", indices: [i, j], color: "red" });
    animations.push({ type: "color", indices: [i, j], color: "rgb(28, 153, 172)" });

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: "height", index: k, newHeight: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: "height", index: k, newHeight: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: "color", indices: [i, i], color: "red" });
    animations.push({ type: "color", indices: [i, i], color: "rgb(28, 153, 172)" });
    animations.push({ type: "height", index: k, newHeight: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: "color", indices: [j, j], color: "red" });
    animations.push({ type: "color", indices: [j, j], color: "rgb(28, 153, 172)" });
    animations.push({ type: "height", index: k, newHeight: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
    return animations;
}
function quickSortHelper(mainArray, low, high, animations){
    if(low<high){
        const pi = partition(mainArray, low, high, animations);
        quickSortHelper(mainArray, low, pi-1, animations);
        quickSortHelper(mainArray, pi+1, high, animations);
    }
}
function partition(mainArray, low, high, animations){
    const pivot = mainArray[high];
    let i = low - 1;
    for(let j=low;j<high;j++){
        animations.push({type:"color", indices:[j,high], color:"red"});
        animations.push({type:"color", indices:[j,high], color:"rgb(28, 153, 172)"});
        if(mainArray[j]<pivot){
            i++;
            [mainArray[i],mainArray[j]] = [mainArray[j],mainArray[i]];
            animations.push({type:"height", index:i, newHeight:mainArray[i]});
            animations.push({type:"height", index:j, newHeight:mainArray[j]});
        }
    }
    [mainArray[i+1],mainArray[high]] = [mainArray[high],mainArray[i+1]];
    animations.push({type:"height", index:i+1, newHeight:mainArray[i+1]});
    animations.push({type:"height", index:high, newHeight:mainArray[high]});
    return i+1;
}
export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    heapSortHelper(auxiliaryArray, animations);
    return animations;
}
function heapSortHelper(mainArray, animations){
    const N = mainArray.length;
    for(let i=Math.floor(N/2)-1;i>=0;i--){
        heapify(mainArray, N, i, animations);
    }
    for(let i=N-1;i>0;i--){
        [mainArray[0],mainArray[i]] = [mainArray[i],mainArray[0]];
        animations.push({type:"height", index:0, newHeight:mainArray[0]});
        animations.push({type:"height", index:i, newHeight:mainArray[i]});
        heapify(mainArray, i, 0, animations);
    }
}
function heapify(mainArray, N, i, animations){
    let largest = i;
    const left = 2*i + 1;
    const right = 2*i + 2;
    if(left<N){
        animations.push({type:"color", indices:[left,largest], color:"red"});
        animations.push({type:"color", indices:[left,largest], color:"rgb(28, 153, 172)"});
        if(mainArray[left]>mainArray[largest]){
            largest = left;
        }
    }
    if(right<N){
        animations.push({type:"color", indices:[right,largest], color:"red"});
        animations.push({type:"color", indices:[right,largest], color:"rgb(28, 153, 172)"});  
        if(mainArray[right]>mainArray[largest]){
            largest = right;
        }
    }
    if(largest!==i){
        [mainArray[i],mainArray[largest]] = [mainArray[largest],mainArray[i]];
        animations.push({type:"height", index:i, newHeight:mainArray[i]});
        animations.push({type:"height", index:largest, newHeight:mainArray[largest]});
        heapify(mainArray, N, largest, animations);
    }
}
export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    insertionSortHelper(auxiliaryArray, animations);
    return animations;
}
function insertionSortHelper(mainArray, animations){
    const N = mainArray.length;
    for(let i=1;i<N;i++){
        let j = i-1;
        const key = mainArray[i];
        animations.push({type:"color", indices:[i], color:"red"});
        while(j>=0 && mainArray[j]>key){
            mainArray[j+1] = mainArray[j];
            animations.push({type:"height", index:j+1, newHeight:mainArray[j+1]});
            j--;
        }
        mainArray[j+1] = key;
        animations.push({type:"height", index:j+1, newHeight:key});
        animations.push({type:"color", indices:[i], color:"rgb(28, 153, 172)"});
    }
}
