import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from '../../../axios.instance';

const Home = () => {

    const [text, setText] = useState('');

    useEffect( () => {
        axios.get('/api/hello')
        .then( res => setText(res.data.express))
        .catch( err => alert(err))
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.colorPrimary}>
                {text}
            </Text>
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
});

export default Home;