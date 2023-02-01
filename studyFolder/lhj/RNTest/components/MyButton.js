import React from "react";
import { TouchableOpacity, Text } from "react-native";

const MyButton = props => {
    console.log(props)
    return(
        <TouchableOpacity
        style={{
            backgroundColor: '#3498db',
            padding: 16,
            margin: 10,
            borderRadius: 8,
        }}
        onPress={() => alert('click')}>
            <Text style={{color: 'white', fontSize: 24}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default MyButton