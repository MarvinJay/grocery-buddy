import React, { useRef, useState } from 'react';
import { v4 as uuid } from "uuid";
import GroceryItemComponent from './GroceryItemComponent';

const GroceryComponent = () => {
    const [item, setItem] = useState("");
    const [groceryItems, setGroceryItems] = useState([]);
    const [errors, setErrors] = useState("");
    const inputRef = useRef();

    const handleAddItem = () => {
        if (item) {
            setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
            setErrors("");
            setItem("");
        }
        else {
            setErrors("Grocery item cannot be empty");
            inputRef.current.focus();
        }
    }

    const handleEditItem = (id, newItem) => {
        const updatedGroceryItems = groceryItems.map((item) => {
            console.log("item id: " + item.id);
            console.log("passed id: " + id);
            console.log("newItem: " + newItem);
            if (item.id === id) {
                return { id: id, name: newItem };
            }

            return item;
        });

        setGroceryItems(updatedGroceryItems);
    }

    const handleDeleteItem = (removeId) => {
        const filteredItems = groceryItems.filter((item) => { item.id !== removeId });
        setGroceryItems(filteredItems);
    }

    const handleClearItems = () => {
        setGroceryItems([]);
    }

    return (
        <div className="grocery-buddy">
            <h1>Grocery Buddy</h1>
            <div className="input-section">
                <div className="input-container">
                    <input
                        ref={inputRef}
                        type="text" placeholder='Enter an item...'
                        value={item} onChange={(event) => setItem(event.target.value)}
                    />
                    <button onClick={handleAddItem} className='btn-add'>Add Item</button>
                </div>
                <div>{errors ? <p className='errors'>{errors}</p> : null}</div>
            </div>
            <ul className='grocery-list'>
                {
                    groceryItems.map(
                        (item) => <GroceryItemComponent key={item.id}
                            item={item}
                            handleEditItem={handleEditItem}
                            handleDeleteItem={handleDeleteItem}
                        />)}
            </ul>
            {groceryItems.length > 0 ?
                <button onClick={handleClearItems} className='btn-clear'>Clear Grocery Items</button> :
                null
            }
        </div>
    )
}

export default GroceryComponent