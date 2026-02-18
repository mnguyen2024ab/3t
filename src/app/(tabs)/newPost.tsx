import {View, Text, StyleSheet} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useEffect, useState} from "react";
import * as Linking from 'expo-linking';

export default function NewPostScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
    }, [permission])

    if (permission && !permission.granted && !permission.canAskAgain) {
        return (
            <View>
                <Text >We need your permission to use the camera</Text>

            </View>
    )}}





