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
const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHTS = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGINS = RECIPE_ITEM_OFFSET * 2;
const Tab = createMaterialBottomTabNavigator();

export default class HomeNew extends React.Component {


  constructor(props) {
    super(props);
    
    this.state = {

        search:'',
    };
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };


  renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressIngredient(item[0])}>
      <View style={{
                    flex: 1,
                    alignItems: 'center',
                    margin: RECIPE_ITEM_OFFSET,
                    marginTop: 30,
                    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                    height: RECIPE_ITEM_HEIGHTS + 30,
                    backgroundColor:'white',
                    borderRadius:30
                }}>
        <Image style={{
                        width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                        height: RECIPE_ITEM_HEIGHTS-10,
                        borderRadius: 60,
                        backgroundColor:'white',
                        opacity:.5
                    }} source={{ uri: item.photo_url }} />
        <Text style={{
                        margin: 10,
                        marginBottom: 5,
                        color: 'black',
                        fontSize: 13,
                        textAlign: 'center'
                    }}>{item.title}</Text>
        {/* <Text style={{ color: 'grey' }}>{item[1]}</Text> */}
      </View>
    </TouchableHighlight>
  );


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
      <View>
          <ScrollView>
          <View style={{backgroundColor:'white',height:'8%',flexDirection:'row',marginTop:'5%',marginBottom:'1%'}}>
              <View>
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
  }} source={{ uri: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg' }} />
        <Text style={{
                    flex: 1,
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#444444',
                    marginTop: 3,
                    marginRight: 5,
                    marginLeft: 5,
  }}>Special</Text>
        {/* <Text style={{
                    marginTop: 5,
                    marginBottom: 5
                }}>Item</Text> */}
               
      </View>
    </TouchableHighlight> 
              </View>

              <View>
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
  }} source={{ uri: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg' }} />
        <Text style={{
                    flex: 1,
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#444444',
                    marginTop: 3,
                    marginRight: 5,
                    marginLeft: 5,
  }}>{'Special Items'}</Text>
        {/* <Text style={{
                    marginTop: 5,
                    marginBottom: 5
                }}>{getCategoryName(item.categoryId)}</Text> */}
               
      </View>
    </TouchableHighlight> 
              </View>
          </View>
      <View style={{backgroundColor:'#ff6347',marginBottom:'15%',height:'100%'}}>
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
 <View>
     <Text style={{marginLeft:'5%',color:'white',fontSize:20,fontWeight:'bold'}}>Meals</Text>
     <View style={{flexDirection:'row',alignContent:'center',justifyContent:'center',alignItems:'center'}}>
         <View>
     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressIngredient(item[0])}>
      <View style={{
                    flex: 1,
                    alignItems: 'center',
                    margin: RECIPE_ITEM_OFFSET,
                    marginTop: 30,
                    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                    height: RECIPE_ITEM_HEIGHTS + 30,
                    backgroundColor:'white',
                    borderRadius:30
                }}>
        <Image style={{
                        width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                        height: RECIPE_ITEM_HEIGHTS,
                        borderRadius: 60,
                        backgroundColor:'white'
                    }} 
                    source={{ uri:'https://www.conservationmagazine.org/wp-content/uploads/2013/04/sterile-banana.jpg'}} />
        <Text style={{
                        margin: 10,
                        marginBottom: 5,
                        color: 'black',
                        fontSize: 13,
                        textAlign: 'center'
                    }}>{'BreakFast'}</Text>
        {/* <Text style={{ color: 'grey' }}>{'item1'}</Text> */}
      </View>
    </TouchableHighlight>
    </View>

    <View>
     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressIngredient(item[0])}>
      <View style={{
                    flex: 1,
                    alignItems: 'center',
                    margin: RECIPE_ITEM_OFFSET,
                    marginTop: 30,
                    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                    height: RECIPE_ITEM_HEIGHTS + 30,
                    backgroundColor:'white',
                    borderRadius:30
                }}>
        <Image style={{
                        width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                        height: RECIPE_ITEM_HEIGHTS,
                        borderRadius: 60
                    }} 
                    source={{ uri:'https://www.cascadianfarm.com/wp-content/uploads/2018/12/Strawberries_Main_0218.png'}} />
        <Text style={{
                        margin: 10,
                        marginBottom: 5,
                        color: 'black',
                        fontSize: 13,
                        textAlign: 'center'
                    }}>{'Lunch'}</Text>
        {/* <Text style={{ color: 'grey' }}>{'item1'}</Text> */}
      </View>
    </TouchableHighlight>
    </View>

    <View>
     <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressIngredient(item[0])}>
      <View style={{
                    flex: 1,
                    alignItems: 'center',
                    margin: RECIPE_ITEM_OFFSET,
                    marginTop: 30,
                    width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                    height: RECIPE_ITEM_HEIGHTS + 30,
                    backgroundColor:'white',
                    borderRadius:30,
                }}>
        <Image style={{
                        width: (SCREEN_WIDTH - RECIPE_ITEM_MARGINS) / numColumns - RECIPE_ITEM_OFFSET,
                        height: RECIPE_ITEM_HEIGHTS,
                        borderRadius: 60
                    }} 
                    source={{ uri:'http://images.media-allrecipes.com/userphotos/960x960/3758635.jpg'}} />
        <Text style={{
                        margin: 10,
                        marginBottom: 5,
                        color: 'black',
                        fontSize: 13,
                        textAlign: 'center'
                    }}>{'Dinner'}</Text>
        {/* <Text style={{ color: 'grey' }}>{'item1'}</Text> */}
      </View>
    </TouchableHighlight>
    </View>

     </View>

{/* Discount Offers */}

<View >

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
                    backgroundColor:'white'
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
  }} source={{ uri:'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'}} />
        <Text style={{
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8
  }}>{'CHICKEN SALAD | DISCOUNT OFFER'}</Text>
        <Text style={{
    marginTop: 3,
    marginBottom: 5
  }}> Valid up to today</Text>
      </View>
    </TouchableHighlight>

</View>


 </View>
 <View>
 <Text style={{marginLeft:'5%',color:'white',fontSize:20,fontWeight:'bold'}}>Categoris</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={recipes}
          renderItem={this.renderIngredient}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
      <Text style={{marginLeft:'5%',color:'white',fontSize:20,fontWeight:'bold'}}>Featured Dishes</Text>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipes}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
      </View>
      </ScrollView>
      </View>
    );
  }

}