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
const chosenCategoryPet = async (petCategory) => {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${petCategory}`
  )
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
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
            <button onclick="chosenCategoryPet('${pet.category}')" class=" flex gap-5 items-center">
                <img class="h-10 md:h-auto" src=${pet.category_icon}/>
                <h2 class="text-lg md:text-3xl text-black font-bold">${pet.category}</h2>
            </button>
        `;
    adoptPetsBtnContainer.append(btn);
  }
};

const notAvailablePets = (petsCardContainer) => {
  petsCardContainer.classList.remove("grid");
  const hero = document.createElement("div");
  hero.innerHTML = `
        <div class="hero bg-base-200 flex justify-center items-center mx-auto p-40">
        <div class="hero-content text-center">
        <div class="">
        <div class="flex justify-center items-center"><img class="h-40 w-40 mb-5 " src="images/error.webp"/></div>
          <h1 class="text-5xl font-extrabold">No Information Available</h1>
          <p class="py-6 min-w-md">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>its layout. The point of using Lorem Ipsum is that it has a.
          </p>
        </div>
      </div>
    </div>
  `;
  petsCardContainer.append(hero);
  
};
const displayAllPets = (pets) => {
  const petsCardContainer = document.getElementById("pets-cards");
  petsCardContainer.innerHTML = "";
  if (pets.length == 0) {
    notAvailablePets(petsCardContainer);
    return
  }
  petsCardContainer.classList.add("grid");
  for (const pet of pets) {
    const birthYear = new Date(pet.date_of_birth).getFullYear();
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="card bg-base-100 w-auto  shadow-lg p-5">
            <figure class="mb-2 h-[200px]">
                <img class="rounded-xl"
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
                
                <div onclick="likeBtnClicked('${pet.petId}')" class="btn p-3 lg:p-5"><img class="h-5 md:h-8" src="https://img.icons8.com/?size=96&id=U6uSXVbuA1xU&format=png"/></div>
                <div id="adopt-btn" class="btn p-3 lg:p-5 text-[#0E7A81] font-extrabold">Adopt</div>
                <div onclick="detailsBtnClicked('${pet.petId}')" class="btn p-3 lg:p-5 text-[#0E7A81] font-extrabold">Details</div>
                </div>
            </div>
        </div>
    `;
    petsCardContainer.append(card);
  }
};
const detailsBtnClicked = (petID)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`)
  .then(res => res.json())
  .then(data => displayModal(data.petData))
  .catch(err => console.log(err))
}

const displayModal = (pet)=>{
  const modal = document.getElementById('custom-modal');
  const birthYear = new Date(pet.date_of_birth).getFullYear();
  
  modal.innerHTML = `
    <div class="bg-base-100 p-2 w-full">
          <div class="mb-6">
            <img
              class="shadow-md rounded-lg w-full h-80"
              src=${pet.image}
              alt="" />
          </div>
          <!-- pet details  -->
          <div>
            <h1 class="text-2xl font-extrabold mb-5">pet name</h1>
            <div class="flex gap-25">
              <!-- left div  -->
              <div>
                <div class="flex gap-2 mb-2">
                  <img
                    class="h-5"
                    src="https://img.icons8.com/?size=48&id=Roa2QOIOdmUA&format=png" />
                  <p class="text-md text-gray-500">Breed: ${pet.breed}</p>
                </div>
                <div class="flex gap-2 mb-2">
                  <img
                    class="h-5"
                    src="https://img.icons8.com/?size=48&id=skdvszUmNlnQ&format=png" />
                  <p class="text-md text-gray-500">Gender: ${pet.gender}</p>
                </div>
                <div class="flex gap-2">
                  <img
                    class="h-5"
                    src="https://img.icons8.com/?size=48&id=89392&format=png" />
                  <p class="text-md text-gray-500">
                    Vaccinated status: ${pet.vaccinated_status}
                  </p>
                </div>
              </div>
              <!-- right div  -->
              <div>
                <div class="flex gap-2 mb-2">
                  <img
                    class="h-5"
                    src="https://img.icons8.com/?size=160&id=udduMUcrHmZa&format=png" />
                  <p class="text-md text-gray-500">Birth: ${birthYear}</p>
                </div>
                <div class="flex gap-2 mb-2">
                  <img
                    class="h-5"
                    src="https://img.icons8.com/?size=48&id=89392&format=png" />
                  <p class="text-md text-gray-500">Price: ${pet.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <!-- details information  -->
          <div>
            <h3 class="text-lg font-bold mb-4">Details Information</h3>
            <p class="text-lg text-gray-500 text-justify">
              ${pet.pet_details}
            </p>
            <div class="pl-5">
              <ul class="model-ul">
                <li class="text-gray-500 text-lg">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Perspiciatis, exercitationem.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog" class="w-full">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn w-full font-bold bg-blue-200 text-[#0E7A81]">
              Cancel
            </button>
          </form>
        </div>
  `
  my_modal.showModal()
}
const chosenPetsContainer = document.getElementById("choosen-pets");
const likeBtnClicked = (petID) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petID}`)
    .then((res) => res.json())
    .then((data) => chosenPet(data.petData))
    .catch((err) => console.log(err));
};
const chosenPet = (pet) => {
  const card = document.createElement("div");
  card.innerHTML = `
    <img class="h-50 w-full md:w-80 rounded-xl" src=${pet.image} />
  `;
  chosenPetsContainer.append(card);
};

document.getElementById("clean-btn").addEventListener("click", () => {
  chosenPetsContainer.innerHTML = "";
});

document.getElementById('view-more-btn').addEventListener('click', ()=>{
  document.getElementById("all-pets").scrollIntoView({ behavior: "smooth" });
})
petCategories();
loadAllPets();
