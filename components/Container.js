import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles/Styles'

export const Container = ({children}) => {
  return (
    <View style={styles.container}>
            <View style={styles.container1}>
                {children}
                
            </View>
           
        </View>
  )
}
