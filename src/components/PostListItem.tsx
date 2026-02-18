import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/types/types';
import {useFocusEffect} from "expo-router";
import {useCallback} from "react";


type VideoListItemProps = {
    postItem: Post;
    isActive: boolean;
}
export default function PostListItem({ postItem, isActive, shouldRender }:  VideoListItemProps & { shouldRender: boolean }) {
    const { height } = Dimensions.get('window');
    const { nrOfComments, nrOfLikes, nrOfShares, description, user, video_url } = postItem;

    const player = useVideoPlayer(shouldRender ? video_url : null, player => {
        player.loop = true;
    });

    useFocusEffect(
        useCallback(() => {
            if (!player || !shouldRender) return;

            try {
                if (isActive) {
                    player.play()
                } else {
                    player.pause()
                }
            } catch (error) {
                console.log(error);
            }

            return () => {
                try {
                    if (player) {
                        player.pause()
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }, [isActive, player, shouldRender])

    )

    return (
        <View style={{ height: height -80 }}>
            {shouldRender && player ? (
                <VideoView
                    style={{ flex: 1 }}
                    player={player}
                    contentFit="cover"
                    //nativeControls={false}
                />
            ) : (
                <View style={{ flex: 1, backgroundColor: 'black' }} />
            )}

          <View style={styles.interactionBar}>
              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Like Pressed')} >
                 <Ionicons name="heart" size={33} color="#fff" />
                 <Text style={styles.interactionText}>{nrOfLikes[0]?.count || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Comment Pressed')}>
                  <Ionicons name="chatbubble" size={30} color="#fff" />
                  <Text style={styles.interactionText}>{nrOfComments[0]?.count || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Share Pressed')} >
                  <Ionicons name="arrow-redo" size={nrOfShares[0]?.count || 0} color="#fff" />
                  <Text style={styles.interactionText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.avatar} onPress={() => console.log('Profile Pressed')}>
                  <Text style={styles.avatarText}>{user?.username.charAt(0).toUpperCase()}</Text>
              </TouchableOpacity>
          </View>
         <View style={styles.videoInfo}>
           <Text style={styles.username}>{user.username}</Text>
           <Text style={styles.description}>{description}</Text>
         </View>
        </View>
    )
}

const styles = StyleSheet.create({
    interactionBar: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        alignItems: 'center',
        gap: 25
    },
    interactionButton: {
        alignItems: 'center',
        gap: 5
    },
    interactionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600'
    },
    avatar: {
        width: 35,
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    videoInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 100,
        gap: 5
    },
    username: {
        color: '#fffff0',
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        color: '#fff'
    }
});