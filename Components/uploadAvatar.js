import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

async function UploadAvatarToStorage(avatar) {
  const avId = Date.now().toString();
  const path = `avatars/${avId}.jpeg`;

  const response = await fetch(avatar);
  const file = await response.blob();

  const avatarsRef = ref(storage, path);

  await uploadBytes(avatarsRef, file);

  const avatarURL = await getDownloadURL(ref(storage, avatarsRef));

  return avatarURL;
}

export default UploadAvatarToStorage;
