import { genericTypeAnnotation } from '@babel/types';
import React, { Component, useState } from 'react'
import { Text, StyleSheet, View,  TouchableOpacity, Alert, FlatList, Image } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
    );

export default class DetailKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            karyawan: []
        };
    };

    componentDidMount() {
        this.checkAPI();
    }  

    editKaryawan = () => {
        console.log("masuk edit karyawan");
        this.props.navigation.navigate('DetailEditKaryawan');
    }

    hapusKaryawan = () => {
        Alert.alert('Click Button Hapus Karyawan ');
    }

    checkAPI = () => {

        axios
        .post('http://gmedia.bz/DemoCase/main/list_karyawan', {
            start: 0,
            count: 10,
        }, {
            headers: {
                'Client-Service': `gmedia-recruitment`,
                'Auth-Key': `demo-admin`,
                'User-Id': `1`,
                'Token': `8godoajVqNNOFz21npycK6iofUgFXl1kluEJt/WYFts9C8IZqUOf7rOXCe0m4f9B`
            }
        })
            .then(response => {
            console.log('response metadata : ', response.data.metadata);
            console.log('response status : ', response.data.metadata.status);

            

            if (response.data.metadata.status === 200) {
                const datakaryawan = response.data.response;
                this.setState({
                    karyawan: datakaryawan
                });
                console.log('data karyawan state: ', this.state.karyawan);

            } else {
                console.log(
                    'Peringatan >>>',
                    response.data.metadata,
                );
                Alert.alert(response.data.metadata.message);
            }
        })
        .catch(error => {
            console.log('ERROR CATCH >>>', response.data.metadata.message);
            Alert.alert('Username/Password Salah ');
        });
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Data Karyawan</Text>

                <View style={styles.isi}>
                    <FlatList
                        data={this.state.karyawan}
                        renderItem={({item}) => {
                            return (
                                <View style={styles.flatstyle}>
                                    <View style={{paddingRight: 10}}>
                                        <Icon name="user-o" size={25} color="gray"/>
                                    </View>
                                    <View style={{width: 220}}>
                                        <Text style={{ fontWeight: 'bold'}}>NIP</Text>
                                        <Text>{item.nip}</Text>
                                        <Text style={{ fontWeight: 'bold'}}>Nama</Text>
                                        <Text>{item.nama}</Text>
                                        <Text style={{ fontWeight: 'bold'}}>Alamat</Text>
                                        <Text>{item.alamat}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', width: 70}}>
                                        <Icon style={styles.iconStyle} name="pencil" size={25} color="gray" onPress={()=>this.editKaryawan()} />
                                        <Icon style={styles.iconStyle} name="trash-o" size={25} color="gray" onPress={()=>this.hapusKaryawan()} />
                                    </View>
                                </View>
                                // 
                            );
                        }}
                        keyExtractor={item => item.nip}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {padding: 30},
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    isi: {
        paddingTop: 30
    },
    flatstyle: {
        borderColor: "gray",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 40
    },
    pic: {
        width: 40,
        height: 40
    },
    pic1: {
        width: 20,
        height: 20,
        padding: 10
    },
    
    pic2: {
        width: 20,
        height: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5
    },
    textButton: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    iconStyle: {
        paddingRight: 10
    }
})
