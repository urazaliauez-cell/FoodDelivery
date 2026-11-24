import { NavigatorScreenParams } from "@react-navigation/native";

export type BottomTabParamList = {
  Home: undefined;
  Search: { category?: string; restaurant?: string } | undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: { email: string };
  ResetPassword: { email: string };
  Location: undefined;
  Main: NavigatorScreenParams<BottomTabParamList> | undefined;
  FoodDetails: { foodId: string };
  Checkout: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
