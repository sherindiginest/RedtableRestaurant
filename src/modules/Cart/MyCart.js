import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image,Dimensions,BackHandler,TextInput,TouchableOpacity } from 'react-native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fontisto from "react-native-vector-icons/Fontisto";



const DetilsArray = [
    {
      id: 3,
      name: 'Order #101',
      details:
      'Chicken chilly',
      time:'6:30 PM',
      number:5,
      status:'processing',
      statuscolor:1,
      price:'50SR',
      photo_url: 'https://truffle-assets.imgix.net/655ce202-862-butternutsquashcarbonara-land.jpg',
    },
    // {
    //   id: 1,
    //   name: 'Order #103',
    //   details: 'idali',
    //   time:'yesterday',
    //   number:2,
    //   status:'completed',
    //   statuscolor:2,
    //   price:'40SR',
    //   photo_url: 'https://truffle-assets.imgix.net/655ce202-862-butternutsquashcarbonara-land.jpg',
    // },
    
    
  ];

export default class MyCart extends React.Component {


    static navigationOptions = {
        title: '',
    };
      constructor(props) {
        super(props);
        this.state = {
            edit:'',
            CartNo:1,
            DeliveryNotes:'',
        }
        
      }
      handleChange(text, name) {

        this.setState({
            [name]: text
            
        });
    };

      back()
      {
          this.props.navigation.navigate('Home')
      }
      plus()
      { 
          this.setState({
              CartNo:this.state.CartNo+1  
          })               
      }

      minus()
      {
          if(this.state.CartNo!= 1)
          {
              this.setState({
                  CartNo:this.state.CartNo-1                       
              })
          }               
      }


render(){
    return(
        <View style={{backgroundColor:'white',}}>
            <ScrollView>
       <View style={{flexDirection:'row',justifyContent: 'space-between',paddingRight:'60%',paddingBottom:'5%',marginTop:'5%'}}>
                        <View style={{alignItems:'flex-start',paddingLeft:'10%',marginTop:'2%'}}>
                        <TouchableOpacity onPress={() => this.back()}>
                                        <AntIcon   name="left" size={30} color='black' />
                                        </TouchableOpacity>
                                        </View>
                                <View >
                                        <Text  style={{fontSize:30}} >Cart 
                                        </Text>
                                        </View>
                                        
                                        </View>

<View>


<FlatList

data={DetilsArray}

renderItem={({ item }) => (
    <View>
        <Text style={{fontSize:30,textAlign:'center'}}>{item.name}</Text>

        <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}> 
<View style={{ width: wp("45%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left', }}>Product</Text>
   
</View>
<View style={{ width: wp("30%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left', }}>Quantity</Text>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>Price</Text>
   
</View>



 </View>   
 <View style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
     <Text style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
     </View> 


     <View style={{ flexDirection: "row",marginLeft:'5%',marginBottom:'2%',marginTop:'2%' }}> 
<View style={{ width: wp("40%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'#c4c3cb' }}>{item.details}</Text>
   
</View>
<View style={{ width: wp("35%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
   
    <View style={{ flexDirection:'row' }}>
                                     <TouchableOpacity onPress={() => this.minus()}>
                                         <View style={{backgroundColor:'red',marginRight:'49%',marginBottom:'1%',marginTop:'-12%'}}>
                                                {/* <AntIcon style={{  marginLeft: '15%',marginTop:'-52%'}} name="minus" color="black" size={18} /> */}
                                                <Text style={{fontSize:30,backgroundColor:'red',textAlign:'center',color:'white'}}>-</Text>
                                                </View>
                                                </TouchableOpacity>
                                               
                                                <View style={{ width: wp('10%'),marginLeft:'-28%',marginTop:'-7%' }}>
                                               
                                                    <TextInput style={{
                                                                        margin: hp('0%'),
                                                                        //borderRadius: 100,
                                                                        borderColor: 'red',
                                                                        borderWidth: 1,
                                                                        textAlign: 'center',
                                                                        marginBottom:'5%',
                                                                        backgroundColor: 'white',
                                                                        fontSize:10,
                                                                        height:(Platform.OS==='ios')?hp('5%'):hp("5%")
                                                                    }}
                                                                    value={this.state.CartNo.toString()}
                                                        underlineColorAndroid='transparent' 
                                                        placeholderTextColor="#c4c3cb"
                                                        onChangeText={(text) => this.handleChange(text, 'CartNo')}
                                                        
                                                        
                                                    />


                                                
                                                </View>
                                               
                                                <TouchableOpacity onPress={() => this.plus()}>

                                                <View style={{backgroundColor:'red',marginRight:'48%',marginBottom:'1%',marginTop:'-12%'}}>
                                              
                                                <Text style={{fontSize:30,backgroundColor:'red',textAlign:'center',color:'white'}}>+</Text>
                                                </View>

                                                {/* <AntIcon style={{  marginLeft: '15%',marginTop:'-52%'}} name="plus" color="black" size={18} /> */}
                                                </TouchableOpacity>
                                                
                                                
                                                </View>
   
</View>
<View style={{ width: wp("25%"),  borderRightWidth: 0, borderRightColor: "#c4c3cb" }}>
    <Text style={{ fontSize: 18, textAlign: 'left',color:'red' }}>{item.price}</Text>
   
</View>



 </View> 


    </View>
)}
//ListFooterComponent={this.renderFooter.bind(this)}
onEndThreshold={0}
/>


</View>
<View style={{
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',

    height: 40,
    margin: 15,

  }}>
            <View>
            <Fontisto  name="email" color="#c4c3cb" size={26} />
            </View>
            
<View style={{ width: wp('75%') }}>
  
            <TextInput
             style={{  margin: hp('1%'),
             paddingLeft:'10%',
             borderRadius: 30,
             borderColor: '#c4c3cb',
             borderWidth: 1,
             textAlign: 'left',
             backgroundColor: '#FFFFFF50',
             height:(Platform.OS==='ios')?hp('8%'):hp("8%") }}
              placeholder="Delevery Notes"
              placeholderTextColor="#c4c3cb" 
              //underlineColorAndroid="white"
              onChangeText={(text) => this.handleChange(text, 'DeliveryNotes')}
              value={this.state.DeliveryNotes}
            />
            </View>
          </View>




            </ScrollView>      

      </View>
    );
}




}