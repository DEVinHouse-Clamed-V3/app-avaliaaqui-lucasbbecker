import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Product {
    id: string;
    name: string;
    price: string;
    brand: string;
    description: string;
    image: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        setTimeout(() => {
            fetch('http://10.0.0.100:3000/products')
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                    setLoading(false);
                });
        }, 1000);
    }, []);

    const handleEvaluate = (productId: string) => {
        navigation.navigate('EvaluationScreen', { productId });
    };

    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.row}>
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="contain"
            />
            <View style={styles.productContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>Marca: {item.brand}</Text>
                <Text style={[styles.productDescription, styles.textAlign]} numberOfLines={2} ellipsizeMode="tail">
                    {item.description}
                </Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.button} onPress={() => handleEvaluate(item.id)}>
                    <Text style={styles.textButton}>Avaliar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" /> // Mostra o ícone de carregamento
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    row: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 8,
    },
    productContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productBrand: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    textAlign: {
        flexShrink: 1, 
    },
    button: {
        backgroundColor: '#000',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Products;
