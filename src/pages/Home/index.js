import React from 'react';
import {View} from 'native-base';

import Header from '../../components/Header';
import List from '../../components/List';

const Home = () => {
  return (
    <>
      <Header name="Todo-List" />
      <View style={{flex: 1}}>
        <List />
      </View>
    </>
  );
};

export default Home;
