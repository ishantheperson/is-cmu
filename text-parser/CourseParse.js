let inputFiles = [JSON.parse(JSON.stringify(require('./CourseDescriptionsFall.json'))),JSON.parse(JSON.stringify(require('./CourseDescriptionsSpring.json')))];


let fs = require('fs');

let instructors = [];
let names = '';

let courseNames = '';

for(let inputFile of inputFiles)
{
  for(let course in inputFile.courses)
  {
    let courseObject = inputFile.courses[course];
    

    let count = 0;

    for(let lec in courseObject.lectures)
    {
      //console.log(lec);
      for(let instructor in courseObject.lectures[lec].instructors)
      {
        let fullName = courseObject.lectures[lec].instructors[instructor].split(', ');
        let name = fullName[1] + " " + fullName[0];
        if(!instructors.includes(name))
        {
          names += ("\n" + name);
          instructors.push(name);
        }
        
      }
    }

    for(let sec in courseObject.sections)
    {
      count++;
    }
  
    //console.log(inputFile.courses[course]);

    if(count > 5)
    {
      courseNames += ("\n" + course);
      courseNames += ("\n" + course.slice(0,2)+course.slice(3,6));
      courseNames += ("\n" + courseObject.name)
    }

  }
}
fs.appendFile('text-parser/Instructors.txt', names, function (err) {
  if (err) throw err;
}); 

fs.appendFile('text-parser/CourseNames.txt', courseNames, function (err) {
  if (err) throw err;
}); 

/*for(let course of inputFile["courses"])
{
  console.log(course["lectures"])
}*/