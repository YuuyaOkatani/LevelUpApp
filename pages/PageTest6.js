import * as React from 'react';
import {Container} from '../components/Container';

import {useCallback, useState} from 'react';
import DBquery from '../functions/DBquery';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import {BackIcon} from '../components/BackIcon';
import {styles} from '../styles/Styles';
import ProgressBar from '../components/ProgressBar';

import {useFocusEffect} from '@react-navigation/native';

import {RadarChart} from '@salmonco/react-native-radar-chart';

export default function PageTest6({navigation}) {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  const [showData, setShowData] = useState(false);
  let updateQuery = new DBquery();

  // let data3 = []

  useFocusEffect(
    useCallback(() => {
      // Função a ser executada ao mudar para esta tela

      setShowData(!showData);

      setData2(updateQuery.checkStats());

      setLevelValue();

      // Retorna uma função de limpeza se necessário
      return () => {};
    }, []),
  );

  const setLevelValue = () => {
    setData([]);

    updateQuery.setScore().forEach(quest => {
      if (quest.level !== undefined) {
        let stuct = {
          name: quest.materia,
          value: quest.value * 10,
          level: quest.level,
        };
        setData(data => [...data, stuct]);
      }
    });
  };

  return (
    <Container>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <RadarChart
          data={data2}
          size={300}
          maxValue={100}
          gradientColor={{
            startColor: '#031b40',
            endColor: '#031b40',
            count: 5,
          }}
          labelColor="white"
          dataFillColor="#7abafa"
          dataFillOpacity={0.8}
          dataStroke="#348feb"
          dataStrokeWidth={1}
        />
      </View>

      <View style={styles.container2}>
        <FlatList
          style={{width: '100%', height: 250}}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onLongPress={() => setShowProgress(!showProgress)}>
              <View style={{marginTop: 40}} key={index}>
                <Text style={[styles.textStyle, {fontSize: 16}]}>
                  {item.name} - Lvl.{item.level}
                </Text>

                {showProgress && <ProgressBar progress={item.value * 10} />}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </Container>
  );
}
