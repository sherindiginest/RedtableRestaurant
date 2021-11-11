import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,Dimensions } from 'react-native';
import { categories } from '../data/dataArrays';


export default class Offer extends React.Component {


    static navigationOptions = {
        title: '',
    };
      constructor(props) {
        super(props);
      }


      renderCategory = ({ item }) => (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressCategory(item)}>
          <View style={{
                        flex: 1,
                        margin: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 215,
                        borderColor: '#cccccc',
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}>
            <Image style={{
                            width: '100%',
                            height: 155,
                            borderRadius: 20,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            shadowColor: 'blue',
                            shadowOffset: {
                            width: 0,
                            height: 3
                            },
                            shadowRadius: 5,
                            shadowOpacity: 1.0,
                            elevation: 3
                        }} source={{ uri: item.photo_url }}
                         />
            <Text style={{
                            flex: 1,
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingTop:'3%',
                            color: 'white',
                            marginTop: 5,
                            backgroundColor:'#ff7f50',
                            opacity:8,
                            width:'100%',
                            height:'70%',
                            borderRadius:75,
                        }}>{'20%  '}{item.name}</Text>
            {/* <Text style={{
                            marginTop: 3,
                            marginBottom: 5
                        }}>{getNumberOfRecipes(item.id)} recipes</Text> */}
          </View>
        </TouchableHighlight>
      );


render(){
    return(
        <View>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
}




}