import React from 'react';
import { TouchableOpacity } from 'react-native';
function Card ({ onPress, children }) {
  const { cardStyle } = styles;
  return (
    <TouchableOpacity  onPress={onPress} style={cardStyle}>
     {children}
    </TouchableOpacity>
  );
};
const styles = {
  cardStyle: {
    display:"flex",
    backgroundColor: 'white',
    borderRadius:10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
};

export default Card;