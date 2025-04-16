"use strict";
class Words {
    constructor() {
        this.d = [];
    }
    delete(idx) {
        this.d.splice(idx, 1);
    }
}
class Drawer extends Words {
    read(count) {
        return this.d[count];
    }
    write(data) {
        this.d.push(data);
    }
}
const box = new Drawer();
box.write('apple');
box.write('orange');
box.write('banana');
box.write('pear');
console.log(box.d);
box.delete(1);
console.log(box.d);
