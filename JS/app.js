// STORE CONTROLLER

const StorageCtrl = (function(){
    return{
       
        getItem : function(){
            let items;

            // check if any item in array

            if(localStorage.getItem("items") === null){
                items = [];
            } else {
                // Get the existing data from ls
                items = JSON.parse(localStorage.getItem("items"));
            }

            return items;
        },
        storeItem: function(item){
            let items;

            // CHeck if any items in array

            if(localStorage.getItem("items") === null){
                items = [];

                // Push new item
                items.push(item);
            }else {
                // Get the existing data from ls
                items = JSON.parse(localStorage.getItem("items"));
                 // Push new item
                 items.push(item);
            }

            // SET LS
            localStorage.setItem("items", JSON.stringify(items));
        },
        updateItemLS: function(updatedItem){
          let items = JSON.parse(localStorage.getItem("items"));

          items.forEach(function(item, index){
            if(updatedItem.id === item.id){
                items.splice(index, 1, updatedItem);
            }
          })

           // SET LS
           localStorage.setItem("items", JSON.stringify(items));
        }, 
        deleteItemLs: function(id){
            let items = JSON.parse(localStorage.getItem("items"));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            })

            // SET LS
           localStorage.setItem("items", JSON.stringify(items));
        }
    }
})()





// ITEM CONTROLLER

const ItemCtrl = (function(){
    // ITEM CONSTRUCTOR

    const Item = function(id, name, money){
        this.id = id;
        this.name = name;
        this.money = money;
    }

    // DATA STRUCTURE / STATE
    const data = {
        // items: [
        //     {id: 0, name:"Food", money: 1000},
        //     {id: 1, name:"Transport", money: 3000},
        //     {id: 2, name:"Clothes", money: 500},
        // ],
        items: StorageCtrl.getItem(),
        currentItem: null,
        totalMoney: 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, money){
          let ID;

            //   Create ID 
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            money = parseInt(money);

            // Create a new Item
            newItem = new Item(ID, name, money);

            // Add to item array
            data.items.push(newItem);

            return newItem;

        },
        getTotalMoney: function(){
            let total = 0;

            if(data.items.length > 0){
                data.items.forEach(function(item){
                   total += item.money;

                   data.totalMoney = total;
                })
                return data.totalMoney;
            } else {
                return data.totalMoney = 0;
            }
        },
        getItemById: function(id){
            let found = null;

            // Loop through the items
            data.items.forEach(function(item){
              if(item.id === id){
                found = item;
              }
            })

            return found;
        },
        setCurrentItem : function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        updateItem: function(name, money){
            
            money = parseInt(money);

            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.money = money;
                    found = item;
                }
            })

            return found;
        },
        deleteItem: function(id){
            const ids = data.items.map(function(item){
                return item.id;
            })

            // Get Index
            const index = ids.indexOf(id);

            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        }
        
    }
})();


// UI CONTROLLER

const UICtrl = (function(){
     return {
        populateItemList: function(items){
          let html = "";

          items.forEach(function(item){
            html += `
            <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong> <em>${item.money}</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                </a>
            </li>`
          });

          document.querySelector(".collection").innerHTML = html;
        },
        clearEditState: function(){
           document.querySelector(".add-btn").style.display = "inline";
           document.querySelector(".update-btn").style.display = "none";
           document.querySelector(".delete-btn").style.display = "none";
           document.querySelector(".back-btn").style.display = "none";
        },
        getItemInput: function(){
            return {
                name: document.querySelector("#item-name").value,
                money: document.querySelector("#item-money").value
            }
        },
        addListItem: function(item){
            
            // Create a li ELement
            const li = document.createElement("li");

            // Add Class to li
            li.className = "collection-item";

            // Add ID
            li.id = `item-${item.id}`;

            // Add HTML
            li.innerHTML = `<strong>${item.name}:</strong> <em>${item.money}$</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil edit-item"></i>
            </a>`;

            // Insert ITem
            document.querySelector(".collection").appendChild(li);

        },
        clearInput: function(){
            document.querySelector("#item-name").value = "";
            document.querySelector("#item-money").value = "";
        },
        showTotalMoney: function(money){
           document.querySelector(".total-money").textContent = money;
        },
        addItemToform: function(){
            document.querySelector("#item-name").value = ItemCtrl.getCurrentItem().name;
            document.querySelector("#item-money").value = ItemCtrl.getCurrentItem().money;
        },
        showEditState: function(){
            document.querySelector(".add-btn").style.display = "none";
            document.querySelector(".update-btn").style.display = "inline";
            document.querySelector(".delete-btn").style.display = "inline";
            document.querySelector(".back-btn").style.display = "inline";
        },
        updateListItem: function(item){
          const listItems = document.querySelectorAll(".collection-item");

          listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute("id");

            if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `
                <strong>${item.name}:</strong> <em>${item.money}$</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                </a>`
            }
          })
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearAllItems: function(){
            let listItems = document.querySelectorAll(".collection-item");

            listItems.forEach(function(item){
                item.remove();
            })

            localStorage.removeItem("items");
        }
     }
})()


// APP CONTROLLER

const App = (function(ItemCtrl, UICtrl, StorageCtrl){


    const loadEventListeners = function(){
        
        // Add item event
        document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);

        // Edit Item Event
        document.querySelector(".collection").addEventListener("click", itemEditClick);

        // Update item submit
        document.querySelector(".update-btn").addEventListener("click", itemUpdateSubmit);

        // Delete item event
        document.querySelector(".delete-btn").addEventListener("click", itemDeleteSubmit);

        // Back button event
        document.querySelector(".back-btn").addEventListener("click", function(e){
            e.preventDefault();
            UICtrl.clearEditState();
            UICtrl.clearInput();
        })

        // Clear items event
        document.querySelector(".clear-btn").addEventListener("click", clearAllItemsClick)

    }

    function itemAddSubmit(e){
        e.preventDefault();

        // Get from inout from ui controller

        const input = UICtrl.getItemInput();

        if(input.name === "" || input.money === ""){
          alert("Please fill the fields")
        } else {
             // Add Item
             const newItem = ItemCtrl.addItem(input.name, input.money);

             // Add Item to UI List
             UICtrl.addListItem(newItem);

            //  Get Input Money
            const totalMoney = ItemCtrl.getTotalMoney();

            // Update money to ui
            UICtrl.showTotalMoney(totalMoney);

            StorageCtrl.storeItem(newItem);

             // Clear Input 
             UICtrl.clearInput();

             document.querySelector(".no-item").style.display = "none";
        }
    }


    const itemEditClick = function(e){
        
        if(e.target.classList.contains("edit-item")){
            const listId = e.target.parentElement.parentElement.id;

            // Break into an array
            const listArr = listId.split("-");

            // Get the actual ID
            const id = parseInt(listArr[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set Current Item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToform();

            UICtrl.showEditState();
        }
     
    }

    const itemUpdateSubmit = function(e){
        e.preventDefault();
        
        // Get item input
        const input = UICtrl.getItemInput();

        // Update Item
        const updateItem = ItemCtrl.updateItem(input.name, input.money);

        // Update UI
        UICtrl.updateListItem(updateItem);

         //  Get Input Money
         const totalMoney = ItemCtrl.getTotalMoney();

        // Update money to ui
        UICtrl.showTotalMoney(totalMoney);

        StorageCtrl.updateItemLS(updateItem);

        UICtrl.clearEditState();
        // Clear Input 
        UICtrl.clearInput();

        
    }


    const itemDeleteSubmit = function(e){
        e.preventDefault();

        // Get Current Item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from ui
        UICtrl.deleteListItem(currentItem.id);

        // DELETE FROM LS
        StorageCtrl.deleteItemLs(currentItem.id);

        //  Get Input Money
        const totalMoney = ItemCtrl.getTotalMoney();

        // Update money to ui
        UICtrl.showTotalMoney(totalMoney);

        UICtrl.clearEditState();
        // Clear Input 
        UICtrl.clearInput();
        
        if(ItemCtrl.getItems().length === 0){
            document.querySelector(".no-item").style.display = "block";
        }
    }


    const clearAllItemsClick = function(e){
        e.preventDefault();

        ItemCtrl.clearAllItems();

        UICtrl.clearAllItems();

        //  Get Input Money
        const totalMoney = ItemCtrl.getTotalMoney();

        // Update money to ui
        UICtrl.showTotalMoney(totalMoney);

        document.querySelector(".no-item").style.display = "block";
    }

    return {
        init:function(){

            UICtrl.clearEditState();

            const items = ItemCtrl.getItems();

            if(items.length > 0){
                UICtrl.populateItemList(items);
                //  Get Input Money
                const totalMoney = ItemCtrl.getTotalMoney();

                // Update money to ui
                UICtrl.showTotalMoney(totalMoney);
                document.querySelector(".no-item").style.display = "none";
            } else{
                document.querySelector(".no-item").style.display = "block";
            }

            loadEventListeners();
           
        }
    }
})(ItemCtrl, UICtrl, StorageCtrl)

App.init();
























// const primary = (function(){
//   var firstName = "Jagan";
  
//   return {firstName};
// })()

// const secondary = (function(){
//   var firstName = "Javid";
//   return {firstName};
// })()

// console.log(primary.firstName);
// console.log(secondary.firstName);