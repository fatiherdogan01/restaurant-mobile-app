#Food Mobile App Project with React Native
Mobile application developed with React Native and used backend Graphql
___
##Usage
`yarn install`
`yarn android` or `yarn ios`
___
#Documentation

##Features
###Authentication
```jsx
const [loginWithEmail, { loading, error }] = useMutation(GET_TOKEN, {
    onCompleted: (data) => {
      setToken('token', data.loginWithEmail.token)
      navigation.navigate("Tabs")
    }
  });
```

###List Past Orders
###List Restaurants
###Get Profile 

