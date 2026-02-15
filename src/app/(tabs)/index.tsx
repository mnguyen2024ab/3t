import { View, Text, FlatList, Dimensions, StyleSheet, ViewToken } from 'react-native';
import posts from '../../../assets/data/posts.json';
import PostListItem from '@/components/PostListItem';
import { useState, useRef } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function HomeScreen() {
    const [activePostId, setActivePostId] = useState(posts[0].id);
    const tabBarHeight = useBottomTabBarHeight();
    const { height: windowHeight } = Dimensions.get('window');
    const screenHeight = windowHeight - tabBarHeight;

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
            setActivePostId(viewableItems[0].item.id);
        }
    });

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <PostListItem post={item} isVisible={item.id === activePostId} />
                )}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={screenHeight}
                snapToAlignment="start"
                decelerationRate="fast"
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});