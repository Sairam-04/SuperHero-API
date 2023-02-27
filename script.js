const SUPERHERO_TOKEN = '895642424889720'
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const getNewHeroBtn = document.getElementById('newHeroButton')
const heroImageDiv = document.getElementById('heroImage')
const heroInput = document.getElementById('heroInput')
const searchBtn = document.getElementById('searchButton')
const heroNameDiv = document.getElementById('heroName')

const getSuperHero = (id,name) =>{
    // name : base_url/search/name
    // id :  base_url/id
    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => showSuperHeroInfo(json))
}


const showSuperHeroInfo = (character) =>{

    const heroName = `<h2>${character.name}</h2>`
    heroNameDiv.innerHTML = heroName;
    //character.powerstats -> object
    const stats = Object.keys(character.powerstats).map(stat =>{
       return `<p>${stat.toUpperCase()} : ${character.powerstats[stat]}</p>`
    }).join('')

    heroImageDiv.innerHTML = `<img src="${character.image.url}" height=200 width=200/>${stats}`
}

const getSearchSuperHero = (name) =>{
    fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
        const hero = json.results[0]
        showSuperHeroInfo(hero)
    })

}

const getRandomId = () =>{
    return Math.ceil(Math.random() * 731)
}

getNewHeroBtn.onclick = () => getSuperHero(getRandomId())
searchBtn.onclick = () => {
    getSearchSuperHero(heroInput.value);
}


