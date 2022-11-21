let soma = 0;
let somaTotal = 0;
let quantSoma = 0;

let body = document.querySelector("body");
let main = document.querySelector("main");

let divProdutos = document.querySelector(".itens__produto");
divProdutos.id = `produtos_listar`;
main.appendChild(divProdutos);

let ul = document.createElement("ul");
ul.id = "itens__produto__ul";
divProdutos.appendChild(ul);

function separarItens(lista) {
  for (let i = 0; i < lista.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    let src = document.createElement("src");
    let h3 = document.createElement("h3");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let button = document.createElement("button");

    button.classList.add("botaoProduto");
    button.id = `prod_` + lista[i].id;
    li.id = "listaProduto";

    img.src = lista[i].img;
    h3.innerText = lista[i].tag;
    h1.innerText = lista[i].nameItem;
    p.innerText = lista[i].description;
    span.innerText = `R$ ${lista[i].value.toFixed(2)}`;
    button.innerText = lista[i].addCart;

    ul.appendChild(li);
    li.appendChild(img);
    img.appendChild(src);
    li.appendChild(h3);
    li.appendChild(h1);
    li.appendChild(p);
    li.appendChild(span);
    li.appendChild(button);

    soma += lista[i];
  }
}
separarItens(data);

let aside = document.querySelector("aside");
main.appendChild(aside);

let botoesProduto = document.querySelectorAll(".botaoProduto");

function btnProdutoadd() {
  for (let i = 0; i < botoesProduto.length; i++) {
    let botao = botoesProduto[i];
    botao.addEventListener("click", function (e) {
      let idProduto = e.target.id;
      let id = parseInt(idProduto.substring(5));
      quantSoma++;
      document.querySelector("#quantidadeTotal").innerHTML = `${quantSoma}`;
      let produto = capturaProduto(id);
      // console.log(produto.value);
      let valor = produto.value;
      somaTotal += valor;
      document.querySelector("#valorTotal").innerHTML = `R$ ${somaTotal.toFixed(
        2
      )}`;

      let carrinhoADD = addCarrinho(produto);
      let divCarrinho = document.querySelector("#carrinhoProdutos");
      divCarrinho.appendChild(carrinhoADD);
      mostrarBoxValor();
      hiddenBoxVazio();
    });
  }
}
btnProdutoadd();

function capturaProduto(id) {
  for (let i = 0; i < data.length; i++) {
    let produto = data[i];
    if (produto.id === id) {
      return produto;
    }
  }
  return `Produto não Encontrado`;
}

//

// function whatAmount() {
//   let amountHtml = document.querySelector("#quantProd");
//   console.log(amountHtml);
//   // let amount = Number(amountHtml.innerText);
//   // return amount;
// }

// function ProdBox(produto) {
//   let campoQuant = document.getElementById(`#quantProd${produto.id}`);
//   let quant = Number(campoQuant.innerText);
//   console.log(quant);
//   return quant;
// }

// function somaProdBox(produto) {
//   let campoQuant = document.getElementById(`#quantProd${produto.id}`);
//   campoQuant.innerText = `${ProdBox(produto) + 1}`;
// }

// function subtraiProdBox(produto) {
//   let campoQuant = document.getElementById(`#quantProd${produto.id}`);
//   campoQuant.innerText = `${ProdBox(produto) - 1}`;
// }

//

function addCarrinho(produto) {
  let divCarBox = document.createElement("div");
  let divImg = document.createElement("div");
  let img = document.createElement("img");
  let src = document.createElement("src");
  let divInfo = document.createElement("div");
  let h1 = document.createElement("h1");
  let quant = document.createElement("span");
  let span = document.createElement("span");
  let button = document.createElement("button");

  divCarBox.classList.add("carrinho__box");
  divImg.classList.add("carrinho__lista");
  divInfo.classList.add("carrinho__info");
  button.classList.add("botaoProduto");
  quant.classList.add("carrinho_Produto");

  divCarBox.id = `idBox_` + produto.id;
  button.id = `box_` + produto.id;
  quant.id = `quant_Produto`;

  img.src = produto.img;
  h1.innerText = produto.nameItem;
  quant.innerText = `1`;
  span.innerText = `R$ ${produto.value.toFixed(2)}`;
  button.innerText = `Remover`;

  button.addEventListener(`click`, function (e) {
    let div = document.querySelector("#idBox_" + produto.id);
    div.remove();
    quantSoma--;
    hiddenBoxValor();
    hiddenBox();
    document.querySelector("#quantidadeTotal").innerHTML = `${quantSoma}`;
    let valor = produto.value;
    somaTotal -= valor;
    document.querySelector("#valorTotal").innerHTML = `R$ ${somaTotal.toFixed(
      2
    )}`;
  });

  divCarBox.appendChild(divImg);
  divCarBox.appendChild(divInfo);

  divImg.appendChild(img);
  img.appendChild(src);

  divInfo.appendChild(h1);
  divInfo.appendChild(span);
  divInfo.appendChild(quant);
  divInfo.appendChild(button);
  return divCarBox;
}

function hiddenBoxVazio() {
  let carrinhoVazio = document.querySelector("#carrinho__produtos_h3");
  carrinhoVazio.classList.replace(
    "carrinho__produtos__h3",
    "carrinho__produtos__hidden"
  );
}

function hiddenBox() {
  let carrinhoVazio = document.querySelector("#carrinho__produtos_h3");
  if (quantSoma == 0) {
    carrinhoVazio.classList.replace(
      "carrinho__produtos__hidden",
      "carrinho__produtos__h3"
    );
  }
}

function hiddenBoxValor() {
  let hiddenValor = document.querySelector("#carrinho_valor");
  let btnFinalizar = document.querySelector("#carrinho__Btn");
  let isClassPresent = hiddenValor.classList.contains("carrinho__valor");
  if (isClassPresent && quantSoma == 0) {
    hiddenValor.className = "carrinho__valor_hidden";
    btnFinalizar.setAttribute("hidden", "false");
  }
}

function mostrarBoxValor() {
  let hiddenValor = document.querySelector("#carrinho_valor");
  let btnFinalizar = document.querySelector("#carrinho__Btn");
  let isClassPresent = hiddenValor.classList.contains("carrinho__valor_hidden");

  if (isClassPresent && quantSoma >= 0) {
    hiddenValor.className = "carrinho__valor";
    btnFinalizar.removeAttribute("hidden", "true");
  }
}

// function searchBox() {
//   let pesquisaBox = document.getElementById("pesquisaBox");
//   let pesquisaBtn = document.getElementById("pesquisaBtn");

//   console.log(pesquisaBox);
//   console.log(pesquisaBtn);
// }

// searchBox();

function makeSearchBar() {
  let input = document.getElementById("pesquisaBox");
  let btn = document.getElementById("pesquisaBtn");

  console.log(input);
  console.log(btn);

  function search(event) {
    let matches = data.filter((prod) =>
      prod.nameItem.toLowerCase().includes(input.value.toLowerCase())
    );
    makeVitrine(matches);
  }

  btn.addEventListener("click", search);
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      btn.click();
    }
  });
}

makeSearchBar();
