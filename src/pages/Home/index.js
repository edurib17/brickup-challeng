import React from 'react';
import {View} from 'native-base';

import Header from '../../components/Header';
import List from '../../components/List';

const Home = () => {
  return (
    <View>
      <Header name="Todo-List" />
      <List />
    </View>
  );
};

export default Home;
