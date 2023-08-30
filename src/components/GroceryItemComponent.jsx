import React, { useRef, useState } from 'react';

const GroceryItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newItem, setNewItem] = useState(item.name);
    const [errors, setErrors] = useState("");
    const inputRef = useRef();

    const onEdit = () => {
        if (newItem) {
            handleEditItem(item.id, newItem);
            setIsEditing(false);
            setErrors("");
        }
        else {
            setErrors("Grocery item must not be empty");
            inputRef.current.focus();
        }

    }

    return (
        <>
            <li>
                {
                    isEditing ? (
                        <input
                            ref={inputRef}
                            type='text' value={newItem}
                            onChange={(event) => setNewItem(event.target.value)}
                            placeholder={errors}
                        />
                    )
                        :
                        <span>{item.name}</span>
                }

                <div>
                    <button
                        onClick={() => {
                            isEditing ? onEdit() : setIsEditing(true)
                        }}
                        className='btn-edit'
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className='btn-delete'>Delete</button>
                </div>
            </li>

        </>
    )
}

export default GroceryItemComponent