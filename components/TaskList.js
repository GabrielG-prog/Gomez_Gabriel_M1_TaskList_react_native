import React, { Component } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native'
import { CheckBox, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import AddTask from './AddTask'
import Header from './Header'

export default class TaskList extends Component {
	state = {
    tasks: [
      {id: 1, text: "Take a trash out ", checked: false},
      {id: 2, text: "Pay apartment rent", checked: false},
      {id: 3, text: "Pay Bills", checked: false},
      {id: 4, text: "Buy dogs food", checked: false},
      {id: 5, text: "Go to the gym", checked: false},
      {id: 6, text: "Piano class at 7pm", checked: false}
    ],
    nbCheck: 0
  }

  deleteTask = (idTask) => {
    let count = 0
    const copieTasks = this.state.tasks.slice()
    const indexTask = copieTasks.findIndex(function(task) {
      return task.id === idTask
    })
    copieTasks.splice(indexTask, 1)
    this.setState({tasks : copieTasks})

    Alert.alert("Vous avez supprimé une tâche")

    if(idTask) {
      this.setState({nbCheck: this.state.nbCheck -1})
    }
  }

  onCheck = (itemId) => {
    let count = 0
    const tasksCopie = this.state.tasks.slice()
    tasksCopie.map((task) => {
      if (task.id === itemId) {
        task.checked = !task.checked
        this.setState({tasks: tasksCopie})
      }
       if (itemId && task.checked) {
        count +=1
      }
    })
    this.setState({nbCheck: count})
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <CheckBox
          checked={item.checked}
          onPress={() => this.onCheck(item.id)} />
        <Text h4>{item.text}</Text>
        <TouchableOpacity onPress={() => this.deleteTask(item.id)}>
          <Icon name='md-trash' size={40} />
        </TouchableOpacity>
      </View>
    )
  }

  addNewTask = (newTask) => {
    let count = 0
    const tasksCopie = this.state.tasks.slice()
    const sameText = tasksCopie.map((task) => {
      if (task.text === newTask.newText) {
          count +=1
      } 
    })

    if (count > 0) {
      count = 0
      Alert.alert("Vous avez déjà mis cette tâche")
    } else {
      tasksCopie.push({id: newTask.newId, text: newTask.newText, checked: newTask.newChecked});
      this.setState({tasks : tasksCopie})
      Alert.alert("Vous avez ajouté une nouvelle tâche")
    }
  }

	render() {
    if(this.state.nbCheck < 0) {
      this.setState({nbCheck: 0})
    }
    
	  return (
      <View style={styles.container}>
        <Header nbTask={this.state.tasks.length} nbCompletTask={this.state.nbCheck} />
			  <View style={{flex: 3, justifyContent: 'center'}}>
			    <FlatList
            data={this.state.tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderItem} />
			  </View>
        <AddTask refAddNewTask={this.addNewTask}/>
      </View>
	  )
	}
}

const styles = StyleSheet.create({
  item: {
    borderColor: 'black', 
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0
  }
})