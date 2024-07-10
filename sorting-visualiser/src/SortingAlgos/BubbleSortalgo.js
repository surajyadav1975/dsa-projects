export function bubbleSortalgo(array){
    const animations=[];
    if (array.length <= 1) return array;
    bubble(array, animations);
    return animations;
}

function bubble(arr,animations) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            animations.push([j,j+1,arr[j],arr[j+1]]);
            animations.push([j,j+1,arr[j],arr[j+1]]);
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}