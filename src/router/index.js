import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from "../pages/LoginForm";
<<<<<<< HEAD

const stack = createNativeStackNavigator();
=======
import Home from "../pages/Home";
import DetailAddKaryawan from "../pages/DetailAddKaryawan";
import DetailEditKaryawan from "../pages/DetailEditKaryawan";

const Stack = createNativeStackNavigator();
>>>>>>> d4f8949 (init commit)

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerShown: false }}/>
<<<<<<< HEAD
=======
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="DetailAddKaryawan" component={DetailAddKaryawan} options={{ headerShown: false }}/>
            <Stack.Screen name="DetailEditKaryawan" component={DetailEditKaryawan} options={{ headerShown: false }}/>
>>>>>>> d4f8949 (init commit)
        </Stack.Navigator>
    )
}

export default Router
