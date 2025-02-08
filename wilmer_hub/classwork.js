const vowelCount =(string)=>{
    let count=0
    for (let index = 0; index < string.length; index++) {
        const character = string[index].toLowerCase();
        count++
        if (character==='a'||character==='e'||character==='o'||character==='u'){
            count
        }
    }
   return console.log`this is the total count of ${string} is:${count}`;
    
}
vowelCount('abu mercy')