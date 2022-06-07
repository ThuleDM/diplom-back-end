let priceOrderOpt;
let categoriesOpt;
let itemsPerPageOpt;
let paginationButtons;
let search;
let currentOffset = 0;

document.addEventListener('DOMContentLoaded', function(){
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    categoriesOpt = M.FormSelect.getInstance(document.getElementById('category'));
    priceOrderOpt = document.getElementById('order')
    itemsPerPageOpt = document.getElementById('limit')
    search = document.getElementById('search');

    search.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        findProducts(currentOffset);
      }
    });

    document.querySelector('#find').addEventListener('click', () => {
      findProducts(currentOffset);
    });
    //initial call for products 
    findProducts(currentOffset);
});


// count - загальна к-сть продуктів. к-сть сторінок для пагінації = count/limit. current сторінка - (offset+1)
// limit - к-сть елементів на сторінкі
function rerenderProducts(products, isAuth){
    //todo modify dom
    let productsDiv = document.getElementById('products');
    productsDiv.innerHTML = "";
    for(let index in products){
        const product = products[index];

                  let productHtml =
                  `<div class="col s3">
                    <div class="card hoverable medium sticky-action" >
                      <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator responsive-img"" src="/media/${product.img[0].filename}" alt = "${product.title}">
                      </div>
                      <div class="card-content ">
                        <span class="card-title activator grey-text text-darken-4 truncate">${product.title}<i class="material-icons right">more_vert</i></span>
                        <p class="price">${product.price}</p>
                      </div>
                      <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${product.title}<i class="material-icons right">close</i></span>
                        <p>${product.about}</p>
                      </div>
                      <div class="card-action actions">
                        <a href="/products/${product._id}" target="_blank">Open</a>
                        `
                        
                        if(isAuth){
                        productHtml +=
                        `
                          <form action="/cart/add" method="POST">
                            <input type="hidden" name="id" value="${product._id}">
                            <button type="submit" class="btn btn-primary">Buy</button>
                          </form>
                          `
                        }
                        productHtml +=
                        `
                      </div>
                  </div>
                </div>`
                productsDiv.innerHTML += productHtml;
            }
    }

function renderPagination(count, offset){
  currentOffset = offset;
  let paginationTop = document.getElementById('paginationTop');
  let paginationBottom = document.getElementById('paginationBottom');
  let paginationButtonsCount = count/limit.value;
  paginationTop.innerHTML = "";
  paginationBottom.innerHTML = "";
  for(let i = 0; i<paginationButtonsCount; i++){
    let page;
    if(i == offset){
      page = `
      <li class="waves-effect pagination-button active" ><a id="page-${i}" class="pagination-button">${i+1}</a></li>
    ` 
    }else{
      page = `
      <li class="waves-effect pagination-button" ><a id="page-${i}" class="pagination-button">${i+1}</a></li>
    ` 
    }
    paginationTop.innerHTML += page;
    paginationBottom.innerHTML +=page;
  }
  let liTopRightArrow = document.createElement('li');
  let aTop = document.createElement('a');
  let iTop = document.createElement('i');
  liTopRightArrow.setAttribute('class', 'waves-effect arrowRight');
  aTop.setAttribute('href','#!');
  iTop.setAttribute('class', 'material-icons');
  iTop.textContent = 'chevron_right';
  aTop.appendChild(iTop);
  liTopRightArrow.appendChild(aTop);

  let liTopLeftArrow = document.createElement('li');
  let aTopLeftArrow = document.createElement('a');
  let iTopLeftArrow = document.createElement('i');
  liTopLeftArrow.setAttribute('class', 'waves-effect arrowLeft');
  aTopLeftArrow.setAttribute('href','#!');
  iTopLeftArrow.setAttribute('class', 'material-icons');
  iTopLeftArrow.textContent = 'chevron_left';
  aTopLeftArrow.appendChild(iTopLeftArrow);
  liTopLeftArrow.appendChild(aTopLeftArrow);

  let liBotRightArrow = document.createElement('li');
  let aBot = document.createElement('a');
  let iBot = document.createElement('i');
  liBotRightArrow.setAttribute('class', 'waves-effect arrowRight');
  aBot.setAttribute('href','#!');
  iBot.setAttribute('class', 'material-icons');
  iBot.textContent = 'chevron_right';
  aBot.appendChild(iBot);
  liBotRightArrow.appendChild(aBot);

  let liBotLeftArrow = document.createElement('li');
  let aBotLeftArrow = document.createElement('a');
  let iBotLeftArrow = document.createElement('i');
  liBotLeftArrow.setAttribute('class', 'waves-effect arrowLeft');
  aBotLeftArrow.setAttribute('href','#!');
  iBotLeftArrow.setAttribute('class', 'material-icons');
  iBotLeftArrow.textContent = 'chevron_left';
  aBotLeftArrow.appendChild(iBotLeftArrow);
  liBotLeftArrow.appendChild(aBotLeftArrow);

  paginationTop.lastElementChild.after(liTopRightArrow);
  paginationTop.firstElementChild.before(liTopLeftArrow);
  paginationBottom.lastElementChild.after(liBotRightArrow);
  paginationBottom.firstElementChild.before(liBotLeftArrow);

  arrowsLeft = document.querySelectorAll('.arrowLeft');
  arrowsRight = document.querySelectorAll('.arrowRight');
  arrowsLeft.forEach(arrow => {
    arrow.addEventListener('click', () => {
      if(currentOffset != 0){
        findProducts(currentOffset-1)
      }
    })
  })
  arrowsRight.forEach(arrow => {
    arrow.addEventListener('click', () => {
      if(currentOffset < paginationButtonsCount-1){
        findProducts(parseInt(currentOffset)+1);
      }
    })
  })

  paginationButtons = document.querySelectorAll('.pagination-button');

  for (let i = 0; i < paginationButtons.length; i++) {
    paginationButtons[i].addEventListener('click', (event) => {
      let offset = event.target.id.slice(5);
      findProducts(offset);
    });
  }
}


function findProducts(offset){
    //todo get category value
    //todo get order asc/desc 
    //todo get page number (offset) and page size (limit)
  let categories = categoriesOpt.getSelectedValues();
  console.log(categories);
  let order = priceOrderOpt.options[priceOrderOpt.selectedIndex].value;
  let limit = itemsPerPageOpt.options[itemsPerPageOpt.selectedIndex].value;
  let title = search.value;
  title = title ? title : "";
    // number of products per page
  fetch(`/products/filter?categories=${categories}&&order=${order}&&offset=${offset}&&limit=${limit}&&title=${title}`)
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      let {products, count, isAuth} = data;
      rerenderProducts(products, isAuth);
      renderPagination(count, offset);
  })
  .catch((err) => {
      console.log(err);
      alert(err);
  })
}



        // let productHtml = `
        // <div class="col s3" >
        // <div class="card card-panel hoverable" id="card">
        //   <div class="card-image" >
        //     <img src="${product.img}" alt = "${product.title}">
        //   </div>
        //   <div class="card-content">
        //     <span class="card-title truncate">${product.title}</span>
        //     <p class="price truncate">${product.price}</p>
        //   </div>
        //   <div class="card-action actions">
        //     <a href="/products/${product._id}" target="_blank">Open</a>
        //     `;
        //     if(isAuth){
        //         productHtml +=
        //         `
        //         <form action="/cart/add" method="POST">
        //           <input type="hidden" name="id" value="${product._id}">
        //           <button type="submit" class="btn btn-primary">Buy</button>
        //         </form>

        //           `