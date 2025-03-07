import { storeToRefs } from "pinia";

import { ApiService } from "~/services/api.service";
import { useUserStore } from "~/store";
import type { UserDto } from "~/dto/auth";

const apiService = new ApiService("user", "http://localhost:3000"); // TODO: env??

export class UserService {
  async getById(id: number) {
    const userStore = useUserStore();
    const { isLoading } = storeToRefs(userStore);
    const { setUser } = userStore;

    isLoading.value = true;
    try {
      const response = await apiService.get<UserDto>(`${id}`);

      setUser(response.id, {
        ...response,
      });

      return true;
    } catch (e) {
      return false;
    } finally {
      isLoading.value = false;
    }
  }
}

export default new UserService();
