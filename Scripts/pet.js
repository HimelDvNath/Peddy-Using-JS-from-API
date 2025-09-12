// petCategories
const petCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => loadCategories(data.categories))
    .catch((err) => console.log(err));
};
// fetch all pets
const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((err) => console.log(err));
};

// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
const loadCategories = (pets) => {
  const adoptPetsBtnContainer = document.getElementById("categories-btn");
  for (const pet of pets) {
    const btn = document.createElement("div");

    btn.classList = "btn text-gray-200 rounded-md p-7 md:p-10";
    btn.innerHTML = `
            <button class=" flex gap-5 items-center">
                <img class="h-10 md:h-auto" src=${pet.category_icon}/>
                <h2 class="text-lg md:text-3xl text-black font-bold">${pet.category}</h2>
            </button>
        `;
    adoptPetsBtnContainer.append(btn);
  }
};
// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }

const displayAllPets = (pets) => {
  const petsCardContainer = document.getElementById("pets-cards");

  for (const pet of pets) {
    const birthYear = new Date(pet.date_of_birth).getFullYear();
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-80 shadow-lg p-5">
            <figure class="rounded-xl mb-2">
                <img
                src= ${pet.image}
                alt="Shoes" />
            </figure>
            <div class="">
                
                <h2 class="card-title text-xl mb-2">
                ${pet.pet_name}
                </h2>

                <div class="flex gap-2 mb-1">
                <img class="h-5" src="https://img.icons8.com/?size=48&id=Roa2QOIOdmUA&format=png" />
                <p class="text-md text-gray-500">Breed: ${pet.breed}</p>
                </div>
                
                <div class="flex gap-2 mb-1">
                <img class="h-5" src="https://img.icons8.com/?size=160&id=udduMUcrHmZa&format=png" />
                <p class="text-md text-gray-500">Birth: ${birthYear}</p>
                </div>
                 
                <div class="flex gap-2 mb-1">
                <img class="h-5" src="https://img.icons8.com/?size=48&id=skdvszUmNlnQ&format=png" />
                <p class="text-md text-gray-500">Gender: ${pet.gender}</p>
                </div>
                 
                <div class="flex gap-2 mb-1">
                <img class="h-5" src="https://img.icons8.com/?size=48&id=89392&format=png" />
                <p class="text-md text-gray-500">Price: ${pet.price}</p>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between">
                
                <div onclick="likeBtnClicked('${pet.petId}')" class="btn p-5"><img class="h-8" src="https://img.icons8.com/?size=96&id=U6uSXVbuA1xU&format=png"/></div>
                <div id="adopt-btn" class="btn p-5 text-[#0E7A81] font-extrabold">Adopt</div>
                <div id="details-btn" class="btn p-5 text-[#0E7A81] font-extrabold">Details</div>
                </div>
            </div>
        </div>
    `;
    petsCardContainer.append(card);
  }
};

const chosenPetsContainer = document.getElementById('choosen-pets');
const likeBtnClicked = (petID)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`)
  .then(res=>res.json())
  .then(data=>chosenPet(data.petData))
  .catch(err => console.log(err))
}
const chosenPet = (pet)=>{
  const card = document.createElement('div')
  card.innerHTML = `
    <img class="h-50 w-80 rounded-xl" src=${pet.image} />
  `
  chosenPetsContainer.append(card);
}

document.getElementById('clean-btn').addEventListener('click', ()=>{
  chosenPetsContainer.innerHTML = ""
})

petCategories();
loadAllPets();
