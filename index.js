class Node {
    constructor(key, value = null, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }
}

class HashMap {
    constructor() {
        this.buckets = new Array(16).fill(null);
        this.capacity = this.buckets.length;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % 16;
    }
}

// if (index < 0 || index >= buckets.length) {
//     throw new Error('Trying to access index out of bound');
// }