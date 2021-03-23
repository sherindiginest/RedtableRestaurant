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
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import styles from '../../styles/common';
import AntIcon from "react-native-vector-icons/AntDesign";

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
        Image:'',
        Tittle:'',
    };
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };
  CategoryDetails(photourl,title){
    this.setState({Image:photourl,Tittle:title})
    this.RBSheet.open();
  }

  

Close()
{
    this.RBSheet.close();  
}
  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.CategoryDetails(item.photo_url,item.title)}>
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



<RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={500}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
        <View>
        <View style={{alignContent:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
            <TouchableOpacity onPress={()=>this.Close()}>

            
                    <Feather name="x" color="black" size={25}></Feather>
                    </TouchableOpacity>
                    </View>
            <ScrollView>
            <View style={{  marginTop:'5%',alignItems: "center", justifyContent: "center" }}>
                                                                 
                                                                 {/* <Icon name="edit" color="#0af745" size={15}></Icon> */}
                                                                 {/* <MaterialIcons name="restaurant-menu" color='white' size={26} /> */}
                                                                 <Image style={{
                    width: 230,
                    height: 230,
                    borderRadius: 100,
                    resizeMode:'cover',
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
  }} source={{ uri: this.state.Image }} />
                                                  
                                                         </View>

            <View style={{  marginTop:'5%',alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 25, textAlign: 'left',fontWeight:'bold' }}>{this.state.OrderNo}</Text>  
            </View>

            <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}>
     <View style={{ width: wp("75%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>{this.state.Tittle}</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>50SR</Text>
   
</View> 
          </View>  
   
   <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%',alignContent:'flex-start',alignItems:'flex-start',justifyContent:'flex-start' }}>

<View>
<AntIcon   name="star" size={15} color='red' />
</View>
<View>
<AntIcon   name="star" size={15} color='red' />
</View>
<View>
<AntIcon   name="star" size={15} color='red' />
</View>
<View>
<AntIcon   name="star" size={15} color='red' />
</View>
<View>
<AntIcon   name="star" size={15} color='red' />
</View>
<View>
<Text>{' '}80 rating</Text>
</View>
   </View>
 
   <View style={{marginLeft:'5%'}}>
<Text>About {this.state.Tittle}</Text>
</View>


<View style={{marginLeft:'3%',marginRight:'3%'}}>
<Text style={{textAlign:'justify',flexWrap:'wrap',color:'#c4c3cb'}}>In a medium shallow bowl, whisk together olive oil, 
  lime juice, paprika, chili powder, cumin, and cayenne. Add cod, 
  tossing until evenly coated. Let marinate 15 minutes. Meanwhile, 
  make slaw: In a large bowl, whisk together mayonnaise, lime juice, 
  cilantro, and honey. Stir in cabbage, corn, and jalapeño. Season with salt and pepper.\n\n -- In a large nonstick skillet over medium-high heat, 
  heat vegetable oil. Remove cod from marinade and season both sides of each filet with salt and pepper. 
  Add fish flesh side-down. Cook until opaque and cooked through, 
  3 to 5 minutes per side.\n\n -- Let rest 5 minutes before flaking with a fork. 
  Assemble tacos: Serve fish over grilled tortillas with corn slaw and avocado.
   Squeeze lime juice on top and garnish with sour cream.</Text>
</View>

          <View style={{paddingTop:"3%"}}>
                 <View style={styles.SubmitButtonCont}>
                     <TouchableOpacity style={{
                                                backgroundColor: 'red',
                                                opacity:.6,
                                                width: wp('90%'),
                                                height: hp('7%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 75,
                                                marginBottom: hp('1%'),
                                            }} 
                     onPress={()=>this.Cancel()}
                  >
                         <Text style={styles.SubmitButtonText}> Add To Order</Text>
                     </TouchableOpacity>
                 </View>
                 </View>

            </ScrollView>
            
        </View>
        </RBSheet>

      </View>
    );
  }

}