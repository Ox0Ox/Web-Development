let obj = {
    ae: 1,
    be: "Harry"
}

console.log(obj)

let animal = {
    eats: true
};

let rabbit = {
    jumps: true
};

rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

class Animal{
    constructor(name){
        this.name = name
        console.log("Object is created...")
    }

    eats(){
        console.log("Animal is eating")
    }
    jumps(){
        console.log("Animal is jumping")
    }
}


class Lion extends Animal {
    constructor(name){
        super(name) 
        console.log("Object is created which is a lion...")
    }

    eats(){
        super.eats()
        console.log("Lion is eating")
    }
}

let at = new Animal("Bunny");
console.log(at)
console.log(at.eats());
console.log(at.name);



let l = new Lion("Simba")
console.log(l)
console.log(l.jumps())



class User {

    constructor(name) {
      // invokes the setter
      this.name = name;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (value.length < 4) {
        console.log("Name is too short.");
        return;
      }
      this._name = value;
    }
  
  }
  
  let user = new User("John");
  console.log(user.name); // John
  
  user.name = "Harry" // Name is too short.
  console.log(user.name)