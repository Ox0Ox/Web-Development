use("CrudDB")

let a = db.Courses.find({Price: "$10"})
console.log(a);

db.Courses.updateOne({Price: "$10"}, {$set:{Price: "$100"}})

let ab = db.Courses.find({Price: "$100"})
console.log(ab);

db.Courses.deleteOne({Price: "$100"})