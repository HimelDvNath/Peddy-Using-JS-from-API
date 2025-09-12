// petCategories 
const petCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => loadCategories(data.categories))
    .catch(err => console.log(err))
};
// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }
const loadCategories = (pets) =>{
    const adoptPetsBtnContainer = document.getElementById('categories-btn');
    for(const pet of pets){
        const btn = document.createElement('div');
        btn.classList = 'btn text-gray-200 rounded-md p-10'
        btn.innerHTML =  `
            <button class=" flex gap-5 items-center">
                <img src=${pet.category_icon}/>
                <h2 class="text-3xl text-black font-bold">${pet.category}</h2>
            </button>
        `;
        adoptPetsBtnContainer.append(btn);
    }
}
petCategories();