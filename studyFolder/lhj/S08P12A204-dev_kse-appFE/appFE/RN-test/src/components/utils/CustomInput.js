import React from 'react'
import { StyleSheet,TextInput } from "react-native"

const CustomInput = (props) => {
    let template = null
    switch (props.type) {
        case 'textInput':
            template = <TextInput {...props} style={styles.input} />
        //     break
        // case 'textInputRevised':
        //     template = <TextInput {...props} style={styles.input}
        default:
            return template;
    }
    return template
    // return (
    //     <TextInput
    //         value={value}
    //         onChangeText={setValue}
    //         placeholder={placeholder}
    //         style={styles.input}
    //         secureTextEntry={secureTextEntry}
    //     />
    // )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 18,
        alignSelf: 'center',
    }
})

export default CustomInput