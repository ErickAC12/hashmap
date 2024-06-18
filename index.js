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
        this.stored = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.buckets.length;
    }

    set(key, value) {
        if (this.stored >= this.capacity * this.loadFactor) {
            // To add increaseBuckets function
            this.increaseBuckets();
        }
        const bucket = this.hash(key);
        if (!this.has(key)) {
            const newNode = new Node(key, value);
            if (this.buckets[bucket] === null) {
                this.stored += 1;
                this.buckets[bucket] = newNode;
            } else {
                let current = this.buckets[bucket];
                while (current.nextNode !== null) {
                    current = current.nextNode;
                }
                current.nextNode = newNode;
            }
        } else {
            let current = this.buckets[bucket];
            while (current.key !== key) {
                current = current.nextNode;
            }
            current.value = value;
        }
    }

    get(key) {
        const bucket = this.hash(key);
        let current = this.buckets[bucket];
        while (current !== null && current.key !== key) {
            current = current.nextNode;
        }
        if (current === null) return null;
        return current.key;
    }

    has(key) {
        const bucket = this.hash(key);
        let current = this.buckets[bucket];
        while (current !== null) {
            if (current.key === key) {
                return true;
            }
            current = current.nextNode;
        }
        return false;
    }
}

// if (index < 0 || index >= buckets.length) {
//     throw new Error('Trying to access index out of bound');
// }