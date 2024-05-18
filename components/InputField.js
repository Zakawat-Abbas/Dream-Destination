// import React from 'react';
// import { View, Text, TouchableOpacity, TextInput } from 'react-native';
// import { COLORS } from '../constants';

// export default function InputField({
//     id,
//     errorText,
//     placeholder,
//     onInputChanged,
//     icon,
//     keyboardType,
//     fieldButtonLabel,
//     fieldButtonFunction
// }) {
//     const onChangeText = (text) => {
//         onInputChanged(id, text)
//     }
//     return (
//         <View
//             style={{
//                 flexDirection: 'row',
//                 borderBottomColor: '#ccc',
//                 borderBottomWidth: 1,
//                 paddingBottom: 8,
//                 marginBottom: 25,
//             }}>
//             {icon}
//             {id == 'password' ? (
//                 <TextInput
//                     id={id}
//                     onChangeText={onChangeText}
//                     errorText={errorText}
//                     placeholder={placeholder}
//                     keyboardType={keyboardType}
//                     style={{ flex: 1, paddingVertical: 0 }}
//                     autoCapitalize='none'
//                     secureTextEntry={true}
//                 />
//             ) : (
//                 <TextInput
//                     id={id}
//                     onChangeText={onChangeText}
//                     placeholder={placeholder}
//                     errorText={errorText}
//                     keyboardType={keyboardType}
//                     style={{ flex: 1, paddingVertical: 0 }}

//                 />
//             )}
//             <TouchableOpacity onPress={fieldButtonFunction}>
//                 <Text style={{ color: COLORS.primary, fontWeight: '700' }}>{fieldButtonLabel}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants';

const InputField = ({
    id,
    onInputChanged,
    placeholder,
    keyboardType,
    icon,
    secureTextEntry,
    fieldButtonLabel,
    fieldButtonFunction
}) => {
    const onChangeText = (text) => {
        onInputChanged(id, text);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 8, marginBottom: 25 }}>
            {icon}
            <TextInput
                id={id}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={{ flex: 1, paddingVertical: 0 }}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
            />
            {fieldButtonLabel && (
                <TouchableOpacity onPress={fieldButtonFunction}>
                    <Text style={{ color: COLORS.primary, fontWeight: '700' }}>{fieldButtonLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default InputField;
