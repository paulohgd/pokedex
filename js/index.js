const nomePokemon = document.querySelector('.nome-pokemon')
const numeroPokemon = document.querySelector('.numero-pokemon')
const imagemPokemon = document.querySelector('.pokemon-img')
const interrogaçãoPokemon = document.querySelector('.pokemon-interrogação')
const respostaFormulario = document.querySelector('form')
const inputFormulario = document.querySelector('.input-search')
const btnAnterior = document.querySelector('.btn-anterior')
const btnProximo  =  document.querySelector('.btn-proximo')
let buscarIdPokemon = 1

const buscarPokemon = async (pokemon) =>{
    const respostaApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (respostaApi.status === 200){
        const info = await respostaApi.json()
        return info
    }
    
}

const renderPokemon = async (pokemon) =>{
    nomePokemon.innerHTML ="carregando..."
    const info = await buscarPokemon(pokemon)
    if (info){
        nomePokemon.innerHTML = info.name
        numeroPokemon.innerHTML = info.id
        imagemPokemon.src = info['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        imagemPokemon.style.display='block'
        interrogaçãoPokemon.style.display = "none"
        buscarIdPokemon = info.id

    }else{
        nomePokemon.innerHTML ="não encontrado!"
        numeroPokemon.innerHTML = ''
        imagemPokemon.style.display='none'
        interrogaçãoPokemon.style.display = "block"
    }
} 

respostaFormulario.addEventListener('submit',function(event){
    event.preventDefault();
    renderPokemon(inputFormulario.value.toLowerCase())
    inputFormulario.value= ""
})
btnProximo.addEventListener('click',function(){
    buscarIdPokemon+=1
    renderPokemon(buscarIdPokemon)
})
btnAnterior.addEventListener('click',function(){
    if (buscarIdPokemon > 1){
        buscarIdPokemon -=1
        renderPokemon(buscarIdPokemon)
    }else{
        renderPokemon(1)
    }
    
})

renderPokemon(buscarIdPokemon)










