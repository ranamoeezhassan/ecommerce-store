import { Stack } from "expo-router";
import { Touchable, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={({navigation}) => ({
            headerShown: false,
            headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black"/>
            </TouchableOpacity>
          })}
      />
    </Stack>
  );
}
