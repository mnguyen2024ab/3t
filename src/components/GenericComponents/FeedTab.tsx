import { TouchableOpacity,  View, Text, StyleSheet } from "react-native";
import { useState } from "react";


type FeedTabProps = {
    title: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function FeedTab({ title, activeTab, setActiveTab}: FeedTabProps) {
    const [width, setWidth] = useState(0);
    return (
        <TouchableOpacity
            onPress={() => setActiveTab(title)}
            style={styles.tabContainer}
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
        >
            <Text
                style={[
                    styles.tabText,
                    activeTab === title && styles.activeTabText
                ]}>
                {title}
            </Text>
            {activeTab === title && <View style={[styles.activeDot, { width }]} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        alignItems: 'center'
    },
    tabText: {
        color: 'gray',
        fontSize: 17,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#fff',
    },
    activeDot: {
        height: 2,
        backgroundColor: '#fff',
        marginTop: 4
    }
});