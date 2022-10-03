export const productConstructor = (prodName, prodPhoto, prodDescription) => {
    return {
        cardTitle: prodName,
        cardImage: prodPhoto,
        cardDesc: prodDescription,
        cardPrice: (Math.random()*10).toFixed(2),
        get quantity() {
            return this._quantity;
        },
        set quantity(value){
            this._quantity = value;
        },
        sellOne: function(evt){
            console.log("one sold");
          
            if(this.quantity > 0){
                this.quantity -= 1; 
                evt.target.textContent = `Buy one of ${this.quantity}`;  
            }
            else{
                evt.target.classList.add('disabled');
                alert("Sorry, product is not available.");
            }
        },
        populate: function() {
            this.quantity = Number((Math.random()*10).toFixed());
            this.sellOne = this.sellOne.bind(this);
        }
    }
};
