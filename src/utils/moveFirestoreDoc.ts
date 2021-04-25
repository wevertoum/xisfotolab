import { collection } from "utils/firebase";

const moveFirestoreDoc = async function (
  fromRef: string,
  toRef: string,
  value: any
) {
  const [path, id] = fromRef.split("/");
  try {
    await collection(toRef).doc(id).set(value);
    await collection(path).doc(id).delete();
    console.log(path);
  } catch (errCopy) {
    try {
      await collection(toRef).doc(id).delete();
    } catch (errDeleteCopy) {
      console.error(errDeleteCopy);
    }
    console.error(errCopy);
  }
};

export default moveFirestoreDoc;
