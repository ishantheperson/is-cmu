let inputFile = JSON.parse(JSON.stringify(require('./CourseDescriptionsFall.json')));


for(let course in inputFile.courses)
{
  let count = 0;

  for(let lec in inputFile.courses[course].lectures)
  {
    count++;
  }
 
  //console.log(inputFile.courses[course]);

  if(count > 5)
  {
    console.log(course);
    console.log(inputFile.courses[course]);
  }

}


/*for(let course of inputFile["courses"])
{
  console.log(course["lectures"])
}*/