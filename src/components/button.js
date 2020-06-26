import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children,disabled }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity  disabled={disabled} onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}> {children} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'blue',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    marginHorizontal:30,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,

  }
};

export default Button;
