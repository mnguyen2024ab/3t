import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '@/types/types';



type VideoListItemProps = {
    postItem: Post
}
export default function PostListItem({ postItem }:  VideoListItemProps) {
    const { height } = Dimensions.get('window');
    const { nrOfComments, nrOfLikes, description, user, video_url } = postItem;

    const player = useVideoPlayer(video_url, player => {
        player.loop = true;
        player.play();
    });

    return (
        <View style={{ height: height -80 }}>
            <VideoView
                style={{ flex: 1 }}
                player={player}
                contentFit="cover"
                nativeControls={false}
            />

          <View style={styles.interactionBar}>
              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Like Pressed')} >
                 <Ionicons name="heart" size={33} color="#fff" />
                 <Text style={styles.interactionText}>{nrOfLikes[0].count || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Comment Pressed')}>
                  <Ionicons name="chatbubble" size={30} color="#fff" />
                  <Text style={styles.interactionText}>{nrOfComments[0].count || 0}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Share Pressed')} >
                  <Ionicons name="arrow-redo" size={33} color="#fff" />
                  <Text style={styles.interactionText}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.avatar} onPress={() => console.log('Profile Pressed')}>
                  <Text style={styles.avatarText}>L</Text>
              </TouchableOpacity>
          </View>
         <View style={styles.videoInfo}>
           <Text style={styles.username}></Text>
           <Text style={styles.description}></Text>
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