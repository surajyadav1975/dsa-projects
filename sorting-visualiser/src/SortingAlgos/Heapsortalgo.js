export function heapSortAlgo(array) {
    const animations = [];
    if (array.length <= 1) return array;

    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        animations.push([0, i]);
        animations.push([0, i]);
        animations.push([0, array[i]]); // Swap
        animations.push([i, array[0]]);
        [array[0], array[i]] = [array[i], array[0]];

        heapify(array, i, 0, animations);
    }

    return animations;
}

function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        animations.push([i, largest]);
        animations.push([i, largest]);
        animations.push([i, array[largest]]);
        animations.push([largest, array[i]]);
        [array[i], array[largest]] = [array[largest], array[i]];

        heapify(array, n, largest, animations);
    }
}
