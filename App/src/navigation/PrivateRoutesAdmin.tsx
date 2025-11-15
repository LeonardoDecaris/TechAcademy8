import React, { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

interface Props {
  children: React.ReactNode;
}

const PrivateRouteAdmin = ({ children }: Props) => {
  const { isAuthenticated, userAdmin } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated && !userAdmin === true) {
      navigation.reset({
        index: 0,
        routes: [{ name: "home" as never }],
      });
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRouteAdmin;