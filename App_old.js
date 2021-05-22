
import React from 'react';
import { StyleSheet, Image, View, ActivityIndicator,ImageBackground } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = { isLoading: true }
    }
    async   componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.setState({ isLoading: false });
        }
    }
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                1000
            )
        );
    }
    render()
    {
        if (this.state.isLoading == true)
        {
            
            return <SplashScreen />;
        }
       

        return (
            
                <RootNavigation />
              
            )
        
    }
}
class SplashScreen extends React.Component {
    render() {
        const viewStyles = [
            styles.container,
            { backgroundColor: 'white' }
        ];
        return (
            <View style={viewStyles}>
                <ImageBackground source={require('./assets/images/img3.png')} style={{
   //flex: 0,
    resizeMode: "cover",
    justifyContent: "center",
    height: hp('100%'),
    width:wp('100%')
  }}>
                <Image
                    style={{
                        resizeMode:'center',
                        
                        width: wp('100%'),
                        height: hp(50),
                        marginBottom: '5%',
                    }}
                    source={require('./assets/images/img1.png')} />
                <ActivityIndicator size="large" color="white" />
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});