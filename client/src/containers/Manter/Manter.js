import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Picker, Platform, Image, Text} from 'react-native';
import axios from '../../../axios.instance';
import {TextInput, Button, Portal, Dialog, Snackbar} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const Manter = () => {
    const [formData,
        setFormData] = useState({
        nome: '',
        tipo: '',
        cor: '',
        marca: '',
        modelo: '',
        altura: '',
        ano: '',
        foto: ''
    });

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

    const [hasAlert,
        setAlert] = useState(false);

    const options = {
        title: 'Selecione a foto',
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };

    const addTelevisao = () => {
        axios
            .post('/api/public/add', {
            nome: formData.nome || '',
            marca: formData.marca || '',
            modelo: formData.modelo || '',
            altura: formData.altura || '',
            cor: formData.cor || '',
            tipo: formData.tipo || '',
            foto: formData.foto || '',
        })
            .then(res => {
                setAlert('Adicionado com sucesso');
                setFormData({
                    nome: '',
                    marca: '',
                    tipo: '',
                    ano: '',
                    modelo: '',
                    cor: '',
                    altura: '',
                    foto: ''
                });
            })
            .catch(err => {
                setAlert(err.response.data.message);
            })
    }

    const onInputChange = (label, value) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [label]: value
            }
        });
    }

    return (
        <View style={styles.container}>

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
                <Text style={{marginTop: -14, marginLeft: 5, width: 40, height: 50}} pointerEvents="none">
                {formData.foto && <Image source={{ uri: formData.foto }} style={{ width: 40, height: 40 }} />}
                </Text>
            </View>

            <View style={styles.sendContainer}>
                <Button mode="contained" onPress={addTelevisao}>Adicionar</Button>
            </View>

            <Snackbar
                visible={hasAlert}
                onDismiss={() => setAlert(false)}
                action={{
                label: 'Ok',
                onPress: () => setAlert(false)
            }}>
                {hasAlert}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
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

export default Manter;