const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

//Primeira coisa é saber onde buscar/fazer uma requisição para obter os posts e para buscar esses postes precisamos saber para qual URL vai fazer essa requisição
//*declarando uma variável que vai armazenar qual pagina vamos buscar. a principio recebe a primeira pagina
let page = 1

//*Função que vai buscar esses postes e essa função vai ser async
const getPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=1`)
  return response.json()
}
// FETCH => Metodo FETCH versão moderna para fazer requisição ajax no browser
// o FETCH ao ser invocado faz uma requisição http e traz os dados da url que é especificada como argumento
// AJAX => Esse tema representa a possibilidade do codigo javascript que a gente escreve fazer requsições assíncronas para que dados sejam obtidos sem que a pagina precise ser recarregada 

const addPostsIntoDom = async () => {
  const posts = await getPosts()
  const postsTemplate = posts.map(({ id, title, body }) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
         <h2 class="post-title">${title}</h2>
         <p class="post-body">${body}</p>
      </div>
    </div>
  `).join('')

  postsContainer.innerHTML += postsTemplate
}

addPostsIntoDom()

//PROPRIEDADES SCROLL
//=> SCROLLTOP se fizer um scroll na pagina verificamos alguns numeros no console e esse numeros representam os pixels de distancia entre o topo e o topo visivel do documento
//=> SCROLLHEIGHT dando um sroll na pagina mostra o tamanho em pixels da altura total desse documento  incluindo as partes não visiveis dele 
//=> CLIENTHEIGHT o valor exibido no console representa um pixels a altura entre o topo e o final da parte visivel da pagina

const getNextPosts = () => {
  page++
  addPostsIntoDom()
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getNextPosts()
  }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoader()
}

window.addEventListener('scroll', () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottmAlmostReached = scrollTop + clientHeight >= scrollHeight - 10

  if (isPageBottmAlmostReached) {
    showLoader()
  }
})

// FILTRAGEM DE POSTS 

filterInput.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach(post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()

    if (postTitle.includes(inputValue) || postBody.includes(inputValue)) {
      post.style.display = 'flex'
      return
    }

    post.style.display = 'none'

  })
})