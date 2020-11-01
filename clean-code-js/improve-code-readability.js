/*
    https://github.com/ryanmcdermott/clean-code-javascript    
*/
console.log(`*********************************

    1. Returning early instead of if...else

    Nested conditions are ugly, hard to control, and easy to generate bugs.

*********************************`);

const isBabyPet = (pet, age) => {
    if(pet) {

    } else {

    }
}

console.log(`\n*********************************

    2. Using Array.includes()

    If the collection of pets includes just cat and dog, it’s OK. But what if it has more? 
    Like cat, dog, bird, snake. The list goes on. Of course, you can add more || operator to accomplish the task.     

*********************************`);

const isPet = animal => {
    if(animal === 'cat' || animal === 'dog' || 'snake' || 'bird') {
        return true;
    }

    return false;
}

/**********************************************************/

const isPet_improved = animal => {
    const pets = ['cat', 'dog', 'snake', 'bird'];

    return pets.includes(animal);
}

console.log(`\n*********************************

    4. Using Array.every()

    What if you’re given an array of objects and asked to check whether all the objects have a property equal to some constant?

*********************************`);

const pets = [
    { name: 'cat',   numberOfLegs: 4 },
    { name: 'snake', numberOfLegs: 0 },
    { name: 'dog',   numberOfLegs: 4 },
    { name: 'bird',  numberOfLegs: 2 }
];

console.log(pets.every(pet => pet.numberOfLegs !== 4));
console.log(pets.filter(pet => pet.numberOfLegs !== 4));

console.log(`\n*********************************

    6. Using indexing instead of switch...case

*********************************`);

const getBreeds = pet => {
    switch (pet) {
      case 'dog':
        return ['Husky', 'Poodle', 'Shiba'];
      case 'cat':
        return ['Korat', 'Donskoy'];
      case 'bird':
        return ['Parakeets', 'Canaries'];
      default:
        return [];
    }
};

let dogBreeds = getBreeds('dog');
console.log(dogBreeds);

/**********************************************************/

const breeds = {
    'dog': ['Husky', 'Poodle', 'Shiba'],
    'cat': ['Korat', 'Donskoy'],
    'bird': ['Parakeets', 'Canaries']
}

const getBreeds_improved = pet => {
    return breeds[pet] || [];
};

let catBreeds = getBreeds_improved('cat');
console.log(catBreeds);
