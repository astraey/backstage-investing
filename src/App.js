// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  View
} from "@aws-amplify/ui-react";


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut }) => (
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

export default withAuthenticator(App);
