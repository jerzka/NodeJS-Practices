
export function clone(product) {
    const template = document.getElementsByTagName("template")[0];
    const clone = template.content.cloneNode(true);
    const cardImgClone = clone.querySelector("#cardImg");
    cardImgClone.src = product.cardImage;
    const cardTitleClone = clone.querySelector("#cardTitle");
    cardTitleClone.textContent = product.cardTitle;
    const cardDescClone = clone.querySelector("#cardDesc");
    cardDescClone.textContent = product.cardDesc;
    const cardPriceClone = clone.querySelector("#cardPrice");
    cardPriceClone.textContent = `${product.cardPrice} CAD`;
    const cardOrderBtnClone = clone.querySelector("#cardOrderBtn");
    cardOrderBtnClone.textContent = `Buy one of ${product.quantity}`;
    cardOrderBtnClone.addEventListener('click', product.sellOne);
    return clone;
}

export function create(product) {
    const productCol = document.createElement("div");
    productCol.className = "td col-12 col-md-4 my-5";
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const cardImg = document.createElement('img');
    cardImg.src = product.cardImage;
    cardImg.className = "card-img-top";
    cardImg.alt = "Photo of product"
    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.textContent = product.cardTitle;
    const cardDesc = document.createElement('p');
    cardDesc.className = "card-text";
    cardDesc.textContent = product.cardDesc;
    const cardPrice = document.createElement('p');
    cardPrice.className = "card-text font-weight-bold";
    cardPrice.textContent = `${product.cardPrice} CAD`;
    const cardOrderBtn = document.createElement('a');
    cardOrderBtn.className = "btn btn-primary";
    cardOrderBtn.href = "#productsContainer";
    cardOrderBtn.textContent = `Buy one of ${product.quantity}`;
    cardOrderBtn.addEventListener("click", product.sellOne);

    productCol.appendChild(cardDiv);
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDesc);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardOrderBtn);

    return productCol;
}


export const generateHTML = (product) => {
    return `
            <div class="td col-12 col-md-4 my-5">
                <div class="card">
                    <img id="cardImg" src="${product.cardImage}" class="card-img-top" alt="Photo of product">
                    <div class="card-body">
                        <h5 id="cardTitle" class="card-title">${product.cardTitle}</h5>
                        <p id="cardDesc" class="card-text">${product.cardDesc}</p>
                        <p id="cardPrice" class="card-text font-weight-bold">${product.cardPrice}</p>
                        <a id="cardOrderBtn" href="#productsContainer" title="Click to buy me a coffee" class="btn btn-primary"
                            onclick=${product.sellOne}>Buy one of ${product.quantity}</a>
                    </div
                </div>
            </td>`;
}
/* <div id="productsContainer" class="container">
    <div class=row>
        <div class="td col-12 col-md-4 my-5">
            <div class="card">
                <img id="cardImg" src="Default.png" class="card-img-top" alt="Photo of product">
                <div class="card-body">
                    <h5 id="cardTitle" class="card-title">Card title</h5>
                    <p id="cardDesc" class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p id="cardPrice" class="card-text font-weight-bold">Price</p>
                    <a id="cardOrderBtn" href="#productsContainer" title="Click to buy me a coffee" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </td>
    </div>
</div> */
