import { useAuthStore } from "../../store/authUser.js";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
	let { user } = useAuthStore();
console.log(user)
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default HomePage;