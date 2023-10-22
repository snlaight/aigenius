import { SignIn } from '@clerk/nextjs';

import Modal from '@/components/CustomModal';

const InterceptedSignInModal = () => (
  <Modal>
    <SignIn />
  </Modal>
);

export default InterceptedSignInModal;
