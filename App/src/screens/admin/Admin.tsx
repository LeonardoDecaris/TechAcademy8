import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

function Admin() { 
    const [refreshing, setRefreshing] = useState(false);
    
    return (
        <View>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}
                showsVerticalScrollIndicator={false}
            >

            </ScrollView>
        </View>
    );
}

export default Admin;