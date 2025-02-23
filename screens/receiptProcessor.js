// This module handles all user interactions regarding receipts
import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { inventoryManager } from ""; // put in path to stephanie's class
import RNPickerSelect from "react-native-picker-select";

const verifyReceipt = (data) => {
    inventoryManager.addToInventory(data);
}

translateItem = (item) => {
    /*
        ask the user to verify receipt ingredients from OCR
        input will look like ["targe eggs", "safew milk"] 
        the user will see these ingredients on the screen
        - will be able to modify the ingredients
        - for example: change "targe eggs" to "eggs" or "target eggs"
        updated ingredients will be saved as a new list
        if data.length == 0:
        - InventoryManager recognized all of the items on the receipt
        - this is to avoid repeatedly asking for user modification for the same ingredients 
        - no user verification/modification needs to happen 
        else:
        - the list will contain unrecognized items
        - show list to user
        - user will make any modifications to ingredients or quantity
        call addToInventory() in inventory-manager component
        addToInventory() will call verifyReceipt() again if there are still unrecognized ingredients
        @param data: a list of user's receipt input with name/quantity/units
        @output correctData: an updated list of user verified ingredients
    */

    updateInventory(item[0], item[1], item[2], item[3]);

}

const translateItemHelper = (changeName, changeQuantity, unit, category) => {
    var translatedIngredient = {name: changeName, quantity: changeQuantity, unit: unit, category: category};
    return translatedIngredient;
}

const updateInventory = ({ name, quantity, unit, category }) => {

    const [name, onChangeName] = useState(null);
    const [quantity, onChangeQuantity] = useState(null);
    const [unit, setUnit] = useState(null);
    const [category, setCategory] = useState(null);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                "Please verify the name and quantity of the ingredients from your receipt."
            </Text>

            <TextInput
                onChangeText={onChangeName}
                value={name}
                placeholder="Name of Ingredient"
                keyboardType="default"
            />

            <TextInput
                onChangeText={onChangeQuantity}
                value={quantity}
                placeholder="Quantity of Ingredient"
                keyboardType="default"
            />

            { /* add units */ }
            <Text>
                {unit ?
                  `Select the unit of this ingredient` :
                    "Please select a unit"
                }
            </Text>
            <RNPickerSelect
                onValueChange={(unit) => setUnit(unit)}
                items={[
                  
                ]}
            />

            <Text>
                {category ?
                  `Select the category of this ingredient` :
                    "Please select a category"
                }
            </Text>
            <RNPickerSelect
                onValueChange={(category) => setCategory(category)}
                items={[
                  { label: 'Grains', value: 'GRA' },
                  { label: 'Produce', value: 'PRD' },	
                  { label: 'Protein', value: 'PRT' },
                  { label: 'Dairy', value: 'DAI' },
                  { label: 'Beverages', value: 'BEV' },
                  { label: 'Snacks', value: 'SNA' },
                  { label: 'Miscellaneous', value: 'MIS' },
                ]}
            />

            <Button
                title="Done"
                onPress={() => translateItemHelper(onChangeName, onChangeQuantity, unit, category)}
            />

        </View>
    );
};

export default updateInventory;
