// project import
import Routes from 'routes';
import React, { useEffect, useState } from "react";
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, View } from '@aws-amplify/ui-react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut }) => {
  const [dataFromAPI, setDataFromAPI] = useState(null);

  useEffect(() => {
    fetch("/staging/items")
    //.then(data => console.log(data))
    //.then(response => response.json())
    .then(data => console.log(data))

        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => setDataFromAPI(data))
  },[])

  return (
    <div>
      <View className="App">
        <Button onClick={signOut}>Sign Out</Button>
      </View>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </div>
  );
};

export default withAuthenticator(App);
