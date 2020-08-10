/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Contexts {
  interface FormContext {
    form: Models.FormModel;
    setForm: React.Dispatch<React.SetStateAction<Models.FormModel>>;
    submitForm: () => void;
  }
}
