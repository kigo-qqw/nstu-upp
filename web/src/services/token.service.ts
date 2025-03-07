import { useAccountStore } from "~/store/account.store";
import { storeToRefs } from "pinia";

export class TokenService {
  getLocalRefreshToken() {
    const accountStore = useAccountStore();
    const { account } = storeToRefs(accountStore);
    return account.value?.refreshToken;
  }

  getLocalAccessToken() {
    const accountStore = useAccountStore();
    const { account } = storeToRefs(accountStore);
    console.log(account);
    return account.value?.accessToken;
  }

  updateLocalAccessToken(token: string) {
    const accountStore = useAccountStore();
    const { account } = storeToRefs(accountStore);
    if (account.value) account.value!.accessToken = token;
  }
}

export default new TokenService();
