/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface User {
    user: Models.User;
    setUser: Dispatch<SetStateAction<Models.User>>;
  }
}
