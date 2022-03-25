export default class Ship {
    constructor(name, marks) {
        this.name = name
        this.marks = marks
        this.length = marks
    }

    hit() {
        this.marks -= 1
    }

    isSink() {
        return this.marks <= 0 ? true : false
    }
}