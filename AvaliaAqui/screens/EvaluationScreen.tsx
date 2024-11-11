import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import CustomCheckbox from '../components/CustomCheckbox';
import { useRoute, useNavigation } from '@react-navigation/native';

const EvaluationScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [experience, setExperience] = useState('');
    const [recommend, setRecommend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !feedback || !experience) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        const evaluation = {
            productId,
            name,
            email,
            feedback,
            experience,
            recommend,
        };

        setIsLoading(true);

        setTimeout(async () => {
            try {
                const response = await fetch('http://10.0.0.100:3000/evaluations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(evaluation),
                });

                if (response.ok) {
                    Alert.alert('Sucesso', 'Feedback enviado com sucesso.');
                    navigation.goBack();
                } else {
                    Alert.alert('Erro', 'Falha ao enviar feedback.');
                }
            } catch (error) {
                Alert.alert('Erro', 'Ocorreu um erro ao enviar o feedback.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Nos dê seu Feedback</Text>
                <Text style={styles.subtitleText}>Sua opinião é importante para nós. Por Favor, compartilhe sua experiência.</Text>
            </View>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Text>Feedback:</Text>
            <TextInput
                style={styles.input}
                value={feedback}
                onChangeText={setFeedback}
                multiline
            />
            <Text>Experiência:</Text>
            <View style={styles.experienceContainer}>
                {['Feliz', 'Bom', 'Médio', 'Ruim'].map((exp) => (
                    <TouchableOpacity
                        key={exp}
                        style={[styles.experienceButton, experience === exp && styles.selectedExperienceButton]}
                        onPress={() => setExperience(exp)}
                    >
                        <Text
                            style={[styles.experienceButtonText, experience === exp && styles.selectedExperienceButtonText]}
                        >
                            {exp}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.checkboxContainer}>
                <CustomCheckbox
                    label="Recomendaria para outras pessoas?"
                    isChecked={recommend}
                    onChange={() => setRecommend(!recommend)}
                />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
                {/* Exibe o texto ou o indicador de carregamento, dependendo do estado isLoading */}
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>Enviar Feedback</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    experienceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    experienceButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedExperienceButton: {
        backgroundColor: '#000',
    },
    experienceButtonText: {
        color: 'gray',
    },
    selectedExperienceButtonText: {
        color: '#fff',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    submitButton: {
        backgroundColor: '#000',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 12,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    titleContainer: {
        marginBottom: 12,
        alignItems: 'center',
        padding: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitleText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default EvaluationScreen;
