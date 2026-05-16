import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const authSchema = zod.object({
  email: zod.email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters long' }).nonempty({ message: 'Password is required' }),
});

export default function Auth() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const signIn = (data: zod.infer<typeof authSchema>) => {
    console.log('Signing in with:', data);
  }

  const signUp = (data: zod.infer<typeof authSchema>) => {
    console.log('Signing up with:', data);
  }

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Please sign in to continue</Text>

        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                editable={!isSubmitting}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />


        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                placeholderTextColor="#aaa"
                autoCorrect={false}
                editable={!isSubmitting}
                secureTextEntry
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit(signIn)} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSubmit(signUp)} disabled={isSubmitting}>
          <Text style={[styles.buttonText, styles.signUpButtonText]}>{isSubmitting ? 'Signing up...' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
}



const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 32,
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '90%',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
  },
  signUpButtonText: {
    color: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'left',
    width: '90%',
  },
});