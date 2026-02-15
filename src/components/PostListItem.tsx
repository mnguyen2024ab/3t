import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {useVideoPlayer, VideoView} from "expo-video";
import { Ionicons } from '@expo/vector-icons';
import { Post } from "@/types/types";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


export default function PostListItem({ post, isVisible }: { post: Post, isVisible: boolean }) {
    const { height: windowHeight } = Dimensions.get('window');
    const tabBarHeight = useBottomTabBarHeight();
    const height = windowHeight - tabBarHeight;
    const player = useVideoPlayer(post.video_url, player => {
        player.loop = true;
    });

    useEffect(() => {
        if (!player) return;
        if (isVisible) {
            player.play();
        } else {
            player.pause();
        }
    }, [isVisible, player]);

    useFocusEffect(
        useCallback(() => {
            if (!player) return;
            if (isVisible) {
                player.play();
            }
            return () => {
                player.pause();
            }
        }, [player, isVisible])
    );

    return (
        <View style={{ height }}>
            <VideoView
                style={StyleSheet.absoluteFill}
                player={player}
                nativeControls={false}
            />

            <View style={styles.rightColumn}>
                <TouchableOpacity style={styles.columnItem} onPress={() => console.log('Like Pressed' )}>
                    <Ionicons name="heart" size={33} color="#fff" />
                    <Text style={styles.columnText}>{post.nrOfLikes[0]?.count || 0}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.columnItem} onPress={() => console.log('Comment Pressed' )}>
                    <Ionicons name="chatbubble" size={30} color="#fff" />
                    <Text style={styles.columnText}>{post.nrOfComments[0]?.count || 0}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.columnItem} onPress={() => console.log('Share Pressed')}>
                    <Ionicons name="arrow-redo" size={33} color="#fff" />
                    <Text style={styles.columnText}>{post.nrOfShares[0]?.count || 0}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomColumn}>
                <Text style={styles.username}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rightColumn: {
        position: 'absolute',
        right: 10,
        bottom: 100,
        alignItems: 'center',
    },
    columnItem: {
        marginVertical: 10,
        alignItems: 'center',
    },
    columnText: {
        color: '#fff',
        marginTop: 5,
    },
    bottomColumn: {
        position: 'absolute',
        left: 10,
        bottom: 20,
        right: 100,
    },
    username: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});