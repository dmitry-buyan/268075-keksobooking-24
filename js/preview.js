import { Photos } from './card.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const FILE_TYPES = ['png', 'jpg', 'jpeg'];

const avatarChooser = document.querySelector('.ad-form-header input[type="file"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type="file"]');
const photoPreview = document.querySelector('.ad-form__photo');

const uploadFile = (fileChooser, filePreview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    filePreview.src = URL.createObjectURL(file);
  }
};

const onAvatarChange = () => {
  uploadFile(avatarChooser, avatarPreview);
};

const onPhotoChange = () => {
  const fragment = document.createDocumentFragment();
  const photoPreviewImage = document.createElement('img');
  fragment.append(photoPreviewImage);
  photoPreviewImage.style.width = Photos.WIDTH;
  photoPreviewImage.alt = Photos.ALT;
  uploadFile(photoChooser, photoPreviewImage);
  photoPreview.append(fragment);
};

const resetPreview = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.innerHTML = '';
};

const setAvatarChange = () => {
  avatarChooser.addEventListener('change', onAvatarChange);
};

const setPhotoChange = () => {
  photoChooser.addEventListener('change', onPhotoChange);
};

export { setAvatarChange, setPhotoChange, resetPreview };
