import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import {useEffect, useRef, useState} from "react";
import * as Linking from 'expo-linking';
import {Ionicons} from "@expo/vector-icons";
import { router } from 'expo-router';


export default function NewPostScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const cameraRef = useRef<CameraView>(null)
    const [micPermission, requestMicPermission] = useMicrophonePermissions();

    useEffect(() => {
        (async () => {
            if (permission && !permission.granted && permission.canAskAgain) {
                await requestPermission();
            }

            if (micPermission && !micPermission.granted && micPermission.canAskAgain) {
                await requestMicPermission();
            }
        })();
    }, [permission, micPermission])


    if (!permission || !micPermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if ((permission && !permission.granted && !permission.canAskAgain) || (micPermission && !micPermission.granted && !micPermission.canAskAgain)) {
           return (
               <View style={styles.permissionContainer}>
                 <Text style={styles.permissionText}>We need your permission to use the camera and microphone</Text>
                   <Button title='Grant Permission' onPress={() => Linking.openSettings()}/>
               </View>
           )
       }
       const toggleCameraFacing = () => setFacing(facing === 'back' ? 'front' : 'back');

       const selectFromGallery = () => {

       }

    const stopRecording = () => {
        setIsRecording(false);
        cameraRef.current?.stopRecording();
    };

    const startRecording = async () => {
        setIsRecording(true);
        const recordedVideo = await cameraRef.current?.recordAsync();
        if (recordedVideo?.uri) {
            const uri = recordedVideo.uri

        }
    };
    return (
        <View style={{flex: 1}}>
            <CameraView ref={cameraRef} style={{flex: 1}} facing={facing}/>
              <View style={styles.tobBar}>
                  <Ionicons name="close" size={40} color="white" onPress={() => router.back()} />
              </View>
                    <View style={styles.bottomControls}>
                        <Ionicons name="images" size={40} color="white" onPress={selectFromGallery} />

                        <TouchableOpacity
                            style={[
                                styles.recordButton,
                                isRecording && styles.recordingButton,
                            ]}
                            onPress={isRecording ? stopRecording : startRecording}
                        />

                        <Ionicons name="camera-reverse" size={40} color="white" onPress={toggleCameraFacing} />
                    </View>
        </View>
    )
}

const styles = StyleSheet.create({
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    permissionText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    recordButton: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 40
    },
    recordingButton: {
        backgroundColor: '#F44336'
    },
    tobBar: {
        position: 'absolute',
        top: 55,
        left: 15
    },
    bottomControls: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: '100%'
    },
});