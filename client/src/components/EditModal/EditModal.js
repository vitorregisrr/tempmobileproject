import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import axios from '../../../axios.instance';
import * as ImagePicker from 'expo-image-picker';

import {
    Modal,
    Portal,
    Text,
    Button,
    Provider,
    Colors,
    TextInput
} from 'react-native-paper';

const EditModal = props => {

    const [formData,
        setFormData] = useState({
        nome: props.data.nome || '',
        marca: props.data.marca || '',
        modelo: props.data.modelo || '',
        tipo: props.data.tipo || '',
        altura: props.data.altura || '',
        cor: props.data.cor || '',
        foto: props.data.foto || ''
    });

    const [hasError,
        setHasError] = useState(false);

    const [showResult,
        setShowResult] = useState(false);

    const [errorData,
        setErrorData] = useState(false);

    useEffect(() => {
        (async() => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [
                4, 3
            ],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            onInputChange('foto', result.uri)
        }
    };

    const onInputChange = (label, value) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [label]: value
            }
        });
    }

    const editTelevisao = (cd) => {
        axios
            .post('/api/public/edit', {
            id: props.data._id,
            ...formData
        })
            .then(res => {
                setHasError(false);
                setShowResult(true);
                props.updateList();
            })
            .catch(err => {
                setHasError(true);
                setErrorData(err.response.data);
            })
    }

    return (
        <Modal
            visible={true}
            onDismiss={props.hideModal}
            contentContainerStyle={styles.container}>
            <View>
                {/* SUCCESS TEXT */}
                {showResult
                    ? <Text
                            style={{
                            color: Colors.green500
                        }}>
                            Editado com sucesso!
                        </Text>
                    : null}

                {/* ERROR TEXT */}
                {hasError
                    ? <Text
                            style={{
                            color: Colors.red500
                        }}>
                            {errorData.message}
                        </Text>
                    : null}

            </View>
            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('nome', text)}
                    value={formData
                    .nome
                    .toString()}
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Nome"
                    mode="outlined"/>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('marca', text)}
                    value={formData
                    .marca
                    .toString()}
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Marca"
                    mode="outlined"/>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('cor', text)}
                    value={formData
                    .cor
                    .toString()}
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Cor"
                    mode="outlined"/>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('tipo', text)}
                    value={formData
                    .tipo
                    .toString()}
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Tipo"
                    mode="outlined"/>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('modelo', text)}
                    value={formData
                    .modelo
                    .toString()}
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Modelo"
                    mode="outlined"/>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    onChangeText={text => onInputChange('altura', text)}
                    value={formData
                    .altura
                    .toString()}
                    keyboardType="numeric"
                    style={{
                    height: 55,
                    flex: 1,
                    marginBottom: 10
                }}
                    label="Altura"
                    mode="outlined"/>
            </View>

            <View style={styles.fotoContainer}>
                <Button mode="contained" onPress={pickImage}>Escolher foto</Button>
                <Text
                    style={{
                    marginTop: -14,
                    marginLeft: 5,
                    width: 40,
                    height: 50
                }}
                    pointerEvents="none">
                    {formData.foto && <Image
                        source={{
                        uri: formData.foto
                    }}
                        style={{
                        width: 40,
                        height: 40
                    }}/>}
                </Text>
            </View>

            <View style={styles.sendContainer}>
                <Button mode="contained" onPress={editTelevisao}>Editar</Button>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 0,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#fff',
        margin: 40
    },

    colorPrimary: {
        color: 'rgb(98,0,238)'
    },

    colorLight: {
        color: '#a6a6a6'
    },

    formContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    fotoContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    sendContainer: {
        marginVertical: 30
    }
});

export default EditModal;