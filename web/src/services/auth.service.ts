import { ApiService } from "~/services/api.service";
import type {
  AuthCredentialsDto,
  LoginResponseDto,
  RegisterDto,
} from "~/dto/auth";
import { storeToRefs } from "pinia";
import { useAccountStore } from "~/store/account.store";
import { useUserStore } from "~/store/user.store";
import { SERVER_URL } from "~/constants";

const apiService = new ApiService("auth", SERVER_URL);

export class AuthService {
  async login(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
    console.log(`login`);

    const accountStore = useAccountStore();
    const { /*account,*/ isLoading } = storeToRefs(accountStore);

    isLoading.value = true;

    try {
      const response = await apiService.post<
        AuthCredentialsDto,
        LoginResponseDto
      >("login", authCredentialsDto);

      const userStore = useUserStore();
      const { users } = storeToRefs(userStore);
      users.value.set(response.user.id, { ...response.user });

      console.log(users.value);

      accountStore.setAccount({
        userId: response.user.id,
        accessToken: response.token.accessToken,
        refreshToken: response.token.refreshToken,
      });

      return true;
    } catch (e) {
      console.log(`login catch error: ${e}`);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async register(registerDto: RegisterDto) {
    const accountStore = useAccountStore();
    const { account, isLoading } = storeToRefs(accountStore);

    isLoading.value = true;

    try {
      const response = await apiService.post<RegisterDto, LoginResponseDto>(
        "register",
        registerDto,
      );

      const userStore = useUserStore();
      const { users } = storeToRefs(userStore);
      users.value.set(response.user.id, { ...response.user });

      account.value = {
        userId: response.user.id,
        accessToken: response.token.accessToken,
        refreshToken: response.token.refreshToken,
      };

      return true;
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new AuthService();
