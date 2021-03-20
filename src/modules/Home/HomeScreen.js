import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight,ImageBackground, Image,Dimensions,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { recipes } from '../data/dataArrays';
//import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../data/MockDataAPI';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../../modules/Login/Login';
import Signup from '../../modules/Login/Signup';
import { Searchbar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const Tab = createMaterialBottomTabNavigator();

export default class Home extends React.Component {


  constructor(props) {
    super(props);
    
    this.state = {

        search:'',
    };
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:'white',
                    marginLeft: RECIPE_ITEM_MARGIN,
                    marginTop: 20,
                    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
                    height: RECIPE_ITEM_HEIGHT + 50,
                    borderColor: '#cccccc',
                    borderWidth: 0.5,
                    borderRadius: 30
  }}>
        <Image style={{
                    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
                    height: RECIPE_ITEM_HEIGHT -30,
                    borderRadius: 30,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
  }} source={{ uri: item.photo_url }} />
        <Text style={{
                    flex: 1,
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#444444',
                    marginTop: 3,
                    marginRight: 5,
                    marginLeft: 5,
  }}>{item.title}</Text>
        {/* <Text style={{
                    marginTop: 5,
                    marginBottom: 5
                }}>{getCategoryName(item.categoryId)}</Text> */}
                <View style={{
                                                       
                                                       //margin: 9,
                                                       color: 'white',   
                                                       textAlign: 'center',
                                                       //padding: 10,
                                                       height: 20,
                                                       backgroundColor: 'red',
                                                       borderRadius: 100,
                                                      marginTop:'-2%',
                                                      //marginLeft:'-10%',
                                                       width: wp('30%'),


                                                   }}>
                                                       
                                       <TouchableOpacity onPress={() => this.AddCart(this.state.NewProductId)}>
                                       
                                       <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 10 }}>
                                            ADD TO ORDER
                                        </Text>
                                       </TouchableOpacity>
                                       </View>
      </View>
    </TouchableHighlight>
  );
  render() {
    return (
      
      <View style={{backgroundColor:'#ff6347',marginBottom:'12%',height:'100%'}}>
          <View style={{flexDirection:'row'}}>

          
          <View style={{
                            alignContent: 'center',
                            backgroundColor: '',
                            color:'',
                            borderWidth:5,
                            borderRadius:100,
                            borderColor:'#ff6347',
                            width:'90%',
                            marginTop: Platform.OS == 'ios' ? 29 : 0,
                            }}>
                  <Searchbar
                  
                                    round={true}
                                    searchIcon={{ size: 30 }}
                                    onChangeText={text => this.SearchFilterFunction(text)}
                                    onClear={text => this.SearchFilterFunction('')}
                                    placeholder="Search by Item Name..."
                                    value={this.state.search}
                                       
                                
                                    //backgroundColor='red'
                                    //width='50%'
                                />                 
        </View>
        <View style={{paddingTop:'2%'}}>
        <MaterialCommunityIcons   name="tune" color='white' size={35} />
        </View>
        </View>
 
        <View style={{alignContent:'center',justifyContent:'center',alignItems:'center',}}>

        <ScrollView nestedScrollEnabled={true}
        horizontal>
            
    <View style={{
                                                       
                                                       margin: 9,
                                                       color: 'black',   
                                                       textAlign: 'center',
                                                       //padding: 10,
                                                       height: 30,
                                                       backgroundColor: '#1e90ff',
                                                       opacity:7,
                                                       borderRadius: 100,
                                                      marginTop:'2%',
                                                      justifyContent:'space-between',
                                                      //marginLeft:'10%',
                                                       width: wp('35%'),


                                                   }}>
                                                       
                                       <TouchableOpacity onPress={() => this.AddCart(this.state.NewProductId)}>
                                       
                                       <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 10 ,marginTop:'5%',}}>
                                            Category1
                                        </Text>
                                       </TouchableOpacity>
                                       </View>
                                       <View style={{
                                                       
                                                       margin: 9,
                                                       color: 'black',   
                                                       textAlign: 'center',
                                                       //padding: 10,
                                                       height: 30,
                                                       backgroundColor: '#d2691e',
                                                       borderRadius: 100,
                                                      marginTop:'2%',
                                                      //marginLeft:'10%',
                                                       width: wp('35%'),


                                                   }}>
                                                       
                                       <TouchableOpacity onPress={() => this.AddCart(this.state.NewProductId)}>
                                       
                                       <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 10,marginTop:'5%', }}>
                                            Category2
                                        </Text>
                                       </TouchableOpacity>
                                       </View>
                                       <View style={{
                                                       
                                                       margin: 9,
                                                       color: 'black',   
                                                       textAlign: 'center',
                                                       //padding: 10,
                                                       height: 30,
                                                       backgroundColor: '#8a2be2',
                                                       borderRadius: 100,
                                                      marginTop:'2%',
                                                      //marginLeft:'10%',
                                                       width: wp('35%'),


                                                   }}>
                                                       
                                       <TouchableOpacity onPress={() => this.AddCart(this.state.NewProductId)}>
                                       
                                       <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 10,marginTop:'5%', }}>
                                            Category3
                                        </Text>
                                       </TouchableOpacity>
                                       </View>
                      
                                      
 
                        </ScrollView>


        </View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
    );
  }

}