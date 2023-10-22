import { SignUp } from '@clerk/nextjs';

import Modal from '@/components/CustomModal';

const InterceptedSignUpModal = () => (
  <Modal>
    <SignUp />
  </Modal>
);

export default InterceptedSignUpModal;
