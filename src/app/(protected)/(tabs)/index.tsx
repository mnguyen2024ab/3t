import { View, FlatList, Dimensions, ViewToken, StyleSheet } from 'react-native';
import PostListItem from '@components/PostListItem';
import posts from '@assets/data/posts.json';
import {useMemo, useRef, useState} from "react";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import FeedTab from "@components/GenericComponents/FeedTab";

const TABS ={
    EXPLORER: 'Explorer',
    FOLLOWING: 'Following',
    FOR_YOU: 'For You'
};

export default function HomeScreen() {
    const { height } = Dimensions.get('window');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(TABS.FOR_YOU);

    const handleSetActiveTab = (newTab: string) => {
        setActiveTab(newTab);
        setCurrentIndex(0);
    };

    const filteredPosts = useMemo(() => {
        if (activeTab === TABS.FOR_YOU) {
            return posts;
        }
        if (activeTab === TABS.FOLLOWING) {
            // Placeholder: filter posts by following users (assuming there's a property for this, or just return empty for now)
            return posts.filter(post => post.user.username === 'danho'); // Example filtering
        }
        return posts;
    }, [activeTab]);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 ) {
            setCurrentIndex(viewableItems[0]?.index || 0)
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBar}>
                <MaterialIcons name="live-tv" size={24} color="white" />
                <View style={styles.navigationBar}>
                    <FeedTab title={TABS.FOR_YOU} setActiveTab={handleSetActiveTab} activeTab={activeTab} />
                    <FeedTab title={TABS.EXPLORER} setActiveTab={handleSetActiveTab} activeTab={activeTab} />
                    <FeedTab title={TABS.FOLLOWING} setActiveTab={handleSetActiveTab} activeTab={activeTab} />
                </View>
                <Ionicons name="search" size={24} color="white" />
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={({ item, index }) => {
                    return (
                        <PostListItem
                            postItem={item}
                            isActive={index === currentIndex}


                        />
                    );
                }}
                showsVerticalScrollIndicator={false}
                snapToInterval={height - 80}
                decelerationRate={"fast"}
                disableIntervalMomentum
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    navigationBar: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        gap: 30
    },
    topBar: {
        flexDirection: 'row',
        position: 'absolute',
        top: 70,
        zIndex: 1,
        paddingHorizontal: 15

    }
})