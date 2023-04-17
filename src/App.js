// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = ({ signOut }) => (
    <div>
      <View className="App">
        <Card>
          <Image src={logo} className="App-logo" alt="logo" />
          <Heading level={1}>We now have Auth!</Heading>
        </Card>
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
