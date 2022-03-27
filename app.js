
// argv process creates an array of things typed in command line
const profileDataArgs = process.argv.slice(2, process.argv.length);

console.log(profileDataArgs);


// passing in profileDataArr as parameter, arrow notation doesnt require () for one parameter
const printProfileData = profileDataArr => {
    for (let i=0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }

    console.log('====================');

    // the forEach method is like a for loop, running a function on each item in array
    // this is an even more concise version of the expression we had before
    // we have a function with profileItem parameter, we do not write function because of arrow notation
    // because we are only passing in one parameter, we do not require () around it
    // we are only executing one action, which is to console.log the profileItem
    // thanks to arrow notation, if only one action is executed, we do not need {}
    profileDataArr.forEach(profileItem => console.log(profileItem));
};

// argument is defined earlier as profile data args
printProfileData(profileDataArgs);