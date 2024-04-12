import { Node } from './Node.js';

export class Queue {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    enqueue(value) {
        let newNode = new Node(value);
        if (this.isEmpty()) {
            this.top = newNode;
        } else {
            let current = this.top;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        let value = this.top.value;
        this.top = this.top.next;
        this.size--;
        return value;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.top.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}
