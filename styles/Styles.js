import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },

  container1: {
    flex: 1,
    backgroundColor: '#031b40',
    padding: 10,
    borderWidth: 1,
    borderColor: '#a1c2f7',
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },

  containerStats: {
    flexDirection: 'row',
    padding: 15,
  },
  statsBox: {
    flex: 1,
    padding: 10,
  },

  levelBox: {
    height: 110,
    width: 110,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    color: 'white',
    fontSize: 25,
    textShadowColor: 'rgba(255, 255, 255, 0.8)', // Cor do brilho
    textShadowOffset: {width: 0, height: 0}, // Offset para centralizar o brilho
    textShadowRadius: 8,
  },

  taskBox: {
    flex: 1,
    padding: 10,
  },
  taskBar: {
    flexDirection: 'row',
  },

  questButton: {
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 5,
    height: 'auto',
    padding: 10,
  },

  addQuestButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'white',
    height: 70,
  },

  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  button: {
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 60,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
});
