export default class Ship {
    constructor(name, marks, owner) {
        this.name = name
        this.marks = marks
        this.length = marks
        this.owner = owner
    }

    hit() {
        this.marks -= 1
    }

    isSink() {
        return this.marks <= 0 ? true : false
    }
}