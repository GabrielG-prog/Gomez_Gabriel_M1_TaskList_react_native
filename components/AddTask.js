import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native'
import { Input } from 'react-native-elements'

import Icon from 'react-native-vector-icons/Ionicons'

export default function AddTask({refAddNewTask}) {
	const [newTask, onChangeText] = useState('')

  const createNewTask = (e) => {
    if (newTask) {
      e.preventDefault()
    
      const newId = new Date().getTime()
      const newText = newTask
      const newChecked = false
    
      refAddNewTask({newId, newText, newChecked})
    } else {
      Alert.alert("Vous devez écrire une tâche")
    }
  }

	return (
		<View style={{flex: 1, flexDirection: 'row'}}>
      <View  style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
        <Input
          placeholder='Add new task'
          onChangeText={text => onChangeText(text)} />
      </View>
      <View  style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={createNewTask}>
          <Icon name='md-add' size={50}
          />
        </TouchableOpacity>
      </View>
    </View>
	)
}

