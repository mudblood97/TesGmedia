import { genericTypeAnnotation } from '@babel/types';
import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

export default class DetailAddKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            gender: '',
            dateOfBirth: ''
        };
    }

    simpan = () => {
        // if(!this.state.username && !this.state.password){
        //     Alert.alert("Error", "Username dan Password harus diisi")
        // } else {
        //     this.setState({
        //         isLogin: true
        //     })
        // }
        console.log(this.state.name);
        console.log(this.state.address);
        console.log(this.state.gender);
        console.log(this.state.dateOfBirth);
        
        axios
        .post('http://gmedia.bz/DemoCase/main/add_karyawan', {
            nama: this.state.name,
            alamat: this.state.address,
            gender: this.state.gender,
            tgl_lahir: this.state.dateOfBirth,
        }, {
            headers: {
                'Client-Service': `gmedia-recruitment`,
                'Auth-Key': `demo-admin`,
                'User-Id': `1`,
                'Token': `8godoajVqNNOFz21npycK6iofUgFXl1kluEJt/WYFts9C8IZqUOf7rOXCe0m4f9B`
            }
        })
            .then(response => {
            console.log('response data : ', response.data.metadata);
            console.log('response status : ', response.data.metadata.status);

            if (response.data.metadata.status === 200) {
                // console.log('BERHASIL >>>', usernameInput, passwordInput, response);
                // console.log('Masuk if status 200');
                // this.props.navigation.navigate('DetailLaryawan');
                Alert.alert('OK ', response.data.metadata.message);
                this.props.navigation.navigate('Home');

            } else {
                console.log(
                    'Peringatan >>>',
                    response.data.metadata,
                );
                // Alert.alert('Username/Password Salah ', response.data.error.msg);
                Alert.alert(response.data.metadata.message);
            }
        })
        .catch(error => {
            console.log('ERROR CATCH >>>', response.data.metadata.message);
            Alert.alert('Username/Password Salah ');
        });
    }

    render() {
        const { name, address, gender, dateOfBirth } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Detail Data Karyawan</Text>

                <View style={styles.isi}>
                    <View style={styles.wrapperInput}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 18}}>Nama</Text>
                        <TextInput 
                            style={styles.textInputName} 
                            value={name}
                            onChangeText={(name) => this.setState({name})}
                        />
                    </View>

                    <View style={styles.wrapperInput}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 18}}>Alamat</Text>
                        <TextInput 
                            style={styles.textInputAddress} 
                            value={address}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(address) => this.setState({address})}
                        />
                    </View>

                    <View style={styles.wrapperInput}>
                        <Text style={{fontWeight: 'bold', marginBottom: 5, fontSize: 18}}>Jenis Kelamin</Text>
                        <RNPickerSelect useNativeAndroidPickerStyle={false} placeholder={{ label: 'Select a gender...', value: null, }}
                            style={{inputAndroid: {color: 'grey', borderWidth:1, borderColor:'grey', borderRadius:5, width: 200, fontWeight: 'bold'}}}
                            value={gender} onValueChange={(value) => this.setState({ gender: value}) }
                            items={[
                                { label: 'Laki-laki', value: 'L' },
                                { label: 'Perempuan', value: 'P' },
                            ]}
                        />
                    </View>

                    <View style={styles.wrapperInput}>
                        <DatePicker
                            style={{width: '100%'}} date={dateOfBirth} mode="date" placeholder="select date"
                            format="DD-MM-YYYY" confirmBtnText="Confirm" cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderRadius: 5,
                                    fontWeight: 'bold'
                                }
                            }}
                            onDateChange={(date) => {this.setState({dateOfBirth: date})}}
                        />
                    </View>
                    

                    <TouchableOpacity style={styles.button} onPress={() => this.simpan()}>
                        <Text style={styles.textButton}>SIMPAN</Text>
                    </TouchableOpacity>

                    {/* {isLogin &&
                        <Text style={{marginTop: 20}}>
                            Selaman Berhasil Login : {username}
                        </Text>
                    } */}
                    
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
        paddingLeft: 10,
        paddingRight: 10
    },
    wrapperInput: {
        marginTop: 20
    },
    textInputName: {
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey',
        borderRadius: 5,
        height: 40
    },
    textInputAddress: {
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey',
        borderRadius: 5,
        height:100, 
        textAlignVertical: 'top',
    },
    button: {
        marginTop: 50,
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
        width: 85,
        alignSelf: 'center'
    },
    textButton: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    }
})
