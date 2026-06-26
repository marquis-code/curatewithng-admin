import { auth_api } from '~/api_factory/modules/auth';
import { useUser } from './user';

export const useAuth = () => {
  const { setUser } = useUser();

  const fetchProfile = async () => {
    const response = await auth_api.getProfile();
    const userData = response.data.data || response.data;
    setUser(userData);
    return userData;
  };

  const login = async (payload: any) => {
    const response = await auth_api.login(payload);
    const responseData = response.data.data || response.data;
    
    // If backend indicates OTP is required, stop here and return so UI can transition
    if (responseData.requiresOtp) {
      return responseData;
    }

    const user = responseData.user;
    if (!user || user.role !== 'ADMIN') {
      throw { response: { data: { message: 'Unauthorized. Admin access required.' } } };
    }

    setUser(user);
    
    await fetchProfile();
    return responseData;
  };

  const verifyOtp = async (email: string, otp: string) => {
    const response = await auth_api.verifyAdminOtp({ email, otp });
    const responseData = response.data.data || response.data;
    const user = responseData.user;
    
    if (!user || user.role !== 'ADMIN') {
      throw { response: { data: { message: 'Unauthorized. Admin access required.' } } };
    }

    setUser(user);
    
    await fetchProfile();
    return responseData;
  };

  return { login, fetchProfile, verifyOtp };
};
