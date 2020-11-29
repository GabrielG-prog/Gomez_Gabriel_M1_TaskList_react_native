import React from 'react';
import { View } from 'react-native'
import { Text } from 'react-native-elements'

export default function Header({nbTask, nbCompletTask}) {
	return (
		<View style={{flex: 2}}>
			<View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
				<Text h2>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
			</View>
			<View style={{flex:2, flexDirection: 'row'}}>
				<View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
					<Text h4>Created tasks: {nbTask}</Text>
				</View>
				<View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
					<Text h4>Completed tasks: {nbCompletTask}</Text>
				</View>
			</View> 
		</View>
	)
}


