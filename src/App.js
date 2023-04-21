// project import
import Routes from 'routes';
import React, { useEffect, useState } from 'react';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, View } from '@aws-amplify/ui-react';

import { Amplify, API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const apiName = 'santamariaapi';
const path = '/items';
const myInit = {
  headers: {}, // OPTIONAL
  response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  queryStringParameters: {
    name: 'param', // OPTIONAL
  },
};

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut }) => {
  const [dataFromAPI, setDataFromAPI] = useState(null);

  useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        console.log(response.data);
        setDataFromAPI(response.data);
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }, []);

  return (
    <div>
      <h1>Stock App</h1>
      <p>{dataFromAPI}</p>
      <Button onClick={signOut}>Sign Out</Button>
      {/*
      <View className="App">
        <Button onClick={signOut}>Sign Out</Button>
      </View>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
      */}
    </div>
  );
};

export default withAuthenticator(App);
