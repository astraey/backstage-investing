// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, View } from '@aws-amplify/ui-react';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = ({ signOut }) => {
  return (
    <div>
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
      <View className="App">
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    </div>
  );
};

export default withAuthenticator(App);
